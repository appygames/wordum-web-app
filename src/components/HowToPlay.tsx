"use client";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { CrossIcon } from "../../public/icons";

const HowToPlay = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setStep((prev) => Math.min(prev + 1, 3)),
    onSwipedRight: () => setStep((prev) => Math.max(prev - 1, 1)),
    trackMouse: true,
  });
  return (
    open && (
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBDCF5] opacity-70"></div>
        <div
          {...swipeHandlers}
          className="bg-[#2258B9] h-[600px] md:h-[658px] w-[335px] md:w-[70%] md:px-16 md:py-10 z-60 text-white rounded-xl shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5"
        >
          <button
            onClick={onClose}
            className="absolute md:hidden -top-12 left-1/2 transform cursor-pointer -translate-x-1/2 bg-[#2258B9] rounded-full w-11 h-11 flex items-center justify-center text-2xl font-bold"
          >
            ×
          </button>
          <div
            className="absolute  size-8 top-6 right-10 font-bold hidden md:block cursor-pointer text-white"
            onClick={onClose}
          >
            <CrossIcon />
          </div>
          {step === 1 && (
            <div className="text-sm flex flex-col gap-3 md:gap-9 h-[80vh]">
              <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
                Wordum offers different levels!
              </h2>
              <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                <li className="text-[15px] md:text-xl">
                  <b>Easy:</b> 4-letter words with one letter revealed.
                </li>
                <li className="text-[15px] md:text-xl">
                  <b>Medium:</b> 5-letter words with one letter revealed.
                </li>
                <li className="text-[15px] md:text-xl">
                  <b>Hard:</b> 5-letter words with no letters revealed.
                </li>
                <li className="text-[15px] md:text-xl">
                  <b>Expert:</b> More challenging words with minimal hints.
                </li>
              </ul>

              <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
                Custom Word Challenges
              </h2>
              <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                <li className="text-[15px] md:text-xl">
                  Players can create their own set of four words and share them
                  with other users.
                </li>
                <li className="text-[15px] md:text-xl">Challenge Rules:.</li>
                <ul className="list-disc list-outside ml-4 text-left">
                  <li className="text-[15px] md:text-xl">
                    Custom words remain available for 24 hours.
                  </li>
                  <li className="text-[15px] md:text-xl">
                    Players can enter shared rooms and guess the words in a
                    similar way.
                  </li>
                  <li className="text-[15px] md:text-xl">
                    The same color-coded feedback system applies
                  </li>
                </ul>
              </ul>
            </div>
          )}
          {step === 2 && (
            <div className="text-sm flex flex-col md:flex-row gap-3 md:gap-5 h-[80vh]">
              <div className="flex flex-col gap-3 md:gap-9">
                <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
                  Gameplay Rules{" "}
                </h2>
                <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                  <li className="text-[15px] md:text-xl">
                    Players must place the correct letter in the correct grid
                    position.
                  </li>
                  <li className="text-[15px] md:text-xl">
                    Color-coded feedback:
                  </li>
                  <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                    <li className="text-[15px] md:text-xl">
                      Green: Correct letter in the correct position.{" "}
                    </li>
                    <li className="text-[15px] md:text-xl">
                      Yellow: Correct letter but in the wrong position within
                      the same word.
                    </li>
                    <li className="text-[15px] md:text-xl">
                      Red: Incorrect letter, not part of the word.{" "}
                    </li>
                  </ul>
                  <li className="text-[15px] md:text-xl">
                    Players get 3 attempts to guess all the words.
                  </li>
                  <li className="text-[15px] md:text-xl">
                    If all words are guessed correctly, the player wins and
                    earns 5 coins.{" "}
                  </li>
                </ul>
              </div>
              <img
                src="/images/demo.gif"
                alt="demo game"
                className="max-h-54 md:max-h-85 mt-0 md:mt-27 mx-auto"
              />
            </div>
          )}
          {step === 3 && (
            <div className="text-sm flex flex-col gap-3 md:gap-9 h-[80vh]">
              <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
                Hints & Ads:{" "}
              </h2>
              <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                <li className="text-[15px] md:text-xl">
                  Players can use hints by:
                </li>
                <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
                  <li className="text-[15px] md:text-xl">Watching an ad. </li>
                  <li className="text-[15px] md:text-xl">
                    Spending 25 coins per hint.{" "}
                  </li>
                </ul>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">
                Rewards & Coin System
              </h2>
              <ul className="list-disc list-outside ml-4 text-left">
                <li className="text-[15px] md:text-xl">
                  <b>Winning a game:</b> +5 coins.
                </li>
                <li className="text-[15px] md:text-xl">
                  <b>Using a hint:</b> -25 coins.
                </li>
                <li className="text-[15px] md:text-xl">
                  <b>Watching ads:</b> Option to earn extra hints or free
                  retries.
                </li>
              </ul>
            </div>
          )}
          <div className="flex gap-2 items-center justify-center mt-[-183px] md:mt-4">
            <div
              className={cn(
                "size-2 bg-[#D9D9D9] rounded-full cursor-pointer hover:bg-white",
                step === 1 && "size-3"
              )}
              onClick={() => setStep(1)}
            />
            <div
              className={cn(
                "size-2 bg-[#D9D9D9] rounded-full cursor-pointer hover:bg-white",
                step === 2 && "size-3"
              )}
              onClick={() => setStep(2)}
            />
            <div
              className={cn(
                "size-2 bg-[#D9D9D9] rounded-full cursor-pointer hover:bg-white",
                step === 3 && "size-3"
              )}
              onClick={() => setStep(3)}
            />
          </div>
          {/* Swipe indicator (Mobile) */}
        </div>
        {/* <div className="md:hidden mb-4 flex justify-center items-center text-xs text-white">
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div> */}
      </div>
    )
  );
};

export default HowToPlay;
