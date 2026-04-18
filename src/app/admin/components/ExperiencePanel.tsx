"use client";

import { useState, useEffect } from "react";
import type { Experience } from "@/lib/types";
import FormModal, { Field, Input, Textarea, Select } from "./FormModal";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type ExpForm = Omit<Experience, "id" | "techStack" | "achievements"> & {
  techStack: string;
  achievements: string[];
  isPresent: boolean;
};

const emptyForm: ExpForm = {
  company: "", role: "", type: "Full-time",
  startDate: "", endDate: "", isPresent: false,
  description: "", achievements: [""], techStack: "",
};

export default function ExperiencePanel() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<ExpForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    authFetch("/api/portfolio/experiences").then(r => r.json()).then((d: Experience[]) => { setItems(d); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = <K extends keyof ExpForm>(k: K, v: ExpForm[K]) => setForm(p => ({ ...p, [k]: v }));

  const openAdd = () => { setEditing(null); setForm(emptyForm); setIsOpen(true); };
  const openEdit = (item: Experience) => {
    setEditing(item);
    setForm({ ...item, techStack: item.techStack.join(", "), achievements: item.achievements.length ? item.achievements : [""], isPresent: item.endDate === "Present" });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengalaman ini?")) return;
    await authFetch(`/api/portfolio/experiences/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      endDate: form.isPresent ? "Present" : form.endDate,
      techStack: form.techStack.split(",").map(s => s.trim()).filter(Boolean),
      achievements: form.achievements.filter(Boolean),
    };
    if (editing) {
      await authFetch(`/api/portfolio/experiences/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await authFetch("/api/portfolio/experiences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setIsOpen(false);
    load();
  };

  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-100 text-green-700",
    Internship: "bg-blue-100 text-blue-700",
    Freelance: "bg-purple-100 text-purple-700",
    Contract: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Experience</h2>
          <p className="text-stone-400 text-sm">{items.length} pengalaman tersimpan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 hover:brightness-110 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
          <Plus size={16} /><span>Tambah</span>
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-amber-200 hover:shadow-sm transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-800">{item.role}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${typeColors[item.type] ?? ""}`}>{item.type}</span>
                  </div>
                  <p className="text-amber-600 font-semibold text-sm">{item.company}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{item.startDate} → {item.endDate}</p>
                  <p className="text-stone-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-stone-400 transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-stone-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal isOpen={isOpen} title={editing ? "Edit Experience" : "Tambah Experience"} onClose={() => setIsOpen(false)} onSave={handleSave} isSaving={saving}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Perusahaan" required><Input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Tech Startup Indonesia" /></Field>
          <Field label="Posisi" required><Input value={form.role} onChange={e => set("role", e.target.value)} placeholder="Fullstack Developer" /></Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Tipe">
            <Select value={form.type} onChange={e => set("type", e.target.value as Experience["type"])}>
              <option>Full-time</option><option>Internship</option><option>Freelance</option><option>Contract</option>
            </Select>
          </Field>
          <Field label="Mulai (YYYY-MM)"><Input value={form.startDate} onChange={e => set("startDate", e.target.value)} placeholder="2024-01" /></Field>
          <Field label="Selesai">
            <Input value={form.isPresent ? "Present" : form.endDate} onChange={e => set("endDate", e.target.value)} disabled={form.isPresent} placeholder="2025-06" />
          </Field>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isPresent} onChange={e => set("isPresent", e.target.checked)} className="w-4 h-4 accent-amber-500" />
          <span className="text-sm text-stone-600 font-medium">Masih bekerja di sini (Present)</span>
        </label>
        <Field label="Deskripsi"><Textarea value={form.description} onChange={e => set("description", e.target.value)} /></Field>
        <Field label="Pencapaian (klik + untuk tambah baris)">
          <div className="space-y-2">
            {form.achievements.map((ach, idx) => (
              <div key={idx} className="flex gap-2">
                <Input value={ach} onChange={e => {
                  const arr = [...form.achievements]; arr[idx] = e.target.value; set("achievements", arr);
                }} placeholder={`Pencapaian ${idx + 1}...`} />
                {form.achievements.length > 1 && (
                  <button onClick={() => set("achievements", form.achievements.filter((_, i) => i !== idx))} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors shrink-0"><X size={14} /></button>
                )}
              </div>
            ))}
            <button onClick={() => set("achievements", [...form.achievements, ""])} className="text-xs text-amber-600 font-semibold hover:text-amber-700 transition-colors">+ Tambah pencapaian</button>
          </div>
        </Field>
        <Field label="Tech Stack (pisah koma)"><Input value={form.techStack} onChange={e => set("techStack", e.target.value)} placeholder="Next.js, TypeScript, Figma" /></Field>
      </FormModal>
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-3 animate-pulse">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-stone-200" />)}</div>;
}
