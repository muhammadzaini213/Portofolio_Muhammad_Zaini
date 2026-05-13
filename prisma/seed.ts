// prisma/seed.ts
// Jalankan: npx prisma db seed
// (pastikan "prisma": { "seed": "ts-node prisma/seed.ts" } ada di package.json)

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // SiteConfig — data hero & about section
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Game Developer",
      heroSubtitle: "Building interactive experiences with Unity & C#",
      aboutText: "Saya adalah game developer yang passionate dalam menciptakan pengalaman interaktif yang berkesan.",
      aboutSubtext: "Fokus pada gameplay programming, sistem yang scalable, dan desain yang intuitif.",
      profileImg: "",
    },
  })

  // Profile — social links & contact
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "gamerlemah15@gmail.com",
      itchioUrl: null,
      githubUrl: null,
      linkedinUrl: null,
      cvPdfUrl: null,
      portfolioPdf: null,
    },
  })

  // SiteMetadata — SEO & OG tags
  await prisma.siteMetadata.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Zaini | Unity Gameplay Programmer",
      description: "Portfolio game developer — Unity, C#, gameplay systems, dan lebih.",
      siteUrl: "https://zaini-portfolio.vercel.app",
      ogImage: "",
      twitterImage: "",
      whatsappImage: "",
      googleVerifyId: "US1DmiDdDrZhWUkQ97WVUru06GcRG23v7WQC1p1GZh8",
    },
  })

  console.log("✅ Seeding done!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
