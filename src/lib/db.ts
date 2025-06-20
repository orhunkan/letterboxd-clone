import { prisma } from "@/lib/prisma";

/* -----------------------------------------------------------
   User helpers
------------------------------------------------------------*/
export async function getUserByUsername(username: string) {
  return prisma.user.findFirst({
    where: { name: username },
    select: {
      id: true,
      name: true,
      image: true,
      _count: {
        select: {
          watchedMovies: true,
          reviews: true,
          watchLists: true,
          ratings: true,
        },
      },
    },
  });
}

/* -----------------------------------------------------------
   Favorite films — top-rated by the user (first 4)
------------------------------------------------------------*/
export async function getFavoriteMoviesByUsername(username: string) {
  return [
    {
      id: 550,
      title: "Fight Club",
      posterUrl: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    },
    {
      id: 155,
      title: "The Dark Knight",
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 278,
      title: "The Shawshank Redemption",
      posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 680,
      title: "Pulp Fiction",
      posterUrl: "https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
    },
  ];
}

/* -----------------------------------------------------------
   Recent activity — last 4 watched movies
------------------------------------------------------------*/
export async function getRecentActivity(username: string) {
  const user = await prisma.user.findFirst({
    where: { name: username },
    select: { id: true },
  });
  if (!user) return [];

  const watched = await prisma.watchedMovie.findMany({
    where: { userId: user.id },
    include: {
      movie: {
        select: { id: true, title: true, posterUrl: true },
      },
    },
    orderBy: { watchedAt: "desc" },
    take: 4,
  });

  return watched.map((w) => ({
    id: w.movie.id,
    title: w.movie.title,
    posterUrl: w.movie.posterUrl,
    rating: 0,
    liked: false,
    hasReview: false,
  }));
}

/* -----------------------------------------------------------
   Recent reviews — newest 5 reviews by the user
------------------------------------------------------------*/
export async function getRecentReviews(username: string) {
  const user = await prisma.user.findUnique({
    where: { name: username },
    select: { id: true },
  });
  if (!user) return [];

  const reviews = await prisma.review.findMany({
    where: { authorId: user.id },
    include: {
      movie: {
        select: {
          id: true,
          title: true,
          posterUrl: true,
          year: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return reviews.map((r) => ({
    id: r.id,
    movieId: r.movie.id,
    title: r.movie.title,
    year: r.movie.year ?? 0,
    posterUrl: r.movie.posterUrl,
    rating: r.rating ?? 0,
    watchedDate: r.createdAt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    review: r.body,
    likes: r.likes,
    comments: 0, // comment sistemi varsa güncellenebilir
  }));
}

/* -----------------------------------------------------------
   Watchlist Preview — 4 movies from the user's watchlist
------------------------------------------------------------*/
export async function getWatchlistPreview(username: string) {
  const user = await prisma.user.findUnique({ where: { name: username } });
  if (!user) return [];
  const list = await prisma.watchList.findFirst({
    where: { userId: user.id, name: "Watchlist" },
    include: {
      movies: {
        select: { id: true, posterUrl: true },
        take: 4,
      },
    },
  });
  return list?.movies ?? [];
}

/* -----------------------------------------------------------
   Diary Entries — 6 most recent entries
------------------------------------------------------------*/
export async function getDiaryEntries(username: string, limit = 6) {
  const user = await prisma.user.findUnique({ where: { name: username } });
  if (!user) return [];
  const entries = await prisma.watchedMovie.findMany({
    where: { userId: user.id },
    include: {
      movie: { select: { id: true, title: true } },
    },
    orderBy: { watchedAt: "desc" },
    take: limit,
  });
  return entries.map((e) => ({
    id: e.id,
    movieId: e.movieId,
    title: e.movie.title,
    date: e.watchedAt.toLocaleDateString("en", {
      day: "2-digit",
      month: "short",
    }),
  }));
}

/* -----------------------------------------------------------
   Profile Stats — counts and rating distribution
------------------------------------------------------------*/
export async function getProfileStats(username: string) {
  const user = await prisma.user.findUnique({ where: { name: username } });
  if (!user)
    return {
      watchlistCount: 0,
      diaryCount: 0,
      ratingsCount: 0,
      ratingDistribution: {},
    };

  const [watchlistCount, diaryCount, ratings] = await Promise.all([
    prisma.watchList.count({
      where: { userId: user.id, name: "Watchlist" },
    }),
    prisma.watchedMovie.count({ where: { userId: user.id } }),
    prisma.rating.findMany({
      where: { userId: user.id },
      select: { value: true },
    }),
  ]);

  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach((r) => (distribution[r.value] += 1));
  const total = ratings.length || 1;
  Object.keys(distribution).forEach(
    (k) => (distribution[+k] = (distribution[+k] / total) * 100)
  );

  return {
    watchlistCount,
    diaryCount,
    ratingsCount: ratings.length,
    ratingDistribution: distribution,
  };
}
