import { articles } from "../data/articles";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ArticlesPage() {
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
            Writing
          </h2>
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 leading-tight">
            Articles
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
            Thoughts on gameplay architecture, AI systems, and technical lessons learned 
            from game development.
          </p>
        </header>

        <div className="grid gap-0">
          {articles.map((a) => (
            <Link 
              key={a.slug} 
              href={`/articles/${a.slug}`} 
              className="group block"
            >
              <div className="flex flex-row items-start md:items-center justify-between gap-4 py-8 md:py-10 border-b border-white/10 transition-all group-hover:border-[#fed001]/50">
                <div className="flex-1">
                  <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 group-hover:text-[#fed001] transition-colors leading-snug">
                    {a.title}
                  </h2>
                  
                  <p className="text-white/50 text-sm md:text-lg leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-none">
                    {a.desc}
                  </p>
                </div>

                <div className="flex items-center self-center md:self-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#fed001] group-hover:border-[#fed001] transition-all transform group-hover:translate-x-1 md:group-hover:translate-x-2 shrink-0">
                    <ArrowRight 
                      size={18} 
                      className="text-white group-hover:text-black transition-colors" 
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}