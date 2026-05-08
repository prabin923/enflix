"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Movie } from "@/lib/movies";

interface Party {
  id: string;
  movieId: string;
  hostId: string;
  hostName: string;
  participants: { id: string; name: string }[];
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export default function PartyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [party, setParty] = useState<Party | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const partyId = params.id as string;

    // Join the party
    fetch("/api/watch-party/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partyId }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.party) {
          setParty(data.party);
          const movieResponse = await fetch(`/api/movies/${data.party.movieId}`, {
            cache: "no-store",
          });
          if (movieResponse.ok) {
            const movieData = (await movieResponse.json()) as { movie: Movie };
            setMovie(movieData.movie);
          }
        }
      });

    // Poll for party updates
    const interval = setInterval(() => {
      fetch(`/api/watch-party/join?id=${partyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.party) setParty(data.party);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [params.id, user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  if (loading || !user || !party || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Joining watch party...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Video Section */}
      <div className={`flex-1 relative ${showChat ? "" : "w-full"}`}>
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/movie/${movie.id}`}
                className="text-white hover:text-gray-300 transition"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-sm font-bold text-white">
                  {movie.title}
                </h1>
                <p className="text-xs text-red-400">
                  Watch Party by {party.hostName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                {linkCopied ? "Copied!" : "Share Link"}
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 text-white hover:bg-white/10 rounded transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">Watching:</span>
            <div className="flex -space-x-2">
              {party.participants.map((p) => (
                <div
                  key={p.id}
                  className="w-7 h-7 rounded-full bg-red-600 border-2 border-black flex items-center justify-center"
                  title={p.name}
                >
                  <span className="text-xs font-bold text-white">
                    {p.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {party.participants.length}{" "}
              {party.participants.length === 1 ? "viewer" : "viewers"}
            </span>
          </div>
        </div>

        {/* Video */}
        <video
          src={movie.videoUrl}
          controls
          autoPlay
          className="w-full h-screen object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="w-80 bg-[#1a1a1a] flex flex-col border-l border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-bold text-white">Party Chat</h2>
            <p className="text-xs text-gray-400 mt-1">
              {party.participants.length} people watching
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* System message */}
            <div className="text-center">
              <p className="text-xs text-gray-500 bg-gray-800/50 inline-block px-3 py-1 rounded-full">
                Watch party started
              </p>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {msg.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-red-400">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-gray-800"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
