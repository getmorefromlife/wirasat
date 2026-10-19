"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TOP_10_DESIGN_SYSTEMS, DesignSystemId } from "@/types/designs";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { FamilyTree } from "@/components/tree/FamilyTree";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
import {
  Sparkles,
  Check,
  ArrowLeft,
  ArrowRight,
  Palette,
  Layers,
  Scale,
  ShieldCheck,
  Eye,
  Sliders,
  ExternalLink,
  Laptop,
} from "lucide-react";

export default function DesignsShowcasePage() {
  const {
    activeDesignSystem,
    setDesignSystem,
    language,
    deceased,
    getCalculationResult,
  } = useInheritanceStore();

  const [previewTab, setPreviewTab] = useState<"calculator" | "tree">("calculator");
  const activeSpec =
    TOP_10_DESIGN_SYSTEMS.find((d) => d.id === activeDesignSystem) ||
    TOP_10_DESIGN_SYSTEMS[0];

  return (
    <div className="min-h-screen text-[var(--theme-text-primary)] transition-colors duration-300 pb-20">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--theme-overlay)] border-b border-[var(--theme-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--theme-gold)] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{language === "ur" ? "مرکزی ویب سائٹ" : "Back to App"}</span>
            </Link>
            <div className="h-4 w-[1px] bg-[var(--theme-border)] hidden sm:block" />
            <Link href="/" className="hidden sm:flex items-center gap-2 hover:opacity-90 transition-opacity">
              <WirasatLogo variant="icon" color="emerald" size="sm" />
              <span className="font-serif font-bold text-sm text-[var(--theme-text-primary)]">Wirasat</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-[var(--theme-text-muted)]">
              Active Design:
            </span>
            <span className="font-bold px-3 py-1 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
              {activeSpec.name}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--theme-gold)]/10 border border-[var(--theme-gold)]/30 text-xs font-bold text-[var(--theme-gold)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Global Benchmark Studio (10 World-Class Styles)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight">
          <span className="gold-gradient-text">World-Class Inheritance UI/UX Showcase</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
          Explore the world&apos;s 10 foremost inheritance and estate planning design architectures—spanning premier US legal-tech (<strong>Trust &amp; Will</strong>), enterprise wealth telemetry (<strong>Vanilla Estate</strong>), British Scandinavian minimalism (<strong>Farewill</strong>), Rabbinic Halachic jurisprudence (<strong>Beth Din</strong>), biblical Christian legacy stewardship (<strong>NCF</strong>), British High Chancery, and architectural contemporary luxury.
        </p>

        <p className="text-xs text-[var(--theme-text-muted)] font-mono">
          Click any design below to transform the live interactive application in real-time.
        </p>
      </section>

      {/* 10 DESIGN TILES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOP_10_DESIGN_SYSTEMS.map((spec, index) => {
            const isSelected = activeDesignSystem === spec.id;
            return (
              <div
                key={spec.id}
                onClick={() => setDesignSystem(spec.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "sacred-card-active border-2 border-[var(--theme-gold)] ring-2 ring-[var(--theme-gold)]/30 shadow-xl"
                    : "sacred-card hover:border-[var(--theme-gold)]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-mono font-bold text-[var(--theme-gold)]">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--theme-card-subtle)] text-[var(--theme-text-muted)]">
                      {spec.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">
                    {spec.name}
                  </h3>

                  <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 line-clamp-2">
                    {spec.inspiration}
                  </p>

                  {/* Color Palette Swatches */}
                  <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[var(--theme-border)]/60">
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: spec.palette.bg }}
                      title={`Background: ${spec.palette.bg}`}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: spec.palette.card }}
                      title={`Card: ${spec.palette.card}`}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: spec.palette.primary }}
                      title={`Primary: ${spec.palette.primary}`}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: spec.palette.accent }}
                      title={`Accent: ${spec.palette.accent}`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                      : "sacred-card text-[var(--theme-text-secondary)] hover:text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Active Style</span>
                    </>
                  ) : (
                    <span>Preview Style</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTIVE DESIGN SPECIFICATION HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="sacred-card p-6 sm:p-8 rounded-3xl border-2 border-[var(--theme-gold)]/50 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--theme-border)] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
                  {activeSpec.category}
                </span>
                <span className="text-xs text-[var(--theme-text-muted)] font-mono">
                  Style #{TOP_10_DESIGN_SYSTEMS.findIndex((d) => d.id === activeSpec.id) + 1} of 10
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)]">
                {activeSpec.name}
              </h2>
              <p className="text-sm font-semibold text-[var(--theme-gold)]">
                &ldquo;{activeSpec.tagline}&rdquo;
              </p>
              <p className="text-xs text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
                {activeSpec.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black font-bold text-xs sm:text-sm shadow-xl shadow-[var(--theme-gold)]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Apply as App Design</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Key Architectural Philosophy Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {activeSpec.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-start gap-2.5"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[var(--theme-text-secondary)] font-medium leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE SANDBOX PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-[var(--theme-gold)]">
              Live Interactive Engine Preview in &ldquo;{activeSpec.name}&rdquo;
            </h3>
          </div>

          {/* Preview View Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl sacred-card text-xs">
            <button
              onClick={() => setPreviewTab("calculator")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                previewTab === "calculator"
                  ? "bg-[var(--theme-gold)] text-black"
                  : "text-[var(--theme-text-secondary)] hover:text-white"
              }`}
            >
              Interactive Calculator
            </button>
            <button
              onClick={() => setPreviewTab("tree")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                previewTab === "tree"
                  ? "bg-[var(--theme-gold)] text-black"
                  : "text-[var(--theme-text-secondary)] hover:text-white"
              }`}
            >
              Family Tree
            </button>
          </div>
        </div>

        {/* Live Container */}
        <div className="rounded-3xl border-2 border-[var(--theme-gold)]/40 p-4 sm:p-6 bg-[var(--theme-bg)] shadow-2xl">
          {previewTab === "calculator" ? (
            <WizardContainer />
          ) : (
            <FamilyTree />
          )}
        </div>
      </section>
    </div>
  );
}
