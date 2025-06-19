import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

import ListDetailHeader from "@/components/lists/list-detail-header";
import ListDetailFilms from "@/components/lists/list-detail-films";
import ListDetailSidebar from "@/components/lists/list-detail-sidebar";
import ListDetailComments from "@/components/lists/list-detail-comments";

interface ListDetailPageProps {
  params: { id: string };
}

export default async function ListDetailPage({ params }: ListDetailPageProps) {
  const list = await prisma.watchList.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true, image: true } },
      movies: {
        select: { id: true, title: true, posterUrl: true, year: true },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!list) return notFound();

  /* --- map fields to UI shape --- */
  const uiList = {
    id: list.id,
    title: list.name,
    description: list.description ?? "",
    author: list.user?.name ?? "Unknown",
    authorAvatar:
      list.user?.image ??
      null, // null → AvatarFallback first letter will show
    filmCount: list.movies.length,
    likes: 0,
    comments: 0,
    views: 0,
    isRanked: list.ranked,
    isPublic: list.visibility === "PUBLIC",
    createdAt: list.createdAt.toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    updatedAt: list.updatedAt
      ? `${Math.round(
          (Date.now() - list.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
        )} days ago`
      : "—",
    tags: list.tags ? list.tags.split(",").map((t) => t.trim()) : [],
  };

  return (
    <div className="min-h-screen bg-[#14181c]">
      <ListDetailHeader list={uiList} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-800 h-96 rounded-lg" />
              }
            >
              {/* server component below */}
              <ListDetailFilms
                listId={uiList.id}
                isRanked={uiList.isRanked}
              />
            </Suspense>

            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-800 h-64 rounded-lg" />
              }
            >
              {/* comments still mock for now */}
              <ListDetailComments listId={uiList.id} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <ListDetailSidebar list={uiList} />
          </div>
        </div>
      </div>
    </div>
  );
}
