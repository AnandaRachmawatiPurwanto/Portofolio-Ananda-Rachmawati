"use client";

import { useProfile } from "@/hooks/usePortfolioData";

export default function ContactContent() {
  const { email, github, linkedin, dribbble } = useProfile();

  const links = [
    { label: "Email", icon: "✉️", value: email, href: `mailto:${email}`, description: "Drop me an email anytime", color: "from-orange-100 to-amber-100 border-amber-200" },
    { label: "GitHub", icon: "🐙", value: github.replace("https://", ""), href: github, description: "Check out my side projects", color: "from-stone-100 to-gray-100 border-stone-200" },
    { label: "LinkedIn", icon: "💼", value: linkedin.replace("https://", ""), href: linkedin, description: "Let's connect professionally", color: "from-blue-100 to-sky-100 border-blue-200" },
    ...(dribbble ? [{ label: "Dribbble", icon: "🏀", value: dribbble.replace("https://", ""), href: dribbble, description: "See my design work", color: "from-pink-100 to-rose-100 border-pink-200" }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <div className="text-5xl mb-3">👋</div>
        <h3 className="text-xl font-bold text-stone-800">Let&apos;s Work Together</h3>
        <p className="text-stone-500 text-sm mt-2 max-w-sm mx-auto">
          Saya terbuka untuk kolaborasi, project freelance, atau sekadar ngobrol soal tech & design.
        </p>
      </div>
      <div className="grid gap-3">
        {links.map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${link.color} border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>
            <span className="text-2xl">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wide">{link.label}</p>
              <p className="text-stone-700 font-bold text-sm truncate">{link.value}</p>
              <p className="text-stone-400 text-xs mt-0.5">{link.description}</p>
            </div>
            <span className="text-stone-300 group-hover:text-amber-500 transition-colors text-lg">→</span>
          </a>
        ))}
      </div>
      <div className="text-center text-xs text-stone-400 pt-2">Response time: usually within 24 hours 🕐</div>
    </div>
  );
}
