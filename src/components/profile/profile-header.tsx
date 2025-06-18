import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

interface ProfileHeaderProps {
  username: string
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt={username} />
          <AvatarFallback className="text-2xl bg-gray-600 text-white">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">{username}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              EDIT PROFILE
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">34</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Films</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">6</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">This Year</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Following</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Followers</div>
        </div>
      </div>
    </div>
  )
}
