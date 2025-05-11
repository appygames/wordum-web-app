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
      <div className="fixed top-0 left-0 w-full h-full bg-[#80FFFF] flex flex-col items-center justify-center">
        <div className="w-80 m-auto flex flex-col items-center">
          <RxCross1
            className="absolute top-8 right-20 size-8 text-black"
            onClick={handleClose}
          />
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="bg-[#003d66] w-[300px] md:min-w-fit rounded-lg p-3 gap-2.5 text-center shadow-lg">
              <h2 className="text-2xl md:text-4xl font-bold text-center">
                {title}
              </h2>
              <p className="text-md md:text-3xl text-center md:min-w-fit m-auto">
                {subtitle}
              </p>
            </div>

            {type !== "over" && <div className="empty-div"></div>}

            <div className="flex justify-center gap-8 md:gap-16">
              <div
                onClick={handleRetry}
                className="bg-[#003d66] rounded-full p-3 md:p-5 flex items-center justify-center cursor-pointer"
              >
                <FaRedo className="text-xl md:text-5xl" />
              </div>
              <div
                onClick={handleClose}
                className="bg-[#003d66] rounded-full p-3 flex items-center justify-center cursor-pointer"
              >
                <FaHome className="text-xl md:text-5xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GameModal;
