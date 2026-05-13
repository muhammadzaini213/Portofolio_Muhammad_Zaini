// lib/upload.ts
import { createClient } from "@/utils/supabase/client"

const BUCKET = "portfolio-assets" // ganti sesuai nama bucket kamu di Supabase

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient()

  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `images/${filename}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(url: string): Promise<void> {
  const supabase = createClient()

  // Extract path dari public URL
  // format: .../storage/v1/object/public/BUCKET/images/filename.ext
  const marker = `/object/public/${BUCKET}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return

  const path = url.slice(idx + marker.length)
  await supabase.storage.from(BUCKET).remove([path])
}