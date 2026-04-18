const TOKEN_KEY = "portfolio_admin_token";

export async function authFetch(url: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  
  const headers = {
    ...options.headers,
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    // IfUnauthorized, we might want to clear the token and reload
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio_admin_auth");
      localStorage.removeItem(TOKEN_KEY);
      window.location.reload();
    }
  }

  return response;
}
