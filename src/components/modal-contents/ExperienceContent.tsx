"use client";

import { useExperiences } from "@/hooks/usePortfolioData";

const typeColors: Record<string, string> = {
  "Full-time": "bg-green-100 text-green-700",
  Internship: "bg-blue-100 text-blue-700",
  Freelance: "bg-purple-100 text-purple-700",
  Contract: "bg-orange-100 text-orange-700",
};

function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

export default function ExperienceContent() {
  const experiences = useExperiences();

  return (
    <div className="space-y-5">
      <p className="text-stone-500 text-sm">Perjalanan profesional saya dalam dunia teknologi dan desain.</p>
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-orange-200 to-transparent" />
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative flex gap-5">
              <div className="relative shrink-0 z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-md overflow-hidden ${idx === 0 ? "bg-amber-400" : "bg-white border-2 border-amber-200"}`}>
                  {exp.logoUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain p-1" />
                    </>
                  ) : (
                    idx === 0 ? "⭐" : "💼"
                  )}
                </div>
              </div>
              <div className="flex-1 pb-2">
                <div className="p-5 rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="font-bold text-stone-800 text-base">{exp.role}</h4>
                      <p className="text-amber-600 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${typeColors[exp.type]}`}>{exp.type}</span>
                      <span className="text-xs text-stone-400">{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm mt-2 mb-3 leading-relaxed">{exp.description}</p>
                  <ul className="space-y-1.5 mb-3">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <span className="text-amber-500 mt-0.5 shrink-0">✦</span><span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
