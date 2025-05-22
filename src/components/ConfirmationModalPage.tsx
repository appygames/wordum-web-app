import React from "react";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FBDCF5] flex items-center justify-center">
      <div className="px-6 py-8 w-[80%] max-w-sm text-center">
        <p className="text-xl  bg-[#2258B9] text-white font-semibold mb-6 p-3 rounded-2xl ">
          Do you want to submit?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="bg-[#2258B9] text-xl text-white font-bold px-6 py-2 rounded-lg"
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#2258B9] text-xl text-white font-bold px-6 py-2 rounded-lg"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
