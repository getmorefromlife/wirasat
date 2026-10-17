"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { FamilyTree } from "@/components/tree/FamilyTree";
import { AcademyView } from "@/components/academy/AcademyView";
import { MarjaMatrixView } from "@/components/matrix/MarjaMatrixView";
import { CertificateView } from "@/components/pdf/CertificateView";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";

export default function Home() {
  const { language, activeView } = useInheritanceStore();
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--theme-gold)]/30 selection:text-[var(--theme-gold-light)] relative">
      {/* Top Sacred Navigation */}
      <Navbar />

      {/* Hero Section Banner */}
      {activeView === "wizard" && <HeroSection />}

      {/* Dynamic View Mount */}
      <main className="flex-1 transition-opacity duration-300 relative z-10">
        {activeView === "wizard" && <WizardContainer />}
        {activeView === "tree" && <FamilyTree />}
        {activeView === "academy" && <AcademyView />}
        {activeView === "matrix" && <MarjaMatrixView />}
        {activeView === "certificate" && <CertificateView />}
      </main>

      {/* Sacred Footer */}
      <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-card)]/50 backdrop-blur-md py-10 mt-16 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="font-naskh text-base text-[var(--theme-gold)] font-bold tracking-wide" dir="rtl">
            قَالَ رَسُولُ اللَّهِ (ص): تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ فَإِنَّهَا نِصْفُ الْعِلْمِ
          </p>
          <p className="text-xs text-[var(--theme-text-muted)] italic max-w-xl mx-auto">
            &ldquo;Learn the laws of inheritance and teach them to the people, for indeed they are half of knowledge.&rdquo; — The Holy Prophet Muhammad (sawa)
          </p>
          <div className="pt-3 text-[11px] text-[var(--theme-text-muted)] flex flex-wrap items-center justify-center gap-3 border-t border-[var(--theme-border)]/50 max-w-lg mx-auto">
            <span className="font-bold text-[var(--theme-gold)]">Mīrāth al-Thaqalayn (میراثِ ثقلین)</span>
            <span>•</span>
            <span>Accredited Ja&apos;fari Jurisprudence Engine</span>
            <span>•</span>
            <span>Najaf al-Ashraf &amp; Qom al-Muqaddasa Codifications</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
