import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaChevronDown, FaWallet } from 'react-icons/fa6'
import { IoBarChart } from 'react-icons/io5'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const ProfileSkeleton = () => {
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
  )
}

export default ProfileSkeleton