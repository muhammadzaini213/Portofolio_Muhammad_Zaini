import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany()

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link href="/admin/projects/new" className="bg-accent text-black px-4 py-2 font-bold">
          + New Project
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/40 text-sm">
            <th className="p-4">Title</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; role: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; featured: any }) => (
            <tr key={p.id} className="border-b border-white/5">
              <td className="p-4">{p.title}</td>
              <td className="p-4 text-white/60">{p.role}</td>
              <td className="p-4">
                {p.featured ? <span className="text-accent text-xs">★ Featured</span> : "-"}
              </td>
              <td className="p-4">
                <Link href={`/admin/projects/${String(p.id)}`} className="text-blue-400 hover:underline">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}