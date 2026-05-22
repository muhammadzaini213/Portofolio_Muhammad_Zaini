import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#2d2d2d] text-white flex items-center justify-center font-mono px-6">
      <div className="max-w-xl w-full">
        <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-3 font-bold">
          Error_404 :: Page_Not_Found
        </p>

        <h1 className="text-8xl font-black leading-none mb-2">
          4<span className="text-accent animate-pulse">0</span>4
        </h1>

        <p className="text-white/30 text-xs uppercase tracking-widest mb-10">
          The page you requested does not exist or has been moved.
        </p>

        <div className="border border-white/10 bg-white/[0.02] p-6 mb-10 text-xs text-white/40 space-y-1">
          <p><span className="text-accent">PATH</span> :: {"{requested_url}"}</p>
          <p><span className="text-accent">STATUS</span> :: 404 NOT FOUND</p>
          <p><span className="text-accent">ACTION</span> :: RETURN TO SAFE ZONE</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-accent text-black font-black text-xs uppercase tracking-[0.3em] px-8 py-4 hover:bg-white transition-all"
        >
          &gt; RETURN_HOME
        </Link>
      </div>
    </div>
  );
}