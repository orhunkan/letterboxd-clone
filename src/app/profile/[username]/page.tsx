import { Suspense } from "react"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileNavigation from "@/components/profile/profile-navigation"
import FavoriteFilms from "@/components/profile/favorite-films"
import RecentActivity from "@/components/profile/recent-activity"
import RecentReviews from "@/components/profile/recent-reviews"
import ProfileSidebar from "@/components/profile/profile-sidebar"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params

  return (
    <div className="min-h-screen bg-[#14181c]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="animate-pulse bg-gray-800 h-24 rounded-lg" />}>
          <ProfileHeader username={username} />
        </Suspense>
        <ProfileNavigation />

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-12">
            <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg" />}>
              <FavoriteFilms />
              
            </Suspense>

            <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg" />}>
              <RecentActivity username={username} />
            </Suspense>

            <Suspense fallback={<div className="animate-pulse bg-gray-800 h-96 rounded-lg" />}>
              <RecentReviews username={username} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<div className="animate-pulse bg-gray-800 h-96 rounded-lg" />}>
              <ProfileSidebar username={username} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
