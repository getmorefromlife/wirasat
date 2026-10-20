"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { type MarjaId } from "@/types/fiqh";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
import { MobileCornerDrawer } from "./MobileCornerDrawer";
import { MobileResultSheet } from "./MobileResultSheet";
import {
  Menu,
  Plus,
  Minus,
  Sparkles,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Shield,
  Heart,
  HelpCircle,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

interface MobileCalculatorProps {
  onSwitchToDesktopMode?: () => void;
}

export const MobileCalculator: React.FC<MobileCalculatorProps> = ({
  onSwitchToDesktopMode,
}) => {
  const {
    language,
    deceased,
    assets,
    debts,
    heirs,
    updateDeceased,
    setMarja,
    updateAssets,
    updateDebts,
    updateHeirs,
    setWifeCount,
    resetAll,
    getCalculationResult,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";

  // Drawer states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResultSheetOpen, setIsResultSheetOpen] = useState(false);
  const [showDebtsAccordion, setShowDebtsAccordion] = useState(false);
  const [showAdvancedHeirs, setShowAdvancedHeirs] = useState(false);

  // Computed results
  const result = getCalculationResult();
  const netEstate = result.balanceSheet.netDistributableEstate;
  const totalPercentage = result.heirShares.reduce((sum, s) => sum + s.percentage, 0);

  // Total gross assets helper
  const totalGrossAssets =
    assets.cash +
    assets.bankAccounts +
    assets.residentialLand +
    assets.commercialLand +
    assets.agriculturalLand +
    assets.buildingsAndFixtures +
    assets.movableProperty;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isUr ? "ur-PK" : "en-US", {
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleTotalEstateChange = (value: number) => {
    const val = isNaN(value) || value < 0 ? 0 : value;
    // Set into cash and reset other asset items for simple single-amount calculation
    updateAssets({
      cash: val,
      bankAccounts: 0,
      residentialLand: 0,
      commercialLand: 0,
      agriculturalLand: 0,
      buildingsAndFixtures: 0,
      movableProperty: 0,
    });
  };

  const addQuickAmount = (amount: number) => {
    handleTotalEstateChange(totalGrossAssets + amount);
  };

  const marjaOptions: Array<{ id: MarjaId; labelUr: string; labelEn: string }> = [
    { id: "sistani", labelUr: "سیستانی", labelEn: "Sistani" },
    { id: "khamenei", labelUr: "خامنہ ای", labelEn: "Khamenei" },
    { id: "khoei", labelUr: "خوئی", labelEn: "Khoei" },
  ];

  return (
    <div
      className={`min-h-screen bg-[#f7f9f5] text-stone-900 pb-28 ${
        isUr ? "font-nastaliq" : "font-sans"
      }`}
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* 1. App Bar */}
      <header className="sticky top-0 z-30 bg-[#fbfdfa]/90 backdrop-blur-md border-b border-[#d8e4d2] px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <WirasatLogo variant="navbar" color="emerald" language={language} />
        </div>

        <div className="flex items-center gap-2 font-sans">
          {/* Quick Reset */}
          <button
            onClick={resetAll}
            className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title={isUr ? "ریسیٹ کریں" : "Reset"}
            aria-label="Reset"
          >
            <RotateCcw size={16} />
          </button>

          {/* Corner Menu Button (Hub) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf3e7] hover:bg-[#e1ebd9] text-[#245642] font-bold text-xs border border-[#c4d4be] shadow-2xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Open Hub Menu"
          >
            <Menu size={16} />
            <span className={isUr ? "font-nastaliq leading-[2.2]" : ""}>
              {isUr ? "مینو" : "Hub"}
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Marja Selector Pills (SadaPay style) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#edf3e7] border border-[#c8d8c2] shadow-2xs">
          {marjaOptions.map((m) => {
            const isSelected = deceased.marja === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMarja(m.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#245642] text-white shadow-xs scale-101"
                    : "text-[#245642] hover:bg-white/60"
                }`}
              >
                {isUr ? m.labelUr : m.labelEn}
              </button>
            );
          })}
        </div>

        {/* Deceased Gender Switcher */}
        <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between">
          <span className="text-xs font-bold text-stone-600">
            {isUr ? "مرحوم / مرحومہ کی جنس:" : "Deceased Gender:"}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => updateDeceased({ gender: "male" })}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deceased.gender === "male"
                  ? "bg-[#245642] text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isUr ? "مرحوم (مرد)" : "Male (Husband)"}
            </button>
            <button
              onClick={() => updateDeceased({ gender: "female" })}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deceased.gender === "female"
                  ? "bg-[#245642] text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isUr ? "مرحومہ (عورت)" : "Female (Wife)"}
            </button>
          </div>
        </div>

        {/* 3. Hero Estate Balance Card (SadaPay aesthetic) */}
        <div className="p-5 rounded-3xl bg-linear-to-b from-[#1b4332] to-[#122e23] text-white shadow-lg space-y-4 relative overflow-hidden">
          {/* Subtle Islamic Geometric Accent */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 font-sans">
              {isUr ? "کل ترکہ کی مالیت" : "Total Estate Value"}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 font-bold font-sans">
                {currency}
              </span>
            </div>
          </div>

          {/* Big Amount Input */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-sans">
                {currency === "PKR" ? "₨" : "$"}
              </span>
              <input
                type="number"
                value={totalGrossAssets || ""}
                onChange={(e) => handleTotalEstateChange(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full bg-transparent text-3xl sm:text-4xl font-extrabold text-white placeholder-emerald-700/60 outline-hidden font-sans"
              />
            </div>
            <div className="text-[11px] text-emerald-300/70 font-sans">
              {isUr ? "حساب کے لیے رقم درج کریں یا نیچے دیے گئے بٹنز دبائیں" : "Tap number to edit or use quick chips below"}
            </div>
          </div>

          {/* Quick Chip Buttons */}
          <div className="flex flex-wrap gap-2 pt-1 font-sans">
            {[
              { label: "+100k", val: 100000 },
              { label: "+500k", val: 500000 },
              { label: "+1M", val: 1000000 },
              { label: "+5M", val: 5000000 },
              { label: "+10M", val: 10000000 },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => addQuickAmount(chip.val)}
                className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-transform active:scale-95 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Quick Debts/Wasiyyah Toggle */}
          <div className="pt-2 border-t border-emerald-800/60 font-sans">
            <button
              onClick={() => setShowDebtsAccordion(!showDebtsAccordion)}
              className="w-full flex items-center justify-between text-xs text-emerald-200/90 font-bold hover:text-white cursor-pointer"
            >
              <span>{isUr ? "قرضہ، کفن و دفن یا وصیت وضع کریں" : "Deduct Debts, Funeral & Will"}</span>
              {showDebtsAccordion ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showDebtsAccordion && (
              <div className="pt-3 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-emerald-200">
                    {isUr ? "قرضہ جات (واجب الادا):" : "Debts:"}
                  </span>
                  <input
                    type="number"
                    value={debts.unsecuredDebts || ""}
                    onChange={(e) =>
                      updateDebts({ unsecuredDebts: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-32 bg-emerald-950/60 border border-emerald-700/60 rounded-lg px-2 py-1 text-right text-xs text-white outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-emerald-200">
                    {isUr ? "وصیت (زیادہ سے زیادہ 1/3):" : "Wasiyyah (Max 1/3):"}
                  </span>
                  <input
                    type="number"
                    value={debts.wasiyyahAmount || ""}
                    onChange={(e) =>
                      updateDebts({ wasiyyahAmount: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-32 bg-emerald-950/60 border border-emerald-700/60 rounded-lg px-2 py-1 text-right text-xs text-white outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Tactile Heir Counters (SadaPay Style Cards) */}
        <div className="space-y-3 font-sans">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {isUr ? "زندہ وارثین کا اندراج" : "Select Surviving Heirs"}
            </h2>
            <span className="text-[11px] font-semibold text-[#245642]">
              {isUr ? "بڑے بٹنز سے تعداد منتخب کریں" : "Tap + / − to set counts"}
            </span>
          </div>

          {/* SPOUSE CARD */}
          {deceased.gender === "male" ? (
            /* Wives Counter */
            <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                  <Heart size={15} className="text-rose-500 fill-rose-500" />
                  <span className={isUr ? "font-nastaliq" : ""}>
                    {isUr ? "بیوہ / بیویاں (Wives)" : "Surviving Wives"}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {isUr ? "زیادہ سے زیادہ 4 بیویاں" : "Max 4 concurrent wives"}
                </p>
              </div>

              {/* Large Tactile +/- Pill */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWifeCount(Math.max(0, (heirs.spouseCount || 0) - 1))}
                  disabled={(heirs.spouseCount || 0) === 0}
                  className="w-11 h-11 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-800 flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-2xs"
                  aria-label="Decrease wives"
                >
                  <Minus size={18} />
                </button>
                <span className="w-6 text-center font-black text-xl text-stone-900">
                  {heirs.spouseCount || 0}
                </span>
                <button
                  onClick={() => setWifeCount(Math.min(4, (heirs.spouseCount || 0) + 1))}
                  disabled={(heirs.spouseCount || 0) === 4}
                  className="w-11 h-11 rounded-full bg-[#245642] hover:bg-[#1b4332] disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
                  aria-label="Increase wives"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ) : (
            /* Husband Toggle */
            <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                  <Heart size={15} className="text-sky-500 fill-sky-500" />
                  <span className={isUr ? "font-nastaliq" : ""}>
                    {isUr ? "شوہر (Husband)" : "Surviving Husband"}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {isUr ? "مرحومہ کا شوہر زندہ ہے؟" : "Is husband currently alive?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ spouseCount: heirs.spouseCount === 1 ? 0 : 1 })}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  heirs.spouseCount === 1
                    ? "bg-[#245642] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {heirs.spouseCount === 1
                  ? isUr
                    ? "ہاں (زندہ ہے)"
                    : "Yes (Alive)"
                  : isUr
                  ? "نہیں"
                  : "No"}
              </button>
            </div>
          )}

          {/* SONS CARD */}
          <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                <User size={15} className="text-[#245642]" />
                <span className={isUr ? "font-nastaliq" : ""}>
                  {isUr ? "بیٹے (Sons)" : "Sons"}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isUr ? "بیٹے کا حصہ بیٹی سے دوگنا ہوتا ہے" : "2:1 residuary ratio"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateHeirs({ sonsCount: Math.max(0, (heirs.sonsCount || 0) - 1) })
                }
                disabled={(heirs.sonsCount || 0) === 0}
                className="w-11 h-11 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-800 flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-2xs"
                aria-label="Decrease sons"
              >
                <Minus size={18} />
              </button>
              <span className="w-6 text-center font-black text-xl text-stone-900">
                {heirs.sonsCount || 0}
              </span>
              <button
                onClick={() =>
                  updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                }
                className="w-11 h-11 rounded-full bg-[#245642] hover:bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Increase sons"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* DAUGHTERS CARD */}
          <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                <User size={15} className="text-amber-700" />
                <span className={isUr ? "font-nastaliq" : ""}>
                  {isUr ? "بیٹیاں (Daughters)" : "Daughters"}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isUr ? "صرف بیٹیاں ہوں تو فرض مع رد" : "Prescribed share + Radd"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateHeirs({
                    daughtersCount: Math.max(0, (heirs.daughtersCount || 0) - 1),
                  })
                }
                disabled={(heirs.daughtersCount || 0) === 0}
                className="w-11 h-11 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-800 flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-2xs"
                aria-label="Decrease daughters"
              >
                <Minus size={18} />
              </button>
              <span className="w-6 text-center font-black text-xl text-stone-900">
                {heirs.daughtersCount || 0}
              </span>
              <button
                onClick={() =>
                  updateHeirs({
                    daughtersCount: (heirs.daughtersCount || 0) + 1,
                  })
                }
                className="w-11 h-11 rounded-full bg-[#245642] hover:bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Increase daughters"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* PARENTS CARDS */}
          <div className="grid grid-cols-2 gap-3">
            {/* Father */}
            <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-bold text-sm text-stone-900 ${isUr ? "font-nastaliq" : ""}`}>
                  {isUr ? "والد (Father)" : "Father"}
                </span>
                <p className="text-[11px] text-stone-500">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                className={`w-full py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  heirs.fatherAlive
                    ? "bg-[#245642] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {heirs.fatherAlive
                  ? isUr
                    ? "زندہ ہیں"
                    : "Alive"
                  : isUr
                  ? "وفات پا چکے"
                  : "Deceased"}
              </button>
            </div>

            {/* Mother */}
            <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-bold text-sm text-stone-900 ${isUr ? "font-nastaliq" : ""}`}>
                  {isUr ? "والدہ (Mother)" : "Mother"}
                </span>
                <p className="text-[11px] text-stone-500">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                className={`w-full py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  heirs.motherAlive
                    ? "bg-[#245642] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {heirs.motherAlive
                  ? isUr
                    ? "زندہ ہیں"
                    : "Alive"
                  : isUr
                  ? "وفات پا چکیں"
                  : "Deceased"}
              </button>
            </div>
          </div>

          {/* Collapsible: Tier 2 & Tier 3 Heirs */}
          <div className="pt-1">
            <button
              onClick={() => setShowAdvancedHeirs(!showAdvancedHeirs)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <span>
                {isUr
                  ? "مزید رشتہ دار شامل کریں (دادا، دادی، بہن، بھائی، چچا)"
                  : "Add Grandparents, Siblings, or Uncles"}
              </span>
              {showAdvancedHeirs ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showAdvancedHeirs && (
              <div className="mt-2 p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="text-[11px] text-stone-500 leading-relaxed">
                  {isUr
                    ? "نوٹ: فقہِ جعفریہ کے مطابق جب تک طبقۂ اول (اولاد یا والدین) موجود ہوں، طبقۂ دوم (دادا، دادی، بہن، بھائی) شرعاً محجوب (محروم) رہتے ہیں۔"
                    : "Note: In Ja'fari fiqh, Tier 1 heirs (children/parents) completely exclude Tier 2 (grandparents/siblings)."}
                </div>

                {/* Sibling counters */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-stone-700">
                    {isUr ? "حقیقی بھائی (Full Brothers)" : "Full Brothers"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: Math.max(0, (heirs.fullBrothersCount || 0) - 1),
                        })
                      }
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center font-bold text-sm">
                      {heirs.fullBrothersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: (heirs.fullBrothersCount || 0) + 1,
                        })
                      }
                      className="w-8 h-8 rounded-full bg-[#245642] text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    {isUr ? "حقیقی بہنیں (Full Sisters)" : "Full Sisters"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: Math.max(0, (heirs.fullSistersCount || 0) - 1),
                        })
                      }
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center font-bold text-sm">
                      {heirs.fullSistersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: (heirs.fullSistersCount || 0) + 1,
                        })
                      }
                      className="w-8 h-8 rounded-full bg-[#245642] text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 5. Sticky Bottom Action Bar (SadaPay Style Floating CTA) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c8d8c2] p-3 shadow-2xl font-sans">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Quick status */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#173e30]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{totalPercentage.toFixed(0)}% {isUr ? "تقسیم" : "Distributed"}</span>
            </div>
            <div className="text-xs text-stone-500 font-semibold mt-0.5">
              <span>{currency} {formatNumber(netEstate)}</span>
            </div>
          </div>

          {/* Big Action Pill Button */}
          <button
            onClick={() => setIsResultSheetOpen(true)}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-[#245642] hover:bg-[#1b4332] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
          >
            <Sparkles size={16} className="text-emerald-300" />
            <span className={isUr ? "font-nastaliq text-base" : ""}>
              {isUr ? "حساب کی تفصیل دیکھیں" : "View Breakdown"}
            </span>
          </button>
        </div>
      </div>

      {/* 6. Modals / Sheets */}
      <MobileCornerDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSwitchToDesktopMode={onSwitchToDesktopMode}
      />

      <MobileResultSheet
        isOpen={isResultSheetOpen}
        onClose={() => setIsResultSheetOpen(false)}
      />
    </div>
  );
};
