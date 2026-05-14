"use client";

import { Mail, Gamepad2, Send } from "lucide-react";
import { motion } from "framer-motion";

export function Contacts() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 pb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-[#2d2d2d] rounded-3xl p-6 md:p-16 border border-white/5 relative overflow-hidden"
      >

        {/* Decorative Light Effect - Dikecilkan untuk mobile agar tidak berat */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 md:w-64 md:h-64 bg-[#fed001] opacity-[0.05] rounded-full blur-3xl" />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 className="text-[#fed001] font-mono text-xs tracking-widest uppercase mb-4">
              Get In Touch
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let's Build <br /> Something Great.
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-sm mx-auto md:mx-0 leading-relaxed mb-10">
              Available for Unity gameplay programming, AI systems, and technical design roles.
            </p>

            <a
              href="mailto:gamerlemah15@gmail.com"
              className="inline-flex items-center gap-3 bg-[#fed001] hover:bg-[#e5bc00] text-black px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <Send size={18} />
              Send an Email
            </a>
          </motion.div>

          <div className="grid gap-4 w-full">
            {/* Email Link */}
            <motion.a
              variants={itemVariants}
              href="mailto:gamerlemah15@gmail.com"
              className="group flex items-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:gap-4 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase font-mono mb-0.5">Email</p>
                  <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">
                    gamerlemah15@gmail.com
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Itch.io Link */}
            <motion.a
              variants={itemVariants}
              href="https://lordzaini.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:gap-4 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <Gamepad2 size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase font-mono mb-0.5">Itch.io</p>
                  <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">lordzaini.itch.io</p>
                </div>
              </div>
            </motion.a>

            {/* GitHub Link */}
            <motion.a
              variants={itemVariants}
              href="https://github.com/muhammadzaini213"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:gap-4 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase font-mono mb-0.5">GitHub</p>
                  <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">muhammadzaini213</p>
                </div>
              </div>
            </motion.a>

            {/* LinkedIn Link */}
            <motion.a
              variants={itemVariants}
              href="https://www.linkedin.com/in/muhammad-zaini-a8582b306"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:gap-4 w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">

                  {/* LinkedIn SVG */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49v6.25zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>

                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase font-mono mb-0.5">LinkedIn</p>
                  <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">
                    Muhammad Zaini
                  </p>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}