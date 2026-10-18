"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import {
  ShieldAlert,
  Crown,
  Book,
  Gem,
  Sword,
  Shirt,
  Info,
  CheckCircle2,
} from "lucide-react";

export const Step3ImpedimentsHabwah: React.FC = () => {
  const { language, deceased, updateDeceased } = useInheritanceStore();
  const t = TRANSLATIONS[language];
  const marjaInfo = MARJA_DATABASE[deceased.marja];

  const handleHabwahItemChange = (
    key: keyof typeof deceased.habwah,
    value: boolean | number
  ) => {
    updateDeceased({
      habwah: {
        ...deceased.habwah,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4">
        <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[var(--theme-gold)]" />
          {t.step3Title}
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step3Desc}
        </p>
      </div>

      {/* SECTION 1: Impediments (Mawāni‘ al-Irth) */}
      <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--theme-border)]/60 pb-3">
          <ShieldAlert className="w-5 h-5 text-[var(--theme-gold)]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
            {t.impedimentsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
            <span className="text-sm font-bold text-red-400 block mb-1">
              1. {language === "ur" ? "کفر و ارتداد" : "Kufr / Apostasy"}
            </span>
            <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              {t.impedimentKufr}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
            <span className="text-sm font-bold text-red-400 block mb-1">
              2. {language === "ur" ? "قتلِ ناحق" : "Unlawful Homicide (Qatl)"}
            </span>
            <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              {t.impedimentQatl}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
            <span className="text-sm font-bold text-red-400 block mb-1">
              3. {language === "ur" ? "لعان" : "Li‘ān (Disavowal)"}
            </span>
            <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              {t.impedimentLian}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: The Eldest Son's Prerogative (Al-Ḥabwah) */}
      <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-gold)]/50 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)]/60 pb-3">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.habwahTitle}
            </h3>
          </div>
          <span className="text-sm font-naskh text-[var(--theme-gold)] px-2 py-0.5 rounded bg-[var(--theme-gold)]/10">
            حق الولد الأكبر
          </span>
        </div>

        {deceased.gender === "female" ? (
          <div className="p-4 rounded-lg bg-[var(--theme-bg)] text-sm text-[var(--theme-text-muted)]">
            {language === "ur"
              ? "حبوہ فقط متوفی والد کی طرف سے مخصوص ہے۔ متوفیہ والدہ کے ترکہ میں حبوہ جاری نہیں ہوتا۔"
              : "Ḥabwah is strictly exclusive to a deceased father's estate under Ja'fari Law. It does not apply when the deceased is a mother."}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Qualification Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                <input
                  type="checkbox"
                  id="hasEldestSon"
                  checked={deceased.hasEldestSon}
                  onChange={(e) => updateDeceased({ hasEldestSon: e.target.checked })}
                  className="mt-1 rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)]"
                />
                <label htmlFor="hasEldestSon" className="text-sm text-[var(--theme-text-secondary)] cursor-pointer">
                  <span className="font-bold text-[var(--theme-text-primary)] block">
                    {t.habwahEligible}
                  </span>
                  {language === "ur"
                    ? "باپ کے بعد بڑا زندہ بیٹا موجود ہے۔"
                    : "Surviving eldest living son exists."}
                </label>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                <input
                  type="checkbox"
                  id="eldestSonIsSane"
                  disabled={!deceased.hasEldestSon}
                  checked={deceased.eldestSonIsSaneAndNonAqq}
                  onChange={(e) =>
                    updateDeceased({ eldestSonIsSaneAndNonAqq: e.target.checked })
                  }
                  className="mt-1 rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] disabled:opacity-50"
                />
                <label
                  htmlFor="eldestSonIsSane"
                  className={`text-sm cursor-pointer ${
                    !deceased.hasEldestSon ? "opacity-50" : "text-[var(--theme-text-secondary)]"
                  }`}
                >
                  <span className="font-bold text-[var(--theme-text-primary)] block">
                    {t.habwahSane}
                  </span>
                  {language === "ur"
                    ? "بیٹا عاقل ہو اور والد کا عاق نہ ہو۔"
                    : "Sane, non-insubordinate to father."}
                </label>
              </div>
            </div>

            {/* 4 Sacred Items */}
            {deceased.hasEldestSon && deceased.eldestSonIsSaneAndNonAqq && (
              <div className="space-y-3 pt-2">
                <span className="text-sm font-semibold text-[var(--theme-text-primary)] block">
                  {t.habwahItemsNotice}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    onClick={() =>
                      handleHabwahItemChange("quran", !deceased.habwah.quran)
                    }
                    className={`cursor-pointer p-3 rounded-lg border text-center transition-all ${
                      deceased.habwah.quran
                        ? "bg-[var(--theme-card-subtle)] border-[var(--theme-gold)] text-[var(--theme-gold)] shadow"
                        : "bg-[var(--theme-bg)] border-[var(--theme-border)] text-[var(--theme-text-muted)]"
                    }`}
                  >
                    <Book className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-sm font-semibold block">{t.habwahQuran}</span>
                  </div>

                  <div
                    onClick={() =>
                      handleHabwahItemChange("ring", !deceased.habwah.ring)
                    }
                    className={`cursor-pointer p-3 rounded-lg border text-center transition-all ${
                      deceased.habwah.ring
                        ? "bg-[var(--theme-card-subtle)] border-[var(--theme-gold)] text-[var(--theme-gold)] shadow"
                        : "bg-[var(--theme-bg)] border-[var(--theme-border)] text-[var(--theme-text-muted)]"
                    }`}
                  >
                    <Gem className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-sm font-semibold block">{t.habwahRing}</span>
                  </div>

                  <div
                    onClick={() =>
                      handleHabwahItemChange(
                        "swordOrDefensiveWeapon",
                        !deceased.habwah.swordOrDefensiveWeapon
                      )
                    }
                    className={`cursor-pointer p-3 rounded-lg border text-center transition-all ${
                      deceased.habwah.swordOrDefensiveWeapon
                        ? "bg-[var(--theme-card-subtle)] border-[var(--theme-gold)] text-[var(--theme-gold)] shadow"
                        : "bg-[var(--theme-bg)] border-[var(--theme-border)] text-[var(--theme-text-muted)]"
                    }`}
                  >
                    <Sword className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-sm font-semibold block">{t.habwahSword}</span>
                  </div>

                  <div
                    onClick={() =>
                      handleHabwahItemChange("clothes", !deceased.habwah.clothes)
                    }
                    className={`cursor-pointer p-3 rounded-lg border text-center transition-all ${
                      deceased.habwah.clothes
                        ? "bg-[var(--theme-card-subtle)] border-[var(--theme-gold)] text-[var(--theme-gold)] shadow"
                        : "bg-[var(--theme-bg)] border-[var(--theme-border)] text-[var(--theme-text-muted)]"
                    }`}
                  >
                    <Shirt className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-sm font-semibold block">{t.habwahClothes}</span>
                  </div>
                </div>

                <div className="max-w-xs pt-2">
                  <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                    {t.habwahValue} ({deceased.currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={deceased.habwah.estimatedValue || ""}
                    onChange={(e) =>
                      handleHabwahItemChange(
                        "estimatedValue",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                    placeholder="0"
                  />
                </div>

                {/* Marja fatwa note on Habwah */}
                <div className="p-3 rounded-lg bg-[var(--theme-bg)]/80 border border-[var(--theme-border)] text-sm text-[var(--theme-text-muted)] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[var(--theme-gold)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[var(--theme-text-secondary)] block">
                      {marjaInfo.nameEn} ({marjaInfo.masalahHabwah}):
                    </span>
                    <p className="mt-0.5">
                      {language === "ur" ? marjaInfo.habwahRulingUr : marjaInfo.habwahRulingEn}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
