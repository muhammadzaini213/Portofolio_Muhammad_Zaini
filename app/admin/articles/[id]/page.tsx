import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditArticleClient from "./EditArticleClient"

// Next.js 15: params adalah Promise
export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()
  return <EditArticleClient article={article} />
}
