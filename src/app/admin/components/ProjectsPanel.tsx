"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/lib/types";
import FormModal, { Field, Input, Textarea, Select } from "./FormModal";
import ImageUploader from "./ImageUploader";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus } from "lucide-react";

type ProjectForm = Omit<Project, "id" | "techStack"> & { techStack: string };

const emptyForm: ProjectForm = {
  title: "", description: "", longDescription: "", techStack: "",
  category: "Fullstack", featured: false, year: new Date().getFullYear(),
  liveUrl: "", githubUrl: "", imageUrl: "",
};

export default function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    authFetch("/api/portfolio/projects").then(r => r.json()).then((d: Project[]) => { setItems(d); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = <K extends keyof ProjectForm>(k: K, v: ProjectForm[K]) =>
    setForm(p => ({ ...p, [k]: v }));

  const openAdd = () => { setEditing(null); setForm(emptyForm); setIsOpen(true); };
  const openEdit = (item: Project) => {
    setEditing(item);
    setForm({ ...item, techStack: item.techStack.join(", "), liveUrl: item.liveUrl ?? "", githubUrl: item.githubUrl ?? "", imageUrl: item.imageUrl ?? "" });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus project ini?")) return;
    await authFetch(`/api/portfolio/projects/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, techStack: form.techStack.split(",").map(s => s.trim()).filter(Boolean) };
    if (editing) {
      await authFetch(`/api/portfolio/projects/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await authFetch("/api/portfolio/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setIsOpen(false);
    load();
  };

  const categoryColors: Record<string, string> = {
    "UI/UX": "bg-purple-100 text-purple-700",
    Fullstack: "bg-blue-100 text-blue-700",
    "iOS/macOS": "bg-orange-100 text-orange-700",
    Other: "bg-stone-100 text-stone-600",
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Projects</h2>
          <p className="text-stone-400 text-sm">{items.length} project tersimpan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 hover:brightness-110 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
          <Plus size={16} /><span>Tambah Project</span>
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-amber-200 hover:shadow-sm transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-stone-800">{item.title}</h3>
                    {item.featured && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">⭐ Featured</span>}
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${categoryColors[item.category] ?? ""}`}>{item.category}</span>
                    <span className="text-xs text-stone-400">{item.year}</span>
                  </div>
                  <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.techStack.slice(0, 5).map(t => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-stone-50 border border-stone-200 text-stone-600 font-mono">{t}</span>
                    ))}
                    {item.techStack.length > 5 && <span className="text-xs text-stone-400">+{item.techStack.length - 5}</span>}
                  </div>
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

      <FormModal isOpen={isOpen} title={editing ? "Edit Project" : "Tambah Project"} onClose={() => setIsOpen(false)} onSave={handleSave} isSaving={saving}>
        <Field label="Judul" required><Input value={form.title} onChange={e => set("title", e.target.value)} placeholder="JournalTree" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kategori" required>
            <Select value={form.category} onChange={e => set("category", e.target.value as Project["category"])}>
              <option>UI/UX</option><option>Fullstack</option><option>iOS/macOS</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Tahun" required>
            <Input type="number" value={form.year} onChange={e => set("year", Number(e.target.value))} min={2000} max={2030} />
          </Field>
        </div>
        <Field label="Deskripsi Singkat" required><Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Deskripsi singkat project..." /></Field>
        <Field label="Deskripsi Panjang"><Textarea rows={4} value={form.longDescription ?? ""} onChange={e => set("longDescription", e.target.value)} placeholder="Penjelasan lebih detail..." /></Field>
        <Field label="Tech Stack (pisah dengan koma)"><Input value={form.techStack} onChange={e => set("techStack", e.target.value)} placeholder="Next.js, TypeScript, Tailwind CSS" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Live URL"><Input type="url" value={form.liveUrl ?? ""} onChange={e => set("liveUrl", e.target.value)} placeholder="https://..." /></Field>
          <Field label="GitHub URL"><Input type="url" value={form.githubUrl ?? ""} onChange={e => set("githubUrl", e.target.value)} placeholder="https://github.com/..." /></Field>
        </div>
        
        {/* Fitur Upload Gambar (Vercel Blob) */}
        <ImageUploader 
          value={form.imageUrl ?? ""} 
          onChange={(url) => set("imageUrl", url)} 
        />

        <label className="flex items-center gap-3 cursor-pointer mt-2">
          <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-amber-500 rounded" />
          <span className="text-sm font-medium text-stone-700">Tandai sebagai Featured</span>
        </label>
      </FormModal>
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-3 animate-pulse">{[1,2,3].map(i => <div key={i} className="h-28 bg-white rounded-2xl border border-stone-200" />)}</div>;
}
