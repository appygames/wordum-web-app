// app/game-info/page.tsx
"use client";
import HowToPlay from "@/components/HowToPlay";
import { useRouter } from "next/navigation";

export default function GameInfo() {
  const router = useRouter();

  return (
    <HowToPlay
      open={true}
      onClose={() => router.push("/")} 
    />
  );
}
