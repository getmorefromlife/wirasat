"use client";

import React, { useState, useMemo } from "react";
import {
  PieChart as PieIcon,
  Scale,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Layers,
  Users,
  Compass,
  Calculator,
  Info,
  ChevronRight,
  Split,
  Sliders,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";

/* =========================================================================
   6 QURANIC MASTER FRACTIONS DATA
   ========================================================================= */

interface QuranicFraction {
  fraction: string;
  nameEn: string;
  nameUr: string;
  arabicName: string;
  percent: string;
  slicesOf24: number;
  color: string;
  heirsEn: string[];
  heirsUr: string[];
  quranVerse: string;
  quranRef: string;
}

const QURANIC_FRACTIONS: QuranicFraction[] = [
  {
    fraction: "1/2",
    nameEn: "One-Half",
    nameUr: "نصف (آدھا)",
    arabicName: "النِّصْف",
    percent: "50.0%",
    slicesOf24: 12,
    color: "from-emerald-500 to-teal-600",
    heirsEn: [
      "Sole Daughter (with no sons or siblings)",
      "Husband (when deceased leaves no children)",
      "Single Full Sister (in Class II with no brothers)",
    ],
    heirsUr: [
      "اکلوتی بیٹی (جب کوئی بیٹا نہ ہو)",
      "شوہر (جب متوفیہ کی کوئی اولاد نہ ہو)",
      "تنہا سگی بہن (جب کوئی بھائی نہ ہو)",
    ],
    quranVerse: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ",
    quranRef: "Surah An-Nisa (4:12)",
  },
  {
    fraction: "1/4",
    nameEn: "One-Fourth",
    nameUr: "ربع (چوتھائی)",
    arabicName: "الرُّبُع",
    percent: "25.0%",
    slicesOf24: 6,
    color: "from-blue-500 to-indigo-600",
    heirsEn: [
      "Husband (when deceased has surviving children)",
      "Wife or Wives (when deceased has no children)",
    ],
    heirsUr: [
      "شوہر (جب متوفیہ کی اولاد موجود ہو)",
      "بیوہ یا بیوائیں (جب متوفی کی اولاد نہ ہو)",
    ],
    quranVerse: "فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ",
    quranRef: "Surah An-Nisa (4:12)",
  },
  {
    fraction: "1/8",
    nameEn: "One-Eighth",
    nameUr: "ثمن (آٹھواں حصہ)",
    arabicName: "الثُّمُن",
    percent: "12.5%",
    slicesOf24: 3,
    color: "from-sky-500 to-cyan-600",
    heirsEn: [
      "Wife or Multiple Wives (when deceased has surviving children)",
    ],
    heirsUr: [
      "بیوہ یا بیوائیں (جب متوفی کی اولاد حیات ہو)",
    ],
    quranVerse: "فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم",
    quranRef: "Surah An-Nisa (4:12)",
  },
  {
    fraction: "2/3",
    nameEn: "Two-Thirds",
    nameUr: "ثلثان (دو تہائی)",
    arabicName: "الثُّلُثَان",
    percent: "66.7%",
    slicesOf24: 16,
    color: "from-purple-500 to-violet-600",
    heirsEn: [
      "Two or More Daughters (when there are no sons)",
      "Two or More Full Sisters (in Class II with no brothers)",
    ],
    heirsUr: [
      "دو یا دو سے زیادہ بیٹیاں (جب کوئی بیٹا نہ ہو)",
      "دو یا دو سے زیادہ سگی بہنیں (طبقہ دوم)",
    ],
    quranVerse: "فَإِن كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ",
    quranRef: "Surah An-Nisa (4:176)",
  },
  {
    fraction: "1/3",
    nameEn: "One-Third",
    nameUr: "ثلث (تہائی)",
    arabicName: "الثُّلُث",
    percent: "33.3%",
    slicesOf24: 8,
    color: "from-amber-500 to-orange-600",
    heirsEn: [
      "Mother (when deceased has no children & no blocking brothers)",
      "Two or More Maternal Siblings (Akhyafi)",
    ],
    heirsUr: [
      "والدہ (جب اولاد اور حاجب بھائی نہ ہوں)",
      "دو یا دو سے زائد مادری (اخیافی) بہن بھائی",
    ],
    quranVerse: "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ",
    quranRef: "Surah An-Nisa (4:11)",
  },
  {
    fraction: "1/6",
    nameEn: "One-Sixth",
    nameUr: "سدس (چھٹا حصہ)",
    arabicName: "السُّدُس",
    percent: "16.7%",
    slicesOf24: 4,
    color: "from-rose-500 to-pink-600",
    heirsEn: [
      "Father (when deceased has surviving children)",
      "Mother (when deceased has children or blocking brothers)",
      "Single Maternal Sibling (Akhyafi)",
    ],
    heirsUr: [
      "والد (جب متوفی کی اولاد موجود ہو)",
      "والدہ (جب اولاد یا حاجب بھائی موجود ہوں)",
      "ایک مادری (اخیافی) بہن یا بھائی",
    ],
    quranVerse: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ",
    quranRef: "Surah An-Nisa (4:11)",
  },
];

/* =========================================================================
   SVG PIE CHART UTILITY (Dynamic Wedge Generator)
   ========================================================================= */

interface PieWedge {
  label: string;
  slices: number;
  fraction: string;
  percentage: number;
  color: string;
  heirRole: string;
}

function renderSvgPieWedges(wedges: PieWedge[], totalSlices: number) {
  let accumulatedAngle = 0;
  const radius = 90;
  const cx = 110;
  const cy = 110;

  return wedges.map((wedge, idx) => {
    const angle = (wedge.slices / totalSlices) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle = endAngle;

    // Convert degrees to radians
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData =
      angle >= 359.99
        ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.001} ${cy - radius} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    return (
      <path
        key={idx}
        d={pathData}
        fill={wedge.color}
        stroke="#ffffff"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:opacity-90 hover:scale-[1.02] origin-center cursor-pointer"
      >
        <title>{`${wedge.label}: ${wedge.slices} of ${totalSlices} Slices (${wedge.percentage.toFixed(1)}%)`}</title>
      </path>
    );
  });
}

/* =========================================================================
   MAIN COMPONENT: VISUAL MATH STUDIO
   ========================================================================= */

export function VisualMathStudio() {
  const { language, setActiveView } = useInheritanceStore();
  const isUr = language === "ur";

  // Active Tab
  const [activeTab, setActiveTab] = useState<"sandbox" | "fractions" | "scale">("sandbox");

  // Selected Quranic Fraction Card
  const [selectedFraction, setSelectedFraction] = useState<QuranicFraction>(QURANIC_FRACTIONS[2]); // Default 1/8

  // Interactive Live Slicer Sandbox State
  const [spouseType, setSpouseType] = useState<"wife" | "none" | "husband">("wife");
  const [parentsOption, setParentsOption] = useState<"none" | "both" | "father" | "mother">("none");
  const [sonsCount, setSonsCount] = useState<number>(2);
  const [daughtersCount, setDaughtersCount] = useState<number>(2);

  // Derive Sandbox Calculation & Total Slices
  const sandboxMath = useMemo(() => {
    // Has children?
    const hasKids = sonsCount > 0 || daughtersCount > 0;
    const childShares = sonsCount * 2 + daughtersCount;

    let baseDenominator = 1;
    let spouseNumerator = 0;
    let spouseDenominator = 1;
    let fatherNumerator = 0;
    let fatherDenominator = 1;
    let motherNumerator = 0;
    let motherDenominator = 1;

    // 1. Fixed Spousal Share
    if (spouseType === "wife") {
      spouseNumerator = 1;
      spouseDenominator = hasKids ? 8 : 4;
    } else if (spouseType === "husband") {
      spouseNumerator = 1;
      spouseDenominator = hasKids ? 4 : 2;
    }

    // 2. Fixed Parents Share
    if (parentsOption === "both" || parentsOption === "father") {
      fatherNumerator = 1;
      fatherDenominator = 6;
    }
    if (parentsOption === "both" || parentsOption === "mother") {
      motherNumerator = 1;
      motherDenominator = 6;
    }

    // Compute Base Denominator for fixed shares
    if (spouseType === "wife" && (parentsOption === "both" || parentsOption === "father" || parentsOption === "mother")) {
      baseDenominator = 24;
    } else if (spouseType === "husband" && (parentsOption === "both" || parentsOption === "father" || parentsOption === "mother")) {
      baseDenominator = 12;
    } else if (spouseType === "wife") {
      baseDenominator = hasKids ? 8 : 4;
    } else if (spouseType === "husband") {
      baseDenominator = hasKids ? 4 : 2;
    } else if (parentsOption === "both" || parentsOption === "father" || parentsOption === "mother") {
      baseDenominator = 6;
    } else {
      baseDenominator = 1;
    }

    // Fixed parts used out of baseDenominator
    const spouseBaseParts = (baseDenominator / spouseDenominator) * spouseNumerator;
    const fatherBaseParts = (fatherDenominator > 1 ? (baseDenominator / fatherDenominator) * fatherNumerator : 0);
    const motherBaseParts = (motherDenominator > 1 ? (baseDenominator / motherDenominator) * motherNumerator : 0);
    const totalFixedBaseParts = spouseBaseParts + fatherBaseParts + motherBaseParts;
    const remainingBaseParts = Math.max(0, baseDenominator - totalFixedBaseParts);

    // Multiplier for children (The "Why 48?" secret!)
    // If remainingBaseParts does not divide cleanly by childShares, multiply by childShares!
    let multiplier = 1;
    if (childShares > 0 && remainingBaseParts > 0) {
      if (remainingBaseParts % childShares !== 0) {
        multiplier = childShares;
      }
    }

    const totalSlices = baseDenominator * multiplier;

    // Slices allocations
    const spouseSlices = (totalSlices / spouseDenominator) * spouseNumerator;
    const fatherSlices = fatherDenominator > 1 ? (totalSlices / fatherDenominator) * fatherNumerator : 0;
    const motherSlices = motherDenominator > 1 ? (totalSlices / motherDenominator) * motherNumerator : 0;
    const remainingSlices = totalSlices - (spouseSlices + fatherSlices + motherSlices);

    const slicesPerChildUnit = childShares > 0 ? remainingSlices / childShares : 0;
    const perSonSlices = Math.round(slicesPerChildUnit * 2);
    const perDaughterSlices = Math.round(slicesPerChildUnit * 1);
    const allSonsSlices = perSonSlices * sonsCount;
    const allDaughtersSlices = perDaughterSlices * daughtersCount;

    // Build Wedges for SVG Pie
    const wedges: PieWedge[] = [];

    if (spouseSlices > 0) {
      wedges.push({
        label: spouseType === "wife" ? (isUr ? "بیوہ" : "Wife") : (isUr ? "شوہر" : "Husband"),
        slices: spouseSlices,
        fraction: `${spouseNumerator}/${spouseDenominator}`,
        percentage: (spouseSlices / totalSlices) * 100,
        color: "#0284c7", // Sky blue
        heirRole: "SPOUSE",
      });
    }

    if (fatherSlices > 0) {
      wedges.push({
        label: isUr ? "والد" : "Father",
        slices: fatherSlices,
        fraction: "1/6",
        percentage: (fatherSlices / totalSlices) * 100,
        color: "#059669", // Emerald
        heirRole: "FATHER",
      });
    }

    if (motherSlices > 0) {
      wedges.push({
        label: isUr ? "والدہ" : "Mother",
        slices: motherSlices,
        fraction: "1/6",
        percentage: (motherSlices / totalSlices) * 100,
        color: "#10b981", // Light emerald
        heirRole: "MOTHER",
      });
    }

    if (sonsCount > 0 && allSonsSlices > 0) {
      for (let i = 0; i < sonsCount; i++) {
        wedges.push({
          label: `${isUr ? "بیٹا" : "Son"} ${i + 1}`,
          slices: perSonSlices,
          fraction: `${perSonSlices}/${totalSlices}`,
          percentage: (perSonSlices / totalSlices) * 100,
          color: ["#7c3aed", "#8b5cf6", "#6d28d9"][i % 3], // Violet hues
          heirRole: "SON",
        });
      }
    }

    if (daughtersCount > 0 && allDaughtersSlices > 0) {
      for (let i = 0; i < daughtersCount; i++) {
        wedges.push({
          label: `${isUr ? "بیٹی" : "Daughter"} ${i + 1}`,
          slices: perDaughterSlices,
          fraction: `${perDaughterSlices}/${totalSlices}`,
          percentage: (perDaughterSlices / totalSlices) * 100,
          color: ["#d97706", "#f59e0b", "#b45309"][i % 3], // Amber hues
          heirRole: "DAUGHTER",
        });
      }
    }

    return {
      baseDenominator,
      multiplier,
      childShares,
      totalSlices,
      spouseSlices,
      fatherSlices,
      motherSlices,
      perSonSlices,
      perDaughterSlices,
      allSonsSlices,
      allDaughtersSlices,
      wedges,
    };
  }, [spouseType, parentsOption, sonsCount, daughtersCount, isUr]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B1713] text-stone-800 dark:text-stone-100 transition-colors select-none py-6 px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* -------------------------------------------------------------------
          HERO BANNER: VISUAL MATH OF ISLAMIC INHERITANCE
          ------------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16382a] via-[#245642] to-[#122b20] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-xs">
                {isUr ? "بنیادی آغاز (Start Here)" : "Foundational Masterclass"}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 border border-emerald-500/30">
                {isUr ? "عِلمُ الحِسابِ وَالفرائض" : "Visual Math of Fara'id"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {isUr
                ? "وراثت کی بصری ریاضی اور کسروں کی حقیقت"
                : "The Visual Mathematics of Islamic Inheritance"}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
              {isUr
                ? "سمجھیں کہ قرآنی کسریں کیسی ہیں، ترکہ کُل ۴۸ یا ۷۲ حصوں میں کیوں تقسیم ہوتا ہے، اور ۲:۱ کا تناسب بغیر کسی اعشاریہ یا کسر کے مکمل عدل کیسے قائم کرتا ہے۔"
                : "Demystifying the 6 Quranic fractions, the 2:1 child ratio, and the secret of why an estate expands into 48 or 72 clean slices with zero crumbs or decimals."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setActiveView("whiteboard")}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-[#245642] hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Compass size={16} />
              <span>{isUr ? "کنبہ وائٹ بورڈ کھولیں" : "Open Kinship Whiteboard"}</span>
            </button>
            <button
              onClick={() => setActiveView("wizard")}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/40 transition-all cursor-pointer"
            >
              <Calculator size={16} />
              <span>{isUr ? "اصل کیلکولیٹر" : "Main Calculator"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          MASTERCLASS NAVIGATION TABS
          ------------------------------------------------------------------- */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-xs">
        <button
          onClick={() => setActiveTab("sandbox")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "sandbox"
              ? "bg-[#245642] text-white shadow-sm"
              : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          }`}
        >
          <PieIcon size={16} className={activeTab === "sandbox" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۱۔ لائیو کسروں کا لیب (Pizza Slicer)" : "1. Interactive Slices Lab"}</span>
        </button>

        <button
          onClick={() => setActiveTab("fractions")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "fractions"
              ? "bg-[#245642] text-white shadow-sm"
              : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          }`}
        >
          <Layers size={16} className={activeTab === "fractions" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۲۔ چھ قرآنی بنیادیں (Hexagon)" : "2. The 6 Quranic Fractions"}</span>
        </button>

        <button
          onClick={() => setActiveTab("scale")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "scale"
              ? "bg-[#245642] text-white shadow-sm"
              : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          }`}
        >
          <Scale size={16} className={activeTab === "scale" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۳۔ ۲:۱ کا تناسب اور میزانِ عدل" : "3. The 2:1 Child Ratio & Scale"}</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------
          TAB 1: LIVE INTERACTIVE ESTATE SLICES LAB (THE DYNAMIC PIZZA SLICER)
          ------------------------------------------------------------------- */}
      {activeTab === "sandbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Family Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#10241b] rounded-3xl p-5 sm:p-6 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sliders size={18} className="text-[#245642] dark:text-emerald-400" />
                <span>{isUr ? "کنبہ ترتیب دیں اور لائیو کسریں دیکھیں" : "Adjust Heirs to Watch Slices Multiply"}</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {isUr
                  ? "سلائیڈرز تبدیل کریں اور دیکھیں کہ کُل حصے خود بخود ۸ سے ۴۸ یا ۷۲ کیسے بنتے ہیں۔"
                  : "Drag the counters below to witness in real-time how the pie slices expand without crumbs."}
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {isUr ? "تیار شدہ مثالیں (Quick Presets):" : "Popular Presets:"}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setSpouseType("wife");
                    setParentsOption("none");
                    setSonsCount(2);
                    setDaughtersCount(2);
                  }}
                  className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 text-start transition-all cursor-pointer"
                >
                  {isUr ? "روایتی بنیادی (۴۸ حصے)" : "Nuclear (48 Slices)"}
                  <span className="block text-[10px] font-normal opacity-80">Wife + 2 Sons + 2 Daughters</span>
                </button>
                <button
                  onClick={() => {
                    setSpouseType("wife");
                    setParentsOption("both");
                    setSonsCount(1);
                    setDaughtersCount(1);
                  }}
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 text-start transition-all cursor-pointer"
                >
                  {isUr ? "مشترکہ خاندان (۷۲ حصے)" : "Joint Family (72 Slices)"}
                  <span className="block text-[10px] font-normal opacity-80">Parents + Wife + 1S + 1D</span>
                </button>
              </div>
            </div>

            {/* 1. Spouse Selector */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>{isUr ? "شریکِ حیات (Spouse):" : "Surviving Spouse:"}</span>
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                  {spouseType === "wife" ? (sonsCount + daughtersCount > 0 ? "1/8" : "1/4") : spouseType === "husband" ? (sonsCount + daughtersCount > 0 ? "1/4" : "1/2") : "None"}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "wife", en: "1 Wife", ur: "زوجہ (بیوہ)" },
                  { id: "husband", en: "Husband", ur: "شوہر" },
                  { id: "none", en: "None", ur: "کوئی نہیں" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSpouseType(s.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      spouseType === s.id
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {isUr ? s.ur : s.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Parents Selector */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>{isUr ? "والدین (Parents):" : "Parents:"}</span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  {parentsOption === "both" ? "1/6 + 1/6" : parentsOption !== "none" ? "1/6" : "None"}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { id: "none", en: "None", ur: "کوئی نہیں" },
                  { id: "both", en: "Both", ur: "دونوں (1/6+1/6)" },
                  { id: "father", en: "Father", ur: "صرف والد" },
                  { id: "mother", en: "Mother", ur: "صرف والدہ" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setParentsOption(p.id as any)}
                    className={`py-2 px-1 rounded-xl font-bold transition-all cursor-pointer text-center ${
                      parentsOption === p.id
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {isUr ? p.ur : p.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sons Counter */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {isUr ? "زندہ بیٹے (Sons — 2 Shares each):" : "Living Sons (2 shares each):"}
                </span>
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-sm">
                  {sonsCount} {isUr ? "بیٹے" : "Sons"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={sonsCount}
                onChange={(e) => setSonsCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* 4. Daughters Counter */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {isUr ? "زندہ بیٹیاں (Daughters — 1 Share each):" : "Living Daughters (1 share each):"}
                </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 text-sm">
                  {daughtersCount} {isUr ? "بیٹیاں" : "Daughters"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={daughtersCount}
                onChange={(e) => setDaughtersCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Pie & Derivation Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Real-Time Mathematical Derivation Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                {/* SVG Pie Chart */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <svg width="220" height="220" className="drop-shadow-md">
                    {renderSvgPieWedges(sandboxMath.wedges, sandboxMath.totalSlices)}
                    <circle cx="110" cy="110" r="38" className="fill-white dark:fill-[#0c1a14]" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {isUr ? "کُل حصے" : "Total Slices"}
                    </span>
                    <span className="text-xl font-black font-mono text-[#245642] dark:text-emerald-400">
                      {sandboxMath.totalSlices}
                    </span>
                  </div>
                </div>

                {/* Mathematical Equation & Story */}
                <div className="space-y-3 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold border border-emerald-300">
                    <CheckCircle2 size={13} />
                    <span>{isUr ? "بغیر اعشاریہ تقسیم کا راز" : "The Secret to Whole Slices"}</span>
                  </div>

                  {/* Formula Banner */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 font-mono text-xs space-y-1">
                    <span className="text-[10px] text-stone-500 font-bold block">
                      {isUr ? "حسابی ضربی مساوات:" : "Multiplication Equation:"}
                    </span>
                    <div className="text-sm font-bold text-[#245642] dark:text-emerald-300">
                      Base ({sandboxMath.baseDenominator}) × Children Shares ({sandboxMath.multiplier}) ={" "}
                      <strong className="text-amber-600 dark:text-amber-400 font-black">
                        {sandboxMath.totalSlices} Slices
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                    {isUr
                      ? `بیوہ یا والدین کے حصے نکالنے کے بعد بقیہ ترکہ بچوں میں تقسیم ہونا تھا، جس کے کُل ${sandboxMath.childShares} حصے بنتے تھے۔ چونکہ باقی رقم ${sandboxMath.childShares} پر پوری تقسیم نہیں ہوتی تھی، اس لیے ابتدائی مخرج کو ضرب دے کر کُل ${sandboxMath.totalSlices} حصے بنا لیے گئے۔`
                      : `After setting aside fixed spousal/parental reserves, the remaining estate had to be split among children (${sandboxMath.childShares} family shares). Multiplying the base by ${sandboxMath.multiplier} creates ${sandboxMath.totalSlices} clean slices with zero crumbs!`}
                  </p>
                </div>
              </div>

              {/* Exact Breakdown Slices Pill List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                  {isUr ? "ہر وارث کے مقررہ حصے (Slices Breakdown):" : "Per-Heir Slices Breakdown:"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {sandboxMath.wedges.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                        <div>
                          <strong className="text-stone-900 dark:text-stone-100 block">{w.label}</strong>
                          <span className="text-[10px] text-stone-500">{w.fraction}</span>
                        </div>
                      </div>
                      <div className="text-end font-mono">
                        <span className="font-black text-stone-900 dark:text-emerald-300">
                          {w.slices} / {sandboxMath.totalSlices} Slices
                        </span>
                        <span className="block text-[10px] text-stone-500">{w.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero Crumb Verification Note */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500 shrink-0" />
                <span className="font-semibold">
                  {isUr
                    ? `تمام حصص کا کُل مجموعہ ٹھیک ${sandboxMath.totalSlices} ہے (۱۰۰٪ مکمل ترکہ بغیر کسی کمی یا بیشی کے)۔`
                    : `Check: All slices sum to exactly ${sandboxMath.totalSlices} (100.0% of the estate, mathematically flawless).`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          TAB 2: THE 6 QURANIC MASTER FRACTIONS (THE DIVINE HEXAGON)
          ------------------------------------------------------------------- */}
      {activeTab === "fractions" && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isUr ? "قرآنِ مجید کی ۶ مقررہ کسریں (The 6 Quranic Fractions)" : "The 6 Quranic Master Fractions"}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isUr
                ? "تمام اسلامی تقسیم کا دارومدار قرآن کی سورہ النساء میں بیان کردہ ان ۶ الٰہی کسروں پر ہے۔"
                : "All Islamic inheritance stems from exactly six divine fractions explicitly decreed in Surah An-Nisa."}
            </p>
          </div>

          {/* 6 Fractions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {QURANIC_FRACTIONS.map((qf) => {
              const isSelected = selectedFraction.fraction === qf.fraction;
              return (
                <button
                  key={qf.fraction}
                  onClick={() => setSelectedFraction(qf)}
                  className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer ${
                    isSelected
                      ? "border-[#245642] dark:border-emerald-500 bg-white dark:bg-[#12241c] shadow-md ring-2 ring-emerald-500/30 scale-[1.02]"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-300"
                  }`}
                >
                  <span className="text-[10px] font-bold text-stone-400 font-mono">{qf.arabicName}</span>
                  <div
                    className={`my-2 text-3xl font-black bg-gradient-to-br ${qf.color} bg-clip-text text-transparent font-mono`}
                  >
                    {qf.fraction}
                  </div>
                  <div>
                    <strong className="text-xs block text-stone-800 dark:text-stone-200">
                      {isUr ? qf.nameUr : qf.nameEn}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-mono">{qf.percent}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Fraction Deep Dive Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedFraction.color} text-white flex items-center justify-center text-xl font-black font-mono shadow-md`}
                >
                  {selectedFraction.fraction}
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>{isUr ? selectedFraction.nameUr : selectedFraction.nameEn}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">
                      {selectedFraction.percent}
                    </span>
                  </h4>
                  <span className="text-xs text-stone-500">{selectedFraction.quranRef}</span>
                </div>
              </div>

              {/* Slices of 24 preview */}
              <div className="text-end font-mono">
                <span className="text-xs text-stone-500 block">{isUr ? "۲۴ میں سے حصہ:" : "Out of 24 Base Slices:"}</span>
                <span className="text-base font-bold text-[#245642] dark:text-emerald-400">
                  {selectedFraction.slicesOf24} of 24 Slices
                </span>
              </div>
            </div>

            {/* Quranic Ayah Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-1">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                {isUr ? "قرآنی نصِ قطعی:" : "Decreed Quranic Text:"}
              </span>
              <p className="text-base font-arabic text-amber-950 dark:text-amber-100 font-bold text-end leading-relaxed">
                {selectedFraction.quranVerse}
              </p>
            </div>

            {/* Eligible Heirs List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                {isUr ? "اس کسر کے شرعی حقدار ورثاء:" : "Heirs Entitled to this Fraction:"}
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(isUr ? selectedFraction.heirsUr : selectedFraction.heirsEn).map((heir, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>{heir}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          TAB 3: THE 2:1 CHILD RATIO & THE SACRED SCALE (REJECTION OF 'AWL)
          ------------------------------------------------------------------- */}
      {activeTab === "scale" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Card A: The 2:1 Brotherhood & Sisterhood Ratio */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                2:1
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "۲:۱ کا تناسب (للذكر مثل حظ الأنثيين)" : "The 2:1 Brotherhood Ratio"}
                </h4>
                <p className="text-xs text-stone-500">
                  {isUr ? "بیٹے اور بیٹی کے درمیان حسابی توازن کی حکمت" : "Why a brother receives twice a sister’s share"}
                </p>
              </div>
            </div>

            {/* Visual Token Model */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-3">
              <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block">
                {isUr ? "حسابی ٹوکن ماڈل (Family Token Model):" : "The Family Token Model:"}
              </span>
              <div className="flex items-center justify-around py-3 bg-white dark:bg-stone-900 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="text-center space-y-1">
                  <div className="flex justify-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">1</div>
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">2</div>
                  </div>
                  <strong className="text-xs block text-purple-950 dark:text-purple-200">{isUr ? "۱ بیٹا = ۲ ٹوکن" : "1 Son = 2 Shares"}</strong>
                </div>

                <div className="text-lg font-black text-stone-400">:</div>

                <div className="text-center space-y-1">
                  <div className="flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">1</div>
                  </div>
                  <strong className="text-xs block text-amber-950 dark:text-amber-200">{isUr ? "۱ بیٹی = ۱ ٹوکن" : "1 Daughter = 1 Share"}</strong>
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed space-y-2">
              <p>
                {isUr
                  ? "اسلامی فقہ میں بیٹی کا مال اس کی خالص ذاتی ملکیت ہوتا ہے جس پر خاندان کے اخراجات کی کوئی شرعی ذمہ داری نہیں؛ جبکہ بیٹے پر اپنی بیوی کا مہر، نفقہ اور والدین کے واجبات کی ذمہ داری ہوتی ہے۔"
                  : "A daughter retains her inheritance as 100% unconditional private wealth with zero marital liability; a son is legally bound to fund mahr, household living expenses, and parental maintenance."}
              </p>
            </div>
          </div>

          {/* Card B: Rejection of 'Awl in Shia Fiqh */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#245642] text-white flex items-center justify-center shadow-sm">
                <Scale size={20} className="text-amber-300" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "بطلانِ عول (Shia Rejection of ‘Awl)" : "Why Shia Fiqh Rejects ‘Awl"}
                </h4>
                <p className="text-xs text-stone-500">
                  {isUr ? "قرآنی حصوں کی حفاظت اور حسابی عدمِ تخفیف" : "Preventing arithmetic dilution of divine fixed shares"}
                </p>
              </div>
            </div>

            {/* Comparison Pill Box */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 block">
                  {isUr ? "غیر جعفری فقہ (عول کا طریقہ):" : "Non-Shia Fiqh (‘Awl Inflation):"}
                </strong>
                <p className="text-rose-800 dark:text-rose-200 text-[11px] leading-snug">
                  {isUr
                    ? "اگر کسریں ۱۰۰٪ سے بڑھ جائیں تو مخرج کو بڑا کر کے سب ورثاء (بشمول بیوہ اور والدین) کے حصوں میں کٹوتی کر دی جاتی ہے۔"
                    : "If fractions exceed 1.0, the base is artificially inflated, cutting everyone’s Quranic shares (including wife and parents)."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1">
                <strong className="text-emerald-900 dark:text-emerald-300 block flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>{isUr ? "فقہِ جعفریہ کا الٰہی عدل:" : "Ja'fari Fiqh (Sacred Fixed Shares):"}</span>
                </strong>
                <p className="text-[11px] leading-snug">
                  {isUr
                    ? "بیوی اور والدین کا حصہ خدا نے قطعی رکھا ہے جس میں کبھی کٹوتی نہیں ہوتی۔ حسابی کمی صرف ان ورثاء سے وضع کی جاتی ہے جن کا حصہ حالات کے ساتھ گھٹتا بڑھتا ہے۔"
                    : "Imam Ali (a.s.) taught that God never decrees a deficit in His law. The fixed shares of spouses and parents remain sacred and 100% untouchable."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
