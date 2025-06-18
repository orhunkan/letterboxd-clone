import { Metadata } from "next";
import { getFilmById } from "@/lib/tmdb";
import NewListClient from "@/components/lists/new-list-client";

export const metadata: Metadata = {
  title: "Create New List",
};

/* ------------------------------------------------------------------
   Route: /lists/new?film=123
   Server component: fetch film details, pass to client component
-------------------------------------------------------------------*/
export default async function NewListPage({
  searchParams,
}: {
  searchParams: { film?: string };
}) {
  // Parse film id from query
  const filmId = Number(searchParams.film);
  let defaultFilm = null;

  if (!isNaN(filmId) && filmId > 0) {
    // Fetch minimal data to pre-populate
    const f = await getFilmById(String(filmId));
    if (f) {
      defaultFilm = {
        id: String(f.id),
        title: f.title,
        year: f.year,
        poster: f.poster || "/placeholder.svg",
      };
    }
  }

  return <NewListClient defaultFilm={defaultFilm} />;
}
