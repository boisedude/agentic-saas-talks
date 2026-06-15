import { hosts, type Host } from "@/data/hosts"
import { episodes, type Episode, type Guest } from "@/data/episodes"

/**
 * Convert a human-readable string into a URL-safe slug.
 * "AI Architecture" -> "ai-architecture", "Daniel Chalef" -> "daniel-chalef".
 * Used to mint stable routes for topic, host, and guest pages.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * All unique episode tags with their episode counts, sorted alphabetically.
 */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {}
  episodes.forEach((ep) => ep.tags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1
  }))
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, slug: slugify(tag), count }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
}

/** Resolve a tag slug back to its canonical tag label (or undefined). */
export function getTagBySlug(slug: string): string | undefined {
  return Array.from(new Set(episodes.flatMap((ep) => ep.tags))).find(
    (tag) => slugify(tag) === slug
  )
}

/** Episodes carrying a given tag, newest first. */
export function getEpisodesByTag(tag: string): Episode[] {
  return [...episodes]
    .filter((ep) => ep.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Resolve a host by slugified name. */
export function getHostBySlug(slug: string): Host | undefined {
  return hosts.find((host) => slugify(host.name) === slug)
}

/**
 * All external guests across the catalog, de-duplicated by name, each with the
 * episodes they appeared in (newest first). Hosts are not guests.
 */
export function getAllGuests(): { guest: Guest; slug: string; episodes: Episode[] }[] {
  const byName = new Map<string, { guest: Guest; episodes: Episode[] }>()
  const sorted = [...episodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  sorted.forEach((ep) => {
    ep.guests?.forEach((guest) => {
      const existing = byName.get(guest.name)
      if (existing) {
        existing.episodes.push(ep)
        // Prefer the richest bio we have seen for this guest.
        if (guest.bio.length > existing.guest.bio.length) existing.guest = guest
      } else {
        byName.set(guest.name, { guest, episodes: [ep] })
      }
    })
  })
  return Array.from(byName.values())
    .map(({ guest, episodes }) => ({ guest, slug: slugify(guest.name), episodes }))
    .sort((a, b) => a.guest.name.localeCompare(b.guest.name))
}

/** Resolve a single guest (and their episodes) by slug. */
export function getGuestBySlug(
  slug: string
): { guest: Guest; episodes: Episode[] } | undefined {
  return getAllGuests().find((g) => g.slug === slug)
}

/**
 * Related episodes for a given episode, ranked by number of shared tags
 * (then recency). Excludes the episode itself.
 */
export function getRelatedEpisodes(episode: Episode, limit = 3): Episode[] {
  return episodes
    .filter((ep) => ep.id !== episode.id)
    .map((ep) => ({
      ep,
      shared: ep.tags.filter((t) => episode.tags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) =>
      b.shared - a.shared ||
      new Date(b.ep.date).getTime() - new Date(a.ep.date).getTime()
    )
    .slice(0, limit)
    .map((x) => x.ep)
}

/**
 * Extract YouTube video ID from a YouTube URL
 */
export function getYouTubeVideoId(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get("v") ?? ""
  } catch {
    return ""
  }
}

/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "January 15, 2025")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}

/**
 * Get host information by name
 */
export function getAuthorInfo(authorName: string) {
  return hosts.find((host) => host.name === authorName)
}

/**
 * Convert timestamp string to seconds
 * @param time - Time string in format "mm:ss" or "h:mm:ss"
 * @returns Number of seconds
 */
export function timestampToSeconds(time: string): number {
  try {
    const parts = time.split(":").map(Number)
    if (parts.some(isNaN)) return 0
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1] // mm:ss
    }
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2] // hh:mm:ss
    }
    return 0
  } catch {
    return 0
  }
}

/**
 * Generate a YouTube URL with timestamp
 */
export function getTimestampUrl(baseUrl: string, timestamp: string): string {
  try {
    const url = new URL(baseUrl)
    const seconds = timestampToSeconds(timestamp)
    url.searchParams.set("t", `${seconds}s`)
    return url.toString()
  } catch {
    return baseUrl
  }
}
