"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useState} from 'react';
import { useRouter } from "next/navigation";

export default function CreateGamePage() {
      const [selected, setSelected] = useState<number | null>(null);
      const router = useRouter();
      
const handleSelect = (length: number) => {
  setSelected(length); // <-- update selected state
  router.push(`/game/create/grid?length=${length}`);
};

  return (
   <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
  <Header />
  <div className="flex flex-col gap-6 md:gap-4 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito items-center justify-center text-white mt-60 md:mt-auto">
    <div className="w-lg flex flex-col items-center gap-5 mb-32 md:mb-0 md:gap-4">
          <h2 className="text-black font-bold text-2xl mb-9 md:text-3xl md:mb-10">
            Choose your preferred level
          </h2>
          <button
          onClick={()=>{
             handleSelect(4)
          }}
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg font-bold cursor-pointer transition-all ${
                selected === 4
                 ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white"  
            } `}
          >
            4 LETTERS
          </button>
             <button
              onClick={() =>{ 
              handleSelect(5)
            }}
            className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl rounded-lg font-bold cursor-pointer transition-all ${
                selected === 5
                 ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
                : "bg-[#2258B9] text-white"  
            } `}
          >
            5 LETTERS
          </button>
        </div>
  </div>
  <Footer />
</div>

  );
}
