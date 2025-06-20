import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w185";

type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) return NextResponse.json([]);

  try {
    const url = `${TMDB_BASE}/search/movie?` +
      new URLSearchParams({
        query,
        api_key: process.env.TMDB_API_KEY!,
        include_adult: "false",
        language: "en-US",
        page: "1",
      });

    const tmdbRes = await fetch(url, { next: { revalidate: 60 } });
    if (!tmdbRes.ok) throw new Error("TMDB error");

    const data = await tmdbRes.json();

    const results = (data.results as TMDBMovie[] ?? []).slice(0, 10).map((m) => ({
      id: m.id,
      title: m.title,
      posterUrl: m.poster_path ? `${IMG}${m.poster_path}` : null,
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error("search error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
