import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      return NextResponse.json(
        { error: "ADMIN_PIN is not configured on server" },
        { status: 500 }
      );
    }

    if (pin === adminPin) {
      // In a real app, we'd use a JWT or session cookie here.
      // For this portfolio, we'll return the ADMIN_TOKEN which the 
      // client will store and use as an authorization header.
      return NextResponse.json({ 
        success: true, 
        token: process.env.ADMIN_TOKEN 
      });
    }

    return NextResponse.json(
      { error: "PIN salah" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
