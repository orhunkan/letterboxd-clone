export default function FilmNews({ title }: { title: string }) {
  return (
    <section className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-[#1c2228] text-gray-300">
          This is news {i + 1} related about <span className="text-white font-medium">{title}</span>.
        </div>
      ))}
    </section>
  )
}

