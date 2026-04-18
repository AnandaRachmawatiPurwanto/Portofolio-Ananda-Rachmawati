"use client";

import { useState } from "react";
import type { ModalType } from "@/lib/types";

interface NavItem {
  label: string;
  type: ModalType;
  emoji: string;
}

const navItems: NavItem[] = [
  { label: "About", type: "about", emoji: "🐱" },
  { label: "Portfolio", type: "portfolio", emoji: "💻" },
  { label: "Experience", type: "experience", emoji: "🧳" },
  { label: "Skills", type: "skill", emoji: "🧩" },
  { label: "Awards", type: "awards", emoji: "🏆" },
  { label: "Education", type: "education", emoji: "🎓" },
];

interface FloatingNavProps {
  onNavClick: (type: ModalType) => void;
}

export default function FloatingNav({ onNavClick }: FloatingNavProps) {
  const [activeItem, setActiveItem] = useState<ModalType>(null);

  const handleClick = (type: ModalType) => {
    setActiveItem(type);
    onNavClick(type);
  };

  return (
    <nav
      className="fixed z-[100] flex items-center rounded-2xl transition-all duration-300
                 top-1/4 right-3 -translate-y-1/2 flex-col gap-3 px-2.5 py-4      /* Mobile => Sidebar Kanan */
                 sm:top-5 sm:right-5 sm:translate-y-0 sm:flex-row sm:gap-2 sm:px-4 sm:py-3   /* Desktop => Topbar */"
      style={{
        background: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.38)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.5) inset",
      }}
    >
      {/* Logo / Brand */}
      <div className="flex items-center justify-center pb-2 mb-1 border-b sm:pr-3 sm:mr-1 sm:pb-0 sm:mb-0 sm:border-b-0 sm:border-r border-white/30">
        <span
          className="font-bold text-sm"
          style={{ color: "#431407", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          <span className="hidden sm:inline">Home</span>
          <span className="sm:hidden text-lg">🏠</span>
        </span>
      </div>

      {/* Nav Links */}
      {navItems.map((item) => (
        <button
          key={item.type}
          onClick={() => handleClick(item.type)}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: activeItem === item.type ? "rgba(251,191,36,0.35)" : "transparent",
            color: "#431407",
            border:
              activeItem === item.type
                ? "1px solid rgba(251,191,36,0.55)"
                : "1px solid transparent",
            textShadow: "0 1px 2px rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(e) => {
            if (activeItem !== item.type) {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeItem !== item.type) {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }
          }}
        >
          <span className="text-lg leading-none">{item.emoji}</span>
          <span className="hidden sm:inline">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
