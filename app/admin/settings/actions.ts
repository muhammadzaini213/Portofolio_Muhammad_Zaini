// app/admin/settings/actions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateSiteConfig(formData: FormData) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      aboutText: formData.get("aboutText") as string,
      aboutSubtext: formData.get("aboutSubtext") as string,
      profileImg: formData.get("profileImg") as string,
    },
    create: {
      id: 1,
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      aboutText: formData.get("aboutText") as string,
      aboutSubtext: formData.get("aboutSubtext") as string,
      profileImg: formData.get("profileImg") as string,
    },
  })
  revalidatePath("/")
}

export async function updateProfile(formData: FormData) {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      email: formData.get("email") as string,
      itchioUrl: (formData.get("itchioUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      linkedinUrl: (formData.get("linkedinUrl") as string) || null,
      cvPdfUrl: (formData.get("cvPdfUrl") as string) || null,
      portfolioPdf: (formData.get("portfolioPdf") as string) || null,
    },
    create: {
      id: 1,
      email: formData.get("email") as string,
      itchioUrl: (formData.get("itchioUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      linkedinUrl: (formData.get("linkedinUrl") as string) || null,
      cvPdfUrl: (formData.get("cvPdfUrl") as string) || null,
      portfolioPdf: (formData.get("portfolioPdf") as string) || null,
    },
  })
  revalidatePath("/")
}

export async function updateSiteMetadata(formData: FormData) {
  await prisma.siteMetadata.upsert({
    where: { id: 1 },
    update: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      siteUrl: formData.get("siteUrl") as string,
      ogImage: formData.get("ogImage") as string,
      twitterImage: formData.get("twitterImage") as string,
      whatsappImage: formData.get("whatsappImage") as string,
      googleVerifyId: (formData.get("googleVerifyId") as string) || null,
    },
    create: {
      id: 1,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      siteUrl: formData.get("siteUrl") as string,
      ogImage: formData.get("ogImage") as string,
      twitterImage: formData.get("twitterImage") as string,
      whatsappImage: formData.get("whatsappImage") as string,
      googleVerifyId: (formData.get("googleVerifyId") as string) || null,
    },
  })
  revalidatePath("/")
}