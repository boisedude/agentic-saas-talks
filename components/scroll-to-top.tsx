"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout | null = null

    const toggleVisibility = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        // Show button when page is scrolled down 400px
        setIsVisible(window.scrollY > 400)
      }, 100)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 h-14 w-14 sm:h-12 sm:w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400/50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 sm:h-5 sm:w-5" />
        </Button>
      )}
    </>
  )
}
