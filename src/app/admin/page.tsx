"use client";

import { useState } from "react";
import PinGuard from "./components/PinGuard";
import Sidebar from "./components/Sidebar";
import ProfilePanel from "./components/ProfilePanel";
import ProjectsPanel from "./components/ProjectsPanel";
import ExperiencePanel from "./components/ExperiencePanel";
import SkillsPanel from "./components/SkillsPanel";
import CertificatesPanel from "./components/CertificatesPanel";
import AwardsPanel from "./components/AwardsPanel";
import EducationPanel from "./components/EducationPanel";

type Tab = "profile" | "projects" | "experiences" | "skills" | "certificates" | "awards" | "education";

const PANEL_TITLES: Record<Tab, string> = {
  profile: "Profile",
  projects: "Projects",
  experiences: "Experience",
  skills: "Skills",
  certificates: "Certificates",
  awards: "Awards",
  education: "Education",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const handleSignOut = () => {
    localStorage.removeItem("portfolio_admin_auth");
    window.location.reload();
  };

  const renderPanel = () => {
    switch (activeTab) {
      case "profile": return <ProfilePanel />;
      case "projects": return <ProjectsPanel />;
      case "experiences": return <ExperiencePanel />;
      case "skills": return <SkillsPanel />;
      case "certificates": return <CertificatesPanel />;
      case "awards": return <AwardsPanel />;
      case "education": return <EducationPanel />;
    }
  };

  return (
    <PinGuard>
      <div className="flex h-screen overflow-hidden bg-stone-100">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onSignOut={handleSignOut} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="shrink-0 px-8 py-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                <span>Admin</span>
                <span>›</span>
                <span className="text-amber-600 font-semibold">{PANEL_TITLES[activeTab]}</span>
              </div>
              <h1 className="text-2xl font-bold text-stone-800">{PANEL_TITLES[activeTab]}</h1>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Live Data</span>
            </div>
          </header>

          {/* Scrollable Panel Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {renderPanel()}
          </div>
        </main>
      </div>
    </PinGuard>
  );
}
