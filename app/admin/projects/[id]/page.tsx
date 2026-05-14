export const dynamic = 'force-dynamic' // Taruh di baris paling atas

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProjectClient from "./EditProjectClient"

// Next.js 15: params adalah Promise
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()
  return <EditProjectClient project={project} />
}
