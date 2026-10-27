"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  Scale,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  Users,
  DollarSign,
  ChevronRight,
  FileText,
} from "lucide-react";
import { WhiteboardNode } from "@/lib/whiteboard-model";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { MarjaId } from "@/types/fiqh";

interface WhiteboardExplanationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  calculationData: any;
  family: any;
  nodes: WhiteboardNode[];
  isUr: boolean;
  currency: string;
  estateSubjectName: string;
}

export function WhiteboardExplanationDrawer({
  isOpen,
  onClose,
  calculationData,
  family,
  nodes,
  isUr,
  currency,
  estateSubjectName,
}: WhiteboardExplanationDrawerProps) {
  const [activeTab, setActiveTab] = useState<"math" | "fiqh" | "audit">("math");

  if (!isOpen) return null;

  const calcResult = calculationData?.calcResult;
  const balanceSheet = calculationData?.balanceSheet;
  const isGrossZero = calculationData?.isGrossZero;
  const canvasEstateGross = calculationData?.canvasEstateGross || 0;
  const rawMarja = calculationData?.deceasedInfo?.marja as MarjaId | undefined;
  const marjaInfo = (rawMarja && MARJA_DATABASE[rawMarja]) ? MARJA_DATABASE[rawMarja] : MARJA_DATABASE.sistani;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat(isUr ? "ur-PK" : "en-US", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const getTierLabel = (tier: number | null) => {
    if (tier === 1) return isUr ? "طبقہ اوّل (والدین اور اولاد)" : "Tier 1 (Parents & Children)";
    if (tier === 2) return isUr ? "طبقہ دوم (دادا، دادی، نانا، نانی اور بہن بھائی)" : "Tier 2 (Grandparents & Siblings)";
    if (tier === 3) return isUr ? "طبقہ سوم (چچا، پھوپھی، ماموں اور خالہ)" : "Tier 3 (Uncles & Aunts)";
    return isUr ? "غیر متعین طبقہ" : "Undetermined Tier";
  };

  const getHeirTitle = (share: any): string => {
    const title = isUr ? share.titleUr || share.heirId : share.titleEn || share.heirId;
    return title;
  };

  const totalPercentage = (calcResult?.heirShares || []).reduce(
    (sum: number, s: any) => sum + (s.percentage || 0),
    0
  );

  return (
    <div
      className="whiteboard-explanation-drawer w-full sm:w-[440px] md:w-[480px] shrink-0 border-l border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#0c1a14] z-30 flex flex-col shadow-2xl transition-all duration-300 select-text"
      role="region"
      aria-label={isUr ? "شرعی رہنمائی و حسابی آڈٹ" : "Shariah & Mathematical Audit"}
    >
      {/* Header */}
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-gradient-to-r from-emerald-50/90 via-white to-amber-50/40 dark:from-[#11241c] dark:via-[#0c1a14] dark:to-[#172e23] shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#245642] text-white flex items-center justify-center shadow-sm shrink-0">
              <BookOpen size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                {isUr ? "شرعی رہنمائی و حسابی آڈٹ" : "Shariah & Mathematical Audit"}
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate flex items-center gap-1">
                <Sparkles size={11} className="text-amber-500 shrink-0" />
                <span>
                  {isUr ? "مرکزِ ترکہ:" : "Estate focus:"}{" "}
                  <strong className="text-stone-800 dark:text-stone-200">{estateSubjectName}</strong>
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
            title={isUr ? "بند کریں (Close)" : "Close Drawer"}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 mt-3 p-1 rounded-xl bg-stone-100/90 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={() => setActiveTab("math")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "math"
                ? "bg-white dark:bg-[#163326] text-[#1b4d3e] dark:text-emerald-300 shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            <Calculator size={13} />
            <span>{isUr ? "حساب و کسر" : "Math Shares"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fiqh")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "fiqh"
                ? "bg-white dark:bg-[#163326] text-[#1b4d3e] dark:text-emerald-300 shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            <Scale size={13} />
            <span>{isUr ? "شرعی قواعد" : "Fiqh Rules"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "audit"
                ? "bg-white dark:bg-[#163326] text-[#1b4d3e] dark:text-emerald-300 shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            <ShieldCheck size={13} />
            <span>{isUr ? "آڈٹ و انتباہ" : "Sanity Check"}</span>
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: MATHEMATICAL SHARES & DISTRIBUTION */}
        {activeTab === "math" && (
          <div className="space-y-4">
            {/* Balance Sheet Card */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>{isUr ? "کل ترکہ (Gross Estate):" : "Gross Estate:"}</span>
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {currency} {formatMoney(balanceSheet?.grossEstate || canvasEstateGross)}
                </span>
              </div>

              {(balanceSheet?.totalDebts || 0) > 0 && (
                <div className="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400">
                  <span>{isUr ? "منہا: تجہیز و تکفین و دیون:" : "Less: Debts & Funeral:"}</span>
                  <span className="font-bold">
                    − {currency} {formatMoney(balanceSheet?.totalDebts || 0)}
                  </span>
                </div>
              )}

              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />

              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "قابلِ تقسیم خالص ترکہ:" : "Net Distributable Estate:"}
                </span>
                <span className="font-black text-[#1b4d3e] dark:text-emerald-400 text-base">
                  {currency} {formatMoney(balanceSheet?.netDistributableEstate || 0)}
                </span>
              </div>

              {isGrossZero && (
                <div className="mt-1 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/50">
                  {isUr
                    ? "نوٹ: چونکہ آپ نے اوپر ٹول بار میں ترکہ 0 رکھا ہے، اس لیے ہم نے کسروں کے حساب کی وضاحت کے لیے 24,000,000 کا فرضی ریفرنس استعمال کیا ہے۔ آپ ٹول بار سے کوئی بھی رقم درج کر سکتے ہیں۔"
                    : "Note: Since gross estate is 0, a reference value of 24,000,000 is used to display exact fractions and monetary portions. You can type any custom amount in the toolbar."}
                </div>
              )}
            </div>

            {/* Active Tier Banner */}
            <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-600/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-[#245642] dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px]">
                    {isUr ? "وارث طبقہ (Active Class):" : "Active Class of Heirs:"}
                  </span>
                  <strong className="text-stone-800 dark:text-emerald-200 font-bold">
                    {getTierLabel(calcResult?.activeTier)}
                  </strong>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
                {Math.round(totalPercentage)}% {isUr ? "تقسیم" : "Distributed"}
              </span>
            </div>

            {/* Heirs Distribution List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users size={13} className="text-[#245642] dark:text-emerald-400" />
                <span>{isUr ? "ورثاء کے شرعی حصے اور حصص" : "Heir Shares & Quranic Fractions"}</span>
              </h3>

              {(!calcResult?.heirShares || calcResult.heirShares.length === 0) ? (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 text-center text-xs text-stone-500">
                  {isUr ? "فی الوقت کوئی شرعی وارث موجود نہیں ہے۔" : "No eligible heirs currently in this scenario."}
                </div>
              ) : (
                calcResult.heirShares.map((share: any, idx: number) => (
                  <div
                    key={share.heirId || idx}
                    className="p-3 rounded-xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-600/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span>{getHeirTitle(share)}</span>
                          {share.count > 1 && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-normal">
                              × {share.count}
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                          <span className="font-semibold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#1b4d3e] dark:text-emerald-300 border border-emerald-600/20 font-mono">
                            {share.fractionString || "قرابت"}
                          </span>
                          <span>•</span>
                          <span>{share.percentage.toFixed(1)}%</span>
                          <span>•</span>
                          <span className="capitalize">{share.category || "فرض / قرابت"}</span>
                        </div>
                      </div>

                      <div className="text-end">
                        <div className="text-xs font-bold text-stone-900 dark:text-emerald-300 font-mono">
                          {currency} {formatMoney(share.totalMonetaryShare)}
                        </div>
                        {share.count > 1 && (
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                            {currency} {formatMoney(share.sharePerIndividual)} {isUr ? "فی کس" : "each"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Spousal Breakdown (Multiple Wives / Pending Mahr) */}
            {calcResult?.spousalBreakdown && calcResult.spousalBreakdown.wives.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-2">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Info size={13} />
                  <span>{isUr ? "زوجات کا شرعی اشتراک (زوجه / بیوہ کا حصہ):" : "Wives Breakdown & Pending Mahr:"}</span>
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed">
                  {isUr
                    ? `تمام بیوائیں قرآنی حصہ (${calcResult.spousalBreakdown.totalFraction}) میں برابر کی شریک ہیں۔ اگر کسی کا مہر باقی تھا تو وہ ترکے سے ترجیحی قرض کے طور پر پہلے ادا ہوا۔`
                    : `All wives equally share the prescribed Quranic fraction (${calcResult.spousalBreakdown.totalFraction}). Any pending mahr was deducted first as a priority debt.`}
                </p>
                <div className="space-y-1">
                  {calcResult.spousalBreakdown.wives.map((w: any) => (
                    <div key={w.id} className="flex items-center justify-between text-xs py-1 border-t border-amber-200/60 dark:border-amber-900/40">
                      <span className="font-medium text-stone-800 dark:text-stone-200">{w.name}</span>
                      <span className="font-mono text-stone-700 dark:text-amber-200">
                        {currency} {formatMoney(w.amount)} ({w.fraction})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FIQH RULES & SCHOLARLY CITATIONS */}
        {activeTab === "fiqh" && (
          <div className="space-y-4 text-xs">
            {/* Rule 1: Active Tier Rule */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-emerald-900/40 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#1b4d3e] dark:text-emerald-300 flex items-center justify-center text-[10px] font-black">
                  1
                </span>
                <span>{isUr ? "قاعدہ طبقات اور حجبِ حرمان (Priority of Tiers)" : "Priority of Tiers & Exclusion"}</span>
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11.5px]">
                {isUr
                  ? "فقہ جعفریہ میں ورثاء کے تین مستقل طبقات ہیں: (1) والدین اور اولاد، (2) دادا دادی اور بہن بھائی، (3) چچا، پھوپھی، ماموں اور خالہ۔ جب تک پہلے طبقے کا ایک فرد بھی موجود ہو، دوسرا اور تیسرا طبقہ قطعی طور پر محجوب (محروم) رہتا ہے: «الأقرب يمنع الأبعد»۔"
                  : "In Ja'fari jurisprudence, heirs are arranged in three exclusive tiers: (1) Parents and direct descendants, (2) Grandparents and siblings, (3) Uncles and aunts. The existence of even one heir in Tier 1 completely excludes Tier 2 and Tier 3 based on the Quranic principle: 'The closer relative excludes the more distant'."}
              </p>
              <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-[11px] font-serif">
                {isUr
                  ? "مستند حوالہ: سورۂ نساء، آیت 11 و 12 | وسائل الشیعہ، کتاب الفرائض و المواریث"
                  : "Primary Authority: Surah An-Nisa (4:11-12) & Wasa'il al-Shi'ah, Kitab al-Fara'id."}
              </div>
            </div>

            {/* Rule 2: Rejection of Awl & Ta'seeb */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-emerald-900/40 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#1b4d3e] dark:text-emerald-300 flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                <span>{isUr ? "بطلانِ عول اور تعصیب کا رد (No Deficit / No Agnatic Residue)" : "Rejection of 'Awl & Ta'seeb"}</span>
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11.5px]">
                {isUr
                  ? "اہلبیت علیہم السلام کی فقہ میں 'عول' (سارے ورثاء کے حصوں میں کمی کرنا) اور 'تعصیب' (بچا ہوا مال دور کے مرد رشتہ داروں کو دینا) باطل ہے۔ اگر کسریں ترکے سے زیادہ ہو جائیں تو کمی صرف ان پر پڑتی ہے جن کے حصے گھٹ سکتے ہیں (بیٹیاں یا بہنیں)، اور اگر مال بچ جائے تو وہ قرآنی ورثاء پر ہی 'رد' (واپس) ہوتا ہے۔"
                  : "According to the Ahlulbayt (a.s.), 'Awl (proportionate deficit across all heirs) and Ta'seeb (awarding residue to distant agnatic males) are invalid. Deficits fall solely upon variable-share heirs (daughters/sisters), and any surplus returns (Radd) strictly to the eligible Quranic heirs."}
              </p>
              <div className="p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 text-[#1b4d3e] dark:text-emerald-300 text-[11px]">
                {calcResult?.rejectionOfAwlApplied
                  ? (isUr ? "✓ اس صورت میں بطلانِ عول کا اصول فعال رہا۔" : "✓ Deficit resolution (Rejection of Awl) applied in this case.")
                  : (isUr ? "✓ اس کیس میں ترکہ پورا ہے، کسی کمی (Deficit) کی ضرورت پیش نہیں آئی۔" : "✓ No deficit encountered in this distribution.")}
              </div>
            </div>

            {/* Rule 3: Mother Hujub Nuqsan */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-emerald-900/40 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#1b4d3e] dark:text-emerald-300 flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                <span>{isUr ? "حجبِ نقصان: والدہ کا حصہ (Mother's Share Reduction)" : "Mother's Share & Hujub Nuqsan"}</span>
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11.5px]">
                {isUr
                  ? "اگر متوفیٰ کی اولاد موجود ہو (یا حاجب بہن بھائی شرائط کے ساتھ ہوں)، تو والدہ کا حصہ 1/3 سے گھٹ کر 1/6 ہو جاتا ہے۔ ورنہ وہ مکمل 1/3 (یا رد کے ساتھ زیادہ) پاتی ہے۔"
                  : "The mother's share reduces from 1/3 to 1/6 if the deceased has surviving descendants or qualifying blocking siblings (Hājib). Otherwise, she receives her full 1/3."}
              </p>
            </div>

            {/* Rule 4: Marja Specific Rulings (Sistani) */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <h4 className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                <FileText size={14} className="text-amber-600 shrink-0" />
                <span>{isUr ? marjaInfo.nameUr : marjaInfo.nameEn}</span>
              </h4>
              <p className="text-[11.5px] text-amber-900 dark:text-amber-300 leading-relaxed">
                {isUr ? marjaInfo.widowLandRulingUr : marjaInfo.widowLandRulingEn}
              </p>
              <div className="text-[10.5px] text-amber-800/80 dark:text-amber-400 font-mono">
                {marjaInfo.masalahWidow}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SANITY CHECK & LIVE CLARIFICATIONS */}
        {activeTab === "audit" && (
          <div className="space-y-3 text-xs">
            {/* Sanity Check 1: Total Sum Balance */}
            <div
              className={`p-3.5 rounded-2xl border ${
                Math.round(totalPercentage) === 100
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-600/30 text-emerald-950 dark:text-emerald-200"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/50 text-amber-950 dark:text-amber-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                {Math.round(totalPercentage) === 100 ? (
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="font-bold">
                    {Math.round(totalPercentage) === 100
                      ? (isUr ? "شرعی توازن 100% مکمل ہے" : "Estate Perfectly Balanced (100%)")
                      : (isUr ? "ترکے کی تقسیم نامکمل یا توازن طلب ہے" : "Distribution requires verification")}
                  </h4>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {Math.round(totalPercentage) === 100
                      ? (isUr ? "کل ترکہ من و عن شرعی کسروں کے مطابق پورا تقسیم ہوا ہے، کوئی رقم باقی یا کم نہیں۔" : "Total distributed shares equal exactly 100% of the distributable estate.")
                      : (isUr ? `موجودہ تقسیم شدہ کُل: ${totalPercentage.toFixed(1)}% ہے۔` : `Current distributed total: ${totalPercentage.toFixed(1)}%.`)}
                  </p>
                </div>
              </div>
            </div>

            {/* Sanity Check 2: Unresolved Relationships */}
            {family?.unresolvedIds && family.unresolvedIds.size > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900/50 text-amber-950 dark:text-amber-200">
                <div className="flex items-start gap-2.5">
                  <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold">
                      {isUr ? "غیر متعین رشتے موجود ہیں" : "Unconfirmed Relationships Detected"}
                    </h4>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      {isUr
                        ? "کچھ رشتہ داروں کے والدین یا نسبی تعلق کی تصدیق باقی ہے (مثلاً ایک سے زائد ازواج میں سے والدہ کا تعین)۔ برائے مہربانی نوڈ انسپکٹر سے تصدیق فرمائیں۔"
                        : "Some individuals have unconfirmed parent links. Please inspect each card to specify their exact biological parents."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sanity Check 3: Impediments (Killers / Non-Muslims) */}
            {nodes.some((n) => n.impediments?.isKiller || n.impediments?.isNonMuslim) && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/50 text-rose-950 dark:text-rose-200">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold">
                      {isUr ? "موانعِ ارث (Impediments to Inheritance)" : "Impediments Applied"}
                    </h4>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      {isUr
                        ? "خاندان میں کسی فرد پر شرعی مانع (قتل یا کفر) موجود ہے، جس کی وجہ سے شرعاً اس کا حصہ کالعدم کر دیا گیا ہے اور وہ دیگر ورثاء کو محجوب بھی نہیں کرتا۔"
                        : "One or more individuals have an active legal impediment (homicide or apostasy/non-Muslim). They receive zero share and do not block other heirs."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Engine Notes */}
            {calcResult?.notes && calcResult.notes.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-2">
                <h4 className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Info size={14} className="text-[#245642] dark:text-emerald-400" />
                  <span>{isUr ? "حسابی انجن کی تفصیلی شرعی نوٹس" : "Calculation Engine Notes"}</span>
                </h4>
                <div className="space-y-1.5">
                  {calcResult.notes.map((note: string, i: number) => (
                    <div key={i} className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed border-l-2 border-emerald-600/40 ps-2">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/60 flex items-center justify-between text-xs text-stone-500 shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isUr ? "لائیو اپڈیٹ جاری ہے" : "Live Fiqh Sync Active"}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-[#245642] hover:bg-[#1b4d3e] text-white font-bold transition-colors cursor-pointer"
        >
          {isUr ? "مکمل ہوا" : "Done"}
        </button>
      </div>
    </div>
  );
}
