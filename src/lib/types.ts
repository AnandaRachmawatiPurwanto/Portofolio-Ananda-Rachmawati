// ============================================================
// PORTFOLIO TYPE DEFINITIONS
// Ganti mock fetch functions dengan API calls ke PostgreSQL/Supabase
// ============================================================

export type TechStack =
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Node.js"
  | "PostgreSQL"
  | "Supabase"
  | "SwiftUI"
  | "Swift"
  | "Figma"
  | "Tailwind CSS"
  | "Prisma"
  | "Docker"
  | "iOS"
  | "macOS"
  | "Python"
  | "Go"
  | string;

export type SkillCategory =
  | "UI/UX Design"
  | "Fullstack Web"
  | "Mobile / Apple"
  | "DevOps"
  | "Other";

// ─── Profil ────────────────────────────────────────────────
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  avatar: string; // URL or /public path
  location: string;
  email: string;
  github: string;
  linkedin: string;
  dribbble?: string;
}

// ─── Proyek ────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: TechStack[];
  category: "UI/UX" | "Fullstack" | "iOS/macOS" | "Other";
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
}

// ─── Pengalaman ─────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "Full-time" | "Internship" | "Freelance" | "Contract";
  startDate: string; // ISO format: "2023-06"
  endDate: string | "Present";
  description: string;
  achievements: string[];
  techStack: TechStack[];
  logoUrl?: string;
}

// ─── Keahlian ───────────────────────────────────────────────
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
  iconUrl?: string;
  yearsOfExperience?: number;
}

// ─── Sertifikat ─────────────────────────────────────────────
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // ISO format: "2024-03"
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  category: SkillCategory;
}

// ─── Penghargaan ─────────────────────────────────────────────
export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
}

// ─── Pendidikan ─────────────────────────────────────────────
export interface Education {
  id: string;
  institution: string;  // Nama sekolah/universitas
  degree: string;       // Jenjang: SD, SMP, SMA, S1, dst
  major?: string;       // Jurusan
  startYear: number;
  endYear?: number;     // kosong = masih berjalan
  description?: string;
  gpa?: number;
}

// ─── Modal content union type ────────────────────────────────
export type ModalType =
  | "about"
  | "portfolio"
  | "experience"
  | "certificates"
  | "awards"
  | "contact"
  | "skill"
  | "education"
  | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
}
