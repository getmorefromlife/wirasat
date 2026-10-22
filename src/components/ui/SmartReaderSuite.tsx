"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  ChevronUp,
  ChevronDown,
  List,
  X,
  ArrowUp,
  CheckCircle2,
  Compass,
  Bookmark,
  Sparkles,
} from "lucide-react";

export interface ReaderSection {
  id: string;
  labelEn: string;
  labelUr: string;
  badgeEn?: string;
  badgeUr?: string;
}

interface SmartReaderSuiteProps {
  titleEn: string;
  titleUr: string;
  sections: ReaderSection[];
  language: "en" | "ur";
  onSectionSelect?: (sectionId: string) => void;
  offsetY?: number; // default: 100px
}

export const SmartReaderSuite: React.FC<SmartReaderSuiteProps> = ({
  titleEn,
  titleUr,
  sections,
  language,
  onSectionSelect,
  offsetY = 100,
}) => {
  const isUr = language === "ur";
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id || ""
  );
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [showFloatingPill, setShowFloatingPill] = useState<boolean>(false);

  const ribbonRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // 1. Scroll-Spy and Progress Bar calculation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // A. Calculate overall document scroll progress
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));

          // Show floating pill once user scrolls past 180px
          setShowFloatingPill(scrollTop > 180);

          // B. Detect active section
          let currentId = sections[0]?.id || "";
          for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // If the top of the element has reached near the top offset
              if (rect.top <= offsetY + 80) {
                currentId = section.id;
              }
            }
          }
          setActiveSectionId(currentId);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offsetY]);

  // 2. Auto-scroll the active chip into view inside the sticky ribbon
  useEffect(() => {
    if (activeBtnRef.current && ribbonRef.current) {
      const ribbon = ribbonRef.current;
      const btn = activeBtnRef.current;
      const ribbonRect = ribbon.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // If button is outside ribbon view, scroll ribbon container smoothly
      if (btnRect.left < ribbonRect.left || btnRect.right > ribbonRect.right) {
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeSectionId]);

  // 3. Smooth scroll jump helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offsetY;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
      setActiveSectionId(id);
      if (onSectionSelect) onSectionSelect(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find index of current section
  const currentIndex = sections.findIndex((s) => s.id === activeSectionId);
  const activeSection = sections[currentIndex] || sections[0];

  const jumpPrev = () => {
    if (currentIndex > 0) {
      scrollTo(sections[currentIndex - 1].id);
    } else {
      scrollToTop();
    }
  };

  const jumpNext = () => {
    if (currentIndex < sections.length - 1) {
      scrollTo(sections[currentIndex + 1].id);
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. JEWEL READING PROGRESS BAR (FIXED AT TOP OF SCREEN)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-stone-200/50 dark:bg-stone-800 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--theme-brand)] via-[var(--theme-radiant-gold)] to-[var(--theme-brand)] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STICKY HORIZONTAL RIBBON
          ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label={isUr ? "فہرست مضامین" : "Table of contents"}
        className="w-full bg-[#FAF8F5]/95 dark:bg-[#0B1713]/95 backdrop-blur-md border-y border-[#245642]/20 shadow-2xs py-2 px-3 sticky top-14 z-20"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {/* Quick Toc Toggle button */}
          <button
            type="button"
            onClick={() => setIsTocOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-card-dark text-white text-xs font-bold shadow-xs hover:bg-theme-card-dark-hover transition-all cursor-pointer shrink-0"
            title={isUr ? "مکمل فہرستِ ابواب" : "Full Table of Contents"}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isUr ? "فہرست (ToC)" : "Chapters"}
            </span>
          </button>

          {/* Horizontally Scrollable Pills Ribbon */}
          <div
            ref={ribbonRef}
            className="flex-1 overflow-x-auto flex items-center gap-1.5 no-scrollbar scroll-smooth py-0.5"
          >
            {sections.map((section, idx) => {
              const isActive = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  ref={isActive ? activeBtnRef : null}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    isActive
                      ? "bg-theme-card-dark text-white border-theme-card-dark shadow-xs"
                      : "bg-white dark:bg-[#12251e] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-theme-chip hover:text-theme-brand"
                  } ${isUr ? "font-nastaliq leading-[2]" : ""}`}
                >
                  <span className="opacity-70 text-[10px] mr-1 inline-block">
                    {idx + 1}.
                  </span>
                  {isUr ? section.labelUr : section.labelEn}
                </button>
              );
            })}
          </div>

          {/* Reading Percent Pill in Ribbon */}
          <div className="shrink-0 px-2.5 py-1 rounded-md bg-theme-chip border border-theme-chip text-theme-brand text-[11px] font-extrabold tabular-nums">
            {scrollProgress}%
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          3. FLOATING QUICK-NAV COMPANION PILL (BOTTOM CORNER / MOBILE DOCK)
          ───────────────────────────────────────────────────────────── */}
      {showFloatingPill && (
        <aside
          aria-label={isUr ? "فوری رہنمائی" : "Quick navigation"}
          className="fixed bottom-5 z-40 animate-in fade-in slide-in-from-bottom-4 duration-200 transition-all ltr:right-4 rtl:left-4 max-w-[calc(100vw-2rem)]"
        >
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-[#0B1713]/95 backdrop-blur-md border border-[#245642]/30 shadow-2xl text-stone-800 dark:text-stone-200">
            {/* Previous Section Jump Button */}
            <button
              type="button"
              onClick={jumpPrev}
              disabled={currentIndex <= 0}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-[#245642] dark:hover:text-emerald-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title={isUr ? "پچھلا باب (↑)" : "Previous Section (↑)"}
              aria-label="Previous section"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Current Section & Progress Info (Click opens ToC Drawer) */}
            <button
              type="button"
              onClick={() => setIsTocOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-all cursor-pointer text-left rtl:text-right max-w-[200px] sm:max-w-[260px] truncate"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#245642] dark:text-emerald-400 shrink-0" />
              <div className="flex flex-col truncate">
                <span
                  className={`text-xs font-bold text-[#0A2118] dark:text-[#F0FDF4] truncate ${
                    isUr ? "font-nastaliq leading-[1.8]" : ""
                  }`}
                >
                  {isUr ? activeSection?.labelUr : activeSection?.labelEn}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1">
                  <span>
                    {isUr
                      ? `حصہ ${currentIndex + 1} از ${sections.length}`
                      : `Part ${currentIndex + 1} of ${sections.length}`}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                    {scrollProgress}%
                  </span>
                </span>
              </div>
            </button>

            {/* Next Section Jump Button */}
            <button
              type="button"
              onClick={jumpNext}
              disabled={currentIndex >= sections.length - 1}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-[#245642] dark:hover:text-emerald-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title={isUr ? "اگلا باب (↓)" : "Next Section (↓)"}
              aria-label="Next section"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="h-5 w-px bg-stone-200 dark:bg-stone-800 mx-0.5" />

            {/* Jump to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-[#245642] dark:hover:text-emerald-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-all cursor-pointer"
              title={isUr ? "صفحے کے آغاز پر جائیں (Top)" : "Back to Top"}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. TABLE OF CONTENTS DRAWER / MODAL
          ───────────────────────────────────────────────────────────── */}
      {isTocOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="toc-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsTocOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] bg-[#FAF8F5] dark:bg-[#0B1713] border-2 border-[#245642]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-900 dark:text-stone-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            dir={isUr ? "rtl" : "ltr"}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-theme-subtle flex items-center justify-between bg-white dark:bg-[#12251e]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-theme-card-dark text-white flex items-center justify-center shadow-xs">
                  <Compass className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3
                    id="toc-title"
                    className={`text-base sm:text-lg font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4] ${
                      isUr ? "font-nastaliq leading-[2]" : ""
                    }`}
                  >
                    {isUr ? titleUr : titleEn}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {isUr
                      ? `کل ${sections.length} ابواب • مطالعہ کی پیش رفت: ${scrollProgress}%`
                      : `${sections.length} Sections • Reading Progress: ${scrollProgress}%`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTocOpen(false)}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reading Progress Visual inside Modal */}
            <div className="px-5 py-3 bg-theme-chip border-b border-theme-chip flex items-center justify-between text-xs font-semibold text-theme-brand">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--theme-radiant-gold)]" />
                <span>{isUr ? "شعبہ جاتی فہرست" : "Guided Reading Outline"}</span>
              </span>
              <span className="tabular-nums font-bold">
                {scrollProgress}% {isUr ? "مکمل" : "read"}
              </span>
            </div>

            {/* Sections List */}
            <div className="p-3 overflow-y-auto space-y-1.5 max-h-[55vh]">
              {sections.map((section, idx) => {
                const isActive = section.id === activeSectionId;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      scrollTo(section.id);
                      setIsTocOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                      isActive
                        ? "bg-theme-card-dark text-white border-theme-card-dark shadow-sm font-bold"
                        : "bg-white dark:bg-[#12251e] border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-theme-brand/50 hover:bg-theme-chip"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-amber-400 text-stone-900"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex flex-col truncate">
                        <span
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            isUr ? "font-nastaliq leading-[2.1]" : ""
                          }`}
                        >
                          {isUr ? section.labelUr : section.labelEn}
                        </span>
                        {(section.badgeUr || section.badgeEn) && (
                          <span
                            className={`text-[10px] ${
                              isActive
                                ? "text-emerald-200"
                                : "text-stone-500 dark:text-stone-400"
                            }`}
                          >
                            {isUr ? section.badgeUr : section.badgeEn}
                          </span>
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  scrollToTop();
                  setIsTocOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isUr ? "بالکل اوپر جائیں" : "Back to Top"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsTocOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-theme-card-dark text-white font-bold hover:bg-theme-card-dark-hover transition-all cursor-pointer shadow-xs"
              >
                {isUr ? "بند کریں" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
