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
} from "lucide-react";

export const WizardContainer: React.FC = () => {
  const {
    language,
    wizardStep,
    setWizardStep,
    resetAll,
    loadPreset,
    isSample,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  const steps = [
    { num: 1, title: t.step1Title, subtitle: "Marja‘" },
    { num: 2, title: t.step2Title, subtitle: "Balance Sheet" },
    { num: 3, title: t.step3Title, subtitle: "Habwah & Impediments" },
    { num: 4, title: t.step4Title, subtitle: "Relatives & Tiers" },
    { num: 5, title: t.step5Title, subtitle: "Distribution Result" },
  ];

  return (
    <div className="calculator-workspace max-w-5xl mx-auto px-4 py-8 space-y-8">
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-gold)]/10 hover:bg-[var(--theme-gold)]/20 border border-[var(--theme-gold)]/40 text-sm font-bold text-[var(--theme-gold)] transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-gold)]" />
              <span>{t.btnLoadPreset}</span>
            </button>

            {showPresetDropdown && (
              <div className="absolute top-full end-0 mt-2 w-[min(24rem,calc(100vw-3rem))] rounded-2xl sacred-card p-3 z-50 space-y-1.5 shadow-2xl border border-[var(--theme-gold)]/50">
                <div className="flex items-center justify-between px-2 py-1 text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)] border-b border-[var(--theme-border)]/60 pb-1.5 mb-1">
                  <span>Classic Fiqh Scenarios</span>
                  <span className="text-sm text-[var(--theme-text-muted)]">Click to Load</span>
                </div>
                {SCENARIO_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      loadPreset(p.id);
                      setShowPresetDropdown(false);
                    }}
                    className="w-full text-start p-2.5 rounded-xl hover:bg-[var(--theme-card-hover)] hover:border hover:border-[var(--theme-gold)]/40 transition-all text-sm space-y-0.5 border border-transparent"
                  >
                    <span className="font-bold text-[var(--theme-text-primary)] block">
                      {language === "ur" ? p.titleUr : p.titleEn}
                    </span>
                    <span className="text-sm text-[var(--theme-text-muted)] line-clamp-2 leading-relaxed">
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--theme-bg)] hover:bg-red-500/10 border border-[var(--theme-border)] hover:border-red-500/40 text-sm font-semibold text-[var(--theme-text-muted)] hover:text-red-400 transition-all"
            title={t.btnReset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.btnReset}</span>
          </button>
        </div>
      </div>

      <div className="sample-intro" role="status">
        <div>
          <strong>{language === "ur" ? (isSample ? "آپ ایک نمونہ دیکھ رہے ہیں" : "اپنا حساب صفر سے شروع کریں") : (isSample ? "You’re exploring a sample" : "A fresh start for your calculation")}</strong>
          <p>{language === "ur" ? (isSample ? "یہ صرف سمجھنے کے لیے فرضی اعداد ہیں۔ مراحل دیکھیں یا نیا حساب شروع کریں۔" : "تمام رقوم اور ورثاء کی تعداد صفر ہیں۔ سمجھنے کے لیے ایک نمونہ دیکھ سکتے ہیں۔") : (isSample ? "These are example figures. Explore each step, or start fresh with your own details." : "Amounts and heir counts start at zero. Try a sample to see how the calculation works.")}</p>
        </div>
        <button type="button" onClick={() => isSample ? resetAll() : loadPreset(SCENARIO_PRESETS[0].id)}>
          {language === "ur" ? (isSample ? "نیا حساب شروع کریں" : "نمونہ دیکھیں") : (isSample ? "Start my calculation" : "Try a sample")}
        </button>
      </div>

      {/* Illuminated Stepper Progress Journey */}
      <div className="wizard-steps grid grid-cols-5 gap-2 sm:gap-3">
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
    </div>
  );
};
