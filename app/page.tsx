"use client"

import { motion } from "framer-motion"
import { Video, Calendar, ExternalLink, PlayCircle, Users, Clock, Bot, Link2, Shield, Cloud, Rocket, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { episodes, type Episode } from "@/data/episodes"
import Link from "next/link"
import { ImageWithLoading } from "@/components/image-with-loading"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getVideoSchema,
  getVideoSeriesSchema,
  getWebPageSchema,
} from "@/lib/seo"
import { useMemo } from "react"
import { getYouTubeVideoId, formatDate } from "@/lib/helpers"

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion()

  // Memoize latest episode to prevent unnecessary recalculations
  const latestEpisode = useMemo<Episode>(() => episodes[0], [])

  // Generate structured data - memoized for performance
  const structuredData = useMemo(() => ({
    organizationSchema: getOrganizationSchema(),
    webSiteSchema: getWebSiteSchema(),
    videoSeriesSchema: getVideoSeriesSchema(episodes),
    latestVideoSchema: getVideoSchema(latestEpisode),
    webPageSchema: getWebPageSchema({
      title: "Agentic SaaS Talks - Exploring the Future of AI Applications",
      description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms.",
      url: "https://agentic-saas-talks.com",
      datePublished: episodes[episodes.length - 1]?.date ?? new Date().toISOString(),
      dateModified: latestEpisode.date,
    }),
  }), [latestEpisode])

  return (
    <>
      {/* Animated Background Effects */}
      <AnimatedBackground />
      <ScrollToTop />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.videoSeriesSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.latestVideoSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.webPageSchema),
        }}
      />

      <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />

        <div className="container relative mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-600 text-lg">
              <Video className="mr-2 h-4 w-4" aria-hidden="true" />
              Webcast Series
            </Badge>
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Agentic SaaS Talks
            </h1>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
              <a
                href="https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Video className="h-5 w-5" />
                <span>YouTube Playlist</span>
              </a>
              <Separator orientation="vertical" className="h-6" />
              <a
                href="/episodes"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>Regular Episodes</span>
              </a>
              <Separator orientation="vertical" className="h-6" />
              <a
                href="/episodes"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>{episodes.length} Episodes</span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={latestEpisode.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Play latest episode on YouTube"
                >
                  <PlayCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Play Latest Episode
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/episodes">Browse All Episodes</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Episode Section */}
      <section className="py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">Latest Episode</h2>
            <p className="text-xl text-muted-foreground">
              Our newest discussion on agentic architectures and AI applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <Card className="overflow-hidden border-2 border-blue-500/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full pointer-events-none"
                style={{ transition: 'transform 0.8s ease-in-out, opacity 0.5s ease-in-out' }} />
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-slate-500/20 lg:aspect-auto lg:h-full">
                  <a
                    href={latestEpisode.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-full w-full"
                    aria-label={`Watch ${latestEpisode.title} on YouTube`}
                  >
                    {/* YouTube Thumbnail */}
                    <ImageWithLoading
                      src={`https://i.ytimg.com/vi/${getYouTubeVideoId(latestEpisode.videoUrl)}/maxresdefault.jpg`}
                      alt={latestEpisode.title}
                      className="absolute inset-0 h-full w-full object-contain transition-transform group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-blue-500/20 p-8 backdrop-blur-sm transition-all group-hover:bg-blue-500/30 group-hover:scale-110">
                        <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" aria-hidden="true" />
                        <span className="sr-only">Play video</span>
                      </div>
                    </div>

                    {/* Bottom Gradient & Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <PlayCircle className="h-4 w-4" />
                          Watch Episode
                        </span>
                        <Badge variant="secondary" className="bg-black/50">
                          {latestEpisode.duration}
                        </Badge>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Episode Details */}
                <CardHeader className="lg:py-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">Latest Episode</Badge>
                    {latestEpisode.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl sm:text-lg md:text-2xl leading-tight">
                    {latestEpisode.title}
                  </CardTitle>
                  <CardDescription className="mt-4 text-base">
                    {latestEpisode.description}
                  </CardDescription>
                  <CardContent className="mt-6 p-0">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(latestEpisode.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{latestEpisode.duration}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button asChild>
                        <a
                          href={latestEpisode.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Watch ${latestEpisode.title} now on YouTube`}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                          Watch Now
                          <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/episodes">View All Episodes</Link>
                      </Button>
                    </div>
                  </CardContent>
                </CardHeader>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Topics Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-500/5 to-background" />

        <div className="container relative mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">What We Discuss</h2>
            <p className="text-xl text-muted-foreground">
              Topics we explore in our webcast series
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Agentic Architectures",
                description: "AI application patterns, reasoning systems, and autonomous agents",
                Icon: Bot,
                bgClass: "bg-blue-500/10",
                iconClass: "text-blue-400",
              },
              {
                title: "Model Context Protocol",
                description: "Building human-language APIs and context-aware systems",
                Icon: Link2,
                bgClass: "bg-purple-500/10",
                iconClass: "text-purple-400",
              },
              {
                title: "Data Privacy & Security",
                description: "Data sovereignty, privacy concerns, and security in AI systems",
                Icon: Shield,
                bgClass: "bg-green-500/10",
                iconClass: "text-green-400",
              },
              {
                title: "SaaS Evolution",
                description: "Frontend to backend evolution and deployment models",
                Icon: Cloud,
                bgClass: "bg-sky-500/10",
                iconClass: "text-sky-400",
              },
              {
                title: "AI Product Development",
                description: "From prototype to production at scale",
                Icon: Rocket,
                bgClass: "bg-orange-500/10",
                iconClass: "text-orange-400",
              },
              {
                title: "Future of Applications",
                description: "Personalized applications and the agentic economy",
                Icon: Sparkles,
                bgClass: "bg-pink-500/10",
                iconClass: "text-pink-400",
              },
            ].map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.5) }}
              >
                <Card className="h-full border-2 border-slate-500/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/10 hover:-translate-y-1 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full pointer-events-none"
                    style={{ transition: 'transform 0.8s ease-in-out, opacity 0.5s ease-in-out' }} />
                  <CardHeader className="relative">
                    <div className={`mb-3 inline-flex rounded-full p-3 ${topic.bgClass}`}>
                      <topic.Icon className={`h-6 w-6 ${topic.iconClass}`} aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold">About the Series</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Agentic SaaS Talks is a webcast series exploring the intersection of AI, SaaS, and
              agentic systems. We dive deep into architectural patterns, design choices, and
              deployment models that are shaping the next generation of intelligent applications.
            </p>
            <p className="mb-8 text-lg text-muted-foreground">
              Join us as we discuss topics ranging from Model Context Protocol (MCP) to data
              sovereignty, from frontend frameworks to backend orchestration, and from prototype
              to production at scale.
            </p>
            <Button size="lg" asChild>
              <a
                href="https://www.youtube.com/@omnistrate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Agentic SaaS Talks on YouTube"
              >
                <Video className="mr-2 h-5 w-5" aria-hidden="true" />
                Subscribe on YouTube
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

        <div className="container relative mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <Card className="border-2 border-blue-500/20 bg-background/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardDescription className="text-sm font-semibold uppercase tracking-wider">
                  Sponsored By
                </CardDescription>
                <CardTitle className="text-5xl font-bold">
                  <a
                    href="https://www.omnistrate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-blue-500"
                  >
                    Omnistrate
                    <ExternalLink className="h-8 w-8" aria-hidden="true" />
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center text-xl font-medium text-muted-foreground">
                  Build, Deploy and Scale your Agentic Applications with Omnistrate
                </p>
                <Separator />
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-semibold">Control Plane as a Service</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-ready infrastructure that handles operations and management across
                      multiple cloud environments and deployment types.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold">Multi-Channel Distribution</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for SaaS, BYOC, On-Premises, PaaS, and Agent-as-a-Service platforms
                      with pre-built, configurable modules.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button size="lg" asChild>
                    <a
                      href="https://www.omnistrate.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Learn more about Omnistrate"
                    >
                      Learn More About Omnistrate
                      <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  )
}
