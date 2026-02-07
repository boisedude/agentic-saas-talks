import { Video, ExternalLink, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { memo } from "react"

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 text-lg font-semibold">Agentic SaaS Talks</div>
            <p className="mb-4 text-sm text-muted-foreground">
              Exploring the future of AI applications, agentic architectures, and the evolution of
              SaaS platforms.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2">
              <a
                href={EXTERNAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-red-500"
                aria-label="Subscribe on YouTube"
              >
                <Video className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80 hover:text-blue-500"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/episodes"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  All Episodes
                </Link>
              </li>
              <li>
                <Link
                  href="/hosts"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  About the Hosts
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={EXTERNAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Video className="h-4 w-4" aria-hidden="true" />
                  YouTube Channel
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:guest@agentic-saas-talks.com"
                  className="inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Suggest a Guest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8">
          <div className="text-center">
            <div className="mb-3 text-sm font-semibold text-muted-foreground">Sponsored By</div>
            <a
              href={EXTERNAL_LINKS.omnistrate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-blue-500"
            >
              Omnistrate
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              Build, Deploy and Scale your Agentic Applications with Omnistrate
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Agentic SaaS Talks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
})
Footer.displayName = "Footer"
