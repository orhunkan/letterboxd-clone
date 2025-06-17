import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/hash"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password) // 🔥 DİKKAT: await olmalı!

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("[REGISTER_ERROR]", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
