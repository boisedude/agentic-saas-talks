"use client"

import Link from "next/link"
import Image from "next/image"
import { Video, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { memo } from "react"

export const Navigation = memo(() => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/logo.jpg"
              alt="Agentic SaaS Talks Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold">Agentic SaaS Talks</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/episodes">Episodes</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/hosts">Hosts</NavLink>
          <div className="flex items-center gap-2" role="group" aria-label="Social media links">
            <Button size="sm" asChild>
              <a
                href={EXTERNAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
              >
                <Video className="mr-2 h-4 w-4" aria-hidden="true" />
                Subscribe
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                Follow
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  )
})
Navigation.displayName = "Navigation"
