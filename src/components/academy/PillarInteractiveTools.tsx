"use client";

import React, { useState } from "react";
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Layers,
  Crown,
  Users,
  Lock,
  Unlock,
  ArrowRight,
  BookOpen,
  Info,
  Sparkles,
} from "lucide-react";
import { InteractiveToolType } from "@/lib/academy-curriculum";

interface ToolProps {
  toolType: InteractiveToolType;
  language: "en" | "ur";
}

export const PillarInteractiveTool: React.FC<ToolProps> = ({ toolType, language }) => {
  const isUr = language === "ur";

  switch (toolType) {
    case "WATERFALL":
      return <WaterfallSimulator isUr={isUr} />;
    case "DUAL_ROOTS":
      return <DualRootsMatrix isUr={isUr} />;
    case "TIER_ELEVATOR":
      return <TierElevatorSimulator isUr={isUr} />;
    case "EQUILIBRIUM":
      return <EquilibriumBalanceSheet isUr={isUr} />;
    case "FRACTION_DIAL":
      return <FractionDialSimulator isUr={isUr} />;
    case "TANZIL_TREE":
      return <TanzilTreeSimulator isUr={isUr} />;
    case "DISQUALIFIER_GRID":
      return <DisqualifierSwitchboard isUr={isUr} />;
    case "CONTINGENCY_SIM":
      return <ContingencySimulator isUr={isUr} />;
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------
   TOOL 1: THE ESTATE CLEARANCE WATERFALL
   ------------------------------------------------------------------------- */
function WaterfallSimulator({ isUr }: { isUr: boolean }) {
  const [gross, setGross] = useState<number>(10000000);
  const [funeral, setFuneral] = useState<number>(200000);
  const [debts, setDebts] = useState<number>(2800000); // 1.8M loan + 1M Mahr
  const [divine, setDivine] = useState<number>(1000000); // Khums / Hajj
  const [requestedWill, setRequestedWill] = useState<number>(3000000);

  const afterFuneral = Math.max(0, gross - funeral);
  const afterDebts = Math.max(0, afterFuneral - debts);
  const afterDivine = Math.max(0, afterDebts - divine);
  const maxAllowableWill = Math.floor(afterDivine / 3);
  const approvedWill = Math.min(requestedWill, maxAllowableWill);
  const netEstate = Math.max(0, afterDivine - approvedWill);

  const formatPKR = (val: number) => `₨ ${val.toLocaleString()}`;

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-5 text-stone-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "ترکے کے اخراجات کی شرعی آبشار (واٹر فال سیمولیٹر)" : "Estate Liquidation Waterfall Simulator"}
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#245642]/10 text-[#245642]">
          {isUr ? "شرعی ترجیحات" : "Statutory Priority Order"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-bold text-stone-800 mb-1">
              <span>{isUr ? "کل ترکہ (Gross Estate):" : "Gross Principal Estate:"}</span>
              <span className="text-[#245642] font-mono">{formatPKR(gross)}</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="20000000"
              step="500000"
              value={gross}
              onChange={(e) => setGross(Number(e.target.value))}
              className="w-full accent-[#245642]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {isUr ? "۱. کفن و تدفین:" : "1. Funeral (Kafn):"}
              </label>
              <input
                type="number"
                value={funeral || ""}
                placeholder="0"
                onChange={(e) => setFuneral(Math.max(0, Number(e.target.value)))}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {isUr ? "۲. قرضے و مہر:" : "2. Debts & Mahr:"}
              </label>
              <input
                type="number"
                value={debts || ""}
                placeholder="0"
                onChange={(e) => setDebts(Math.max(0, Number(e.target.value)))}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {isUr ? "۳. واجبات (خمس/حج):" : "3. Divine Dues (Khums):"}
              </label>
              <input
                type="number"
                value={divine || ""}
                placeholder="0"
                onChange={(e) => setDivine(Math.max(0, Number(e.target.value)))}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {isUr ? "۴. وصیت (Will Request):" : "4. Written Will Request:"}
              </label>
              <input
                type="number"
                value={requestedWill || ""}
                placeholder="0"
                onChange={(e) => setRequestedWill(Math.max(0, Number(e.target.value)))}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white font-mono text-xs"
              />
            </div>
          </div>

          {requestedWill > maxAllowableWill && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {isUr
                  ? `وصیت ایک تہائی (${formatPKR(maxAllowableWill)}) سے زائد ہے۔ اضافی رقم تمام بالغ ورثاء کی رضامندی کے بغیر نافذ نہیں ہو سکتی۔`
                  : `Will exceeds the statutory 1/3rd ceiling (${formatPKR(maxAllowableWill)}). Excess is legally void unless all mature heirs consent.`}
              </span>
            </div>
          )}
        </div>

        {/* Live Waterfall Visualization */}
        <div className="space-y-2 text-xs bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex justify-between items-center py-1 border-b border-stone-100">
            <span className="text-stone-600">{isUr ? "ابتدائی ترکہ:" : "Principal Gross Estate:"}</span>
            <span className="font-mono font-bold text-stone-800">{formatPKR(gross)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-stone-100 text-red-700">
            <span>{isUr ? "منفی کفن و تدفین:" : "Less: Funeral & Shroud:"}</span>
            <span className="font-mono">- {formatPKR(funeral)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-stone-100 text-red-700">
            <span>{isUr ? "منفی قرضے اور بیوہ کا مہر:" : "Less: Debts & Wife's Mahr:"}</span>
            <span className="font-mono">- {formatPKR(debts)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-stone-100 text-red-700">
            <span>{isUr ? "منفی خمس و حجِ بدل:" : "Less: Divine Dues (Khums/Hajj):"}</span>
            <span className="font-mono">- {formatPKR(divine)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-stone-100 text-amber-800">
            <span>{isUr ? "منفی مجاز وصیت (زیادہ سے زیادہ ۳۳.۳٪):" : "Less: Enforceable Will (Max 1/3rd):"}</span>
            <span className="font-mono">- {formatPKR(approvedWill)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 text-[#0A2118] font-bold text-sm bg-[#FAF8F5] p-2 rounded-lg border border-[#245642]/20 mt-2">
            <span>{isUr ? "خالص قابلِ تقسیم ترکہ (التركة الصافية):" : "Net Distributable Estate:"}</span>
            <span className="font-mono text-[#245642] text-base">{formatPKR(netEstate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 2: DUAL ROOTS OF TITLE (SABAB VS NASAB)
   ------------------------------------------------------------------------- */
function DualRootsMatrix({ isUr }: { isUr: boolean }) {
  const [marriageType, setMarriageType] = useState<"permanent" | "mutah">("permanent");
  const [divorceStatus, setDivorceStatus] = useState<"none" | "rajie" | "bain" | "marad">("none");

  const spouseInherits =
    marriageType === "permanent" &&
    (divorceStatus === "none" || divorceStatus === "rajie" || divorceStatus === "marad");

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <Crown className="w-5 h-5 text-amber-600" />
        <h4 className="font-bold text-base text-[#0A2118]">
          {isUr ? "سبب بمقابلہ نسب: ازدواجی رشتہ اور وراثت کی جانچ" : "Sabab vs. Nasab: Matrimonial Eligibility Inspector"}
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Left: Inputs */}
        <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-200">
          <div>
            <label className="block font-bold text-stone-800 mb-1">
              {isUr ? "نکاح کی شرعی نوعیت:" : "Nature of Marriage Contract:"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMarriageType("permanent")}
                className={`p-2 rounded-lg font-bold border transition-all ${
                  marriageType === "permanent"
                    ? "bg-[#245642] text-white border-[#245642]"
                    : "bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {isUr ? "نکاحِ دائمی (Permanent)" : "Permanent Nikāḥ"}
              </button>
              <button
                type="button"
                onClick={() => setMarriageType("mutah")}
                className={`p-2 rounded-lg font-bold border transition-all ${
                  marriageType === "mutah"
                    ? "bg-[#245642] text-white border-[#245642]"
                    : "bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {isUr ? "نکاحِ منقطع (Mut'ah)" : "Temporary (Mut‘ah)"}
              </button>
            </div>
          </div>

          {marriageType === "permanent" && (
            <div>
              <label className="block font-bold text-stone-800 mb-1">
                {isUr ? "طلاق یا بیماری کی صورتحال:" : "Marital Status / Divorce Condition:"}
              </label>
              <select
                value={divorceStatus}
                onChange={(e) => setDivorceStatus(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-stone-300 bg-white font-medium"
              >
                <option value="none">{isUr ? "کوئی طلاق نہیں — نکاح بحال ہے" : "Active Marriage (No Divorce)"}</option>
                <option value="rajie">{isUr ? "طلاقِ رجعی (عدت کے اندر انتقال)" : "Revocable Divorce (Within ‘Iddah)"}</option>
                <option value="bain">{isUr ? "طلاقِ بائن / خلع (عدت ختم یا غیر رجعی)" : "Irrevocable Divorce (Bā’in / Khul‘)"}</option>
                <option value="marad">{isUr ? "مرض الموت میں طلاق (ایک سال کے اندر انتقال)" : "Terminal Illness Divorce (Maraḍ al-Mawt)"}</option>
              </select>
            </div>
          )}
        </div>

        {/* Right: Outcome */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-stone-700">{isUr ? "شرعی حقِ وراثت:" : "Statutory Inheritance Right:"}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                  spouseInherits
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {spouseInherits ? (isUr ? "وارث ہے (مستقل حصہ)" : "INHERITS AS CO-SHARER") : (isUr ? "محروم (وارث نہیں)" : "BARRED FROM INHERITANCE")}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mt-2">
              {marriageType === "mutah" ? (
                isUr
                  ? "فقہِ جعفریہ کے متفقہ فیصلے کے مطابق نکاحِ منقطع (متعہ) میں زوجین کے مابین وراثت کا حق قائم نہیں ہوتا، خواہ عقد میں شرط رکھی گئی ہو (آیت اللہ سیستانی / خوئی)۔"
                  : "Under mainstream Ja‘farī jurisprudence, a spouse in a temporary marriage (Mut‘ah) does not inherit statutory shares, even if explicitly stipulated in the contract."
              ) : divorceStatus === "bain" ? (
                isUr
                  ? "طلاقِ بائن واقع ہوتے ہی ازدواجی رشتہ فورا منقطع ہو جاتا ہے اور وراثت کا حق کلی طور پر ختم ہو جاتا ہے۔"
                  : "An irrevocable divorce (Bā’in) instantly severs the matrimonial bond. Mutual succession rights are completely extinguished."
              ) : divorceStatus === "rajie" ? (
                isUr
                  ? "طلاقِ رجعی کی عدت کے دوران شرعی طور پر زوجیت برقرار رہتی ہے، چنانچہ عدت میں انتقال پر شوہر اور بیوی ایک دوسرے کے وارث بنتے ہیں۔"
                  : "During the revocable ‘Iddah period, the marital bond remains legally active. The surviving spouse inherits their full statutory share."
              ) : divorceStatus === "marad" ? (
                isUr
                  ? "مرض الموت کی طلاق: اگر شوہر نے مرنے کی حالت میں طلاق دی ہو تو مطلقہ عورت ایک قمری سال تک وراثت کی حقدار رہتی ہے بشرطیکہ اس نے دوسرا نکاح نہ کیا ہو۔"
                  : "Terminal Illness Protection: If divorced while the husband suffered from his fatal illness, the widow inherits for up to one full lunar year (if unmarried)."
              ) : (
                isUr
                  ? "شرعی نکاحِ دائمی کی بنیاد پر زوجین خونی رشتہ داروں کے تمام ۳ طبقات کے ساتھ بلا استثناء ہمیشہ شریکِ وراثت رہتے ہیں اور انہیں کوئی بھی رشتہ دار محروم نہیں کر سکتا۔"
                  : "By virtue of Sabab, spouses inherit unconditionally alongside all 3 blood tiers and can never be excluded by any relative."
              )}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-[#245642] font-semibold">
            {isUr
              ? "اولاد کے ساتھ: زوجہ ۱/۸، شوہر ۱/۴ | بغیر اولاد: زوجہ ۱/۴، شوہر ۱/۲"
              : "With Children: Wife 1/8, Husband 1/4 | No Children: Wife 1/4, Husband 1/2"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 3: THREE-TIER EXCLUSION GATEKEEPER
   ------------------------------------------------------------------------- */
function TierElevatorSimulator({ isUr }: { isUr: boolean }) {
  const [hasTier1Child, setHasTier1Child] = useState<boolean>(true);
  const [hasTier1Parent, setHasTier1Parent] = useState<boolean>(false);
  const [hasTier2Sibling, setHasTier2Sibling] = useState<boolean>(true);
  const [hasTier2Grandparent, setHasTier2Grandparent] = useState<boolean>(false);
  const [hasTier3Uncle, setHasTier3Uncle] = useState<boolean>(true);

  const tier1Active = hasTier1Child || hasTier1Parent;
  const tier2Active = !tier1Active && (hasTier2Sibling || hasTier2Grandparent);
  const tier3Active = !tier1Active && !tier2Active && hasTier3Uncle;

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "حجبِ حرمان اور ۳ طبقات کا گیٹ کیپر سیمولیٹر" : "Three-Tier Exclusion (Ḥujub al-Ḥirmān) Gatekeeper"}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Tier 1 Box */}
        <div
          className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
            tier1Active
              ? "bg-white border-[#245642] ring-2 ring-[#245642]/10"
              : "bg-stone-50 border-stone-300 opacity-70"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#245642] uppercase text-[10px]">Tier 1 (الطبقة الأولى)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tier1Active ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
                }`}
              >
                {tier1Active ? (isUr ? "فعال اور وارث" : "ACTIVE") : (isUr ? "کوئی نہیں" : "EMPTY")}
              </span>
            </div>
            <h5 className="font-bold text-sm text-stone-900">{isUr ? "والدین و صلبی اولاد" : "Parents & Children"}</h5>
            <div className="space-y-1.5 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTier1Child}
                  onChange={(e) => setHasTier1Child(e.target.checked)}
                  className="accent-[#245642]"
                />
                <span>{isUr ? "بیٹا یا بیٹی زندہ ہے" : "Living Son / Daughter"}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTier1Parent}
                  onChange={(e) => setHasTier1Parent(e.target.checked)}
                  className="accent-[#245642]"
                />
                <span>{isUr ? "ماں یا باپ زندہ ہے" : "Living Father / Mother"}</span>
              </label>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] font-semibold text-emerald-700">
            {tier1Active && (isUr ? "✓ طبقہ دوم و سوم کلی طور پر ساقط" : "✓ Excludes Tier 2 and Tier 3 entirely.")}
          </div>
        </div>

        {/* Tier 2 Box */}
        <div
          className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
            tier2Active
              ? "bg-white border-amber-600 ring-2 ring-amber-600/10"
              : "bg-stone-50 border-stone-300 opacity-70"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-800 uppercase text-[10px]">Tier 2 (الطبقة الثانية)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tier2Active
                    ? "bg-amber-100 text-amber-900"
                    : tier1Active
                    ? "bg-red-100 text-red-800"
                    : "bg-stone-200 text-stone-600"
                }`}
              >
                {tier2Active
                  ? (isUr ? "فعال اور وارث" : "ACTIVE")
                  : tier1Active
                  ? (isUr ? "طبقہ اول سے محجوب" : "BLOCKED BY TIER 1")
                  : (isUr ? "کوئی نہیں" : "EMPTY")}
              </span>
            </div>
            <h5 className="font-bold text-sm text-stone-900">{isUr ? "اجداد و بہن بھائی" : "Grandparents & Siblings"}</h5>
            <div className="space-y-1.5 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTier2Sibling}
                  onChange={(e) => setHasTier2Sibling(e.target.checked)}
                  className="accent-amber-600"
                />
                <span>{isUr ? "بھائی یا بہن زندہ ہے" : "Living Brother / Sister"}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTier2Grandparent}
                  onChange={(e) => setHasTier2Grandparent(e.target.checked)}
                  className="accent-amber-600"
                />
                <span>{isUr ? "دادا، دادی، نانا، نانی" : "Living Grandparent"}</span>
              </label>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] font-semibold text-amber-800">
            {tier2Active
              ? (isUr ? "✓ طبقہ سوم کو کلی طور پر ساقط کرتا ہے" : "✓ Excludes Tier 3 entirely.")
              : tier1Active
              ? (isUr ? "⛔ طبقہ اول کی موجودگی میں حصہ ₨ 0 ہے" : "⛔ Receives ₨ 0 due to Tier 1 presence.")
              : ""}
          </div>
        </div>

        {/* Tier 3 Box */}
        <div
          className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
            tier3Active
              ? "bg-white border-stone-600 ring-2 ring-stone-600/10"
              : "bg-stone-50 border-stone-300 opacity-70"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-700 uppercase text-[10px]">Tier 3 (الطبقة الثالثة)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tier3Active
                    ? "bg-emerald-100 text-emerald-800"
                    : tier1Active || tier2Active
                    ? "bg-red-100 text-red-800"
                    : "bg-stone-200 text-stone-600"
                }`}
              >
                {tier3Active
                  ? (isUr ? "فعال اور وارث" : "ACTIVE")
                  : (isUr ? "محجوب (محروم)" : "BLOCKED")}
              </span>
            </div>
            <h5 className="font-bold text-sm text-stone-900">{isUr ? "اعمام و اخوال (چچا، ماموں)" : "Uncles & Aunts"}</h5>
            <div className="space-y-1.5 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTier3Uncle}
                  onChange={(e) => setHasTier3Uncle(e.target.checked)}
                  className="accent-stone-700"
                />
                <span>{isUr ? "چچا، پھوپھی، ماموں، خالہ" : "Living Uncle / Aunt"}</span>
              </label>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] font-semibold text-stone-700">
            {tier3Active
              ? (isUr ? "✓ طبقہ ۱ و ۲ خالی ہونے پر وارث" : "✓ Inherits since Tiers 1 & 2 are vacant.")
              : (isUr ? "⛔ قریبی طبقے کی وجہ سے کلی محروم (حجبِ حرمان)" : "⛔ Blocked by higher tier (Ḥirmān).")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 4: SOCIOECONOMIC EQUILIBRIUM & LAND DEBATE
   ------------------------------------------------------------------------- */
function EquilibriumBalanceSheet({ isUr }: { isUr: boolean }) {
  const [marjaChoice, setMarjaChoice] = useState<"sistani" | "khoei">("sistani");

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "مرد و زن کے مالی حقوق کا توازن اور زمین کی شرعی قیمت" : "Socioeconomic Wallet Audit & Widow's Land Rights"}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Wallet Comparison */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
          <h5 className="font-bold text-stone-900 text-sm border-b pb-2">
            {isUr ? "مرد بمقابلہ عورت: گھریلو اخراجات کا شرعی توازن" : "Male vs. Female Net Wallet Reality"}
          </h5>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
              <span className="font-bold text-red-900 block">{isUr ? "مرد کا پرس (۱۰۰٪ واجب مالی بوجھ):" : "The Male Wallet (100% Financial Liability):"}</span>
              <p className="text-stone-700 mt-1">
                {isUr
                  ? "مہر، نان و نفقہ (بیوی، بچے، بوڑھے والدین)، مکان، علاج اور دیہ کے تمام مالی مطالبات مرد پر واجب ہیں۔ وراثت کا ۲ گنا حصہ انہی اخراجات میں خرچ ہوتا ہے۔"
                  : "Burdened by mandatory Mahr, lifelong Nafaqah (wife, children, elderly parents), housing, medical bills, and Diyah liabilities."}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block">{isUr ? "عورت کا پرس (۱۰۰٪ محفوظ ذاتی رقم):" : "The Female Wallet (100% Unencumbered Capital):"}</span>
              <p className="text-stone-700 mt-1">
                {isUr
                  ? "گھر کے کسی ایک لقمے یا کرائے کا بوجھ عورت پر نہیں ہے۔ اس کا حصہ اس کی خالص ذاتی ملکیت ہے جسے کوئی شوہر یا بھائی ہاتھ نہیں لگا سکتا۔"
                  : "Zero domestic liabilities by law. Her inheritance is 100% private liquid capital that no husband or brother can legally touch."}
              </p>
            </div>
          </div>
        </div>

        {/* Land Valuation Toggle */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 flex flex-col justify-between">
          <div>
            <h5 className="font-bold text-stone-900 text-sm border-b pb-2">
              {isUr ? "بیوہ کے لیے مکان اور زمین کی وراثت کا تقابل" : "Widow's Residential Land Rights Debate"}
            </h5>
            <div className="flex gap-2 my-2">
              <button
                type="button"
                onClick={() => setMarjaChoice("sistani")}
                className={`flex-1 p-2 rounded-lg font-bold border transition-all ${
                  marjaChoice === "sistani"
                    ? "bg-[#245642] text-white border-[#245642]"
                    : "bg-stone-50 border-stone-300 text-stone-700"
                }`}
              >
                {isUr ? "سیستانی / خامنہ ای" : "Sistani / Khamenei"}
              </button>
              <button
                type="button"
                onClick={() => setMarjaChoice("khoei")}
                className={`flex-1 p-2 rounded-lg font-bold border transition-all ${
                  marjaChoice === "khoei"
                    ? "bg-[#245642] text-white border-[#245642]"
                    : "bg-stone-50 border-stone-300 text-stone-700"
                }`}
              >
                {isUr ? "خوئی / مکارم / نجفی" : "Khoei / Makarem / Bashir"}
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 text-stone-700 leading-relaxed mt-2">
              {marjaChoice === "sistani" ? (
                isUr ? (
                  <>
                    <strong>فتویٰ آیت اللہ سیستانی و خامنہ ای:</strong> بیوہ مکان کی عمارت اور <strong>زمین دونوں کی قیمت</strong> میں سے اپنا ۱/۸ یا ۱/۴ حصہ پاتی ہے۔ (زمین کے اصل رقبے میں شریک نہیں کی جاتی تاکہ دیگر ورثاء پر تصرف میں حرج نہ ہو، لیکن قیمت کی مکمل حقدار ہے)۔
                  </>
                ) : (
                  <>
                    <strong>Sayyid Sistani & Khamenei:</strong> The widow inherits from the <strong>monetary value of BOTH the buildings and the underlying land</strong> (1/8th or 1/4th).
                  </>
                )
              ) : isUr ? (
                <>
                  <strong>فتویٰ آیت اللہ خوئی، مکارم شیرازی و بشیر نجفی:</strong> بیوہ صرف تعمیرات (ملبہ، عمارت، درخت) کی قیمت میں سے حصہ پاتی ہے، زمین کی قیمت میں سے حصہ نہیں پاتی۔
                </>
              ) : (
                <>
                  <strong>Sayyid Khoei & Makarem Shirazi:</strong> The widow inherits from the monetary value of the physical buildings and trees only; she is excluded from the valuation of the land itself.
                </>
              )}
            </div>
          </div>

          <div className="text-[11px] text-stone-500 font-medium">
            {isUr ? "دونوں صورتوں میں نقدی رقم، سونا، گاڑیاں اور کاروبار تمام ورثاء کی طرح بلا تفریق تقسیم ہوتے ہیں۔" : "Liquid cash, gold, and businesses are inherited without any restriction across all Maraji'."}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 5: AWL & TA'SIB REPUTATION DIAL
   ------------------------------------------------------------------------- */
function FractionDialSimulator({ isUr }: { isUr: boolean }) {
  const [selectedCase, setSelectedCase] = useState<"awl" | "tasib">("awl");

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "بطلانِ عول و تعصیب: جعفری قانون بمقابلہ دیگر مذاہب" : "Repudiation of ‘Awl & Ta‘ṣīb: Mathematical Comparison"}
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedCase("awl")}
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              selectedCase === "awl"
                ? "bg-[#245642] text-white border-[#245642]"
                : "bg-white border-stone-300 text-stone-700"
            }`}
          >
            {isUr ? "مسئلہ عول (Deficit)" : "‘Awl (Deficit)"}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase("tasib")}
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              selectedCase === "tasib"
                ? "bg-[#245642] text-white border-[#245642]"
                : "bg-white border-stone-300 text-stone-700"
            }`}
          >
            {isUr ? "مسئلہ تعصیب (Surplus)" : "Ta‘ṣīb (Surplus)"}
          </button>
        </div>
      </div>

      {selectedCase === "awl" ? (
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
          <div className="font-bold text-stone-800 text-sm">
            {isUr
              ? "مثال: میت کے پسماندگان میں شوہر (۱/۴)، ۲ بیٹیاں (۲/۳)، اور والدین (۱/۶ + ۱/۶) شامل ہیں۔"
              : "Deficit Scenario: Husband (1/4), 2 Daughters (2/3), Father (1/6), Mother (1/6). Total = 15/12 (Exceeds 100%)."}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block mb-1">
                {isUr ? "غیر جعفری نظریہ (عول - کٹوتی):" : "Non-Ja'fari Approach (‘Awl):"}
              </span>
              <p className="text-stone-600 leading-relaxed">
                {isUr
                  ? "مخرج ۱۲ کو بڑھا کر ۱۵ کر دیا جاتا ہے۔ نتیجے کے طور پر شوہر، ماں اور باپ سب کے قرآنی حصوں میں جبری کٹوتی کر دی جاتی ہے۔"
                  : "The denominator is inflated from 12 to 15. Every single heir (including husband and parents) suffers a proportional reduction of their Quranic share."}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300">
              <span className="font-bold text-emerald-900 block mb-1">
                {isUr ? "جعفری فقہ کا قرآنی فیصلہ (بطلانِ عول):" : "Ja'fari Divine Ruling (Repudiation of ‘Awl):"}
              </span>
              <p className="text-emerald-950 leading-relaxed font-medium">
                {isUr
                  ? "امام علی (ع) کا فرمان: 'اللہ مخرج کو تنگ نہیں کرتا'۔ شوہر اور والدین کا قرآنی حصہ قطعی اور محفوظ رہتا ہے؛ کمی صرف بیٹیوں کے لچکدار حصے سے پوری کی جاتی ہے۔"
                  : "Imam Ali (as) decreed: God's shares cannot clash. Husband and parents take their fixed Quranic portions intact (100% protected); the deficit is absorbed solely by the daughters."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
          <div className="font-bold text-stone-800 text-sm">
            {isUr
              ? "مثال: میت نے صرف ۱ بیٹی (قرآنی حصہ ۱/۲) اور ۱ چچا (Paternal Uncle) چھوڑا ہے۔"
              : "Surplus Scenario: 1 Daughter (Quranic share 1/2) and 1 Paternal Uncle."}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block mb-1">
                {isUr ? "غیر جعفری نظریہ (عصبہ کو منتقلی):" : "Non-Ja'fari Approach (Ta‘ṣīb):"}
              </span>
              <p className="text-stone-600 leading-relaxed">
                {isUr
                  ? "بیٹی کو آدھا مال دے کر باقی آدھا مال (Residue) دور کے چچا کو بطور 'عصبہ' دے دیا جاتا ہے۔"
                  : "The daughter takes 50%, and the remaining 50% is handed over to the distant paternal uncle as an agnatic relative (‘Asabah)."}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300">
              <span className="font-bold text-emerald-900 block mb-1">
                {isUr ? "جعفری فقہ کا قرآنی فیصلہ (بطلانِ تعصیب و رد):" : "Ja'fari Divine Ruling (Buṭlān al-Ta‘ṣīb & Radd):"}
              </span>
              <p className="text-emerald-950 leading-relaxed font-medium">
                {isUr
                  ? "تعصیب باطل ہے! بیٹی (طبقہ اول) چچا (طبقہ سوم) کو مکمل محروم کر دیتی ہے۔ بیٹی اپنا ۱/۲ فرضاً لیتی ہے اور باقی ۱/۲ بھی بطور 'رد' اسی بیٹی کو واپس ملتا ہے (۱۰۰٪ مال بیٹی کا)۔"
                  : "Ta'sib is strictly repudiated! The Daughter (Tier 1) totally excludes the Uncle (Tier 3). She takes 1/2 as Farḍ + remaining 1/2 via Radd = 100% of the estate goes to the daughter!"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 6: TANZIL & HABWAH INSPECTOR
   ------------------------------------------------------------------------- */
function TanzilTreeSimulator({ isUr }: { isUr: boolean }) {
  const [childrenAlive, setChildrenAlive] = useState<boolean>(false);

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "قائم مقامی (تنزیل) اور بڑے بیٹے کا حَبْوہ" : "Representation (Tanzīl) & Eldest Son's Ḥabwah Inspector"}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Tanzil Logic */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-800">{isUr ? "صلبی اولاد کی موجودگی:" : "Direct Children Status:"}</span>
            <button
              type="button"
              onClick={() => setChildrenAlive(!childrenAlive)}
              className={`px-3 py-1 rounded-lg font-bold border transition-all ${
                childrenAlive ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-[#245642] text-white border-[#245642]"
              }`}
            >
              {childrenAlive ? (isUr ? "صلبی اولاد زندہ ہے" : "Direct Children Alive") : (isUr ? "تمام صلبی اولاد فوت شدہ" : "All Direct Children Deceased")}
            </button>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 leading-relaxed">
            {childrenAlive ? (
              <p className="text-stone-700">
                {isUr
                  ? "⛔ جب تک میت کا اپنا ایک بھی سگا بیٹا یا بیٹی زندہ ہے، پوتے، پوتیاں، نواسے اور نواسیاں وراثت سے کلی طور پر محروم رہتے ہیں۔ (الاقرب یمنع الابعد)"
                  : "⛔ The presence of even one living direct child completely blocks all grandchildren from inheritance via the Proximity Rule."}
              </p>
            ) : (
              <div className="space-y-1.5 text-stone-800">
                <span className="font-bold text-emerald-800 block">{isUr ? "✓ قائم مقامی (تنزیل) فعال ہو گئی:" : "✓ Tanzīl Representation Active:"}</span>
                <p>
                  • <strong>{isUr ? "پوتے / پوتیاں:" : "Pota / Poti:"}</strong> {isUr ? "اپنے فوت شدہ باپ (بیٹے) کا حصہ لیتے ہیں، پھر آپس میں ۲:۱ کے تناسب سے تقسیم کرتے ہیں۔" : "Step into deceased Son's shoes (divided 2:1 between them)."}
                </p>
                <p>
                  • <strong>{isUr ? "نواسے / نواسیاں:" : "Nawasa / Nawasi:"}</strong> {isUr ? "اپنی فوت شدہ ماں (بیٹی) کا حصہ لیتے ہیں، احتیاط کے تحت ۲:۱ کے تناسب سے تقسیم ہوتا ہے۔" : "Step into deceased Daughter's shoes (divided 2:1 under precaution)."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Habwah Relics */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
          <span className="font-bold text-stone-800 text-sm block border-b pb-1">
            {isUr ? "بڑے بیٹے کے ۴ مخصوص نوادرات (حَبْوہ):" : "The 4 Standard-Bearer Relics (Al-Ḥabwah):"}
          </span>
          <p className="text-stone-600 leading-relaxed">
            {isUr
              ? "میت کے سب سے بڑے عاقل و بالغ بیٹے کو باپ کے ۴ خصوصی نوادرات ترکے کی تقسیم سے قبل اعزازی طور پر دیے جاتے ہیں:"
              : "Exclusively awarded to the eldest living sane son of a deceased father before estate partition:"}
          </p>
          <div className="grid grid-cols-2 gap-2 text-stone-800 font-semibold pt-1">
            <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center gap-1.5">
              <span>📖</span> <span>{isUr ? "باپ کا قرآنِ مجید" : "Father's Qur'an"}</span>
            </div>
            <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center gap-1.5">
              <span>💍</span> <span>{isUr ? "باپ کی انگشتری (انگوٹھی)" : "Father's Ring"}</span>
            </div>
            <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center gap-1.5">
              <span>⚔️</span> <span>{isUr ? "باپ کی تلوار" : "Father's Sword"}</span>
            </div>
            <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center gap-1.5">
              <span>🧥</span> <span>{isUr ? "باپ کے ملبوسات (لباس)" : "Father's Clothes"}</span>
            </div>
          </div>
          <span className="text-[10px] text-stone-500 block pt-1">
            {isUr ? "شرط: باپ کے ذمے قضا نمازوں اور روزوں کی ادائیگی بڑے بیٹے پر شرعاً واجب ہوتی ہے۔" : "Condition: The eldest son assumes duty to perform or compensate for father's unperformed prayers/fasts."}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 7: DISQUALIFIERS SWITCHBOARD
   ------------------------------------------------------------------------- */
function DisqualifierSwitchboard({ isUr }: { isUr: boolean }) {
  const [activeBarrier, setActiveBarrier] = useState<"qatl_intentional" | "qatl_accidental" | "kufr" | "lian">("qatl_intentional");

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-700" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "موانعِ ارث کا شرعی سوئچ بورڈ (رکاوٹیں اور احکام)" : "Statutory Disqualifications Switchboard"}
          </h4>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveBarrier("qatl_intentional")}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            activeBarrier === "qatl_intentional" ? "bg-red-800 text-white border-red-800" : "bg-white text-stone-700 border-stone-300"
          }`}
        >
          {isUr ? "قتلِ عمد (قصداً قتل)" : "Intentional Murder"}
        </button>
        <button
          type="button"
          onClick={() => setActiveBarrier("qatl_accidental")}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            activeBarrier === "qatl_accidental" ? "bg-amber-700 text-white border-amber-700" : "bg-white text-stone-700 border-stone-300"
          }`}
        >
          {isUr ? "قتلِ خطا (حادثاتی قتل)" : "Accidental Manslaughter"}
        </button>
        <button
          type="button"
          onClick={() => setActiveBarrier("kufr")}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            activeBarrier === "kufr" ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-700 border-stone-300"
          }`}
        >
          {isUr ? "کفر و ارتداد" : "Disparity of Faith (Kufr)"}
        </button>
        <button
          type="button"
          onClick={() => setActiveBarrier("lian")}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            activeBarrier === "lian" ? "bg-[#245642] text-white border-[#245642]" : "bg-white text-stone-700 border-stone-300"
          }`}
        >
          {isUr ? "لعان (نسب کی نفی)" : "Sworn Denunciation (Li‘ān)"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs leading-relaxed">
        {activeBarrier === "qatl_intentional" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>{isUr ? "قتلِ عمد: وراثت سے ۱۰۰٪ مکمل محرومی" : "Intentional Homicide: Total Statutory Forfeiture"}</span>
            </div>
            <p className="text-stone-700">
              {isUr
                ? "جو شخص اپنے مورث (مثلاً باپ یا بھائی) کو ناحق اور قصداً قتل کر دے، وہ اس کی وراثت سے کلی طور پر محروم ہو جاتا ہے اور فقہی طور پر معدوم (مردہ) مانا جاتا ہے۔ وہ کسی دوسرے وارث کے لیے رکاوٹ بھی نہیں بن سکتا۔"
                : "A person who intentionally murders their testator is completely barred from inheriting any part of the estate. Legally, the murderer is treated as non-existent and cannot block other relatives."}
            </p>
          </div>
        )}

        {activeBarrier === "qatl_accidental" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{isUr ? "قتلِ خطا: عمومی ترکے میں وارث ہے، دیت میں سے محروم" : "Accidental Manslaughter: Inherits Estate, Barred from Diyah"}</span>
            </div>
            <p className="text-stone-700">
              {isUr
                ? "اگر حادثاتی طور پر (مثلاً گاڑی کے ایکسیڈنٹ میں) بیٹا اپنے باپ کی موت کا سبب بن جائے، تو وہ باپ کے ذاتی ترکے میں سے اپنا حصہ پائے گا، لیکن اس حادثے کی جو دیت (خون بہا) جمع ہوگی، اس دیت میں سے بیٹے کو ایک روپیہ نہیں ملے گا۔"
                : "If death was unintentional (e.g. car accident), the killer inherits their normal share from the deceased's general estate, but is strictly barred from taking any portion of the Blood Money (Diyah)."}
            </p>
          </div>
        )}

        {activeBarrier === "kufr" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>{isUr ? "کفر: کافر مسلمان کا وارث نہیں بن سکتا" : "Disparity of Faith: Non-Muslim Barred from Muslim Testator"}</span>
            </div>
            <p className="text-stone-700">
              {isUr
                ? "غیر مسلم کسی مسلمان کا وارث نہیں بن سکتا۔ اس کے برعکس، اگر کسی غیر مسلم کا انتقال ہو اور اس کا ایک بھی رشتہ دار مسلمان ہو، تو وہ مسلمان رشتہ دار تمام غیر مسلم وارثوں کو محروم کر کے پورے ترکے کا تنہا مالک بن جاتا ہے۔"
                : "A non-Muslim never inherits from a Muslim. Conversely, if a non-Muslim dies leaving even a single Muslim relative, that Muslim heir captures the entire estate and blocks all non-Muslim heirs."}
            </p>
          </div>
        )}

        {activeBarrier === "lian" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#245642] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isUr ? "لعان: باپ سے رشتہ ختم، ماں اور نانہال سے وراثت برقرار" : "Li‘ān: Paternal Line Dissolved, Maternal Line Remains Active"}</span>
            </div>
            <p className="text-stone-700">
              {isUr
                ? "جب شوہر شرعی عدالت میں لعان کر کے بچے کے نسب کی نفی کر دے، تو باپ اور بچے کے درمیان باہمی وراثت مکمل طور پر ختم ہو جاتی ہے۔ البتہ بچے اور ماں کے درمیان وراثت کا رشتہ بدستور برقرار رہتا ہے۔"
                : "Following judicial Li'an, mutual succession between father and child is permanently dissolved. However, mutual inheritance between the child and mother (and maternal relatives) remains fully intact."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOOL 8: CONTINGENCIES (HAML, GHARQA, MUNASAKHAT)
   ------------------------------------------------------------------------- */
function ContingencySimulator({ isUr }: { isUr: boolean }) {
  const [contingencyTab, setContingencyTab] = useState<"haml" | "gharka" | "munasakhat">("haml");

  return (
    <div className="rounded-xl border border-[#245642]/20 bg-[#FAF8F5] p-5 shadow-xs space-y-4 text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#245642]" />
          <h4 className="font-bold text-base text-[#0A2118]">
            {isUr ? "پیچیدہ ہنگامی مسائل کا شرعی سیمولیٹر" : "Specialized Contingency Simulator"}
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setContingencyTab("haml")}
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              contingencyTab === "haml" ? "bg-[#245642] text-white border-[#245642]" : "bg-white text-stone-700 border-stone-300"
            }`}
          >
            {isUr ? "حمل (Unborn)" : "Al-Ḥaml (Unborn)"}
          </button>
          <button
            type="button"
            onClick={() => setContingencyTab("gharka")}
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              contingencyTab === "gharka" ? "bg-[#245642] text-white border-[#245642]" : "bg-white text-stone-700 border-stone-300"
            }`}
          >
            {isUr ? "مشترکہ حادثات (Disaster)" : "Simultaneous Disaster"}
          </button>
          <button
            type="button"
            onClick={() => setContingencyTab("munasakhat")}
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              contingencyTab === "munasakhat" ? "bg-[#245642] text-white border-[#245642]" : "bg-white text-stone-700 border-stone-300"
            }`}
          >
            {isUr ? "مناسخات (Chained)" : "Al-Munāsakhāt"}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs leading-relaxed">
        {contingencyTab === "haml" && (
          <div className="space-y-2">
            <span className="font-bold text-[#0A2118] text-sm block">
              {isUr ? "حمل کی صورت میں ترکے کی تقسیم اور ۲ جڑواں بیٹوں کی امانت:" : "The Escrow Rule for the Unborn Child (‘Azl al-Ḥiṣṣah):"}
            </span>
            <p className="text-stone-700">
              {isUr
                ? "اگر ورثاء بچے کی پیدائش سے پہلے ترکہ تقسیم کرنے پر اصرار کریں، تو شرعی قانون کے مطابق ۲ جڑواں بیٹوں کا زیادہ سے زیادہ ممکنہ حصہ امانت کے طور پر روکا جائے گا۔ بچہ زندہ پیدا ہوتے ہی روتا ہے یا سانس لیتا ہے تو اپنا حصہ وصول کرے گا؛ اگر مردہ پیدا ہوا تو امانت دیگر ورثاء میں تقسیم ہو جائے گی۔"
                : "If heirs insist on immediate partition before birth, administrators must reserve in escrow the share of two male twins. If born alive (evidenced by a cry or breath), title takes effect; if stillborn, the escrowed wealth returns to existing heirs."}
            </p>
          </div>
        )}

        {contingencyTab === "gharka" && (
          <div className="space-y-2">
            <span className="font-bold text-[#0A2118] text-sm block">
              {isUr ? "مشترکہ حادثے میں باہمی وراثت (الغرقى والهدَمى):" : "Mutual Cross-Succession Without Circular Looping:"}
            </span>
            <p className="text-stone-700">
              {isUr
                ? "اگر باپ اور بیٹا ایک ہی ہوائی جہاز یا کار حادثے میں جاں بحق ہو جائیں اور تقدم و تاخر کا علم نہ ہو، تو دونوں کو ایک دوسرے سے پہلے وفات پانے والا فرض کر کے ان کی اصل جائیداد (اصل المال) میں سے ایک دوسرے کو حصہ دیا جائے گا۔ تاہم، جو مال حادثے میں ملا اس میں سے دوبارہ باہمی وراثت جاری نہیں ہو سکتی۔"
                : "When relatives perish together (e.g. plane crash) and death order is unknown, alternating succession applies to their original pre-accident assets (Aṣl al-Māl). Neither relative inherits from wealth acquired through the cross-succession itself."}
            </p>
          </div>
        )}

        {contingencyTab === "munasakhat" && (
          <div className="space-y-2">
            <span className="font-bold text-[#0A2118] text-sm block">
              {isUr ? "کئی دہائیوں پر محیط مناسخات کا ریاضیاتی حل:" : "Resolving Decades-Old Compounded Estates (Al-Munāsakhāt):"}
            </span>
            <p className="text-stone-700">
              {isUr
                ? "اگر دادا کا انتقال ہوا اور جائیداد تقسیم ہونے سے پہلے بیٹا بھی فوت ہو گیا، تو پہلے دادا کا فریضہ اولیٰ حل ہو گا، پھر فوت شدہ بیٹے کا فریضہ ثانیہ اس کے اپنے ورثاء (مثلاً اس کی بیوی اور سسرالی تعلقات) کے مطابق الگ تیار کیا جائے گا، اور مخرج کی تصحیح کر کے حقداروں تک مال پہنچایا جائے گا۔"
                : "When an heir passes away before an estate is partitioned, the administrator constructs a primary ledger (Farīḍah Ūlā), then a secondary ledger (Farīḍah Thāniyah) for the deceased heir's unique heirs, harmonizing denominators via the Least Common Multiple (Taṣḥīḥ al-Farīḍah)."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
