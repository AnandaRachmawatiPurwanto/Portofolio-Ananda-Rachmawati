"use client";

import { useCertificates } from "@/hooks/usePortfolioData";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

export default function CertificatesContent() {
  const certificates = useCertificates();

  return (
    <div className="space-y-5">
      <div className="grid gap-5">
        {certificates.map((cert) => (
          // 👇 Card Wrapper: flex-col untuk HP, sm:flex-row untuk layar besar
          <div key={cert.id} className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">

            {/* ── BAGIAN KIRI (GAMBAR SERTIFIKAT) ── */}
            {cert.imageUrl && (
              // 👇 PERUBAHAN: Lebar dikecilkan jadi 1/3 (sm:w-1/3), tinggi disesuaikan (h-40), dan padding ditambah (p-6)
              <div className="w-full sm:w-1/5 h-30 sm:h-auto flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-stone-100 bg-stone-50 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.imageUrl}
                  alt={`Sertifikat ${cert.title}`}
                  // object-contain agar sertifikat utuh tidak terpotong
                  className="w-auto h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* ── BAGIAN KANAN (TEKS) ── */}
            {/* Jika tidak ada gambar, div ini akan otomatis mengambil full width dengan rapi */}
            <div className="p-5 sm:p-6 flex flex-col justify-center w-full">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-stone-800 text-base sm:text-lg leading-tight">{cert.title}</h4>
                <p className="text-amber-600 text-sm font-semibold mt-1.5">{cert.issuer}</p>
              </div>

              {/* Tanggal Sertifikat */}
              <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
                <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1.5 rounded-md">
                  🗓 {formatDate(cert.issueDate)}
                </span>
                {cert.expiryDate && (
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1.5 rounded-md">
                    Berlaku s/d: {formatDate(cert.expiryDate)}
                  </span>
                )}
              </div>

              {/* Tombol Kredensial di bagian paling bawah */}
              <div className="mt-auto pt-2">
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                    🔗 Lihat Kredensial ↗
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}