"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData, content: string) {
  const title = formData.get("title") as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  await prisma.project.create({
    data: {
      title,
      slug,
      role: formData.get("role") as string,
      desc: formData.get("desc") as string,
      img: formData.get("img") as string,
      link: formData.get("link") as string || null,
      content: content, // HTML dari Tiptap
      featured: formData.get("featured") === "on",
      homeDisplay: formData.get("homeDisplay") === "on",
    },
  })

  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}