import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard — Ananda Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-stone-100 font-sans">
      {children}
    </div>
  );
}
