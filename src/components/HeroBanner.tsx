"use client";

import Link from "next/link";
import { Movie } from "@/lib/movies";

export default function HeroBanner({ movie }: { movie: Movie }) {
  return (
    <div className="relative h-[80vh] min-h-[500px]">
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-2xl px-4 sm:px-8 lg:px-12 pt-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-green-400 font-bold text-lg">
              {movie.match}% Match
            </span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="px-2 py-0.5 border border-gray-400 text-gray-300 text-sm">
              {movie.rating}
            </span>
            <span className="text-gray-300">{movie.duration}</span>
          </div>
          <p className="text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow">
            {movie.description}
          </p>
          <div className="flex gap-3">
            <Link
              href={`/watch/${movie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-gray-500/70 text-white font-bold rounded hover:bg-gray-500/50 transition text-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
