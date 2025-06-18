"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

interface ProfileProps {
  name: string | null | undefined
  image: string | null | undefined
  username: string
}

export default function ProfileDropdown({ name, image, username }: ProfileProps) {
  const [open, setOpen] = useState(false)
  const firstLetter = (name ?? "?")[0]?.toUpperCase()

  return (
    <div className="relative inline-block text-left">
      {/* Avatar / Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center hover:bg-green-700 transition"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name ?? "avatar"} className="w-full h-full rounded-full object-cover" />
        ) : (
          firstLetter
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <Link
            href={`/user/${username}`}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(false)}
          >
            My profile
          </Link>
          <button
            onClick={() => {
              setOpen(false)
              signOut({ callbackUrl: "/" })
            }}
            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
