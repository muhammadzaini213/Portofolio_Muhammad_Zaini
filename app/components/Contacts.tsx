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
        className="bg-[#2d2d2d] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden"
      >
        
        {/* Decorative Light Effect */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 rounded-full blur-3xl" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-[#fed001] font-mono text-xs tracking-widest uppercase mb-4">
              Get In Touch
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let's Build <br /> Something Great.
            </h1>
            <p className="text-white/60 text-lg max-w-sm leading-relaxed mb-10">
              Available for Unity gameplay programming, AI systems, and technical design roles.
            </p>
            
            <a 
              href="mailto:gamerlemah15@gmail.com"
              className="inline-flex items-center gap-3 bg-[#fed001] hover:bg-[#e5bc00] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <Send size={18} />
              Send an Email
            </a>
          </motion.div>

          <div className="grid gap-4">
            {/* Email Link */}
            <motion.a 
              variants={itemVariants}
              href="mailto:gamerlemah15@gmail.com" 
              className="group flex items-center justify-between p-6 bg-transparent rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-mono mb-1">Email</p>
                  <p className="text-white font-medium text-sm md:text-base">gamerlemah15@gmail.com</p>
                </div>
              </div>
            </motion.a>

            {/* GitHub Link */}
            <motion.a 
              variants={itemVariants}
              href="https://github.com/muhammadzaini213" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-transparent rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-mono mb-1">GitHub</p>
                  <p className="text-white font-medium text-sm md:text-base">muhammadzaini213</p>
                </div>
              </div>
            </motion.a>

            {/* Itch.io Link */}
            <motion.a 
              variants={itemVariants}
              href="https://lordzaini.itch.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg=transparent rounded-2xl border border-white/5 hover:border-[#fed001]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#fed001] group-hover:bg-[#fed001] group-hover:text-black transition-colors">
                  <Gamepad2 size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-mono mb-1">Itch.io</p>
                  <p className="text-white font-medium text-sm md:text-base">lordzaini.itch.io</p>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}