import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { createParty } from "@/lib/watchParty";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("enflix-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { movieId } = await req.json();
  if (!movieId) {
    return NextResponse.json({ error: "Movie ID required" }, { status: 400 });
  }

  const party = createParty(movieId, user.id, user.name);
  return NextResponse.json({ party });
}
