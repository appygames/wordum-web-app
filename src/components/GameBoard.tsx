"use client";
import { useCallback, useEffect, useState } from "react";
import Resume from "./Modals/Resume";
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
  resetFeedback,
} from "@/features/game/gameSlice";

import { playSound, targetWords, updateGameStats } from "@/utils/utils";
import GameModal from "./Modals/GameModal";
import HowToPlay from "./HowToPlay";
import Reset from "./Modals/Reset";
import GameHeader from "./Header/GameHeader";
import GameGrid from "./Grid/GameGrid";
import Keyboard from "./Keyboard/Keyboard";
import Hint from "./Modals/Hint";

export default function GameBoard({ level }: { level: Difficulty }) {
  const [soundOn, setSoundOn] = useState(true);

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
  const [showHintModal, setShowHintModal] = useState(false);
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const feedback = useSelector((state: RootState) => state.game.feedback);
  const [showReset, setShowReset] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const playSoundSafe = useCallback(
    (sound: string) => {
      if (soundOn) playSound(sound);
    },
    [soundOn]
  );
  const handleKeyClick = (char: string, index: number) => {
    playSoundSafe("/sounds/click.mp3");
    setCurrentChar(index);
    dispatch(setSelectedLetter({ char, index }));
  };

  const handleCircleClick = (row: number, col: number) => {
    if (!selectedLetter) return;

    playSoundSafe("/sounds/place.mp3");
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
  const resetGame = useCallback(() => {
    dispatch(resetFeedback());
    dispatch(setDifficulty(level as Difficulty));
    dispatch(setTargetWords(targetWords[level as Difficulty]));
    if (level === "easy" || level === "hard") {
      dispatch(revealLettersInGrid(targetWords[level as Difficulty]));
    }
  }, [level, dispatch]);
  useEffect(() => {
    if (!level) return;
    resetGame();
  }, [level, resetGame]);
  const handleHint = () => {
    dispatch(revealLettersInGrid(targetWords[level as Difficulty]));
    setShowHintModal(false);
  };
  useEffect(() => {
    if (gameStatus === "won") {
      updateGameStats(level, "win");
      playSoundSafe("/sounds/you-win.mp3");
    } else if (gameStatus === "lost") {
      updateGameStats(level, "loss");
      playSoundSafe("/sounds/lose.wav");
    }
  }, [gameStatus, playSoundSafe, attempts, level]);
  useEffect(() => {
    const sounds = [
      "/sounds/click.mp3",
      "/sounds/place.mp3",
      "/sounds/you-win.mp3",
      "/sounds/lose.wav",
      "/sounds/error.mp3",
    ];
    sounds.forEach((src) => {
      const audio = new Audio(src);
      audio.load();
    });
  }, []);

  useEffect(() => {
    const storedSound = localStorage.getItem("sound");
    if (storedSound !== null) {
      setSoundOn(storedSound === "true");
    }
  }, []);

  // Save sound state on change
  useEffect(() => {
    localStorage.setItem("sound", String(soundOn));
  }, [soundOn]);
  return (
    <div className="h-[100dvh] w-full flex flex-col justify-between items-center bg-[#F4C9EC]">
      {/* Header Section */}
      <GameHeader
        level={level}
        attempts={attempts}
        coins={coins}
        soundOn={soundOn}
        toggleSound={() => setSoundOn(!soundOn)}
        onBack={() => setShowResume(true)}
        onRestart={() => setShowReset(true)}
        onHint={() => setShowHintModal(true)}
      />

      <GameGrid
        grid={grid}
        feedback={feedback}
        selectedLetter={selectedLetter}
        onPlaceLetter={handleCircleClick}
      />

      <Keyboard
        keyboard={keyboard}
        disabledButtons={disabledButtons}
        selectedIndex={currentChar}
        onKeyClick={handleKeyClick}
      />

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
      {showReset && (
        <Reset
          onClose={() => setShowReset(false)}
          onConfirm={() => {
            resetGame();
            setShowReset(false);
          }}
        />
      )}
      <HowToPlay open={showModal} onClose={() => setShowModal(false)} />
      {showHintModal && (
        <Hint
          onClose={() => setShowHintModal(false)}
          handleHint={handleHint}
          level={level}
        />
      )}

      <GameModal
        open={gameStatus === "lost"}
        title="Game Over"
        subtitle="You're out of attempts"
        type="over"
      />
      <GameModal
        open={gameStatus === "won"}
        title="You Win"
        subtitle={`You successfully found all four words Coins earned: ${coins}`}
        type="win"
      />
    </div>
  );
}
