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
  Heart,
  RotateCcw,
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
      className={`min-h-screen bg-[#f5f8f2] text-stone-950 pb-32 ${
        isUr ? "font-nastaliq" : "font-sans"
      }`}
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* 1. High-Legibility App Bar */}
      <header className="sticky top-0 z-30 bg-[#ffffff]/95 backdrop-blur-md border-b-2 border-[#c6d7be] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 scale-105 origin-left rtl:origin-right">
          <WirasatLogo variant="navbar" color="emerald" language={language} />
        </div>

        <div className="flex items-center gap-2.5 font-sans">
          {/* Quick Reset */}
          <button
            onClick={resetAll}
            className="p-2.5 rounded-xl text-stone-700 hover:text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer border border-stone-200"
            title={isUr ? "تمام ڈیٹا صاف کریں" : "Reset Data"}
            aria-label="Reset"
          >
            <RotateCcw size={18} />
          </button>

          {/* Corner Menu Button (Hub) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#edf3e7] hover:bg-[#dcead5] text-[#1b4332] font-black text-sm border-2 border-[#a7c29c] shadow-xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Open Hub Menu"
          >
            <Menu size={18} className="stroke-[2.5]" />
            <span className={isUr ? "font-nastaliq text-base leading-none pt-0.5" : "font-bold text-sm"}>
              {isUr ? "مینو" : "Menu"}
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Large Marja Selector Pills */}
        <div>
          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-700 mb-1.5 px-1 font-sans">
            {isUr ? "مرجعِ تقلید کا انتخاب:" : "Select Marja‘ Ruling:"}
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#e4ede0] border-2 border-[#b8ccb0] shadow-xs">
            {marjaOptions.map((m) => {
              const isSelected = deceased.marja === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMarja(m.id)}
                  className={`flex-1 py-3 px-2 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#1b4332] text-white shadow-md scale-102 border-2 border-[#0e271c]"
                      : "text-[#1b4332] hover:bg-white/80 font-bold"
                  }`}
                >
                  <span className={isUr ? "font-nastaliq leading-[2]" : ""}>
                    {isUr ? m.labelUr : m.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deceased Gender Switcher (Large & High Contrast) */}
        <div className="p-4 rounded-3xl bg-white border-2 border-stone-200 shadow-xs flex items-center justify-between">
          <span className="text-sm sm:text-base font-black text-stone-900">
            {isUr ? "مرحوم / مرحومہ کی جنس:" : "Deceased Gender:"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => updateDeceased({ gender: "male" })}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                deceased.gender === "male"
                  ? "bg-[#1b4332] text-white shadow-sm border-2 border-[#0e271c]"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-2 border-transparent"
              }`}
            >
              <span className={isUr ? "font-nastaliq text-sm leading-[2]" : ""}>
                {isUr ? "مرحوم (مرد)" : "Male"}
              </span>
            </button>
            <button
              onClick={() => updateDeceased({ gender: "female" })}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                deceased.gender === "female"
                  ? "bg-[#1b4332] text-white shadow-sm border-2 border-[#0e271c]"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-2 border-transparent"
              }`}
            >
              <span className={isUr ? "font-nastaliq text-sm leading-[2]" : ""}>
                {isUr ? "مرحومہ (عورت)" : "Female"}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Hero Estate Balance Card (Extra Large & Punchy) */}
        <div className="p-6 rounded-3xl bg-linear-to-b from-[#153a2b] to-[#0c241b] text-white shadow-xl space-y-5 relative overflow-hidden border-2 border-[#245642]">
          {/* Subtle Background Glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-black uppercase tracking-wider text-emerald-200 font-sans">
              {isUr ? "کل ترکہ کی رقم (مالیت)" : "Total Estate Value"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-emerald-900 border border-emerald-600 text-emerald-100 font-black font-sans shadow-xs">
                {currency}
              </span>
            </div>
          </div>

          {/* Massive Amount Input */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 bg-black/20 p-3 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-sans">
                {currency === "PKR" ? "₨" : "$"}
              </span>
              <input
                type="number"
                value={totalGrossAssets || ""}
                onChange={(e) => handleTotalEstateChange(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full bg-transparent text-3xl sm:text-5xl font-black text-white placeholder-emerald-700/60 outline-hidden font-sans tracking-tight"
              />
            </div>
            <div className="text-xs sm:text-sm text-emerald-100 font-medium font-sans px-1">
              {isUr
                ? "رقم پر ٹیپ کر کے تبدیل کریں یا نیچے بٹنز دبائیں"
                : "Tap number to edit or tap quick addition chips below"}
            </div>
          </div>

          {/* Large Quick Addition Chips */}
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
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-black border-2 border-white/20 transition-transform active:scale-95 cursor-pointer shadow-xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Quick Debts/Wasiyyah Toggle */}
          <div className="pt-3 border-t-2 border-emerald-800/80 font-sans">
            <button
              onClick={() => setShowDebtsAccordion(!showDebtsAccordion)}
              className="w-full flex items-center justify-between text-xs sm:text-sm text-emerald-200 font-black hover:text-white cursor-pointer py-1"
            >
              <span>
                {isUr ? "قرضہ، کفن و دفن یا وصیت وضع کریں" : "Deduct Debts, Funeral & Will"}
              </span>
              {showDebtsAccordion ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showDebtsAccordion && (
              <div className="pt-3 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-emerald-100 font-bold">
                    {isUr ? "قرضہ جات (واجب الادا):" : "Outstanding Debts:"}
                  </span>
                  <input
                    type="number"
                    value={debts.unsecuredDebts || ""}
                    onChange={(e) =>
                      updateDebts({ unsecuredDebts: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-36 bg-emerald-950/80 border-2 border-emerald-600 rounded-xl px-3 py-1.5 text-right text-sm font-bold text-white outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-emerald-100 font-bold">
                    {isUr ? "وصیت (زیادہ سے زیادہ 1/3):" : "Wasiyyah (Max 1/3):"}
                  </span>
                  <input
                    type="number"
                    value={debts.wasiyyahAmount || ""}
                    onChange={(e) =>
                      updateDebts({ wasiyyahAmount: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-36 bg-emerald-950/80 border-2 border-emerald-600 rounded-xl px-3 py-1.5 text-right text-sm font-bold text-white outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Large Tactile Heir Counters (Big 56px Buttons for Low Vision) */}
        <div className="space-y-4 font-sans">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-stone-800">
              {isUr ? "زندہ وارثین کا اندراج" : "Select Surviving Heirs"}
            </h2>
            <span className="text-xs sm:text-sm font-bold text-[#1b4332]">
              {isUr ? "بڑے بٹنز سے تعداد مقرر کریں" : "Tap large + / − buttons"}
            </span>
          </div>

          {/* SPOUSE CARD */}
          {deceased.gender === "male" ? (
            /* Wives Counter */
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-base sm:text-lg text-stone-950">
                  <Heart size={20} className="text-rose-500 fill-rose-500 shrink-0" />
                  <span className={isUr ? "font-nastaliq text-xl" : ""}>
                    {isUr ? "بیوہ / بیویاں" : "Surviving Wives"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                  {isUr ? "زیادہ سے زیادہ ۴ بیویاں" : "Maximum 4 wives"}
                </p>
              </div>

              {/* Huge 56px Tactile Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWifeCount(Math.max(0, (heirs.spouseCount || 0) - 1))}
                  disabled={(heirs.spouseCount || 0) === 0}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-stone-100 hover:bg-stone-200 disabled:opacity-25 disabled:pointer-events-none text-stone-900 border-2 border-stone-300 flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-xs"
                  aria-label="Decrease wives"
                >
                  <Minus size={24} className="stroke-[3]" />
                </button>
                <span className="w-8 text-center font-black text-2xl sm:text-3xl text-stone-950">
                  {heirs.spouseCount || 0}
                </span>
                <button
                  onClick={() => setWifeCount(Math.min(4, (heirs.spouseCount || 0) + 1))}
                  disabled={(heirs.spouseCount || 0) === 4}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] disabled:opacity-25 disabled:pointer-events-none text-white border-2 border-[#0e271c] flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-md"
                  aria-label="Increase wives"
                >
                  <Plus size={24} className="stroke-[3]" />
                </button>
              </div>
            </div>
          ) : (
            /* Husband Toggle */
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-base sm:text-lg text-stone-950">
                  <Heart size={20} className="text-sky-600 fill-sky-600 shrink-0" />
                  <span className={isUr ? "font-nastaliq text-xl" : ""}>
                    {isUr ? "شوہر (زوج)" : "Surviving Husband"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                  {isUr ? "مرحومہ کا شوہر زندہ ہے؟" : "Is husband alive?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ spouseCount: heirs.spouseCount === 1 ? 0 : 1 })}
                className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                  heirs.spouseCount === 1
                    ? "bg-[#1b4332] text-white shadow-md border-2 border-[#0e271c]"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-2 border-stone-300"
                }`}
              >
                <span className={isUr ? "font-nastaliq leading-[2]" : ""}>
                  {heirs.spouseCount === 1
                    ? isUr
                      ? "ہاں (زندہ ہے)"
                      : "Yes (Alive)"
                    : isUr
                    ? "نہیں"
                    : "No"}
                </span>
              </button>
            </div>
          )}

          {/* SONS CARD */}
          <div className="p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-base sm:text-lg text-stone-950">
                <User size={20} className="text-[#1b4332] stroke-[2.5]" />
                <span className={isUr ? "font-nastaliq text-xl" : ""}>
                  {isUr ? "بیٹے (ابناء)" : "Sons"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                {isUr ? "بیٹے کا حصہ ۲ گنا ہے" : "2:1 residuary ratio"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateHeirs({ sonsCount: Math.max(0, (heirs.sonsCount || 0) - 1) })
                }
                disabled={(heirs.sonsCount || 0) === 0}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-stone-100 hover:bg-stone-200 disabled:opacity-25 disabled:pointer-events-none text-stone-900 border-2 border-stone-300 flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Decrease sons"
              >
                <Minus size={24} className="stroke-[3]" />
              </button>
              <span className="w-8 text-center font-black text-2xl sm:text-3xl text-stone-950">
                {heirs.sonsCount || 0}
              </span>
              <button
                onClick={() =>
                  updateHeirs({ sonsCount: (heirs.sonsCount || 0) + 1 })
                }
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] text-white border-2 border-[#0e271c] flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-md"
                aria-label="Increase sons"
              >
                <Plus size={24} className="stroke-[3]" />
              </button>
            </div>
          </div>

          {/* DAUGHTERS CARD */}
          <div className="p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-base sm:text-lg text-stone-950">
                <User size={20} className="text-amber-800 stroke-[2.5]" />
                <span className={isUr ? "font-nastaliq text-xl" : ""}>
                  {isUr ? "بیٹیاں (بنات)" : "Daughters"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                {isUr ? "فرض مع رد کا حصہ" : "Prescribed share + Radd"}
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
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-stone-100 hover:bg-stone-200 disabled:opacity-25 disabled:pointer-events-none text-stone-900 border-2 border-stone-300 flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Decrease daughters"
              >
                <Minus size={24} className="stroke-[3]" />
              </button>
              <span className="w-8 text-center font-black text-2xl sm:text-3xl text-stone-950">
                {heirs.daughtersCount || 0}
              </span>
              <button
                onClick={() =>
                  updateHeirs({
                    daughtersCount: (heirs.daughtersCount || 0) + 1,
                  })
                }
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] text-white border-2 border-[#0e271c] flex items-center justify-center font-black text-2xl transition-transform active:scale-90 cursor-pointer shadow-md"
                aria-label="Increase daughters"
              >
                <Plus size={24} className="stroke-[3]" />
              </button>
            </div>
          </div>

          {/* PARENTS CARDS (Large Chunky Badges) */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Father */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-black text-base sm:text-lg text-stone-950 ${isUr ? "font-nastaliq text-xl" : ""}`}>
                  {isUr ? "والد محترم" : "Father"}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                  heirs.fatherAlive
                    ? "bg-[#1b4332] text-white shadow-md border-2 border-[#0e271c]"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-2 border-stone-300"
                }`}
              >
                <span className={isUr ? "font-nastaliq leading-[2]" : ""}>
                  {heirs.fatherAlive
                    ? isUr
                      ? "زندہ ہیں"
                      : "Alive"
                    : isUr
                    ? "وفات پا چکے"
                    : "Deceased"}
                </span>
              </button>
            </div>

            {/* Mother */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-black text-base sm:text-lg text-stone-950 ${isUr ? "font-nastaliq text-xl" : ""}`}>
                  {isUr ? "والدہ ماجدہ" : "Mother"}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                  heirs.motherAlive
                    ? "bg-[#1b4332] text-white shadow-md border-2 border-[#0e271c]"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-2 border-stone-300"
                }`}
              >
                <span className={isUr ? "font-nastaliq leading-[2]" : ""}>
                  {heirs.motherAlive
                    ? isUr
                      ? "زندہ ہیں"
                      : "Alive"
                    : isUr
                    ? "وفات پا چکیں"
                    : "Deceased"}
                </span>
              </button>
            </div>
          </div>

          {/* Collapsible: Tier 2 & Tier 3 Heirs */}
          <div className="pt-2">
            <button
              onClick={() => setShowAdvancedHeirs(!showAdvancedHeirs)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-200/80 hover:bg-stone-300 text-stone-900 text-sm font-black border-2 border-stone-300 transition-colors cursor-pointer"
            >
              <span>
                {isUr
                  ? "مزید رشتہ دار شامل کریں (دادا، دادی، بہن، بھائی، چچا)"
                  : "Add Grandparents, Siblings, or Uncles"}
              </span>
              {showAdvancedHeirs ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showAdvancedHeirs && (
              <div className="mt-2.5 p-5 rounded-3xl bg-white border-2 border-stone-200 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed bg-[#edf3e7] p-3 rounded-xl border border-[#c4d4be]">
                  {isUr
                    ? "اہم نوٹ: فقہِ جعفریہ کے قطعی اصول کے مطابق جب تک طبقۂ اول (اولاد یا والدین) میں سے کوئی بھی ایک فرد موجود ہو، طبقۂ دوم (دادا، دادی، بہن، بھائی) شرعاً مکمل محجوب (محروم) رہتا ہے۔"
                    : "Crucial Rule: In Ja'fari jurisprudence, if any Tier 1 heir (child or parent) survives, all Tier 2 heirs (grandparents/siblings) are strictly excluded."}
                </div>

                {/* Sibling counters with larger buttons */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm sm:text-base font-black text-stone-900">
                    {isUr ? "حقیقی بھائی (Full Brothers)" : "Full Brothers"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: Math.max(0, (heirs.fullBrothersCount || 0) - 1),
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border-2 border-stone-300 flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-6 text-center font-black text-xl text-stone-900">
                      {heirs.fullBrothersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: (heirs.fullBrothersCount || 0) + 1,
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-black text-stone-900">
                    {isUr ? "حقیقی بہنیں (Full Sisters)" : "Full Sisters"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: Math.max(0, (heirs.fullSistersCount || 0) - 1),
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border-2 border-stone-300 flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-6 text-center font-black text-xl text-stone-900">
                      {heirs.fullSistersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: (heirs.fullSistersCount || 0) + 1,
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 5. Sticky Bottom Action Bar (Large, High Contrast, Chunky CTA) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t-3 border-[#b4caa9] p-4 shadow-2xl font-sans">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          {/* Quick status */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 text-sm sm:text-base font-black text-[#0f2c20]">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span>{totalPercentage.toFixed(0)}% {isUr ? "تقسیم" : "Distributed"}</span>
            </div>
            <div className="text-sm sm:text-base text-stone-800 font-extrabold mt-0.5">
              <span>{currency} {formatNumber(netEstate)}</span>
            </div>
          </div>

          {/* Big Chunky Action Pill Button */}
          <button
            onClick={() => setIsResultSheetOpen(true)}
            className="flex-1 py-4 px-6 rounded-2xl bg-[#1b4332] hover:bg-[#122e23] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg border-2 border-[#0e271c] transition-transform active:scale-98 cursor-pointer"
          >
            <Sparkles size={20} className="text-emerald-300 shrink-0" />
            <span className={isUr ? "font-nastaliq text-lg sm:text-xl leading-none pt-1" : "leading-none"}>
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
