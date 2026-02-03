import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"
import type { Metadata } from "next"
import { getAuthorInfo } from "@/lib/helpers"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const author = getAuthorInfo(post.author)

  return {
    title: post.title,
    description: post.excerpt,
    authors: author ? [{ name: author.name, url: author.linkedIn }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: author ? [author.name] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params

  // Find the blog post by slug
  const post = getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const author = getAuthorInfo(post.author)

  return <BlogPostClient post={post} author={author} />
}
