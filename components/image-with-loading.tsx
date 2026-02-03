"use client"

import { useState, useCallback, memo } from "react"
import Image from "next/image"

interface ImageWithLoadingProps {
  src: string
  alt: string
  className?: string
  loading?: "eager" | "lazy"
}

export const ImageWithLoading = memo(function ImageWithLoading({
  src,
  alt,
  className = "",
  loading = "lazy"
}: ImageWithLoadingProps) {
  const [hasError, setHasError] = useState(false)

  // Memoize error handler
  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  if (hasError) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-slate-500/20"
        role="img"
        aria-label={`${alt} - Failed to load`}
      >
        <span className="text-sm text-muted-foreground">Failed to load image</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      preload={loading === "eager"}
      onError={handleError}
    />
  )
})
