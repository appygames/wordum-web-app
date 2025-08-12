import { Difficulty, setDifficulty } from '@/features/game/gameSlice';
import { RootState } from '@/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

type pageProps = {
    level: Difficulty
}

const SelectLevelButton = ({level }: pageProps) => {

    const gameMode = useSelector((state: RootState) => state.game.difficulty);
    const dispatch = useDispatch()

  return (
    <button
        className={`h-12 w-full max-w-72 md:h-14 md:w-[58%] text-xl uppercase rounded-lg font-bold cursor-pointer transition-all ${
        level === gameMode
        ? "bg-[#ffffff] text-[#2258B9] border-2 border-[#2258B9]"
        : "bg-[#2258B9] text-white "
    }`}
    onClick={() => dispatch(setDifficulty(level as Difficulty))}
    >
    {level}
    </button>
  )
}

export default SelectLevelButton