// lib/slug.ts
import { prisma } from "./prisma"

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // hapus karakter spesial
    .replace(/[\s_-]+/g, "-")   // spasi/underscore → dash
    .replace(/^-+|-+$/g, "")    // trim dash di awal/akhir
}

/**
 * Generate slug unik untuk Project.
 * Jika slug sudah ada, tambahkan suffix angka: my-project-2, my-project-3, dst.
 * @param title  - judul project baru
 * @param skipId - id project yang sedang diedit (agar tidak bentrok dengan dirinya sendiri)
 */
export async function uniqueProjectSlug(title: string, skipId?: string): Promise<string> {
  const base = toSlug(title)
  let slug = base
  let counter = 2

  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } })
    // Tidak ada konflik, atau konflik hanya dengan project yang sedang diedit
    if (!existing || existing.id === skipId) return slug
    slug = `${base}-${counter++}`
  }
}

/**
 * Generate slug unik untuk Article.
 * @param title  - judul artikel baru
 * @param skipId - id artikel yang sedang diedit
 */
export async function uniqueArticleSlug(title: string, skipId?: string): Promise<string> {
  const base = toSlug(title)
  let slug = base
  let counter = 2

  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } })
    if (!existing || existing.id === skipId) return slug
    slug = `${base}-${counter++}`
  }
}
