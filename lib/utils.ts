import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names, resolving conflicts using tailwind-merge.
 * Use this anywhere conditional or composed class strings are needed.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
