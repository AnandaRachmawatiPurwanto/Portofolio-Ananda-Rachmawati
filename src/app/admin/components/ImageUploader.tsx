"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Upload Foto/Gambar" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validasi ukuran max 4MB
    if (file.size > 4 * 1024 * 1024) {
      alert("Batas maksimal ukuran file adalah 4MB!");
      return;
    }

    setUploading(true);

    try {
      // Dapatkan token admin dari localStorage agar otorisasi tetap aman
      const token = localStorage.getItem("portfolio_admin_token") || "";

      // Panggil API route yang baru kita buat
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        let errorMsg = "Gagal mengunggah file.";
        try {
          const errData = await response.json();
          if (errData && errData.error) errorMsg = errData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const result = await response.json();
      
      // Jika berhasil, panggil onChange dengan URL HTTP balasan Vercel Blob
      if (result.url) {
        onChange(result.url);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengunggah gambar. Pastikan pengaturan Vercel Blob sudah benar.");
    } finally {
      setUploading(false);
      // Reset input value agar jika menghapus form, user bisa memilih file yang sama lagi
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-stone-700">{label}</span>
      
      {value ? (
        <div className="relative w-full overflow-hidden rounded-xl border border-stone-200 group bg-stone-50 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Uploaded image preview" 
            className="w-full h-32 object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange("")} // Menghapus gambar dari state
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Hapus Gambar"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className={`
          flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer
          transition-colors duration-200
          ${uploading ? "bg-amber-50 border-amber-300" : "bg-stone-50 border-stone-300 hover:bg-stone-100 hover:border-amber-400"}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 mb-3 text-amber-500 animate-spin" />
                <p className="text-sm text-amber-600 font-medium">Sedang Mengunggah...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 mb-3 text-stone-400" />
                <p className="mb-2 text-sm text-stone-600 font-medium">Klik untuk unggah foto</p>
                <p className="text-xs text-stone-400">PNG, JPG, WebP (Maks 4MB)</p>
              </>
            )}
          </div>
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept="image/*"
            disabled={uploading}
            onChange={handleFileChange} 
          />
        </label>
      )}
    </div>
  );
}
