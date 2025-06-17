"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl") ?? "/"

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)
    if (!res?.error) {
      router.push(callbackUrl)
    } else {
      toast.error("Invalid email or password")
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="bg-[#1c2228] w-full max-w-sm p-8 rounded-lg space-y-4"
    >
      <h1 className="text-2xl font-bold text-white text-center">Sign in</h1>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`border-gray-700 placeholder-gray-400 ${
          email ? "bg-white text-black" : "bg-[#1c2228] text-white"
        }`}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
        className={`border-gray-700 placeholder-gray-400 ${
          password ? "bg-white text-black" : "bg-[#1c2228] text-white"
        }`}
      />

      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={loading}
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <p className="text-center text-gray-400 text-sm">
        No account?{" "}
        <a href="/register" className="text-green-400">
          Register
        </a>
      </p>
    </form>
  )
}
