import { useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "@/lib/authorized";
import type { IUser } from "@/data-types/auth";

const getLoggedInUser = async (): Promise<IUser> => {
  return authorizedFetch<undefined, IUser>("/me", { method: "GET" });
};

export const useLoggedInUserQuery = () => {
  return useQuery({
    queryKey: ["loggedInUser"],
    queryFn: getLoggedInUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });
};