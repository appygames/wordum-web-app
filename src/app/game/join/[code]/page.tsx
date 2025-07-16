"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedLetter,
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
import Hint from "@/components/Modals/Hint";
import GameHeader from "@/components/Header/GameHeader";
import GameGrid from "@/components/Grid/GameGrid";
import Keyboard from "@/components/Keyboard/Keyboard";
import { useSendGameResultMutation } from "@/store/slices/userApiSlice";
import { useGetGameByIdQuery } from "@/store/slices/gameApiSlice";

export default function Page() {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState(true);
  const { code } = useParams();
  const gameId = code as string;
  const dispatch = useDispatch();
  const [sendGameResult] = useSendGameResultMutation();
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
  const [isExpired, setIsExpired] = useState(false);

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

  const [hintUsed, setHintUsed] = useState(false);
  const [gameTargetWords, setGameTargetWords] = useState<string[]>([]);

  const handleHint = () => {
    dispatch(revealLettersInGrid(gameTargetWords));
    setShowHintModal(false);
    setHintUsed(true);
  };

  const { data: gameData } = useGetGameByIdQuery(gameId);

  // Check game expiration
  useEffect(() => {
    if (gameData?.data) {
      const expiresAt = new Date(gameData.data.expires_at);
      if (expiresAt < new Date()) {
        setIsExpired(true);
        // Redirect to home after 3 seconds if game is expired
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    }
  }, [gameData, router]);

  useEffect(() => {
    dispatch(resetFeedback());
    if (gameData?.data) {
      const targetWords = gameData.data.words.map(w => w.text);
      setGameTargetWords(targetWords);
      dispatch(setTargetWords(targetWords));
      
      // If reveal_letters is true, reveal letters immediately
      if (gameData.data.reveal_letters) {
        dispatch(revealLettersInGrid(targetWords));
      }
    }
  }, [gameData, dispatch]);

  useEffect(() => {
    const sendResultToServer = async (won: boolean) => {
      const device_id = localStorage.getItem("device_id");
      if (!device_id) return;

      try {
        await sendGameResult({ 
          device_id, 
          won,
          game_id: gameData?.data?.game_id 
        }).unwrap();
      } catch (error) {
        console.error("Failed to send game result:", error);
      }
    };

    if (gameStatus === "won") {
      playSoundSafe("/sounds/you-win.mp3");
      sendResultToServer(true);
    } else if (gameStatus === "lost") {
      playSoundSafe("/sounds/lose.wav");
      sendResultToServer(false);
    }
  }, [gameStatus, playSoundSafe, sendGameResult, gameData]);

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

  if (isExpired) {
    return (
      <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[#F4C9EC]">
        <div className="bg-[#2258B9] text-white p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Game Expired</h2>
          <p>This game has expired. Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-between items-center bg-[#F4C9EC]">
      {/* Header Section */}
      <GameHeader
        level="easy"
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
          level="easy"
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
