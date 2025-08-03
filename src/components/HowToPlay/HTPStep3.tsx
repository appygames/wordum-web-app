import React from 'react'

const HTPStep3 = () => {
  return (
    <div className="text-sm flex flex-col gap-3 md:gap-9">
        <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
        Hints & Ads:{" "}
        </h2>
        <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
        <li className="text-[15px] md:text-xl">
            Players can use hints by:
        </li>
        <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
            <li className="text-[15px] md:text-xl">Watching an ad. </li>
            <li className="text-[15px] md:text-xl">
            Spending 25 coins per hint.{" "}
            </li>
        </ul>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">
        Rewards & Coin System
        </h2>
        <ul className="list-disc list-outside ml-4 text-left">
        <li className="text-[15px] md:text-xl">
            <b>Winning a game:</b> 
            <br />+5 coins for Easy
            <br />+10 coins for Easy
            <br />+15 coins for Easy
            <br />+20 coins for Easy
        </li>
        {/* <li className="text-[15px] md:text-xl">
            <b>Using a hint:</b> -25 coins.
        </li>
        <li className="text-[15px] md:text-xl">
            <b>Watching ads:</b> Option to earn extra hints.
        </li> */}
        </ul>
    </div>
  )
}

export default HTPStep3