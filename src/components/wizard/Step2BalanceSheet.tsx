"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Coins,
  Calculator,
  AlertTriangle,
  Scale,
  Landmark,
  ShieldAlert,
  Building,
  CheckCircle2,
} from "lucide-react";

export const Step2BalanceSheet: React.FC = () => {
  const {
    language,
    deceased,
    assets,
    debts,
    updateAssets,
    updateDebts,
    getCalculationResult,
  } = useInheritanceStore();

  const t = TRANSLATIONS[language];
  const { balanceSheet } = getCalculationResult();

  const handleAssetChange = (field: keyof typeof assets, value: string) => {
    const num = Math.max(0, parseFloat(value) || 0);
    updateAssets({ [field]: num });
  };

  const handleDebtChange = (field: keyof typeof debts, value: string) => {
    const num = Math.max(0, parseFloat(value) || 0);
    updateDebts({ [field]: num });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4">
        <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[var(--theme-gold)]" />
          {t.step2Title}
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step2Desc}
        </p>
      </div>

      {/* Live Net Distributable Estate Summary Banner */}
      <div
        className={`p-5 rounded-xl border ${
          balanceSheet.isInsolvent
            ? "bg-red-950/40 border-red-500/60 text-red-200"
            : "bg-[var(--theme-card)] border-[var(--theme-gold)]/60 text-[var(--theme-text-primary)]"
        } shadow-lg`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[var(--theme-gold)] block">
              {t.netDistributable} (التركة الصافية)
            </span>
            <div className="text-2xl md:text-3xl font-extrabold font-mono mt-1 text-[var(--theme-text-primary)]">
              {balanceSheet.netDistributableEstate.toLocaleString()}{" "}
              <span className="text-sm font-sans font-medium text-[var(--theme-gold)]">
                {deceased.currency}
              </span>
            </div>
            {balanceSheet.isInsolvent && (
              <p className="text-xs text-red-400 font-semibold mt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                {t.insolventWarning} (Deficit: {balanceSheet.deficitAmount.toLocaleString()} {deceased.currency})
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t md:border-t-0 md:border-inline-start border-[var(--theme-border)] pt-3 md:pt-0 md:ps-6">
            <div>
              <span className="text-[var(--theme-text-muted)] block">{t.grossTotal}</span>
              <span className="font-mono font-bold text-sm">
                {balanceSheet.grossEstate.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[var(--theme-text-muted)] block">{t.totalDeductions}</span>
              <span className="font-mono font-bold text-sm text-red-400">
                -{(balanceSheet.totalDebts + balanceSheet.deductedWasiyyah).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[var(--theme-text-muted)] block">Max Will (1/3)</span>
              <span className="font-mono font-bold text-sm text-[var(--theme-gold)]">
                {Math.round(balanceSheet.maxAllowableWasiyyah).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION A: Gross Assets */}
        <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--theme-border)]/60 pb-3">
            <Coins className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.grossAssets}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.cashInHand}
              </label>
              <input
                type="number"
                min="0"
                value={assets.cash || ""}
                onChange={(e) => handleAssetChange("cash", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.bankBalances}
              </label>
              <input
                type="number"
                min="0"
                value={assets.bankAccounts || ""}
                onChange={(e) => handleAssetChange("bankAccounts", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.residentialLand}
              </label>
              <input
                type="number"
                min="0"
                value={assets.residentialLand || ""}
                onChange={(e) => handleAssetChange("residentialLand", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.commercialLand}
              </label>
              <input
                type="number"
                min="0"
                value={assets.commercialLand || ""}
                onChange={(e) => handleAssetChange("commercialLand", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.agriculturalLand}
              </label>
              <input
                type="number"
                min="0"
                value={assets.agriculturalLand || ""}
                onChange={(e) => handleAssetChange("agriculturalLand", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.buildingsStructures}
              </label>
              <input
                type="number"
                min="0"
                value={assets.buildingsAndFixtures || ""}
                onChange={(e) => handleAssetChange("buildingsAndFixtures", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.movableProperty}
              </label>
              <input
                type="number"
                min="0"
                value={assets.movableProperty || ""}
                onChange={(e) => handleAssetChange("movableProperty", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* SECTION B: Preliminary Deductions (Ḥuqūq al-Tarkah) */}
        <div className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--theme-border)]/60 pb-3">
            <Scale className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.preliminaryDeductions}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.burialExpenses}
              </label>
              <input
                type="number"
                min="0"
                value={debts.funeralExpenses || ""}
                onChange={(e) => handleDebtChange("funeralExpenses", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />
            </div>

            {/* Worldly Debts (Duyūn al-Nās) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.securedDebts}
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts.securedDebts || ""}
                  onChange={(e) => handleDebtChange("securedDebts", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.unsecuredDebts}
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts.unsecuredDebts || ""}
                  onChange={(e) => handleDebtChange("unsecuredDebts", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Religious Debts (Ḥuqūq Allāh) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.unpaidKhums}
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts.unpaidKhums || ""}
                  onChange={(e) => handleDebtChange("unpaidKhums", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.unpaidZakat}
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts.unpaidZakat || ""}
                  onChange={(e) => handleDebtChange("unpaidZakat", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.unfulfilledHajj}
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts.unfulfilledHajj || ""}
                  onChange={(e) => handleDebtChange("unfulfilledHajj", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                  placeholder="0"
                />
              </div>
            </div>

            {/* 4. Enforceable Will (Al-Waṣiyyah) */}
            <div className="pt-2 border-t border-[var(--theme-border)]/60">
              <label className="block text-xs font-semibold text-[var(--theme-gold)] mb-1">
                {t.wasiyyahSection}
              </label>
              <input
                type="number"
                min="0"
                value={debts.wasiyyahAmount || ""}
                onChange={(e) => handleDebtChange("wasiyyahAmount", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm font-mono text-[var(--theme-text-primary)] focus:ring-1 focus:ring-[var(--theme-gold)]"
                placeholder="0"
              />

              <div className="mt-2 text-xs text-[var(--theme-text-muted)] bg-[var(--theme-bg)]/80 p-2.5 rounded-lg border border-[var(--theme-border)]">
                <p>{t.wasiyyahLimitNotice}</p>
                {debts.wasiyyahAmount > balanceSheet.maxAllowableWasiyyah && (
                  <div className="mt-2 flex items-start gap-2 text-amber-400">
                    <input
                      type="checkbox"
                      id="wasiyyahApproved"
                      checked={debts.wasiyyahApprovedExceedingOneThird}
                      onChange={(e) =>
                        updateDebts({
                          wasiyyahApprovedExceedingOneThird: e.target.checked,
                        })
                      }
                      className="mt-0.5 rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)]"
                    />
                    <label htmlFor="wasiyyahApproved" className="text-xs cursor-pointer">
                      {t.wasiyyahApproved}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
