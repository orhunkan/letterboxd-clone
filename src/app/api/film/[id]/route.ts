// src/app/api/films/[id]/route.ts
import { NextResponse } from "next/server"

const TMDB = process.env.TMDB_API_KEY!  // .env dosyana ekle:  TMDB_API_KEY=xxx
const BASE = "https://api.themoviedb.org/3"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const movieRes = await fetch(`${BASE}/movie/${params.id}?api_key=${TMDB}&language=en-US`)
    if (!movieRes.ok) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const creditsRes = await fetch(`${BASE}/movie/${params.id}/credits?api_key=${TMDB}&language=en-US`)
    const movie = await movieRes.json()
    const credits = await creditsRes.json()

    return NextResponse.json({ movie, credits })           // {movie:{…}, credits:{…}}
  } catch (err) {
    console.error("[FILM_GET]", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
