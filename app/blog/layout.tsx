import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications from the Agentic SaaS Talks team.",
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "Blog | Agentic SaaS Talks",
    description: "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: "https://agentic-saas-talks.com/blog",
  },
  twitter: {
    images: [DEFAULT_TWITTER_IMAGE],
    title: "Blog | Agentic SaaS Talks",
    description: "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications.",
  },
  alternates: {
    canonical: "https://agentic-saas-talks.com/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
