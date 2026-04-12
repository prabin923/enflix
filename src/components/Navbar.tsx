"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/browse" className="flex items-center">
              <span className="text-3xl font-black tracking-tighter text-red-600">
                ENFLIX
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/browse"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/browse?genre=Trending+Now"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Trending
              </Link>
              <Link
                href="/browse?genre=Sci-Fi"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Sci-Fi
              </Link>
              <Link
                href="/browse?genre=Action"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Action
              </Link>
            </div>
          </div>

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded"
                />
                <svg
                  className={`w-4 h-4 text-white transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-gray-700 rounded shadow-xl">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
