"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../../public/icons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setAvatar } from "@/store/userSlice";

const avatars = [
  "/avatars/profile-1.png",
  "/avatars/profile-2.png",
  "/avatars/profile-3.png",
  "/avatars/profile-4.png",
  "/avatars/profile-5.png",
  "/avatars/profile-6.png",
];

export default function AvatarPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedAvatar = useSelector((state: RootState) => state.user.avatar);

  const handleAvatarSelect = (src: string) => {
    dispatch(setAvatar(src));
  };

  const confirm = () => {
    if (selectedAvatar) {
      router.push("/profile");
    }
  };

  const CheckIcon = () => (
    <svg
      className="w-6 h-6 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile View */}
      <div className="w-full h-screen bg-[#F4C9EC] p-4 flex flex-col md:hidden relative">
        <div className="flex items-center gap-4 mb-4">
          <div onClick={() => router.back()}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-xl font-semibold text-black">Choose avatar</h1>
        </div>

        {/* Check icon in top-right */}
        <div className="absolute top-4 right-4" onClick={confirm}>
          <CheckIcon />
        </div>
        <div className="flex justify-center mt-32">
          <img
            src={selectedAvatar ?? undefined}
            alt="Selected Avatar"
            className="w-36 h-37 rounded-full object-none p-0 m-0 block border-4 border-[#2258B9]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12 ml-[19px]">
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src} 
              alt={`avatar-${index}`}
              onClick={() => handleAvatarSelect(src)}
              className={`"w-24 h-24 rounded-full border-4 object-cover cursor-pointer block p-0 m-0 ${
                selectedAvatar === src
                  ? "border-[#2258B9]"
                  : "border-transparent"
              } hover:border-[#2258B9]`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center bg-[#F4C9EC] p-10 min-h-[60%] relative">
        <h1 className="text-3xl font-extrabold text-black mb-6">
          Choose avatar
        </h1>

        {/* Check icon in top-right */}
        <div className="absolute top-8 right-8" onClick={confirm}>
          <CheckIcon />
        </div>

        <div className="flex justify-center mb-10">
          <img
            src={selectedAvatar ?? undefined}
            alt="Selected Avatar"
            className="w-36 h-36 rounded-full border-4 border-[#2258B9]"
          />
        </div>

        <div className="grid grid-cols-6 gap-6">
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`avatar-${index}`}
              onClick={() => handleAvatarSelect(src)}
              className={`w-24 h-24 rounded-full border-4 cursor-pointer ${
                selectedAvatar === src
                  ? "border-[#2258B9]"
                  : "border-transparent"
              } hover:border-[#2258B9]`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
