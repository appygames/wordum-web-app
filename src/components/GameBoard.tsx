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

export default function GameBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");
  console.log(searchParams.get("level"));
  const Keyboard = [
    ["A", "W", "G", "R", "R", "S", "V"],
    ["D", "L", "B", "N", "D", "G", "I"],
    ["S", "F", "A", "F", "V", "S"],
  ];

  useEffect(() => {
    if (!level) {
      router.push("/game");
    }
  }, [level, router]);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  //setting a timeOut to game over

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
        {/*Circle Grid*/}
        <div className="circle-grid">
          {Array.from({ length: 4 }).map((_, rowIdx) => (
            <div className="circle-row" key={rowIdx}>
              {Array.from({ length: 5 }).map((_, colIdx) => (
                <div className="circle" key={colIdx}></div>
              ))}
            </div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="keyboard">
          {Keyboard.map((row, rowIndex) => (
            <div className="key-row" key={rowIndex}>
              {row.map((char, index) => (
                <button className="key" key={index}>
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
