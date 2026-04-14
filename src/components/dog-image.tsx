import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { useUserStore } from "@/data-stores/user-store"
import { toast } from "sonner";
import { addImageToFavorites, isImageFavorited } from "@/lib/utils";
import { useState } from "react";

const DogImage = ({image,name}:{image: string, name: string}) => {
    const user = useUserStore((state) => state.user);
    const [isFavorited, setIsFavorited] = useState(user ? isImageFavorited(image, user.username) : false);

    const handleAddToFavorites = () => {
        if (!user) {
            toast.error("You need to be logged in to add favorites");
            return;
        }
        const wasAdded = addImageToFavorites(image, user.username);
        console.log("Was image added to favorites?", wasAdded);
        setIsFavorited(wasAdded);
        toast.success(wasAdded ? "Image added to favorites" : "Image removed from favorites");
    }

  return (
    <div className="w-full max-h-90 h-70 relative rounded-md border overflow-hidden">
      <img key={image} src={image} alt={name ?? "Dog"} className="w-full h-full relative object-cover"/>
      <Button
      variant="ghost"
      size="icon"
      className={`absolute top-1 right-1 cursor-pointer ${isFavorited ? "bg-red-200" : "bg-white"}`}
      onClick={handleAddToFavorites}
      >
        <Heart className={`text-red-500 ${isFavorited ? "fill-red-500" : ""}`}/>
      </Button>
    </div>
  )
}

export default DogImage