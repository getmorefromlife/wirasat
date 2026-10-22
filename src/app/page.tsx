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
import { LibraryView } from "@/components/library/LibraryView";
import { Footer } from "@/components/layout/Footer";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { OnePageDashboard } from "@/components/dashboard/OnePageDashboard";

import { MobileCalculator } from "@/components/mobile/MobileCalculator";
import { KinshipWhiteboard } from "@/components/visuals/KinshipWhiteboard";

export default function Home() {
  const { activeView, setActiveView, language } = useInheritanceStore();
  const [forceDesktopOnMobile, setForceDesktopOnMobile] = React.useState(false);

  // Scroll to top on every view change — prevents browser from preserving
  // the previous page's scroll position when switching views in the SPA.
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  // Check if current view is a calculator/landing view
  const isCalculatorView = activeView === "home" || activeView === "wizard" || activeView === "dashboard";

  return (
    <>
      {/* 1. Mobile-First Experience (< 768px) */}
      {!forceDesktopOnMobile && isCalculatorView && (
        <div className="block md:hidden">
          <MobileCalculator onSwitchToDesktopMode={() => setForceDesktopOnMobile(true)} />
        </div>
      )}

      {/* 2. Desktop & Full Scholarly Views (>= 768px or forced/secondary views) */}
      <div
        className={`min-h-screen flex flex-col justify-between selection:bg-[var(--theme-gold)]/30 selection:text-[var(--theme-gold-light)] relative ${
          !forceDesktopOnMobile && isCalculatorView ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Mobile View Return Banner (when force desktop is active) */}
        {forceDesktopOnMobile && (
          <div className="md:hidden bg-theme-card-dark text-white border-b border-theme-card-dark px-4 py-2 text-xs flex items-center justify-between font-bold z-50">
            <span>{language === "ur" ? "ڈیسک ٹاپ موڈ فعال ہے" : "Desktop View Active"}</span>
            <button
              onClick={() => setForceDesktopOnMobile(false)}
              className="px-2.5 py-1 rounded-md bg-white/20 hover:bg-white/30 text-white cursor-pointer"
            >
              {language === "ur" ? "سادہ موبائل موڈ پر واپس جائیں" : "Back to Mobile Mode"}
            </button>
          </div>
        )}

        {/* Top Sacred Navigation */}
        <Navbar />

        {/* Global Scholarly Provenance & Fatwa Drawer */}
        <ProvenanceDrawer />

        {/* Global Wasiyyah (Testamentary Wills) Guide Drawer */}
        <WasiyyahGuideDrawer />

        {/* Landing Page Hero View */}
        {activeView === "home" && <HeroSection />}

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
          {activeView === "whiteboard" && <KinshipWhiteboard />}
          {activeView === "galaxy" && <div className="max-w-7xl mx-auto px-4 py-6"><KinshipGalaxy /></div>}
          {activeView === "glossary" && <GlossaryView />}
          {activeView === "library" && <LibraryView />}
        </main>

        {/* Sacred Footer with Scholarly Disclaimer */}
        <Footer />
      </div>
    </>
  );
}
