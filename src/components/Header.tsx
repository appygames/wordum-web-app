"use client";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";

export default function Header() {
  const router = useRouter();
  const avatar = useSelector((state: RootState) => state.user.avatar);

  return (
    <header className="relative w-full h-20 bg-[#F4C9EC] md:bg-[#2258B9]">
      {/* Mobile Header */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 md:hidden">
        {/* Mobile Avatar */}
        {avatar && <img
          src={avatar}
          alt="Avatar"
          className="w-9 h-9 rounded-full cursor-pointer"
          onClick={() => router.push("/profile")}
        />}

        {/* Settings Icon */}
        <IoSettingsOutline
          size={32}
          color="black"
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        />
      </div>

      {/* Desktop Header */}
     <div className="hidden sm:flex items-center justify-between w-full h-full px-4">
        {/* Left: Logo */}
        <img
          src="/Logo/Logo.png"
          alt="Logo"
          className="h-10 lg:h-14 md:h-12 w-auto"
        />

        {/* Center: Navigation Links */}
        <nav className="flex font-nunito items-center justify-center gap-6 md:gap-10 lg:gap-14 xl:gap-20  h-full text-white flex-wrap">
          <Link className="text-sm md:text-base lg:text-lg  font-bold hover:underline whitespace-nowrap" href="/">
            HOME
          </Link>
          <Link className="text-sm md:text-base lg:text-lg  font-bold hover:underline whitespace-nowrap" href="/game-info">
            HOW TO PLAY?
          </Link>
          <Link className="text-sm md:text-base lg:text-lg  font-bold hover:underline whitespace-nowrap" href="/settings">
            SETTINGS
          </Link>
          <Link className="text-sm md:text-base lg:text-lg  font-bold hover:underline whitespace-nowrap" href="/daily-wordum">
            DAILY WORDUM
          </Link>
        </nav>

        {/* Right: Avatar */}
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12  rounded-full cursor-pointer border-2 border-white"
            onClick={() => router.push("/profile")}
          />
        )}
      </div>
    </header>
  );
}
