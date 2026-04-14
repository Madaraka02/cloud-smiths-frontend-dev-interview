import { dogsFetch } from "@/lib/authorized";
import { useQuery } from "@tanstack/react-query";

type DogResponse = {
  message: Record<string, string[]>;
  status: string;
};

type DogBreedRandomImagesResponse = {
  message: string[];
  status: string;
};
const getDogBreeds = async (): Promise<DogResponse> => {
  return dogsFetch<undefined, DogResponse>("/breeds/list/all", { method: "GET" });
};

const getDogBreedRandomImages = async ({breed}: {breed: string}): Promise<DogBreedRandomImagesResponse> => {
  return dogsFetch<undefined, DogBreedRandomImagesResponse>(`/breed/${breed}/images/random/3`, { method: "GET" });
};

const getDogSubBreedRandomImages = async ({breed, subBreed}: {breed: string, subBreed: string}): Promise<DogBreedRandomImagesResponse> => {
  return dogsFetch<undefined, DogBreedRandomImagesResponse>(`/breed/${breed}/${subBreed}/images/random/3`, { method: "GET" });
};

export const useDogBreedsQuery = () => {
  return useQuery({
    queryKey: ["dog-breeds"],
    queryFn: getDogBreeds,
    retryOnMount: true,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: false,
    staleTime: 1000 * 60 * 60 * 2,
  });
};

export const useDogBreedRandomImagesQuery = (breed: string | null) => {
  return useQuery({
    queryKey: ["dog-breed-random-images", breed],
    queryFn: () => getDogBreedRandomImages({breed: breed!}),
    enabled: !!breed,
    retryOnMount: true,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: false,
    staleTime: 1000 * 60 * 60 * 2,
  });
};

export const useDogSubBreedRandomImagesQuery = (breed: string | null, subBreed: string | null) => {
    return useQuery({
      queryKey: ["dog-sub-breed-random-images", breed, subBreed],
      queryFn: () => getDogSubBreedRandomImages({breed: breed!, subBreed: subBreed!}),
      enabled: !!breed && !!subBreed,
      retryOnMount: true,
      retry: false,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchInterval: false,
      staleTime: 1000 * 60 * 60 * 2,
    });
};

