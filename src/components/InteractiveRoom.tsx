"use client";

import Image from "next/image";
import { useState } from "react";
import type { ModalType } from "@/lib/types";

// ─── SVG Element Configuration ──────────────────────────────
// Semua posisi dalam persen (%) relatif terhadap container background
// Sesuaikan nilai top, left, width agar tepat di atas objek di gambar aslinya
interface RoomElement {
  id: string;
  src: string;
  alt: string;
  modalType: ModalType;
  label: string;
  emoji: string;
  // Posisi & ukuran dalam % relatif terhadap container
  style: {
    top: string;
    left: string;
    width: string;
  };
}

const roomElements: RoomElement[] = [
  {
    id: "kucing",
    src: "/kucing.svg",
    alt: "Kucing — About Me",
    modalType: "about",
    label: "About Me",
    emoji: "🐱",
    style: { top: "80%", left: "53%", width: "12%" },
  },
  {
    id: "pc",
    src: "/pc.svg",
    alt: "Laptop/PC — Portfolio",
    modalType: "portfolio",
    label: "Portfolio",
    emoji: "💻",
    style: { top: "43%", left: "51%", width: "16%" },
  },
  {
    id: "koper",
    src: "/koper.svg",
    alt: "Koper — Experience",
    modalType: "experience",
    label: "Experience",
    emoji: "🧳",
    style: { top: "69%", left: "21%", width: "10%" },
  },
  {
    id: "sertifikat",
    src: "/sertifikat.svg",
    alt: "Sertifikat — Certificates",
    modalType: "certificates",
    label: "Certificates",
    emoji: "📜",
    style: { top: "26%", left: "52%", width: "10%" },
  },
  {
    id: "piala",
    src: "/piala.svg",
    alt: "Piala — Awards & Skills",
    modalType: "awards",
    label: "Awards",
    emoji: "🏆",
    style: { top: "57%", left: "25%", width: "9%" },
  },
  {
    id: "handphone",
    src: "/handphone.svg",
    alt: "Handphone — Contact",
    modalType: "contact",
    label: "Contact",
    emoji: "📱",
    style: { top: "58%", left: "68%", width: "6%" },
  },
  {
    id: "skill",
    src: "/rubik.svg",
    alt: "Rubik — Skill",
    modalType: "skill",
    label: "Skill",
    emoji: "🧩",
    style: { top: "63%", left: "21%", width: "5%" },
  },
  {
    id: "education",
    src: "/edu.svg",
    alt: "Education — Education",
    modalType: "education",
    label: "Education",
    emoji: "🎓",
    style: { top: "14%", left: "65%", width: "15%" },
  },
];

interface InteractiveRoomProps {
  onElementClick: (type: ModalType) => void;
}

export default function InteractiveRoom({ onElementClick }: InteractiveRoomProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full">
      {/* ── Background Image ─────────────────────────────── */}
      <Image
        src="/s-2.svg"
        alt="Illustrated room background"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
        quality={95}
        sizes="100vw"
      />

      {/* ── Soft vignette overlay ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {/* ── Interactive SVG Elements ─────────────────────── */}
      {roomElements.map((el, index) => (
        <button
          key={el.id}
          onClick={() => onElementClick(el.modalType)}
          onMouseEnter={() => setHoveredId(el.id)}
          onMouseLeave={() => setHoveredId(null)}
          aria-label={`Open ${el.label}`}
          className="absolute cursor-pointer border-none bg-transparent p-0"
          style={{
            top: el.style.top,
            left: el.style.left,
            width: el.style.width,
            zIndex: parseInt(el.style.top) + (hoveredId === el.id ? 15 : 0),
            transformOrigin: "bottom center",
            transform: hoveredId === el.id && el.id !== "pc" ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
            filter:
              hoveredId === el.id
                ? "drop-shadow(0 8px 24px rgba(251,191,36,0.55)) drop-shadow(0 0 8px rgba(255,255,255,0.4))"
                : "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
          }}
        >
          {/* Entrance popIn wrapper */}
          <div
            style={{
              animation: `popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s both`,
            }}
          >
            {/* Continuous float animation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={el.src}
              alt={el.alt}
              className="w-full h-auto block"
              draggable={false}
              style={{
                animation: el.id === "pc" ? "none" : `float ${3.5 + (index % 3)}s ease-in-out ${index * 0.2}s infinite alternate`,
              }}
            />
          </div>

          {/* Tooltip on hover */}
          {hoveredId === el.id && (
            <div
              className="absolute left-1/2 pointer-events-none"
              style={{
                bottom: "110%",
                transform: "translateX(-50%)",
                animation: "tooltipIn 0.2s ease",
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(251,191,36,0.4)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#78350f",
                }}
              >
                <span>{el.label}</span>
              </div>
              {/* Tooltip arrow */}
              <div className="flex justify-center">
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid rgba(255,255,255,0.92)",
                  }}
                />
              </div>
            </div>
          )}
        </button>
      ))}

      <style jsx global>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}
