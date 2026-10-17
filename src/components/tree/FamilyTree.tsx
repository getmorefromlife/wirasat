"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  GitFork,
  Users,
  Heart,
  Crown,
  Lock,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export const FamilyTree: React.FC = () => {
  const {
    language,
    deceased,
    heirs,
    updateHeirs,
    getCalculationResult,
    setActiveView,
    setWizardStep,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const result = getCalculationResult();

  // Helper to find calculated share for an heir id/key
  const getShareBadge = (keyMatch: string) => {
    const found = result.heirShares.find(
      (h) => h.id.includes(keyMatch) || h.relationKey.includes(keyMatch)
    );
    if (!found) return null;
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black font-mono font-bold text-xs shadow-md shadow-[var(--theme-gold)]/20">
        <span>{found.fractionString}</span>
        <span>•</span>
        <span>
          {Math.round(found.totalMonetaryShare).toLocaleString()} {deceased.currency}
        </span>
      </div>
    );
  };

  const isTier1Active = result.activeTier === 1;
  const isTier2Blocked = result.excludedTiers.includes(2);
  const isTier3Blocked = result.excludedTiers.includes(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* View Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[var(--theme-gold)]" />
            <span>
              {language === "ur"
                ? "شجرۂ تقسیمِ ارث (خاندانی نقشہ)"
                : "Shajarat al-Irth (Interactive Sacred Family Tree)"}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-1">
            {language === "ur"
              ? "ورثاء کے کارڈز پر کلک کر کے تعداد بدلیں؛ قرآنی حصص اور حجبِ حرمان خودکار ظاہر ہوں گے۔"
              : "Directly click nodes to toggle alive/deceased status or adjust child counts; share badges and exclusion seals update live."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs sacred-card px-4 py-2 rounded-xl self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[var(--theme-text-secondary)] font-medium">Active Heir</span>
          </div>
          <span className="text-[var(--theme-border)]">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-[var(--theme-text-secondary)] font-medium">Excluded (حجبِ حرمان)</span>
          </div>
        </div>
      </div>

      {/* THE SACRED GENEALOGICAL CANVAS */}
      <div className="sacred-card p-6 sm:p-12 rounded-3xl relative overflow-x-auto shadow-2xl border-2 border-[var(--theme-gold)]/40">
        <div className="min-w-[850px] flex flex-col items-center space-y-12 relative z-10">
          {/* LEVEL 1: SPOUSE & DECEASED (CENTRAL MIHRAB) */}
          <div className="flex items-center justify-center gap-8 relative">
            {/* Spouse Wing */}
            <div className="sacred-card p-5 rounded-2xl border-2 border-rose-500/50 shadow-xl min-w-[240px] text-center space-y-3 relative">
              <span className="text-xs font-black tracking-widest text-rose-400 uppercase flex items-center justify-center gap-1.5">
                <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400" />
                {deceased.gender === "female" ? "Husband (الزوج)" : "Wife / Wives (الزوجات)"}
              </span>

              {deceased.gender === "female" ? (
                <button
                  type="button"
                  onClick={() =>
                    updateHeirs({ spouseCount: heirs.spouseCount > 0 ? 0 : 1 })
                  }
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    heirs.spouseCount > 0
                      ? "bg-rose-500/20 text-rose-300 border-rose-500 shadow-md ring-1 ring-rose-400"
                      : "bg-[var(--theme-bg)] text-[var(--theme-text-muted)] border-[var(--theme-border)]"
                  }`}
                >
                  {heirs.spouseCount > 0 ? "✓ Surviving (زندہ)" : "Deceased / None"}
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateHeirs({
                          spouseCount: Math.max(0, heirs.spouseCount - 1),
                        })
                      }
                      className="w-8 h-8 rounded-lg bg-[var(--theme-bg)] hover:bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] flex items-center justify-center text-xs font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-base px-3 py-1 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                      {heirs.spouseCount} {heirs.spouseCount === 1 ? "Wife" : "Wives"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateHeirs({
                          spouseCount: Math.min(4, heirs.spouseCount + 1),
                        })
                      }
                      className="w-8 h-8 rounded-lg bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center text-xs hover:bg-[var(--theme-gold-light)]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {heirs.spouseCount > 0 && (
                <div className="pt-1">
                  {getShareBadge(deceased.gender === "female" ? "husband" : "wive")}
                </div>
              )}
            </div>

            {/* Marriage Golden Connector */}
            <div className="w-16 h-1 bg-gradient-to-r from-rose-500/60 to-[var(--theme-gold)] relative">
              <div className="w-6 h-6 rounded-full bg-[var(--theme-card)] border border-[var(--theme-gold)] flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow">
                <Heart className="w-3 h-3 text-[var(--theme-gold)] fill-[var(--theme-gold)]" />
              </div>
            </div>

            {/* Deceased Central Arch (Mihrab) */}
            <div className="sacred-card-active p-6 rounded-3xl border-2 border-[var(--theme-gold)] shadow-2xl min-w-[260px] text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--theme-gold-light)] via-[var(--theme-gold)] to-[var(--theme-gold-dark)]" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black font-cinzel font-bold text-xl flex items-center justify-center mx-auto shadow-lg shadow-[var(--theme-gold)]/20">
                م
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-[var(--theme-gold)] block">
                {language === "ur" ? "المورث (متوفی)" : "The Deceased (Al-Mūrith)"}
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
                {deceased.name || "Deceased"}
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] font-medium">
                {deceased.gender === "male" ? "Male (Marhūm)" : "Female (Marhūmah)"}
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-[var(--theme-gold)]">
                Net: {Math.round(result.balanceSheet.netDistributableEstate).toLocaleString()}{" "}
                {deceased.currency}
              </div>
            </div>
          </div>

          {/* CONNECTOR STEM DOWN TO TIER 1 */}
          <div className="w-1 h-10 bg-gradient-to-b from-[var(--theme-gold)] to-[var(--theme-border-strong)] rounded-full" />

          {/* LEVEL 2: TIER 1 (PARENTS & CHILDREN) */}
          <div className="w-full sacred-card p-6 sm:p-8 rounded-3xl border-2 border-[var(--theme-gold)] shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--theme-gold)]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                  {language === "ur"
                    ? "الطبقۃ الاولیٰ: والدین اور اولاد"
                    : "Tier 1: Parents & Children (Ṭabaqah 1)"}
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {isTier1Active ? "ACTIVE TIER (وارث طبقہ)" : "Empty"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Father Node */}
              <div
                onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                  heirs.fatherAlive
                    ? "sacred-card-active border-emerald-400 shadow-lg ring-1 ring-emerald-400"
                    : "sacred-card opacity-50 border-[var(--theme-border)]"
                }`}
              >
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.fatherAlive}
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] block mt-0.5 font-medium">
                  {heirs.fatherAlive ? "✓ Alive (زندہ)" : "Deceased (فوت)"}
                </span>
                {heirs.fatherAlive && (
                  <div className="mt-2.5">{getShareBadge("father")}</div>
                )}
              </div>

              {/* Mother Node */}
              <div
                onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                  heirs.motherAlive
                    ? "sacred-card-active border-emerald-400 shadow-lg ring-1 ring-emerald-400"
                    : "sacred-card opacity-50 border-[var(--theme-border)]"
                }`}
              >
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.motherAlive}
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] block mt-0.5 font-medium">
                  {heirs.motherAlive ? "✓ Alive (زندہ)" : "Deceased (فوت)"}
                </span>
                {heirs.motherAlive && (
                  <div className="mt-2.5">{getShareBadge("mother")}</div>
                )}
              </div>

              {/* Sons Node */}
              <div className="sacred-card p-4 rounded-2xl border border-[var(--theme-border)] text-center space-y-2">
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.sonsCount}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        sonsCount: Math.max(0, (heirs.sonsCount || 0) - 1),
                      })
                    }
                    className="w-7 h-7 rounded-lg bg-[var(--theme-bg)] hover:bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-base px-2 py-0.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                    {heirs.sonsCount || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                    }
                    className="w-7 h-7 rounded-lg bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center text-xs hover:bg-[var(--theme-gold-light)]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {(heirs.sonsCount || 0) > 0 && (
                  <div className="mt-2">{getShareBadge("son")}</div>
                )}
              </div>

              {/* Daughters Node */}
              <div className="sacred-card p-4 rounded-2xl border border-[var(--theme-border)] text-center space-y-2">
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.daughtersCount}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        daughtersCount: Math.max(0, (heirs.daughtersCount || 0) - 1),
                      })
                    }
                    className="w-7 h-7 rounded-lg bg-[var(--theme-bg)] hover:bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-base px-2 py-0.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                    {heirs.daughtersCount || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        daughtersCount: (heirs.daughtersCount || 0) + 1,
                      })
                    }
                    className="w-7 h-7 rounded-lg bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center text-xs hover:bg-[var(--theme-gold-light)]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {(heirs.daughtersCount || 0) > 0 && (
                  <div className="mt-2">{getShareBadge("daughter")}</div>
                )}
              </div>
            </div>
          </div>

          {/* LEVEL 3: TIER 2 (GRANDPARENTS & SIBLINGS) WITH DYNAMIC ḤUJUB AL-ḤIRMĀN SEAL */}
          <div className="w-full relative">
            {isTier2Blocked && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/75 backdrop-blur-sm rounded-3xl border-2 border-red-500 shadow-2xl p-6 text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-xl">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-red-300 font-cinzel tracking-wider">
                  {language === "ur" ? "حجبِ حرمان کے تحت کلی طور پر محروم" : "EXCLUDED BY ḤUJUB AL-ḤIRMĀN"}
                </h4>
                <p className="text-xs text-red-200/90 max-w-lg leading-relaxed">
                  {language === "ur"
                    ? "طبقہ اول (والدین یا اولاد) کا وارث موجود ہونے کی وجہ سے دادا دادی اور بہن بھائیوں کا طبقہ دوم کلی طور پر ساقط ہے۔"
                    : "The presence of a living heir in Tier 1 completely and permanently excludes Tier 2 (Grandparents & Siblings) under Ja'fari Jurisprudence."}
                </p>
              </div>
            )}

            <div
              className={`p-6 rounded-3xl sacred-card ${
                isTier2Blocked ? "opacity-30 line-through border-red-500/40" : "border-[var(--theme-border)]"
              } space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Tier 2: Grandparents &amp; Siblings (الطبقة الثانية)
                </h3>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">
                  {isTier2Blocked ? "Blocked (0 Share)" : "Active"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-center">
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Paternal Grandparents
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Maternal Grandparents
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Full Brothers &amp; Sisters
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Uterine Siblings
                </div>
              </div>
            </div>
          </div>

          {/* LEVEL 4: TIER 3 (UNCLES & AUNTS) */}
          <div className="w-full relative">
            {(isTier1Active || isTier2Blocked || isTier3Blocked) && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/75 backdrop-blur-sm rounded-3xl border-2 border-red-500 shadow-2xl p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-xl">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-red-300 font-cinzel tracking-wider">
                  {language === "ur" ? "طبقہ سوم: حجبِ حرمان" : "TIER 3 EXCLUDED (ḤUJUB AL-ḤIRMĀN)"}
                </h4>
                <p className="text-xs text-red-200/90 max-w-lg leading-relaxed">
                  {language === "ur"
                    ? "چچا، پھوپھیاں، ماموں اور خالائیں طبقہ اول یا دوم کی موجودگی میں وارث نہیں بن سکتے۔"
                    : "Uncles, Aunts, and Cousins are entirely excluded while any preceding Tier heir survives."}
                </p>
              </div>
            )}

            <div
              className={`p-6 rounded-3xl sacred-card ${
                isTier1Active || isTier2Blocked || isTier3Blocked
                  ? "opacity-30 line-through border-red-500/40"
                  : "border-[var(--theme-border)]"
              } space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Tier 3: Uncles &amp; Aunts (الطبقة الثالثة)
                </h3>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">
                  Blocked (0 Share)
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-center">
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Paternal Uncles &amp; Aunts
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Maternal Uncles &amp; Aunts
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Cousins (Descendants)
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Consanguine Uncles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
