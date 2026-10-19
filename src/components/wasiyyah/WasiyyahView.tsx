"use client";

import React, { useState, useEffect } from "react";
import {
  Scroll,
  Scale,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe2,
  Info,
  DollarSign,
  Heart,
  Lock,
  UserCheck,
  UserX,
  FileText,
  BadgeAlert,
  Percent,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import {
  WASIYYAH_KNOWLEDGE_BASE,
  WASIYYAH_CLASSIFICATIONS,
  INVALID_WASIYYAH_SIGNS,
} from "@/lib/wasiyyah-db";

export function WasiyyahView() {
  const { language, setLanguage, activeWasiyyahSection, deceased, getCalculationResult, setActiveView } =
    useInheritanceStore();
  const [internalLang, setInternalLang] = useState<"en" | "ur">(language);
  const [expandedInvalidSignId, setExpandedInvalidSignId] = useState<number | null>(1);
  const [expandedClassificationId, setExpandedClassificationId] = useState<string | null>("wajib");

  // Keep internal language synced with global app language unless locally toggled
  useEffect(() => {
    setInternalLang(language);
  }, [language]);

  const isUr = internalLang === "ur";
  const kb = WASIYYAH_KNOWLEDGE_BASE;
  const result = getCalculationResult();

  // Interactive 1/3rd simulator state
  const baselineEstate = result.balanceSheet?.netDistributableEstate || 12000000;
  const currency = deceased.currency || "PKR";
  const [sliderPct, setSliderPct] = useState<number>(33.33);

  // Auto-scroll to section if activeWasiyyahSection is set
  useEffect(() => {
    if (activeWasiyyahSection) {
      const el = document.getElementById(activeWasiyyahSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [activeWasiyyahSection]);

  const willAmount = Math.round(baselineEstate * (sliderPct / 100));
  const allowableAmount = Math.round(baselineEstate * (1 / 3));
  const excessAmount = Math.max(0, willAmount - allowableAmount);
  const sacredInheritanceAmount = Math.max(0, baselineEstate - willAmount);

  const navSections = [
    { id: "overview", labelEn: "Overview & 2 Types", labelUr: "تعریف و ۲ بنیادی اقسام" },
    { id: "thuluth", labelEn: "1/3rd Divine Ceiling", labelUr: "ایک تہائی (ثلث) کی حد" },
    { id: "rulings", labelEn: "5 Legal Rulings", labelUr: "الاحکام الخمسہ (۵ درجات)" },
    { id: "pillars", labelEn: "4 Pillars & Capacities", labelUr: "ارکانِ وصیت و اہلیت" },
    { id: "heir_bequest", labelEn: "Bequest to an Heir", labelUr: "وارث کے حق میں وصیت" },
    { id: "hierarchy", labelEn: "Priority Hierarchy", labelUr: "ترتیب و اولویت" },
    { id: "revocation", labelEn: "Revocation (Rujū‘)", labelUr: "رجوع و منسوخی" },
    { id: "invalid_signs", labelEn: "8 Void Signs Checklist", labelUr: "باطل وصیت کی ۸ علامات" },
    { id: "executors", labelEn: "Executors & Guardians", labelUr: "اوصیاء و شرعی سرپرست" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0f172a] pb-24 selection:bg-amber-500/20">
      {/* Top Breadcrumb & Page Actions Bar */}
      <div className="bg-white border-b border-[#e2e8f0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#245642]">
            <button
              onClick={() => setActiveView("wizard")}
              className="text-stone-500 hover:text-[#245642] transition-colors cursor-pointer"
            >
              {isUr ? "مرکزی صفحہ" : "Home"}
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-[#245642] font-extrabold">
              {isUr ? "کتاب الوصایا (وصیت گائیڈ)" : "Kitāb al-Waṣāyā (Wills Portal)"}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Urdu / English Language Toggle */}
            <button
              type="button"
              onClick={() => setInternalLang(isUr ? "en" : "ur")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf3e7] text-[#245642] text-xs font-bold border border-[#c4d4be] hover:bg-[#dce5d4] transition-all cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{isUr ? "English Text" : "اردو متن"}</span>
            </button>

            {/* Print Complete Treatise */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-stone-700 text-xs font-bold border border-stone-200 hover:bg-stone-50 shadow-2xs transition-all cursor-pointer"
              title={isUr ? "مکمل مقالہ پرنٹ کریں" : "Print Complete Treatise"}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isUr ? "پرنٹ" : "Print"}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Quick-Jump Anchor Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 border-t border-stone-100 no-scrollbar">
          {navSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap bg-stone-100 hover:bg-[#245642] text-stone-700 hover:text-white transition-all cursor-pointer border border-stone-200"
            >
              {isUr ? sec.labelUr : sec.labelEn}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* =========================================================================
            MAJESTIC HERO BANNER & SCRIPTURAL FOUNDATION
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#164e3a] via-[#245642] to-[#0f2e21] text-white p-6 sm:p-10 shadow-2xl border-2 border-[#164e3a]">
          {/* Subtle Background Geometry */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-5">
            {/* Top Seal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef3c7] text-[#78350f] text-xs font-black uppercase tracking-wider shadow-sm border border-amber-300">
              <Scroll className="w-4 h-4 text-[#b45309]" />
              <span className="font-serif">
                {isUr ? "دلیل الوصية الشرعية في فقه أهل البيت علیہم السلام" : "Kitāb al-Waṣāyā • Ja‘farī Jurisprudence"}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight leading-tight">
                {isUr
                  ? "احکامِ وصیت: جامع شرعی و قانونی انسائیکلوپیڈیا"
                  : "The Comprehensive Sharia Will & Testamentary Guide"}
              </h1>
              <p className="text-base sm:text-lg text-emerald-100 font-medium font-nastaliq leading-[2.2]">
                {isUr
                  ? "اسلامی قانونِ تصفیہ میں وصیت اور ادائے قرض وراثت کی تقسیم سے مقدم ہے — انسان کا آخری شرعی و اخلاقی اختیار۔"
                  : "In the Divine liquidation sequence, testamentary bequests and debt clearance strictly precede statutory inheritance."}
              </p>
            </div>

            {/* Sacred Quranic Inscription Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-xs border border-emerald-400/30 text-emerald-50 space-y-2">
              <div className="text-center sm:text-start font-arabic text-lg sm:text-2xl font-bold tracking-wide text-amber-300">
                مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ ۗ
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-emerald-200/90 font-medium gap-2 border-t border-emerald-500/20 pt-2">
                <span>
                  {isUr
                    ? "«وراثت کی تقسیم اس وصیت کے نفاذ اور قرض کی ادائیگی کے بعد ہوگی جو میت نے کی ہو۔» (سورۃ النساء: ۱۱)"
                    : "“After payment of any bequest the deceased may have bequeathed, or debts.” (Surah an-Nisā’ 4:11)"}
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-300/90 shrink-0">
                  Surah 4, Ayah 11
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: OVERVIEW & THE 2 FOUNDATIONAL CATEGORIES
            ========================================================================= */}
        <section id="overview" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۱
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "وصیت کا شرعی مفہوم اور اس کی ۲ بنیادی اقسام" : "Definition & The 2 Foundational Categories"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "تملیکیہ بمقابلہ عہدیہ" : "Tamlīkiyyah vs ‘Ahdiyyah"}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#d8e0d2] shadow-xs space-y-4">
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.definition_categories?.contentUr : kb.definition_categories?.contentEn}
            </div>

            {kb.definition_categories?.hadithCitations && kb.definition_categories.hadithCitations.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-[#b45309] block">
                  {kb.definition_categories.hadithCitations[0].source}
                </span>
                <p className="text-xs text-stone-800 font-nastaliq leading-[2.2]">
                  {isUr
                    ? kb.definition_categories.hadithCitations[0].textUr
                    : kb.definition_categories.hadithCitations[0].textEn}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE ONE-THIRD (THULUTH) DIVINE CEILING SIMULATOR
            ========================================================================= */}
        <section id="thuluth" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#b45309] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۲
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "الٰہی حد: ایک تہائی (ثلث) کا اٹل شرعی ضابطہ" : "The Divine Ceiling: Rule of the One-Third (Al-Thuluth)"}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Max 33.333%
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#fffbeb] border-2 border-[#f59e0b] shadow-xl space-y-6">
            <div className="text-sm sm:text-base text-stone-800 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.thuluth_ceiling?.contentUr : kb.thuluth_ceiling?.contentEn}
            </div>

            {/* Interactive Visual Dial / Slider */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#fde68a] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-xs font-extrabold uppercase text-[#b45309] tracking-wider block">
                    {isUr ? "متحرک تخمینہ کار و بصری تناسب" : "Interactive Bequest Simulator"}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[#172e22]">
                    {isUr ? "کل ترکے میں وصیت کا فیصد منتخب کریں:" : "Adjust Bequest Share Against Net Distributable Estate:"}
                  </h4>
                </div>

                <div className="text-start sm:text-end">
                  <span className="text-xs text-stone-500 font-bold block uppercase">
                    {isUr ? "خالص ترکہ (قرض کی ادائیگی کے بعد)" : "Net Distributable Estate"}
                  </span>
                  <span className="font-mono font-black text-xl text-[#245642]">
                    {baselineEstate.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#78350f]">
                  <span>{isUr ? "وصیت کا تناسب:" : "Bequest Ratio:"}</span>
                  <span className="font-mono text-lg font-black text-[#b45309]">
                    {sliderPct.toFixed(1)}% ({willAmount.toLocaleString()} {currency})
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={sliderPct}
                  onChange={(e) => setSliderPct(parseFloat(e.target.value))}
                  className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#245642]"
                />

                <div className="flex justify-between text-[11px] font-mono text-stone-500">
                  <span>0% (No Will)</span>
                  <span className="text-emerald-700 font-bold">16.67% (1/6)</span>
                  <span className="text-[#b45309] font-black">33.33% (Divine Ceiling)</span>
                  <span className="text-red-700 font-bold">50% (Exceeds Ceiling)</span>
                </div>
              </div>

              {/* Dual Visual Bar Dial */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#b45309]">
                    {isUr ? "وصیت شدہ مال (اختیاری)" : "Discretionary Will Portion"} ({sliderPct.toFixed(1)}%)
                  </span>
                  <span className="text-[#245642]">
                    {isUr ? "شرعی قرآنی ورثاء کے حقوق" : "Sacred Statutory Heirs' Shares"} ({(100 - sliderPct).toFixed(1)}%)
                  </span>
                </div>

                <div className="w-full h-7 rounded-xl bg-stone-200 overflow-hidden flex border border-stone-300 shadow-inner">
                  {/* Allowable Will Portion (up to 33.33%) */}
                  <div
                    style={{ width: `${Math.min(sliderPct, 33.333)}%` }}
                    className="h-full bg-linear-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold flex items-center justify-center transition-all"
                    title="Allowable 1/3rd"
                  >
                    {sliderPct > 5 && `Will ≤ 1/3`}
                  </div>

                  {/* Excess Will Portion (> 33.33%) with striped pattern */}
                  {sliderPct > 33.333 && (
                    <div
                      style={{ width: `${sliderPct - 33.333}%` }}
                      className="h-full bg-[repeating-linear-gradient(45deg,#ea580c,#ea580c_10px,#f97316_10px,#f97316_20px)] text-white text-[10px] font-black flex items-center justify-center transition-all"
                      title="Excess Portion (Suspended on Heirs)"
                    >
                      Excess (Mawqūf)
                    </div>
                  )}

                  {/* Sacred Heirs Portion */}
                  <div
                    style={{ width: `${100 - sliderPct}%` }}
                    className="h-full bg-linear-to-r from-[#245642] to-[#172e22] text-white text-[11px] font-bold flex items-center justify-center transition-all"
                    title="Statutory Heirs"
                  >
                    {100 - sliderPct > 15 && (isUr ? "قرآنی ورثاء کے حصص" : "Quranic Heirs' Rights (66.7%+)")}
                  </div>
                </div>

                <div className="flex justify-between text-xs font-mono font-bold text-stone-600">
                  <span className="text-[#b45309]">
                    {willAmount.toLocaleString()} {currency}
                  </span>
                  <span className="text-[#245642]">
                    {sacredInheritanceAmount.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* Excess Warning Banner */}
              {sliderPct > 33.333 && (
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-500 text-amber-950 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#9a3412]">
                    <AlertTriangle className="w-5 h-5 text-[#ea580c] shrink-0" />
                    <span>
                      {isUr
                        ? "شرعی حکم: ۱/۳ سے زائد حصہ ورثاء کی بعد از وفات رضامندی پر موقوف ہے"
                        : "Legal Status: Excess Beyond 1/3rd Suspended on Heirs’ Post-Mortem Consent (Mawqūf)"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-nastaliq leading-[2.2] text-[#7c2d12]">
                    {isUr
                      ? "فقہِ جعفریہ کے مطابق اگر وصیت ایک تہائی سے تجاوز کر جائے تو ۳۳.۳۳ فیصد تک خود بخود نافذ ہو جاتی ہے، جبکہ زائد رقم تمام عاقل و بالغ ورثاء کی بعد از وفات باہمی رضامندی پر معلق رہتی ہے۔ اگر تمام ورثاء انکار کر دیں تو وصیت منسوخ ہو کر صرف ایک تہائی پر محدود ہو جاتی ہے۔"
                      : "Under Ja‘farī jurisprudence, a bequest exceeding one-third executes automatically up to 33.333%. The surplus is suspended (Mawqūf) upon the unanimous post-mortem consent of all mature heirs."}
                  </p>
                  <div className="text-xs font-mono font-extrabold text-[#78350f] pt-1 border-t border-amber-200">
                    {isUr
                      ? `نافذ وصیت: ${allowableAmount.toLocaleString()} ${currency} | موقوف زائد رقم: ${excessAmount.toLocaleString()} ${currency}`
                      : `Enforceable Bequest: ${allowableAmount.toLocaleString()} ${currency} | Suspended Excess: ${excessAmount.toLocaleString()} ${currency}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THE 5 LEGAL CLASSIFICATIONS (الاحکام الخمسہ)
            ========================================================================= */}
        <section id="rulings" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۳
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "وصیت کے ۵ شرعی درجات (الاحکام الخمسہ)" : "The 5 Legal Classifications (Al-Aḥkām al-Khamsah)"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "واجب تا حرام" : "Wājib to Ḥarām"}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4]">
              {isUr ? kb.five_rulings?.contentUr : kb.five_rulings?.contentEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {WASIYYAH_CLASSIFICATIONS.map((c) => (
                <div
                  key={c.id}
                  className="p-6 rounded-3xl border-2 shadow-xs space-y-3.5 flex flex-col justify-between"
                  style={{ borderColor: c.borderHex, backgroundColor: c.bgHex }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: c.colorHex }}
                      >
                        {c.id.toUpperCase()}
                      </span>
                      <span className="font-arabic font-bold text-lg text-stone-800">{c.nameUr}</span>
                    </div>

                    <h3 className="font-black text-lg text-stone-900">
                      {isUr ? c.nameUr : c.nameEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-nastaliq leading-[2.2]">
                      {isUr ? c.descriptionUr : c.descriptionEn}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-stone-200 text-xs font-bold text-stone-700">
                    {isUr ? `مثال: ${c.examplesUr[0]}` : `Case: ${c.examplesEn[0]}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE 4 PILLARS & CAPACITIES (ارکانِ وصیت)
            ========================================================================= */}
        <section id="pillars" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۴
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "وصیت کے ۴ بنیادی ارکان اور ان کی شرائط" : "The 4 Pillars of a Valid Will (Arkān al-Waṣiyyah)"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "موصی، موصیٰ لہ، موصیٰ بہ، صیغہ" : "Testator, Beneficiary, Item, Offer"}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#d8e0d2] shadow-xs space-y-4">
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.four_pillars?.contentUr : kb.four_pillars?.contentEn}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: THE SHIA-SUNNI DISTINCTION (وارث کے حق میں وصیت)
            ========================================================================= */}
        <section id="heir_bequest" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۵
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "کیا وارث کے حق میں وصیت جائز ہے؟ (شیعہ و سنی فقہی امتیاز)" : "Can an Heir Receive a Will? (The Shia-Sunni Distinction)"}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              Shia Fiqh Landmark
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#f0fdf4] via-white to-[#edf3e7] border-2 border-emerald-600 shadow-xl space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                ⭐
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-black text-xl sm:text-2xl text-emerald-950">
                  {isUr ? kb.heir_bequest?.titleUr : kb.heir_bequest?.titleEn}
                </h3>
                <div className="text-sm sm:text-base text-emerald-900 font-medium font-nastaliq leading-[2.4] whitespace-pre-line">
                  {isUr ? kb.heir_bequest?.contentUr : kb.heir_bequest?.contentEn}
                </div>
              </div>
            </div>

            {/* Scriptural Proof Seal */}
            <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  {isUr ? "صریح قرآنی دلیل (سورۂ بقرہ: ۱۸۰)" : "Explicit Quranic Proof (Surah al-Baqarah 2:180)"}
                </span>
                <span className="font-mono text-xs text-emerald-300">Quran 2:180</span>
              </div>
              <p className="font-arabic text-lg sm:text-xl text-center text-amber-200 py-1">
                كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًا الْوَصِيَّةُ لِلْوَالِدَيْنِ وَالأَقْرَبِينَ بِالْمَعْرُوفِ ۖ حَقًّا عَلَى الْمُتَّقِينَ
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 text-center font-medium font-nastaliq leading-[2.2]">
                {isUr
                  ? "«تم پر فرض کیا گیا ہے کہ جب تم میں سے کسی کے سامنے موت حاضر ہو جائے، اگر وہ مال چھوڑ رہا ہو، تو اپنے والدین اور قریبی رشتہ داروں کے لیے شائستہ طور پر وصیت کرے۔ یہ پرہیزگاروں پر حق ہے۔»"
                  : "“Prescribed for you when death approaches any of you, if he leaves wealth, that he make a bequest to parents and near relatives fairly: a duty upon the righteous.”"}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: PRIORITY HIERARCHY (ترتیب و اولویت)
            ========================================================================= */}
        <section id="hierarchy" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۶
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "مختلف وصیتوں کی شرعی ترتیب اور ترجیحات" : "The Legal Hierarchy of Bequests (Tarattub al-Waṣāyā)"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "واجبِ مالی ← واجبِ بدنی ← تبرعی" : "Financial Dues → Bodily Duties → Charity"}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.priority_hierarchy?.contentUr : kb.priority_hierarchy?.contentEn}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: REVOCATION & ALTERATION (رجوع و منسوخی)
            ========================================================================= */}
        <section id="revocation" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۷
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "وصیت سے رجوع اور منسوخی کے احکام" : "Revocation and Alteration (Rujū‘ ‘an al-Waṣiyyah)"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "عقدِ جائز • تاحیات حقِ تنسیخ" : "Revocable Legal Instrument"}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.revocation?.contentUr : kb.revocation?.contentEn}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: THE 8 SIGNS OF AN INVALID WILL (باطل وصیت کی علامات)
            ========================================================================= */}
        <section id="invalid_signs" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۸
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "باطل یا غیر صحیح وصیت کی ۸ نشانیاں اور شرعی علامات" : "The 8 Signs of an Invalid or Void Will (Bāṭil)"}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-100 text-red-900 border border-red-300">
              Diagnostic Checklist
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INVALID_WASIYYAH_SIGNS.map((sign) => {
              const isExpanded = expandedInvalidSignId === sign.id;
              return (
                <div
                  key={sign.id}
                  className="rounded-2xl border-2 border-red-200 bg-white shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedInvalidSignId(isExpanded ? null : sign.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-start gap-3 hover:bg-red-50/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-xs shrink-0">
                        {sign.id}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                        {isUr ? sign.titleUr : sign.titleEn}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-red-100 bg-red-50/20 text-xs sm:text-sm">
                      <p className="text-stone-800 leading-relaxed font-nastaliq leading-[2.2]">
                        {isUr ? sign.descriptionUr : sign.descriptionEn}
                      </p>
                      <div className="p-3 rounded-xl bg-white border border-red-200 text-red-900 font-semibold flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>{isUr ? "شرعی علاج:" : "Sharia Remedy:"}</strong>{" "}
                          {isUr ? sign.remedyUr : sign.remedyEn}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: EXECUTOR (AL-WAṢĪ) & GUARDIANSHIP
            ========================================================================= */}
        <section id="executors" className="scroll-mt-24 space-y-5">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۹
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                {isUr ? "وصی (ایگزیکٹو) اور شرعی سرپرست (قیم) کے احکام" : "The Executor (Al-Waṣī) and Child Guardianship (Al-Qayyim)"}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "شرائط، اختیارات و دستبرداری" : "Conditions & Declining Rules"}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-nastaliq leading-[2.4] whitespace-pre-line">
              {isUr ? kb.executor_rules?.contentUr : kb.executor_rules?.contentEn}
            </div>
          </div>
        </section>

        {/* Back to Calculator Bottom Floating Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#245642] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-serif font-black text-xl">
              {isUr ? "حسابِ وراثت کا اگلا مرحلہ شروع کریں" : "Ready to Execute Statutory Inheritance Calculation?"}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 font-nastaliq leading-[2.2]">
              {isUr
                ? "وصیت کے احکام جاننے کے بعد، اب اپنے متوفی کے ترکے کی خالص شرعی تقسیم چند سیکنڈ میں معلوم کریں۔"
                : "Now that you understand testamentary bequests, calculate your exact family inheritance shares."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveView("wizard")}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>{isUr ? "حسابِ وراثت کھولیں" : "Launch Calculator"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
