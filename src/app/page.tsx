"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/browse" : "/login");
    }
  }, [user, loading, router]);

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
