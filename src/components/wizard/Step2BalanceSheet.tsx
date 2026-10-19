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
  TreePine,
  Sparkles,
  Receipt,
  FileText,
  BadgePercent,
  Plus,
} from "lucide-react";
import { WasiyyahLink } from "@/components/wasiyyah/WasiyyahLink";

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

  const quickAddAsset = (field: keyof typeof assets, addAmount: number) => {
    const current = assets[field] || 0;
    updateAssets({ [field]: current + addAmount });
  };

  // Percentage calculations for the visual Sharia liquidation bar
  const gross = balanceSheet.grossEstate || 1;
  const debtsPct = Math.min(100, (balanceSheet.totalDebts / gross) * 100);
  const wasiyyahPct = Math.min(
    100 - debtsPct,
    (balanceSheet.deductedWasiyyah / gross) * 100
  );
  const netPct = Math.max(0, 100 - debtsPct - wasiyyahPct);

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[var(--theme-gold)]" />
            <span>{t.step2Title}</span>
          </h2>
          <p className="text-sm sm:text-sm text-[var(--theme-text-secondary)] mt-1">
            {t.step2Desc}
          </p>
        </div>

        <span className="text-sm font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-gold)]/10 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30 self-start sm:self-auto">
          Currency: {deceased.currency}
        </span>
      </div>

      {/* GRAND VISUAL WATERFALL LEDGER CARD */}
      <div className="sacred-card p-6 sm:p-8 rounded-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 inset-inline-end-0 w-80 h-80 bg-[var(--theme-gold)]/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--theme-border)]/50 pb-6">
          <div className="space-y-1">
            <span className="text-sm uppercase font-black tracking-widest text-[var(--theme-gold)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t.netDistributable} (التركة الصافية)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-black font-mono gold-gradient-text tracking-tight">
                {Math.round(balanceSheet.netDistributableEstate).toLocaleString()}
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--theme-gold)]">
                {deceased.currency}
              </span>
            </div>
            <p className="text-sm text-[var(--theme-text-muted)]">
              {language === "ur"
                ? "کفن و دفن، قرضہ جات، خمس و زکوٰۃ اور وصیت کی منہائی کے بعد خالص قابلِ تقسیم ترکہ"
                : "Net estate legally free for distribution to heirs after full Sharia satisfaction."}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
              <span className="text-sm uppercase font-bold text-[var(--theme-text-muted)] block">
                {t.grossTotal}
              </span>
              <span className="font-mono font-bold text-sm text-[var(--theme-text-primary)]">
                {balanceSheet.grossEstate.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-red-500/30">
              <span className="text-sm uppercase font-bold text-red-400 block">
                Total Liabilities
              </span>
              <span className="font-mono font-bold text-sm text-red-400">
                -{(balanceSheet.totalDebts + balanceSheet.deductedWasiyyah).toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-gold)]/30 col-span-2 sm:col-span-1">
              <span className="text-sm uppercase font-bold text-[var(--theme-gold)] block">
                Max Will (1/3rd)
              </span>
              <span className="font-mono font-bold text-sm text-[var(--theme-gold)]">
                {Math.round(balanceSheet.maxAllowableWasiyyah).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Liquidation Waterfall Progress Bar */}
        {balanceSheet.grossEstate > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-[var(--theme-text-muted)]">
              <span>Sharia Liquidation Breakdown</span>
              <span>
                Net Available:{" "}
                <strong className="text-[var(--theme-gold)]">
                  {netPct.toFixed(1)}%
                </strong>
              </span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-black/40 overflow-hidden flex border border-[var(--theme-border)]/50 p-0.5 gap-0.5">
              {debtsPct > 0 && (
                <div
                  style={{ width: `${debtsPct}%` }}
                  className="h-full bg-linear-to-r from-red-700 to-red-500 rounded-full"
                  title={`Debts: ${balanceSheet.totalDebts.toLocaleString()}`}
                />
              )}
              {wasiyyahPct > 0 && (
                <div
                  style={{ width: `${wasiyyahPct}%` }}
                  className="h-full bg-linear-to-r from-amber-600 to-amber-400 rounded-full"
                  title={`Will: ${balanceSheet.deductedWasiyyah.toLocaleString()}`}
                />
              )}
              {netPct > 0 && (
                <div
                  style={{ width: `${netPct}%` }}
                  className="h-full bg-linear-to-r from-emerald-600 to-[var(--theme-gold)] rounded-full"
                  title={`Net Distributable: ${balanceSheet.netDistributableEstate.toLocaleString()}`}
                />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
              <span className="flex items-center gap-1.5 text-red-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                Debts ({debtsPct.toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-800 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Will ({wasiyyahPct.toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Net Distributable ({netPct.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        {/* Insolvency Alert if applicable */}
        {balanceSheet.isInsolvent && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fef2f2] border-2 border-[#ef4444] shadow-sm flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm sm:text-base text-[#991b1b] block">
                {t.insolventWarning}
              </span>
              <p className="leading-relaxed text-[#7f1d1d] text-sm font-medium">
                Total commercial, personal, and religious debts (
                {balanceSheet.totalDebts.toLocaleString()} {deceased.currency}) exceed the gross assets (
                {balanceSheet.grossEstate.toLocaleString()} {deceased.currency}) by a deficit of{" "}
                <strong className="underline decoration-[#ef4444]">
                  {balanceSheet.deficitAmount.toLocaleString()} {deceased.currency}
                </strong>
                . Under Ja&apos;fari Jurisprudence, creditors must be satisfied proportionally; no heir distribution occurs.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* DETAILED FORM INPUTS (TWO COLUMN SPLIT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION A: Gross Assets (Majmū‘ al-Tarkah) */}
        <div className="sacred-card p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-[var(--theme-gold)]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                {t.grossAssets}
              </h3>
            </div>
            <span className="text-sm font-mono font-bold text-[var(--theme-text-muted)]">
              Total: {balanceSheet.grossEstate.toLocaleString()}
            </span>
          </div>

          <div className="space-y-4">
            {/* Cash on Hand */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                <span>{t.cashInHand}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => quickAddAsset("cash", 100000)}
                    className="text-sm px-1.5 py-0.5 rounded bg-[var(--theme-card-subtle)] hover:bg-[var(--theme-gold)]/20 text-[var(--theme-gold)] border border-[var(--theme-border)]"
                  >
                    +100K
                  </button>
                  <button
                    type="button"
                    onClick={() => quickAddAsset("cash", 1000000)}
                    className="text-sm px-1.5 py-0.5 rounded bg-[var(--theme-card-subtle)] hover:bg-[var(--theme-gold)]/20 text-[var(--theme-gold)] border border-[var(--theme-border)]"
                  >
                    +1M
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.cash || ""}
                  onChange={(e) => handleAssetChange("cash", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* Bank Accounts */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                <span>{t.bankBalances}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => quickAddAsset("bankAccounts", 1000000)}
                    className="text-sm px-1.5 py-0.5 rounded bg-[var(--theme-card-subtle)] hover:bg-[var(--theme-gold)]/20 text-[var(--theme-gold)] border border-[var(--theme-border)]"
                  >
                    +1M
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.bankAccounts || ""}
                  onChange={(e) => handleAssetChange("bankAccounts", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* Residential Land */}
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                {t.residentialLand}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.residentialLand || ""}
                  onChange={(e) => handleAssetChange("residentialLand", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* Agricultural Land */}
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                {t.agriculturalLand}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.agriculturalLand || ""}
                  onChange={(e) => handleAssetChange("agriculturalLand", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* Buildings & Constructed Infrastructure */}
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                {t.buildingsStructures}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.buildingsAndFixtures || ""}
                  onChange={(e) => handleAssetChange("buildingsAndFixtures", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* Movable Property (Gold, Jewelry, Cars) */}
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                {t.movableProperty}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={assets.movableProperty || ""}
                  onChange={(e) => handleAssetChange("movableProperty", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Preliminary Deductions (Ḥuqūq al-Tarkah) */}
        <div className="sacred-card p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[var(--theme-gold)]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                {t.preliminaryDeductions}
              </h3>
            </div>
            <span className="text-sm font-mono font-bold text-red-400">
              Total: -{balanceSheet.totalDebts.toLocaleString()}
            </span>
          </div>

          <div className="space-y-4">
            {/* 1. Funeral Expenses */}
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                {t.burialExpenses}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={debts.funeralExpenses || ""}
                  onChange={(e) => handleDebtChange("funeralExpenses", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>
            </div>

            {/* 2. Worldly Debts (Duyūn al-Nās) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                  {t.securedDebts}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={debts.securedDebts || ""}
                    onChange={(e) => handleDebtChange("securedDebts", e.target.value)}
                    className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                    {deceased.currency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                  {t.unsecuredDebts}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={debts.unsecuredDebts || ""}
                    onChange={(e) => handleDebtChange("unsecuredDebts", e.target.value)}
                    className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                    {deceased.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Religious Debts (Ḥuqūq Allāh) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                  {t.unpaidKhums}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={debts.unpaidKhums || ""}
                    onChange={(e) => handleDebtChange("unpaidKhums", e.target.value)}
                    className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                    {deceased.currency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1.5">
                  {t.unfulfilledHajj}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={debts.unfulfilledHajj || ""}
                    onChange={(e) => handleDebtChange("unfulfilledHajj", e.target.value)}
                    className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                    {deceased.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Enforceable Will (Al-Waṣiyyah) */}
            <div className="pt-3 border-t border-[var(--theme-border)]/60 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[var(--theme-gold)] flex items-center gap-1.5">
                  <WasiyyahLink section="thuluth" showBadge={true}>
                    {t.wasiyyahSection}
                  </WasiyyahLink>
                </span>
                <span className="text-sm font-mono text-[var(--theme-text-muted)]">
                  Max: {Math.round(balanceSheet.maxAllowableWasiyyah).toLocaleString()} {deceased.currency}
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={debts.wasiyyahAmount || ""}
                  onChange={(e) => handleDebtChange("wasiyyahAmount", e.target.value)}
                  className="w-full sacred-input px-3.5 py-2.5 ps-16 text-sm font-mono font-bold"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 inset-inline-start-0 flex items-center px-3 text-sm font-mono font-bold text-[var(--theme-gold)] border-inline-end border-[var(--theme-border)]">
                  {deceased.currency}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--theme-bg)]/80 border border-[var(--theme-border)] text-sm text-[var(--theme-text-muted)] leading-relaxed space-y-2">
                <p>
                  {t.wasiyyahLimitNotice}{" "}
                  <WasiyyahLink section="thuluth">
                    {language === "ur" ? "ایک تہائی (ثلث) کے احکام ملاحظہ کریں" : "View 1/3rd ceiling rules"}
                  </WasiyyahLink>
                </p>
                {debts.wasiyyahAmount > balanceSheet.maxAllowableWasiyyah && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fffbeb] border border-[#f59e0b] text-[#78350f]">
                    <input
                      type="checkbox"
                      id="wasiyyahApproved2"
                      checked={debts.wasiyyahApprovedExceedingOneThird}
                      onChange={(e) =>
                        updateDebts({
                          wasiyyahApprovedExceedingOneThird: e.target.checked,
                        })
                      }
                      className="mt-0.5 rounded text-[#245642] focus:ring-[#245642]"
                    />
                    <label htmlFor="wasiyyahApproved2" className="cursor-pointer text-sm font-semibold text-[#78350f]">
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
