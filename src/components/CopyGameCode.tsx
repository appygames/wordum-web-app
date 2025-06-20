import React, { useState, useEffect } from "react";
import { FaShareAlt, FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CoinIcon } from "../../public/icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CopyGameCode = ({
  onClose,
  code,
}: {
  onClose: () => void;
  code: string;
}) => {
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.game.coins);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/game/join/${code}`;
    navigator.clipboard.writeText(shareUrl);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="fixed inset-0 z-50 bg-[#FBDCF5] flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between px-4 py-4">
        <IoIosArrowBack
          className="cursor-pointer w-8 h-8 text-black"
          onClick={() => router.back()}
        />
        <div className="relative size-8 md:size-10 rounded-full bg-[#FFB400] flex items-center justify-center">
          <CoinIcon />
          <span className="absolute text-black font-bold text-sm md:text-base">
            {coins}
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#2258B9] text-white rounded-xl px-6 py-8 w-[85%] min-h-[450px] md:w-full md:max-w-xl md:min-h-[400px] text-center mt-20 md:mt-6">
        <h2 className="text-3xl font-extrabold mb-7 tracking-wide">
          CONGRATULATIONS!
        </h2>
        <p className="text-xl md:text-lg font-semibold mt-11">
          You&apos;ve successfully created your own wordum
        </p>

        <div className="relative mt-11">
          <div
            className="text-2xl font-extrabold tracking-widest cursor-pointer"
            onDoubleClick={handleCopyCode}
          >
            {code}
          </div>
          {copied && (
            <span className="absolute left-1/2 -translate-x-1/2 text-sm text-white bg-black bg-opacity-70 px-2 py-1 rounded mt-2">
              Copied!
            </span>
          )}
        </div>

        <p className="text-xl md:text-lg font-bold mt-13">
          Double tap on code to copy and share code
          <br />
          <span className="font-semibold">OR</span>
          <br />
          Click on the share button to invite friends
        </p>
      </div>

      {/* Share and Home Buttons */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={handleShare}
          className="bg-[#2258b9] text-white rounded-full p-7 shadow-md hover:scale-105 transition"
        >
          <FaShareAlt size={40} />
        </button>
        <button
          onClick={onClose}
          className="bg-[#2258b9] text-white rounded-full p-7 shadow-md hover:scale-105 transition"
        >
          <FaHome size={40} />
        </button>
      </div>
    </div>
  );
};

export default CopyGameCode;
