export const clsx = (...classes) => classes.filter(Boolean).join(' ');

// This is a minimal helper file since tailwind-merge is not fully requested yet without standard structure, 
// but we will use this utility for now to combine classes easily.
// Let's implement full `cn` utility.
import { clsx as clsxLib } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsxLib(inputs));
}
