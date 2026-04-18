"use client";

import Link from "next/link";

type Tab = "profile" | "projects" | "experiences" | "skills" | "certificates" | "awards" | "education";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onSignOut: () => void;
}

const navItems: { label: string; tab: Tab; emoji: string; description: string }[] = [
  { label: "Profile", tab: "profile", emoji: "🧑‍💻", description: "Info & kontak" },
  { label: "Projects", tab: "projects", emoji: "💻", description: "Karya & portfolio" },
  { label: "Experience", tab: "experiences", emoji: "🧳", description: "Riwayat kerja" },
  { label: "Skills", tab: "skills", emoji: "⚡", description: "Keahlian teknis" },
  { label: "Certificates", tab: "certificates", emoji: "📜", description: "Sertifikasi" },
  { label: "Awards", tab: "awards", emoji: "🏆", description: "Penghargaan" },
  { label: "Education", tab: "education", emoji: "🎓", description: "Riwayat pendidikan" },
];

export default function Sidebar({ activeTab, onTabChange, onSignOut }: SidebarProps) {
  return (
    <aside
      className="w-64 h-full flex flex-col shrink-0"
      style={{ background: "#1c1917", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg">
            🏠
          </div>
          <div>
            <p className="font-bold text-white text-sm">Portfolio Admin</p>
            <p className="text-stone-500 text-xs">Kelola konten kamu</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <p className="text-stone-600 text-xs font-bold uppercase tracking-widest px-3 mb-3">
          Konten
        </p>
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
              style={{
                background: isActive ? "rgba(245,158,11,0.15)" : "transparent",
                borderLeft: isActive ? "3px solid #f59e0b" : "3px solid transparent",
              }}
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold leading-none truncate"
                  style={{ color: isActive ? "#fbbf24" : "#d6d3d1" }}
                >
                  {item.label}
                </p>
                <p className="text-xs text-stone-600 mt-0.5 truncate group-hover:text-stone-500 transition-colors">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/5 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-all duration-150"
        >
          <span className="text-lg">🔗</span>
          <span className="text-sm font-medium">Lihat Portfolio</span>
        </Link>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
