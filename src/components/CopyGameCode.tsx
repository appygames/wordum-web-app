import React from "react";

const CopyGameCode = ({
  onClose,
  code,
}: {
  onClose: () => void;
  code: string;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FBDCF5] flex items-center justify-center">
      <div className="px-6 py-8 w-[80%] max-w-sm text-center">
        <p className="text-xl  bg-[#2258B9] text-white font-semibold mb-6 p-3 rounded-2xl ">
          Copy the code and share with your friends <br />
          Code : {code}
        </p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="bg-[#2258B9] text-xl text-white font-bold px-6 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="bg-[#2258B9] text-xl text-white font-bold px-6 py-2 rounded-lg"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyGameCode;
