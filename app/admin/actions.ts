"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProject(id: string, formData: any) {
  await prisma.project.update({
    where: { id },
    data: formData,
  })
  revalidatePath("/admin/projects")
  revalidatePath("/")
}

export async function createProject(formData: any) {
  await prisma.project.create({ data: formData })
  revalidatePath("/admin/projects")
}