"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ChevronLeft, Save, Upload, Loader2 } from "lucide-react"
import { uploadImage } from "@/lib/upload"
import { createProject } from "./actions"  // ✅ FIX: was "../actions" → file tidak ada

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-white/5 animate-pulse border border-white/10" />,
})

export default function NewProjectPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [content, setContent] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsUploading(true)
      const url = await uploadImage(file)
      setCoverUrl(url)
    } catch {
      alert("Gagal mengupload cover image.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!coverUrl) return alert("Mohon upload cover image terlebih dahulu.")

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      await createProject(formData, content)
      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(`Gagal menyimpan proyek: ${err?.message ?? "Unknown error"}`)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl font-mono">
      <Link href="/admin/projects" className="flex items-center gap-2 text-white/40 hover:text-accent mb-6 text-xs transition-all uppercase tracking-widest">
        <ChevronLeft size={14} /> BACK_TO_LOG
      </Link>

      <div className="mb-10">
        <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">System_Entry</h2>
        <h1 className="text-4xl font-black text-white">NEW_PROJECT_DEPLOYMENT<span className="animate-pulse text-accent">_</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover Image */}
        <div className="bg-white/[0.02] border border-white/10 p-6">
          <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-4 block font-bold">Cover_Visual</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-video w-full max-w-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${coverUrl ? "border-accent/50" : "border-white/10 hover:border-accent/30"}`}
          >
            {coverUrl ? (
              <>
                <img src={coverUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] bg-accent text-black px-3 py-1 font-bold uppercase">Change_Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/20">
                {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
                <p className="text-[10px] uppercase font-bold tracking-widest">{isUploading ? "Uploading..." : "Click_to_Upload_Cover"}</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <input type="hidden" name="img" value={coverUrl} />
        </div>

        {/* Core Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/10 p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Project_Name</label>
              <input name="title" required className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all" placeholder="e.g. Cyberpunk Unity Engine" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Developer_Role</label>
              <input name="role" required className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all" placeholder="e.g. Lead Gameplay Programmer" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">External_Link (Optional)</label>
              <input name="link" className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all" placeholder="https://itch.io/project-demo" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Quick_Summary</label>
              <textarea name="desc" required rows={8} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all resize-none" placeholder="Explain the project in 2-3 sentences..." />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="space-y-2 bg-white/[0.02] border border-white/10 p-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Project_Documentation</label>
            <span className="text-[9px] text-accent/50 uppercase tracking-tighter italic">Rich_Text_Editor</span>
          </div>
          <Editor value={content} onChange={setContent} />
        </div>

        {/* Flags */}
        <div className="flex flex-wrap items-center gap-8 p-6 bg-white/[0.02] border border-white/10">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="homeDisplay" className="w-4 h-4 accent-accent" />
            <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest">Display_on_Frontpage</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="featured" className="w-4 h-4 accent-accent" />
            <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest">Mark_as_Featured</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full bg-accent hover:bg-white text-black font-black py-6 flex items-center justify-center gap-4 transition-all disabled:opacity-30 uppercase text-sm tracking-[0.3em] shadow-[0_0_20px_rgba(254,208,1,0.15)] hover:shadow-[0_0_30px_rgba(254,208,1,0.3)]"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> SYNCHRONIZING_DB...</>
          ) : (
            <><Save size={20} /> INITIATE_DEPLOYMENT</>
          )}
        </button>
      </form>
    </div>
  )
}
