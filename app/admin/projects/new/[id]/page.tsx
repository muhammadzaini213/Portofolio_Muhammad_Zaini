// app/admin/projects/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectClient from "./EditProjectClient";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();
  return <EditProjectClient project={project} />;
}