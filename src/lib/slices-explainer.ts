import { HeirShareResult } from "@/types/fiqh";

/** Greatest Common Divisor */
function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/** Least Common Multiple */
function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export interface HeirSliceDetail {
  id: string;
  relationKey: string;
  orderNumber: 1 | 2 | 3;
  orderBadgeEn: string;
  orderBadgeUr: string;
  orderBadgeColor: string; // Tailwind class
  sliceCount: number;
  totalSlices: number;
  fractionDisplay: string;
  percentage: number;
  monetaryShare: number;
  plainExplanationEn: string;
  plainExplanationUr: string;
  derivationStepEn: string;
  derivationStepUr: string;
}

export interface EstateSlicesAnalysis {
  totalSlices: number;
  baseDenominator: number;
  childSharesCount: number;
  whySlicesStoryEn: string;
  whySlicesStoryUr: string;
  stepByStepDerivationEn: {
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };
  stepByStepDerivationUr: {
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };
  heirSlices: HeirSliceDetail[];
}

/**
 * Analyzes the list of heir shares and builds the plain-language
 * "Estate Slices" story explaining why the total slices is 48, 24, 72, etc.
 */
export function analyzeEstateSlices(
  heirShares: HeirShareResult[],
  currency: string = "Rs."
): EstateSlicesAnalysis {
  if (!heirShares || heirShares.length === 0) {
    return {
      totalSlices: 1,
      baseDenominator: 1,
      childSharesCount: 1,
      whySlicesStoryEn: "No heirs currently present.",
      whySlicesStoryUr: "اس منظر نامے میں کوئی شرعی وارث موجود نہیں ہے۔",
      stepByStepDerivationEn: {
        step1Title: "Starting Base",
        step1Body: "Awaiting family heir details.",
        step2Title: "Children Breakdown",
        step2Body: "No children added.",
        step3Title: "Final Slices",
        step3Body: "1 whole slice.",
      },
      stepByStepDerivationUr: {
        step1Title: "ابتدائی بنیاد",
        step1Body: "ورثاء کی تفصیلات کا انتظار ہے۔",
        step2Title: "اولاد کی تقسیم",
        step2Body: "کوئی اولاد شامل نہیں ہے۔",
        step3Title: "حتمی حصے",
        step3Body: "مکمل ترکہ۔",
      },
      heirSlices: [],
    };
  }

  // Find least common multiple of all fractions
  const denominators = heirShares
    .map((h) => h.fractionDenominator)
    .filter((d) => typeof d === "number" && d > 0);

  const totalSlices = denominators.reduce((acc, curr) => lcm(acc, curr), 1) || 48;

  // Identify spouse, parents, and children
  const spouse = heirShares.find((h) => h.relationKey === "wife" || h.relationKey === "wives" || h.relationKey === "husband");
  const mother = heirShares.find((h) => h.relationKey === "mother");
  const father = heirShares.find((h) => h.relationKey === "father");
  const sons = heirShares.find((h) => h.relationKey === "son" || h.relationKey === "sons");
  const daughters = heirShares.find((h) => h.relationKey === "daughter" || h.relationKey === "daughters");

  const sonsCount = sons?.count || 0;
  const daughtersCount = daughters?.count || 0;
  // Quranic 2:1 child shares: each son counts as 2, each daughter as 1
  const childSharesCount = sonsCount * 2 + daughtersCount;

  // Detect base fraction before multiplying by children (e.g. 8 for wife 1/8, or 24 for wife 1/8 + parents 1/6)
  const baseDenominator = spouse
    ? (mother || father ? 24 : 8)
    : (mother || father ? 6 : totalSlices);

  // Construct Plain-Language "Why 48 (or 24, 72)?" Story
  let whySlicesStoryEn = "";
  let whySlicesStoryUr = "";

  if (spouse && childSharesCount > 0) {
    const spouseFraction = spouse.fractionString || "1/8";
    const spouseNumerator = spouse.fractionNumerator;
    const spouseDenominator = spouse.fractionDenominator;
    const initialSlicesForSpouse = (totalSlices / spouseDenominator) * spouseNumerator;
    const remainingSlices = totalSlices - initialSlicesForSpouse;
    const slicesPerChildUnit = childSharesCount > 0 ? remainingSlices / childSharesCount : 0;

    whySlicesStoryEn = `Why cut the estate into ${totalSlices} equal slices? To give everyone whole slices with zero crumbs! First, the wife is entitled to her fixed Quranic ${spouseFraction}th. Then, the remaining estate must be split among the children in a 2:1 ratio (2 shares per son, 1 per daughter), which totals ${childSharesCount} shares. Because the remaining portion does not divide into ${childSharesCount} clean whole numbers, we multiplied the original base of 8 by ${childSharesCount} family shares, creating exactly ${totalSlices} slices. Out of ${totalSlices}, the wife takes ${initialSlicesForSpouse} slices (${spouseFraction}), leaving ${remainingSlices} slices for the children (${slicesPerChildUnit} slices per share).`;

    whySlicesStoryUr = `ترکے کو کُل ${totalSlices} برابر حصوں (Slices) میں کیوں بانٹا گیا؟ تاکہ کسی کسر یا اعشاریہ کے بغیر ہر ایک کو پورا حصہ مل سکے۔ سب سے پہلے زوجہ/بیوہ کو قرآنی حصہ (${spouseFraction}) دیا جاتا ہے۔ اس کے بعد بقیہ ترکہ بچوں میں ۲:۱ کے تناسب سے تقسیم ہوتا ہے جس کے کُل ${childSharesCount} حصے بنتے ہیں۔ چونکہ بقیہ رقم ${childSharesCount} پر پورا پورا تقسیم نہیں ہوتی تھی، اس لیے اصل بنیاد ۸ کو ${childSharesCount} حصوں سے ضرب دے کر کُل ${totalSlices} حصے بنا لیے گئے۔ ان میں سے بیوہ کو ${initialSlicesForSpouse} حصے (${spouseFraction}) ملے، اور باقی ${remainingSlices} حصے بچوں میں تقسیم ہوئے (${slicesPerChildUnit} حصے فی اکائی)۔`;
  } else {
    whySlicesStoryEn = `The entire estate is divided into ${totalSlices} equal units (common denominator). Each heir receives their designated whole number of slices according to Quranic decrees without fractional remainders.`;
    whySlicesStoryUr = `مکمل ترکے کو حسابی طور پر ${totalSlices} برابر اکائیوں (مشترک مخرج) میں تقسیم کیا گیا ہے تاکہ ہر شرعی وارث کو اپنا پورا حصہ مل سکے۔`;
  }

  // Step-by-step breakdown
  const stepByStepDerivationEn = {
    step1Title: "Step 1: Carve Out the First Priority (Spouse / Parents)",
    step1Body: spouse
      ? `The surviving spouse has an unalterable fixed Quranic reserve (${spouse.fractionString || "1/8"}). This must be taken out of the estate first before anyone else.`
      : "Primary fixed sharers (Parents) receive their statutory Quranic reserve first.",
    step2Title: `Step 2: Calculate Children's Share Units (2:1 Ratio)`,
    step2Body:
      childSharesCount > 0
        ? `${sonsCount} Son(s) × 2 shares + ${daughtersCount} Daughter(s) × 1 share = ${childSharesCount} total family share units needed.`
        : "No children present; remainder passes to parents or subsequent bloodline class.",
    step3Title: `Step 3: Harmonize the Estate into ${totalSlices} Clean Slices`,
    step3Body:
      childSharesCount > 0
        ? `Multiplying the base ${baseDenominator} by ${childSharesCount} child units gives ${totalSlices} slices. This guarantees every son and daughter gets a clean whole-number slice with zero decimals!`
        : `All shares fit cleanly into ${totalSlices} total slices without arithmetic deficit.`,
  };

  const stepByStepDerivationUr = {
    step1Title: "پہلا مرحلہ: ترجیحی قرآنی حصہ (بیوی یا والدین)",
    step1Body: spouse
      ? `سب سے پہلے شریکِ حیات کا قطعی قرآنی حصہ (${spouse.fractionString || "۱/۸"}) منہا کیا جاتا ہے، کیونکہ یہ سب سے پہلا شرعی حق ہے۔`
      : "والدین کو ان کا مقررہ قرآنی حصہ سب سے پہلے ادا کیا جاتا ہے۔",
    step2Title: `دوسرا مرحلہ: اولاد کے حصص کا تعین (۲:۱ کا تناسب)`,
    step2Body:
      childSharesCount > 0
        ? `${sonsCount} بیٹا (ہر ایک کے ۲ حصے) + ${daughtersCount} بیٹی (ہر ایک کا ۱ حصہ) = کُل ${childSharesCount} حصے درکار ہیں۔`
        : "اولاد موجود نہیں؛ بقیہ ترکہ والدین یا اگلے طبقے کو منتقل ہوتا ہے۔",
    step3Title: `تیسرا مرحلہ: کُل ترکے کو ${totalSlices} برابر حصوں میں بدلنا`,
    step3Body:
      childSharesCount > 0
        ? `ابتدائی مخرج ${baseDenominator} کو ${childSharesCount} حصوں سے ضرب دے کر کُل ${totalSlices} حصے بنا لیے گئے۔ اس طرح ہر بیٹے اور بیٹی کو اعشاریہ کے بغیر پورے حصے ملتے ہیں!`
        : `تمام حصص بغیر کسی کمی کے کُل ${totalSlices} حصوں میں مکمل تقسیم ہو جاتے ہیں۔`,
  };

  // Build per-heir slice breakdown
  const heirSlices: HeirSliceDetail[] = heirShares.map((share) => {
    const isSpouse = share.tier === 0 || share.relationKey === "wife" || share.relationKey === "wives" || share.relationKey === "husband";
    const isParent = share.relationKey === "father" || share.relationKey === "mother";
    const isChild = share.relationKey === "son" || share.relationKey === "sons" || share.relationKey === "daughter" || share.relationKey === "daughters";

    let orderNumber: 1 | 2 | 3 = 2;
    let orderBadgeEn = "2nd in Order: Residue";
    let orderBadgeUr = "دوسرا درجہ: بقیہ ترکہ";
    let orderBadgeColor = "bg-purple-100 text-purple-900 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300";

    if (isSpouse) {
      orderNumber = 1;
      orderBadgeEn = "1st in Order: Priority Spouse Reserve";
      orderBadgeUr = "پہلا درجہ: سب سے پہلے بیوی کا حق";
      orderBadgeColor = "bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300";
    } else if (isParent) {
      orderNumber = 1;
      orderBadgeEn = "1st in Order: Priority Parents Reserve";
      orderBadgeUr = "پہلا درجہ: سب سے پہلے والدین کا حق";
      orderBadgeColor = "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300";
    } else if (share.notes.some((n) => n.toLowerCase().includes("radd") || n.toLowerCase().includes("return"))) {
      orderNumber = 3;
      orderBadgeEn = "3rd in Order: Surplus Return (Radd)";
      orderBadgeUr = "تیسرا درجہ: رد (فاضل ترکے کی واپسی)";
      orderBadgeColor = "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300";
    }

    const calculatedSlice = Math.round((totalSlices / share.fractionDenominator) * share.fractionNumerator);

    let derivationStepEn = "";
    let derivationStepUr = "";
    let plainExplanationEn = "";
    let plainExplanationUr = "";

    if (isSpouse) {
      derivationStepEn = `1/8 of ${totalSlices} total slices = ${calculatedSlice} slices.`;
      derivationStepUr = `کُل ${totalSlices} حصوں کا ۱/۸ حصہ = ${calculatedSlice} پورے۔`;
      plainExplanationEn = `Receives ${calculatedSlice} out of ${totalSlices} total estate slices first before anyone else. This is her guaranteed Quranic reserve.`;
      plainExplanationUr = `کُل ${totalSlices} حصوں میں سے سب سے پہلے ${calculatedSlice} حصے ملتے ہیں، جو کہ قرآنی حکم کے تحت ان کا طے شدہ حق ہے۔`;
    } else if (share.relationKey === "son" || share.relationKey === "sons") {
      const perSonSlices = share.count > 0 ? Math.round(calculatedSlice / share.count) : calculatedSlice;
      derivationStepEn = `Each son receives 2 share units (2 × ${(calculatedSlice / (share.count * 2 || 1)).toFixed(0)} = ${perSonSlices} slices).`;
      derivationStepUr = `ہر بیٹے کو ۲ حصے ملتے ہیں (${perSonSlices} پورے۔ کُل بیٹے مل کر ${calculatedSlice} پورے۔)`;
      plainExplanationEn = `Each son receives ${perSonSlices} slices out of ${totalSlices} (${share.percentage.toFixed(1)}%), exactly double a daughter's share as commanded in the Quran.`;
      plainExplanationUr = `ہر بیٹے کو ${totalSlices} میں سے ${perSonSlices} حصے (${share.percentage.toFixed(1)}٪) ملتے ہیں، جو کہ قرآنی حکم کے مطابق بیٹی سے دگنا ہے۔`;
    } else if (share.relationKey === "daughter" || share.relationKey === "daughters") {
      const perDaughterSlices = share.count > 0 ? Math.round(calculatedSlice / share.count) : calculatedSlice;
      derivationStepEn = `Each daughter receives 1 share unit = ${perDaughterSlices} slices out of ${totalSlices}.`;
      derivationStepUr = `ہر بیٹی کو ۱ حصہ = ${totalSlices} میں سے ${perDaughterSlices} حصے۔`;
      plainExplanationEn = `Each daughter receives ${perDaughterSlices} slices out of ${totalSlices} (${share.percentage.toFixed(1)}%). All daughters share this residuary rate equally.`;
      plainExplanationUr = `ہر بیٹی کو ${totalSlices} میں سے ${perDaughterSlices} حصے (${share.percentage.toFixed(1)}٪) ملتے ہیں۔ تمام بیٹیاں اس شرح پر برابر کی شریک ہیں۔`;
    } else {
      derivationStepEn = `${share.fractionString || "Fractional share"} = ${calculatedSlice} out of ${totalSlices} slices.`;
      derivationStepUr = `${share.fractionString || "شرعی کسر"} = ${totalSlices} میں سے ${calculatedSlice} حصے۔`;
      plainExplanationEn = `Receives ${calculatedSlice} of ${totalSlices} slices (${share.percentage.toFixed(1)}%) based on statutory kinship priority.`;
      plainExplanationUr = `شرعی قرابت کے مطابق ${totalSlices} میں سے ${calculatedSlice} حصے (${share.percentage.toFixed(1)}٪) ملتے ہیں۔`;
    }

    return {
      id: share.id || share.relationKey,
      relationKey: share.relationKey,
      orderNumber,
      orderBadgeEn,
      orderBadgeUr,
      orderBadgeColor,
      sliceCount: calculatedSlice,
      totalSlices,
      fractionDisplay: share.fractionString || `${calculatedSlice}/${totalSlices}`,
      percentage: share.percentage,
      monetaryShare: share.totalMonetaryShare,
      plainExplanationEn,
      plainExplanationUr,
      derivationStepEn,
      derivationStepUr,
    };
  });

  // Sort by orderNumber (1st Priority first, 2nd Priority next, 3rd last)
  heirSlices.sort((a, b) => a.orderNumber - b.orderNumber);

  return {
    totalSlices,
    baseDenominator,
    childSharesCount,
    whySlicesStoryEn,
    whySlicesStoryUr,
    stepByStepDerivationEn,
    stepByStepDerivationUr,
    heirSlices,
  };
}
