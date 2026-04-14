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


export const addImageToFavorites = (imageUrl: string, username: string) => {
  const favoritesKey = `favorites-${username}`;
  const existingFavorites: string[] = JSON.parse(localStorage.getItem(favoritesKey) || "[]");

  let updatedFavorites: string[];
  let isFavorited: boolean;

  if (existingFavorites.includes(imageUrl)) {
    updatedFavorites = existingFavorites.filter((url) => url !== imageUrl);
    isFavorited = false;
  } else {
    updatedFavorites = [...existingFavorites, imageUrl];
    isFavorited = true;
  }

  localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event("favoritesUpdated"));

  return isFavorited;
};

export const getFavoriteImages = (username: string): string[] => {
  const favoritesKey = `favorites-${username}`;
  return JSON.parse(localStorage.getItem(favoritesKey) || "[]");
}

export const isImageFavorited = (imageUrl: string, username: string): boolean => {
  const favoritesKey = `favorites-${username}`;
  const existingFavorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
  return existingFavorites.includes(imageUrl);
}