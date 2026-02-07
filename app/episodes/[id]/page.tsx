import { episodes, getEpisodeById } from "@/data/episodes"
import { notFound } from "next/navigation"
import { EpisodeDetailClient } from "./episode-detail-client"
import type { Metadata } from "next"
import { getYouTubeVideoId } from "@/lib/helpers"

interface EpisodePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { id } = await params
  const episode = getEpisodeById(Number(id))

  if (!episode) {
    return { title: "Episode Not Found" }
  }

  const videoId = getYouTubeVideoId(episode.videoUrl)

  return {
    title: `Episode ${episode.id}: ${episode.title}`,
    description: episode.description,
    openGraph: {
      title: `Episode ${episode.id}: ${episode.title}`,
      description: episode.description,
      type: "video.episode",
      images: [
        {
          url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: episode.title,
        },
      ],
      tags: episode.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `Episode ${episode.id}: ${episode.title}`,
      description: episode.description,
      images: [`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`],
    },
  }
}

export async function generateStaticParams() {
  return episodes.map((episode) => ({
    id: String(episode.id),
  }))
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id } = await params
  const episode = getEpisodeById(Number(id))

  if (!episode) {
    notFound()
  }

  return <EpisodeDetailClient episode={episode} />
}
