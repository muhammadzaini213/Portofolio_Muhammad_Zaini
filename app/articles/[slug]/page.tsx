import { articles } from "@/app/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Zaini Portfolio`,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      url: `https://zaini-portofolio.vercel.app/articles/${article.slug}`,
      images: [
        {
          url: "/images/og-preview.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.desc,
      images: ["/images/og-preview.png"],
    },
  };
}

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

        <article>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-black text-white mb-6 mt-10">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold text-white mb-3 mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-white/80 text-lg leading-relaxed mb-4">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
              em: ({ children }) => <em className="text-white/60 italic">{children}</em>,
              ul: ({ children }) => <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-white/80 leading-relaxed">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#fed001] pl-6 my-6 text-white/60 italic">{children}</blockquote>
              ),
              code({ className, children, ...props }: any) {
                const isBlock = className?.includes('language-');
                return isBlock
                  ? <pre className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto mb-6 mt-4"><code className="text-white/80 text-sm font-mono">{children}</code></pre>
                  : <code className="text-[#fed001] bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
              },
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="rounded-xl border border-white/10 w-full my-8 object-cover" />
              ),
              hr: () => <hr className="border-white/10 my-10" />,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#fed001] underline underline-offset-2 hover:text-white transition-colors">{children}</a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
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