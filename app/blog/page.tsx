import { getAllBlogPosts } from "@/lib/blog"
import { BlogPageClient } from "./blog-page-client"

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return <BlogPageClient posts={blogPosts} />
}
