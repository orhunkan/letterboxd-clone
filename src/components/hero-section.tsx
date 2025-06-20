import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
};

export default async function HeroSection() {
  // 1. pick the first “trending” movie of this week
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 * 60 } } // one-hour cache
  );

  if (!res.ok) notFound();

  const data = await res.json();
  const m: TMDBMovie | undefined = data.results?.[0];
  if (!m) notFound();

  const backdrop =
    m.backdrop_path && `https://image.tmdb.org/t/p/original${m.backdrop_path}`;

  const rating = (Math.round(m.vote_average * 10) / 10).toFixed(1);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* backdrop */}
      {backdrop && (
        <Image
          src={backdrop}
          alt={m.title}
          fill
          priority
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14181c] via-[#14181c]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-transparent to-transparent" />

      {/* content */}
      <div className="relative h-full flex items-center max-w-7xl mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white leading-tight">
              {m.title}
            </h1>
            <p className="text-xl text-gray-300">
              {new Date(m.release_date).getFullYear()} • TMDB Trending
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i <= Math.round(m.vote_average / 2)
                      ? "fill-green-500 text-green-500"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">{rating}</span>
            <span className="text-gray-400">• {m.vote_count.toLocaleString()} votes</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl line-clamp-4">
            {m.overview}
          </p>

          <div className="flex space-x-4">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              <Link href={`/film/${m.id}`}>
                <Play className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-green-600 px-6 py-3">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
