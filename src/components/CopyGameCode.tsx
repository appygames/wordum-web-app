import React, { useState, useEffect } from "react";
import { FaShareAlt, FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CoinIcon } from "../../public/icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface CopyGameCodeProps {
  onClose: () => void;
  code: string;
  shareLink?: string;
}

const CopyGameCode = ({ onClose, code, shareLink }: CopyGameCodeProps) => {
  const router = useRouter();
  const coins = useSelector((state: RootState) => state.game.coins);
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setShareMessage("Code copied!");
  };

  const handleShare = async () => {
    const shareUrl = shareLink || `${window.location.origin}/game/join/${code}`;
    
    // Try using the Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Play Wordum with me!',
          text: 'Join my custom Wordum game!',
          url: shareUrl
        });
        setShareMessage("Shared successfully!");
      } catch (error) {
        // Fallback to copying the link
        navigator.clipboard.writeText(shareUrl);
        setShareMessage("Share link copied!");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareUrl);
      setShareMessage("Share link copied!");
    }
  };

  useEffect(() => {
    if (copied || shareMessage) {
      const timer = setTimeout(() => {
        setCopied(false);
        setShareMessage("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copied, shareMessage]);

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
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-4">
        <div className="bg-[#2258B9] text-white rounded-xl px-6 py-8 w-full max-w-xl text-center">
          <h2 className="text-3xl font-extrabold mb-7 tracking-wide">
            CONGRATULATIONS!
          </h2>
          <p className="text-xl md:text-lg font-semibold mt-6">
            You&apos;ve successfully created your own wordum
          </p>

          <div className="relative mt-11">
            <div
              className="text-2xl font-extrabold tracking-widest cursor-pointer"
              onClick={handleCopyCode}
            >
              {code}
            </div>
            {(shareMessage || copied) && (
              <span className="absolute left-1/2 -translate-x-1/2 text-sm text-white bg-black bg-opacity-70 px-2 py-1 rounded mt-2">
                {shareMessage || "Copied!"}
              </span>
            )}
          </div>

          <p className="text-xl md:text-lg font-bold mt-10">
            Tap on code to copy
            <br />
            <span className="font-semibold">OR</span>
            <br />
            Click on the share button to invite friends
          </p>
        </div>

        {/* Share and Home Buttons */}
        <div className="flex justify-center gap-8">
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
    </div>
  );
};

export default CopyGameCode;
