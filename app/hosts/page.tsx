"use client"

import { motion } from "framer-motion"
import { Users, Linkedin, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { hosts } from "@/data/hosts"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Breadcrumb } from "@/components/breadcrumb"
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/seo"
import Image from "next/image"
import { useState, useCallback, useMemo } from "react"

export default function HostsPage() {
  const prefersReducedMotion = useReducedMotion()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Memoize callback to prevent unnecessary re-renders
  const handleImageError = useCallback((hostName: string) => {
    setImageErrors(prev => ({ ...prev, [hostName]: true }))
  }, [])

  // Generate structured data - memoized for performance
  const structuredData = useMemo(() => ({
    breadcrumbSchema: getBreadcrumbSchema([
      { name: "Home", url: "https://agentic-saas-talks.com" },
      { name: "About the Hosts", url: "https://agentic-saas-talks.com/hosts" },
    ]),
    webPageSchema: getWebPageSchema({
      title: "About the Hosts - Agentic SaaS Talks",
      description: "Meet the hosts of Agentic SaaS Talks - technology leaders and entrepreneurs exploring the future of AI and SaaS.",
      url: "https://agentic-saas-talks.com/hosts",
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
          __html: JSON.stringify(structuredData.webPageSchema),
        }}
      />

      <div className="min-h-screen">
        <ScrollToTop />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />

          <div className="container relative mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About the Hosts" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-slate-500 text-lg">
                <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                Meet the Team
              </Badge>
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                About the Hosts
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
                Technology leaders and entrepreneurs exploring the future of AI and SaaS
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hosts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hosts.map((host, index) => (
                <motion.div
                  key={host.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.5) }}
                >
                  <Card className="group h-full overflow-hidden border-2 border-slate-500/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-1">
                    {/* Profile Photo */}
                    {host.photo && (
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-b from-slate-500/10 to-background">
                        {!imageErrors[host.name] ? (
                          <Image
                            src={host.photo}
                            alt={`${host.name} profile photo`}
                            fill
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            preload={index < 3}
                            onError={() => handleImageError(host.name)}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-slate-500/20">
                            <Users className="h-24 w-24 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      {/* Profile Header */}
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-1 text-2xl font-bold leading-tight">
                            {host.name}
                          </h3>
                          {host.role && (
                            <Badge variant="outline" className="mb-3">
                              {host.role}
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="shrink-0 h-11 w-11 sm:h-10 sm:w-10"
                          asChild
                        >
                          <a
                            href={host.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${host.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5 text-blue-500" />
                          </a>
                        </Button>
                      </div>

                      {/* Bio */}
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        {host.bio}
                      </p>

                      {/* LinkedIn Link */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <a
                          href={host.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Connect with ${host.name} on LinkedIn`}
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          Connect on LinkedIn
                          <ExternalLink className="ml-2 h-3 w-3" aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* About the Series */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="mt-16"
            >
              <Card className="border-2 border-dashed border-slate-500/20 bg-transparent p-12">
                <div className="mx-auto max-w-3xl text-center">
                  <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-4 text-2xl font-semibold">About Agentic SaaS Talks</h3>
                  <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                    Agentic SaaS Talks is a webcast series exploring the intersection of AI,
                    agentic architectures, and SaaS platforms. Our hosts bring together industry
                    experts, founders, and technologists to discuss the future of intelligent
                    applications and the evolution of software-as-a-service.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" asChild>
                      <a
                        href="/episodes"
                        aria-label="View all episodes"
                      >
                        View All Episodes
                      </a>
                    </Button>
                    <Button asChild>
                      <a
                        href="https://www.youtube.com/@omnistrate"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Subscribe on YouTube"
                      >
                        <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                        Subscribe on YouTube
                        <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
