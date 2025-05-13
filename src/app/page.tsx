"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
  <Header />
  <div className="flex flex-col gap-4 w-xs md:w-1/4 m-auto items-center justify-center text-white mt-60 md:mt-32">
    <Link
      href="/game"
      className="w-[333px] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
    >
      PLAY GAME
    </Link>
    <Link
      href="/game/create"
      className="w-[333px] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
    >
      CREATE
    </Link>
    <Link
      href="/game/join"
      className="w-[333px] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
    >
      ENTER CODE
    </Link>
    <Link
      href="/daily-wordum"
      className="w-[333px]  md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
    >
      DAILY WORDUM
    </Link>
  </div>
  <Footer />
</div>

  );
}
