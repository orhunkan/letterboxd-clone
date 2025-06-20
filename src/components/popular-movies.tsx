import Image from "next/image";
import Link from "next/link";

type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default async function PopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 60 * 30 } } // 30-minute cache
  );

  if (!res.ok) return null;

  const data = await res.json();
  const movies: TMDBMovie[] = data.results.slice(0, 10);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Popular right now</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((m) => (
          <Link key={m.id} href={`/film/${m.id}`} className="group">
            <div className="relative w-full aspect-[2/3] rounded overflow-hidden">
              <Image
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                    : "/placeholder.svg"
                }
                alt={m.title}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity"
              />
            </div>
            <p className="mt-2 text-gray-300 text-sm line-clamp-1">{m.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
