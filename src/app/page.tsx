import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import PopularMovies from "@/components/popular-movies"
import RecentActivity from "@/components/recent-activity"
import FeaturedLists from "@/components/featured-lists"
import NewsSection from "@/components/news-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#14181c]">
      <main>
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
          <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg" />}>
            <PopularMovies />
          </Suspense>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="animate-pulse bg-gray-800 h-96 rounded-lg" />}>
                <RecentActivity />
              </Suspense>
            </div>

            <div className="space-y-8">
              <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg" />}>
                <FeaturedLists />
              </Suspense>

              <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg" />}>
                <NewsSection />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
