"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import ProfileDropdown from "@/components/profile-dropdown";

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/
interface ApiMovie {
  id: number;
  title: string;
  posterUrl: string | null;
}

interface Movie {
  id: number;
  title: string;
  image: string;
}

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data: ApiMovie[] = await res.json();

      setResults(
        data.map((m) => ({
          id: m.id,
          title: m.title,
          image: m.posterUrl ?? "/placeholder.svg",
        }))
      );
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <header className="bg-[#14181c] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left — logo & nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-green-500">
              Letterboxd
            </Link>
            <Link href="/" className="text-gray-100">
              Films
            </Link>
            <Link href="/lists" className="text-gray-100">
              Lists
            </Link>
            <Link href="/" className="text-gray-100">
              Members
            </Link>
            <Link href="/" className="text-gray-100">
              Journals
            </Link>
          </div>

          {/* Right — search, bell, profile */}
          <div className="flex items-center space-x-4 relative">
            {/* search */}
            <div className="relative">
              <Input
                placeholder="Search movies…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-48 md:w-64 bg-gray-800 text-white pl-10 placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />

              {results.length > 0 && (
                <ul className="absolute z-20 mt-2 w-full bg-[#1e1e1e] border border-gray-700 rounded-md max-h-72 overflow-y-auto shadow-lg divide-y divide-gray-700">
                  {results.map((movie) => (
                    <li key={movie.id}>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                        onClick={() => {
                          router.push(`/film/${movie.id}`);
                          setQuery("");
                          setResults([]);
                        }}
                      >
                        {movie.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* bell */}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

            {/* auth */}
            {user ? (
              <ProfileDropdown name={user.name} image={user.image} username={user.id} />
            ) : (
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
