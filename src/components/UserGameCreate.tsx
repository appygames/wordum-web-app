"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CoinIcon } from "../../public/icons";
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
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const coins = useSelector((state: RootState) => state.game.coins);

  const handleSubmit = async () => {
    setYesClicked(true);
    setNoClicked(false);
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
      setSubmissionMessage("Submitted!");
      setTimeout(() => {
        setSubmissionMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving game to Firestore:", error);
      alert("Something went wrong while saving the game.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const allFilled = grid.every((row) => row.every((cell) => cell !== ""));

  const handleCreate = () => {
    if (!allFilled) {
      alert("Please fill all letters before submitting.");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center gap-9 bg-[#F4C9EC]">
      {/* Top Bar (Mobile) */}
      <div className="w-full flex items-center justify-between md:justify-around py-4 px-6 gap-4 md:gap-[85%] bg-[#F4C9EC]">
        <IoIosArrowBack
          className="cursor-pointer w-8 h-8 md:w-10 md:h-10 text-black"
          onClick={() => router.push("/game/create")}
        />

        <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
          <CoinIcon />
          <span className="absolute text-black font-bold text-sm md:text-base">
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
                <input
                  key={colIndex}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    if (/^[A-Z]?$/.test(val)) {
                      setGrid((prevGrid) => {
                        const newGrid = [...prevGrid];
                        newGrid[rowIndex] = [...newGrid[rowIndex]];
                        newGrid[rowIndex][colIndex] = val;
                        return newGrid;
                      });
                    }
                  }}
                  className="w-16 h-16 text-center text-white bg-[#2258B9] rounded-full text-lg sm:text-2xl font-semibold border-none outline-none focus:ring-4 focus:ring-white placeholder:text-white uppercase"
                  placeholder=""
                />
              ))}
            </div>
          ))}
        </div>

        {!showModal ? (
          <>
            {/* Reveal & Create Buttons */}
            <div className="flex items-center justify-between bg-[#2258B9] text-white px-4 md:px-10 py-3 md:py-5 gap-[3rem] rounded-lg shadow">
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

            <button
              onClick={handleCreate}
              disabled={isSubmitting || !allFilled}
              className={`px-15 py-4 rounded-lg font-bold transition-all duration-200 ${
                isSubmitting || !allFilled
                  ? "bg-[#B3B3B3] text-white cursor-not-allowed"
                  : "bg-[#EB598F] text-white cursor-pointer"
              }`}
            >
              {isSubmitting ? "Creating..." : "CREATE"}
            </button>
          </>
        ) : (
          // Modal overlay
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl px-6 py-8 w-[90%] max-w-md text-center shadow-lg">
              {isSubmitting ? (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#2258B9] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#2258B9] text-lg font-semibold">
                      Creating game...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-[#2258B9] mb-6">
                    Do you want to submit?
                  </p>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => {
                        setNoClicked(true);
                        setYesClicked(false);
                        setShowModal(false);
                      }}
                      className={`px-6 py-2 rounded-lg text-lg font-bold transition-all duration-200 ${
                        noClicked
                          ? "bg-[#EB598F] text-white"
                          : "bg-[#2258B9] text-white"
                      }`}
                    >
                      NO
                    </button>
                    <button
                      onClick={handleSubmit}
                      className={`px-6 py-2 rounded-lg text-lg font-bold transition-all duration-200 ${
                        yesClicked
                          ? "bg-[#EB598F] text-white"
                          : "bg-[#2258B9] text-white"
                      }`}
                    >
                      YES
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {submissionMessage && (
          <div className="text-green-700 text-sm font-semibold mt-2">
            {submissionMessage}
          </div>
        )}
      </div>

      {/* Game Code Modal */}
      {showGameCodeCopyModal && (
        <CopyGameCode onClose={() => router.push("/")} code={gameCode} />
      )}
    </div>
  );
}
