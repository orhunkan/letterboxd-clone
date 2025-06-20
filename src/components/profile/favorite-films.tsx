import Image from "next/image"
import Link from "next/link"
import { getFavoriteMoviesByUsername } from "@/lib/db"

interface Props {
  username: string
}

export default async function FavoriteFilms({ username }: Props) {
  const favorites = await getFavoriteMoviesByUsername(username)

  return (
    <section className="space-y-6">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Favorite Films</h2>
      <div className="grid grid-cols-4 gap-4">
        {favorites.map((film) => (
          <Link key={film.id} href={`/film/${film.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={film.posterUrl ?? "/placeholder.svg"}
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
