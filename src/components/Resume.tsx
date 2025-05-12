import React from "react";
import { useRouter } from "next/navigation";

function Resume({
  onClose,
  setShowModal,
}: {
  onClose: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <div className="w-80 m-auto flex flex-col items-center">
        <div className="flex flex-col gap-4 w-xs m-auto items-center justify-center text-white">
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
            onClick={onClose}
          >
            RESUME
          </button>
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
            onClick={() => setShowModal(true)}
          >
            HOW TO PLAY?
          </button>
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
            onClick={() => router.push("/game")}
          >
            CHANGE LEVEL
          </button>
          <button
            className="w-[90%] md:w-full text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold  hover:bg-[#0056b3] translate-0.5"
            onClick={() => router.push("/game")}
          >
            EXIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resume;
