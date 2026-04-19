"use client";

import { useProfile } from "@/hooks/usePortfolioData";

export default function AboutContent() {
  const profile = useProfile();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex items-start gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-4xl shadow-lg overflow-hidden border border-amber-300">
            {profile.avatar ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.png" alt={profile.name} className="w-full h-full object-cover" />
              </>
            ) : (
              <img src="/profile.png" alt={profile.name} className="w-full h-full object-cover" />

            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-stone-800">{profile.name}</h3>
          <p className="text-amber-600 font-medium text-sm mt-0.5">{profile.tagline}</p>
          <p className="text-stone-500 text-sm mt-1">📍 {profile.location}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100">
        <p className="text-stone-600 leading-relaxed text-sm">{profile.bio}</p>
      </div>

      {/* Contact Links */}
      <div>
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">Connect</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Email", value: profile.email, icon: "✉️", href: `mailto:${profile.email}` },
            { label: "GitHub", value: profile.github, icon: "🐙", href: profile.github },
            { label: "LinkedIn", value: profile.linkedin, icon: "💼", href: profile.linkedin },
            ...(profile.dribbble ? [{ label: "Dribbble", value: profile.dribbble, icon: "🏀", href: profile.dribbble }] : []),
          ].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-100 hover:border-amber-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-xs text-stone-400 font-medium">{item.label}</p>
                <p className="text-xs text-stone-700 font-semibold group-hover:text-amber-500 transition-colors break-all">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Fun facts */}
      <div>
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">Quick Facts</h4>
        <div className="flex flex-wrap gap-2">
          {["🎨 Design enthusiast", "🍎 Apple ecosystem fan", "📚 Lifelong learner", "🌏 Open to remote work"].map(f => (
            <span key={f} className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-stone-600 text-xs font-medium">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
