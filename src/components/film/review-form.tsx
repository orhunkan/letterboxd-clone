"use client"

import { useState, useTransition } from "react"
import { addReview } from "@/actions/film"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewForm({ filmId }: { filmId: number }) {
  const [text, setText] = useState("")
  const [pending, start] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        start(() => addReview(filmId, text, null))
        setText("")
      }}
      className="space-y-2"
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review…"
        className="bg-gray-800 border-gray-700 text-white"
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
  )
}
