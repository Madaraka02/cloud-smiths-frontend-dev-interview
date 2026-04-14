import {describe, expect, beforeEach, it} from 'vitest';

import { addImageToFavorites, getFavoriteImages } from "./utils";

describe("addImageToFavorites", () => {
  const username = "testuser";
  const imageUrl = "https://example.com/dog.jpg";

  beforeEach(() => {
    localStorage.clear();
  });

  it("adds an image to favorites and returns true", () => {
    const result = addImageToFavorites(imageUrl, username);
    expect(result).toBe(true);
    expect(getFavoriteImages(username)).toContain(imageUrl);
  });

  it("removes an image from favorites and returns false", () => {
    addImageToFavorites(imageUrl, username);
    const result = addImageToFavorites(imageUrl, username);
    expect(result).toBe(false);
    expect(getFavoriteImages(username)).not.toContain(imageUrl);
  });
});
