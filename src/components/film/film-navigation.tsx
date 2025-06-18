// src/components/film/film-navigation.tsx
"use client"

import Link from "next/link"

export default function FilmNavigation() {
  return (
    <nav className="border-b border-gray-800 py-4 flex items-center space-x-8 overflow-x-auto">
      {["Overview", "Reviews", "Cast & Crew", "Lists"].map((tab) => (
        <Link
          key={tab}
          href="#"
          className="text-gray-400 hover:text-white whitespace-nowrap"
        >
          {tab}
        </Link>
      ))}
    </nav>
  )
}
