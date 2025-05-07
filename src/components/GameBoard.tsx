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
  checkGameWon,
  evaluateLetter,
  setTargetWords,
  removeLetterFromGrid,
} from "@/features/game/gameSlice";

import { targetWords } from "@/utils/utils";

export default function GameBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.game.grid);
  const [currentChar, setCurrentChar] = useState<number | null>(null);
  const keyboard = useSelector((state: RootState) => state.game.keyboard);
  const disabledButtons = useSelector((state: RootState) => state.game.disabledButtons);
  const attempts = useSelector((state: RootState) => state.game.attempts);
  const coins = useSelector((state: RootState) => state.game.coins);
  const selectedLetter = useSelector(
    (state: RootState) => state.game.selectedLetter
  );
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const feedback = useSelector((state: RootState) => state.game.feedback);

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
    dispatch(setSelectedLetter({ char, index }));
  };

  const handleCircleClick = (row: number, col: number) => {
    if (!selectedLetter) return;

    dispatch(placeLetterInGrid({ row, col }));

    dispatch(
      evaluateLetter({ letter: selectedLetter.char, rowIndex: row, colIndex: col })
    );
    dispatch(checkGameWon());
  };

  const letterUsage: Record<string, number> = {};
  grid.flat().forEach((letter) => {
    if (letter) {
      letterUsage[letter] = (letterUsage[letter] || 0) + 1;
    }
  });

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
            {/*show bulbs based on attempts */}
            {[...Array(3)].map((_, index) => (
              <FaLightbulb
                key={index}
                style={{ color: index < attempts ? "FFD700" : "gray" }}
              />
            ))}
          </div>
          <span className="attempts">{attempts}/3 attempts</span>
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
          <div className="coin">{coins}</div>
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
                    onDoubleClick={() => {
                      dispatch(removeLetterFromGrid({ row: rowIndex, col: colIndex }));
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
              const shouldDisable = disabledButtons.includes(index);
              return (
                <button
                  key={index}
                  className={`key ${shouldDisable ? "used" : ""} ${index === currentChar && "selected"
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
