import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"
import type { Metadata } from "next"
import { getAuthorInfo } from "@/lib/helpers"
import { SITE_URL } from "@/lib/constants"

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

  const ogImage = post.featuredImage
    ? {
        url: post.featuredImage.startsWith("http")
          ? post.featuredImage
          : `${SITE_URL}${post.featuredImage}`,
        width: 1200,
        height: 630,
        alt: post.title,
      }
    : {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: post.title,
      }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    authors: author ? [{ name: author.name, url: author.linkedIn }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: author ? [author.name] : undefined,
      tags: post.tags,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage.url],
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
