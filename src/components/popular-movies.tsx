import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const movies = [
  { id: 1, title: "Oppenheimer", year: 2023, rating: 4.2, poster: "/placeholder.svg?height=300&width=200" },
  { id: 2, title: "Barbie", year: 2023, rating: 3.8, poster: "/placeholder.svg?height=300&width=200" },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    rating: 4.5,
    poster: "/placeholder.svg?height=300&width=200",
  },
  { id: 4, title: "John Wick: Chapter 4", year: 2023, rating: 4.1, poster: "/placeholder.svg?height=300&width=200" },
  { id: 5, title: "Scream VI", year: 2023, rating: 3.6, poster: "/placeholder.svg?height=300&width=200" },
  {
    id: 6,
    title: "The Super Mario Bros. Movie",
    year: 2023,
    rating: 3.4,
    poster: "/placeholder.svg?height=300&width=200",
  },
]

export default function PopularMovies() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular this week</h2>
        <Link href="/films/popular" className="text-green-500 hover:text-green-400 font-medium">
          More
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/film/${movie.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>

            <div className="mt-2 space-y-1">
              <h3 className="text-white font-medium text-sm leading-tight group-hover:text-green-400 transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{movie.year}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-green-500 text-green-500" />
                  <span className="text-gray-300">{movie.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
