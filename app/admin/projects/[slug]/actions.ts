"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  success: boolean;
  message?: string;
};

export async function updateProject(
  id: string,
  formData: FormData,
  content: string
): Promise<ActionResult> {
  try {
    const title = formData.get("title") as string;
    const role = formData.get("role") as string;
    const desc = formData.get("desc") as string;
    const img = formData.get("img") as string;
    const link = formData.get("link") as string | null;
    const featured = formData.get("featured") === "on";
    const homeDisplay = formData.get("homeDisplay") === "on";

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        role,
        desc,
        img,
        link,
        content,
        featured,
        homeDisplay,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/projects/[slug]", "page");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/projects");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Failed to update project",
    };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Failed to delete project",
    };
  }
}