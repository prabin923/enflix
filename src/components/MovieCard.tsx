"use client";

import Link from "next/link";
import { Movie } from "@/lib/movies";

export default function MovieCard({
  movie,
  rank,
}: {
  movie: Movie;
  rank?: number;
}) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={`group flex-shrink-0 relative ${rank ? "w-[200px]" : "w-[250px]"}`}
    >
      <div className="relative overflow-hidden rounded-md transition-all duration-300 group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl group-hover:shadow-black/80">
        {/* Rank number for Top 10 */}
        {rank && (
          <div className="absolute -left-3 bottom-0 z-10 pointer-events-none">
            <span
              className="text-[100px] font-black leading-none text-transparent"
              style={{
                WebkitTextStroke: "3px rgba(255,255,255,0.5)",
              }}
            >
              {rank}
            </span>
          </div>
        )}

        <img
          src={movie.thumbnail}
          alt={movie.title}
          className={`w-full object-cover transition-all duration-500 group-hover:brightness-50 ${
            rank ? "h-[280px]" : "h-[140px]"
          }`}
        />

        {/* Hover info overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-white/80 transition">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-transparent border-2 border-gray-400 rounded-full hover:border-white transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </div>

          <h3 className="text-sm font-bold text-white truncate">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-green-400 text-xs font-bold">
              {movie.match}%
            </span>
            <span className="px-1.5 py-px border border-gray-500/60 text-gray-300 text-[10px] rounded">
              {movie.rating}
            </span>
            <span className="text-gray-400 text-[11px]">{movie.duration}</span>
          </div>

          <div className="flex gap-1 mt-1.5">
            {movie.genre.slice(0, 3).map((g, i) => (
              <span key={g} className="text-[10px] text-gray-300">
                {i > 0 && <span className="text-gray-600 mx-0.5">&bull;</span>}
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
