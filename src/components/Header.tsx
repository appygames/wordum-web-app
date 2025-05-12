"use client";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export default function Header() {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.game.coins);

  return (
    <header className="relative py-3 px-5 w-full h-28 flex items-center justify-between bg-[#F4C9EC] md:bg-[#2258B9]">
      <img
        src="/Logo/Logo.png"
        alt="Example Image"
        className="hidden md:inline absolute top-6 left-7 h-16 w-auto"
      />

      <nav className="hidden md:flex max-w-2xl m-auto gap-12 text-white">
        <Link className="text-xl font-bold hover:underline" href="/">
          HOME
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/about">
          ABOUT
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/game-info">
          GAME INFO
        </Link>
        <Link className="text-xl font-bold hover:underline" href="/daily-wordum">
          DAILY WORDUM
        </Link>
      </nav>
      <div className="flex items-center justify-between w-full md:hidden bg-[#F4C9EC] px-4">
        <FaRegUserCircle size={32} color="black" />

        <div className="flex items-center gap-3">
          <IoSettingsOutline size={32} color="black" />
          <div className="flex justify-center items-center bg-[#FFB400] size-10 rounded-full font-bold">
            {coins}
          </div>
        </div>
      </div>
    </header>
  );
}
