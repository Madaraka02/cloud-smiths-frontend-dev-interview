import { useLoggedInUserQuery } from "@/queries/use-me";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useLoggedInUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}