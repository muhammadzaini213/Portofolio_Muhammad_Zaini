// prisma/seed.ts
// Jalankan dengan: npx ts-node prisma/seed.ts
// atau: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── SiteConfig ──────────────────────────────────────────────────────────────
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Game Developer",
      heroSubtitle:
        "Building scalable gameplay systems, AI behavior, and technical architecture focused on iteration speed and clarity.",
      aboutText:
        "I focus on designing gameplay systems that are modular, reusable, and easy to expand. My work centers around AI behavior (FSM, HFSM, GOAP), performance optimization, and building clean technical structures.",
      aboutSubtext:
        "Currently focused on indie development and experimental systems design.",
      profileImg: "/images/profile.png",
    },
  });

  // ── Profile ─────────────────────────────────────────────────────────────────
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "gamerlemah15@gmail.com",
      itchioUrl: "https://lordzaini.itch.io",
      githubUrl: "https://github.com/muhammadzaini213",
      linkedinUrl: "https://www.linkedin.com/in/muhammad-zaini-a8582b306",
      cvPdfUrl: "/cv-muhammad-zaini.pdf",
      portfolioPdf: null,
    },
  });

  // ── SiteMetadata ─────────────────────────────────────────────────────────────
  await prisma.siteMetadata.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Zaini | Unity Gameplay Programmer",
      description:
        "Portfolio of Muhammad Zaini — Unity gameplay programmer specializing in AI systems, combat mechanics, and modular game architecture.",
      siteUrl: "https://zaini-portfolio.vercel.app",
      ogImage: "/images/og-preview.png",
      twitterImage: "/images/og-preview.png",
      whatsappImage: "/images/og-preview.png",
      googleVerifyId: "US1DmiDdDrZhWUkQ97WVUru06GcRG23v7WQC1p1GZh8",
    },
  });

  // ── Projects ─────────────────────────────────────────────────────────────────
  const projects = [
    {
      slug: "yappie-cleaning-service",
      title: "Y.A.P.P.I.E Cleaning Service",
      role: "Unity Programmer · UI Designer",
      desc: "An action-packed retro pixel RPG where you control a cleaning robot to battle mutated trash monsters and restore a polluted ecosystem.",
      img: "/images/projects/yappie.png",
      link: "https://sleepymor.itch.io/yappie-cleaning-service",
      featured: false,
      homeDisplay: true,
      content: `Originally developed for the **GEMASTIK 2025** competition by **Stardust Studio**, **Y.A.P.P.I.E Cleaning Service** is a top-down Action RPG that transforms environmental conservation into an engaging combat experience.`,
    },
    {
      slug: "omni-gear-protocol",
      title: "Omni Gear Protocol",
      role: "Game Designer · Project Manager",
      desc: "A high-stakes physics platformer where you sacrifice your own mechanical parts to power a decaying factory — and pray you can get them back.",
      img: "/images/projects/omni-gear-protocol.png",
      link: "https://lordzaini.itch.io/omni-gear-protocol",
      featured: false,
      homeDisplay: true,
      content: `**OMNI-GEAR PROTOCOL** is a high-stakes physics platformer set inside the gut of a decaying industrial complex.`,
    },
    {
      slug: "intern-of-the-cosmos",
      title: "Intern of the Cosmos",
      role: "Lead Programmer · Asset Artist · Audio Engineer",
      desc: "A physics-based puzzle game where you manipulate gravity to guide a fragile human through a deadly dimensional void.",
      img: "/images/projects/intern-of-the-cosmos.png",
      link: "https://lordzaini.itch.io/intern-of-the-cosmos",
      featured: true,
      homeDisplay: true,
      content: `Developed for the **GDGOC Game Jam 2026**, **Intern of the Cosmos** is a "rage-quit" style physics puzzle that explores the concept of indirect control.`,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  // ── Articles ─────────────────────────────────────────────────────────────────
  await prisma.article.upsert({
    where: { slug: "the-branding-paradox" },
    update: {},
    create: {
      slug: "the-branding-paradox",
      title: 'The Paradox of "Newness" in Personal Branding',
      desc: 'In an age where templates and AI-generated content are everywhere, many people use different styles in their posts. However, long exposure to these different styles can make us feel "numb" to design.',
      published: true,
      content: `# The Paradox of "Newness" in Personal Branding\n\nIn an age where templates and AI-generated content are everywhere, many people use different styles in their posts.`,
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
