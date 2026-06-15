import Link from "next/link"
import { Calendar, Clock, PlayCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithLoading } from "@/components/image-with-loading"
import type { Episode } from "@/data/episodes"
import { getYouTubeVideoId, formatDate } from "@/lib/helpers"

interface EpisodeGridProps {
  episodes: Episode[]
}

/**
 * Static, animation-free grid of episode cards. Used by the topic, guest, and
 * host archive pages (server components) so they share the archive's card look
 * without shipping the client-side filtering/motion bundle.
 */
export function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <Link
          key={episode.id}
          href={`/episodes/${episode.id}`}
          className="block h-full"
        >
          <Card className="h-full overflow-hidden border-2 border-slate-500/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-500/40 hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-1">
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-slate-500/20">
              <ImageWithLoading
                src={`https://i.ytimg.com/vi/${getYouTubeVideoId(episode.videoUrl)}/maxresdefault.jpg`}
                alt={episode.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="rounded-full bg-blue-500/30 p-3 backdrop-blur-sm">
                  <PlayCircle className="h-10 w-10 text-white drop-shadow-lg" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                  {episode.duration}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(episode.date)}</span>
                <span className="text-muted-foreground/50" aria-hidden="true">|</span>
                <Clock className="h-3 w-3" />
                <span>{episode.duration}</span>
              </div>

              <h3 className="mb-2 text-base font-bold leading-tight line-clamp-2">
                Episode {episode.id}: {episode.title}
              </h3>

              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {episode.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {episode.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {episode.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{episode.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
