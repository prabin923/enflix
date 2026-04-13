import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { verifyToken } from "@/lib/auth";
import { movies } from "@/lib/movies";

const movieCatalog = movies
  .map(
    (m) =>
      `[ID:${m.id}] "${m.title}" (${m.year}) — ${m.genre.join(", ")} — ${m.rating} — ${m.match}% match — ${m.description}`
  )
  .join("\n");

const systemPrompt = `You are Enflix AI, a friendly movie recommendation assistant for the Enflix streaming platform. You help users find the perfect movie to watch.

Here is the complete movie catalog available on Enflix:

${movieCatalog}

Your job:
- Recommend movies from the catalog based on the user's mood, preferences, or questions
- When suggesting a movie, include its title, year, genre, and a brief reason why they'd enjoy it
- If the user can't decide, ask about their mood or what genres they like, then suggest 2-3 options
- Format movie titles in bold using **Title**
- Keep responses concise and enthusiastic but not over the top
- If asked about movies not in the catalog, let them know what's available that's similar
- You can ONLY recommend movies from the catalog above — do not make up movies
- When recommending, include the movie ID in this format so the UI can create links: [MOVIE:id] (e.g. [MOVIE:1])`;

export async function POST(req: NextRequest) {
  const token = req.cookies.get("enflix-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI chatbot not configured. Set ANTHROPIC_API_KEY in .env.local" },
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
