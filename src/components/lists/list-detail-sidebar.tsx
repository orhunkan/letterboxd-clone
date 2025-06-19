import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  list: {
    tags: string[];
    updatedAt: string;
    author: string;
  };
}

export default function ListDetailSidebar({ list }: Props) {
  return (
    <div className="space-y-8">
      {/* Tags */}
      {list.tags.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {list.tags.map((tag) => (
              <Link
                key={tag}
                href={`/lists?tag=${tag}`}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="space-y-4">
        <h3 className="text-white font-medium">List Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Last updated:</span>
            <span className="text-white">{list.updatedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Created by:</span>
            <Link
              href={`/user/${list.author.toLowerCase()}`}
              className="text-green-400 hover:text-green-300"
            >
              {list.author}
            </Link>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Follow List
        </Button>
        <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
          Export List
        </Button>
        <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
          Report List
        </Button>
      </div>
    </div>
  );
}
