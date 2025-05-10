"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[#7df9ff] min-h-screen max-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col gap-4 w-xs md:w-1/4 m-auto items-center justify-center">
        <Link
          href="/game"
          className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold hover:bg-[#0056b3] translate-0.5"
        >
          PLAY GAME
        </Link>
        <Link
          href="/game/create"
          className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold hover:bg-[#0056b3] translate-0.5"
        >
          CREATE
        </Link>
        <Link
          href="/game/join"
          className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold hover:bg-[#0056b3] translate-0.5"
        >
          ENTER CODE
        </Link>
      </div>
      <Footer />
    </div>
  );
}
