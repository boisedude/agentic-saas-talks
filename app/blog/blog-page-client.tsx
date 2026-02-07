"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { formatDate, getAuthorInfo } from "@/lib/helpers"

interface BlogPageClientProps {
  posts: BlogPost[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Animated Background Effects */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-slate-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep dives, insights, and stories from the world of Agentic SaaS
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const author = getAuthorInfo(post.author)

            return (
              <motion.div
                key={post.slug}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-muted-foreground">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    {/* Author and Date Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{author.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  )
}
