"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CoinIcon } from "../../public/icons";
import ConfirmationModal from "./ConfirmationModalPage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CopyGameCode from "./CopyGameCode";
import { cn } from "@/utils/utils";

export default function UserGameCreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const length = parseInt(searchParams.get("length") || "4", 10);

  const [grid, setGrid] = useState<string[][]>(
    Array(4)
      .fill(null)
      .map(() => Array(length).fill(""))
  );

  const [gameCode, setGameCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showGameCodeCopyModal, setShowGameCodeCopyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reveal, setReveal] = useState(false);
  const coins = useSelector((state: RootState) => state.game.coins);

  const handleCircleClick = (row: number, col: number) => {
    const input = prompt("Enter a letter (A–Z):")?.toUpperCase();
    if (input && /^[A-Z]$/.test(input)) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = input;
        return newGrid;
      });
    } else if (input) {
      alert("Invalid input. Please enter a single letter (A–Z).");
    }
  };

  const handleSubmit = async () => {
    const allFilled = grid.every((row) => row.every((cell) => cell !== ""));
    if (!allFilled) {
      alert("Please fill all letters before submitting.");
      return;
    }
    const level =
      length === 4 ? (reveal ? "easy" : "medium") : reveal ? "medium" : "hard";
    const targetWords = grid.map((row) => row.join(""));
    const gameData = {
      targetWords,
      coins,
      length,
      level,
      createdAt: Timestamp.now(),
    };

    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, "userGames"), gameData);
      setGameCode(docRef.id);
      setShowModal(false);
      setShowGameCodeCopyModal(true);
    } catch (error) {
      console.error("Error saving game to Firestore:", error);
      alert("Something went wrong while saving the game.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center gap-9 bg-[#F4C9EC]">
      {/* Header */}
      <div className="hidden md:block w-full">
        <Header />
      </div>

      {/* Top Bar (Mobile) */}
      <div className="relative w-full flex items-center py-2 px-4 gap-4 text-sm md:hidden justify-between">
        <IoIosArrowBack
          className="cursor-pointer w-[34px] h-[40px]"
          style={{ color: "#000" }}
          onClick={() => router.push("/game/create")}
        />
        <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
          <CoinIcon />
          <span className="absolute text-black font-bold text-sm md:hidden">
            {coins}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full px-2 flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3 items-center">
          {grid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-3 justify-center bg-[#FBDCF5] p-2 rounded-md"
            >
              {row.map((letter, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleCircleClick(rowIndex, colIndex)}
                  className="w-14 h-14 bg-[#2258B9] rounded-full flex items-center justify-center text-white cursor-pointer text-lg sm:text-2xl font-semibold active:bg-white active:border-4 border-[#2258B9]"
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-[#2258B9] text-white px-4 py-3 rounded-xl shadow">
          <span>Reveal one letter in each word</span>
          <button
            onClick={() => setReveal(!reveal)}
            className={cn(
              "w-12 min-h-6 p-0.5 rounded-full relative transition-all duration-300 border-4 border-white flex items-center",
              reveal ? "justify-end" : "justify-start"
            )}
          >
            <span className="w-4 h-4 rounded-full bg-white transition-transform duration-300" />
          </button>
        </div>
        {/* Submit Button */}
        <button
          onClick={() => setShowModal(true)}
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg text-lg font-bold ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#B3B3B3] text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "SUBMIT"}
        </button>
      </div>

      {/* Footer */}
      <div className="hidden md:block w-full">
        <Footer />
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          onConfirm={handleSubmit}
        />
      )}

      {/* Game Code Modal */}
      {showGameCodeCopyModal && (
        <CopyGameCode onClose={() => router.push("/")} code={gameCode} />
      )}
    </div>
  );
}
