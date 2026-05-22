// app/admin/not-found.tsx
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="max-w-xl font-mono">
      <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">
        System_Error :: 404
      </p>

      <h1 className="text-6xl font-black mb-2">
        NOT_FOUND<span className="text-accent animate-pulse">_</span>
      </h1>

      <p className="text-white/30 text-xs uppercase tracking-widest mb-10">
        The record you requested does not exist in the database.
      </p>

      <div className="bg-white/[0.02] border border-white/10 p-6 mb-10 text-xs text-white/40 space-y-1">
        <p><span className="text-accent">STATUS</span> :: 404 NOT FOUND</p>
        <p><span className="text-accent">DB_QUERY</span> :: RETURNED NULL</p>
        <p><span className="text-accent">ACTION</span> :: RETURN TO LOG</p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/projects"
          className="text-[10px] uppercase tracking-widest border border-white/10 px-6 py-3 text-white/40 hover:text-accent hover:border-accent transition-all"
        >
          &gt; PROJECTS_DB
        </Link>
        <Link
          href="/admin/articles"
          className="text-[10px] uppercase tracking-widest border border-white/10 px-6 py-3 text-white/40 hover:text-accent hover:border-accent transition-all"
        >
          &gt; ARTICLES_LOG
        </Link>
      </div>
    </div>
  );
}