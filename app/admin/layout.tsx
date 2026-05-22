import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = user?.app_metadata?.role === "admin";

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col bg-[#0d0d0d]">
        <div className="mb-10">
          <h2 className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
            System Control
          </h2>
          <h1 className="text-xl font-black tracking-tighter">
            ZAINI_OS <span className="text-white/20">v1.0</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-1 font-mono text-xs">
          <Link href="/admin" className="flex items-center gap-3 p-3 text-white/50 hover:text-accent hover:bg-white/[0.03] transition-all group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span> DASHBOARD
          </Link>

          <Link href="/admin/projects" className="flex items-center gap-3 p-3 text-white/50 hover:text-accent hover:bg-white/[0.03] transition-all group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span> PROJECTS_DB
          </Link>

          <Link href="/admin/articles" className="flex items-center gap-3 p-3 text-white/50 hover:text-accent hover:bg-white/[0.03] transition-all group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span> ARTICLES_LOG
          </Link>

          <Link href="/admin/settings" className="flex items-center gap-3 p-3 text-white/50 hover:text-accent hover:bg-white/[0.03] transition-all group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span> SYS_SETTINGS
          </Link>
        </nav>

        <form action="/api/auth/logout" method="POST" className="mt-auto border-t border-white/5 pt-4">
          <button className="w-full text-left p-3 text-red-500/50 hover:text-red-400 hover:bg-red-400/5 transition-all text-[10px] font-mono tracking-widest uppercase">
            [!] TERMINATE_SESSION
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

        <div className="relative p-10">{children}</div>
      </main>
    </div>
  );
}