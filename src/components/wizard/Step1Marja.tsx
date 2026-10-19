"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { TRANSLATIONS } from "@/lib/translations";
import { MarjaId } from "@/types/fiqh";
import { BookOpen, Check, Landmark } from "lucide-react";

interface MarjaCompactConfig {
  shortNameEn: string;
  shortNameUr: string;
  tagEn: string;
  tagUr: string;
  includesLand: boolean;
}

const MARJA_CONFIG: Record<MarjaId, MarjaCompactConfig> = {
  sistani: {
    shortNameEn: "Sayyid Ali al-Sistani",
    shortNameUr: "سید علی سیستانی",
    tagEn: "Land Value Included",
    tagUr: "زمین کی مالیت شامل",
    includesLand: true,
  },
  khamenei: {
    shortNameEn: "Sayyid Ali al-Khamenei",
    shortNameUr: "سید علی خامنہ ای",
    tagEn: "Land Value Included",
    tagUr: "زمین کی مالیت شامل",
    includesLand: true,
  },
  khoei: {
    shortNameEn: "Sayyid Abu al-Qasim al-Khoei",
    shortNameUr: "سید ابو القاسم خوئی",
    tagEn: "Buildings Only",
    tagUr: "صرف عمارات و اشجار",
    includesLand: false,
  },
  makarem: {
    shortNameEn: "Sheikh Makarem Shirazi",
    shortNameUr: "ناصر مکارم شیرازی",
    tagEn: "Buildings Only",
    tagUr: "صرف عمارات و اشجار",
    includesLand: false,
  },
  najafi: {
    shortNameEn: "Sheikh Bashir al-Najafi",
    shortNameUr: "بشیر حسین نجفی",
    tagEn: "Buildings Only",
    tagUr: "صرف عمارات و اشجار",
    includesLand: false,
  },
};

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
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)] block">
            {language === "ur" ? "مرجعِ تقلید کا انتخاب" : "Select Accredited Marja‘ al-Taqlīd"}
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            {language === "ur" ? "۵ مستند مراجعِ عظام" : "5 Accredited Grand Ayatollahs"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {marjaList.map((m) => {
            const isSelected = deceased.marja === m.id;
            const cfg = MARJA_CONFIG[m.id as MarjaId] || {
              shortNameEn: m.nameEn,
              shortNameUr: m.nameUr,
              tagEn: m.widowInheritsLandValue ? "Land Value Included" : "Buildings Only",
              tagUr: m.widowInheritsLandValue ? "زمین کی مالیت شامل" : "صرف عمارات و اشجار",
              includesLand: m.widowInheritsLandValue,
            };

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMarja(m.id as MarjaId)}
                className={`w-full text-left p-3.5 rounded-xl transition-all relative flex flex-col justify-between gap-2.5 text-start cursor-pointer ${
                  isSelected
                    ? "bg-emerald-950/20 dark:bg-emerald-950/40 border-2 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                    : "bg-white dark:bg-[#0c1814] border border-stone-200 dark:border-stone-800 hover:border-emerald-600/40 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 truncate">
                    {language === "ur" ? m.titleUr.split("،")[0] : m.titleEn.split(",")[0]}
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-stone-300 dark:border-stone-700 bg-transparent"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                </div>

                <div>
                  <h3
                    className={`font-bold leading-snug text-stone-900 dark:text-stone-100 ${
                      language === "ur"
                        ? "font-nastaliq text-base leading-[2.1]"
                        : "text-xs sm:text-sm font-cinzel"
                    }`}
                  >
                    {language === "ur" ? cfg.shortNameUr : cfg.shortNameEn}
                  </h3>
                </div>

                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col gap-1 w-full">
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md inline-block text-center ${
                      cfg.includesLand
                        ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        : "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {language === "ur" ? cfg.tagUr : cfg.tagEn}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 text-center">
                    {language === "ur" ? "حَبْوہ (بڑا بیٹا): شامل" : "Ḥabwah: Included"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Consensus & Divergence Callout */}
        <div className="mt-4 rounded-xl border border-amber-600/30 bg-amber-950/10 dark:bg-amber-950/20 p-4 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
          <div className="flex items-start gap-3">
            <span className="text-amber-600 text-base font-bold shrink-0 mt-0.5">ℹ️</span>
            <div className="leading-relaxed space-y-1.5">
              <strong className="text-emerald-800 dark:text-emerald-400 font-bold block text-sm">
                {language === "ur"
                  ? "مراجعِ کرام کا ۹۸ فیصد اتفاقِ رائے (Consensus Among Shia Marāji‘):"
                  : "Consensus Among Shia Marāji‘ (مراجعِ کرام کا ۹۸ فیصد اتفاقِ رائے):"}
              </strong>
              <p>
                {language === "ur"
                  ? "مکتبِ اہلِ بیتؑ کے تمام فقہاء و مراجع کا وراثت کے تمام بنیادی اصولوں، طبقات (درجات)، قرآنی حصص، دور کے رشتہ داروں کی محرومی، اور عول و تعصیب کے بطلان پر ۱۰۰ فیصد متفقہ اجماع ہے۔"
                  : "All Shia jurists are in unanimous consensus (100% agreed) on all statutory classes, fractions, the exclusion of distant relatives, and the complete repudiation of ‘Awl and Ta‘ṣīb."}
              </p>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {language === "ur"
                  ? "عملی طور پر صرف ایک مسئلہ میں فروعی اختلاف ہے: بیوہ کا زمین کی قیمت سے حصہ:"
                  : "The only practical divergence is regarding a widow's share in land:"}
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-stone-600 dark:text-stone-400">
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">
                    {language === "ur" ? "آیت اللہ سیستانی اور خامنہ ای:" : "Sistani & Khamenei:"}
                  </strong>{" "}
                  {language === "ur"
                    ? "بیوہ عمارات کے ساتھ ساتھ خود زمین کی مارکیٹ قیمت سے بھی اپنا شرعی حصہ پاتی ہے۔"
                    : "Widow inherits her fractional share from the monetary value of the land itself + buildings."}
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">
                    {language === "ur" ? "آیت اللہ خوئیؒ، مکارم اور بشیر نجفی:" : "Khoei, Makarem, & Bashir:"}
                  </strong>{" "}
                  {language === "ur"
                    ? "بیوہ صرف عمارات اور درختوں کی قیمت سے حصہ پاتی ہے (خالی زمین کی قیمت سے 0)۔"
                    : "Widow inherits from the value of buildings & trees only (0 from land)."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
