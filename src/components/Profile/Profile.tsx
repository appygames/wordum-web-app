"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  FaArrowLeft,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { setStats } from "@/store/userSlice";
import { useGetUserByDeviceIdQuery } from "@/store/slices/userApiSlice";
import ProfileCoins from "./ProfileCoins";
import ProfileStats from "./ProfileStats";
import ProfileSkeleton from "./ProfileSkeleton";
import ProfileAvatar from "./ProfileAvatar";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const device_id =
    typeof window !== "undefined" ? localStorage.getItem("device_id") : null;

  const { data, isLoading, isError } = useGetUserByDeviceIdQuery(device_id!, {
    skip: !device_id,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data?.stats) {
      dispatch(setStats(data.stats));
    }
  }, [data, dispatch]);
  
  if (isLoading) {
    return ( <ProfileSkeleton /> );
  }

  if (isError) return <p className="text-white p-4">Failed to load profile.</p>;

  return (
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      {/* Header (same as Home layout) */}
      <div className="hidden md:block w-full">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#F4C9EC] w-full">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <FaArrowLeft />
        </div>
        <div
          onClick={() => router.push("/settings")}
          className="cursor-pointer"
        >
          <IoSettingsOutline size={24} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center gap-6 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito text-white mt-20 md:mt-auto">
        {/* Avatar */}
        <ProfileAvatar />

        {/* Coins */}
        <ProfileCoins />

        {/* Stats toggle */}
        <ProfileStats />
      </div>

      {/* Footer */}
      <div className="hidden md:block w-full">
        <Footer />
      </div>
    </div>
  );
}
