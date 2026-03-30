import { articles } from "@/app/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-20 pb-20">
        
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#fed001] transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Articles</span>
        </Link>

        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex items-center gap-6 mb-6 text-[#fed001] font-mono text-xs uppercase tracking-widest">
            {/* <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{article.date || "2024"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{article.readTime || "5 MIN READ"}</span>
            </div> */}
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-white/60 leading-relaxed italic border-l-4 border-[#fed001] pl-6">
            {article.desc}
          </p>
        </header>

        <article className="prose prose-invert prose-yellow max-w-none">
          <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line selection:bg-[#fed001] selection:text-black">
            {article.content}
          </p>
        </article>

        <footer className="mt-20 pt-10 border-t border-white/10">
          <div className="bg-white/5 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold mb-1">Enjoyed the article?</h4>
              <p className="text-white/40 text-sm">Let's discuss more about gameplay systems.</p>
            </div>
            <Link 
              href="/#contact" 
              className="bg-[#fed001] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Contact Me
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}