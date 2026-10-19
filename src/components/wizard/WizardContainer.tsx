"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
import { Step1Marja } from "./Step1Marja";
import { Step2BalanceSheet } from "./Step2BalanceSheet";
import { Step3ImpedimentsHabwah } from "./Step3ImpedimentsHabwah";
import { Step4Relatives } from "./Step4Relatives";
import { Step5Results } from "./Step5Results";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookMarked,
  Check,
  Compass,
  FileCheck,
  Award,
  BookOpen,
  LayoutDashboard,
  SlidersHorizontal,
} from "lucide-react";
import { ScenarioCaseStoryCard } from "./ScenarioCaseStoryCard";
import { OnePageDashboard } from "@/components/dashboard/OnePageDashboard";

export const WizardContainer: React.FC = () => {
  const {
    language,
    wizardStep,
    setWizardStep,
    calculatorMode,
    setCalculatorMode,
    resetAll,
    loadPreset,
    isSample,
    activePresetId,
    setActiveView,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const stepperRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  // Automatically keep user anchored at the calculator whenever step changes
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      stepperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => clearTimeout(timer);
  }, [wizardStep]);

  const steps = [
    { num: 1, title: t.step1Title, subtitle: "Marja‘" },
    { num: 2, title: t.step2Title, subtitle: "Balance Sheet" },
    { num: 3, title: t.step3Title, subtitle: "Habwah & Impediments" },
    { num: 4, title: t.step4Title, subtitle: "Relatives & Tiers" },
    { num: 5, title: t.step5Title, subtitle: "Distribution Result" },
  ];

  return (
    <div id="calculator-workspace" className="calculator-workspace max-w-5xl mx-auto px-4 py-8 space-y-6 scroll-mt-6">
      {/* Top Breadcrumb: Return to Home */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#245642]">
          <button
            type="button"
            onClick={() => setActiveView("home")}
            className="text-stone-500 hover:text-[#245642] transition-colors cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === "ur" ? "مرکزی صفحہ پر واپسی" : "Back to Home"}</span>
          </button>
          <span className="text-stone-300">/</span>
          <span className="text-[#245642] font-extrabold flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#245642]" />
            <span>
              {language === "ur"
                ? "حسابِ وراثت (مرحلہ وار رہنمائی)"
                : "Inheritance Calculator (Step-by-Step)"}
            </span>
          </span>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#edf3e7] text-[#245642] border border-[#c4d4be]">
          {language === "ur" ? `مرحلہ ${wizardStep} از ۵` : `Step ${wizardStep} of 5`}
        </span>
      </div>

      {/* Dual Mode Switcher: 5-Step Guided Wizard vs All-in-One Dashboard */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-[#edf3e7] border border-[#c4d4be] shadow-xs">
        <div className="flex items-center gap-2 px-2 text-xs font-bold text-[#245642]">
          <SlidersHorizontal className="w-4 h-4 text-[#245642]" />
          <span>{language === "ur" ? "طرزِ حساب منتخب فرمائیں:" : "Calculator Display Mode:"}</span>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCalculatorMode("wizard")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              calculatorMode === "wizard"
                ? "bg-[#245642] text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-[#52735a] border border-[#c4d4be]"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{language === "ur" ? "مرحلہ وار گائیڈ (۵ مراحل)" : "Guided 5-Step Wizard"}</span>
          </button>

          <button
            type="button"
            onClick={() => setCalculatorMode("dashboard")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              calculatorMode === "dashboard"
                ? "bg-[#245642] text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-[#52735a] border border-[#c4d4be]"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{language === "ur" ? "جامع یک صفحاتی ڈیش بورڈ" : "All-in-One Dashboard"}</span>
          </button>
        </div>
      </div>

      {/* Render All-in-One Dashboard Mode */}
      {calculatorMode === "dashboard" ? (
        <OnePageDashboard />
      ) : (
        /* Render 5-Step Guided Wizard Mode */
        <>
      {/* Top Banner: Scenario Presets & Reset */}
      <div className="sacred-card p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[var(--theme-gold)] to-[var(--theme-gold-dark)] flex items-center justify-center text-white font-bold shadow-md shadow-[var(--theme-gold)]/20 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--theme-gold)] flex items-center gap-1.5">
              <span>
                {language === "ur"
                  ? "المرشد المرحلی (رہنمائے حساب)"
                  : "Al-Murshid al-Marḥalī (Step-by-Step Guided Wizard)"}
              </span>
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)]">
              {language === "ur"
                ? "مرحلہ وار شرعی حساب کتاب اور قرآنی حصص کا نفاذ"
                : "Step-by-step estate liquidation and Quranic share execution"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative self-end sm:self-auto">
          {/* Preset Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetDropdown(!showPresetDropdown)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-gold)]/10 hover:bg-[var(--theme-gold)]/20 border border-[var(--theme-gold)]/40 text-sm font-bold text-[var(--theme-gold)] transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-gold)]" />
              <span>{language === "ur" ? "نمونۂ کیسز دیکھیں (۵ کیسز)" : "Browse 5 Sample Scenarios"}</span>
            </button>

            {showPresetDropdown && (
              <div className="absolute top-full end-0 mt-2 w-[min(28rem,calc(100vw-3rem))] rounded-2xl sacred-card p-3 z-50 space-y-2 shadow-2xl border border-[var(--theme-gold)]/50 bg-white">
                <div className="flex items-center justify-between px-2 py-1 text-xs font-bold uppercase tracking-wider text-[var(--theme-gold)] border-b border-[var(--theme-border)]/60 pb-1.5 mb-1">
                  <span>{language === "ur" ? "۵ حقیقی فقہی مثالیں (Real Fiqh Cases)" : "5 Real-World Shia Inheritance Cases"}</span>
                  <span className="text-[11px] text-[var(--theme-text-muted)]">{language === "ur" ? "کلک کر کے لوڈ کریں" : "Click to Load"}</span>
                </div>
                {SCENARIO_PRESETS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      loadPreset(p.id);
                      setShowPresetDropdown(false);
                    }}
                    className={`w-full text-start p-3 rounded-xl transition-all text-xs space-y-1 border cursor-pointer ${
                      activePresetId === p.id
                        ? "bg-[#edf3e7] border-[#245642]"
                        : "hover:bg-stone-50 border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#245642] text-white flex items-center justify-center text-[10px] font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-[#172e22] block text-sm">
                        {language === "ur" ? p.titleUr : p.titleEn}
                      </span>
                    </div>
                    <span className="text-stone-600 line-clamp-2 leading-relaxed block font-nastaliq leading-[2.2]">
                      {language === "ur" ? p.descriptionUr : p.descriptionEn}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset All */}
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--theme-bg)] hover:bg-red-500/10 border border-[var(--theme-border)] hover:border-red-500/40 text-sm font-semibold text-[var(--theme-text-muted)] hover:text-red-400 transition-all cursor-pointer"
            title={t.btnReset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.btnReset}</span>
          </button>
        </div>
      </div>

      {/* Prominent Case Story Card if Sample is Active */}
      {isSample || activePresetId ? (
        <ScenarioCaseStoryCard />
      ) : (
        /* Fresh Start Banner with Quick Sample Links */
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#fafcf8] to-[#edf3e7] border border-[#c4d4be] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#245642] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <strong className="text-sm sm:text-base font-bold text-[#172e22] block">
                {language === "ur" ? "سمجھنے کے لیے ۵ حقیقی فقہی کیسز دیکھیں" : "Explore 5 Real-World Shia Inheritance Cases"}
              </strong>
              <p className="text-xs text-[#52735a] font-nastaliq leading-[2.2] mt-0.5">
                {language === "ur"
                  ? "اگر آپ براہ راست فرضی مثال دیکھ کر سمجھنا چاہتے ہیں تو نیچے دیے گئے ۵ نمونہ کیسز میں سے کسی ایک کا انتخاب فرمائیں۔"
                  : "Select any of our 5 real-world cases to see how Ja'fari inheritance law resolves complex family scenarios."}
              </p>
            </div>
          </div>

          {/* Quick Case Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SCENARIO_PRESETS.slice(0, 3).map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => loadPreset(p.id)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#245642] text-[#245642] hover:text-white border border-[#245642] text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                {language === "ur" ? `کیس ${idx + 1}` : `Case ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Illuminated Stepper Progress Journey */}
      <div ref={stepperRef} className="wizard-steps grid grid-cols-5 gap-2 sm:gap-3 scroll-mt-8">
        {steps.map((s) => {
          const isCurrent = wizardStep === s.num;
          const isDone = wizardStep > s.num;
          return (
            <button
              key={s.num}
              aria-current={isCurrent ? "step" : undefined}
              onClick={() => setWizardStep(s.num)}
              className={`p-2.5 sm:p-3.5 rounded-xl border text-start transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? "sacred-card-active border-[var(--theme-gold)] shadow-xl"
                  : isDone
                  ? "sacred-card border-emerald-500/40 text-[var(--theme-text-secondary)]"
                  : "sacred-card border-[var(--theme-border)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-[var(--theme-gold)] text-white shadow-md shadow-[var(--theme-gold)]/40 ring-2 ring-[var(--theme-gold-light)]"
                      : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--theme-bg)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </span>
                <span className="text-sm uppercase font-bold tracking-wider text-[var(--theme-text-muted)] hidden md:inline">
                  Step {s.num}
                </span>
              </div>
              <span
                className={`text-sm sm:text-sm font-bold block whitespace-normal ${
                  isCurrent
                    ? "text-[var(--theme-gold)]"
                    : isDone
                    ? "text-[var(--theme-text-primary)]"
                    : "text-[var(--theme-text-muted)]"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Content Mount */}
      <div className="min-h-[480px]">
        {wizardStep === 1 && <Step1Marja />}
        {wizardStep === 2 && <Step2BalanceSheet />}
        {wizardStep === 3 && <Step3ImpedimentsHabwah />}
        {wizardStep === 4 && <Step4Relatives />}
        {wizardStep === 5 && <Step5Results />}
      </div>

      {/* Step Navigation Footer */}
      <div className="flex items-center justify-between border-t border-[var(--theme-border)]/60 pt-6">
        <button
          type="button"
          disabled={wizardStep === 1}
          onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl sacred-card text-sm font-bold text-[var(--theme-text-secondary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t.btnPrev}</span>
        </button>

        <span className="text-sm font-mono font-bold text-[var(--theme-text-muted)]">
          {wizardStep} / 5
        </span>

        {wizardStep < 5 ? (
          <button
            type="button"
            onClick={() => setWizardStep(wizardStep + 1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] hover:brightness-110 text-white text-sm sm:text-sm font-bold shadow-lg shadow-[var(--theme-gold)]/20 transition-all"
          >
            <span>{t.btnNext}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setWizardStep(1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl sacred-card border-[var(--theme-gold)] text-sm font-bold text-[var(--theme-gold)] hover:bg-[var(--theme-gold)]/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "دوبارہ حساب کریں" : "Recalculate from Step 1"}</span>
          </button>
        )}
      </div>
    </>
  )}
</div>
);
};
