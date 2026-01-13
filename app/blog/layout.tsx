import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications from the Agentic SaaS Talks team.",
  openGraph: {
    title: "Blog | Agentic SaaS Talks",
    description: "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: "https://agentic-saas-talks.com/blog",
  },
  twitter: {
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
