"use client"

import { useSyncExternalStore } from "react"

/**
 * Hook to detect if the user prefers reduced motion
 * Returns true if the user has requested reduced motion in their OS/browser settings
 * Helps with accessibility by allowing components to disable animations
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {}
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getServerSnapshot(): boolean {
  return false
}
