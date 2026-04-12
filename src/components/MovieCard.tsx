"use client";

import Link from "next/link";
import { Movie } from "@/lib/movies";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group flex-shrink-0 w-[240px]">
      <div className="relative overflow-hidden rounded transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-[135px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-bold text-white truncate">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-green-400 text-xs font-bold">
                {movie.match}% Match
              </span>
              <span className="text-gray-400 text-xs">{movie.rating}</span>
              <span className="text-gray-400 text-xs">{movie.year}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
