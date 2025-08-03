"use client";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store";
import CustomImage from "../Custom/CustomImage";
import { avatarData, logo } from "@/constants/assets";

export default function Header() {
  const router = useRouter();
  const avatar = useSelector((state: RootState) => state.user.avatar);

  return (
    <header className="relative w-full h-20 bg-[#F4C9EC] md:bg-[#2258B9]">
      {/* Mobile Header */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 md:hidden">
        {/* Mobile Avatar */}
        {
          avatar &&
          <CustomImage
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => router.push("/profile")}
          />
        }

        {/* Settings Icon */}
        
        <IoSettingsOutline
          size={32}
          color="black"
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        />
      </div>

      {/* Desktop Header */}
        <CustomImage
          src={logo}
          alt="Wordum Logo"
          width={100}
          height={100}
          className="hidden md:inline absolute top-4 left-7 h-12 w-auto"
        />

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex font-nunito max-w-2xl mx-auto gap-12 items-center h-full text-white justify-center">
          <Link className="text-xl font-bold hover:underline" href="/">HOME</Link>
          <Link className="text-xl font-bold hover:underline" href="/game/info">HOW TO PLAY?</Link>
          <Link className="text-xl font-bold hover:underline" href="/settings">SETTINGS</Link>
          <Link className="text-xl font-bold hover:underline" href="/daily-wordum">DAILY WORDUM</Link>
        </nav>

        {/* Desktop Avatar */}
     
        <CustomImage
          src={avatar || avatarData[0].uri}
          alt="Avatar"
          width={100}
          height={100}
          className="hidden md:inline-block absolute top-4 right-7 w-10 h-10 rounded-full cursor-pointer border-2 border-white"
          onClick={() => router.push("/profile")}
        />
    </header>
  );
}
