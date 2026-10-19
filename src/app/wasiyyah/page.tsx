"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { WasiyyahView } from "@/components/wasiyyah/WasiyyahView";
import { Footer } from "@/components/layout/Footer";
import { ProvenanceDrawer } from "@/components/provenance/ProvenanceDrawer";
import { WasiyyahGuideDrawer } from "@/components/wasiyyah/WasiyyahGuideDrawer";
import { useInheritanceStore } from "@/store/useInheritanceStore";

export default function WasiyyahPage() {
  const { setActiveView } = useInheritanceStore();

  useEffect(() => {
    setActiveView("wasiyyah");
  }, [setActiveView]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--theme-gold)]/30 selection:text-[var(--theme-gold-light)] relative">
      <Navbar />
      <ProvenanceDrawer />
      <WasiyyahGuideDrawer />
      <main className="flex-1 w-full">
        <WasiyyahView />
      </main>
      <Footer />
    </div>
  );
}
