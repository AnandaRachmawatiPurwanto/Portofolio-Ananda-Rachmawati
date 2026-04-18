// ============================================================
// MOCK DATA — ganti fetch functions ini dengan Supabase/PostgreSQL calls
// ============================================================

import type {
  Profile,
  Project,
  Experience,
  Skill,
  Certificate,
  Award,
} from "./types";

// ─── Profile ─────────────────────────────────────────────────
export const mockProfile: Profile = {
  name: "Ananda",
  tagline: "Fullstack Developer & UI/UX Designer",
  bio: `Hi, I'm Ananda — a passionate fullstack developer & UI/UX designer who loves crafting beautiful, 
  performant digital experiences. I specialise in building modern web apps with Next.js & TypeScript, 
  elegant iOS apps with SwiftUI, and thoughtful user interfaces designed in Figma. 
  I believe great software should feel as good as it looks.`,
  avatar: "/avatar.jpg",
  location: "Indonesia 🇮🇩",
  email: "ananda@email.com",
  github: "https://github.com/ananda",
  linkedin: "https://linkedin.com/in/ananda",
  dribbble: "https://dribbble.com/ananda",
};

// ─── Projects ────────────────────────────────────────────────
export const mockProjects: Project[] = [
  {
    id: "proj-001",
    title: "JournalTree",
    description:
      "Aplikasi journaling macOS dengan visualisasi pohon kenangan berbasis SpriteKit & SwiftUI.",
    longDescription:
      "JournalTree adalah aplikasi journaling unik di mana setiap entri jurnal tumbuh menjadi daun pada pohon digital. Dibangun dengan SwiftUI, SpriteKit, dan MVVM architecture, aplikasi ini memberikan pengalaman refleksi yang terapeutik dan visual.",
    techStack: ["SwiftUI", "Swift", "macOS", "iOS"],
    category: "iOS/macOS",
    featured: true,
    year: 2025,
    githubUrl: "https://github.com/ananda/journaltree",
  },
  {
    id: "proj-002",
    title: "Portfolio CMS",
    description:
      "Headless CMS personal berbasis Next.js, PostgreSQL, dan Supabase dengan admin dashboard.",
    longDescription:
      "Full-stack portfolio management system dengan REST API, autentikasi JWT, image upload ke Supabase Storage, dan admin panel yang dibangun dengan Next.js App Router dan Tailwind CSS.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS", "Prisma"],
    category: "Fullstack",
    featured: true,
    year: 2024,
    githubUrl: "https://github.com/ananda/portfolio-cms",
    liveUrl: "https://portfolio.ananda.dev",
  },
  {
    id: "proj-003",
    title: "E-Commerce Design System",
    description:
      "Design system komprehensif untuk platform e-commerce lokal dengan 80+ komponen Figma.",
    longDescription:
      "Merancang sistem desain dari nol menggunakan Figma Auto Layout, Variables, dan Tokens. Mencakup komponen UI, panduan tipografi, color system berbasis HSL, dan dokumentasi penggunaan komponen.",
    techStack: ["Figma", "TypeScript", "React", "Tailwind CSS"],
    category: "UI/UX",
    featured: true,
    year: 2024,
    liveUrl: "https://figma.com/file/sample",
  },
  {
    id: "proj-004",
    title: "Real-time Chat API",
    description:
      "Backend API chat real-time menggunakan Node.js, WebSocket, dan PostgreSQL.",
    longDescription:
      "RESTful API dengan WebSocket support untuk chat real-time. Fitur: room management, message history, typing indicators, dan read receipts. Deployed menggunakan Docker.",
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    category: "Fullstack",
    featured: false,
    year: 2023,
    githubUrl: "https://github.com/ananda/realtime-chat-api",
  },
];

// ─── Experience ──────────────────────────────────────────────
export const mockExperiences: Experience[] = [
  {
    id: "exp-001",
    company: "Tech Startup Indonesia",
    role: "Fullstack Developer & UI/UX Lead",
    type: "Full-time",
    startDate: "2024-01",
    endDate: "Present",
    description:
      "Memimpin tim kecil untuk membangun dan merancang platform SaaS B2B berbasis Next.js dan PostgreSQL.",
    achievements: [
      "Merancang ulang UI dashboard yang meningkatkan user retention sebesar 40%",
      "Membangun API backend dengan TypeScript & Prisma, mendukung 10.000+ pengguna aktif",
      "Implementasi CI/CD pipeline dengan GitHub Actions & Docker",
      "Membuat design system Figma yang digunakan seluruh tim produk",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Figma", "Docker"],
  },
  {
    id: "exp-002",
    company: "Digital Agency XYZ",
    role: "iOS Developer (Internship)",
    type: "Internship",
    startDate: "2023-06",
    endDate: "2023-12",
    description:
      "Mengembangkan fitur-fitur baru pada aplikasi iOS klien menggunakan SwiftUI dan Combine.",
    achievements: [
      "Mengimplementasikan onboarding flow baru yang menaikkan konversi 25%",
      "Integrasi API REST menggunakan async/await di Swift",
      "Refactor legacy UIKit codebase ke SwiftUI modern",
    ],
    techStack: ["SwiftUI", "Swift", "iOS"],
  },
  {
    id: "exp-003",
    company: "Freelance / Independent",
    role: "UI/UX Designer & Frontend Developer",
    type: "Freelance",
    startDate: "2022-01",
    endDate: "2023-05",
    description:
      "Merancang dan membangun website serta aplikasi mobile untuk klien UMKM hingga startup.",
    achievements: [
      "Menyelesaikan 15+ proyek desain UI/UX di Figma",
      "Membangun 8 website dengan React/Next.js",
      "Mempertahankan rating 5 bintang di platform freelance",
    ],
    techStack: ["Figma", "React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
];

// ─── Skills ──────────────────────────────────────────────────
export const mockSkills: Skill[] = [
  // UI/UX
  { id: "sk-001", name: "Figma", category: "UI/UX Design", proficiency: 5, yearsOfExperience: 3 },
  { id: "sk-002", name: "Design Systems", category: "UI/UX Design", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-003", name: "Prototyping", category: "UI/UX Design", proficiency: 4, yearsOfExperience: 3 },
  { id: "sk-004", name: "User Research", category: "UI/UX Design", proficiency: 3, yearsOfExperience: 2 },
  // Fullstack
  { id: "sk-005", name: "TypeScript", category: "Fullstack Web", proficiency: 5, yearsOfExperience: 3 },
  { id: "sk-006", name: "Next.js", category: "Fullstack Web", proficiency: 5, yearsOfExperience: 3 },
  { id: "sk-007", name: "React", category: "Fullstack Web", proficiency: 5, yearsOfExperience: 4 },
  { id: "sk-008", name: "Node.js", category: "Fullstack Web", proficiency: 4, yearsOfExperience: 3 },
  { id: "sk-009", name: "PostgreSQL", category: "Fullstack Web", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-010", name: "Supabase", category: "Fullstack Web", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-011", name: "Prisma", category: "Fullstack Web", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-012", name: "Tailwind CSS", category: "Fullstack Web", proficiency: 5, yearsOfExperience: 3 },
  // Apple
  { id: "sk-013", name: "SwiftUI", category: "Mobile / Apple", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-014", name: "Swift", category: "Mobile / Apple", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-015", name: "iOS Development", category: "Mobile / Apple", proficiency: 4, yearsOfExperience: 2 },
  { id: "sk-016", name: "macOS Development", category: "Mobile / Apple", proficiency: 3, yearsOfExperience: 1 },
  // DevOps
  { id: "sk-017", name: "Docker", category: "DevOps", proficiency: 3, yearsOfExperience: 2 },
  { id: "sk-018", name: "GitHub Actions", category: "DevOps", proficiency: 3, yearsOfExperience: 2 },
];

// ─── Certificates ────────────────────────────────────────────
export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    issueDate: "2024-03",
    credentialUrl: "https://coursera.org/verify/sample",
    category: "Fullstack Web",
  },
  {
    id: "cert-002",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2023-11",
    expiryDate: "2026-11",
    credentialId: "AWS-CCP-SAMPLE",
    credentialUrl: "https://aws.amazon.com/verify",
    category: "DevOps",
  },
  {
    id: "cert-003",
    title: "100 Days of SwiftUI",
    issuer: "Hacking with Swift",
    issueDate: "2023-08",
    credentialUrl: "https://hackingwithswift.com/certificate/sample",
    category: "Mobile / Apple",
  },
  {
    id: "cert-004",
    title: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    issueDate: "2022-12",
    credentialUrl: "https://coursera.org/verify/sample2",
    category: "UI/UX Design",
  },
  {
    id: "cert-005",
    title: "PostgreSQL: The Complete Developer's Guide",
    issuer: "Udemy",
    issueDate: "2023-05",
    category: "Fullstack Web",
  },
];

// ─── Awards ──────────────────────────────────────────────────
export const mockAwards: Award[] = [
  {
    id: "awd-001",
    title: "Juara 1 Hackathon UI/UX Nasional",
    issuer: "Kementerian Komunikasi & Informatika RI",
    date: "2024-08",
    description:
      "Memenangkan kompetisi hackathon nasional dengan solusi aplikasi kesehatan mental berbasis AI untuk remaja Indonesia.",
    category: "Competition",
  },
  {
    id: "awd-002",
    title: "Best Capstone Project — iOS Development Bootcamp",
    issuer: "Apple Developer Academy",
    date: "2023-12",
    description:
      "Penghargaan proyek terbaik untuk aplikasi JournalTree yang inovatif dalam kategori wellness & productivity.",
    category: "Academic",
  },
  {
    id: "awd-003",
    title: "Top 10 Finalist — Startup Weekend Indonesia",
    issuer: "Techstars",
    date: "2023-06",
    description:
      "Masuk 10 besar dari 80+ tim dengan pitch startup EdTech untuk pembelajaran pemrograman adaptif.",
    category: "Competition",
  },
];

// ============================================================
// ASYNC FETCH FUNCTIONS
// Ganti implementasi di bawah ini dengan Supabase/PostgreSQL calls
// Contoh: const { data } = await supabase.from('projects').select('*')
// ============================================================

export async function fetchProfile(): Promise<Profile> {
  // TODO: return await supabase.from('profile').select().single()
  await delay(100);
  return mockProfile;
}

export async function fetchProjects(): Promise<Project[]> {
  // TODO: return await supabase.from('projects').select().order('year', { ascending: false })
  await delay(100);
  return mockProjects;
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  await delay(100);
  return mockProjects.filter((p) => p.featured);
}

export async function fetchExperiences(): Promise<Experience[]> {
  // TODO: return await supabase.from('experiences').select().order('startDate', { ascending: false })
  await delay(100);
  return mockExperiences;
}

export async function fetchSkills(): Promise<Skill[]> {
  // TODO: return await supabase.from('skills').select().order('proficiency', { ascending: false })
  await delay(100);
  return mockSkills;
}

export async function fetchCertificates(): Promise<Certificate[]> {
  // TODO: return await supabase.from('certificates').select().order('issueDate', { ascending: false })
  await delay(100);
  return mockCertificates;
}

export async function fetchAwards(): Promise<Award[]> {
  // TODO: return await supabase.from('awards').select().order('date', { ascending: false })
  await delay(100);
  return mockAwards;
}

// ─── Utility ─────────────────────────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
