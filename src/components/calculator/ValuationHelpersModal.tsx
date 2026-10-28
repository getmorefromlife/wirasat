"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import {
  X,
  Home,
  Coins,
  Sparkles,
  Check,
  Calculator,
  ArrowRight,
  Info,
} from "lucide-react";

interface ValuationHelpersModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "real-estate" | "gold";
}

export function ValuationHelpersModal({
  isOpen,
  onClose,
  defaultTab = "real-estate",
}: ValuationHelpersModalProps) {
  const {
    language,
    deceased,
    assets,
    debts,
    updateAssets,
    updateDebts,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";
  const [activeTab, setActiveTab] = useState<"real-estate" | "gold">(defaultTab);

  // Real Estate Splitter State
  const [totalHouseValue, setTotalHouseValue] = useState<number>(10000000);
  const [landRatio, setLandRatio] = useState<number>(60); // 60% land, 40% building
  const [appliedRealEstate, setAppliedRealEstate] = useState(false);

  // Gold Calculator State
  const [goldUnit, setGoldUnit] = useState<"tola" | "gram">("tola");
  const [goldQuantity, setGoldQuantity] = useState<number>(10);
  const [goldRatePerUnit, setGoldRatePerUnit] = useState<number>(
    currency === "PKR" ? 280000 : currency === "USD" ? 1000 : 250000
  );
  const [appliedGold, setAppliedGold] = useState(false);

  if (!isOpen) return null;

  // Real Estate Calculations
  const calculatedLand = Math.round((totalHouseValue * landRatio) / 100);
  const calculatedBuilding = Math.max(0, totalHouseValue - calculatedLand);

  // Gold Calculations
  const calculatedGoldTotal = Math.round(goldQuantity * goldRatePerUnit);

  const handleApplyRealEstate = () => {
    updateAssets({
      residentialLand: (assets.residentialLand || 0) + calculatedLand,
      buildingsAndFixtures: (assets.buildingsAndFixtures || 0) + calculatedBuilding,
    });
    setAppliedRealEstate(true);
    setTimeout(() => {
      setAppliedRealEstate(false);
      onClose();
    }, 900);
  };

  const handleApplyGoldToAssets = () => {
    updateAssets({
      movableProperty: (assets.movableProperty || 0) + calculatedGoldTotal,
    });
    setAppliedGold(true);
    setTimeout(() => {
      setAppliedGold(false);
      onClose();
    }, 900);
  };

  const handleApplyGoldToMahr = () => {
    // Deduct as debt to deceased wife / or payable dower
    updateDebts({
      unsecuredDebts: (debts.unsecuredDebts || 0) + calculatedGoldTotal,
    });
    setAppliedGold(true);
    setTimeout(() => {
      setAppliedGold(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      dir={isUr ? "rtl" : "ltr"}
    >
      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl border-2 border-stone-300 dark:border-stone-700 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shadow-xs">
              <Calculator size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-stone-950 dark:text-stone-50 leading-tight">
                {isUr ? "مالی تخمینہ کار و شرعی سہولت" : "Smart Valuation Helpers"}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {isUr
                  ? "مکان کی زمین و تعمیر کی علیحدگی اور سونے کا حساب"
                  : "Separate house land/building & convert gold jewelry"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 flex items-center justify-center transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 p-2 gap-2 bg-stone-100/60 dark:bg-stone-950/30">
          <button
            onClick={() => setActiveTab("real-estate")}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "real-estate"
                ? "bg-[#1b4332] text-white shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800"
            }`}
          >
            <Home size={16} />
            <span>{isUr ? "🏡 مکان: زمین و تعمیر تقسیم کار" : "🏡 House: Land vs. Building"}</span>
          </button>

          <button
            onClick={() => setActiveTab("gold")}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "gold"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800"
            }`}
          >
            <Coins size={16} />
            <span>{isUr ? "🪙 سونا و مہر کنورٹر" : "🪙 Gold & Mahr Converter"}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === "real-estate" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info size={14} className="text-emerald-700 dark:text-emerald-400" />
                  <span>{isUr ? "فقہی ضرورت کیوں ہے؟" : "Why is this separation necessary?"}</span>
                </div>
                <p className="leading-relaxed">
                  {isUr
                    ? "فقہ جعفریہ میں بیوہ کا حق زمین کے اصل (مٹی) میں نہیں بلکہ عمارات و تعمیر کی قیمت میں ہوتا ہے۔ چونکہ عام طور پر مکان کی کُل قیمت معلوم ہوتی ہے، یہ ٹول خودکار طور پر زمین اور تعمیر کو منصفانہ شرح پر تقسیم کر دیتا ہے۔"
                    : "In Ja‘fari jurisprudence, a widow's entitlement is calculated differently on physical soil versus building infrastructure. This tool splits a consolidated house value into land and construction."}
                </p>
              </div>

              {/* Total Property Value Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {isUr ? "مکان کی کُل مارکیٹ قیمت:" : "Total Consolidated Property Value:"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={totalHouseValue || ""}
                    onChange={(e) => setTotalHouseValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono font-bold text-base text-stone-900 dark:text-white"
                  />
                  <span className="absolute inset-y-0 inset-inline-end-0 flex items-center pe-4 font-bold text-xs text-stone-500">
                    {currency}
                  </span>
                </div>
              </div>

              {/* Preset Ratios */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  {isUr ? "زمین و تعمیر کا تناسب منتخب کریں:" : "Choose Property Split Ratio:"}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { ratio: 60, labelEn: "Standard (60% Land / 40% Bldg)", labelUr: "معیاری (60٪ زمین / 40٪ تعمیر)" },
                    { ratio: 70, labelEn: "Prime City (70% Land / 30% Bldg)", labelUr: "مہنگا علاقہ (70٪ زمین / 30٪ تعمیر)" },
                    { ratio: 40, labelEn: "New Luxury (40% Land / 60% Bldg)", labelUr: "نئی کوٹھی (40٪ زمین / 60٪ تعمیر)" },
                  ].map((preset) => (
                    <button
                      key={preset.ratio}
                      type="button"
                      onClick={() => setLandRatio(preset.ratio)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                        landRatio === preset.ratio
                          ? "bg-[#1b4332] text-white border-[#1b4332] shadow-xs"
                          : "border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? preset.labelUr : preset.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Computed Breakdown Preview */}
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isUr ? `رہائشی زمین (${landRatio}٪):` : `Residential Land (${landRatio}%):`}
                  </span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-white">
                    {currency} {calculatedLand.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">
                    {isUr ? `عمارات و تعمیراتی حصہ (${100 - landRatio}٪):` : `Building & Fixtures (${100 - landRatio}%):`}
                  </span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-white">
                    {currency} {calculatedBuilding.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyRealEstate}
                disabled={appliedRealEstate || totalHouseValue <= 0}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
              >
                {appliedRealEstate ? (
                  <>
                    <Check size={18} className="text-emerald-300" />
                    <span>{isUr ? "ترکہ کے اثاثوں میں کامیابی سے شامل ہو گیا!" : "Applied to Estate Assets!"}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>{isUr ? "ترکہ کے کھاتے میں درج کریں" : "Apply to Estate Assets"}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === "gold" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info size={14} className="text-amber-700 dark:text-amber-400" />
                  <span>{isUr ? "سونے اور مہر کا حساب" : "Gold Jewelry & Dower Calculation"}</span>
                </div>
                <p className="leading-relaxed">
                  {isUr
                    ? "والدہ یا متوفی کے زیورات اور بیوہ کا غیر ادا شدہ مہر عموماً تولہ یا گرام میں ہوتا ہے۔ یہ کیلکولیٹر موجودہ ریٹ کے مطابق فوری نقدی قیمت نکال کر ترکہ یا قرض میں درج کرتا ہے۔"
                    : "Gold jewelry or unpaid dower (Mahr) is traditionally denominated in Tolas or Grams. This calculator converts weight into cash valuation."}
                </p>
              </div>

              {/* Unit Toggle & Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isUr ? "پیمانہ:" : "Measurement Unit:"}
                  </label>
                  <div className="flex border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden p-1 bg-stone-50 dark:bg-stone-800">
                    <button
                      type="button"
                      onClick={() => setGoldUnit("tola")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        goldUnit === "tola" ? "bg-amber-600 text-white" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "تولہ (Tola)" : "Tola (11.66g)"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoldUnit("gram")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        goldUnit === "gram" ? "bg-amber-600 text-white" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {isUr ? "گرام (Gram)" : "Gram"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isUr ? "مقدار / وزن:" : "Total Weight:"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={goldQuantity || ""}
                    onChange={(e) => setGoldQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono font-bold text-sm"
                  />
                </div>
              </div>

              {/* Rate per Unit */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {isUr ? `فی ${goldUnit === "tola" ? "تولہ" : "گرام"} سونے کی مارکیٹ قیمت:` : `Market Rate per ${goldUnit === "tola" ? "Tola" : "Gram"}:`}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={goldRatePerUnit || ""}
                    onChange={(e) => setGoldRatePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono font-bold text-sm"
                  />
                  <span className="absolute inset-y-0 inset-inline-end-0 flex items-center pe-4 font-bold text-xs text-stone-500">
                    {currency}
                  </span>
                </div>
              </div>

              {/* Total Gold Calculated Value */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex justify-between items-center text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200">
                  {isUr ? `کُل طلائی مالیت (${goldQuantity} ${goldUnit === "tola" ? "تولہ" : "گرام"}):` : `Total Calculated Valuation:`}
                </span>
                <span className="font-mono font-black text-base text-amber-950 dark:text-amber-100">
                  {currency} {calculatedGoldTotal.toLocaleString()}
                </span>
              </div>

              {/* Two Direct Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleApplyGoldToAssets}
                  disabled={appliedGold || calculatedGoldTotal <= 0}
                  className="py-3 px-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Coins size={15} />
                  <span>{isUr ? "ترکہ (زیورات) میں شامل کریں" : "Add to Movable Assets"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyGoldToMahr}
                  disabled={appliedGold || calculatedGoldTotal <= 0}
                  className="py-3 px-3 rounded-2xl bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Sparkles size={15} />
                  <span>{isUr ? "بیوہ کے مہر (قرض) میں درج کریں" : "Set as Pending Mahr Debt"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
