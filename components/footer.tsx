import { Video, ExternalLink, Linkedin, Mail, Rss } from "lucide-react"
import Link from "next/link"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { memo } from "react"

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95" role="contentinfo">
      <div className="container mx-auto px-4 py-6">
        {/* Main footer row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand + social */}
          <div className="flex-shrink-0">
            <div className="mb-1 text-sm font-semibold">Agentic SaaS Talks</div>
            <p className="mb-2 max-w-xs text-xs text-muted-foreground">
              Exploring the future of AI applications, agentic architectures, and the evolution of
              SaaS platforms.
            </p>
            <div className="flex gap-1.5">
              <a
                href={EXTERNAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-red-500"
                aria-label="Subscribe on YouTube"
              >
                <Video className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-blue-500"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:guest@agentic-saas-talks.com"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-foreground"
                aria-label="Suggest a Guest"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/feed.xml"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-orange-500"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <Link href="/episodes" className="transition-colors hover:text-foreground">Episodes</Link>
            <Link href="/hosts" className="transition-colors hover:text-foreground">Hosts</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          </nav>

          {/* Sponsor */}
          <div className="flex-shrink-0 text-right max-md:text-left">
            <div className="text-xs text-muted-foreground">Sponsored by</div>
            <a
              href={EXTERNAL_LINKS.omnistrate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-blue-500"
            >
              Omnistrate
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-border/40 pt-3 text-center text-xs text-muted-foreground">
          &copy; {currentYear} Agentic SaaS Talks. All rights reserved.
        </div>
      </div>
    </footer>
  )
})
Footer.displayName = "Footer"
