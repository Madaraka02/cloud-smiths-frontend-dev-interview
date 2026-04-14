import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "@/data-types/auth";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "dbreeds-user-store",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);