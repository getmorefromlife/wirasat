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
} from "lucide-react";

export const Step5Results: React.FC = () => {
  const {
    language,
    deceased,
    getCalculationResult,
    setActiveView,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const marjaInfo = MARJA_DATABASE[deceased.marja];
  const result = getCalculationResult();

  const [expandedProofId, setExpandedProofId] = useState<string | null>(null);

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
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <Award className="w-6 h-6 text-[var(--theme-gold)]" />
            {t.resultsTitle}
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            {language === "ur"
              ? `مرجعِ تقلید: ${marjaInfo.nameUr} کے فتاویٰ کے مطابق حساب شدہ`
              : `Calculated according to the rulings of ${marjaInfo.nameEn}`}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("matrix")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-gold)]/40 text-xs font-semibold text-[var(--theme-gold)] hover:bg-[var(--theme-gold)]/10 transition-all"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.btnQuickMatrix}</span>
          </button>

          <button
            onClick={() => setActiveView("certificate")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-gold)] text-black text-xs font-bold hover:bg-[var(--theme-gold-light)] shadow-md shadow-[var(--theme-gold)]/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.btnPrintPdf}</span>
          </button>
        </div>
      </div>

      {/* Special Fiqh Principles Applied Banners */}
      <div className="space-y-3">
        {/* Repudiation of ‘Awl Banner */}
        {result.rejectionOfAwlApplied && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 text-amber-200 text-xs space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.awlCardTitle}</span>
            </div>
            <p className="leading-relaxed text-amber-200/90">{t.awlCardBody}</p>
          </div>
        )}

        {/* Repudiation of Ta‘ṣīb Banner */}
        {result.rejectionOfTasibApplied && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 text-emerald-200 text-xs space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.tasibCardTitle}</span>
            </div>
            <p className="leading-relaxed text-emerald-200/90">{t.tasibCardBody}</p>
          </div>
        )}

        {/* Mother Sibling Reduction Banner */}
        {result.motherHujubNuqsanApplied && (
          <div className="p-3.5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-secondary)] flex items-start gap-2">
            <Info className="w-4 h-4 text-[var(--theme-gold)] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--theme-text-primary)] block">
                {language === "ur" ? "حجبِ نقصان کا اطلاق:" : "Ḥujub al-Nuqṣān Applied:"}
              </span>
              <p className="mt-0.5">
                {language === "ur"
                  ? "متوفی کے بھائیوں کی موجودگی کے سبب والدہ کا حصہ 1/3 سے گھٹ کر 1/6 ہو گیا اور وہ رد کے زائد مال سے مستثنیٰ ہیں۔"
                  : "Mother's share is reduced from 1/3 to 1/6 due to the presence of qualifying brothers, and she does not participate in Radd."}
              </p>
            </div>
          </div>
        )}

        {/* Eldest Son Habwah Banner */}
        {result.habwahAwarded.awarded && (
          <div className="p-4 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-gold)]/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--theme-gold)]/10 text-[var(--theme-gold)] flex items-center justify-center shrink-0 mt-0.5">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--theme-gold)] block">
                  {t.habwahTitle}
                </span>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5">
                  {result.habwahAwarded.items.join(" • ")}
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-mono">
                  {result.habwahAwarded.reason}
                </p>
              </div>
            </div>

            {result.habwahAwarded.value > 0 && (
              <div className="text-end">
                <span className="text-[10px] text-[var(--theme-text-muted)] block uppercase">
                  Est. Value
                </span>
                <span className="font-mono font-bold text-sm text-[var(--theme-gold)]">
                  {result.habwahAwarded.value.toLocaleString()} {deceased.currency}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Heirs Breakdown Cards */}
      <div className="space-y-4">
        {result.heirShares.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] text-sm">
            {language === "ur"
              ? "ترکہ زیرِ بارِ قرض ہے یا کوئی وارث موجود نہیں ہے۔"
              : "Estate is insolvent or no qualifying heirs are present."}
          </div>
        ) : (
          result.heirShares.map((heir) => {
            const isProofExpanded = expandedProofId === heir.id;
            return (
              <div
                key={heir.id}
                className="rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] hover:border-[var(--theme-gold)]/40 transition-all overflow-hidden shadow-sm"
              >
                {/* Main Heir Card Row */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--theme-gold)]/10 text-[var(--theme-gold)] border border-[var(--theme-gold)]/20">
                        {heir.tier === 0
                          ? language === "ur"
                            ? "شریکِ حیات"
                            : "Spouse"
                          : `${language === "ur" ? "طبقہ" : "Tier"} ${heir.tier}`}
                      </span>
                      {heir.count > 1 && (
                        <span className="text-xs text-[var(--theme-text-muted)]">
                          ({heir.count} {language === "ur" ? "افراد" : "individuals"})
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--theme-text-primary)]">
                      {getHeirTitle(heir)}
                    </h3>

                    {heir.notes.length > 0 && (
                      <p className="text-xs text-[var(--theme-text-muted)]">
                        {heir.notes.join(" • ")}
                      </p>
                    )}
                  </div>

                  {/* Financial & Fractional Metrics */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-[var(--theme-border)]/60 pt-3 sm:pt-0">
                    {/* Prescribed Fraction & Percentage */}
                    <div className="text-start sm:text-end">
                      <div className="flex items-baseline gap-1.5 sm:justify-end">
                        <span className="font-mono text-xl sm:text-2xl font-black text-[var(--theme-gold)]">
                          {heir.fractionString}
                        </span>
                        <span className="text-xs text-[var(--theme-text-muted)] font-mono">
                          ({heir.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--theme-text-muted)] block uppercase">
                        {t.fractionCol}
                      </span>
                    </div>

                    {/* Monetary Share */}
                    <div className="text-end min-w-[120px]">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] block">
                        {Math.round(heir.totalMonetaryShare).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[var(--theme-gold)] font-medium block">
                        {deceased.currency} {heir.count > 1 ? `(Total)` : ""}
                      </span>
                      {heir.count > 1 && (
                        <span className="text-[11px] text-[var(--theme-text-muted)] font-mono block">
                          {Math.round(heir.sharePerIndividual).toLocaleString()} each
                        </span>
                      )}
                    </div>

                    {/* Shar'i Proof Drawer Toggle Button */}
                    <button
                      onClick={() => toggleProof(heir.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isProofExpanded
                          ? "bg-[var(--theme-gold)] text-black border-[var(--theme-gold)]"
                          : "bg-[var(--theme-bg)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:text-white"
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
                  <div className="px-5 py-2.5 bg-[var(--theme-card-subtle)] border-t border-[var(--theme-border)] text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--theme-text-secondary)]">
                    <div>
                      <span className="text-[var(--theme-text-muted)] block">
                        {language === "ur" ? "عمارات، درخت و منقولہ اشیاء سے حصہ:" : "Buildings, Trees & Chattels Share:"}
                      </span>
                      <span className="font-mono font-bold text-[var(--theme-text-primary)]">
                        {Math.round(heir.movableAndBuildingEntitlement).toLocaleString()}{" "}
                        {deceased.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--theme-text-muted)] block">
                        {language === "ur" ? "اراضی کی قیمت سے حصہ:" : "Land Valuation Share:"}
                      </span>
                      <span className="font-mono font-bold text-[var(--theme-text-primary)]">
                        {heir.landValueEntitlement !== undefined && heir.landValueEntitlement > 0
                          ? `${Math.round(heir.landValueEntitlement).toLocaleString()} ${deceased.currency}`
                          : language === "ur"
                          ? "0 (زمین سے محروم بحکمِ فقیہ)"
                          : "0 (Excluded from land under this Marja)"}
                      </span>
                    </div>
                  </div>
                )}

                {/* EXPANDABLE SHAR'Ī PROOF DRAWER (Bayān al-Dalīl) */}
                {isProofExpanded && (
                  <div className="p-5 bg-[var(--theme-bg)] border-t border-[var(--theme-border)] space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                      <BookOpen className="w-4 h-4" />
                      <span>{t.proofDrawerTitle}</span>
                    </div>

                    {/* Quranic Ayah */}
                    <div className="p-3.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-2">
                      <div className="flex items-center justify-between text-xs text-[var(--theme-gold)]">
                        <span className="font-bold">{t.quranProof}</span>
                        <span className="font-mono">{heir.proof.quranReference}</span>
                      </div>
                      <p className="font-naskh text-base text-[var(--theme-text-primary)] leading-relaxed text-end" dir="rtl">
                        {heir.proof.quranAyahArabic}
                      </p>
                      <p className="text-xs text-[var(--theme-text-muted)] italic leading-relaxed">
                        &ldquo;{heir.proof.quranAyahTranslation}&rdquo;
                      </p>
                    </div>

                    {/* Hadith citation if present */}
                    {heir.proof.hadithTextArabic && (
                      <div className="p-3.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-emerald-400">
                          <span className="font-bold">{t.hadithProof}</span>
                          <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                            {heir.proof.hadithSource}
                          </span>
                        </div>
                        <p className="font-naskh text-sm text-[var(--theme-text-primary)] leading-relaxed text-end" dir="rtl">
                          {heir.proof.hadithTextArabic}
                        </p>
                      </div>
                    )}

                    {/* Marja Mas'alah & Jurisprudential Rule */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)]">
                        <span className="font-bold text-[var(--theme-text-secondary)] block mb-1">
                          {t.marjaMasalah}
                        </span>
                        <span className="font-mono text-[var(--theme-gold)]">
                          {heir.proof.masalahReference}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)]">
                        <span className="font-bold text-[var(--theme-text-secondary)] block mb-1">
                          {t.marjaRuleApplied}
                        </span>
                        <p className="text-[var(--theme-text-secondary)] text-[11px] leading-relaxed">
                          {heir.proof.ruleExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
