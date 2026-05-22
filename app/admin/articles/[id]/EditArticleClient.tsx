// app/admin/articles/[id]/EditArticleClient.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ChevronLeft, Save, Loader2, Trash2 } from "lucide-react"
import { updateArticle, deleteArticle } from "../actions"

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-white/5 animate-pulse border border-white/10" />,
})

interface Article {
  id: string
  title: string
  slug: string
  desc: string
  content: string
  published: boolean
  updatedAt: Date
}

export default function EditArticleClient({ article }: { article: Article }) {
  const router = useRouter()
  const [content, setContent] = useState(article.content)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    try {
      await updateArticle(article.id, formData, content)
      router.refresh()
      router.push("/admin/articles")
    } catch {
      alert("Gagal menyimpan artikel.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return setConfirmDelete(true)
    setIsDeleting(true)
    try {
      await deleteArticle(article.id)
      router.refresh()
      router.push("/admin/articles")
    } catch {
      alert("Gagal menghapus artikel.")
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-5xl font-mono">
      <Link href="/admin/articles" className="flex items-center gap-2 text-white/40 hover:text-accent mb-6 text-xs transition-all uppercase tracking-widest">
        <ChevronLeft size={14} /> BACK_TO_LOG
      </Link>

      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">Content_Update</h2>
          <h1 className="text-4xl font-black text-white">EDIT_ARTICLE<span className="animate-pulse text-accent">_</span></h1>
          <p className="text-white/30 text-xs mt-2 uppercase tracking-wider">
            Last updated: {new Date(article.updatedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all ${
            confirmDelete
              ? "border-red-500 bg-red-500 text-white"
              : "border-red-500/30 text-red-400/60 hover:border-red-500 hover:text-red-400"
          }`}
        >
          {isDeleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
          {confirmDelete ? "Confirm_Delete" : "Delete_Article"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Meta */}
        <div className="bg-white/[0.02] border border-white/10 p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Article_Title</label>
            <input
              name="title"
              required
              defaultValue={article.title}
              className="w-full bg-white/5 border border-white/10 p-4 text-lg font-bold focus:border-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Short_Description</label>
            <textarea
              name="desc"
              required
              rows={3}
              defaultValue={article.desc}
              className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/10 p-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Article_Content</label>
            <span className="text-[9px] text-accent/50 uppercase tracking-tighter italic">Markdown_Supported</span>
          </div>
          <Editor value={content} onChange={setContent} />
        </div>

        {/* Publish flag */}
        <div className="flex items-center gap-8 p-6 bg-white/[0.02] border border-white/10">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="published" defaultChecked={article.published} className="w-4 h-4 accent-accent" />
            <div>
              <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest block">Published</span>
              <span className="text-[9px] text-white/20">Uncheck to revert to draft</span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-white text-black font-black py-6 flex items-center justify-center gap-4 transition-all disabled:opacity-30 uppercase text-sm tracking-[0.3em] shadow-[0_0_20px_rgba(254,208,1,0.15)]"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> SAVING_CHANGES...</>
          ) : (
            <><Save size={20} /> SAVE_CHANGES</>
          )}
        </button>
      </form>
    </div>
  )
}