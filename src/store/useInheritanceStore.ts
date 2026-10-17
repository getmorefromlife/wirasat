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
  Theme,
} from "@/types/fiqh";
import { calculateInheritance } from "@/lib/fiqh-engine";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

export type ViewTab = "wizard" | "tree" | "academy" | "matrix" | "certificate";

export interface InheritanceState {
  // App UI Controls
  language: Language;
  theme: Theme;
  fontScale: FontScale;
  fontStyle: FontStyle;
  activeView: ViewTab;
  wizardStep: number;

  // Domain Entities
  deceased: DeceasedInfo;
  assets: EstateAssets;
  debts: EstateDebts;
  heirs: HeirsInput;

  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setFontScale: (scale: FontScale) => void;
  setFontStyle: (style: FontStyle) => void;
  setActiveView: (view: ViewTab) => void;
  setWizardStep: (step: number) => void;

  updateDeceased: (partial: Partial<DeceasedInfo>) => void;
  setMarja: (marja: MarjaId) => void;
  updateAssets: (partial: Partial<EstateAssets>) => void;
  updateDebts: (partial: Partial<EstateDebts>) => void;
  updateHeirs: (partial: Partial<HeirsInput>) => void;

  loadPreset: (presetId: string) => void;
  resetAll: () => void;
  
  // Computed Engine Result
  getCalculationResult: () => InheritanceCalculationResult;
}

const initialDeceased: DeceasedInfo = {
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

const initialAssets: EstateAssets = {
  cash: 1500000,
  bankAccounts: 2500000,
  residentialLand: 12000000,
  commercialLand: 5000000,
  agriculturalLand: 8000000,
  buildingsAndFixtures: 15000000,
  movableProperty: 2000000,
};

const initialDebts: EstateDebts = {
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

const initialHeirs: HeirsInput = {
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

export const useInheritanceStore = create<InheritanceState>()(
  persist(
    (set, get) => ({
      language: "en",
      theme: "emerald",
      fontScale: "normal",
      fontStyle: "nastaliq",
      activeView: "wizard",
      wizardStep: 1,

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

      setFontScale: (scale) => {
        set({ fontScale: scale });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-font-scale", scale);
        }
      },

      setFontStyle: (style) => set({ fontStyle: style }),
      setActiveView: (view) => set({ activeView: view }),
      setWizardStep: (step) => set({ wizardStep: step }),

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

      loadPreset: (presetId) => {
        const found = SCENARIO_PRESETS.find((p) => p.id === presetId);
        if (found) {
          set({
            deceased: { ...found.deceased },
            assets: { ...found.assets },
            debts: { ...found.debts },
            heirs: { ...found.heirs },
            wizardStep: 5,
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
        }),

      getCalculationResult: () => {
        const { deceased, assets, debts, heirs } = get();
        return calculateInheritance(deceased, assets, debts, heirs);
      },
    }),
    {
      name: "mirath-thaqalayn-storage",
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
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
