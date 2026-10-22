"use client";

import React, { useState, useMemo } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { InheritanceCalculationResult, HeirShareResult } from "@/types/fiqh";
import {
  Sparkles,
  Calculator,
  Coins,
  Wallet,
  Users,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Percent,
  Sliders,
  DollarSign,
  Info,
  PieChart,
} from "lucide-react";
import { PlainStoryModal } from "@/components/modals/PlainStoryModal";

interface Props {
  calculationResult: InheritanceCalculationResult;
  className?: string;
}

// Utility to format large Pakistani / Indian amounts into spoken Lakh & Crore
function formatSouthAsianCurrency(amount: number, currency: string = "PKR"): { spokenUr: string; spokenEn: string } {
  if (amount <= 0) return { spokenUr: "0 روپے", spokenEn: "0" };

  const absAmount = Math.round(amount);
  if (absAmount >= 10000000) {
    const crores = (absAmount / 10000000).toFixed(2).replace(/\.00$/, "");
    return {
      spokenUr: `${crores} کروڑ ${currency}`,
      spokenEn: `${crores} Crore ${currency}`,
    };
  } else if (absAmount >= 100000) {
    const lakhs = (absAmount / 100000).toFixed(2).replace(/\.00$/, "");
    return {
      spokenUr: `${lakhs} لاکھ ${currency}`,
      spokenEn: `${lakhs} Lakh ${currency}`,
    };
  } else if (absAmount >= 1000) {
    const thousands = (absAmount / 1000).toFixed(1).replace(/\.0$/, "");
    return {
      spokenUr: `${thousands} ہزار ${currency}`,
      spokenEn: `${thousands} Thousand ${currency}`,
    };
  }
  return {
    spokenUr: `${absAmount.toLocaleString()} ${currency}`,
    spokenEn: `${absAmount.toLocaleString()} ${currency}`,
  };
}

export const SimpleDistributionInfographic: React.FC<Props> = ({
  calculationResult,
  className,
}) => {
  const { language, deceased } = useInheritanceStore();
  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";

  const netEstateOriginal = calculationResult.balanceSheet?.netDistributableEstate || 0;

  // Interactive Live Pocket Calculator state
  const [customEstateAmount, setCustomEstateAmount] = useState<number>(netEstateOriginal);
  const [isLiveCalculatorActive, setIsLiveCalculatorActive] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);

  // Active calculation base: either original net estate or custom calculator input
  const activeBaseAmount = isLiveCalculatorActive ? customEstateAmount : netEstateOriginal;

  // Filter heirs who receive a share > 0
  const activeHeirs = useMemo(() => {
    return calculationResult.heirShares.filter((h) => h.totalMonetaryShare > 0);
  }, [calculationResult]);

  // Color palette for the visual slices
  const sliceColors = [
    { bg: "bg-emerald-600", text: "text-emerald-700", border: "border-emerald-500", hex: "#059669" },
    { bg: "bg-amber-600", text: "text-amber-700", border: "border-amber-500", hex: "#d97706" },
    { bg: "bg-teal-600", text: "text-teal-700", border: "border-teal-500", hex: "#0d9488" },
    { bg: "bg-cyan-600", text: "text-cyan-700", border: "border-cyan-500", hex: "#0891b2" },
    { bg: "bg-blue-600", text: "text-blue-700", border: "border-blue-500", hex: "#2563eb" },
    { bg: "bg-indigo-600", text: "text-indigo-700", border: "border-indigo-500", hex: "#4f46e5" },
    { bg: "bg-purple-600", text: "text-purple-700", border: "border-purple-500", hex: "#9333ea" },
  ];

  const getHeirFriendlyTitle = (h: HeirShareResult): { ur: string; en: string; icon: string } => {
    const key = h.relationKey.toLowerCase();
    if (key.includes("wife") || key.includes("wives")) return { ur: "اہلیہ / بیوہ (زوجہ)", en: "Wife / Widow", icon: "💍" };
    if (key.includes("husband")) return { ur: "شوہر (زوج)", en: "Husband", icon: "🎩" };
    if (key.includes("son")) return { ur: "بیٹا (فرزند)", en: "Son(s)", icon: "👦" };
    if (key.includes("daughter")) return { ur: "بیٹی (دختر)", en: "Daughter(s)", icon: "👧" };
    if (key.includes("father")) return { ur: "والدِ محترم", en: "Father", icon: "👴" };
    if (key.includes("mother")) return { ur: "والدہ ماجدہ", en: "Mother", icon: "👵" };
    if (key.includes("brother")) return { ur: "سگا بھائی", en: "Full Brother", icon: "👨" };
    if (key.includes("sister")) return { ur: "سگی بہن", en: "Full Sister", icon: "👩" };
    if (key.includes("pota")) return { ur: "پوتا / پوتی (تنزیل)", en: "Grandsons (Tanzīl)", icon: "👶" };
    return { ur: h.relationKey, en: h.relationKey, icon: "👤" };
  };

  const formattedTotal = formatSouthAsianCurrency(activeBaseAmount, currency);

  return (
    <div className={`sacred-card rounded-3xl border-2 border-[#164e3a] bg-gradient-to-br from-[#ffffff] via-[#f7faf4] to-[#edf3e7] shadow-xl p-5 sm:p-7 space-y-6 ${className || ""}`}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c4d4be] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#245642] to-[#172e22] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            🌟
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#edf3e7] text-[#245642] text-[11px] font-black uppercase tracking-wider border border-[#c4d4be]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isUr ? "ایک تصویری آسان خلاصہ (One-Picture Visual)" : "At-A-Glance Visual Infographic"}</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#172e22] mt-0.5">
              {isUr ? "خلاصۂ تقسیم برائے عام فہم" : "Simplified Heir Distribution Snapshot"}
            </h3>
            <p className="text-xs sm:text-sm text-[#52735a] font-nastaliq leading-[2.2]">
              {isUr
                ? "ہر فرد کا حتمی روپیہ، فیصد اور آسان وضاحت ایک ہی نظر میں، بغیر کسی الجھن کے۔"
                : "Every family member's exact money in hand, visual proportion, and clear plain-language summary."}
            </p>
          </div>
        </div>

        {/* Live Pocket Calculator Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setIsLiveCalculatorActive(!isLiveCalculatorActive);
            if (!isLiveCalculatorActive && customEstateAmount === 0) {
              setCustomEstateAmount(netEstateOriginal || 10000000);
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer self-start sm:self-center ${
            isLiveCalculatorActive
              ? "bg-[#d97706] text-white border border-[#b45309] shadow-md shadow-amber-500/20"
              : "bg-white hover:bg-stone-50 text-[#245642] border border-[#245642]"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{isUr ? "فوری جیبی کیلکولیٹر (What-If)" : "Live Pocket Calculator"}</span>
        </button>
      </div>

      {/* Interactive Live Pocket Calculator Drawer */}
      {isLiveCalculatorActive && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 shadow-inner space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
              <Sliders className="w-4 h-4 text-amber-700" />
              <span>
                {isUr
                  ? "اگر ترکہ کی کل رقم مختلف ہو تو تبدیل کر کے دیکھیں:"
                  : "Simulate a different total estate amount in real time:"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCustomEstateAmount(netEstateOriginal);
                setIsLiveCalculatorActive(false);
              }}
              className="text-xs text-amber-800 hover:text-amber-950 underline font-bold cursor-pointer self-end sm:self-auto"
            >
              {isUr ? "اصل رقم پر واپس جائیں" : "Reset to actual estate"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="number"
                min={0}
                step={100000}
                value={customEstateAmount || ""}
                onChange={(e) => setCustomEstateAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white font-mono font-bold text-base text-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-start"
                placeholder="0"
              />
              <span className="absolute end-3 top-2.5 text-xs font-bold text-amber-700 pointer-events-none">
                {currency}
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              {[
                { label: "10 لاکھ", val: 1000000 },
                { label: "25 لاکھ", val: 2500000 },
                { label: "50 لاکھ", val: 5000000 },
                { label: "1 کروڑ", val: 10000000 },
                { label: "2 کروڑ", val: 20000000 },
                { label: "5 کروڑ", val: 50000000 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setCustomEstateAmount(preset.val)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    customEstateAmount === preset.val
                      ? "bg-amber-600 text-white border-amber-700"
                      : "bg-white hover:bg-amber-100 text-amber-900 border-amber-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* The Total Money Treasure Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#ffffff] via-[#f9faf7] to-[#edf3e7] border-2 border-[#b8cbb0] text-[#172e22] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#245642] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
            <Coins className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#245642] block">
              {isUr ? "کل قابلِ تقسیم خالص ترکہ (Net Distributable Estate)" : "Total Net Distributable Estate"}
            </span>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#172e22]" dir="ltr">
                {activeBaseAmount.toLocaleString()} {currency}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#b45309] font-nastaliq leading-[2.2]">
                ({formattedTotal.spokenUr})
              </span>
            </div>
          </div>
        </div>

        <div className="text-start md:text-end relative z-10 bg-white px-4 py-2.5 rounded-xl border border-[#c4d4be] shadow-xs">
          <span className="text-[11px] font-bold text-[#52735a] block uppercase tracking-wider">
            {isUr ? "وارثین کی کل تعداد:" : "Total Qualifying Heirs:"}
          </span>
          <span className="font-extrabold text-base sm:text-lg text-[#172e22]">
            {activeHeirs.reduce((sum, h) => sum + h.count, 0)} {isUr ? "افراد" : "Heirs"}
          </span>
        </div>
      </div>

      {/* One-Picture Visual Segmented Flow Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600">
          <span className="flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-[#245642]" />
            <span>{isUr ? "تصویری تناسب برائے ہر وارث (Visual Proportion):" : "Visual Share Proportions Across All Heirs:"}</span>
          </span>
          <span className="text-[11px] text-[#52735a]">
            {isUr ? "مجموعہ: ۱۰۰٪ قرآنی تقسیم" : "Total: 100% Divine Allocation"}
          </span>
        </div>

        {/* Stacked Gradient Bar */}
        <div className="w-full h-8 sm:h-10 rounded-xl bg-stone-200 overflow-hidden flex shadow-inner border border-stone-300">
          {activeHeirs.map((h, idx) => {
            const color = sliceColors[idx % sliceColors.length];
            const widthPct = Math.max(h.percentage, 4); // ensure min visibility
            const title = getHeirFriendlyTitle(h);
            return (
              <div
                key={h.id}
                style={{ width: `${widthPct}%` }}
                className={`${color.bg} h-full relative group transition-all hover:brightness-110 flex items-center justify-center text-white font-bold text-[11px] overflow-hidden px-1 border-r border-white/20`}
                title={`${isUr ? title.ur : title.en}: ${h.percentage.toFixed(1)}%`}
              >
                <span className="truncate">
                  {title.icon} {h.percentage.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Slices Story Interactive Callout Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-amber-50 via-amber-100/70 to-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-sm">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
              {isUr ? "💡 عام فہم کہانی (The Slices Story)" : "💡 Why These Numbers? (The Slices Story)"}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
              {isUr
                ? "جانیں کہ کیک کے کتنے ٹکڑے ہوئے، بیوہ اور بیٹی کا حصہ کیسے بنا اور ۱۰۰٪ تقسیم کیسے مکمل ہوئی۔"
                : "Understand how the estate cake was cut, why each fraction was formed, and how 100% distribution is achieved."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsStoryModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-black transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto shrink-0 border border-amber-600"
        >
          {isUr ? "مکمل کہانی پڑھیں" : "Read Full Story"}
        </button>
      </div>

      {/* Itemized Heir Cards: Large, Plain Language, Zero Complexities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {activeHeirs.map((h, idx) => {
          const color = sliceColors[idx % sliceColors.length];
          const title = getHeirFriendlyTitle(h);

          // Calculate monetary amount based on active base
          const actualShareAmount = isLiveCalculatorActive
            ? Math.round((activeBaseAmount * h.percentage) / 100)
            : Math.round(h.totalMonetaryShare);

          const spoken = formatSouthAsianCurrency(actualShareAmount, currency);

          return (
            <div
              key={h.id}
              className="p-5 rounded-2xl bg-white border-2 border-[#c4d4be] hover:border-[#245642] shadow-sm transition-all space-y-3 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 start-0 end-0 h-1.5 ${color.bg}`} />

              {/* Header: Heir Title, Icon & Fraction */}
              <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {title.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#172e22]">
                      {isUr ? title.ur : title.en}
                    </h4>
                    {h.count > 1 && (
                      <span className="text-[11px] font-bold text-stone-500">
                        {h.count} {isUr ? "افراد میں برابر تقسیم" : "individuals (divided equally)"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Statutory Fraction Badge */}
                <div className="text-end">
                  <span className="font-mono text-base font-black text-[#245642]">
                    {h.fractionString}
                  </span>
                  <span className="block text-[11px] font-bold text-[#52735a]">
                    ({h.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Huge, Clear Money Box */}
              <div className="p-3.5 rounded-xl bg-[#f7faf4] border border-[#d8e3d2] space-y-1">
                <span className="text-[11px] font-bold text-[#52735a] uppercase tracking-wider block">
                  {isUr ? "ملنے والی کل رقم (Cash in Hand):" : "Total Net Receivable Amount:"}
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono text-2xl font-black text-[#172e22]" dir="ltr">
                    {actualShareAmount.toLocaleString()} {currency}
                  </span>
                  <span className="text-sm font-bold text-[#245642] font-nastaliq leading-[2.2]">
                    ({spoken.spokenUr})
                  </span>
                </div>
                {h.count > 1 && (
                  <span className="text-xs text-stone-600 font-mono block pt-0.5">
                    {isUr
                      ? `فی فرد حصہ: ${Math.round(actualShareAmount / h.count).toLocaleString()} ${currency}`
                      : `${Math.round(actualShareAmount / h.count).toLocaleString()} ${currency} each`}
                  </span>
                )}
              </div>

              {/* Plain Language "Seedhi Baat" Explanation */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#245642]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isUr ? "سیدھی اور آسان بات:" : "In Plain Everyday Words:"}</span>
                </div>
                <p className="font-nastaliq leading-[2.2] text-stone-800 text-start">
                  {isUr
                    ? `اگر کل جائیداد میں سے ۱۰۰ روپے ہوں، تو ان کا شرعی حق بالکل ${h.percentage.toFixed(1)} روپے بنتا ہے۔`
                    : `For every 100 ${currency} of the net estate, this heir lawfully receives exactly ${h.percentage.toFixed(1)} ${currency}.`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plain Language Slices Story Modal */}
      <PlainStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        result={calculationResult}
        deceased={deceased}
        initialLanguage={language}
      />
    </div>
  );
};
