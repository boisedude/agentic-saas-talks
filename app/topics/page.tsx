import type { Metadata } from "next"
import Link from "next/link"
import { Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { getAllTags } from "@/lib/helpers"
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse Agentic SaaS Talks episodes by topic — agentic AI, SaaS architecture, control planes, Model Context Protocol, cloud infrastructure, and more.",
  alternates: { canonical: `${SITE_URL}/topics` },
  openGraph: {
    title: "Topics | Agentic SaaS Talks",
    description: "Browse episodes by topic across the Agentic SaaS Talks catalog.",
    url: `${SITE_URL}/topics`,
  },
}

export default function TopicsPage() {
  const tags = getAllTags()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Topics", url: `${SITE_URL}/topics` },
  ])
  const webPageSchema = getWebPageSchema({
    title: "Topics | Agentic SaaS Talks",
    description:
      "Browse Agentic SaaS Talks episodes by topic across the full catalog.",
    url: `${SITE_URL}/topics`,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
          <div className="container relative mx-auto px-3 sm:px-4">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Topics" }]} />
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
                <Tag className="mr-2 h-4 w-4" aria-hidden="true" />
                Topics
              </Badge>
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Browse by Topic
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
                Explore the Agentic SaaS Talks catalog by subject — {tags.length} topics across every episode
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="sr-only">All topics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map(({ tag, slug, count }) => (
                <Link key={slug} href={`/topics/${slug}`} className="block">
                  <Card className="flex items-center justify-between border-2 border-slate-500/20 bg-background/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/20 hover:-translate-y-0.5">
                    <span className="flex items-center gap-3 font-semibold">
                      <Tag className="h-4 w-4 text-blue-400" aria-hidden="true" />
                      {tag}
                    </span>
                    <Badge variant="outline">{count}</Badge>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
