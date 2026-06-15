import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mic, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { EpisodeGrid } from "@/components/episode-grid"
import { getAllGuests, getGuestBySlug } from "@/lib/helpers"
import { getBreadcrumbSchema, getCollectionPageSchema } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

interface GuestPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllGuests().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: GuestPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getGuestBySlug(slug)
  if (!entry) return { title: "Guest Not Found" }

  const { guest, episodes } = entry
  const description = `${guest.name} on Agentic SaaS Talks. ${guest.bio} Featured in ${episodes.length} episode${episodes.length !== 1 ? "s" : ""}.`

  return {
    title: guest.name,
    description,
    alternates: { canonical: `${SITE_URL}/guests/${slug}` },
    openGraph: {
      title: `${guest.name} | Agentic SaaS Talks`,
      description,
      url: `${SITE_URL}/guests/${slug}`,
      type: "profile",
    },
  }
}

export default async function GuestPage({ params }: GuestPageProps) {
  const { slug } = await params
  const entry = getGuestBySlug(slug)
  if (!entry) notFound()

  const { guest, episodes } = entry
  const url = `${SITE_URL}/guests/${slug}`
  const description = `${guest.name} has appeared on ${episodes.length} Agentic SaaS Talks episode${episodes.length !== 1 ? "s" : ""}.`

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Guests", url: `${SITE_URL}/guests` },
    { name: guest.name, url },
  ])
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": guest.name,
    "url": url,
    "description": guest.bio,
    "sameAs": [guest.linkedIn],
  }
  const collectionSchema = getCollectionPageSchema({
    title: `Episodes featuring ${guest.name}`,
    description,
    url,
    episodes,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
          <div className="container relative mx-auto max-w-4xl px-3 sm:px-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Guests", href: "/guests" },
                { label: guest.name },
              ]}
            />
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
              <Mic className="mr-2 h-4 w-4" aria-hidden="true" />
              Guest
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{guest.name}</h1>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{guest.bio}</p>
            <Button asChild>
              <a href={guest.linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`View ${guest.name}'s LinkedIn profile`}>
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
                <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="mb-8 text-2xl font-bold">
              Episodes featuring {guest.name}
            </h2>
            <EpisodeGrid episodes={episodes} />
            <div className="mt-12 text-center">
              <Link href="/guests" className="text-primary hover:underline">
                ← All guests
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
