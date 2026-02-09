import { episodes } from "@/data/episodes"
import { hosts } from "@/data/hosts"
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
      if (h.company) parts.push(`  Company: ${h.company}`)
      if (h.linkedIn) parts.push(`  LinkedIn: ${h.linkedIn}`)
      return parts.join("\n")
    })
    .join("\n")

  const episodeLines = sortedEpisodes
    .map((ep) => `- Episode ${ep.id}: ${ep.title} (${ep.date})`)
    .join("\n")

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

## Links

- Website: ${SITE_URL}
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
