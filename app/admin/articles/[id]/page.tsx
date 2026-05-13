// app/admin/articles/[id]/page.tsx
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditArticleClient from "./EditArticleClient"

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({ where: { id: params.id } })
  if (!article) notFound()
  return <EditArticleClient article={article} />
}