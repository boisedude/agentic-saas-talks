import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Meet the Hosts",
  description: "Meet the hosts of Agentic SaaS Talks: technology leaders from AWS, Omnistrate, and AGLedger.ai exploring AI applications and agentic architectures.",
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "Meet the Hosts | Agentic SaaS Talks",
    description: "Meet the hosts of Agentic SaaS Talks - technology leaders and entrepreneurs exploring the future of AI and SaaS.",
    url: "https://agentic-saas-talks.com/hosts",
  },
  twitter: {
    images: [DEFAULT_TWITTER_IMAGE],
    title: "Meet the Hosts | Agentic SaaS Talks",
    description: "Meet the hosts of Agentic SaaS Talks - technology leaders and entrepreneurs exploring the future of AI and SaaS.",
  },
  alternates: {
    canonical: "https://agentic-saas-talks.com/hosts",
  },
}

export default function HostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
