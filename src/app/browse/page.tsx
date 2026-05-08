"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import ChatBot from "@/components/ChatBot";
import { getMoviesByGenreFromList, Movie } from "@/lib/movies";

export default function BrowsePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadCatalog = async () => {
      if (!user) return;

      setCatalogLoading(true);
      try {
        const response = await fetch("/api/movies", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load movies");
        }
        const data = (await response.json()) as { movies: Movie[]; genres: string[] };
        setMovies(data.movies || []);
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to load movie catalog:", error);
      } finally {
        setCatalogLoading(false);
      }
    };

    loadCatalog();
  }, [user]);

  if (loading || !user || catalogLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse">
          <span className="text-5xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#ff1a1a] to-[#b20710]">
            ENFLIX
          </span>
        </div>
      </div>
    );
  }

  const featuredMovie = movies[0];
  if (!featuredMovie) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroBanner movie={featuredMovie} />

      <div className="-mt-24 relative z-10 pb-20">
        {genres.map((genre) => {
          const genreMovies = getMoviesByGenreFromList(movies, genre);
          return (
            <MovieRow
              key={genre}
              title={genre}
              movies={genreMovies}
              isTop10={genre === "Top 10 on Enflix"}
            />
          );
        })}
      </div>

      <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xl font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#ff1a1a]/60 to-[#b20710]/60">
            ENFLIX
          </span>
          <p className="text-gray-600 text-sm mt-2">
            Stream movies and watch together with friends
          </p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
