import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB, generateId, VALID_ENTITIES, type ArrayEntityKey } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth-server";

type Params = { entity: string };

// GET /api/portfolio/[entity]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { entity } = await params;
  if (!VALID_ENTITIES.includes(entity as ArrayEntityKey)) {
    return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  }
  const db = await readDB();
  return NextResponse.json(db[entity as ArrayEntityKey]);
}

// POST /api/portfolio/[entity]  — create new item
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entity } = await params;
  if (!VALID_ENTITIES.includes(entity as ArrayEntityKey)) {
    return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  }
  const body = await req.json();
  const db = await readDB();
  const key = entity as ArrayEntityKey;
  const newItem = { id: generateId(), ...body };
  (db[key] as unknown[]).push(newItem);
  await writeDB(db);
  return NextResponse.json(newItem, { status: 201 });
}
