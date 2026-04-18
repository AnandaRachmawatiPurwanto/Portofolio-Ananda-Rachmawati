"use client";

import { useState, useEffect } from "react";
import type { Skill, SkillCategory } from "@/lib/types";
import FormModal, { Field, Input, Select } from "./FormModal";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus } from "lucide-react";

const CATEGORIES: SkillCategory[] = ["UI/UX Design", "Fullstack Web", "Mobile / Apple", "DevOps", "Other"];
const PROFICIENCY_LABELS = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];

const catColors: Record<SkillCategory, string> = {
  "UI/UX Design": "from-purple-200 to-pink-200 border-purple-200",
  "Fullstack Web": "from-blue-200 to-cyan-200 border-blue-200",
  "Mobile / Apple": "from-orange-200 to-amber-200 border-orange-200",
  DevOps: "from-green-200 to-teal-200 border-green-200",
  Other: "from-stone-200 to-gray-200 border-stone-200",
};

const emptyForm: Omit<Skill, "id"> = { name: "", category: "Fullstack Web", proficiency: 3, yearsOfExperience: 1 };

export default function SkillsPanel() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Omit<Skill, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () =>
    authFetch("/api/portfolio/skills").then(r => r.json()).then((d: Skill[]) => { setItems(d); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }));

  const openEdit = (item: Skill) => { setEditing(item); setForm({ name: item.name, category: item.category, proficiency: item.proficiency, yearsOfExperience: item.yearsOfExperience }); setIsOpen(true); };
  const openAdd = () => { setEditing(null); setForm(emptyForm); setIsOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus skill ini?")) return;
    await authFetch(`/api/portfolio/skills/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await authFetch(`/api/portfolio/skills/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await authFetch("/api/portfolio/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setIsOpen(false);
    load();
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(s => s.category === cat);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Skills</h2>
          <p className="text-stone-400 text-sm">{items.length} skill tersimpan</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 hover:brightness-110 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
          <Plus size={16} /><span>Tambah Skill</span>
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="space-y-5">
          {CATEGORIES.map(cat => {
            const catSkills = grouped[cat];
            if (!catSkills?.length) return null;
            return (
              <div key={cat} className="bg-white rounded-2xl border border-stone-200 p-5">
                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${catColors[cat]} border mb-4`}>
                  <span className="text-xs font-bold text-stone-700">{cat}</span>
                </div>
                <div className="space-y-3">
                  {catSkills.map(skill => (
                    <div key={skill.id} className="flex items-center gap-3 group">
                      <span className="text-sm font-medium text-stone-700 w-36 shrink-0 truncate">{skill.name}</span>
                      <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${(skill.proficiency / 5) * 100}%` }} />
                      </div>
                      <span className="text-xs text-stone-400 w-24 shrink-0">{PROFICIENCY_LABELS[skill.proficiency]}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(skill)} className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-stone-300 transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-stone-300 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <FormModal isOpen={isOpen} title={editing ? "Edit Skill" : "Tambah Skill"} onClose={() => setIsOpen(false)} onSave={handleSave} isSaving={saving}>
        <Field label="Nama Skill" required><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="TypeScript" /></Field>
        <Field label="Kategori">
          <Select value={form.category} onChange={e => set("category", e.target.value as SkillCategory)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label={`Proficiency — ${PROFICIENCY_LABELS[form.proficiency ?? 3]} (${form.proficiency}/5)`}>
          <input type="range" min={1} max={5} value={form.proficiency} onChange={e => set("proficiency", Number(e.target.value) as Skill["proficiency"])} className="w-full accent-amber-500" />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            {PROFICIENCY_LABELS.slice(1).map(l => <span key={l}>{l}</span>)}
          </div>
        </Field>
        <Field label="Tahun Pengalaman">
          <Input type="number" min={0} max={20} value={form.yearsOfExperience ?? ""} onChange={e => set("yearsOfExperience", Number(e.target.value))} placeholder="2" />
        </Field>
      </FormModal>
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-4 animate-pulse">{[1,2].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-stone-200" />)}</div>;
}
