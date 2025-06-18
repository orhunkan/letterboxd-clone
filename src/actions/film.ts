"use server"

import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { getFilmById } from "@/lib/tmdb"
import { revalidatePath } from "next/cache"

async function ensureMovieExists(movieId: number) {
  const exists = await prisma.movie.findUnique({ where: { id: movieId } })
  if (exists) return

  const tmdb = await getFilmById(String(movieId)).catch(() => null)

  await prisma.movie.create({
    data: {
      id: movieId,
      title: tmdb?.title ?? "Unknown",
      posterUrl: tmdb?.poster ?? null,
      year: tmdb?.year ?? null,
    },
  })
}

/* ----------------------------------------------------------- */
/*  LIKE                      */
/* ----------------------------------------------------------- */
export async function toggleLike(movieId: number) {
  const session = await getAuthSession()
  if (!session?.user) throw new Error("Not authenticated")

  await ensureMovieExists(movieId)

  await prisma.rating.upsert({
    where: { userId_movieId: { userId: session.user.id, movieId } },
    create: { userId: session.user.id, movieId, value: 5 },
    update: { value: 5 },
  })

  revalidatePath(`/film/${movieId}`)
}

/* ----------------------------------------------------------- */
/*  REVIEW */
/* ----------------------------------------------------------- */
/* ---- ADD / UPDATE REVIEW ---- */
export async function addReview(
  movieId: number,
  body: string,
  rating: number | null
) {
  const s = await getAuthSession()
  if (!s?.user) throw new Error("Not authed")

  await ensureMovieExists(movieId)

  await prisma.review.upsert({
    where: { authorId_movieId: { authorId: s.user.id, movieId } },
    create: { authorId: s.user.id, movieId, body, rating: rating ?? undefined },
    update: { body, rating: rating ?? undefined, createdAt: new Date() },
  })

  revalidatePath(`/film/${movieId}`)
}

export async function deleteReview(movieId: number) {
  const s = await getAuthSession()
  if (!s?.user) throw new Error("Not authed")

  await prisma.review.delete({
    where: { authorId_movieId: { authorId: s.user.id, movieId } },
  })

  revalidatePath(`/film/${movieId}`)
}
