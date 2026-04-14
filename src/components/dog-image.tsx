import { Heart } from "lucide-react"
import { Button } from "./ui/button"

const DogImage = ({image,name}:{image: string, name: string}) => {
  return (
    <div className="w-full max-h-90 h-70 relative rounded-md border overflow-hidden">
      <img key={image} src={image} alt={name ?? "Dog"} className="w-full h-full relative object-cover"/>
      <Button
      variant="ghost"
      size="icon"
      className="absolute top-1 right-1 bg-red-200 cursor-pointer"
      >
        <Heart className="text-red-500"/>
      </Button>
    </div>
  )
}

export default DogImage