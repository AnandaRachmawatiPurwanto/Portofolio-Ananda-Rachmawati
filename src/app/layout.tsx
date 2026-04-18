import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ananda — Interactive Portfolio",
  description:
    "Portfolio interaktif Ananda — Fullstack Developer & UI/UX Designer spesialisasi Next.js, TypeScript, PostgreSQL, dan SwiftUI.",
  keywords: ["portfolio", "fullstack developer", "UI/UX designer", "Next.js", "SwiftUI"],
  authors: [{ name: "Ananda" }],
  openGraph: {
    title: "Ananda — Interactive Portfolio",
    description: "Jelajahi ruangan digital dan temukan karya-karya saya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  );
}
