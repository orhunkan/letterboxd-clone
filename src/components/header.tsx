import { Search, Bell, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="bg-[#14181c] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-green-500">
              Letterboxd
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/films" className="text-gray-300 hover:text-white transition-colors">
                Films
              </Link>
              <Link href="/lists" className="text-gray-300 hover:text-white transition-colors">
                Lists
              </Link>
              <Link href="/members" className="text-gray-300 hover:text-white transition-colors">
                Members
              </Link>
              <Link href="/journal" className="text-gray-300 hover:text-white transition-colors">
                Journal
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search films, lists, people..."
                className="pl-10 w-64 bg-[#1c2228] border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <User className="w-5 h-5" />
            </Button>

            <Button className="bg-green-600 hover:bg-green-700 text-white">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
