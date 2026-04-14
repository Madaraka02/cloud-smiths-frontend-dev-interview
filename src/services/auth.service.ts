export type LoginPayload = {
  username: string;
  password: string;
};

export const loginRequest = async (data: LoginPayload) => {
  const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL
  const res = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      expiresInMins: 30,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }
  console.log("Login response", res);
  return res.json();
};