// ============================================================
// SERVER-ONLY — only import this in API routes / server components
// ============================================================
import { promises as fs } from "fs";
import path from "path";
import type { Profile, Project, Experience, Skill, Certificate, Award, Education } from "./types";

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  certificates: Certificate[];
  awards: Award[];
  education: Education[];
}

export type ArrayEntityKey = "projects" | "experiences" | "skills" | "certificates" | "awards" | "education";

export const VALID_ENTITIES: ArrayEntityKey[] = [
  "projects",
  "experiences",
  "skills",
  "certificates",
  "awards",
  "education",
];

const DATA_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

// Helper untuk validasi environment variable
const getRedisUrl = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const getRedisToken = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

/** Read the portfolio database. */
export async function readDB(): Promise<PortfolioData> {
  const url = getRedisUrl();
  const token = getRedisToken();

  // Jika koneksi Redis ada (di Vercel), prioritas ambil dari database
  if (url && token) {
    try {
      const res = await fetch(`${url}/get/portfolioData`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      
      // Jika data ditemukan di Redis, maka parse dan kembalikan
      if (data && data.result) {
        return JSON.parse(data.result) as PortfolioData;
      }
    } catch (e) {
      console.error("Gagal membaca dari Redis:", e);
    }
  }

  // Jika Redis belum ada datanya atau berjalan di localhost tanpa env, baca file default JSON
  console.log("Fallback: Membaca file data default dari src/data/portfolio.json");
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

/** Persist the full portfolio database. */
export async function writeDB(data: PortfolioData): Promise<void> {
  const url = getRedisUrl();
  const token = getRedisToken();

  // Jika koneksi Redis ada (di Vercel production), simpan permanen ke awan
  if (url && token) {
    try {
      await fetch(`${url}/set/portfolioData`, {
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
        method: 'POST'
      });
      console.log("Berhasil menyimpan data ke Redis Vercel!");
      return; // Berhenti di sini, tidak perlu tulis ke file lokal
    } catch (e) {
      console.error("Gagal menyimpan ke Redis:", e);
    }
  }

  // Jika berjalan di lokal tanpa Redis, simpan ke file
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/** Generate a compact unique ID (no external dependency). */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
