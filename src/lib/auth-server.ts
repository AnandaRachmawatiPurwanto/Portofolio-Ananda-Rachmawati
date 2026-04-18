import { NextRequest } from "next/server";

export function isAuthenticated(req: NextRequest): boolean {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    console.error("ADMIN_TOKEN is not configured on server");
    return false;
  }

  return token === adminToken;
}
