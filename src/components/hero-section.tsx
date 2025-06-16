import { Button } from "@/components/ui/button"
import { Star, Play } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=800&width=1400"
          alt="Featured movie backdrop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14181c] via-[#14181c]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center max-w-7xl mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white leading-tight">The Batman</h1>
            <p className="text-xl text-gray-300">2022 • Directed by Matt Reeves</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= 4 ? "fill-green-500 text-green-500" : "text-gray-400"}`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">4.1</span>
            <span className="text-gray-400">• 847K ratings</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to
            investigate the citys hidden corruption and question his familys involvement.
          </p>

          <div className="flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
              <Play className="w-4 h-4 mr-2" />
              Watch Trailer
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
