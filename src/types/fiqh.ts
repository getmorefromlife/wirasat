export type MarjaId = 'sistani' | 'khamenei' | 'khoei' | 'makarem' | 'najafi';

export type Language = 'en' | 'ur';
export type Theme = 'emerald' | 'obsidian' | 'parchment';
export type FontScale = 'small' | 'normal' | 'large' | 'scholar';
export type FontStyle = 'nastaliq' | 'naskh';

export interface EstateAssets {
  cash: number;
  bankAccounts: number;
  residentialLand: number;
  agriculturalLand: number;
  commercialLand: number;
  buildingsAndFixtures: number;
  movableProperty: number; // gold, jewelry, cars, furniture
}

export interface EstateDebts {
  funeralExpenses: number; // Kafn wa Tajhiz
  securedDebts: number;    // Mortgages, pledged property debts
  unsecuredDebts: number;  // Commercial/personal debts to people (Duyun al-Nas)
  unpaidKhums: number;     // Huquq Allah
  unpaidZakat: number;     // Huquq Allah
  unfulfilledHajj: number; // Hajj al-Badal if obligatory
  kaffarat: number;        // Religious expiations
  wasiyyahAmount: number;  // Enforceable Will (up to 1/3)
  wasiyyahApprovedExceedingOneThird: boolean;
}

export interface HabwahItems {
  quran: boolean;
  ring: boolean;
  swordOrDefensiveWeapon: boolean;
  clothes: boolean;
  estimatedValue: number;
}

export interface Impediments {
  isNonMuslim: boolean;    // Kufr / Irtidad
  isKiller: boolean;       // Qatl (unlawful homicide)
  isLianDisowned: boolean; // Lian (formal sworn disavowal)
}

export interface DeceasedInfo {
  gender: 'male' | 'female';
  name: string;
  dateOfDeath?: string;
  currency: string;
  marja: MarjaId;
  hasEldestSon: boolean;
  eldestSonIsSaneAndNonAqq: boolean;
  habwah: HabwahItems;
}

export interface PersonNode {
  id: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  isAlive: boolean;
  relation: 'SPOUSE' | 'FATHER' | 'MOTHER' | 'SON' | 'DAUGHTER' | 'GRANDCHILD' | 'SIBLING' | 'NEPHEW_NIECE' | 'UNCLE_AUNT' | 'COUSIN';
  parentId?: string; // Links grandchild/descendant to their specific parent
  impediments: {
    isKiller: boolean;
    isNonMuslim: boolean;
    isLian: boolean;
    "isLi’an"?: boolean;
  };
  habwahEligible?: boolean; // For eldest living sane son of a deceased father
  children?: PersonNode[];  // Recursive sub-branch
  daughterBranchEqualRatio?: boolean; // Fatwa toggle: true for 1:1 classical equality, false for 2:1 ahwat wujubi
}

export interface BranchCalculationResult {
  person: PersonNode;
  parentHypotheticalShare: number; // The fractional share of the deceased parent
  subBranchShare: number;          // The portion within this sibling cluster
  finalFraction: string;           // E.g., "1/6", "7/24"
  percentage: number;
  monetaryValue: number;
  fiqhBasisUrdu: string;
  fiqhBasisEnglish: string;
  isExcluded: boolean;             // True if blocked by living closer relative (al-Aqrab Yamna' al-Ab'ad)
  exclusionReason?: string;
}

export interface HeirsInput {
  // Named multi-generational descendants (Tanzīl representation)
  namedDescendants?: PersonNode[];

  // Spouses
  spouseCount: number; // 0 or 1 for husband (if deceased female); 0 to 4 for wives (if deceased male)
  
  // Tier 1
  fatherAlive: boolean;
  fatherImpediment: boolean;
  motherAlive: boolean;
  motherImpediment: boolean;
  sonsCount: number;
  daughtersCount: number;
  // If children are deceased but left grandchildren
  deceasedSonsWithChildren: Array<{ sons: number; daughters: number }>;
  deceasedDaughtersWithChildren: Array<{ sons: number; daughters: number }>;

  // Tier 2 (Unlocked only if Tier 1 empty)
  paternalGrandfatherAlive: boolean;
  paternalGrandmotherAlive: boolean;
  maternalGrandfatherAlive: boolean;
  maternalGrandmotherAlive: boolean;
  fullBrothersCount: number;
  fullSistersCount: number;
  paternalBrothersCount: number;
  paternalSistersCount: number;
  uterineBrothersCount: number;
  uterineSistersCount: number;
  deceasedSiblingsChildren: Array<{
    type: 'full' | 'paternal' | 'uterine';
    sons: number;
    daughters: number;
  }>;

  // Sibling blocking check for mother in Tier 1
  motherBlockingBrothers: number; // Full or paternal brothers alive and mature
  motherBlockingSisters: number;  // Full or paternal sisters alive and mature

  // Tier 3 (Unlocked only if Tier 1 and 2 empty)
  paternalUnclesCount: number;
  paternalAuntsCount: number;
  maternalUnclesCount: number;
  maternalAuntsCount: number;
  paternalCousinsCount: number; // special case: son of paternal uncle
  maternalCousinsCount: number;
}

export interface ShariaProof {
  quranAyahArabic: string;
  quranAyahTranslation: string;
  quranReference: string; // e.g. "Surah An-Nisa (4:11)"
  hadithTextArabic?: string;
  hadithTextTranslation?: string;
  hadithSource?: string;   // e.g. "Wasa'il al-Shi'ah, Kitab al-Mawarith, Vol 26"
  masalahReference: string; // e.g. "Minhaj al-Salihin, Mas'alah 1024"
  ruleExplanation: string;
}

export interface HeirShareResult {
  id: string;
  relationKey: string;
  tier: 1 | 2 | 3 | 0; // 0 = Spouse
  count: number;
  fractionNumerator: number;
  fractionDenominator: number;
  fractionString: string;
  percentage: number;
  totalMonetaryShare: number;
  sharePerIndividual: number;
  landValueEntitlement?: number;
  movableAndBuildingEntitlement?: number;
  proof: ShariaProof;
  notes: string[];
}

export interface BalanceSheetSummary {
  grossEstate: number;
  burialAndFuneral: number;
  debtsToPeople: number;
  debtsToAllah: number;
  totalDebts: number;
  estateAfterDebts: number;
  maxAllowableWasiyyah: number;
  claimedWasiyyah: number;
  deductedWasiyyah: number;
  netDistributableEstate: number;
  habwahDeducted: number;
  isInsolvent: boolean;
  deficitAmount: number;
}

export interface InheritanceCalculationResult {
  balanceSheet: BalanceSheetSummary;
  activeTier: 1 | 2 | 3 | null;
  excludedTiers: number[];
  rejectionOfAwlApplied: boolean;
  rejectionOfTasibApplied: boolean;
  motherHujubNuqsanApplied: boolean;
  widowLandRuleApplied: {
    marja: MarjaId;
    inheritsLandValue: boolean;
    explanation: string;
  };
  habwahAwarded: {
    awarded: boolean;
    reason: string;
    items: string[];
    value: number;
  };
  heirShares: HeirShareResult[];
  branchResults?: BranchCalculationResult[];
  notes: string[];
}

export interface ScenarioPreset {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  deceased: DeceasedInfo;
  assets: EstateAssets;
  debts: EstateDebts;
  heirs: HeirsInput;
}
