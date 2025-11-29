"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Video, Menu, X, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/blog", label: "Blog" },
  { href: "/hosts", label: "Hosts" },
] as const

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on escape key and manage body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
      document.body.classList.add("mobile-menu-open")
    } else {
      // Restore body scroll
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.classList.remove("mobile-menu-open")
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/80 md:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm bg-white dark:bg-slate-950 border-l border-border md:hidden animate-in slide-in-from-right duration-300 shadow-2xl"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 id="mobile-nav-title" className="text-lg font-bold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav aria-labelledby="mobile-nav-title" className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-md",
                      pathname === link.href
                        ? "text-foreground bg-gradient-to-r from-blue-500/30 to-slate-500/10 border-l-2 border-blue-500"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-border space-y-3">
                  <Button className="w-full" asChild>
                    <a
                      href="https://www.youtube.com/@omnistrate"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Subscribe on YouTube"
                      onClick={() => setIsOpen(false)}
                    >
                      <Video className="mr-2 h-4 w-4" aria-hidden="true" />
                      Subscribe on YouTube
                    </a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a
                      href="https://www.linkedin.com/company/omnistrate/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on LinkedIn"
                      onClick={() => setIsOpen(false)}
                    >
                      <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                      Follow on LinkedIn
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}
