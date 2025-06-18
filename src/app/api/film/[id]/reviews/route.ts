import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

/* --- GET reviews --- */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const reviews = await prisma.review.findMany({
    where: { movieId: Number(params.id) },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, image: true }, // 🆕 burada
      },
    },
  })

  return NextResponse.json(reviews)
}

/* --- POST review --- */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getAuthSession()
  if (!session?.user) return NextResponse.json({ error: "Unauth" }, { status: 401 })

  const { body, rating } = await req.json()

  await prisma.review.create({
    data: {
      movieId: Number(params.id),
      authorId: session.user.id,
      body,
      rating,
    },
  })

  return NextResponse.json({ ok: true })
}
