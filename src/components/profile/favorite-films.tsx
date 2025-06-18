import Image from "next/image"
import Link from "next/link"

const favoriteFilms = [
  {
    id: 1,
    title: "Our Idiot Brother",
    poster: "/placeholder.svg?height=300&width=200&text=Our+Idiot+Brother",
  },
  {
    id: 2,
    title: "La La Land",
    poster: "/placeholder.svg?height=300&width=200&text=La+La+Land",
  },
  {
    id: 3,
    title: "Dead Poets Society",
    poster: "/placeholder.svg?height=300&width=200&text=Dead+Poets+Society",
  },
  {
    id: 4,
    title: "A Beautiful Mind",
    poster: "/placeholder.svg?height=300&width=200&text=A+Beautiful+Mind",
  },
]

export default function FavoriteFilms() {
  return (
    <section className="space-y-6">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Favorite Films</h2>

      <div className="grid grid-cols-4 gap-4">
        {favoriteFilms.map((film) => (
          <Link key={film.id} href={`/film/${film.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={film.poster || "/placeholder.svg"}
                alt={film.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
