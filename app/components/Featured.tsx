"use client";

import Image from "next/image";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  role: string;
  img: string;
  link: string;
  desc?: string; 
  featured?: boolean;
}

export function Featured() {
  const featured = projects.find((p) => p.featured);

  if (!featured) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" as const }}
      className="max-w-7xl mx-auto px-6 pb-32"
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[#fed001] font-mono text-sm tracking-widest uppercase">
          Featured Project
        </h2>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <FeaturedCard project={featured} />
    </motion.section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block relative"
    >
      {/* Glow Effect Background */}
      <div className="absolute -inset-4 bg-[#fed001]/5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
        {/* Image Side */}
        <div className="lg:col-span-3 relative aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
          <Image
            src={project.img} 
            alt={project.title}
            fill
            priority
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content Side */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-3xl md:text-5xl font-black text-white group-hover:text-[#fed001] transition-colors leading-tight">
                {project.title}
              </h3>
              <ArrowUpRight className="text-white/20 group-hover:text-[#fed001] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={32} />
            </div>
            <p className="text-[#fed001] font-mono text-xs md:text-sm uppercase tracking-wider font-bold">
              {project.role}
            </p>
          </div>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
            {project.desc}
          </p>

          <div className="pt-4 flex items-center gap-4 text-white font-bold text-sm uppercase tracking-widest group-hover:gap-6 transition-all">
            <span>Explore Project</span>
            <div className="h-[2px] w-12 bg-[#fed001]" />
          </div>
        </div>
      </div>
    </a>
  );
}