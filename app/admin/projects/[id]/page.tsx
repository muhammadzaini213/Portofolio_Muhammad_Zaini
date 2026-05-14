export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProjectClient from "./EditProjectClient"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()
  return <EditProjectClient project={project} />
}