export async function authorizedFetch<Req = unknown, Res = unknown>(
  endpoint: string,
  options: {
    method: string;
    data?: Req;
    headers?: HeadersInit;
  }
): Promise<Res> {
  const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL
  const accessToken = sessionStorage.getItem("access-token");
  const refreshTokenValue = sessionStorage.getItem("refresh-token") || undefined;

  const url = `${AUTH_API_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (options.data && !(options.data instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const fetchOptions: RequestInit = {
    method: options.method,
    headers,
    credentials: "include",
    body: options.data
      ? options.data instanceof FormData
        ? options.data
        : JSON.stringify(options.data)
      : undefined,
  };

  let res = await fetch(url, fetchOptions);

  if (res.status === 401 || res.status === 403) {
    try {
      const refreshRes = await fetch(`${AUTH_API_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
          expiresInMins: 60,
        }),
        credentials: "include",
      });
      if (!refreshRes.ok) throw new Error("Failed to refresh token");
      const refresh = await refreshRes.json();
      sessionStorage.setItem("access-token", refresh.accessToken);
      sessionStorage.setItem("refresh-token", refresh.refreshToken);
      headers.set("Authorization", `Bearer ${refresh.accessToken}`);
      res = await fetch(url, fetchOptions);
    } catch {
      throw new Error("Not authenticated");
    }
  }

  if (!res.ok) {
    console.log("Request failed", { url, options, status: res.status });
    throw new Error(await res.text() || "Request failed");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  throw new Error("Response is not JSON");
}