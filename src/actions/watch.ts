"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getFilmById } from "@/lib/tmdb"; // TMDB fetch helper
import { revalidatePath } from "next/cache";

/* -------------------------------------------------------
   Helper — returns authenticated userId or throws
--------------------------------------------------------*/
async function getUserId(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  return user.id;
}

/* -------------------------------------------------------
   toggleWatchlist — add/remove movie from default list
--------------------------------------------------------*/
export async function toggleWatchlist(movieId: number) {
  const userId = await getUserId();

  const list = await prisma.watchList.findFirst({
    where: { userId, name: "Watchlist" },
    include: { movies: true },
  });

  if (!list) {
    await prisma.watchList.create({
      data: {
        name: "Watchlist",
        userId,
        movies: { connect: { id: movieId } },
      },
    });
    return revalidatePath(`/film/${movieId}`);
  }

  const inList = list.movies.some((m) => m.id === movieId);

  await prisma.watchList.update({
    where: { id: list.id },
    data: {
      movies: {
        [inList ? "disconnect" : "connect"]: { id: movieId },
      },
    },
  });

  if (!inList) {
    await prisma.watchedMovie.deleteMany({
      where: { userId, movieId },
    });
  }

  revalidatePath(`/film/${movieId}`);
}

/* -------------------------------------------------------
   toggleWatched — mark / unmark movie as watched
   • Ensures Movie row exists (upsert via TMDB)
--------------------------------------------------------*/
export async function toggleWatched(movieId: number) {
  const userId = await getUserId();

  /* 1. make sure Movie row exists */
  const exists = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!exists) {
    const film = await getFilmById(movieId.toString());
    if (!film) throw new Error("TMDB fetch failed");

    await prisma.movie.create({
      data: {
        id: film.id,
        title: film.title,
        posterUrl: film.poster,
        year: film.year ?? null,
      },
    });
  }

  /* 2. toggle WatchedMovie */
  const watched = await prisma.watchedMovie.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (watched) {
    await prisma.watchedMovie.delete({ where: { id: watched.id } });
  } else {
    await prisma.watchedMovie.create({
      data: { userId, movieId },
    });

    const lists = await prisma.watchList.findMany({
      where: {
        userId,
        name: "Watchlist",
        movies: { some: { id: movieId } },
      },
      select: { id: true },
    });

    for (const list of lists) {
      await prisma.watchList.update({
        where: { id: list.id },
        data: { movies: { disconnect: { id: movieId } } },
      });
    }
  }

  revalidatePath(`/film/${movieId}`);
}

/* -------------------------------------------------------
   addOrRemoveFromList — toggle movie in arbitrary list
   • Upserts Movie if missing
--------------------------------------------------------*/
export async function addOrRemoveFromList(
  listId: string,
  movie: { id: number; title: string; poster: string; year: number | null }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthenticated");

  const already = await prisma.watchList.findFirst({
    where: { id: listId, movies: { some: { id: movie.id } } },
    select: { id: true },
  });

  if (already) {
    await prisma.watchList.update({
      where: { id: listId },
      data: { movies: { disconnect: { id: movie.id } } },
    });
    return { added: false };
  }

  await prisma.movie.upsert({
    where: { id: movie.id },
    update: {},
    create: {
      id: movie.id,
      title: movie.title,
      posterUrl: movie.poster,
      year: movie.year,
    },
  });

  await prisma.watchList.update({
    where: { id: listId },
    data: { movies: { connect: { id: movie.id } } },
  });

  return { added: true };
}
