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
    if (selectedAvatar === src) return;
    localStorage.setItem("avatar", src);
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
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      <div className="hidden md:block w-full">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-start md:justify-center p-4 md:p-10 relative">
        {/* Mobile Back and Title */}
        <div className="md:hidden flex items-center gap-4 w-full mb-6">
          <div onClick={() => router.back()}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-xl font-semibold text-black">Choose avatar</h1>
        </div>

        {/* Check icon top-right */}
        <div
          className="absolute top-4 right-4 md:top-8 md:right-8 z-10 cursor-pointer"
          onClick={confirm}
        >
          <CheckIcon />
        </div>

        {/* Selected Avatar Preview */}
        <div className="mb-10">
          <img
            src={selectedAvatar ?? undefined}
            alt="Selected Avatar"
            className="w-36 h-36 rounded-full border-4 border-[#2258B9] object-cover"
          />
        </div>

        {/* Avatar Selection Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`avatar-${index}`}
              onClick={() => handleAvatarSelect(src)}
              className={`w-24 h-24 rounded-full border-4 cursor-pointer object-cover ${
                selectedAvatar === src
                  ? "border-[#2258B9]"
                  : "border-transparent"
              } hover:border-[#2258B9]`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block w-full">
        <Footer />
      </div>
    </div>
  );
}
