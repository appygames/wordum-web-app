"use client";
import { FaLightbulb, FaVolumeUp } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsBrightnessHighFill } from "react-icons/bs";
import "../styles/gameboard.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Resume from "./Resume";
import GameOver from "./GameOver";
import GameWon from "./GameWon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setSelectedLetter,
  placeLetterInGrid,
  setDifficulty,
  Difficulty,
  revealLettersInGrid,
} from "@/features/game/gameSlice";
import {
  evaluateGuess,
  evaluateLetter,
  setTargetWords,
} from "@/features/feedback/feedbackSlice";
import { targetWords } from "@/utils/utils";

export default function GameBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.game.grid);
  const [currentChar, setCurrentChar] = useState<number | null>(null);
  const keyboard = useSelector((state: RootState) => state.feedback.keyboard);
  const selectedLetter = useSelector(
    (state: RootState) => state.game.selectedLetter
  );
  const gameStatus = useSelector(
    (state: RootState) => state.feedback.gameStatus
  );
  const feedback = useSelector((state: RootState) => state.feedback.feedback);

  useEffect(() => {
    if (!level) {
      router.push("/game");
    }
    dispatch(setDifficulty(level as Difficulty));
    dispatch(setTargetWords(targetWords[level as Difficulty]));
    if (level === "easy" || level === "hard") {
      dispatch(revealLettersInGrid(targetWords[level as Difficulty]));
    }
  }, [level, router, dispatch]);
  const [showModal, setShowModal] = useState(false);

  const handleKeyClick = (char: string, index: number) => {
    setCurrentChar(index);
    dispatch(setSelectedLetter(char));
  };

  const handleCircleClick = (row: number, col: number) => {
    if (!selectedLetter) return;

    dispatch(placeLetterInGrid({ row, col }));

    dispatch(
      evaluateLetter({ letter: selectedLetter, rowIndex: row, colIndex: col })
    );
  };

  const letterUsage: Record<string, number> = {};
  grid.flat().forEach((letter) => {
    if (letter) {
      letterUsage[letter] = (letterUsage[letter] || 0) + 1;
    }
  });

  // Step 2: Keep track of how many times each letter is rendered
  const renderedLetterCount: Record<string, number> = {};
  useEffect(() => {
    // Automatically evaluate rows that are fully filled
    grid.forEach((row, rowIndex) => {
      if (row.every((cell) => cell !== "") && !feedback[rowIndex]) {
        dispatch(evaluateGuess({ guess: row.join(""), rowIndex }));
      }
    });
  }, [grid, feedback, dispatch]);

  return (
    <div className="gameboard-container">
      <div className="top-bar">
        <div className="left-icons">
          <IoIosArrowBack
            className="game-icon"
            size={32}
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => router.push("/game")}
          />
          <FaArrowRotateLeft
            className="game-icon"
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => setShowModal(true)}
          />
          <span className="level-button">{level?.toUpperCase()}</span>
        </div>
        <div className="hints-container">
          <div className="icons-group">
            <FaLightbulb />
            <FaLightbulb />
            <FaLightbulb />
          </div>
          <span className="attempts">3/3 attempts</span>
        </div>
        <div className="right-icons">
          <FaVolumeUp
            className="game-icon"
            style={{ cursor: "pointer", color: "#000" }}
          />
          <BsBrightnessHighFill
            className="game-icon"
            style={{ cursor: "pointer", color: "#000" }}
          />
          <div className="coin">218</div>
        </div>
      </div>

      <div className="gameboard">
        {/* Circle Grid */}
        <div className="circle-grid">
          {grid.map((row: string[], rowIndex: number) => (
            <div className="circle-row" key={rowIndex}>
              {row.map((letter: string, colIndex: number) => {
                const feedbackColor = feedback[rowIndex]?.[colIndex] as
                  | "green"
                  | "yellow"
                  | "red"
                  | undefined;
                return (
                  <div
                    className={`circle ${feedbackColor || ""}`}
                    key={colIndex}
                    onClick={() => {
                      if (feedbackColor === "green") return;
                      handleCircleClick(rowIndex, colIndex);
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
        <div className="keyboard-container">
          <div className="keyboard">
            {keyboard.map((char, index) => {
              const usedCount = letterUsage[char] || 0;
              const currentCount = renderedLetterCount[char] || 0;
              const shouldDisable = currentCount < usedCount;

              renderedLetterCount[char] = currentCount + 1;

              return (
                <button
                  key={index}
                  className={`key ${shouldDisable ? "used" : ""} ${
                    index === currentChar && "selected"
                  }`}
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
      {gameStatus === "lost" && <GameOver />}
      {gameStatus === "won" && <GameWon />}
    </div>
  );
}
