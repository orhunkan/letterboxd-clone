"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {prisma} from "@/lib/prisma";
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

  // Create default watchlist if it doesn't exist
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

  // When adding to watchlist, ensure it's not marked as watched
  if (!inList) {
    await prisma.watchedMovie.deleteMany({
      where: { userId, movieId },
    });
  }

  revalidatePath(`/film/${movieId}`);
}

/* -------------------------------------------------------
   toggleWatched — mark / unmark movie as watched
--------------------------------------------------------*/
export async function toggleWatched(movieId: number) {
  const userId = await getUserId();

  const existing = await prisma.watchedMovie.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (existing) {
    // Un-watch → remove record
    await prisma.watchedMovie.delete({ where: { id: existing.id } });
  } else {
    // Watch → create record
    await prisma.watchedMovie.create({
      data: { userId, movieId },
    });

    // Instead of updateMany → find and update one-by-one
    const lists = await prisma.watchList.findMany({
      where: {
        userId,
        name: "Watchlist",
        movies: {
          some: { id: movieId },
        },
      },
      select: { id: true },
    });

    for (const list of lists) {
      await prisma.watchList.update({
        where: { id: list.id },
        data: {
          movies: {
            disconnect: { id: movieId },
          },
        },
      });
    }
  }

  revalidatePath(`/film/${movieId}`);
}
