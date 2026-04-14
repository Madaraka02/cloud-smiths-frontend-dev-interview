import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string("Please enter a valid username"),
  password: z
    .string()
    .min(4, "Password must be at least 6 characters")
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;