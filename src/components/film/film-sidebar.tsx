import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"

interface FilmSidebarProps {
  film: {
    rating: number
    totalRatings: string
  }
}

const streamingServices = [
  { name: "Amazon US", type: "RENT • BUY • 4K", logo: "/placeholder.svg?height=20&width=20&text=A" },
  { name: "Disney Plus TR", type: "PLAY", logo: "/placeholder.svg?height=20&width=20&text=D+" },
  { name: "Apple TV TR", type: "RENT • BUY", logo: "/placeholder.svg?height=20&width=20&text=TV" },
  { name: "Google Play TR", type: "RENT • BUY", logo: "/placeholder.svg?height=20&width=20&text=GP" },
]

export default function FilmSidebar({ film }: FilmSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Where to Watch */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Where to Watch</h3>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            🎬 Trailer
          </Button>
        </div>

        <div className="space-y-3">
          {streamingServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-[#1c2228] rounded-lg hover:bg-[#242a32] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">{service.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{service.name}</div>
                <div className="text-gray-400 text-xs">{service.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="link" className="text-orange-400 hover:text-orange-300 text-sm">
            Go PRO to customize this list
          </Button>
        </div>

        <div className="text-center">
          <Button variant="link" className="text-gray-400 hover:text-white text-sm">
            All services... ▶JustWatch
          </Button>
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Ratings</h3>
          <span className="text-gray-400 text-sm">29K FANS</span>
        </div>

        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-white">{film.rating}</div>
          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(film.rating) ? "fill-green-500 text-green-500" : "text-gray-600"}`}
              />
            ))}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 w-12">
                {Array.from({ length: rating }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                ))}
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div className="bg-green-500 h-1 rounded-full" style={{ width: `${Math.random() * 80 + 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="space-y-3">
          <h3 className="font-bold">REGNUM CARYA</h3>
          <p className="text-sm">Life Well Lived.</p>
          <Button className="bg-white text-blue-800 hover:bg-gray-100 w-full">BOOK NOW</Button>
        </div>
        <div className="mt-4">
          <Image
            src="/placeholder.svg?height=120&width=200&text=Resort+Ad"
            alt="Resort Advertisement"
            width={200}
            height={120}
            className="rounded object-cover w-full"
          />
        </div>
      </div>
    </div>
  )
}
