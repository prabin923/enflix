"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import { getMovieById, movies, Movie } from "@/lib/movies";

export default function MovieDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [creatingParty, setCreatingParty] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const id = params.id as string;
    const found = getMovieById(id);
    if (found) setMovie(found);
  }, [params.id]);

  const handleCreateParty = async () => {
    if (!movie) return;
    setCreatingParty(true);
    try {
      const res = await fetch("/api/watch-party", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: movie.id }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/party/${data.party.id}`);
      }
    } finally {
      setCreatingParty(false);
    }
  };

  if (loading || !user || !movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const similarMovies = movies
    .filter(
      (m) =>
        m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g))
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Backdrop */}
      <div className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0 animate-slow-zoom">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-56 z-10 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto animate-in">
        {/* Top 10 badge */}
        {movie.top10 && (
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-red-600/15 backdrop-blur-sm border border-red-500/20 rounded-full">
            <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-xs font-bold text-red-400 tracking-wider uppercase">
              #{movie.top10} on Enflix Today
            </span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
          {movie.title}
        </h1>

        {movie.tagline && (
          <p className="text-base text-gray-400 italic mb-5 font-light">
            &ldquo;{movie.tagline}&rdquo;
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-green-400 font-bold">{movie.match}% Match</span>
          <span className="text-gray-400 text-sm">{movie.year}</span>
          <span className="px-2 py-0.5 border border-white/15 text-gray-300 text-xs font-medium rounded">
            {movie.rating}
          </span>
          <span className="text-gray-400 text-sm">{movie.duration}</span>
          <div className="flex gap-1.5">
            {movie.genre.map((g) => (
              <span key={g} className="px-2.5 py-0.5 bg-white/8 text-gray-300 text-xs rounded-full border border-white/5">
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`/watch/${movie.id}`}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all duration-200 shadow-xl shadow-white/10 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </Link>
          <button
            onClick={handleCreateParty}
            disabled={creatingParty}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-red-900/30 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {creatingParty ? "Creating..." : "Watch Together"}
          </button>
          <button className="w-11 h-11 flex items-center justify-center border border-white/20 rounded-full hover:border-white/40 transition-all active:scale-95">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="w-11 h-11 flex items-center justify-center border border-white/20 rounded-full hover:border-white/40 transition-all active:scale-95">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2">
            <p className="text-[17px] text-gray-200 leading-[1.8]">
              {movie.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Cast</span>
                <p className="text-sm text-gray-200 mt-1">{movie.cast.join(", ")}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Genres</span>
                <p className="text-sm text-gray-200 mt-1">{movie.genre.join(", ")}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Rating</span>
                <p className="text-sm text-gray-200 mt-1">{movie.rating}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Duration</span>
                <p className="text-sm text-gray-200 mt-1">{movie.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="pb-20">
            <h2 className="text-xl font-bold text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {similarMovies.map((m) => (
                <Link key={m.id} href={`/movie/${m.id}`} className="group">
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-black/50">
                    <img
                      src={m.thumbnail}
                      alt={m.title}
                      className="w-full h-[160px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs font-bold text-white truncate">
                          {m.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-green-400 text-[10px] font-bold">{m.match}%</span>
                          <span className="text-gray-400 text-[10px]">{m.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
