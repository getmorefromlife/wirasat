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
  ShieldAlert,
  ArrowLeftRight,
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Crown,
  Building2,
  Home,
  Trees,
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
  const radius = 98;
  const cx = 120;
  const cy = 120;

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
        strokeWidth="2"
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

  // Active Tab: 6 sequential modules
  const [activeTab, setActiveTab] = useState<"sandbox" | "fractions" | "scale" | "surplus" | "tiers" | "hajib">("sandbox");

  // Selected Quranic Fraction Card
  const [selectedFraction, setSelectedFraction] = useState<QuranicFraction>(QURANIC_FRACTIONS[2]); // Default 1/8

  // Interactive Live Slicer Sandbox State
  const [spouseType, setSpouseType] = useState<"wife" | "none" | "husband">("wife");
  const [parentsOption, setParentsOption] = useState<"none" | "both" | "father" | "mother">("none");
  const [sonsCount, setSonsCount] = useState<number>(2);
  const [daughtersCount, setDaughtersCount] = useState<number>(2);

  // Step 4: Surplus Simulation Scenario
  const [surplusScenario, setSurplusScenario] = useState<"sole_daughter" | "mother_daughter" | "two_daughters">("sole_daughter");

  // Step 5: Tiers & Proximity Barrier Scenario
  const [tierScenario, setTierScenario] = useState<"daughter" | "parents" | "siblings" | "uncles">("daughter");

  // Step 6: Hajib Paradox & Real Estate State
  const [hajibBrothersCount, setHajibBrothersCount] = useState<number>(2); // 0, 1, or 2+
  const [hajibWivesCount, setHajibWivesCount] = useState<number>(2); // 1, 2, 3, 4
  const [hajibMarjaSchool, setHajibMarjaSchool] = useState<"sistani" | "khoei">("sistani");

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
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B1713] text-stone-900 dark:text-stone-100 transition-colors select-none py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* -------------------------------------------------------------------
          HERO BANNER: VISUAL MATH OF ISLAMIC INHERITANCE
          ------------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16382a] via-[#245642] to-[#122b20] text-white p-7 sm:p-10 shadow-2xl border border-emerald-600/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full bg-amber-400 text-stone-950 shadow-sm">
                {isUr ? "بنیادی آغاز (Start Here)" : "Foundational Masterclass"}
              </span>
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-white/15 text-emerald-200 border border-emerald-400/40">
                {isUr ? "عِلمُ الحِسابِ وَالفرائض" : "Visual Math of Fara'id"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {isUr
                ? "وراثت کی بصری ریاضی اور کسروں کی حقیقت"
                : "The Visual Mathematics of Islamic Inheritance"}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 leading-relaxed font-normal">
              {isUr
                ? "سمجھیں کہ قرآنی کسریں کیسی ہیں، ترکہ کُل ۴۸ یا ۷۲ حصوں میں کیوں تقسیم ہوتا ہے، اور طبقاتِ سه‌گانہ اور حجب کا اصول بغیر کسی اعشاریہ یا کسر کے مکمل عدل کیسے قائم کرتا ہے۔"
                : "Demystifying the 6 Quranic fractions, the 3 genealogical classes, the Hājib paradox, and why an estate expands into 48 or 72 clean slices with zero crumbs or decimals."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setActiveView("whiteboard")}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-[#245642] hover:bg-emerald-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Compass size={18} />
              <span>{isUr ? "کنبہ وائٹ بورڈ کھولیں" : "Open Kinship Whiteboard"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("wizard")}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 border border-emerald-400/50 shadow-md transition-all cursor-pointer"
            >
              <Calculator size={18} />
              <span>{isUr ? "اصل کیلکولیٹر" : "Main Calculator"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          MASTERCLASS NAVIGATION TABS (6 SEQUENTIAL MODULES)
          ------------------------------------------------------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-2 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("sandbox")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "sandbox"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <PieIcon size={16} className={activeTab === "sandbox" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۱۔ سلائسز لیب" : "1. Slices Lab"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("fractions")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "fractions"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <Layers size={16} className={activeTab === "fractions" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۲۔ ۶ قرآنی کسریں" : "2. 6 Quranic"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scale")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "scale"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <Scale size={16} className={activeTab === "scale" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۳۔ ۲:۱ کا تناسب" : "3. 2:1 Ratio"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("surplus")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "surplus"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <ArrowLeftRight size={16} className={activeTab === "surplus" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۴۔ فاضل ترکہ (رد)" : "4. Surplus (Radd)"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tiers")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "tiers"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <ShieldCheck size={16} className={activeTab === "tiers" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۵۔ ۳ طبقات و قلعہ" : "5. 3 Tiers"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("hajib")}
          className={`py-3.5 px-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "hajib"
              ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
              : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70"
          }`}
        >
          <Building2 size={16} className={activeTab === "hajib" ? "text-amber-300" : "text-stone-400"} />
          <span>{isUr ? "۶۔ حجب اور جائیداد" : "6. Hājib & Property"}</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------
          TAB 1: LIVE INTERACTIVE ESTATE SLICES LAB (THE DYNAMIC PIZZA SLICER)
          ------------------------------------------------------------------- */}
      {activeTab === "sandbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Family Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#10241b] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
                <Sliders size={22} className="text-[#245642] dark:text-emerald-400" />
                <span>{isUr ? "کنبہ ترتیب دیں اور لائیو کسریں دیکھیں" : "Adjust Heirs to Watch Slices Multiply"}</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                {isUr
                  ? "سلائیڈرز تبدیل کریں اور دیکھیں کہ کُل حصے خود بخود ۸ سے ۴۸ یا ۷۲ کیسے بنتے ہیں۔"
                  : "Move the sliders below to witness in real-time how the pie slices expand without crumbs or decimals."}
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold text-stone-500 uppercase tracking-wider block">
                {isUr ? "تیار شدہ مثالیں (Quick Presets):" : "Popular Presets:"}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSpouseType("wife");
                    setParentsOption("none");
                    setSonsCount(2);
                    setDaughtersCount(2);
                  }}
                  className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 text-start transition-all cursor-pointer shadow-xs"
                >
                  <span className="text-sm sm:text-base block">
                    {isUr ? "روایتی بنیادی (۴۸ حصے)" : "Nuclear (48 Slices)"}
                  </span>
                  <span className="block text-xs text-stone-600 dark:text-emerald-300/80 mt-0.5">Wife + 2 Sons + 2 Daughters</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSpouseType("wife");
                    setParentsOption("both");
                    setSonsCount(1);
                    setDaughtersCount(1);
                  }}
                  className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold border border-blue-300 dark:border-blue-800 hover:bg-blue-100 text-start transition-all cursor-pointer shadow-xs"
                >
                  <span className="text-sm sm:text-base block">
                    {isUr ? "مشترکہ خاندان (۷۲ حصے)" : "Joint Family (72 Slices)"}
                  </span>
                  <span className="block text-xs text-stone-600 dark:text-blue-300/80 mt-0.5">Parents + Wife + 1S + 1D</span>
                </button>
              </div>
            </div>

            {/* 1. Spouse Selector */}
            <div className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800">
              <label className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                <span>{isUr ? "شریکِ حیات (Spouse):" : "Surviving Spouse:"}</span>
                <span className="text-sm font-mono font-bold text-sky-600 dark:text-sky-400">
                  {spouseType === "wife" ? (sonsCount + daughtersCount > 0 ? "1/8" : "1/4") : spouseType === "husband" ? (sonsCount + daughtersCount > 0 ? "1/4" : "1/2") : "None"}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "wife", en: "1 Wife", ur: "زوجہ (بیوہ)" },
                  { id: "husband", en: "Husband", ur: "شوہر" },
                  { id: "none", en: "None", ur: "کوئی نہیں" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSpouseType(s.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                      spouseType === s.id
                        ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-500/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {isUr ? s.ur : s.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Parents Selector */}
            <div className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800">
              <label className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                <span>{isUr ? "والدین (Parents):" : "Parents:"}</span>
                <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {parentsOption === "both" ? "1/6 + 1/6" : parentsOption !== "none" ? "1/6" : "None"}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-2 text-sm sm:text-base">
                {[
                  { id: "none", en: "None", ur: "کوئی نہیں" },
                  { id: "both", en: "Both", ur: "دونوں" },
                  { id: "father", en: "Father", ur: "والد" },
                  { id: "mother", en: "Mother", ur: "والدہ" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setParentsOption(p.id as any)}
                    className={`py-2.5 px-2 rounded-xl font-bold transition-all cursor-pointer text-center ${
                      parentsOption === p.id
                        ? "bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {isUr ? p.ur : p.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sons Counter */}
            <div className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200">
                  {isUr ? "زندہ بیٹے (Sons — 2 Shares each):" : "Living Sons (2 shares each):"}
                </span>
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-base sm:text-lg">
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
                className="w-full h-3 rounded-lg accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-stone-500 font-bold px-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* 4. Daughters Counter */}
            <div className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200">
                  {isUr ? "زندہ بیٹیاں (Daughters — 1 Share each):" : "Living Daughters (1 share each):"}
                </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 text-base sm:text-lg">
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
                className="w-full h-3 rounded-lg accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-stone-500 font-bold px-1">
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
          <div className="lg:col-span-7 space-y-6">
            {/* Real-Time Mathematical Derivation Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
                {/* SVG Pie Chart */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <svg width="240" height="240" className="drop-shadow-lg">
                    {renderSvgPieWedges(sandboxMath.wedges, sandboxMath.totalSlices)}
                    <circle cx="120" cy="120" r="42" className="fill-white dark:fill-[#0c1a14]" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {isUr ? "کُل حصے" : "Total Slices"}
                    </span>
                    <span className="text-3xl font-black font-mono text-[#245642] dark:text-emerald-400">
                      {sandboxMath.totalSlices}
                    </span>
                  </div>
                </div>

                {/* Mathematical Equation & Story */}
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-sm font-bold border border-emerald-300">
                    <CheckCircle2 size={16} />
                    <span>{isUr ? "بغیر اعشاریہ تقسیم کا حسابی راز" : "The Secret to Whole Slices"}</span>
                  </div>

                  {/* Formula Banner */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-mono space-y-1.5">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      {isUr ? "حسابی ضربی مساوات:" : "Multiplication Equation:"}
                    </span>
                    <div className="text-base sm:text-lg font-bold text-[#245642] dark:text-emerald-300">
                      Base ({sandboxMath.baseDenominator}) × Children Shares ({sandboxMath.multiplier}) ={" "}
                      <strong className="text-amber-600 dark:text-amber-400 font-black">
                        {sandboxMath.totalSlices} Slices
                      </strong>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {isUr
                      ? `بیوہ یا والدین کے حصے نکالنے کے بعد بقیہ ترکہ بچوں میں تقسیم ہونا تھا، جس کے کُل ${sandboxMath.childShares} حصے بنتے تھے۔ چونکہ باقی رقم ${sandboxMath.childShares} پر پوری تقسیم نہیں ہوتی تھی، اس لیے ابتدائی مخرج کو ضرب دے کر کُل ${sandboxMath.totalSlices} حصے بنا لیے گئے۔`
                      : `After setting aside fixed spousal/parental reserves, the remaining estate had to be split among children (${sandboxMath.childShares} family shares). Multiplying the base by ${sandboxMath.multiplier} creates ${sandboxMath.totalSlices} clean slices with zero crumbs!`}
                  </p>
                </div>
              </div>

              {/* Exact Breakdown Slices Pill List */}
              <div className="space-y-3">
                <span className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider block">
                  {isUr ? "ہر وارث کے مقررہ حصے (Slices Breakdown):" : "Per-Heir Slices Breakdown:"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sandboxMath.wedges.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: w.color }} />
                        <div>
                          <strong className="text-sm sm:text-base text-stone-900 dark:text-stone-100 block">{w.label}</strong>
                          <span className="text-xs text-stone-500 font-mono font-bold">{w.fraction}</span>
                        </div>
                      </div>
                      <div className="text-end font-mono">
                        <span className="text-sm sm:text-base font-black text-stone-900 dark:text-emerald-300 block">
                          {w.slices} / {sandboxMath.totalSlices} Slices
                        </span>
                        <span className="text-xs text-stone-500 font-semibold">{w.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero Crumb Verification Note */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-sm sm:text-base text-emerald-950 dark:text-emerald-200 flex items-center gap-3">
                <Sparkles size={20} className="text-amber-500 shrink-0" />
                <span className="font-semibold leading-relaxed">
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
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              {isUr ? "قرآنِ مجید کی ۶ مقررہ کسریں (The 6 Quranic Fractions)" : "The 6 Quranic Master Fractions"}
            </h3>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {isUr
                ? "تمام اسلامی تقسیم کا دارومدار قرآن کی سورہ النساء میں بیان کردہ ان ۶ الٰہی کسروں پر ہے۔ کسی بھی کسر پر کلک کر کے اس کا قرآنی حکم دیکھیں۔"
                : "All Islamic inheritance stems from exactly six divine fractions decreed in Surah An-Nisa. Click any fraction to inspect its sacred text and primary beneficiaries."}
            </p>
          </div>

          {/* 6 Fractions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {QURANIC_FRACTIONS.map((qf) => {
              const isSelected = selectedFraction.fraction === qf.fraction;
              return (
                <button
                  key={qf.fraction}
                  type="button"
                  onClick={() => setSelectedFraction(qf)}
                  className={`p-5 rounded-3xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer ${
                    isSelected
                      ? "border-[#245642] dark:border-emerald-500 bg-white dark:bg-[#12241c] shadow-lg ring-4 ring-emerald-500/20 scale-[1.03]"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-400"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-stone-400 font-mono">{qf.arabicName}</span>
                  <div
                    className={`my-2 text-3xl sm:text-4xl font-black bg-gradient-to-br ${qf.color} bg-clip-text text-transparent font-mono`}
                  >
                    {qf.fraction}
                  </div>
                  <div>
                    <strong className="text-sm sm:text-base block text-stone-900 dark:text-stone-100 font-bold">
                      {isUr ? qf.nameUr : qf.nameEn}
                    </strong>
                    <span className="text-xs sm:text-sm text-stone-500 font-mono font-semibold">{qf.percent}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Fraction Deep Dive Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedFraction.color} text-white flex items-center justify-center text-2xl font-black font-mono shadow-md`}
                >
                  {selectedFraction.fraction}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
                    <span>{isUr ? selectedFraction.nameUr : selectedFraction.nameEn}</span>
                    <span className="text-xs sm:text-sm px-3 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono font-bold">
                      {selectedFraction.percent}
                    </span>
                  </h4>
                  <span className="text-sm text-stone-500 font-medium">{selectedFraction.quranRef}</span>
                </div>
              </div>

              {/* Slices of 24 preview */}
              <div className="text-end font-mono">
                <span className="text-xs sm:text-sm text-stone-500 block">{isUr ? "۲۴ میں سے حصہ:" : "Out of 24 Base Slices:"}</span>
                <span className="text-lg sm:text-xl font-bold text-[#245642] dark:text-emerald-400">
                  {selectedFraction.slicesOf24} of 24 Slices
                </span>
              </div>
            </div>

            {/* Quranic Ayah Box */}
            <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
              <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                {isUr ? "قرآنی نصِ قطعی:" : "Decreed Quranic Text:"}
              </span>
              <p className="text-xl sm:text-2xl font-arabic text-amber-950 dark:text-amber-100 font-bold text-end leading-loose">
                {selectedFraction.quranVerse}
              </p>
            </div>

            {/* Eligible Heirs List */}
            <div className="space-y-3">
              <span className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider block">
                {isUr ? "اس کسر کے شرعی حقدار ورثاء:" : "Heirs Entitled to this Fraction:"}
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                {(isUr ? selectedFraction.heirsUr : selectedFraction.heirsEn).map((heir, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3 text-stone-800 dark:text-stone-200 font-medium"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Card A: The 2:1 Brotherhood & Sisterhood Ratio */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                2:1
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "۲:۱ کا تناسب (للذكر مثل حظ الأنثيين)" : "The 2:1 Brotherhood Ratio"}
                </h4>
                <p className="text-sm text-stone-500">
                  {isUr ? "بیٹے اور بیٹی کے درمیان حسابی توازن کی حکمت" : "Why a brother receives twice a sister’s share"}
                </p>
              </div>
            </div>

            {/* Visual Token Model */}
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-4">
              <span className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block">
                {isUr ? "حسابی ٹوکن ماڈل (Family Token Model):" : "The Family Token Model:"}
              </span>
              <div className="flex items-center justify-around py-4 bg-white dark:bg-stone-900 rounded-2xl border border-purple-200 dark:border-purple-800">
                <div className="text-center space-y-1.5">
                  <div className="flex justify-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-xs">1</div>
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-xs">2</div>
                  </div>
                  <strong className="text-sm sm:text-base block text-purple-950 dark:text-purple-200 font-bold">{isUr ? "۱ بیٹا = ۲ ٹوکن" : "1 Son = 2 Shares"}</strong>
                </div>

                <div className="text-2xl font-black text-stone-400">:</div>

                <div className="text-center space-y-1.5">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center shadow-xs">1</div>
                  </div>
                  <strong className="text-sm sm:text-base block text-amber-950 dark:text-amber-200 font-bold">{isUr ? "۱ بیٹی = ۱ ٹوکن" : "1 Daughter = 1 Share"}</strong>
                </div>
              </div>
            </div>

            <div className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-3 font-normal">
              <p>
                {isUr
                  ? "اسلامی فقہ میں بیٹی کا مال اس کی خالص ذاتی ملکیت ہوتا ہے جس پر خاندان کے اخراجات کی کوئی شرعی ذمہ داری نہیں؛ جبکہ بیٹے پر اپنی بیوی کا مہر، نفقہ، رہائش اور والدین کے واجبات کی شرعی ذمہ داری عائد ہوتی ہے۔"
                  : "A daughter retains her inheritance as 100% unconditional private wealth with zero marital liability; a son is legally bound to fund mahr, household living expenses, and parental maintenance."}
              </p>
            </div>
          </div>

          {/* Card B: Rejection of 'Awl in Shia Fiqh */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#245642] text-white flex items-center justify-center shadow-sm">
                <Scale size={24} className="text-amber-300" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "بطلانِ عول (Shia Rejection of ‘Awl)" : "Why Shia Fiqh Rejects ‘Awl"}
                </h4>
                <p className="text-sm text-stone-500">
                  {isUr ? "قرآنی حصوں کی حفاظت اور حسابی عدمِ تخفیف" : "Preventing arithmetic dilution of divine fixed shares"}
                </p>
              </div>
            </div>

            {/* Comparison Pill Box */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-1.5">
                <strong className="text-rose-900 dark:text-rose-300 block font-bold text-sm sm:text-base">
                  {isUr ? "غیر جعفری فقہ (عول کا طریقہ):" : "Non-Shia Fiqh (‘Awl Inflation):"}
                </strong>
                <p className="text-rose-800 dark:text-rose-200 text-xs sm:text-sm leading-relaxed">
                  {isUr
                    ? "اگر کسریں ۱۰۰٪ سے بڑھ جائیں تو مخرج کو بڑا کر کے سب ورثاء (بشمول بیوہ اور والدین) کے حصوں میں کٹوتی کر دی جاتی ہے۔"
                    : "If fractions exceed 1.0, the base is artificially inflated, cutting everyone’s Quranic shares (including wife and parents)."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1.5">
                <strong className="text-emerald-900 dark:text-emerald-300 block font-bold text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>{isUr ? "فقہِ جعفریہ کا الٰہی عدل:" : "Ja'fari Fiqh (Sacred Fixed Shares):"}</span>
                </strong>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {isUr
                    ? "امیرالمومنین علی علیہ السلام نے فرمایا: «إنَّ الَّذي أَحصى رَمْلَ عَالِجٍ لَيَعْلَمُ أَنَّ السِّهَامَ لا تَعُولُ». خدا کے نظام میں کسروں کا خسارہ نہیں ہوتا۔ بیوی اور والدین کا حصہ قطعی ہے، کمی صرف ان سے وضع ہوتی ہے جن کا حصہ حالات کے ساتھ بدلتا ہے۔"
                    : "Imam Ali (a.s.) taught that God who counted the sands of the desert never decrees a deficit in His law. The fixed shares of spouses and parents remain sacred and 100% untouchable."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          TAB 4: THE MYSTERY OF SURPLUS RESIDUE (RADD VS TA'SEEB)
          ------------------------------------------------------------------- */}
      {activeTab === "surplus" && (
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              {isUr ? "فاضل ترکہ: رد بنام تعصیب (Surplus: Radd vs. Ta'seeb)" : "The Mystery of Surplus: Radd vs. Ta'seeb"}
            </h3>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {isUr
                ? "جب قرآنی کسریں پوری ہونے کے بعد بھی ترکہ بچ جائے، تو کیا وہ بچی ہوئی دولت دور کے چچا زادوں کو جائے گی یا قریبی بیٹی اور ماں کو؟"
                : "When Quranic shares leave surplus wealth, does it go to distant male cousins, or return exclusively to the deceased's closest daughters and mother?"}
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm gap-2">
              {[
                { id: "sole_daughter", en: "Sole Daughter (50% Farḍ)", ur: "اکلوتی بیٹی (۵۰٪ فرض)" },
                { id: "mother_daughter", en: "Mother + Daughter (66.7% Farḍ)", ur: "والدہ + بیٹی (۶۶.۷٪ فرض)" },
                { id: "two_daughters", en: "2 Daughters (66.7% Farḍ)", ur: "دو بیٹیاں (۶۶.۷٪ فرض)" },
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSurplusScenario(sc.id as any)}
                  className={`py-2.5 px-4 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    surplusScenario === sc.id
                      ? "bg-[#245642] text-white shadow-md"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {isUr ? sc.ur : sc.en}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Comparison Grid: Shia Radd vs Sunni Ta'seeb */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Box A: Sunni Ta'seeb */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300">
                    {isUr ? "دیگر مکاتبِ فکر (تعصیب)" : "Other Schools (Ta'seeb)"}
                  </span>
                  <ShieldAlert size={20} className="text-rose-500" />
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "دور کے پدری مرد رشتہ داروں کو ترکہ دینا" : "Surplus to Distant Agnatic Relatives"}
                </h4>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {isUr
                    ? surplusScenario === "sole_daughter"
                      ? "بیٹی کو صرف اس کا قرآنی نصف (۵۰٪) دیا جاتا ہے، جبکہ بقیہ پچاس فیصد (۵۰٪) دور کے چچا یا چچا زاد بھائی لے جاتے ہیں، خواہ وہ متوفی کے خاندان سے بے تعلق ہی کیوں نہ ہوں۔"
                      : "قرآنی فرض دینے کے بعد باقی بچنے والی دولت بیٹی اور ماں کو نہیں دی جاتی، بلکہ عصبہ (چچا، تایا یا بھتیجوں) کو منتقل کر دی جاتی ہے۔"
                    : surplusScenario === "sole_daughter"
                    ? "The sole daughter receives only her prescribed 50%. The remaining 50% surplus is legally handed over to distant agnatic uncles or cousins under Ta'seeb."
                    : "The remaining surplus is barred from the daughter and mother, and diverted to distant paternal uncles or cousins."}
                </p>

                {/* Progress Bar Visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-mono font-bold">
                    <span className="text-purple-700 dark:text-purple-300">
                      {isUr ? "بیٹی / قریبی وارث:" : "Close Heir (Daughter):"} {surplusScenario === "sole_daughter" ? "50%" : "66.7%"}
                    </span>
                    <span className="text-rose-600 dark:text-rose-400">
                      {isUr ? "دور کا چچا (عصبہ):" : "Distant Uncle (Ta'seeb):"} {surplusScenario === "sole_daughter" ? "50%" : "33.3%"}
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden flex">
                    <div
                      style={{ width: surplusScenario === "sole_daughter" ? "50%" : "66.7%" }}
                      className="bg-purple-600 h-full"
                    />
                    <div
                      style={{ width: surplusScenario === "sole_daughter" ? "50%" : "33.3%" }}
                      className="bg-rose-500 h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 text-xs sm:text-sm font-medium">
                {isUr
                  ? "نتیجہ: بیٹی گھر میں موجود ہونے کے باوجود اپنے والد کی آدھی جائیداد سے محروم ہو جاتی ہے۔"
                  : "Outcome: The daughter is forced to share her father's home/estate with distant relatives."}
              </div>
            </div>

            {/* Box B: Shia Ja'fari Radd */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border-2 border-emerald-500 dark:border-emerald-600 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200">
                    {isUr ? "فقہِ جعفریہ (رد / واپسی کا اصول)" : "Ja'fari Fiqh (Radd / Return Principle)"}
                  </span>
                  <CheckCircle2 size={22} className="text-emerald-600 dark:text-emerald-400" />
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {isUr ? "۱۰۰٪ مکمل ترکہ قریبی بیٹی / ماں کی ملکیت" : "100% Estate Reverts to Closest Blood Heirs"}
                </h4>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
                  {isUr
                    ? surplusScenario === "sole_daughter"
                      ? "اکلوتی بیٹی کو آدھا (۵۰٪) قرآنی فرض کے طور پر دیا جاتا ہے، اور بقیہ ۵۰٪ بچا ہوا ترکہ 'رد' کے شرعی اصول کے تحت دوبارہ اسی بیٹی کو لوٹا دیا جاتا ہے، چنانچہ بیٹی کو کُل ۱۰۰٪ ترکہ ملتا ہے اور چچا مکمل محجوب رہتا ہے!"
                      : "بچا ہوا سارا ترکہ بیٹی اور والدہ کے درمیان ان کے حصوں کے تناسب سے واپس 'رد' کر دیا جاتا ہے، اور کوئی دور کا رشتہ دار مداخلت نہیں کر سکتا۔"
                    : surplusScenario === "sole_daughter"
                    ? "The sole daughter takes 50% by Farḍ (Quranic share) and the remaining 50% by Radd (Surplus Return). She inherits 100% of her father's estate, and the distant uncle inherits zero!"
                    : "The surplus residue is returned (Radd) strictly to the daughter and mother proportionally. Distant relatives are 100% excluded."}
                </p>

                {/* Progress Bar Visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-mono font-bold">
                    <span className="text-emerald-700 dark:text-emerald-300">
                      {isUr ? "بیٹی / قریبی وارث (فرض + رد):" : "Daughter (Farḍ + Radd):"} 100.0%
                    </span>
                    <span className="text-stone-400">
                      {isUr ? "دور کا رشتہ دار:" : "Distant Relatives:"} 0%
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden flex">
                    <div style={{ width: "100%" }} className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full" />
                  </div>
                </div>
              </div>

              {/* Quranic Proof Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                  {isUr ? "قرآنی نصِ برہان:" : "The Quranic Foundation:"}
                </span>
                <p className="text-base sm:text-lg font-arabic font-bold text-emerald-950 dark:text-emerald-100 text-end">
                  وَأُوْلُواْ ٱلۡأَرۡحَامِ بَعۡضُهُمۡ أَوۡلَىٰ بِبَعۡضٍ فِی كِتَـٰبِ ٱللَّهِ
                </p>
                <span className="text-xs text-stone-500 block text-end">Surah Al-Ahzab (33:6) · «الأقرب يمنع الأبعد»</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          TAB 5: THE 3 GENEALOGICAL CLASSES & THE PROXIMITY SHIELD
          ------------------------------------------------------------------- */}
      {activeTab === "tiers" && (
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              {isUr ? "طبقاتِ سه‌گانہ اور حجبِ حرمان کا الٰہی قلعہ" : "The 3 Genealogical Classes & Proximity Barrier"}
            </h3>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {isUr
                ? "فقہ جعفریہ میں ورثاء کے ۳ آہنی طبقات ہیں: جب تک پچھلے طبقے کا ایک فرد بھی موجود ہو، اگلا طبقہ ایک پیسہ بھی نہیں پا سکتا: «الأقرب يمنع الأبعد»۔"
                : "In Ja'fari jurisprudence, relatives are arranged in 3 impenetrable generational tiers. The presence of even one heir in Tier 1 completely excludes Tiers 2 and 3."}
            </p>
          </div>

          {/* Interactive Tier Scenario Selector */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm max-w-4xl w-full">
              {[
                { id: "daughter", en: "1 Daughter Exists (Tier 1)", ur: "۱ بیٹی حیات ہے (طبقہ ۱)" },
                { id: "parents", en: "Parents Exist (Tier 1)", ur: "والدین حیات ہیں (طبقہ ۱)" },
                { id: "siblings", en: "Tier 1 Empty → Siblings Exist (Tier 2)", ur: "طبقہ ۱ خالی → بہن بھائی (طبقہ ۲)" },
                { id: "uncles", en: "Tiers 1 & 2 Empty → Paternal Uncle (Tier 3)", ur: "طبقہ ۱ و ۲ خالی → چچا (طبقہ ۳)" },
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setTierScenario(sc.id as any)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                    tierScenario === sc.id
                      ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {isUr ? sc.ur : sc.en}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Tier Fortress Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* TIER 1 CARD */}
            <div
              className={`p-7 rounded-3xl border-2 transition-all duration-300 space-y-5 flex flex-col justify-between ${
                tierScenario === "daughter" || tierScenario === "parents"
                  ? "bg-white dark:bg-[#10241b] border-emerald-500 dark:border-emerald-500 shadow-xl ring-4 ring-emerald-500/20"
                  : "bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 opacity-60"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200">
                    {isUr ? "طبقہ اوّل (Tier 1)" : "Class I (Tier 1)"}
                  </span>
                  {tierScenario === "daughter" || tierScenario === "parents" ? (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <Unlock size={18} />
                      <span>{isUr ? "فعال و نافذ" : "Active & Inheriting"}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-stone-400 font-medium">{isUr ? "کوئی وارث نہیں" : "No Heirs"}</span>
                  )}
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
                  {isUr ? "والدین اور اولاد" : "Parents & Descendants"}
                </h4>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isUr
                    ? "والد، والدہ، بیٹا، بیٹی، اور اولاد کی اولاد (پوتے، پوتیاں، نواسے، نواسیاں) تا انتہا۔"
                    : "Father, Mother, Sons, Daughters, and lineal grandchildren/great-grandchildren to any depth."}
                </p>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">
                    {tierScenario === "daughter"
                      ? (isUr ? "حالت: اکلوتی بیٹی موجود ہے (۱۰۰٪ ترکہ)" : "Status: 1 Daughter receives 100% estate")
                      : tierScenario === "parents"
                      ? (isUr ? "حالت: والدین موجود ہیں (۱۰۰٪ ترکہ)" : "Status: Parents receive 100% estate")
                      : (isUr ? "حالت: طبقہ اول کا کوئی فرد حیات نہیں" : "Status: No living Class I heirs")}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-500">
                {isUr ? "قلعہ کی پہلی دیوار (The Primary Shield)" : "The Core Lineage (Primary Shield)"}
              </div>
            </div>

            {/* TIER 2 CARD */}
            <div
              className={`p-7 rounded-3xl border-2 transition-all duration-300 space-y-5 flex flex-col justify-between ${
                tierScenario === "siblings"
                  ? "bg-white dark:bg-[#10241b] border-purple-500 dark:border-purple-500 shadow-xl ring-4 ring-purple-500/20"
                  : "bg-stone-50/80 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/80"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-950 dark:bg-purple-950 dark:text-purple-200">
                    {isUr ? "طبقہ دوم (Tier 2)" : "Class II (Tier 2)"}
                  </span>
                  {tierScenario === "daughter" || tierScenario === "parents" ? (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400">
                      <Lock size={18} />
                      <span>{isUr ? "محجوب بالکلیہ (0%)" : "100% Blocked ($0)"}</span>
                    </span>
                  ) : tierScenario === "siblings" ? (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">
                      <Unlock size={18} />
                      <span>{isUr ? "فعال و نافذ" : "Active & Inheriting"}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-stone-400 font-medium">{isUr ? "کوئی وارث نہیں" : "No Heirs"}</span>
                  )}
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
                  {isUr ? "اجداد اور بہن بھائی" : "Grandparents & Siblings"}
                </h4>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isUr
                    ? "دادا، دادی، نانا، نانی، سگے، پدری اور مادری بہن بھائی اور ان کی اولاد۔"
                    : "Paternal/maternal grandparents, and full, paternal, or maternal brothers and sisters (and their children)."}
                </p>

                <div
                  className={`p-3.5 rounded-2xl border text-xs font-bold ${
                    tierScenario === "daughter" || tierScenario === "parents"
                      ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200"
                      : "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200"
                  }`}
                >
                  {tierScenario === "daughter" || tierScenario === "parents"
                    ? (isUr ? "طبقہ ۱ کی موجودگی میں بھائی، بہن یا دادا کو ایک پیسہ بھی نہیں ملتا۔" : "Shielded: Siblings and Grandparents get exactly $0.00.")
                    : tierScenario === "siblings"
                    ? (isUr ? "حالت: طبقہ ۱ نہ ہونے کی بنا پر بہن بھائی پورا ترکہ پائیں گے۔" : "Status: Active! Siblings inherit the entire estate.")
                    : (isUr ? "طبقہ ۲ کا کوئی فرد حیات نہیں" : "No Class II heirs")}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-500">
                {isUr ? "قلعہ کی دوسری دیوار (Secondary Orbit)" : "Secondary Orbit (Intermediate Shield)"}
              </div>
            </div>

            {/* TIER 3 CARD */}
            <div
              className={`p-7 rounded-3xl border-2 transition-all duration-300 space-y-5 flex flex-col justify-between ${
                tierScenario === "uncles"
                  ? "bg-white dark:bg-[#10241b] border-amber-500 dark:border-amber-500 shadow-xl ring-4 ring-amber-500/20"
                  : "bg-stone-50/80 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/80"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200">
                    {isUr ? "طبقہ سوم (Tier 3)" : "Class III (Tier 3)"}
                  </span>
                  {tierScenario === "uncles" ? (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                      <Unlock size={18} />
                      <span>{isUr ? "فعال و نافذ" : "Active & Inheriting"}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400">
                      <Lock size={18} />
                      <span>{isUr ? "محجوب بالکلیہ (0%)" : "100% Blocked ($0)"}</span>
                    </span>
                  )}
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
                  {isUr ? "چچا، پھوپھی، ماموں اور خالہ" : "Uncles & Aunts"}
                </h4>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isUr
                    ? "پدری اور مادری چچا، پھوپھی، ماموں، خالہ، اور ان کے بعد چچا زاد، ماموں زاد تا انتہا۔"
                    : "Paternal and maternal uncles, aunts, and their subsequent descendants (first cousins, etc.)."}
                </p>

                <div
                  className={`p-3.5 rounded-2xl border text-xs font-bold ${
                    tierScenario === "uncles"
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200"
                      : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200"
                  }`}
                >
                  {tierScenario === "uncles"
                    ? (isUr ? "حالت: طبقہ اول و دوم نہ ہونے پر چچا ترکے کے وارث بنیں گے۔" : "Status: Active! Uncles inherit as Class I & II are vacant.")
                    : (isUr ? "محجوب: طبقہ اول یا دوم کی موجودگی میں چچا کو بالکل کچھ نہیں ملتا۔" : "Shielded: Uncles and cousins inherit exactly $0.00.")}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-500">
                {isUr ? "قلعہ کا بیرونی دائرہ (Outer Perimeter)" : "Outer Perimeter (Final Tier)"}
              </div>
            </div>
          </div>

          {/* Special Sovereign Spouse Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900 via-indigo-950 to-emerald-950 text-white shadow-xl border border-sky-500/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md">
                <Crown size={24} className="text-stone-950" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <span>{isUr ? "شریکِ حیات کا شاہی استثناء (The Sovereign Spouse)" : "The Sovereign Spouse (Transcends All Tiers)"}</span>
                </h4>
                <p className="text-sm text-sky-200">
                  {isUr ? "بیوہ یا شوہر کسی بھی طبقے سے کبھی محجوب نہیں ہوتے" : "Spouses are never blocked by Tier 1, Tier 2, or Tier 3"}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-normal">
              {isUr
                ? "شوہر اور بیوی طبقاتِ سه‌گانہ کے نظام سے بالا تر ہیں۔ چاہے متوفیٰ کے بچے موجود ہوں (طبقہ ۱)، بہن بھائی موجود ہوں (طبقہ ۲)، یا چچا موجود ہوں (طبقہ ۳)، شریکِ حیات اپنا قرآنی قطعی حصہ (بیوہ: ۱/۸ یا ۱/۴؛ شوہر: ۱/۴ یا ۱/۲) پہلے وصول کرتا ہے اور باقی ماندہ ترکہ فعال طبقے میں تقسیم ہوتا ہے۔"
                : "A surviving husband or wife sits outside and above the 3-tier hierarchy. Whether Tier 1, Tier 2, or Tier 3 inherits, the spouse ALWAYS receives their decreed Quranic share first (Wife: 1/8 with kids, 1/4 without; Husband: 1/4 with kids, 1/2 without)."}
            </p>
          </div>

          {/* Quranic Maxim Foundation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base">
              <CheckCircle2 size={18} />
              <span>{isUr ? "قرآنی سنہری قاعدہ: «الأقرب يمنع الأبعد»" : "The Golden Quranic Maxim: Proximity Excludes Distance"}</span>
            </div>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {isUr
                ? "سورۂ انفال (آیت ۷۵) اور سورۂ احزاب (آیت ۶) میں فرمانِ الٰہی ہے: «وَأُوْلُواْ ٱلۡأَرۡحَامِ بَعۡضُهُمۡ أَوۡلَىٰ بِبَعۡضٍ فِی كِتَـٰبِ ٱللَّهِ» (اور اللہ کی کتاب میں خونی رشتہ دار ایک دوسرے پر زیادہ حقدار ہیں)۔ اہلبیت علیہم السلام نے اس آیت کی بنیاد پر یہ ابدی اصول قائم فرمایا کہ جب تک زیادہ قریبی رشتہ دار موجود ہے، دور کا رشتہ دار کبھی ترکے میں شریک نہیں ہو سکتا۔"
                : "Based on Surah Al-Anfal (8:75) and Surah Al-Ahzab (33:6), the Ahlulbayt (a.s.) decreed that closer blood relatives have absolute priority over distant ones. A surviving daughter or mother completely shields the deceased's home from being divided among distant paternal uncles or cousins."}
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          TAB 6: THE HĀJIB PARADOX & THE REAL ESTATE DIVIDE (SOIL VS. BRICKS)
          ------------------------------------------------------------------- */}
      {activeTab === "hajib" && (
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              {isUr ? "حجبِ نقصان اور زمین بنام ملبہ کا شرعی تجزیہ" : "The Hājib Paradox & The Real Estate Divide"}
            </h3>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {isUr
                ? "سمجھیں کہ بھائی خود کچھ نہ لے کر بھی والدہ کا حصہ ۱/۳ سے ۱/۶ کیوں کر دیتے ہیں، اور بیوہ کی وراثت زمین کی مٹی سے ہوتی ہے یا صرف اس کی مالیاتی قیمت سے۔"
                : "Understand how brothers reduce their mother's share without taking anything themselves, and explore the widow's entitlement to land vs. buildings."}
            </p>
          </div>

          {/* =================================================================
              PART 1: THE MOTHER'S HĀJIB PARADOX (حجبِ نقصان)
              ================================================================= */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                  {isUr ? "حصہ اول: حجبِ نقصان (The Mother's Share Reduction)" : "Part 1: The Mother's Hājib Paradox"}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  {isUr ? "بھائیوں کی موجودگی میں والدہ کا حصہ آدھا ہو جانا" : "How 2+ Brothers Cut Mother’s Share While Taking Zero"}
                </h4>
              </div>

              {/* Brother count buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-stone-500">{isUr ? "بھائیوں کی تعداد:" : "Brothers:"}</span>
                {[
                  { count: 0, label: "0" },
                  { count: 1, label: "1" },
                  { count: 2, label: "2+ (Hājib)" },
                ].map((b) => (
                  <button
                    key={b.count}
                    type="button"
                    onClick={() => setHajibBrothersCount(b.count)}
                    className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      hajibBrothersCount === b.count
                        ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Allocation Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Mother's Share Card */}
              <div
                className={`p-6 rounded-2xl border transition-all space-y-3 ${
                  hajibBrothersCount >= 2
                    ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800"
                    : "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{isUr ? "والدہ (Mother)" : "Mother"}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white dark:bg-stone-900 border font-mono">
                    {hajibBrothersCount >= 2 ? "1/6 (16.7%)" : "1/3 (33.3%)"}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-[#245642] dark:text-emerald-400">
                  {hajibBrothersCount >= 2 ? "4 of 24 Slices" : "8 of 24 Slices"}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {hajibBrothersCount >= 2
                    ? (isUr ? "۲ یا زائد بھائیوں کی موجودگی نے والدہ کے حصے کو ۱/۳ سے گھٹا کر ۱/۶ کر دیا۔" : "Reduced from 1/3 to 1/6 due to the presence of 2+ full/paternal brothers.")
                    : (isUr ? "چونکہ ۲ بھائی موجود نہیں ہیں، اس لیے والدہ کو پورا ۱/۳ ملا ہے۔" : "With zero or 1 brother, the mother retains her full uninhibited 1/3 share.")}
                </p>
              </div>

              {/* Father's Share Card */}
              <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{isUr ? "والد (Father)" : "Father"}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white dark:bg-stone-900 border font-mono text-blue-700 dark:text-blue-300">
                    {hajibBrothersCount >= 2 ? "5/6 (83.3%)" : "2/3 (66.7%)"}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-blue-800 dark:text-blue-400">
                  {hajibBrothersCount >= 2 ? "20 of 24 Slices" : "16 of 24 Slices"}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {hajibBrothersCount >= 2
                    ? (isUr ? "والدہ سے کٹنے والا ۱/۶ سیدھا والد کو منتقل ہو گیا، جس سے والد کا حصہ ۸۳.۳٪ ہو گیا!" : "The 1/6 cut from the mother transfers directly to the father, raising his share to 83.3%!")
                    : (isUr ? "والد قرابت کی بنا پر باقی ۲/۳ کا حقدار ہے۔" : "The father receives the remaining 2/3 (66.7%) by kinship.")}
                </p>
              </div>

              {/* Brothers Share Card (The Paradox!) */}
              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{isUr ? "بھائی (Brothers)" : "Brothers"}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 font-mono">
                    0.0% ($0.00)
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-stone-400">
                  0 Slices
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isUr
                    ? "بھائیوں کو خود ایک پیسہ بھی نہیں ملتا کیونکہ والد طبقہ ۱ میں ہے جبکہ بھائی طبقہ ۲ میں محجوب ہیں۔"
                    : "Brothers inherit zero dollars because the father is Tier 1, which 100% blocks siblings (Tier 2)."}
                </p>
              </div>
            </div>

            {/* The Juristic Wisdom Box */}
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 space-y-2">
              <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Info size={16} />
                <span>{isUr ? "اس حسابی معمہ کی شرعی و معاشی حکمت:" : "The Economic & Juristic Wisdom:"}</span>
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                {isUr
                  ? "اگر بھائیوں کو کچھ نہیں ملتا تو انہوں نے ماں کا حصہ کیوں گھٹایا؟ فقہ اسلامی کا جواب ہے: والد پر ان زیرِ کفالت بیٹوں کے نفقہ، اخراجات اور مستقبل کے مہر کی شرعی ذمہ داری عائد ہے۔ شریعت نے یہ ۱/۶ ماں سے نکال کر والد کے حوالے کیا تاکہ وہ ان بیٹوں کے اخراجات آسانی سے اٹھا سکے!"
                  : "Why do brothers reduce their mother's share if they receive nothing? In Islamic law, the father is legally obligated to maintain and fund the living costs and future mahr of these dependent sons. The Shariah routes the extra 1/6 to the father so he has the liquid capital to bear this household burden!"}
              </p>
              <span className="text-xs text-amber-800 dark:text-amber-400 block font-mono">
                Surah An-Nisa (4:11): «فَإِن كَانَ لَهُۥۤ إِخۡوَةࣱ فَلِأُمِّهِ ٱلسُّدُسُ»
              </span>
            </div>
          </div>

          {/* =================================================================
              PART 2: MULTIPLE WIVES EQUAL PARTITION (BI AL-SAWIYYAH)
              ================================================================= */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300">
                  {isUr ? "حصہ دوم: تعددِ ازواج میں مساوی تقسیم" : "Part 2: Multiple Wives Equal Partition (Bi al-Sawiyyah)"}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  {isUr ? "تمام بیواؤں کا قرآنی حصہ میں برابر کا اشتراک" : "Strict Mathematical Equality Among Surviving Wives"}
                </h4>
              </div>

              {/* Wives Slider Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-stone-500">{isUr ? "بیواؤں کی تعداد:" : "Wives:"}</span>
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setHajibWivesCount(w)}
                    className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      hajibWivesCount === w
                        ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    {w} {isUr ? "بیوہ" : (w === 1 ? "Wife" : "Wives")}
                  </button>
                ))}
              </div>
            </div>

            {/* Wives Calculation Display */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm sm:text-base flex items-center justify-between">
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {isUr ? "کُل قرآنی زوجی حصہ (اولاد کی موجودگی میں):" : "Collective Spousal Quranic Fraction (with children):"}
                </span>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-lg">1/8 (12.5%)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: hajibWivesCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#12241c] border-2 border-sky-400 dark:border-sky-600 shadow-sm space-y-1.5 text-center"
                  >
                    <span className="text-xs font-bold text-sky-800 dark:text-sky-300 block">
                      {isUr ? `زوجہ (بیوہ) نمبر ${idx + 1}` : `Wife ${idx + 1}`}
                    </span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#245642] dark:text-emerald-400">
                      {hajibWivesCount === 1 ? "1/8" : hajibWivesCount === 2 ? "1/16" : hajibWivesCount === 3 ? "1/24" : "1/32"}
                    </div>
                    <span className="text-xs text-stone-500 font-mono font-semibold block">
                      {(12.5 / hajibWivesCount).toFixed(2)}% of estate
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {isUr
                  ? "فقہ جعفریہ میں پہلی اور دوسری بیوہ کے حصے میں کوئی فرق نہیں ہوتا۔ خواہ کسی کے بچے ہوں یا نہ ہوں، قرآنی ۱/۸ تمام بیواؤں میں بالکلیہ بالسویہ (برابر) تقسیم ہوتا ہے۔"
                  : "In Ja'fari jurisprudence, co-wives enjoy absolute parity. Regardless of marriage duration or who bore children, the collective 1/8 pool is split with mathematical equality."}
              </p>
            </div>
          </div>

          {/* =================================================================
              PART 3: REAL ESTATE DIVIDE (SOIL VS. BRICKS)
              ================================================================= */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#10241b] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-300">
                  {isUr ? "حصہ سوم: زمین کی مٹی بنام ملبہ و عمارت" : "Part 3: Real Estate (Land vs. Buildings)"}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  {isUr ? "بیوہ کا رئیل اسٹیٹ میں حق: مٹی کی ملکیت یا نقدی قیمت؟" : "The Widow's Real Estate Title: Soil vs. Cash Valuation"}
                </h4>
              </div>

              {/* School Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHajibMarjaSchool("sistani")}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    hajibMarjaSchool === "sistani"
                      ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                  }`}
                >
                  {isUr ? "آیت اللہ سیستانی / خامنہ ای" : "Sayyid Sistani / Khamenei"}
                </button>
                <button
                  type="button"
                  onClick={() => setHajibMarjaSchool("khoei")}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    hajibMarjaSchool === "khoei"
                      ? "bg-[#245642] text-white shadow-md ring-2 ring-emerald-500/20"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                  }`}
                >
                  {isUr ? "آیت اللہ خوئی / متقدمین" : "Sayyid Khoei & Classical"}
                </button>
              </div>
            </div>

            {/* Illustrative Property Appraisal Display */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3">
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {isUr ? "فرضی خاندانی مکان کی کل مالیت:" : "Reference Property Value:"}
                </span>
                <div className="flex items-center gap-3 font-mono font-bold">
                  <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Trees size={15} /> Land: $10,000,000
                  </span>
                  <span>+</span>
                  <span className="text-blue-700 dark:text-blue-400 flex items-center gap-1">
                    <Building2 size={15} /> Building: $6,000,000
                  </span>
                  <span>=</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-black text-base">$16,000,000</span>
                </div>
              </div>

              {/* Dynamic Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div
                  className={`p-6 rounded-2xl border transition-all space-y-3 ${
                    hajibMarjaSchool === "sistani"
                      ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                      : "bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 opacity-60"
                  }`}
                >
                  <strong className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200 block">
                    {isUr ? "فتویٰ آیت اللہ سیستانی / خامنہ ای:" : "Ruling: Sayyid Sistani & Khamenei:"}
                  </strong>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>{isUr ? "زمین کی نقدی قیمت سے حصہ (1/8):" : "Cash value of land (1/8):"}</span>
                      <span className="font-mono font-bold">$1,250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUr ? "عمارت و ملبہ سے حصہ (1/8):" : "Cash value of building (1/8):"}</span>
                      <span className="font-mono font-bold">$750,000</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-300 dark:border-emerald-800 flex justify-between font-bold text-base text-emerald-900 dark:text-emerald-200">
                      <span>{isUr ? "کُل واجب الادا نقدی:" : "Total Cash Entitlement:"}</span>
                      <span className="font-mono font-black">$2,000,000</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                    {isUr
                      ? "بیوہ تمام قسم کی زمین (رہائشی، تجارتی، زرعی) کی مالیاتی قیمت سے ۱/۸ نقدی وصول کرتی ہے۔"
                      : "The widow inherits 1/8 from the cash valuation of ALL land (residential, commercial, agricultural) + structures."}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border transition-all space-y-3 ${
                    hajibMarjaSchool === "khoei"
                      ? "bg-amber-50/80 dark:bg-amber-950/30 border-amber-500 shadow-md ring-2 ring-amber-500/20"
                      : "bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 opacity-60"
                  }`}
                >
                  <strong className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200 block">
                    {isUr ? "فتویٰ آیت اللہ خوئی و فقہائے متقدمین:" : "Ruling: Sayyid Khoei & Classical Jurists:"}
                  </strong>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between text-rose-600 dark:text-rose-400">
                      <span>{isUr ? "زمین کی مٹی سے حصہ:" : "Entitlement from soil/land:"}</span>
                      <span className="font-mono font-bold">$0.00 (Zero)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUr ? "عمارت، درخت و ملبہ سے حصہ (1/8):" : "Cash value of building/trees (1/8):"}</span>
                      <span className="font-mono font-bold">$750,000</span>
                    </div>
                    <div className="pt-2 border-t border-amber-300 dark:border-amber-800 flex justify-between font-bold text-base text-amber-900 dark:text-amber-200">
                      <span>{isUr ? "کُل واجب الادا نقدی:" : "Total Cash Entitlement:"}</span>
                      <span className="font-mono font-black">$750,000</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
                    {isUr
                      ? "بیوہ زمین کی مٹی سے کچھ نہیں پاتی؛ صرف اینٹ، پتھر، درخت اور تعمیراتی ڈھانچے کی قیمت سے ۱/۸ لیتی ہے۔"
                      : "The widow receives zero from the physical soil or land value; her 1/8 is strictly from the appraised value of bricks and trees."}
                  </p>
                </div>
              </div>

              {/* Crucial Safeguard Notice */}
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {isUr
                    ? "اہم فقہی نکتہ: دونوں فتاویٰ کے مطابق بیوہ کو زمین پر قابض ہو کر مکان توڑنے کا حق نہیں ہوتا، بلکہ دیگر ورثاء مکان کی شرعی قیمت لگوا کر بیوہ کو اس کا پورا حصہ نقد ادا کرتے ہیں۔"
                    : "Universal Legal Safeguard: Under both schools, the widow does not physically partition or divide the soil. Instead, the heirs must appraise the property and pay her full entitlement in cash to safeguard the family homestead."}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
