import {
  BalanceSheetSummary,
  BranchCalculationResult,
  DeceasedInfo,
  EstateAssets,
  EstateDebts,
  HeirShareResult,
  HeirsInput,
  InheritanceCalculationResult,
  MarjaId,
  PersonNode,
  ShariaProof,
} from "@/types/fiqh";
import { MARJA_DATABASE } from "./marja-rules";

/**
 * Step 1: Calculate Estate Balance Sheet & Preliminary Deductions (Ḥuqūq al-Tarkah)
 */
export function calculateBalanceSheet(
  assets: EstateAssets,
  debts: EstateDebts,
  deceased: DeceasedInfo
): BalanceSheetSummary {
  const grossEstate =
    (assets.cash || 0) +
    (assets.bankAccounts || 0) +
    (assets.residentialLand || 0) +
    (assets.agriculturalLand || 0) +
    (assets.commercialLand || 0) +
    (assets.buildingsAndFixtures || 0) +
    (assets.movableProperty || 0);

  const burialAndFuneral = debts.funeralExpenses || 0;
  const debtsToPeople = (debts.securedDebts || 0) + (debts.unsecuredDebts || 0);
  const debtsToAllah =
    (debts.unpaidKhums || 0) +
    (debts.unpaidZakat || 0) +
    (debts.unfulfilledHajj || 0) +
    (debts.kaffarat || 0);

  const totalDebts = burialAndFuneral + debtsToPeople + debtsToAllah;
  const estateAfterDebts = Math.max(0, grossEstate - totalDebts);
  const isInsolvent = totalDebts >= grossEstate && grossEstate > 0;
  const deficitAmount = Math.max(0, totalDebts - grossEstate);

  // Maximum allowable Will without mature heir consent is 1/3 (33.333%) of estate after debts
  const maxAllowableWasiyyah = estateAfterDebts / 3;
  const claimedWasiyyah = debts.wasiyyahAmount || 0;

  let deductedWasiyyah = 0;
  if (claimedWasiyyah > 0) {
    if (
      claimedWasiyyah > maxAllowableWasiyyah &&
      !debts.wasiyyahApprovedExceedingOneThird
    ) {
      deductedWasiyyah = maxAllowableWasiyyah;
    } else {
      deductedWasiyyah = Math.min(claimedWasiyyah, estateAfterDebts);
    }
  }

  const netDistributableEstate = Math.max(
    0,
    estateAfterDebts - deductedWasiyyah
  );

  // Eldest son's Ḥabwah valuation if applicable
  let habwahDeducted = 0;
  if (
    deceased.gender === "male" &&
    deceased.hasEldestSon &&
    deceased.eldestSonIsSaneAndNonAqq &&
    netDistributableEstate > 0
  ) {
    habwahDeducted = Math.min(
      deceased.habwah.estimatedValue || 0,
      netDistributableEstate
    );
  }

  return {
    grossEstate,
    burialAndFuneral,
    debtsToPeople,
    debtsToAllah,
    totalDebts,
    estateAfterDebts,
    maxAllowableWasiyyah,
    claimedWasiyyah,
    deductedWasiyyah,
    netDistributableEstate,
    habwahDeducted,
    isInsolvent,
    deficitAmount,
  };
}

/**
 * Step 2: Determine Active Tier and Check Absolute Exclusion (Ḥujub al-Ḥirmān)
 */
export function determineActiveTier(heirs: HeirsInput): {
  activeTier: 1 | 2 | 3 | null;
  excludedTiers: number[];
} {
  const hasNamedTier1 = (heirs.namedDescendants || []).some(
    (n) =>
      ((n.relation === "SON" || n.relation === "DAUGHTER" || n.relation === "GRANDCHILD") && n.isAlive) ||
      (n.children && n.children.some((c) => c.isAlive))
  );

  const hasTier1 =
    (heirs.fatherAlive && !heirs.fatherImpediment) ||
    (heirs.motherAlive && !heirs.motherImpediment) ||
    heirs.sonsCount > 0 ||
    heirs.daughtersCount > 0 ||
    (heirs.deceasedSonsWithChildren &&
      heirs.deceasedSonsWithChildren.some((c) => c.sons > 0 || c.daughters > 0)) ||
    (heirs.deceasedDaughtersWithChildren &&
      heirs.deceasedDaughtersWithChildren.some(
        (c) => c.sons > 0 || c.daughters > 0
      )) ||
    hasNamedTier1;

  if (hasTier1) {
    return { activeTier: 1, excludedTiers: [2, 3] };
  }

  const hasTier2 =
    heirs.paternalGrandfatherAlive ||
    heirs.paternalGrandmotherAlive ||
    heirs.maternalGrandfatherAlive ||
    heirs.maternalGrandmotherAlive ||
    heirs.fullBrothersCount > 0 ||
    heirs.fullSistersCount > 0 ||
    heirs.paternalBrothersCount > 0 ||
    heirs.paternalSistersCount > 0 ||
    heirs.uterineBrothersCount > 0 ||
    heirs.uterineSistersCount > 0 ||
    (heirs.deceasedSiblingsChildren &&
      heirs.deceasedSiblingsChildren.some(
        (c) => c.sons > 0 || c.daughters > 0
      ));

  if (hasTier2) {
    return { activeTier: 2, excludedTiers: [3] };
  }

  const hasTier3 =
    heirs.paternalUnclesCount > 0 ||
    heirs.paternalAuntsCount > 0 ||
    heirs.maternalUnclesCount > 0 ||
    heirs.maternalAuntsCount > 0 ||
    heirs.paternalCousinsCount > 0 ||
    heirs.maternalCousinsCount > 0;

  if (hasTier3) {
    return { activeTier: 3, excludedTiers: [] };
  }

  return { activeTier: null, excludedTiers: [] };
}

/**
 * Step 3: Check Mother's Partial Reduction (Ḥujub al-Nuqṣān)
 */
export function checkMotherBlocking(
  heirs: HeirsInput,
  hasChildren: boolean
): boolean {
  if (hasChildren) return true;

  // Mother's share drops from 1/3 to 1/6 if siblings meet 6 conditions:
  // 1. Father is alive
  // 2. At least 2 brothers, or 1 brother and 2 sisters, or 4 sisters
  // 3. Brothers/sisters are full or paternal (not uterine)
  if (!heirs.fatherAlive || heirs.fatherImpediment) return false;

  const b = heirs.motherBlockingBrothers || 0;
  const s = heirs.motherBlockingSisters || 0;

  const meetsCondition = b >= 2 || (b === 1 && s >= 2) || s >= 4;
  return meetsCondition;
}

/**
 * Helper: Great Common Divisor & Fraction Formatter
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function formatFraction(
  numerator: number,
  denominator: number
): { num: number; den: number; str: string } {
  if (numerator === 0 || denominator === 0) {
    return { num: 0, den: 1, str: "0" };
  }
  const d = gcd(numerator, denominator);
  const num = Math.round(numerator / d);
  const den = Math.round(denominator / d);
  return { num, den, str: `${num}/${den}` };
}

/**
 * Advanced Tanzīl & Named Descendants Calculation Engine
 * Strictly enforces Ja'fari Fiqh & Sayyid al-Sistani / al-Khamenei / al-Khoei rulings:
 * 1. Proximity Rule (Al-Aqrab Yamna' al-Ab'ad): If ANY direct child is alive, ALL grandchildren are completely excluded.
 * 2. Tanzil (Representation): If NO direct children are alive, grandchildren step into their deceased parent's shoes.
 * 3. Sub-branch Division: Deceased son's children divide 2:1. Deceased daughter's children divide 2:1 (ahwat wujubi) or 1:1 (classical toggle).
 */
export function calculateNamedTanzilBranches(
  namedDescendants: PersonNode[],
  distributableToChildrenPortion: number,
  netBloodEstate: number,
  currency: string = "PKR"
): { branchResults: BranchCalculationResult[]; tanzilHeirShares: HeirShareResult[]; notes: string[] } {
  const branchResults: BranchCalculationResult[] = [];
  const tanzilHeirShares: HeirShareResult[] = [];
  const notes: string[] = [];

  if (!namedDescendants || namedDescendants.length === 0) {
    return { branchResults, tanzilHeirShares, notes };
  }

  // 1. Identify direct children (sons and daughters)
  const directChildren = namedDescendants.filter(
    (n) => n.relation === "SON" || n.relation === "DAUGHTER"
  );
  const livingDirectChildren = directChildren.filter(
    (n) => n.isAlive && !n.impediments?.isKiller && !n.impediments?.isNonMuslim
  );

  // Collect all grandchildren
  const allGrandchildren: Array<{ node: PersonNode; parentNode?: PersonNode }> = [];
  directChildren.forEach((child) => {
    if (child.children && child.children.length > 0) {
      child.children.forEach((gc) => {
        allGrandchildren.push({ node: gc, parentNode: child });
      });
    }
  });
  namedDescendants
    .filter((n) => n.relation === "GRANDCHILD")
    .forEach((gc) => {
      if (!allGrandchildren.some((item) => item.node.id === gc.id)) {
        const parentNode = directChildren.find((p) => p.id === gc.parentId);
        allGrandchildren.push({ node: gc, parentNode });
      }
    });

  // 2. GOLDEN PROXIMITY RULE (Al-Aqrab Yamna' al-Ab'ad - الأقرب يمنع الأبعد)
  if (livingDirectChildren.length > 0) {
    notes.push(
      `Al-Aqrab Yamna‘ al-Ab‘ad (الأقرب يمنع الأبعد): All grandchildren are completely excluded because the deceased has ${livingDirectChildren.length} surviving living child(ren) (${livingDirectChildren.map((c) => c.name).join(", ")}).`
    );
    allGrandchildren.forEach(({ node, parentNode }) => {
      branchResults.push({
        person: node,
        parentHypotheticalShare: 0,
        subBranchShare: 0,
        finalFraction: "0",
        percentage: 0,
        monetaryValue: 0,
        isExcluded: true,
        exclusionReason: `Grandchild completely excluded by surviving direct child (${livingDirectChildren.map((c) => c.name).join(", ")}) under the Golden Proximity Rule (Al-Aqrab Yamna‘ al-Ab‘ad).`,
        fiqhBasisEnglish:
          "Golden Proximity Rule (Al-Aqrab Yamna' al-Ab'ad): In Class 1, the presence of even a single living son or daughter completely bars all grandchildren, even children of a deceased eldest son.",
        fiqhBasisUrdu:
          "قاعدہ اقربیت (الأقرب يمنع الأبعد): فقہ جعفریہ میں اگر میت کا ایک بھی صلبی بیٹا یا بیٹی زندہ ہو، تو تمام پوتے، پوتیاں، نواسے اور نواسیاں قطعی طور پر محروم ہو جاتے ہیں۔",
      });
    });
    return { branchResults, tanzilHeirShares, notes };
  }

  // 3. TANZIL (REPRESENTATION) — Direct children are ALL deceased
  const activeBranches: Array<{
    parent: PersonNode;
    grandchildren: PersonNode[];
    parentUnits: number;
  }> = [];

  directChildren.forEach((parent) => {
    const survivingGC = (parent.children || []).filter(
      (gc) => gc.isAlive && !gc.impediments?.isKiller && !gc.impediments?.isNonMuslim
    );
    namedDescendants.forEach((n) => {
      if (
        n.relation === "GRANDCHILD" &&
        n.parentId === parent.id &&
        n.isAlive &&
        !n.impediments?.isKiller &&
        !n.impediments?.isNonMuslim
      ) {
        if (!survivingGC.some((g) => g.id === n.id)) survivingGC.push(n);
      }
    });

    if (survivingGC.length > 0) {
      const parentUnits = parent.gender === "MALE" ? 2 : 1;
      activeBranches.push({ parent, grandchildren: survivingGC, parentUnits });
    }
  });

  if (activeBranches.length === 0) {
    return { branchResults, tanzilHeirShares, notes };
  }

  notes.push(
    "Tanzīl (تنزیل): In the absence of living direct children, grandchildren step into the exact shoes (Manzilah) of their deceased parents."
  );

  const totalBranchUnits = activeBranches.reduce((sum, b) => sum + b.parentUnits, 0);

  activeBranches.forEach((branch) => {
    const parentHypotheticalFraction = branch.parentUnits / totalBranchUnits;
    const parentBranchMoney = distributableToChildrenPortion * parentHypotheticalFraction;

    const isSonBranch = branch.parent.gender === "MALE";
    const useEqualRatioForDaughter =
      !isSonBranch && !!branch.parent.daughterBranchEqualRatio;

    let subUnits = 0;
    if (useEqualRatioForDaughter) {
      subUnits = branch.grandchildren.length;
    } else {
      branch.grandchildren.forEach((gc) => {
        subUnits += gc.gender === "MALE" ? 2 : 1;
      });
    }

    branch.grandchildren.forEach((gc) => {
      const gcUnit = useEqualRatioForDaughter ? 1 : gc.gender === "MALE" ? 2 : 1;
      const subShare = subUnits > 0 ? gcUnit / subUnits : 0;
      const gcMoney = parentBranchMoney * subShare;
      const gcOverallFraction = netBloodEstate > 0 ? gcMoney / netBloodEstate : 0;
      const percent = netBloodEstate > 0 ? (gcMoney / netBloodEstate) * 100 : 0;

      const basisEn = isSonBranch
        ? `Tanzīl via deceased son (${branch.parent.name}): Takes father's share (2 units), divided 2:1 among siblings pursuant to Minhāj al-Ṣāliḥīn, Mas'alah 1029.`
        : useEqualRatioForDaughter
        ? `Tanzīl via deceased daughter (${branch.parent.name}): Takes mother's share (1 unit), divided equally (1:1) based on classical fatwa.`
        : `Tanzīl via deceased daughter (${branch.parent.name}): Takes mother's share (1 unit), divided 2:1 pursuant to al-Aḥwaṭ al-Wujūbī of Sayyid al-Sistani and Sayyid al-Khamenei.`;

      const basisUr = isSonBranch
        ? `تنزیل بذریعہ مرحوم بیٹا (${branch.parent.name}): والد کا حصہ (2 حصے)، بہن بھائیوں میں 2:1 کے تناسب سے تقسیم (منہاج الصالحین، مسئلہ 1029)۔`
        : useEqualRatioForDaughter
        ? `تنزیل بذریعہ مرحومہ بیٹی (${branch.parent.name}): والدہ کا حصہ (1 حصہ)، قدیم فقہاء کے فتوے کے مطابق برابر (1:1) تقسیم۔`
        : `تنزیل بذریعہ مرحومہ بیٹی (${branch.parent.name}): والدہ کا حصہ (1 حصہ)، سید سیستانی و سید خامنہ ای کے احوط وجوبی کے تحت 2:1 کے تناسب سے تقسیم۔`;

      const fractionStr = formatFraction(
        Math.round(gcOverallFraction * 2400),
        2400
      ).str;

      branchResults.push({
        person: gc,
        parentHypotheticalShare: parentHypotheticalFraction,
        subBranchShare: subShare,
        finalFraction: fractionStr,
        percentage: Number(percent.toFixed(2)),
        monetaryValue: Math.round(gcMoney),
        fiqhBasisEnglish: basisEn,
        fiqhBasisUrdu: basisUr,
        isExcluded: false,
      });

      tanzilHeirShares.push({
        id: `tanzil_${gc.id}`,
        relationKey: gc.gender === "MALE" ? "grandson" : "granddaughter",
        tier: 1,
        count: 1,
        fractionNumerator: Math.round(gcOverallFraction * 2400),
        fractionDenominator: 2400,
        fractionString: fractionStr,
        percentage: Number(percent.toFixed(2)),
        totalMonetaryShare: Math.round(gcMoney),
        sharePerIndividual: Math.round(gcMoney),
        proof: {
          quranAyahArabic:
            "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
          quranAyahTranslation:
            "Principle of Tanzīl: Children of the deceased child take the portion of their parent.",
          quranReference: "Surah Al-Ahzāb (33:6)",
          hadithTextArabic:
            "ابن الابن يقوم مقام الابن إذا لم يكن للميت ولد لصلبه، وبنت البنت تقوم مقام البنت",
          hadithSource:
            "Wasā'il al-Shī'ah, Kitāb al-Mawārīth, Bāb Tanzīl al-Ahfād",
          masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1029-1031",
          ruleExplanation: basisEn,
        },
        notes: [
          `Tanzīl (${gc.name}): Inherits through deceased parent ${branch.parent.name}.`,
          `Branch share: ${(parentHypotheticalFraction * 100).toFixed(1)}% | Sub-share: ${(subShare * 100).toFixed(1)}%`,
        ],
      });
    });
  });

  return { branchResults, tanzilHeirShares, notes };
}

/**
 * Main Ja'fari Distribution Engine
 */
export function calculateInheritance(
  deceased: DeceasedInfo,
  assets: EstateAssets,
  debts: EstateDebts,
  heirs: HeirsInput
): InheritanceCalculationResult {
  const marjaInfo = MARJA_DATABASE[deceased.marja];
  const balanceSheet = calculateBalanceSheet(assets, debts, deceased);
  const { activeTier, excludedTiers } = determineActiveTier(heirs);

  const notes: string[] = [];
  const heirShares: HeirShareResult[] = [];
  let branchResults: BranchCalculationResult[] = [];

  let rejectionOfAwlApplied = false;
  let rejectionOfTasibApplied = false;
  let motherHujubNuqsanApplied = false;

  if (balanceSheet.isInsolvent) {
    notes.push(
      `The estate is commercially insolvent. Total liabilities (${balanceSheet.totalDebts.toLocaleString()} ${deceased.currency}) equal or exceed gross assets (${balanceSheet.grossEstate.toLocaleString()} ${deceased.currency}). No distribution to heirs can take place.`
    );
  }

  const netEstate = balanceSheet.netDistributableEstate;

  // 1. Eldest Son Habwah
  let habwahAwarded = {
    awarded: false,
    reason: "No eligible eldest son or estate insolvent.",
    items: [] as string[],
    value: 0,
  };

  if (
    deceased.gender === "male" &&
    deceased.hasEldestSon &&
    deceased.eldestSonIsSaneAndNonAqq &&
    netEstate > 0
  ) {
    const itemsList: string[] = [];
    if (deceased.habwah.quran) itemsList.push("Personal Qur'an");
    if (deceased.habwah.ring) itemsList.push("Personal Ring (Khātam)");
    if (deceased.habwah.swordOrDefensiveWeapon)
      itemsList.push("Personal Sword / Weapon");
    if (deceased.habwah.clothes) itemsList.push("Personal Clothes");

    habwahAwarded = {
      awarded: true,
      reason: `Awarded to eldest living son pursuant to ${marjaInfo.masalahHabwah}`,
      items: itemsList,
      value: deceased.habwah.estimatedValue || 0,
    };
    notes.push(
      `Al-Ḥabwah: Eldest son is exclusively awarded the father's specific personal items (${itemsList.join(
        ", "
      )}).`
    );
  }

  if (netEstate <= 0) {
    return {
      balanceSheet,
      activeTier,
      excludedTiers,
      rejectionOfAwlApplied,
      rejectionOfTasibApplied,
      motherHujubNuqsanApplied,
      widowLandRuleApplied: {
        marja: deceased.marja,
        inheritsLandValue: marjaInfo.widowInheritsLandValue,
        explanation: marjaInfo.widowLandRulingEn,
      },
      habwahAwarded,
      heirShares: [],
      branchResults: [],
      notes,
    };
  }

  // Check presence of children or descendants (including namedDescendants)
  const namedLivingDirectChildren = (heirs.namedDescendants || []).filter(
    (n) =>
      (n.relation === "SON" || n.relation === "DAUGHTER") &&
      n.isAlive &&
      !n.impediments?.isKiller &&
      !n.impediments?.isNonMuslim
  );
  const namedGrandchildrenList: PersonNode[] = [];
  (heirs.namedDescendants || []).forEach((n) => {
    if (n.relation === "GRANDCHILD") namedGrandchildrenList.push(n);
    if (n.children && n.children.length > 0) {
      n.children.forEach((c) => namedGrandchildrenList.push(c));
    }
  });

  const directChildrenCount =
    (heirs.sonsCount || 0) +
    (heirs.daughtersCount || 0) +
    namedLivingDirectChildren.length;

  const hasDescendants =
    directChildrenCount > 0 ||
    namedGrandchildrenList.length > 0 ||
    (heirs.deceasedSonsWithChildren &&
      heirs.deceasedSonsWithChildren.some(
        (c) => (c.sons || 0) > 0 || (c.daughters || 0) > 0
      )) ||
    (heirs.deceasedDaughtersWithChildren &&
      heirs.deceasedDaughtersWithChildren.some(
        (c) => (c.sons || 0) > 0 || (c.daughters || 0) > 0
      ));

  // 2. Spousal Shares (Zawj & Zawjah)
  let spousePortionFraction = 0; // fraction of net estate
  let spouseTotalMoney = 0;

  const totalLandValue =
    (assets.residentialLand || 0) +
    (assets.agriculturalLand || 0) +
    (assets.commercialLand || 0);

  const nonLandValue =
    (assets.cash || 0) +
    (assets.bankAccounts || 0) +
    (assets.buildingsAndFixtures || 0) +
    (assets.movableProperty || 0);

  if (heirs.spouseCount > 0) {
    if (deceased.gender === "female") {
      // Husband (Zawj)
      const num = 1;
      const den = hasDescendants ? 4 : 2;
      spousePortionFraction = 1 / den;
      spouseTotalMoney = netEstate * spousePortionFraction;

      const frac = formatFraction(num, den);
      heirShares.push({
        id: "husband",
        relationKey: "husband",
        tier: 0,
        count: 1,
        fractionNumerator: frac.num,
        fractionDenominator: frac.den,
        fractionString: frac.str,
        percentage: (1 / den) * 100,
        totalMonetaryShare: spouseTotalMoney,
        sharePerIndividual: spouseTotalMoney,
        proof: {
          quranAyahArabic:
            "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ ۚ فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ",
          quranAyahTranslation:
            "And for you is half of what your wives leave if they have no child. But if they have a child, for you is one fourth of what they leave.",
          quranReference: "Surah An-Nisā’ (4:12)",
          masalahReference: "Minhāj al-Ṣāliḥīn, Kitāb al-Mawārīth, Mas'alah 1030",
          ruleExplanation: hasDescendants
            ? "Husband receives 1/4 due to the presence of surviving children/descendants."
            : "Husband receives 1/2 in the absence of children/descendants.",
        },
        notes: [
          hasDescendants
            ? "Quranic prescribed share: 1/4."
            : "Quranic prescribed share: 1/2.",
        ],
      });
    } else {
      // Wives (Zawjah)
      const num = 1;
      const den = hasDescendants ? 8 : 4;
      spousePortionFraction = 1 / den;
      const wifeCount = Math.min(4, heirs.spouseCount);

      let wifeMoney = 0;
      let landPortion = 0;
      let buildingPortion = 0;

      if (marjaInfo.widowInheritsLandValue) {
        // Sistani & Khamenei: Widow inherits from the monetary valuation of ALL land
        wifeMoney = netEstate * spousePortionFraction;
        landPortion = totalLandValue * spousePortionFraction;
        buildingPortion = nonLandValue * spousePortionFraction;
      } else {
        // Khoei, Makarem, Najafi: Widow inherits strictly from non-land assets
        const debtRatio =
          balanceSheet.grossEstate > 0
            ? (balanceSheet.totalDebts + balanceSheet.deductedWasiyyah) /
              balanceSheet.grossEstate
            : 0;
        const netNonLand = Math.max(0, nonLandValue * (1 - debtRatio));
        wifeMoney = netNonLand * spousePortionFraction;
        landPortion = 0;
        buildingPortion = wifeMoney;
        notes.push(
          `Under ${marjaInfo.nameEn}, the widow receives her share (${num}/${den}) strictly from buildings, trees, and movable chattels (${buildingPortion.toLocaleString()} ${deceased.currency}), excluding the monetary value of open/agricultural land.`
        );
      }

      spouseTotalMoney = wifeMoney;
      const frac = formatFraction(num, den);
      heirShares.push({
        id: "wives",
        relationKey: wifeCount > 1 ? "wives" : "wife",
        tier: 0,
        count: wifeCount,
        fractionNumerator: frac.num,
        fractionDenominator: frac.den,
        fractionString: frac.str,
        percentage: (1 / den) * 100,
        totalMonetaryShare: spouseTotalMoney,
        sharePerIndividual: spouseTotalMoney / wifeCount,
        landValueEntitlement: landPortion,
        movableAndBuildingEntitlement: buildingPortion,
        proof: {
          quranAyahArabic:
            "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ ۚ فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم",
          quranAyahTranslation:
            "And for the wives is one fourth if you leave no child. But if you leave a child, then for them is an eighth of what you leave.",
          quranReference: "Surah An-Nisā’ (4:12)",
          hadithTextArabic:
            "المرأة لا ترث من العقار شيئا ولكن يعطى لها قيمة البناء والشجر",
          hadithSource:
            "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Abwāb Mīrāth al-Azwāj",
          masalahReference: marjaInfo.masalahWidow,
          ruleExplanation: `${marjaInfo.nameEn}: ${marjaInfo.widowLandRulingEn}`,
        },
        notes: [
          `Wife share divided equally between ${wifeCount} wife/wives.`,
          marjaInfo.widowInheritsLandValue
            ? "Inherits monetary valuation of land & structures."
            : "Inherits exclusively from valuation of buildings, trees, and movables (zero from land).",
        ],
      });
    }
  }

  // Remainder to distribute among active tier
  const distributableToBloodHeirs = Math.max(0, netEstate - spouseTotalMoney);

  // 3. TIER 1 DISTRIBUTION
  if (activeTier === 1) {
    const fatherAlive = heirs.fatherAlive && !heirs.fatherImpediment;
    const motherAlive = heirs.motherAlive && !heirs.motherImpediment;
    const sons = heirs.sonsCount || 0;
    const daughters = heirs.daughtersCount || 0;

    const motherBlocked = checkMotherBlocking(heirs, hasDescendants);
    motherHujubNuqsanApplied = motherAlive && motherBlocked;

    // Subcase 1A: Only Parents survive (no children)
    if (directChildrenCount === 0 && !hasDescendants) {
      if (fatherAlive && motherAlive) {
        // Mother takes 1/3 if not blocked by siblings; 1/6 if blocked
        const motherFraction = motherBlocked ? 1 / 6 : 1 / 3;
        const motherMoney = distributableToBloodHeirs * motherFraction;
        const fatherMoney = distributableToBloodHeirs - motherMoney;

        const mFrac = formatFraction(motherBlocked ? 1 : 1, motherBlocked ? 6 : 3);
        const fFrac = formatFraction(motherBlocked ? 5 : 2, motherBlocked ? 6 : 3);

        heirShares.push({
          id: "mother",
          relationKey: "mother",
          tier: 1,
          count: 1,
          fractionNumerator: mFrac.num,
          fractionDenominator: mFrac.den,
          fractionString: mFrac.str,
          percentage: motherFraction * 100,
          totalMonetaryShare: motherMoney,
          sharePerIndividual: motherMoney,
          proof: {
            quranAyahArabic:
              "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ",
            quranAyahTranslation:
              "And if he had no child and his parents were his heirs, then for his mother is one third. And if he had brothers, then for his mother is one sixth.",
            quranReference: "Surah An-Nisā’ (4:11)",
            masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1012",
            ruleExplanation: motherBlocked
              ? "Mother drops to 1/6 due to Ḥujub al-Nuqṣān (brothers of deceased meeting conditions)."
              : "Mother takes 1/3 as her Quranic prescribed share with no blocking.",
          },
          notes: motherBlocked
            ? ["Ḥujub al-Nuqṣān: reduced to 1/6 by qualifying siblings."]
            : ["Full 1/3 Quranic allotment."],
        });

        heirShares.push({
          id: "father",
          relationKey: "father",
          tier: 1,
          count: 1,
          fractionNumerator: fFrac.num,
          fractionDenominator: fFrac.den,
          fractionString: fFrac.str,
          percentage: (1 - motherFraction) * 100,
          totalMonetaryShare: fatherMoney,
          sharePerIndividual: fatherMoney,
          proof: {
            quranAyahArabic: "وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ",
            quranAyahTranslation:
              "And his parents were his heirs... the father takes the entire residue.",
            quranReference: "Surah An-Nisā’ (4:11)",
            masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1012",
            ruleExplanation:
              "Father takes the entire remainder of the estate after mother's share.",
          },
          notes: ["Takes residue (Qarabah)."],
        });
      } else if (fatherAlive) {
        // Sole father takes 100% of blood portion
        heirShares.push({
          id: "father",
          relationKey: "father",
          tier: 1,
          count: 1,
          fractionNumerator: 1,
          fractionDenominator: 1,
          fractionString: "1/1",
          percentage: 100,
          totalMonetaryShare: distributableToBloodHeirs,
          sharePerIndividual: distributableToBloodHeirs,
          proof: {
            quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
            quranAyahTranslation:
              "And those of blood relations are more entitled to one another in the Book of Allah.",
            quranReference: "Surah Al-Ahzāb (33:6)",
            masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1010",
            ruleExplanation: "Sole surviving Tier 1 parent inherits the entire residue.",
          },
          notes: ["Sole Tier 1 heir takes 100% of distributable residue."],
        });
      } else if (motherAlive) {
        // Sole mother takes 100% (1/3 by Farḍ + 2/3 by Radd)
        rejectionOfTasibApplied = true;
        heirShares.push({
          id: "mother",
          relationKey: "mother",
          tier: 1,
          count: 1,
          fractionNumerator: 1,
          fractionDenominator: 1,
          fractionString: "1/1",
          percentage: 100,
          totalMonetaryShare: distributableToBloodHeirs,
          sharePerIndividual: distributableToBloodHeirs,
          proof: {
            quranAyahArabic: "فَلِأُمِّهِ الثُّلُثُ ... وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ",
            quranAyahTranslation:
              "The mother takes 1/3 by Farḍ and the remaining 2/3 is returned to her by Radd (Ta'ṣīb is invalid).",
            quranReference: "Surah An-Nisā’ (4:11) & Surah Al-Ahzāb (33:6)",
            hadithTextArabic:
              "المال كله للأم بالفرض والرد ولا شيء للعصبة",
            hadithSource:
              "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Abwāb Mīrāth al-Abawayn",
            masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1014",
            ruleExplanation:
              "Ta'ṣīb is null in Ja'fari Fiqh. Residue does not go to uncles/agnates; returned to mother via Radd.",
          },
          notes: [
            "1/3 by prescribed Farḍ + 2/3 by Radd.",
            "Repudiation of Ta‘ṣīb: distant relatives excluded.",
          ],
        });
      }
    }
    // Subcase 1B: Children survive
    else {
      // 1B.1: Sons present (with or without daughters, with or without parents)
      if (sons > 0) {
        let parentDeduction = 0;
        let fatherMoney = 0;
        let motherMoney = 0;

        if (fatherAlive) {
          const fShare = 1 / 6;
          fatherMoney = distributableToBloodHeirs * fShare;
          parentDeduction += fatherMoney;
          const fFrac = formatFraction(1, 6);
          heirShares.push({
            id: "father",
            relationKey: "father",
            tier: 1,
            count: 1,
            fractionNumerator: fFrac.num,
            fractionDenominator: fFrac.den,
            fractionString: fFrac.str,
            percentage: (1 / 6) * 100,
            totalMonetaryShare: fatherMoney,
            sharePerIndividual: fatherMoney,
            proof: {
              quranAyahArabic:
                "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ",
              quranAyahTranslation:
                "And for one's parents, to each one of them is a sixth of his estate if he left children.",
              quranReference: "Surah An-Nisā’ (4:11)",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1015",
              ruleExplanation:
                "Father receives 1/6 as a prescribed share in the presence of male offspring.",
            },
            notes: ["Fixed Quranic share: 1/6."],
          });
        }

        if (motherAlive) {
          const mShare = 1 / 6;
          motherMoney = distributableToBloodHeirs * mShare;
          parentDeduction += motherMoney;
          const mFrac = formatFraction(1, 6);
          heirShares.push({
            id: "mother",
            relationKey: "mother",
            tier: 1,
            count: 1,
            fractionNumerator: mFrac.num,
            fractionDenominator: mFrac.den,
            fractionString: mFrac.str,
            percentage: (1 / 6) * 100,
            totalMonetaryShare: motherMoney,
            sharePerIndividual: motherMoney,
            proof: {
              quranAyahArabic:
                "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ",
              quranAyahTranslation:
                "And for one's parents, to each one of them is a sixth of his estate if he left children.",
              quranReference: "Surah An-Nisā’ (4:11)",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1015",
              ruleExplanation:
                "Mother receives 1/6 as a prescribed share in the presence of children.",
            },
            notes: ["Fixed Quranic share: 1/6."],
          });
        }

        const residueForChildren = Math.max(
          0,
          distributableToBloodHeirs - parentDeduction
        );
        const totalUnits = sons * 2 + daughters * 1;
        const unitValue = totalUnits > 0 ? residueForChildren / totalUnits : 0;

        // Sons share
        const sonsTotal = sons * 2 * unitValue;
        const sonFrac = formatFraction(
          Math.round((sonsTotal / distributableToBloodHeirs) * 24),
          24
        );
        heirShares.push({
          id: "sons",
          relationKey: sons > 1 ? "sons" : "son",
          tier: 1,
          count: sons,
          fractionNumerator: sonFrac.num,
          fractionDenominator: sonFrac.den,
          fractionString: sonFrac.str,
          percentage: (sonsTotal / distributableToBloodHeirs) * 100,
          totalMonetaryShare: sonsTotal,
          sharePerIndividual: sonsTotal / sons,
          proof: {
            quranAyahArabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
            quranAyahTranslation:
              "Allah instructs you concerning your children: for the male, what is equal to the share of two females.",
            quranReference: "Surah An-Nisā’ (4:11)",
            masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1018",
            ruleExplanation:
              "Sons divide the residue with daughters in a 2:1 ratio, or equally if sons alone.",
          },
          notes: [
            daughters > 0
              ? `Takes residue in 2:1 ratio with daughter(s).`
              : `Takes entire residue divided equally among ${sons} son(s).`,
          ],
        });

        // Daughters share if any
        if (daughters > 0) {
          const daughtersTotal = daughters * 1 * unitValue;
          const dFrac = formatFraction(
            Math.round((daughtersTotal / distributableToBloodHeirs) * 24),
            24
          );
          heirShares.push({
            id: "daughters",
            relationKey: daughters > 1 ? "daughters" : "daughter",
            tier: 1,
            count: daughters,
            fractionNumerator: dFrac.num,
            fractionDenominator: dFrac.den,
            fractionString: dFrac.str,
            percentage: (daughtersTotal / distributableToBloodHeirs) * 100,
            totalMonetaryShare: daughtersTotal,
            sharePerIndividual: daughtersTotal / daughters,
            proof: {
              quranAyahArabic: "لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
              quranAyahTranslation:
                "For the male, what is equal to the share of two females.",
              quranReference: "Surah An-Nisā’ (4:11)",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1018",
              ruleExplanation:
                "Daughters inherit as residuaries with brothers in a 1:2 ratio.",
            },
            notes: [`Inherits 1 unit per female against 2 units per male.`],
          });
        }
      }
      // 1B.2: Daughters ONLY (NO sons) - CRITICAL JA'FARI AWL & RADD RULES
      else if (daughters > 0 && sons === 0) {
        // Quranic Prescribed Shares
        const daughterBaseFraction = daughters === 1 ? 1 / 2 : 2 / 3;
        const fatherBaseFraction = fatherAlive ? 1 / 6 : 0;
        const motherBaseFraction = motherAlive ? 1 / 6 : 0;

        const sumOfFaraid =
          daughterBaseFraction + fatherBaseFraction + motherBaseFraction;

        // CASE 1: Sum exceeds 1 (Deficit -> Repudiation of 'Awl)
        // Happens if spouse + parents + daughters sum > 1
        // Example: Husband (1/4) + Father (1/6) + Mother (1/6) + Daughters (2/3) = 15/12
        const totalWithSpouse =
          spousePortionFraction +
          fatherBaseFraction +
          motherBaseFraction +
          daughterBaseFraction;

        if (totalWithSpouse > 1.0001) {
          rejectionOfAwlApplied = true;
          // In Ja'fari Fiqh, 'Awl is strictly invalid!
          // Husband/Wife, Father, and Mother receive their full shares without ANY reduction.
          // The deficit is borne ENTIRELY by the daughter(s)!
          const guaranteedFraction =
            fatherBaseFraction + motherBaseFraction; // from distributableToBloodHeirs
          const remainingForDaughters = Math.max(
            0,
            1 - (spousePortionFraction > 0 ? guaranteedFraction : guaranteedFraction)
          );

          if (fatherAlive) {
            const fMoney = distributableToBloodHeirs * (1 / 6);
            heirShares.push({
              id: "father",
              relationKey: "father",
              tier: 1,
              count: 1,
              fractionNumerator: 1,
              fractionDenominator: 6,
              fractionString: "1/6",
              percentage: (1 / 6) * 100,
              totalMonetaryShare: fMoney,
              sharePerIndividual: fMoney,
              proof: {
                quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                quranAyahTranslation:
                  "For his parents is 1/6 each. Under Imam Ali's (as) ruling, parents' shares are never reduced by deficit.",
                quranReference: "Surah An-Nisā’ (4:11)",
                hadithTextArabic:
                  "سُئل أمير المؤمنين (ع) عن العول فقال: إن الذي أحصى رمل عالج ليعلم أن السهام لا تعول على ستة",
                hadithSource:
                  "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Bāb Butlān al-‘Awl",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1022",
                ruleExplanation:
                  "Repudiation of ‘Awl: Father's 1/6 is preserved in full; deficit is borne exclusively by the daughters.",
              },
              notes: ["Full 1/6 protected from 'Awl reduction."],
            });
          }

          if (motherAlive) {
            const mMoney = distributableToBloodHeirs * (1 / 6);
            heirShares.push({
              id: "mother",
              relationKey: "mother",
              tier: 1,
              count: 1,
              fractionNumerator: 1,
              fractionDenominator: 6,
              fractionString: "1/6",
              percentage: (1 / 6) * 100,
              totalMonetaryShare: mMoney,
              sharePerIndividual: mMoney,
              proof: {
                quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                quranAyahTranslation: "Mother's 1/6 is protected against deficit.",
                quranReference: "Surah An-Nisā’ (4:11)",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1022",
                ruleExplanation:
                  "Mother's share is inviolable under Ja'fari Law; no 'Awl deduction.",
              },
              notes: ["Full 1/6 protected from 'Awl reduction."],
            });
          }

          const daughtersMoney = Math.max(
            0,
            distributableToBloodHeirs -
              (fatherAlive ? distributableToBloodHeirs * (1 / 6) : 0) -
              (motherAlive ? distributableToBloodHeirs * (1 / 6) : 0)
          );

          const daughterFracRatio =
            distributableToBloodHeirs > 0
              ? daughtersMoney / distributableToBloodHeirs
              : 0;
          const dFrac = formatFraction(
            Math.round(daughterFracRatio * 24),
            24
          );

          heirShares.push({
            id: "daughters",
            relationKey: daughters > 1 ? "daughters" : "daughter",
            tier: 1,
            count: daughters,
            fractionNumerator: dFrac.num,
            fractionDenominator: dFrac.den,
            fractionString: dFrac.str,
            percentage: daughterFracRatio * 100,
            totalMonetaryShare: daughtersMoney,
            sharePerIndividual: daughtersMoney / daughters,
            proof: {
              quranAyahArabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
              quranAyahTranslation:
                "Imam Ali (as) established that when Quranic shares exceed 1, the deficit is deducted solely from daughters/sisters.",
              quranReference: "Surah An-Nisā’ (4:11)",
              hadithTextArabic:
                "السهام لا تعول، والنقص يدخل على البنت أو البنات",
              hadithSource:
                "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Vol 26, Bāb 6",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1023",
              ruleExplanation:
                "Bāṭil al-‘Awl: Deficit is absorbed solely by the daughter(s). Spouses and parents take their full shares.",
            },
            notes: [
              "Repudiation of ‘Awl: Daughters absorb the fractional deficit.",
              `Shared equally between ${daughters} daughter(s).`,
            ],
          });
        }
        // CASE 2: Sum is LESS than 1 (Surplus -> Proportional Radd & Repudiation of Ta'sib)
        else {
          rejectionOfTasibApplied = true;

          // Subcase: Only Daughters (no parents)
          if (!fatherAlive && !motherAlive) {
            // Daughters take 100% of distributable residue (prescribed + Radd)
            heirShares.push({
              id: "daughters",
              relationKey: daughters > 1 ? "daughters" : "daughter",
              tier: 1,
              count: daughters,
              fractionNumerator: 1,
              fractionDenominator: 1,
              fractionString: "1/1",
              percentage: 100,
              totalMonetaryShare: distributableToBloodHeirs,
              sharePerIndividual: distributableToBloodHeirs / daughters,
              proof: {
                quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
                quranAyahTranslation:
                  "Surplus is returned to daughters by Radd. Ta'ṣīb is null; uncles receive nothing.",
                quranReference: "Surah Al-Ahzāb (33:6)",
                hadithTextArabic: "لا يرث مع البنت أحد من العصبة شيئا",
                hadithSource: "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Bāb 1",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1017",
                ruleExplanation:
                  "Daughters take their Quranic share and the entire surplus via Radd. Ta'ṣīb is strictly rejected.",
              },
              notes: [
                "Prescribed share + 100% of Radd.",
                "Distant agnatic relatives excluded.",
              ],
            });
          }
          // Subcase: Father and 1 Daughter (no mother)
          else if (fatherAlive && !motherAlive && daughters === 1) {
            // Father: 1/6 (1 share), Daughter: 3/6 = 1/2 (3 shares)
            // Total units = 4. Surplus returned in 1:3 ratio!
            // Result: Father gets 1/4 of distributable, Daughter gets 3/4!
            const fatherMoney = distributableToBloodHeirs * (1 / 4);
            const daughterMoney = distributableToBloodHeirs * (3 / 4);

            heirShares.push({
              id: "father",
              relationKey: "father",
              tier: 1,
              count: 1,
              fractionNumerator: 1,
              fractionDenominator: 4,
              fractionString: "1/4",
              percentage: 25,
              totalMonetaryShare: fatherMoney,
              sharePerIndividual: fatherMoney,
              proof: {
                quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                quranAyahTranslation:
                  "Father takes 1/6 by Farḍ and 1/4 of surplus by Radd, totaling exactly 1/4 (4/16 or 1:3 ratio with daughter).",
                quranReference: "Surah An-Nisā’ (4:11)",
                hadithTextArabic:
                  "يرد الفاضل على الأب والبنت أرباعا: للأب الربع وللبنت ثلاثة أرباع",
                hadithSource:
                  "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Bāb Mīrāth al-Awlād ma'a al-Abawayn",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                ruleExplanation:
                  "Radd is divided in a 1:3 ratio between Father (1/4) and Daughter (3/4).",
              },
              notes: ["1/6 Quranic share + 1/12 Radd = 1/4 of blood estate."],
            });

            heirShares.push({
              id: "daughters",
              relationKey: "daughter",
              tier: 1,
              count: 1,
              fractionNumerator: 3,
              fractionDenominator: 4,
              fractionString: "3/4",
              percentage: 75,
              totalMonetaryShare: daughterMoney,
              sharePerIndividual: daughterMoney,
              proof: {
                quranAyahArabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
                quranAyahTranslation:
                  "Daughter takes 1/2 by Farḍ and 3/4 of surplus by Radd, totaling 3/4.",
                quranReference: "Surah An-Nisā’ (4:11)",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                ruleExplanation:
                  "Daughter receives 3/4 of the distributable blood estate.",
              },
              notes: ["1/2 Quranic share + 1/4 Radd = 3/4 of blood estate."],
            });
          }
          // Subcase: Father, Mother, and 1 Daughter
          else if (fatherAlive && motherAlive && daughters === 1) {
            // Father (1/6 = 1 share), Mother (1/6 = 1 share), Daughter (3/6 = 3 shares).
            // Sum of Faraid = 5/6. Surplus = 1/6.
            if (motherBlocked) {
              // Mother is blocked from Radd by siblings!
              // Mother gets exactly 1/6 (4/24).
              // Remaining 5/6 (20/24) is divided between Father and Daughter in 1:3 ratio!
              // Father gets 1/4 * 5/6 = 5/24. Daughter gets 3/4 * 5/6 = 15/24.
              const motherMoney = distributableToBloodHeirs * (4 / 24);
              const fatherMoney = distributableToBloodHeirs * (5 / 24);
              const daughterMoney = distributableToBloodHeirs * (15 / 24);

              heirShares.push({
                id: "mother",
                relationKey: "mother",
                tier: 1,
                count: 1,
                fractionNumerator: 1,
                fractionDenominator: 6,
                fractionString: "1/6",
                percentage: (1 / 6) * 100,
                totalMonetaryShare: motherMoney,
                sharePerIndividual: motherMoney,
                proof: {
                  quranAyahArabic: "فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ",
                  quranAyahTranslation:
                    "Mother is blocked from Radd by presence of qualifying siblings; she receives strictly 1/6.",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  hadithTextArabic:
                    "الإخوة يحجبون الأم عن الزيادة على السدس ولا يرثون",
                hadithSource:
                    "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Bāb al-Hujub",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1026",
                  ruleExplanation:
                    "Ḥujub al-Nuqṣān: Siblings block mother from participating in Radd. Surplus goes exclusively to father and daughter.",
                },
                notes: [
                  "Strict 1/6 (no Radd due to sibling blocking).",
                  "Siblings inherit 0, but shield surplus for father & daughter.",
                ],
              });

              heirShares.push({
                id: "father",
                relationKey: "father",
                tier: 1,
                count: 1,
                fractionNumerator: 5,
                fractionDenominator: 24,
                fractionString: "5/24",
                percentage: (5 / 24) * 100,
                totalMonetaryShare: fatherMoney,
                sharePerIndividual: fatherMoney,
                proof: {
                  quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                  quranAyahTranslation:
                    "Father receives 1/6 plus his 1/4 share of the remaining surplus (total 5/24).",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1026",
                  ruleExplanation:
                    "Father receives 1/6 Farḍ + 1/24 Radd = 5/24 of the estate.",
                },
                notes: ["5/24 of blood estate."],
              });

              heirShares.push({
                id: "daughters",
                relationKey: "daughter",
                tier: 1,
                count: 1,
                fractionNumerator: 15,
                fractionDenominator: 24,
                fractionString: "5/8",
                percentage: (15 / 24) * 100,
                totalMonetaryShare: daughterMoney,
                sharePerIndividual: daughterMoney,
                proof: {
                  quranAyahArabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
                  quranAyahTranslation:
                    "Daughter receives 1/2 (12/24) plus 3/4 of the surplus (3/24) = 15/24 (5/8).",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1026",
                  ruleExplanation:
                    "Daughter receives 15/24 (5/8) of the blood estate.",
                },
                notes: ["15/24 (reduced to 5/8) of blood estate."],
              });
            } else {
              // Mother is NOT blocked: Father, Mother, Daughter divide surplus in 1:1:3 ratio (total 5 parts)
              // Father = 1/5, Mother = 1/5, Daughter = 3/5
              const fatherMoney = distributableToBloodHeirs * (1 / 5);
              const motherMoney = distributableToBloodHeirs * (1 / 5);
              const daughterMoney = distributableToBloodHeirs * (3 / 5);

              heirShares.push({
                id: "father",
                relationKey: "father",
                tier: 1,
                count: 1,
                fractionNumerator: 1,
                fractionDenominator: 5,
                fractionString: "1/5",
                percentage: 20,
                totalMonetaryShare: fatherMoney,
                sharePerIndividual: fatherMoney,
                proof: {
                  quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                  quranAyahTranslation:
                    "With no blocking siblings, Father, Mother, and Daughter divide the total estate in 1:1:3 ratio.",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                  ruleExplanation:
                    "Father receives 1/5 of the total blood estate (Farḍ + proportional Radd).",
                },
                notes: ["1/5 of blood estate after Radd."],
              });

              heirShares.push({
                id: "mother",
                relationKey: "mother",
                tier: 1,
                count: 1,
                fractionNumerator: 1,
                fractionDenominator: 5,
                fractionString: "1/5",
                percentage: 20,
                totalMonetaryShare: motherMoney,
                sharePerIndividual: motherMoney,
                proof: {
                  quranAyahArabic: "فَلِأُمِّهِ الثُّلُثُ",
                  quranAyahTranslation:
                    "Mother receives 1/5 (Farḍ + proportional Radd) as she is not blocked by siblings.",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                  ruleExplanation:
                    "Mother participates in Radd equally with father.",
                },
                notes: ["1/5 of blood estate after Radd."],
              });

              heirShares.push({
                id: "daughters",
                relationKey: "daughter",
                tier: 1,
                count: 1,
                fractionNumerator: 3,
                fractionDenominator: 5,
                fractionString: "3/5",
                percentage: 60,
                totalMonetaryShare: daughterMoney,
                sharePerIndividual: daughterMoney,
                proof: {
                  quranAyahArabic: "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ",
                  quranAyahTranslation:
                    "Daughter receives 3/5 of the total blood estate (Farḍ + proportional Radd).",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                  ruleExplanation:
                    "Daughter receives 3/5 (60%) of the blood estate.",
                },
                notes: ["3/5 of blood estate after Radd."],
              });
            }
          }
          // Subcase: Father, Mother, and 2+ Daughters (or Father + 2+ Daughters)
          else {
            const fUnits = fatherAlive ? 1 : 0;
            const mUnits = motherAlive ? 1 : 0;
            const dUnits = daughters > 1 ? 4 : 3;
            const totalUnits = fUnits + mUnits + dUnits;

            if (fatherAlive) {
              const fMoney =
                distributableToBloodHeirs * (fUnits / totalUnits);
              const fFrac = formatFraction(fUnits, totalUnits);
              heirShares.push({
                id: "father",
                relationKey: "father",
                tier: 1,
                count: 1,
                fractionNumerator: fFrac.num,
                fractionDenominator: fFrac.den,
                fractionString: fFrac.str,
                percentage: (fUnits / totalUnits) * 100,
                totalMonetaryShare: fMoney,
                sharePerIndividual: fMoney,
                proof: {
                  quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                  quranAyahTranslation:
                    "Father takes prescribed share plus proportional Radd.",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                  ruleExplanation: "Father receives proportional share of Radd.",
                },
                notes: [`Takes ${fFrac.str} of blood estate.`],
              });
            }

            if (motherAlive) {
              const mMoney =
                distributableToBloodHeirs * (mUnits / totalUnits);
              const mFrac = formatFraction(mUnits, totalUnits);
              heirShares.push({
                id: "mother",
                relationKey: "mother",
                tier: 1,
                count: 1,
                fractionNumerator: mFrac.num,
                fractionDenominator: mFrac.den,
                fractionString: mFrac.str,
                percentage: (mUnits / totalUnits) * 100,
                totalMonetaryShare: mMoney,
                sharePerIndividual: mMoney,
                proof: {
                  quranAyahArabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
                  quranAyahTranslation:
                    "Mother takes prescribed share plus proportional Radd.",
                  quranReference: "Surah An-Nisā’ (4:11)",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                  ruleExplanation: "Mother receives proportional share of Radd.",
                },
                notes: [`Takes ${mFrac.str} of blood estate.`],
              });
            }

            const dMoney =
              distributableToBloodHeirs * (dUnits / totalUnits);
            const dFrac = formatFraction(dUnits, totalUnits);
            heirShares.push({
              id: "daughters",
              relationKey: daughters > 1 ? "daughters" : "daughter",
              tier: 1,
              count: daughters,
              fractionNumerator: dFrac.num,
              fractionDenominator: dFrac.den,
              fractionString: dFrac.str,
              percentage: (dUnits / totalUnits) * 100,
              totalMonetaryShare: dMoney,
              sharePerIndividual: dMoney / daughters,
              proof: {
                quranAyahArabic: "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ",
                quranAyahTranslation:
                  "Daughters take prescribed share plus proportional Radd.",
                quranReference: "Surah An-Nisā’ (4:11)",
                masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1025",
                ruleExplanation: "Daughters receive proportional share of Radd.",
              },
              notes: [
                `Takes ${dFrac.str} of blood estate, divided equally among ${daughters} daughter(s).`,
              ],
            });
          }
        }
      }
      // 1B.3: Grandchildren through Tanzīl (if children are deceased)
      else if (
        directChildrenCount === 0 &&
        hasDescendants &&
        heirs.deceasedSonsWithChildren
      ) {
        // Under Ja'fari Law, grandchildren inherit through Tanzīl (taking the place of their deceased parent)
        notes.push(
          "Tanzīl (نزول): In the absence of direct children, grandchildren step into the shoes of their deceased parent."
        );
        let totalGrandchildUnits = 0;
        heirs.deceasedSonsWithChildren.forEach((fam) => {
          totalGrandchildUnits += fam.sons * 2 + fam.daughters * 1;
        });

        if (totalGrandchildUnits > 0) {
          const unitVal = distributableToBloodHeirs / totalGrandchildUnits;
          heirs.deceasedSonsWithChildren.forEach((fam, idx) => {
            if (fam.sons > 0) {
              const sonsTot = fam.sons * 2 * unitVal;
              heirShares.push({
                id: `grandsons_${idx}`,
                relationKey: "grandsons",
                tier: 1,
                count: fam.sons,
                fractionNumerator: fam.sons * 2,
                fractionDenominator: totalGrandchildUnits,
                fractionString: `${fam.sons * 2}/${totalGrandchildUnits}`,
                percentage: (sonsTot / distributableToBloodHeirs) * 100,
                totalMonetaryShare: sonsTot,
                sharePerIndividual: sonsTot / fam.sons,
                proof: {
                  quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
                  quranAyahTranslation:
                    "Principle of Tanzīl: Children of the deceased son take the portion of their father.",
                  quranReference: "Surah Al-Ahzāb (33:6)",
                  hadithTextArabic:
                    "ابن الابن يقوم مقام الابن إذا لم يكن للميت ولد لصلبه",
                  hadithSource:
                    "Wasa'il al-Shi'ah, Kitāb al-Mawārīth, Bāb Tanzīl al-Ahfād",
                  masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1029",
                  ruleExplanation:
                    "Grandchildren represent their deceased parent (Tanzīl) and divide in 2:1 ratio.",
                },
                notes: ["Tanzīl: Inherits father's share."],
              });
            }
          });
        }
      }

      // Named Multi-Generational Descendants & Tanzīl Integration
      if (heirs.namedDescendants && heirs.namedDescendants.length > 0) {
        const parentShareTotal = heirShares
          .filter((s) => s.relationKey === "father" || s.relationKey === "mother")
          .reduce((sum, s) => sum + s.totalMonetaryShare, 0);
        const distributableToDescendants = Math.max(
          0,
          distributableToBloodHeirs - parentShareTotal
        );

        const tanzilOutput = calculateNamedTanzilBranches(
          heirs.namedDescendants,
          distributableToDescendants,
          distributableToBloodHeirs,
          deceased.currency
        );

        branchResults = tanzilOutput.branchResults;
        notes.push(...tanzilOutput.notes);

        if (directChildrenCount === 0) {
          heirShares.push(...tanzilOutput.tanzilHeirShares);
        }
      }
    }
  }

  // 4. TIER 2 DISTRIBUTION (Grandparents & Siblings)
  else if (activeTier === 2) {
    notes.push(
      "Tier 2 Active: Grandparents and Siblings inherit as Tier 1 is completely empty."
    );

    const hasMaternal =
      heirs.maternalGrandfatherAlive ||
      heirs.maternalGrandmotherAlive ||
      heirs.uterineBrothersCount > 0 ||
      heirs.uterineSistersCount > 0;

    const hasPaternal =
      heirs.paternalGrandfatherAlive ||
      heirs.paternalGrandmotherAlive ||
      heirs.fullBrothersCount > 0 ||
      heirs.fullSistersCount > 0 ||
      heirs.paternalBrothersCount > 0 ||
      heirs.paternalSistersCount > 0;

    if (hasMaternal && hasPaternal) {
      // Maternal relatives take 1/3, Paternal relatives take 2/3
      const maternalPortion = distributableToBloodHeirs * (1 / 3);
      const paternalPortion = distributableToBloodHeirs * (2 / 3);

      // Maternal side (equal division between male and female)
      const maternalCount =
        (heirs.maternalGrandfatherAlive ? 1 : 0) +
        (heirs.maternalGrandmotherAlive ? 1 : 0) +
        (heirs.uterineBrothersCount || 0) +
        (heirs.uterineSistersCount || 0);

      if (maternalCount > 0) {
        const sharePerMaternal = maternalPortion / maternalCount;
        if (heirs.maternalGrandfatherAlive || heirs.maternalGrandmotherAlive) {
          const gpCount =
            (heirs.maternalGrandfatherAlive ? 1 : 0) +
            (heirs.maternalGrandmotherAlive ? 1 : 0);
          heirShares.push({
            id: "maternal_grandparents",
            relationKey: "maternalGrandparents",
            tier: 2,
            count: gpCount,
            fractionNumerator: 1,
            fractionDenominator: 3,
            fractionString: "1/3",
            percentage: (1 / 3) * 100,
            totalMonetaryShare: sharePerMaternal * gpCount,
            sharePerIndividual: sharePerMaternal,
            proof: {
              quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
              quranAyahTranslation:
                "Maternal line takes 1/3 divided equally without 2:1 distinction.",
              quranReference: "Surah Al-Ahzāb (33:6)",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1045",
              ruleExplanation:
                "Maternal grandparents and uterine siblings share 1/3 equally.",
            },
            notes: ["Maternal relatives share 1/3 equally."],
          });
        }
      }

      // Paternal side (2:1 ratio for full siblings/grandparents)
      const fullB = heirs.fullBrothersCount || 0;
      const fullS = heirs.fullSistersCount || 0;
      const patUnits = fullB * 2 + fullS * 1;
      if (patUnits > 0) {
        const uVal = paternalPortion / patUnits;
        if (fullB > 0) {
          const tot = fullB * 2 * uVal;
          heirShares.push({
            id: "full_brothers",
            relationKey: fullB > 1 ? "fullBrothers" : "fullBrother",
            tier: 2,
            count: fullB,
            fractionNumerator: 2,
            fractionDenominator: 3,
            fractionString: "2/3",
            percentage: (tot / distributableToBloodHeirs) * 100,
            totalMonetaryShare: tot,
            sharePerIndividual: tot / fullB,
            proof: {
              quranAyahArabic: "وَإِن كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
              quranAyahTranslation:
                "If they are brothers and sisters, then for the male is what is equal to the share of two females.",
              quranReference: "Surah An-Nisā’ (4:176)",
              masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1048",
              ruleExplanation:
                "Paternal/full siblings divide the 2/3 residue in a 2:1 ratio.",
            },
            notes: ["Paternal line takes 2/3 in 2:1 ratio."],
          });
        }
      }
    } else if (hasPaternal) {
      // Sole paternal relatives take 100% of distributable residue
      heirShares.push({
        id: "paternal_relatives_tier2",
        relationKey: "paternalRelatives",
        tier: 2,
        count: 1,
        fractionNumerator: 1,
        fractionDenominator: 1,
        fractionString: "1/1",
        percentage: 100,
        totalMonetaryShare: distributableToBloodHeirs,
        sharePerIndividual: distributableToBloodHeirs,
        proof: {
          quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
          quranAyahTranslation:
            "In absence of maternal relatives, paternal siblings take full estate.",
          quranReference: "Surah Al-Ahzāb (33:6)",
          masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1050",
          ruleExplanation:
            "Sole surviving Tier 2 paternal group takes 100% of estate.",
        },
        notes: ["Sole Tier 2 branch takes 100%."],
      });
    } else if (hasMaternal) {
      // Sole maternal relatives take 100% (1/3 Farḍ + 2/3 Radd)
      rejectionOfTasibApplied = true;
      heirShares.push({
        id: "maternal_relatives_tier2",
        relationKey: "maternalRelatives",
        tier: 2,
        count: 1,
        fractionNumerator: 1,
        fractionDenominator: 1,
        fractionString: "1/1",
        percentage: 100,
        totalMonetaryShare: distributableToBloodHeirs,
        sharePerIndividual: distributableToBloodHeirs,
        proof: {
          quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
          quranAyahTranslation:
            "Maternal relatives take entire estate via Farḍ and Radd. Ta'ṣīb is null.",
          quranReference: "Surah Al-Ahzāb (33:6)",
          masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1052",
          ruleExplanation:
            "Maternal relatives receive 1/3 Farḍ + 2/3 Radd. Residue is never given to agnatic cousins.",
        },
        notes: ["1/3 by Farḍ + 2/3 by Radd."],
      });
    }
  }

  // 5. TIER 3 DISTRIBUTION (Uncles and Aunts)
  else if (activeTier === 3) {
    notes.push(
      "Tier 3 Active: Uncles and Aunts inherit as Tiers 1 and 2 are completely empty."
    );

    // Single historical exception in Ja'fari Law:
    // Son of paternal uncle (Ibn 'Amm Abawi) excludes a consanguine uncle (Amm li-Ab)
    const patCousins = heirs.paternalCousinsCount || 0;
    const patUncles = heirs.paternalUnclesCount || 0;

    heirShares.push({
      id: "tier3_relatives",
      relationKey: "paternalUncles",
      tier: 3,
      count: Math.max(1, patUncles + patCousins),
      fractionNumerator: 1,
      fractionDenominator: 1,
      fractionString: "1/1",
      percentage: 100,
      totalMonetaryShare: distributableToBloodHeirs,
      sharePerIndividual:
        distributableToBloodHeirs / Math.max(1, patUncles + patCousins),
      proof: {
        quranAyahArabic: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ",
        quranAyahTranslation:
          "Tier 3 inherits under the priority of closest blood relations.",
        quranReference: "Surah Al-Ahzāb (33:6)",
        masalahReference: "Minhāj al-Ṣāliḥīn, Mas'alah 1065",
        ruleExplanation:
          "Uncles and aunts inherit according to maternal (1/3) and paternal (2/3) shares.",
      },
      notes: ["Tier 3 inherits following Ja'fari priority principles."],
    });
  }

  // Excluded Tiers Banner Notice
  if (excludedTiers.includes(2)) {
    notes.push(
      "Ḥujub al-Ḥirmān (حجبِ حرمان): Presence of Tier 1 heirs completely and permanently excludes Tier 2 (Grandparents & Siblings) and Tier 3 (Uncles & Aunts)."
    );
  } else if (excludedTiers.includes(3)) {
    notes.push(
      "Ḥujub al-Ḥirmān (حجبِ حرمان): Presence of Tier 2 heirs completely excludes Tier 3."
    );
  }

  return {
    balanceSheet,
    activeTier,
    excludedTiers,
    rejectionOfAwlApplied,
    rejectionOfTasibApplied,
    motherHujubNuqsanApplied,
    widowLandRuleApplied: {
      marja: deceased.marja,
      inheritsLandValue: marjaInfo.widowInheritsLandValue,
      explanation: marjaInfo.widowLandRulingEn,
    },
    habwahAwarded,
    heirShares,
    branchResults,
    notes,
  };
}
