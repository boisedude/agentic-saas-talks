import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet the Hosts",
  description: "Meet the hosts of Agentic SaaS Talks - technology leaders from AWS, Omnistrate, and the SaaS community exploring the future of AI applications and agentic architectures.",
  openGraph: {
    title: "Meet the Hosts | Agentic SaaS Talks",
    description: "Meet the hosts of Agentic SaaS Talks - technology leaders and entrepreneurs exploring the future of AI and SaaS.",
    url: "https://agentic-saas-talks.com/hosts",
  },
  twitter: {
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
