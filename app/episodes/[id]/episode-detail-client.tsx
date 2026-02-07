"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  ExternalLink,
  PlayCircle,
  Users,
  Linkedin,
  Twitter,
  Link2,
  Check,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Episode } from "@/data/episodes"
import { ImageWithLoading } from "@/components/image-with-loading"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Breadcrumb } from "@/components/breadcrumb"
import {
  getBreadcrumbSchema,
  getVideoSchema,
  getWebPageSchema,
} from "@/lib/seo"
import { SITE_URL } from "@/lib/seo"
import { getYouTubeVideoId, formatDate, getTimestampUrl } from "@/lib/helpers"
import Link from "next/link"

interface EpisodeDetailClientProps {
  episode: Episode
}

function ShareButtons({ episode }: { episode: Episode }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${SITE_URL}/episodes/${episode.id}`
  const shareText = `Check out "${episode.title}" from Agentic SaaS Talks!`

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shareUrl])

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button size="icon" variant="ghost" className="h-9 w-9" asChild>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X/Twitter"
        >
          <Twitter className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
      <Button size="icon" variant="ghost" className="h-9 w-9" asChild>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9"
        onClick={handleCopyLink}
        aria-label={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}

export function EpisodeDetailClient({ episode }: EpisodeDetailClientProps) {
  const prefersReducedMotion = useReducedMotion()
  const videoId = getYouTubeVideoId(episode.videoUrl)
  const episodeUrl = `${SITE_URL}/episodes/${episode.id}`

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Episodes", url: `${SITE_URL}/episodes` },
    { name: `Episode ${episode.id}: ${episode.title}`, url: episodeUrl },
  ])

  const videoSchema = getVideoSchema(episode)

  const webPageSchema = getWebPageSchema({
    title: `Episode ${episode.id}: ${episode.title}`,
    description: episode.description,
    url: episodeUrl,
    datePublished: episode.date,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="min-h-screen">
        <ScrollToTop />

        <section className="relative overflow-hidden py-8 sm:py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />

          <div className="container relative mx-auto max-w-5xl px-3 sm:px-4">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Episodes", href: "/episodes" },
                { label: `Episode ${episode.id}` },
              ]}
            />

            {/* Back button */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Button variant="ghost" size="sm" asChild>
                <Link href="/episodes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Episodes
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-slate-500/20">
                <a
                  href={episode.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-full w-full"
                  aria-label={`Watch ${episode.title} on YouTube`}
                >
                  <ImageWithLoading
                    src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={episode.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="rounded-full bg-blue-500/30 p-6 backdrop-blur-sm transition-all group-hover:bg-blue-500/40 group-hover:scale-110">
                      <PlayCircle
                        className="h-16 w-16 text-white drop-shadow-lg"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Play video</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Title + Meta */}
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">{episode.duration}</Badge>
                  {episode.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                  Episode {episode.id}: {episode.title}
                </h1>

                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={episode.date}>
                      {formatDate(episode.date)}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{episode.duration}</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {episode.description}
                </p>
              </div>

              {/* CTA + Share */}
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a
                    href={episode.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${episode.title} on YouTube`}
                  >
                    <PlayCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Watch on YouTube
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
                <ShareButtons episode={episode} />
              </div>

              {/* Guests */}
              {episode.guests && episode.guests.length > 0 && (
                <Card className="border-2 border-slate-500/20 bg-background/50 p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <Users className="h-5 w-5" />
                    Special Guests
                  </h2>
                  <div className="space-y-4">
                    {episode.guests.map((guest, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-500/20 bg-slate-500/5 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold">{guest.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                              {guest.bio}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="shrink-0 h-10 w-10"
                            asChild
                          >
                            <a
                              href={guest.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${guest.name}'s LinkedIn profile`}
                            >
                              <Linkedin className="h-5 w-5 text-blue-500" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Timestamps */}
              {episode.timestamps && episode.timestamps.length > 0 && (
                <Card className="border-2 border-slate-500/20 bg-background/50 p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <Clock className="h-5 w-5" />
                    Timestamps
                  </h2>
                  <div className="space-y-1">
                    {episode.timestamps.map((timestamp, idx) => (
                      <a
                        key={idx}
                        href={getTimestampUrl(
                          episode.videoUrl,
                          timestamp.time
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-md p-2 -mx-2 text-sm transition-all duration-200 hover:bg-slate-500/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 min-h-[44px] sm:min-h-0"
                        aria-label={`Jump to ${timestamp.time}: ${timestamp.title}`}
                      >
                        <code className="shrink-0 rounded bg-slate-500/20 px-2 py-0.5 font-mono text-xs text-slate-400 group-hover:bg-slate-500/30 transition-colors">
                          {timestamp.time}
                        </code>
                        <span className="flex-1 leading-relaxed group-hover:underline decoration-slate-500/50 underline-offset-2">
                          {timestamp.title}
                        </span>
                        <ExternalLink
                          className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
