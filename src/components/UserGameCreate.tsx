"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaVolumeOff } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  CoinIcon
} from "../../public/icons";
import ConfirmationModal from "./ConfirmationModalPage";

export default function UserGameCreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const length = parseInt(searchParams.get("length") || "4", 10);

  const [grid, setGrid] = useState<string[][]>(
    Array(4).fill(null).map(() => Array(length).fill(""))
  );

   const [showModal, setShowModal] = useState(false);

  const coins = useSelector((state: RootState) => state.game.coins);

  const handleCircleClick = (row: number, col: number) => {
    const letter = prompt("Enter a letter (A–Z):")?.toUpperCase();
    if (letter && /^[A-Z]$/.test(letter)) {
      const newGrid = [...grid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = letter;
      setGrid(newGrid);
    }
  };

  const handleSubmit = () => {
    const allFilled = grid.every(row => row.every(cell => cell !== ""));
    if (!allFilled) {
      alert("Please fill all letters before submitting.");
      return;
    }
    // You can store or send grid data here
    router.push("/game/create/confirmation"); // Route to confirmation screen
  };

   const handleConfirm = () => {
    setShowModal(false);
    router.push("/game/create/confirmation");
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-between items-center bg-[#F4C9EC]">
      <div className="hidden md:block w-full">
  <Header />
</div>   {/* Header Section */}
            <div className="relative w-full flex items-center justify-between py-2 px-2 gap-2 text-sm md:hidden">
              <div className="flex items-center gap-2 mt-0 ">
                <IoIosArrowBack
                  className="cursor-pointer  w-[34px] h-[40px] md:hidden"
                  style={{ color: "#000" }}
                  onClick={() => router.push("/game/create")}
                />
              </div>
    
              {/* Right Section */}
              <div className="flex items-center gap-2 mt-0 md:hidden">
                <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
                  <CoinIcon />
                  <span className="absolute text-black font-bold text-sm md:hidden">
                    {coins}
                  </span>
                </div>
              </div>
            </div>
      {/* Grid */}
     <div className="w-full px-2 sm:px-0 flex flex-col items-center gap-6 md:gap-3 mb-72 md:mb-2">
  {/* Grid Section */}
  <div className="flex flex-col gap-2 sm:gap-3 items-center">
    {grid.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className="flex gap-3 justify-center bg-[#FBDCF5] p-2 rounded-md"
      >
        {row.map((letter, colIndex) => (
          <div
            key={colIndex}
            onClick={() => handleCircleClick(rowIndex, colIndex)}
            className="w-15 h-15 bg-[#2258B9] rounded-full flex items-center justify-center text-white cursor-pointer text-lg sm:text-2xl font-semibold active:bg-white active:border-4 border-[#2258B9]"
          >
            {letter}
          </div>
        ))}
      </div>
    ))}
  </div>

  {/* Submit Button */}
  <button
    onClick={handleSubmit}
    className="bg-[#B3B3B3] text-white text-lg font-bold px-8 py-3 rounded-lg"
  >
    SUBMIT
  </button>
</div>
      <div className="hidden md:block w-full">
  <Footer />
</div>
 {/* Show Modal */}
      {showModal && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
