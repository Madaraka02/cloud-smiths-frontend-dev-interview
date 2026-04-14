import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ACCESS_TOKEN } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isAuthenticated = () => {
  const token = sessionStorage.getItem(ACCESS_TOKEN);
  return !!token;
}