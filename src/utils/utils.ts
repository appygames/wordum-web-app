import { ClassNameValue, twMerge } from "tailwind-merge";
import clsx from "clsx";
export const targetWords = {
  easy: ["GRAB", "SAND", "FLAG", "RING"],
  medium: ["DRAG", "VISA", "GLAB", "SAIL"],
  hard: ["GRADS", "FLAWS", "SLANG", "BRAND"],
  expert: ["BRIGS", "SNARL", "GLADS", "SWIRL"],
};

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs));
}

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
