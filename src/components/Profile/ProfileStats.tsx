import { RootState } from '@/store';
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { IoBarChart } from 'react-icons/io5'
import { useSelector } from 'react-redux';

const ProfileStats = () => {

    const [showStats, setShowStats] = useState(false);

    const stats = useSelector((state: RootState) => state.user.stats);

  return (
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
  )
}

export default ProfileStats