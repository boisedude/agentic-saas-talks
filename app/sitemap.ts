import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { episodes } from "@/data/episodes"
import { hosts } from "@/data/hosts"
import { getAllTags, getAllGuests, slugify, getYouTubeVideoId } from "@/lib/helpers"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agentic-saas-talks.com"
  const latestEpisodeDate = episodes
    .map((e) => new Date(e.date).getTime())
    .reduce((a, b) => Math.max(a, b), 0)
  const lastSiteUpdate = latestEpisodeDate ? new Date(latestEpisodeDate) : new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lastSiteUpdate, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/episodes`, lastModified: lastSiteUpdate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/topics`, lastModified: lastSiteUpdate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/guests`, lastModified: lastSiteUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/hosts`, lastModified: lastSiteUpdate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: lastSiteUpdate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: lastSiteUpdate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: lastSiteUpdate, changeFrequency: "yearly", priority: 0.3 },
  ]

  // Episodes — include the YouTube thumbnail as an image sitemap entry.
  const episodeEntries: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${baseUrl}/episodes/${episode.id}`,
    lastModified: new Date(episode.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`],
  }))

  // Topic archive pages
  const topicEntries: MetadataRoute.Sitemap = getAllTags().map(({ slug }) => ({
    url: `${baseUrl}/topics/${slug}`,
    lastModified: lastSiteUpdate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Host profile pages — include the host photo.
  const hostEntries: MetadataRoute.Sitemap = hosts.map((host) => ({
    url: `${baseUrl}/hosts/${slugify(host.name)}`,
    lastModified: lastSiteUpdate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    ...(host.photo ? { images: [`${baseUrl}${host.photo}`] } : {}),
  }))

  // Guest profile pages
  const guestEntries: MetadataRoute.Sitemap = getAllGuests().map(({ slug, episodes }) => ({
    url: `${baseUrl}/guests/${slug}`,
    lastModified: new Date(
      episodes.map((e) => new Date(e.date).getTime()).reduce((a, b) => Math.max(a, b), 0)
    ),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  // Blog posts
  const blogPosts = getAllBlogPosts()
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(post.featuredImage
      ? {
          images: [
            post.featuredImage.startsWith("http")
              ? post.featuredImage
              : `${baseUrl}${post.featuredImage}`,
          ],
        }
      : {}),
  }))

  return [
    ...staticPages,
    ...episodeEntries,
    ...topicEntries,
    ...hostEntries,
    ...guestEntries,
    ...blogEntries,
  ]
}
