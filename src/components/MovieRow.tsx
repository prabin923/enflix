"use client";

import { useRef, useState, useEffect } from "react";
import { Movie } from "@/lib/movies";
import MovieCard from "./MovieCard";

export default function MovieRow({
  title,
  movies,
  isTop10,
}: {
  title: string;
  movies: Movie[];
  isTop10?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = rowRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
    };
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -700 : 700;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="mb-10 group/section">
      <h2 className="text-lg font-bold text-white mb-3 px-4 sm:px-8 lg:px-12 flex items-center gap-3">
        {title}
        <span className="text-xs text-red-500 font-medium opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 flex items-center gap-1 cursor-pointer">
          Explore All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </h2>
      <div className="group/row relative">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/20 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-12 scroll-smooth"
        >
          {movies.map((movie, idx) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rank={isTop10 ? idx + 1 : undefined}
            />
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/20 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
