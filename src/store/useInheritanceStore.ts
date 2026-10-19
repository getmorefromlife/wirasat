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
  WifeProfile,
  ChildProfile,
  GrandchildProfile,
} from "@/types/fiqh";
import { calculateInheritance } from "@/lib/fiqh-engine";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

export type ViewTab = "wizard" | "dashboard" | "tree" | "academy" | "matrix" | "visuals" | "galaxy" | "glossary";

export interface InheritanceState {
  // App UI Controls
  language: Language;
  theme: Theme;
  fontScale: FontScale;
  fontStyle: FontStyle;
  activeView: ViewTab;
  activeVisualParadigm: string;
  wizardStep: number;
  calculatorMode: "wizard" | "dashboard";
  isSample: boolean;
  activePresetId: string | null;

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
  setActiveVisualParadigm: (paradigm: string) => void;
  setWizardStep: (step: number) => void;
  setCalculatorMode: (mode: "wizard" | "dashboard") => void;

  updateDeceased: (partial: Partial<DeceasedInfo>) => void;
  setMarja: (marja: MarjaId) => void;
  updateAssets: (partial: Partial<EstateAssets>) => void;
  updateDebts: (partial: Partial<EstateDebts>) => void;
  updateHeirs: (partial: Partial<HeirsInput>) => void;
  updateNamedDescendants: (nodes: PersonNode[]) => void;
  toggleChildSurvival: (id: string) => void;
  toggleDaughterBranchRatio: (parentId: string) => void;

  // Multi-Wives Architecture Actions
  setWifeCount: (count: number) => void;
  updateWife: (id: string, partial: Partial<WifeProfile>) => void;
  addWife: () => void;
  removeWife: (id: string) => void;

  // Dynamic Children & Grandchildren Lineage Actions
  setChildrenList: (list: ChildProfile[]) => void;
  addChild: (child?: Partial<ChildProfile>) => void;
  updateChild: (id: string, partial: Partial<ChildProfile>) => void;
  removeChild: (id: string) => void;
  addGrandchild: (parentChildId: string, gc?: Partial<GrandchildProfile>) => void;
  updateGrandchild: (parentChildId: string, gcId: string, partial: Partial<GrandchildProfile>) => void;
  removeGrandchild: (parentChildId: string, gcId: string) => void;

  // Provenance Drawer State
  activeProvenanceKey: string | null;
  isProvenanceOpen: boolean;
  openProvenance: (key: string) => void;
  closeProvenance: () => void;

  // Wasiyyah Guide Drawer State
  isWasiyyahGuideOpen: boolean;
  activeWasiyyahSection: string | null;
  openWasiyyahGuide: (section?: string) => void;
  closeWasiyyahGuide: () => void;

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
  setActivePresetId: (id: string | null) => void;
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

export const initialWives: WifeProfile[] = [
  {
    id: "wife-1",
    name: "Zahra (First Wife / پہلی زوجہ)",
    isAlive: true,
    marriageType: "PERMANENT",
    hasMahrPending: false,
    pendingMahrAmount: 0,
  },
  {
    id: "wife-2",
    name: "Maryam (Second Wife / دوسری زوجہ)",
    isAlive: true,
    marriageType: "PERMANENT",
    hasMahrPending: false,
    pendingMahrAmount: 0,
  },
];

export const initialChildrenList: ChildProfile[] = [
  {
    id: "child-1",
    name: "Ali (Eldest Son across marriages)",
    gender: "MALE",
    isAlive: true,
    motherId: "wife-1",
    birthOrderOrAge: 28, // Absolute eldest son for Habwah
    impediments: { isKiller: false, isNonMuslim: false, isLian: false, "isLi’an": false },
    children: [],
  },
  {
    id: "child-2",
    name: "Hassan (Second Son)",
    gender: "MALE",
    isAlive: true,
    motherId: "wife-2",
    birthOrderOrAge: 24,
    impediments: { isKiller: false, isNonMuslim: false, isLian: false, "isLi’an": false },
    children: [],
  },
  {
    id: "child-3",
    name: "Fatima (Daughter)",
    gender: "FEMALE",
    isAlive: true,
    motherId: "wife-1",
    birthOrderOrAge: 22,
    impediments: { isKiller: false, isNonMuslim: false, isLian: false, "isLi’an": false },
    children: [],
  },
  {
    id: "child-4",
    name: "Zainab (Deceased Daughter)",
    gender: "FEMALE",
    isAlive: false, // Deceased: leaves grandchildren
    motherId: "wife-2",
    birthOrderOrAge: 26,
    impediments: { isKiller: false, isNonMuslim: false, isLian: false, "isLi’an": false },
    children: [
      {
        id: "gc-1",
        name: "Husayn (Nawasa)",
        gender: "MALE",
        isAlive: true,
        parentGender: "FEMALE",
        parentChildId: "child-4",
      },
      {
        id: "gc-2",
        name: "Kulsoom (Nawasi)",
        gender: "FEMALE",
        isAlive: true,
        parentGender: "FEMALE",
        parentChildId: "child-4",
      },
    ],
  },
];

const legacyHeirs: HeirsInput = {
  wives: initialWives,
  childrenList: initialChildrenList,
  namedDescendants: initialNamedDescendants,
  spouseCount: 2,
  fatherAlive: true,
  fatherImpediment: false,
  motherAlive: true,
  motherImpediment: false,
  sonsCount: 2,
  daughtersCount: 1,
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
  spouseCount: 0,
  wives: [],
  childrenList: [],
  namedDescendants: [],
  fatherAlive: false,
  fatherImpediment: false,
  motherAlive: false,
  motherImpediment: false,
  sonsCount: 0,
  daughtersCount: 0,
  deceasedSonsWithChildren: [],
  deceasedDaughtersWithChildren: [],
};

export const useInheritanceStore = create<InheritanceState>()(
  persist(
    (set, get) => ({
      language: "en",
      theme: "emerald",
      fontScale: "normal",
      fontStyle: "nastaliq",
      activeView: "wizard",
      activeVisualParadigm: "tree_tanzil",
      wizardStep: 1,
      calculatorMode: "wizard",
      isSample: false,
      activePresetId: null,

      // Provenance
      activeProvenanceKey: null,
      isProvenanceOpen: false,

      // Wasiyyah Guide Drawer
      isWasiyyahGuideOpen: false,
      activeWasiyyahSection: null,

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
      setActiveVisualParadigm: (paradigm) => set({ activeVisualParadigm: paradigm }),
      setWizardStep: (step) => set({ wizardStep: step }),
      setCalculatorMode: (mode) => set({ calculatorMode: mode }),

      openProvenance: (key) => set({ activeProvenanceKey: key, isProvenanceOpen: true }),
      closeProvenance: () => set({ isProvenanceOpen: false }),

      openWasiyyahGuide: (section) =>
        set({ isWasiyyahGuideOpen: true, activeWasiyyahSection: section || null }),
      closeWasiyyahGuide: () => set({ isWasiyyahGuideOpen: false }),

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
          const namedList = (state.heirs.namedDescendants || []).map((node) => {
            if (node.id === id) {
              return { ...node, isAlive: !node.isAlive };
            }
            return node;
          });
          const childrenList = (state.heirs.childrenList || []).map((child) => {
            if (child.id === id) {
              return { ...child, isAlive: !child.isAlive };
            }
            return child;
          });
          return { heirs: { ...state.heirs, namedDescendants: namedList, childrenList } };
        }),

      toggleDaughterBranchRatio: (parentId) =>
        set((state) => {
          const namedList = (state.heirs.namedDescendants || []).map((node) => {
            if (node.id === parentId) {
              return {
                ...node,
                daughterBranchEqualRatio: !node.daughterBranchEqualRatio,
              };
            }
            return node;
          });
          const childrenList = (state.heirs.childrenList || []).map((child) => {
            if (child.id === parentId) {
              return {
                ...child,
                daughterBranchEqualRatio: !child.daughterBranchEqualRatio,
              };
            }
            return child;
          });
          return { heirs: { ...state.heirs, namedDescendants: namedList, childrenList } };
        }),

      // Multi-Wives Management Actions
      setWifeCount: (count) =>
        set((state) => {
          const current = state.heirs.wives || [];
          const safeCount = Math.max(0, Math.min(4, count));
          let newWives: WifeProfile[] = [...current];
          if (safeCount > current.length) {
            for (let i = current.length; i < safeCount; i++) {
              newWives.push({
                id: `wife-${i + 1}`,
                name: `Wife ${i + 1}`,
                isAlive: true,
                marriageType: "PERMANENT",
                hasMahrPending: false,
                pendingMahrAmount: 0,
              });
            }
          } else if (safeCount < current.length) {
            newWives = newWives.slice(0, safeCount);
          }
          return {
            heirs: {
              ...state.heirs,
              spouseCount: safeCount,
              wives: newWives,
            },
          };
        }),

      updateWife: (id, partial) =>
        set((state) => {
          const wives = (state.heirs.wives || []).map((w) =>
            w.id === id ? { ...w, ...partial } : w
          );
          return { heirs: { ...state.heirs, wives } };
        }),

      addWife: () =>
        set((state) => {
          const current = state.heirs.wives || [];
          if (current.length >= 4) return state;
          const nextIdx = current.length + 1;
          const newWife: WifeProfile = {
            id: `wife-${Date.now()}`,
            name: `Wife ${nextIdx}`,
            isAlive: true,
            marriageType: "PERMANENT",
            hasMahrPending: false,
            pendingMahrAmount: 0,
          };
          const wives = [...current, newWife];
          return {
            heirs: {
              ...state.heirs,
              spouseCount: wives.length,
              wives,
            },
          };
        }),

      removeWife: (id) =>
        set((state) => {
          const wives = (state.heirs.wives || []).filter((w) => w.id !== id);
          return {
            heirs: {
              ...state.heirs,
              spouseCount: wives.length,
              wives,
            },
          };
        }),

      // Dynamic Children & Grandchildren Lineage Actions
      setChildrenList: (childrenList) =>
        set((state) => {
          const sonsCount = childrenList.filter(
            (c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          const daughtersCount = childrenList.filter(
            (c) => c.gender === "FEMALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          return {
            heirs: {
              ...state.heirs,
              childrenList,
              sonsCount,
              daughtersCount,
            },
          };
        }),

      addChild: (child) =>
        set((state) => {
          const current = state.heirs.childrenList || [];
          const nextNum = current.length + 1;
          const firstWifeId = state.heirs.wives?.[0]?.id || "wife-1";
          const newChild: ChildProfile = {
            id: `child-${Date.now()}`,
            name: child?.gender === "FEMALE" ? `Daughter ${nextNum}` : `Son ${nextNum}`,
            gender: "MALE",
            isAlive: true,
            motherId: firstWifeId,
            birthOrderOrAge: 20,
            impediments: { isKiller: false, isNonMuslim: false, isLian: false, "isLi’an": false },
            children: [],
            ...child,
          };
          const childrenList = [...current, newChild];
          const sonsCount = childrenList.filter(
            (c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          const daughtersCount = childrenList.filter(
            (c) => c.gender === "FEMALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          return {
            heirs: {
              ...state.heirs,
              childrenList,
              sonsCount,
              daughtersCount,
            },
          };
        }),

      updateChild: (id, partial) =>
        set((state) => {
          const childrenList = (state.heirs.childrenList || []).map((c) =>
            c.id === id ? { ...c, ...partial } : c
          );
          const sonsCount = childrenList.filter(
            (c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          const daughtersCount = childrenList.filter(
            (c) => c.gender === "FEMALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          return {
            heirs: {
              ...state.heirs,
              childrenList,
              sonsCount,
              daughtersCount,
            },
          };
        }),

      removeChild: (id) =>
        set((state) => {
          const childrenList = (state.heirs.childrenList || []).filter((c) => c.id !== id);
          const sonsCount = childrenList.filter(
            (c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          const daughtersCount = childrenList.filter(
            (c) => c.gender === "FEMALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
          ).length;
          return {
            heirs: {
              ...state.heirs,
              childrenList,
              sonsCount,
              daughtersCount,
            },
          };
        }),

      addGrandchild: (parentChildId, gc) =>
        set((state) => {
          const childrenList = (state.heirs.childrenList || []).map((parent) => {
            if (parent.id !== parentChildId) return parent;
            const currentGC = parent.children || [];
            const isSon = parent.gender === "MALE";
            const gcGender = gc?.gender || "MALE";
            const defaultName = isSon
              ? gcGender === "MALE" ? "Pota (پوتا)" : "Poti (پوتی)"
              : gcGender === "MALE" ? "Nawasa (نواسہ)" : "Nawasi (نواسی)";
            const newGC: GrandchildProfile = {
              id: `gc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              name: defaultName,
              gender: gcGender,
              isAlive: true,
              parentGender: parent.gender,
              parentChildId,
              ...gc,
            };
            return {
              ...parent,
              children: [...currentGC, newGC],
            };
          });
          return { heirs: { ...state.heirs, childrenList } };
        }),

      updateGrandchild: (parentChildId, gcId, partial) =>
        set((state) => {
          const childrenList = (state.heirs.childrenList || []).map((parent) => {
            if (parent.id !== parentChildId) return parent;
            const children = (parent.children || []).map((g) =>
              g.id === gcId ? { ...g, ...partial } : g
            );
            return { ...parent, children };
          });
          return { heirs: { ...state.heirs, childrenList } };
        }),

      removeGrandchild: (parentChildId, gcId) =>
        set((state) => {
          const childrenList = (state.heirs.childrenList || []).map((parent) => {
            if (parent.id !== parentChildId) return parent;
            const children = (parent.children || []).filter((g) => g.id !== gcId);
            return { ...parent, children };
          });
          return { heirs: { ...state.heirs, childrenList } };
        }),

      setActivePresetId: (id) => set({ activePresetId: id }),

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
            activePresetId: presetId,
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
          activePresetId: null,
        }),

      getCalculationResult: () => {
        const { deceased, assets, debts, heirs } = get();
        return calculateInheritance(deceased, assets, debts, heirs);
      },
    }),
    {
      name: "mirath-thaqalayn-storage",
      version: 2,
      migrate: (persisted, version) => {
        const saved = persisted as any;
        // Purge legacy demo states (Ali/Hasan/Zainab, legacy deceased, or unversioned demo)
        const hasLegacyGhostDescendants = saved?.heirs?.namedDescendants?.some((n: any) =>
          n?.name?.includes("Ali") || n?.name?.includes("Fatima") || n?.name?.includes("Zaynab")
        );
        const isLegacyDemo =
          version < 2 &&
          (saved?.isSample ||
            saved?.deceased?.name === legacyDeceased.name ||
            hasLegacyGhostDescendants ||
            JSON.stringify(saved?.assets) === JSON.stringify(legacyAssets));

        if (isLegacyDemo) {
          return {
            ...saved,
            deceased: initialDeceased,
            assets: initialAssets,
            debts: initialDebts,
            heirs: initialHeirs,
            isSample: false,
          };
        }
        return { ...saved, isSample: saved?.isSample ?? false };
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
