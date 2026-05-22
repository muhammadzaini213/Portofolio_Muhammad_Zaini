// app/admin/articles/actions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { uniqueArticleSlug } from "@/lib/slug"
import { revalidatePath } from "next/cache"

export async function createArticle(formData: FormData, content: string) {
  const title = formData.get("title") as string
  if (!title) throw new Error("Title wajib diisi.")

  const slug = await uniqueArticleSlug(title)

  await prisma.article.create({
    data: {
      title,
      slug,
      desc: formData.get("desc") as string,
      content,
      published: formData.get("published") === "on",
    },
  })

  revalidatePath("/admin/articles")
  revalidatePath("/articles")
}

export async function updateArticle(id: string, formData: FormData, content: string) {
  const title = formData.get("title") as string
  if (!title) throw new Error("Title wajib diisi.")

  const slug = await uniqueArticleSlug(title, id)

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      desc: formData.get("desc") as string,
      content,
      published: formData.get("published") === "on",
    },
  })

  revalidatePath("/admin/articles")
  revalidatePath("/articles")
  revalidatePath(`/articles/${slug}`)
  revalidatePath("/admin/articles/[id]", "page")
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } })
  revalidatePath("/admin/articles")
  revalidatePath("/articles")
}