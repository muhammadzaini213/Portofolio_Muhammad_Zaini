// app/admin/articles/page.tsx
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import ArticleRowActions from "./ArticleRowActions"

export default async function ArticlesAdmin() {
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } })

  return (
    <div className="font-mono max-w-5xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">Content_Log</h2>
          <h1 className="text-4xl font-black">
            ARTICLES_LOG<span className="text-accent animate-pulse">_</span>
          </h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-accent text-black px-5 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
        >
          + NEW_ENTRY
        </Link>
      </div>

      <div className="bg-white/[0.02] border border-white/10">
        <div className="p-4 border-b border-white/5">
          <span className="text-[9px] text-white/30 uppercase tracking-widest">
            {articles.length} record{articles.length !== 1 ? "s" : ""} —{" "}
            {articles.filter((a) => a.published).length} published
          </span>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/30 text-[9px] uppercase tracking-widest">
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 hidden lg:table-cell">Updated</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/20 text-xs">
                  No articles yet. Write your first one.
                </td>
              </tr>
            )}
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                <td className="p-4">
                  <p className="font-bold text-sm">{a.title}</p>
                  <p className="text-[10px] text-white/30 font-mono mt-0.5">{a.slug}</p>
                </td>
                <td className="p-4 text-white/40 text-xs hidden md:table-cell max-w-xs">
                  <span className="line-clamp-2">{a.desc}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`text-[9px] uppercase tracking-wider font-bold ${
                      a.published ? "text-green-400" : "text-white/30"
                    }`}
                  >
                    {a.published ? "● Published" : "○ Draft"}
                  </span>
                </td>
                <td className="p-4 text-white/30 text-[10px] hidden lg:table-cell">
                  {formatDistanceToNow(new Date(a.updatedAt), { addSuffix: true })}
                </td>
                <td className="p-4">
                  <ArticleRowActions id={a.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
