"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { BlogPost } from "@/lib/blog"
import type { Host } from "@/data/hosts"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import ReactMarkdown from "react-markdown"
import { formatDate } from "@/lib/helpers"

interface BlogPostClientProps {
  post: BlogPost
  author: Host | undefined
}

export function BlogPostClient({ post, author }: BlogPostClientProps) {
  const prefersReducedMotion = useReducedMotion()

  // Strip leading H1 from markdown if it matches the post title (avoids duplicate heading)
  const content = post.content.replace(/^\s*#\s+.+\n+/, (match) => {
    const headingText = match.replace(/^\s*#\s+/, '').replace(/\*+/g, '').trim()
    return headingText === post.title ? '' : match
  })

  return (
    <>
      {/* Animated Background Effects */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-slate-400 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <Separator />

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/80">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-foreground">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                hr: () => <Separator className="my-8" />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          {author && (
            <>
              <Separator />
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold">{author.name}</p>
                    {author.role && (
                      <p className="text-sm text-muted-foreground">{author.role}</p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {author.bio}
                    </p>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={author.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.article>
      </div>
    </>
  )
}
