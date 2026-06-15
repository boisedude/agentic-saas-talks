import { episodes } from "@/data/episodes"
import { hosts } from "@/data/hosts"
import { getAllBlogPosts } from "@/lib/blog"
import { getAllTags, getAllGuests, slugify } from "@/lib/helpers"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export const dynamic = "force-static"

export function GET() {
  const sortedEpisodes = [...episodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const hostLines = hosts
    .map((h) => {
      const parts = [`- ${h.name}`]
      if (h.role) parts[0] += ` (${h.role})`
      parts[0] += `: ${SITE_URL}/hosts/${slugify(h.name)}`
      if (h.company) parts.push(`  Company: ${h.company}`)
      if (h.expertise && h.expertise.length) parts.push(`  Expertise: ${h.expertise.join(", ")}`)
      if (h.linkedIn) parts.push(`  LinkedIn: ${h.linkedIn}`)
      return parts.join("\n")
    })
    .join("\n")

  const episodeLines = sortedEpisodes
    .map((ep) => {
      const lines = [
        `- Episode ${ep.id}: ${ep.title} (${ep.date})`,
        `  URL: ${SITE_URL}/episodes/${ep.id}`,
        `  Topics: ${ep.tags.join(", ")}`,
      ]
      if (ep.guests?.length) {
        lines.push(`  Guests: ${ep.guests.map((g) => g.name).join(", ")}`)
      }
      lines.push(`  Summary: ${ep.description}`)
      return lines.join("\n")
    })
    .join("\n\n")

  const topicLines = getAllTags()
    .map(({ tag, slug, count }) => `- ${tag} (${count} episodes): ${SITE_URL}/topics/${slug}`)
    .join("\n")

  const guestLines = getAllGuests()
    .map(({ guest, slug, episodes }) => `- ${guest.name} (${episodes.length} episodes): ${SITE_URL}/guests/${slug}`)
    .join("\n")

  const blogPosts = getAllBlogPosts()
  const blogSection = blogPosts.length
    ? `\n## Articles\n\n${blogPosts
        .map((p) => `- ${p.title} (${p.date}) by ${p.author}: ${SITE_URL}/blog/${p.slug}\n  ${p.excerpt}`)
        .join("\n")}\n`
    : ""

  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About

${SITE_NAME} is a technology webcast series exploring AI applications, agentic architectures, and the evolution of SaaS platforms. The series features deep technical discussions with industry experts, founders, and technologists. Sponsored by Omnistrate.

## Hosts

${hostLines}

## Key Topics

- Agentic Architectures: AI application patterns, reasoning systems, and autonomous agents
- Model Context Protocol (MCP): Building human-language APIs and context-aware systems
- Data Privacy & Security: Data sovereignty, privacy concerns, and security in AI systems
- SaaS Evolution: Frontend to backend evolution and deployment models
- AI Product Development: From prototype to production at scale
- Future of Applications: Personalized applications and the agentic economy

## Topic Archives

${topicLines}

## Featured Guests

${guestLines}
${blogSection}
## Links

- Website: ${SITE_URL}
- All Episodes: ${SITE_URL}/episodes
- Topics: ${SITE_URL}/topics
- Guests: ${SITE_URL}/guests
- Hosts: ${SITE_URL}/hosts
- YouTube: https://www.youtube.com/@omnistrate
- YouTube Playlist: https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_
- RSS Feed: ${SITE_URL}/feed.xml
- GitHub: https://github.com/boisedude/agentic-saas-talks

## Episodes (${sortedEpisodes.length} total)

${episodeLines}
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
