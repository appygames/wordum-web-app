"use client";
import { FaLightbulb, FaVolumeUp } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsBrightnessHighFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Resume from "./Resume";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setSelectedLetter,
  setDifficulty,
  Difficulty,
  revealLettersInGrid,
  checkGameWon,
  evaluateLetter,
  setTargetWords,
  removeLetterFromGrid,
  resetFeedback,
} from "@/features/game/gameSlice";

import { cn, targetWords } from "@/utils/utils";
import GameModal from "./GameModal";
import HowToPlay from "./HowToPlay";

export default function GameBoard({ level }: { level: Difficulty }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.game.grid);
  const [currentChar, setCurrentChar] = useState<number | null>(null);
  const keyboard = useSelector((state: RootState) => state.game.keyboard);
  const disabledButtons = useSelector(
    (state: RootState) => state.game.disabledButtons
  );
  const attempts = useSelector((state: RootState) => state.game.attempts);
  const coins = useSelector((state: RootState) => state.game.coins);
  const selectedLetter = useSelector(
    (state: RootState) => state.game.selectedLetter
  );
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const feedback = useSelector((state: RootState) => state.game.feedback);

  const [showModal, setShowModal] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const handleKeyClick = (char: string, index: number) => {
    setCurrentChar(index);
    dispatch(setSelectedLetter({ char, index }));
  };

  const handleCircleClick = (row: number, col: number) => {
    if (!selectedLetter) return;

    dispatch(
      evaluateLetter({
        selectedLetter: selectedLetter,
        rowIndex: row,
        colIndex: col,
      })
    );
    setCurrentChar(null);
    dispatch(checkGameWon());
  };

  const letterUsage: Record<string, number> = {};
  grid.flat().forEach((letter) => {
    if (letter) {
      letterUsage[letter] = (letterUsage[letter] || 0) + 1;
    }
  });

  useEffect(() => {
    if (!level) return;

    dispatch(resetFeedback());
    dispatch(setDifficulty(level as Difficulty));
    dispatch(setTargetWords(targetWords[level as Difficulty]));
    if (level === "easy" || level === "hard") {
      dispatch(revealLettersInGrid(targetWords[level as Difficulty]));
    }
  }, [level, dispatch]);

  return (
    <div className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col justify-between items-center bg-[#F4C9EC]">
      {/* Header Section */}
      <div className="relative w-full flex items-center justify-between py-2 sm:py-3 px-2 sm:px-5 gap-2 text-sm sm:text-base">
        <div className="flex items-center gap-2 sm:gap-3">
          <IoIosArrowBack
            className="cursor-pointer"
            size={24}
            style={{ color: "#000" }}
            onClick={() => router.push("/game")}
          />
          <FaArrowRotateLeft
            className="cursor-pointer"
            style={{ color: "#000" }}
            onClick={() => setShowResume(true)}
          />
          <span className="bg-[#2258B9] text-white py-1 px-2 sm:px-3 text-xs sm:text-sm font-bold">
            {level?.toUpperCase()}
          </span>
        </div>

        {/* Center Attempt Display */}
        <div className="absolute top-20 sm:static left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-fit mx-auto flex flex-col items-center justify-center gap-2 sm:gap-3">
          <div className="flex gap-1 sm:gap-2 text-yellow-300 text-xl sm:text-3xl">
            {[...Array(3)].map((_, index) => (
              <FaLightbulb
                key={index}
                style={{ color: index < attempts ? "#FFDE05" : "gray" }}
              />
            ))}
          </div>
          <span className="text-xs sm:text-lg text-white bg-[#2258B9] py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-sm font-semibold">
            {attempts}/3 attempts
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaVolumeUp
            className="cursor-pointer text-base sm:text-xl"
            style={{ color: "#000" }}
          />
          <BsBrightnessHighFill
            className="cursor-pointer text-base sm:text-xl"
            style={{ color: "#000" }}
          />
          <div className="flex justify-center items-center bg-[#FFB400] size-8 sm:size-10 rounded-full font-bold text-sm sm:text-base">
            {coins}
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="w-full px-2 sm:px-0">
        <div className="flex flex-col gap-2 sm:gap-3 items-center mb-5 sm:mb-10">
          {grid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg gap-1.5 sm:gap-3 bg-[#FBDCF5]"
            >
              {row.map((letter, colIndex) => {
                const feedbackColor = feedback[rowIndex]?.[colIndex] as
                  | "green"
                  | "yellow"
                  | "red"
                  | undefined;
                let color = "";
                switch (feedbackColor) {
                  case "green":
                    color = "bg-[#7CFF54]";
                    break;
                  case "yellow":
                    color = "bg-[#FFF422]";
                    break;
                  case "red":
                    color = "bg-[#FF3538]";
                    break;
                  default:
                    color = "";
                }
                return (
                  <div
                    key={colIndex}
                    className={cn(
                      "w-10 h-10 sm:w-16 sm:h-16 bg-[#2258B9] rounded-full flex items-center justify-center text-white cursor-pointer text-lg sm:text-2xl font-semibold",
                      color
                    )}
                    onClick={() => {
                      if (feedbackColor === "green") return;
                      handleCircleClick(rowIndex, colIndex);
                    }}
                    onDoubleClick={() => {
                      dispatch(
                        removeLetterFromGrid({ row: rowIndex, col: colIndex })
                      );
                    }}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard */}
      <div className="w-full flex justify-center items-center py-4 sm:py-5 bg-[#FBDCF5]">
        <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-3 px-2 max-w-[90%] sm:max-w-[400px]">
          {keyboard.map((char, index) => {
            const shouldDisable = disabledButtons.includes(index);
            return (
              <button
                key={index}
                className={cn(
                  "min-h-10 min-w-10 py-1 px-1 sm:px-2 sm:py-2 bg-[#2258B9] text-white rounded-sm text-lg sm:text-xl font-bold",
                  shouldDisable && "bg-gray-400 cursor-not-allowed",
                  index === currentChar && "bg-gray-400"
                )}
                onClick={() => handleKeyClick(char, index)}
                disabled={shouldDisable}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resume and Modals */}
      {showResume && (
        <Resume
          onClose={() => setShowResume(false)}
          setShowModal={() => {
            setShowResume(false);
            setShowModal(true);
          }}
        />
      )}
      <HowToPlay open={showModal} onClose={() => setShowModal(false)} />

      <GameModal
        open={gameStatus === "lost"}
        title="Game Over"
        subtitle="You're out of attempts"
        type="over"
      />
      <GameModal
        open={gameStatus === "won"}
        title="You Won"
        subtitle="You successfully found all four words. Coins earned."
        type="win"
      />
    </div>
  );
}
