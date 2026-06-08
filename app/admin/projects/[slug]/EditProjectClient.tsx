"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeft, Save, Upload, Loader2, Trash2 } from "lucide-react";
import { uploadImage } from "@/lib/upload";
import { ActionResult, deleteProject, updateProject } from "./actions";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-white/5 animate-pulse border border-white/10" />
  ),
});

interface Project {
  id: string;
  title: string;
  slug: string;
  role: string;
  desc: string;
  img: string;
  link: string | null;
  content: string;
  featured: boolean;
  homeDisplay: boolean;
}

export default function EditProjectClient({ project }: { project: Project }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState(project.content);
  const [coverUrl, setCoverUrl] = useState(project.img);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setCoverUrl(url);
    } catch {
      alert("Gagal mengupload cover image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!coverUrl) {
      alert("Mohon upload cover image terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const res: ActionResult = await updateProject(
        project.id,
        formData,
        content
      );

      if (!res.success) {
        alert(res.message || "Gagal menyimpan perubahan.");
        return;
      }

      router.refresh();
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setIsDeleting(true);

    try {
      const res: ActionResult = await deleteProject(project.id);

      if (!res.success) {
        alert(res.message || "Gagal menghapus proyek.");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl font-mono">
      <Link
        href="/admin/projects"
        className="flex items-center gap-2 text-white/40 hover:text-accent mb-6 text-xs uppercase tracking-widest"
      >
        <ChevronLeft size={14} /> BACK_TO_LOG
      </Link>

      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">
            System_Update
          </h2>
          <h1 className="text-4xl font-black text-white">
            EDIT_PROJECT<span className="animate-pulse text-accent">_</span>
          </h1>
          <p className="text-white/30 text-xs mt-2 uppercase tracking-wider">
            ID: {project.id}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all disabled:opacity-40 ${confirmDelete
              ? "border-red-500 bg-red-500 text-white"
              : "border-red-500/30 text-red-400/60 hover:border-red-500 hover:text-red-400"
              }`}
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Trash2 size={14} />
            )}
            {confirmDelete ? "Confirm_Delete?" : "Delete_Project"}
          </button>

          {confirmDelete && !isDeleting && (
            <p className="text-[8px] text-red-400/60 uppercase tracking-widest animate-pulse">
              ⚠ Klik sekali lagi untuk konfirmasi
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover */}
        <div className="bg-white/[0.02] border border-white/10 p-6">
          <label className="text-[10px] text-white/40 uppercase mb-4 block">
            Cover_Visual
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative aspect-video w-full max-w-md border-2 border-dashed flex items-center justify-center cursor-pointer"
          >
            {coverUrl ? (
              <>
                <img src={coverUrl} className="w-full h-full object-cover" />
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/20">
                {isUploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Upload size={24} />
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <input type="hidden" name="img" value={coverUrl} />
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/10 p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Project_Name</label>
              <input
                name="title"
                required
                defaultValue={project.title}
                className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Developer_Role</label>
              <input
                name="role"
                required
                defaultValue={project.role}
                className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">External_Link (Optional)</label>
              <input
                name="link"
                defaultValue={project.link ?? ""}
                className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all"
                placeholder="https://itch.io/project-demo"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Quick_Summary</label>
              <textarea
                name="desc"
                required
                rows={8}
                defaultValue={project.desc}
                className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all resize-none"
              />
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
            <input
              type="checkbox"
              name="homeDisplay"
              defaultChecked={project.homeDisplay}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest">Display_on_Frontpage</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project.featured}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-widest">Mark_as_Featured</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full bg-accent hover:bg-white text-black font-black py-6 flex items-center justify-center gap-4 transition-all disabled:opacity-30 uppercase text-sm tracking-[0.3em] shadow-[0_0_20px_rgba(254,208,1,0.15)] hover:shadow-[0_0_30px_rgba(254,208,1,0.3)]"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> SAVING_CHANGES...</>
          ) : (
            <><Save size={20} /> SAVE_CHANGES</>
          )}
        </button>
      </form>
    </div>
  );
}