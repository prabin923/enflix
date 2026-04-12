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
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-pulse">
          <span className="text-5xl font-black tracking-tighter text-red-600">
            ENFLIX
          </span>
        </div>
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
    <div className="min-h-screen bg-[#141414]">
      <Navbar />

      {/* Backdrop */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-48 z-10 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          {movie.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-green-400 font-bold text-lg">
            {movie.match}% Match
          </span>
          <span className="text-gray-300">{movie.year}</span>
          <span className="px-2 py-0.5 border border-gray-400 text-gray-300 text-sm">
            {movie.rating}
          </span>
          <span className="text-gray-300">{movie.duration}</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href={`/watch/${movie.id}`}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition text-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </Link>
          <button
            onClick={handleCreateParty}
            disabled={creatingParty}
            className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition text-lg disabled:opacity-50"
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {creatingParty ? "Creating..." : "Watch Together"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <p className="text-lg text-gray-200 leading-relaxed">
              {movie.description}
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">Cast: </span>
              <span className="text-white">{movie.cast.join(", ")}</span>
            </div>
            <div>
              <span className="text-gray-400">Genres: </span>
              <span className="text-white">{movie.genre.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="pb-20">
            <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {similarMovies.map((m) => (
                <Link
                  key={m.id}
                  href={`/movie/${m.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded transition-transform group-hover:scale-105">
                    <img
                      src={m.thumbnail}
                      alt={m.title}
                      className="w-full h-[120px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-xs font-bold text-white truncate">
                          {m.title}
                        </p>
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
