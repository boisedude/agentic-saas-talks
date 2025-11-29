import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllBlogPosts } from "@/lib/blog"
import { hosts } from "@/data/hosts"
import Link from "next/link"
import { BlogPageClient } from "./blog-page-client"

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return dateString
  }
}

// Helper function to get author info
const getAuthorInfo = (authorName: string) => {
  return hosts.find(host => host.name === authorName)
}

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return <BlogPageClient posts={blogPosts} />
}
