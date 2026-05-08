import { NextRequest, NextResponse } from "next/server";
import { getCatalogMovies } from "@/lib/cineby";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movies = await getCatalogMovies();
    const movie = movies.find((item) => item.id === id);

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ movie });
  } catch (error) {
    console.error("Movie detail API error:", error);
    return NextResponse.json(
      { error: "Failed to load movie details" },
      { status: 500 }
    );
  }
}
