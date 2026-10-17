"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Sparkles,
  BookOpen,
  Scale,
  ShieldCheck,
  FileCheck,
  Compass,
  GitFork,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { language, setActiveView, setWizardStep } = useInheritanceStore();
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-[var(--theme-border)]/60">
      {/* Background Ambient Lighting & Arabesque Grid */}
      <div className="absolute inset-0 islamic-pattern pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--theme-gold)]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Sacred Calligraphic Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--theme-gold)]/10 border border-[var(--theme-gold)]/30 backdrop-blur-md shadow-lg shadow-[var(--theme-gold)]/5">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-gold)] animate-pulse" />
          <span className="font-naskh text-sm md:text-base text-[var(--theme-gold-light)] font-bold tracking-wider" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • فِقْهُ الْمَوَارِيثِ
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--theme-gold)] animate-pulse" />
        </div>

        {/* Grand Title */}
        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase">
            <span className="gold-gradient-text">
              {language === "ur" ? "میراثِ ثقلین" : "MĪRĀTH AL-THAQALAYN"}
            </span>
          </h1>
          <p className="font-naskh text-lg sm:text-2xl text-[var(--theme-text-secondary)] font-medium">
            {language === "ur"
              ? "مکتبِ اہلِ بیت علیہم السلام کے مطابق فقہ المواریث کا جامع و مستند نظام"
              : "The Shia Inheritance Engine & Academy"}
          </p>
          <p className="max-w-3xl mx-auto text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
            {language === "ur"
              ? "قرآن و سنت، کتبِ اربعہ اور معاصر مراجعِ عظام (آیۃ اللہ سیستانی، خامنہ ای، خوئی، مکارم اور بشیر نجفی) کے فتاویٰ کے عین مطابق ترکہ کی شرعی تقسیم، بطلانِ عول و تعصیب، اور سرکاری سند کا اجراء۔"
              : "Infallible Ja'fari estate distribution engine codifying the rulings of contemporary Grand Ayatollahs (Sistani, Khamenei, Khoei, Makarem, Najafi) with mathematical proofs, interactive genealogical trees, and Sharia certificates."}
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setActiveView("wizard");
              setWizardStep(1);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black font-bold text-xs sm:text-sm shadow-xl shadow-[var(--theme-gold)]/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{language === "ur" ? "شرعی تقسیم شروع کریں" : "Calculate Inheritance Now"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            onClick={() => setActiveView("tree")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-card)] hover:bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] text-xs sm:text-sm font-semibold text-[var(--theme-text-primary)] transition-all shadow-md"
          >
            <GitFork className="w-4 h-4 text-[var(--theme-gold)]" />
            <span>{language === "ur" ? "شجرۂ نسب دیکھیں" : "Interactive Family Tree"}</span>
          </button>

          <button
            onClick={() => setActiveView("matrix")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-card)] hover:bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] text-xs sm:text-sm font-semibold text-[var(--theme-text-primary)] transition-all shadow-md"
          >
            <Scale className="w-4 h-4 text-[var(--theme-gold)]" />
            <span>{language === "ur" ? "پانچوں مراجع کا موازنہ" : "Compare 5 Marāji‘"}</span>
          </button>
        </div>

        {/* 4 Sacred Pillars Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-xs">
          <div className="p-3 rounded-xl bg-[var(--theme-card)]/60 border border-[var(--theme-border)]/60 flex items-center gap-2.5 text-start">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">Zero Ta‘ṣīb &amp; ‘Awl</span>
              <span className="text-[10px] text-[var(--theme-text-muted)]">Ahl al-Bayt Infallibility</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--theme-card)]/60 border border-[var(--theme-border)]/60 flex items-center gap-2.5 text-start">
            <Scale className="w-5 h-5 text-[var(--theme-gold)] shrink-0" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">5 Marāji‘ Differentials</span>
              <span className="text-[10px] text-[var(--theme-text-muted)]">Widow Land &amp; Ḥabwah</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--theme-card)]/60 border border-[var(--theme-border)]/60 flex items-center gap-2.5 text-start">
            <GitFork className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">3 Tabaqāt Mind-Map</span>
              <span className="text-[10px] text-[var(--theme-text-muted)]">Live Ḥujub al-Ḥirmān</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--theme-card)]/60 border border-[var(--theme-border)]/60 flex items-center gap-2.5 text-start">
            <FileCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">Official Certificate</span>
              <span className="text-[10px] text-[var(--theme-text-muted)]">High-Res Bilingual PDF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
