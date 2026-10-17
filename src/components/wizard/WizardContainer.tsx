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
} from "lucide-react";

export const WizardContainer: React.FC = () => {
  const {
    language,
    wizardStep,
    setWizardStep,
    resetAll,
    loadPreset,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  const steps = [
    { num: 1, title: t.step1Title },
    { num: 2, title: t.step2Title },
    { num: 3, title: t.step3Title },
    { num: 4, title: t.step4Title },
    { num: 5, title: t.step5Title },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Action Bar with Scenario Presets and Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)]">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)] flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[var(--theme-gold)]" />
            <span>{language === "ur" ? "المرشد المرحلی (رہنمائے حساب)" : "Al-Murshid al-Marḥalī (Guided Engine)"}</span>
          </h2>
          <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
            {language === "ur"
              ? "مرحلہ وار شرعی حساب کتاب اور فقہی ادلہ کا نفاذ"
              : "Step-by-step estate liquidation and Quranic share execution"}
          </p>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Preset Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPresetDropdown(!showPresetDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-gold)]/10 hover:bg-[var(--theme-gold)]/20 border border-[var(--theme-gold)]/40 text-xs font-semibold text-[var(--theme-gold)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.btnLoadPreset}</span>
            </button>

            {showPresetDropdown && (
              <div className="absolute top-full inset-inline-end-0 mt-2 w-80 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-2xl p-2 z-50 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] px-3 py-1 block">
                  {language === "ur" ? "مشہور تاریخی و پیچیدہ کیسز" : "Classic Fiqh Scenarios"}
                </span>
                {SCENARIO_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      loadPreset(p.id);
                      setShowPresetDropdown(false);
                    }}
                    className="w-full text-start p-2.5 rounded-lg hover:bg-[var(--theme-card-subtle)] transition-all text-xs"
                  >
                    <span className="font-bold text-[var(--theme-text-primary)] block">
                      {language === "ur" ? p.titleUr : p.titleEn}
                    </span>
                    <span className="text-[11px] text-[var(--theme-text-muted)] line-clamp-2 mt-0.5">
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--theme-bg)] hover:bg-red-500/10 border border-[var(--theme-border)] hover:border-red-500/40 text-xs font-semibold text-[var(--theme-text-muted)] hover:text-red-400 transition-all"
            title={t.btnReset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.btnReset}</span>
          </button>
        </div>
      </div>

      {/* Multi-Step Stepper Progress Bar */}
      <div className="hidden sm:grid grid-cols-5 gap-2">
        {steps.map((s) => {
          const isCurrent = wizardStep === s.num;
          const isDone = wizardStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setWizardStep(s.num)}
              className={`p-3 rounded-xl border text-start transition-all relative overflow-hidden ${
                isCurrent
                  ? "bg-[var(--theme-card)] border-[var(--theme-gold)] shadow-md shadow-[var(--theme-gold)]/10 ring-1 ring-[var(--theme-gold)]"
                  : isDone
                  ? "bg-[var(--theme-card)]/60 border-[var(--theme-border)] text-[var(--theme-text-secondary)]"
                  : "bg-[var(--theme-card)]/30 border-[var(--theme-border)]/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isCurrent
                      ? "bg-[var(--theme-gold)] text-black"
                      : isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-[var(--theme-bg)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]"
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--theme-text-muted)]">
                  Step {s.num}
                </span>
              </div>
              <span
                className={`text-xs font-bold block truncate ${
                  isCurrent
                    ? "text-[var(--theme-gold)]"
                    : "text-[var(--theme-text-primary)]"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Content Mount */}
      <div className="min-h-[460px]">
        {wizardStep === 1 && <Step1Marja />}
        {wizardStep === 2 && <Step2BalanceSheet />}
        {wizardStep === 3 && <Step3ImpedimentsHabwah />}
        {wizardStep === 4 && <Step4Relatives />}
        {wizardStep === 5 && <Step5Results />}
      </div>

      {/* Step Navigation Footer */}
      <div className="flex items-center justify-between border-t border-[var(--theme-border)] pt-6">
        <button
          type="button"
          disabled={wizardStep === 1}
          onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-text-secondary)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.btnPrev}</span>
        </button>

        <span className="text-xs font-mono text-[var(--theme-text-muted)]">
          {wizardStep} / 5
        </span>

        {wizardStep < 5 ? (
          <button
            type="button"
            onClick={() => setWizardStep(wizardStep + 1)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[var(--theme-gold)] hover:bg-[var(--theme-gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--theme-gold)]/20 transition-all"
          >
            <span>{t.btnNext}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setWizardStep(1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-gold)]/50 text-xs font-bold text-[var(--theme-gold)] hover:bg-[var(--theme-gold)]/10 transition-all"
          >
            <span>{language === "ur" ? "شروع سے جائزہ لیں" : "Review from Start"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
