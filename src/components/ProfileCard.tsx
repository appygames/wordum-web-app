"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaPencilAlt,
  FaWallet,
} from "react-icons/fa";
import { IoBarChart, IoSettingsOutline } from "react-icons/io5";
import { setStats } from "@/store/userSlice";
import { useGetUserByDeviceIdQuery } from "@/store/slices/userApiSlice";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const coins = useSelector((state: RootState) => state.game.coins);
  const stats = useSelector((state: RootState) => state.user.stats);
  const [showStats, setShowStats] = useState(false);

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
    return (
      <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden animate-pulse">
        <div className="hidden md:block w-full">
          <Header />
        </div>

        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#F4C9EC] w-full">
          <div className="bg-white/30 rounded-full w-6 h-6" />
          <div className="bg-white/30 rounded-full w-6 h-6" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito text-white mt-20 md:mt-auto">
          {/* Avatar skeleton */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/30 border-4 border-[#2258B9]" />
            <div className="absolute bottom-0 right-0 bg-[#2258B9] p-1 rounded-full">
              <FaPencilAlt size={16} color="white" />
            </div>
          </div>

          {/* Coins skeleton */}
          <div className="bg-[#2258B9] text-white rounded-lg flex items-center justify-between px-4 py-2 w-full shadow-md">
            <div className="flex items-center gap-2">
              <FaWallet size={20} />
              <span className="font-semibold bg-white/30 rounded w-24 h-4" />
            </div>
            <span className="font-bold bg-white/30 rounded w-10 h-4" />
          </div>

          {/* Stats skeleton */}
          <div className="bg-[#2258B9] text-white rounded-lg px-4 py-4 w-full shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IoBarChart size={20} />
                <span className="font-semibold bg-white/30 rounded w-16 h-4" />
              </div>
              <FaChevronDown size={18} />
            </div>

            <div className="mt-3 text-sm text-white flex flex-col gap-2">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-white/10 rounded px-2 py-1"
                  >
                    <span className="bg-white/30 w-20 h-4 rounded" />
                    <span className="bg-white/30 w-12 h-4 rounded" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-full">
          <Footer />
        </div>
      </div>
    );
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
        <div className="relative">
          {avatar && (
            <img
              src={avatar}
              alt="user avatar"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-contain p-0 m-0 block border-4 border-[#2258B9]"
            />
          )}
          <div
            className="absolute bottom-0 right-0 bg-[#2258B9] p-1 rounded-full cursor-pointer"
            onClick={() => router.push("/avatar")}
          >
            <FaPencilAlt size={16} color="white" />
          </div>
        </div>

        {/* Coins */}
        <div className="bg-[#2258B9] text-white rounded-lg flex items-center justify-between px-4 py-2 w-full shadow-md">
          <div className="flex items-center gap-2">
            <FaWallet size={20} />
            <span className="font-semibold">Coins earned</span>
          </div>
          <span className="font-bold">{coins}</span>
        </div>

        {/* Stats toggle */}
        <div
          onClick={() => setShowStats(!showStats)}
          className={`bg-[#2258B9] text-white rounded-lg px-4 py-2 w-full shadow-md cursor-pointer transition-all duration-300 ${
            showStats ? "pb-4" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoBarChart size={20} />
              <span className="font-semibold">Stats</span>
            </div>
            {showStats ? (
              <FaChevronUp size={18} />
            ) : (
              <FaChevronDown size={18} />
            )}
          </div>

          {/* Stats details */}
          {showStats && (
            <div className="mt-3 text-sm text-white">
              <div className="flex justify-between font-semibold mb-2">
                <span>Level</span>
                <span>Wins / Losses</span>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <span>Easy</span>
                  <span>
                    {stats.easy?.wins ?? 0} / {stats.easy?.losses ?? 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Medium</span>
                  <span>
                    {stats.medium?.wins ?? 0} / {stats.medium?.losses ?? 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hard</span>
                  <span>
                    {stats.hard?.wins ?? 0} / {stats.hard?.losses ?? 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Expert</span>
                  <span>
                    {stats.expert?.wins ?? 0} / {stats.expert?.losses ?? 0}
                  </span>
                </div>

                {/* Total: Challenge Accepted */}
                <div className="flex justify-between font-bold pt-2 border-t border-white/30">
                  <span>Challenge Accepted</span>
                  <span>
                    {[
                      stats.easy?.wins ?? 0,
                      stats.medium?.wins ?? 0,
                      stats.hard?.wins ?? 0,
                      stats.expert?.wins ?? 0,
                      stats.easy?.losses ?? 0,
                      stats.medium?.losses ?? 0,
                      stats.hard?.losses ?? 0,
                      stats.expert?.losses ?? 0,
                    ].reduce((acc, val) => acc + val, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block w-full">
        <Footer />
      </div>
    </div>
  );
}
