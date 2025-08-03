import React from 'react'

const HTPStep2 = () => {
  return (
    <div className="text-sm flex flex-col md:flex-row gap-3 md:gap-5">
        <div className="flex flex-col gap-3 md:gap-9">
        <h2 className="text-2xl md:text-3xl md:text-left text-center px-5 font-semibold">
            Gameplay Rules{" "}
        </h2>
        <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
            <li className="text-[15px] md:text-xl">
            Players must place the correct letter in the correct grid
            position.
            </li>
            <li className="text-[15px] md:text-xl">
            Color-coded feedback:
            </li>
            <ul className="list-disc list-outside ml-4 text-left flex flex-col md:gap-2">
            <li className="text-[15px] md:text-xl">
                Green: Correct letter in the correct position.{" "}
            </li>
            <li className="text-[15px] md:text-xl">
                Yellow: Correct letter but in the wrong position within
                the same word.
            </li>
            <li className="text-[15px] md:text-xl">
                Red: Incorrect letter, not part of the word.{" "}
            </li>
            </ul>
            <li className="text-[15px] md:text-xl">
            Players get 3 attempts to guess all the words.
            </li>
            <li className="text-[15px] md:text-xl">
            If all words are guessed correctly, the player wins and
            earns 5 coins.{" "}
            </li>
        </ul>
        </div>
        {/* <CustomImage
        src={wordumHowToPlay}
        alt="Wordum - How To Play"
        width={240}
        height={480}
        className="max-h-54 md:max-h-85 mt-0 md:mt-27 mx-auto"
        sizes="auto"
        /> */}
    </div>
  )
}

export default HTPStep2