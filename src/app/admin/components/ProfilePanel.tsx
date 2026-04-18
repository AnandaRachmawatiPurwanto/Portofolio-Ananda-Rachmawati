"use client";

import { useState, useEffect } from "react";
import type { Profile } from "@/lib/types";
import { defaultProfile } from "@/hooks/usePortfolioData";
import { Field, Input, Textarea } from "./FormModal";
import { authFetch } from "@/lib/auth-client";

export default function ProfilePanel() {
  const [form, setForm] = useState<Profile>(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/portfolio/profile")
      .then((r) => r.json())
      .then((d: Profile) => { setForm(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const set = (key: keyof Profile, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await authFetch("/api/portfolio/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <Skeleton />;

  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Profil Saya</h2>
          <p className="text-stone-400 text-sm mt-0.5">Info dasar yang tampil di modal &quot;About Me&quot;</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-stone-900 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
        >
          {saving ? "Menyimpan..." : saved ? "✅ Tersimpan!" : "💾 Simpan Perubahan"}
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nama" required>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Nama lengkap" />
          </Field>
          <Field label="Lokasi">
            <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Indonesia 🇮🇩" />
          </Field>
        </div>
        <Field label="Tagline" required>
          <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Fullstack Developer & UI/UX Designer" />
        </Field>
        <Field label="Bio">
          <Textarea
            rows={4}
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            placeholder="Ceritakan tentang dirimu..."
          />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Link & Kontak</p>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" />
        </Field>
        <Field label="GitHub URL">
          <Input type="url" value={form.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/username" />
        </Field>
        <Field label="LinkedIn URL">
          <Input type="url" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" />
        </Field>
        <Field label="Dribbble URL (opsional)">
          <Input type="url" value={form.dribbble ?? ""} onChange={(e) => set("dribbble", e.target.value)} placeholder="https://dribbble.com/username" />
        </Field>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="max-w-2xl space-y-5 animate-pulse">
      <div className="h-8 bg-stone-200 rounded-lg w-48" />
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        {[1,2,3,4].map(i => <div key={i} className="h-10 bg-stone-100 rounded-lg" />)}
      </div>
    </div>
  );
}
