"use client";

import { useEducation } from "@/hooks/usePortfolioData";

export default function EducationContent() {
    const education = useEducation();

    return (
        <div className="space-y-4">
            <p className="text-stone-500 text-sm">
                Riwayat pendidikan formal yang pernah saya tempuh.
            </p>
            {education.length === 0 && (
                <div className="text-center py-10 text-stone-400">
                    <p className="text-3xl mb-2">🎓</p>
                    <p className="text-sm">Belum ada data pendidikan.</p>
                </div>
            )}
            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id} className="group p-5 rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-stone-800 text-base">
                                    {edu.degree}{edu.major ? ` — ${edu.major}` : ""}
                                </h4>
                                <p className="text-amber-600 text-sm font-semibold mt-0.5">{edu.institution}</p>
                            </div>
                            <span className="text-xs text-stone-400 shrink-0 mt-1">
                                {edu.startYear} – {edu.endYear ?? "Sekarang"}
                            </span>
                        </div>
                        {edu.gpa && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                                GPA {edu.gpa}
                            </span>
                        )}
                        {edu.description && (
                            <p className="text-stone-500 text-sm leading-relaxed mt-3">{edu.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}