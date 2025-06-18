"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Plus, Star } from "lucide-react"
import { toggleLike } from "@/actions/film"
import { useTransition, useState } from "react"
import { useSession } from "next-auth/react"

interface FilmHeroProps {
  film: {
    id: number
    title: string
    year: number
    director: string
    tagline: string
    synopsis: string
    poster: string
    backdrop: string
    rating: number
    totalRatings: string
    views: string
  }
  likesCount: number
  userLiked: boolean
}

export default function FilmHero({ film, likesCount, userLiked }: FilmHeroProps) {
  const { data: session } = useSession()
  const authed = Boolean(session?.user)
  const [pending, start] = useTransition()
  const [liked, setLiked] = useState(userLiked)
  const [count, setCount] = useState(likesCount)

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src={film.backdrop || "/placeholder.svg"}
          alt={film.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14181c] via-[#14181c]/90 to-[#14181c]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-start space-x-8 w-full">
          {/* Poster + Stats */}
          <div className="flex-shrink-0">
            <div className="relative w-80 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={film.poster || "/placeholder.svg"}
                alt={film.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
              <Stat icon={<Eye className="w-4 h-4" />} value={film.views} color="text-green-500" />
              <Stat icon={<Star className="w-4 h-4" />} value={String(count)} color="text-green-500" />
              <Stat icon={<Heart className="w-4 h-4" />} value={film.totalRatings} color="text-orange-500" />
            </div>
          </div>

          {/* Info + Buttons */}
          <div className="flex-1 space-y-6 max-w-2xl">
            <header className="space-y-2">
              <h1 className="text-5xl font-bold text-white leading-tight">{film.title}</h1>
              <p className="text-xl text-gray-300">
                {film.year} • Directed by {film.director}
              </p>
            </header>

            <p className="text-lg font-medium text-gray-300 uppercase tracking-wide">{film.tagline}</p>
            <p className="text-gray-300 text-lg leading-relaxed">{film.synopsis}</p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <Button className="bg-[#40bcf4] hover:bg-[#40bcf4]/90 text-white flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Watch</span>
              </Button>

              <Button
                variant="outline"
                disabled={pending || !authed}
                onClick={() =>
                  start(async () => {
                    await toggleLike(film.id)
                    setLiked((v) => !v)
                    setCount((c) => (liked ? c - 1 : c + 1))
                  })
                }
                className="border-gray-600 text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                <span>{pending ? "Saving…" : liked ? "Liked" : "Like"}</span>
              </Button>

              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Watchlist</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode
  value: string
  color: string
}) {
  return (
    <div className={`flex items-center space-x-1 ${color}`}>
      {icon}
      <span>{value}</span>
    </div>
  )
}
