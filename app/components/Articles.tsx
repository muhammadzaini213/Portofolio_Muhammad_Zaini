"use client";

import { articles } from "../data/articles";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Articles() {
    const latestArticles = articles.slice(0, 4);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const // Tambahkan 'as const' di sini
            }
        },
    };

    return (
        <section id="articles" className="max-w-7xl mx-auto px-6 pb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-end justify-between mb-12 border-b border-white/5 pb-6"
            >
                <div>
                    <h2 className="text-accent font-mono text-xs tracking-widest uppercase mb-2">
                        Journal
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-white">
                        Latest Articles
                    </h1>
                </div>
                <Link
                    href="/articles"
                    className="group flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider transition-all"
                >
                    View All
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-x-12 gap-y-10"
            >
                {latestArticles.map((a) => (
                    <motion.div key={a.slug} variants={itemVariants}>
                        <Link
                            href={`/articles/${a.slug}`}
                            className="group block relative"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-white/30 font-mono text-[10px] uppercase tracking-widest transition-colors group-hover:text-accent/60">
                                    <BookOpen size={14} />
                                    <span>Technical Writing</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-all duration-300 leading-tight">
                                    {a.title}
                                </h3>

                                <p className="text-white/50 text-base leading-relaxed line-clamp-2">
                                    {a.desc}
                                </p>

                                <div className="flex items-center gap-2 text-white/20 group-hover:text-white transition-colors text-xs font-bold uppercase tracking-widest pt-2">
                                    Read Article
                                    <div className="h-[1px] w-0 group-hover:w-8 bg-accent transition-all duration-500" />
                                </div>
                            </div>

                            <div className="absolute -inset-x-4 -inset-y-4 scale-95 bg-white/2 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-10" />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}