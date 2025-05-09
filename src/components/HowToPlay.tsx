const HowToPlay = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    open && (
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50"></div>
        <div className="bg-[#023047] w-[335px] z-60 text-white max-w-md rounded-xl shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
          <button
            onClick={onClose}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#041E31] rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
          >
            ×
          </button>

          <div className="text-sm flex flex-col gap-3">
            <h2 className="text-2xl px-5 font-semibold">
              Wordum offers different levels!
            </h2>
            <ul className="list-disc list-outside ml-4 text-left">
              <li className="text-[15px]">
                <b>Easy:</b> 4-letter words with one letter revealed.
              </li>
              <li className="text-[15px]">
                <b>Medium:</b> 5-letter words with one letter revealed.
              </li>
              <li className="text-[15px]">
                <b>Hard:</b> 5-letter words with no letters revealed.
              </li>
              <li className="text-[15px]">
                <b>Expert:</b> More challenging words with minimal hints.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">
              Custom Word Challenges
            </h2>
            <ul className="list-disc list-outside ml-4 text-left">
              <li className="text-[15px]">
                Players can create their own set of four words and share them
                with other users.
              </li>
              <li className="text-[15px]">Challenge Rules:.</li>
              <ul className="list-disc list-outside ml-4 text-left">
                <li className="text-[15px]">
                  Custom words remain available for 24 hours.
                </li>
                <li className="text-[15px]">
                  Players can enter shared rooms and guess the words in a
                  similar way.
                </li>
                <li className="text-[15px]">
                  The same color-coded feedback system applies
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default HowToPlay;
