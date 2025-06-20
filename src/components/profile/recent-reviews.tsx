import Image from "next/image"
import Link from "next/link"
import { Star, Heart, MessageCircle } from "lucide-react"
import { getRecentReviews } from "@/lib/db"

interface Props {
  username: string
}

export default async function RecentReviews({ username }: Props) {
  const reviews = await getRecentReviews(username)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Recent Reviews</h2>
        <Link href="/profile/reviews" className="text-gray-400 hover:text-white text-sm uppercase tracking-wide">
          More
        </Link>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#1c2228] rounded-lg p-6">
            <div className="flex space-x-4">
              <Link href={`/film/${review.movieId}`} className="flex-shrink-0">
                <Image
                  src={review.posterUrl ?? "/placeholder.svg"}
                  alt={review.title}
                  width={80}
                  height={120}
                  className="rounded object-cover"
                />
              </Link>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href={`/film/${review.movieId}`} className="text-xl font-bold text-white hover:text-green-400">
                      {review.title}
                    </Link>
                    <span className="text-gray-400 ml-2">{review.year}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? "fill-green-500 text-green-500" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className="text-gray-400 text-sm">Watched {review.watchedDate}</span>
                </div>

                <p className="text-gray-300 leading-relaxed">{review.review}</p>

                <div className="flex items-center space-x-4 pt-2">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{review.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{review.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
