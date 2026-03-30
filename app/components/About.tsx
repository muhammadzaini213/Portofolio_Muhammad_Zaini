"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 pb-32 pt-10">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
        
        {/* Gambar Profil dengan Efek Float */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
        >
          <div className="absolute inset-0 rounded-full translate-x-3 translate-y-3" />
          <Image
            src="/images/profile.png"
            alt="Profile"
            fill
            priority
            unoptimized
            className="object-cover rounded-full border-2 border-white/10 relative z-10 transition-all duration-500"
          />
        </motion.div>

        {/* Konten Teks */}
        <div className="text-center md:text-left flex-1">
          <motion.h2 
            {...fadeInUp}
            className="text-[#fed001] font-mono font-bold uppercase tracking-widest text-sm mb-4"
          >
            About Me
          </motion.h2>

          <motion.p 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl leading-relaxed mb-8"
          >
            I focus on designing gameplay systems that are modular, reusable, 
            and easy to expand. My work centers around <span className="text-[#fed001]">AI behavior</span> (FSM, HFSM, GOAP), 
            performance optimization, and building clean technical structures.
          </motion.p>

          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
            className="bg-white/5 border-l-4 border-[#fed001] p-6 rounded-r-2xl"
          >
            <p className="text-white/60 text-sm md:text-base italic leading-relaxed">
              "Currently focused on indie development and experimental systems design."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}