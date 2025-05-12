// app/game-info/page.tsx
"use client";
import HowToPlay from "@/components/HowToPlay";
import { useRouter } from "next/navigation";

export default function GameInfo() {
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBDCF5] opacity-30"></div>
      <HowToPlay open={true} onClose={() => router.push("/")} />
    </>
  );
}
