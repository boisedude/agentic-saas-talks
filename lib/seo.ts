import { Episode } from "@/data/episodes"
import type { BlogPost } from "@/lib/blog"
import type { Host } from "@/data/hosts"
import { getYouTubeVideoId } from "@/lib/helpers"

export const SITE_URL = "https://agentic-saas-talks.com"
export const SITE_NAME = "Agentic SaaS Talks"
export const SITE_DESCRIPTION = "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms. Deep dives into AI, SaaS, and intelligent systems with industry experts."

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
  "founder": {
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
    "uploadDate": episode.date,
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
      "uploadDate": episode.date,
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
    "uploadDate": episode.date,
    "episodeNumber": episode.id,
  })),
})
