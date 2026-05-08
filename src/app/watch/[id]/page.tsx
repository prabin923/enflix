"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Movie } from "@/lib/movies";

export default function WatchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadMovie = async () => {
      const id = params.id as string;
      try {
        const response = await fetch(`/api/movies/${id}`, { cache: "no-store" });
        if (!response.ok) {
          setMovie(null);
          return;
        }
        const data = (await response.json()) as { movie: Movie };
        setMovie(data.movie);
      } catch (error) {
        console.error("Failed to load movie:", error);
        setMovie(null);
      }
    };

    loadMovie();
  }, [params.id]);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  if (loading || !user || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black relative"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4 p-4">
          <Link
            href={`/movie/${movie.id}`}
            className="text-white hover:text-gray-300 transition"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">{movie.title}</h1>
            <p className="text-sm text-gray-400">
              {movie.year} | {movie.rating} | {movie.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex items-center justify-center min-h-screen">
        <video
          src={movie.videoUrl}
          controls
          autoPlay
          className="w-full h-screen object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
