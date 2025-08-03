"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../../public/icons";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function StorePage() {
  const router = useRouter();

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Store Page */}
      <div className="w-full h-screen bg-[#F4C9EC] p-4 flex flex-col md:hidden">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <div onClick={() => router.push("/")}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-xl text-black font-semibold">Store</h1>
        </div>

        {/* Store Options */}
        <div className="space-y-4 mb-6">
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-lg shadow">
            Buy
          </button>
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-lg shadow">
            Offers & Rewards
          </button>
        </div>
      </div>

      {/* Desktop Store Page */}
      <div className="hidden md:flex flex-col items-center bg-[#F4C9EC] h-[60%] p-10">
        <h1 className="text-3xl font-extrabold text-black mb-6">Store</h1>

        <div className="space-y-6 w-[28rem] font-extrabold text-xl">
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-lg shadow">
            Buy
          </button>
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-lg shadow">
            Offers & Rewards
          </button>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}

