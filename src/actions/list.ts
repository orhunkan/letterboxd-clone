"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {prisma} from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* -------------------------------------------------------
   createList — saves a new WatchList with movies
--------------------------------------------------------*/
interface CreateListInput {
  name: string;
  description: string;
  tags: string;
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS";
  ranked: boolean;
  movies: MovieInput[];
}
interface MovieInput {
  id: number;
  title: string;
  poster: string;
  year: number;
}
export async function createList(data: CreateListInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  await prisma.watchList.create({
    data: {
      name: data.name,
      description: data.description,
      tags: data.tags,
      visibility: data.visibility,
      ranked: data.ranked,
      userId: user.id,
      movies: {
        connectOrCreate: data.movies.map((m) => ({
          where: { id: m.id },
          create: {
            id: m.id,
            title: m.title,
            posterUrl: m.poster,
            year: m.year,
          },
        })),
      },
    },
  });

  revalidatePath("/lists");
}