"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import InteractiveRoom from "@/components/InteractiveRoom";
import Modal from "@/components/Modal";
import FloatingNav from "@/components/FloatingNav";
import TextType from "@/components/TextType";
import type { ModalType } from "@/lib/types";
import { Patrick_Hand } from 'next/font/google';
import { Fira_Code } from 'next/font/google';

// Inisialisasi font gaya Command Prompt
const cmdFont = Fira_Code({
  weight: ['400', '600', '700'], // Bisa pilih ketebalan
  subsets: ['latin'],
  display: 'swap',
});
// Inisialisasi font Patrick Hand
const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Hanya ada SATU export default function
export default function HomePage() {
  // === STATE UNTUK MODAL ===
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === STATE & REF UNTUK AUDIO ===
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === REF UNTUK RESPONSIVE SCROLL ===
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Memposisikan scroll ke tengah saat pertama kali dimuat di layar kecil
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }
  }, []);

  // === FUNGSI MODAL ===
  const openModal = useCallback((type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModalType(null), 300);
  }, []);

  // === FUNGSI AUDIO ===
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        audioRef.current.volume = 0.3; // Volume 30% biar estetik dan tidak kaget
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-amber-50">

      {/* ── Elemen Audio Tersembunyi ──────────────────────── */}
      <audio ref={audioRef} src="/backsound.mp3" loop preload="auto" />

      {/* ── Tombol Play/Pause Audio ───────────────────────── */}
      <button
        onClick={toggleAudio}
        className="absolute top-6 left-10 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform duration-300"
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        <span className="text-2xl">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>)}
        </span>
      </button>

      {/* ── Ruangan Bisa Digeser (Scrollable Responsive) ── */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-auto touch-pan-x touch-pan-y"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Kontainer ini memaksa aspect ratio SVG agar proporsinya tidak pernah meleset */}
        <div
          className="relative mx-auto flex items-center justify-center overflow-hidden"
          style={{
            width: "max(100vw, calc(100vh * 16 / 9))",
            height: "max(100vh, calc(100vw * 9 / 16))",
          }}
        >
          {/* ── Full-screen Interactive Room ─────────────────── */}
          <InteractiveRoom onElementClick={openModal} />

          {/* ── TextType 1 — Bulletin Board ──────────────────── */}
          <div
            className="absolute pointer-events-none"
            style={{ top: "52%", left: "48%", width: "22%", zIndex: 100 }}
          >
            <div className={cmdFont.className} style={{ textAlign: "center" }}>
              <p
                className="font-bold"
                style={{
                  fontSize: "0.8rem",
                  color: "#e7e5dcff",
                  //textShadow: "0 1px 2px rgba(255,255,255,0.5)",
                  marginBottom: "0.5em",
                }}
              >
                I&apos;m a
              </p>
              <p
                className="font-bold"
                style={{
                  fontSize: "0.8rem",
                }}
              >
                <TextType
                  texts={[
                    "UI/UX Designer",
                    "Web Developer",
                    "Fullstack Developer",
                  ]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseDuration={2000}
                  showCursor
                  cursorCharacter="|"
                  style={{ color: "#ffed4eff", fontWeight: 800 }}
                />
              </p>
            </div>
          </div>

          {/* ── TextType 2 — Chalkboard ───────────────────────── */}
          <div
            className="absolute pointer-events-none"
            style={{ bottom: "12.5%", right: "3.3%", width: "22%", zIndex: 25, transform: "rotate(2deg)" }}
          >
            <div className={patrickHand.className} style={{ textAlign: "center" }}>
              <p
                className="font-bold"
                style={{
                  fontSize: "1.1rem",
                  color: "#e8e0d0",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                  marginBottom: "0.2em",
                }}
              >
                Welcome to
              </p>
              <p
                className="font-bold"
                style={{
                  fontSize: "1.1rem",
                  color: "#e8e0d0",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                  marginBottom: "0.8em",
                }}
              >
                Nanda&apos;s Portfolio
              </p>
              <p
                className="font-bold"
                style={{
                  fontSize: "1.1rem",
                }}
              >
                <TextType
                  texts={[
                    "Explore my work",
                    "Contact me!"
                  ]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseDuration={2000}
                  showCursor
                  cursorCharacter="|"
                  style={{ color: "#fde68a", fontWeight: 800 }}
                />
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Floating Navigation ───────────────────────────── */}
      <FloatingNav onNavClick={openModal} />

      {/* ── Modal ────────────────────────────────────────────── */}
      <Modal type={modalType} isOpen={isModalOpen} onClose={closeModal} />

      <style jsx global>{`
        @keyframes floatHint {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-6px); }
        }
      `}</style>
    </main>
  );
}