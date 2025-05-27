import React from "react";
import { FaShareAlt, FaHome } from "react-icons/fa";

const CopyGameCode = ({
  onClose,
  code,
}: {
  onClose: () => void;
  code: string;
}) => {
  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied! You can now share it.");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FBDCF5] flex items-center justify-center">
      <div className="bg-[#2258B9] text-white rounded-xl px-6 py-8 w-[90%] max-w-md text-center">
        <h2 className="text-lg font-bold mb-2 tracking-wide">CONGRATULATIONS!</h2>
        <p className="text-sm mb-4">You've successfully created your own wordum</p>

        <div className="text-2xl font-bold tracking-widest mb-4">{code}</div>

        <p className="text-sm mb-4">
          Double tap on code to copy and share code
          <br />
          <span className="font-semibold">OR</span>
          <br />
          Click on the share button to invite friends
        </p>

        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={handleShare}
            className="bg-white text-[#2258B9] rounded-full p-4 shadow-md hover:scale-105 transition"
          >
            <FaShareAlt size={24} />
          </button>
          <button
            onClick={onClose}
            className="bg-white text-[#2258B9] rounded-full p-4 shadow-md hover:scale-105 transition"
          >
            <FaHome size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyGameCode;
