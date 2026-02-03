import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";

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
      { url: '/logo.jpg', sizes: '160x160', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo.jpg', sizes: '160x160', type: 'image/jpeg' },
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
  authors: [{ name: "Omnistrate", url: "https://www.omnistrate.com" }],
  creator: "Omnistrate",
  publisher: "Omnistrate",
  category: "Technology",
  openGraph: {
    title: "Agentic SaaS Talks - Exploring the Future of AI Applications",
    description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms. Deep dives into AI, SaaS, and intelligent systems with industry experts.",
    url: "https://agentic-saas-talks.com",
    siteName: "Agentic SaaS Talks",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Agentic SaaS Talks Logo - AI and SaaS Webcast Series",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic SaaS Talks - Exploring the Future of AI Applications",
    description: "Join our webcast series exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms.",
    images: ["/logo.jpg"],
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
  // TODO: Add Google Search Console verification code when available
  // verification: {
  //   google: "your-verification-code-here",
  // },
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
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
      </head>
      <body className={inter.className}>
        {/* Netlify Identity Widget */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
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
