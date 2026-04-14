import { useLoggedInUserQuery } from "@/queries/use-me";
import { Navigate } from "react-router";
import { useUserStore } from "@/data-stores/user-store";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useLoggedInUserQuery();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}