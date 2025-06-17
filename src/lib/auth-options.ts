// src/lib/auth-options.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
  // 1) ZORUNLU gizli anahtar
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.hashedPassword) return null

        const valid = await bcrypt.compare(password, user.hashedPassword)
        return valid ? { id: user.id, email: user.email, name: user.name } : null
      },
    }),
  ],

  pages: {
    // 2) Doğru yol
    signIn: "/auth/login",
    error: "/auth/error", // opsiyonel özel hata sayfası
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub
      return session
    },
  },
}
