"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Search } from "lucide-react";
import { addOrRemoveFromList } from "@/actions/watch"; // <-- action import

/* ----------------------- types & props ---------------------------*/
type Visibility = "PUBLIC" | "PRIVATE" | "FRIENDS";

interface WatchListDto {
  id: string;
  name: string;
  visibility: Visibility;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filmId: number;
  filmTitle: string;
}

/* -------------------------- component ---------------------------*/
export default function AddToListsModal({
  isOpen,
  onClose,
  filmId,
  filmTitle,
}: Props) {
  const [activeTab, setActiveTab] = useState<Visibility>("PUBLIC");
  const [searchQuery, setSearchQuery] = useState("");
  const [lists, setLists] = useState<WatchListDto[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  /* Fetch lists + initial selection */
  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setLoading(true);
      const res = await fetch("/api/my-lists");
      const listData: WatchListDto[] = await res.json();
      setLists(listData);

      // map listId → bool (is film already in list?)
      const sel: Record<string, boolean> = {};
      await Promise.all(
        listData.map(async (l) => {
          const r = await fetch(`/api/lists/${l.id}/has/${filmId}`);
          const j = await r.json();
          sel[l.id] = j.inList;
        })
      );
      setSelected(sel);
      setLoading(false);
    })();
  }, [isOpen, filmId]);

  /* Filtered lists */
  const visible = lists.filter(
    (l) =>
      l.visibility === activeTab &&
      l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#445566] border-none text-white max-w-4xl w-full mx-4 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-normal text-white">
              Add &apos;{filmTitle}&apos; to lists
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-transparent"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="flex bg-[#556677] rounded-full p-1">
            {(["PUBLIC", "PRIVATE"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-3 px-6 rounded-full text-center font-medium transition-colors ${
                  activeTab === t
                    ? "bg-[#99aabb] text-[#2a3441]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {t === "PUBLIC" ? "Public" : "Private"}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/lists/new?film=${filmId}`}
              className="flex items-center space-x-2 text-gray-300 hover:text-white"
              onClick={onClose}
            >
              <Plus className="w-5 h-5" />
              <span className="text-lg">New list...</span>
            </Link>

            <div className="relative">
              <Input
                type="text"
                placeholder="Type to search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-gray-400 placeholder-gray-500 text-lg w-80 pr-10 focus:outline-none focus:ring-0"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="px-6 pb-6 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-gray-400">Loading…</p>
          ) : visible.length === 0 ? (
            <p className="text-gray-400">
              {activeTab === "PUBLIC"
                ? "No public lists found"
                : "No private lists found"}
            </p>
          ) : (
            <ul className="space-y-3">
              {visible.map((l) => {
                const isIn = selected[l.id] ?? false;

                return (
                  <li
                    key={l.id}
                    className="flex items-center justify-between bg-[#556677] hover:bg-[#667788] rounded px-4 py-3 cursor-pointer"
                    onClick={async () => {
                    const res = await addOrRemoveFromList(l.id, {
                      id: filmId,
                      title: filmTitle,
                      poster: "",        // poster URL elde ediyorsan buraya koy
                      year: 0,          // yıl lazım değilse 0 bırak, schema null kabul ediyorsa null
                    });

                    setSelected((prev) => ({
                      ...prev,
                      [l.id]: res.added,
                    }));
                  }}

                  >
                    <span>{l.name}</span>
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        isIn
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer (optional) */}
        <div className="p-6 pt-0 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
