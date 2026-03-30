"use client";

import Image from "next/image";
import { projects } from "../data/projects";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Projects() {
  const rest = projects.filter((p) => !p.featured);

  // Varian untuk animasi kontainer (induk)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Jeda antar item
      },
    },
  };

  // Varian untuk animasi tiap kartu (anak)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 pb-32">
      {/* Header dengan animasi fade up sederhana */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
      >
        <div>
          <h2 className="text-[#fed001] font-mono text-xs tracking-widest uppercase mb-2">
            Archive
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Other Projects
          </h1>
        </div>
        <p className="text-white/40 text-sm max-w-xs md:text-right">
          A collection of experiments, game jam entries, and technical prototypes.
        </p>
      </motion.div>

      {/* Grid dengan Stagger Animation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {rest.map((p, i) => (
          <motion.div key={i} variants={itemVariants}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#2d2d2d] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#fed001]/50 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#fed001] p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight size={24} className="text-black" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#fed001] transition-colors">
                    {p.title}
                  </h3>
                </div>
                <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                  {p.role}
                </p>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}