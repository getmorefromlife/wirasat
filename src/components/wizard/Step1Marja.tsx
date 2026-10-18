"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { TRANSLATIONS } from "@/lib/translations";
import { MarjaId } from "@/types/fiqh";
import { BookOpen, Check, ShieldCheck, Sparkles, Building, Landmark, Scroll } from "lucide-react";

export const Step1Marja: React.FC = () => {
  const { language, deceased, setMarja, updateDeceased } = useInheritanceStore();
  const t = TRANSLATIONS[language];

  const marjaList = Object.values(MARJA_DATABASE);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4">
        <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[var(--theme-gold)]" />
          <span>{t.step1Title}</span>
        </h2>
        <p className="text-sm sm:text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step1Desc}
        </p>
      </div>

      {/* Deceased Basic Details */}
      <div className="sacred-card p-5 sm:p-6 rounded-2xl space-y-4">
        <span className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)] flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5" />
          {t.deceasedDetails}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
              {t.deceasedName}
            </label>
            <input
              type="text"
              value={deceased.name}
              onChange={(e) => updateDeceased({ name: e.target.value })}
              className="w-full sacred-input px-3.5 py-2.5 text-sm font-medium"
              placeholder="e.g. Marhūm Syed Ali"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
              {t.deceasedGender}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateDeceased({ gender: "male" })}
                className={`py-2 px-3 text-sm font-bold rounded-xl border transition-all ${
                  deceased.gender === "male"
                    ? "bg-linear-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-white border-[var(--theme-gold)] shadow-md shadow-[var(--theme-gold)]/20"
                    : "sacred-card text-[var(--theme-text-secondary)] hover:text-white"
                }`}
              >
                {t.male}
              </button>
              <button
                type="button"
                onClick={() => updateDeceased({ gender: "female" })}
                className={`py-2 px-3 text-sm font-bold rounded-xl border transition-all ${
                  deceased.gender === "female"
                    ? "bg-linear-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-white border-[var(--theme-gold)] shadow-md shadow-[var(--theme-gold)]/20"
                    : "sacred-card text-[var(--theme-text-secondary)] hover:text-white"
                }`}
              >
                {t.female}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
              {t.currency}
            </label>
            <div className="relative">
              <input
                type="text"
                value={deceased.currency}
                onChange={(e) => updateDeceased({ currency: e.target.value.toUpperCase() })}
                className="w-full sacred-input px-3.5 py-2.5 text-sm font-mono font-bold uppercase tracking-wider"
                placeholder="PKR / USD / EUR / INR"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marāji‘ Selection Grid */}
      <div className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)] block">
          Select Accredited Marja‘ al-Taqlīd (مرجعِ تقلید کا انتخاب)
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {marjaList.map((m) => {
            const isSelected = deceased.marja === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setMarja(m.id as MarjaId)}
                className={`cursor-pointer rounded-2xl p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "sacred-card-active border-2 border-[var(--theme-gold)] ring-2 ring-[var(--theme-gold)]/30"
                    : "sacred-card hover:border-[var(--theme-gold)]/50"
                }`}
              >


                <div>
                  <div className="flex items-start gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-1 text-[var(--theme-gold)]" />
                    <span className="min-w-0 flex-1 text-sm font-black uppercase tracking-widest text-[var(--theme-gold)]">
                      {language === "ur" ? m.titleUr : m.titleEn}
                    </span>
                    {isSelected && (
                      <span aria-label={language === "ur" ? "منتخب" : "Selected"} className="shrink-0 w-7 h-7 rounded-full bg-[var(--theme-gold)] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--theme-text-primary)]">
                    {language === "ur" ? m.nameUr : m.nameEn}
                  </h3>
                  <p className="text-sm text-[var(--theme-gold-light)] font-naskh mt-0.5">
                    {m.nameAr}
                  </p>

                  <div className="mt-4 text-sm bg-[var(--theme-bg)]/80 p-3 rounded-xl border border-[var(--theme-border)]">
                    <p className="font-bold text-[var(--theme-text-primary)] mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--theme-gold)]" />
                      <span>{m.treatiseBook}</span>
                    </p>
                    <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                      {language === "ur" ? m.fullBioUr : m.fullBioEn}
                    </p>
                  </div>
                </div>

                {/* Key Rulings Badges */}
                <div className="mt-4 pt-3 border-t border-[var(--theme-border)]/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="p-2.5 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                    <span className="font-bold text-[var(--theme-gold)] block">
                      {language === "ur" ? "اراضی میں بیوہ کا حق:" : "Widow's Land Right:"}
                    </span>
                    <span className="text-[var(--theme-text-secondary)] font-medium">
                      {m.widowInheritsLandValue
                        ? language === "ur"
                          ? "✓ تمام زمینوں کی قیمت سے حصہ پاتی ہے"
                          : "✓ Inherits value of all land"
                        : language === "ur"
                        ? "⛔ زمین سے محروم، فقط عمارات کی قیمت"
                        : "⛔ Excluded from land (buildings only)"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                    <span className="font-bold text-[var(--theme-gold)] block">
                      {language === "ur" ? "حَبْوہ (بڑا بیٹا):" : "Ḥabwah (Eldest Son):"}
                    </span>
                    <span className="text-[var(--theme-text-secondary)] font-medium">
                      {language === "ur" ? "✓ 4 مخصوص اشیاء کا مستحق" : "✓ 4 sacred items awarded"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
