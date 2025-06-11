"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CrossIcon } from "../../public/icons";
import { CoinIcon } from "../../public/icons";

export default function CodeInput() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.game.coins);
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const handlePlay = () => {
    router.push(`/game/join/${code}`);
  };

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center relative">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center w-full px-4 py-4 absolute top-0 md:hidden">
        {/* Avatar */}
        <img
          src={avatar ?? undefined}
          alt="Avatar"
          className="w-9 h-9 rounded-full cursor-pointer"
          onClick={() => router.push("/avatar")}
        />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <IoSettingsOutline
            size={28}
            className="text-black cursor-pointer"
            onClick={() => router.push("/settings")}
          />
          <div className="relative size-8 rounded-full bg-[#FFB400] flex items-center justify-center">
            <CoinIcon />
            <span className="absolute text-black font-bold text-sm">
              {coins}
            </span>
          </div>
        </div>
      </div>

      {/* Code Entry Box */}
      <div className="bg-[#2258B9] p-6 rounded-lg w-[350px] h-[350px] md:w-[500px] md:h-[450px] shadow-lg flex flex-col items-center justify-center">
        {/* Close Button (desktop only) */}
        <div
          className="absolute  size-1 md:size-8 top-8 right-20 text-black cursor-pointer md:block"
         onClick={() => router.push("/")}
        >
          <CrossIcon />
        </div>

        <h2 className="text-white text-3xl font-semibold text-center mb-10 mt-4">
          Enter Code
        </h2>

        <input
          type="text"
          placeholder="Code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-72 md:w-80 p-5 md:p-4 text-center text-2xl tracking-widest rounded outline-none bg-white text-[#2258B9] placeholder-[#C1C1C1]"
        />

        <button
          disabled={code.trim() === ""}
          onClick={handlePlay}
          className={`w-44 md:w-96 p-5 md:p-4 rounded-lg text-white text-2xl font-extrabold transition mt-12 ${
            code.trim() === ""
              ? "bg-[#B3B3B3] cursor-not-allowed"
              : "bg-[#EB598F] hover:bg-pink-700"
          }`}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}
