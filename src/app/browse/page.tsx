"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import ChatBot from "@/components/ChatBot";
import { movies, genres, getMoviesByGenre } from "@/lib/movies";

export default function BrowsePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
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

  const featuredMovie = movies[0];

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <HeroBanner movie={featuredMovie} />

      <div className="-mt-20 relative z-10 pb-20">
        {genres.map((genre) => {
          const genreMovies = getMoviesByGenre(genre);
          return (
            <MovieRow key={genre} title={genre} movies={genreMovies} />
          );
        })}
      </div>

      <footer className="bg-[#141414] border-t border-gray-800 py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-2">ENFLIX - Watch Movies Together</p>
          <p>A Netflix + Prime inspired streaming experience</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
