"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Eye, Heart, Plus, Star, ListPlus } from "lucide-react";

import { toggleLike } from "@/actions/film";
import { toggleWatched, toggleWatchlist } from "@/actions/watch";

import AddToListsModal from "@/components/film/add-to-lists-modal";

/* ------------------------------------------------------------------
   Props
-------------------------------------------------------------------*/
interface FilmHeroProps {
  film: {
    id: number;
    title: string;
    year: number;
    director: string;
    tagline: string;
    synopsis: string;
    poster: string;
    backdrop: string;
    rating: number;
    totalRatings: string;
    views: string;
  };
  likesCount: number;
  userLiked: boolean;
  watched: boolean;
  inWatchlist: boolean;
}

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
export default function FilmHero({
  film,
  likesCount,
  userLiked,
  watched,
  inWatchlist,
}: FilmHeroProps) {
  /* Auth / session */
  const { data: session } = useSession();
  const authed = Boolean(session?.user);

  /* React state */
  const [pending, start] = useTransition();
  const [liked, setLiked] = useState(userLiked);
  const [count, setCount] = useState(likesCount);
  const [isWatched, setIsWatched] = useState(watched);
  const [isInWatchlist, setIsInWatchlist] = useState(inWatchlist);

  /* Modal visibility */
  const [listModalOpen, setListModalOpen] = useState(false);

  /* ----------------------------------------------------------------
     Handlers
  -----------------------------------------------------------------*/
  const handleLike = () =>
    start(async () => {
      await toggleLike(film.id);
      setLiked((v) => !v);
      setCount((c) => (liked ? c - 1 : c + 1));
    });

  const handleWatch = () =>
    start(async () => {
      await toggleWatched(film.id);
      setIsWatched((v) => !v);
      if (!isWatched) setIsInWatchlist(false); // watched → remove list flag
    });

  const handleWatchlist = () =>
    start(async () => {
      await toggleWatchlist(film.id);
      setIsInWatchlist((v) => !v);
      if (!isInWatchlist) setIsWatched(false); // on add list → unset watched
    });

  /* ----------------------------------------------------------------
     Render helpers
  -----------------------------------------------------------------*/
  const Stat = ({
    icon,
    value,
    color,
  }: {
    icon: React.ReactNode;
    value: string;
    color: string;
  }) => (
    <div className={`flex items-center space-x-1 ${color}`}>
      {icon}
      <span>{value}</span>
    </div>
  );

  /* ----------------------------------------------------------------
     JSX
  -----------------------------------------------------------------*/
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={film.backdrop || "/placeholder.svg"}
            alt={film.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14181c] via-[#14181c]/90 to-[#14181c]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-transparent to-transparent" />
        </div>

        {/* Foreground */}
        <div className="relative z-10 flex items-center min-h-screen max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-start space-x-8 w-full">
            {/* Poster + stats */}
            <div className="flex-shrink-0">
              <div className="relative w-80 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={film.poster || "/placeholder.svg"}
                  alt={film.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
                <Stat
                  icon={<Eye className="w-4 h-4" />}
                  value={film.views}
                  color="text-green-500"
                />
                <Stat
                  icon={<Star className="w-4 h-4" />}
                  value={String(count)}
                  color="text-green-500"
                />
                <Stat
                  icon={<Heart className="w-4 h-4" />}
                  value={film.totalRatings}
                  color="text-orange-500"
                />
              </div>
            </div>

            {/* Info + buttons */}
            <div className="flex-1 space-y-6 max-w-2xl">
              <header className="space-y-2">
                <h1 className="text-5xl font-bold text-white leading-tight">
                  {film.title}
                </h1>
                <p className="text-xl text-gray-300">
                  {film.year} • Directed by {film.director}
                </p>
              </header>

              <p className="text-lg font-medium text-gray-300 uppercase tracking-wide">
                {film.tagline}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {film.synopsis}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {/* Watch / Unwatch */}
                <Button
                  className={`${
                    isWatched
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-[#40bcf4] hover:bg-[#40bcf4]/90"
                  } text-white flex items-center justify-center space-x-2`}
                  disabled={pending || !authed}
                  onClick={handleWatch}
                >
                  <Eye className="w-4 h-4" />
                  <span>
                    {pending ? "Saving…" : isWatched ? "Unwatch" : "Watch"}
                  </span>
                </Button>

                {/* Like */}
                <Button
                  variant="outline"
                  disabled={pending || !authed}
                  onClick={handleLike}
                  className="border-gray-600 text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{pending ? "Saving…" : liked ? "Liked" : "Like"}</span>
                </Button>

                {/* Watchlist */}
                <Button
                  variant="outline"
                  disabled={pending || !authed}
                  onClick={handleWatchlist}
                  className="col-span-2 border-gray-600 text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {pending
                      ? "Saving…"
                      : isInWatchlist
                      ? "In Watchlist"
                      : "Watchlist"}
                  </span>
                </Button>

                {/* Add to Lists */}
                <Button
                  variant="secondary"
                  disabled={!authed}
                  onClick={() => setListModalOpen(true)}
                  className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center space-x-2"
                >
                  <ListPlus className="w-4 h-4" />
                  <span>Add to Lists</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AddToListsModal */}
      <AddToListsModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        filmId={film.id}
        filmTitle={film.title}
      />
    </>
  );
}
