"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CrossIcon } from "../../public/icons";

export default function HintOptions() {
  const coins = useSelector((state: RootState) => state.game.coins);
  const [clickedInsufficientCoins, setClickedInsufficientCoins] =
    useState(false);

  const handleFreeHint = () => {
    alert("Used free hint!");
  };

  const handleWatchAd = () => {
    alert("Watch ad to get free hint");
  };

  const handleUseCoins = () => {
    if (coins >= 100) {
      alert("Used 100 coins for hint");
      // Dispatch to reduce coins if needed
    } else {
      setClickedInsufficientCoins(true);
    }
  };

  const handleClose = () => {
    alert("Close clicked");
  };

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center relative">
      {/* Close Buttons */}
      {/* Desktop close button */}
      <div
        className="absolute size-8 top-8 right-20 text-black cursor-pointer hidden md:block"
        onClick={handleClose}
      >
        <CrossIcon />
      </div>

      {/* Mobile close button */}
      <div
        className="absolute top-4 right-4 md:hidden text-black cursor-pointer"
        onClick={handleClose}
      >
        <div className="w-5 h-5">
          <CrossIcon />
        </div>
      </div>

      {/* Hint Options */}
      <div className="p-4 w-full max-w-md md:max-w-xl flex flex-col items-center text-center">
       <div className="relative px-4 py-2 mb-6">
  <div className="relative w-25 h-15">
    <img src="/icons/coins.png" alt="Coins" className="w-full h-full" />
    <span className="absolute inset-0 flex items-center justify-center text-[#2258B9] font-extrabold text-sm">
      {coins}
    </span>
  </div>
</div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full px-4 md:px-24">
          <button
            onClick={handleFreeHint}
            className="bg-[#EB598F] text-white text-lg font-bold py-3 rounded"
          >
            Use free hint
          </button>
          <button
            onClick={handleWatchAd}
            className="bg-[#EB598F] text-white text-lg font-bold py-3 rounded"
          >
            Watch ad to get a free hint
          </button>
          <button
            onClick={handleUseCoins}
            className={`text-white text-lg font-bold py-3 rounded ${
              clickedInsufficientCoins ? "bg-[#B3B3B3]" : "bg-[#EB598F]"
            }`}
          >
            Use 100 coins to get a free hint
          </button>
          {clickedInsufficientCoins && coins < 100 && (
            <p className="text-xs text-gray-700 mt-[-10px]">
              You don't have enough coins for this
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
