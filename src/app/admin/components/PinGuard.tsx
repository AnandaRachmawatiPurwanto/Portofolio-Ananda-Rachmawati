"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "portfolio_admin_auth";
const TOKEN_KEY = "portfolio_admin_token";
const AUTH_TTL_HOURS = 24;

interface PinGuardProps {
  children: React.ReactNode;
}

function isAuthValid(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts: number };
    return Date.now() - ts < AUTH_TTL_HOURS * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function PinGuard({ children }: PinGuardProps) {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (isAuthValid()) setAuthed(true);
    else setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleVerify = async () => {
    if (loading) return;
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
        localStorage.setItem(TOKEN_KEY, data.token);
        setAuthed(true);
      } else {
        throw new Error(data.error || "PIN salah");
      }
    } catch (err) {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm mx-4 rounded-3xl p-8 shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          animation: shake ? "shake 0.5s ease" : undefined,
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl">
            {loading ? "⌛" : "🔐"}
          </div>
        </div>

        <h1 className="text-center text-xl font-bold text-white mb-1">Admin Dashboard</h1>
        <p className="text-center text-stone-400 text-sm mb-7">Masukkan PIN untuk melanjutkan</p>

        {/* PIN Input */}
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.slice(0, 6))}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="••••"
            disabled={loading}
            className="w-full text-center text-2xl tracking-[0.5em] py-3 px-4 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-600 outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
            style={{ letterSpacing: pin ? "0.5em" : undefined }}
          />

          {error && (
            <p className="text-center text-red-400 text-sm font-medium animate-pulse">
              PIN salah. Coba lagi.
            </p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-stone-900 transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }}
          >
            {loading ? "Memverifikasi..." : "Masuk →"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-10px); }
          40%       { transform: translateX(10px); }
          60%       { transform: translateX(-8px); }
          80%       { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
