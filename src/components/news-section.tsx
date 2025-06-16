import Image from "next/image"
import Link from "next/link"

const news = [
  {
    id: 1,
    title: "Cannes Film Festival 2024 Winners Announced",
    excerpt: "The Palme d'Or goes to an unexpected indie darling...",
    image: "/placeholder.svg?height=100&width=150",
    timestamp: "1 day ago",
  },
  {
    id: 2,
    title: "Christopher Nolan's Next Project Revealed",
    excerpt: "The acclaimed director is set to tackle another mind-bending thriller...",
    image: "/placeholder.svg?height=100&width=150",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    title: "Streaming Wars: New Platform Launches",
    excerpt: "Another major studio enters the streaming battlefield...",
    image: "/placeholder.svg?height=100&width=150",
    timestamp: "3 days ago",
  },
]

export default function NewsSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Film News</h2>
        <Link href="/news" className="text-green-500 hover:text-green-400 font-medium text-sm">
          More
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((article) => (
          <Link key={article.id} href={`/news/${article.id}`} className="block group">
            <div className="bg-[#1c2228] rounded-lg p-4 hover:bg-[#242a32] transition-colors">
              <div className="flex space-x-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt=""
                  width={80}
                  height={60}
                  className="rounded object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-green-400 transition-colors text-sm leading-tight mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">{article.excerpt}</p>
                  <span className="text-xs text-gray-500">{article.timestamp}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
