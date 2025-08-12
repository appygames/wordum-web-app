"use client";
import LevelSelection from "@/components/Playground/LevelSelection";
import { useRouter } from "next/navigation";

export default function PlayPage() {
  const router = useRouter();
  return <LevelSelection onClose={() => router.push("/")} />;
}
