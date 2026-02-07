"use client"

import { useMemo, useState, Suspense, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Video, Calendar, Clock, ExternalLink, PlayCircle, Users, Linkedin, ChevronDown, Filter, Search, Twitter, Link2, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { episodes, type Episode } from "@/data/episodes"
import { ImageWithLoading } from "@/components/image-with-loading"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Breadcrumb } from "@/components/breadcrumb"
import { getBreadcrumbSchema, getEpisodesListSchema, getWebPageSchema } from "@/lib/seo"
import { getYouTubeVideoId, formatDate, getTimestampUrl } from "@/lib/helpers"
import { EXTERNAL_LINKS } from "@/lib/constants"

// Social sharing component
function ShareButtons({ episode }: { episode: Episode }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = episode.videoUrl
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
      <span className="text-xs text-muted-foreground mr-1">Share:</span>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9"
        asChild
      >
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X/Twitter"
        >
          <Twitter className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9"
        asChild
      >
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

// Generate structured data for SEO
const generateVideoSchema = (episode: Episode) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": episode.title,
    "description": episode.description,
    "thumbnailUrl": `https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`,
    "uploadDate": episode.date,
    "duration": `PT${episode.duration.replace(' min', 'M')}`,
    "contentUrl": episode.videoUrl,
    "embedUrl": episode.videoUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Agentic SaaS Talks",
      "url": "https://agentic-saas-talks.com"
    },
  }
}

function EpisodesPageContent() {
  const prefersReducedMotion = useReducedMotion()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Use URL as source of truth for selected tag and search
  const selectedTag = searchParams.get('tag')
  const searchQuery = searchParams.get('q') || ''
  const [isFilterExpanded, setIsFilterExpanded] = useState(!!selectedTag || !!searchQuery)

  // Update URL when tag changes
  const handleTagChange = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag) {
      params.set('tag', tag)
      setIsFilterExpanded(true)
    } else {
      params.delete('tag')
    }
    router.push(`/episodes${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
  }

  // Update URL when search query changes
  const handleSearchChange = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    router.push(`/episodes${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
  }, [router, searchParams])

  // Extract all unique tags from episodes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    episodes.forEach((episode) => {
      episode.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [])

  // Calculate episode count per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    episodes.forEach((episode) => {
      episode.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return counts
  }, [])

  // Sort episodes by date (newest first) and filter by selected tag and search query
  const filteredEpisodes = useMemo(() => {
    const sorted = [...episodes].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    let filtered = sorted

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((episode) => episode.tags.includes(selectedTag))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((episode) =>
        episode.title.toLowerCase().includes(query) ||
        episode.description.toLowerCase().includes(query) ||
        episode.tags.some(tag => tag.toLowerCase().includes(query)) ||
        episode.guests?.some(guest => guest.name.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [selectedTag, searchQuery])

  // Generate structured data - memoized for performance
  const structuredData = useMemo(() => ({
    breadcrumbSchema: getBreadcrumbSchema([
      { name: "Home", url: "https://agentic-saas-talks.com" },
      { name: "Episodes", url: "https://agentic-saas-talks.com/episodes" },
    ]),
    episodesListSchema: getEpisodesListSchema(episodes),
    webPageSchema: getWebPageSchema({
      title: "All Episodes - Agentic SaaS Talks",
      description: "Browse all episodes of Agentic SaaS Talks. Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications.",
      url: "https://agentic-saas-talks.com/episodes",
      datePublished: episodes[episodes.length - 1]?.date ?? new Date().toISOString(),
      dateModified: episodes[0]?.date ?? new Date().toISOString(),
    }),
  }), [])

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.episodesListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.webPageSchema),
        }}
      />

      <div className="min-h-screen">
        <ScrollToTop />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />

        <div className="container relative mx-auto px-3 sm:px-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Episodes" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
              <Video className="mr-2 h-4 w-4" aria-hidden="true" />
              All Episodes
            </Badge>
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Episode Archive
            </h1>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Deep dives into agentic AI, SaaS architecture, and the future of intelligent applications
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Video className="h-5 w-5" />
              <span>{episodes.length} Episodes Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mb-12"
          >
            {/* Search and Filter Toggle */}
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search episodes..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-11"
                  aria-label="Search episodes"
                />
              </div>

              {/* Filter Toggle Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="flex items-center gap-2 h-11 min-w-[44px]"
                aria-expanded={isFilterExpanded}
                aria-controls="filter-section"
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span className="font-semibold">
                  {isFilterExpanded ? "Hide Filters" : "Filter by Topic"}
                </span>
                {selectedTag && !isFilterExpanded && (
                  <Badge variant="default" className="ml-1">
                    {selectedTag}
                  </Badge>
                )}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </Button>
            </div>

            {/* Collapsible Filter Content */}
            <AnimatePresence initial={false}>
              {isFilterExpanded && (
                <motion.div
                  id="filter-section"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className="rounded-lg border border-slate-500/20 bg-slate-500/5 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-muted-foreground">Filter by topic:</span>
                      <Button
                        variant={selectedTag === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTagChange(null)}
                      >
                        All Episodes ({episodes.length})
                      </Button>
                      {allTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleTagChange(tag)}
                        >
                          {tag} ({tagCounts[tag]})
                        </Button>
                      ))}
                    </div>
                    {(selectedTag || searchQuery) && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <span>
                          Showing {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
                          {searchQuery && ` matching "${searchQuery}"`}
                          {selectedTag && searchQuery && ' and'}
                          {selectedTag && ` tagged with "${selectedTag}"`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleTagChange(null)
                            handleSearchChange('')
                          }}
                          className="h-auto p-1 text-primary hover:text-primary/80"
                        >
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter Active Indicator (when collapsed) */}
            {!isFilterExpanded && (selectedTag || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="mt-2 flex items-center gap-2 text-sm text-muted-foreground flex-wrap"
              >
                <span>
                  Showing {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
                  {searchQuery && ` matching "${searchQuery}"`}
                  {selectedTag && searchQuery && ' and'}
                  {selectedTag && ` tagged with "${selectedTag}"`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleTagChange(null)
                    handleSearchChange('')
                  }}
                  className="h-auto p-1 text-primary hover:text-primary/80"
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Episodes List */}
          <h2 className="sr-only">Episodes</h2>
          {filteredEpisodes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-center py-12"
            >
              <Video className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No episodes found</h3>
              <p className="text-muted-foreground mb-4">
                No episodes match the selected filter.
              </p>
              <Button variant="outline" onClick={() => handleTagChange(null)}>
                Clear filter
              </Button>
            </motion.div>
          ) : (
          <div className="space-y-8">
            {filteredEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.5) }}
              >
                <Card className="overflow-hidden border-2 border-slate-500/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-1">
                  <div className="grid md:grid-cols-[400px_1fr] gap-6">
                    {/* Video Thumbnail - Compact Left Column */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-slate-500/20">
                      <a
                        href={episode.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block h-full w-full"
                        aria-label={`Watch ${episode.title} on YouTube`}
                      >
                        {/* YouTube Thumbnail */}
                        <ImageWithLoading
                          src={`https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`}
                          alt={episode.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Play Button Overlay - Smaller */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <div className="rounded-full bg-blue-500/30 p-4 backdrop-blur-sm transition-all group-hover:bg-blue-500/40 group-hover:scale-110">
                            <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" aria-hidden="true" />
                            <span className="sr-only">Play video</span>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Episode Details - Right Column */}
                    <div className="p-4 sm:p-6 md:py-4 md:pr-6 md:pl-0 flex flex-col">
                      {/* Episode Title and Badges */}
                      <div className="mb-3">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {episode.id === 1 && <Badge variant="secondary">First Episode</Badge>}
                          {episode.id === filteredEpisodes[0]?.id && index === 0 && !selectedTag && !searchQuery && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-slate-600">
                              Latest Episode
                            </Badge>
                          )}
                          <Badge variant="secondary">{episode.duration}</Badge>
                        </div>
                        <h3 className="text-xl sm:text-lg md:text-2xl font-bold leading-tight mb-3">
                          Episode {episode.id}: {episode.title}
                        </h3>
                      </div>

                      {/* Metadata */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(episode.date)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {episode.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="mb-4 text-muted-foreground leading-relaxed text-sm sm:text-sm">
                        {episode.description}
                      </p>

                      {/* Special Guests Section */}
                      {episode.guests && episode.guests.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 flex items-center gap-2 font-semibold text-sm">
                            <Users className="h-4 w-4" />
                            Special Guests
                          </h4>
                          <div className="space-y-2">
                            {episode.guests.map((guest, guestIdx) => (
                              <div
                                key={guestIdx}
                                className="rounded-lg border border-slate-500/20 bg-slate-500/5 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-sm mb-1">{guest.name}</h5>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      {guest.bio}
                                    </p>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="shrink-0 h-10 w-10 sm:h-8 sm:w-8"
                                    asChild
                                  >
                                    <a
                                      href={guest.linkedIn}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label={`View ${guest.name}'s LinkedIn profile`}
                                    >
                                      <Linkedin className="h-5 w-5 sm:h-4 sm:w-4 text-blue-500" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      {episode.timestamps && episode.timestamps.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 flex items-center gap-2 font-semibold text-sm">
                            <Clock className="h-4 w-4" />
                            Timestamps
                          </h4>
                          <div className="space-y-1 rounded-lg border border-slate-500/20 bg-slate-500/5 p-3 max-h-48 overflow-y-auto">
                            {episode.timestamps.map((timestamp, idx) => (
                              <a
                                key={idx}
                                href={getTimestampUrl(episode.videoUrl, timestamp.time)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-2 text-xs sm:text-sm transition-all duration-200 hover:text-primary rounded-md p-2 sm:p-1.5 -mx-2 sm:-mx-1.5 hover:bg-slate-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 min-h-[44px] sm:min-h-0"
                                aria-label={`Jump to ${timestamp.time}: ${timestamp.title}`}
                              >
                                <code className="shrink-0 rounded bg-slate-500/20 px-1.5 py-0.5 font-mono text-xs text-slate-400 group-hover:bg-slate-500/30 transition-colors">
                                  {timestamp.time}
                                </code>
                                <span className="flex-1 leading-relaxed group-hover:underline decoration-slate-500/50 underline-offset-2">
                                  {timestamp.title}
                                </span>
                                <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Button asChild size="sm" className="h-10">
                          <a
                            href={episode.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Watch full episode: ${episode.title}`}
                          >
                            <PlayCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                            Watch Full Episode
                            <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
                          </a>
                        </Button>
                        <ShareButtons episode={episode} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Structured Data for SEO */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateVideoSchema(episode)),
                  }}
                />
              </motion.div>
            ))}
          </div>
          )}

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="border-2 border-dashed border-slate-500/20 bg-transparent p-12">
              <Video className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">More Episodes Coming Soon</h3>
              <p className="mb-6 text-muted-foreground">
                Subscribe to our YouTube channel to stay updated with new episodes
              </p>
              <Button asChild>
                <a
                  href={EXTERNAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Agentic SaaS Talks on YouTube"
                >
                  <Video className="mr-2 h-4 w-4" aria-hidden="true" />
                  Subscribe on YouTube
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  )
}

export default function EpisodesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading episodes...</div>}>
      <EpisodesPageContent />
    </Suspense>
  )
}
