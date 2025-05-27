"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  BarChart2,
  Wallet,
} from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Import Header and Footer
import Header from "./Header";
import Footer from "./Footer";

export default function ProfileCard() {
  const { avatar, coins, stats } = useSelector(
    (state: RootState) => state.user
  );
  const [showStats, setShowStats] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3  bg-[#F4C9EC]">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <ArrowLeftIcon />
        </div>
        <div onClick={() => router.push("/setting")} className="cursor-pointer">
          <IoSettingsOutline size={24} />
        </div>
      </div>

      {/* Main profile content */}
      <div className="flex flex-col items-center bg-[#F4C9EC] h-screen md:h-[60%] pt-12 pb-10 px-4">
        {/* Avatar with edit icon */}
        <div className="relative">
          {avatar && (
            <Image
              src={avatar}
              alt="user avatar"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-none p-0 m-0 block border-4 border-[#2258B9]"
            />
          )}
          <div className="absolute bottom-0 right-0 bg-[#2258B9] p-1 rounded-full">
            <Pencil size={16} color="white" />
          </div>
        </div>

        {/* Coin display */}
        <div className="bg-[#2258B9] text-white rounded-lg flex items-center justify-between px-4 py-2 mt-6 w-72 shadow-md">
          <div className="flex items-center gap-2">
            <Wallet size={20} />
            <span className="font-semibold">Coins earned</span>
          </div>
          <span className="font-bold">{coins}</span>
        </div>

        {/* Stats box with embedded content */}
        <div
          onClick={() => setShowStats(!showStats)}
          className={`bg-[#2258B9] text-white rounded-lg px-4 py-2 mt-4 w-72 shadow-md cursor-pointer transition-all duration-300 ${
            showStats ? "pb-4" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 size={20} />
              <span className="font-semibold">Stats</span>
            </div>
            {showStats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {/* Stats details */}
          {showStats && (
            <div className="mt-3 text-sm text-white">
              <div className="flex justify-between font-semibold mb-2">
                <span>Level</span>
                <span>Wins / Losses</span>
              </div>
              <div className="flex flex-col gap-y-6 md:gap-y-1">
                <div className="flex justify-between">
                  <span>Easy</span>
                  <span>{stats.easy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium</span>
                  <span>{stats.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard</span>
                  <span>{stats.hard}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expert</span>
                  <span>{stats.expert}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
