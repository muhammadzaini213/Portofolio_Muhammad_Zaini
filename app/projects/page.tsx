import { projects } from "../data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Zaini Portfolio",
  description: "A complete archive of game development projects — bullet hells, deckbuilders, puzzle games, and more.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#fed001] transition-colors mb-10 md:mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest">Back to Home</span>
        </Link>

        <header className="mb-12 md:mb-20">
          <h2 className="text-[#fed001] font-mono text-xs md:text-sm tracking-widest uppercase mb-2">
            Archive
          </h2>
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 leading-tight">
            All Projects
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
            Every game, prototype, and experiment — from game jams to long-form builds.
          </p>
        </header>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#fed001] font-mono text-xs tracking-widest uppercase">Featured</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid gap-6">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative block bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#fed001]/50 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-3 relative aspect-video overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center gap-4">
                      <div>
                        <p className="text-[#fed001] font-mono text-xs uppercase tracking-widest mb-2">{p.role}</p>
                        <h2 className="text-2xl md:text-4xl font-black text-white group-hover:text-[#fed001] transition-colors leading-tight">
                          {p.title}
                        </h2>
                      </div>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed">{p.desc}</p>
                      <div className="flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                        <span>View Project</span>
                        <div className="h-[2px] w-8 bg-[#fed001]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Rest */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#fed001] font-mono text-xs tracking-widest uppercase">All Work</span>
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-white/30 font-mono text-xs">{rest.length} projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group block bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#fed001]/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#fed001] p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight size={20} className="text-black" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#fed001] font-mono text-[10px] uppercase tracking-widest mb-1">{p.role}</p>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#fed001] transition-colors">
                    {p.title}
                  </h3>
                  {p.desc && (
                    <p className="text-white/40 text-sm mt-2 line-clamp-2 leading-relaxed">{p.desc}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
