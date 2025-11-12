import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agentic SaaS Talks',
    short_name: 'SaaS Talks',
    description: 'Exploring the future of AI applications, agentic architectures, and the evolution of SaaS platforms',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/logo.jpg',
        sizes: '160x160',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  }
}
