"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function ListsFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [timeframe, setTimeframe] = useState("all-time")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-white font-medium">Search Lists</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="Search lists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#2c3440] border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium">Sort By</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-[#2c3440] border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#2c3440] border-gray-600">
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="liked">Most Liked</SelectItem>
            <SelectItem value="commented">Most Commented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium">Timeframe</h3>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="bg-[#2c3440] border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#2c3440] border-gray-600">
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium">Categories</h3>
        <div className="space-y-2">
          {["Horror", "Comedy", "Drama", "Action", "Sci-Fi", "Documentary"].map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
