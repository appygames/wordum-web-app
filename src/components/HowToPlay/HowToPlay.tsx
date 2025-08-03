"use client";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { CrossIcon } from "../../../public/icons";
import HTPStep1 from "./HTPStep1";
import HTPStep2 from "./HTPStep2";
import HTPStep3 from "./HTPStep3";

const HowToPlay = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setStep((prev) => Math.min(prev + 1, 3)),
    onSwipedRight: () => setStep((prev) => Math.max(prev - 1, 1)),
    trackMouse: true,
  });
  return (
    open && (
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBDCF5] opacity-70"></div>
        <div
          {...swipeHandlers}
          className="bg-[#2258B9] h-[600px] md:h-[658px] w-[335px] md:w-[70%] md:px-16 md:py-10 z-60 text-white rounded-xl shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5"
        >
          <button
            onClick={onClose}
            className="absolute md:hidden -top-12 left-1/2 transform cursor-pointer -translate-x-1/2 bg-[#2258B9] rounded-full w-11 h-11 flex items-center justify-center text-2xl font-bold"
          >
            ×
          </button>
          <div
            className="absolute  size-8 top-6 right-10 font-bold hidden md:block cursor-pointer text-white"
            onClick={onClose}
          >
            <CrossIcon />
          </div>
          
          {step === 1 && <HTPStep1 />}
          {step === 2 && <HTPStep2 />}
          {step === 3 && <HTPStep3 />}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full flex gap-2 items-center justify-center shadow-md">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={cn(
                  "size-2 bg-[#D9D9D9] rounded-full cursor-pointer hover:bg-white transition-all",
                  step === num && "size-3 bg-white"
                )}
                onClick={() => setStep(num)}
              />
            ))}
          </div>

          {/* Swipe indicator (Mobile) */}
        </div>
        {/* <div className="md:hidden mb-4 flex justify-center items-center text-xs text-white">
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div> */}
      </div>
    )
  );
};

export default HowToPlay;
