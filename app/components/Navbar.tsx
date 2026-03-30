"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Deteksi arah scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Jika scroll ke bawah dan sudah melewati 150px, sembunyikan
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Tutup menu mobile jika sedang terbuka saat scroll
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Articles", href: "#articles" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -120, opacity: 0 }, // Sembunyi lebih jauh ke atas
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Ease yang lebih "snappy"
      className="w-full fixed top-0 z-50 px-5 pt-4"
    >
      <nav className="bg-[#2d2d2d]/80 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/10 shadow-2xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">

          {/* Logo / Name */}
          <a href="#" className="group flex items-center gap-3 h-10">
            <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-lg transition-transform group-hover:scale-110 active:scale-95 shrink-0">
              <Image
                src="/images/zeta.png"
                alt="Zeta Logo"
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden h-full">
              <span className="font-black tracking-tighter text-white text-lg leading-none transition-transform duration-300 group-hover:-translate-y-2">
                ZAINI
              </span>
              <span className="absolute bottom-0 left-0 text-[9px] font-mono text-[#fed001] tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-[-2px] transition-all duration-300">
                Systems
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#fed001] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#fed001] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/[0.02] border-t border-white/5"
            >
              <div className="px-8 py-10 flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    className="text-3xl font-black text-white hover:text-[#fed001] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}