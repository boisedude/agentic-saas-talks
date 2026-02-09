// Site information
export const SITE_URL = "https://agentic-saas-talks.com"
export const SITE_NAME = "Agentic SaaS Talks"
export const SITE_DESCRIPTION =
  "Agentic SaaS Talks is a technology webcast series with 24 episodes covering AI applications, agentic architectures, and SaaS platform evolution. Hosted by technology leaders from AWS, Omnistrate, and The Tributary AI."

// External links
export const EXTERNAL_LINKS = {
  youtube: "https://www.youtube.com/@omnistrate",
  linkedIn: "https://www.linkedin.com/company/omnistrate/",
  omnistrate: "https://www.omnistrate.com",
  youtubePlaylist:
    "https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_",
  github: "https://github.com/boisedude/agentic-saas-talks",
} as const

// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/blog", label: "Blog" },
  { href: "/hosts", label: "Hosts" },
] as const

// Common animation durations (in seconds)
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
} as const

// Scroll threshold for showing scroll-to-top button
export const SCROLL_THRESHOLD = 400
