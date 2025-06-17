// src/lib/auth.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export function getAuthSession() {
  return getServerSession(authOptions)
}
