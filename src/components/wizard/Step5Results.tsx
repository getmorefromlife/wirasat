"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { HeirShareResult } from "@/types/fiqh";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  ShieldCheck,
  Sparkles,
  Info,
  Crown,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
import { ScenarioCaseStoryCard } from "@/components/wizard/ScenarioCaseStoryCard";
import { SimpleDistributionInfographic } from "@/components/wizard/SimpleDistributionInfographic";

export const Step5Results: React.FC = () => {
  const {
    language,
    deceased,
    getCalculationResult,
    setActiveView,
    setActiveVisualParadigm,
    openProvenance,
    isSample,
    activePresetId,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const marjaInfo = MARJA_DATABASE[deceased.marja];
  const result = getCalculationResult();

  const [expandedProofId, setExpandedProofId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"simple" | "detailed" | "both">("both");

  const toggleProof = (id: string) => {
    setExpandedProofId(expandedProofId === id ? null : id);
  };

  const getHeirTitle = (heir: HeirShareResult): string => {
    const titles: Record<string, { en: string; ur: string }> = {
      husband: { en: "Husband (Zawj)", ur: "شوہر (زوج)" },
      wife: { en: "Wife (Zawjah)", ur: "بیوہ (زوجہ)" },
      wives: { en: "Wives (Zawjāt)", ur: "بیوائیں (زوجات)" },
      father: { en: "Father (Ab)", ur: "والد محترم" },
      mother: { en: "Mother (Umm)", ur: "والدہ ماجدہ" },
      son: { en: "Son (Ibn)", ur: "بیٹا" },
      sons: { en: "Sons (Abnā’)", ur: "بیٹے" },
      daughter: { en: "Daughter (Bint)", ur: "بیٹی" },
      daughters: { en: "Daughters (Banāt)", ur: "بیٹیاں" },
      grandsons: { en: "Grandsons (Tanzīl)", ur: "پوتے (تنزيل)" },
      fullBrother: { en: "Full Brother", ur: "سگا بھائی (ابوینی)" },
      fullBrothers: { en: "Full Brothers", ur: "سگے بھائی (ابوینی)" },
      maternalGrandparents: { en: "Maternal Grandparents", ur: "نانا و نانی" },
      paternalRelatives: { en: "Paternal Relatives (Tier 2)", ur: "پدری رشتہ دار (طبقہ دوم)" },
      maternalRelatives: { en: "Maternal Relatives (Tier 2)", ur: "مادری رشتہ دار (طبقہ دوم)" },
      paternalUncles: { en: "Paternal Relatives (Tier 3)", ur: "چچا و پھوپھیاں (طبقہ سوم)" },
    };

    const entry = titles[heir.relationKey];
    if (entry) {
      return language === "ur" ? entry.ur : entry.en;
    }
    return heir.relationKey;
  };

  return (
    <div className="space-y-6">
      {/* Active Case Narrative & Fiqh Dilemma Card (Shown when a sample scenario is active) */}
      {(isSample || activePresetId) && (
        <ScenarioCaseStoryCard className="animate-in fade-in duration-300" />
      )}

      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2 pt-1 pb-0.5">
            <Award className="w-6 h-6 text-[var(--theme-gold)] shrink-0" />
            <span>{t.resultsTitle}</span>
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-0.5 leading-relaxed">
            {language === "ur"
              ? `مرجعِ تقلید: ${marjaInfo.nameUr} کے فتاویٰ کے مطابق حساب شدہ`
              : `Calculated strictly according to the rulings of ${marjaInfo.nameEn}`}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("galaxy")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl sacred-card text-sm font-bold text-[var(--theme-gold)] hover:border-[var(--theme-gold)] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "فلکِ قرابت دیکھیں" : "Kinship Galaxy"}</span>
          </button>

          <button
            onClick={() => setActiveView("visuals")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-white text-sm font-bold hover:brightness-110 shadow-lg shadow-[var(--theme-gold)]/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "۱۲ بصری اسٹوڈیو دیکھیں" : "Explore 12-Visual Studio"}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl sacred-card text-sm font-bold text-stone-700 hover:border-stone-400 transition-all shadow-sm cursor-pointer"
            title={language === "ur" ? "پرنٹ کریں / محفوظ کریں" : "Print Calculation Summary"}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "پرنٹ" : "Print"}</span>
          </button>
        </div>
      </div>

      {/* Clarity View Mode Selector (Simple One-Picture Visual vs Scholarly Proofs vs Both) */}
      <div className="p-2 rounded-2xl bg-stone-100/80 border border-stone-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-2 text-xs font-bold text-stone-700">
          <span>{language === "ur" ? "طرزِ نمائش منتخب کریں:" : "Choose View Format:"}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-1 sm:flex-none justify-end">
          <button
            type="button"
            onClick={() => setViewMode("simple")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "simple"
                ? "bg-[#245642] text-white shadow-md"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <span>🌟</span>
            <span>{language === "ur" ? "آسان تصویری خلاصہ و کیش کیلکولیٹر" : "1-Picture Visual & Calculator"}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("detailed")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "detailed"
                ? "bg-[#245642] text-white shadow-md"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <span>📜</span>
            <span>{language === "ur" ? "تفصیلی فقہی اسناد و فتاویٰ" : "Scholarly Rulings & Proofs"}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("both")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "both"
                ? "bg-[#245642] text-white shadow-md"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <span>🔄</span>
            <span>{language === "ur" ? "مکمل جامع منظر (دونوں)" : "Complete (Both)"}</span>
          </button>
        </div>
      </div>

      {/* 1. AT-A-GLANCE SIMPLIFIED ONE-PICTURE VISUAL & LIVE POCKET CALCULATOR */}
      {(viewMode === "simple" || viewMode === "both") && (
        <SimpleDistributionInfographic calculationResult={result} className="animate-in fade-in duration-300" />
      )}

      {/* 2. SCHOLARLY DETAILED SECTIONS */}
      {(viewMode === "detailed" || viewMode === "both") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--theme-border)]">
            <Scale className="w-5 h-5 text-[#245642]" />
            <h3 className="font-bold text-lg text-[#172e22]">
              {language === "ur" ? "تفصیلی فقہی اسناد و شرعی تقسیمِ حصص" : "Scholarly Distribution Breakdown & Textual Proofs"}
            </h3>
          </div>

      {/* Special Fiqh Principles Applied Banners */}
      <div className="space-y-3">
        {/* Repudiation of ‘Awl Banner */}
        {result.rejectionOfAwlApplied && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fffbeb] border-2 border-[#f59e0b] shadow-sm space-y-2">
            <div className="flex items-center gap-2.5 font-bold text-[#78350f] text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-[#b45309] shrink-0" />
              <span>{t.awlCardTitle}</span>
            </div>
            <p className="leading-relaxed text-[#92400e] text-sm font-medium">{t.awlCardBody}</p>
          </div>
        )}

        {/* Repudiation of Ta‘ṣīb Banner */}
        {result.rejectionOfTasibApplied && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f0fdf4] border-2 border-[#16a34a] shadow-sm space-y-2">
            <div className="flex items-center gap-2.5 font-bold text-[#14532d] text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-[#15803d] shrink-0" />
              <span>{t.tasibCardTitle}</span>
            </div>
            <p className="leading-relaxed text-[#166534] text-sm font-medium">{t.tasibCardBody}</p>
          </div>
        )}

        {/* Mother Sibling Reduction Banner */}
        {result.motherHujubNuqsanApplied && (
          <div className="p-4 rounded-2xl sacred-card text-sm text-[var(--theme-text-secondary)] flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--theme-gold)] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">
                {language === "ur" ? "حجبِ نقصان کا اطلاق:" : "Ḥujub al-Nuqṣān Applied:"}
              </span>
              <p className="mt-0.5 leading-relaxed text-[var(--theme-text-muted)]">
                {language === "ur"
                  ? "متوفی کے بھائیوں کی موجودگی کے سبب والدہ کا حصہ 1/3 سے گھٹ کر 1/6 ہو گیا اور وہ رد کے زائد مال سے مستثنیٰ ہیں۔"
                  : "Mother's share is reduced from 1/3 to 1/6 due to the presence of qualifying brothers, and she does not participate in Radd."}
              </p>
            </div>
          </div>
        )}

        {/* Eldest Son Habwah Banner */}
        {result.habwahAwarded.awarded && (
          <div className="p-5 rounded-2xl sacred-card border-2 border-[#d97706]/70 bg-gradient-to-br from-[#fffdfa] to-[#fffbeb] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#d97706] to-[#b45309] text-white flex items-center justify-center shrink-0 shadow-md">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-xs uppercase tracking-widest text-[#d97706] block">
                    {language === "ur" ? "مخصوص حق: الولد الأكبر (حَبْوہ)" : "Al-Ḥabwah: Absolute Eldest Son Privilege"}
                  </span>
                  {result.eldestSonHabwahRecipient && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#d97706]/15 text-[#92400e] text-xs font-bold border border-[#d97706]/30">
                      {result.eldestSonHabwahRecipient.name}
                      {result.eldestSonHabwahRecipient.motherName &&
                        ` (${language === "ur" ? `والدہ: ${result.eldestSonHabwahRecipient.motherName}` : `Mother: ${result.eldestSonHabwahRecipient.motherName}`})`}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-[#172e22] mt-1 font-nastaliq leading-[2.2]">
                  {result.habwahAwarded.items.join(" • ")}
                </p>
                <p className="text-xs text-[#78350f] mt-0.5 font-nastaliq leading-[2.2]">
                  {language === "ur"
                    ? `فقہی ضابطہ: تمام بیویوں کے بچوں میں سے جو مطلقاً سب سے بڑا باہوش بیٹا (الولد الأكبر) ہو، صرف وہی والد کی ۴ مخصوص چیزوں (قرآن، انگوٹھی، تلوار/ہتھیار، ملبوسات) کا حقدار ہے۔`
                    : result.habwahAwarded.reason}
                </p>
                <button
                  type="button"
                  onClick={() => openProvenance("AL_HABWAH")}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d97706]/15 hover:bg-[#d97706] text-[#92400e] hover:text-white text-xs font-bold border border-[#d97706]/30 transition-all cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{language === "ur" ? "احکامِ حبوہ کا تفصیلی شرعی فتویٰ" : "View Ḥabwah Scholarly Fatwa"}</span>
                </button>
              </div>
            </div>

            {result.habwahAwarded.value > 0 && (
              <div className="text-start sm:text-end p-3 rounded-xl bg-white border border-[#f59e0b]/40 shadow-xs">
                <span className="text-xs text-stone-500 block uppercase font-bold">
                  {language === "ur" ? "تخمینہ شدہ قیمت" : "Estimated Value"}
                </span>
                <span className="font-mono font-bold text-lg text-[#d97706]">
                  {result.habwahAwarded.value.toLocaleString()} {deceased.currency}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Itemized Spousal Distribution Table (Bi al-Sawiyyah - بالسویہ مساوی تقسیم) */}
        {result.spousalBreakdown && result.spousalBreakdown.wives.length > 0 && (
          <div className="sacred-card p-6 rounded-2xl border-2 border-[#164e3a] bg-gradient-to-br from-[#f8faf6] to-[#edf3e7] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#c4d4be] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#245642] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  💍
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8efe5] text-[#245642] text-[10px] font-bold tracking-wider uppercase border border-[#c4d4be]">
                    <span>{language === "ur" ? "بالسویہ مساوی تقسیم" : "Strict Equal Spousal Division"}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#172e22] mt-0.5">
                    {language === "ur" ? "تفصیلِ تقسیمِ حصۂ زوجات (بیویاں)" : "Itemized Spousal Distribution (Zawjāt)"}
                  </h3>
                  <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                    {language === "ur"
                      ? `کل حصۂ زوجات: ${result.spousalBreakdown.totalFraction} (${Math.round(result.spousalBreakdown.totalAmount).toLocaleString()} ${deceased.currency}) — تمام ${result.spousalBreakdown.wifeCount} بیویاں اس میں بالکل برابر شریک ہیں۔`
                      : `Total spousal pool: ${result.spousalBreakdown.totalFraction} (${Math.round(result.spousalBreakdown.totalAmount).toLocaleString()} ${deceased.currency}) divided equally among all ${result.spousalBreakdown.wifeCount} wives.`}
                  </p>
                </div>
              </div>
              <div className="text-start sm:text-end">
                <span className="text-xs font-bold text-[#52735a] block uppercase">
                  {language === "ur" ? "فی بیوی مساوی حصہ" : "Equal Share Per Wife"}
                </span>
                <span className="font-mono font-black text-xl text-[#245642]">
                  {result.spousalBreakdown.wives[0]?.fraction || ""}
                </span>
              </div>
            </div>

            {/* Wives Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {result.spousalBreakdown.wives.map((w, idx) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl bg-white border border-[#c4d4be] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#245642] uppercase tracking-wider block">
                        {language === "ur" ? `زوجہ ${idx + 1}` : `Wife ${idx + 1}`}
                      </span>
                      <h4 className="font-bold text-base text-[#172e22]">
                        {w.name}
                      </h4>
                    </div>
                    <div className="text-end">
                      <span className="font-mono text-base font-black text-[#245642]">
                        {w.fraction}
                      </span>
                      <span className="block text-[11px] text-[#52735a] font-bold">
                        {language === "ur" ? "شرعی کسر" : "Fraction"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 font-nastaliq leading-[2.2]">
                        {language === "ur" ? "عمارات، اشجار و منقولہ ترکہ:" : "Buildings & Movable Property:"}
                      </span>
                      <span className="font-mono font-bold text-[#172e22]" dir="ltr">
                        {Math.round(w.buildingsEntitlement).toLocaleString()} {deceased.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 font-nastaliq leading-[2.2]">
                        {language === "ur" ? "اراضی و زمین کی قیمت:" : "Land Valuation Entitlement:"}
                      </span>
                      <span className="font-mono font-bold text-[#172e22]" dir="ltr">
                        {w.landEntitlement > 0 ? (
                          `${Math.round(w.landEntitlement).toLocaleString()} ${deceased.currency}`
                        ) : (
                          <span className="text-red-500 font-sans">
                            {language === "ur" ? "0 (زمین سے محروم)" : "0 (Excluded under Marja)"}
                          </span>
                        )}
                      </span>
                    </div>

                    {w.pendingMahrDeducted > 0 && (
                      <div className="flex items-center justify-between bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-900">
                        <span className="font-medium font-nastaliq leading-[2.2]">
                          {language === "ur" ? "باقی ماندہ مہر (دَین - قرض):" : "Unpaid Mahr (Prior Debt):"}
                        </span>
                        <span className="font-mono font-bold text-amber-800" dir="ltr">
                          +{Math.round(w.pendingMahrDeducted).toLocaleString()} {deceased.currency}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                      <span className="text-[#172e22] font-nastaliq leading-[2.2]">
                        {language === "ur" ? "کل قابلِ ادائی مال:" : "Total Net Receivable:"}
                      </span>
                      <span className="font-mono font-extrabold text-[#245642]" dir="ltr">
                        {Math.round(w.amount + (w.pendingMahrDeducted || 0)).toLocaleString()} {deceased.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Heirs Breakdown Cards */}
      <div className="space-y-4">
        {result.heirShares.length === 0 ? (
          <div className="p-10 text-center rounded-2xl sacred-card text-[var(--theme-text-muted)] text-sm space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="font-bold text-[var(--theme-text-primary)]">
              {language === "ur"
                ? "ترکہ زیرِ بارِ قرض ہے یا کوئی وارث موجود نہیں ہے۔"
                : "Estate is insolvent or no qualifying heirs are present."}
            </p>
          </div>
        ) : (
          result.heirShares.map((heir) => {
            const isProofExpanded = expandedProofId === heir.id;
            return (
              <div
                key={heir.id}
                className="sacred-card rounded-2xl hover:border-[var(--theme-gold)] transition-all overflow-hidden shadow-lg"
              >
                {/* Main Heir Card Row */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
                        {heir.tier === 0
                          ? language === "ur"
                            ? "شریکِ حیات"
                            : "Spouse"
                          : `${language === "ur" ? "طبقہ" : "Tier"} ${heir.tier}`}
                      </span>
                      {heir.count > 1 && (
                        <span className="text-sm text-[var(--theme-text-muted)] font-medium">
                          ({heir.count} {language === "ur" ? "افراد" : "individuals"})
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] pt-1">
                      {getHeirTitle(heir)}
                    </h3>

                    {heir.notes.length > 0 && (
                      <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                        {heir.notes.join(" • ")}
                      </p>
                    )}
                  </div>

                  {/* Financial & Fractional Metrics */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-[var(--theme-border)]/60 pt-3 sm:pt-0">
                    {/* Prescribed Fraction & Percentage */}
                    <div className="text-start sm:text-end">
                      <div className="fraction-metric-box">
                        <span className="font-mono text-2xl sm:text-3xl font-black gold-gradient-text">
                          {heir.fractionString}
                        </span>
                        <span className="text-sm text-[var(--theme-text-muted)] font-mono font-semibold">
                          ({heir.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[var(--theme-text-muted)] block mt-0.5">
                        {t.fractionCol}
                      </span>
                    </div>

                    {/* Monetary Share */}
                    <div className="text-end min-w-[130px]">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] block">
                        {Math.round(heir.totalMonetaryShare).toLocaleString()}
                      </span>
                      <span className="text-sm text-[var(--theme-gold)] font-bold block">
                        {deceased.currency} {heir.count > 1 ? `(Total)` : ""}
                      </span>
                      {heir.count > 1 && (
                        <span className="text-sm text-[var(--theme-text-muted)] font-mono block">
                          {Math.round(heir.sharePerIndividual).toLocaleString()} each
                        </span>
                      )}
                    </div>

                    {/* Shar'i Proof Drawer Toggle Button */}
                    <button
                      onClick={() => toggleProof(heir.id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isProofExpanded
                          ? "bg-[var(--theme-gold)] text-white border-[var(--theme-gold)] shadow-md"
                          : "sacred-card hover:border-[var(--theme-gold)]/60 text-[var(--theme-text-secondary)]"
                      }`}
                      title={t.proofDrawerBtn}
                    >
                      {isProofExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Widow Land vs Movables Specific Breakdown Notice */}
                {heir.movableAndBuildingEntitlement !== undefined && (
                  <div className="px-6 py-4 bg-[var(--theme-card-subtle)] border-t border-[var(--theme-border)] text-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--theme-text-secondary)] leading-relaxed">
                    <div className="space-y-1">
                      <span className="text-[var(--theme-text-muted)] block text-xs sm:text-sm">
                        {language === "ur"
                          ? "عمارات، درخت و منقولہ اشیاء سے حصہ:"
                          : "Buildings, Trees & Chattels Share:"}
                      </span>
                      <span className="font-mono font-bold text-[var(--theme-text-primary)] text-sm block" dir="ltr">
                        {Math.round(heir.movableAndBuildingEntitlement).toLocaleString()}{" "}
                        {deceased.currency}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[var(--theme-text-muted)] block text-xs sm:text-sm">
                        {language === "ur" ? "اراضی کی قیمت سے حصہ:" : "Land Valuation Share:"}
                      </span>
                      <span className="font-mono font-bold text-sm block">
                        {heir.landValueEntitlement !== undefined && heir.landValueEntitlement > 0 ? (
                          <span className="text-[var(--theme-gold)]" dir="ltr">
                            {Math.round(heir.landValueEntitlement).toLocaleString()} {deceased.currency}
                          </span>
                        ) : (
                          <span className="text-red-400">
                            {language === "ur" ? "0 (زمین سے محروم بحکمِ فقیہ)" : "0 (Excluded from land under this Marja)"}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* EXPANDABLE SHAR'Ī PROOF DRAWER (Bayān al-Dalīl) */}
                {isProofExpanded && (
                  <div className="p-6 bg-[var(--theme-bg)]/90 border-t border-[var(--theme-border)] space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                      <BookOpen className="w-4 h-4" />
                      <span>{t.proofDrawerTitle}</span>
                    </div>

                    {/* Quranic Ayah Card */}
                    <div className="sacred-card p-4 rounded-xl space-y-2 border border-[var(--theme-gold)]/40">
                      <div className="flex items-center justify-between text-sm text-[var(--theme-gold)]">
                        <span className="font-bold">{t.quranProof}</span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-[var(--theme-gold)]/15">
                          {heir.proof.quranReference}
                        </span>
                      </div>
                      <p
                        className="font-naskh text-lg text-[var(--theme-text-primary)] leading-relaxed text-end pt-1"
                        dir="rtl"
                      >
                        {heir.proof.quranAyahArabic}
                      </p>
                      <p className="text-sm text-[var(--theme-text-muted)] italic leading-relaxed pt-1">
                        &ldquo;{heir.proof.quranAyahTranslation}&rdquo;
                      </p>
                    </div>

                    {/* Hadith citation if present */}
                    {heir.proof.hadithTextArabic && (
                      <div className="sacred-card p-4 rounded-xl space-y-1.5 border border-emerald-500/40">
                        <div className="flex items-center justify-between text-sm text-emerald-400">
                          <span className="font-bold">{t.hadithProof}</span>
                          <span className="text-sm font-mono text-[var(--theme-text-muted)]">
                            {heir.proof.hadithSource}
                          </span>
                        </div>
                        <p
                          className="font-naskh text-base text-[var(--theme-text-primary)] leading-relaxed text-end pt-1"
                          dir="rtl"
                        >
                          {heir.proof.hadithTextArabic}
                        </p>
                      </div>
                    )}

                    {/* Marja Mas'alah & Jurisprudential Rule */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="sacred-card p-3.5 rounded-xl">
                        <span className="font-bold text-[var(--theme-text-secondary)] block mb-1">
                          {t.marjaMasalah}
                        </span>
                        <span className="font-mono font-bold text-[var(--theme-gold)]">
                          {heir.proof.masalahReference}
                        </span>
                      </div>

                      <div className="sacred-card p-3.5 rounded-xl">
                        <span className="font-bold text-[var(--theme-text-secondary)] block mb-1">
                          {t.marjaRuleApplied}
                        </span>
                        <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                          {heir.proof.ruleExplanation}
                        </p>
                      </div>
                    </div>

                    {/* Deep Provenance Drawer Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        let topicKey: any = "PROXIMITY_TIER1_VS_GRANDCHILDREN";
                        if (heir.id.includes("wife") || heir.id.includes("husband")) {
                          topicKey = "WIDOW_LAND_VALUATION";
                        } else if (heir.id.includes("grandchild") || (heir as any).isDescendantRepresentation) {
                          topicKey = "TANZIL_REPRESENTATION";
                        } else if (heir.id.includes("daughter") || heir.id.includes("mother") || heir.id.includes("father")) {
                          topicKey = "BUTLAN_AL_AWL";
                        }
                        openProvenance(topicKey);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--theme-gold)]/10 hover:bg-[var(--theme-gold)] text-[var(--theme-gold)] hover:text-white border border-[var(--theme-gold)]/40 transition-all font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                    >
                      <Scale className="w-4 h-4" />
                      <span>
                        {language === "ur"
                          ? "تمام ۵ مراجع کی تفصیلی عبارات و تقابلی شرعی سند ملاحظہ فرمائیں"
                          : "Open Deep Scholarly Provenance & Comparative Marāji‘ Drawer"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Excluded Heirs Audit Table (Proximity Rule - Al-Aqrab Yamna‘ al-Ab‘ad) */}
      {result.excludedGrandchildren && result.excludedGrandchildren.length > 0 && (
        <div className="sacred-card p-6 rounded-2xl border-2 border-amber-300 bg-linear-to-br from-[#fdfbf7] to-[#f9f5ec] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold tracking-wider uppercase border border-amber-300">
                  <span>{language === "ur" ? "قاعدۂ اقربیت فعال (الأقرب یمنع الأبعد)" : "Proximity Rule Active"}</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#172e22] mt-0.5">
                  {language === "ur"
                    ? "محروم رشتہ داران کا شرعی آڈٹ (پوتے و نواسے)"
                    : "Excluded Descendants Audit (Grandchildren)"}
                </h3>
                <p className="text-xs text-stone-600 font-nastaliq leading-[2.2]">
                  {language === "ur"
                    ? "چونکہ متوفی کی سگی صلبی اولاد (بیٹا یا بیٹی) زندہ موجود ہے، اس لیے فقہِ جعفریہ میں تمام پوتے، پوتیاں، نواسے اور نواسیاں شرعاً ترکے سے مکمل طور پر محروم ہیں (حجبِ حرمان)۔"
                    : "Because direct children (sons or daughters) survive, all paternal and maternal grandchildren are excluded from statutory inheritance under the Golden Proximity Rule."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveVisualParadigm("snapshots");
                setActiveView("visuals");
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[#245642] to-[#172e22] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-110 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-nastaliq leading-[2.2]">
                {language === "ur" ? "شرعی منصوبہ بندی اسٹوڈیو میں ۱/۳ وصیت سے تحفظ دیں" : "Protect with 1/3 Waṣiyyah in Estate Planning Studio"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Excluded Relatives List */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start">
              <thead>
                <tr className="border-b border-amber-200 text-stone-500 font-bold uppercase">
                  <th className="py-2.5 px-3 text-start">{language === "ur" ? "رشتہ دار کا نام" : "Relative Name"}</th>
                  <th className="py-2.5 px-3 text-start">{language === "ur" ? "شاخ / نسبی واسطہ" : "Lineage Branch"}</th>
                  <th className="py-2.5 px-3 text-center">{language === "ur" ? "شرعی حصہ" : "Statutory Share"}</th>
                  <th className="py-2.5 px-3 text-start">{language === "ur" ? "سببِ حرمان (شرعی دلیل)" : "Jurisprudential Reason"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {result.excludedGrandchildren.map((eg) => (
                  <tr key={eg.id} className="hover:bg-amber-50/50">
                    <td className="py-3 px-3 font-bold text-[#172e22]">
                      {eg.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-semibold">
                        {eg.parentGender === "MALE"
                          ? language === "ur" ? `پوتا / پوتی (فرزند: ${eg.parentName})` : `Paternal (Son: ${eg.parentName})`
                          : language === "ur" ? `نواسہ / نواسی (دختر: ${eg.parentName})` : `Maternal (Daughter: ${eg.parentName})`}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-red-600">
                      0 {deceased.currency} (0%)
                    </td>
                    <td className="py-3 px-3 text-stone-600 font-nastaliq leading-[2.2]">
                      {language === "ur" ? eg.reasonUr : eg.reasonEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
};
