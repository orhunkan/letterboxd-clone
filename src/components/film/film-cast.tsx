import Link from "next/link";

interface Props {
  cast: string[];
  runtime: string;
}

export default function FilmCast({ cast, runtime }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cast.map((m) => (
          <Link
            key={m}
            href={`/person/${m.toLowerCase().replace(/\\s+/g, "-")}`}
            className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            {m}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <span>{runtime}</span>
        <span>More at</span>
        <Link href="#" className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
          IMDB
        </Link>
        <Link href="#" className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          TMDB
        </Link>
      </div>
    </section>
  );
}
