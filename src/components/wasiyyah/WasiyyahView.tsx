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
  User,
  Users,
  Gem,
  FileSignature,
  FileText,
  BadgeAlert,
  Percent,
  Landmark,
  Coins,
  Trophy,
  Flame,
  Clock,
  Building,
  HeartHandshake,
  Layers,
  ArrowDown,
  ShieldAlert,
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
  const [activeTabFilter, setActiveTabFilter] = useState<string>("all");

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
    { id: "overview", labelEn: "1. The 2 Categories", labelUr: "۱. وصیت کی ۲ اقسام" },
    { id: "thuluth", labelEn: "2. 1/3rd Divine Ceiling", labelUr: "۲. ایک تہائی (ثلث) کی حد" },
    { id: "rulings", labelEn: "3. 5 Legal Rulings", labelUr: "۳. الاحکام الخمسہ" },
    { id: "pillars", labelEn: "4. The 4 Pillars Grid", labelUr: "۴. ارکانِ وصیت (۴ عناصر)" },
    { id: "heir_bequest", labelEn: "5. Bequest to an Heir", labelUr: "۵. وارث کے حق میں وصیت" },
    { id: "hierarchy", labelEn: "6. Priority Ladder", labelUr: "۶. تصفیاتی سیڑھی (ترتیب)" },
    { id: "revocation", labelEn: "7. 3 Ways to Revoke", labelUr: "۷. منسوخی کے ۳ طریقے" },
    { id: "invalid_signs", labelEn: "8. 8 Void Signs Matrix", labelUr: "۸. باطل وصیت کی ۸ علامات" },
    { id: "executors", labelEn: "9. Executor & Guardian", labelUr: "۹. وصی و شرعی سرپرست" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-[#faf8f5] text-[#0f172a] pb-28 selection:bg-amber-500/20"
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* =========================================================================
          TOP BREADCRUMB & STICKY SUB-NAV ANCHOR BAR
          ========================================================================= */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#245642]">
            <button
              onClick={() => setActiveView("wizard")}
              className="text-stone-500 hover:text-[#245642] transition-colors cursor-pointer"
            >
              {isUr ? "مرکزی صفحہ" : "Home"}
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-[#245642] font-extrabold flex items-center gap-1.5">
              <Scroll className="w-4 h-4 text-[#b45309]" />
              <span>{isUr ? "کتاب الوصایا (وصیت پورٹل)" : "Kitāb al-Waṣāyā • Sharia Will Portal"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Language Toggle */}
            <button
              type="button"
              onClick={() => setInternalLang(isUr ? "en" : "ur")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf3e7] text-[#245642] text-xs font-bold border border-[#c4d4be] hover:bg-[#dce5d4] transition-all cursor-pointer shadow-2xs"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{isUr ? "English View" : "اردو منظر"}</span>
            </button>

            {/* Print Entire Guide */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-stone-700 text-xs font-bold border border-stone-200 hover:bg-stone-50 shadow-2xs transition-all cursor-pointer"
              title={isUr ? "مکمل مقالہ پرنٹ کریں" : "Print Complete Treatise"}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isUr ? "پرنٹ" : "Print"}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Pills Bar (Centered on desktop, scrollable on mobile) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 overflow-x-auto flex items-center justify-start sm:justify-center gap-2 border-t border-stone-100 no-scrollbar">
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

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-14">
        {/* =========================================================================
            MAJESTIC HERO BANNER & SCRIPTURAL FOUNDATION
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#164e3a] via-[#245642] to-[#0f2e21] text-white p-6 sm:p-10 md:p-12 shadow-2xl border-2 border-[#164e3a] text-center">
          {/* Subtle Background Radial Radiance */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            {/* Top Seal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef3c7] text-[#78350f] text-xs font-black uppercase tracking-wider shadow-sm border border-amber-300 mx-auto">
              <Scroll className="w-4 h-4 text-[#b45309]" />
              <span className="font-serif">
                {isUr ? "دلیل الوصية الشرعية في فقه أهل البيت علیہم السلام" : "Kitāb al-Waṣāyā • Ja‘farī Testamentary Jurisprudence"}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight leading-tight">
                {isUr
                  ? "احکامِ وصیت: جامع شرعی و بصری انسائیکلوپیڈیا"
                  : "The Comprehensive Sharia Will & Testamentary Guide"}
              </h1>
              <p className="text-base sm:text-lg text-emerald-100 font-medium font-nastaliq leading-[2.3] max-w-3xl mx-auto">
                {isUr
                  ? "اسلامی قانونِ تصفیہ میں وصیت اور ادائے دیون وراثت کی تقسیم سے مقدم ہے — انسان کا آخری شرعی و اخلاقی اختیار۔"
                  : "In Islamic liquidation, testamentary bequests and debt clearance strictly precede statutory inheritance."}
              </p>
            </div>

            {/* Sacred Quranic Inscription Banner */}
            <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-black/30 backdrop-blur-xs border border-emerald-400/30 text-emerald-50 space-y-3 shadow-inner">
              <div className="text-center font-arabic text-2xl sm:text-4xl font-bold tracking-wide text-amber-300 py-1">
                مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ ۗ
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-emerald-200/90 font-medium gap-2 border-t border-emerald-500/20 pt-2.5">
                <span className="font-nastaliq leading-[2.2] text-center sm:text-start flex-1">
                  {isUr
                    ? "«وراثت کی تقسیم اس وصیت کے نفاذ اور قرض کی ادائیگی کے بعد ہوگی جو میت نے کی ہو۔» (سورۃ النساء: ۱۱)"
                    : "“After payment of any bequest the deceased may have bequeathed, or debts.” (Surah an-Nisā’ 4:11)"}
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-300 shrink-0 mx-auto sm:mx-0">
                  Surah 4:11
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: DUAL ARCHITECTURAL SPLIT CARD (THE 2 FOUNDATIONAL CATEGORIES)
            ========================================================================= */}
        <section id="overview" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۱
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "وصیت کی ۲ بنیادی اقسام: تملیکیہ بمقابلہ عہدیہ" : "The 2 Foundational Categories: Dual Split Architecture"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "مال و منافع کی منتقلی اور انتظامی فرائض و سرپرستی کی شرعی تفریق"
                    : "Property & usufruct disposition vs. fiduciary duty and child guardianship"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#edf3e7] text-[#245642] border border-[#c4d4be]">
              {isUr ? "شرعی تقسیمِ احکام" : "Two Structural Types"}
            </span>
          </div>

          {/* Dual Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Waṣiyyah Tamlīkiyyah */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fbfcf9] border-2 border-emerald-600/50 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header with Icon and Title */}
                <div className="flex items-start gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-amber-300 flex items-center justify-center shadow-md shrink-0">
                    <Coins className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block">
                      {isUr ? "نوعِ اول: مالی تصرف" : "Category 1 • Proprietary Bequest"}
                    </span>
                    <h3 className="font-serif font-black text-xl text-[#172e22] mt-0.5">
                      {isUr ? "وصیتِ تملیکیہ (مال و منافع کی منتقلی)" : "Waṣiyyah Tamlīkiyyah (Possessory Bequest)"}
                    </h3>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {isUr ? "ملکیت کی منتقلی" : "Ownership Transfer"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {isUr ? "بعد از وفات نفاذ" : "Post-Mortem Execution"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {isUr ? "اختیاری یا خیراتی" : "Optional / Charitable"}
                  </span>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.3]">
                  {isUr
                    ? "انسان کا یہ وصیت کرنا کہ اس کے مرنے کے بعد اس کے ترکے میں سے کوئی معین چیز، مخصوص رقم، ترکے کا کوئی فیصد، یا کسی جائیداد کا منافع (جیسے رہائشی حق یا کرایہ) کسی خاص شخص، ادارے یا رفاہی کام کو دیا جائے۔"
                    : "A disposition whereby the testator transfers ownership of a specific asset, monetary amount, percentage of the estate, or a usufruct (such as residential occupancy or rental revenues) to an individual or institution after demise."}
                </p>

                {/* Everyday Real-World Examples */}
                <div className="space-y-2 pt-2 border-t border-emerald-100">
                  <span className="text-xs font-extrabold text-[#245642] uppercase tracking-wider block">
                    {isUr ? "روزمرہ کی عملی مثالیں:" : "Concrete Everyday Examples:"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-800 font-nastaliq leading-[2.2]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                      <span>{isUr ? "یتیم خانے یا مدرسے کے لیے نقدی مختص کرنا۔" : "Leaving cash endowments to an orphanage or religious seminary."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                      <span>{isUr ? "غریب یا بیوہ بیٹی کو رہائشی فلیٹ ہدیہ کرنا۔" : "Gifting an apartment to an impoverished daughter on top of her statutory share."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                      <span>{isUr ? "کسی مکان کا ۵ سال کا کرایہ صدقۂ جاریہ بنانا۔" : "Assigning commercial rental revenue for five years as ongoing charity."}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Card: Waṣiyyah ‘Ahdiyyah */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border-2 border-blue-600/50 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header with Icon and Title */}
                <div className="flex items-start gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-blue-200 flex items-center justify-center shadow-md shrink-0">
                    <ShieldCheck className="w-7 h-7 text-blue-100" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-800 block">
                      {isUr ? "نوعِ دوم: انتظامی ذمہ داری" : "Category 2 • Fiduciary Mandate"}
                    </span>
                    <h3 className="font-serif font-black text-xl text-[#0f172a] mt-0.5">
                      {isUr ? "وصیتِ عہدیہ (انتظامی امور و سرپرستی)" : "Waṣiyyah ‘Ahdiyyah (Fiduciary Appointment)"}
                    </h3>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                    {isUr ? "امانت و ذمہ داری" : "Fiduciary Duty"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                    {isUr ? "شرعی سرپرستی" : "Legal Guardianship"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                    {isUr ? "قرض و تکفین کا انتظام" : "Debt Administration"}
                  </span>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.3]">
                  {isUr
                    ? "انسان کا بعد از وفات کے امور کے لیے کسی بااعتماد شخص کو اپنا وصی (ایگزیکٹو) مقرر کرنا؛ مثلاً کفن دفن کی نگرانی، قرضوں کی ادائیگی، اور دادا کی غیر موجودگی میں نابالغ بچوں کا شرعی نگران (قیم) بنانا۔"
                    : "A mandate assigning administrative tasks, debt clearance, or guardianships to a designated executor (Al-Waṣī), including supervising funeral rites and acting as legal guardian (Qayyim) over minor children in the absence of the paternal grandfather."}
                </p>

                {/* Everyday Real-World Examples */}
                <div className="space-y-2 pt-2 border-t border-blue-100">
                  <span className="text-xs font-extrabold text-[#1e3a8a] uppercase tracking-wider block">
                    {isUr ? "روزمرہ کی عملی مثالیں:" : "Concrete Everyday Examples:"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-800 font-nastaliq leading-[2.2]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-1" />
                      <span>{isUr ? "امانت دار دوست کو قرضوں کی ادائیگی کا وصی مقرر کرنا۔" : "Appointing a trusted brother or friend as executor to discharge business liabilities."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-1" />
                      <span>{isUr ? "نابالغ بچوں کے لیے شرعی سرپرست (قیم) نامزد کرنا۔" : "Appointing a legal guardian (Qayyim) for orphaned minor children."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-1" />
                      <span>{isUr ? "کفن دفن اور زیارتی مقام پر تدفین کی ہدایت دینا۔" : "Directing specific burial arrangements and dispatching funds for holy shrine burial."}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Hadith Callout Banner */}
          <div className="p-5 rounded-2xl bg-[#fffdfa] border-2 border-amber-400/60 shadow-xs flex flex-col sm:flex-row items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
              📜
            </div>
            <div className="space-y-1 text-center sm:text-start flex-1">
              <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider block">
                {isUr ? "فرمانِ رسولِ اکرم صلی اللہ علیہ و آلہ و سلم (وسائل الشیعہ)" : "Hadith of the Holy Prophet (SAWW) • Wasā'il al-Shī'ah"}
              </span>
              <p className="text-xs sm:text-sm text-stone-800 font-nastaliq leading-[2.2]">
                {isUr
                  ? "«کسی بھی مسلمان کے لیے یہ شائستہ نہیں کہ وہ ایک رات بھی اس حال میں سوئے کہ اس کی وصیت اس کے سرہانے موجود نہ ہو۔»"
                  : "“It is not fitting for a Muslim individual to sleep a single night except that their written will is placed under their pillow.”"}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE 1/3RD (THULUTH) DIVINE CEILING SIMULATOR
            ========================================================================= */}
        <section id="thuluth" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b45309] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۲
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "الٰہی حد: ایک تہائی (ثلث) کا اٹل شرعی ضابطہ" : "The Divine Ceiling: Rule of the One-Third (Al-Thuluth)"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت کل جائیداد سے نہیں بلکہ قرض و تکفین کے بعد بچے ہوئے خالص ترکے سے نکلتی ہے"
                    : "Bequests are calculated strictly against the Net Distributable Estate after burial & debts"}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Max 33.333% (1/3rd)
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#fffbeb] border-2 border-[#f59e0b] shadow-xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-nastaliq leading-[2.4]">
                {isUr
                  ? "اسلام انسان کو اجازت نہیں دیتا کہ وہ مرتے وقت اپنی تمام تر دولت اجنبیوں کو بانٹ کر اپنے شرعی ورثاء کو لاوارث اور نادار چھوڑ جائے۔ شریعت نے انسان کو خالص ترکے کے زیادہ سے زیادہ ایک تہائی (33.33%) میں تصرف کا مطلق اختیار دیا ہے۔ باقی دو تہائی (66.67%) پر قرآنی ورثاء کا ناقابلِ تنسیخ حق قائم ہوتا ہے۔"
                  : "Islamic jurisprudence strikes a divine balance: the testator has full discretionary freedom over up to 33.333% of the Net Estate. The remaining two-thirds (66.667%) is strictly reserved for statutory Quranic heirs."}
              </p>
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
                    {isUr ? "وصیت شدہ حصہ (اختیاری)" : "Discretionary Will Portion"} ({sliderPct.toFixed(1)}%)
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
                      ? "فقہِ جعفریہ کے مطابق اگر وصیت ایک تہائی سے تجاوز کر جائے تو ۳۳.۳۳ فیصد تک خود بخود نافذ ہو جاتی ہے، جبکہ زائد رقم تمام عاقل و بالغ ورثاء کی بعد از وفات باہمی رضامندی پر معلق رہتی ہے۔ اگر تمام ورثاء انکار کر دیں تو وصیت گھٹ کر صرف ایک تہائی پر محدود ہو جاتی ہے۔"
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
            SECTION 3: THE 5 LEGAL CLASSIFICATIONS (Al-Aḥkām al-Khamsah)
            ========================================================================= */}
        <section id="rulings" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۳
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "وصیت کے ۵ شرعی درجات (الاحکام الخمسہ)" : "The 5 Legal Classifications (Al-Aḥkām al-Khamsah)"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت محض اختیاری عمل نہیں بلکہ انسان کے حالات کے مطابق شریعت کے پانچوں احکام لاگو ہوتے ہیں"
                    : "Unlike secular wills, Sharia categorizes wills into 5 distinct religious classifications"}
                </p>
              </div>
            </div>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {isUr ? "واجب تا حرام" : "5 Distinct Cards"}
            </span>
          </div>

          {/* 5-Card Grid Layout with Bold Top Accent Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WASIYYAH_CLASSIFICATIONS.map((c) => {
              const isExpanded = expandedClassificationId === c.id;
              return (
                <div
                  key={c.id}
                  className="rounded-3xl border-2 bg-white shadow-md overflow-hidden flex flex-col justify-between transition-all"
                  style={{ borderColor: c.borderHex }}
                >
                  {/* Colored Top-Accent Bar */}
                  <div className="h-2.5 w-full" style={{ backgroundColor: c.borderHex }} />

                  <div className="p-6 space-y-4">
                    {/* Header with Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: c.colorHex }}
                      >
                        {c.id === "wajib"
                          ? isUr ? "لازمی و قطعی" : "Compulsory Duty"
                          : c.id === "mustahabb"
                          ? isUr ? "نیک و پسندیدہ" : "Righteous Bequest"
                          : c.id === "mubah"
                          ? isUr ? "جائز و غیر جانبدار" : "Neutral / Customary"
                          : c.id === "makruh"
                          ? isUr ? "ناپسندیدہ" : "Reprehensible"
                          : isUr ? "باطل و ممنوع" : "Legally Void"}
                      </span>
                      <span className="font-arabic font-bold text-lg text-stone-800">{c.nameUr}</span>
                    </div>

                    <h3 className="font-black text-lg text-stone-900">
                      {isUr ? c.nameUr : c.nameEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                      {isUr ? c.descriptionUr : c.descriptionEn}
                    </p>

                    {/* Expandable "See Everyday Example" Micro-Pill */}
                    <button
                      type="button"
                      onClick={() => setExpandedClassificationId(isExpanded ? null : c.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer"
                      style={{ borderColor: c.borderHex, color: c.colorHex, backgroundColor: c.bgHex }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isUr ? (isExpanded ? "مثال چھپائیں" : "روزمرہ کی مثال دیکھیں") : (isExpanded ? "Hide Example" : "See Everyday Example")}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-800 space-y-1.5 animate-in fade-in">
                        <span className="font-bold text-[10px] uppercase text-stone-500 block">
                          {isUr ? "عملی فقہی مثالیں:" : "Concrete Sharia Cases:"}
                        </span>
                        <ul className="space-y-1 font-nastaliq leading-[2.2]">
                          {(isUr ? c.examplesUr : c.examplesEn).map((ex, exIdx) => (
                            <li key={exIdx} className="flex items-start gap-1.5">
                              <span className="text-[#245642] font-bold">•</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-[11px] font-bold text-stone-500 flex items-center justify-between">
                    <span>{c.examplesEn.length} {isUr ? "معروف شرعی مثالیں" : "Categorized Scenarios"}</span>
                    <span className="font-mono text-stone-400">Class: {c.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: 4-QUADRANT GRID OF VALIDITY (ARKĀN AL-WAṢIYYAH)
            ========================================================================= */}
        <section id="pillars" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۴
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "وصیت کے ۴ ارکان اور اہلیت کا ۴ چوکور جدول" : "The 4 Pillars of a Valid Will: 4-Quadrant Validity Grid"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "موصی، موصیٰ لہ، موصیٰ بہ اور صیغۂ ایجاب و قبول کی جامع فقہی شرائط"
                    : "The four non-negotiable structural pillars required for any Sharia testamentary will"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#edf3e7] text-[#245642] border border-[#c4d4be]">
              {isUr ? "ارکانِ اربعہ" : "4-Quadrant Grid"}
            </span>
          </div>

          {/* 4-Quadrant Validity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quadrant 1: The Testator */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#245642] flex items-center justify-center shadow-xs">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="font-arabic font-bold text-lg text-emerald-900">الموصي (رکنِ اول)</span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                    {isUr ? "رکن اول: وصیت کرنے والا" : "Pillar 1 • The Testator"}
                  </span>
                  <h3 className="font-serif font-black text-xl text-[#172e22]">
                    {isUr ? "الموصی (وصیت کنندہ کی اہلیت)" : "Al-Mūṣī (The Testator)"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {isUr ? "بلوغ (Mature)" : "Mature (Bāligh)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {isUr ? "عقل (Sane)" : "Sane (‘Āqil)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {isUr ? "اختیار (Free Will)" : "Free Will (Ikhtiyār)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {isUr ? "رشد (Financial Discretion)" : "Sound Mind (Rushd)"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت کرنے والے کا عاقل، بالغ اور باہوش ہونا ضروری ہے۔ نشے، بے ہوشی، پاگل پن یا شدید ڈیمینشیا کے عالم میں کی گئی وصیت باطل ہے۔ دس سالہ سمجھدار بچے کی وصیت قریبی رشتہ داروں اور نیک کاموں کے لیے سیستانی و خوئی کے نزدیک نافذ ہے۔"
                    : "The testator must be mentally competent, of the age of majority, acting out of free will without coercion, and not legally interdicted for financial incompetence."}
                </p>
              </div>

              {/* Alert on post-suicide rule */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1 font-medium">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  {isUr ? "خودکشی کے اقدام کا شرعی حکم:" : "Post-Suicide Lethal Act Rule:"}
                </span>
                <p className="font-nastaliq leading-[2.2]">
                  {isUr
                    ? "اگر کسی نے پہلے خود کو جان لیوا زخم لگایا (مثلاً زہر کھایا یا گولی چلائی) اور پھر مرنے سے پہلے مالی وصیت لکھی، تو فقہ جعفریہ میں مالی وصیت باطل ہو جاتی ہے۔"
                    : "If a person writes a will disposing of wealth after intentionally inflicting a lethal wound upon themselves with suicidal intent, the bequest is null and void under Ja‘farī law."}
                </p>
              </div>
            </div>

            {/* Quadrant 2: The Beneficiary */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-blue-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 text-blue-900 flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="font-arabic font-bold text-lg text-blue-900">الموصى له (رکنِ دوم)</span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                    {isUr ? "رکن دوم: وصیت کا حقدار" : "Pillar 2 • The Beneficiary"}
                  </span>
                  <h3 className="font-serif font-black text-xl text-[#0f172a]">
                    {isUr ? "الموصى له (وصیت پانے والا)" : "Al-Mūṣā Lahū (The Beneficiary)"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                    {isUr ? "وجود کا ہونا" : "Must Legally Exist"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                    {isUr ? "ماں کے پیٹ کا بچہ (جنین)" : "Unborn Fetus (if born alive)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                    {isUr ? "مالک بننے کا اہل" : "Capable of Ownership"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "جس کے لیے وصیت کی جا رہی ہے، اس کا وصیت کے وقت دنیا میں وجود ہونا ضروری ہے۔ جو انسان سرے سے پیدا ہی نہ ہوا ہو اس کے لیے وصیت باطل ہے۔ البتہ ماں کے پیٹ میں ٹھہرے ہوئے بچے کے لیے وصیت جائز ہے، بشرطیکہ وہ زندہ پیدا ہو۔"
                    : "The recipient of a bequest must legally exist at the time the will is drafted. An unborn child conceived in the womb may validly receive a bequest provided it is delivered alive."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 font-medium">
                <strong>{isUr ? "ملکیت کی اہلیت:" : "Capacity to Own:"}</strong>{" "}
                {isUr
                  ? "کسی غیر جاندار چیز یا جانور کے نام ذاتی وصیت باطل ہے، البتہ ان کی دیکھ بھال کے لیے رقم مختص کی جا سکتی ہے۔"
                  : "A bequest cannot be made directly in an animal's name, though funds may be allocated for its ongoing humane care."}
              </div>
            </div>

            {/* Quadrant 3: The Bequeathed Asset */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-amber-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shadow-xs">
                    <Gem className="w-6 h-6" />
                  </div>
                  <span className="font-arabic font-bold text-lg text-amber-900">الموصى به (رکنِ سوم)</span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                    {isUr ? "رکن سوم: وصیت کیا گیا مال" : "Pillar 3 • Bequeathed Asset"}
                  </span>
                  <h3 className="font-serif font-black text-xl text-[#78350f]">
                    {isUr ? "الموصى به (وصیت شدہ مال یا حق)" : "Al-Mūṣā Bihī (The Bequeathed Asset)"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200">
                    {isUr ? "مالِ حلال و مباح" : "Lawful Value (Ḥalāl)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200">
                    {isUr ? "قابلِ منتقلی" : "Transferable"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200">
                    {isUr ? "ذاتی ملکیت" : "Owned by Testator"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت کیا گیا مال شریعت میں قابلِ قدر اور حلال ہو۔ شراب، خنزیر، آلاتِ قمار، غصب شدہ زمین، یا ایسے مال کی وصیت باطل ہے جس کا انسان خود مالک نہ ہو۔ مستقبل میں پیدا ہونے والا منافع (جیسے باغ کا پھل) بھی وصیت ہو سکتا ہے۔"
                    : "The asset must possess recognized commercial value (Māl Mutaqawwam) in Sharia. Bequeathing prohibited goods (alcohol, gambling gear) or usurped/stolen property is null and void."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>{isUr ? "قرض معاف کرنا:" : "Debt Cancellation:"}</strong>{" "}
                {isUr
                  ? "اگر مقروض کو وصیت کے ذریعے اس کا قرضہ معاف کر دیا جائے تو یہ بھی وصیتِ تملیکیہ شمار ہوگی۔"
                  : "Forgiving a debt owed to the testator is a legally recognized and enforceable possessory bequest."}
              </div>
            </div>

            {/* Quadrant 4: Offer and Acceptance */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-indigo-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-300 text-indigo-900 flex items-center justify-center shadow-xs">
                    <FileSignature className="w-6 h-6" />
                  </div>
                  <span className="font-arabic font-bold text-lg text-indigo-900">الصيغة (رکنِ چہارم)</span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">
                    {isUr ? "رکن چہارم: ایجاب و قبول کا صیغہ" : "Pillar 4 • Offer & Acceptance"}
                  </span>
                  <h3 className="font-serif font-black text-xl text-indigo-950">
                    {isUr ? "الصيغة (ایجاب و قبول کی شرائط)" : "Al-Ṣīghah (Offer & Acceptance)"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-900 border border-indigo-200">
                    {isUr ? "زبانی یا تحریری" : "Verbal or Written"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-900 border border-indigo-200">
                    {isUr ? "واضح اشارہ (معذور کے لیے)" : "Definitive Gesture"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-900 border border-indigo-200">
                    {isUr ? "قبول و رد کے ضوابط" : "Acceptance (Qabūl) Rules"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت واضح زبانی کلمات سے، تحریر کے ذریعے، یا بولنے اور لکھنے سے معذور انسان کے واضح اشارے سے ہو سکتی ہے۔ وصیتِ تملیکیہ میں موصیٰ لہ کا قبول کرنا شرط ہے۔ یہ قبولیت موصی کی زندگی میں یا اس کے مرنے کے بعد ہو سکتی ہے۔"
                    : "A will may be executed verbally with unambiguous words, in formal certified writing, or via definitive gestures by an incapacitated person. The beneficiary must formally accept (Qabūl) either in life or post-mortem."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-medium">
                <strong>{isUr ? "رد کا حکم (Rejection):" : "Rejection Rule (Radd):"}</strong>{" "}
                {isUr
                  ? "اگر جس کے لیے وصیت کی گئی ہو وہ مرنے کے بعد وصیت ٹھکرا دے تو مال واپس اصل ترکے میں آ کر تمام ورثاء میں تقسیم ہوگا۔"
                  : "If the beneficiary explicitly rejects the bequest after the testator's demise, the gift reverts to the general estate for blood heirs."}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HIGH-IMPACT DOCTRINAL SPOTLIGHT CARD (BEQUEST TO AN HEIR)
            ========================================================================= */}
        <section id="heir_bequest" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۵
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "وارث کے حق میں وصیت: شیعہ و سنی فقہی امتیاز" : "Can an Heir Receive a Will? The Shia-Sunni Landmark Principle"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "فقہ جعفریہ کا تاریخی اور صریح قرآنی اصول جو بیٹی، بیوہ یا کمزور اولاد کے لیے تحفظ کا ضامن ہے"
                    : "A profound Ja‘farī doctrine rooted in Quran 2:180 protecting daughters and widows"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-[#b45309] border border-amber-300">
              🏆 Landmark Shia Doctrine
            </span>
          </div>

          {/* High-Impact Spotlight Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#f7faf4] to-[#edf3e7] border-3 border-emerald-600 shadow-xl space-y-7">
            {/* Top Seal Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#c4d4be] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#245642] to-[#172e22] text-amber-300 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  <Trophy className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#245642] block">
                    {isUr ? "فقہِ جعفریہ کا امتیازِ خاص" : "Landmark Principle of Ja‘farī Jurisprudence"}
                  </span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-[#172e22]">
                    {isUr ? "وارث کے حق میں وصیت کا مطلق شرعی جواز" : "Absolute Validity of Testamentary Bequests to Legal Heirs"}
                  </h3>
                </div>
              </div>

              <div className="text-start sm:text-end">
                <span className="px-3 py-1 rounded-full bg-[#245642] text-white text-xs font-bold font-mono">
                  Qur'an 2:180
                </span>
              </div>
            </div>

            {/* Side-by-Side Jurisprudential Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Sunni School View */}
              <div className="p-5 rounded-2xl bg-[#fff5f5] border-2 border-red-300 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    ✕
                  </span>
                  <span className="font-extrabold text-sm text-red-950 uppercase tracking-wider">
                    {isUr ? "اہلِ سنت فقہی مکاتب کا نظریہ:" : "Sunni Jurisprudential Position:"}
                  </span>
                </div>
                <div className="font-arabic text-base font-bold text-red-900 border-s-3 border-red-500 ps-2 py-0.5">
                  «لَا وَصِيَّةَ لِوَارِثٍ»
                </div>
                <p className="text-xs sm:text-sm text-red-900 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "اہلِ سنت کے ہاں مشہور حدیث 'لا وصیۃ لوارث' کی بنا پر کسی بھی وارث کے حق میں الگ سے وصیت اس وقت تک نافذ نہیں ہو سکتی جب تک تمام دیگر ورثاء مرنے کے بعد متفقہ اجازت نہ دیں۔"
                    : "Relying on the narration “Lā waṣiyyata li-wārith”, non-Shia schools generally hold that a testator cannot leave a will for a legal heir without the unanimous post-mortem approval of all other heirs."}
                </p>
              </div>

              {/* Shia Ja'fari School View */}
              <div className="p-5 rounded-2xl bg-[#f0fdf4] border-2 border-emerald-500 shadow-sm space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <span className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider">
                    {isUr ? "فقہِ جعفریہ (مکتبِ اہلِ بیتؑ) کا صریح فتویٰ:" : "Ja‘farī (Shia) Divine Ruling:"}
                  </span>
                </div>
                <div className="font-serif font-black text-base text-emerald-900 border-s-3 border-emerald-600 ps-2 py-0.5">
                  {isUr ? "۱/۳ کے اندر وارث کے لیے وصیت سو فیصد جائز اور نافذ ہے" : "100% Valid & Executable up to 1/3rd"}
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-nastaliq leading-[2.2] font-semibold">
                  {isUr
                    ? "مکتبِ اہلِ بیتؑ سورۂ بقرہ (آیت ۱۸۰) اور ائمہ معصومینؑ کے فرامین کی روشنی میں اس بات کا قائل ہے کہ انسان اپنے ایک تہائی کے اندر اپنے کسی بھی وارث (بیٹی، بیوی، معذور بیٹے) کے لیے الگ سے وصیت کر سکتا ہے اور اس میں دوسرے ورثاء کی اجازت کی کوئی ضرورت نہیں ہے۔"
                    : "In Ja‘farī Fiqh, a testator CAN bequeath any portion of their 1/3rd to an existing legal heir (extra to an impoverished daughter or wife) without requiring permission from any other heir!"}
                </p>
              </div>
            </div>

            {/* Sacred Ayah Calligraphy Box */}
            <div className="p-6 rounded-2xl bg-emerald-950 text-white space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  {isUr ? "قرآنِ حکیم کی صریح نسائی و والدینی وصیت" : "Surah Al-Baqarah • Ayah 180"}
                </span>
                <span className="font-mono text-xs text-emerald-300">Quran 2:180</span>
              </div>
              <p className="font-arabic text-xl sm:text-2xl text-center text-amber-200 py-1 font-bold">
                كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًا الْوَصِيَّةُ لِلْوَالِدَيْنِ وَالأَقْرَبِينَ بِالْمَعْرُوفِ ۖ حَقًّا عَلَى الْمُتَّقِينَ
              </p>
              <p className="text-xs sm:text-sm text-emerald-100 text-center font-medium font-nastaliq leading-[2.2]">
                {isUr
                  ? "«تم پر فرض کیا گیا ہے کہ جب تم میں سے کسی کے سامنے موت حاضر ہو جائے، اگر وہ مال چھوڑ رہا ہو، تو اپنے والدین اور قریبی رشتہ داروں کے لیے شائستہ طور پر وصیت کرے۔ یہ پرہیزگاروں پر حق ہے۔»"
                  : "“Prescribed for you when death approaches any of you, if he leaves wealth, that he make a bequest to parents and near relatives fairly: a duty upon the righteous.”"}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: 3-TIER VISUAL LIQUIDATION STACK (THE PRIORITY LADDER)
            ========================================================================= */}
        <section id="hierarchy" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۶
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "تصفیاتی سیڑھی: وصیتوں کی شرعی ترتیب و اولویت" : "The 3-Tier Visual Liquidation Stack (The Priority Ladder)"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "واجباتِ مالیہ، واجباتِ بدنیہ اور تبرعی وصیتوں کے درمیان اخراج کا شرعی تسلسل"
                    : "The strict chronological and capital priority determining how estate funds are disbursed"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
              {isUr ? "۳ درجاتِ ترجیح" : "3-Tier Ladder"}
            </span>
          </div>

          {/* 3-Tier Vertical Priority Stack */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Level 1: Wajib Mali */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-500 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  ۱
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-600 text-white">
                      Top Priority • واجبِ مالی
                    </span>
                    <span className="text-xs font-mono font-bold text-red-900">100% of Gross Capital (أصل المال)</span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-red-950">
                    {isUr ? "۱. واجباتِ مالیہ (قرضے، مہر، خمس، زکوٰۃ، حج)" : "Level 1: Financial Dues (Wājib Mālī)"}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-900 leading-relaxed font-nastaliq leading-[2.2]">
                    {isUr
                      ? "لوگوں کے قرضے، بیوی کا باقی مہر، خمس، زکوٰۃ، اور حجِ بدل۔ یہ ادائیگیاں ایک تہائی کی پابند نہیں ہوتیں بلکہ میت کے پورے اصل مال سے نکالی جاتی ہیں، خواہ میت نے وصیت میں منع ہی کیوں نہ کیا ہو۔"
                      : "Debts owed to people, unpaid Mahr of the wife, Khums, Zakat, and obligatory unperformed Hajj. These are extracted from 100% of the gross capital before any inheritance or voluntary bequest is honored."}
                  </p>
                </div>
              </div>

              <div className="text-start sm:text-end p-3 rounded-xl bg-white border border-red-300 shrink-0 self-stretch sm:self-center">
                <span className="text-[10px] font-bold uppercase text-red-700 block">Deduction Pool</span>
                <span className="font-bold text-xs text-red-950">Gross Capital</span>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center text-stone-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Level 2: Wajib Badani */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-amber-50 to-yellow-50 border-2 border-amber-500 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  ۲
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-600 text-white">
                      Middle Priority • واجبِ بدنی
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900">Extracted Strictly from 1/3rd (ثلث)</span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-amber-950">
                    {isUr ? "۲. واجباتِ بدنیہ (قضا نمازیں و روزے)" : "Level 2: Bodily Obligations (Wājib Badanī)"}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-nastaliq leading-[2.2]">
                    {isUr
                      ? "میت کی چھوٹی ہوئی قضا نمازیں اور روزے جن کی نیابت کروانے کی وصیت کی گئی ہو۔ یہ رقوم صرف اور صرف ایک تہائی میں سے نکلیں گی، اصل مال سے نہیں لی جا سکتیں۔"
                      : "Hiring proxies to perform missed prayers (Qadā Salāt) and missed fasts. Deducted strictly from the testamentary 1/3rd; cannot touch the principal estate without heir consent."}
                  </p>
                </div>
              </div>

              <div className="text-start sm:text-end p-3 rounded-xl bg-white border border-amber-300 shrink-0 self-stretch sm:self-center">
                <span className="text-[10px] font-bold uppercase text-amber-700 block">Deduction Pool</span>
                <span className="font-bold text-xs text-amber-950">1/3rd Discretionary</span>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center text-stone-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Level 3: Tabarru'i */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  ۳
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-700 text-white">
                      Final Priority • تبرعی خیرات
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-900">Remaining Balance of 1/3rd</span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-emerald-950">
                    {isUr ? "۳. تبرعی وصیتیں (اختیاری خیرات، مساجد، تحائف)" : "Level 3: Voluntary Charity (Tabarru‘ī)"}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-nastaliq leading-[2.2]">
                    {isUr
                      ? "مسجد، ہسپتال، غیر وارث رشتہ داروں یا دوستوں کو رقم دینا۔ یہ واجباتِ بدنیہ ادا ہونے کے بعد ایک تہائی میں جو مال بچے گا صرف اس میں سے دی جائیں گی۔ اگر تہائی ختم ہو جائے تو ترتیبِ زمانی کا اصول چلے گا۔"
                      : "Charitable gifts, orphanages, or gifts to friends. Executed only from the remaining balance of the 1/3rd. If insufficient, chronological precedence applies."}
                  </p>
                </div>
              </div>

              <div className="text-start sm:text-end p-3 rounded-xl bg-white border border-emerald-300 shrink-0 self-stretch sm:self-center">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">Deduction Pool</span>
                <span className="font-bold text-xs text-emerald-950">Residual 1/3rd</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: 3 WAYS TO CHANGE YOUR MIND (REVOCATION)
            ========================================================================= */}
        <section id="revocation" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۷
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "تاحیات آزادی: وصیت بدلنے یا منسوخ کرنے کے ۳ طریقے" : "Lifetime Freedom: 3 Ways to Change or Revoke Your Will"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصیت عقدِ جائز ہے؛ انسان کو اپنی آخری سانس تک وصیت بدلنے کا مکمل شرعی اختیار حاصل ہے"
                    : "A will is legally revocable (‘Aqd Jā’iz) at any time before death"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-300">
              {isUr ? "عقدِ جائز" : "Revocable by Law"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Way 1 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-stone-200 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                  ۱
                </div>
                <h3 className="font-serif font-black text-lg text-stone-900">
                  {isUr ? "۱. رجوعِ صریح (زبانی یا تحریری)" : "1. Explicit Revocation"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "واضح زبانی الفاظ یا نئی تحریر میں کہنا کہ 'میں نے اپنی پچھلی وصیت منسوخ کر دی ہے' یا 'میری فلاں وصیت کالعدم سمجھی جائے'۔"
                    : "Testator verbally states or certifies in writing: “I revoke my previous will,” or declares a specific previous clause null and void."}
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-700 block">Rujū‘ Ṣarīḥ</span>
            </div>

            {/* Way 2 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-stone-200 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-sm">
                  ۲
                </div>
                <h3 className="font-serif font-black text-lg text-stone-900">
                  {isUr ? "۲. رجوعِ فعلی (عملی تصرف)" : "2. Practical Disposal"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "جس چیز کی وصیت کی تھی، اسے اپنی زندگی میں ہی بیچ دینا، گرا دینا، یا کسی کو تحفہ کر دینا۔ یہ عمل خود بخود اس وصیت کی شرعی منسوخی ہے۔"
                    : "Selling, demolishing, or gifting the bequeathed asset fundamentally contradicts the bequest and acts as immediate legal cancellation."}
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-700 block">Rujū‘ Fi‘lī</span>
            </div>

            {/* Way 3 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-stone-200 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                  ۳
                </div>
                <h3 className="font-serif font-black text-lg text-stone-900">
                  {isUr ? "۳. متاخر (نئی) وصیت کا اصول" : "3. Newer Dated Will"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? "اگر انسان نے ۲۰۲۰ میں ایک وصیت کی اور ۲۰۲۴ میں دوسری وصیت کی جو پہلی سے ٹکراتی ہے، تو تاریخ کے اعتبار سے آخری وصیت ہی معتبر اور نافذ ہوگی۔"
                    : "If conflicting valid certified wills exist from different dates, the latest dated will takes absolute precedence by law."}
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 block">Latest Date Precedence</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: 2-COLUMN DIAGNOSTIC RED-FLAG MATRIX (8 SIGNS OF INVALID WILL)
            ========================================================================= */}
        <section id="invalid_signs" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۸
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "باطل وصیت کی ۸ علامات: تشخیصی ریڈ فلیگ میٹرکس" : "The 8 Signs of an Invalid Will: 2-Column Diagnostic Red-Flag Matrix"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "مندرجہ ذیل ۸ وجوہات میں سے کسی ایک کی موجودگی وصیت کو کالعدم یا غیر موثر بنا دیتی ہے"
                    : "Click any diagnostic card to expand the legal invalidating ground and specific Sharia remedy"}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-100 text-red-900 border border-red-300">
              8 Diagnostic Red Flags
            </span>
          </div>

          {/* 2-Column Diagnostic Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INVALID_WASIYYAH_SIGNS.map((sign) => {
              const isExpanded = expandedInvalidSignId === sign.id;
              return (
                <div
                  key={sign.id}
                  className={`rounded-2xl border-2 transition-all overflow-hidden bg-white shadow-xs ${
                    isExpanded ? "border-red-500 ring-2 ring-red-400/20" : "border-red-200 hover:border-red-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedInvalidSignId(isExpanded ? null : sign.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-start gap-3 cursor-pointer hover:bg-red-50/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                        {sign.id}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
                          ⚠️ Invalidating Ground #{sign.id}
                        </span>
                        <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                          {isUr ? sign.titleUr : sign.titleEn}
                        </h4>
                      </div>
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
                      <div className="p-3.5 rounded-xl bg-white border border-red-300 text-red-950 font-semibold flex items-start gap-2 shadow-2xs">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-red-900 block mb-0.5">
                            {isUr ? "شرعی علاج و قانونی تدارک:" : "Sharia Remedy & Legal Consequence:"}
                          </strong>
                          <span className="font-nastaliq leading-[2.2] text-stone-800">
                            {isUr ? sign.remedyUr : sign.remedyEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: FIDUCIARY COMMAND CARD (EXECUTOR & CHILD GUARDIANSHIP)
            ========================================================================= */}
        <section id="executors" className="scroll-mt-24 space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ۹
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#172e22]">
                  {isUr ? "وصی و شرعی سرپرست: فیڈوشری کمانڈ کارڈ" : "The Executor (Al-Waṣī) & Guardianship: Fiduciary Command Card"}
                </h2>
                <p className="text-xs text-[#52735a] font-medium font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وصی کی اہلیت، دستبرداری کی شرعی حدود، اور مشترکہ بمقابلہ آزادانہ اختیارات"
                    : "Qualifications, lifetime decline notification rules, and joint vs. autonomous execution"}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#edf3e7] text-[#245642] border border-[#c4d4be]">
              {isUr ? "۳ ذیلی پینلز" : "3-Panel Command Card"}
            </span>
          </div>

          {/* Fiduciary Command Card with 3 Structured Sub-Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sub-Panel 1: Qualifications */}
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#245642] flex items-center justify-center font-black text-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-[#172e22]">
                  {isUr ? "۱. وصی کی لازمی شرائط" : "1. Executor Qualifications"}
                </h3>
                <ul className="space-y-2 text-xs text-stone-700 font-nastaliq leading-[2.2]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                    <span>{isUr ? "عاقل اور بالغ ہونا شرط ہے۔" : "Must be mature (Bāligh) and sane (‘Āqil)."}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                    <span>{isUr ? "مسلمان کے ترکے کے لیے مسلمان ہونا ضروری ہے۔" : "Must be Muslim to administer a Muslim's estate."}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                    <span>{isUr ? "امانت دار (امین) ہونا شرط ہے۔" : "Must be trustworthy (Amīn)."}</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                <strong>{isUr ? "برطرفی کا اختیار:" : "Removal Power:"}</strong>{" "}
                {isUr
                  ? "اگر وصی بددیانت نکلے تو حاکمِ شرع (مجتہد) اسے برطرف کر سکتا ہے۔"
                  : "If proven corrupt, the Shia religious judge (Ḥākim al-Shar‘ī) possesses the power of removal."}
              </div>
            </div>

            {/* Sub-Panel 2: Declining Rules */}
            <div className="p-6 rounded-3xl bg-white border-2 border-amber-500/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-amber-950">
                  {isUr ? "۲. دستبرداری کے شرعی قواعد" : "2. The Declining Rules"}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-nastaliq leading-[2.3]">
                  {isUr
                    ? "زندگی میں انکار کا حق حاصل ہے بشرطیکہ وصیت کرنے والے کو اس کی زندگی میں مطلع کیا جائے تاکہ وہ متبادل چن سکے۔ اگر میت فوت ہو گئی اور وصی کو لاعلمی تھی، تو موت کے بعد انکار کرنا شرعاً حرام ہو جاتا ہے اور ذمہ داری واجب ہو جاتی ہے۔"
                    : "An executor may decline during the testator's lifetime provided they notify the testator. After death, or if uninformed before demise, declining is legally prohibited; it becomes an obligatory trust (Amānah)."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>{isUr ? "استثناء:" : "Sole Exception:"}</strong>{" "}
                {isUr ? "سوائے ناقابلِ برداشت حرج و مشقت کے۔" : "Unless execution causes intolerable hardship (Ḥaraj)."}
              </div>
            </div>

            {/* Sub-Panel 3: Multiple Executors */}
            <div className="p-6 rounded-3xl bg-white border-2 border-indigo-600/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-lg text-indigo-950">
                  {isUr ? "۳. ایک سے زائد اوصیاء کا حکم" : "3. Multiple Executors"}
                </h3>
                <div className="space-y-2 text-xs text-stone-700 font-nastaliq leading-[2.2]">
                  <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <strong className="text-indigo-950 block">علی الاجتماع (مشترکہ):</strong>
                    <span>{isUr ? "دونوں کے دستخط و رضامندی کے بغیر کوئی اکیلا فیصلہ نہیں کر سکتا۔" : "Joint: Neither executor can act autonomously without the other."}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <strong className="text-indigo-950 block">علی الانفراد (آزادانہ):</strong>
                    <span>{isUr ? "ہر ایک وصی الگ الگ بھی وصیت نافذ کرنے کا مکمل مجاز ہے۔" : "Independent: Either executor may execute testamentary duties independently."}</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold text-indigo-800">Ijtimā‘ vs. Infirād</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM LAUNCH TO CALCULATOR BANNER
            ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#245642] to-[#164e3a] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="font-serif font-black text-xl sm:text-2xl">
              {isUr ? "اب شرعی وراثت کا اگلا مرحلہ حساب کریں" : "Ready to Calculate Statutory Blood Inheritance?"}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 font-nastaliq leading-[2.2]">
              {isUr
                ? "وصیت اور ادائے قرض کے تمام قواعد سمجھنے کے بعد، اب چند سیکنڈ میں اپنے خاندان کا درست شرعی حساب معلوم کریں۔"
                : "Now that you understand testamentary bequests, calculate your family's exact Quranic shares."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveView("wizard")}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2 shrink-0 hover:scale-105"
          >
            <span>{isUr ? "حسابِ وراثت لانچ کریں" : "Launch Inheritance Calculator"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
