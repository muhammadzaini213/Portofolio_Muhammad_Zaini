"use server";

import { prisma } from "@/lib/prisma";

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

    await prisma.project.update({
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