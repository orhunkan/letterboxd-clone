import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ListsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Lists</h1>
        <p className="text-gray-400 text-lg">Curated collections of films, created by our community</p>
      </div>

      <Link href="/lists/new">
        <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create List</span>
        </Button>
      </Link>
    </div>
  )
}
