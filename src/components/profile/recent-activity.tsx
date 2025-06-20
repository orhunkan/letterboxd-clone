import Image from "next/image"
import Link from "next/link"
import { Star, Heart, MessageCircle } from "lucide-react"
import { getRecentActivity } from "@/lib/db"

interface Props {
  username: string
}

export default async function RecentActivity({ username }: Props) {
  const activity = await getRecentActivity(username)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Recent Activity</h2>
        <Link href="/profile/activity" className="text-gray-400 hover:text-white text-sm uppercase tracking-wide">
          All
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {activity.map((film) => (
          <Link key={film.id} href={`/film/${film.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={film.posterUrl || "/placeholder.svg"}
                alt={film.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
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
