// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboard() {
  const [projectCount, articleCount, recentProjects, recentArticles] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.article.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const publishedArticles = await prisma.article.count({ where: { published: true } });
  const featuredProjects = await prisma.project.count({ where: { featured: true } });

  return (
    <div className="space-y-8 font-mono max-w-5xl">
      <div>
        <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">System_Status :: Online</h2>
        <h1 className="text-4xl font-black">DASHBOARD<span className="text-accent animate-pulse">_</span></h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total_Projects", value: projectCount, sub: `${featuredProjects} featured` },
          { label: "Total_Articles", value: articleCount, sub: `${publishedArticles} published` },
          { label: "Featured_Projects", value: featuredProjects, sub: "on homepage" },
          { label: "Draft_Articles", value: articleCount - publishedArticles, sub: "unpublished" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.03] border border-white/10 p-5">
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-3">{stat.label}</p>
            <p className="text-3xl font-black text-accent">{stat.value}</p>
            <p className="text-white/30 text-[9px] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white/[0.02] border border-white/10">
          <div className="flex justify-between items-center p-5 border-b border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Recent_Projects</span>
            <Link href="/admin/projects" className="text-[9px] text-accent hover:underline uppercase tracking-wider">
              View_All →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentProjects.length === 0 && (
              <p className="p-5 text-white/20 text-xs">No projects yet.</p>
            )}
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                href={`/admin/projects/${p.id}`}
                className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-all group"
              >
                <div>
                  <p className="text-sm font-bold group-hover:text-accent transition-colors">{p.title}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{p.role}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  {p.featured && <span className="text-accent text-[9px] block">★ Featured</span>}
                  <span className="text-white/20 text-[9px]">
                    {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white/[0.02] border border-white/10">
          <div className="flex justify-between items-center p-5 border-b border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Recent_Articles</span>
            <Link href="/admin/articles" className="text-[9px] text-accent hover:underline uppercase tracking-wider">
              View_All →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentArticles.length === 0 && (
              <p className="p-5 text-white/20 text-xs">No articles yet.</p>
            )}
            {recentArticles.map((a) => (
              <Link
                key={a.id}
                href={`/admin/articles/${a.id}`}
                className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-all group"
              >
                <div>
                  <p className="text-sm font-bold group-hover:text-accent transition-colors">{a.title}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{a.desc.slice(0, 50)}...</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={`text-[9px] block ${a.published ? "text-green-400" : "text-white/30"}`}>
                    {a.published ? "● Published" : "○ Draft"}
                  </span>
                  <span className="text-white/20 text-[9px]">
                    {formatDistanceToNow(new Date(a.updatedAt), { addSuffix: true })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border border-white/10 p-5 bg-white/[0.02]">
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Quick_Actions</p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/projects/new", label: "+ New_Project" },
            { href: "/admin/articles/new", label: "+ New_Article" },
            { href: "/admin/settings", label: "⚙ Site_Settings" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="border border-accent/30 text-accent hover:bg-accent hover:text-black px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}