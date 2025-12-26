/**
 * Utility functions
 *
 * Includes the 'cn' utility for conditionally joining Tailwind CSS classes
 * with proper merging for overriding styles.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
