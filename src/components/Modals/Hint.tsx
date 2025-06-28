"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCoins } from "@/features/game/gameSlice";
import { CrossIcon } from "../../../public/icons";
import { useUpdateUserMutation } from "@/store/slices/userApiSlice";
type Difficulty = "easy" | "medium" | "hard" | "expert";

export default function Hint({
  onClose,
  handleHint,
  freeHintUsed,
}: {
  onClose: () => void;
  handleHint: () => void;
  level: Difficulty;
  freeHintUsed: boolean;
}) {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.game.coins);
  const [showAdModal, setShowAdModal] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const handleUseCoins = async () => {
    const device_id = localStorage.getItem("device_id");
    if (!device_id || coins < 100) return;

    try {
      await updateUser({ device_id, coins: coins - 100 }).unwrap();
      dispatch(setCoins(coins - 100));
      handleHint();
    } catch (error) {
      console.error("Failed to deduct coins:", error);
    }
  };
  useEffect(() => {
    if (showAdModal) {
      try {
        //@ts-expect-error @types/google-adsense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }
  }, [showAdModal]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <div className="min-h-screen min-w-screen flex items-center justify-center relative">
        {/* Close Buttons */}
        <div
          className="absolute size-8 top-8 right-20 text-black cursor-pointer hidden md:block"
          onClick={onClose}
        >
          <CrossIcon />
        </div>

        <div
          className="absolute top-4 right-4 md:hidden text-black cursor-pointer"
          onClick={onClose}
        >
          <div className="w-5 h-5">
            <CrossIcon />
          </div>
        </div>

        {/* Hint Options */}
        <div className="p-4 w-full max-w-md md:max-w-xl flex flex-col items-center text-center">
          <div className="relative px-4 py-2 mb-6">
            <div className="relative w-25 h-15">
              <img
                src="/icons/coins.png"
                alt="Coins"
                className="w-full h-full"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[#2258B9] font-extrabold text-sm">
                {coins}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full px-4 md:px-24">
            <button
              onClick={handleHint}
              disabled={freeHintUsed}
              className={`${
                freeHintUsed
                  ? "bg-[#B3B3B3] cursor-not-allowed"
                  : "bg-[#EB598F]"
              } text-white text-lg font-bold py-3 rounded`}
            >
              {freeHintUsed
                ? "Free hint already used for this level"
                : "Use free hint"}
            </button>
            <button
              onClick={() => setShowAdModal(true)}
              disabled
              className="bg-[#B3B3B3] cursor-not-allowed text-white text-lg font-bold py-3 rounded"
            >
              Watch ad to get a free hint (coming soon)
            </button>
            <button
              onClick={handleUseCoins}
              disabled={coins < 100}
              className={`text-white text-lg font-bold py-3 rounded ${
                coins < 100 ? "bg-[#B3B3B3] cursor-not-allowed" : "bg-[#EB598F]"
              }`}
            >
              Use 100 coins to get a free hint
            </button>
            {coins < 100 && (
              <p className="text-md text-red-700 mt-[-10px]">
                You don&apos;t have enough coins for this
              </p>
            )}
          </div>
        </div>

        {showAdModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-11/12 max-w-lg relative">
              <p className="text-center font-semibold mb-2">
                Watch this ad to unlock your hint
              </p>

              <div className="flex justify-center items-center w-full h-40">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", width: "100%", height: "100%" }}
                  data-ad-client="ca-pub-3470509197648988"
                  data-ad-slot="7456920209"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>

              <p className="text-sm mt-2 text-center text-gray-600">
                Please wait for the ad to finish
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
