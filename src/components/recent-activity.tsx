import { Heart, MessageCircle, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: { name: "Alex Chen", username: "alexc", avatar: "/placeholder.svg?height=40&width=40" },
    type: "review",
    movie: { title: "The Godfather", year: 1972, poster: "/placeholder.svg?height=80&width=60" },
    rating: 5,
    content:
      "An absolute masterpiece. Coppola's direction combined with Brando's iconic performance creates cinema history.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    user: { name: "Sarah Kim", username: "sarahk", avatar: "/placeholder.svg?height=40&width=40" },
    type: "watchlist",
    movie: { title: "Dune: Part Two", year: 2024, poster: "/placeholder.svg?height=80&width=60" },
    content: "Added to watchlist",
    timestamp: "4 hours ago",
    likes: 12,
    comments: 3,
  },
  {
    id: 3,
    user: { name: "Mike Johnson", username: "mikej", avatar: "/placeholder.svg?height=40&width=40" },
    type: "rating",
    movie: { title: "Parasite", year: 2019, poster: "/placeholder.svg?height=80&width=60" },
    rating: 4,
    timestamp: "6 hours ago",
    likes: 18,
    comments: 5,
  },
]

export default function RecentActivity() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Recent activity</h2>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-[#1c2228] rounded-lg p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Link
                    href={`/user/${activity.user.username}`}
                    className="font-medium text-white hover:text-green-400"
                  >
                    {activity.user.name}
                  </Link>
                  <span className="text-gray-400">
                    {activity.type === "review" && "reviewed"}
                    {activity.type === "watchlist" && "added to watchlist"}
                    {activity.type === "rating" && "rated"}
                  </span>
                  <Link
                    href={`/film/${activity.movie.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    {activity.movie.title}
                  </Link>
                  <span className="text-gray-400">({activity.movie.year})</span>
                </div>

                {activity.rating && (
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= activity.rating! ? "fill-green-500 text-green-500" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {activity.content && activity.type === "review" && (
                  <p className="text-gray-300 mb-3">{activity.content}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{activity.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{activity.comments}</span>
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.timestamp}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Image
                  src={activity.movie.poster || "/placeholder.svg"}
                  alt={activity.movie.title}
                  width={60}
                  height={80}
                  className="rounded object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
