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
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

export const FamilyTree: React.FC = () => {
  const {
    language,
    deceased,
    heirs,
    updateHeirs,
    getCalculationResult,
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
      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-gold)] text-black shadow-sm">
        {found.fractionString} ({Math.round(found.totalMonetaryShare).toLocaleString()} {deceased.currency})
      </span>
    );
  };

  const isTier1Active = result.activeTier === 1;
  const isTier2Blocked = result.excludedTiers.includes(2);
  const isTier3Blocked = result.excludedTiers.includes(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* View Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[var(--theme-gold)]" />
            <span>{language === "ur" ? "شجرۂ تقسیمِ ارث (خاندانی نقشہ)" : "Shajarat al-Irth (Interactive Family Tree)"}</span>
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            {language === "ur"
              ? "ورثاء کے کارڈز پر کلک کر کے ان کی تعداد اور حیات تبدیل کریں؛ حجبِ حرمان خودکار ظاہر ہوگا۔"
              : "Click nodes to toggle living status; excluded tiers automatically gray out with cancellation lines."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-[var(--theme-card)] px-3 py-1.5 rounded-xl border border-[var(--theme-border)]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[var(--theme-text-secondary)]">Active Heir</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[var(--theme-text-secondary)]">Excluded (حجب)</span>
          </div>
        </div>
      </div>

      {/* Hierarchical Interactive Tree Canvas */}
      <div className="relative p-6 sm:p-10 rounded-2xl bg-[var(--theme-card)]/50 border border-[var(--theme-border)] shadow-xl overflow-x-auto">
        <div className="min-w-[800px] flex flex-col items-center space-y-12">
          {/* ROOT 1: SPOUSE & DECEASED LEVEL */}
          <div className="flex items-center justify-center gap-8 relative">
            {/* Spouse Node */}
            <div className="p-4 rounded-xl bg-[var(--theme-card)] border border-rose-500/50 shadow-md min-w-[200px] text-center space-y-2 relative">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" />
                {deceased.gender === "female" ? "Husband (Zawj)" : "Wife / Wives"}
              </span>

              {deceased.gender === "female" ? (
                <button
                  type="button"
                  onClick={() =>
                    updateHeirs({ spouseCount: heirs.spouseCount > 0 ? 0 : 1 })
                  }
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                    heirs.spouseCount > 0
                      ? "bg-rose-500/20 text-rose-300 border-rose-500"
                      : "bg-[var(--theme-bg)] text-[var(--theme-text-muted)] border-[var(--theme-border)]"
                  }`}
                >
                  {heirs.spouseCount > 0 ? "Surviving (زندہ)" : "Deceased / None"}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        spouseCount: Math.max(0, heirs.spouseCount - 1),
                      })
                    }
                    className="w-7 h-7 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-sm px-2">
                    {heirs.spouseCount} Wives
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        spouseCount: Math.min(4, heirs.spouseCount + 1),
                      })
                    }
                    className="w-7 h-7 rounded bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}

              {heirs.spouseCount > 0 && (
                <div className="pt-1">
                  {getShareBadge(deceased.gender === "female" ? "husband" : "wive")}
                </div>
              )}
            </div>

            {/* Marriage Connection Line */}
            <div className="w-12 h-0.5 bg-rose-500/60 relative">
              <Heart className="w-3.5 h-3.5 text-rose-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--theme-card)]" />
            </div>

            {/* Deceased Central Node */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--theme-gold)]/20 to-[var(--theme-gold-dark)]/20 border-2 border-[var(--theme-gold)] shadow-xl min-w-[220px] text-center space-y-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-[var(--theme-gold)] block">
                {language === "ur" ? "متوفی (اصل ترکہ)" : "The Deceased (Mawrith)"}
              </span>
              <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                {deceased.name || "Deceased"}
              </h3>
              <span className="text-xs text-[var(--theme-text-secondary)] font-medium block">
                {deceased.gender === "male" ? "Male (Marhūm)" : "Female (Marhūmah)"}
              </span>
              <div className="pt-2 text-xs font-mono text-[var(--theme-gold)] font-bold">
                {result.balanceSheet.netDistributableEstate.toLocaleString()}{" "}
                {deceased.currency} Net
              </div>
            </div>
          </div>

          {/* CONNECTOR LINE DOWN TO TIER 1 */}
          <div className="w-0.5 h-8 bg-[var(--theme-gold)]/60" />

          {/* TIER 1 NODES (PARENTS & CHILDREN) */}
          <div className="w-full p-6 rounded-2xl bg-[var(--theme-card)] border-2 border-[var(--theme-gold)] shadow-lg space-y-6 relative">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--theme-gold)]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                  {language === "ur" ? "طبقۂ اول: والدین اور اولاد" : "Tier 1: Parents & Children (Ṭabaqah 1)"}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {isTier1Active ? "ACTIVE TIER (وارث طبقہ)" : "Empty"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Father Node */}
              <div
                onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                  heirs.fatherAlive
                    ? "bg-[var(--theme-card-subtle)] border-emerald-500 shadow-md ring-1 ring-emerald-500"
                    : "bg-[var(--theme-bg)] border-[var(--theme-border)] opacity-60"
                }`}
              >
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.fatherAlive}
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] block mt-0.5">
                  {heirs.fatherAlive ? "Alive (زندہ)" : "Deceased (فوت)"}
                </span>
                {heirs.fatherAlive && (
                  <div className="mt-2">{getShareBadge("father")}</div>
                )}
              </div>

              {/* Mother Node */}
              <div
                onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                  heirs.motherAlive
                    ? "bg-[var(--theme-card-subtle)] border-emerald-500 shadow-md ring-1 ring-emerald-500"
                    : "bg-[var(--theme-bg)] border-[var(--theme-border)] opacity-60"
                }`}
              >
                <span className="text-xs font-bold text-[var(--theme-text-primary)] block">
                  {t.motherAlive}
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] block mt-0.5">
                  {heirs.motherAlive ? "Alive (زندہ)" : "Deceased (فوت)"}
                </span>
                {heirs.motherAlive && (
                  <div className="mt-2">{getShareBadge("mother")}</div>
                )}
              </div>

              {/* Sons Node */}
              <div className="p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-center space-y-2">
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
                    className="w-7 h-7 rounded bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-sm px-1">
                    {heirs.sonsCount || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                    }
                    className="w-7 h-7 rounded bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {(heirs.sonsCount || 0) > 0 && (
                  <div className="mt-1">{getShareBadge("son")}</div>
                )}
              </div>

              {/* Daughters Node */}
              <div className="p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-center space-y-2">
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
                    className="w-7 h-7 rounded bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-sm px-1">
                    {heirs.daughtersCount || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateHeirs({
                        daughtersCount: (heirs.daughtersCount || 0) + 1,
                      })
                    }
                    className="w-7 h-7 rounded bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {(heirs.daughtersCount || 0) > 0 && (
                  <div className="mt-1">{getShareBadge("daughter")}</div>
                )}
              </div>
            </div>
          </div>

          {/* TIER 2 SECTION (WITH DYNAMIC RED CANCELLATION LINE IF BLOCKED) */}
          <div className="w-full relative">
            {isTier2Blocked && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/60 backdrop-blur-[2px] rounded-2xl border-2 border-red-500 shadow-2xl p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-red-300 font-cinzel">
                  {language === "ur" ? "حجبِ حرمان کے تحت کلی طور پر محروم" : "EXCLUDED BY ḤUJUB AL-ḤIRMĀN"}
                </h4>
                <p className="text-xs text-red-200/90 max-w-md">
                  {language === "ur"
                    ? "طبقہ اول (والدین یا اولاد) کے ایک بھی وارث کی موجودگی میں دادا دادی اور بہن بھائیوں کا طبقہ دوم کلی طور پر ساقط ہو جاتا ہے۔"
                    : "The presence of any heir in Tier 1 completely and permanently excludes Tier 2 Grandparents and Siblings under Ja'fari Law."}
                </p>
              </div>
            )}

            <div
              className={`p-6 rounded-2xl border bg-[var(--theme-card)]/40 ${
                isTier2Blocked ? "border-red-500/50 opacity-40 line-through" : "border-[var(--theme-border)]"
              } space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  {language === "ur" ? "طبقۂ دوم: دادا دادی اور بہن بھائی" : "Tier 2: Grandparents & Siblings (Ṭabaqah 2)"}
                </h3>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">
                  {isTier2Blocked ? "Blocked (0 Share)" : "Active"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-center">
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Paternal Grandparents
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Maternal Grandparents
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Full Brothers & Sisters
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Uterine Siblings
                </div>
              </div>
            </div>
          </div>

          {/* TIER 3 SECTION (WITH RED CANCELLATION LINE) */}
          <div className="w-full relative">
            {(isTier1Active || isTier2Blocked || isTier3Blocked) && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/60 backdrop-blur-[2px] rounded-2xl border-2 border-red-500 shadow-2xl p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-red-300 font-cinzel">
                  {language === "ur" ? "طبقہ سوم: حجبِ حرمان" : "TIER 3 EXCLUDED (ḤUJUB AL-ḤIRMĀN)"}
                </h4>
                <p className="text-xs text-red-200/90 max-w-md">
                  {language === "ur"
                    ? "چچا، پھوپھیاں، ماموں اور خالائیں طبقہ اول یا طبقہ دوم کی موجودگی میں وارث نہیں بن سکتے۔"
                    : "Uncles, Aunts, and Cousins are entirely excluded while any preceding Tier heir survives."}
                </p>
              </div>
            )}

            <div
              className={`p-6 rounded-2xl border bg-[var(--theme-card)]/40 ${
                isTier1Active || isTier2Blocked || isTier3Blocked
                  ? "border-red-500/50 opacity-40 line-through"
                  : "border-[var(--theme-border)]"
              } space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  {language === "ur" ? "طبقۂ سوم: چچا، پھوپھیاں، ماموں، خالائیں" : "Tier 3: Uncles & Aunts (Ṭabaqah 3)"}
                </h3>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">
                  Blocked (0 Share)
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-center">
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Paternal Uncles & Aunts
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Maternal Uncles & Aunts
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                  Cousins (Descendants)
                </div>
                <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
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
