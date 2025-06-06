import React from "react";

function Reset({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <div className="w-80 m-auto flex flex-col items-center">
        <p className="text-2xl font-bold bg-[#FBDCF5] mb-4">
          Are you sure you want to reset the game?
        </p>
        <div className="flex gap-4 w-xs m-auto items-center justify-center text-white">
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
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
