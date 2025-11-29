import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog"
import { hosts } from "@/data/hosts"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"

// Helper function to get author info
const getAuthorInfo = (authorName: string) => {
  return hosts.find(host => host.name === authorName)
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
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
