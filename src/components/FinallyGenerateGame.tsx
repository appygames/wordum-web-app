"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaHome, FaShareAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CrossIcon } from "../../public/icons";
import { CoinIcon } from "../../public/icons";
import { useRouter } from "next/navigation";

export default function FinallyGenerateGamePage() {
  const router = useRouter();
  const coins = 50; // Replace with actual coin value from state if needed

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      {/* Mobile top bar */}
      <div className="w-full flex justify-between items-center px-4 py-2 md:hidden z-50 relative">
        <IoIosArrowBack
          className="cursor-pointer w-[34px] h-[40px]"
          style={{ color: "#000" }}
          onClick={() => router.push("/game/create")}
        />
        <div className="relative size-8 rounded-full bg-[#FFB400] flex items-center justify-center">
          <CoinIcon />
          <span className="absolute text-black font-bold text-sm">{coins}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-4 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito items-center justify-center text-white mt-60 md:mt-auto">
        <div className="w-lg flex flex-col items-center gap-5 mb-32 md:mb-0 md:gap-4">
          <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBDCF5]"></div>
            <div className="w-80 m-auto z-60 flex flex-col items-center">
              <div
                className="absolute size-8 top-8 right-20 text-black cursor-pointer hidden md:block"
                onClick={handleClose}
              >
                <CrossIcon />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="bg-[#2258B9] w-[270px] md:w-[550px] rounded-lg p-3 gap-2.5 text-center shadow-lg">
                  <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
                    CONGRATULATIONS!
                  </h2>
                  <span className="block mt-2 text-white text-md md:text-3xl text-center md:min-w-fit m-auto">
                    You’ve successfully created your own wordum
                  </span>
                </div>

                <div className="flex justify-center gap-8 md:gap-16">
                  <div className="bg-[#2258B9] rounded-full p-4 md:p-6 flex items-center justify-center cursor-pointer">
                    <FaShareAlt className="text-white text-3xl md:text-5xl" />
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
        </div>
      </div>
    </div>
  );
}
