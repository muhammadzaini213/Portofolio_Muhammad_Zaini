import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Zaini Portfolio`,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      url: `https://zaini-portofolio.vercel.app/articles/${article.slug}`,
      images: [{ url: "/images/og-preview.png", width: 1200, height: 630, alt: article.title }],
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
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article || !article.published) return notFound();

  return (
    <main className="min-h-screen bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-20 pb-20">

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#fed001] transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Articles</span>
        </Link>

        <header className="mb-10 md:mb-16 border-b border-white/10 pb-10 max-w-3xl">
          <h2 className="text-[#fed001] font-mono text-xs uppercase tracking-widest mb-4">
            Technical Writing
          </h2>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            {article.desc}
          </p>
          <div className="flex items-center gap-6 text-white/30 font-mono text-xs">
            <span className="flex items-center gap-2">
              <Calendar size={12} />
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
            {article.updatedAt > article.createdAt && (
              <span className="flex items-center gap-2">
                <Clock size={12} />
                Updated {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        <article
          className="md:col-span-2 prose-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-16 pt-10 border-t border-white/10 max-w-3xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#fed001] transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-xs uppercase tracking-widest">Back to Articles</span>
          </Link>
        </footer>

      </div>
    </main>
  );
}