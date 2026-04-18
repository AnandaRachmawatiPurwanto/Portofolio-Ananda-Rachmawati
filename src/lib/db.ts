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

/** Read the portfolio database. */
export async function readDB(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

/** Persist the full portfolio database. */
export async function writeDB(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/** Generate a compact unique ID (no external dependency). */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
