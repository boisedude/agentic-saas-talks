import type { Metadata } from "next"
import { EPISODE_COUNT, DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Episode Archive",
  description: `Browse all ${EPISODE_COUNT} episodes of Agentic SaaS Talks on AI architecture, SaaS platforms, and agentic systems, with experts from AWS, Confluent, Anyscale, and more.`,
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "Episode Archive | Agentic SaaS Talks",
    description: "Browse all episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: "https://agentic-saas-talks.com/episodes",
  },
  twitter: {
    images: [DEFAULT_TWITTER_IMAGE],
    title: "Episode Archive | Agentic SaaS Talks",
    description: "Browse all episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
  },
  alternates: {
    canonical: "https://agentic-saas-talks.com/episodes",
  },
}

export default function EpisodesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
