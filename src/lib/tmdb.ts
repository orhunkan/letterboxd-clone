/* ---------------------------------------------------------------------
 *  TMDB & News helpers – strict typing, zero `any`
 * ------------------------------------------------------------------- */

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_KEY  = process.env.TMDB_API_KEY;
const NEWS_KEY  = process.env.NEWS_API_KEY;

/* ---------- TMDB TYPES ---------- */

interface TmdbGenre  { id: number; name: string }
interface TmdbCast   { name: string }
interface TmdbCrew   { job: string; name: string }

interface TmdbCredits {
  cast: TmdbCast[]
  crew: TmdbCrew[]
}

export interface TmdbMovieRaw {
  id: number
  title: string
  release_date: string
  tagline: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  runtime: number
  genres: TmdbGenre[]
  credits: TmdbCredits
}

/* ---------- INTERNAL MOVIE DTO ---------- */

export interface MovieDTO {
  id: number
  title: string
  year: number
  director: string
  tagline: string
  synopsis: string
  poster: string
  backdrop: string
  rating: number
  totalRatings: string
  likes: string
  views: string
  runtime: string
  genres: string[]
  cast: string[]
}

/* ---------- NEWS TYPES ---------- */

export interface NewsItem {
  id: number
  title: string
  category: "NEWS"
  image: string | null
  link: string
}

interface NewsApiArticle {
  title: string
  url: string
  urlToImage: string | null
}

interface NewsApiResponse {
  articles: NewsApiArticle[]
}

/* ------------------------------------------------------------------ */
/*  Film helpers                                                      */
/* ------------------------------------------------------------------ */

export async function getFilmById(id: string): Promise<MovieDTO | null> {
  const url =
    `${TMDB_BASE}/movie/${id}?` +
    `api_key=${TMDB_KEY}&language=en-US&append_to_response=credits`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data: TmdbMovieRaw = await res.json();

  /* transform */
  return {
    id: data.id,
    title: data.title,
    year: new Date(data.release_date).getFullYear(),
    director: data.credits.crew.find((p) => p.job === "Director")?.name ?? "Unknown",
    tagline: data.tagline,
    synopsis: data.overview,
    poster: `https://image.tmdb.org/t/p/w500${data.poster_path ?? ""}`,
    backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path ?? ""}`,
    rating: +(data.vote_average / 2).toFixed(1),      // 0–10 → 0–5
    totalRatings: `${data.vote_count.toLocaleString()} votes`,
    likes: "0",          // DB’den gelecek
    views: data.popularity.toFixed(0),
    runtime: `${data.runtime} mins`,
    genres: data.genres.map((g) => g.name),
    cast:  data.credits.cast.slice(0, 20).map((c) => c.name),
  };
}

/* ------------------------------------------------------------------ */
/*  News helpers                                                      */
/* ------------------------------------------------------------------ */

export async function getFilmNews(queryTitle: string): Promise<NewsItem[]> {
  if (!NEWS_KEY) return [];

  const q   = encodeURIComponent(queryTitle);
  const url = `https://newsapi.org/v2/everything?q=${q}&pageSize=5&apiKey=${NEWS_KEY}`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) return [];

  const { articles }: NewsApiResponse = await res.json();

  return articles.map((a, idx): NewsItem => ({
    id: idx,
    title: a.title,
    category: "NEWS",
    image: a.urlToImage,
    link:  a.url,
  }));
}
