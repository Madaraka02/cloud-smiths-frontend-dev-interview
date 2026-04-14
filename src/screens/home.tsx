import DogImage from "@/components/dog-image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDogBreedRandomImagesQuery, useDogBreedsQuery, useDogSubBreedRandomImagesQuery } from "@/queries/use-dog-breeds";
import { ChevronRight, Dog, RefreshCcw, RotateCcw } from "lucide-react";
import { useState } from "react";

const HomeScreen = () => {
  const { data, isLoading, isError, refetch } = useDogBreedsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);

  const { data: breedImages, isLoading: isBreedImagesLoading, isError: isBreedImagesError, refetch: refetchBreedImages } =
    useDogBreedRandomImagesQuery(selectedBreed);

  const { data: subBreedImages, isLoading: isSubBreedImagesLoading, isError: isSubBreedImagesError, refetch: refetchSubBreedImages } =
    useDogSubBreedRandomImagesQuery(selectedBreed, selectedSubBreed);

  const handleSelectBreed = (breed: string) => {
    setSelectedBreed(breed);
    setSelectedSubBreed(null);
  };

  const filteredBreeds = data?.message
    ? Object.keys(data.message).filter((breed) =>
        breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full min-h-screen p-2">
      
      <aside className="w-full lg:w-60 p-2 max-h-[40vh] lg:max-h-screen overflow-hidden">
        
        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-10 gap-2">
            <RotateCcw className="animate-spin" />
            <p className="text-xs">Loading dog breeds...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col justify-center items-center gap-3 mt-10">
            <p className="text-xs text-red-500">Error loading dog breeds</p>
            <Button variant="ghost" onClick={() => refetch()} className="flex gap-2 text-sm">
              <RefreshCcw />
              Refetch
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium">Dog breeds</h4>

            <Input
              type="text"
              placeholder="Search breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus-visible:ring-0"
            />

            <div className="overflow-y-auto lg:max-h-[75vh] pr-1">
              <Accordion type="single" collapsible className="w-full border-none">
                {filteredBreeds.map((breed) => (
                  <AccordionItem value={breed} key={breed}>
                    <AccordionTrigger
                      onClick={() => handleSelectBreed(breed)}
                      className="capitalize"
                    >
                      {breed}
                    </AccordionTrigger>

                    <AccordionContent className="pl-3">
                      {data?.message[breed].length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">
                          No sub-breeds
                        </p>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {data?.message[breed].map((subBreed: string) => (
                            <span
                              key={subBreed}
                              onClick={() => setSelectedSubBreed(subBreed)}
                              className="capitalize cursor-pointer text-sm text-slate-600 hover:text-purple-600"
                            >
                              • {subBreed}
                            </span>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </aside>

      <div className="flex-1 w-full flex flex-col gap-6">
       
        <div className="flex items-center gap-1.5 text-xs">
            <span>Breeds</span>
            <ChevronRight size={12} />
            <span className="capitalize font-medium">{selectedBreed}</span>
            {selectedSubBreed && (
              <>
                <ChevronRight size={12} />
                <span className="capitalize font-medium">{selectedSubBreed}</span>
              </>
            )}
        </div>
         {selectedBreed && (
        <section>
            <TitleContainer
              title="Breed"
              name={`${selectedBreed}`}
              breedImages={breedImages?.message.length ?? 0}
            />
          {isBreedImagesLoading && (
            <LoadingState />
          )}

          {isBreedImagesError && (
            <ErrorState message="Error loading images" refetch={refetchBreedImages} />
          )}

            {(!breedImages?.message || breedImages?.message.length === 0) && !isBreedImagesLoading && !isBreedImagesError && (
                <EmptyState/>
            )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {breedImages?.message.map((image: string) => (
              <DogImage
                key={image}
                image={image}
                name={selectedBreed ?? "Dog breed"}
              />
            ))}
          </div>
        </section>)}


        {selectedSubBreed && (
          <section>
            <TitleContainer
              title="Sub-Breed"
              name={`${selectedSubBreed} ${" "} ${selectedBreed}`}
              breedImages={subBreedImages?.message.length ?? 0}
            />

            {isSubBreedImagesLoading && (
              <LoadingState />
            )}

            {isSubBreedImagesError && (
              <ErrorState message="Couldn't load sub breeds" refetch={refetchSubBreedImages} />
            )}

            {(!subBreedImages?.message || subBreedImages?.message.length === 0) && !isSubBreedImagesLoading && !isSubBreedImagesError && (
              <EmptyState/>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {subBreedImages?.message.map((image: string) => (
                <DogImage
                  key={image}
                  image={image}
                  name={`${selectedSubBreed} ${selectedBreed}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomeScreen

const ErrorState = ({message, refetch}:{message: string, refetch: () => void}) => {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <p className="text-xs text-red-400">{message}</p>
      <Button
      variant="ghost"
      onClick={() => refetch()}
      className="text-xs"
      >
      <RefreshCcw size={13} className="mr-1.5" /> Retry
      </Button>
  </div>
  )
}

const LoadingState = () => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
    {[...Array(3)].map((_, index) => (
    <div
    key={index}
    className={`animate-pulse w-full max-h-90 h-70 bg-gray-200 rounded border`}
/>
    ))}
</div>  )
}

const TitleContainer = ({ title, name, breedImages }: {title: string, name: string, breedImages: number }) => {
    return (
    <div className="flex items-end justify-between mb-1 gap-4 flex-wrap border-b border-gray-300">
    <div>
    <p className="text-xs font-semibold tracking-[0.12em] uppercase  mb-1">
    {title} Gallery
    </p>
    <h2
    className="text-3xl lg:text-4xl capitalize leading-tight"
    >
    {name}
    </h2>
    </div>
    <span className="text-xs text-gray-400 pb-1">
    {breedImages
    ? `${breedImages} photos`
    : ""}
    </span>
    </div>
    )
}


const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
    <Dog size={56} strokeWidth={1.2} />
    <p
      className="text-lg tracking-wide"
    >
      Pick a breed to begin
    </p>
    <p className="text-sm text-gray-400">
      Browse  breeds from the sidebar
    </p>
  </div>
);