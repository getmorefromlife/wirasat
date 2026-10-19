"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Coins,
  Scale,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Bookmark,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  GLOSSARY_ITEMS,
  GLOSSARY_CATEGORIES,
  GlossaryItem,
  GlossaryCategory,
} from "@/lib/glossary-db";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { MarjaId } from "@/types/fiqh";

export function GlossaryView() {
  const {
    language,
    selectedGlossaryTermId,
    setSelectedGlossaryTermId,
    openProvenance,
    deceased,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "ALL">("ALL");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(selectedGlossaryTermId || "tarkah");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll and expand if a term was selected from another component (e.g., ProvenanceDrawer)
  useEffect(() => {
    if (selectedGlossaryTermId) {
      setExpandedCardId(selectedGlossaryTermId);
      const targetElement = cardRefs.current[selectedGlossaryTermId];
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [selectedGlossaryTermId]);

  // Search filtering logic
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GLOSSARY_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Match query across English, Urdu, Arabic, and Transliteration
      return (
        item.termEnglish.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.termArabic.toLowerCase().includes(q) ||
        item.termUrdu.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.shortDefinitionEn.toLowerCase().includes(q) ||
        item.shortDefinitionUr.toLowerCase().includes(q) ||
        item.detailedExplanationEn.toLowerCase().includes(q) ||
        item.detailedExplanationUr.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleCopyCitation = (item: GlossaryItem) => {
    const text = `${item.termUrdu} (${item.transliteration}) — ${item.shortDefinitionUr}\n${item.shortDefinitionEn}\nSource: Wirasat (میراثِ ثقلین) — Shia Inheritance Lexicon`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRelatedTermClick = (termId: string) => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setExpandedCardId(termId);
    setSelectedGlossaryTermId(termId);
    const targetElement = cardRefs.current[termId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* Editorial Header */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e7] border border-[#c3d5bb] text-xs font-bold text-[#245642]">
          <BookOpen className="w-3.5 h-3.5 text-[#245642]" />
          <span>{isUr ? "قاموس المواريث والفرائض" : "Lexicon of Shia Inheritance Law"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172e22] tracking-tight font-cinzel">
          {isUr ? (
            <span className="font-nastaliq leading-[2.2] block text-[#245642]">
              فرہنگِ اصطلاحاتِ وراثت
            </span>
          ) : (
            <span>Dictionary of Ja‘fari Inheritance</span>
          )}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
          {isUr
            ? "قرآن و روایاتِ معصومین (ع) پر مبنی وراثت کی بنیادی فقہی اصطلاحات، حسابی قواعد اور پانچوں مراجعِ عظام کے فتاویٰ کی عام فہم، جامع اور مستند لغت۔"
            : "An authoritative, bilingual reference decoding Quranic fractions, statutory classes, blocking maxims, and contemporary Marja‘ rulings in plain, everyday language."}
        </p>

        <div className="pt-1 text-xs text-[#52735a] font-medium flex items-center justify-center gap-2">
          <span>{isUr ? "تحقیق و تدوین: مولانا سیّد آئمن رضوی" : "Scholarly curation by Maulana Syed Imon Rizvi"}</span>
          <span>•</span>
          <span className="font-mono">{GLOSSARY_ITEMS.length} {isUr ? "مفصل اصطلاحات" : "Essential Terms"}</span>
        </div>
      </div>

      {/* Sticky Search & Filtration Bar */}
      <div className="sticky top-4 z-30 bg-[#fafbf8]/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#d8e0d2] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1 w-full">
            <Search
              className={`w-5 h-5 text-stone-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                isUr ? "right-4" : "left-4"
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isUr
                  ? "کسی بھی اصطلاح کو اردو، انگلش یا عربی میں تلاش کریں (مثلاً: اراضی، حبوہ، عول، تفقہ)..."
                  : "Search terms in English, Urdu, or Arabic (e.g., 'Aradi', 'Habwah', 'Awl', 'Land', 'Tanzil')..."
              }
              className={`w-full py-3 rounded-2xl bg-white border border-[#c3d5bb] focus:border-[#245642] focus:ring-2 focus:ring-[#245642]/10 text-sm sm:text-base text-[#172e22] outline-none transition-all placeholder:text-stone-400 font-medium ${
                isUr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-full ${
                  isUr ? "left-4" : "right-4"
                }`}
              >
                {isUr ? "صاف کریں" : "Clear"}
              </button>
            )}
          </div>

          {/* Quick Counter */}
          <div className="shrink-0 text-xs font-semibold text-[#52735a] px-3.5 py-2.5 rounded-2xl bg-[#edf3e7] border border-[#c3d5bb] hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#245642]" />
            <span>
              {isUr
                ? `${filteredItems.length} اصطلاحات دستیاب ہیں`
                : `${filteredItems.length} of ${GLOSSARY_ITEMS.length} terms`}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              selectedCategory === "ALL"
                ? "bg-[#245642] text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#edf3e7] border border-[#d8e0d2]"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{isUr ? "تمام اصطلاحات" : "All Categories"}</span>
          </button>

          {(Object.keys(GLOSSARY_CATEGORIES) as GlossaryCategory[]).map((catKey) => {
            const cat = GLOSSARY_CATEGORIES[catKey];
            const isSelected = selectedCategory === catKey;
            const count = GLOSSARY_ITEMS.filter((i) => i.category === catKey).length;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#245642] text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-[#edf3e7] border border-[#d8e0d2]"
                }`}
              >
                <span>{isUr ? cat.ur : cat.en}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-[#172e22] text-[#86efac]" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero State if nothing found */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#d8e0d2] space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#edf3e7] text-[#245642] flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#172e22]">
            {isUr ? "کوئی اصطلاح نہیں ملی" : "No matching terms found"}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {isUr
              ? `"${searchQuery}" کے لیے کوئی نتیجہ نہیں ملا۔ برائے مہربانی املا چیک کریں یا تمام زمروں پر واپس جائیں۔`
              : `We couldn't find any terms matching "${searchQuery}". Try searching by transliteration (e.g. 'Aradi', 'Awl') or reset filters.`}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="px-4 py-2 rounded-xl bg-[#245642] text-white text-xs font-bold hover:bg-[#1b3f30] transition-colors"
          >
            {isUr ? "فلٹرز ختم کریں" : "Reset All Filters"}
          </button>
        </div>
      )}

      {/* Glossary Cards Container */}
      <div className="grid grid-cols-1 gap-5">
        {filteredItems.map((item) => {
          const isExpanded = expandedCardId === item.id;
          const categoryMeta = GLOSSARY_CATEGORIES[item.category];

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el;
              }}
              id={`term-${item.id}`}
              className={`rounded-3xl border transition-all duration-300 bg-white overflow-hidden shadow-xs hover:shadow-md ${
                isExpanded
                  ? "border-[#245642] ring-1 ring-[#245642]/20"
                  : "border-[#d8e0d2] hover:border-[#a5b69d]"
              }`}
            >
              {/* Card Header & Summary (Clickable to Expand) */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-5 sm:p-6 cursor-pointer select-none bg-gradient-to-b from-white to-[#fafbf8] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Term Title & Metadata */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Category Badge */}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf3e7] text-[#245642] border border-[#c3d5bb]">
                        {isUr ? categoryMeta.ur : categoryMeta.en}
                      </span>

                      {/* Transliteration Pill */}
                      <span className="text-[11px] font-mono text-[#52735a] bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        {item.transliteration}
                      </span>

                      {item.marjaNuance && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Scale className="w-3 h-3 text-amber-700" />
                          <span>{isUr ? "مراجع کا فقہی اختلاف" : "Marja‘ Nuance"}</span>
                        </span>
                      )}
                    </div>

                    {/* Term Title */}
                    <div className="pt-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#172e22] flex flex-wrap items-baseline gap-3">
                        {isUr ? (
                          <>
                            <span className="font-nastaliq leading-[2.2] text-[#245642] text-2xl sm:text-3xl">
                              {item.termUrdu}
                            </span>
                            <span className="text-sm font-naskh text-stone-400 font-normal">
                              ({item.termArabic})
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl sm:text-2xl font-bold text-[#172e22] font-cinzel">
                              {item.termEnglish}
                            </span>
                            <span className="text-xs sm:text-sm font-mono text-[#52735a] font-normal">
                              ({item.termArabic} • {item.transliteration})
                            </span>
                          </>
                        )}
                      </h2>
                    </div>

                    {/* One-Sentence Summary */}
                    <p className="text-sm text-stone-700 font-medium leading-relaxed pt-1">
                      {isUr ? item.shortDefinitionUr : item.shortDefinitionEn}
                    </p>
                  </div>

                  {/* Right: Expand Toggle Button */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCitation(item);
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-[#245642] hover:bg-[#edf3e7] transition-colors border border-transparent hover:border-[#c3d5bb]"
                      title={isUr ? "حوالہ نقل کریں" : "Copy citation"}
                      aria-label="Copy citation"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <div className="w-9 h-9 rounded-2xl bg-[#edf3e7] text-[#245642] border border-[#c3d5bb] flex items-center justify-center transition-transform duration-200">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Detailed Fiqh Breakdown & Examples */}
              {isExpanded && (
                <div className="p-5 sm:p-7 bg-[#fcfdfa] border-t border-[#d8e0d2] space-y-6 animate-in slide-in-from-top-2 duration-200">
                  {/* Detailed Fiqh Explanation */}
                  <div className="p-5 rounded-2xl bg-white border border-[#d8e0d2] space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#245642] tracking-wider">
                      <Bookmark className="w-4 h-4 text-[#245642]" />
                      <span>{isUr ? "تفصیلی شرعی وضاحت و مبانی" : "Detailed Jurisprudential Exposition"}</span>
                    </div>

                    <div className="text-sm sm:text-base leading-relaxed text-[#172e22]">
                      {isUr ? (
                        <p className="font-nastaliq text-base sm:text-lg leading-[2.3] text-[#172e22] text-justify">
                          {item.detailedExplanationUr}
                        </p>
                      ) : (
                        <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-normal">
                          {item.detailedExplanationEn}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Real-Life Practical Scenario */}
                  {((isUr && item.exampleScenarioUr) || (!isUr && item.exampleScenarioEn)) && (
                    <div className="p-5 rounded-2xl bg-[#f5f8f2] border border-[#c3d5bb] space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-[#245642] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#245642]" />
                        <span>{isUr ? "عملی خاندانی مثال و تطبیق" : "Practical Real-Life Family Scenario"}</span>
                      </div>
                      {isUr ? (
                        <p className="text-sm sm:text-base font-nastaliq leading-[2.2] text-[#172e22]">
                          {item.exampleScenarioUr}
                        </p>
                      ) : (
                        <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                          {item.exampleScenarioEn}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Marja‘ Differences Accordion / Matrix */}
                  {item.marjaNuance && (
                    <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-3.5 shadow-xs">
                      <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                          <Scale className="w-4 h-4 text-amber-700" />
                          <span>
                            {isUr
                              ? "مراجعِ عظام کے تفصیلی فتاویٰ کا تقابلی جائزہ"
                              : "Comparative Ruling Matrix Across Grand Marāji‘"}
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-700 font-medium">
                          {isUr ? "مستند فتاویٰ" : "Authoritative Verdicts"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                        {(["sistani", "khoei", "khamenei", "makarem", "najafi"] as MarjaId[]).map((mId) => {
                          const meta = MARJA_DATABASE[mId];
                          const nuanceText = item.marjaNuance?.[mId];
                          if (!nuanceText) return null;
                          const isCurrentActive = deceased.marja === mId;

                          return (
                            <div
                              key={mId}
                              className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 transition-all ${
                                isCurrentActive
                                  ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-300/40"
                                  : "bg-[#fafbf8] border-stone-200"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[#172e22]">
                                  {isUr ? meta.nameUr : meta.nameEn}
                                </span>
                                {isCurrentActive && (
                                  <span className="text-[9px] font-extrabold px-2 py-0.2 rounded-full bg-amber-700 text-white uppercase">
                                    {isUr ? "آپ کا منتخب مرجع" : "Active Selection"}
                                  </span>
                                )}
                              </div>
                              <p className="text-stone-700 font-medium">
                                {nuanceText}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Related Terms & Direct Navigation */}
                  {item.relatedTerms.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-stone-500">
                        {isUr ? "متعلقہ اصطلاحات:" : "Related Terms:"}
                      </span>
                      {item.relatedTerms.map((relId) => {
                        const relItem = GLOSSARY_ITEMS.find((g) => g.id === relId);
                        if (!relItem) return null;

                        return (
                          <button
                            key={relId}
                            onClick={() => handleRelatedTermClick(relId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[#edf3e7] text-[#245642] border border-[#c3d5bb] hover:bg-[#245642] hover:text-white transition-colors"
                          >
                            <span>{isUr ? relItem.termUrdu : relItem.termEnglish}</span>
                            {isUr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Educational Footer Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#245642] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#172e22] text-[#86efac] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUr ? "علم میراثِ آلِ محمد (ع)" : "The Sacred Heritage"}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-cinzel">
            {isUr ? "قرآنِ کریم اور احادیثِ معصومین (ع) سے براہِ راست استفادہ" : "Direct Access to Primary Qur’anic & Hadith Texts"}
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed">
            {isUr
              ? "کسی بھی حسابی فیصلے، طبقاتی ترجیح یا تخفیفِ فریضہ کے مستند شرعی شواہد اور عربی متون کا مطالعہ کرنے کے لیے ہماری علمی سند کے خانے کو وزٹ کریں۔"
              : "Every single rule in this glossary is mapped to exact volume, page, and mas’alah citations in our Scholarly Provenance & Hadith Proofs drawer."}
          </p>
        </div>

        <button
          onClick={() => openProvenance("PROXIMITY_TIER1_VS_GRANDCHILDREN")}
          className="px-5 py-3 rounded-2xl bg-[#86efac] text-[#172e22] hover:bg-white text-xs font-extrabold flex items-center gap-2 shrink-0 transition-colors shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>{isUr ? "شرعی اسناد کا دراز کھولیں" : "Explore Provenance Drawer"}</span>
        </button>
      </div>
    </div>
  );
}
