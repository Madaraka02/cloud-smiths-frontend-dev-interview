import { Navigate } from "react-router";
import { isAuthenticated } from "@/lib/utils";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}