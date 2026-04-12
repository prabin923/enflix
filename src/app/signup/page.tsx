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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute top-6 left-8">
        <Link href="/">
          <span className="text-4xl font-black tracking-tighter text-red-600">
            ENFLIX
          </span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black/80 rounded-lg p-12">
          <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 bg-gray-700/80 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-700/80 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 bg-gray-700/80 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition disabled:opacity-50 text-lg"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-gray-400">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="text-white hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
