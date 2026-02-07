import { describe, it, expect } from "vitest"
import {
  getVideoSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
  getBlogPostSchema,
  getOrganizationSchema,
  getWebSiteSchema,
  getEpisodesListSchema,
} from "./seo"
import type { Episode } from "@/data/episodes"
import type { BlogPost } from "@/lib/blog"
import type { Host } from "@/data/hosts"

const mockEpisode: Episode = {
  id: 1,
  title: "Test Episode",
  description: "A test episode description.",
  date: "2025-01-15",
  videoUrl: "https://www.youtube.com/watch?v=abc123",
  duration: "57 min",
  tags: ["AI", "SaaS"],
  timestamps: [
    { time: "00:00", title: "Intro" },
    { time: "10:30", title: "Main Topic" },
  ],
  guests: [
    {
      name: "Test Guest",
      linkedIn: "https://www.linkedin.com/in/testguest/",
      bio: "A test guest.",
    },
  ],
}

const mockBlogPost: BlogPost = {
  slug: "test-post",
  title: "Test Blog Post",
  author: "Michael Cooper",
  date: "2025-01-15",
  readTime: "5 min",
  tags: ["AI", "SaaS"],
  excerpt: "A brief test excerpt.",
  content: "This is the full content of the test blog post with multiple words.",
}

const mockAuthor: Host = {
  name: "Michael Cooper",
  linkedIn: "https://www.linkedin.com/in/michaeldc/",
  bio: "Test bio",
  role: "Co-Host",
}

describe("getVideoSchema", () => {
  it("returns valid VideoObject schema", () => {
    const schema = getVideoSchema(mockEpisode)
    expect(schema["@type"]).toBe("VideoObject")
    expect(schema.name).toBe("Test Episode")
    expect(schema.description).toBe("A test episode description.")
    expect(schema.uploadDate).toBe("2025-01-15")
    expect(schema.duration).toBe("PT57M")
    expect(schema.contentUrl).toBe(mockEpisode.videoUrl)
    expect(schema.embedUrl).toContain("abc123")
  })

  it("includes thumbnail URLs", () => {
    const schema = getVideoSchema(mockEpisode)
    expect(schema.thumbnailUrl).toHaveLength(2)
    expect(schema.thumbnailUrl[0]).toContain("abc123")
  })
})

describe("getBreadcrumbSchema", () => {
  it("returns BreadcrumbList with correct positions", () => {
    const schema = getBreadcrumbSchema([
      { name: "Home", url: "https://example.com" },
      { name: "Blog", url: "https://example.com/blog" },
    ])
    expect(schema["@type"]).toBe("BreadcrumbList")
    expect(schema.itemListElement).toHaveLength(2)
    expect(schema.itemListElement[0].position).toBe(1)
    expect(schema.itemListElement[1].position).toBe(2)
    expect(schema.itemListElement[0].name).toBe("Home")
  })
})

describe("getWebPageSchema", () => {
  it("returns WebPage schema with required fields", () => {
    const schema = getWebPageSchema({
      title: "Test Page",
      description: "A test page.",
      url: "https://example.com/test",
      datePublished: "2025-01-01",
    })
    expect(schema["@type"]).toBe("WebPage")
    expect(schema.name).toBe("Test Page")
    expect(schema.url).toBe("https://example.com/test")
    expect(schema.datePublished).toBe("2025-01-01")
    expect(schema.dateModified).toBe("2025-01-01")
  })

  it("uses dateModified when provided", () => {
    const schema = getWebPageSchema({
      title: "Test",
      description: "Test",
      url: "https://example.com",
      datePublished: "2025-01-01",
      dateModified: "2025-06-01",
    })
    expect(schema.dateModified).toBe("2025-06-01")
  })
})

describe("getBlogPostSchema", () => {
  it("returns BlogPosting with author Person", () => {
    const schema = getBlogPostSchema(mockBlogPost, mockAuthor)
    expect(schema["@type"]).toBe("BlogPosting")
    expect(schema.headline).toBe("Test Blog Post")
    expect(schema.description).toBe("A brief test excerpt.")
    expect(schema.author["@type"]).toBe("Person")
    expect(schema.author.name).toBe("Michael Cooper")
    expect(schema.keywords).toBe("AI, SaaS")
    expect(schema.wordCount).toBeGreaterThan(0)
  })

  it("uses Organization author when no host provided", () => {
    const schema = getBlogPostSchema(mockBlogPost)
    expect(schema.author["@type"]).toBe("Organization")
    expect(schema.author.name).toBe("Agentic SaaS Talks")
  })

  it("includes mainEntityOfPage", () => {
    const schema = getBlogPostSchema(mockBlogPost, mockAuthor)
    expect(schema.mainEntityOfPage["@id"]).toContain("/blog/test-post")
  })
})

describe("getOrganizationSchema", () => {
  it("returns Organization type", () => {
    const schema = getOrganizationSchema()
    expect(schema["@type"]).toBe("Organization")
    expect(schema.name).toBe("Agentic SaaS Talks")
  })
})

describe("getWebSiteSchema", () => {
  it("returns WebSite type with search action", () => {
    const schema = getWebSiteSchema()
    expect(schema["@type"]).toBe("WebSite")
    expect(schema.potentialAction["@type"]).toBe("SearchAction")
  })
})

describe("getEpisodesListSchema", () => {
  it("returns ItemList with correct number of items", () => {
    const schema = getEpisodesListSchema([mockEpisode])
    expect(schema["@type"]).toBe("ItemList")
    expect(schema.itemListElement).toHaveLength(1)
    expect(schema.itemListElement[0].position).toBe(1)
  })
})
