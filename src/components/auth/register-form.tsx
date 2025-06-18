"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email.")
      return
    }

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    setLoading(false)

    if (res.status === 201) {
      toast.success("Account created! Please sign in.")
      router.push("/auth/login")
      return
    }

      const result = await res.json();

      if (res.status === 201) {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      } else if (res.status === 409) {
        toast.error("Email is already in use.");
      } else {
        toast.error(result?.error ?? "Something went wrong.");
      }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1c2228] w-full max-w-sm p-8 rounded-lg space-y-4"
    >
      <h1 className="text-2xl font-bold text-white text-center">
        Create account
      </h1>

      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`border-gray-700 placeholder-gray-400 ${
          name ? "bg-white text-black" : "bg-[#1c2228] text-white"
        }`}
      />

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
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={loading}
      >
        {loading ? "Creating…" : "Register"}
      </Button>

      <p className="text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-green-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
