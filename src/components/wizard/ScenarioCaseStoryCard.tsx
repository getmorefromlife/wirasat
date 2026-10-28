"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
import {
  BookOpen,
  Sparkles,
  Users,
  Building2,
  Scale,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Eye,
  GitFork,
} from "lucide-react";

interface ScenarioCaseStoryCardProps {
  className?: string;
}

export const ScenarioCaseStoryCard: React.FC<ScenarioCaseStoryCardProps> = ({ className }) => {
  const {
    language,
    isSample,
    activePresetId,
    loadPreset,
    resetAll,
    setWizardStep,
    wizardStep,
    setActiveView,
  } = useInheritanceStore();

  const isUr = language === "ur";

  // Find active preset or default to first
  const currentPreset =
    SCENARIO_PRESETS.find((p) => p.id === activePresetId) ||
    SCENARIO_PRESETS[0];

  if (!isSample && !activePresetId) {
    return null;
  }

  return (
    <div className={`sacred-card rounded-3xl border-2 border-[#164e3a] bg-gradient-to-br from-[#fbfdf9] via-[#f5f9f2] to-[#edf3e7] shadow-xl p-5 sm:p-7 relative overflow-hidden space-y-5 animate-in fade-in duration-300 ${className || ""}`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Case Badge & Scenario Switcher Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c4d4be] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#245642] to-[#172e22] text-white flex items-center justify-center shrink-0 shadow-md">
            <BookOpen className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#245642]/10 text-[#245642] text-[11px] font-black uppercase tracking-wider border border-[#245642]/20">
              <Sparkles className="w-3 h-3 text-[#d97706]" />
              <span>{isUr ? "منتخب فقہی و خاندانی نمونۂ کیس (Sample Scenario)" : "Active Case Study & Scenario Briefing"}</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#172e22] mt-0.5">
              {isUr ? currentPreset.titleUr : currentPreset.titleEn}
            </h3>
          </div>
        </div>

        {/* Quick Reset Button */}
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-stone-600 hover:text-red-700 text-xs font-bold border border-stone-200 transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
          title={isUr ? "نمونہ بند کر کے اپنا ذاتی حساب شروع کریں" : "Dismiss sample and start fresh"}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isUr ? "اپنا نیا حساب شروع کریں" : "Start Fresh Calculation"}</span>
        </button>
      </div>

      {/* Quick Switcher: All 5 Presets as Horizontal Pills */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-[#52735a] uppercase tracking-wider block">
          {isUr ? "دیگر فقہی نمونہ جات تبدیل کریں (Quick Scenario Switcher):" : "Switch Between Real-World Sample Cases:"}
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {SCENARIO_PRESETS.map((p, idx) => {
            const isSelected = p.id === currentPreset.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => loadPreset(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#245642] text-white border-[#245642] shadow-sm"
                    : "bg-white/80 hover:bg-white text-stone-700 border-[#c4d4be] hover:border-[#245642]"
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${isSelected ? "bg-amber-400 text-black font-extrabold" : "bg-stone-200 text-stone-700"}`}>
                  {idx + 1}
                </span>
                <span>{isUr ? p.titleUr.split(":")[0] : p.titleEn.split(":")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story & Family Situation Narrative (Highlighted in Plain Text) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#245642] uppercase tracking-wider">
          <Users className="w-4 h-4 text-[#d97706]" />
          <span>{isUr ? "واقعاتی پس منظر اور خاندانی صورتِ حال (The Family Story):" : "The Family Story & Real-World Situation:"}</span>
        </div>
        <p className="text-sm sm:text-base text-[#172e22] leading-relaxed font-nastaliq text-start">
          {isUr ? currentPreset.storyUr || currentPreset.descriptionUr : currentPreset.storyEn || currentPreset.descriptionEn}
        </p>

        {/* Key Legal / Fiqh Dilemma Callout */}
        {(currentPreset.keyDilemmaUr || currentPreset.keyDilemmaEn) && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300/80 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase">
              <Scale className="w-4 h-4 text-amber-700" />
              <span>{isUr ? "بنیادی فقہی سوال و حل (The Sharia Issue & Solution):" : "The Sharia Issue & Legal Solution:"}</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-nastaliq leading-[2.2] text-start">
              {isUr ? currentPreset.keyDilemmaUr : currentPreset.keyDilemmaEn}
            </p>
          </div>
        )}
      </div>

      {/* Visual Family & Asset Highlights Chips */}
      {currentPreset.familyHighlights && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#e8efe5]/70 border border-[#c4d4be] space-y-1">
            <span className="text-[11px] font-bold text-[#52735a] block uppercase">
              {isUr ? "صاحبِ ترکہ (متوفی):" : "Deceased:"}
            </span>
            <span className="font-bold text-[#172e22] block font-nastaliq leading-[2.2]">
              {isUr ? currentPreset.familyHighlights.deceasedLabelUr : currentPreset.familyHighlights.deceasedLabelEn}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#e8efe5]/70 border border-[#c4d4be] space-y-1">
            <span className="text-[11px] font-bold text-[#52735a] block uppercase">
              {isUr ? "اہلِ خانہ و ورثاء:" : "Family Members:"}
            </span>
            <span className="font-bold text-[#172e22] block font-nastaliq leading-[2.2]">
              {isUr ? currentPreset.familyHighlights.familySummaryUr : currentPreset.familyHighlights.familySummaryEn}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#e8efe5]/70 border border-[#c4d4be] space-y-1">
            <span className="text-[11px] font-bold text-[#52735a] block uppercase">
              {isUr ? "جائیداد و مالیاتی خلاصہ:" : "Estate & Financials:"}
            </span>
            <span className="font-bold text-[#172e22] block font-nastaliq leading-[2.2]">
              {isUr ? currentPreset.familyHighlights.propertySummaryUr : currentPreset.familyHighlights.propertySummaryEn}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Action Footer: View Step 5 Results or Explore Steps */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#c4d4be]/60">
        <span className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
          {isUr
            ? "یہ تمام فرضی معلومات نیچے وزرڈ کے تمام ۵ مراحل میں خودکار طور پر بھری جا چکی ہیں۔"
            : "This complete scenario is automatically loaded across all 5 wizard steps below."}
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveView("whiteboard")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer active:scale-95"
            title={isUr ? "اس خاندانی خاکے کو انٹرایکٹو وائٹ بورڈ پر دیکھیں" : "Explore this family on Kinship Whiteboard"}
          >
            <GitFork className="w-4 h-4 text-amber-700" />
            <span>{isUr ? "نقشۂ قرابت (Whiteboard) پر دیکھیں" : "Explore on Whiteboard"}</span>
          </button>

          {wizardStep !== 5 ? (
            <button
              type="button"
              onClick={() => setWizardStep(5)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#245642] hover:bg-[#172e22] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>{isUr ? "اس کیس کی تقسیم کے نتائج دیکھیں" : "Jump to Distribution Results"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setWizardStep(4)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#245642] border border-[#245642] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>{isUr ? "رشتہ داران کا جائزہ لیں (مرحلہ ۴)" : "Inspect Relatives (Step 4)"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
