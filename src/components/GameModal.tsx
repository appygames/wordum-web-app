"use client";
// components/GameModal.tsx

import { RxCross1 } from "react-icons/rx";
import { FaHome, FaRedo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetFeedback } from "@/features/game/gameSlice";

interface GameModalProps {
  open: boolean;
  title: string;
  subtitle: string;
  type?: "win" | "over";
}

const GameModal = ({
  open,
  title,
  subtitle,
  type = "over",
}: GameModalProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetFeedback());
    router.push("/");
  };

  const handleRetry = () => {
    dispatch(resetFeedback());
    router.push("/game");
  };

  return (
    open && (
      <div className="fixed top-0 left-0 w-full h-full  flex flex-col items-center justify-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBDCF5] opacity-50"></div>
        <div className="w-80 m-auto z-60 flex flex-col items-center">
          <RxCross1
            className="absolute top-8 right-20 size-8 text-black cursor-pointer hidden md:block"
            onClick={handleClose}
          />
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="bg-[#2258B9] w-[186px] md:w-[550px] rounded-lg p-3 gap-2.5 text-center shadow-lg">
              <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
                {title}
              </h2>
              <span className="block mt-2 text-white text-md md:text-3xl text-center md:min-w-fit m-auto">
                {subtitle}
              </span>
            </div>

            {type !== "over" && <div className="empty-div"></div>}

            <div className="flex justify-center gap-8 md:gap-16">
              <div
                onClick={handleRetry}
                className="bg-[#2258B9] rounded-full p-4 md:p-6 flex items-center justify-center cursor-pointer"
              >
                <FaRedo className="text-white text-3xl md:text-5xl" />
              </div>
              <div
                onClick={handleClose}
                className="bg-[#2258B9] rounded-full p-3 md:p-5 flex items-center justify-center cursor-pointer"
              >
                <FaHome className="text-white text-4xl md:text-6xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GameModal;
