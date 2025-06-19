import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

interface Props {
  listId: string;
  isRanked: boolean;
}

export default async function ListDetailFilms({ listId, isRanked }: Props) {
  const movies = await prisma.watchList.findUnique({
    where: { id: listId },
    select: {
      movies: {
        select: {
          id: true,
          title: true,
          posterUrl: true,
          year: true,
        },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!movies) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Films</h2>
        <span className="text-gray-400">
          {movies.movies.length} films
        </span>
      </div>

      <div className="space-y-4">
        {movies.movies.map((film, idx) => (
          <div
            key={film.id}
            className="bg-[#1c2228] rounded-lg p-6 hover:bg-[#242a32] transition-colors"
          >
            <div className="flex space-x-4">
              {isRanked && (
                <div className="flex-shrink-0 w-8 text-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {idx + 1}
                  </span>
                </div>
              )}

              {/* poster */}
              <Link href={`/film/${film.id}`} className="flex-shrink-0">
                <Image
                  src={film.posterUrl || "/placeholder.svg"}
                  alt={film.title}
                  width={80}
                  height={120}
                  className="rounded object-cover hover:scale-105 transition-transform"
                />
              </Link>

              {/* info */}
              <div className="flex-1 space-y-3">
                <div>
                  <Link
                    href={`/film/${film.id}`}
                    className="text-xl font-bold text-white hover:text-green-400"
                  >
                    {film.title}
                  </Link>
                  <p className="text-gray-400">
                    {film.year ?? "—"} • Directed by Unknown
                  </p>
                </div>

                {/* rating placeholder */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-gray-600"
                    />
                  ))}
                  <span className="text-white font-medium">—</span>
                </div>
              </div>

              {/* like btn placeholder */}
              <div className="flex-shrink-0 flex items-start">
                <button className="text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
