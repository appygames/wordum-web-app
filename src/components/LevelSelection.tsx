"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function LevelSelection({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.game.coins);
  const [level, setLevel] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <nav className="relative py-3 px-5 w-full h-28 flex items-center justify-between bg-[#F4C9EC] md:bg-[#2258B9]">
        <div className="flex gap-2.5">
          <IoIosArrowBack
            size={32}
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => router.push("/")}
          />
          <FaRegUserCircle size={32} color="black" />
        </div>
        <div className="flex items-center gap-3">
          <IoSettingsOutline size={32} color="black" />
          <div className="flex justify-center items-center bg-[#FFB400] size-10 rounded-full font-bold">
            {coins}
          </div>
        </div>
      </nav>
      <div className="w-80 m-auto flex flex-col items-center">
        <RxCross1 className="close-icon cursor-pointer" onClick={onClose} />
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-black font-bold text-xl md:text-2xl md:mb-8">
            Choose your preferred level
          </h2>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg  bg-[#2258B9] cursor-pointer font-bold text-white hover:bg-[#5d7196] active:bg-green-400 translate-0.5 ${
              level === "easy" && "bg-green-400"
            }`}
            onClick={() => setLevel("easy")}
          >
            EASY
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold text-white hover:bg-[#5d7196] translate-0.5 ${
              level === "medium" && "bg-green-400"
            }`}
            onClick={() => setLevel("medium")}
          >
            MEDIUM
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold text-white hover:bg-[#5d7196] translate-0.5 ${
              level === "hard" && "bg-green-400"
            }`}
            onClick={() => setLevel("hard")}
          >
            HARD
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold text-white hover:bg-[#5d7196] translate-0.5 ${
              level === "expert" && "bg-green-400"
            }`}
            onClick={() => setLevel("expert")}
          >
            EXPERT
          </button>
          <button
            className="h-14 w-full max-w-80 text-xl rounded-lg bg-[#B3B3B3] text-white hover:bg-gray-600 cursor-pointer font-bold  translate-0.5"
            disabled={!level}
            onClick={() => router.push(`/game/play?level=${level}`)}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}
