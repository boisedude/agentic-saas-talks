import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Users, Linkedin, ExternalLink, Briefcase, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { hosts } from "@/data/hosts"
import { getAllBlogPosts } from "@/lib/blog"
import { getHostBySlug, slugify, formatDate } from "@/lib/helpers"
import { getBreadcrumbSchema, getPersonSchema } from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

interface HostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return hosts.map((host) => ({ slug: slugify(host.name) }))
}

export async function generateMetadata({ params }: HostPageProps): Promise<Metadata> {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) return { title: "Host Not Found" }

  const description = `${host.name}${host.role ? `, ${host.role}` : ""}${host.company ? ` at ${host.company}` : ""}, co-hosts Agentic SaaS Talks. ${host.bio}`

  return {
    title: host.name,
    description,
    alternates: { canonical: `${SITE_URL}/hosts/${slug}` },
    openGraph: {
      title: `${host.name} | Agentic SaaS Talks`,
      description,
      url: `${SITE_URL}/hosts/${slug}`,
      type: "profile",
      ...(host.photo ? { images: [{ url: `${SITE_URL}${host.photo}`, alt: host.name }] } : {}),
    },
  }
}

export default async function HostPage({ params }: HostPageProps) {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) notFound()

  const authoredPosts = getAllBlogPosts().filter((post) => post.author === host.name)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Hosts", url: `${SITE_URL}/hosts` },
    { name: host.name, url: `${SITE_URL}/hosts/${slug}` },
  ])
  const personSchema = getPersonSchema(host)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
          <div className="container relative mx-auto max-w-4xl px-3 sm:px-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Hosts", href: "/hosts" },
                { label: host.name },
              ]}
            />

            <div className="grid gap-8 sm:grid-cols-[200px_1fr] sm:items-start">
              {host.photo && (
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-500/10 to-background sm:mx-0">
                  <Image
                    src={host.photo}
                    alt={`${host.name} profile photo`}
                    fill
                    className="object-cover object-center"
                    sizes="200px"
                  />
                </div>
              )}
              <div>
                <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">{host.name}</h1>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-muted-foreground">
                  {host.role && (
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      {host.role}
                    </span>
                  )}
                  {host.company && (
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" aria-hidden="true" />
                      {host.companyUrl ? (
                        <a href={host.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                          {host.company}
                        </a>
                      ) : (
                        host.company
                      )}
                    </span>
                  )}
                </div>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{host.bio}</p>
                <Button asChild>
                  <a href={host.linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${host.name} on LinkedIn`}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                    <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto max-w-4xl px-3 sm:px-4 space-y-8">
            {host.expertise && host.expertise.length > 0 && (
              <Card className="border-2 border-slate-500/20 bg-background/50 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Lightbulb className="h-5 w-5" aria-hidden="true" />
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {host.expertise.map((area) => (
                    <Badge key={area} variant="outline">{area}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {authoredPosts.length > 0 && (
              <Card className="border-2 border-slate-500/20 bg-background/50 p-6">
                <h2 className="mb-4 text-xl font-bold">Articles by {host.name}</h2>
                <ul className="space-y-3">
                  {authoredPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group flex items-baseline justify-between gap-4">
                        <span className="font-medium group-hover:text-primary group-hover:underline">{post.title}</span>
                        <time dateTime={post.date} className="shrink-0 text-sm text-muted-foreground">
                          {formatDate(post.date)}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link href="/hosts">← All hosts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/episodes">Browse episodes</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
