"use client";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";

export default function Header() {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.game.coins);
  const router = useRouter();

  return (
    <header className="relative w-full h-20 bg-[#F4C9EC] md:bg-[#2258B9]">
      {/* Mobile Header: fixed top bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 md:hidden">
        {/* Mobile Logo */}
        <img src="/Logo/Logo.png" alt="Logo" className="h-8 md:h-16 w-auto" />

        {/* Settings Icon */}
        <IoSettingsOutline
          size={28}
          color="black"
          className="cursor-pointer"
          onClick={() => router.push("/setting")}
        />
      </div>

      {/* Desktop Header */}
      <img
        src="/Logo/Logo.png"
        alt="Logo"
        className="hidden md:inline absolute top-4 left-7 h-12 w-auto"
      />

      <nav className="hidden md:flex max-w-2xl mx-auto gap-12 items-center h-full text-white justify-center">
        <Link className="text-xl font-bold hover:underline" href="/">
          HOME
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/about">
          ABOUT
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/game-info">
          GAME INFO
        </Link>
        <Link
          className="text-xl font-bold hover:underline"
          href="/daily-wordum"
        >
          DAILY WORDUM
        </Link>
      </nav>
    </header>
  );
}
