import { Episode } from "@/data/episodes"
import type { BlogPost } from "@/lib/blog"
import type { Host } from "@/data/hosts"
import { getYouTubeVideoId, slugify } from "@/lib/helpers"
import { hosts } from "@/data/hosts"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION }

// Organization Schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Agentic SaaS Talks",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/logo.jpg`,
    "width": 800,
    "height": 600,
  },
  "description": SITE_DESCRIPTION,
  "knowsAbout": [
    "Agentic AI",
    "AI Agents",
    "Model Context Protocol",
    "SaaS Architecture",
    "Multi-Tenant Platforms",
    "Cloud Infrastructure",
    "Control Planes",
    "AI Product Development",
  ],
  "sponsor": {
    "@type": "Organization",
    "name": "Omnistrate",
    "url": "https://www.omnistrate.com",
  },
  "sameAs": [
    "https://www.youtube.com/@omnistrate",
    "https://www.linkedin.com/company/omnistrate",
  ],
})

// WebSite Schema
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "description": SITE_DESCRIPTION,
  "publisher": {
    "@type": "Organization",
    "name": "Omnistrate",
    "url": "https://www.omnistrate.com",
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/episodes?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
})

// VideoObject Schema for episodes
export const getVideoSchema = (episode: Episode) => {
  const videoId = getYouTubeVideoId(episode.videoUrl)

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": episode.title,
    "description": episode.description,
    "thumbnailUrl": [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ],
    "uploadDate": `${episode.date}T00:00:00Z`,
    "duration": convertDurationToISO8601(episode.duration),
    "contentUrl": episode.videoUrl,
    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
    "publisher": {
      "@type": "Organization",
      "name": "Omnistrate",
      "url": "https://www.omnistrate.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.jpg`,
      },
    },
    "keywords": episode.tags.join(", "),
  }
}

// ItemList Schema for episodes collection
export const getEpisodesListSchema = (episodes: Episode[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": episodes.map((episode, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "VideoObject",
      "name": episode.title,
      "url": `${SITE_URL}/episodes/${episode.id}`,
      "description": episode.description,
      "thumbnailUrl": `https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`,
      "uploadDate": `${episode.date}T00:00:00Z`,
    },
  })),
})

// Breadcrumb Schema
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
})

// FAQPage Schema
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
})

// Helper to convert duration string to ISO 8601 format
function convertDurationToISO8601(duration: string): string {
  // Input format: "57 min" or "1 hr 30 min"
  const matches = duration.match(/(\d+)\s*hr|(\d+)\s*min/)

  if (!matches) return "PT0M"

  const hours = matches[1] ? parseInt(matches[1]) : 0
  const minutes = matches[2] ? parseInt(matches[2]) : 0

  let result = "PT"
  if (hours > 0) result += `${hours}H`
  if (minutes > 0) result += `${minutes}M`

  return result
}

// WebPage Schema for individual pages
export const getWebPageSchema = (props: {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": props.title,
  "description": props.description,
  "url": props.url,
  "datePublished": props.datePublished,
  "dateModified": props.dateModified || props.datePublished,
  "publisher": {
    "@type": "Organization",
    "name": "Omnistrate",
    "url": "https://www.omnistrate.com",
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
  },
})

// BlogPosting Schema
export const getBlogPostSchema = (post: BlogPost, author?: Host) => {
  const wordCount = post.content.split(/\s+/).length

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": author
      ? {
          "@type": "Person",
          "name": author.name,
          "url": author.linkedIn,
        }
      : {
          "@type": "Organization",
          "name": "Agentic SaaS Talks",
          "url": SITE_URL,
        },
    "publisher": {
      "@type": "Organization",
      "name": "Omnistrate",
      "url": "https://www.omnistrate.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.jpg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    ...(post.featuredImage
      ? {
          image: {
            "@type": "ImageObject",
            url: post.featuredImage.startsWith("http")
              ? post.featuredImage
              : `${SITE_URL}${post.featuredImage}`,
          },
        }
      : {}),
    "keywords": post.tags.join(", "),
    "wordCount": wordCount,
  }
}

// VideoSeries Schema
export const getVideoSeriesSchema = (episodes: Episode[]) => ({
  "@context": "https://schema.org",
  "@type": "VideoSeries",
  "name": SITE_NAME,
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "numberOfEpisodes": episodes.length,
  "publisher": {
    "@type": "Organization",
    "name": "Omnistrate",
    "url": "https://www.omnistrate.com",
  },
  "episode": episodes.map((episode) => ({
    "@type": "VideoObject",
    "name": episode.title,
    "description": episode.description,
    "url": `${SITE_URL}/episodes/${episode.id}`,
    "thumbnailUrl": `https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`,
    "uploadDate": `${episode.date}T00:00:00Z`,
    "episodeNumber": episode.id,
  })),
})

// Person Schema for hosts.
// `id` lets other schema nodes (PodcastSeries author, episode actors) reference
// the canonical host entity on its own detail page instead of duplicating it.
export const getPersonSchema = (host: Host, withId = true) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  ...(withId ? { "@id": `${SITE_URL}/hosts/${slugify(host.name)}#person` } : {}),
  "name": host.name,
  "url": `${SITE_URL}/hosts/${slugify(host.name)}`,
  "description": host.bio,
  ...(host.role ? { "jobTitle": host.role } : {}),
  ...(host.photo ? { "image": `${SITE_URL}${host.photo}` } : {}),
  ...(host.expertise && host.expertise.length > 0 ? { "knowsAbout": host.expertise } : {}),
  ...(host.company ? {
    "worksFor": {
      "@type": "Organization",
      "name": host.company,
      ...(host.companyUrl ? { "url": host.companyUrl } : {}),
    },
  } : {}),
  "sameAs": [host.linkedIn],
})

// PodcastSeries Schema
export const getPodcastSeriesSchema = (episodes: Episode[]) => ({
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": SITE_NAME,
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "webFeed": `${SITE_URL}/feed.xml`,
  "numberOfEpisodes": episodes.length,
  "author": hosts.map((host) => ({
    "@type": "Person",
    "@id": `${SITE_URL}/hosts/${slugify(host.name)}#person`,
    "name": host.name,
    "url": `${SITE_URL}/hosts/${slugify(host.name)}`,
    ...(host.role ? { "jobTitle": host.role } : {}),
    ...(host.photo ? { "image": `${SITE_URL}${host.photo}` } : {}),
    "sameAs": [host.linkedIn],
  })),
})

// ItemList of blog posts for the /blog listing page
export const getBlogListingSchema = (posts: BlogPost[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": posts.map((post, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${SITE_URL}/blog/${post.slug}`,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author },
      ...(post.featuredImage
        ? {
            "image": post.featuredImage.startsWith("http")
              ? post.featuredImage
              : `${SITE_URL}${post.featuredImage}`,
          }
        : {}),
    },
  })),
})

// CollectionPage schema for topic / guest / author archive pages, wrapping an
// ItemList of episodes so AI engines see the page as an organized collection.
export const getCollectionPageSchema = (props: {
  title: string
  description: string
  url: string
  episodes: Episode[]
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": props.title,
  "description": props.description,
  "url": props.url,
  "isPartOf": {
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": props.episodes.length,
    "itemListElement": props.episodes.map((episode, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "VideoObject",
        "name": episode.title,
        "url": `${SITE_URL}/episodes/${episode.id}`,
        "description": episode.description,
        "thumbnailUrl": `https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`,
        "uploadDate": `${episode.date}T00:00:00Z`,
      },
    })),
  },
})

// Per-episode FAQPage — synthesized from episode data into answer-first Q&A,
// the format AI answer engines cite most readily (GEO).
export const getEpisodeFAQSchema = (episode: Episode) => {
  const guestNames = episode.guests?.map((g) => g.name) ?? []
  const faqs: { question: string; answer: string }[] = [
    {
      question: `What is Episode ${episode.id} of Agentic SaaS Talks about?`,
      answer: episode.description,
    },
    {
      question: `What topics does Episode ${episode.id} cover?`,
      answer: `Episode ${episode.id} covers ${episode.tags.join(", ")}.`,
    },
    {
      question: `How long is Episode ${episode.id} of Agentic SaaS Talks?`,
      answer: `Episode ${episode.id}, "${episode.title}", runs ${episode.duration} and was published on ${episode.date}.`,
    },
  ]
  if (guestNames.length > 0) {
    faqs.push({
      question: `Who is featured in Episode ${episode.id}?`,
      answer: `Episode ${episode.id} features ${guestNames.join(", ")}${
        guestNames.length === 1 ? " as a guest" : " as guests"
      }, in conversation with the Agentic SaaS Talks hosts.`,
    })
  }
  return getFAQSchema(faqs)
}

// PodcastEpisode Schema
export const getPodcastEpisodeSchema = (episode: Episode) => ({
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "name": episode.title,
  "description": episode.description,
  "datePublished": episode.date,
  "url": `${SITE_URL}/episodes/${episode.id}`,
  "duration": convertDurationToISO8601(episode.duration),
  "episodeNumber": episode.id,
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": SITE_NAME,
    "url": SITE_URL,
  },
})
