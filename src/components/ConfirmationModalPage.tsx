import React from "react";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  grid: string[][];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onClose,
  onConfirm,
  grid,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#F5C8E5] flex items-center justify-center">
      <div className="w-full px-2 max-w-sm flex flex-col items-center gap-6 rounded-2xl bg-[#F5C8E5] text-center">
        <div className="flex flex-col gap-2">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-3 justify-center bg-[#FBDCF5] p-2 rounded-md">
              {row.map((letter, colIndex) => (
                <div
                  key={colIndex}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2258B9] text-white text-lg font-bold flex items-center justify-center"
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-xl font-semibold text-white bg-[#2258B9]">
          Do you want to submit?
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="bg-[#2258B9] text-white px-6 py-2 rounded-lg text-lg font-bold"
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#2258B9] text-white px-6 py-2 rounded-lg text-lg font-bold"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
