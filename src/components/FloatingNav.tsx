"use client";

import { useState } from "react";
import type { ModalType } from "@/lib/types";

interface NavItem {
  label: string;
  type: ModalType;
}

const navItems: NavItem[] = [
  { label: "About", type: "about" },
  { label: "Portfolio", type: "portfolio" },
  { label: "Experience", type: "experience" },
  { label: "Skills", type: "skill" },
  { label: "Awards", type: "awards" },
  { label: "Education", type: "education" },
];

interface FloatingNavProps {
  onNavClick: (type: ModalType) => void;
}

export default function FloatingNav({ onNavClick }: FloatingNavProps) {
  const [activeItem, setActiveItem] = useState<ModalType>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (type: ModalType) => {
    setActiveItem(type);
    onNavClick(type);
    setIsOpen(false);
  };

  return (
    <nav className="fixed z-[100] flex flex-col items-end gap-2 top-4 right-4 sm:top-5 sm:right-5">
      {/* ── Mobile Menu Toggle ── */}
      <button
        className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border border-white/30 transition-all duration-200 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.4)",
          color: "#431407",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* ── Navbar Items Container ── */}
      <div
        className={`
          ${isOpen ? "flex" : "hidden"} sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-2 
          px-3 py-3 sm:px-4 sm:py-3 rounded-2xl backdrop-blur-md border border-white/30
          w-[150px] sm:w-auto
        `}
        style={{
          background: "rgba(255,255,255,0.35)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.5) inset",
        }}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-center pb-2 mb-1 border-b sm:pr-3 sm:mr-1 sm:pb-0 sm:mb-0 sm:border-b-0 sm:border-r border-white/30">
          <span
            className="font-bold text-sm"
            style={{ color: "#431407", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
          >
            Home
          </span>
        </div>

        {/* Nav Links */}
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => handleClick(item.type)}
            className="relative flex items-center justify-center sm:justify-start px-3 py-2 sm:py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
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
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
