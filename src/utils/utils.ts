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
