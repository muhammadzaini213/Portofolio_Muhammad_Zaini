import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Zaini Portfolio`,
    description: project.desc,
    openGraph: {
      title: project.title,
      description: project.desc,
      url: `https://zaini-portofolio.vercel.app/projects/${project.slug}`,
      images: [
        {
          url: project.img,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.desc,
      images: [project.img],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  // Previous / next navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-20 pb-20">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#fed001] transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Projects</span>
        </Link>

        {/* Header */}
        <header className="mb-10 md:mb-16 border-b border-white/10 pb-10 md:pb-14">
          <p className="text-[#fed001] font-mono text-xs uppercase tracking-widest mb-4">
            {project.role}
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-white/60 leading-relaxed italic border-l-4 border-[#fed001] pl-6 max-w-3xl">
            {project.desc}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-12 md:mb-20 bg-white/5">
          <Image
            src={project.img}
            alt={project.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-20">
          <article className="md:col-span-2">
            <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line selection:bg-[#fed001] selection:text-black">
              {project.content}
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <h4 className="text-[#fed001] font-mono text-xs uppercase tracking-widest mb-3">Role</h4>
              <p className="text-white/70 text-sm leading-relaxed">{project.role}</p>
            </div>

            <div className="h-[1px] bg-white/10" />

            <div>
              <h4 className="text-[#fed001] font-mono text-xs uppercase tracking-widest mb-4">Play the Game</h4>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#fed001] text-black px-5 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-sm"
              >
                <span>Open on itch.io</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </aside>
        </div>

        {/* Prev / Next Navigation */}
        {(prev || next) && (
          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col gap-2 p-6 rounded-2xl border border-white/10 hover:border-[#fed001]/40 transition-all hover:bg-white/5"
              >
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <ArrowLeft size={10} /> Previous
                </span>
                <span className="text-white font-bold text-lg group-hover:text-[#fed001] transition-colors leading-tight">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-2 p-6 rounded-2xl border border-white/10 hover:border-[#fed001]/40 transition-all hover:bg-white/5 md:text-right md:items-end"
              >
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                  Next <ArrowUpRight size={10} className="rotate-45" />
                </span>
                <span className="text-white font-bold text-lg group-hover:text-[#fed001] transition-colors leading-tight">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Footer CTA */}
        <footer className="mt-10 pt-10 border-t border-white/10">
          <div className="bg-white/5 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold mb-1">Like what you see?</h4>
              <p className="text-white/40 text-sm">Let's build something together.</p>
            </div>
            <Link
              href="/#contact"
              className="bg-[#fed001] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Contact Me
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
