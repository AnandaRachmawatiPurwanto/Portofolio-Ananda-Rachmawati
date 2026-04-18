import { NextRequest, NextResponse } from "next/server";
import { readDB, writeDB, VALID_ENTITIES, type ArrayEntityKey } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth-server";

type Params = { entity: string; id: string };

// PUT /api/portfolio/[entity]/[id]  — update item
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entity, id } = await params;
  if (!VALID_ENTITIES.includes(entity as ArrayEntityKey)) {
    return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  }
  const body = await req.json();
  const db = await readDB();
  const key = entity as ArrayEntityKey;
  const arr = db[key] as Array<{ id: string }>;
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  arr[idx] = { ...arr[idx], ...body };
  await writeDB(db);
  return NextResponse.json(arr[idx]);
}

// DELETE /api/portfolio/[entity]/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entity, id } = await params;
  if (!VALID_ENTITIES.includes(entity as ArrayEntityKey)) {
    return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  }
  const db = await readDB();
  const key = entity as ArrayEntityKey;
  const arr = db[key] as Array<{ id: string }>;
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  arr.splice(idx, 1);
  await writeDB(db);
  return NextResponse.json({ success: true });
}
