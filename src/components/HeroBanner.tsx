"use client";

import Link from "next/link";
import { Movie } from "@/lib/movies";

export default function HeroBanner({ movie }: { movie: Movie }) {
  return (
    <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0 animate-slow-zoom">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="relative h-full flex items-end pb-24">
        <div className="max-w-2xl px-4 sm:px-8 lg:px-12">
          {/* Top 10 badge */}
          {movie.top10 && (
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-xs font-bold text-red-400 tracking-wider uppercase">
                #{movie.top10} on Enflix Today
              </span>
            </div>
          )}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight leading-[0.95]">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-lg text-gray-300 italic mb-5 font-light">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-green-400 font-bold text-base">
              {movie.match}% Match
            </span>
            <span className="text-gray-400 text-sm">{movie.year}</span>
            <span className="px-2 py-0.5 border border-gray-500/50 text-gray-300 text-xs font-medium rounded">
              {movie.rating}
            </span>
            <span className="text-gray-400 text-sm">{movie.duration}</span>
            <div className="flex gap-1.5 ml-1">
              {movie.genre.map((g) => (
                <span key={g} className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base text-gray-300 mb-8 line-clamp-3 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          <div className="flex gap-3">
            <Link
              href={`/watch/${movie.id}`}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all duration-200 text-base shadow-xl shadow-white/10 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/25 transition-all duration-200 text-base border border-white/10 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
