import React from 'react'
import CustomImage from '../Custom/CustomImage'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaPencilAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ProfileAvatar = () => {

    const avatar = useSelector((state: RootState) => state.user.avatar);
    const router = useRouter();

  return (
    <div className="relative">
        {avatar && (
            <CustomImage
                src={avatar}
                alt="user avatar"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-contain p-0 m-0 block border-4 border-[#2258B9]"
            />
        )}
        <div
            className="absolute bottom-0 right-0 bg-[#2258B9] p-1 rounded-full cursor-pointer"
            onClick={() => router.push("/profile/avatar")}
        >
            <FaPencilAlt size={16} color="white" />
        </div>
    </div>
  )
}

export default ProfileAvatar