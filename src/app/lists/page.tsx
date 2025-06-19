import { Suspense } from "react";
import {prisma} from "@/lib/prisma";
import ListsHeader from "@/components/lists/lists-header";
import ListsFilters from "@/components/lists/lists-filters";
import ListsGrid from "@/components/lists/lists-grid";

/* ------------------------------------------------------------------
   Server component — fetch public lists + basic meta
-------------------------------------------------------------------*/
export default async function ListsPage() {
  // simple query: latest public lists (limit 30)
  const lists = await prisma.watchList.findMany({
    where: { visibility: "PUBLIC" },
    take: 30,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, image: true } },
      movies: { select: { posterUrl: true, id: true }, take: 4 },
      _count: { select: { movies: true } }, // filmCount
    },
  });

  // Map to the shape expected by ListsGrid
  const gridData = lists.map((l) => ({
    id: l.id,
    title: l.name,
    description: l.description ?? "",
    author: l.user?.name ?? "Unknown",
    authorAvatar: l.user?.image
      ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(l.user?.name ?? "U")}`,
    filmCount: l._count.movies,
    likes: 0,
    comments: 0,
    views: 0,
    previews: l.movies.map((m) => m.posterUrl ?? "/placeholder.svg"),
    createdAt: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(l.createdAt),
  }));

  return (
    <div className="min-h-screen bg-[#14181c]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ListsHeader />

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <ListsFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-800 h-96 rounded-lg" />
              }
            >
              {/* pass data down */}
              <ListsGrid lists={gridData} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
