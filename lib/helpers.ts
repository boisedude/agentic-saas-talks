import { hosts } from "@/data/hosts"

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
