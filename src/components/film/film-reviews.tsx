"use client"

import useSWR, { useSWRConfig } from "swr"
import { addReview, deleteReview } from "@/actions/film"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, Heart, Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"

interface Review {
  id: string
  authorId: string
  author: {
    id : string
    name: string | null
    image: string | null
  }
  body: string
  rating: number | null
  likes: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function FilmReviews({ filmId }: { filmId: number }) {
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const {
    data: reviews,
    isLoading,
    error,
  } = useSWR<Review[]>(`/api/film/${filmId}/reviews`, fetcher)

  const [text, setText] = useState("")
  const [pending, start] = useTransition()

  if (isLoading) return <div className="text-gray-400">Loading…</div>
  if (error) return <div className="text-red-500">Error loading reviews</div>

  const me = session?.user
  const myReview = reviews?.find((r) => r.authorId === me?.id)

  /* -------- JSX -------- */
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium text-white">REVIEWS</h2>


      {me && !myReview && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!text.trim()) return
            start(async () => {
              await addReview(filmId, text, null)
              setText("")
              mutate(`/api/film/${filmId}/reviews`)
            })
          }}
          className="space-y-2"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-24 p-2 bg-[#1c2228] text-white rounded"
            placeholder="Write your review…"
          />
                  <Button
          type="submit"
          variant="default"        // fark etmez, override edeceğiz
          disabled={pending || !text.trim()}
          /* --------------------------------------------------------
            enabled:   !bg-green-600   hover:!bg-green-700
            disabled:  !bg-gray-600
          --------------------------------------------------------- */
          className="
            w-full font-semibold py-2 px-4 rounded-md transition-colors
            enabled:!bg-green-600 enabled:hover:!bg-green-700
            disabled:!bg-gray-600 disabled:cursor-not-allowed
            !text-white
          "
        >
          {pending ? "Posting…" : "Post review "}
        </Button>
        </form>
      )}

      {/* ---- LİSTE ---- */}
      <div className="space-y-6">
        {reviews && reviews.length === 0 && (
          <p className="text-gray-400 italic">There’s no review for this movie yet.</p>
        )}

        {reviews?.map((r) => (
          <div key={r.id} className="bg-[#1c2228] rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8 bg-green-600 text-white">
                <AvatarImage src={r.author.image ?? undefined /* undefined ise img tag atlanır */} />
                <AvatarFallback className="font-bold uppercase">
                  {r.author.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>

              <span className="text-white font-medium">{r.author.name ?? "User"}</span>

              {/* yıldızlar */}
              {r.rating && (
                <div className="flex items-center ml-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ml-0.5 ${
                        s <= r.rating! ? "fill-green-500 text-green-500" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              )}
              {me?.id === r.authorId && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    start(async () => {
                      await deleteReview(filmId)
                      mutate(`/api/film/${filmId}/reviews`)
                    })
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              )}
            </div>

            <p className="text-white">{r.body}</p>

            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Heart className="w-4 h-4" />
              <span>{r.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
