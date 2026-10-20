"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import {
  X,
  CheckCircle2,
  Share2,
  Sparkles,
  BookOpen,
  Scale,
  Copy,
  Info,
  Check,
} from "lucide-react";

interface MobileResultSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileResultSheet: React.FC<MobileResultSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    language,
    deceased,
    getCalculationResult,
    openProvenance,
  } = useInheritanceStore();

  const [copied, setCopied] = React.useState(false);
  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";

  if (!isOpen) return null;

  const result = getCalculationResult();
  const netEstate = result.balanceSheet.netDistributableEstate;
  const isDeficit = result.balanceSheet.isInsolvent;
  const totalPercentage = result.heirShares.reduce((sum, s) => sum + s.percentage, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isUr ? "ur-PK" : "en-US", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const getHeirTitle = (share: any): string => {
    const titles: Record<string, { en: string; ur: string }> = {
      husband: { en: "Husband (Zawj)", ur: "شوہر (زوج)" },
      wife: { en: "Wife (Zawjah)", ur: "بیوہ (زوجہ)" },
      wives: { en: "Wives (Zawjāt)", ur: "بیوائیں (زوجات)" },
      father: { en: "Father (Ab)", ur: "والد محترم" },
      mother: { en: "Mother (Umm)", ur: "والدہ ماجدہ" },
      son: { en: "Son (Ibn)", ur: "بیٹا" },
      sons: { en: "Sons (Abnā’)", ur: "بیٹے" },
      daughter: { en: "Daughter (Bint)", ur: "بیٹی" },
      daughters: { en: "Daughters (Banāt)", ur: "بیٹیاں" },
      grandsons: { en: "Grandsons (Tanzīl)", ur: "پوتے (تنزيل)" },
      fullBrother: { en: "Full Brother", ur: "سگا بھائی (ابوینی)" },
      fullBrothers: { en: "Full Brothers", ur: "سگے بھائی (ابوینی)" },
      fullSister: { en: "Full Sister", ur: "سگی بہن" },
      fullSisters: { en: "Full Sisters", ur: "سگی بہنیں" },
      maternalGrandparents: { en: "Maternal Grandparents", ur: "نانا و نانی" },
      paternalRelatives: { en: "Paternal Relatives (Tier 2)", ur: "پدری رشتہ دار (طبقہ دوم)" },
      maternalRelatives: { en: "Maternal Relatives (Tier 2)", ur: "مادری رشتہ دار (طبقہ دوم)" },
      paternalUncles: { en: "Paternal Relatives (Tier 3)", ur: "چچا و پھوپھیاں (طبقہ سوم)" },
    };

    const entry = titles[share.relationKey];
    if (entry) {
      return isUr ? entry.ur : entry.en;
    }
    return share.relationKey;
  };

  const handleCopySummary = () => {
    const lines = [
      isUr ? "حسابِ وراثت (شریعتِ جعفریہ)" : "Islamic Inheritance Distribution (Ja'fari Fiqh)",
      `${isUr ? "کل ترکہ:" : "Net Estate:"} ${currency} ${formatCurrency(netEstate)}`,
      `${isUr ? "مرجعِ تقلید:" : "Marja:"} ${deceased.marja.toUpperCase()}`,
      "-----------------------",
      ...result.heirShares.map(
        (share) =>
          `• ${getHeirTitle(share)} (${share.count}): ${share.fractionString} (${share.percentage.toFixed(1)}%) = ${currency} ${formatCurrency(share.totalMonetaryShare)}`
      ),
      "-----------------------",
      "Calculated via Shia-Wirasat: https://shia-wirasat.vercel.app",
    ];

    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Tap backdrop to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Bottom Sheet Box */}
      <div
        className={`w-full max-h-[88vh] bg-[#fdfefc] rounded-t-3xl shadow-2xl border-t border-[#c5d6ba] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Drag Handle & Header */}
        <div className="pt-3 pb-4 px-6 border-b border-stone-200 bg-white flex flex-col items-center relative">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 mb-3" />

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 leading-tight">
                  {isUr ? "حتمی شرعی تقسیمِ ترکہ" : "Final Distribution Breakdown"}
                </h3>
                <p className="text-[11px] text-stone-500 font-sans">
                  {isUr
                    ? `فتویٰ مطابق: آیت اللہ ${deceased.marja.toUpperCase()}`
                    : `According to Ayatullah ${deceased.marja.toUpperCase()}`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close sheet"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Results Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
          {/* Summary Card */}
          <div className="p-4 rounded-2xl bg-[#edf3e7] border border-[#c4d4be] flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#245642]">
                {isUr ? "قابلِ تقسیم ترکہ (صافی)" : "Net Distributable Estate"}
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#173e30] mt-0.5">
                <span className="text-xs font-bold text-stone-500 mr-1">{currency}</span>
                {formatCurrency(netEstate)}
              </div>
            </div>

            <div className="text-right rtl:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#245642] text-white shadow-2xs">
                <Sparkles size={12} />
                {totalPercentage.toFixed(0)}% {isUr ? "تقسیم شدہ" : "Distributed"}
              </span>
              <div className="text-[11px] text-stone-500 mt-1">
                {result.heirShares.length} {isUr ? "وارثین کیٹگریز" : "Heir categories"}
              </div>
            </div>
          </div>

          {/* Warning if Insolvent */}
          {isDeficit && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
              <Info size={16} className="shrink-0 text-amber-700" />
              <span>
                {isUr
                  ? "قرضہ جات ترکے سے زیادہ ہیں، پہلے دیون ادا ہوں گے۔"
                  : "Debts exceed assets. Outstanding debts must be settled first."}
              </span>
            </div>
          )}

          {/* Heir Cards List */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
              {isUr ? "حصص برائے وارثین" : "Heir Shares & Entitlements"}
            </div>

            {result.heirShares.length === 0 ? (
              <div className="p-6 text-center text-stone-400 bg-white rounded-2xl border border-dashed border-stone-200">
                {isUr ? "کوئی وارث منتخب نہیں کیا گیا" : "No heirs currently selected"}
              </div>
            ) : (
              result.heirShares.map((share) => (
                <div
                  key={share.id}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">
                          {getHeirTitle(share)}
                        </span>
                        {share.count > 1 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                            ×{share.count}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="font-semibold text-emerald-800">
                          {isUr ? "حصہ:" : "Share:"} {share.fractionString}
                        </span>
                        <span>•</span>
                        <span>{share.percentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="text-right rtl:text-left">
                      <div className="font-extrabold text-base text-[#1b4332]">
                        <span className="text-[10px] text-stone-400 mr-1">{currency}</span>
                        {formatCurrency(share.totalMonetaryShare)}
                      </div>
                      {share.count > 1 && (
                        <div className="text-[10px] text-stone-500">
                          {currency} {formatCurrency(share.sharePerIndividual)} / {isUr ? "ہر فرد" : "person"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scholarly citation button if available */}
                  {share.proof && (
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 font-serif italic line-clamp-1">
                        {share.proof.quranReference || share.proof.masalahReference}
                      </span>
                      <button
                        onClick={() => openProvenance(share.relationKey)}
                        className="text-[#245642] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Scale size={11} />
                        <span>{isUr ? "دلیل دیکھیں" : "Fatwa"}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Marja Rule Highlights (Widow Land, Habwah, etc.) */}
          {result.widowLandRuleApplied && (
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-stone-800">
                <BookOpen size={13} className="text-[#245642]" />
                <span>{isUr ? "زوجہ کے لیے زمین کا شرعی حکم" : "Spousal Land Inheritance Rule"}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {result.widowLandRuleApplied.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex gap-3 font-sans">
          <button
            onClick={handleCopySummary}
            className="flex-1 py-3 px-4 rounded-xl bg-[#245642] hover:bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-300" />
                <span>{isUr ? "کاپی ہو گیا!" : "Summary Copied!"}</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>{isUr ? "خلاصہ کاپی کریں" : "Copy Breakdown"}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
          >
            {isUr ? "بند کریں" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
