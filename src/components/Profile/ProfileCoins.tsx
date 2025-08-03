import { RootState } from '@/store';
import React from 'react'
import { FaWallet } from 'react-icons/fa'
import { useSelector } from 'react-redux';

const ProfileCoins = () => {
    
    const coins = useSelector((state: RootState) => state.game.coins);

  return (
    <div className="bg-[#2258B9] text-white rounded-lg flex items-center justify-between px-4 py-2 w-full shadow-md">
        <div className="flex items-center gap-2">
            <FaWallet size={20} />
            <span className="font-semibold">Coins earned</span>
        </div>
        <span className="font-bold">{coins}</span>
  </div>

  )
}

export default ProfileCoins