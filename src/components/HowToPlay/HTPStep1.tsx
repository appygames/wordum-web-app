import React from 'react'

const HTPStep1 = () => {
  return (
    <div className="text-sm flex flex-col gap-3 md:gap-9">
        <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
        Wordum offers different levels!
        </h2>
        <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
        <li className="text-[15px] md:text-xl">
            <b>Easy:</b> 4-letter words with one letter revealed.
        </li>
        <li className="text-[15px] md:text-xl">
            <b>Medium:</b> 4-letter words with no letter revealed.
        </li>
        <li className="text-[15px] md:text-xl">
            <b>Hard:</b> 5-letter words with one letters revealed.
        </li>
        <li className="text-[15px] md:text-xl">
            <b>Expert:</b> 5-letter words with no letters revealed.
        </li>
        </ul>

        <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
        Custom Word Challenges
        </h2>
        <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
        <li className="text-[15px] md:text-xl">
        Players can create their own set of wordum and share them with other users.
        </li>
        <li className="text-[15px] md:text-xl">Challenge Rules:.</li>
        <ul className="list-disc list-outside ml-4 text-left">
            <li className="text-[15px] md:text-xl">
            Custom words remain available for 24 hours.
            </li>
            <li className="text-[15px] md:text-xl">
            Players can enter shared rooms and guess the words in a
            similar way.
            </li>
            <li className="text-[15px] md:text-xl">
            The same color-coded feedback system applies
            </li>
        </ul>
        </ul>
    </div>
  )
}

export default HTPStep1