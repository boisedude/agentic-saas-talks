import { describe, it, expect } from "vitest"
import {
  getYouTubeVideoId,
  formatDate,
  timestampToSeconds,
  getTimestampUrl,
  getAuthorInfo,
} from "./helpers"

describe("getYouTubeVideoId", () => {
  it("extracts video ID from standard YouTube URL", () => {
    expect(
      getYouTubeVideoId("https://www.youtube.com/watch?v=abc123")
    ).toBe("abc123")
  })

  it("extracts video ID with extra query params", () => {
    expect(
      getYouTubeVideoId(
        "https://www.youtube.com/watch?v=abc123&t=120s"
      )
    ).toBe("abc123")
  })

  it("returns empty string for invalid URL", () => {
    expect(getYouTubeVideoId("not-a-url")).toBe("")
  })

  it("returns empty string when no v param exists", () => {
    expect(
      getYouTubeVideoId("https://www.youtube.com/watch")
    ).toBe("")
  })
})

describe("formatDate", () => {
  it("formats a valid ISO date string", () => {
    const result = formatDate("2025-01-15")
    // Date parsing may shift by timezone, so just check it contains year and a month name
    expect(result).toMatch(/January|February/)
    expect(result).toContain("2025")
  })

  it("returns original string for invalid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date")
  })

  it("returns a formatted date with month name", () => {
    const result = formatDate("2024-06-15")
    expect(result).toMatch(/\w+ \d{1,2}, \d{4}/)
  })
})

describe("timestampToSeconds", () => {
  it("converts mm:ss format", () => {
    expect(timestampToSeconds("05:30")).toBe(330)
  })

  it("converts h:mm:ss format", () => {
    expect(timestampToSeconds("1:05:30")).toBe(3930)
  })

  it("converts 00:00 to 0", () => {
    expect(timestampToSeconds("00:00")).toBe(0)
  })

  it("returns 0 for invalid format", () => {
    expect(timestampToSeconds("abc")).toBe(0)
  })

  it("returns 0 for empty string", () => {
    expect(timestampToSeconds("")).toBe(0)
  })
})

describe("getTimestampUrl", () => {
  it("appends timestamp in seconds to YouTube URL", () => {
    const result = getTimestampUrl(
      "https://www.youtube.com/watch?v=abc123",
      "05:30"
    )
    expect(result).toContain("t=330s")
    expect(result).toContain("v=abc123")
  })

  it("handles 00:00 timestamp", () => {
    const result = getTimestampUrl(
      "https://www.youtube.com/watch?v=abc123",
      "00:00"
    )
    expect(result).toContain("t=0s")
  })

  it("returns base URL for invalid URL", () => {
    const result = getTimestampUrl("not-a-url", "05:30")
    expect(result).toBe("not-a-url")
  })
})

describe("getAuthorInfo", () => {
  it("returns host info for known author", () => {
    const author = getAuthorInfo("Michael Cooper")
    expect(author).toBeDefined()
    expect(author?.name).toBe("Michael Cooper")
    expect(author?.linkedIn).toContain("linkedin.com")
  })

  it("returns undefined for unknown author", () => {
    expect(getAuthorInfo("Unknown Person")).toBeUndefined()
  })
})
