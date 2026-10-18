"use client";

import React, { useState } from "react";
import {
  FileText,
  Gift,
  Scale,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Users,
  Shield,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Building,
  Heart,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";

interface EstatePlanningStudioProps {
  result: any;
  isUr: boolean;
  currency: string;
  heirs: any;
}

export function EstatePlanningStudio({ result, isUr, currency, heirs }: EstatePlanningStudioProps) {
  const {
    assets,
    wasiyyahPercentage,
    setWasiyyahPercentage,
    wasiyyahBeneficiary,
    setWasiyyahBeneficiary,
    lifetimeGiftAmount,
    setLifetimeGiftAmount,
    lifetimeGiftRecipient,
    setLifetimeGiftRecipient,
    openProvenance,
  } = useInheritanceStore();

  const [activeTab, setActiveTab] = useState<"comparison" | "wasiyyah" | "hibah">("comparison");

  // Calculations
  const netBaselineEstate = result.balanceSheet.netDistributableEstate || 0;
  const grossEstate = result.balanceSheet.grossEstate || 0;

  // Scenario B: Waṣiyyah (Will capped at 33.33%)
  const wasiyyahAmount = Math.round(netBaselineEstate * (wasiyyahPercentage / 100));
  const remainingAfterWasiyyah = netBaselineEstate - wasiyyahAmount;
  const wasiyyahMultiplier = netBaselineEstate > 0 ? remainingAfterWasiyyah / netBaselineEstate : 0;

  // Scenario C: Hibat al-Ḥayāt (Lifetime Gift)
  const safeGiftAmount = Math.min(lifetimeGiftAmount, grossEstate);
  const netAfterGift = Math.max(0, netBaselineEstate - safeGiftAmount);
  const giftMultiplier = netBaselineEstate > 0 ? netAfterGift / netBaselineEstate : 0;

  // Beneficiary Options
  const beneficiaryOptions = [
    {
      id: "grandchild",
      labelEn: "Orphaned Grandchildren (Blocked by Proximity)",
      labelUr: "یتیم پوتے / نواسے (جو اقربیت کی وجہ سے محروم ہیں)",
      descEn: "Protects grandchildren whose father/mother predeceased the grandfather.",
      descUr: "ان پوتوں کی کفالت جن کے والد متوفی کی زندگی میں انتقال کر گئے تھے۔",
    },
    {
      id: "spouse",
      labelEn: "Surviving Spouse (Supplementary Security)",
      labelUr: "بیوہ / شریکِ حیات (اضافی مالی تحفظ)",
      descEn: "Augments the Quranic 1/8th or 1/4th share with full discretionary wealth.",
      descUr: "قرآنی آٹھویں یا چوتھائی حصے کے علاوہ اضافی مالی حفاظت فراہم کرنا۔",
    },
    {
      id: "waqf",
      labelEn: "Charitable Endowment (Waqf / Khayrāt Jāriyah)",
      labelUr: "وقف و خیراتِ جاریہ (صدقۂ جاریہ)",
      descEn: "Religious school, orphanage, or perpetual hospital charity endowment.",
      descUr: "دینی درسگاہ، یتیم خانہ یا ہسپتال کے لیے مستقل صدقۂ جاریہ۔",
    },
  ];

  // Gift Asset Presets
  const giftAssetPresets = [
    {
      labelEn: "Residential House / Land",
      labelUr: "رہائشی مکان / زمین",
      amount: assets.residentialLand + assets.buildingsAndFixtures || Math.round(grossEstate * 0.4),
    },
    {
      labelEn: "50% Liquid Cash & Bank",
      labelUr: "۵۰٪ نقد رقم و بینک اکاؤنٹس",
      amount: Math.round((assets.cash + assets.bankAccounts) * 0.5) || Math.round(grossEstate * 0.25),
    },
    {
      labelEn: "Commercial Property",
      labelUr: "تجارتی جائیداد",
      amount: assets.commercialLand || Math.round(grossEstate * 0.3),
    },
  ];

  return (
    <div className="space-y-6" dir={isUr ? "rtl" : "ltr"}>
      {/* Studio Header & Educational Callout */}
      <div className="p-6 rounded-2xl bg-white border border-[#d8e0d2] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#edf3e7] pb-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase text-[#245642] px-3 py-1 rounded-full bg-[#edf3e7] border border-[#a5b69d] shadow-2xs">
                {isUr ? "شرعی منصوبہ بندی برائے ترکہ" : "Strategic Fiqh Architecture"}
              </span>
              <button
                type="button"
                onClick={() => openProvenance("WASAYAH_CEILING")}
                className="text-[12px] font-bold text-[#245642] hover:underline flex items-center gap-1.5 cursor-pointer py-0.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isUr ? "شرعی احکام دیکھیں" : "View Fiqh Citations"}</span>
              </button>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-[#172e22] pt-1 pb-1">
              {isUr ? "حکمتِ ترکہ: وصیت بمقابلہ ہبۂ حیات کا متحرک اسٹوڈیو" : "Estate Planning & 'What-If' Simulation Studio"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-2xl leading-relaxed">
              {isUr
                ? "فقہ امامیہ میں بعد از وفات نافذ ہونے والی 'وصیت' (زیادہ سے زیادہ ۳۳.۳۳٪) اور حیات میں قبضہ دلانے والے 'ہبہ' (غیر محدود) کے مابین تقابلی فرق کو عملی طور پر جانچیں۔"
                : "Explore how Ja‘fari estate planning tools—the strictly capped 1/3rd Post-Mortem Waṣiyyah vs. the uncapped Inter-Vivos Gift (Hibat al-Ḥayāt)—alter heir outcomes in real-time."}
            </p>
          </div>

          {/* Scenario Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#f0f4ec] border border-[#d8e0d2] shrink-0 self-start">
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "comparison"
                  ? "bg-[#245642] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#245642]"
              }`}
            >
              {isUr ? "سہ رخی تقابلی جدول" : "3-Way Diff Matrix"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("wasiyyah")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "wasiyyah"
                  ? "bg-[#245642] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#245642]"
              }`}
            >
              {isUr ? "وصیت (ثلث)" : "1/3rd Waṣiyyah"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hibah")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "hibah"
                  ? "bg-[#245642] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#245642]"
              }`}
            >
              {isUr ? "ہبۂ حیات" : "Lifetime Gift"}
            </button>
          </div>
        </div>

        {/* TOP LEVEL COMPARATIVE STACKED VISUALIZER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#172e22]">
            <span>{isUr ? "ترکے کی تقسیم کا تقابلی گراف:" : "Comparative Net Estate Allocation Breakdown:"}</span>
            <span className="font-mono text-stone-500">
              {netBaselineEstate.toLocaleString()} {currency}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Bar A */}
            <div className="p-3 rounded-xl bg-[#fafbf8] border border-[#d8e0d2] space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-[#245642]">{isUr ? "منظر الف: شریعتِ خالص" : "Scenario A: Pure Sharia"}</span>
                <span className="font-mono text-stone-700">{netBaselineEstate.toLocaleString()}</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#e5ede0] overflow-hidden flex">
                <div className="h-full bg-[#245642] w-full" title="100% Statutory Heirs" />
              </div>
              <span className="text-[10px] text-stone-500 block">
                {isUr ? "۱۰۰٪ ورثائے شرعی میں تقسیم" : "100% to Statutory Quranic Heirs"}
              </span>
            </div>

            {/* Bar B */}
            <div className="p-3 rounded-xl bg-[#fffbeb] border border-[#fde68a] space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-[#78350f]">
                  {isUr ? `منظر ب: وصیت (${wasiyyahPercentage}٪)` : `Scenario B: Waṣiyyah (${wasiyyahPercentage}%)`}
                </span>
                <span className="font-mono text-stone-700">{remainingAfterWasiyyah.toLocaleString()}</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#fef3c7] overflow-hidden flex">
                <div style={{ width: `${wasiyyahPercentage}%` }} className="h-full bg-[#f59e0b]" title="Bequest" />
                <div style={{ width: `${100 - wasiyyahPercentage}%` }} className="h-full bg-[#245642]" title="Heirs" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-stone-600">
                <span>{wasiyyahAmount.toLocaleString()} Will</span>
                <span>{remainingAfterWasiyyah.toLocaleString()} Heirs</span>
              </div>
            </div>

            {/* Bar C */}
            <div className="p-3 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-[#1e3a8a]">
                  {isUr ? "منظر ج: ہبۂ حیات" : `Scenario C: Lifetime Gift`}
                </span>
                <span className="font-mono text-stone-700">{netAfterGift.toLocaleString()}</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#e0f2fe] overflow-hidden flex">
                <div
                  style={{ width: `${netBaselineEstate > 0 ? (safeGiftAmount / netBaselineEstate) * 100 : 0}%` }}
                  className="h-full bg-[#0284c7]"
                  title="Lifetime Gift"
                />
                <div
                  style={{ width: `${netBaselineEstate > 0 ? (netAfterGift / netBaselineEstate) * 100 : 100}%` }}
                  className="h-full bg-[#245642]"
                  title="Remaining Estate"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-stone-600">
                <span>{safeGiftAmount.toLocaleString()} Gifted</span>
                <span>{netAfterGift.toLocaleString()} Post-Mortem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: 3-WAY COMPARATIVE DIFF MATRIX */}
      {activeTab === "comparison" && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#d8e0d2] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#edf3e7] pb-3">
            <h4 className="font-extrabold text-sm sm:text-base text-[#172e22] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#245642]" />
              {isUr
                ? "ورثاء کے حصص کا موازنہ اور نفع و نقصان کا تفصیلی چارٹ"
                : "Side-by-Side Heir Delta-Diff Comparison Matrix"}
            </h4>
            <span className="text-xs text-stone-500 font-medium">
              {isUr ? "تمام رقوم نیٹ ترکے کے مطابق ہیں" : "All monetary values reconciled to net estate"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b-2 border-[#d8e0d2] text-[#245642] font-extrabold uppercase">
                  <th className="py-3 px-3 text-start">{isUr ? "وارث کا نام / رشتہ" : "Heir & Kinship Tier"}</th>
                  <th className="py-3 px-3 text-center">{isUr ? "قرآنی کسر" : "Quranic Share"}</th>
                  <th className="py-3 px-3 text-end bg-[#fafbf8]">
                    {isUr ? "الف: شریعتِ خالص" : "Scenario A (Baseline)"}
                  </th>
                  <th className="py-3 px-3 text-end bg-[#fffbeb]">
                    {isUr ? `ب: وصیت (${wasiyyahPercentage}٪)` : `Scenario B (With Will)`}
                  </th>
                  <th className="py-3 px-3 text-end bg-[#f0f9ff]">
                    {isUr ? "ج: بعد از ہبہ" : "Scenario C (Post-Gift)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf3e7]">
                {/* Statutory Heirs Rows */}
                {result.heirShares.map((heir: any) => {
                  const shareA = Math.round(heir.totalMonetaryShare);
                  const shareB = Math.round(shareA * wasiyyahMultiplier);
                  const shareC = Math.round(shareA * giftMultiplier);

                  const deltaB = shareB - shareA;
                  const deltaC = shareC - shareA;

                  return (
                    <tr key={heir.id} className="hover:bg-[#fafbf8] transition-colors font-medium">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#172e22] text-sm">
                          {isUr ? heir.relationKey : heir.relationKey}
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {heir.count} {isUr ? "فرد" : "person(s)"} • Tier {heir.tier === 0 ? "Spouse" : heir.tier}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono font-bold text-[#245642]">
                        {heir.fractionString}
                      </td>

                      {/* Scenario A */}
                      <td className="py-3.5 px-3 text-end font-mono font-extrabold text-[#172e22] bg-[#fafbf8]">
                        {shareA.toLocaleString()} {currency}
                      </td>

                      {/* Scenario B with Delta */}
                      <td className="py-3.5 px-3 text-end font-mono bg-[#fffbeb]">
                        <div className="font-extrabold text-[#78350f]">
                          {shareB.toLocaleString()} {currency}
                        </div>
                        {deltaB !== 0 && (
                          <span dir="ltr" className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-200 text-stone-700 inline-flex items-center gap-0.5 mt-0.5 whitespace-nowrap">
                            <TrendingDown className="w-2.5 h-2.5" />
                            <span>{deltaB.toLocaleString()}</span>
                          </span>
                        )}
                      </td>

                      {/* Scenario C with Delta */}
                      <td className="py-3.5 px-3 text-end font-mono bg-[#f0f9ff]">
                        <div className="font-extrabold text-[#1e3a8a]">
                          {shareC.toLocaleString()} {currency}
                        </div>
                        {deltaC !== 0 && (
                          <span dir="ltr" className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-200 text-stone-700 inline-flex items-center gap-0.5 mt-0.5 whitespace-nowrap">
                            <TrendingDown className="w-2.5 h-2.5" />
                            <span>{deltaC.toLocaleString()}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* Designated Beneficiary Rows for B & C */}
                <tr className="bg-[#fffbeb] font-bold border-t-2 border-[#fde68a]">
                  <td className="py-3 px-3">
                    <span className="text-xs uppercase font-extrabold text-[#78350f] block">
                      ★ {isUr ? "وصیت وصول کنندہ" : "Waṣiyyah Beneficiary"}
                    </span>
                    <span className="text-[10px] text-stone-600">
                      {beneficiaryOptions.find((b) => b.id === wasiyyahBeneficiary)?.labelEn}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#78350f]">{wasiyyahPercentage}% Max 1/3</td>
                  <td className="py-3 px-3 text-end font-mono text-stone-400">—</td>
                  <td className="py-3 px-3 text-end font-mono font-black text-[#15803d]">
                    <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#14532d] border border-[#86efac] inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#15803d]" />
                      +{wasiyyahAmount.toLocaleString()} {currency}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-end font-mono text-stone-400">—</td>
                </tr>

                <tr className="bg-[#f0f9ff] font-bold border-b-2 border-[#bae6fd]">
                  <td className="py-3 px-3">
                    <span className="text-xs uppercase font-extrabold text-[#1e3a8a] block">
                      ✦ {isUr ? "ہبہ وصول کنندہ (دورانِ حیات)" : "Lifetime Gift Recipient"}
                    </span>
                    <span className="text-[10px] text-stone-600">
                      {isUr ? "مخصوص کردہ فرد (قبضہ مکمل)" : "Designated Individual (Possession Transferred)"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#1e3a8a]">
                    {netBaselineEstate > 0 ? ((safeGiftAmount / netBaselineEstate) * 100).toFixed(1) : 0}% (No Cap)
                  </td>
                  <td className="py-3 px-3 text-end font-mono text-stone-400">—</td>
                  <td className="py-3 px-3 text-end font-mono text-stone-400">—</td>
                  <td className="py-3 px-3 text-end font-mono font-black text-[#15803d]">
                    <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#14532d] border border-[#86efac] inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#15803d]" />
                      +{safeGiftAmount.toLocaleString()} {currency}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: 1/3RD WAṢIYYAH SIMULATOR */}
      {activeTab === "wasiyyah" && (
        <div className="p-6 rounded-2xl bg-[#fffbeb] border-2 border-[#f59e0b] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#fde68a] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fef3c7] border border-[#f59e0b] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#78350f]" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#78350f]">
                  {isUr ? "وصیت کا تفصیلی تخمینہ کار (ثلثِ مال)" : "The 1/3rd Waṣiyyah (Will) Simulation"}
                </h4>
                <p className="text-xs text-[#92400e] font-medium">
                  {isUr
                    ? "وصیت بعد از وفات نافذ ہوتی ہے اور اس کی شرعی حد کل خالص ترکے کا ایک تہائی (۳۳.۳۳٪) ہے۔"
                    : "Post-mortem bequests are enforceable up to 1/3rd of net estate without heir consent."}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-white border border-[#f59e0b] text-[#78350f]">
              {wasiyyahPercentage.toFixed(1)}% / 33.33% Max
            </span>
          </div>

          {/* Interactive Slider & Value Input */}
          <div className="space-y-3 bg-white p-5 rounded-xl border border-[#fde68a]">
            <div className="flex items-center justify-between text-xs font-bold text-[#78350f]">
              <span>{isUr ? "وصیت کا فیصد منتخب کریں (۰٪ تا ۳۳.۳۳٪):" : "Designate Bequest Percentage (0% to 33.33%):"}</span>
              <span className="font-mono text-base font-black text-[#78350f]">
                {wasiyyahAmount.toLocaleString()} {currency}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="33.33"
              step="0.5"
              value={wasiyyahPercentage}
              onChange={(e) => setWasiyyahPercentage(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#fde68a] rounded-lg appearance-none cursor-pointer accent-[#245642]"
            />

            <div className="flex justify-between text-[11px] font-mono text-stone-500">
              <span>0% (No Will)</span>
              <span>16.67% (One Sixth)</span>
              <span className="font-bold text-[#78350f]">33.33% (Divine Ceiling)</span>
            </div>

            {/* Over-Cap Safeguard Alert Banner */}
            {wasiyyahPercentage >= 33.33 && (
              <div className="p-4 rounded-xl bg-[#fff7ed] border border-[#ea580c] text-xs space-y-1 mt-3">
                <div className="flex items-center gap-2 font-bold text-[#9a3412]">
                  <AlertCircle className="w-4 h-4 text-[#ea580c]" />
                  <span>{isUr ? "شرعی انتباہ: ثلث سے زائد وصیت کا بطلان" : "Divine Ceiling Safeguard Active"}</span>
                </div>
                <p className="leading-relaxed text-[#7c2d12] font-medium">
                  {isUr
                    ? "فقہ جعفریہ کی رو سے ایک تہائی (1/3) سے زائد وصیت شرعاً نافذ نہیں ہوگی تاوقتیکہ تمام عاقل و بالغ ورثاء بعد از وفات رضامندی نہ دیں۔"
                    : "Under Ja'fari Law, bequests exceeding 1/3 of the net estate are legally void (Bāṭil) unless all mature heirs unanimously consent after death."}
                </p>
              </div>
            )}
          </div>

          {/* Beneficiary Assignment */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase text-[#78350f] block">
              {isUr ? "وصیت کے حقدار کا انتخاب:" : "Select Waṣiyyah Beneficiary / Strategic Purpose:"}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {beneficiaryOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWasiyyahBeneficiary(opt.id)}
                  className={`p-4 rounded-xl text-start transition-all border ${
                    wasiyyahBeneficiary === opt.id
                      ? "bg-white border-[#245642] shadow-sm ring-2 ring-[#245642]/20"
                      : "bg-[#fffdf7] border-[#fde68a] hover:bg-white"
                  }`}
                >
                  <span className="font-bold text-xs text-[#172e22] block">
                    {isUr ? opt.labelUr : opt.labelEn}
                  </span>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                    {isUr ? opt.descUr : opt.descEn}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIBAT AL-HAYAT (LIFETIME GIFT) SIMULATOR */}
      {activeTab === "hibah" && (
        <div className="p-6 rounded-2xl bg-[#f0f9ff] border-2 border-[#0284c7] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#bae6fd] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border border-[#0284c7] flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-[#0369a1]" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#0c4a6e]">
                  {isUr ? "ہبۂ حیات کا تخمینہ کار (دورانِ حیات منتقلی)" : "Hibat al-Ḥayāt (Inter-Vivos Lifetime Gift)"}
                </h4>
                <p className="text-xs text-[#0369a1] font-medium">
                  {isUr
                    ? "حیات میں قبضہ دلایا جانے والا ہبہ بغیر کسی فیصدی قید (۱۰۰٪ تک) کے مکمل طور پر جائز اور نافذ ہے۔"
                    : "Lifetime gifts with transfer of possession (Qabḍ) carry NO 1/3rd ceiling under Shia Fiqh."}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-white border border-[#0284c7] text-[#0369a1]">
              {isUr ? "کوئی شرعی حد نہیں (۱۰۰٪ جائز)" : "Zero Cap (Up to 100% Permitted)"}
            </span>
          </div>

          {/* Theological Callout Banner */}
          <div className="p-4 rounded-xl bg-white border border-[#bae6fd] text-xs space-y-1.5 shadow-xs">
            <span className="font-bold text-[#0c4a6e] block uppercase">
              {isUr ? "اہم فقہی امتیاز: وصیت بمقابلہ ہبہ" : "Crucial Fiqh Distinction: Will vs. Lifetime Gift"}
            </span>
            <p className="text-stone-700 leading-relaxed font-medium">
              {isUr
                ? "اگر کوئی والد اپنی بیٹیوں یا بیوہ کو کسی دور کے چچا یا وارث کے تنازع سے بچانا چاہتا ہے، تو وہ اپنی زندگی میں جائیداد ان کے نام ہبہ کر کے قانونی قبضہ (قبض) سونپ سکتا ہے۔ یہ عمل فقہ جعفریہ میں بالااتفاق درست ہے اور بعد از وفات کوئی وارث اس پر اعتراض نہیں کر سکتا۔"
                : "While a Will takes effect post-mortem and is strictly capped at 1/3rd, an Inter-Vivos Gift (Hibah) with physical possession (Qabḍ) permanently removes the asset from the future probate estate. This is the primary Shia jurisprudential mechanism to protect daughters and wives from potential disputes."}
            </p>
          </div>

          {/* Gifting Controls & Asset Presets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#0c4a6e]">
              <span>{isUr ? "ہبہ کی جانے والی رقم یا جائیداد کی مالیت:" : "Designate Gift Amount / Valuation:"}</span>
              <span className="font-mono text-base font-black text-[#0c4a6e]">
                {safeGiftAmount.toLocaleString()} {currency}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={grossEstate}
              step={grossEstate > 100000 ? 50000 : 1000}
              value={safeGiftAmount}
              onChange={(e) => setLifetimeGiftAmount(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#bae6fd] rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-bold text-stone-500 self-center">
                {isUr ? "تیز رفتار انتخاب:" : "Quick Asset Presets:"}
              </span>
              {giftAssetPresets.map((pr, i) => (
                <button
                  key={i}
                  onClick={() => setLifetimeGiftAmount(pr.amount)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#bae6fd] hover:bg-[#e0f2fe] text-xs font-medium text-[#0369a1] transition-colors"
                >
                  {isUr ? pr.labelUr : pr.labelEn} ({pr.amount.toLocaleString()} {currency})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
