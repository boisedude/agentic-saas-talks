import { getAllBlogPosts } from "@/lib/blog"
import { SearchClient } from "./search-client"

export default function SearchPage() {
  // Pass only the lightweight fields the client search needs — avoids shipping
  // full markdown bodies to the browser.
  const posts = getAllBlogPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
    date: p.date,
  }))

  return <SearchClient posts={posts} />
}
