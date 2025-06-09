import React from "react";

function Reset({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Transparent background layer */}
      <div className="fixed inset-0 z-40 bg-[#FBDCF5] opacity-50"></div>

      {/* Modal content layer */}
      <div className="w-80 m-auto z-50 flex flex-col items-center">
        <p className="text-2xl font-bold bg-[#2258B9] text-white mb-4 px-4 py-2 rounded-lg text-center">
          Are you sure you want to reset the game?
          <p className="text-lg font-medium text-gray-400 ">This will erase your current progress!</p>
        </p>
        
        <div className="flex gap-4 w-full items-center justify-center text-white">
          <button
            className="w-[90%] text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="w-[90%] text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
