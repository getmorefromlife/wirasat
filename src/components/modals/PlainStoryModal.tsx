"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  PieChart,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Info,
  Scale,
  Percent,
  Coins,
  ChevronRight,
  Globe,
  Share2,
} from "lucide-react";
import { InheritanceCalculationResult, DeceasedInfo } from "@/types/fiqh";
import { generatePlainLanguageStory, getFriendlyHeirTitle } from "@/lib/plain-story-generator";

interface PlainStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: InheritanceCalculationResult;
  deceased: DeceasedInfo;
  initialLanguage?: "en" | "ur";
}

export const PlainStoryModal: React.FC<PlainStoryModalProps> = ({
  isOpen,
  onClose,
  result,
  deceased,
  initialLanguage = "en",
}) => {
  const [modalLang, setModalLang] = useState<"en" | "ur">(initialLanguage);

  useEffect(() => {
    if (isOpen) {
      setModalLang(initialLanguage);
    }
  }, [isOpen, initialLanguage]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isUr = modalLang === "ur";
  const story = useMemo(() => {
    return generatePlainLanguageStory(result, deceased);
  }, [result, deceased]);

  if (!isOpen) return null;

  const sliceColors = [
    { bg: "bg-emerald-600", border: "border-emerald-500", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
    { bg: "bg-amber-600", border: "border-amber-500", text: "text-amber-700", badge: "bg-amber-100 text-amber-800" },
    { bg: "bg-teal-600", border: "border-teal-500", text: "text-teal-700", badge: "bg-teal-100 text-teal-800" },
    { bg: "bg-blue-600", border: "border-blue-500", text: "text-blue-700", badge: "bg-blue-100 text-blue-800" },
    { bg: "bg-indigo-600", border: "border-indigo-500", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-800" },
    { bg: "bg-purple-600", border: "border-purple-500", text: "text-purple-700", badge: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-3xl bg-[#fcfdfa] text-stone-900 rounded-3xl shadow-2xl border-2 border-[#b8cbb0] overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 animate-in zoom-in-95 duration-200 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#1b3d2f] via-[#245642] to-[#16382b] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md shrink-0">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isUr ? "عام فہم کہانی و تشریح" : "The Slices Story • Plain Language"}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-0.5 leading-snug">
                {isUr ? story.headlineUr : story.headlineEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setModalLang(isUr ? "en" : "ur")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isUr ? "English" : "اردو"}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Cake Slices Analogy Hero Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f2f7ee] via-[#e8f1e3] to-[#ddead4] border-2 border-[#b8cbb0] text-[#172e22] shadow-sm relative overflow-hidden space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#245642]">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{isUr ? "کیک اور ٹکڑوں کی مثال:" : "The Cake Analogy (Everyday View):"}</span>
            </div>
            <p className="text-base sm:text-lg font-semibold leading-relaxed">
              {isUr ? story.introCakeAnalogyUr : story.introCakeAnalogyEn}
            </p>

            {/* Visual Slices Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span>{isUr ? "کیک کے تمام ٹکڑوں کی تقسیم:" : "All Estate Slices Distributed:"}</span>
                <span className="font-mono text-[#245642] font-black">
                  {story.commonDenominator} / {story.commonDenominator} {isUr ? "حصے (۱۰۰٪)" : "Slices (100%)"}
                </span>
              </div>
              <div className="w-full h-8 rounded-xl bg-stone-200 overflow-hidden flex shadow-inner border border-stone-300">
                {story.summaryRows.map((row, idx) => {
                  const color = sliceColors[idx % sliceColors.length];
                  return (
                    <div
                      key={row.heirKey}
                      style={{ width: row.percentage }}
                      className={`${color.bg} h-full relative group transition-all flex items-center justify-center text-white font-bold text-[11px] overflow-hidden px-1 border-r border-white/20`}
                      title={`${isUr ? row.heirTitleUr : row.heirTitleEn}: ${row.fraction} (${row.percentage})`}
                    >
                      <span className="truncate">
                        {isUr ? row.heirTitleUr : row.heirTitleEn} ({row.fraction})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sequential Step-by-Step Story Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#245642]" />
              <span>{isUr ? "تقسیم کے تفصیلی مراحل (قدم بہ قدم):" : "Step-by-Step Sequence of Events:"}</span>
            </h3>

            {story.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-stone-200 shadow-xs hover:border-[#245642] transition-all space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#245642]/10 text-[#245642] text-xs font-bold border border-[#245642]/20">
                    <span>{isUr ? st.badgeUr : st.badgeEn}</span>
                  </div>
                  {st.slicesDetail && (
                    <div className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                      {isUr
                        ? `${st.slicesDetail.totalSlices} میں سے ${st.slicesDetail.slicesCount} حصے (${st.slicesDetail.fractionStr})`
                        : `${st.slicesDetail.slicesCount} of ${st.slicesDetail.totalSlices} slices (${st.slicesDetail.fractionStr})`}
                    </div>
                  )}
                </div>

                <h4 className="font-bold text-base text-[#172e22]">
                  {isUr ? st.titleUr : st.titleEn}
                </h4>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  {isUr ? st.narrativeUr : st.narrativeEn}
                </p>
              </div>
            ))}
          </div>

          {/* Special Legal Clauses (if any) */}
          {story.specialClauses.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>{isUr ? "خصوصی شرعی و فقہی احکام:" : "Special Islamic Rules Applied:"}</span>
              </h3>
              {story.specialClauses.map((sc, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-stone-800 space-y-1"
                >
                  <h5 className="font-bold text-sm text-amber-950">
                    {isUr ? sc.titleUr : sc.titleEn}
                  </h5>
                  <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                    {isUr ? sc.textUr : sc.textEn}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Complete Slices Summary Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#245642]" />
              <span>{isUr ? "خلاصۂ تقسیم (ٹکڑے اور رقم):" : "Final Slices & Cash Summary:"}</span>
            </h3>

            <div className="rounded-2xl border-2 border-stone-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs sm:text-sm">
                  <thead className="bg-[#f5f8f3] border-b border-stone-200 text-[#172e22] font-bold">
                    <tr>
                      <th className="py-3 px-4 text-start">{isUr ? "وارث" : "Heir"}</th>
                      <th className="py-3 px-3 text-start">{isUr ? "کیک کے ٹکڑے" : "Cake Slices"}</th>
                      <th className="py-3 px-3 text-center">{isUr ? "قرآنی کسر" : "Fraction"}</th>
                      <th className="py-3 px-3 text-center">{isUr ? "فیصد" : "Percentage"}</th>
                      <th className="py-3 px-4 text-end">{isUr ? "رقم" : "Cash in Hand"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {story.summaryRows.map((row, idx) => {
                      const color = sliceColors[idx % sliceColors.length];
                      return (
                        <tr key={row.heirKey} className="hover:bg-[#fcfdfa] transition-colors">
                          <td className="py-3 px-4 font-bold text-[#172e22] flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                            <span>{isUr ? row.heirTitleUr : row.heirTitleEn}</span>
                            {row.count > 1 && (
                              <span className="text-[11px] font-normal text-stone-500">
                                ({row.count})
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-semibold text-stone-700">
                            {isUr ? row.slicesOutOfTotalUr : row.slicesOutOfTotal}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-center text-[#245642]" dir="ltr">
                            {row.fraction}
                          </td>
                          <td className="py-3 px-3 font-mono text-center font-bold text-stone-800" dir="ltr">
                            {row.percentage}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-end text-[#172e22]" dir="ltr">
                            {row.moneyFormatted}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Takeaway Quote */}
          <div className="p-4 rounded-xl bg-[#245642]/10 border border-[#245642]/30 text-center">
            <p className="text-xs sm:text-sm font-semibold text-[#172e22]">
              {isUr ? story.takeawayQuoteUr : story.takeawayQuoteEn}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500">
            {isUr ? "حساب شریعتِ جعفریہ کے مطابق بالکل درست ہے" : "100% compliant with Shia Ja'fari Fiqh"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#245642] hover:bg-[#1a4030] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
          >
            {isUr ? "مکمل سمجھ آ گیا، بند کریں" : "Got It, Close Explanation"}
          </button>
        </div>
      </div>
    </div>
  );
};
