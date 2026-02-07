import { episodes } from '../data/episodes'

interface ValidationError {
  episodeId: number
  field: string
  message: string
}

function validateEpisodes(): ValidationError[] {
  const errors: ValidationError[] = []
  const ids = new Set<number>()
  const urls = new Set<string>()

  for (const ep of episodes) {
    // Check for duplicate IDs
    if (ids.has(ep.id)) {
      errors.push({ episodeId: ep.id, field: 'id', message: `Duplicate episode ID: ${ep.id}` })
    }
    ids.add(ep.id)

    // Check for duplicate URLs
    if (urls.has(ep.videoUrl)) {
      errors.push({ episodeId: ep.id, field: 'videoUrl', message: `Duplicate video URL: ${ep.videoUrl}` })
    }
    urls.add(ep.videoUrl)

    // Required fields
    if (!ep.title?.trim()) {
      errors.push({ episodeId: ep.id, field: 'title', message: 'Missing title' })
    }
    if (!ep.description?.trim()) {
      errors.push({ episodeId: ep.id, field: 'description', message: 'Missing description' })
    }
    if (!ep.date?.trim()) {
      errors.push({ episodeId: ep.id, field: 'date', message: 'Missing date' })
    }
    if (!ep.videoUrl?.trim()) {
      errors.push({ episodeId: ep.id, field: 'videoUrl', message: 'Missing videoUrl' })
    }
    if (!ep.duration?.trim()) {
      errors.push({ episodeId: ep.id, field: 'duration', message: 'Missing duration' })
    }
    if (!ep.tags || ep.tags.length === 0) {
      errors.push({ episodeId: ep.id, field: 'tags', message: 'Missing tags' })
    }

    // Date format: YYYY-MM-DD
    if (ep.date && !/^\d{4}-\d{2}-\d{2}$/.test(ep.date)) {
      errors.push({ episodeId: ep.id, field: 'date', message: `Invalid date format "${ep.date}" (expected YYYY-MM-DD)` })
    }

    // Video URL format
    if (ep.videoUrl && !ep.videoUrl.startsWith('https://www.youtube.com/watch?v=')) {
      errors.push({ episodeId: ep.id, field: 'videoUrl', message: `Invalid YouTube URL format: ${ep.videoUrl}` })
    }

    // Duration format: "X min"
    if (ep.duration && !/^\d+ min$/.test(ep.duration)) {
      errors.push({ episodeId: ep.id, field: 'duration', message: `Unexpected duration format "${ep.duration}" (expected "X min")` })
    }

    // Timestamp validation
    if (ep.timestamps) {
      for (const ts of ep.timestamps) {
        if (!ts.time || !ts.title?.trim()) {
          errors.push({ episodeId: ep.id, field: 'timestamps', message: `Invalid timestamp entry: ${JSON.stringify(ts)}` })
        }
        if (ts.time && !/^\d{1,2}:\d{2}(:\d{2})?$/.test(ts.time)) {
          errors.push({ episodeId: ep.id, field: 'timestamps', message: `Invalid timestamp format "${ts.time}" (expected H:MM or H:MM:SS)` })
        }
      }
    }

    // Guest validation
    if (ep.guests) {
      for (const guest of ep.guests) {
        if (!guest.name?.trim()) {
          errors.push({ episodeId: ep.id, field: 'guests', message: 'Guest missing name' })
        }
        if (!guest.linkedIn?.trim()) {
          errors.push({ episodeId: ep.id, field: 'guests', message: `Guest "${guest.name}" missing LinkedIn URL` })
        }
        if (guest.linkedIn && !guest.linkedIn.endsWith('/')) {
          errors.push({ episodeId: ep.id, field: 'guests', message: `Guest "${guest.name}" LinkedIn URL missing trailing slash` })
        }
        if (!guest.bio?.trim()) {
          errors.push({ episodeId: ep.id, field: 'guests', message: `Guest "${guest.name}" missing bio` })
        }
      }
    }
  }

  // Check ordering (should be newest first)
  for (let i = 1; i < episodes.length; i++) {
    if (episodes[i].date > episodes[i - 1].date) {
      errors.push({
        episodeId: episodes[i].id,
        field: 'date',
        message: `Episode ${episodes[i].id} (${episodes[i].date}) is newer than previous episode ${episodes[i - 1].id} (${episodes[i - 1].date}) — array should be newest first`,
      })
    }
  }

  return errors
}

// Run validation
const errors = validateEpisodes()

if (errors.length === 0) {
  console.log(`\u2713 All ${episodes.length} episodes are valid`)
  console.log(`  Highest ID: ${Math.max(...episodes.map(e => e.id))}`)
  console.log(`  Next ID: ${Math.max(...episodes.map(e => e.id)) + 1}`)
  console.log(`  Date range: ${episodes[episodes.length - 1].date} to ${episodes[0].date}`)
} else {
  console.error(`\u2717 Found ${errors.length} validation error(s):\n`)
  for (const err of errors) {
    console.error(`  Episode ${err.episodeId} [${err.field}]: ${err.message}`)
  }
  process.exit(1)
}
