"use client";

import { motion } from "framer-motion";

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-40 pb-24 md:pt-32 md:pb-32">
      <div className="flex flex-col items-start">
        
        <motion.h2 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-[#fed001] font-mono text-sm tracking-widest uppercase mb-4"
        >
          Muhammad Zaini
        </motion.h2>

        <motion.h1 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8"
        >
          Gameplay Systems <br className="hidden md:block" />
          <span className="text-white">Developer</span>
        </motion.h1>

        <motion.p 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Building scalable gameplay systems, AI behavior, and technical architecture
          focused on <span className="text-white">iteration speed</span> and <span className="text-white">clarity</span>.
        </motion.p>

        <motion.div 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="bg-[#fed001] hover:bg-[#e5bc00] text-black px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            View Work
          </a>
          
          <a
            href="#contact"
            className="border border-white/20 hover:border-[#fed001] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}