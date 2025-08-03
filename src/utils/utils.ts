import { ClassNameValue, twMerge } from "tailwind-merge";
import clsx from "clsx";
export const wordPool = {
  easy: ["GRAB", "SAND", "FLAG", "RING", "SHIP", "WIND", "FISH", "TREE"],
  medium: ["DRAG", "VISA", "GLAB", "SAIL", "MINT", "COAL", "DUSK", "JUMP"],
  hard: [
    "GRADS",
    "FLAWS",
    "SLANG",
    "BRAND",
    "CLASH",
    "STORM",
    "BLANK",
    "CRISP",
  ],
  expert: [
    "BRIGS",
    "SNARL",
    "GLADS",
    "SWIRL",
    "PLANK",
    "TWIRL",
    "FLINT",
    "GLARE",
  ],
};

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs));
}

// Sound On/Off
export const playSound = (soundPath: string) => {
  if (localStorage.getItem("sound") === "false") return;
  const audio = new Audio(soundPath);
  audio.play();
};

export const updateGameStats = (level: string, result: "win" | "loss") => {
  const statsKey = "gameStats";
  const raw = localStorage.getItem(statsKey);
  const stats = raw ? JSON.parse(raw) : {};

  if (!stats[level]) {
    stats[level] = { wins: 0, losses: 0 };
  }

  if (result === "win") stats[level].wins += 1;
  else stats[level].losses += 1;

  localStorage.setItem(statsKey, JSON.stringify(stats));
};

export const getRandomWords = (pool: string[], count = 4) => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
