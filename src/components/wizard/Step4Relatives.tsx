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
  ShieldCheck,
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
          <span>{t.step4Title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step4Desc}
        </p>
      </div>

      {/* SECTION 1: Spouses (Non-Blockable - Zawj / Zawjah) */}
      <div className="sacred-card p-6 rounded-2xl space-y-4 border-rose-500/30">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.spousesHeading}
            </h3>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            {language === "ur" ? "کسی سے محجوب نہیں ہوتے" : "Inherits alongside all Tiers"}
          </span>
        </div>

        {deceased.gender === "female" ? (
          <div>
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl sacred-card hover:border-[var(--theme-gold)] transition-all">
              <input
                type="checkbox"
                checked={heirs.spouseCount > 0}
                onChange={(e) =>
                  updateHeirs({ spouseCount: e.target.checked ? 1 : 0 })
                }
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.husbandAlive}
              </span>
            </label>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-2">
              {t.wivesCount}
            </label>
            <div className="flex items-center gap-2.5">
              {[0, 1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => updateHeirs({ spouseCount: count })}
                  className={`w-12 h-11 rounded-xl font-bold text-sm border transition-all ${
                    heirs.spouseCount === count
                      ? "bg-gradient-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-black border-[var(--theme-gold)] shadow-md shadow-[var(--theme-gold)]/20"
                      : "sacred-card text-[var(--theme-text-secondary)] hover:border-[var(--theme-gold)]/50"
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
      <div className="sacred-card p-6 sm:p-7 rounded-2xl border-2 border-[var(--theme-gold)]/50 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier1Heading}
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
            الطبقة الأولى
          </span>
        </div>

        {/* Parents Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="p-4 rounded-xl sacred-card flex items-center justify-between cursor-pointer hover:border-[var(--theme-gold)] transition-all">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={heirs.fatherAlive}
                onChange={(e) => updateHeirs({ fatherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.fatherAlive}
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--theme-gold)] font-bold">
              {heirs.fatherAlive ? "Alive" : "Deceased"}
            </span>
          </label>

          <label className="p-4 rounded-xl sacred-card flex items-center justify-between cursor-pointer hover:border-[var(--theme-gold)] transition-all">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={heirs.motherAlive}
                onChange={(e) => updateHeirs({ motherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.motherAlive}
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--theme-gold)] font-bold">
              {heirs.motherAlive ? "Alive" : "Deceased"}
            </span>
          </label>
        </div>

        {/* Children Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 sm:p-5 rounded-xl sacred-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[var(--theme-text-secondary)] block">
                {t.sonsCount}
              </span>
              <span className="text-2xl font-black font-mono text-[var(--theme-text-primary)] mt-1">
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
                className="w-9 h-9 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center hover:bg-[var(--theme-card-subtle)]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                }
                className="w-9 h-9 rounded-xl bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center hover:bg-[var(--theme-gold-light)] shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl sacred-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[var(--theme-text-secondary)] block">
                {t.daughtersCount}
              </span>
              <span className="text-2xl font-black font-mono text-[var(--theme-text-primary)] mt-1">
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
                className="w-9 h-9 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center hover:bg-[var(--theme-card-subtle)]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  updateHeirs({
                    daughtersCount: (heirs.daughtersCount || 0) + 1,
                  })
                }
                className="w-9 h-9 rounded-xl bg-[var(--theme-gold)] text-black font-bold flex items-center justify-center hover:bg-[var(--theme-gold-light)] shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mother Sibling Blocking Check (Ḥujub al-Nuqṣān) */}
        {heirs.motherAlive && (
          <div className="p-4 rounded-xl bg-[var(--theme-bg)]/80 border border-[var(--theme-border)] text-xs space-y-2.5">
            <span className="font-bold text-[var(--theme-gold)] block">
              {t.motherBlockingCheck} (حجب النقصان):
            </span>
            <p className="text-[var(--theme-text-muted)] leading-relaxed">
              {language === "ur"
                ? "اگر والد زندہ ہوں اور متوفی کے 2 بھائی، یا 1 بھائی اور 2 بہنیں، یا 4 بہنیں (سگے یا علاتی) ہوں، تو ماں کا حصہ 1/3 سے گھٹ کر 1/6 ہو جاتا ہے اور وہ رد کے زائد مال سے مستثنیٰ رہتی ہے۔"
                : "If father is alive and deceased has 2+ brothers, or 1 brother and 2 sisters, or 4 sisters, the mother drops from 1/3 to 1/6 and does not participate in Radd."}
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
                  className="w-full sacred-input px-3 py-2 font-mono text-xs"
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
                  className="w-full sacred-input px-3 py-2 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Tier 2 (Grandparents & Siblings) */}
      <div
        className={`p-6 rounded-2xl sacred-card transition-all ${
          hasTier1Heir ? "opacity-60 border-red-500/40" : "border-[var(--theme-border)]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3 mb-4">
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
          <span className="text-xs font-mono text-[var(--theme-text-muted)]">
            الطبقة الثانية
          </span>
        </div>

        {hasTier1Heir ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
            <div>
              <span className="font-bold text-sm block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5 leading-relaxed">{t.tier2Locked}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-xs p-3 rounded-xl sacred-card cursor-pointer">
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

              <label className="flex items-center gap-2 text-xs p-3 rounded-xl sacred-card cursor-pointer">
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

              <label className="flex items-center gap-2 text-xs p-3 rounded-xl sacred-card cursor-pointer">
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

              <label className="flex items-center gap-2 text-xs p-3 rounded-xl sacred-card cursor-pointer">
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
                  className="w-full sacred-input px-3 py-2 text-xs font-mono"
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
                  className="w-full sacred-input px-3 py-2 text-xs font-mono"
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
                  className="w-full sacred-input px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Tier 3 (Uncles & Aunts) */}
      <div
        className={`p-6 rounded-2xl sacred-card transition-all ${
          hasTier1Heir || hasTier2Heir
            ? "opacity-60 border-red-500/40"
            : "border-[var(--theme-border)]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3 mb-4">
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
          <span className="text-xs font-mono text-[var(--theme-text-muted)]">
            الطبقة الثالثة
          </span>
        </div>

        {hasTier1Heir || hasTier2Heir ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
            <div>
              <span className="font-bold text-sm block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5 leading-relaxed">{t.tier3Locked}</p>
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
                className="w-full sacred-input px-3 py-2 text-xs font-mono"
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
                className="w-full sacred-input px-3 py-2 text-xs font-mono"
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
                className="w-full sacred-input px-3 py-2 text-xs font-mono"
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
                className="w-full sacred-input px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
