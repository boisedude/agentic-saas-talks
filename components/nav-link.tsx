"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { memo } from "react"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export const NavLink = memo<NavLinkProps>(({ href, children, className }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors relative py-1",
        isActive
          ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-slate-600 after:rounded-full"
          : "text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground/50 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-center",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
})
NavLink.displayName = "NavLink"
