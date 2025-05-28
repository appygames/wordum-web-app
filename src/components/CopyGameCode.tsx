import React from "react";
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

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied! You can now share it.");
  };

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
        <h2 className="text-3xl font-extrabold mb-7 tracking-wide">CONGRATULATIONS!</h2>
        <p className=" text-xl md:text-lg font-semibold mt-11">You've successfully created your own wordum</p>

        <div
          className="text-2xl font-extrabold tracking-widest mt-11  cursor-pointer"
          onDoubleClick={handleShare}
        >
          {code}
        </div>

        <p className="text-xl md:text-lg  font-bold mt-13">
          Double tap on code to copy and share code
          <br />
          <span className="font-semibold">OR</span>
          <br />
          Click on the share button to invite friends
        </p>
      </div>

      {/* Share and Home Icons - below the card */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={handleShare}
          className="bg-[#2258b9] text-white rounded-full p-7 shadow-md hover:scale-105 transition"
        >
          <FaShareAlt size={40} />
        </button>
        <button
          onClick={onClose}
          className="bg-[#2258b9] text-white  rounded-full p-7 shadow-md hover:scale-105 transition"
        >
          <FaHome size={40} />
        </button>
      </div>
    </div>
  );
};

export default CopyGameCode;
