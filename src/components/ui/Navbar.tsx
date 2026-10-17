"use client";

import React, { useEffect } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Compass,
  GitFork,
  GraduationCap,
  Scale,
  FileText,
  Languages,
  Palette,
  Type,
  Moon,
  Sun,
  Scroll,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    language,
    theme,
    fontScale,
    fontStyle,
    activeView,
    setLanguage,
    setTheme,
    setFontScale,
    setFontStyle,
    setActiveView,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];

  // Sync document root on mount
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      language === "ur" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-font-scale", fontScale);
  }, [language, theme, fontScale]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--theme-overlay)] border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Sacred Bar */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--theme-border)]/50 text-xs text-[var(--theme-gold)]">
          <div className="flex items-center gap-2">
            <span className="font-naskh text-sm tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <span className="hidden sm:inline text-[var(--theme-text-muted)]">|</span>
            <span className="hidden sm:inline text-[var(--theme-text-secondary)] font-medium">
              {t.tagline}
            </span>
          </div>

          {/* Quick Accessibility & Theme Controller Pill */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center rounded-full p-0.5 bg-[var(--theme-card)] border border-[var(--theme-border)]">
              <button
                onClick={() => setTheme("emerald")}
                title={t.themeEmerald}
                className={`p-1.5 rounded-full transition-all ${
                  theme === "emerald"
                    ? "bg-[#062319] text-[#d4af37] ring-1 ring-[#d4af37]"
                    : "text-[var(--theme-text-muted)] hover:text-white"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 border border-emerald-400" />
              </button>
              <button
                onClick={() => setTheme("obsidian")}
                title={t.themeObsidian}
                className={`p-1.5 rounded-full transition-all ${
                  theme === "obsidian"
                    ? "bg-[#0b0f17] text-sky-400 ring-1 ring-sky-400"
                    : "text-[var(--theme-text-muted)] hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme("parchment")}
                title={t.themeParchment}
                className={`p-1.5 rounded-full transition-all ${
                  theme === "parchment"
                    ? "bg-[#efe9dc] text-amber-900 ring-1 ring-amber-700"
                    : "text-[var(--theme-text-muted)] hover:text-amber-800"
                }`}
              >
                <Scroll className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Scale Pill */}
            <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-0.5 bg-[var(--theme-card)] border border-[var(--theme-border)]">
              <Type className="w-3 h-3 text-[var(--theme-text-muted)]" />
              {(["small", "normal", "large", "scholar"] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => setFontScale(scale)}
                  className={`px-1.5 py-0.5 text-[10px] rounded uppercase font-semibold transition-colors ${
                    fontScale === scale
                      ? "bg-[var(--theme-gold)] text-black"
                      : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                  }`}
                >
                  {scale === "scholar" ? "Sch" : scale[0]}
                </button>
              ))}
            </div>

            {/* 10 World-Class Design Studio Link */}
            <a
              href="/designs"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black font-bold text-xs shadow-md shadow-[var(--theme-gold)]/20 hover:brightness-110 transition-all"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>10 Design Styles</span>
            </a>

            {/* Urdu / English Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-gold)]/10 hover:bg-[var(--theme-gold)]/20 border border-[var(--theme-gold)]/30 text-[var(--theme-gold)] font-medium transition-all"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className={language === "en" ? "font-nastaliq text-xs" : "font-jakarta text-xs"}>
                {language === "en" ? "اردو" : "English"}
              </span>
            </button>
          </div>
        </div>

        {/* Main Header & View Navigation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Logo & Sacred Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--theme-gold)] to-[var(--theme-gold-dark)] flex items-center justify-center shadow-lg shadow-[var(--theme-gold)]/10 text-black font-cinzel font-bold text-xl border border-[var(--theme-gold-light)]/50">
              م
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-lg md:text-xl font-bold tracking-wider text-[var(--theme-gold)]">
                  {language === "ur" ? "میراثِ ثقلین" : "MĪRĀTH AL-THAQALAYN"}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
                  Ja&apos;fari
                </span>
              </div>
              <p className="text-xs text-[var(--theme-text-secondary)] font-medium">
                {language === "ur"
                  ? "فقہ المواریث بحوالہ اہلِ بیتِ رسول (ع)"
                  : "The Shia Inheritance Engine & Academy"}
              </p>
            </div>
          </div>

          {/* View Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveView("wizard")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeView === "wizard"
                  ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                  : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text-primary)]"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t.navWizard}</span>
            </button>

            <button
              onClick={() => setActiveView("tree")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeView === "tree"
                  ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                  : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text-primary)]"
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>{t.navTree}</span>
            </button>

            <button
              onClick={() => setActiveView("academy")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeView === "academy"
                  ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                  : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text-primary)]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.navAcademy}</span>
            </button>

            <button
              onClick={() => setActiveView("matrix")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeView === "matrix"
                  ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                  : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text-primary)]"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{t.navMatrix}</span>
            </button>

            <button
              onClick={() => setActiveView("certificate")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeView === "certificate"
                  ? "bg-[var(--theme-gold)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                  : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text-primary)]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.navCertificate}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
