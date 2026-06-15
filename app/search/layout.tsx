import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Agentic SaaS Talks episodes and articles by keyword, topic, guest, or host.",
  alternates: { canonical: `${SITE_URL}/search` },
  // Search results pages carry no standalone value for indexes and can create
  // near-duplicate/thin pages — keep them out of the index but let crawlers
  // follow the links through to the canonical episode/blog pages.
  robots: { index: false, follow: true },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
