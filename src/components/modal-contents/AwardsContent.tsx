"use client";

import { useAwards, useSkills } from "@/hooks/usePortfolioData";
import type { SkillCategory } from "@/lib/types";


const categoryOrder: SkillCategory[] = ["UI/UX Design", "Fullstack Web", "Mobile / Apple", "DevOps"];

const categoryColors: Record<SkillCategory, string> = {
  "UI/UX Design": "from-purple-200 to-pink-200",
  "Fullstack Web": "from-blue-200 to-cyan-200",
  "Mobile / Apple": "from-orange-200 to-amber-200",
  DevOps: "from-green-200 to-teal-200",
  Other: "from-stone-200 to-gray-200",
};

export default function AwardsContent() {
  const awards = useAwards();
  return (
    <div className="space-y-7">
      {/* Awards */}
      <div>
        {/* <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">🏆 Penghargaan</h3> */}
        <div className="space-y-3">
          {awards.map(award => (
            <div key={award.id} className="p-4 rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center text-lg shadow-sm">🥇</div>
                <div>
                  <h4 className="font-bold text-stone-800 text-sm">{award.title}</h4>
                  <p className="text-amber-600 text-xs font-medium">{award.issuer}</p>
                  <p className="text-stone-500 text-xs mt-1 leading-relaxed">{award.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
    </div>
  );
}
