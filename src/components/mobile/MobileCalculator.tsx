"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { type MarjaId, type PersonNode } from "@/types/fiqh";
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
  Baby,
  AlertCircle,
  Home,
  Coins,
} from "lucide-react";
import { ValuationHelpersModal } from "@/components/calculator/ValuationHelpersModal";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

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
    updateNamedDescendants,
    resetAll,
    getCalculationResult,
    loadPreset,
    activePresetId,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";

  // Drawer & Accordion states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResultSheetOpen, setIsResultSheetOpen] = useState(false);
  const [showDebtsAccordion, setShowDebtsAccordion] = useState(false);
  const [showAdvancedHeirs, setShowAdvancedHeirs] = useState(false);
  const [showGrandchildren, setShowGrandchildren] = useState(false);
  const [helperModalOpen, setHelperModalOpen] = useState(false);
  const [helperTab, setHelperTab] = useState<"real-estate" | "gold">("real-estate");

  // Grandchildren Local Counters (synced with store)
  const [poteCount, setPoteCount] = useState<number>(
    heirs.deceasedSonsWithChildren?.[0]?.sons || 0
  );
  const [potiyanCount, setPotiyanCount] = useState<number>(
    heirs.deceasedSonsWithChildren?.[0]?.daughters || 0
  );
  const [nawaseCount, setNawaseCount] = useState<number>(
    heirs.deceasedDaughtersWithChildren?.[0]?.sons || 0
  );
  const [nawasiyanCount, setNawasiyanCount] = useState<number>(
    heirs.deceasedDaughtersWithChildren?.[0]?.daughters || 0
  );

  // Computed results
  const result = getCalculationResult();
  const netEstate = result.balanceSheet.netDistributableEstate;
  const totalPercentage = result.heirShares.reduce((sum, s) => sum + s.percentage, 0);

  // Synchronize Lineage (Sons, Daughters, Grandchildren through Tanzil)
  const syncLineage = (
    sons: number,
    daughters: number,
    pote: number,
    potiyan: number,
    nawase: number,
    nawasiyan: number
  ) => {
    const nodes: PersonNode[] = [];

    // 1. Living Sons
    for (let i = 0; i < sons; i++) {
      nodes.push({
        id: `son-${i + 1}`,
        name: `Son ${i + 1}`,
        gender: "MALE",
        isAlive: true,
        relation: "SON",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        habwahEligible: i === 0,
      });
    }

    // 2. Living Daughters
    for (let i = 0; i < daughters; i++) {
      nodes.push({
        id: `daughter-${i + 1}`,
        name: `Daughter ${i + 1}`,
        gender: "FEMALE",
        isAlive: true,
        relation: "DAUGHTER",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
      });
    }

    // 3. Deceased Son Branch (Pote & Potiyan)
    if (pote > 0 || potiyan > 0) {
      const decSonId = "deceased-son-1";
      const gcList: PersonNode[] = [];
      for (let i = 0; i < pote; i++) {
        gcList.push({
          id: `pota-${i + 1}`,
          name: `Pota ${i + 1}`,
          gender: "MALE",
          isAlive: true,
          relation: "GRANDCHILD",
          parentId: decSonId,
          impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        });
      }
      for (let i = 0; i < potiyan; i++) {
        gcList.push({
          id: `poti-${i + 1}`,
          name: `Poti ${i + 1}`,
          gender: "FEMALE",
          isAlive: true,
          relation: "GRANDCHILD",
          parentId: decSonId,
          impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        });
      }

      nodes.push({
        id: decSonId,
        name: "Deceased Son (Marhūm)",
        gender: "MALE",
        isAlive: false,
        relation: "SON",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        children: gcList,
      });
      nodes.push(...gcList);
    }

    // 4. Deceased Daughter Branch (Nawase & Nawasiyan)
    if (nawase > 0 || nawasiyan > 0) {
      const decDtrId = "deceased-daughter-1";
      const gcList: PersonNode[] = [];
      for (let i = 0; i < nawase; i++) {
        gcList.push({
          id: `nawasa-${i + 1}`,
          name: `Nawasa ${i + 1}`,
          gender: "MALE",
          isAlive: true,
          relation: "GRANDCHILD",
          parentId: decDtrId,
          impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        });
      }
      for (let i = 0; i < nawasiyan; i++) {
        gcList.push({
          id: `nawasi-${i + 1}`,
          name: `Nawasi ${i + 1}`,
          gender: "FEMALE",
          isAlive: true,
          relation: "GRANDCHILD",
          parentId: decDtrId,
          impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        });
      }

      nodes.push({
        id: decDtrId,
        name: "Deceased Daughter (Marhūmah)",
        gender: "FEMALE",
        isAlive: false,
        relation: "DAUGHTER",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
        children: gcList,
      });
      nodes.push(...gcList);
    }

    // Update store
    updateNamedDescendants(nodes);
    updateHeirs({
      sonsCount: sons,
      daughtersCount: daughters,
      deceasedSonsWithChildren:
        pote > 0 || potiyan > 0 ? [{ sons: pote, daughters: potiyan }] : [],
      deceasedDaughtersWithChildren:
        nawase > 0 || nawasiyan > 0 ? [{ sons: nawase, daughters: nawasiyan }] : [],
    });
  };

  const handleSonsChange = (val: number) => {
    syncLineage(val, heirs.daughtersCount || 0, poteCount, potiyanCount, nawaseCount, nawasiyanCount);
  };

  const handleDaughtersChange = (val: number) => {
    syncLineage(heirs.sonsCount || 0, val, poteCount, potiyanCount, nawaseCount, nawasiyanCount);
  };

  const handlePoteChange = (val: number) => {
    const safe = Math.max(0, val);
    setPoteCount(safe);
    syncLineage(heirs.sonsCount || 0, heirs.daughtersCount || 0, safe, potiyanCount, nawaseCount, nawasiyanCount);
  };

  const handlePotiyanChange = (val: number) => {
    const safe = Math.max(0, val);
    setPotiyanCount(safe);
    syncLineage(heirs.sonsCount || 0, heirs.daughtersCount || 0, poteCount, safe, nawaseCount, nawasiyanCount);
  };

  const handleNawaseChange = (val: number) => {
    const safe = Math.max(0, val);
    setNawaseCount(safe);
    syncLineage(heirs.sonsCount || 0, heirs.daughtersCount || 0, poteCount, potiyanCount, safe, nawasiyanCount);
  };

  const handleNawasiyanChange = (val: number) => {
    const safe = Math.max(0, val);
    setNawasiyanCount(safe);
    syncLineage(heirs.sonsCount || 0, heirs.daughtersCount || 0, poteCount, potiyanCount, nawaseCount, safe);
  };

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
    { id: "sistani", labelUr: "آیت اللہ سیستانی", labelEn: "Ayatullah Sistani" },
    { id: "khamenei", labelUr: "آیت اللہ خامنہ ای", labelEn: "Ayatullah Khamenei" },
    { id: "khoei", labelUr: "آیت اللہ خوئی", labelEn: "Ayatullah Khoei" },
  ];

  const hasLivingDirectChildren = (heirs.sonsCount || 0) > 0 || (heirs.daughtersCount || 0) > 0;
  const hasAnyGrandchildren = poteCount > 0 || potiyanCount > 0 || nawaseCount > 0 || nawasiyanCount > 0;

  return (
    <div
      className={`sunlit-mobile min-h-screen bg-[#f8fafc] text-[#0f172a] pb-36 ${
        isUr ? "font-nastaliq" : "font-sans"
      }`}
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* 1. Strict High-Contrast App Bar (Pure White background, Black text & icons) */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-stone-300 px-4 py-3 flex flex-wrap gap-3 items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 scale-105 origin-left rtl:origin-right">
          <WirasatLogo variant="navbar" color="emerald" language={language} />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Reset */}
          <button
            onClick={() => {
              resetAll();
              setPoteCount(0);
              setPotiyanCount(0);
              setNawaseCount(0);
              setNawasiyanCount(0);
            }}
            className="p-2.5 rounded-xl text-stone-900 hover:text-rose-700 bg-stone-100 hover:bg-rose-50 transition-colors cursor-pointer border-2 border-stone-300 font-bold"
            title={isUr ? "تمام ڈیٹا صاف کریں" : "Reset Data"}
            aria-label="Reset"
          >
            <RotateCcw size={18} className="stroke-[2.5]" />
          </button>

          {/* Corner Menu Button (Hub) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#0f172a] font-black text-sm border-2 border-stone-400 shadow-xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Open Hub Menu"
          >
            <Menu size={20} className="stroke-[3]" />
            <span className={isUr ? "font-nastaliq text-base leading-none pt-1" : "font-black text-sm"}>
              {isUr ? "مینو" : "Menu"}
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Marja Selector (Solid Dark Green vs Crisp White with Black text) */}
        <div>
          <label className={`block text-xs sm:text-sm font-black uppercase tracking-wider text-[#0f172a] mb-2 px-1 ${
            isUr ? "font-nastaliq" : "font-sans"
          }`}>
            {isUr ? "مرجعِ تقلید کا انتخاب فرمائیں:" : "Select Marja‘ Rulings:"}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            {marjaOptions.map((m) => {
              const isSelected = deceased.marja === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMarja(m.id)}
                  className={`flex-1 py-3 px-3 rounded-2xl text-sm sm:text-base font-black transition-all cursor-pointer border-2 ${
                    isSelected
                      ? "bg-theme-card-dark text-white border-theme-card-dark shadow-md scale-101"
                      : "bg-white text-[#0f172a] border-stone-300 hover:bg-stone-50"
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

        {/* 1-Tap Real-World Family Archetype Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className={`text-xs font-black uppercase tracking-wider text-stone-700 ${isUr ? "font-nastaliq" : "font-sans"}`}>
              {isUr ? "حقیقی خاندانی نمونے (1-Tap Templates):" : "Real-World Family Archetypes:"}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              ~99% Cases
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {SCENARIO_PRESETS.map((p, idx) => {
              const isSelected = activePresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => loadPreset(p.id)}
                  className={`px-3 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    isSelected
                      ? "bg-[#1b4332] text-white border-[#1b4332]"
                      : "bg-white text-stone-800 border-stone-300 hover:border-[#1b4332]"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isSelected ? "bg-amber-300 text-stone-900" : "bg-stone-200 text-stone-700"}`}>
                    {idx + 1}
                  </span>
                  <span>{isUr ? p.titleUr : p.titleEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deceased Gender Switcher (Pure High Contrast) */}
        <div className="p-4 rounded-3xl bg-white border-2 border-stone-300 shadow-xs flex flex-wrap gap-3 items-center justify-between">
          <span className="text-sm sm:text-base font-black text-[#0f172a]">
            {isUr ? "مرحوم / مرحومہ کی جنس:" : "Deceased Gender:"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => updateDeceased({ gender: "male" })}
              className={`px-4 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer border-2 ${
                deceased.gender === "male"
                  ? "bg-theme-card-dark text-white border-theme-card-dark shadow-sm"
                  : "bg-stone-100 text-[#0f172a] border-stone-300 hover:bg-stone-200"
              }`}
            >
              <span className={isUr ? "font-nastaliq text-sm leading-[2]" : ""}>
                {isUr ? "مرحوم (مرد)" : "Male (Husband)"}
              </span>
            </button>
            <button
              onClick={() => updateDeceased({ gender: "female" })}
              className={`px-4 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer border-2 ${
                deceased.gender === "female"
                  ? "bg-theme-card-dark text-white border-theme-card-dark shadow-sm"
                  : "bg-stone-100 text-[#0f172a] border-stone-300 hover:bg-stone-200"
              }`}
            >
              <span className={isUr ? "font-nastaliq text-sm leading-[2]" : ""}>
                {isUr ? "مرحومہ (عورت)" : "Female (Wife)"}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Hero Estate Balance Card (Dynamic Heavenly Theme Card) */}
        <div className="p-6 rounded-3xl bg-theme-card-dark text-white shadow-xl space-y-5 border-3 border-theme-card-dark">
          <div className="flex items-center justify-between">
            <span className={`text-sm sm:text-base font-black uppercase tracking-wider text-white ${
              isUr ? "font-nastaliq text-lg" : "font-sans"
            }`}>
              {isUr ? "کل ترکہ کی مالیت" : "Total Estate Value"}
            </span>
            <span className="text-xs sm:text-sm px-3.5 py-1 rounded-full bg-white/10 border-2 border-white/20 text-theme-gold font-black font-sans">
              {currency}
            </span>
          </div>

          {/* Amount Display & Input */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 bg-black/40 p-3.5 rounded-2xl border-2 border-white/20">
              <span className="text-3xl sm:text-4xl font-black text-theme-gold font-sans">
                {currency === "PKR" ? "₨" : "$"}
              </span>
              <input
                type="number"
                value={totalGrossAssets || ""}
                onChange={(e) => handleTotalEstateChange(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full min-w-0 bg-transparent text-3xl sm:text-5xl font-black text-white placeholder-stone-400 outline-hidden font-sans tracking-tight"
              />
            </div>
            <div className={`text-xs sm:text-sm text-white font-medium px-1 ${
              isUr ? "font-nastaliq leading-[2.2]" : "font-sans"
            }`}>
              {isUr
                ? "رقم پر ٹیپ کر کے تبدیل کریں یا نیچے دیے گئے بٹنز دبائیں"
                : "Tap number to edit or tap quick addition chips below"}
            </div>
          </div>

          {/* Quick Addition Chips */}
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
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black border-2 border-white/20 transition-transform active:scale-95 cursor-pointer shadow-xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Quick Smart Valuation Helper Chips */}
          <div className="flex gap-2 pt-2 border-t-2 border-white/10">
            <button
              onClick={() => {
                setHelperTab("real-estate");
                setHelperModalOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Home size={14} className="text-emerald-300" />
              <span>{isUr ? "مکان: زمین و تعمیر تقسیم" : "House Splitter"}</span>
            </button>
            <button
              onClick={() => {
                setHelperTab("gold");
                setHelperModalOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Coins size={14} className="text-amber-300" />
              <span>{isUr ? "سونا و مہر کنورٹر" : "Gold & Mahr"}</span>
            </button>
          </div>

          {/* Debts/Wasiyyah Section */}
          <div className={`pt-3 border-t-2 border-white/20 ${isUr ? "font-nastaliq" : "font-sans"}`}>
            <button
              onClick={() => setShowDebtsAccordion(!showDebtsAccordion)}
              className="w-full flex items-center justify-between text-xs sm:text-sm text-theme-gold font-black hover:text-white cursor-pointer py-1"
            >
              <span>
                {isUr ? "قرضہ جات یا وصیت وضع کریں" : "Deduct Debts & Will"}
              </span>
              {showDebtsAccordion ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {showDebtsAccordion && (
              <div className="pt-3 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-white font-bold">
                    {isUr ? "قرضہ جات (واجب الادا):" : "Outstanding Debts:"}
                  </span>
                  <input
                    type="number"
                    value={debts.unsecuredDebts || ""}
                    onChange={(e) =>
                      updateDebts({ unsecuredDebts: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-36 bg-black/50 border-2 border-white/30 rounded-xl px-3 py-1.5 text-right text-sm font-bold text-white outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-white font-bold">
                    {isUr ? "وصیت (زیادہ سے زیادہ 1/3):" : "Wasiyyah (Max 1/3):"}
                  </span>
                  <input
                    type="number"
                    value={debts.wasiyyahAmount || ""}
                    onChange={(e) =>
                      updateDebts({ wasiyyahAmount: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-36 bg-black/50 border-2 border-white/30 rounded-xl px-3 py-1.5 text-right text-sm font-bold text-white outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Large Tactile Heir Counters */}
        <div className={`space-y-4 ${isUr ? "font-nastaliq" : "font-sans"}`}>
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a]">
              {isUr ? "زندہ وارثین کا اندراج" : "Surviving Heirs Selection"}
            </h2>
            <span className="text-xs sm:text-sm font-black text-theme-brand">
              {isUr ? "+ / − بٹن سے تعداد مقرر کریں" : "Set counts using + / −"}
            </span>
          </div>

          {/* SPOUSE CARD */}
          {deceased.gender === "male" ? (
            /* Wives Counter */
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-base sm:text-xl text-[#0f172a]">
                  <Heart size={22} className="text-rose-600 fill-rose-600 shrink-0" />
                  <span className={isUr ? "font-nastaliq text-2xl" : ""}>
                    {isUr ? "بیوہ / بیویاں" : "Surviving Wives"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                  {isUr ? "زیادہ سے زیادہ ۴ بیویاں" : "Maximum 4 wives"}
                </p>
              </div>

              {/* Large Tactile +/- Pill */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWifeCount(Math.max(0, (heirs.spouseCount || 0) - 1))}
                  disabled={(heirs.spouseCount || 0) === 0}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 disabled:pointer-events-none text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-xs"
                  aria-label="Decrease wives"
                >
                  <Minus size={24} className="stroke-[3.5]" />
                </button>
                <span className="w-8 text-center font-black text-3xl sm:text-4xl text-[#0f172a]">
                  {heirs.spouseCount || 0}
                </span>
                <button
                  onClick={() => setWifeCount(Math.min(4, (heirs.spouseCount || 0) + 1))}
                  disabled={(heirs.spouseCount || 0) === 4}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-theme-card-dark hover:bg-theme-card-dark-hover disabled:opacity-20 disabled:pointer-events-none text-white border-2 border-theme-card-dark flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-md"
                  aria-label="Increase wives"
                >
                  <Plus size={24} className="stroke-[3.5]" />
                </button>
              </div>
            </div>
          ) : (
            /* Husband Toggle */
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-black text-base sm:text-xl text-[#0f172a]">
                  <Heart size={22} className="text-sky-600 fill-sky-600 shrink-0" />
                  <span className={isUr ? "font-nastaliq text-2xl" : ""}>
                    {isUr ? "شوہر (زوج)" : "Surviving Husband"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                  {isUr ? "مرحومہ کا شوہر زندہ ہے؟" : "Is husband alive?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ spouseCount: heirs.spouseCount === 1 ? 0 : 1 })}
                className={`px-6 py-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
                  heirs.spouseCount === 1
                    ? "bg-theme-card-dark text-white border-theme-card-dark shadow-md"
                    : "bg-[#e2e8f0] text-[#0f172a] border-[#94a3b8] hover:bg-[#cbd5e1]"
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
          <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-base sm:text-xl text-[#0f172a]">
                <User size={22} className="text-theme-brand stroke-[3]" />
                <span className={isUr ? "font-nastaliq text-2xl" : ""}>
                  {isUr ? "زندہ بیٹے (ابناء)" : "Living Sons"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                {isUr ? "بیٹے کا حصہ ۲ گنا ہے" : "2:1 residuary ratio"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSonsChange(Math.max(0, (heirs.sonsCount || 0) - 1))}
                disabled={(heirs.sonsCount || 0) === 0}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 disabled:pointer-events-none text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Decrease sons"
              >
                <Minus size={24} className="stroke-[3.5]" />
              </button>
              <span className="w-8 text-center font-black text-3xl sm:text-4xl text-[#0f172a]">
                {heirs.sonsCount || 0}
              </span>
              <button
                onClick={() => handleSonsChange((heirs.sonsCount || 0) + 1)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-theme-card-dark hover:bg-theme-card-dark-hover text-white border-2 border-theme-card-dark flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-md"
                aria-label="Increase sons"
              >
                <Plus size={24} className="stroke-[3.5]" />
              </button>
            </div>
          </div>

          {/* DAUGHTERS CARD */}
          <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-base sm:text-xl text-[#0f172a]">
                <User size={22} className="text-amber-800 stroke-[3]" />
                <span className={isUr ? "font-nastaliq text-2xl" : ""}>
                  {isUr ? "زندہ بیٹیاں (بنات)" : "Living Daughters"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                {isUr ? "فرض مع رد کا حصہ" : "Prescribed share + Radd"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDaughtersChange(Math.max(0, (heirs.daughtersCount || 0) - 1))}
                disabled={(heirs.daughtersCount || 0) === 0}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 disabled:pointer-events-none text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-xs"
                aria-label="Decrease daughters"
              >
                <Minus size={24} className="stroke-[3.5]" />
              </button>
              <span className="w-8 text-center font-black text-3xl sm:text-4xl text-[#0f172a]">
                {heirs.daughtersCount || 0}
              </span>
              <button
                onClick={() => handleDaughtersChange((heirs.daughtersCount || 0) + 1)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-theme-card-dark hover:bg-theme-card-dark-hover text-white border-2 border-theme-card-dark flex items-center justify-center font-black transition-transform active:scale-90 cursor-pointer shadow-md"
                aria-label="Increase daughters"
              >
                <Plus size={24} className="stroke-[3.5]" />
              </button>
            </div>
          </div>

          {/* 5. GRANDCHILDREN & TANZĪL SECTION (قانونِ تنزیل: پوتے، پوتیاں، نواسے، نواسیاں) */}
          <div className="rounded-3xl border-2 border-stone-400 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setShowGrandchildren(!showGrandchildren)}
              className="w-full p-5 bg-stone-100 hover:bg-stone-200 text-[#0f172a] flex items-center justify-between text-left rtl:text-right cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-theme-card-dark text-white flex items-center justify-center shrink-0">
                  <Baby size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg leading-tight">
                    {isUr
                      ? "فوت شدہ اولاد مع پوتے پوتیاں / نواسے نواسیاں (قانونِ تنزیل)"
                      : "Grandchildren of Deceased Children (Tanzīl)"}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-stone-600 mt-0.5">
                    {hasAnyGrandchildren
                      ? isUr
                        ? `کل پوتے پوتیاں/نواسے درج ہیں (${poteCount + potiyanCount + nawaseCount + nawasiyanCount})`
                        : `${poteCount + potiyanCount + nawaseCount + nawasiyanCount} grandchildren recorded`
                      : isUr
                      ? "اگر بیٹا یا بیٹی پہلے فوت ہو چکے ہوں تو کلک کریں"
                      : "Tap to record grandchildren if children predeceased"}
                  </p>
                </div>
              </div>

              {showGrandchildren ? <ChevronUp size={24} className="stroke-[3]" /> : <ChevronDown size={24} className="stroke-[3]" />}
            </button>

            {showGrandchildren && (
              <div className="p-5 space-y-5 border-t-2 border-stone-300 animate-in fade-in duration-200 bg-white">
                {/* Shar'i Rule Alert Banner (High Contrast) */}
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed font-bold ${
                    hasLivingDirectChildren
                      ? "bg-amber-100 border-amber-400 text-amber-950"
                      : "bg-theme-chip border-theme-chip text-theme-chip"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <div>
                      {hasLivingDirectChildren ? (
                        <span>
                          {isUr
                            ? "قاعدہ اقربیت (الأقرب يمنع الأبعد): چونکہ میت کا سگا بیٹا یا بیٹی زندہ ہے، اس لیے شرعاً پوتے، پوتیاں، نواسے اور نواسیاں ترکے سے قطعی محجوب (محروم) رہیں گے۔"
                            : "Golden Proximity Rule: Because a living son/daughter survives, grandchildren are excluded from statutory inheritance under Ja'fari law."}
                        </span>
                      ) : (
                        <span>
                          {isUr
                            ? "قانونِ تنزیل (Tanzīl): چونکہ میت کی کوئی بھی سگی اولاد زندہ نہیں ہے، اس لیے پوتے اور پوتیاں اپنے والد کا (۲ حصے) اور نواسے اور نواسیاں اپنی والدہ کا (۱ حصہ) قائم مقام بن کر وصول کریں گے۔"
                            : "Tanzīl Active: As no direct children survive, grandchildren step into the shoes of their deceased parent and inherit their exact portion."}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-Branch 1: Pote & Potiyan (Children of Deceased Son) */}
                <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-3">
                  <div className="font-black text-sm sm:text-base text-[#0f172a] border-b pb-2 border-stone-200">
                    {isUr ? "۱. فوت شدہ بیٹے کی اولاد (پوتے اور پوتیاں)" : "1. Children of Deceased Son (Pote & Potiyan)"}
                  </div>

                  {/* Pote (Grandsons) */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {isUr ? "پوتے (Grandsons from Son)" : "Pote (Grandsons)"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePoteChange(poteCount - 1)}
                        disabled={poteCount === 0}
                        className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer shadow-xs"
                      >
                        <Minus size={20} className="stroke-[3]" />
                      </button>
                      <span className="w-8 text-center font-black text-2xl text-[#0f172a]">
                        {poteCount}
                      </span>
                      <button
                        onClick={() => handlePoteChange(poteCount + 1)}
                        className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer shadow-sm"
                      >
                        <Plus size={20} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>

                  {/* Potiyan (Granddaughters) */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {isUr ? "پوتیاں (Granddaughters from Son)" : "Potiyan (Granddaughters)"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePotiyanChange(potiyanCount - 1)}
                        disabled={potiyanCount === 0}
                        className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer shadow-xs"
                      >
                        <Minus size={20} className="stroke-[3]" />
                      </button>
                      <span className="w-8 text-center font-black text-2xl text-[#0f172a]">
                        {potiyanCount}
                      </span>
                      <button
                        onClick={() => handlePotiyanChange(potiyanCount + 1)}
                        className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer shadow-sm"
                      >
                        <Plus size={20} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-Branch 2: Nawase & Nawasiyan (Children of Deceased Daughter) */}
                <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-3">
                  <div className="font-black text-sm sm:text-base text-[#0f172a] border-b pb-2 border-stone-200">
                    {isUr ? "۲. فوت شدہ بیٹی کی اولاد (نواسے اور نواسیاں)" : "2. Children of Deceased Daughter (Nawase & Nawasiyan)"}
                  </div>

                  {/* Nawase (Grandsons) */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {isUr ? "نواسے (Grandsons from Daughter)" : "Nawase (Grandsons)"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleNawaseChange(nawaseCount - 1)}
                        disabled={nawaseCount === 0}
                        className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer shadow-xs"
                      >
                        <Minus size={20} className="stroke-[3]" />
                      </button>
                      <span className="w-8 text-center font-black text-2xl text-[#0f172a]">
                        {nawaseCount}
                      </span>
                      <button
                        onClick={() => handleNawaseChange(nawaseCount + 1)}
                        className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer shadow-sm"
                      >
                        <Plus size={20} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>

                  {/* Nawasiyan (Granddaughters) */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {isUr ? "نواسیاں (Granddaughters from Daughter)" : "Nawasiyan (Granddaughters)"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleNawasiyanChange(nawasiyanCount - 1)}
                        disabled={nawasiyanCount === 0}
                        className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] disabled:opacity-20 text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer shadow-xs"
                      >
                        <Minus size={20} className="stroke-[3]" />
                      </button>
                      <span className="w-8 text-center font-black text-2xl text-[#0f172a]">
                        {nawasiyanCount}
                      </span>
                      <button
                        onClick={() => handleNawasiyanChange(nawasiyanCount + 1)}
                        className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer shadow-sm"
                      >
                        <Plus size={20} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. PARENTS CARDS */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Father */}
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-black text-base sm:text-xl text-[#0f172a] ${isUr ? "font-nastaliq text-2xl" : ""}`}>
                  {isUr ? "والد محترم" : "Father"}
                </span>
                <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
                  heirs.fatherAlive
                    ? "bg-theme-card-dark text-white border-theme-card-dark shadow-md"
                    : "bg-[#e2e8f0] text-[#0f172a] border-[#94a3b8] hover:bg-[#cbd5e1]"
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
            <div className="p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className={`font-black text-base sm:text-xl text-[#0f172a] ${isUr ? "font-nastaliq text-2xl" : ""}`}>
                  {isUr ? "والدہ ماجدہ" : "Mother"}
                </span>
                <p className="text-xs sm:text-sm font-bold text-stone-600 mt-1">
                  {isUr ? "حیات ہیں؟" : "Living?"}
                </p>
              </div>

              <button
                onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
                  heirs.motherAlive
                    ? "bg-theme-card-dark text-white border-theme-card-dark shadow-md"
                    : "bg-[#e2e8f0] text-[#0f172a] border-[#94a3b8] hover:bg-[#cbd5e1]"
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

          {/* 7. Collapsible: Tier 2 & Tier 3 Heirs */}
          <div className="pt-2">
            <button
              onClick={() => setShowAdvancedHeirs(!showAdvancedHeirs)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-200 hover:bg-stone-300 text-[#0f172a] text-sm sm:text-base font-black border-2 border-stone-400 transition-colors cursor-pointer"
            >
              <span>
                {isUr
                  ? "مزید رشتہ دار شامل کریں (دادا، دادی، بہن، بھائی، چچا)"
                  : "Add Grandparents, Siblings, or Uncles"}
              </span>
              {showAdvancedHeirs ? <ChevronUp size={22} className="stroke-[3]" /> : <ChevronDown size={22} className="stroke-[3]" />}
            </button>

            {showAdvancedHeirs && (
              <div className="mt-2.5 p-5 rounded-3xl bg-white border-2 border-stone-300 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="text-xs sm:text-sm font-bold leading-relaxed bg-theme-chip text-theme-chip p-3.5 rounded-2xl border-2 border-theme-chip">
                  {isUr
                    ? "اہم شرعی اصول: جب تک طبقۂ اول (اولاد یا والدین یا پوتے پوتیاں) میں سے کوئی بھی ایک فرد موجود ہو، طبقۂ دوم (دادا، دادی، بہن، بھائی) شرعاً مکمل محجوب (محروم) رہتا ہے۔"
                    : "Crucial Sharia Principle: If any Tier 1 heir (child, parent, or grandchild via Tanzil) survives, all Tier 2 relatives are strictly excluded."}
                </div>

                {/* Sibling counters */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm sm:text-base font-black text-[#0f172a]">
                    {isUr ? "حقیقی بھائی (Full Brothers)" : "Full Brothers"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: Math.max(0, (heirs.fullBrothersCount || 0) - 1),
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer"
                    >
                      <Minus size={20} className="stroke-[3]" />
                    </button>
                    <span className="w-6 text-center font-black text-2xl text-[#0f172a]">
                      {heirs.fullBrothersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullBrothersCount: (heirs.fullBrothersCount || 0) + 1,
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer"
                    >
                      <Plus size={20} className="stroke-[3]" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-black text-[#0f172a]">
                    {isUr ? "حقیقی بہنیں (Full Sisters)" : "Full Sisters"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: Math.max(0, (heirs.fullSistersCount || 0) - 1),
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#0f172a] border-2 border-[#94a3b8] flex items-center justify-center font-black cursor-pointer"
                    >
                      <Minus size={20} className="stroke-[3]" />
                    </button>
                    <span className="w-6 text-center font-black text-2xl text-[#0f172a]">
                      {heirs.fullSistersCount || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateHeirs({
                          fullSistersCount: (heirs.fullSistersCount || 0) + 1,
                        })
                      }
                      className="w-12 h-12 rounded-xl bg-theme-card-dark text-white border-2 border-theme-card-dark flex items-center justify-center font-black cursor-pointer"
                    >
                      <Plus size={20} className="stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 8. Sticky Bottom Floating CTA (High Contrast) */}
      <div className={`fixed bottom-0 inset-x-0 z-40 bg-white border-t-3 border-stone-400 p-4 shadow-2xl ${
        isUr ? "font-nastaliq" : "font-sans"
      }`}>
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div className="shrink-0">
            <div className="flex items-center gap-2 text-sm sm:text-base font-black text-theme-brand">
              <span className="w-3.5 h-3.5 rounded-full bg-theme-brand animate-pulse" />
              <span suppressHydrationWarning>{totalPercentage.toFixed(0)}% {isUr ? "تقسیم" : "Distributed"}</span>
            </div>
            <div className="text-sm sm:text-base text-[#0f172a] font-black mt-0.5">
              <span suppressHydrationWarning>{currency} {formatNumber(netEstate)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsResultSheetOpen(true)}
            className="flex-1 py-4 px-6 rounded-2xl bg-theme-card-dark hover:bg-theme-card-dark-hover text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl border-2 border-theme-card-dark transition-transform active:scale-98 cursor-pointer"
          >
            <Sparkles size={22} className="text-theme-gold shrink-0" />
            <span className={isUr ? "font-nastaliq text-lg sm:text-xl leading-none pt-1" : "leading-none"}>
              {isUr ? "حساب کی تفصیل دیکھیں" : "View Breakdown"}
            </span>
          </button>
        </div>
      </div>

      {/* Modals & Drawers */}
      <MobileCornerDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSwitchToDesktopMode={onSwitchToDesktopMode}
      />

      <MobileResultSheet
        isOpen={isResultSheetOpen}
        onClose={() => setIsResultSheetOpen(false)}
      />
      {/* Valuation Helpers Modal */}
      <ValuationHelpersModal
        isOpen={helperModalOpen}
        onClose={() => setHelperModalOpen(false)}
        defaultTab={helperTab}
      />
    </div>
  );
};
