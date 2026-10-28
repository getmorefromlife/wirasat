"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
import { HeirShareResult, MarjaId } from "@/types/fiqh";
import {
  Scale,
  Coins,
  Users,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Building,
  Printer,
  GitFork,
  Crown,
  Percent,
  Home,
  Sparkles,
} from "lucide-react";
import { ValuationHelpersModal } from "@/components/calculator/ValuationHelpersModal";

export const OnePageDashboard: React.FC = () => {
  const {
    language,
    deceased,
    assets,
    debts,
    heirs,
    updateDeceased,
    updateAssets,
    updateDebts,
    updateHeirs,
    setMarja,
    resetAll,
    loadPreset,
    activePresetId,
    setActiveView,
    getCalculationResult,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const t = TRANSLATIONS[language];
  const marjaList = Object.values(MARJA_DATABASE);
  const marjaInfo = MARJA_DATABASE[deceased.marja];
  const result = getCalculationResult();

  const [showMarjaDropdown, setShowMarjaDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"estate" | "heirs" | "habwah">("estate");
  const [helperModalOpen, setHelperModalOpen] = useState(false);
  const [helperTab, setHelperTab] = useState<"real-estate" | "gold">("real-estate");
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  // Format monetary figures
  const formatAmount = (val: number) => {
    return `${Math.round(val).toLocaleString()} ${deceased.currency}`;
  };

  // Heir title helper
  const getHeirLabel = (h: HeirShareResult) => {
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
    const item = titles[h.relationKey];
    if (item) return isUr ? item.ur : item.en;
    return h.relationKey;
  };

  // Slice palette for distribution flow bar
  const sliceColors = [
    { bg: "bg-theme-card-dark", text: "text-white" },
    { bg: "bg-theme-brand", text: "text-white" },
    { bg: "bg-amber-600", text: "text-white" },
    { bg: "bg-teal-600", text: "text-white" },
    { bg: "bg-indigo-600", text: "text-white" },
    { bg: "bg-emerald-600", text: "text-white" },
    { bg: "bg-sky-600", text: "text-white" },
  ];

  return (
    <div className="space-y-6">
      {/* Top HUD Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4d4be] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Marja & Gender Configuration */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Marja Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMarjaDropdown(!showMarjaDropdown)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-theme-chip hover:bg-theme-chip border border-theme-chip text-xs font-bold text-theme-chip transition-all cursor-pointer shadow-2xs"
            >
              <Scale className="w-4 h-4 text-theme-brand" />
              <span>{isUr ? marjaInfo.nameUr : marjaInfo.nameEn}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {showMarjaDropdown && (
              <div className="absolute top-full start-0 mt-2 w-72 rounded-xl bg-white border border-[#c4d4be] shadow-xl p-2 z-50 space-y-1">
                <span className="text-[10px] font-bold text-[#52735a] uppercase px-2 py-1 block">
                  {isUr ? "مرجع کا انتخاب فرمائیں" : "Select Accredited Marja‘"}
                </span>
                {marjaList.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMarja(m.id as MarjaId);
                      setShowMarjaDropdown(false);
                    }}
                    className={`w-full text-start px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      deceased.marja === m.id
                        ? "bg-theme-card-dark text-white"
                        : "hover:bg-theme-chip text-[#172e22]"
                    }`}
                  >
                    <span>{isUr ? m.nameUr : m.nameEn}</span>
                    {deceased.marja === m.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gender Switcher */}
          <div className="flex items-center bg-[#f7f9f4] rounded-xl p-1 border border-[#e1e6db]">
            <button
              type="button"
              onClick={() => updateDeceased({ gender: "male" })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deceased.gender === "male"
                  ? "bg-theme-card-dark text-white shadow-2xs"
                  : "text-[#627066] hover:text-[#172e22]"
              }`}
            >
              {isUr ? "مرحوم (مرد)" : "Male Deceased"}
            </button>
            <button
              type="button"
              onClick={() => updateDeceased({ gender: "female" })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deceased.gender === "female"
                  ? "bg-theme-card-dark text-white shadow-2xs"
                  : "text-[#627066] hover:text-[#172e22]"
              }`}
            >
              {isUr ? "مرحومہ (عورت)" : "Female Deceased"}
            </button>
          </div>

          {/* Currency Pill */}
          <div className="flex items-center gap-1.5 bg-[#f7f9f4] px-2.5 py-1.5 rounded-xl border border-[#e1e6db]">
            <span className="text-[11px] font-bold text-[#52735a]">{isUr ? "کرنسی:" : "Currency:"}</span>
            <input
              type="text"
              value={deceased.currency}
              onChange={(e) => updateDeceased({ currency: e.target.value.toUpperCase() })}
              className="w-14 bg-white border border-[#c4d4be] rounded-md px-1.5 py-0.5 text-xs font-mono font-bold text-[#172e22] text-center"
              maxLength={5}
            />
          </div>
        </div>

        {/* Right: Unified 8 Family Templates Selector */}
        <div className="flex items-center gap-2 flex-wrap justify-end relative">
          <button
            type="button"
            onClick={() => setShowPresetDropdown(!showPresetDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#c4d4be] hover:border-theme-brand text-xs font-bold text-theme-brand shadow-2xs cursor-pointer transition-colors"
          >
            <Users size={14} className="text-[#1b4332]" />
            <span>
              {activePresetId
                ? (isUr
                    ? SCENARIO_PRESETS.find((p) => p.id === activePresetId)?.titleUr || "منتخب خاکہ"
                    : SCENARIO_PRESETS.find((p) => p.id === activePresetId)?.titleEn || "Active Template")
                : (isUr ? "۸ مستند خاندانی خاکے (Templates)" : "8 Family Archetypes")}
            </span>
            <ChevronDown size={14} className={`text-stone-400 transition-transform ${showPresetDropdown ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {showPresetDropdown && (
            <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 w-80 sm:w-96 max-h-96 overflow-y-auto rounded-2xl bg-white border-2 border-stone-300 shadow-2xl p-2 z-50 space-y-1">
              <div className="p-2 border-b border-stone-200 text-xs font-black text-stone-700 flex justify-between items-center">
                <span>{isUr ? "۸ مستند خاندانی خاکے (آبادیاتی تحقیق):" : "8 Demographic Family Archetypes:"}</span>
                <span className="text-[10px] text-stone-500 font-mono">~99% Cases</span>
              </div>
              {SCENARIO_PRESETS.map((p, idx) => {
                const isSelected = activePresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      loadPreset(p.id);
                      setShowPresetDropdown(false);
                    }}
                    className={`w-full text-start p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col gap-0.5 ${
                      isSelected
                        ? "bg-[#1b4332] text-white shadow-xs"
                        : "hover:bg-stone-100 text-stone-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs">{idx + 1}. {isUr ? p.titleUr : p.titleEn}</span>
                      {isSelected && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                          Active
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] ${isSelected ? "text-emerald-200" : "text-stone-500"}`}>
                      {isUr ? p.descriptionUr : p.descriptionEn}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={resetAll}
            className="p-2 rounded-xl bg-white hover:bg-rose-50 text-[#627066] hover:text-rose-700 border border-[#c4d4be] hover:border-rose-300 transition-all cursor-pointer"
            title={t.btnReset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Cockpit Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            LEFT PANE: Interactive Real-Time Inputs (7 Cols)
            ======================================================== */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-theme-chip p-1.5 rounded-2xl border border-theme-chip">
            <button
              type="button"
              onClick={() => setActiveTab("estate")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "estate"
                  ? "bg-white text-theme-brand shadow-sm border border-theme-chip"
                  : "text-[#52735a] hover:text-theme-brand"
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>{isUr ? "۱. ترکہ و اخراجات" : "1. Estate & Debts"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("heirs")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "heirs"
                  ? "bg-white text-theme-brand shadow-sm border border-theme-chip"
                  : "text-[#52735a] hover:text-theme-brand"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{isUr ? "۲. وارثین و درجات" : "2. Heirs & Family"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("habwah")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "habwah"
                  ? "bg-white text-theme-brand shadow-sm border border-theme-chip"
                  : "text-[#52735a] hover:text-theme-brand"
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{isUr ? "۳. حبوہ و شرائط" : "3. Ḥabwah Rules"}</span>
            </button>
          </div>

          {/* TAB 1: ESTATE & DEBTS INTAKE */}
          {activeTab === "estate" && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#e1e6db] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                    <Coins className="w-5 h-5 text-theme-brand" />
                    <span>{isUr ? "ترکے کے اثاثے اور واجب الادا اخراجات" : "Gross Estate Assets & Obligations"}</span>
                  </h3>
                  <p className="text-xs text-[#52735a] mt-0.5">
                    {isUr
                      ? "خالص ترکہ = کل اثاثے منہا کفن و دفن، قرضہ جات اور وصیت (زیادہ سے زیادہ ایک تہائی)"
                      : "Net Estate = Assets minus Burial, Outstanding Debts, and Wasiyyah (max 1/3)"}
                  </p>
                </div>
              </div>

              {/* Valuation Helpers Toolbar */}
              <div className="p-2.5 rounded-xl bg-[#edf3e7] border border-[#b4caa9] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1b4332] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isUr ? "تخمینہ کاری میں آسانی:" : "Valuation Helpers:"}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setHelperTab("real-estate");
                      setHelperModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 text-xs font-bold text-[#1b4332] border border-[#b4caa9] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Home className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isUr ? "مکان: زمین و تعمیر تقسیم کار" : "House Splitter"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHelperTab("gold");
                      setHelperModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 text-xs font-bold text-amber-800 border border-[#b4caa9] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isUr ? "سونا و مہر کنورٹر" : "Gold & Mahr"}</span>
                  </button>
                </div>
              </div>

              {/* Asset Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-brand mb-1">
                    {isUr ? "نقد رقم (Cash)" : "Cash in Hand"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={assets.cash || ""}
                    onChange={(e) => updateAssets({ cash: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-[#fbfcf8] border border-[#c4d4be] focus:border-theme-brand rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#172e22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-brand mb-1">
                    {isUr ? "بینک اکاؤنٹس (Bank Accounts)" : "Bank Accounts"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={assets.bankAccounts || ""}
                    onChange={(e) => updateAssets({ bankAccounts: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-[#fbfcf8] border border-[#c4d4be] focus:border-theme-brand rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#172e22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-brand mb-1">
                    {isUr ? "رہائشی و تجارتی اراضی (Land)" : "Residential & Commercial Land"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={(assets.residentialLand || 0) + (assets.commercialLand || 0) || ""}
                    onChange={(e) => updateAssets({ residentialLand: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-[#fbfcf8] border border-[#c4d4be] focus:border-theme-brand rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#172e22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-brand mb-1">
                    {isUr ? "عمارت، مکان و تعمیرات (Buildings)" : "Buildings & Fixtures"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={assets.buildingsAndFixtures || ""}
                    onChange={(e) => updateAssets({ buildingsAndFixtures: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-[#fbfcf8] border border-[#c4d4be] focus:border-theme-brand rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#172e22]"
                  />
                </div>
              </div>

              {/* Deductions Header */}
              <div className="pt-2 border-t border-[#e1e6db]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b45309] block mb-3">
                  {isUr ? "واجب الادا اخراجات (Deductions Before Inheritance)" : "Obligations Cleared Before Inheritance"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#627066] mb-1">
                      {isUr ? "کفن و تدفین (Tajhīz)" : "Funeral & Burial"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={debts.funeralExpenses || ""}
                      onChange={(e) => updateDebts({ funeralExpenses: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full bg-[#fbfcf8] border border-[#c4d4be] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#172e22]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#627066] mb-1">
                      {isUr ? "قرضہ جات (Duyūn)" : "Outstanding Debts"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={debts.unsecuredDebts || ""}
                      onChange={(e) => updateDebts({ unsecuredDebts: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full bg-[#fbfcf8] border border-[#c4d4be] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#172e22]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#627066] mb-1">
                      {isUr ? "وصیت (Wasiyyah - Max 1/3)" : "Valid Wasiyyah (Max 1/3)"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={debts.wasiyyahAmount || ""}
                      onChange={(e) => updateDebts({ wasiyyahAmount: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full bg-[#fbfcf8] border border-[#c4d4be] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#172e22]"
                    />
                  </div>
                </div>
              </div>

              {/* Real-Time Net Calculation Summary Callout */}
              <div className="p-3.5 rounded-xl bg-theme-chip border border-theme-chip flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-theme-chip uppercase block">
                    {isUr ? "خالص قابلِ تقسیم ترکہ:" : "Net Estate Distributable:"}
                  </span>
                  <span className="font-mono text-lg font-black text-theme-chip">
                    {formatAmount(result.balanceSheet.netDistributableEstate)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("heirs")}
                  className="px-3 py-1.5 rounded-lg bg-theme-card-dark hover:bg-theme-card-dark-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {isUr ? "وارثین شامل کریں ←" : "Configure Heirs →"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HEIRS & FAMILY STRUCTURE */}
          {activeTab === "heirs" && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#e1e6db] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                    <Users className="w-5 h-5 text-theme-brand" />
                    <span>{isUr ? "طبقۂ اول: والدین، شریکِ حیات اور اولاد" : "Tier 1: Parents, Spouse & Direct Children"}</span>
                  </h3>
                  <p className="text-xs text-[#52735a] mt-0.5">
                    {isUr
                      ? "جعفری فقہ میں طبقۂ اول کی موجودگی دیگر تمام ثانوی درجات (بہن بھائی، چچا) کو حجب کر دیتی ہے۔"
                      : "Under Ja‘farī law, any heir in Tier 1 completely excludes secondary tiers (Hajb al-Hirmān)."}
                  </p>
                </div>
              </div>

              {/* Spouse Counter */}
              <div className="p-3.5 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-[#172e22] block">
                    {deceased.gender === "male"
                      ? isUr ? "بیوہ / بیوائیں (Wives)" : "Surviving Wife / Wives"
                      : isUr ? "شوہر (Husband)" : "Surviving Husband"}
                  </span>
                  <span className="text-xs text-[#52735a]">
                    {deceased.gender === "male"
                      ? isUr ? "اولاد کی موجودگی میں 1/8، ورنہ 1/4 (مساوی تقسیم بالسویہ)" : "1/8 if children exist, 1/4 otherwise"
                      : isUr ? "اولاد کی موجودگی میں 1/4، ورنہ 1/2" : "1/4 if children exist, 1/2 otherwise"}
                  </span>
                </div>

                {deceased.gender === "male" ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateHeirs({ spouseCount: Math.max(0, heirs.spouseCount - 1) })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-base text-[#172e22]">
                      {heirs.spouseCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateHeirs({ spouseCount: Math.min(4, heirs.spouseCount + 1) })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateHeirs({ spouseCount: heirs.spouseCount > 0 ? 0 : 1 })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      heirs.spouseCount > 0
                        ? "bg-theme-card-dark text-white border-theme-card-dark"
                        : "bg-white text-stone-700 border-[#c4d4be] hover:bg-stone-50"
                    }`}
                  >
                    {heirs.spouseCount > 0 ? (isUr ? "حیات ہیں (1)" : "Alive (1)") : (isUr ? "وفات پا چکے (0)" : "Deceased (0)")}
                  </button>
                )}
              </div>

              {/* Children Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sons */}
                <div className="p-3.5 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#172e22] block">
                      {isUr ? "بیٹے (Sons)" : "Sons"}
                    </span>
                    <span className="text-[11px] text-[#52735a]">
                      {isUr ? "عصبہ بالغیر (2 حصے)" : "2:1 ratio with daughters"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateHeirs({ sonsCount: Math.max(0, heirs.sonsCount - 1) })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-base text-[#172e22]">
                      {heirs.sonsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateHeirs({ sonsCount: heirs.sonsCount + 1 })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Daughters */}
                <div className="p-3.5 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#172e22] block">
                      {isUr ? "بیٹیاں (Daughters)" : "Daughters"}
                    </span>
                    <span className="text-[11px] text-[#52735a]">
                      {isUr ? "تنہا 1/2، دو یا زائد 2/3" : "1/2 if single, 2/3 if multiple"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateHeirs({ daughtersCount: Math.max(0, heirs.daughtersCount - 1) })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-base text-[#172e22]">
                      {heirs.daughtersCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateHeirs({ daughtersCount: heirs.daughtersCount + 1 })}
                      className="w-8 h-8 rounded-lg bg-white border border-[#c4d4be] flex items-center justify-center font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Parents Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Father */}
                <div className="p-3.5 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#172e22] block">
                      {isUr ? "والد محترم (Father)" : "Father"}
                    </span>
                    <span className="text-[11px] text-[#52735a]">
                      {isUr ? "اولاد کے ساتھ 1/6" : "1/6 Quranic Fard with children"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateHeirs({ fatherAlive: !heirs.fatherAlive })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      heirs.fatherAlive
                        ? "bg-theme-card-dark text-white border-theme-card-dark"
                        : "bg-white text-stone-700 border-[#c4d4be] hover:bg-stone-50"
                    }`}
                  >
                    {heirs.fatherAlive ? (isUr ? "حیات ہیں" : "Alive") : (isUr ? "وفات پا چکے" : "Deceased")}
                  </button>
                </div>

                {/* Mother */}
                <div className="p-3.5 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#172e22] block">
                      {isUr ? "والدہ ماجدہ (Mother)" : "Mother"}
                    </span>
                    <span className="text-[11px] text-[#52735a]">
                      {isUr ? "اولاد/بھائیوں کے ساتھ 1/6، ورنہ 1/3" : "1/6 with children/brothers, 1/3 otherwise"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateHeirs({ motherAlive: !heirs.motherAlive })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      heirs.motherAlive
                        ? "bg-theme-card-dark text-white border-theme-card-dark"
                        : "bg-white text-stone-700 border-[#c4d4be] hover:bg-stone-50"
                    }`}
                  >
                    {heirs.motherAlive ? (isUr ? "حیات ہیں" : "Alive") : (isUr ? "وفات پا چکے" : "Deceased")}
                  </button>
                </div>
              </div>

              {/* Exclusion Alert if Tier 1 is Active */}
              {(heirs.sonsCount > 0 || heirs.daughtersCount > 0 || heirs.fatherAlive || heirs.motherAlive) && (
                <div className="p-3 rounded-xl bg-theme-chip border border-theme-chip text-xs text-theme-chip flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-theme-brand shrink-0" />
                  <span>
                    {isUr
                      ? "قاعدۂ حجبِ حرمان: طبقۂ اول کا وارث موجود ہے، لہٰذا طبقہ دوم (بہن بھائی، نانا نانی) مکمل طور پر محجوب ہیں۔"
                      : "Principle of Hajb al-Hirmān: Tier 1 heirs completely exclude Tier 2 collaterals from inheritance."}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HABWAH & IMPEDIMENTS */}
          {activeTab === "habwah" && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#e1e6db] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#172e22] flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#b45309]" />
                    <span>{isUr ? "احکامِ حبوہ (الولد الأكبر) اور موانعِ ارث" : "Ḥabwah Privilege & Impediments to Inheritance"}</span>
                  </h3>
                  <p className="text-xs text-[#52735a] mt-0.5">
                    {isUr
                      ? "والد کی ۴ مخصوص اشیاء (قرآن، انگوٹھی، تلوار، ملبوسات) بڑے بیٹے کے لیے بلا معاوضہ مخصوص ہیں۔"
                      : "Eldest son receives 4 designated items of the father (Quran, ring, sword, clothes) without deduction."}
                  </p>
                </div>
              </div>

              {/* Habwah Status */}
              <div className="p-4 rounded-xl bg-[#fffdfa] border border-[#f59e0b]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#b45309]" />
                    <span className="font-bold text-sm text-[#172e22]">
                      {isUr ? "حقِ حبوہ کا استحقاق:" : "Ḥabwah Award Status:"}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    result.habwahAwarded.awarded
                      ? "bg-amber-100 text-[#b45309] border border-amber-300"
                      : "bg-stone-100 text-stone-600 border border-stone-200"
                  }`}>
                    {result.habwahAwarded.awarded ? (isUr ? "مستحق ہیں" : "Eligible") : (isUr ? "کوئی مستحق نہیں" : "Not Applicable")}
                  </span>
                </div>
                <p className="text-xs text-[#78350f] leading-relaxed">
                  {result.habwahAwarded.reason}
                </p>
              </div>

              {/* Legal Notes on Land Inheritance */}
              <div className="p-4 rounded-xl bg-[#f7f9f4] border border-[#c4d4be] space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-theme-brand" />
                  <span className="font-bold text-xs uppercase tracking-wider text-theme-brand">
                    {isUr ? "احکامِ زمین و عمارت برائے بیوہ:" : "Widow's Land & Building Rules:"}
                  </span>
                </div>
                <p className="text-xs text-[#52735a] leading-relaxed font-nastaliq leading-[2.2]">
                  {isUr
                    ? `${marjaInfo.nameUr} کے مطابق: ${marjaInfo.widowInheritsLandValue ? "بیوہ زمین کی قیمت سے حصہ پاتی ہے۔" : "بیوہ صرف عمارت اور درختوں کی قیمت سے حصہ پاتی ہے، اصل اراضی سے نہیں۔"}`
                    : `According to ${marjaInfo.nameEn}: ${marjaInfo.widowInheritsLandValue ? "Widow inherits from the value of land." : "Widow inherits only from buildings/trees value, not the land corpus."}`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT PANE: Real-Time Quranic Analytics (5 Cols, Sticky)
            ======================================================== */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
          {/* Main Net Distributable Estate Header Card */}
          <div className="p-5 rounded-2xl bg-theme-card-dark text-white border-2 border-theme-card-dark shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-theme-gold">
                {isUr ? "خالص قابلِ تقسیم ترکہ" : "Net Distributable Estate"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold font-mono">
                {result.heirShares.length} {isUr ? "وارثین" : "Heirs"}
              </span>
            </div>

            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                {formatAmount(result.balanceSheet.netDistributableEstate)}
              </span>
            </div>

            {/* Visual Share Proportion Flow Bar */}
            <div className="pt-2 border-t border-white/20 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-200">
                <span>{isUr ? "حصص کا تناسب:" : "Share Proportion:"}</span>
                <span className="text-theme-gold">{isUr ? "۱۰۰٪ قرآنی تقسیم" : "100% Divine Allocation"}</span>
              </div>
              <div className="w-full h-4 rounded-lg bg-black/30 overflow-hidden flex shadow-inner border border-white/10">
                {result.heirShares.map((h, idx) => {
                  const color = sliceColors[idx % sliceColors.length];
                  const widthPct = Math.max(h.percentage, 4);
                  return (
                    <div
                      key={h.id}
                      style={{ width: `${widthPct}%` }}
                      className={`${color.bg} h-full transition-all flex items-center justify-center text-white font-bold text-[9px] overflow-hidden px-0.5 border-r border-white/20`}
                      title={`${getHeirLabel(h)}: ${h.percentage.toFixed(1)}%`}
                    >
                      {h.percentage >= 10 ? `${Math.round(h.percentage)}%` : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Itemized Live Quranic Payouts Table */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4d4be] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#e1e6db] pb-2.5">
              <span className="text-xs font-bold text-[#172e22] flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-theme-brand" />
                <span>{isUr ? "شرعی و مالی تقسیمِ حصص" : "Itemized Quranic Allocations"}</span>
              </span>
              <span className="text-[11px] text-[#52735a] font-mono font-bold">
                {deceased.currency}
              </span>
            </div>

            {result.heirShares.length === 0 ? (
              <div className="text-center py-6 text-stone-500 text-xs">
                {isUr ? "برائے مہربانی بائیں جانب وارثین درج فرمائیں۔" : "Please configure heirs on the left to see allocations."}
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pe-1">
                {result.heirShares.map((h, idx) => {
                  const color = sliceColors[idx % sliceColors.length];
                  return (
                    <div
                      key={h.id}
                      className="p-3 rounded-xl bg-[#f7f9f4] border border-[#e1e6db] hover:border-theme-brand transition-all flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-3 h-3 rounded-full ${color.bg} shrink-0`} />
                        <div className="min-w-0">
                          <span className="font-bold text-xs sm:text-sm text-[#172e22] block truncate">
                            {getHeirLabel(h)}
                            {h.count > 1 && ` (×${h.count})`}
                          </span>
                          <span className="text-[11px] font-bold text-[#52735a] block font-mono">
                            {h.fractionString} • {h.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="text-end shrink-0">
                        <span className="font-mono font-black text-xs sm:text-sm text-theme-brand block">
                          {formatAmount(h.totalMonetaryShare)}
                        </span>
                        {h.count > 1 && (
                          <span className="text-[10px] text-stone-500 block">
                            {isUr ? "فی وارث:" : "Each:"} {formatAmount(h.sharePerIndividual)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveView("tree")}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-theme-chip border border-theme-chip text-xs font-bold text-theme-brand transition-all shadow-2xs cursor-pointer"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>{isUr ? "شجرۂ نسب دیکھیں" : "Family Tree"}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-bold text-white transition-all shadow-sm cursor-pointer"
              title={isUr ? "باقاعدہ خاندانی صلح نامہ و ورقۂ حساب پرنٹ کریں" : "Print Formal Estate Worksheet & Settlement Draft"}
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>{isUr ? "ورقۂ صلح نامہ (PDF)" : "Print Settlement (PDF)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Valuation Helpers Modal */}
      <ValuationHelpersModal
        isOpen={helperModalOpen}
        onClose={() => setHelperModalOpen(false)}
        defaultTab={helperTab}
      />
    </div>
  );
};
