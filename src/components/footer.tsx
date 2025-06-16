import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0f1419] border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Letterboxd</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pro" className="text-gray-400 hover:text-white">
                  Pro
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Films</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/films/popular" className="text-gray-400 hover:text-white">
                  Popular
                </Link>
              </li>
              <li>
                <Link href="/films/recent" className="text-gray-400 hover:text-white">
                  Recent
                </Link>
              </li>
              <li>
                <Link href="/films/reviews" className="text-gray-400 hover:text-white">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/films/watchlist" className="text-gray-400 hover:text-white">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/members" className="text-gray-400 hover:text-white">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-gray-400 hover:text-white">
                  Lists
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-gray-400 hover:text-white">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/activity" className="text-gray-400 hover:text-white">
                  Activity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/twitter" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="text-gray-400 hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Letterboxd Clone. Made with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
