import { NextResponse } from "next/server";
import { getCatalogGenres, getCatalogMovies } from "@/lib/cineby";

export async function GET() {
  try {
    const movies = await getCatalogMovies();
    const genres = await getCatalogGenres(movies);
    return NextResponse.json({ movies, genres });
  } catch (error) {
    console.error("Movies API error:", error);
    return NextResponse.json(
      { error: "Failed to load movie catalog" },
      { status: 500 }
    );
  }
}
