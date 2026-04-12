import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { joinParty, getParty } from "@/lib/watchParty";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("enflix-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { partyId } = await req.json();
  if (!partyId) {
    return NextResponse.json({ error: "Party ID required" }, { status: 400 });
  }

  const party = joinParty(partyId, user.id, user.name);
  if (!party) {
    return NextResponse.json({ error: "Party not found" }, { status: 404 });
  }

  return NextResponse.json({ party });
}

export async function GET(req: NextRequest) {
  const partyId = req.nextUrl.searchParams.get("id");
  if (!partyId) {
    return NextResponse.json({ error: "Party ID required" }, { status: 400 });
  }

  const party = getParty(partyId);
  if (!party) {
    return NextResponse.json({ error: "Party not found" }, { status: 404 });
  }

  return NextResponse.json({ party });
}
