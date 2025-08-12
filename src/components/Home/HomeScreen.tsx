import React from 'react'
import Header from '../Header/Header'
import Link from 'next/link'
import Footer from '../Footer/Footer'

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col gap-6 md:gap-4 h-[260px] md:w-1/4 w-[90%] m-auto font-nunito items-center justify-center text-white mt-60 md:mt-auto">
        {/* <Link
          href={`/game/play?level="practice"`}
          className="w-[80%] md:w-[90%] text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
        >
          PRACTICE GAME
        </Link> */}
        <Link
          href="/game"
          className="w-[80%] md:w-[90%] text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
        >
          PLAY GAME
        </Link>
        <Link
          href="/game/create"
          className="w-[80%] md:w-[90%] text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
        >
          CREATE
        </Link>
        <Link
          href="/game/join"
          className="w-[80%]  md:w-[90%]  text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all"
        >
          ENTER CODE
        </Link>
        <Link
          href="/daily-wordum"
          className="w-[80%]  md:hidden text-center py-3 px-5 text-xl rounded-lg bg-[#2258B9] cursor-pointer font-bold hover:bg-[#0056b3] transition-all "
        >
          DAILY WORDUM
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default HomeScreen