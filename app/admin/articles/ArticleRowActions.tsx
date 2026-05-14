// app/admin/articles/ArticleRowActions.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, Trash2 } from "lucide-react"
import { deleteArticle } from "./actions"
import { useRouter } from "next/navigation"

export default function ArticleRowActions({ id }: { id: string }) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      // Auto-reset confirm setelah 3 detik jika tidak diklik
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setIsDeleting(true)
    try {
      await deleteArticle(id)
      router.refresh()
    } catch {
      alert("Gagal menghapus artikel.")
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/articles/${id}`}
        className="text-[10px] border border-accent/30 text-accent hover:bg-accent hover:text-black px-3 py-1.5 transition-all uppercase tracking-widest font-bold"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`flex items-center gap-1.5 text-[10px] border px-3 py-1.5 uppercase tracking-widest font-bold transition-all disabled:opacity-40 ${
          confirmDelete
            ? "border-red-500 bg-red-500 text-white"
            : "border-red-500/20 text-red-400/50 hover:border-red-500/60 hover:text-red-400"
        }`}
      >
        {isDeleting ? (
          <Loader2 size={10} className="animate-spin" />
        ) : (
          <Trash2 size={10} />
        )}
        {confirmDelete ? "Sure?" : "Del"}
      </button>
    </div>
  )
}
