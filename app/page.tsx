import { About } from '@/components/About';
import { Articles } from '@/components/Articles';
import { Contacts } from '@/components/Contacts';
import { Featured } from '@/components/Featured';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Ambil semua data dari database secara paralel
  const [siteConfig, profile, projects, articles] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <main className="bg-primary text-white">
      <Navbar />
      <Hero siteConfig={siteConfig} />
      <About siteConfig={siteConfig} profile={profile} />
      <Featured projects={projects} />
      <Projects projects={projects} />
      <Articles articles={articles} />
      <Contacts profile={profile} />
      <Footer />
    </main>
  );
}

