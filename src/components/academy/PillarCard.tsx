"use client";

import React, { useState } from "react";
import { MasterclassPillar } from "@/lib/academy-curriculum";
import { PillarInteractiveTool } from "@/components/academy/PillarInteractiveTools";
import { ComprehensiveExposition } from "@/components/academy/ComprehensiveExposition";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Scale,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface PillarCardProps {
  pillar: MasterclassPillar;
  language: "en" | "ur";
}

export const PillarCard: React.FC<PillarCardProps> = ({ pillar, language }) => {
  const isUr = language === "ur";
  const [isPrecedentsOpen, setIsPrecedentsOpen] = useState<boolean>(false);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState<boolean>(true);

  const stageBadgeText = {
    FOUNDATIONS: isUr ? "مرحلہ ۱: اساسیاتِ ترکہ" : "STAGE 1 • FOUNDATIONS",
    DISTRIBUTION: isUr ? "مرحلہ ۲: تقسیم و معیشت" : "STAGE 2 • STATUTORY DISTRIBUTION",
    CONTINGENCIES: isUr ? "مرحلہ ۳: پیچیدہ تنازعات" : "STAGE 3 • ADVANCED CONTINGENCIES",
  }[pillar.stage];

  return (
    <article className="rounded-2xl border-2 border-[#245642]/25 bg-[#FAF8F5] dark:bg-[#0B1713] p-6 sm:p-8 shadow-md transition-all space-y-6 text-stone-900 dark:text-stone-100">
      {/* 1. PILLAR HEADER */}
      <header className="border-b border-[#245642]/20 pb-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-[#245642] text-white shadow-2xs">
              PILLAR {pillar.romanNumeral}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#245642]/10 dark:bg-[#245642]/30 text-[#245642] dark:text-emerald-300">
              {stageBadgeText}
            </span>
          </div>

          <span className="text-xs font-naskh text-[#245642] dark:text-emerald-300 font-bold px-3 py-1 rounded-lg bg-[#edf3e7] dark:bg-[#132c21] border border-[#a5b69d]/40">
            {pillar.subtitleEn}
          </span>
        </div>

        <div>
          {isUr ? (
            <h3
              className="text-xl sm:text-2xl font-normal text-[#173e30] dark:text-emerald-200 font-nastaliq leading-[2.2]"
              dir="rtl"
            >
              {pillar.titleUr}
            </h3>
          ) : (
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4] tracking-tight">
              {pillar.titleEn}
            </h3>
          )}
          <p className="text-xs text-stone-600 dark:text-stone-300 font-medium mt-1">
            {isUr ? pillar.subtitleUr : pillar.subtitleEn}
          </p>
        </div>
      </header>

      {/* 2. JURIDICAL EXECUTIVE SUMMARY (خلاصۂ حکم) */}
      <section className="rounded-xl border-2 border-[#245642]/40 bg-white dark:bg-[#0f1f1a] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#245642]/15 pb-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#245642] dark:text-emerald-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2118] dark:text-emerald-300">
              {isUr ? "خلاصۂ حکمِ شرعی" : "Executive Juridical Brief"}
            </h4>
          </div>
          <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 px-2.5 py-0.5 rounded-full">
            {isUr ? "فتویٰ و اصول" : "Binding Axiom"}
          </span>
        </div>

        {isUr ? (
          <p
            className="text-sm sm:text-base leading-[2.3] text-[#172e22] dark:text-emerald-100 font-nastaliq"
            dir="rtl"
          >
            {pillar.executiveSummaryUr}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-[#0F172A] dark:text-stone-200 font-medium">
            {pillar.executiveSummaryEn}
          </p>
        )}
      </section>

      {/* 3. INTERACTIVE JURIDICAL TOOL */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 px-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#245642] dark:text-emerald-400" />
            {isUr ? "انٹرایکٹو شرعی ٹول" : "Interactive Juridical Simulator"}
          </span>
          <span className="text-[11px] font-semibold text-stone-500">Live Simulation</span>
        </div>
        <PillarInteractiveTool toolType={pillar.interactiveToolType} language={language} />
      </section>

      {/* 4. DEEP LEGAL EXPOSITION (تفصیلی شرعی بیان) */}
      <section className="rounded-xl border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#0c1814] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#245642] dark:text-emerald-400" />
            <h4 className="font-bold text-base text-[#0A2118] dark:text-emerald-200 font-cinzel">
              {isUr ? "تفصیلی شرعی بیان اور فقہی حدود" : "Comprehensive Legal Exposition"}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
            className="text-xs font-bold text-[#245642] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            {isAnalysisExpanded ? (isUr ? "مختصر کریں" : "Collapse") : (isUr ? "مکمل مطالعہ کریں" : "Read Full Exposition")}
            {isAnalysisExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isAnalysisExpanded && (
          <div className="pt-2">
            <ComprehensiveExposition pillarNumber={pillar.pillarNumber} language={language} />
          </div>
        )}
      </section>

      {/* 5. STATUTORY PRECEDENTS DRAWER (اسناد و مدارکِ شرعیہ) */}
      <section className="rounded-xl border border-[#245642]/30 bg-[#FAF8F5] dark:bg-[#0d1c16] overflow-hidden">
        <button
          type="button"
          onClick={() => setIsPrecedentsOpen(!isPrecedentsOpen)}
          className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-[#0A2118] dark:text-[#F0FDF4] bg-[#edf3e7] dark:bg-[#152e23] hover:bg-[#e4ece0] dark:hover:bg-[#1b3a2d] transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#245642] dark:text-emerald-400" />
            <span>
              {isUr
                ? "اسناد و مدارکِ شرعیہ (قرآن، احادیثِ اہلِ بیتؑ اور فتاویٰ مراجع)"
                : "Scriptural Precedents & Legal Citations (Qur'an, Hadith & Marāji‘)"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/60 dark:bg-black/40 text-stone-700 dark:text-stone-300">
              {isPrecedentsOpen ? (isUr ? "بند کریں" : "Hide Sources") : (isUr ? "ملاحظہ فرمائیں" : "View Sources")}
            </span>
            {isPrecedentsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isPrecedentsOpen && (
          <div className="p-5 space-y-6 text-xs sm:text-sm divide-y divide-stone-200 dark:divide-stone-800">
            {/* Qur'an */}
            {pillar.scripturalPrecedents.quranicAyah && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#245642] dark:text-emerald-400 text-xs">
                    {isUr ? "قرآنِ مجید" : "The Holy Qur’an"}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    {pillar.scripturalPrecedents.quranicAyah.reference}
                  </span>
                </div>
                <div
                  className="p-4 rounded-xl bg-white dark:bg-[#0c1814] border border-stone-200 dark:border-stone-800 text-right text-base sm:text-lg font-naskh text-[#0A2118] dark:text-emerald-100 leading-[2.4]"
                  dir="rtl"
                >
                  {pillar.scripturalPrecedents.quranicAyah.arabic}
                </div>
                {isUr ? (
                  pillar.scripturalPrecedents.quranicAyah.translationUr && (
                    <p
                      className="text-stone-800 dark:text-emerald-200 font-nastaliq leading-[2.2] text-right"
                      dir="rtl"
                    >
                      {pillar.scripturalPrecedents.quranicAyah.translationUr}
                    </p>
                  )
                ) : (
                  <p className="text-stone-700 dark:text-stone-300 italic">
                    &ldquo;{pillar.scripturalPrecedents.quranicAyah.translationEn}&rdquo;
                  </p>
                )}
              </div>
            )}

            {/* Hadith */}
            {pillar.scripturalPrecedents.hadithProof && (
              <div className="pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#245642] dark:text-emerald-400 text-xs">
                    {isUr ? "سنّت و احادیثِ معصومین (ع)" : "Sunnah of the Ahl al-Bayt (ع)"}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    {pillar.scripturalPrecedents.hadithProof.source}
                  </span>
                </div>
                <div
                  className="p-4 rounded-xl bg-white dark:bg-[#0c1814] border border-stone-200 dark:border-stone-800 text-right text-sm sm:text-base font-naskh text-[#0A2118] dark:text-emerald-100 leading-[2.4]"
                  dir="rtl"
                >
                  {pillar.scripturalPrecedents.hadithProof.arabic}
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                  {pillar.scripturalPrecedents.hadithProof.translationEn}
                </p>
              </div>
            )}

            {/* Maraji Rulings */}
            <div className="pt-5 space-y-3">
              <span className="font-bold uppercase tracking-wider text-[#245642] dark:text-emerald-400 text-xs block">
                {isUr ? "فتاویٰ مراجعِ عظام" : "Contemporary Marāji‘ Rulings"}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-stone-200 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-xs text-[#0A2118] dark:text-emerald-300 block">
                    {isUr ? "حضرت آیۃ اللہ العظمیٰ سید علی سیستانی:" : "Grand Ayatollah Sayyid Ali al-Sistani:"}
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {pillar.scripturalPrecedents.marjaRulings.sistani}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-stone-200 dark:border-stone-800 space-y-1">
                  <span className="font-bold text-xs text-[#0A2118] dark:text-emerald-300 block">
                    {isUr ? "حضرت آیۃ اللہ العظمیٰ سید ابو القاسم خوئیؒ:" : "Grand Ayatollah Sayyid Abu al-Qasim al-Khoei:"}
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {pillar.scripturalPrecedents.marjaRulings.khoei || "Minhāj al-Ṣāliḥīn: Classical rulings align with Ja'fari statutory distribution."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. PRACTICAL REAL-WORLD CASE STUDY */}
      {pillar.caseStudy && (
        <section className="rounded-xl border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#0c1814] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#0A2118] dark:text-emerald-200 font-cinzel">
                {isUr ? "عملی فقہی مثال و تجزیہ" : (pillar.caseStudy.title || "Practical Real-World Case Study")}
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Legal Precedent
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
            {/* Estate Scenario */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#13251e] border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#245642] dark:text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                {isUr ? "صورتِ مسئلہ" : "Estate Scenario"}
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-medium">
                {pillar.caseStudy.scenario}
              </p>
            </div>

            {/* Step-by-Step Resolution */}
            {pillar.caseStudy.steps.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#245642] dark:text-emerald-400" />
                  {isUr ? "مرحلہ وار شرعی حل" : "Step-by-Step Juridical Resolution"}
                </span>
                <div className="space-y-2">
                  {pillar.caseStudy.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-white dark:bg-[#0e1c17] border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-medium flex items-start gap-2.5 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#245642]/10 dark:bg-[#245642]/30 text-[#245642] dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <div className="flex-1 whitespace-pre-line leading-relaxed">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Takeaway / Conclusion */}
            {pillar.caseStudy.takeaway && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-semibold text-xs sm:text-sm flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-300 mr-1">
                    {isUr ? "فقہی نتیجہ و سبق:" : "Jurisprudential Takeaway:"}
                  </strong>
                  <span>{pillar.caseStudy.takeaway}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
};
