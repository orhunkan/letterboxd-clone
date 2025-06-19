"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Eye } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/
interface GridItem {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string | null; // can be null
  filmCount: number;
  likes: number;
  comments: number;
  views: number;
  previews: string[];
  createdAt: string;
}

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
export default function ListsGrid({ lists }: { lists: GridItem[] }) {
  return (
    <div className="space-y-6">
      {/* heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular Lists</h2>
        <span className="text-gray-400">{lists.length} lists</span>
      </div>

      {/* grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {lists.map((list) => (
          <Link key={list.id} href={`/lists/${list.id}`} className="block group">
            <div className="bg-[#1c2228] rounded-lg p-6 hover:bg-[#242a32] transition-colors">
              {/* film posters */}
              <div className="flex -space-x-2 mb-4">
                {list.previews.slice(0, 4).map((src, i) => (
                  <Image
                    key={i}
                    src={src || "/placeholder.svg"}
                    alt=""
                    width={60}
                    height={80}
                    className="rounded border-2 border-[#14181c] object-cover"
                  />
                ))}
                {list.filmCount > 4 && (
                  <div className="w-[60px] h-[80px] bg-gray-700 rounded border-2 border-[#14181c] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      +{list.filmCount - 4}
                    </span>
                  </div>
                )}
              </div>

              {/* list meta */}
              <div className="space-y-3">
                {/* title */}
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {list.title}
                </h3>

                {/* description */}
                <p className="text-gray-400 text-sm line-clamp-2">
                  {list.description}
                </p>

                {/* author */}
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={list.authorAvatar ?? undefined}
                      alt={list.author}
                    />
                  <AvatarFallback
                    className="w-full h-full flex items-center justify-center rounded-full text-xs"
                    style={{ backgroundColor: "#16a34a", color: "#fff" }} // Tailwind'in green-600 ve white'ı
                  >
                    {list.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  </Avatar>
                  <span className="text-white">by {list.author}</span>
                  <span className="text-white text-sm">
                    • {list.filmCount} films
                  </span>
                </div>

                {/* stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{list.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{list.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{list.views}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{list.createdAt}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
