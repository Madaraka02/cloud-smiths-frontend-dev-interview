import DogImage from "@/components/dog-image";
import { useUserStore } from "@/data-stores/user-store";
import { getFavoriteImages } from "@/lib/utils";
import { ChevronRight, Dog } from "lucide-react";
import { useEffect, useState } from "react";

const FavsScreen = () => {
  const user = useUserStore((state) => state.user);
  const [favoriteImages, setFavoriteImages] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = () => {
      const images = getFavoriteImages(user.username);
      setFavoriteImages(images);
    };

    loadFavorites();

    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <p className="text-lg">
          You need to be logged in to view your favorites
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 p-2 lg:p-4">
      <div className="flex items-center gap-1.5 text-xs">
        <a href="/home" className="capitalize font-medium">Home</a>
        <ChevronRight size={12} />
        <span className="capitalize font-medium">Favourites</span>
      </div>

      <h2 className="text-lg font-semibold">My Favourite Dog Breeds</h2>

      {favoriteImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-600">
          <Dog size={56} strokeWidth={1.2} />
          <p className="text-lg tracking-wide">
            You haven't added any favorites yet
          </p>
          <p className="text-sm text-gray-400">
            Browse breeds from the sidebar and click to add them to your favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {favoriteImages.map((image: string) => (
            <DogImage key={image} image={image} name={"Dog image"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavsScreen;