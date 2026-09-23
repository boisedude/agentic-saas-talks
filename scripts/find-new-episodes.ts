/**
 * find-new-episodes.ts — browser-free episode discovery
 *
 * Lists the YouTube playlist via its RSS feed (falling back to the playlist page
 * when the feed 404s, as it did through Sep 2026), diffs against data/episodes.ts,
 * and for every video not yet on the site fetches the watch page and extracts
 * full details (title, duration, publish date, description, timestamps) from the
 * embedded `ytInitialPlayerResponse` JSON. Prints ready-to-paste Episode objects.
 *
 * This replaces the Playwright-based scrape-playlist.ts / scrape-videos.ts flow,
 * which depends on a Chromium download that is unreliable in some environments.
 * Uses only Node's global fetch (Node 18+); no dependencies.
 *
 * Usage:
 *   npx tsx scripts/find-new-episodes.ts          # diff + dump new episodes
 *   npx tsx scripts/find-new-episodes.ts --all    # dump details for ALL feed videos
 */

import { episodes } from '../data/episodes'
import { EXTERNAL_LINKS } from '../lib/constants'

const PLAYLIST_ID =
  new URL(EXTERNAL_LINKS.youtubePlaylist).searchParams.get('list') ?? ''

// Short clips (8-32 min, Jul-Oct 2025) that sit in the playlist but were left
// off the site on purpose; without this they show up as "new" on every run.
const SKIPPED_VIDEO_IDS = new Set([
  'pL9U6m7JuV8', 'C8kF-5SD_6E', 'LE6UWptt5bo', 'mlzpqCwzyRc',
  'so23GV4hl70', 'uh_T1FnpPhA', 'X-6sXEDsBW4',
])

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

interface FeedVideo {
  videoId: string
  title: string
  published: string // ISO from feed (UTC)
}

interface VideoDetails {
  videoId: string
  title: string
  duration: string // "X min"
  date: string // YYYY-MM-DD (channel-local)
  description: string
  timestamps: { time: string; title: string }[]
}

/** Extract the YouTube video ID from a watch URL. */
function videoIdFromUrl(url: string): string {
  const m = url.match(/[?&]v=([^&]+)/)
  return m ? m[1] : ''
}

/** Parse the playlist RSS feed into a list of videos (newest first). */
async function fetchPlaylistFeed(): Promise<FeedVideo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Feed fetch failed: HTTP ${res.status}`)
  const xml = await res.text()

  const entries = xml.split('<entry>').slice(1)
  return entries.map((entry) => {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? ''
    const title = decodeEntities(
      entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
    )
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? ''
    return { videoId, title, published }
  })
}

/**
 * Fallback: read the playlist page's embedded ytInitialData. Returns every video
 * (not just the latest ~15), newest first, but without publish dates; the
 * per-video fetch fills those in.
 */
async function fetchPlaylistPage(): Promise<FeedVideo[]> {
  const url = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US' },
  })
  if (!res.ok) throw new Error(`Playlist page fetch failed: HTTP ${res.status}`)
  const html = await res.text()
  const json = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)?.[1]
  if (!json) throw new Error('Playlist page: ytInitialData not found')

  const videos: FeedVideo[] = []
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!node || typeof node !== 'object') return
    const o = node as Record<string, any>
    const lockup = o.lockupViewModel
    const legacy = o.playlistVideoRenderer
    if (lockup?.contentId) {
      const title = lockup.metadata?.lockupMetadataViewModel?.title?.content ?? ''
      videos.push({ videoId: lockup.contentId, title, published: '' })
    } else if (legacy?.videoId) {
      videos.push({ videoId: legacy.videoId, title: legacy.title?.runs?.[0]?.text ?? '', published: '' })
    }
    Object.values(o).forEach(walk)
  }
  walk(JSON.parse(json))
  return videos
}

/** Decode the handful of XML/HTML entities YouTube emits in titles. */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

/** Pull timestamp lines (e.g. "01:23 Topic") out of a video description. */
function parseTimestamps(description: string): { time: string; title: string }[] {
  const out: { time: string; title: string }[] = []
  for (const raw of description.split('\n')) {
    const line = raw.trim()
    // Matches "0:00", "00:00", "1:02:03" optionally followed by - or – then text
    const m = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—:]?\s*(.+)$/)
    if (!m) continue
    let [, time, title] = m
    // Normalise MM:SS to two-digit minutes for consistency with existing data
    if (/^\d:\d{2}$/.test(time)) time = '0' + time
    // Drop trailing hashtag-only or empty titles
    title = title.replace(/\s+/g, ' ').trim()
    if (title) out.push({ time, title })
  }
  return out
}

/** Fetch a watch page and extract details from ytInitialPlayerResponse. */
async function fetchVideoDetails(videoId: string): Promise<VideoDetails> {
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
  })
  if (!res.ok) throw new Error(`Watch page failed: HTTP ${res.status}`)
  const html = await res.text()

  const m =
    html.match(/var ytInitialPlayerResponse = (\{.+?\});/) ??
    html.match(/ytInitialPlayerResponse"?\]?\s*=\s*(\{.+?\});/)
  if (!m) throw new Error('ytInitialPlayerResponse not found')

  const data = JSON.parse(m[1])
  const vd = data.videoDetails ?? {}
  const micro = data.microformat?.playerMicroformatRenderer ?? {}

  const secs = parseInt(vd.lengthSeconds ?? '0', 10)
  const publishRaw: string = micro.publishDate ?? micro.uploadDate ?? ''
  // publishDate looks like 2026-05-23T11:00:26-07:00 — take the local date part
  const date = publishRaw.slice(0, 10)

  return {
    videoId,
    title: vd.title ?? '',
    duration: `${Math.round(secs / 60)} min`,
    date,
    description: vd.shortDescription ?? '',
    timestamps: parseTimestamps(vd.shortDescription ?? ''),
  }
}

/** Emit a ready-to-paste Episode skeleton for manual review. */
function printEpisodeSkeleton(d: VideoDetails, id: number) {
  const ts = d.timestamps
    .map((t) => `      { time: "${t.time}", title: ${JSON.stringify(t.title)} },`)
    .join('\n')
  console.log(`  {
    id: ${id},
    title: ${JSON.stringify(d.title)},
    description: "TODO: write a 2-3 sentence summary.",
    date: "${d.date}",
    videoUrl: "https://www.youtube.com/watch?v=${d.videoId}",
    duration: "${d.duration}",
    tags: ["TODO"],${
      ts
        ? `\n    timestamps: [\n${ts}\n    ],`
        : ''
    }
    // guests: add external (non-host) guests with verified LinkedIn URLs
  },`)
  console.log('  // --- raw description (for tags / guests / summary) ---')
  console.log(
    d.description
      .split('\n')
      .map((l) => '  // ' + l)
      .join('\n')
  )
  console.log('')
}

async function main() {
  const all = process.argv.includes('--all')

  if (!PLAYLIST_ID) {
    console.error('Could not resolve playlist ID from EXTERNAL_LINKS.youtubePlaylist')
    process.exit(1)
  }

  console.log(`Fetching playlist RSS (${PLAYLIST_ID})...`)
  let feed: FeedVideo[]
  try {
    feed = await fetchPlaylistFeed()
    console.log(`Feed returned ${feed.length} videos (RSS shows the latest ~15).\n`)
  } catch (err) {
    console.log(`${(err as Error).message}; reading the playlist page instead.`)
    feed = await fetchPlaylistPage()
    console.log(`Playlist page returned ${feed.length} videos.\n`)
  }
  feed = feed.filter((v) => !SKIPPED_VIDEO_IDS.has(v.videoId))

  const haveIds = new Set(episodes.map((e) => videoIdFromUrl(e.videoUrl)))
  const candidates = all ? feed : feed.filter((v) => !haveIds.has(v.videoId))

  if (!candidates.length) {
    console.log('✓ No new videos — the site is up to date with the playlist feed.')
    return
  }

  console.log(
    all
      ? `Dumping details for all ${candidates.length} feed videos:\n`
      : `Found ${candidates.length} new video(s) not yet in data/episodes.ts:\n`
  )
  for (const v of candidates) {
    console.log(`• ${v.published.slice(0, 10)}  ${v.videoId}  ${v.title}`)
  }
  console.log('')

  const maxId = episodes.reduce((m, e) => Math.max(m, e.id), 0)
  let nextId = maxId + 1

  console.log('='.repeat(78))
  console.log('Ready-to-paste Episode skeletons (oldest first, fill in TODOs):')
  console.log('Add them at the TOP of the episodes array, newest first.')
  console.log('='.repeat(78) + '\n')

  // Oldest first so id assignment is chronological, matching existing convention.
  // The playlist-page fallback has no dates but lists newest first.
  const ordered = candidates.every((v) => v.published)
    ? [...candidates].sort((a, b) => a.published.localeCompare(b.published))
    : [...candidates].reverse()
  for (const v of ordered) {
    try {
      const d = await fetchVideoDetails(v.videoId)
      printEpisodeSkeleton(d, nextId++)
    } catch (e) {
      console.log(`  // FAILED ${v.videoId}: ${(e as Error).message}\n`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
