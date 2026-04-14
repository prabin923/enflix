"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      router.push("/browse");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 scale-110 blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <span className="text-4xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#ff1a1a] to-[#b20710]">
            ENFLIX
          </span>
        </Link>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 animate-in">
        <div className="bg-black/70 backdrop-blur-2xl border border-white/5 rounded-2xl p-10 sm:p-12 shadow-2xl shadow-black/50">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm mb-8">Start streaming on Enflix</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500/60 focus:bg-white/[0.07] transition-all duration-200"
                required
              />
              <label className="absolute left-4 top-2 text-[11px] text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-red-400 pointer-events-none">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500/60 focus:bg-white/[0.07] transition-all duration-200"
                required
              />
              <label className="absolute left-4 top-2 text-[11px] text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-red-400 pointer-events-none">
                Email address
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500/60 focus:bg-white/[0.07] transition-all duration-200"
                required
                minLength={6}
              />
              <label className="absolute left-4 top-2 text-[11px] text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-red-400 pointer-events-none">
                Password (min 6 characters)
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 disabled:opacity-50 text-base shadow-lg shadow-red-900/30 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-gray-400 text-sm">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="text-white hover:text-red-400 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
