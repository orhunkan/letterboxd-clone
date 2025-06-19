import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Eye, Share, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  list: {
    title: string;
    description: string;
    author: string;
    authorAvatar: string | null;
    filmCount: number;
    likes: number;
    comments: number;
    views: number;
    isRanked: boolean;
    isPublic: boolean;
    createdAt: string;
  };
}

export default function ListDetailHeader({ list }: Props) {
  return (
    <div className="bg-[#1c2228] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        {/* badges + title */}
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {list.isRanked && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">
                  RANKED
                </span>
              )}
              {list.isPublic && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                  PUBLIC
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-white">{list.title}</h1>

            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {list.description}
            </p>
          </div>

          {/* actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* author + stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={list.authorAvatar ?? undefined} alt={list.author} />
              <AvatarFallback className="bg-green-600 text-white">
                {list.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <Link
                href={`/user/${list.author.toLowerCase()}`}
                className="text-white hover:text-green-400 font-medium"
              >
                {list.author}
              </Link>
              <p className="text-gray-400 text-sm">Created {list.createdAt}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span className="text-white font-medium">{list.filmCount}</span>
              <span>films</span>
            </div>
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
        </div>
      </div>
    </div>
  );
}
