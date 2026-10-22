import { InheritanceCalculationResult, HeirShareResult, DeceasedInfo } from "@/types/fiqh";

export interface PlainStoryStep {
  stepNumber: number;
  badgeEn: string;
  badgeUr: string;
  titleEn: string;
  titleUr: string;
  narrativeEn: string;
  narrativeUr: string;
  slicesDetail?: {
    slicesCount: number;
    totalSlices: number;
    fractionStr: string;
  };
}

export interface PlainStorySummaryRow {
  heirKey: string;
  heirTitleEn: string;
  heirTitleUr: string;
  count: number;
  slicesOutOfTotal: string; // e.g. "7 out of 32 slices"
  slicesOutOfTotalUr: string; // e.g. "۳۲ میں سے ۷ حصے"
  fraction: string;         // e.g. "7/32"
  percentage: string;       // e.g. "21.9%"
  moneyFormatted: string;   // e.g. "PKR 1,093,750"
}

export interface PlainLanguageStory {
  commonDenominator: number; // e.g. 32
  headlineEn: string;
  headlineUr: string;
  introCakeAnalogyEn: string;
  introCakeAnalogyUr: string;
  steps: PlainStoryStep[];
  specialClauses: {
    type: "habwah" | "widow_land" | "debts" | "tanzil" | "hajb";
    titleEn: string;
    titleUr: string;
    textEn: string;
    textUr: string;
  }[];
  summaryRows: PlainStorySummaryRow[];
  takeawayQuoteEn: string;
  takeawayQuoteUr: string;
}

// Helper to get greatest common divisor and least common multiple
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Friendly titles for heirs
export function getFriendlyHeirTitle(h: HeirShareResult): { en: string; ur: string; icon: string } {
  const k = h.relationKey.toLowerCase();
  if (k.includes("wife") || k.includes("wives")) return { en: "Wife / Widow", ur: "اہلیہ / بیوہ (زوجہ)", icon: "💍" };
  if (k.includes("husband")) return { en: "Husband", ur: "شوہر (زوج)", icon: "🎩" };
  if (k.includes("son")) return { en: h.count > 1 ? `Sons (${h.count})` : "Son", ur: h.count > 1 ? `${h.count} بیٹے` : "بیٹا", icon: "👦" };
  if (k.includes("daughter")) return { en: h.count > 1 ? `Daughters (${h.count})` : "Daughter", ur: h.count > 1 ? `${h.count} بیٹیاں` : "بیٹی", icon: "👧" };
  if (k.includes("father")) return { en: "Father", ur: "والدِ محترم", icon: "👴" };
  if (k.includes("mother")) return { en: "Mother", ur: "والدہ ماجدہ", icon: "👵" };
  if (k.includes("pota") || k.includes("grandson")) return { en: "Grandson (Tanzīl)", ur: "پوتا (تنزيل)", icon: "👶" };
  if (k.includes("poti") || k.includes("granddaughter")) return { en: "Granddaughter (Tanzīl)", ur: "پوتی (تنزيل)", icon: "👶" };
  if (k.includes("nawasa")) return { en: "Maternal Grandson (Tanzīl)", ur: "نواسا (تنزيل)", icon: "👶" };
  if (k.includes("nawasi")) return { en: "Maternal Granddaughter (Tanzīl)", ur: "نواسی (تنزيل)", icon: "👶" };
  if (k.includes("fullbrother") || k.includes("brother")) return { en: "Brother", ur: "سگا بھائی", icon: "👨" };
  if (k.includes("fullsister") || k.includes("sister")) return { en: "Sister", ur: "سگی بہن", icon: "👩" };
  return { en: h.relationKey, ur: h.relationKey, icon: "👤" };
}

export function generatePlainLanguageStory(
  result: InheritanceCalculationResult,
  deceased: DeceasedInfo
): PlainLanguageStory {
  const activeHeirs = result.heirShares.filter((h) => h.totalMonetaryShare > 0 || h.percentage > 0);
  const currency = deceased.currency || "PKR";
  const netEstate = result.balanceSheet?.netDistributableEstate || 0;

  // 1. Calculate Least Common Multiple (LCM) across all active heir fraction denominators
  // to establish the total number of "Cake Slices"
  let commonDenom = 1;
  activeHeirs.forEach((h) => {
    if (h.fractionDenominator && h.fractionDenominator > 0 && h.fractionDenominator <= 120) {
      commonDenom = lcm(commonDenom, h.fractionDenominator);
    }
  });

  // Fallback sanity: if commonDenom is 1 or unreasonable (> 120), use standard base
  if (commonDenom <= 1 || commonDenom > 120) {
    commonDenom = 24;
  }

  // Calculate slice count for each heir
  const heirSlices = activeHeirs.map((h) => {
    let slices = 0;
    if (h.fractionDenominator && h.fractionNumerator) {
      slices = Math.round((h.fractionNumerator / h.fractionDenominator) * commonDenom);
    } else {
      slices = Math.round((h.percentage / 100) * commonDenom);
    }
    return {
      heir: h,
      slices,
    };
  });

  // Ensure total slices equals commonDenom
  const totalCalculatedSlices = heirSlices.reduce((sum, s) => sum + s.slices, 0);
  if (totalCalculatedSlices !== commonDenom && heirSlices.length > 0) {
    const diff = commonDenom - totalCalculatedSlices;
    heirSlices[0].slices += diff;
  }

  // 2. Identify key family roles
  const spouseEntry = heirSlices.find((s) => s.heir.tier === 0);
  const fatherEntry = heirSlices.find((s) => s.heir.relationKey.toLowerCase().includes("father"));
  const motherEntry = heirSlices.find((s) => s.heir.relationKey.toLowerCase().includes("mother"));
  const sonsEntry = heirSlices.find((s) => s.heir.relationKey.toLowerCase().includes("son") && !s.heir.relationKey.toLowerCase().includes("grand"));
  const daughtersEntry = heirSlices.find((s) => s.heir.relationKey.toLowerCase().includes("daughter") && !s.heir.relationKey.toLowerCase().includes("grand"));

  const steps: PlainStoryStep[] = [];
  let stepCounter = 1;

  // STEP 1: Total Estate Definition & Debt Clearance (if debts existed)
  const debtsTotal = result.balanceSheet?.totalDebts || 0;
  if (debtsTotal > 0) {
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Step 1: Debt Clearance",
      badgeUr: "مرحلہ ۱: ادائے دیون و اخراجات",
      titleEn: "Debts and Funeral Paid First",
      titleUr: "سب سے پہلے قرض اور تجہیز کی ادائیگی",
      narrativeEn: `Before any inheritance is calculated, Islamic law mandates discharging funeral costs, debts, and religious obligations (${debtsTotal.toLocaleString()} ${currency}). Only the net remaining wealth (${netEstate.toLocaleString()} ${currency}) is divided among the heirs.`,
      narrativeUr: `وراثت تقسیم کرنے سے پہلے شریعت کا حکم ہے کہ میت کے کفن دفن، قرضہ جات اور مہر وغیرہ (${debtsTotal.toLocaleString()} ${currency}) ادا کیے جائیں۔ اس کے بعد جو خالص مال (${netEstate.toLocaleString()} ${currency}) بچا، وہی اصل ورثاء میں تقسیم ہوگا۔`,
    });
  }

  // STEP 2: The Spouse Fixed Slice (if spouse exists)
  if (spouseEntry) {
    const isWife = spouseEntry.heir.relationKey.toLowerCase().includes("wife");
    const spouseFraction = spouseEntry.heir.fractionString;
    const spouseSlices = spouseEntry.slices;
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Spousal Share",
      badgeUr: "میاں / بیوی کا حصہ",
      titleEn: `${isWife ? "Wife's" : "Husband's"} Guaranteed Quranic Share`,
      titleUr: `${isWife ? "اہلیہ (بیوہ)" : "شوہر"} کا قرآنی مقررہ حصہ`,
      narrativeEn: `The ${isWife ? "wife" : "husband"} receives their fixed Quranic portion of ${spouseFraction} (${spouseSlices} out of ${commonDenom} slices). Under Shia Ja'fari law, spouses receive their full divine portion, but they never take from any leftover surplus (Radd) when direct blood family is alive.`,
      narrativeUr: `${isWife ? "بیوہ" : "شوہر"} کو قرآنِ مجید کے مطابق ان کا طے شدہ حصہ ${spouseFraction} (یعنی ${commonDenom} میں سے ${spouseSlices} حصے) دیا جاتا ہے۔ فقہ جعفریہ میں میاں یا بیوی کو ان کا پورا حق ملتا ہے، لیکن وہ خونی رشتہ داروں کی موجودگی میں بچی ہوئی رقم (رد) کے حقدار نہیں بنتے۔`,
      slicesDetail: {
        slicesCount: spouseSlices,
        totalSlices: commonDenom,
        fractionStr: spouseFraction,
      },
    });
  }

  // STEP 3: Remaining Slices & Repudiation of Ta'sib
  const spouseSlicesCount = spouseEntry ? spouseEntry.slices : 0;
  const remainingSlices = commonDenom - spouseSlicesCount;
  const bloodHeirsCount = heirSlices.filter((s) => s.heir.tier !== 0).length;

  if (bloodHeirsCount > 0 && spouseEntry) {
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Repudiation of Ta'ṣīb",
      badgeUr: "ابطالِ تعصیب (اہلبیت کا قانون)",
      titleEn: "The Entire Remainder Stays With Direct Blood Family",
      titleUr: "باقی تمام مال صرف قریبی خونی ورثاء کے لیے",
      narrativeEn: `After giving the spouse their share, ${remainingSlices} slices remain. Unlike other schools of law that might give this surplus to distant paternal uncles or male cousins, Shia Ja'fari law strictly follows the Quranic principle: "Blood relatives are nearer to one another". Distant relatives receive ZERO; all ${remainingSlices} slices remain strictly with the closest immediate family.`,
      narrativeUr: `اہلیہ کا حصہ نکالنے کے بعد ترکے کے ${remainingSlices} حصے بچ جاتے ہیں۔ قبل از اسلام کے رواج یا دیگر فقہوں کے برعکس، فقہ جعفریہ میں قرآن کی آیت "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ" کے تحت دور کے چچا یا تایا کو ایک دھیلا نہیں دیا جاتا؛ یہ تمام ${remainingSlices} حصے صرف اور صرف قریبی ترین خونی ورثاء ہی میں تقسیم ہوں گے۔`,
    });
  }

  // STEP 4: Distribution of the Remainder Among Blood Heirs
  if (sonsEntry && daughtersEntry) {
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Direct Children Distribution",
      badgeUr: "بیٹے اور بیٹیوں میں تقسیم",
      titleEn: "Sons and Daughters Divide in a 2:1 Divine Ratio",
      titleUr: "بیٹے اور بیٹی میں ۲ اور ۱ کا تناسب",
      narrativeEn: `The children divide the remaining estate so that each son receives twice the share of each daughter (2 parts per son, 1 part per daughter). This provides the sons with double because Islamic law places the entire future financial obligation of family maintenance (Nafaqah) solely on men.`,
      narrativeUr: `اولاد میں ترکہ اس طرح تقسیم ہوتا ہے کہ ہر بیٹے کو بیٹی کے مقابلے میں دوگنا ملتا ہے (بیٹے کے ۲ حصے اور بیٹی کا ۱ حصہ)، کیونکہ اسلام میں گھر اور اہل و عیال کے نان و نفقہ کی ساری مالی ذمہ داری مرد کے کندھوں پر ڈالی گئی ہے۔`,
    });
  } else if (daughtersEntry && (fatherEntry || motherEntry)) {
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Surplus Return (Radd)",
      badgeUr: "بچے ہوئے مال کی واپسی (رد)",
      titleEn: "Proportional Sharing of the Surplus",
      titleUr: "بچے ہوئے ترکے کی متناسب تقسیم",
      narrativeEn: `The daughter and parents divide the remaining ${remainingSlices} slices according to their Quranic ratios (a single daughter receives 3 parts for every 1 part received by a parent). Both the daughter and parent receive their baseline Quranic share PLUS their fair proportion of the leftover surplus, ensuring 100% of the estate is distributed.`,
      narrativeUr: `بیٹی اور والدین ان باقی بچ جانے والے ${remainingSlices} حصوں کو اپنے قرآنی تناسب کے مطابق تقسیم کرتے ہیں (اکیلی بیٹی کو والدین کے ۱ حصے کے مقابلے میں ۳ حصے ملتے ہیں)۔ اس طرح بیٹی اور والدین دونوں اپنے بنیادی حق کے ساتھ ساتھ بچی ہوئی رقم میں سے بھی اپنا متناسب حصہ پاتے ہیں اور پورا ۱۰۰٪ ترکہ مکمل تقسیم ہو جاتا ہے۔`,
    });
  } else if (activeHeirs.length === 1) {
    const soleHeir = activeHeirs[0];
    const title = getFriendlyHeirTitle(soleHeir);
    steps.push({
      stepNumber: stepCounter++,
      badgeEn: "Sole Heir",
      badgeUr: "تنہا وارث",
      titleEn: `${title.en} Receives 100% of the Estate`,
      titleUr: `${title.ur} تمام ترکے کے مالک`,
      narrativeEn: `Because ${title.en} is the only surviving heir in this tier, they receive their initial Quranic baseline, and all remaining surplus returns to them via Radd, giving them all ${commonDenom} out of ${commonDenom} slices (100%).`,
      narrativeUr: `چونکہ اس طبقے میں صرف ${title.ur} ہی حیات ہیں، اس لیے بنیادی حق کے ساتھ ساتھ باقی سارا ترکہ بھی "رد" کے ذریعے انہی کو مل جاتا ہے، یعنی پورے ${commonDenom} میں سے ${commonDenom} حصے (۱۰۰٪)۔`,
    });
  }

  // STEP 5: Special Legal Clauses
  const specialClauses: PlainLanguageStory["specialClauses"] = [];

  if (result.habwahAwarded) {
    specialClauses.push({
      type: "habwah",
      titleEn: "Ḥabwah (Father's Sacred Legacy Granted to Eldest Son)",
      titleUr: "حبوہ (والد کی چار ذاتی اشیاء بڑے بیٹے کے نام)",
      textEn: "Before general distribution, the eldest living sane son receives the deceased father's 4 personal items: his Qur'an, ring, personal clothes, and sword/defensive weapon. In exchange for this sacred gift, the eldest son shoulders the moral and religious duty to fulfill any missed prayers and fasts of his deceased father.",
      textUr: "عام وراثت تقسیم ہونے سے پہلے مرحوم والد کی چار ذاتی چیزیں (قرآن مجید، انگوٹھی، تلوار یا ذاتی اسلحہ، اور پہنے ہوئے کپڑے) بڑے بیٹے کو ملتی ہیں۔ اس کے بدلے میں بڑے بیٹے پر والد کی چھوٹی ہوئی نمازوں اور روزوں کی قضا ادا کرنا شرعاً واجب ہو جاتی ہے۔",
    });
  }

  if (result.motherHujubNuqsanApplied) {
    specialClauses.push({
      type: "hajb",
      titleEn: "Mother's Share Reduced (Ḥajb al-Nuqṣān)",
      titleUr: "ماں کے حصے میں تخفیف (حجبِ نقصان)",
      textEn: "A mother normally inherits 1/3. However, because the deceased left behind direct children or multiple living brothers, the mother's share is reduced to 1/6 so that more property remains to care for the immediate family.",
      textUr: "ماں کا عام حصہ ۱/۳ ہوتا ہے۔ لیکن چونکہ میت کی اولاد یا سگے بھائی موجود ہیں، اس لیے ماں کا حصہ گھٹ کر ۱/۶ رہ گیا ہے تاکہ میت کے اپنے گھرانے کے لیے زیادہ ترکہ بچ سکے۔",
    });
  }

  if (spouseEntry && spouseEntry.heir.relationKey.toLowerCase().includes("wife")) {
    specialClauses.push({
      type: "widow_land",
      titleEn: `Widow's Property Entitlement (${deceased.marja.toUpperCase()} Ruling)`,
      titleUr: `بیوہ کا جائیداد میں حق (فتویٰ: ${deceased.marja.toUpperCase()})`,
      textEn: result.widowLandRuleApplied?.explanation || "The widow inherits from cash, movable goods, and buildings/trees as prescribed by Ja'fari jurisprudence.",
      textUr: "فقہ جعفریہ کے مطابق بیوہ نقدی، سونے اور مکان و درختوں کی قیمت میں سے اپنا حصہ پاتی ہے تاکہ خاندانی زمین میں تنازعات نہ ہوں۔",
    });
  }

  // Build Summary Rows
  const summaryRows: PlainStorySummaryRow[] = heirSlices.map((s) => {
    const title = getFriendlyHeirTitle(s.heir);
    return {
      heirKey: s.heir.relationKey,
      heirTitleEn: title.en,
      heirTitleUr: title.ur,
      count: s.heir.count,
      slicesOutOfTotal: `${s.slices} out of ${commonDenom} slices`,
      slicesOutOfTotalUr: `${commonDenom} میں سے ${s.slices} حصے`,
      fraction: s.heir.fractionString,
      percentage: `${s.heir.percentage.toFixed(1)}%`,
      moneyFormatted: `${Math.round(s.heir.totalMonetaryShare).toLocaleString()} ${currency}`,
    };
  });

  return {
    commonDenominator: commonDenom,
    headlineEn: `How This Estate is Divided in Plain Everyday Words`,
    headlineUr: `آسان اور عام فہم الفاظ میں تقسیم کی کہانی`,
    introCakeAnalogyEn: `Imagine the deceased person's net estate as a cake cut into exactly ${commonDenom} equal slices (or ${commonDenom * 1000} ${currency} in cash):`,
    introCakeAnalogyUr: `فرض کیجیے کہ میت کا خالص ترکہ ایک کیک ہے جس کے بالکل برابر ${commonDenom} ٹکڑے (یا ${commonDenom * 1000} ${currency}) کیے گئے ہیں:`,
    steps,
    specialClauses,
    summaryRows,
    takeawayQuoteEn: `Every single slice (${commonDenom} out of ${commonDenom}) is strictly accounted for. Under Shia Ja'fari law, 100% of wealth stays within the immediate family without a single penny lost.`,
    takeawayQuoteUr: `تمام کے تمام ${commonDenom} حصے بالکل مکمل اور شفاف طریقے سے تقسیم ہو چکے ہیں۔ شریعتِ جعفریہ میں ۱۰۰٪ مال قریبی خاندان ہی میں رہتا ہے اور کسی غیر کو نہیں جاتا۔`,
  };
}
