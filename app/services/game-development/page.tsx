import type { Metadata } from "next";
import Landing from "@/components/views/game-development/Landing";
import { GAME_DEVELOPMENT_CONTENT } from "@/components/views/game-development/content";

export const metadata: Metadata = {
  title: "Game Development Services — Shivlam | Unity, AR Games, Vision Pro",
  description:
    "Unity game development for mobile, PC, AR, and spatial computing. Shivlam builds performance-focused games with polished gameplay loops, UI, and store-ready delivery.",
  alternates: {
    canonical: "https://shivlam.vercel.app/services/game-development",
  },
};

export default function GameDevelopmentPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <Landing content={GAME_DEVELOPMENT_CONTENT.game} />
    </main>
  );
}

