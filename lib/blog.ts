import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  author: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  featuredImage?: string
  content: string
}

const contentDirectory = path.join(process.cwd(), 'content/blog')

export function getAllBlogPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        author: data.author || '',
        date: data.date || '',
        readTime: data.readTime || '5 min',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        featuredImage: data.featuredImage,
        content,
      } as BlogPost
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      author: data.author || '',
      date: data.date || '',
      readTime: data.readTime || '5 min',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      featuredImage: data.featuredImage,
      content,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

/**
 * Posts related to the given one, ranked by shared tags then recency.
 * Excludes the post itself.
 */
export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const all = getAllBlogPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return []

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.post)
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}
