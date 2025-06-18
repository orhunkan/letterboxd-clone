import { Star, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const recentActivity = [
  {
    id: 1,
    title: "The Phoenician Scheme",
    poster: "/placeholder.svg?height=300&width=200&text=The+Phoenician+Scheme",
    rating: 4,
    liked: true,
    hasReview: true,
  },
  {
    id: 2,
    title: "The Lighthouse",
    poster: "/placeholder.svg?height=300&width=200&text=The+Lighthouse",
    rating: 4,
    liked: false,
    hasReview: false,
  },
  {
    id: 3,
    title: "No Hard Feelings",
    poster: "/placeholder.svg?height=300&width=200&text=No+Hard+Feelings",
    rating: 2,
    liked: false,
    hasReview: false,
  },
  {
    id: 4,
    title: "(500) Days of Summer",
    poster: "/placeholder.svg?height=300&width=200&text=500+Days+of+Summer",
    rating: 3,
    liked: false,
    hasReview: false,
  },
]

export default function RecentActivity() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Recent Activity</h2>
        <Link href="/profile/activity" className="text-gray-400 hover:text-white text-sm uppercase tracking-wide">
          All
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {recentActivity.map((film) => (
          <Link key={film.id} href={`/film/${film.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={film.poster || "/placeholder.svg"}
                alt={film.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

              {/* Rating and icons overlay */}
              <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= film.rating ? "fill-green-500 text-green-500" : "text-gray-600"}`}
                  />
                ))}
              </div>

              <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                {film.liked && <Heart className="w-3 h-3 fill-red-500 text-red-500" />}
                {film.hasReview && <MessageCircle className="w-3 h-3 text-blue-400" />}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
