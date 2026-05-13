// app/admin/projects/page.tsx
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ProjectRowActions from "./ProjectRowActions"

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="font-mono max-w-5xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">System_Log</h2>
          <h1 className="text-4xl font-black">PROJECTS_DB<span className="text-accent animate-pulse">_</span></h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-accent text-black px-5 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
        >
          + NEW_PROJECT
        </Link>
      </div>

      <div className="bg-white/[0.02] border border-white/10">
        <div className="p-4 border-b border-white/5">
          <span className="text-[9px] text-white/30 uppercase tracking-widest">
            {projects.length} record{projects.length !== 1 ? "s" : ""} — {projects.filter((p) => p.featured).length} featured
          </span>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/30 text-[9px] uppercase tracking-widest">
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 hidden lg:table-cell">Flags</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/20 text-xs">
                  No projects yet. Deploy your first one.
                </td>
              </tr>
            )}
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                <td className="p-4">
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-[10px] text-white/30 font-mono mt-0.5">{p.slug}</p>
                </td>
                <td className="p-4 text-white/40 text-xs hidden md:table-cell">{p.role}</td>
                <td className="p-4">
                  {p.featured ? (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-accent">★ Featured</span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-white/20">— Standard</span>
                  )}
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <div className="flex flex-col gap-0.5">
                    {p.homeDisplay && (
                      <span className="text-[8px] text-green-400/70 uppercase tracking-wider">● Frontpage</span>
                    )}
                    {!p.homeDisplay && (
                      <span className="text-[8px] text-white/20 uppercase tracking-wider">○ Hidden</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <ProjectRowActions id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
