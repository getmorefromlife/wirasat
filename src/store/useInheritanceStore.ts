import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DeceasedInfo,
  EstateAssets,
  EstateDebts,
  FontScale,
  FontStyle,
  HeirsInput,
  InheritanceCalculationResult,
  Language,
  MarjaId,
  PersonNode,
  Theme,
} from "@/types/fiqh";
import { calculateInheritance } from "@/lib/fiqh-engine";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

export type ViewTab = "wizard" | "tree" | "academy" | "matrix" | "visuals" | "galaxy" | "glossary";

export interface InheritanceState {
  // App UI Controls
  language: Language;
  theme: Theme;
  fontScale: FontScale;
  fontStyle: FontStyle;
  activeView: ViewTab;
  wizardStep: number;
  isSample: boolean;

  // Domain Entities
  activeDesignSystem: import("@/types/designs").DesignSystemId;
  deceased: DeceasedInfo;
  assets: EstateAssets;
  debts: EstateDebts;
  heirs: HeirsInput;

  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setDesignSystem: (design: import("@/types/designs").DesignSystemId) => void;
  setFontScale: (scale: FontScale) => void;
  setFontStyle: (style: FontStyle) => void;
  setActiveView: (view: ViewTab) => void;
  setWizardStep: (step: number) => void;

  updateDeceased: (partial: Partial<DeceasedInfo>) => void;
  setMarja: (marja: MarjaId) => void;
  updateAssets: (partial: Partial<EstateAssets>) => void;
  updateDebts: (partial: Partial<EstateDebts>) => void;
  updateHeirs: (partial: Partial<HeirsInput>) => void;
  updateNamedDescendants: (nodes: PersonNode[]) => void;
  toggleChildSurvival: (id: string) => void;
  toggleDaughterBranchRatio: (parentId: string) => void;

  // Provenance Drawer State
  activeProvenanceKey: string | null;
  isProvenanceOpen: boolean;
  openProvenance: (key: string) => void;
  closeProvenance: () => void;

  // Estate Planning Studio State
  wasiyyahPercentage: number;
  wasiyyahBeneficiary: string;
  lifetimeGiftAmount: number;
  lifetimeGiftRecipient: string;
  setWasiyyahPercentage: (pct: number) => void;
  setWasiyyahBeneficiary: (ben: string) => void;
  setLifetimeGiftAmount: (amt: number) => void;
  setLifetimeGiftRecipient: (rec: string) => void;

  // Glossary State
  selectedGlossaryTermId: string | null;
  setSelectedGlossaryTermId: (id: string | null) => void;
  openGlossaryTerm: (termId: string) => void;

  loadPreset: (presetId: string) => void;
  resetAll: () => void;
  
  // Computed Engine Result
  getCalculationResult: () => InheritanceCalculationResult;
}

const legacyDeceased: DeceasedInfo = {
  gender: "male",
  name: "Marhūm Syed Muhammad",
  dateOfDeath: new Date().toISOString().split("T")[0],
  currency: "PKR",
  marja: "sistani",
  hasEldestSon: true,
  eldestSonIsSaneAndNonAqq: true,
  habwah: {
    quran: true,
    ring: true,
    swordOrDefensiveWeapon: true,
    clothes: true,
    estimatedValue: 150000,
  },
};

const legacyAssets: EstateAssets = {
  cash: 1500000,
  bankAccounts: 2500000,
  residentialLand: 12000000,
  commercialLand: 5000000,
  agriculturalLand: 8000000,
  buildingsAndFixtures: 15000000,
  movableProperty: 2000000,
};

const legacyDebts: EstateDebts = {
  funeralExpenses: 250000,
  securedDebts: 500000,
  unsecuredDebts: 750000,
  unpaidKhums: 600000,
  unpaidZakat: 0,
  unfulfilledHajj: 800000,
  kaffarat: 50000,
  wasiyyahAmount: 2000000,
  wasiyyahApprovedExceedingOneThird: false,
};

export const initialNamedDescendants: PersonNode[] = [
  {
    id: "child-1",
    name: "Ali (Elder Son)",
    gender: "MALE",
    isAlive: false, // Deceased: children inherit via Tanzil
    relation: "SON",
    habwahEligible: true,
    impediments: { isKiller: false, isNonMuslim: false, isLian: false },
    children: [
      {
        id: "gc-1",
        name: "Hasan",
        gender: "MALE",
        isAlive: true,
        relation: "GRANDCHILD",
        parentId: "child-1",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
      },
      {
        id: "gc-2",
        name: "Zahra",
        gender: "FEMALE",
        isAlive: true,
        relation: "GRANDCHILD",
        parentId: "child-1",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
      },
    ],
  },
  {
    id: "child-2",
    name: "Fatima (Daughter)",
    gender: "FEMALE",
    isAlive: false, // Deceased
    relation: "DAUGHTER",
    daughterBranchEqualRatio: false, // false for 2:1, true for 1:1
    impediments: { isKiller: false, isNonMuslim: false, isLian: false },
    children: [
      {
        id: "gc-3",
        name: "Husayn",
        gender: "MALE",
        isAlive: true,
        relation: "GRANDCHILD",
        parentId: "child-2",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
      },
      {
        id: "gc-4",
        name: "Sukayna",
        gender: "FEMALE",
        isAlive: true,
        relation: "GRANDCHILD",
        parentId: "child-2",
        impediments: { isKiller: false, isNonMuslim: false, isLian: false },
      },
    ],
  },
  {
    id: "child-3",
    name: "Zaynab (Direct Daughter)",
    gender: "FEMALE",
    isAlive: false, // Toggle true to test Al-Aqrab Yamna' al-Ab'ad
    relation: "DAUGHTER",
    impediments: { isKiller: false, isNonMuslim: false, isLian: false },
    children: [],
  },
];

const legacyHeirs: HeirsInput = {
  namedDescendants: initialNamedDescendants,
  spouseCount: 1,
  fatherAlive: true,
  fatherImpediment: false,
  motherAlive: true,
  motherImpediment: false,
  sonsCount: 1,
  daughtersCount: 2,
  deceasedSonsWithChildren: [],
  deceasedDaughtersWithChildren: [],
  paternalGrandfatherAlive: false,
  paternalGrandmotherAlive: false,
  maternalGrandfatherAlive: false,
  maternalGrandmotherAlive: false,
  fullBrothersCount: 0,
  fullSistersCount: 0,
  paternalBrothersCount: 0,
  paternalSistersCount: 0,
  uterineBrothersCount: 0,
  uterineSistersCount: 0,
  deceasedSiblingsChildren: [],
  motherBlockingBrothers: 0,
  motherBlockingSisters: 0,
  paternalUnclesCount: 0,
  paternalAuntsCount: 0,
  maternalUnclesCount: 0,
  maternalAuntsCount: 0,
  paternalCousinsCount: 0,
  maternalCousinsCount: 0,
};

// A new calculation starts empty; examples are loaded only on request.
const initialDeceased: DeceasedInfo = {
  ...legacyDeceased,
  name: "",
  dateOfDeath: "",
  hasEldestSon: false,
  eldestSonIsSaneAndNonAqq: false,
  habwah: { quran: false, ring: false, swordOrDefensiveWeapon: false, clothes: false, estimatedValue: 0 },
};
const initialAssets = Object.fromEntries(Object.keys(legacyAssets).map((key) => [key, 0])) as unknown as EstateAssets;
const initialDebts: EstateDebts = {
  ...Object.fromEntries(Object.keys(legacyDebts).filter((key) => key !== "wasiyyahApprovedExceedingOneThird").map((key) => [key, 0])),
  wasiyyahApprovedExceedingOneThird: false,
} as EstateDebts;
const initialHeirs: HeirsInput = {
  ...legacyHeirs,
  spouseCount: 0, fatherAlive: false, motherAlive: false, sonsCount: 0, daughtersCount: 0,
};

export const useInheritanceStore = create<InheritanceState>()(
  persist(
    (set, get) => ({
      language: "en",
      theme: "emerald",
      fontScale: "normal",
      fontStyle: "nastaliq",
      activeView: "wizard",
      wizardStep: 1,
      isSample: false,

      // Provenance
      activeProvenanceKey: null,
      isProvenanceOpen: false,

      // Estate Planning
      wasiyyahPercentage: 15,
      wasiyyahBeneficiary: "grandchild",
      lifetimeGiftAmount: 0,
      lifetimeGiftRecipient: "daughter",

      // Glossary
      selectedGlossaryTermId: null,

      activeDesignSystem: "vanilla",
      deceased: initialDeceased,
      assets: initialAssets,
      debts: initialDebts,
      heirs: initialHeirs,

      setLanguage: (lang) => {
        set({ language: lang });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
          document.documentElement.setAttribute("lang", lang);
        }
      },

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
        }
      },

      setDesignSystem: (design) => {
        set({ activeDesignSystem: design });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-design", design);
        }
      },

      setFontScale: (scale) => {
        set({ fontScale: scale });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-font-scale", scale);
        }
      },

      setFontStyle: (style) => set({ fontStyle: style }),
      setActiveView: (view) => set({ activeView: view }),
      setWizardStep: (step) => set({ wizardStep: step }),

      openProvenance: (key) => set({ activeProvenanceKey: key, isProvenanceOpen: true }),
      closeProvenance: () => set({ isProvenanceOpen: false }),

      setWasiyyahPercentage: (pct) => set({ wasiyyahPercentage: Math.max(0, Math.min(33.33, pct)) }),
      setWasiyyahBeneficiary: (ben) => set({ wasiyyahBeneficiary: ben }),
      setLifetimeGiftAmount: (amt) => set({ lifetimeGiftAmount: Math.max(0, amt) }),
      setLifetimeGiftRecipient: (rec) => set({ lifetimeGiftRecipient: rec }),

      setSelectedGlossaryTermId: (id) => set({ selectedGlossaryTermId: id }),
      openGlossaryTerm: (termId) => set({ selectedGlossaryTermId: termId, activeView: "glossary" }),

      updateDeceased: (partial) =>
        set((state) => ({ deceased: { ...state.deceased, ...partial } })),

      setMarja: (marja) =>
        set((state) => ({ deceased: { ...state.deceased, marja } })),

      updateAssets: (partial) =>
        set((state) => ({ assets: { ...state.assets, ...partial } })),

      updateDebts: (partial) =>
        set((state) => ({ debts: { ...state.debts, ...partial } })),

      updateHeirs: (partial) =>
        set((state) => ({ heirs: { ...state.heirs, ...partial } })),

      updateNamedDescendants: (nodes) =>
        set((state) => ({ heirs: { ...state.heirs, namedDescendants: nodes } })),

      toggleChildSurvival: (id) =>
        set((state) => {
          const list = state.heirs.namedDescendants || initialNamedDescendants;
          const updated = list.map((node) => {
            if (node.id === id) {
              return { ...node, isAlive: !node.isAlive };
            }
            return node;
          });
          return { heirs: { ...state.heirs, namedDescendants: updated } };
        }),

      toggleDaughterBranchRatio: (parentId) =>
        set((state) => {
          const list = state.heirs.namedDescendants || initialNamedDescendants;
          const updated = list.map((node) => {
            if (node.id === parentId) {
              return {
                ...node,
                daughterBranchEqualRatio: !node.daughterBranchEqualRatio,
              };
            }
            return node;
          });
          return { heirs: { ...state.heirs, namedDescendants: updated } };
        }),

      loadPreset: (presetId) => {
        const found = SCENARIO_PRESETS.find((p) => p.id === presetId);
        if (found) {
          set({
            deceased: { ...found.deceased },
            assets: { ...found.assets },
            debts: { ...found.debts },
            heirs: { ...found.heirs },
            wizardStep: 5,
            activeView: "wizard",
            isSample: true,
          });
        }
      },

      resetAll: () =>
        set({
          deceased: initialDeceased,
          assets: initialAssets,
          debts: initialDebts,
          heirs: initialHeirs,
          wizardStep: 1,
          isSample: false,
        }),

      getCalculationResult: () => {
        const { deceased, assets, debts, heirs } = get();
        return calculateInheritance(deceased, assets, debts, heirs);
      },
    }),
    {
      name: "mirath-thaqalayn-storage",
      version: 1,
      migrate: (persisted) => {
        const saved = persisted as Pick<InheritanceState, "language" | "theme" | "activeDesignSystem" | "fontScale" | "fontStyle" | "deceased" | "assets" | "debts" | "heirs"> & { isSample?: boolean };
        // Clear only the former untouched demo; preserve users' own saved work.
        const isLegacyDemo = saved.deceased?.name === legacyDeceased.name &&
          JSON.stringify(saved.assets) === JSON.stringify(legacyAssets) &&
          JSON.stringify(saved.debts) === JSON.stringify(legacyDebts) &&
          JSON.stringify(saved.heirs) === JSON.stringify(legacyHeirs) &&
          JSON.stringify({ ...saved.deceased, dateOfDeath: "" }) === JSON.stringify({ ...legacyDeceased, dateOfDeath: "" });
        return isLegacyDemo
          ? { ...saved, deceased: initialDeceased, assets: initialAssets, debts: initialDebts, heirs: initialHeirs, isSample: false }
          : { ...saved, isSample: saved.isSample ?? false };
      },
      partialize: (state) => ({
        isSample: state.isSample,
        language: state.language,
        theme: state.theme,
        activeDesignSystem: state.activeDesignSystem,
        fontScale: state.fontScale,
        fontStyle: state.fontStyle,
        deceased: state.deceased,
        assets: state.assets,
        debts: state.debts,
        heirs: state.heirs,
      }),
    }
  )
);
