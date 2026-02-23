/**
 * utils.ts
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * Utility functions for the LEMN platform. This file contains the `cn` (className) helper
 * function that combines clsx and tailwind-merge to intelligently merge Tailwind CSS class
 * names. This is particularly useful for conditional styling and when combining base styles
 * with variant styles in components. The function handles conflicting Tailwind classes and
 * ensures the correct class precedence.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}