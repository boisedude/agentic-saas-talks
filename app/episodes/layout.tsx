import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Episode Archive",
  description: "Browse all 23+ episodes of Agentic SaaS Talks covering AI architecture, SaaS platforms, control planes, agentic systems, and interviews with industry experts from AWS, Confluent, Anyscale, and more.",
  openGraph: {
    title: "Episode Archive | Agentic SaaS Talks",
    description: "Browse all episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: "https://agentic-saas-talks.com/episodes",
  },
  twitter: {
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
