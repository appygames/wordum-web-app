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
    <div className="min-w-screen min-h-screen p-0 flex flex-col justify-between items-center bg-[#7DF9FF]">
      <div className="relative w-full flex items-center justify-between py-2.5 px-5 gap-2.5 text-md">
        <div className="flex items-center gap-2.5">
          <IoIosArrowBack
            className="cursor-pointer"
            size={32}
            style={{ color: "#000" }}
            onClick={() => router.push("/game")}
          />
          <FaArrowRotateLeft
            className="cursor-pointer"
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => setShowModal(true)}
          />
          <span className="bg-[#004c66] text-white py-1 px-3 font-bold">
            {level?.toUpperCase()}
          </span>
        </div>
        <div className="absolute top-24 md:static left-1/2 md:left-0 md:transform-none md:translate-x-0 transform -translate-x-1/2  w-fit m-auto flex flex-col items-center justify-center gap-2.5">
          <div className="flex gap-2 text-yellow-300 text-3xl">
            {/*show bulbs based on attempts */}
            {[...Array(3)].map((_, index) => (
              <FaLightbulb
                key={index}
                style={{ color: index < attempts ? "FFD700" : "gray" }}
              />
            ))}
          </div>
          <span className="md:text-2xl bg-[#004c66] py-1 px-2 rounded-sm font-semibold md:font-bold">
            {attempts}/3 attempts
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaVolumeUp className="cursor-pointer" style={{ color: "#000" }} />
          <BsBrightnessHighFill
            className="cursor-pointer"
            style={{ color: "#000" }}
          />
          <div className="flex justify-center items-center bg-yellow-300 size-10 rounded-full font-bold">
            {coins}
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Circle Grid */}
        <div className="flex flex-col gap-2.5 items-center mb-10">
          {grid.map((row: string[], rowIndex: number) => (
            <div
              className="flex py-2 px-6 rounded-lg gap-3 bg-[#01C1C1]"
              key={rowIndex}
            >
              {row.map((letter: string, colIndex: number) => {
                const feedbackColor = feedback[rowIndex]?.[colIndex] as
                  | "green"
                  | "yellow"
                  | "red"
                  | undefined;
                let color = "";
                switch (feedbackColor) {
                  case "green":
                    color = "bg-green-500";
                    break;
                  case "yellow":
                    color = "bg-yellow-500";
                    break;
                  case "red":
                    color = "bg-red-500";
                    break;
                  default:
                    color = "";
                }
                return (
                  <div
                    className={cn(
                      "size-11 md:size-16 bg-cyan-800 rounded-full flex items-center justify-center text-white cursor-pointer text-xl md:text-3xl md:font-semibold",
                      color
                    )}
                    key={colIndex}
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

        {/* Keyboard */}
        <div className="w-full flex justify-center items-center py-5 gap-3 bg-cyan-700">
          <div className="flex justify-center items-center flex-wrap max-w-sm gap-3">
            {keyboard.map((char, index) => {
              const shouldDisable = disabledButtons.includes(index);
              return (
                <button
                  key={index}
                  className={cn(
                    "min-h-10 min-w-10 py-1.5 px-1 md:px-3 bg-cyan-900 text-white rounded-sm md:font-bold text-xl md:text-3xl cursor-pointer",
                    shouldDisable &&
                      "bg-gray-400 text-gray-500 cursor-not-allowed",
                    index === currentChar && "bg-cyan-300 "
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
      </div>

      {showModal && <Resume onClose={() => setShowModal(false)} />}
      <GameModal
        open={gameStatus == "lost"}
        title="Game Over"
        subtitle="You lost the game"
        type="over"
      />
      <GameModal
        open={gameStatus == "won"}
        title="You Won"
        subtitle="You won the game"
        type="win"
      />
    </div>
  );
}
