"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";

const HEIR_TITLES: Record<string, { en: string; ur: string }> = {
  husband: { en: "Husband (Zawj)", ur: "شوہر (زوج)" },
  wife: { en: "Wife (Zawjah)", ur: "بیوہ (زوجہ)" },
  wives: { en: "Wives (Zawjāt)", ur: "بیوائیں (زوجات)" },
  father: { en: "Father (Ab)", ur: "والد محترم" },
  mother: { en: "Mother (Umm)", ur: "والدہ ماجدہ" },
  son: { en: "Son (Ibn)", ur: "بیٹا" },
  sons: { en: "Sons (Abnā’)", ur: "بیٹے" },
  daughter: { en: "Daughter (Bint)", ur: "بیٹی" },
  daughters: { en: "Daughters (Banāt)", ur: "بیٹیاں" },
  grandsons: { en: "Pote / Grandsons (Tanzīl)", ur: "پوتے (تنزيل)" },
  granddaughters: { en: "Potiyan / Granddaughters (Tanzīl)", ur: "پوتیاں (تنزيل)" },
  grandchild: { en: "Grandchildren (Tanzīl)", ur: "پوتے پوتیاں / نواسے نواسیاں (تنزيل)" },
  pota: { en: "Pota (Grandson via Son)", ur: "پوتا (تنزيل)" },
  poti: { en: "Poti (Granddaughter via Son)", ur: "پوتی (تنزيل)" },
  nawasa: { en: "Nawasa (Grandson via Daughter)", ur: "نواسا (تنزيل)" },
  nawasi: { en: "Nawasi (Granddaughter via Daughter)", ur: "نواسی (تنزيل)" },
  fullBrother: { en: "Full Brother", ur: "سگا بھائی (ابوینی)" },
  fullBrothers: { en: "Full Brothers", ur: "سگے بھائی (ابوینی)" },
  fullSister: { en: "Full Sister", ur: "سگی بہن" },
  fullSisters: { en: "Full Sisters", ur: "سگی بہنیں" },
  maternalGrandparents: { en: "Maternal Grandparents", ur: "نانا و نانی" },
  paternalRelatives: { en: "Paternal Relatives (Tier 2)", ur: "پدری رشتہ دار (طبقہ دوم)" },
  maternalRelatives: { en: "Maternal Relatives (Tier 2)", ur: "مادری رشتہ دار (طبقہ دوم)" },
  paternalUncles: { en: "Paternal Relatives (Tier 3)", ur: "چچا و پھوپھیاں (طبقہ سوم)" },
};

export function EstateSettlementWorksheet() {
  const {
    language,
    deceased,
    assets,
    debts,
    heirs,
    getCalculationResult,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const result = getCalculationResult();
  const marja = MARJA_DATABASE[deceased.marja] || MARJA_DATABASE.sistani;
  const currency = deceased.currency || "PKR";

  const totalGross =
    (assets.cash || 0) +
    (assets.bankAccounts || 0) +
    (assets.residentialLand || 0) +
    (assets.commercialLand || 0) +
    (assets.agriculturalLand || 0) +
    (assets.buildingsAndFixtures || 0) +
    (assets.movableProperty || 0);

  const totalDebts =
    (debts.funeralExpenses || 0) +
    (debts.securedDebts || 0) +
    (debts.unsecuredDebts || 0) +
    (debts.unpaidKhums || 0) +
    (debts.unpaidZakat || 0) +
    (debts.unfulfilledHajj || 0) +
    (debts.kaffarat || 0);

  const netBeforeWasiyyah = Math.max(0, totalGross - totalDebts);
  const wasiyyahAmount = debts.wasiyyahAmount || 0;
  const netEstate = result.balanceSheet.netDistributableEstate;

  const today = new Date().toLocaleDateString(isUr ? "ur-PK" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="print-only hidden p-8 max-w-[210mm] mx-auto bg-white text-stone-900 font-sans leading-normal selection:bg-none"
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* 1. Header with Islamic Inscription */}
      <div className="border-b-2 border-stone-800 pb-4 mb-6 text-center">
        <p className="font-arabic font-bold text-lg text-stone-800 mb-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="font-arabic text-xs text-stone-600 mb-2 italic">
          «لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالأَقْرَبُونَ مِمَّا قَلَّ مِنْهُ أَوْ كَثُرَ نَصِيبًا مَّفْرُوضًا» (النساء: 7)
        </p>
        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-stone-950 font-serif">
          {isUr
            ? "ورقۂ حسابِ وراثت و خاندانی صلح نامہ"
            : "Islamic Inheritance Estate Worksheet & Settlement Draft"}
        </h1>
        <p className="text-xs text-stone-600 mt-1 font-medium">
          {isUr
            ? "جعفری فقہی ضوابط کے تحت ورثاء کے حصص اور مصالحانہ تقسیم کا حسابی خاکہ"
            : "Advisory Ja‘fari Jurisprudential Calculation Worksheet for Family Mutual Settlement"}
        </p>
      </div>

      {/* 2. Metadata Dossier */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs border border-stone-300 rounded-lg p-3 bg-stone-50/60">
        <div className="space-y-1">
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "نامِ متوفیٰ / متوفیہ:" : "Deceased Name:"}{" "}
            </span>
            <span className="font-semibold text-stone-900">
              {deceased.name || (isUr ? "مرحوم / مرحومہ" : "The Deceased")}
            </span>{" "}
            ({deceased.gender === "male" ? (isUr ? "مرد" : "Male") : (isUr ? "خاتون" : "Female")})
          </div>
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "تاریخِ وفات:" : "Date of Passing:"}{" "}
            </span>
            <span>{deceased.dateOfDeath || (isUr ? "درج نہیں" : "Not specified")}</span>
          </div>
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "تاریخِ اجرا:" : "Issue Date:"}{" "}
            </span>
            <span>{today}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "مرجعِ تقلید (مبنائے فتویٰ):" : "Reference Jurist (Marja‘):"}{" "}
            </span>
            <span className="font-semibold text-stone-900">
              {isUr ? marja.nameUr : marja.nameEn}
            </span>
          </div>
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "مستند فقہی ماخذ:" : "Treatise / Risālah:"}{" "}
            </span>
            <span className="text-[11px] text-stone-600">{marja.treatiseBook}</span>
          </div>
          <div>
            <span className="font-bold text-stone-700">
              {isUr ? "کرنسی:" : "Currency Unit:"}{" "}
            </span>
            <span className="font-semibold">{currency}</span>
          </div>
        </div>
      </div>

      {/* 3. Estate Balance Sheet Table */}
      <div className="mb-6">
        <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 mb-2 border-s-4 border-stone-800 ps-2">
          {isUr ? "۱. خلاصۂ ترکہ و واجباتِ شرعیہ (Balance Sheet)" : "1. Estate Inventory & Mandatory Deductions"}
        </h2>
        <table className="w-full text-xs border-collapse border border-stone-300">
          <thead>
            <tr className="bg-stone-100 text-stone-800 font-bold">
              <th className="border border-stone-300 p-2 text-start">{isUr ? "مداتِ ترکہ و واجبات" : "Item Description"}</th>
              <th className="border border-stone-300 p-2 text-end w-36">{isUr ? "رقم / مالیت" : "Amount"} ({currency})</th>
              <th className="border border-stone-300 p-2 text-start">{isUr ? "شرعی حیثیت" : "Fiqhi Classification"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-stone-300 p-1.5 font-semibold">{isUr ? "کُل غیر منقولہ و منقولہ جائیداد (Gross Estate)" : "Total Gross Assets (Cash, Land, Movables)"}</td>
              <td className="border border-stone-300 p-1.5 text-end font-bold">{totalGross.toLocaleString()}</td>
              <td className="border border-stone-300 p-1.5 text-stone-600">{isUr ? "اصل ترکہ" : "Gross Estate Prior to Liabilities"}</td>
            </tr>
            <tr>
              <td className="border border-stone-300 p-1.5 ps-4 text-stone-700">{isUr ? "کفن، دفن و تجہیز (Kafn & Burial)" : "Funeral & Burial Expenses (Kafn wa Tajhīz)"}</td>
              <td className="border border-stone-300 p-1.5 text-end text-rose-700">- {(debts.funeralExpenses || 0).toLocaleString()}</td>
              <td className="border border-stone-300 p-1.5 text-stone-600">{isUr ? "حقِ اول (ترکہ کے اصل سے مقدم)" : "First Priority Before Debts"}</td>
            </tr>
            <tr>
              <td className="border border-stone-300 p-1.5 ps-4 text-stone-700">{isUr ? "قرضہ جات، مہرِ زوجہ و حقوق الناس (Debts & Pending Mahr)" : "Debts to Individuals & Unpaid Mahr"}</td>
              <td className="border border-stone-300 p-1.5 text-end text-rose-700">- {((debts.securedDebts || 0) + (debts.unsecuredDebts || 0)).toLocaleString()}</td>
              <td className="border border-stone-300 p-1.5 text-stone-600">{isUr ? "دیون الناس (واجب الادا)" : "Enforceable Creditor Liabilities"}</td>
            </tr>
            <tr>
              <td className="border border-stone-300 p-1.5 ps-4 text-stone-700">{isUr ? "حقوق اللہ (خمس، زکوٰۃ، حجِ بدل، کفارات)" : "Religious Dues (Khums, Zakat, Hajj, Kaffarah)"}</td>
              <td className="border border-stone-300 p-1.5 text-end text-rose-700">- {((debts.unpaidKhums || 0) + (debts.unpaidZakat || 0) + (debts.unfulfilledHajj || 0) + (debts.kaffarat || 0)).toLocaleString()}</td>
              <td className="border border-stone-300 p-1.5 text-stone-600">{isUr ? "دیون اللہ (واجب الادا)" : "Mandatory Divine Dues"}</td>
            </tr>
            <tr>
              <td className="border border-stone-300 p-1.5 ps-4 text-stone-700">{isUr ? "نافذ العمل وصیت (Wasiyyah - ثلث تک)" : "Enforceable Testament (Waṣiyyah up to 1/3)"}</td>
              <td className="border border-stone-300 p-1.5 text-end text-amber-800">- {wasiyyahAmount.toLocaleString()}</td>
              <td className="border border-stone-300 p-1.5 text-stone-600">{isUr ? "قرض کی ادائیگی کے بعد مابقی کے 1/3 سے" : "Deducted After Debt Liquidation"}</td>
            </tr>
            <tr className="bg-stone-100 font-bold">
              <td className="border border-stone-300 p-2">{isUr ? "صافی قابلِ تقسیم ترکہ (Net Distributable Estate)" : "Net Distributable Estate (Tarakah Ṣāfiyah)"}</td>
              <td className="border border-stone-300 p-2 text-end text-stone-950 font-black">{netEstate.toLocaleString()}</td>
              <td className="border border-stone-300 p-2 text-stone-800">{isUr ? "ورثاء میں تقسیم کی جانے والی حتمی رقم" : "Amount Subject to Quranic Shares"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Heir Allocations Table */}
      <div className="mb-6 page-break-inside-avoid">
        <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 mb-2 border-s-4 border-stone-800 ps-2">
          {isUr ? "۲. ورثاء کے شرعی حصص و حسابی تقسیم (Heir Allotments)" : "2. Prescribed Quranic Shares & Monetary Distribution"}
        </h2>
        <table className="w-full text-xs border-collapse border border-stone-300">
          <thead>
            <tr className="bg-stone-100 text-stone-800 font-bold">
              <th className="border border-stone-300 p-2 text-start">{isUr ? "وارث کا نام و رشتہ" : "Heir & Relation"}</th>
              <th className="border border-stone-300 p-2 text-center w-24">{isUr ? "قرآنی کسر" : "Fraction"}</th>
              <th className="border border-stone-300 p-2 text-center w-20">{isUr ? "فیصد" : "Percentage"}</th>
              <th className="border border-stone-300 p-2 text-end w-32">{isUr ? "رقم" : "Share"} ({currency})</th>
              <th className="border border-stone-300 p-2 text-start">{isUr ? "فقہی سند و دلیل" : "Fiqh Basis & Text"}</th>
            </tr>
          </thead>
          <tbody>
            {result.heirShares.map((share, idx) => {
              const label =
                (HEIR_TITLES[share.relationKey]
                  ? isUr
                    ? HEIR_TITLES[share.relationKey].ur
                    : HEIR_TITLES[share.relationKey].en
                  : share.relationKey) + (share.count > 1 ? ` (${share.count})` : "");

              const proofText = share.proof?.quranReference
                ? `${share.proof.quranReference}${share.proof.masalahReference ? ` • ${share.proof.masalahReference}` : ""}`
                : isUr
                ? "قرآنی حصہ و قاعدۂ رد"
                : "Quranic Share & Radd";

              return (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}>
                  <td className="border border-stone-300 p-2">
                    <div className="font-bold text-stone-900">{label}</div>
                    {share.notes && share.notes.length > 0 && (
                      <div className="text-[10px] text-stone-500 mt-0.5">{share.notes.join("; ")}</div>
                    )}
                  </td>
                  <td className="border border-stone-300 p-2 text-center font-mono font-bold text-stone-800">
                    {share.fractionString || `${share.percentage.toFixed(2)}%`}
                  </td>
                  <td className="border border-stone-300 p-2 text-center font-mono font-semibold">
                    {share.percentage.toFixed(2)}%
                  </td>
                  <td className="border border-stone-300 p-2 text-end font-bold text-stone-950 font-mono">
                    {share.totalMonetaryShare.toLocaleString()}
                  </td>
                  <td className="border border-stone-300 p-2 text-[11px] text-stone-600">
                    {proofText}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-stone-100 font-black">
              <td className="border border-stone-300 p-2">{isUr ? "میزان (کُل حصص)" : "Total Distribution"}</td>
              <td className="border border-stone-300 p-2 text-center">1/1</td>
              <td className="border border-stone-300 p-2 text-center">
                {result.heirShares.reduce((s, h) => s + h.percentage, 0).toFixed(0)}%
              </td>
              <td className="border border-stone-300 p-2 text-end font-mono">
                {result.heirShares.reduce((s, h) => s + h.totalMonetaryShare, 0).toLocaleString()}
              </td>
              <td className="border border-stone-300 p-2 text-[10px] text-stone-600">
                {isUr ? "مکمل ترکہ کی منصفانہ تقسیم بحمد اللہ" : "100% Estate Fully Distributed"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 5. Special Fiqhi Notes / Caveats */}
      <div className="mb-6 p-3 border border-stone-300 rounded-lg bg-stone-50 text-[11px] text-stone-700 space-y-1 page-break-inside-avoid">
        <div className="font-bold text-stone-900 mb-1">
          {isUr ? "خصوصی شرعی نوٹ برائے جائیداد و منقولہ اشیاء:" : "Special Jurisprudential Notes on Immovable Assets:"}
        </div>
        <p>
          • <strong>{isUr ? "حقوقِ بیوہ بر اراضی:" : "Widow's Land Entitlement:"}</strong>{" "}
          {isUr ? marja.widowLandRulingUr : marja.widowLandRulingEn}
        </p>
        {deceased.gender === "male" && deceased.hasEldestSon && (
          <p>
            • <strong>{isUr ? "احکامِ حَبْوہ (بڑے بیٹے کا مخصوص حق):" : "Habwah Right (Eldest Son):"}</strong>{" "}
            {isUr ? marja.habwahRulingUr : marja.habwahRulingEn}
          </p>
        )}
      </div>

      {/* 6. Mutual Consent Agreement (صلح نامہ) */}
      <div className="mb-6 border-t-2 border-stone-800 pt-4 page-break-inside-avoid">
        <h2 className="text-sm font-black uppercase tracking-wider text-stone-900 mb-2 border-s-4 border-stone-800 ps-2">
          {isUr ? "۳. اقرار نامۂ صلح و قبولیتِ ورثاء (Mutual Family Settlement)" : "3. Family Settlement & Mutual Acceptance Clause"}
        </h2>
        <p className="text-xs text-stone-700 mb-4 leading-relaxed italic">
          {isUr
            ? "ہم مندرجہ ذیل تمام ورثاء اقرار کرتے ہیں کہ ہم نے مذکورہ بالا تقسیم کا بغور معائنہ کیا ہے جو کہ فقہ جعفریہ کے مسلمہ اصولوں اور ہمارے منتخب کردہ مرجعِ تقلید کے فتاویٰ کے عین مطابق مرتب کی گئی ہے۔ ہم باہمی رضا و رغبت اور بغیر کسی دباؤ کے اس تقسیم پر متفق ہیں اور اس پر اپنے دستخط ثبت کرتے ہیں۔"
            : "We, the undersigned heirs of the deceased, hereby declare that we have reviewed the estate calculations set forth above, prepared according to Ja‘fari jurisprudence and our referenced Marja‘. We willingly, mutually, and without coercion accept these respective allocations and affix our signatures below."}
        </p>

        {/* Blank Heir Signature Lines */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs mb-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="border-b border-stone-400 pb-1">
              <div className="flex justify-between text-stone-500 text-[10px]">
                <span>{isUr ? `وارث نمبر ${num} (نام و شناختی کارڈ)` : `Heir ${num} (Name & ID)`}: ______________________</span>
                <span>{isUr ? "دستخط / انگوٹھا" : "Signature"}: ____________</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Witnesses & Clerical Verification */}
      <div className="mb-6 grid grid-cols-2 gap-6 text-xs page-break-inside-avoid border-t border-stone-300 pt-4">
        <div className="space-y-3">
          <h3 className="font-bold text-stone-800">{isUr ? "گواہانِ عادل (Witnesses):" : "Witnesses (Shahidayn):"}</h3>
          <div className="border-b border-stone-400 pb-1 text-stone-600">
            1. {isUr ? "نام، ولدیت و شناختی کارڈ" : "Name, Father's Name & ID"}: ________________________
          </div>
          <div className="border-b border-stone-400 pb-1 text-stone-600">
            2. {isUr ? "نام، ولدیت و شناختی کارڈ" : "Name, Father's Name & ID"}: ________________________
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-stone-800">{isUr ? "تصدیقِ عالمِ دین / مجاز وکیلِ مرجع:" : "Reviewing Cleric / Marja‘ Wakil:"}</h3>
          <div className="border-b border-stone-400 pb-1 text-stone-600">
            {isUr ? "عالم / وکیل کا نام و ادارہ" : "Scholar / Wakil Name & Institution"}: ____________________
          </div>
          <div className="flex justify-between items-end pt-2 text-stone-500 text-[10px]">
            <span>{isUr ? "دستخط و مہر" : "Signature & Official Seal"}: _______________</span>
            <span>{isUr ? "تاریخ" : "Date"}: _________</span>
          </div>
        </div>
      </div>

      {/* 8. Non-Authoritative Legal & Fiqhi Disclaimer */}
      <div className="border-t-2 border-stone-800 pt-3 text-[10px] text-stone-600 text-center leading-tight page-break-inside-avoid">
        <p className="font-bold text-stone-800 mb-0.5">
          {isUr ? "شرعی و قانونی وضاحتی اعلامیہ (Disclaimer)" : "Important Legal & Jurisprudential Disclaimer"}
        </p>
        <p>
          {isUr
            ? "یہ دستاویز ایک حسابی اور فقہی رہنمائی ورقہ ہے جو کہ خالصتاً تعلیمی اور خاندانی صلح کے مقاصد کے لیے تیار کیا گیا ہے۔ یہ بذاتِ خود کوئی عدالتی فرمان یا قانونی ڈگری نہیں ہے۔ متنازعہ ملکیت، غیر دستاویزی ہبہ، یا اختلافی قرضوں کی صورت میں اپنے مرجع کے مجاز وکیل یا بااختیار عدالت سے رجوع فرمائیں۔"
            : "This document is a mathematical and jurisprudential advisory worksheet generated strictly for educational and amicable family settlement purposes. It does not constitute a judicial probate grant or an ecclesiastical court decree. In case of contested titles, unrecorded lifetime gifts, or disputed liabilities, formal arbitration before an authorized Wakil of your Marja‘ or a court of law is required."}
        </p>
        <p className="mt-1 text-stone-400 font-mono">
          Wirasat Platform • {isUr ? "علمی کاوش: مولانا سیّد آئمن رضوی" : "Scholarly Initiative by Maulana Syed Imon Rizvi"} • https://shia-wirasat.vercel.app
        </p>
      </div>
    </div>
  );
}
