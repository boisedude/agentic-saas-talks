import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Episodes",
  description: "Browse all 17 episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, Model Context Protocol, AI agents, and the future of intelligent applications with industry experts from AWS, Omnistrate, and leading tech companies.",
  keywords: [
    "Agentic SaaS episodes",
    "AI webcast archive",
    "SaaS podcast",
    "AI architecture videos",
    "Tech webcast series",
    "Cloud computing talks",
    "AI agent discussions",
    "MCP tutorials",
  ],
  openGraph: {
    title: "All Episodes - Agentic SaaS Talks",
    description: "Browse all 17 episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: "https://agentic-saas-talks.com/episodes",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Agentic SaaS Talks Episodes Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Episodes - Agentic SaaS Talks",
    description: "Browse all 17 episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: "https://agentic-saas-talks.com/episodes",
  },
}
