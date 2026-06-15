import type { Metadata } from "next"
import Link from "next/link"
import { Mic, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { getAllGuests } from "@/lib/helpers"
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Guests",
  description:
    "Meet the founders, engineers, and industry experts who have appeared as guests on Agentic SaaS Talks to discuss agentic AI, SaaS architecture, and cloud infrastructure.",
  alternates: { canonical: `${SITE_URL}/guests` },
  openGraph: {
    title: "Guests | Agentic SaaS Talks",
    description: "Founders and experts featured on Agentic SaaS Talks.",
    url: `${SITE_URL}/guests`,
  },
}

export default function GuestsPage() {
  const guests = getAllGuests()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Guests", url: `${SITE_URL}/guests` },
  ])
  const webPageSchema = getWebPageSchema({
    title: "Guests | Agentic SaaS Talks",
    description: "Founders, engineers, and experts featured on Agentic SaaS Talks.",
    url: `${SITE_URL}/guests`,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
          <div className="container relative mx-auto px-3 sm:px-4">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guests" }]} />
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
                <Mic className="mr-2 h-4 w-4" aria-hidden="true" />
                Guests
              </Badge>
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Featured Guests
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
                {guests.length} founders, engineers, and experts who have joined the conversation
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="sr-only">All guests</h2>
            {guests.length === 0 ? (
              <p className="text-center text-muted-foreground">No guests yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {guests.map(({ guest, slug, episodes }) => (
                  <Link key={slug} href={`/guests/${slug}`} className="block h-full">
                    <Card className="h-full border-2 border-slate-500/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/20 hover:-translate-y-0.5">
                      <h3 className="mb-1 text-lg font-bold leading-tight">{guest.name}</h3>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{guest.bio}</p>
                      <span className="flex items-center gap-1 text-sm text-primary">
                        {episodes.length} episode{episodes.length !== 1 ? "s" : ""}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
