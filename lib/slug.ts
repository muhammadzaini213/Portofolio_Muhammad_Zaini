// lib/slug.ts
import { prisma } from "@/lib/prisma"

/**
 * Generate slug dari title, lalu pastikan unik di tabel yang diberikan.
 * Jika sudah ada (dan bukan milik ID yang sama), tambahkan suffix -2, -3, dst.
 */
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function uniqueProjectSlug(title: string, excludeId?: string): Promise<string> {
  const base = toSlug(title)
  let slug = base
  let counter = 2

  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } })
    if (!existing || existing.id === excludeId) break
    slug = `${base}-${counter++}`
  }

  return slug
}

export async function uniqueArticleSlug(title: string, excludeId?: string): Promise<string> {
  const base = toSlug(title)
  let slug = base
  let counter = 2

  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } })
    if (!existing || existing.id === excludeId) break
    slug = `${base}-${counter++}`
  }

  return slug
}