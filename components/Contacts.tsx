"use client";

import { Mail, Gamepad2, Send, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49v6.25zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "gamerlemah15@gmail.com",
    href: "mailto:gamerlemah15@gmail.com",
    icon: <Mail size={18} />,
  },
  {
    label: "Itch.io",
    value: "lordzaini.itch.io",
    href: "https://lordzaini.itch.io",
    icon: <Gamepad2 size={18} />,
    external: true,
  },
  {
    label: "GitHub",
    value: "muhammadzaini213",
    href: "https://github.com/muhammadzaini213",
    icon: <GitHubIcon />,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Muhammad Zaini",
    href: "https://www.linkedin.com/in/muhammad-zaini-a8582b306",
    icon: <LinkedInIcon />,
    external: true,
  },
];

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

export function Contacts() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 pb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#2d2d2d] p-6 md:p-16"
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/4 rounded-full bg-[#fed001] opacity-[0.05] blur-3xl md:h-64 md:w-64"
        />

        <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#fed001]">
              Get In Touch
            </p>

            <h2 className="mb-6 text-4xl sm:text-4xl md:text-6xl font-black leading-tight text-white">
              Let&apos;s Build Something Great.
            </h2>

            <p className="mx-auto mb-10 max-w-sm text-sm md:text-base leading-relaxed text-white/60 md:mx-0">
              Available for Unity gameplay programming, AI systems, and technical design roles.
            </p>

            <div className="flex w-full max-w-sm flex-col gap-3 mx-auto md:mx-0">
              <a
                href="mailto:gamerlemah15@gmail.com"
                className="flex items-center justify-center gap-3 rounded-full bg-[#fed001] px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-[#e5bc00] hover:scale-[1.02] active:scale-95"
              >
                <Send size={18} />
                Send an Email
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/cv-muhammad-zaini.pdf"
                  download
                  className="group flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-white/50 transition-all hover:border-[#fed001]/60 hover:text-[#fed001] active:scale-95"
                >
                  <FileText size={14} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                    Download CV
                  </span>
                </a>

                <a
                  href="https://lordzaini.itch.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-white/50 transition-all hover:border-[#fed001]/60 hover:text-[#fed001] active:scale-95"
                >
                  <ExternalLink size={14} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                    Portfolio
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT (ENLARGED VERSION) */}
          <div className="grid w-full gap-3">
            {CONTACT_LINKS.map(({ label, value, href, icon, external }) => (
              <motion.a
                key={label}
                variants={itemVariants}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${label}: ${value}`}
                className="group flex items-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.04] px-5 py-4 md:px-6 md:py-5 transition-all hover:border-[#fed001]/40 hover:bg-white/[0.07]"
              >
                {/* Icon (bigger) */}
                <div
                  aria-hidden="true"
                  className="mr-4 flex h-10 w-10 md:h-11 md:w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-[#fed001] transition-colors group-hover:bg-[#fed001] group-hover:text-black"
                >
                  {icon}
                </div>

                {/* Text (bigger) */}
                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-white/30">
                    {label}
                  </p>
                  <p className="truncate text-sm md:text-base font-medium text-white/90">
                    {value}
                  </p>
                </div>

                {/* Arrow */}
                <ExternalLink
                  size={14}
                  aria-hidden="true"
                  className="ml-3 flex-shrink-0 text-transparent transition-all group-hover:text-[#fed001]/50 group-hover:translate-x-0.5"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}