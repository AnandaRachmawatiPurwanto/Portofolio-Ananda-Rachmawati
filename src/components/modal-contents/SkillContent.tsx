"use client";

import { useSkills } from "@/hooks/usePortfolioData";
import type { SkillCategory } from "@/lib/types";

const proficiencyLabel: Record<number, string> = {
  1: "Beginner", 2: "Elementary", 3: "Intermediate", 4: "Advanced", 5: "Expert",
};

const categoryOrder: SkillCategory[] = ["UI/UX Design", "Fullstack Web", "Mobile / Apple", "DevOps"];

const categoryColors: Record<SkillCategory, string> = {
  "UI/UX Design": "from-purple-200 to-pink-200",
  "Fullstack Web": "from-blue-200 to-cyan-200",
  "Mobile / Apple": "from-orange-200 to-amber-200",
  DevOps: "from-green-200 to-teal-200",
  Other: "from-stone-200 to-gray-200",
};

export default function SkillContent() {
  const skills = useSkills();

  const skillsByCategory = categoryOrder.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat).sort((a, b) => b.proficiency - a.proficiency);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">⚡ Skills</h3>
        <div className="space-y-5">
          {categoryOrder.map(cat => {
            const catSkills = skillsByCategory[cat];
            if (!catSkills?.length) return null;
            return (
              <div key={cat}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[cat]} mb-3`}>
                  <span className="text-xs font-bold text-stone-700">{cat}</span>
                </div>
                <div className="space-y-2">
                  {catSkills.map(skill => (
                    <div key={skill.id} className="flex items-center gap-3">
                      {skill.iconUrl ? (
                        <div className="w-5 h-5 shrink-0 rounded bg-stone-50 border border-stone-200 flex items-center justify-center p-0.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      )}
                      <span className="text-xs text-stone-600 w-36 grow font-medium">{skill.name}</span>
                      <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-700" style={{ width: `${(skill.proficiency / 5) * 100}%` }} />
                      </div>
                      <span className="text-xs text-stone-400 w-24 shrink-0 text-right">{proficiencyLabel[skill.proficiency]}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
