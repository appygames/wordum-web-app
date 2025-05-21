"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { CrossIcon } from "../../public/icons";

export default function LevelSelection({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [level, setLevel] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <nav className="flex items-center justify-between w-full py-3 px-5 md:hidden">
        <div className="flex gap-2.5">
          <IoIosArrowBack
            size={32}
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => router.push("/")}
          />
          <FaRegUserCircle
            size={32}
            color="black"
            className="cursor-pointer"
            onClick={() => router.push("/download")}
          />
        </div>
        <div>
          <IoSettingsOutline
            size={32}
            color="black"
            className="cursor-pointer"
            onClick={() => router.push("/setting")}
          />
        </div>
      </nav>
      <div className="w-80 m-auto flex flex-col items-center">
        <div className="close-icon cursor-pointer size-8" onClick={onClose}>
          <CrossIcon />
        </div>
        <div className="w-lg flex flex-col items-center gap-5 mb-32 md:mb-0 md:gap-4">
          <h2 className="text-black font-bold text-2xl mb-9 md:text-3xl md:mb-10">
            Choose your preferred level
          </h2>
          <button
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg font-bold cursor-pointer transition-all ${
              level === "easy"
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white "
            }`}
            onClick={() => setLevel("easy")}
          >
            EASY
          </button>

          <button
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg  cursor-pointer font-bold translate-0.5 ${
              level === "medium"
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white "
            }`}
            onClick={() => setLevel("medium")}
          >
            MEDIUM
          </button>
          <button
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg  cursor-pointer font-bold translate-0.5 ${
              level === "hard"
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white "
            }`}
            onClick={() => setLevel("hard")}
          >
            HARD
          </button>
          <button
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg cursor-pointer font-bold translate-0.5 ${
              level === "expert"
                ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white "
            }`}
            onClick={() => setLevel("expert")}
          >
            EXPERT
          </button>
          <button
            className="h-16 w-full mt-5 max-w-80 text-xl rounded-lg bg-[#EB598F] text-white cursor-pointer font-bold  translate-0.5"
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
