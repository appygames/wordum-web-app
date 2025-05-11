"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function LevelSelection({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [level, setLevel] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#80FFFF] flex flex-col items-center justify-center">
      <nav className="flex items-center justify-between w-full py-3 px-5 md:hidden">
        <div className="flex gap-2.5">
          <IoIosArrowBack
            size={32}
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => router.push("/")}
          />
          <FaRegUserCircle size={32} color="black" />
        </div>
        <div>
          <IoSettingsOutline size={32} color="black" />
        </div>
      </nav>
      <div className="w-80 m-auto flex flex-col items-center">
        <RxCross1 className="close-icon" onClick={onClose} />
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-black font-bold text-xl md:text-2xl md:mb-8">
            Choose your preferred level
          </h2>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg  bg-[#004c6b] cursor-pointer font-bold text-white hover:bg-[#0056b3] active:bg-green-400 translate-0.5 ${
              level === "easy" && "bg-green-400"
            }`}
            onClick={() => setLevel("easy")}
          >
            EASY
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold text-white hover:bg-[#0056b3] translate-0.5 ${
              level === "medium" && "bg-green-400"
            }`}
            onClick={() => setLevel("medium")}
          >
            MEDIUM
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold text-white hover:bg-[#0056b3] translate-0.5 ${
              level === "hard" && "bg-green-400"
            }`}
            onClick={() => setLevel("hard")}
          >
            HARD
          </button>
          <button
            className={`h-12 w-full max-w-72 text-xl rounded-lg bg-[#004c6b] cursor-pointer font-bold text-white hover:bg-[#0056b3] translate-0.5 ${
              level === "expert" && "bg-green-400"
            }`}
            onClick={() => setLevel("expert")}
          >
            EXPERT
          </button>
          <button
            className="h-12 w-full max-w-72 text-xl rounded-lg bg-gray-400 text-white hover:bg-gray-600 cursor-pointer font-bold  translate-0.5"
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
