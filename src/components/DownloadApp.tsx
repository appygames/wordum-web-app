"use client";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import CustomImage from "./Custom/CustomImage";

export default function DownloadApp() {
  const router = useRouter();

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="relative bg-[#F4C9EC] flex flex-col items-center justify-center min-h-[calc(100vh-0px)] md:min-h-[calc(100vh-284px)]">
        {/* Back Arrow - top-left */}
        <IoIosArrowBack
          className="absolute top-4 left-4 cursor-pointer text-black w-[34px] h-[40px] md:hidden"
          onClick={() => router.push("/")}
        />

        <div className="flex flex-col items-center justify-center gap-5 mt-[-272px] md:mt-[-184px]">
          <h2 className="text-3xl text-center text-[#2258B9] font-bold mb-28 md:mb-9">
            DOWNLOAD THE APP
            <br />
            TO CONTINUE!
          </h2>

          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <button className="flex items-center border border-black gap-4 md:gap-5 bg-white rounded-2xl md:rounded-xl py-4 px-21 md:py-3 md:px-8 font-bold shadow-lg transition-all duration-300 hover:scale-105 text-black text-xl md:text-base">
              <CustomImage
                src="/icons/PlayStore.svg"
                alt="playstore"
                width={120}
                height={120}
                className="h-13 md:h-9"
              />
              Play Store
            </button>
            <button className="flex items-center border border-black gap-4 md:gap-5 bg-white rounded-2xl md:rounded-xl py-4 px-21 md:py-3 md:px-8 font-bold shadow-lg transition-all duration-300 hover:scale-105 text-black text-xl md:text-base">
              <CustomImage
                src="/icons/AppStore.svg"
                alt="appstore"
                width={120}
                height={120}
                className="h-13 md:h-9"
              />
              App Store
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
