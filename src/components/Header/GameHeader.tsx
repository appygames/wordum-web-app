"use client";
import { FaLightbulb, FaVolumeOff } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import {
  SoundOnIcon,
  HintIcon,
  RestartIcon,
  CoinIcon,
} from "../../../public/icons";

type GameHeaderProps = {
  level: string;
  showlevel?: boolean;
  attempts: number;
  coins: number;
  soundOn: boolean;
  toggleSound: () => void;
  onBack: () => void;
  onRestart: () => void;
  showRestart?: boolean;
  onHint: () => void;
};

export default function GameHeader({
  level,
  showlevel = true,
  attempts,
  coins,
  soundOn,
  toggleSound,
  onBack,
  onRestart,
  showRestart = true,
  onHint,
}: GameHeaderProps) {
  return (
    <div className="relative w-full flex items-center justify-between py-2 sm:py-3 px-2 sm:px-20 gap-2 text-sm sm:text-base">
      <div className="flex items-center gap-2 md:gap-6 sm:gap-3 mt-0 md:mt-[-58px]">
        <IoIosArrowBack
          className="cursor-pointer w-[34px] h-[40px] md:w-[31px] md:h-[31px]"
          style={{ color: "#000" }}
          onClick={onBack}
        />
        {showRestart && (
          <div className="size-6" onClick={onRestart}>
            <RestartIcon />
          </div>
        )}
        {showlevel && (
          <span className="bg-[#2258B9] text-white py-[7px] px-[13px] text-[13px] sm:py-[4px] sm:px-[10px] sm:text-[12px] md:py-[6px] md:px-[14px] md:text-[14px] rounded font-bold">
            {level?.toUpperCase()}
          </span>
        )}
      </div>

      <div className="absolute top-16 sm:static left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-fit mx-auto flex flex-col items-center justify-center gap-2 sm:gap-3">
        <div className="flex gap-3 sm:gap-2 text-yellow-300 text-3xl sm:text-4xl">
          {[...Array(3)].map((_, index) => (
            <FaLightbulb
              key={index}
              style={{ color: index < attempts ? "#FFDE05" : "gray" }}
            />
          ))}
        </div>
        <span className="text-sm sm:text-lg text-white bg-[#2258B9] py-1.5 px-1.5 sm:py-2 sm:px-2 rounded-sm font-semibold">
          {attempts}/3 attempts
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-6 sm:gap-3 mt-0 md:mt-[-58px]">
        <button onClick={toggleSound} className="cursor-pointer">
          {soundOn ? (
            <div className="size-6">
              <SoundOnIcon />
            </div>
          ) : (
            <FaVolumeOff className="text-gray-800 text-3xl" />
          )}
        </button>
        <div className="cursor-pointer size-8" onClick={onHint}>
          <HintIcon />
        </div>
        <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
          <CoinIcon />
          <span className="absolute text-black font-bold text-sm sm:text-base">
            {coins}
          </span>
        </div>
      </div>
    </div>
  );
}
