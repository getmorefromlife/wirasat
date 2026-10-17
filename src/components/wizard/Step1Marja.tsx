"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { TRANSLATIONS } from "@/lib/translations";
import { MarjaId } from "@/types/fiqh";
import { BookOpen, Check, ShieldCheck, Sparkles } from "lucide-react";

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
          {t.step1Title}
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step1Desc}
        </p>
      </div>

      {/* Deceased Basic Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)]">
        <div>
          <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
            {t.deceasedName}
          </label>
          <input
            type="text"
            value={deceased.name}
            onChange={(e) => updateDeceased({ name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm text-[var(--theme-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-gold)]"
            placeholder="e.g. Marhūm Syed Ali"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
            {t.deceasedGender}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateDeceased({ gender: "male" })}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                deceased.gender === "male"
                  ? "bg-[var(--theme-gold)] text-black border-[var(--theme-gold)]"
                  : "bg-[var(--theme-bg)] text-[var(--theme-text-secondary)] border-[var(--theme-border)]"
              }`}
            >
              {t.male}
            </button>
            <button
              type="button"
              onClick={() => updateDeceased({ gender: "female" })}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                deceased.gender === "female"
                  ? "bg-[var(--theme-gold)] text-black border-[var(--theme-gold)]"
                  : "bg-[var(--theme-bg)] text-[var(--theme-text-secondary)] border-[var(--theme-border)]"
              }`}
            >
              {t.female}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
            {t.currency}
          </label>
          <input
            type="text"
            value={deceased.currency}
            onChange={(e) => updateDeceased({ currency: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm text-[var(--theme-text-primary)] font-mono focus:outline-none focus:ring-1 focus:ring-[var(--theme-gold)] uppercase"
            placeholder="PKR / USD / EUR / INR"
          />
        </div>
      </div>

      {/* Marāji‘ Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {marjaList.map((m) => {
          const isSelected = deceased.marja === m.id;
          return (
            <div
              key={m.id}
              onClick={() => setMarja(m.id as MarjaId)}
              className={`cursor-pointer rounded-xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-[var(--theme-card)] border-[var(--theme-gold)] shadow-lg shadow-[var(--theme-gold)]/10 ring-1 ring-[var(--theme-gold)]"
                  : "bg-[var(--theme-card)]/50 border-[var(--theme-border)] hover:border-[var(--theme-gold)]/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 inset-inline-end-3 w-6 h-6 rounded-full bg-[var(--theme-gold)] text-black flex items-center justify-center shadow">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[var(--theme-gold)]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                    {language === "ur" ? m.titleUr : m.titleEn}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                  {language === "ur" ? m.nameUr : m.nameEn}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-naskh mt-0.5">
                  {m.nameAr}
                </p>

                <div className="mt-3 text-xs bg-[var(--theme-bg)]/60 p-2.5 rounded-lg border border-[var(--theme-border)]">
                  <p className="font-semibold text-[var(--theme-text-secondary)] mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[var(--theme-gold)]" />
                    <span>{m.treatiseBook}</span>
                  </p>
                  <p className="text-[11px] text-[var(--theme-text-muted)] leading-relaxed">
                    {language === "ur" ? m.fullBioUr : m.fullBioEn}
                  </p>
                </div>
              </div>

              {/* Rulings Badges */}
              <div className="mt-4 pt-3 border-t border-[var(--theme-border)]/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-[var(--theme-card-subtle)] border border-[var(--theme-border)]">
                  <span className="font-bold text-[var(--theme-gold)] block">
                    {language === "ur" ? "اراضی میں بیوہ کا حق:" : "Widow Land Right:"}
                  </span>
                  <span className="text-[var(--theme-text-secondary)]">
                    {m.widowInheritsLandValue
                      ? language === "ur"
                        ? "تمام زمینوں کی مالیت سے حصہ پاتی ہے"
                        : "Inherits value of all land"
                      : language === "ur"
                      ? "زمین سے محروم، فقط عمارات کی قیمت"
                      : "Zero from land; buildings only"}
                  </span>
                </div>

                <div className="p-2 rounded bg-[var(--theme-card-subtle)] border border-[var(--theme-border)]">
                  <span className="font-bold text-[var(--theme-gold)] block">
                    {language === "ur" ? "حَبْوہ (بڑا بیٹا):" : "Ḥabwah (Eldest Son):"}
                  </span>
                  <span className="text-[var(--theme-text-secondary)]">
                    {language === "ur" ? "4 مخصوص اشیاء کا مستحق" : "4 items awarded (conditional)"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
