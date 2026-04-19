"use client";

import { useProjects } from "@/hooks/usePortfolioData";

const categoryColors: Record<string, string> = {
  "UI/UX": "bg-purple-100 text-purple-700",
  Fullstack: "bg-blue-100 text-blue-700",
  "iOS/macOS": "bg-orange-100 text-orange-700",
  Other: "bg-stone-100 text-stone-700",
};

export default function PortfolioContent() {
  const projects = useProjects();

  return (
    <div className="space-y-6">
      {/* <p className="text-stone-500 text-sm">
        Beberapa proyek yang pernah saya bangun — dari UI/UX Design hingga Fullstack & iOS Development.
      </p> */}
      <div className="space-y-6">
        {projects.map((project) => (
          // 👇 PERUBAHAN 1: Tambahkan flex flex-col sm:flex-row di sini
          <div key={project.id} className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">

            {project.imageUrl && (
              // 👇 PERUBAHAN 2: Lebar diset 40% (sm:w-2/5) untuk desktop. 
              // Tinggi diset min-h-[12rem] agar proporsional sejajar dengan teks
              <div className="w-full sm:w-2/5 h-48 sm:h-auto min-h-[12rem] flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-stone-100 bg-stone-50 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  // Gambar tetap object-contain dan ukurannya aman tidak terpotong
                  className="w-auto h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* 👇 PERUBAHAN 3: Bagian teks sekarang otomatis mengisi sisa ruang (kanan) */}
            <div className="p-5 sm:p-6 flex flex-col w-full">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-stone-800 text-base sm:text-lg">{project.title}</h4>
                    {project.featured && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">⭐ Featured</span>}
                  </div>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${categoryColors[project.category] || categoryColors.Other}`}>{project.category}</span>
                </div>
                <span className="text-xs text-stone-400 shrink-0">{project.year}</span>
              </div>

              <p className="text-stone-500 text-sm leading-relaxed mb-4">{project.longDescription || project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2 py-1 rounded-md bg-stone-50 border border-stone-200 text-stone-600 text-xs font-mono">{tech}</span>
                ))}
              </div>

              {/* 👇 mt-auto memastikan link/tombol selalu rapi nempel di bagian bawah card */}
              <div className="flex gap-4 mt-auto pt-2">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">🔗 Live Demo</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-stone-500 hover:text-stone-700 transition-colors">🐙 Source Code</a>}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}