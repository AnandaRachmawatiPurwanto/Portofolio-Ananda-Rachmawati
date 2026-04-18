"use client";

import { useState, useEffect } from "react";
import type { Profile, Project, Experience, Skill, Certificate, Award, Education } from "@/lib/types";

export const defaultProfile: Profile = {
  name: "",
  tagline: "",
  bio: "",
  avatar: "",
  location: "",
  email: "",
  github: "",
  linkedin: "",
};

async function apiFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function useProfile() {
  const [data, setData] = useState<Profile>(defaultProfile);
  useEffect(() => {
    apiFetch<Profile>("/api/portfolio/profile").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    apiFetch<Project[]>("/api/portfolio/projects").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useExperiences() {
  const [data, setData] = useState<Experience[]>([]);
  useEffect(() => {
    apiFetch<Experience[]>("/api/portfolio/experiences").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useSkills() {
  const [data, setData] = useState<Skill[]>([]);
  useEffect(() => {
    apiFetch<Skill[]>("/api/portfolio/skills").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useCertificates() {
  const [data, setData] = useState<Certificate[]>([]);
  useEffect(() => {
    apiFetch<Certificate[]>("/api/portfolio/certificates").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useAwards() {
  const [data, setData] = useState<Award[]>([]);
  useEffect(() => {
    apiFetch<Award[]>("/api/portfolio/awards").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}

export function useEducation() {
  const [data, setData] = useState<Education[]>([]);
  useEffect(() => {
    apiFetch<Education[]>("/api/portfolio/education").then((d) => {
      if (d) setData(d);
    });
  }, []);
  return data;
}
