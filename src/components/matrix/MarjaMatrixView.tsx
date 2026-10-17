"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { calculateInheritance } from "@/lib/fiqh-engine";
import { TRANSLATIONS } from "@/lib/translations";
import { MarjaId } from "@/types/fiqh";
import {
  Scale,
  Check,
  AlertCircle,
  Building,
  TreePine,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export const MarjaMatrixView: React.FC = () => {
  const {
    language,
    deceased,
    assets,
    debts,
    heirs,
    setMarja,
    setActiveView,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const marjaIds: MarjaId[] = [
    "sistani",
    "khamenei",
    "khoei",
    "makarem",
    "najafi",
  ];

  // Calculate results for all 5 Maraji' simultaneously
  const matrixResults = marjaIds.map((mId) => {
    const customDeceased = { ...deceased, marja: mId };
    const res = calculateInheritance(customDeceased, assets, debts, heirs);
    return {
      marja: MARJA_DATABASE[mId],
      result: res,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <Scale className="w-6 h-6 text-[var(--theme-gold)]" />
            <span>
              {language === "ur"
                ? "موازنہ فتاویٰ مراجعِ عظام (پانچوں مراجع کا تقابل)"
                : "Side-by-Side Marja‘ Comparative Matrix"}
            </span>
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            {language === "ur"
              ? "موجودہ ترکہ کے اعداد و شمار پر پانچوں مراجع کے فتاویٰ کا بیک وقت نفاذ اور فرق کا مشاہدہ کریں۔"
              : "Execute current estate numbers simultaneously across all 5 contemporary Grand Ayatollahs to view monetary divergences."}
          </p>
        </div>

        <button
          onClick={() => setActiveView("wizard")}
          className="px-4 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-gold)]/40 text-xs font-semibold text-[var(--theme-gold)] hover:bg-[var(--theme-gold)]/10 transition-all self-start"
        >
          {language === "ur" ? "← واپس کیلکولیٹر" : "← Back to Wizard"}
        </button>
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {matrixResults.map(({ marja, result }) => {
          const isCurrentActive = deceased.marja === marja.id;

          // Find widow share if any
          const widowShare = result.heirShares.find(
            (h) => h.relationKey === "wife" || h.relationKey === "wives"
          );

          return (
            <div
              key={marja.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isCurrentActive
                  ? "bg-[var(--theme-card)] border-[var(--theme-gold)] shadow-xl ring-2 ring-[var(--theme-gold)]"
                  : "bg-[var(--theme-card)]/50 border-[var(--theme-border)] hover:border-[var(--theme-gold)]/40"
              }`}
            >
              <div>
                {/* Marja Title Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--theme-gold)]">
                    {marja.id.toUpperCase()}
                  </span>
                  {isCurrentActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-gold)] text-black">
                      Active
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">
                  {language === "ur" ? marja.nameUr : marja.nameEn}
                </h3>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-naskh mt-0.5">
                  {marja.treatiseBook}
                </p>

                {/* Land Entitlement Summary */}
                <div className="mt-4 p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] space-y-1.5 text-xs">
                  <span className="font-bold text-[var(--theme-gold)] text-[11px] block">
                    {language === "ur" ? "اراضی میں بیوہ کا حق:" : "Widow's Land Right:"}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        marja.widowInheritsLandValue
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                    />
                    <span className="font-semibold text-[var(--theme-text-secondary)]">
                      {marja.widowInheritsLandValue
                        ? language === "ur"
                          ? "تمام زمینوں کی قیمت سے حقدار"
                          : "Inherits value of all land"
                        : language === "ur"
                        ? "زمین سے محروم (صرف عمارات)"
                        : "Zero from land (buildings only)"}
                    </span>
                  </div>
                </div>

                {/* Calculated Widow Payout under this Marja */}
                {widowShare && (
                  <div className="mt-3 p-3 rounded-xl bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] space-y-1 text-xs">
                    <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">
                      {language === "ur" ? "بیوہ کا کل مالی حصہ:" : "Widow's Monetary Share:"}
                    </span>
                    <span className="font-mono font-bold text-base text-[var(--theme-gold)] block">
                      {Math.round(widowShare.totalMonetaryShare).toLocaleString()}{" "}
                      <span className="text-xs">{deceased.currency}</span>
                    </span>
                    <span className="text-[10px] text-[var(--theme-text-muted)] block">
                      Fraction: {widowShare.fractionString}
                    </span>
                  </div>
                )}

                {/* Ḥabwah Ruling Text */}
                <div className="mt-3 text-[11px] text-[var(--theme-text-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--theme-text-secondary)] block mb-0.5">
                    {language === "ur" ? "حکمِ حَبْوہ:" : "Ḥabwah Stance:"}
                  </span>
                  <p className="line-clamp-4">
                    {language === "ur"
                      ? marja.habwahRulingUr
                      : marja.habwahRulingEn}
                  </p>
                </div>
              </div>

              {/* Action Button: Set as Active Marja */}
              <button
                type="button"
                onClick={() => setMarja(marja.id)}
                disabled={isCurrentActive}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrentActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                    : "bg-[var(--theme-gold)] hover:bg-[var(--theme-gold-light)] text-black shadow-md shadow-[var(--theme-gold)]/20"
                }`}
              >
                {isCurrentActive
                  ? language === "ur"
                    ? "✓ فعال مرجع"
                    : "✓ Currently Enforced"
                  : language === "ur"
                  ? "یہ فتویٰ نافذ کریں"
                  : "Enforce this Fatwa"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
