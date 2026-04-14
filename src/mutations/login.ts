import { useMutation } from "@tanstack/react-query";
import { loginRequest, type LoginPayload,  } from "@/services/auth.service";
import { toast } from "sonner";
import type { NavigateOptions, To } from "react-router";

export const useLoginMutation = (
  navigate?: (to: To, options?: NavigateOptions) => void
) => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginRequest(data),

    onSuccess: (data) => {
      toast.success("Logged in successfully");
      sessionStorage.setItem("access-token", data.accessToken);
      sessionStorage.setItem("refresh-token", data.refreshToken);
      if (navigate) {
        navigate("/home", { replace: true });
      }
    },

    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
};