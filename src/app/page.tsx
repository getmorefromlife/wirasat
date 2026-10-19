"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { FamilyTree } from "@/components/tree/FamilyTree";
import { AcademyView } from "@/components/academy/AcademyView";
import { MarjaMatrixView } from "@/components/matrix/MarjaMatrixView";
import { VisualChartsStudio } from "@/components/visuals/VisualChartsStudio";
import { KinshipGalaxy } from "@/components/visuals/KinshipGalaxy";
import { GlossaryView } from "@/components/glossary/GlossaryView";
import { ProvenanceDrawer } from "@/components/provenance/ProvenanceDrawer";
import { WasiyyahGuideDrawer } from "@/components/wasiyyah/WasiyyahGuideDrawer";
import { WasiyyahView } from "@/components/wasiyyah/WasiyyahView";
import { Footer } from "@/components/layout/Footer";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { OnePageDashboard } from "@/components/dashboard/OnePageDashboard";

export default function Home() {
  const { activeView, language } = useInheritanceStore();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--theme-gold)]/30 selection:text-[var(--theme-gold-light)] relative">
      {/* Top Sacred Navigation */}
      <Navbar />

      {/* Global Scholarly Provenance & Fatwa Drawer */}
      <ProvenanceDrawer />

      {/* Global Wasiyyah (Testamentary Wills) Guide Drawer */}
      <WasiyyahGuideDrawer />

      {/* Hero Section Banner */}
      {activeView === "wizard" && <HeroSection />}

      {/* Dynamic View Mount */}
      <main className="flex-1 w-full transition-opacity duration-300 relative z-10">
        {activeView === "wizard" && <WizardContainer />}
        {activeView === "dashboard" && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <OnePageDashboard />
          </div>
        )}
        {activeView === "wasiyyah" && <WasiyyahView />}
        {activeView === "tree" && <FamilyTree />}
        {activeView === "academy" && <AcademyView />}
        {activeView === "matrix" && <MarjaMatrixView />}
        {activeView === "visuals" && <VisualChartsStudio />}
        {activeView === "galaxy" && <div className="max-w-7xl mx-auto px-4 py-6"><KinshipGalaxy /></div>}
        {activeView === "glossary" && <GlossaryView />}
      </main>

      {/* Sacred Footer with Scholarly Disclaimer */}
      <Footer />
    </div>
  );
}
