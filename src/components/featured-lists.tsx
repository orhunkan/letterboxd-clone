import Image from "next/image"
import Link from "next/link"

const lists = [
  {
    id: 1,
    title: "Best Films of 2023",
    author: "Letterboxd Staff",
    movieCount: 50,
    previews: [
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
    ],
  },
  {
    id: 2,
    title: "Underrated Horror Gems",
    author: "HorrorFan92",
    movieCount: 25,
    previews: [
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
    ],
  },
  {
    id: 3,
    title: "Criterion Collection Essentials",
    author: "CinemaLover",
    movieCount: 100,
    previews: [
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
      "/placeholder.svg?height=60&width=40",
    ],
  },
]

export default function FeaturedLists() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Featured Lists</h2>
        <Link href="/lists" className="text-green-500 hover:text-green-400 font-medium text-sm">
          More
        </Link>
      </div>

      <div className="space-y-4">
        {lists.map((list) => (
          <Link key={list.id} href={`/list/${list.id}`} className="block group">
            <div className="bg-[#1c2228] rounded-lg p-4 hover:bg-[#242a32] transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {list.previews.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview || "/placeholder.svg"}
                      alt=""
                      width={40}
                      height={60}
                      className="rounded border-2 border-[#14181c] object-cover"
                    />
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-green-400 transition-colors">{list.title}</h3>
                  <p className="text-sm text-gray-400">
                    by {list.author} • {list.movieCount} films
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
