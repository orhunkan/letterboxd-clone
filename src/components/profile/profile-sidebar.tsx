import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getWatchlistPreview,
  getDiaryEntries,
  getProfileStats,
} from "@/lib/db";

interface Props {
  username: string;
}

export default async function ProfileSidebar({ username }: Props) {
  /* fetch data in parallel */
  const [watchlist, diary, stats] = await Promise.all([
    getWatchlistPreview(username), // first 4 movies (id + posterUrl)
    getDiaryEntries(username, 6),  // last 6 diary items
    getProfileStats(username),     // counts (watchlist, ratings, followers…)
  ]);

  return (
    <div className="space-y-8">
      {/* PRO promo */}
      <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">NEED AN UPGRADE?</h3>
          <p className="text-sm text-gray-200 mb-4">
            Profile stats, watchlist alerts and no ads!
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
            GET&nbsp;PRO
          </Button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <div className="w-24 h-24 bg-white rounded-full" />
        </div>
      </div>

      {/* Watchlist preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Watchlist
          </h3>
          <span className="text-gray-400 text-sm">
            {stats.watchlistCount}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {watchlist.map((m) => (
            <Link
              key={m.id}
              href={`/film/${m.id}`}
              className="relative aspect-[2/3] rounded overflow-hidden bg-gray-800"
            >
              <Image
                src={m.posterUrl ?? "/placeholder.svg"}
                alt=""
                fill
                className="object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Diary preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Diary
          </h3>
          <span className="text-gray-400 text-sm">{stats.diaryCount}</span>
        </div>
        <div className="space-y-2">
          {diary.map((entry) => (
            <div key={entry.id} className="flex items-center space-x-3">
              <div className="w-8 text-center">
                <div className="text-xs text-gray-400 font-mono">
                  {entry.date}
                </div>
              </div>
              <Link
                href={`/film/${entry.movieId}`}
                className="text-sm text-gray-300 hover:text-white flex-1"
              >
                {entry.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings summary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Ratings
          </h3>
          <span className="text-gray-400 text-sm">{stats.ratingsCount}</span>
        </div>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((stars) => {
            const pct = stats.ratingDistribution[stars] ?? 0;
            return (
              <div key={stars} className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  ))}
                  {Array.from({ length: 5 - stars }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-600 rounded-full"
                    />
                  ))}
                </div>
                <div className="flex-1 bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-gray-500 h-1 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
