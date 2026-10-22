"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import {
  X,
  CheckCircle2,
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
      grandsons: { en: "Pote / Grandsons (Tanzīl)", ur: "پوتے (تنزيل)" },
      granddaughters: { en: "Potiyan / Granddaughters (Tanzīl)", ur: "پوتیاں (تنزيل)" },
      grandchild: { en: "Grandchildren (Tanzīl)", ur: "پوتے پوتیاں / نواسے نواسیاں (تنزيل)" },
      pota: { en: "Pota (Grandson via Son)", ur: "پوتا (تنزيل)" },
      poti: { en: "Poti (Granddaughter via Son)", ur: "پوتی (تنزيل)" },
      nawasa: { en: "Nawasa (Grandson via Daughter)", ur: "نواسا (تنزيل)" },
      nawasi: { en: "Nawasi (Granddaughter via Daughter)", ur: "نواسی (تنزيل)" },
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
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Tap backdrop to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Bottom Sheet Box */}
      <div
        className={`w-full max-h-[90vh] bg-[#fdfefc] rounded-t-3xl shadow-2xl border-t-3 border-[#b4caa9] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Drag Handle & Header */}
        <div className="pt-3 pb-4 px-6 border-b-2 border-stone-200 bg-white flex flex-col items-center relative">
          <div className="w-14 h-2 rounded-full bg-stone-300 mb-3" />

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-black text-lg sm:text-xl text-stone-950 leading-tight">
                  {isUr ? "حتمی شرعی تقسیمِ ترکہ" : "Final Distribution Breakdown"}
                </h3>
                <p className={`text-xs sm:text-sm font-bold text-stone-600 mt-0.5 ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr
                    ? `فتویٰ مطابق: حضرت آیت اللہ ${deceased.marja.toUpperCase()}`
                    : `According to Ayatullah ${deceased.marja.toUpperCase()}`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer transition-colors border border-stone-200"
              aria-label="Close sheet"
            >
              <X size={20} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Results Content */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 ${isUr ? "font-nastaliq" : "font-sans"}`}>
          {/* Summary Card */}
          <div className="p-5 rounded-3xl bg-[#edf3e7] border-2 border-[#b8ccb0] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1b4332]">
                {isUr ? "قابلِ تقسیم ترکہ (صافی)" : "Net Distributable Estate"}
              </span>
              <div className="text-2xl sm:text-4xl font-black text-[#0f2c20] mt-1">
                <span className="text-sm sm:text-base font-bold text-stone-600 mr-1.5">{currency}</span>
                {formatCurrency(netEstate)}
              </div>
            </div>

            <div className="text-right rtl:text-left">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-black bg-[#1b4332] text-white shadow-xs">
                <Sparkles size={14} />
                {totalPercentage.toFixed(0)}% {isUr ? "تقسیم شدہ" : "Distributed"}
              </span>
              <div className="text-xs sm:text-sm font-bold text-stone-600 mt-1.5">
                {result.heirShares.length} {isUr ? "وارثین کیٹگریز" : "Heir categories"}
              </div>
            </div>
          </div>

          {/* Warning if Insolvent */}
          {isDeficit && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-sm font-bold flex items-center gap-3">
              <Info size={20} className="shrink-0 text-amber-800" />
              <span>
                {isUr
                  ? "قرضہ جات ترکے سے زیادہ ہیں، پہلے دیون ادا ہوں گے۔"
                  : "Debts exceed assets. Outstanding debts must be settled first."}
              </span>
            </div>
          )}

          {/* Heir Cards List */}
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-800 px-1">
              {isUr ? "حصص برائے وارثین" : "Heir Shares & Entitlements"}
            </div>

            {result.heirShares.length === 0 ? (
              <div className="p-8 text-center text-stone-500 font-bold bg-white rounded-3xl border-2 border-dashed border-stone-300">
                {isUr ? "کوئی وارث منتخب نہیں کیا گیا" : "No heirs currently selected"}
              </div>
            ) : (
              result.heirShares.map((share) => (
                <div
                  key={share.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base sm:text-xl text-stone-950">
                          {getHeirTitle(share)}
                        </span>
                        {share.count > 1 && (
                          <span className="text-xs font-black px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-300">
                            ×{share.count}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 mt-1">
                        <span className="text-[#1b4332] font-black">
                          {isUr ? "حصہ:" : "Share:"} {share.fractionString}
                        </span>
                        <span>•</span>
                        <span>{share.percentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="text-right rtl:text-left">
                      <div className="font-black text-lg sm:text-2xl text-[#122e23]">
                        <span className="text-xs text-stone-500 mr-1">{currency}</span>
                        {formatCurrency(share.totalMonetaryShare)}
                      </div>
                      {share.count > 1 && (
                        <div className="text-xs sm:text-sm font-bold text-stone-600 mt-0.5">
                          {currency} {formatCurrency(share.sharePerIndividual)} / {isUr ? "ہر فرد" : "person"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scholarly citation button if available */}
                  {share.proof && (
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
                      <span className="text-stone-600 font-serif italic line-clamp-1">
                        {share.proof.quranReference || share.proof.masalahReference}
                      </span>
                      <button
                        onClick={() => openProvenance(share.relationKey)}
                        className="text-[#1b4332] font-black flex items-center gap-1.5 hover:underline cursor-pointer py-1"
                      >
                        <Scale size={13} />
                        <span>{isUr ? "دلیل دیکھیں" : "Fatwa Proof"}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Marja Rule Highlights (Widow Land, Habwah, etc.) */}
          {result.widowLandRuleApplied && (
            <div className="p-4 rounded-3xl bg-stone-100 border-2 border-stone-200 text-xs sm:text-sm text-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 font-black text-stone-900">
                <BookOpen size={16} className="text-[#1b4332]" />
                <span>{isUr ? "زوجہ کے لیے زمین کا شرعی حکم" : "Spousal Land Inheritance Rule"}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {result.widowLandRuleApplied.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Footer (Large Buttons) */}
        <div className={`p-4 sm:p-5 border-t-2 border-stone-200 bg-white flex gap-3.5 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}>
          <button
            onClick={handleCopySummary}
            className="flex-1 py-4 px-5 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md border-2 border-[#0e271c] transition-transform active:scale-98 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={20} className="text-emerald-300 stroke-[3]" />
                <span>{isUr ? "خلاصہ کاپی ہو گیا!" : "Summary Copied!"}</span>
              </>
            ) : (
              <>
                <Copy size={20} className="stroke-[2.5]" />
                <span>{isUr ? "خلاصہ کاپی کریں" : "Copy Breakdown"}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-4 px-6 rounded-2xl border-2 border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-900 font-black text-sm sm:text-base transition-colors cursor-pointer"
          >
            {isUr ? "بند کریں" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
