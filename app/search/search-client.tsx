"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import Link from "next/link"
import { Search, Video, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { episodes } from "@/data/episodes"
import { formatDate } from "@/lib/helpers"

interface SearchPost {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: string
}

export function SearchClient({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("")

  // Hydrate the query from ?q= so /search?q=mcp deep links work, and keep the
  // URL in sync as the user types (without a full navigation).
  useEffect(() => {
    const sync = () => {
      const q = new URLSearchParams(window.location.search).get("q") || ""
      setQuery(q)
    }
    sync()
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const handleChange = useCallback((value: string) => {
    setQuery(value)
    const params = new URLSearchParams()
    if (value) params.set("q", value)
    const qs = params.toString()
    window.history.replaceState(null, "", `/search${qs ? `?${qs}` : ""}`)
  }, [])

  const q = query.trim().toLowerCase()

  const matchedEpisodes = useMemo(() => {
    if (!q) return []
    return [...episodes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          ep.tags.some((t) => t.toLowerCase().includes(q)) ||
          ep.guests?.some((g) => g.name.toLowerCase().includes(q))
      )
  }, [q])

  const matchedPosts = useMemo(() => {
    if (!q) return []
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [q, posts])

  const total = matchedEpisodes.length + matchedPosts.length

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-500/5 to-background" />
        <div className="container relative mx-auto max-w-3xl px-3 sm:px-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
          <h1 className="mb-6 text-4xl font-bold tracking-tight">Search</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              autoFocus
              placeholder="Search episodes and articles..."
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10 h-12 text-base"
              aria-label="Search episodes and articles"
            />
          </div>
          {q && (
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              {total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto max-w-3xl px-3 sm:px-4 space-y-8">
          {!q && (
            <p className="text-muted-foreground">
              Type above to search across all episodes and blog posts.
            </p>
          )}

          {q && total === 0 && (
            <p className="text-muted-foreground">
              No results found. Try a different keyword or browse{" "}
              <Link href="/episodes" className="text-primary hover:underline">all episodes</Link> or{" "}
              <Link href="/topics" className="text-primary hover:underline">topics</Link>.
            </p>
          )}

          {matchedEpisodes.length > 0 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Video className="h-5 w-5" aria-hidden="true" />
                Episodes ({matchedEpisodes.length})
              </h2>
              <ul className="space-y-3">
                {matchedEpisodes.map((ep) => (
                  <li key={ep.id}>
                    <Link href={`/episodes/${ep.id}`}>
                      <Card className="border-2 border-slate-500/20 bg-background/50 p-4 transition-colors hover:border-slate-500/40">
                        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Episode {ep.id}</span>
                          <span aria-hidden="true">|</span>
                          <time dateTime={ep.date}>{formatDate(ep.date)}</time>
                        </div>
                        <p className="font-semibold leading-tight">{ep.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{ep.description}</p>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchedPosts.length > 0 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <FileText className="h-5 w-5" aria-hidden="true" />
                Articles ({matchedPosts.length})
              </h2>
              <ul className="space-y-3">
                {matchedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="border-2 border-slate-500/20 bg-background/50 p-4 transition-colors hover:border-slate-500/40">
                        <div className="mb-1 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <p className="font-semibold leading-tight">{post.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
