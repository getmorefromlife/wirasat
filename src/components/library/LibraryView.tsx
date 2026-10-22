"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  CheckCircle2,
  FileText,
  Bookmark,
  Scale,
  ShieldCheck,
  Eye,
  X,
  Filter,
  Library as LibraryIcon,
} from "lucide-react";
import {
  LIBRARY_RESOURCES,
  LIBRARY_CATEGORIES,
  LibraryCategory,
  LibraryResource,
} from "@/lib/library-db";
import { useInheritanceStore } from "@/store/useInheritanceStore";

export const LibraryView: React.FC = () => {
  const { language } = useInheritanceStore();
  const isUr = language === "ur";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory | "ALL">("ALL");
  const [activePdfPreview, setActivePdfPreview] = useState<{ title: string; url: string } | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    if (!activePdfPreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePdfPreview(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePdfPreview]);

  // Search & Filter
  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LIBRARY_RESOURCES.filter((res) => {
      // Category filter
      if (selectedCategory !== "ALL" && res.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      return (
        res.titleEn.toLowerCase().includes(q) ||
        res.titleUr.toLowerCase().includes(q) ||
        res.authorEn.toLowerCase().includes(q) ||
        res.authorUr.toLowerCase().includes(q) ||
        res.descriptionEn.toLowerCase().includes(q) ||
        res.descriptionUr.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div
      className={`max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300 ${
        isUr ? "font-nastaliq" : "font-sans"
      }`}
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* Hero Header */}
      <div className="sacred-card rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fcfdfa] via-[#f7faf4] to-[#edf3e7] border-2 border-[#b8cbb0] shadow-md relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#245642] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <LibraryIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#245642]/10 text-[#245642] text-xs font-black uppercase tracking-wider border border-[#245642]/20">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{isUr ? "مکتبۂ اسناد و کتبِ میراث" : "Scholarly Library & Repository"}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-[#172e22] mt-1 leading-snug">
                {isUr
                  ? "فقہِ جعفریہ کی مستند کتب، رسائل اور پی ڈی ایف لائبریری"
                  : "Official Shia Inheritance Books, Treatises & PDFs"}
              </h1>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white border border-[#c4d4be] shadow-2xs self-start sm:self-auto shrink-0 text-start sm:text-end">
            <span className="text-[11px] font-bold text-[#52735a] block uppercase tracking-wider">
              {isUr ? "کل مصدقہ مآخذ:" : "Verified References:"}
            </span>
            <span className="font-extrabold text-base text-[#172e22]">
              {LIBRARY_RESOURCES.length} {isUr ? "کتب و پورٹلز" : "Books & Portals"}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 max-w-4xl leading-relaxed">
          {isUr
            ? "شریعتِ جعفریہ میں وراثت کے تمام قوانین قرآنِ مجید اور فرامینِ اہلِ بیت علیہم السلام سے ماخوذ ہیں۔ اس صفحے پر آپ مراجعِ عظام کے سرکاری رسائل، احادیثِ اہلبیت کے مصدقہ ابواب اور برصغیر کی عظیم فقہی کتب کا براہِ راست مطالعہ اور ڈاؤنلوڈ کر سکتے ہیں۔"
            : "Islamic inheritance in the Ja‘fari school is divinely codified in the Holy Qur'an and authentic teachings of the Holy Prophet and Ahl al-Bayt (as). This curated digital repository features verified legal treatises of living Marāji‘, canonical hadith compendiums, and downloadable master PDFs."}
        </p>
      </div>

      {/* Featured In-App PDFs Spotlight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold text-[#172e22]">
              {isUr ? "نمایاں مکمل پی ڈی ایف کتب (براہِ راست ڈاؤنلوڈ و مطالعہ)" : "Featured Complete PDFs (Instant Access)"}
            </h2>
          </div>
          <span className="text-xs text-[#52735a] font-bold">
            {isUr ? "۳ مکمل کتب موجود ہیں" : "3 Complete Books Available"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LIBRARY_RESOURCES.filter((r) => r.category === "LOCAL_PDF").map((book) => (
            <div
              key={book.id}
              className="p-5 rounded-2xl bg-white border-2 border-[#c4d4be] hover:border-[#245642] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl">{book.coverIcon}</span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {book.fileSizeBytes}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#172e22] leading-snug">
                    {isUr ? book.titleUr : book.titleEn}
                  </h3>
                  <span className="text-xs font-bold text-[#52735a] block mt-0.5">
                    {isUr ? book.authorUr : book.authorEn}
                  </span>
                </div>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {isUr ? book.descriptionUr : book.descriptionEn}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                <a
                  href={book.pdfUrl}
                  download
                  className="flex-1 py-2 px-3 rounded-xl bg-[#245642] hover:bg-[#1a4030] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isUr ? "ڈاؤنلوڈ" : "Download PDF"}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActivePdfPreview({ title: isUr ? book.titleUr : book.titleEn, url: book.pdfUrl! })}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title={isUr ? "آن لائن پڑھیں" : "Read In-Browser"}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isUr ? "مطالعہ" : "Preview"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isUr
                  ? "کتاب، مصنف یا فقہی موضوع تلاش کریں (مثلاً: سیستانی، نقن، کافی، عول، تعصیب)..."
                  : "Search by book title, author, or keyword (e.g., Sistani, Naqqan, Al-Kafi, Awl)..."
              }
              className="w-full ps-10 pe-4 py-2.5 rounded-2xl bg-white border-2 border-stone-200 focus:border-[#245642] text-sm text-stone-800 placeholder-stone-400 outline-hidden transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {(Object.keys(LIBRARY_CATEGORIES) as (LibraryCategory | "ALL")[]).map((catKey) => {
            const isSelected = selectedCategory === catKey;
            const meta = LIBRARY_CATEGORIES[catKey];
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? "bg-[#245642] text-white border-[#245642] shadow-xs"
                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                }`}
              >
                {isUr ? meta.ur : meta.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Resources List */}
      <div className="space-y-4">
        {filteredResources.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200 text-stone-500 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-stone-300" />
            <p className="font-bold text-sm">
              {isUr ? "کوئی کتاب یا حوالہ نہیں ملا" : "No matching resources found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#245642] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                        {res.coverIcon}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#172e22] leading-snug">
                          {isUr ? res.titleUr : res.titleEn}
                        </h3>
                        <span className="text-xs font-bold text-[#52735a] block">
                          {isUr ? res.authorUr : res.authorEn}
                        </span>
                      </div>
                    </div>

                    {res.isVerifiedActive && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold shrink-0 border border-emerald-200"
                        title={isUr ? "مصدقہ فعال لنک" : "Verified Active Link"}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isUr ? "مصدقہ" : "Verified"}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {isUr ? res.descriptionUr : res.descriptionEn}
                  </p>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {res.badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-bold"
                      >
                        {isUr ? b.ur : b.en}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2 flex-wrap">
                  {res.pdfUrl && (
                    <a
                      href={res.pdfUrl}
                      download
                      className="py-2 px-3.5 rounded-xl bg-[#245642] hover:bg-[#1a4030] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isUr ? `ڈاؤنلوڈ (${res.fileSizeBytes})` : `Download PDF (${res.fileSizeBytes})`}</span>
                    </a>
                  )}

                  {res.pdfUrl && (
                    <button
                      type="button"
                      onClick={() => setActivePdfPreview({ title: isUr ? res.titleUr : res.titleEn, url: res.pdfUrl! })}
                      className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isUr ? "مطالعہ کریں" : "Read Online"}</span>
                    </button>
                  )}

                  {res.externalUrl && (
                    <a
                      href={res.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ms-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#245642]" />
                      <span>{isUr ? (res.externalUrlLabelUr || "رسمی ویب سائٹ پر دیکھیں") : (res.externalUrlLabelEn || "Visit Official Portal")}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* In-Browser PDF Previewer Modal */}
      {activePdfPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setActivePdfPreview(null)} aria-hidden="true" />

          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl border-2 border-stone-300 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Bar */}
            <div className="p-4 bg-[#1b3d2f] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base truncate max-w-md">
                  {activePdfPreview.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePdfPreview.url}
                  download
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-emerald-950 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isUr ? "ڈاؤنلوڈ" : "Download"}</span>
                </a>
                <button
                  type="button"
                  id="close-pdf-modal"
                  aria-label={isUr ? "بند کریں" : "Close preview"}
                  onClick={() => setActivePdfPreview(null)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <iframe
              src={activePdfPreview.url}
              className="w-full flex-1 border-0"
              title={activePdfPreview.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};
