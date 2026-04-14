"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">
          <div className="flex items-center gap-10">
            <Link href="/browse" className="flex items-center group">
              <span className="text-[28px] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#ff1a1a] to-[#b20710] group-hover:from-[#ff4444] group-hover:to-[#e50914] transition-all duration-300">
                ENFLIX
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "/browse", label: "Home" },
                { href: "/browse?genre=Trending+Now", label: "Trending" },
                { href: "/browse?genre=Sci-Fi", label: "Sci-Fi" },
                { href: "/browse?genre=Action", label: "Action" },
                { href: "/browse?genre=Thriller", label: "Thriller" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden ring-2 ring-transparent group-hover:ring-white/30 transition-all duration-200">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-all duration-300 ${menuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-56 z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                      <div className="px-4 py-3.5 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
