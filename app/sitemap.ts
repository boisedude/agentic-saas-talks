import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { episodes } from "@/data/episodes"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agentic-saas-talks.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/episodes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hosts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Generate sitemap entries for all episodes
  const episodeEntries: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${baseUrl}/episodes/${episode.id}`,
    lastModified: new Date(episode.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Generate sitemap entries for all blog posts
  const blogPosts = getAllBlogPosts()
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...episodeEntries, ...blogEntries]
}
