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
} from "@/features/game/gameSlice";


export default function GameBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");
  const Keyboard = [
    ["A", "W", "G", "R", "R", "S", "V"],
    ["D", "L", "B", "N", "D", "G", "I"],
    ["S", "F", "A", "F", "V", "S"],
  ];

  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.game.grid);
  const selectedLetter = useSelector(
    (state: RootState) => state.game.selectedLetter
  );
  const feedback = useSelector((state: RootState) => state.feedback.feedback);

  useEffect(() => {
    if (!level) {
      router.push("/game");
    }
  }, [level, router]);

 
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedKeyPosition, setSelectedKeyPosition] = useState<{ row: number; col: number } | null>(null);


  const handleKeyClick = (char: string, row: number, col: number) => {
    dispatch(setSelectedLetter(char));
    setSelectedKeyPosition({ row, col });
  };
  

  const handleCircleClick = (row: number, col: number) => {
    dispatch(placeLetterInGrid({ row, col }));
  };

  // useEffect(() => {
  //   // Automatically evaluate rows that are fully filled
  //   grid.forEach((row, rowIndex) => {
  //     if (row.every((cell) => cell !== "") && !feedback[rowIndex]) {
  //       dispatch(evaluateGuess(row.join("")));
  //     }
  //   });
  // }, [grid, feedback, dispatch]);

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
                  | "gray"
                  | undefined;
                return (
                  <div
                    className={`circle ${feedbackColor || ""}`}
                    key={colIndex}
                    onClick={() => handleCircleClick(rowIndex, colIndex)}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="keyboard">
          {Keyboard.map((row, rowIndex) => (
            <div className="key-row" key={rowIndex}>
              {row.map((char, colIndex) => (
                <button
                  className={`key ${
                    selectedKeyPosition?.row === rowIndex &&
                    selectedKeyPosition?.col === colIndex
                      ? "selected"
                      : ""
                  }`}
                  key={colIndex}
                  onClick={() => handleKeyClick(char, rowIndex, colIndex)}
                >
                  {char}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showModal && <Resume onClose={() => setShowModal(false)} />}
      {gameOver && <GameOver onClose={() => setGameOver(false)} />}
      {gameOver && <GameWon onClose={() => setGameOver(false)} />}
    </div>
  );
}
