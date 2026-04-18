"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  isSaving?: boolean;
  children: React.ReactNode;
}

export default function FormModal({
  isOpen,
  title,
  onClose,
  onSave,
  isSaving = false,
  children,
}: FormModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease" }}
    >
      <div
        className="w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl shadow-2xl bg-white overflow-hidden"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 shrink-0">
          <h2 className="font-bold text-stone-800 text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-100 shrink-0 bg-stone-50/70">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg text-sm font-bold text-stone-900 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
          >
            {isSaving ? "Menyimpan..." : "💾 Simpan"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

// ── Reusable form field components ─────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}
export function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-stone-200 text-sm text-stone-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-stone-400 bg-white";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`${inputCls} resize-none ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputCls} cursor-pointer ${props.className ?? ""}`} />
  );
}
