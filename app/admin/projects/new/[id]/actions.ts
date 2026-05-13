// app/admin/projects/[id]/actions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { uniqueProjectSlug } from "@/lib/slug"
import { revalidatePath } from "next/cache"

export async function updateProject(id: string, formData: FormData, content: string) {
  const title = formData.get("title") as string
  if (!title) throw new Error("Title wajib diisi.")

  const slug = await uniqueProjectSlug(title, id)

  await prisma.project.update({
    where: { id },
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
  revalidatePath("/")
  revalidatePath(`/projects/${slug}`)
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/admin/projects")
  revalidatePath("/")
}