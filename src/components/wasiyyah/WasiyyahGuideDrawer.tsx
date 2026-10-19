"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Scale,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Search,
  Users,
  Building,
  HelpCircle,
  Percent,
  Coins,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import {
  WASIYYAH_KNOWLEDGE_BASE,
  WASIYYAH_CLASSIFICATIONS,
  INVALID_WASIYYAH_SIGNS,
} from "@/lib/wasiyyah-db";

export const WasiyyahGuideDrawer: React.FC = () => {
  const {
    language,
    setLanguage,
    isWasiyyahGuideOpen,
    activeWasiyyahSection,
    closeWasiyyahGuide,
    openWasiyyahGuide,
  } = useInheritanceStore();

  const isUr = language === "ur";

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Interactive 1/3rd Divine Ceiling Slider state
  const [simulatedPercentage, setSimulatedPercentage] = useState<number>(33.33);

  // Expanded invalid signs state
  const [expandedSignId, setExpandedSignId] = useState<number | null>(null);

  // Expanded classification state
  const [expandedClassificationId, setExpandedClassificationId] = useState<string | null>("wajib");

  // Ref for drawer content container to auto-scroll
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active section when opened
  useEffect(() => {
    if (isWasiyyahGuideOpen && activeWasiyyahSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`wasiyyah-${activeWasiyyahSection}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isWasiyyahGuideOpen, activeWasiyyahSection]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWasiyyahGuideOpen) {
        closeWasiyyahGuide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWasiyyahGuideOpen, closeWasiyyahGuide]);

  if (!isWasiyyahGuideOpen) return null;

  // Filter sections based on search query
  const sections = Object.values(WASIYYAH_KNOWLEDGE_BASE).filter((sec) => {
    if (activeCategoryFilter !== "all" && sec.id !== activeCategoryFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.titleEn.toLowerCase().includes(q) ||
      sec.titleUr.includes(q) ||
      sec.contentEn.toLowerCase().includes(q) ||
      sec.contentUr.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeWasiyyahGuide}
        className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-Over Drawer Container */}
      <div className="fixed inset-y-0 end-0 max-w-full flex ps-6 sm:ps-16">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-s border-[#c4d4be]">
          {/* ========================================================
              DRAWER HEADER
              ======================================================== */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#172e22] via-[#245642] to-[#1c3f30] text-white border-b border-[#38603c] shrink-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                    {isUr ? "دلیل الوصیۃ الشرعیۃ" : "SHARIA TESTAMENTARY TREATISE"}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white font-cinzel">
                    {isUr ? "احکامِ وصیت و ثلث کی جامع گائیڈ" : "The Comprehensive Waṣiyyah & Will Guide"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Toggle */}
                <button
                  type="button"
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  {isUr ? "English" : "اردو"}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeWasiyyahGuide}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-emerald-100 font-nastaliq leading-[2.2]">
              {isUr
                ? "مکتبِ اہلِ بیت (ع) کے مسلمہ اصول اور آیت اللہ العظمیٰ سید علی سیستانی و سید ابو القاسم خوئی کے فتاویٰ کی روشنی میں"
                : "Authenticated Ja‘farī jurisprudence based on the rulings of Grand Ayatollahs al-Sistani & al-Khoei"}
            </p>

            {/* Quick Filter Bar */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {[
                { id: "all", labelEn: "All Topics", labelUr: "تمام ابواب" },
                { id: "thuluth", labelEn: "1/3rd Ceiling", labelUr: "ایک تہائی کی حد" },
                { id: "heir_bequest", labelEn: "Bequest to Heir", labelUr: "وارث کے لیے وصیت" },
                { id: "invalid_signs", labelEn: "8 Void Signs", labelUr: "باطل وصیت کی ۸ نشانیاں" },
                { id: "five_rulings", labelEn: "5 Classifications", labelUr: "پانچ شرعی احکام" },
                { id: "priority_hierarchy", labelEn: "Priority Order", labelUr: "وصیتوں کی ترتیب" },
                { id: "executor", labelEn: "The Executor", labelUr: "وصی کے احکام" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryFilter(item.id);
                    if (item.id !== "all") {
                      const el = document.getElementById(`wasiyyah-${item.id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    activeCategoryFilter === item.id
                      ? "bg-amber-300 text-[#172e22] border-amber-300 shadow-2xs"
                      : "bg-white/10 text-white hover:bg-white/15 border-white/15"
                  }`}
                >
                  {isUr ? item.labelUr : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================
              DRAWER SCROLLABLE BODY
              ======================================================== */}
          <div ref={contentRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#fafcf8]">
            {/* ========================================================
                INTERACTIVE MODULE 1: THE 1/3RD DIVINE CEILING GAUGE
                ======================================================== */}
            <div id="wasiyyah-thuluth" className="p-5 rounded-2xl bg-white border-2 border-[#b8cbb0] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#e1e6db] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#245642] text-white flex items-center justify-center shrink-0">
                    <Percent className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#245642] block">
                      {isUr ? "انٹرایکٹو فقہی گیج" : "INTERACTIVE FIQH GAUGE"}
                    </span>
                    <h3 className="font-bold text-base text-[#172e22]">
                      {isUr ? "ایک تہائی (ثلث) الٰہی حد کا تجرباتی ڈائل" : "The 1/3rd (Thuluth) Divine Ceiling Gauge"}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#edf3e7] text-[#245642] border border-[#c4d4be]">
                  {simulatedPercentage.toFixed(1)}% Will
                </span>
              </div>

              <p className="text-xs text-[#52735a] font-nastaliq leading-[2.2]">
                {isUr
                  ? "نیچے دیے گئے سلائیڈر کو آگے پیچھے کر کے دیکھیں کہ جب کوئی شخص ایک تہائی (۳۳.۳۳٪) سے زائد کی وصیت کرتا ہے تو شریعت کا کیا حکم ہوتا ہے۔"
                  : "Drag the slider to test what happens when a testamentary will attempts to exceed the strict 33.333% divine boundary."}
              </p>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-stone-600">
                  <span>0% (No Will)</span>
                  <span className="text-[#245642] font-black">33.33% (Max Sharia Limit / ثلث)</span>
                  <span className="text-rose-700">100% (Entire Estate)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={simulatedPercentage}
                  onChange={(e) => setSimulatedPercentage(parseFloat(e.target.value))}
                  className="w-full accent-[#245642] cursor-pointer"
                />
              </div>

              {/* Visual Split Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-8 rounded-xl bg-stone-100 overflow-hidden flex border border-[#c4d4be] shadow-inner">
                  {/* Valid Enforceable Bequest (up to 33.33%) */}
                  <div
                    style={{ width: `${Math.min(simulatedPercentage, 33.33)}%` }}
                    className="bg-[#245642] h-full flex items-center justify-center text-white text-[11px] font-bold transition-all"
                    title={`Automatically Valid: ${Math.min(simulatedPercentage, 33.33).toFixed(1)}%`}
                  >
                    {simulatedPercentage >= 8 && `${Math.min(simulatedPercentage, 33.33).toFixed(0)}%`}
                  </div>

                  {/* Excess Portion (Beyond 33.33% - Suspended / Mawquf) */}
                  {simulatedPercentage > 33.33 && (
                    <div
                      style={{ width: `${simulatedPercentage - 33.33}%` }}
                      className="bg-amber-500 h-full flex items-center justify-center text-white text-[11px] font-bold transition-all bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,0,0,0.15)_6px,rgba(0,0,0,0.15)_12px)]"
                      title={`Suspended on Heirs' Consent: ${(simulatedPercentage - 33.33).toFixed(1)}%`}
                    >
                      {simulatedPercentage - 33.33 >= 8 && `+${(simulatedPercentage - 33.33).toFixed(0)}%`}
                    </div>
                  )}

                  {/* Sacred Statutory Inheritance (Remaining for Quranic Heirs) */}
                  <div
                    style={{ width: `${Math.max(0, 100 - Math.max(simulatedPercentage, 33.33))}%` }}
                    className="bg-[#e8efe5] h-full flex items-center justify-center text-[#245642] text-[11px] font-bold transition-all"
                    title={`Guaranteed Heirs' Pool: ${Math.max(0, 100 - Math.max(simulatedPercentage, 33.33)).toFixed(1)}%`}
                  >
                    {100 - Math.max(simulatedPercentage, 33.33) >= 15 && (
                      <span>{isUr ? "شرعی ورثاء کا حصہ" : "Statutory Heirs"}</span>
                    )}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-[11px] font-bold flex-wrap gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#245642]" />
                    <span className="text-[#172e22]">
                      {isUr ? "نافذ العمل ثلث (زیادہ سے زیادہ 33.3%)" : "Automatically Valid Will (Max 33.3%)"}
                    </span>
                  </div>

                  {simulatedPercentage > 33.33 ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-amber-800">
                        {isUr
                          ? `ورثاء کی اجازت پر موقوف: +${(simulatedPercentage - 33.33).toFixed(1)}%`
                          : `Suspended on Consent: +${(simulatedPercentage - 33.33).toFixed(1)}%`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#b8cbb0]" />
                      <span className="text-[#52735a]">
                        {isUr ? "قرآنی ورثاء کا محفوظ حصہ (66.7%)" : "Guaranteed Heirs' Reserve (66.7%)"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Legal Explanation Alert based on Slider */}
              {simulatedPercentage > 33.33 ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {isUr ? "شرعی حکم: وصیت ایک تہائی سے تجاوز کر گئی!" : "Legal Status: Will Exceeds the One-Third Ceiling!"}
                    </span>
                  </div>
                  <p className="font-nastaliq leading-[2.2]">
                    {isUr
                      ? `وصیت 33.33 فیصد تک خود بخود نافذ ہو گی۔ زائد رقم (${(simulatedPercentage - 33.33).toFixed(1)}%) پر عمل درآمد صرف اسی صورت میں ہو گا جب تمام عاقل و بالغ ورثاء بعد از مرگ اس کی اجازت دیں۔ اگر ورثاء انکار کر دیں تو وصیت گھٹ کر 33.33 فیصد پر رک جائے گی۔`
                      : `The will executes automatically up to 33.333%. The excess ${(simulatedPercentage - 33.33).toFixed(1)}% is strictly suspended (Mawqūf). If the mature heirs reject it post-mortem, the excess is voided and returned to the heirs.`}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#edf3e7] border border-[#b8cbb0] text-xs text-[#245642] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#245642] shrink-0" />
                  <span>
                    {isUr
                      ? "یہ وصیت شرعی ثلث کے دائرے میں ہے۔ اس کے نفاذ کے لیے ورثاء کی اجازت کی ضرورت نہیں ہے، یہ خود بخود نافذ ہوگی۔"
                      : "This will falls within the lawful 1/3rd boundary. It executes unconditionally without requiring heirs' approval."}
                  </span>
                </div>
              )}
            </div>

            {/* ========================================================
                INTERACTIVE MODULE 2: THE SHIA BEQUEST-TO-HEIR SPOTLIGHT
                ======================================================== */}
            <div id="wasiyyah-heir_bequest" className="p-5 rounded-2xl bg-gradient-to-br from-[#f8faf6] to-[#edf3e7] border-2 border-[#164e3a] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#245642] text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                  ⚖️
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8efe5] text-[#245642] text-[10px] font-bold tracking-wider uppercase border border-[#c4d4be]">
                    <span>{isUr ? "شیعہ و سنی فقہی امتیاز" : "Special Ja‘farī Distinction"}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#172e22] mt-0.5">
                    {isUr ? "وارث کے حق میں وصیت کا مطلق شرعی جواز" : "Absolute Validity of Bequests to Existing Legal Heirs"}
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#c4d4be] space-y-2">
                <p className="text-xs sm:text-sm text-[#172e22] font-semibold font-nastaliq leading-[2.2]">
                  {isUr
                    ? "اہلِ سنت کے برعکس، فقہِ جعفریہ میں حدیث 'لا وصیۃ لوارث' کو مردود سمجھا جاتا ہے۔ ایک شیعہ مسلمان اپنے ایک تہائی (ثلث) مال میں سے کسی بھی موجودہ شرعی وارث (مثلاً بیٹی، بیوی، یا کسی معذور بیٹے) کے لیے اس کے عام قرآنی حصے کے علاوہ الگ سے وصیت کر سکتا ہے۔"
                    : "Unlike Sunni jurisprudence which restricts bequests to heirs via the narration 'Lā waṣiyyata li-wārith', Ja‘farī Fiqh completely rejects this restriction. A Shia Muslim possesses the unchallengeable right to bequeath up to 1/3rd to an existing heir (extra to a daughter or wife) without needing other heirs' consent."}
                </p>

                <div className="pt-2 border-t border-[#e1e6db] flex items-center justify-between text-xs font-bold text-[#245642]">
                  <span>{isUr ? "آیت اللہ العظمیٰ سید علی سیستانی (دام ظلہ):" : "Ayatollah Sistani Ruling:"}</span>
                  <span className="text-[11px] text-stone-500 font-mono">Al-Minhāj, Mas'alah 1276</span>
                </div>
                <p className="text-xs text-[#52735a] font-nastaliq leading-[2.2]">
                  {isUr
                    ? "وارث کے حق میں ایک تہائی کے اندر کی جانے والی وصیت بالکل صحیح اور نافذ ہے اور اس میں دوسرے ورثاء کی اجازت کی کوئی ضرورت نہیں ہے۔"
                    : "A bequest in favor of one's legal heir is valid up to 1/3rd of the estate without needing the consent of other heirs."}
                </p>
              </div>
            </div>

            {/* ========================================================
                INTERACTIVE MODULE 3: THE 5 LEGAL CLASSIFICATIONS CARDS
                ======================================================== */}
            <div id="wasiyyah-five_rulings" className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#245642]" />
                    <span>{isUr ? "وصیت کے ۵ شرعی درجات (الاحکام الخمسہ)" : "The 5 Legal Classifications of Making a Will"}</span>
                  </h3>
                  <p className="text-xs text-[#52735a]">
                    {isUr ? "حالات کے اعتبار سے وصیت کب واجب، مستحب، مکروہ یا حرام بنتی ہے" : "When a will becomes mandatory, recommended, disliked, or prohibited"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {WASIYYAH_CLASSIFICATIONS.map((c) => {
                  const isExpanded = expandedClassificationId === c.id;
                  return (
                    <div
                      key={c.id}
                      className="rounded-xl border transition-all overflow-hidden bg-white shadow-2xs"
                      style={{ borderColor: c.borderHex }}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedClassificationId(isExpanded ? null : c.id)}
                        className="w-full p-3.5 flex items-center justify-between gap-3 text-start cursor-pointer hover:bg-stone-50/80 transition-colors"
                        style={{ borderLeft: `4px solid ${c.borderHex}` }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: c.borderHex }}
                          />
                          <span className="font-bold text-xs sm:text-sm text-[#172e22]">
                            {isUr ? c.nameUr : c.nameEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-stone-500 hidden sm:inline">
                            {c.examplesEn.length} {isUr ? "مثالیں" : "Rules"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-stone-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-500" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-3.5 pt-0 border-t border-stone-100 space-y-3 bg-stone-50/40">
                          <p className="text-xs text-[#172e22] font-nastaliq leading-[2.2] mt-2">
                            {isUr ? c.descriptionUr : c.descriptionEn}
                          </p>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                              {isUr ? "عملی فقہی مثالیں:" : "Practical Sharia Applications:"}
                            </span>
                            <ul className="space-y-1 text-xs text-stone-700 font-nastaliq leading-[2.2]">
                              {(isUr ? c.examplesUr : c.examplesEn).map((ex, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#245642] font-bold mt-0.5">•</span>
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                INTERACTIVE MODULE 4: THE 8 SIGNS OF AN INVALID WILL
                ======================================================== */}
            <div id="wasiyyah-invalid_signs" className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{isUr ? "باطل یا غیر صحیح وصیت کی ۸ نشانیاں" : "The 8 Red Flags of an Invalid or Void Will"}</span>
                  </h3>
                  <p className="text-xs text-[#52735a]">
                    {isUr ? "وہ شرعی وجوہات جن کے سبب وصیت کالعدم قرار پاتی ہے اور ان کا شرعی حل" : "Flaws that render a will unenforceable in Sharia courts and their legal remedies"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {INVALID_WASIYYAH_SIGNS.map((s) => {
                  const isExpanded = expandedSignId === s.id;
                  return (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl bg-white border border-[#c4d4be] hover:border-stone-400 transition-all shadow-2xs space-y-2"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedSignId(isExpanded ? null : s.id)}
                        className="w-full flex items-center justify-between gap-3 text-start cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                              s.severity === "danger" ? "bg-rose-600" : "bg-amber-600"
                            }`}
                          >
                            {s.id}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-[#172e22]">
                            {isUr ? s.titleUr : s.titleEn}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
                          <p className="text-stone-700 font-nastaliq leading-[2.2]">
                            {isUr ? s.descriptionUr : s.descriptionEn}
                          </p>

                          <div className="p-2.5 rounded-lg bg-[#edf3e7] border border-[#b8cbb0] text-[#245642]">
                            <span className="font-bold block text-[11px] uppercase mb-0.5">
                              {isUr ? "شرعی علاج و قانونی حل:" : "Sharia Remedy & Legal Resolution:"}
                            </span>
                            <span className="font-nastaliq leading-[2.2]">
                              {isUr ? s.remedyUr : s.remedyEn}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                INTERACTIVE MODULE 5: PRIORITY HIERARCHY (Wajib Mali vs Badani vs Tabarru'i)
                ======================================================== */}
            <div id="wasiyyah-priority_hierarchy" className="p-5 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-3">
              <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#245642]" />
                <span>{isUr ? "وصیتوں کی شرعی اولویت اور ترتیب (Hierarchy)" : "The 3-Tier Priority Hierarchy of Bequests"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#edf3e7] border border-[#b8cbb0] space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#245642] block">
                    {isUr ? "۱. واجباتِ مالیہ" : "Tier 1: Wājib Mālī"}
                  </span>
                  <span className="font-bold text-xs text-[#172e22] block">
                    {isUr ? "اصل مال سے منہا" : "Extracted from Gross Capital"}
                  </span>
                  <p className="text-[11px] text-[#52735a] font-nastaliq leading-[2.0]">
                    {isUr
                      ? "قرضے، مہر، خمس، زکوٰۃ اور حج۔ یہ ایک تہائی کے پابند نہیں ہیں۔"
                      : "Debts, Mahr, Khums, Zakat, Hajj. Taken from entire principal estate."}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-800 block">
                    {isUr ? "۲. واجباتِ بدنیہ" : "Tier 2: Wājib Badanī"}
                  </span>
                  <span className="font-bold text-xs text-[#172e22] block">
                    {isUr ? "صرف ثلث سے منہا" : "Strictly from 1/3rd"}
                  </span>
                  <p className="text-[11px] text-amber-900 font-nastaliq leading-[2.0]">
                    {isUr
                      ? "قضا نمازیں اور روزے۔ صرف ایک تہائی سے لیے جا سکتے ہیں۔"
                      : "Missed prayers/fasts. Drawn exclusively from 1/3rd, not principal."}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-blue-800 block">
                    {isUr ? "۳. اختیاری خیرات" : "Tier 3: Tabarru‘ī"}
                  </span>
                  <span className="font-bold text-xs text-[#172e22] block">
                    {isUr ? "بچے ہوئے ثلث سے" : "Remaining 1/3rd Balance"}
                  </span>
                  <p className="text-[11px] text-blue-900 font-nastaliq leading-[2.0]">
                    {isUr
                      ? "خیراتی ادارے اور تحائف۔ کمی کی صورت میں ترتیبِ زمانی لاگو ہوگی۔"
                      : "Charities and gifts. Subject to chronological precedence if deficit occurs."}
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================
                INTERACTIVE MODULE 6: EXECUTOR & GUARDIANSHIP
                ======================================================== */}
            <div id="wasiyyah-executor" className="p-5 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-3">
              <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#245642]" />
                <span>{isUr ? "وصی (ایگزیکٹو) اور سرپرست (قیم) کے شرعی ضوابط" : "The Executor (Al-Waṣī) & Guardianship"}</span>
              </h3>

              <div className="space-y-2 text-xs text-stone-700 font-nastaliq leading-[2.2]">
                <p>
                  {isUr
                    ? "وصی کا عاقل، بالغ، مسلمان اور امانت دار ہونا ضروری ہے۔ اگر کوئی شخص اپنی زندگی میں وصی کو مطلع نہ کرے اور اس کا انتقال ہو جائے، تو وصی کے لیے یہ ذمہ داری ٹھکرانا جائز نہیں ہے بلکہ یہ اس پر ایک شرعی امانت بن جاتی ہے۔"
                    : "The executor must be mature, sane, Muslim, and trustworthy. If the testator dies without knowing the executor intended to decline, the duty becomes an obligatory trust upon the executor that cannot be declined."}
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              DRAWER FOOTER
              ======================================================== */}
          <div className="p-4 bg-white border-t border-[#c4d4be] flex items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-[#52735a] font-medium">
              {isUr ? "وراثت — عدل و انصاف کی میراث" : "Wirasat — A Legacy of Fairness"}
            </span>

            <button
              type="button"
              onClick={closeWasiyyahGuide}
              className="px-4 py-2 rounded-xl bg-[#245642] hover:bg-[#183c2a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isUr ? "بند کریں (مکمل مطالعہ)" : "Close Guide"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
