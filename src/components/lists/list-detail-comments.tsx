import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  listId: string;
}

/* ------------------------------------------------------------------
   Server component — fetch comments + render
-------------------------------------------------------------------*/
export default async function ListDetailComments({ listId }: Props) {
  const comments = await prisma.watchListComment.findMany({
    where: { watchListId: listId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, image: true } }, // username kaldırıldı
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      {/* heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Comments</h2>
        <span className="text-gray-400">{comments.length} comments</span>
      </div>

      {/* add comment (only if logged in) */}
      {session?.user && (
        <div className="bg-[#1c2228] rounded-lg p-6">
          <form
            action={async (formData: FormData) => {
              "use server";
              const body = formData.get("body")?.toString().trim();
              if (!body) return;

              await prisma.watchListComment.create({
                data: {
                  body,
                  watchListId: listId,
                  userId: session.user.id,
                },
              });
            }}
          >
            <div className="space-y-4">
              <Textarea
                name="body"
                placeholder="Add a comment..."
                className="bg-[#2c3440] border-gray-600 text-white placeholder-gray-400 resize-none"
                rows={3}
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Post Comment
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* comments list */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="bg-[#1c2228] rounded-lg p-6">
            <div className="flex space-x-4">
              {/* avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage src={c.user.image ?? undefined} alt={c.user.name ?? "User"} />
                <AvatarFallback className="bg-green-600 text-white flex items-center justify-center">
                  {(c.user.name ?? "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                {/* name + date */}
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/user/${c.userId}`}   
                    className="font-medium text-white hover:text-green-400"
                  >
                    {c.user.name ?? "Unknown"}
                  </Link>
                  <span className="text-gray-500 text-sm">
                    {c.createdAt.toLocaleDateString()}
                  </span>
                </div>

                {/* body */}
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {c.body}
                </p>

                {/* like button */}
                <div className="flex items-center space-x-4">
                  <form
                    action={async () => {
                      "use server";
                      await prisma.watchListComment.update({
                        where: { id: c.id },
                        data: { likes: { increment: 1 } },
                      });
                    }}
                  >
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{c.likes}</span>
                    </button>
                  </form>

                  <button
                    disabled
                    className="flex items-center space-x-1 text-gray-500 cursor-default"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-400 text-center">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
