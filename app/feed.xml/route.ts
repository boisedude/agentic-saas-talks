import { episodes } from "@/data/episodes"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export const dynamic = "force-static"

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const sortedEpisodes = [...episodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const items = sortedEpisodes
    .map(
      (episode) => `    <item>
      <title>${escapeXml(episode.title)}</title>
      <description>${escapeXml(episode.description)}</description>
      <link>${escapeXml(episode.videoUrl)}</link>
      <guid isPermaLink="true">${escapeXml(episode.videoUrl)}</guid>
      <pubDate>${new Date(episode.date).toUTCString()}</pubDate>
      <category>${episode.tags.map(escapeXml).join(", ")}</category>
    </item>`
    )
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <copyright>Agentic SaaS Talks. All rights reserved.</copyright>
    <lastBuildDate>${new Date(sortedEpisodes[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
    <managingEditor>guest@agentic-saas-talks.com (Agentic SaaS Talks)</managingEditor>
    <image>
      <url>${SITE_URL}/logo.jpg</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
