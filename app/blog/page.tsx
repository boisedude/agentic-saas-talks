import { getAllBlogPosts } from "@/lib/blog"
import { BlogPageClient } from "./blog-page-client"
import {
  getBlogListingSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo"
import { SITE_URL } from "@/lib/constants"

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ])
  const webPageSchema = getWebPageSchema({
    title: "Blog | Agentic SaaS Talks",
    description:
      "Insights, tutorials, and thought leadership on agentic AI, SaaS architecture, and the future of intelligent applications.",
    url: `${SITE_URL}/blog`,
    datePublished: blogPosts[blogPosts.length - 1]?.date,
    dateModified: blogPosts[0]?.date,
  })
  const listingSchema = getBlogListingSchema(blogPosts)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {blogPosts.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }} />
      )}
      <BlogPageClient posts={blogPosts} />
    </>
  )
}
