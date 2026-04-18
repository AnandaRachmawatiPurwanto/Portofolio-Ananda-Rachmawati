"use client";

import { useState, useEffect } from "react";
import type { Award } from "@/lib/types";
import FormModal, { Field, Input, Textarea } from "./FormModal";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus } from "lucide-react";

const emptyForm: Omit<Award, "id"> = { title: "", issuer: "", date: "", description: "", category: "Competition" };

export default function AwardsPanel() {
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Award | null>(null);
  const [form, setForm] = useState<Omit<Award, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    authFetch("/api/portfolio/awards").then(r => r.json()).then((d: Award[]) => { setItems(d); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }));

  const openAdd = () => { setEditing(null); setForm(emptyForm); setIsOpen(true); };
  const openEdit = (item: Award) => { setEditing(item); setForm({ title: item.title, issuer: item.issuer, date: item.date, description: item.description, category: item.category }); setIsOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus penghargaan ini?")) return;
    await authFetch(`/api/portfolio/awards/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await authFetch(`/api/portfolio/awards/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await authFetch("/api/portfolio/awards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setIsOpen(false);
    load();
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Awards</h2>
          <p className="text-stone-400 text-sm">{items.length} penghargaan tersimpan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 hover:brightness-110 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
          <Plus size={16} /><span>Tambah</span>
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-amber-200 hover:shadow-sm transition-all group flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-200 border border-amber-200 flex items-center justify-center text-xl">
                🏆
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-stone-800 text-sm">{item.title}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-xs font-medium">{item.category}</span>
                </div>
                <p className="text-amber-600 text-xs font-semibold mt-0.5">{item.issuer}</p>
                <p className="text-stone-500 text-xs mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-start">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-stone-400 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-stone-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal isOpen={isOpen} title={editing ? "Edit Award" : "Tambah Award"} onClose={() => setIsOpen(false)} onSave={handleSave} isSaving={saving}>
        <Field label="Judul Penghargaan" required><Input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Juara 1 Hackathon Nasional" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Pemberi" required><Input value={form.issuer} onChange={e => set("issuer", e.target.value)} placeholder="Kominfo RI" /></Field>
          <Field label="Tanggal (YYYY-MM)" required><Input value={form.date} onChange={e => set("date", e.target.value)} placeholder="2024-08" /></Field>
        </div>
        <Field label="Kategori"><Input value={form.category} onChange={e => set("category", e.target.value)} placeholder="Competition / Academic / Other" /></Field>
        <Field label="Deskripsi"><Textarea rows={4} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Ceritakan tentang penghargaan ini..." /></Field>
      </FormModal>
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-3 animate-pulse">{[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-stone-200" />)}</div>;
}
