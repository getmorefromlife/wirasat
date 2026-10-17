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
            <span>{t.resultsTitle}</span>
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            {language === "ur"
              ? `مرجعِ تقلید: ${marjaInfo.nameUr} کے فتاویٰ کے مطابق حساب شدہ`
              : `Calculated strictly according to the rulings of ${marjaInfo.nameEn}`}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("matrix")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl sacred-card text-xs font-bold text-[var(--theme-gold)] hover:border-[var(--theme-gold)] transition-all shadow-sm"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.btnQuickMatrix}</span>
          </button>

          <button
            onClick={() => setActiveView("certificate")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black text-xs font-bold hover:brightness-110 shadow-lg shadow-[var(--theme-gold)]/20 transition-all"
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
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/60 text-amber-200 text-xs space-y-1.5 shadow-md">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.awlCardTitle}</span>
            </div>
            <p className="leading-relaxed text-amber-200/90">{t.awlCardBody}</p>
          </div>
        )}

        {/* Repudiation of Ta‘ṣīb Banner */}
        {result.rejectionOfTasibApplied && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 text-emerald-200 text-xs space-y-1.5 shadow-md">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.tasibCardTitle}</span>
            </div>
            <p className="leading-relaxed text-emerald-200/90">{t.tasibCardBody}</p>
          </div>
        )}

        {/* Mother Sibling Reduction Banner */}
        {result.motherHujubNuqsanApplied && (
          <div className="p-4 rounded-2xl sacred-card text-xs text-[var(--theme-text-secondary)] flex items-start gap-3">
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
          <div className="p-5 rounded-2xl sacred-card border-2 border-[var(--theme-gold)]/60 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black flex items-center justify-center shrink-0 shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xs uppercase tracking-widest text-[var(--theme-gold)] block">
                  {t.habwahTitle}
                </span>
                <p className="text-xs font-bold text-[var(--theme-text-primary)] mt-0.5">
                  {result.habwahAwarded.items.join(" • ")}
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-mono">
                  {result.habwahAwarded.reason}
                </p>
              </div>
            </div>

            {result.habwahAwarded.value > 0 && (
              <div className="text-start sm:text-end p-2.5 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                <span className="text-[10px] text-[var(--theme-text-muted)] block uppercase font-bold">
                  Estimated Value
                </span>
                <span className="font-mono font-bold text-base text-[var(--theme-gold)]">
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
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
                        {heir.tier === 0
                          ? language === "ur"
                            ? "شریکِ حیات"
                            : "Spouse"
                          : `${language === "ur" ? "طبقہ" : "Tier"} ${heir.tier}`}
                      </span>
                      {heir.count > 1 && (
                        <span className="text-xs text-[var(--theme-text-muted)] font-medium">
                          ({heir.count} {language === "ur" ? "افراد" : "individuals"})
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)]">
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
                        <span className="font-mono text-2xl sm:text-3xl font-black gold-gradient-text">
                          {heir.fractionString}
                        </span>
                        <span className="text-xs text-[var(--theme-text-muted)] font-mono font-semibold">
                          ({heir.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--theme-text-muted)] block">
                        {t.fractionCol}
                      </span>
                    </div>

                    {/* Monetary Share */}
                    <div className="text-end min-w-[130px]">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] block">
                        {Math.round(heir.totalMonetaryShare).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[var(--theme-gold)] font-bold block">
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
                      className={`p-2.5 rounded-xl border transition-all ${
                        isProofExpanded
                          ? "bg-[var(--theme-gold)] text-black border-[var(--theme-gold)] shadow-md"
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
                  <div className="px-6 py-3 bg-[var(--theme-card-subtle)] border-t border-[var(--theme-border)] text-xs grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--theme-text-secondary)]">
                    <div>
                      <span className="text-[var(--theme-text-muted)] block text-[11px]">
                        {language === "ur"
                          ? "عمارات، درخت و منقولہ اشیاء سے حصہ:"
                          : "Buildings, Trees & Chattels Share:"}
                      </span>
                      <span className="font-mono font-bold text-[var(--theme-text-primary)] text-sm">
                        {Math.round(heir.movableAndBuildingEntitlement).toLocaleString()}{" "}
                        {deceased.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--theme-text-muted)] block text-[11px]">
                        {language === "ur" ? "اراضی کی قیمت سے حصہ:" : "Land Valuation Share:"}
                      </span>
                      <span className="font-mono font-bold text-sm">
                        {heir.landValueEntitlement !== undefined && heir.landValueEntitlement > 0 ? (
                          <span className="text-[var(--theme-gold)]">
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
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                      <BookOpen className="w-4 h-4" />
                      <span>{t.proofDrawerTitle}</span>
                    </div>

                    {/* Quranic Ayah Card */}
                    <div className="sacred-card p-4 rounded-xl space-y-2 border border-[var(--theme-gold)]/40">
                      <div className="flex items-center justify-between text-xs text-[var(--theme-gold)]">
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
                      <p className="text-xs text-[var(--theme-text-muted)] italic leading-relaxed pt-1">
                        &ldquo;{heir.proof.quranAyahTranslation}&rdquo;
                      </p>
                    </div>

                    {/* Hadith citation if present */}
                    {heir.proof.hadithTextArabic && (
                      <div className="sacred-card p-4 rounded-xl space-y-1.5 border border-emerald-500/40">
                        <div className="flex items-center justify-between text-xs text-emerald-400">
                          <span className="font-bold">{t.hadithProof}</span>
                          <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
