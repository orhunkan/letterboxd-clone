"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { X, Menu,  } from "lucide-react";
import { useRouter } from "next/navigation";
import { createList } from "@/actions/list";

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/
interface AddedFilm {
  id: string;       // tmdb id
  title: string;
  year: number;
  poster: string;
  note?: string;
}

interface Props {
  defaultFilm: AddedFilm | null;
}

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
export default function NewListClient({ defaultFilm }: Props) {
  /* Form state */
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [whoCanView, setWhoCanView] = useState<"PUBLIC" | "PRIVATE" | "FRIENDS">("PUBLIC");
  const [isRanked, setIsRanked] = useState(false);
  const [addedFilms, setAddedFilms] = useState<AddedFilm[]>([]);
  const [pending, start] = useTransition();
  const router = useRouter();

  /* Load default film (from query) */
  useEffect(() => {
    if (defaultFilm) setAddedFilms([defaultFilm]);
  }, [defaultFilm]);

  /* Remove film handler */
  const handleRemoveFilm = (filmId: string) => {
    setAddedFilms((prev) => prev.filter((f) => f.id !== filmId));
  };

  /* SAVE */
  const handleSave = () =>
    start(async () => {
      if (!listName.trim()) {
        alert("List name is required.");
        return;
      }

      await createList({
        name: listName.trim(),
        description,
        tags,
        visibility: whoCanView,
        ranked: isRanked,
        movies: addedFilms.map((f) => ({
          id: Number(f.id),
          title: f.title,
          poster: f.poster,
          year: f.year,
        })),
      });

      router.push("/lists"); // redirect to lists overview
    });

  const handleCancel = () => window.history.back();

  /* ----------------------------------------------------------------
     JSX
  -----------------------------------------------------------------*/
  return (
    <div className="min-h-screen bg-[#14181c]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">New List</h1>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center text-white font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Name
              </label>
              <Input
                value={listName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setListName(e.target.value)}
                className="bg-[#2c3440] border-gray-600 text-white placeholder-gray-400"
                placeholder="Enter list name..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-white font-medium">Tags</label>
              <Input
                value={tags}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
                className="bg-[#2c3440] border-gray-600 text-white placeholder-gray-400"
                placeholder="eg. top 10"
              />
              <p className="text-sm text-gray-400">
                Press Tab to complete, Enter to create
              </p>
            </div>

            {/* Who can view */}
            <div className="space-y-2">
              <label className="flex items-center text-white font-medium">
                Who can view <span className="ml-1 text-gray-400">?</span>
              </label>
              <Select value={whoCanView} onValueChange={(v: "PUBLIC" | "PRIVATE" | "FRIENDS") => setWhoCanView(v)}>
                <SelectTrigger className="bg-[#2c3440] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2c3440] border-gray-600">
                  <SelectItem value="PUBLIC">Anyone — Public list</SelectItem>
                  <SelectItem value="PRIVATE">Only me — Private list</SelectItem>
                  <SelectItem value="FRIENDS">Friends only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ranked */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ranked"
                  checked={isRanked}
                  onCheckedChange={(c: boolean) => setIsRanked(c)}
                  className="border-gray-600 data-[state=checked]:bg-green-600"
                />
                <label htmlFor="ranked" className="text-white font-medium">
                  Ranked list
                </label>
              </div>
              <p className="text-sm text-gray-400 ml-6">
                Show position for each film.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Description</label>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white"
              >
                Show supported HTML
              </Link>
            </div>
            <Textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="bg-[#2c3440] border-gray-600 text-white placeholder-gray-400 min-h-[200px] resize-none"
              placeholder="Describe your list..."
            />
          </div>
        </div>

        {/* Film addition (static for now) */}
        <div className="mt-12 space-y-6">
          {/* Added films */}
          <div className="space-y-4">
            {addedFilms.map((film, idx) => (
              <div
                key={film.id}
                className="flex items-center space-x-4 bg-[#1c2228] rounded-lg p-4"
              >
                {isRanked && (
                  <div className="text-gray-400 font-mono text-sm w-8 text-center">
                    {idx + 1}
                  </div>
                )}

                <Image
                  src={film.poster}
                  alt={film.title}
                  width={60}
                  height={80}
                  className="rounded object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <h3 className="text-white font-medium">
                    {film.title}{" "}
                    <span className="text-gray-400">{film.year}</span>
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-0 h-auto font-normal mt-1"
                  >
                    ADD NOTE
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFilm(film.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 mt-12">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            CANCEL
          </Button>
          <Button
            disabled={pending}
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {pending ? "Saving…" : "SAVE"}
          </Button>
        </div>
      </div>
    </div>
  );
}
