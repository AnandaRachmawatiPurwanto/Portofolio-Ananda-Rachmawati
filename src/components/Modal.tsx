"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { ModalType } from "@/lib/types";
import AboutContent from "./modal-contents/AboutContent";
import PortfolioContent from "./modal-contents/PortfolioContent";
import ExperienceContent from "./modal-contents/ExperienceContent";
import CertificatesContent from "./modal-contents/CertificatesContent";
import AwardsContent from "./modal-contents/AwardsContent";
import ContactContent from "./modal-contents/ContactContent";
import SkillContent from "./modal-contents/SkillContent";
import EducationContent from "./modal-contents/EducationContent";

interface ModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

const modalTitles: Record<NonNullable<ModalType>, string> = {
  about: "About Me",
  portfolio: "My Portfolio",
  experience: "Experience",
  certificates: "Certificates",
  awards: "Awards",
  contact: "Contact Me",
  skill: "Skill",
  education: "Education",
};

const modalIcons: Record<NonNullable<ModalType>, string> = {
  about: "🐱",
  portfolio: "💻",
  experience: "🧳",
  certificates: "📜",
  awards: "🏆",
  contact: "📱",
  skill: "🧩",
  education: "🎓",
};

export default function Modal({ type, isOpen, onClose }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Click outside close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen || !type) return null;

  const renderContent = () => {
    switch (type) {
      case "about":
        return <AboutContent />;
      case "portfolio":
        return <PortfolioContent />;
      case "experience":
        return <ExperienceContent />;
      case "certificates":
        return <CertificatesContent />;
      case "awards":
        return <AwardsContent />;
      case "contact":
        return <ContactContent />;
      case "skill":
        return <SkillContent />;
      case "education":
        return <EducationContent />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
        style={{
          background: "linear-gradient(135deg, #fefdf8 0%, #fdf6ed 100%)",
          border: "1px solid rgba(255,220,180,0.4)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-amber-100/80 shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl font-bold text-stone-800 tracking-tight">
                {modalTitles[type]}
              </h2>
              <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-300 mt-0.5" />
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-stone-100 hover:bg-red-50 hover:text-red-500 text-stone-400 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-7 py-6 scroll-smooth">
          {renderContent()}
        </div>

        {/* Footer accent */}
        <div className="h-1 shrink-0 bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200" />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
