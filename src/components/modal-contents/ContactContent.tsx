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
      {/* Margin dan ukuran teks disesuaikan untuk HP dan Desktop */}
      <div className="text-center py-2 sm:py-4">
        <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">👋</div>
        <h3 className="text-lg sm:text-xl font-bold text-stone-800">Let&apos;s Work Together</h3>
        <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-sm sm:max-w-md mx-auto leading-relaxed px-4">
          I&apos;m currently open for new opportunities. Whether you have a project in mind, want to collaborate, or just want to connect, feel free to reach out through any of the links below!
        </p>
      </div>

      {/* 1 Kolom di HP (grid-cols-1), 2 Kolom di Desktop (sm:grid-cols-2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {links.map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            // Padding lebih kecil di HP (p-3), kembali lega di Desktop (sm:p-4)
            className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${link.color} border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>

            {/* shrink-0 memastikan ikon tidak terhimpit menjadi gepeng */}
            <span className="text-xl sm:text-2xl shrink-0">{link.icon}</span>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-stone-500 font-semibold uppercase tracking-wide">{link.label}</p>
              {/* Teks value bisa terpotong rapi dengan truncate jika layarnya benar-benar sempit */}
              <p className="text-stone-700 font-bold text-xs sm:text-sm truncate">{link.value}</p>
              <p className="text-stone-400 text-[10px] sm:text-xs mt-0.5 truncate sm:whitespace-normal">{link.description}</p>
            </div>

            <span className="text-stone-300 group-hover:text-amber-500 transition-colors text-base sm:text-lg shrink-0">→</span>
          </a>
        ))}
      </div>

      <div className="text-center text-[10px] sm:text-xs text-stone-400 pt-2">
        Response time: usually within 24 hours 🕐
      </div>
    </div>
  );
}