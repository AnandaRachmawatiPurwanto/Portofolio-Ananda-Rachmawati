import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth-server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Check if filename and body exist
  if (!filename || !request.body) {
    return NextResponse.json(
      { error: 'Body file dan parameter filename diperlukan' },
      { status: 400 }
    );
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json(blob, { status: 200 });
  } catch (error) {
    console.error("Vercel Blob Upload Error:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar ke Vercel Blob. Pastikan konfigurasi Anda benar." },
      { status: 500 }
    );
  }
}
