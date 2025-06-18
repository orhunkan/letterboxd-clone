import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

// GET /api/lists/:id/has/:filmId
export async function GET(
  _req: Request,
  { params }: { params: { id: string; filmId: string } }
) {
  const inList = await prisma.watchList.findFirst({
    where: {
      id: params.id,
      movies: { some: { id: Number(params.filmId) } },
    },
    select: { id: true },
  });

  return NextResponse.json({ inList: Boolean(inList) });
}
