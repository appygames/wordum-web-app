"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CrossIcon } from "../../public/icons";
import { CoinIcon } from "../../public/icons";

export default function CreateGamePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.game.coins);
  const avatar = useSelector((state: RootState) => state.user.avatar);

  const handleSelect = (length: number) => {
    setSelected(length);
    router.push(`/game/create/grid?length=${length}`);
  };

  const handleClose = () => {
    router.push("/"); // Navigate to desired page on close
  };

  return (
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden relative">
      {/* Mobile-only top bar */}
      {/* Mobile-only top bar */}
      <div className="flex justify-between items-center w-full px-4 py-4 md:hidden">
        {/* Avatar */}
        <img
          src={avatar ?? undefined}
          alt="Avatar"
          className="w-9 h-9 rounded-full cursor-pointer"
          onClick={() => router.push("/avatar")}
        />

        {/* Right section: Settings then Coin */}
        <div className="flex items-center gap-4">
          {/* Settings icon */}
          <IoSettingsOutline
            size={28}
            className="text-black cursor-pointer"
            onClick={() => router.push("/setting")}
          />

          {/* Coin display */}
          <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
            <CoinIcon />
            <span className="absolute text-black font-bold text-sm sm:text-base">
              {coins}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop-only close icon in top-right */}
      <div
        className="hidden md:block absolute top-6 right-40 cursor-pointer size-8"
        onClick={handleClose}
      >
        <CrossIcon />
      </div>

      {/* Level selection section */}
      <div className="flex flex-col gap-6 md:gap-4 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito items-center justify-center text-white mt-40 md:mt-20">
        <div className="w-lg flex flex-col items-center gap-5 md:mt-[262px] md:gap-4">
          <h2 className="text-black font-bold text-2xl mb-9 md:text-3xl md:mb-10">
            Choose your preferred level
          </h2>

          <button
            onClick={() => handleSelect(4)}
            className={`h-12 w-full max-w-[288px] md:h-17 md:max-w-[350px] text-2xl rounded-lg font-bold cursor-pointer transition-all ${
              selected === 4
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white"
            }`}
          >
            4 LETTERS
          </button>

          <button
            onClick={() => handleSelect(5)}
            className={`h-12 w-full max-w-[288px] md:h-17 md:max-w-[350px] text-2xl rounded-lg font-bold cursor-pointer transition-all ${
              selected === 5
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white"
            }`}
          >
            5 LETTERS
          </button>
        </div>
      </div>
    </div>
  );
}
