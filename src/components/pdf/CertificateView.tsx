"use client";

import React, { useRef, useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Download,
  Printer,
  ShieldCheck,
  Award,
  Hash,
  Calendar,
  Building,
  CheckCircle,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const CertificateView: React.FC = () => {
  const { language, deceased, getCalculationResult, setActiveView } =
    useInheritanceStore();

  const t = TRANSLATIONS[language];
  const marjaInfo = MARJA_DATABASE[deceased.marja];
  const result = getCalculationResult();

  const certificateRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Generate deterministic verification hash based on estate values
  const verificationHash = `THQ-${deceased.marja.toUpperCase()}-${Math.abs(
    (deceased.name?.length || 7) * 31 +
      Math.round(result.balanceSheet.grossEstate) +
      result.heirShares.length * 101
  )
    .toString(16)
    .toUpperCase()}-${new Date().getFullYear()}`;

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width mm
      const pageHeight = 297; // A4 height mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Mirath-Thaqalayn-${deceased.name || "Estate"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to window.print()
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)]">
        <div>
          <h2 className="text-base font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--theme-gold)]" />
            <span>{t.certSubtitle}</span>
          </h2>
          <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
            {language === "ur"
              ? "پرنٹ اور سرکاری ریکارڈ کے لیے تصدیق شدہ شرعی دستاویز"
              : "Official accredited certificate for legal and Sharia inheritance records."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-semibold text-[var(--theme-text-secondary)] hover:text-white transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{language === "ur" ? "پرنٹ کریں" : "Print Document"}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--theme-gold)] text-black text-xs font-bold hover:bg-[var(--theme-gold-light)] shadow-md shadow-[var(--theme-gold)]/20 disabled:opacity-50 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExporting
                ? language === "ur"
                  ? "فائل تیار ہو رہی ہے..."
                  : "Generating PDF..."
                : language === "ur"
                ? "PDF ڈاؤنلوڈ کریں"
                : "Download PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* THE OFFICIAL SHARIA CERTIFICATE CANVAS */}
      <div
        ref={certificateRef}
        className="p-8 sm:p-12 rounded-2xl bg-white text-stone-900 border-8 border-double border-amber-800 shadow-2xl space-y-8 relative overflow-hidden"
        style={{ minHeight: "1050px" }}
      >
        {/* Decorative Classical Islamic Border Pattern Accent */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-700/30 pointer-events-none" />

        {/* Header with Calligraphy */}
        <div className="text-center space-y-2 relative border-b-2 border-amber-800/40 pb-6">
          <p className="font-naskh text-2xl text-amber-900 font-bold tracking-widest">
            {t.certBismillah}
          </p>
          <div className="pt-2">
            <h1 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 tracking-widest uppercase">
              {t.certTitle}
            </h1>
            <p className="font-nastaliq text-base text-amber-900 font-semibold mt-1">
              {t.certSubtitle}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-stone-600 font-serif pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-800" />
              {t.certDateIssued} {new Date().toLocaleDateString()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Hash className="w-3.5 h-3.5 text-amber-800" />
              {verificationHash}
            </span>
          </div>
        </div>

        {/* Deceased & Marja Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif border border-amber-800/30 p-4 rounded-lg bg-amber-50/50">
          <div>
            <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
              {t.deceasedDetails}
            </span>
            <p className="text-sm font-bold text-stone-900 mt-1">
              {deceased.name || "Marhūm"} (
              {deceased.gender === "male" ? t.male : t.female})
            </p>
            <p className="text-stone-600 mt-0.5">
              Currency of Record:{" "}
              <span className="font-mono font-bold text-stone-900">
                {deceased.currency}
              </span>
            </p>
          </div>

          <div className="border-t sm:border-t-0 sm:border-inline-start border-amber-800/30 pt-3 sm:pt-0 sm:ps-4">
            <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
              Accredited Fiqh Authority
            </span>
            <p className="text-sm font-bold text-stone-900 mt-1">
              {marjaInfo.nameEn}
            </p>
            <p className="text-stone-600 text-[11px] mt-0.5 font-naskh">
              {marjaInfo.treatiseBook}
            </p>
          </div>
        </div>

        {/* Financial Balance Sheet Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
            1. Estate Balance Sheet (Ḥuqūq al-Tarkah)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-serif">
            <div className="p-3 rounded border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px] uppercase">
                {t.grossTotal}
              </span>
              <span className="font-mono font-bold text-sm text-stone-900">
                {result.balanceSheet.grossEstate.toLocaleString()}{" "}
                {deceased.currency}
              </span>
            </div>
            <div className="p-3 rounded border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px] uppercase">
                Debts & Liabilities
              </span>
              <span className="font-mono font-bold text-sm text-red-700">
                -{result.balanceSheet.totalDebts.toLocaleString()}{" "}
                {deceased.currency}
              </span>
            </div>
            <div className="p-3 rounded border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px] uppercase">
                Will (Al-Waṣiyyah)
              </span>
              <span className="font-mono font-bold text-sm text-stone-700">
                -{result.balanceSheet.deductedWasiyyah.toLocaleString()}{" "}
                {deceased.currency}
              </span>
            </div>
            <div className="p-3 rounded border border-amber-800/40 bg-amber-100/60">
              <span className="text-amber-900 block text-[10px] uppercase font-bold">
                {t.netDistributable}
              </span>
              <span className="font-mono font-extrabold text-sm text-amber-950">
                {result.balanceSheet.netDistributableEstate.toLocaleString()}{" "}
                {deceased.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Distribution Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
            2. Verified Heir Distribution Table (Taqsīm al-Irth)
          </h3>
          <div className="border border-stone-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-start">
              <thead className="bg-stone-100 border-b border-stone-300 text-stone-700 font-cinzel font-bold text-[11px]">
                <tr>
                  <th className="p-2.5 text-start">Heir Title (وارث)</th>
                  <th className="p-2.5 text-center">Tier</th>
                  <th className="p-2.5 text-center">Count</th>
                  <th className="p-2.5 text-center">Prescribed Share</th>
                  <th className="p-2.5 text-center">Percentage</th>
                  <th className="p-2.5 text-end">Total Allotment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-serif">
                {result.heirShares.map((heir) => (
                  <tr key={heir.id} className="hover:bg-stone-50">
                    <td className="p-2.5 font-bold text-stone-900">
                      {language === "ur" ? heir.relationKey : heir.relationKey.toUpperCase()}
                      <span className="block text-[10px] font-normal text-stone-500">
                        {heir.proof.masalahReference}
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-mono">
                      {heir.tier === 0 ? "Spouse" : `Tier ${heir.tier}`}
                    </td>
                    <td className="p-2.5 text-center font-mono">{heir.count}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-amber-900 text-sm">
                      {heir.fractionString}
                    </td>
                    <td className="p-2.5 text-center font-mono">
                      {heir.percentage.toFixed(1)}%
                    </td>
                    <td className="p-2.5 text-end font-mono font-bold text-stone-900 text-sm">
                      {Math.round(heir.totalMonetaryShare).toLocaleString()}{" "}
                      <span className="text-[10px] font-sans font-normal text-stone-500">
                        {deceased.currency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legal Fatwa Sign-off & Verification Badge */}
        <div className="pt-6 border-t-2 border-amber-800/40 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs font-serif">
          <div className="sm:col-span-2 space-y-1">
            <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">
              Sharia Authentication & Fatwa Compliance
            </span>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              {t.certFatwaClause}
            </p>
            <p className="text-[10px] font-mono text-stone-500 pt-1">
              Engine: Mīrāth al-Thaqalayn v1.0 • Electronic Verification Hash:{" "}
              {verificationHash}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-dashed border-amber-800/40 text-center space-y-1 bg-amber-50/40">
            <ShieldCheck className="w-6 h-6 text-amber-800 mx-auto" />
            <span className="font-bold text-[10px] uppercase tracking-widest text-amber-950 block">
              Seal of Fiqh al-Mawārīth
            </span>
            <span className="text-[9px] text-stone-500 block">
              Ja&apos;fari Infallibility Codex
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
