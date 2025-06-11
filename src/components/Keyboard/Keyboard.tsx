import { cn } from "@/utils/utils";

type KeyboardProps = {
  keyboard: string[];
  disabledButtons: number[];
  selectedIndex: number | null;
  onKeyClick: (char: string, index: number) => void;
};

export default function Keyboard({
  keyboard,
  disabledButtons,
  selectedIndex,
  onKeyClick,
}: KeyboardProps) {
  return (
    <div className="w-full flex justify-center items-center py-4 sm:py-5 bg-[#FBDCF5]">
      <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-5 max-w-[400px] md:max-w-[550px]">
        {keyboard.map((char, index) => {
          const disabled = disabledButtons.includes(index);
          return (
            <button
              key={index}
              className={cn(
                "min-h-10 md:min-h-14 min-w-10 md:min-w-14 p-1 sm:p-2 bg-[#2258B9] text-white rounded-sm text-lg md:text-4xl font-bold cursor-pointer",
                disabled && "bg-gray-400 cursor-not-allowed",
                selectedIndex === index &&
                  "ring-1 ring-inset ring-blue-800 bg-white text-blue-800"
              )}
              onClick={() => onKeyClick(char, index)}
              disabled={disabled}
            >
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
}
