"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Kredensial tidak valid.");
      setLoading(false);
      return;
    }

    // Cek Role Admin di Metadata
    const isAdmin = data.user?.app_metadata?.role === "admin";

    if (!isAdmin) {
      setError("Akses ditolak. Anda bukan Admin.");
      await supabase.auth.signOut();
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-2">Secure Access</h2>
            <h1 className="text-4xl font-black text-white">ADMIN<span className="text-accent">.</span></h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="email" 
                  className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-white focus:border-accent focus:bg-white/[0.07] outline-none transition-all font-mono text-sm"
                  placeholder="admin@zaini.dev"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Access Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="password" 
                  className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-white focus:border-accent focus:bg-white/[0.07] outline-none transition-all font-mono text-sm"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs font-mono">
                {`> ERROR: ${error}`}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-[#e5bc00] text-black font-bold py-4 mt-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initiate Login"}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          &copy; 2026 Muhammad Zaini - Portofolio OS
        </p>
      </motion.div>
    </div>
  );
}