// app/login/page.tsx
"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("AUTH_FAILED: Invalid credentials.")
      setLoading(false)
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-accent text-[9px] tracking-[0.5em] uppercase mb-3 font-bold">System_Authentication</p>
          <h1 className="text-3xl font-black text-white">ZAINI_OS <span className="text-white/20">v1.0</span></h1>
          <p className="text-white/20 text-[10px] mt-2 uppercase tracking-widest">Admin Access Required</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/[0.03] border border-white/10 p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">User_ID (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all"
              placeholder="admin@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Access_Key (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border border-red-500/30 bg-red-500/5 p-3 text-red-400 text-[10px] uppercase tracking-wider">
              {">"} {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-white text-black font-black py-4 flex items-center justify-center gap-3 transition-all disabled:opacity-40 uppercase text-[11px] tracking-[0.3em]"
          >
            {loading ? <><Loader2 className="animate-spin" size={14} /> AUTHENTICATING...</> : "INITIATE_SESSION"}
          </button>
        </form>

        <p className="text-center text-white/10 text-[9px] mt-6 uppercase tracking-widest">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}