// app/admin/articles/new/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ChevronLeft, Save, Loader2 } from "lucide-react"
import { createArticle } from "../actions"

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-white/5 animate-pulse border border-white/10" />,
})

export default function NewArticlePage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!content.trim()) return alert("Konten artikel tidak boleh kosong.")
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    try {
      await createArticle(formData, content)
      router.push("/admin/articles")
      router.refresh()
    } catch {
      alert("Gagal menyimpan artikel.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl font-mono">
      <Link href="/admin/articles" className="flex items-center gap-2 text-white/40 hover:text-accent mb-6 text-xs transition-all uppercase tracking-widest">
        <ChevronLeft size={14} /> BACK_TO_LOG
      </Link>

      <div className="mb-10">
        <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">Content_Entry</h2>
        <h1 className="text-4xl font-black text-white">NEW_ARTICLE<span className="animate-pulse text-accent">_</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Meta */}
        <div className="bg-white/[0.02] border border-white/10 p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Article_Title</label>
            <input
              name="title"
              required
              className="w-full bg-white/5 border border-white/10 p-4 text-lg font-bold focus:border-accent outline-none transition-all"
              placeholder="e.g. How I Built My First Unity Game"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Short_Description (SEO + Preview)</label>
            <textarea
              name="desc"
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all resize-none"
              placeholder="Brief summary shown in article cards and meta tags..."
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
            <input type="checkbox" name="published" defaultChecked className="w-4 h-4 accent-accent" />
            <div>
              <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest block">Publish_Immediately</span>
              <span className="text-[9px] text-white/20">Uncheck to save as draft</span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-white text-black font-black py-6 flex items-center justify-center gap-4 transition-all disabled:opacity-30 uppercase text-sm tracking-[0.3em] shadow-[0_0_20px_rgba(254,208,1,0.15)]"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> PUBLISHING...</>
          ) : (
            <><Save size={20} /> PUBLISH_ARTICLE</>
          )}
        </button>
      </form>
    </div>
  )
}