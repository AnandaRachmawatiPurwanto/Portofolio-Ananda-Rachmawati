"use client";

import { useCertificates } from "@/hooks/usePortfolioData";
import type { SkillCategory } from "@/lib/types";

const categoryIcons: Partial<Record<SkillCategory, string>> = {
  "Fullstack Web": "🌐", "UI/UX Design": "🎨", "Mobile / Apple": "🍎", DevOps: "⚙️", Other: "📄",
};

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

export default function CertificatesContent() {
  const certificates = useCertificates();

  return (
    <div className="space-y-5">
      <p className="text-stone-500 text-sm">Sertifikasi yang saya raih sebagai bukti komitmen pada pembelajaran berkelanjutan.</p>
      <div className="grid gap-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="group flex gap-4 p-4 rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl border border-amber-200">
              {categoryIcons[cert.category] ?? "📄"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-stone-800 text-sm leading-tight">{cert.title}</h4>
              <p className="text-amber-600 text-xs font-semibold mt-0.5">{cert.issuer}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-stone-400">🗓 {formatDate(cert.issueDate)}</span>
                {cert.expiryDate && <span className="text-xs text-stone-400">→ {formatDate(cert.expiryDate)}</span>}
              </div>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                  🔗 Lihat Kredensial ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
        <span className="text-2xl">🎓</span>
        <p className="text-sm text-stone-600">
          <span className="font-bold text-amber-700">{certificates.length} sertifikat</span> diraih dari platform terkemuka.
        </p>
      </div>
    </div>
  );
}
