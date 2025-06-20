"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Rss } from "lucide-react"

const navItems = [
  { name: "Profile", href: "/profile" },
  { name: "Activity", href: "/profile/activity" },
  { name: "Films", href: "/profile/films" },
  { name: "Diary", href: "/profile/diary" },
  { name: "Reviews", href: "/profile/reviews" },
  { name: "Watchlist", href: "/profile/watchlist" },
  { name: "Lists", href: "/profile/lists" },
  { name: "Likes", href: "/profile/likes" },
  { name: "Tags", href: "/profile/tags" },
  { name: "Network", href: "/profile/network" },
]

export default function ProfileNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-gray-800 mt-8">
      <div className="flex items-center justify-between">
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={""}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                pathname === item.href || (pathname === "/profile/orhunkandemir" && item.name === "Profile")
                  ? "border-green-500 text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Rss className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
