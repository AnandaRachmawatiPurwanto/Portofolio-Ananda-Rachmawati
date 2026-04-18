import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth-server";

// GET /api/portfolio/profile
export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.profile);
}

// PUT /api/portfolio/profile
export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const db = await readDB();
  db.profile = { ...db.profile, ...body };
  await writeDB(db);
  return NextResponse.json(db.profile);
}
