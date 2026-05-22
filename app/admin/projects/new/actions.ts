// app/admin/projects/new/actions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { uniqueProjectSlug } from "@/lib/slug"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData, content: string) {
  const title = formData.get("title") as string
  if (!title) throw new Error("Title wajib diisi.")

  const slug = await uniqueProjectSlug(title)

  await prisma.project.create({
    data: {
      title,
      slug,
      role: formData.get("role") as string,
      desc: formData.get("desc") as string,
      img: formData.get("img") as string,
      link: (formData.get("link") as string) || null,
      content,
      featured: formData.get("featured") === "on",
      homeDisplay: formData.get("homeDisplay") === "on",
    },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/admin/projects/[id]", "page")
  revalidatePath("/")
  // Jangan redirect() di sini — lempar ke client agar try/catch tidak menangkap NEXT_REDIRECT
}