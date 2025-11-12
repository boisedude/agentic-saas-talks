"use client"

import { useEffect, useState } from "react"

/**
 * Hook to detect if the user prefers reduced motion
 * Returns true if the user has requested reduced motion in their OS/browser settings
 * Helps with accessibility by allowing components to disable animations
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if matchMedia is available (for SSR safety)
    if (typeof window === "undefined" || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    // Set initial state
    setPrefersReducedMotion(mediaQuery.matches)

    // Create event handler with proper typing
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Use addEventListener for better browser compatibility
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}
