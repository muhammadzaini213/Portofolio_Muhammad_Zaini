import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectClient from "./EditProjectClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) notFound();

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) notFound();

  return <EditProjectClient project={project} />;
}