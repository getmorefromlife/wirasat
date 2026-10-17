"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Users,
  Heart,
  Lock,
  Unlock,
  AlertCircle,
  Plus,
  Minus,
  Baby,
} from "lucide-react";

export const Step4Relatives: React.FC = () => {
  const { language, deceased, heirs, updateHeirs } = useInheritanceStore();
  const t = TRANSLATIONS[language];

  // Tier 1 presence check
  const hasTier1Heir =
    (heirs.fatherAlive && !heirs.fatherImpediment) ||
    (heirs.motherAlive && !heirs.motherImpediment) ||
    (heirs.sonsCount || 0) > 0 ||
    (heirs.daughtersCount || 0) > 0;

  // Tier 2 presence check
  const hasTier2Heir =
    heirs.paternalGrandfatherAlive ||
    heirs.paternalGrandmotherAlive ||
    heirs.maternalGrandfatherAlive ||
    heirs.maternalGrandmotherAlive ||
    (heirs.fullBrothersCount || 0) > 0 ||
    (heirs.fullSistersCount || 0) > 0 ||
    (heirs.paternalBrothersCount || 0) > 0 ||
    (heirs.paternalSistersCount || 0) > 0 ||
    (heirs.uterineBrothersCount || 0) > 0 ||
    (heirs.uterineSistersCount || 0) > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4">
        <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
          <Users className="w-6 h-6 text-[var(--theme-gold)]" />
          {t.step4Title}
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step4Desc}
        </p>
      </div>

      {/* SECTION 1: Spouses (Non-Blockable - Zawj / Zawjah) */}
      <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.spousesHeading}
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-medium">
            {language === "ur" ? "کسی سے محجوب نہیں ہوتے" : "Inherits alongside all Tiers"}
          </span>
        </div>

        {deceased.gender === "female" ? (
          <div>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
              <input
                type="checkbox"
                checked={heirs.spouseCount > 0}
                onChange={(e) =>
                  updateHeirs({ spouseCount: e.target.checked ? 1 : 0 })
                }
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-4 h-4"
              />
              <span className="text-sm font-semibold text-[var(--theme-text-primary)]">
                {t.husbandAlive}
              </span>
            </label>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-2">
              {t.wivesCount}
            </label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => updateHeirs({ spouseCount: count })}
                  className={`w-11 h-10 rounded-lg font-bold text-sm border transition-all ${
                    heirs.spouseCount === count
                      ? "bg-[var(--theme-gold)] text-black border-[var(--theme-gold)] shadow"
                      : "bg-[var(--theme-bg)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-[var(--theme-gold)]/50"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Tier 1 (Parents & Children) */}
      <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-gold)]/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier1Heading}
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--theme-gold)]/10 text-[var(--theme-gold)] font-medium">
            الطبقة الأولى
          </span>
        </div>

        {/* Parents Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={heirs.fatherAlive}
                onChange={(e) => updateHeirs({ fatherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-4 h-4"
              />
              <span className="text-sm font-semibold text-[var(--theme-text-primary)]">
                {t.fatherAlive}
              </span>
            </label>
          </div>

          <div className="p-3.5 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={heirs.motherAlive}
                onChange={(e) => updateHeirs({ motherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-4 h-4"
              />
              <span className="text-sm font-semibold text-[var(--theme-text-primary)]">
                {t.motherAlive}
              </span>
            </label>
          </div>
        </div>

        {/* Children Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[var(--theme-text-secondary)] block">
                {t.sonsCount}
              </span>
              <span className="text-xl font-bold font-mono text-[var(--theme-text-primary)]">
                {heirs.sonsCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateHeirs({
                    sonsCount: Math.max(0, (heirs.sonsCount || 0) - 1),
                  })
                }
                className="w-8 h-8 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center hover:bg-[var(--theme-card-subtle)]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                }
                className="w-8 h-8 rounded-lg bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center hover:bg-[var(--theme-gold-light)]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[var(--theme-text-secondary)] block">
                {t.daughtersCount}
              </span>
              <span className="text-xl font-bold font-mono text-[var(--theme-text-primary)]">
                {heirs.daughtersCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateHeirs({
                    daughtersCount: Math.max(0, (heirs.daughtersCount || 0) - 1),
                  })
                }
                className="w-8 h-8 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center hover:bg-[var(--theme-card-subtle)]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  updateHeirs({
                    daughtersCount: (heirs.daughtersCount || 0) + 1,
                  })
                }
                className="w-8 h-8 rounded-lg bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center hover:bg-[var(--theme-gold-light)]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mother Sibling Blocking Check (Ḥujub al-Nuqṣān) */}
        {heirs.motherAlive && (
          <div className="mt-3 p-3.5 rounded-lg bg-[var(--theme-card-subtle)] border border-[var(--theme-border)] text-xs space-y-2">
            <span className="font-bold text-[var(--theme-gold)] block">
              {t.motherBlockingCheck} (حجب النقصان):
            </span>
            <p className="text-[var(--theme-text-muted)]">
              {language === "ur"
                ? "اگر والد زندہ ہوں اور متوفی کے 2 بھائی، یا 1 بھائی اور 2 بہنیں، یا 4 بہنیں (سگے یا علاتی) ہوں، تو ماں کا حصہ 1/3 سے گھٹ کر 1/6 ہو جاتا ہے اور وہ رد کے زائد مال سے محروم رہتی ہے۔"
                : "If the father is alive and deceased has at least 2 brothers, or 1 brother and 2 sisters, or 4 sisters, the mother drops from 1/3 to 1/6 and does not participate in Radd."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.motherBrothersCount}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.motherBlockingBrothers || 0}
                  onChange={(e) =>
                    updateHeirs({
                      motherBlockingBrothers: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.motherSistersCount}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.motherBlockingSisters || 0}
                  onChange={(e) =>
                    updateHeirs({
                      motherBlockingSisters: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Tier 2 (Grandparents & Siblings) */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          hasTier1Heir
            ? "bg-[var(--theme-card)]/40 border-[var(--theme-border)]/50 opacity-60"
            : "bg-[var(--theme-card)] border-[var(--theme-gold)]/40 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            {hasTier1Heir ? (
              <Lock className="w-5 h-5 text-amber-500" />
            ) : (
              <Unlock className="w-5 h-5 text-[var(--theme-gold)]" />
            )}
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier2Heading}
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--theme-card-subtle)] text-[var(--theme-text-muted)] font-medium">
            الطبقة الثانية
          </span>
        </div>

        {hasTier1Heir ? (
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5">{t.tier2Locked}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Grandparents */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-xs p-2.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.paternalGrandfatherAlive}
                  onChange={(e) =>
                    updateHeirs({ paternalGrandfatherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.paternalGrandfather}</span>
              </label>

              <label className="flex items-center gap-2 text-xs p-2.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.paternalGrandmotherAlive}
                  onChange={(e) =>
                    updateHeirs({ paternalGrandmotherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.paternalGrandmother}</span>
              </label>

              <label className="flex items-center gap-2 text-xs p-2.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.maternalGrandfatherAlive}
                  onChange={(e) =>
                    updateHeirs({ maternalGrandfatherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.maternalGrandfather}</span>
              </label>

              <label className="flex items-center gap-2 text-xs p-2.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.maternalGrandmotherAlive}
                  onChange={(e) =>
                    updateHeirs({ maternalGrandmotherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.maternalGrandmother}</span>
              </label>
            </div>

            {/* Siblings */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.fullBrothers}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.fullBrothersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ fullBrothersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.fullSisters}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.fullSistersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ fullSistersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.uterineBrothers}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.uterineBrothersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ uterineBrothersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Tier 3 (Uncles & Aunts) */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          hasTier1Heir || hasTier2Heir
            ? "bg-[var(--theme-card)]/40 border-[var(--theme-border)]/50 opacity-60"
            : "bg-[var(--theme-card)] border-[var(--theme-gold)]/40 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            {hasTier1Heir || hasTier2Heir ? (
              <Lock className="w-5 h-5 text-amber-500" />
            ) : (
              <Unlock className="w-5 h-5 text-[var(--theme-gold)]" />
            )}
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier3Heading}
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--theme-card-subtle)] text-[var(--theme-text-muted)] font-medium">
            الطبقة الثالثة
          </span>
        </div>

        {hasTier1Heir || hasTier2Heir ? (
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5">{t.tier3Locked}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalUncles}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalUnclesCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalUnclesCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalAunts}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalAuntsCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalAuntsCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.maternalUncles}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.maternalUnclesCount || 0}
                onChange={(e) =>
                  updateHeirs({ maternalUnclesCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalCousins}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalCousinsCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalCousinsCount: parseInt(e.target.value) || 0 })
                }
                className="w-full px-2.5 py-1.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
