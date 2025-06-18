"use client"

import { Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import ProfileDropdown from "@/components/profile-dropdown"

export default function Header() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="bg-[#14181c] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ——— Logo & Nav ——— */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-green-500">
              Letterboxd
            </Link>
            <Link href="/" className="text-gray-100">
              Films
            </Link>             
            <Link href="/" className="text-gray-100">
              Lists
            </Link>            
            <Link href="/" className="text-gray-100">
              Members
            </Link>            
            <Link href="/" className="text-gray-100">
              Journals
            </Link>
          </div>

          {/* ——— Right side ——— */}
          <div className="flex items-center space-x-4">
            {/* arama & bildirim */}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

            {user ? (
              /* —— AUTHED —— */
              <ProfileDropdown
                name={user.name}
                image={user.image}
                username={user.id} 
              />
            ) : (
              /* —— GUEST —— */
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
