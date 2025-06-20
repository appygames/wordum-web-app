"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { playSound } from "@/utils/utils";
import { RootState } from "@/store";
import Resume from "@/components/Modals/Resume";
import HowToPlay from "@/components/HowToPlay";
import GameModal from "@/components/Modals/GameModal";
import { getGameById } from "@/lib/firebase";
import Hint from "@/components/Modals/Hint";
import GameHeader from "@/components/Header/GameHeader";
import GameGrid from "@/components/Grid/GameGrid";
import Keyboard from "@/components/Keyboard/Keyboard";

export default function Page() {
  const [soundOn, setSoundOn] = useState(true);
  const { code } = useParams();
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
  const [showHintModal, setShowHintModal] = useState(false);
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
  const [level, setLevel] = useState<Difficulty>("easy");
  const [hintUsed, setHintUsed] = useState(false);
  
  const [gameTargetWords, setGameTargetWords] = useState<string[]>([]);
  const handleHint = () => {
    dispatch(revealLettersInGrid(gameTargetWords));
    setShowHintModal(false);
    setHintUsed(true);
  };
  useEffect(() => {
    dispatch(resetFeedback());
    dispatch(setDifficulty(level as Difficulty));
    dispatch(setTargetWords(gameTargetWords));
    if (level === "easy" || level === "hard") {
      dispatch(revealLettersInGrid(gameTargetWords));
    }
  }, [level, gameTargetWords, dispatch]);
  useEffect(() => {
    const fetchGame = async () => {
      const inputCode = code || "";
      const res = await getGameById(inputCode as string);
      setLevel(res.level as Difficulty);
      setGameTargetWords(res.targetWords);
    };
    fetchGame();
  }, [code]);
  useEffect(() => {
    if (gameStatus === "won") {
      playSoundSafe("/sounds/you-win.mp3");
    } else if (gameStatus === "lost") {
      playSoundSafe("/sounds/lose.wav");
    }
  }, [gameStatus, playSoundSafe]);
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

  useEffect(() => {
    localStorage.setItem("sound", String(soundOn));
  }, [soundOn]);

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-between items-center bg-[#F4C9EC]">
      {/* Header Section */}
      <GameHeader
        level={level}
        showlevel={false}
        attempts={attempts}
        coins={coins}
        soundOn={soundOn}
        toggleSound={() => setSoundOn(!soundOn)}
        onBack={() => setShowResume(true)}
        onRestart={() => setShowResume(true)}
        showRestart={false}
        onHint={() => setShowHintModal(true)}
      />

      {/* Game Grid */}
      <GameGrid
        grid={grid}
        feedback={feedback}
        selectedLetter={selectedLetter}
        onPlaceLetter={handleCircleClick}
      />

      {/* Keyboard */}
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
      <HowToPlay open={showModal} onClose={() => setShowModal(false)} />
      {showHintModal && (
        <Hint
          onClose={() => setShowHintModal(false)}
          handleHint={handleHint}
          level={level}
          freeHintUsed={hintUsed}
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
