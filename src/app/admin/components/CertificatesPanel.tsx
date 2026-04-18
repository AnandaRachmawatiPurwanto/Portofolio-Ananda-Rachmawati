"use client";

import { useState, useEffect } from "react";
import type { Certificate, SkillCategory } from "@/lib/types";
import FormModal, { Field, Input, Select } from "./FormModal";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus } from "lucide-react";

const CATEGORIES: SkillCategory[] = ["UI/UX Design", "Fullstack Web", "Mobile / Apple", "DevOps", "Other"];

const emptyForm: Omit<Certificate, "id"> = {
  title: "", issuer: "", issueDate: "", expiryDate: "", credentialId: "", credentialUrl: "", category: "Fullstack Web",
};

export default function CertificatesPanel() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState<Omit<Certificate, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    authFetch("/api/portfolio/certificates").then(r => r.json()).then((d: Certificate[]) => { setItems(d); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }));

  const openAdd = () => { setEditing(null); setForm(emptyForm); setIsOpen(true); };
  const openEdit = (item: Certificate) => { setEditing(item); setForm({ title: item.title, issuer: item.issuer, issueDate: item.issueDate, expiryDate: item.expiryDate ?? "", credentialId: item.credentialId ?? "", credentialUrl: item.credentialUrl ?? "", category: item.category }); setIsOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus sertifikat ini?")) return;
    await authFetch(`/api/portfolio/certificates/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await authFetch(`/api/portfolio/certificates/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await authFetch("/api/portfolio/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setIsOpen(false);
    load();
  };

  const catIcons: Partial<Record<SkillCategory, string>> = { "Fullstack Web": "🌐", "UI/UX Design": "🎨", "Mobile / Apple": "🍎", DevOps: "⚙️", Other: "📄" };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Certificates</h2>
          <p className="text-stone-400 text-sm">{items.length} sertifikat tersimpan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 hover:brightness-110 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
          <Plus size={16} /><span>Tambah</span>
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-4 hover:border-amber-200 hover:shadow-sm transition-all group flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-xl">
                {catIcons[item.category] ?? "📄"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-stone-800 text-sm leading-snug">{item.title}</h3>
                <p className="text-amber-600 text-xs font-semibold mt-0.5">{item.issuer}</p>
                <p className="text-stone-400 text-xs mt-0.5">🗓 {item.issueDate}{item.expiryDate ? ` → ${item.expiryDate}` : ""}</p>
              </div>
              <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-start">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-stone-400 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-stone-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal isOpen={isOpen} title={editing ? "Edit Sertifikat" : "Tambah Sertifikat"} onClose={() => setIsOpen(false)} onSave={handleSave} isSaving={saving}>
        <Field label="Judul Sertifikat" required><Input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Meta Front-End Developer Certificate" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Penerbit" required><Input value={form.issuer} onChange={e => set("issuer", e.target.value)} placeholder="Coursera / Google / Udemy" /></Field>
          <Field label="Kategori">
            <Select value={form.category} onChange={e => set("category", e.target.value as SkillCategory)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tanggal Terbit (YYYY-MM)" required><Input value={form.issueDate} onChange={e => set("issueDate", e.target.value)} placeholder="2024-03" /></Field>
          <Field label="Kedaluwarsa (YYYY-MM)"><Input value={form.expiryDate ?? ""} onChange={e => set("expiryDate", e.target.value)} placeholder="2027-03 (opsional)" /></Field>
        </div>
        <Field label="ID Kredensial (opsional)"><Input value={form.credentialId ?? ""} onChange={e => set("credentialId", e.target.value)} placeholder="ABC-XYZ-123" /></Field>
        <Field label="URL Verifikasi (opsional)"><Input type="url" value={form.credentialUrl ?? ""} onChange={e => set("credentialUrl", e.target.value)} placeholder="https://..." /></Field>
      </FormModal>
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-3 animate-pulse">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-stone-200" />)}</div>;
}
