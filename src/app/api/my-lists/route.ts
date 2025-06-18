import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const lists = await prisma.watchList.findMany({
    where: { user: { email: session.user.email } },
    select: { id: true, name: true, visibility: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(lists);
}
