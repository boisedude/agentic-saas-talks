// TypeScript type definitions for blog posts
export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string // Author name from the hosts data
  date: string
  readTime: string
  tags: string[]
  featuredImage?: string
}

// All blog posts (newest first)
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to Agentic SaaS Talks Blog",
    slug: "welcome-to-agentic-saas-talks-blog",
    excerpt: "We're excited to launch the official Agentic SaaS Talks blog, where we'll dive deeper into the topics we explore in our weekly episodes and share insights from the rapidly evolving world of AI-driven software.",
    content: `# Welcome to Agentic SaaS Talks Blog

We're excited to launch the official Agentic SaaS Talks blog! This space will serve as a complement to our weekly webcast series, allowing us to dive deeper into the topics we explore with our guests and share ongoing insights from the rapidly evolving world of AI-driven software.

## What You'll Find Here

Our blog will feature:

- **Episode Deep Dives**: Extended analysis and takeaways from our weekly conversations
- **Technical Insights**: Detailed explorations of agentic architectures, deployment patterns, and AI infrastructure
- **Guest Contributions**: Thought leadership from the founders, architects, and operators who are building the future
- **Community Stories**: Real-world experiences from builders pivoting to agentic SaaS

## Why Now?

The shift from traditional SaaS to Agentic SaaS is more than just an incremental evolution—it's a fundamental reimagining of how software operates, scales, and delivers value. As autonomous AI agents become the new interface layer, the underlying infrastructure, deployment models, and operational patterns all need to evolve.

Through our weekly episodes, we've had incredible conversations with founders, engineers, and industry leaders who are navigating this transition firsthand. This blog gives us the space to explore these topics in greater depth and build a knowledge base for the community.

## Join the Conversation

We believe the best insights come from shared experience. Whether you're building your first AI agent, pivoting an existing SaaS platform, or exploring new deployment models like BYOC (Bring Your Own Cloud), we want to hear from you.

Stay tuned for regular updates, and don't forget to subscribe to our [YouTube channel](https://www.youtube.com/@omnistrate) for the latest episodes!

---

*Written by the Agentic SaaS Talks team*`,
    author: "Michael Cooper",
    date: "2025-11-29",
    readTime: "3 min",
    tags: ["Announcement", "Agentic SaaS", "Community"],
  },
]
