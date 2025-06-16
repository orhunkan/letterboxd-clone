// src/lib/tmdb.ts
const TMDB_BASE = "https://api.themoviedb.org/3"

export interface TmdbMovie {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
}

async function tmdbFetch<T>(path: string, search = ""): Promise<T> {
  const res = await fetch(
    `${TMDB_BASE}${path}?api_key=${process.env.TMDB_API_KEY}&language=en-US${search}`,
    { next: { revalidate: 60 * 60 } }, // 1 saat
  )
  if (!res.ok) throw new Error("TMDB isteği patladı")
  return res.json() as Promise<T>
}

export async function getTrendingMovies(): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<{ results: TmdbMovie[] }>("/trending/movie/week")
  return data.results
}

export async function getPopularMovies(page = 1): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<{ results: TmdbMovie[] }>(
    "/movie/popular",
    `&page=${page}`,
  )
  return data.results
}
