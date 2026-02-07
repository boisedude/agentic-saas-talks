import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-saas-talks.com"),
  title: {
    default: "Agentic SaaS Talks - Exploring the Future of AI Applications",
    template: "%s | Agentic SaaS Talks",
  },
  description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms. Deep dives into AI, SaaS, and intelligent systems with industry experts from AWS, Omnistrate, and leading AI companies.",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.jpg', sizes: '160x160', type: 'image/jpeg' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "Agentic SaaS",
    "AI Applications",
    "SaaS",
    "Agentic Architectures",
    "Webcast",
    "YouTube",
    "Technology",
    "AI Agents",
    "Machine Learning",
    "Cloud Computing",
    "SaaS Evolution",
    "Intelligent Systems",
    "Autonomous AI",
    "Model Context Protocol",
    "MCP",
    "AI Infrastructure",
    "AWS",
    "Omnistrate",
  ],
  authors: [{ name: "Agentic SaaS Talks", url: "https://agentic-saas-talks.com" }],
  creator: "Agentic SaaS Talks",
  publisher: "Agentic SaaS Talks",
  category: "Technology",
  openGraph: {
    title: "Agentic SaaS Talks - Exploring the Future of AI Applications",
    description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms. Deep dives into AI, SaaS, and intelligent systems with industry experts.",
    url: "https://agentic-saas-talks.com",
    siteName: "Agentic SaaS Talks",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Agentic SaaS Talks - Exploring the Future of AI Applications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic SaaS Talks - Exploring the Future of AI Applications",
    description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms.",
    images: ["/twitter-image.png"],
    creator: "@omnistrate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://agentic-saas-talks.com",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com https://www.googletagmanager.com; font-src 'self'; frame-src https://www.youtube.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com; object-src 'none'"
        />
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="alternate" type="application/rss+xml" title="Agentic SaaS Talks RSS Feed" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3TLS4354D6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3TLS4354D6');
          `}
        </Script>
        {/* Skip navigation link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
