export const dynamic = 'force-dynamic' // Taruh di baris paling atas

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditArticleClient from "./EditArticleClient"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()
  return <EditArticleClient article={article} />
}
