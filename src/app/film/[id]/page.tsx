import { getFilmById } from "@/lib/tmdb";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import FilmHero from "@/components/film/film-hero";
import FilmNavigation from "@/components/film/film-navigation";
import FilmCast from "@/components/film/film-cast";
import FilmNews from "@/components/film/film-news";
import FilmReviews from "@/components/film/film-reviews";
import FilmSidebar from "@/components/film/film-sidebar";
import { Suspense } from "react";

export default async function FilmPage({ params: { id } }: { params: { id: string } }   // ← destructure
) {
  const film = await getFilmById(id)
  if (!film) return <div className="text-white p-8">Film not found.</div>

  const session = await getAuthSession()

  const likesCount = await prisma.rating.count({ where: { movieId: film.id } })
  const userLike = session?.user
    ? await prisma.rating.findUnique({
        where: { userId_movieId: { userId: session.user.id, movieId: film.id } },
      })
    : null
  return (
    <div className="min-h-screen bg-[#14181c]">
      <FilmHero film={film} likesCount={likesCount} userLiked={Boolean(userLike)} />
      <div className="max-w-7xl mx-auto px-4">
        <FilmNavigation />
        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-12">
            <FilmCast cast={film.cast} runtime={film.runtime} />
            <Suspense fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg" />}>
              <FilmNews title={film.title} />
            </Suspense>
            <FilmReviews filmId={film.id} />
          </div>
          <div className="lg:col-span-1">
            <FilmSidebar film={film} />
          </div>
        </div>
      </div>
    </div>
  );
}
