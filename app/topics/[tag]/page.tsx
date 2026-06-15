import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { EpisodeGrid } from "@/components/episode-grid"
import { getAllTags, getTagBySlug, getEpisodesByTag } from "@/lib/helpers"
import {
  getBreadcrumbSchema,
  getCollectionPageSchema,
} from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

interface TopicPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) return { title: "Topic Not Found" }

  const count = getEpisodesByTag(tag).length
  const description = `All ${count} Agentic SaaS Talks episode${count !== 1 ? "s" : ""} about ${tag} — deep technical discussions on ${tag} with industry experts, founders, and technologists.`

  return {
    title: `${tag} Episodes`,
    description,
    alternates: { canonical: `${SITE_URL}/topics/${slug}` },
    openGraph: {
      title: `${tag} | Agentic SaaS Talks`,
      description,
      url: `${SITE_URL}/topics/${slug}`,
    },
    twitter: {
      title: `${tag} | Agentic SaaS Talks`,
      description,
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) notFound()

  const episodes = getEpisodesByTag(tag)
  const url = `${SITE_URL}/topics/${slug}`
  const description = `All ${episodes.length} Agentic SaaS Talks episode${episodes.length !== 1 ? "s" : ""} about ${tag}.`

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Topics", url: `${SITE_URL}/topics` },
    { name: tag, url },
  ])
  const collectionSchema = getCollectionPageSchema({
    title: `${tag} Episodes`,
    description,
    url,
    episodes,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
          <div className="container relative mx-auto px-3 sm:px-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Topics", href: "/topics" },
                { label: tag },
              ]}
            />
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
                <Tag className="mr-2 h-4 w-4" aria-hidden="true" />
                Topic
              </Badge>
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                {tag}
              </h1>
              <p className="mb-2 text-xl text-muted-foreground md:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="sr-only">{tag} episodes</h2>
            <EpisodeGrid episodes={episodes} />
            <div className="mt-12 text-center">
              <Link href="/topics" className="text-primary hover:underline">
                ← Browse all topics
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
