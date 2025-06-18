import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const watchlistMovies = [
  "/placeholder.svg?height=80&width=60&text=Movie1",
  "/placeholder.svg?height=80&width=60&text=Movie2",
  "/placeholder.svg?height=80&width=60&text=Movie3",
  "/placeholder.svg?height=80&width=60&text=Movie4",
]

const diaryEntries = [
  { date: "11 JUN", title: "The Phoenician Scheme" },
  { date: "10", title: "The Lighthouse" },
  { date: "9", title: "No Hard Feelings" },
  { date: "8", title: "(500) Days of Summer" },
  { date: "9", title: "Son of a Rich" },
]

const recentEntries = [{ date: "26 JAN", title: "Challengers" }]

export default function ProfileSidebar() {
  return (
    <div className="space-y-8">
      {/* Pro Upgrade Section */}
      <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">NEED AN UPGRADE?</h3>
          <p className="text-sm text-gray-200 mb-4">
            Profile stats, filtering by favorite streaming services, watchlist alerts and no ads!
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">GET PRO</Button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <div className="w-24 h-24 bg-white rounded-full" />
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Watchlist</h3>
          <span className="text-gray-400 text-sm">12</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {watchlistMovies.map((poster, index) => (
            <div key={index} className="relative aspect-[2/3] rounded overflow-hidden bg-gray-800">
              <Image src={poster || "/placeholder.svg"} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Diary Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Diary</h3>
          <span className="text-gray-400 text-sm">6</span>
        </div>
        <div className="space-y-2">
          {diaryEntries.map((entry, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 text-center">
                <div className="text-xs text-gray-400 font-mono">{entry.date}</div>
              </div>
              <Link href="#" className="text-sm text-gray-300 hover:text-white flex-1">
                {entry.title}
              </Link>
            </div>
          ))}

          {recentEntries.map((entry, index) => (
            <div key={`recent-${index}`} className="flex items-center space-x-3">
              <div className="w-8 text-center">
                <div className="text-xs text-gray-400 font-mono">{entry.date}</div>
              </div>
              <Link href="#" className="text-sm text-gray-300 hover:text-white flex-1">
                {entry.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Ratings</h3>
          <span className="text-gray-400 text-sm">33</span>
        </div>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-600 rounded-full" />
                ))}
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div className="bg-gray-500 h-1 rounded-full" style={{ width: `${Math.random() * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
