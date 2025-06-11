import { cn } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { removeLetterFromGrid } from "@/features/game/gameSlice";

type GameGridProps = {
  grid: string[][];
  feedback: string[][];
  selectedLetter: { char: string; index: number } | null;
  onPlaceLetter: (row: number, col: number) => void;
};

export default function GameGrid({
  grid,
  feedback,
  selectedLetter,
  onPlaceLetter,
}: GameGridProps) {
  const dispatch = useDispatch();

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex flex-col gap-2 sm:gap-3 items-center mb-5">
        {grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex p-1 sm:py-2 sm:px-2 rounded-lg gap-3.5 sm:gap-3 bg-[#FBDCF5] shadow-[0_6px_15px_rgba(0,0,0,0.3)]"
          >
            {row.map((letter, colIndex) => {
              const feedbackColor = feedback[rowIndex]?.[colIndex];
              let color = "";
              if (feedbackColor === "green") color = "bg-[#7CFF54]";
              else if (feedbackColor === "yellow") color = "bg-[#FFF422]";
              else if (feedbackColor === "red") color = "bg-[#FF3538]";

              return (
                <div
                  key={colIndex}
                  className={cn(
                    "w-12 h-12 sm:w-16 sm:h-16 bg-[#2258B9] rounded-full flex items-center justify-center text-white cursor-pointer text-lg sm:text-2xl font-semibold active:bg-white active:border-4 border-[#2258B9]",
                    color
                  )}
                  onClick={() => {
                    if (feedbackColor !== "green" && selectedLetter) {
                      onPlaceLetter(rowIndex, colIndex);
                    }
                  }}
                  onDoubleClick={() => {
                    dispatch(
                      removeLetterFromGrid({ row: rowIndex, col: colIndex })
                    );
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
