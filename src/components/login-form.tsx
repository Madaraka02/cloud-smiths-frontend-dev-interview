import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form";
import { loginFormSchema, type LoginFormValues } from "@/schemas/auth"
import { useLoginMutation } from "@/mutations/login"
import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLoginMutation(navigate);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as LoginFormValues,
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
  });
  

  return (
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>

              <form.Field
                name="username"
                children={(field) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Johndoe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {field.state.meta.errors?.[0]?.message && (
                    <FieldDescription className="text-red-500 text-xs mt-1">
                      {field.state.meta.errors[0].message}
                    </FieldDescription>
                  )}
                  </Field>
                )}
              />

              <form.Field
                name="password"
                children={(field) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <div className="flex flex-row items-center w-full gap-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="flex-1"
                    />
                    <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    >
                      {showPassword ? <EyeOff/>  : <Eye/>}
                    </Button>
                    </div>
                    {field.state.meta.errors?.[0]?.message && (
                    <FieldDescription className="text-red-500 text-xs mt-1">
                      {field.state.meta.errors[0].message}
                    </FieldDescription>
                  )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" disabled={form.state.isSubmitting}>
                  {form.state.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  );
}