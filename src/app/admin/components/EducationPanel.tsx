"use client";

import { useState, useEffect } from "react";
import type { Education } from "@/lib/types";
import FormModal, { Field, Input, Textarea } from "./FormModal";
import { authFetch } from "@/lib/auth-client";
import { Pencil, Trash2, Plus } from "lucide-react";

const emptyForm: Omit<Education, "id"> = {
    institution: "",
    degree: "",
    major: "",
    startYear: new Date().getFullYear(),
    endYear: undefined,
    description: "",
    gpa: undefined,
};

export default function EducationPanel() {
    const [items, setItems] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState<Education | null>(null);
    const [form, setForm] = useState<Omit<Education, "id">>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        authFetch("/api/portfolio/education")
            .then((r) => r.json())
            .then((d: Education[]) => { setItems(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setIsOpen(true);
    };

    const openEdit = (item: Education) => {
        setEditing(item);
        setForm({
            institution: item.institution,
            degree: item.degree,
            major: item.major ?? "",
            startYear: item.startYear,
            endYear: item.endYear,
            description: item.description ?? "",
            gpa: item.gpa,
        });
        setIsOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const payload = {
            ...form,
            startYear: Number(form.startYear),
            endYear: form.endYear ? Number(form.endYear) : undefined,
            gpa: form.gpa ? Number(form.gpa) : undefined,
        };

        if (editing) {
            await authFetch(`/api/portfolio/education/${editing.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...editing, ...payload }),
            });
            setItems((prev) => prev.map((i) => (i.id === editing.id ? { id: editing.id, ...payload } : i)));
        } else {
            const res = await authFetch("/api/portfolio/education", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const newItem: Education = await res.json();
            setItems((prev) => [...prev, newItem]);
        }
        setSaving(false);
        setIsOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Hapus data pendidikan ini?")) return;
        setDeleting(id);
        await authFetch(`/api/portfolio/education/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((i) => i.id !== id));
        setDeleting(null);
    };

    const set = (key: keyof Omit<Education, "id">, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    if (loading) return <LoadingSkeleton />;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-stone-800">Pendidikan</h2>
                    <p className="text-stone-400 text-sm mt-0.5">Riwayat pendidikan formal kamu</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-stone-900 transition-all hover:brightness-110 active:scale-95"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
                >
                    <Plus size={16} /> Tambah
                </button>
            </div>

            {/* List */}
            {items.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                    <p className="text-4xl mb-3">🎓</p>
                    <p className="font-semibold">Belum ada data pendidikan</p>
                    <p className="text-sm mt-1">Klik &quot;Tambah&quot; untuk menambahkan</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-bold text-stone-800">{item.degree}{item.major ? ` — ${item.major}` : ""}</h4>
                                    </div>
                                    <p className="text-amber-600 text-sm font-semibold mt-0.5">{item.institution}</p>
                                    <p className="text-stone-500 text-xs mt-0.5">
                                        {item.startYear} – {item.endYear ?? "Sekarang"}
                                        {item.gpa ? ` · GPA ${item.gpa}` : ""}
                                    </p>
                                    {item.description && (
                                        <p className="text-stone-500 text-sm mt-2 leading-relaxed">{item.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition-colors">
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deleting === item.id}
                                        className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors disabled:opacity-40"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            <FormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={handleSave}
                title={editing ? "Edit Pendidikan" : "Tambah Pendidikan"}
                isSaving={saving}
            >
                <Field label="Institusi" required>
                    <Input value={form.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Universitas Diponegoro" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Jenjang" required>
                        <Input value={form.degree} onChange={(e) => set("degree", e.target.value)} placeholder="S1 / SMA / dst" />
                    </Field>
                    <Field label="Jurusan">
                        <Input value={form.major ?? ""} onChange={(e) => set("major", e.target.value)} placeholder="Teknik Informatika" />
                    </Field>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Field label="Tahun Masuk" required>
                        <Input type="number" value={String(form.startYear)} onChange={(e) => set("startYear", e.target.value)} placeholder="2020" />
                    </Field>
                    <Field label="Tahun Keluar">
                        <Input type="number" value={String(form.endYear ?? "")} onChange={(e) => set("endYear", e.target.value)} placeholder="2024" />
                    </Field>
                    <Field label="IPK / GPA">
                        <Input type="number" step="0.01" value={String(form.gpa ?? "")} onChange={(e) => set("gpa", e.target.value)} placeholder="3.75" />
                    </Field>
                </div>
                <Field label="Deskripsi">
                    <Textarea rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} placeholder="Ceritakan tentang pendidikanmu..." />
                </Field>
            </FormModal>
        </div>
    );
}

function LoadingSkeleton() {
    return <div className="space-y-3 animate-pulse">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-stone-200" />)}</div>;
}