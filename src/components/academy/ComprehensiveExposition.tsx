"use client";

import React, { useState } from "react";
import {
  Coins,
  FileText,
  Sparkles,
  Scroll,
  Scale,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Crown,
  Users,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  HeartHandshake,
  TrendingDown,
  TrendingUp,
  Home,
  RefreshCw,
  GitBranch,
} from "lucide-react";

interface ExpositionProps {
  pillarNumber: number;
  language: "en" | "ur";
}

export const ComprehensiveExposition: React.FC<ExpositionProps> = ({ pillarNumber, language }) => {
  const isUr = language === "ur";

  switch (pillarNumber) {
    case 1:
      return <Pillar1Exposition isUr={isUr} />;
    case 2:
      return <Pillar2Exposition isUr={isUr} />;
    case 3:
      return <Pillar3Exposition isUr={isUr} />;
    case 4:
      return <Pillar4Exposition isUr={isUr} />;
    case 5:
      return <Pillar5Exposition isUr={isUr} />;
    case 6:
      return <Pillar6Exposition isUr={isUr} />;
    case 7:
      return <Pillar7Exposition isUr={isUr} />;
    case 8:
      return <Pillar8Exposition isUr={isUr} />;
    default:
      return null;
  }
};

/* =========================================================================
   PILLAR 1: THE ESTATE CLEARANCE WATERFALL (أعباء التركة)
   ========================================================================= */
function Pillar1Exposition({ isUr }: { isUr: boolean }) {
  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "ترکے کے چار ابتدائی مراحل کی شرعی ترتیب" : "The 4 Sequential Liquidation Steps of the Estate"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "ان چاروں حقوق کی مکمل ادائیگی سے قبل وراثت کا اعلان یا تقسیم شرعاً باطل ہے۔"
            : "Asset distribution prior to completing these 4 chronological steps is strictly void in Ja‘farī law."}
        </p>
      </div>

      {/* Progress Connector Header */}
      <div className="hidden sm:flex items-center justify-between px-2 py-3 bg-[#edf3e7] dark:bg-[#11241c] rounded-xl border border-[#245642]/20 text-xs font-bold text-[#245642] dark:text-emerald-300">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
          <span>{isUr ? "کفن و تدفین" : "Burial Shroud"}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-stone-400" />
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
          <span>{isUr ? "حقوق الناس" : "Debts of People"}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-stone-400" />
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
          <span>{isUr ? "حقوق اللہ" : "Divine Liabilities"}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-stone-400" />
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">4</span>
          <span>{isUr ? "وصیت (۱/۳)" : "Bequest (1/3rd)"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="rounded-xl border-2 border-emerald-600/30 bg-white dark:bg-[#0c1814] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                {isUr ? "مرحلہ ۱: حقِ اول" : "Step 1: Primary Claim"}
              </span>
              <Coins className="w-5 h-5 text-emerald-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "کفن و تدفین (Kafn wa Tajhīz)" : "Shroud & Burial (Kafn wa Tajhīz)"}
            </h5>
            <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">
              {isUr
                ? "اصل سرمایہ سے منہا: کسی بھی قرض، وصیت یا وراثت سے پہلے میت کے اصل مال سے تجہیز و تکفین کے واجب اخراجات نکالے جائیں گے۔"
                : "Deducted from the gross capital before any debt, bequest, or statutory inheritance."}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {isUr
                ? "اس میں واجب کفن، غسل، قبر اور شرعی تدفین کے رائج مصارف شامل ہیں۔ شاہانہ ضیافتوں یا غیر ضروری اسراف کا ترکے سے تعلق نہیں۔"
                : "Includes standard ceremonial shroud, ritual washing, and grave plot according to customary dignity. Extravagant memorial halls cannot be billed to the estate."}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#edf3e7] dark:bg-[#132c21] border border-[#245642]/30 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
            <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
              {isUr ? "بیوی کے کفن کا خصوصی شرعی حکم:" : "The Wife's Shroud Axiom (حكم كفن الزوجة):"}
            </strong>
            <span>
              {isUr
                ? "اگر شادی شدہ عورت کا انتقال ہو جائے، تو اس کے کفن اور تدفین کا خرچ اس کے شوہر کے ذاتی ذمے قانونی و شرعی واجب ہے، خواہ وہ عورت کروڑ پتی ہو۔ اس کا پورا ترکہ ورثاء کے لیے بغیر کسی کٹوتی کے محفوظ رہے گا۔"
                : "The Wife's Shroud: If a married woman dies, her husband is legally obligated to pay for her funeral from his own pocket, preserving her estate completely untouched for her heirs."}
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border-2 border-amber-600/30 bg-white dark:bg-[#0c1814] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                {isUr ? "مرحلہ ۲: لازمی قرض" : "Step 2: Mandatory Debt"}
              </span>
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "لوگوں کے حقوق و قرضے (Duyūn al-Nās)" : "Third-Party Debts (Duyūn al-Nās)"}
            </h5>
            <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">
              {isUr
                ? "میت کے تمام دنیاوی قرضے، رہن، ادھار اور مالی معاہدات سو فیصد ادا کیے جائیں گے۔"
                : "Worldly claims take precedence over any distribution: commercial loans, mortgages, and trade invoices."}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {isUr
                ? "اگر قرض ترکے کے مساوی یا زائد ہو تو پورا مال قرض خواہوں کو دیا جائے گا اور ورثاء کو صفر ملے گا۔"
                : "If verified liabilities equal or exceed net assets, the estate is entirely consumed by creditors and the heirs receive zero."}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
            <strong className="text-amber-900 dark:text-amber-300 block mb-1">
              {isUr ? "بیوہ کا مہرِ مؤجل (The Widow's Unpaid Mahr):" : "The Wife's Unpaid Mahr (مهر الزوجة المؤجل):"}
            </strong>
            <span>
              {isUr
                ? "غیر ادا شدہ مہر شوہر کے ذمے شرعی قرض ہے۔ بیوہ وراثت کی تقسیم سے پہلے بطور قرض خواہ اپنا پورا مہر وصول کرتی ہے، پھر باقی بچے ترکے میں سے اپنا وراثتی حصہ (۱/۸ یا ۱/۴) بھی لیتی ہے!"
                : "The Wife's Unpaid Mahr: Unpaid dowry is a legal debt upon the husband. The widow receives her Mahr first as a creditor, then inherits her spousal share from the remainder."}
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border-2 border-blue-600/30 bg-white dark:bg-[#0c1814] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                {isUr ? "مرحلہ ۳: شرعی واجبات" : "Step 3: Religious Dues"}
              </span>
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "حقوق اللہ اور مالی عبادات (Ḥuqūq Allāh)" : "Divine Liabilities (Ḥuqūq Allāh)"}
            </h5>
            <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">
              {isUr
                ? "اللہ تعالیٰ کے واجب مالی حقوق بھی عام قرضوں کی طرح اصل ترکے سے کٹتے ہیں۔"
                : "Binding spiritual liabilities operate as mandatory encumbrances against capital."}
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong>{isUr ? "غیر ادا شدہ خمس:" : "Unpaid Khums:"}</strong>{" "}
                {isUr ? "میت کے پاس جو مالِ خمس تھا اس کا اخراج اصل ترکے سے لازم ہے۔" : "20% religious dues attached to unpurified asset pools."}
              </li>
              <li>
                <strong>{isUr ? "واجب زکوٰۃ:" : "Zakat Arrears:"}</strong>{" "}
                {isUr ? "اموالِ زکوٰۃ میں سے واجب حصہ منہا کیا جائے گا۔" : "Agricultural, livestock, or bullion zakat obligations."}
              </li>
              <li>
                <strong>{isUr ? "حجۃ الاسلام (Ḥajjat al-Islām):" : "Obligatory Hajj (Ḥajjat al-Islām):"}</strong>{" "}
                {isUr
                  ? "اگر میت پر حج فرض تھا لیکن نہیں کیا، تو ترکے سے حجِ نیابتی (Hajj al-Badal) کے اخراجات منہا ہوں گے، خواہ وصیت نہ کی ہو!"
                  : "If Hajj became obligatory during the deceased's life, proxy pilgrimage costs are extracted from principal, even without a will."}
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 leading-relaxed font-medium">
            <strong>{isUr ? "قاعدہ:" : "Fiqhi Benchmark:"}</strong>{" "}
            {isUr
              ? "حقوق اللہ اور حقوق الناس دونوں کا منہا ہونا وصیت کے نفاذ سے مقدم ہے۔"
              : "Settling divine and worldly liabilities takes precedence over testamentary wills and heir distribution."}
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border-2 border-purple-600/30 bg-white dark:bg-[#0c1814] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
                {isUr ? "مرحلہ ۴: وصیت کا نفاذ" : "Step 4: Capped Bequest"}
              </span>
              <Scroll className="w-5 h-5 text-purple-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "ایک تہائی وصیت (Al-Waṣiyyah)" : "The Enforceable Will (Al-Waṣiyyah)"}
            </h5>
            <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">
              {isUr
                ? "مذکورہ بالا تینوں حقوق کے بعد جو خالص ترکہ بچے، اس کے ۱/۳ حصے میں وصیت نافذ ہوتی ہے۔"
                : "Calculated strictly against the net residue remaining after Steps 1, 2, and 3."}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {isUr
                ? "میت کو صرف 33.33% حصے پر تصرف کا اختیار ہے۔ باقی 66.67% لازمی طور پر شرعی ورثاء کا حق ہے۔"
                : "The testator exercises absolute testamentary discretion over up to 33.33% of the residue."}
            </p>
          </div>

          {/* Visual Gauge: 33.33% Divine Ceiling */}
          <div className="p-3.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-950 dark:text-purple-200">
              <span>{isUr ? "وصیت کی شرعی حد (Divine Ceiling)" : "33.33% (1/3rd) Divine Ceiling"}</span>
              <span className="px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 text-[10px]">
                Max 1/3rd
              </span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-purple-600 h-3 text-[9px] text-white flex items-center justify-center font-bold"
                style={{ width: "33.33%" }}
              >
                1/3
              </div>
              <div
                className="bg-emerald-600/80 h-3 text-[9px] text-white flex items-center justify-center font-bold"
                style={{ width: "66.67%" }}
              >
                2/3 Heirs
              </div>
            </div>
            <p className="text-[11px] text-purple-900 dark:text-purple-300 leading-tight">
              <strong>{isUr ? "استثناء:" : "Excess Rule:"}</strong>{" "}
              {isUr
                ? "۱/۳ سے زائد کی وصیت تبھی نافذ ہو گی جب وفات کے بعد تمام عاقل و بالغ ورثاء رضا مندی دیں۔"
                : "Any excess over 1/3rd requires unanimous post-mortem heir consent. A dissenting heir protects their share."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 2: SABAB VS NASAB (أسباب الإرث)
   ========================================================================= */
function Pillar2Exposition({ isUr }: { isUr: boolean }) {
  const [selectedException, setSelectedException] = useState<"mutah" | "talaq" | "marad">("talaq");

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "وراثت کی دو متوازی جہتیں: سبب بمقابلہ نسب" : "Side-by-Side Dual-Tree Comparative Architecture"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "نکاح سے پیدا ہونے والا حق (السبب) خونی رشتہ داروں (النسب) سے بالاتر ہو کر ہر حالت میں برقرار رہتا ہے۔"
            : "Matrimonial title (Sabab) floats above all consanguineous bloodline tiers (Nasab) and is never excluded."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Al-Sabab */}
        <div className="rounded-2xl border-2 border-amber-600/40 bg-[#FAF8F5] dark:bg-[#0c1814] p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-amber-600/20 pb-2">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
                  Contractual Matrimonial Affinity
                </span>
                <h5 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                  {isUr ? "السبب — زوج اور زوجہ" : "Al-Sabab (السبب) — Husband & Wife"}
                </h5>
              </div>
              <Crown className="w-6 h-6 text-amber-600 shrink-0" />
            </div>

            {/* Key Badges */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                Universal Co-Sharers
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Never Excluded by Any Human
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700">
                Floats Above All Tiers
              </span>
            </div>

            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "میاں اور بیوی کبھی بھی طبقہ ۱، ۲ یا ۳ میں شامل نہیں ہوتے۔ وہ ہر موجودہ طبقے کے ساتھ یکساں طور پر پہلے اپنا قرآنی حصہ الگ کرتے ہیں، اور کوئی بھی خونی رشتہ دار انہیں وراثت سے خارج نہیں کر سکتا۔"
                : "Spouses hold an unassailable sovereign right. They do not belong to Tier 1, 2, or 3. They harvest their Quranic portion alongside whichever tier survives, untouched by total exclusion."}
            </p>
          </div>

          {/* Interactive Accordion / Pill Toggles */}
          <div className="space-y-3 pt-3 border-t border-amber-600/20">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
              <span>{isUr ? "نکاح و طلاق کے استثناءات:" : "Matrimonial Precedents & Exceptions:"}</span>
              <span className="text-[10px] text-amber-700 font-semibold">Click to explore</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <button
                type="button"
                onClick={() => setSelectedException("mutah")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedException === "mutah"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white dark:bg-[#14261f] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "متعہ" : "Mut‘ah"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedException("talaq")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedException === "talaq"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white dark:bg-[#14261f] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "طلاق" : "Ṭalāq"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedException("marad")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedException === "marad"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white dark:bg-[#14261f] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "مرض الموت" : "Maraḍ al-Mawt"}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#12221b] border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed min-h-[72px]">
              {selectedException === "mutah" && (
                <div>
                  <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">
                    {isUr ? "نکاحِ منقطع (متعہ):" : "Temporary Marriage (Mut‘ah):"}
                  </strong>
                  <span>
                    {isUr
                      ? "متفقہ فتوے کے مطابق متعہ میں میاں بیوی کے درمیان قانونی وراثت کا حق قائم نہیں ہوتا، خواہ نکاح میں شرط رکھی گئی ہو۔ بچے بدستور مکمل وارث ہوتے ہیں۔"
                      : "Mainstream fatwas hold that temporary marriage does not create reciprocal statutory inheritance between partners, though children inherit fully."}
                  </span>
                </div>
              )}

              {selectedException === "talaq" && (
                <div>
                  <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">
                    {isUr ? "طلاقِ رجعی بمقابلہ بائن:" : "Divorce Severance Logic (Ṭalāq):"}
                  </strong>
                  <span>
                    {isUr
                      ? "طلاقِ رجعی کی عدت کے دوران اگر کسی ایک کی وفات ہو جائے تو باہمی وراثت ۱۰۰٪ بحال رہتی ہے۔ طلاقِ بائن یا خلع ہوتے ہی وراثت کا حق فوری طور پر ختم ہو جاتا ہے۔"
                      : "Revocable divorce (Raj‘ī) retains mutual inheritance during the ‘Iddah waiting period. Irrevocable divorce (Bā’in / Khul‘) severs title immediately."}
                  </span>
                </div>
              )}

              {selectedException === "marad" && (
                <div>
                  <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">
                    {isUr ? "مرض الموت کا استثناء:" : "Terminal Illness Exception (Maraḍ al-Mawt):"}
                  </strong>
                  <span>
                    {isUr
                      ? "اگر شوہر نے شدید جان لیوا بیماری میں بیوی کو طلاق دی اور اسی مرض میں وفات پائی، تو مطلقہ بیوی ایک مکمل قمری سال تک وراثت پائے گی بشرطیکہ اس نے دوسرا نکاح نہ کیا ہو۔"
                      : "If the husband divorces his wife during a fatal illness and dies from it, the widow inherits up to 1 full lunar year, provided she has not remarried."}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Al-Nasab */}
        <div className="rounded-2xl border-2 border-emerald-700/40 bg-[#F4F6F0] dark:bg-[#0c1814] p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-700/20 pb-2">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">
                  Consanguineous Bloodline
                </span>
                <h5 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                  {isUr ? "النسب — والدین، اولاد، بہن بھائی، چچا" : "Al-Nasab (النسب) — Consanguineous Bloodline"}
                </h5>
              </div>
              <Users className="w-6 h-6 text-emerald-700 shrink-0" />
            </div>

            {/* Key Badges */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Structured into 3 Tiers
              </span>
              <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 border border-red-300 dark:border-red-700">
                Governed by Total Exclusion (Ḥirmān)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700">
                Divides Residue After Spouses
              </span>
            </div>

            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "خونی رشتہ داروں میں باہمی مقابلہ ہے۔ تینوں طبقات کے درمیان آہنی پردہ حائل ہے: پہلا طبقہ موجود ہو تو دوسرا اور تیسرا صفر حاصل کرتے ہیں۔ میاں بیوی کا حصہ نکلنے کے بعد باقی تمام ترکہ ان میں تقسیم ہوتا ہے۔"
                : "Blood relatives compete inside a rigid, hierarchical triage. The presence of even one surviving soul in Tier 1 completely and unconditionally wipes out Tiers 2 and 3."}
            </p>
          </div>

          {/* Three Tier Overview Preview */}
          <div className="space-y-2 pt-3 border-t border-emerald-700/20 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#12221b] border border-emerald-200 dark:border-emerald-900 flex items-start justify-between gap-2">
              <div>
                <strong className="text-emerald-900 dark:text-emerald-300 block">
                  {isUr ? "الطبقۃ الاولٰی (والدین و اولاد):" : "Tier 1: Parents & Direct Children"}
                </strong>
                <span className="text-[11px] text-stone-600 dark:text-stone-400">
                  {isUr ? "باپ، ماں، بیٹے، بیٹیاں (اور قائم مقام پوتے/نواسے)" : "Father, Mother, Sons, Daughters (Grandchildren via Tanzīl)"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                Primary
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-[#12221b] border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-2">
              <div>
                <strong className="text-stone-900 dark:text-stone-200 block">
                  {isUr ? "الطبقۃ الثانیہ (اجداد و اخوہ):" : "Tier 2: Grandparents & Siblings"}
                </strong>
                <span className="text-[11px] text-stone-600 dark:text-stone-400">
                  {isUr ? "دادا دادی، نانا نانی، بہن بھائی، بھتیجے بھانجے" : "Grandparents, Brothers, Sisters, Nephews, Nieces"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-bold shrink-0">
                Blocked by T1
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-[#12221b] border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-2">
              <div>
                <strong className="text-stone-900 dark:text-stone-200 block">
                  {isUr ? "الطبقۃ الثالثہ (اعمام و اخوال):" : "Tier 3: Uncles, Aunts & Cousins"}
                </strong>
                <span className="text-[11px] text-stone-600 dark:text-stone-400">
                  {isUr ? "چچا، پھوپھی، ماموں، خالہ اور ان کے کزنز" : "Paternal & Maternal Uncles/Aunts and First Cousins"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-bold shrink-0">
                Blocked by T1 & T2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 3: THE THREE STATUTORY CLASSES (الطبقات الثلاث)
   ========================================================================= */
function Pillar3Exposition({ isUr }: { isUr: boolean }) {
  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "خونی رشتہ داروں کے تین درجات اور حجبِ حرمان کا مکمل نظام" : "The Three Statutory Classes & The Proximity Shield"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "قرآنی حکم اور اہل بیت (ع) کے احادیث کے مطابق طبقات کے درمیان تفریق اور بلاکنگ کے اٹل اصول۔"
            : "The ironclad architecture of consanguineous succession: Total tier exclusion and intragenerational proximity."}
        </p>
      </div>

      {/* Structured HTML Table with Forest Emerald Background */}
      <div className="overflow-x-auto rounded-xl border-2 border-[#245642]/30 shadow-xs">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#0A2118] text-white">
              <th className="p-3.5 font-bold border-b border-emerald-900 tracking-wider">
                {isUr ? "طبقہ (Tier Level)" : "Tier Level"}
              </th>
              <th className="p-3.5 font-bold border-b border-emerald-900 tracking-wider">
                {isUr ? "گروپ الف: بنیادی جڑیں (Roots)" : "Group A (Roots)"}
              </th>
              <th className="p-3.5 font-bold border-b border-emerald-900 tracking-wider">
                {isUr ? "گروپ ب: شاخیں و اولاد (Branches)" : "Group B (Branches)"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-medium">
            <tr className="bg-white dark:bg-[#0c1814] hover:bg-emerald-50/30 transition-colors">
              <td className="p-3.5 font-bold text-[#245642] dark:text-emerald-400">
                Tier 1 (الطبقة الأولى)
              </td>
              <td className="p-3.5">
                {isUr ? "باپ اور ماں (Father & Mother)" : "Father & Mother (الأب والأم)"}
              </td>
              <td className="p-3.5">
                {isUr ? "بیٹے اور بیٹیاں (پوتے/نواسے بذریعہ تنزیل)" : "Sons & Daughters (Grandchildren via Tanzīl)"}
              </td>
            </tr>
            <tr className="bg-[#FAF8F5] dark:bg-[#10201a] hover:bg-emerald-50/30 transition-colors">
              <td className="p-3.5 font-bold text-amber-800 dark:text-amber-400">
                Tier 2 (الطبقة الثانية)
              </td>
              <td className="p-3.5">
                {isUr ? "دادا، دادی، نانا، نانی (Grandparents)" : "Grandparents (Paternal / Maternal)"}
              </td>
              <td className="p-3.5">
                {isUr ? "حقیقی، علاتی و اخیافی بہن بھائی (اور بھتیجے/بھانجے)" : "Full, Paternal & Uterine Siblings (Nephews / Nieces)"}
              </td>
            </tr>
            <tr className="bg-white dark:bg-[#0c1814] hover:bg-emerald-50/30 transition-colors">
              <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300">
                Tier 3 (الطبقة الثالثة)
              </td>
              <td className="p-3.5">
                {isUr ? "چچا، پھوپھی، ماموں اور خالہ" : "Paternal & Maternal Uncles / Aunts"}
              </td>
              <td className="p-3.5">
                {isUr ? "چچا زاد، پھوپھی زاد، ماموں زاد، خالہ زاد کزنز" : "First Cousins (All Paternal & Maternal Lines)"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Two Luminous Principle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card A */}
        <div className="p-4 rounded-xl border-2 border-emerald-600/50 bg-[#edf3e7] dark:bg-emerald-950/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-emerald-700" />
            <span>{isUr ? "قانونِ اول: حجبِ حرمان (Total Tier Exclusion)" : "Card A: Total Tier Exclusion (حجبِ حرمان)"}</span>
          </div>
          <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
            {isUr
              ? "اگر طبقہ اول میں ایک بھی روح (خواہ صرف ایک سگی بیٹی) موجود ہو، تو طبقہ دوم اور طبقہ سوم کو 0 روپے ملتے ہیں۔ تمام رشتہ دار کلی طور پر خارج ہو جاتے ہیں۔"
              : "If a single soul exists in Tier 1, Tiers 2 and 3 receive 0 PKR. The presence of a daughter or mother fully blocks all brothers, sisters, and uncles."}
          </p>
        </div>

        {/* Card B */}
        <div className="p-4 rounded-xl border-2 border-amber-600/50 bg-amber-50/60 dark:bg-amber-950/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
            <Scale className="w-5 h-5 text-amber-700" />
            <span>{isUr ? "قانونِ دوم: الاقرب یمنع الابعد (The Proximity Shield)" : "Card B: The Proximity Shield (الأقرب يمنع الأبعد)"}</span>
          </div>
          <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
            {isUr
              ? "ایک ہی طبقے کے اندر جو نسل میت سے ایک واسطہ قریب ہے، وہ دو واسطے دور والی نسل کو محروم کر دیتی ہے۔ زندہ سگی اولاد تمام پوتوں اور نواسوں کے لیے سپر شیلڈ بن جاتی ہے۔"
              : "Nearer generation blocks further generation within the same tier (Living child blocks all grandchildren; living brother blocks all nephews)."}
          </p>
        </div>
      </div>

      {/* Historical Precedent Badge (The Lone Exception) */}
      <div className="p-4 rounded-xl border-2 border-amber-600/40 bg-white dark:bg-[#0c1814] flex items-start gap-3 shadow-xs">
        <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <strong className="text-stone-900 dark:text-white font-bold block text-sm">
            {isUr ? "فقہِ جعفریہ کا واحد تاریخی استثناء (مسئلہ ابنِ عم ابوینی):" : "Historical Precedent Badge (The Lone Exception — Ibn ‘Amm Abawī):"}
          </strong>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            {isUr
              ? "قربت کے قانون کا واحد استثناء: اگر میت کا صرف ۱ علاتی چچا (باپ کی طرف سے سوتیلا چچا) اور ۱ سگے چچا کا بیٹا (Ibn ‘Amm Abawayn) ہو، تو کزن پورے ترکے کا وارث بنتا ہے اور زندہ علاتی چچا کو محروم کر دیتا ہے! یہ استثناء رسول اللہ (ص) اور ائمہ معصومین (ع) کے صریح نص پر مبنی ہے۔"
              : "The Ibn ‘Amm Abawī Exception: A full paternal uncle's son excludes a lone consanguine uncle (Father's side only). This is the only solitary exception to the proximity rule in the entirety of Ja‘farī jurisprudence, confirmed by authentic Hadith."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 4: SOCIOECONOMIC EQUILIBRIUM & LAND RIGHTS
   ========================================================================= */
function Pillar4Exposition({ isUr }: { isUr: boolean }) {
  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "مرد و زن کے مالی حقوق کا توازن اور بیوہ کی زمین کا شرعی حق" : "Socioeconomic Equilibrium & Land Rights Architecture"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "۲:۱ کے ظاہری تناسب کی معاشی حقیقت اور بیوہ کے لیے زمین کی قیمت کے معاصر مراجع کے فتاویٰ۔"
            : "Why the sister's retained net capital exceeds the brother's, and contemporary Marja‘ rulings on real estate."}
        </p>
      </div>

      {/* Comparative Balance Sheet Table */}
      <div className="overflow-x-auto rounded-xl border-2 border-[#245642]/30 shadow-xs">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#0A2118] text-white">
              <th className="p-3 font-bold border-b border-emerald-900 tracking-wider w-1/2">
                {isUr ? "مرد وارث (The Male Successor — 2 Shares)" : "The Male Successor (2 Shares)"}
              </th>
              <th className="p-3 font-bold border-b border-emerald-900 tracking-wider w-1/2">
                {isUr ? "عورت وارث (The Female Successor — 1 Share)" : "The Female Successor (1 Share)"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-medium">
            <tr className="bg-white dark:bg-[#0c1814]">
              <td className="p-3 text-stone-800 dark:text-stone-200">
                <span className="flex items-center gap-1 font-bold text-emerald-800 dark:text-emerald-300">
                  <TrendingUp className="w-3.5 h-3.5" /> Gross Inheritance: ₨ 10,000,000 (2 Shares)
                </span>
              </td>
              <td className="p-3 text-stone-800 dark:text-stone-200">
                <span className="flex items-center gap-1 font-bold text-emerald-800 dark:text-emerald-300">
                  <TrendingUp className="w-3.5 h-3.5" /> Gross Inheritance: ₨ 5,000,000 (1 Share)
                </span>
              </td>
            </tr>
            <tr className="bg-[#FAF8F5] dark:bg-[#10201a]">
              <td className="p-3 text-red-700 dark:text-red-400">
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Nuptial Mahr Debt: -₨ 3,000,000 (Outflow)
                </span>
              </td>
              <td className="p-3 text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Nuptial Mahr Received: +₨ 3,000,000 (Inflow)
                </span>
              </td>
            </tr>
            <tr className="bg-white dark:bg-[#0c1814]">
              <td className="p-3 text-red-700 dark:text-red-400">
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Lifetime Family Nafaqah: -₨ 6,000,000 (Mandatory)
                </span>
              </td>
              <td className="p-3 text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Living Expenses: ₨ 0 (100% funded by husband/father)
                </span>
              </td>
            </tr>
            <tr className="bg-[#FAF8F5] dark:bg-[#10201a]">
              <td className="p-3 text-red-700 dark:text-red-400">
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Elder Parents Support: -₨ 1,000,000
                </span>
              </td>
              <td className="p-3 text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Private Property & Enterprise: 100% Retained
                </span>
              </td>
            </tr>
            <tr className="bg-[#edf3e7] dark:bg-[#132c21] font-bold text-xs sm:text-sm">
              <td className="p-3 text-amber-900 dark:text-amber-300">
                NET DISPOSABLE: ₨ 0 to ₨ 500,000 (Heavy liability load)
              </td>
              <td className="p-3 text-emerald-900 dark:text-emerald-200">
                NET DISPOSABLE: ₨ 8,000,000+ (Completely protected wealth)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* The 4 Inflow Channels of a Woman */}
      <div className="space-y-2.5">
        <span className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
          {isUr ? "مسلم خاتون کے چار مستقل معاشی ذرائع (The 4 Inflow Channels):" : "The 4 Inflow Channels of a Muslim Woman:"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-[#245642]/30 text-center space-y-1 shadow-2xs">
            <span className="text-base font-bold text-emerald-700 block">1. المهر</span>
            <strong className="text-stone-900 dark:text-white block">Mahr</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">Capital gift transferred upon marriage</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-[#245642]/30 text-center space-y-1 shadow-2xs">
            <span className="text-base font-bold text-emerald-700 block">2. النفقة</span>
            <strong className="text-stone-900 dark:text-white block">Nafaqah</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">100% free food, housing, clothing, healthcare</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-[#245642]/30 text-center space-y-1 shadow-2xs">
            <span className="text-base font-bold text-emerald-700 block">3. الإرث</span>
            <strong className="text-stone-900 dark:text-white block">Inheritance</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">Statutory unalienable share as daughter/wife/mother</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-[#245642]/30 text-center space-y-1 shadow-2xs">
            <span className="text-base font-bold text-emerald-700 block">4. الملكية</span>
            <strong className="text-stone-900 dark:text-white block">Private Wealth</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">100% private investments, immune from husband</p>
          </div>
        </div>
      </div>

      {/* The Real Estate Divide (Marja Diff Cards) */}
      <div className="space-y-2">
        <span className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
          {isUr ? "بیوہ کے رئیل اسٹیٹ حقوق پر مراجعِ عظام کا اختلاف:" : "The Real Estate Divide (Marja‘ Diff Cards):"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border-2 border-emerald-600/50 bg-[#edf3e7] dark:bg-[#132c21] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <strong className="text-emerald-950 dark:text-emerald-200 text-sm">
                Sayyid al-Sistani & Sayyid al-Khamenei
              </strong>
              <Home className="w-4 h-4 text-emerald-700" />
            </div>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              {isUr
                ? "بیوہ مکان کی عمارت اور تمام اقسام کی زمین (رہائشی، تجارتی اور زرعی) کی نقد قیمت (Financial Value) میں سے اپنا پورا ۱/۸ یا ۱/۴ حصہ پاتی ہے۔"
                : "The widow inherits monetary value from BOTH the buildings AND all land (residential, commercial, agricultural). She cannot be barred from land value."}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-amber-600/40 bg-white dark:bg-[#0c1814] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <strong className="text-amber-950 dark:text-amber-200 text-sm">
                Sayyid al-Khoei & Sheikh Makarem Shirazi
              </strong>
              <Home className="w-4 h-4 text-amber-700" />
            </div>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              {isUr
                ? "بیوہ صرف تعمیرات (ملبہ، عمارت، درخت) کی قیمت میں سے حصہ پاتی ہے؛ زمین کے اصل رقبے یا اس کی قیمت سے محروم رہتی ہے۔"
                : "The widow inherits from the value of building materials, structures, and trees ONLY; she receives zero from the value of the land."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 5: QURANIC PORTIONS, AWL & TA'SIB
   ========================================================================= */
function Pillar5Exposition({ isUr }: { isUr: boolean }) {
  const [activeFraction, setActiveFraction] = useState<number>(0);

  const fractions = [
    { fraction: "1/2", arabic: "Al-Niṣf (النصف)", beneficiaries: isUr ? "شوہر (اگر اولاد نہ ہو)، تنہا بیٹی، تنہا سگی بہن" : "Husband (no children), Single Daughter, Single Sister" },
    { fraction: "1/4", arabic: "Al-Rubu‘ (الربع)", beneficiaries: isUr ? "شوہر (اولاد کے ساتھ)، زوجہ (اگر شوہر کی اولاد نہ ہو)" : "Husband (with children), Wife (childless husband)" },
    { fraction: "1/8", arabic: "Al-Thumun (الثمن)", beneficiaries: isUr ? "زوجہ یا تمام بیویاں مل کر (اگر شوہر کی اولاد ہو)" : "Wife or all wives jointly (with children)" },
    { fraction: "2/3", arabic: "Al-Thuluthān (الثلثان)", beneficiaries: isUr ? "دو یا زیادہ بیٹیاں، دو یا زیادہ سگی بہنیں" : "Two or more Daughters, Two or more Full Sisters" },
    { fraction: "1/3", arabic: "Al-Thuluth (الثلث)", beneficiaries: isUr ? "ماں (اولاد و بھائی نہ ہوں)، متعدد اخیافی بہن بھائی" : "Mother (no children/siblings), Multiple Uterine Siblings" },
    { fraction: "1/6", arabic: "Al-Sudus (السدس)", beneficiaries: isUr ? "باپ (اولاد کے ساتھ)، ماں (اولاد کے ساتھ)، تنہا اخیافی بھائی/بہن" : "Father (with children), Mother (with children), Single Uterine Sibling" },
  ];

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "قرآن کے چھ مقدر حصے اور بطلانِ عول و تعصیب" : "The 6 Quranic Fractions & Side-by-Side Doctrine Clash"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "قرآن مجید کے چھ متعین کسر اور خسارے یا اضافی مال کے تصفیے میں فقہِ جعفریہ کا عدل۔"
            : "The 6 Divine Fractions and the Ja‘farī defense against deficit reduction (‘Awl) and agnatic diversion (Ta‘ṣīb)."}
        </p>
      </div>

      {/* The 6 Quranic Fractions Grid (Interactive) */}
      <div>
        <span className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
          {isUr ? "قرآن کے چھ مقدر فرائض (کلک کر کے جائزہ لیں):" : "The 6 Quranic Fractions Grid (Click to highlight):"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {fractions.map((f, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setActiveFraction(idx)}
              className={`p-3 rounded-xl border text-center transition-all ${
                activeFraction === idx
                  ? "border-[#245642] bg-[#edf3e7] dark:bg-[#132c21] shadow-xs scale-102"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c1814] hover:bg-stone-50"
              }`}
            >
              <div className="text-xl font-extrabold text-[#245642] dark:text-emerald-400 font-cinzel">
                {f.fraction}
              </div>
              <div className="text-xs font-naskh text-stone-600 dark:text-stone-400 font-bold mt-0.5">
                {f.arabic}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Fraction Details Card */}
        <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-[#0c1814] border border-[#245642]/30 text-xs">
          <span className="font-bold text-[#245642] dark:text-emerald-300 mr-2">
            Beneficiaries of {fractions[activeFraction].fraction} ({fractions[activeFraction].arabic}):
          </span>
          <span className="text-stone-800 dark:text-stone-200 font-medium">
            {fractions[activeFraction].beneficiaries}
          </span>
        </div>
      </div>

      {/* Side-by-Side Doctrine Clash Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Card 1: Butlan al-Awl */}
        <div className="p-4 rounded-xl border-2 border-emerald-600/50 bg-white dark:bg-[#0c1814] space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700">Doctrine 1</span>
              <h5 className="font-bold text-sm text-[#0A2118] dark:text-emerald-200">
                {isUr ? "بطلانِ عول (Deficit Protection)" : "Card 1: Buṭlān al-‘Awl (Deficit Protection)"}
              </h5>
            </div>
            <ShieldAlert className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <strong className="text-emerald-900 dark:text-emerald-300 block">
              {isUr ? "جعفری اصول: والدین و ازواج محفوظ" : "Visual Balance Diagram:"}
            </strong>
            <p className="text-stone-700 dark:text-stone-300">
              {isUr
                ? "شوہر/بیوی اور والدین کا قرآنی حصہ ۱۰۰٪ برقرار رہتا ہے۔ خسارہ صرف بیٹیوں کے لچکدار حصے سے پورا ہوتا ہے۔"
                : "Parents and Spouses protected at 100%. Deficit absorbed exclusively by daughters/sisters."}
            </p>
          </div>

          <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
            {isUr
              ? "جب حصوں کا مجموعہ ۱۰۰٪ سے بڑھ جائے (مثلاً شوہر ۱/۴ + والدین ۲/۶ + ۲ بیٹیاں ۲/۳ = ۱۵/۱۲)، تو سنی مکاتب تمام ورثاء کا حصہ یکساں گھٹا دیتے ہیں۔ فقہِ جعفریہ میں عول باطل ہے؛ خدا کے کسر کبھی گھٹائے نہیں جاتے۔"
              : "When shares sum to 15/12, other schools dilute every heir equally. Ja‘farī law repudiates ‘Awl: Spouses and Parents retain their full denominator; the deficit is deducted solely from daughters."}
          </p>
        </div>

        {/* Card 2: Butlan al-Ta'sib */}
        <div className="p-4 rounded-xl border-2 border-amber-600/50 bg-white dark:bg-[#0c1814] space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700">Doctrine 2</span>
              <h5 className="font-bold text-sm text-[#0A2118] dark:text-amber-200">
                {isUr ? "بطلانِ تعصیب (Surplus Protection)" : "Card 2: Buṭlān al-Ta‘ṣīb (Surplus Protection)"}
              </h5>
            </div>
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
            <strong className="text-amber-900 dark:text-amber-300 block">
              {isUr ? "جعفری اصول: مال گھر میں واپس (رد)" : "Visual Balance Diagram:"}
            </strong>
            <p className="text-stone-700 dark:text-stone-300">
              {isUr
                ? "بچا ہوا مال واپس بیٹی کو رد ہو کر ۱۰۰٪ بن جاتا ہے۔ چچا کو ایک پیسہ نہیں ملتا۔"
                : "Surplus returns via Radd to the immediate family home; distant male agnates receive 0%."}
            </p>
          </div>

          <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
            {isUr
              ? "جب ترکے میں سے فرض دینے کے بعد مال بچ جائے (مثلاً اکلوتی بیٹی کا ۱/۲)، تو غیر جعفری مکاتب بچا ہوا آدھا مال دور کے چچا کو 'عصبہ' کے طور پر دیتے ہیں۔ فقہِ جعفریہ میں تعصیب باطل ہے؛ ۱۰۰٪ مال بیٹی کا ہے۔"
              : "When an only daughter takes her statutory 1/2, other schools divert the remaining 1/2 to distant male uncles (Ta‘ṣīb). Ja‘farī law strictly bans Ta‘ṣīb: surplus returns via Radd to the daughter, giving her 100%."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 6: REPRESENTATION (TANZIL) & HABWAH RELICS
   ========================================================================= */
function Pillar6Exposition({ isUr }: { isUr: boolean }) {
  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "قائم مقامی (تنزیل) اور بڑے بیٹے کے حَبْوہ کے شرعی احکام" : "Tanzīl Lineage Visualizer & Ḥabwah Relics Architecture"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "پوتوں اور نواسوں میں شاخ در شاخ تقسیم، اور فوت شدہ باپ کے مخصوص نوادرات کا قانون۔"
            : "Representation for orphaned grandchildren (Tanzīl) and the eldest son's sacred heirloom privileges (Ḥabwah)."}
        </p>
      </div>

      {/* 1. Tanzil Lineage Visualizer */}
      <div className="p-4 rounded-xl border-2 border-[#245642]/30 bg-white dark:bg-[#0c1814] space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#245642] dark:text-emerald-400" />
            <h5 className="font-bold text-sm text-[#0A2118] dark:text-white">
              {isUr ? "قائم مقامی کا شجرہ (Tanzīl Lineage Visualizer)" : "Tanzīl Lineage Visualizer (Grandchildren Representation)"}
            </h5>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            Branch Step-In
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-1.5">
            <strong className="text-emerald-950 dark:text-emerald-200 block text-sm">
              {isUr ? "پوتا اور پوتی (Son's Branch — 2 Shares)" : "Pota & Poti (Son's Branch — 2 Shares)"}
            </strong>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "فوت شدہ بیٹے کے بچے اپنے باپ کے ۲ حصوں میں داخل ہوتے ہیں، پھر ان ۲ حصوں کو آپس میں ۲:۱ (مرد کو دوگنا) کے حساب سے تقسیم کرتے ہیں۔"
                : "The orphaned children of a predeceased son step into his exact 2 shares, dividing it among themselves in a 2:1 male-to-female ratio."}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-1.5">
            <strong className="text-amber-950 dark:text-amber-200 text-sm">
              {isUr ? "نواسہ اور نواسی (Daughter's Branch — 1 Share)" : "Nawasa & Nawasi (Daughter's Branch — 1 Share)"}
            </strong>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "فوت شدہ بیٹی کے بچے اپنی ماں کے ۱ حصے میں داخل ہوتے ہیں، اور احتیاط کے تحت آپس میں ۲:۱ کے حساب سے بانٹتے ہیں۔"
                : "The orphaned children of a predeceased daughter step into her exact 1 share, divided among themselves (2:1 under precaution)."}
            </p>
          </div>
        </div>

        {/* The Poti vs. Nawasa Paradox Badge */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#12221b] border-2 border-amber-600/40 flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <strong className="text-amber-950 dark:text-amber-300 font-bold block text-sm">
              {isUr ? "پوتی بمقابلہ نواسہ کا فقہی پیراڈوکس (The Poti vs. Nawasa Paradox):" : "The Poti vs. Nawasa Paradox Badge:"}
            </strong>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              {isUr
                ? "ایک پوتی (لڑکی) اپنے مرحوم باپ کے ۲ حصوں کی وارث بن کر، نواسے (لڑکے جو مرحوم ماں کے ۱ حصے سے لے رہا ہے) سے زیادہ مال وصول کر سکتی ہے! یہ ثابت کرتا ہے کہ تنزیل میں اصل ترجیح جڑ (Root) کی ہے، ظاہری جنس کی نہیں۔"
                : "A Poti (granddaughter through a predeceased son) receives a share derived from 2 shares, which can exceed the share of a Nawasa (grandson through a predeceased daughter who inherits from 1 share), even though he is male! Tanzīl honors branch roots, not outer gender."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. The 4 Habwah Relics Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
            {isUr ? "بڑے بیٹے کے چار مخصوص تبرکات (حَبْوہ):" : "The 4 Ḥabwah Relics Display:"}
          </span>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            Father's Relics
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-[#0c1814] border-2 border-amber-400/50 text-center space-y-1.5 shadow-xs">
            <span className="text-3xl block">📖</span>
            <strong className="text-stone-900 dark:text-white block text-sm">{isUr ? "قرآنِ مجید" : "The Qur'an"}</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Father's personal copy</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-[#0c1814] border-2 border-amber-400/50 text-center space-y-1.5 shadow-xs">
            <span className="text-3xl block">💍</span>
            <strong className="text-stone-900 dark:text-white block text-sm">{isUr ? "انگشتری (انگوٹھی)" : "The Ring"}</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Father's signet ring</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-[#0c1814] border-2 border-amber-400/50 text-center space-y-1.5 shadow-xs">
            <span className="text-3xl block">⚔️</span>
            <strong className="text-stone-900 dark:text-white block text-sm">{isUr ? "تلوار / اسلحہ" : "The Sword"}</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Father's sword/arms</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-[#0c1814] border-2 border-amber-400/50 text-center space-y-1.5 shadow-xs">
            <span className="text-3xl block">🧥</span>
            <strong className="text-stone-900 dark:text-white block text-sm">{isUr ? "لباس (ملبوسات)" : "The Apparel"}</strong>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Father's worn clothing</p>
          </div>
        </div>

        {/* Habwah Criteria Box */}
        <div className="p-3.5 rounded-xl bg-[#edf3e7] dark:bg-[#132c21] border border-[#245642]/30 text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
          <strong>{isUr ? "حبوہ کی بنیادی شرائط:" : "Ḥabwah Juridical Criteria:"}</strong>
          <span className="ml-1">
            {isUr
              ? "۱. صرف فوت شدہ باپ پر لاگو ہے (ماں پر نہیں)؛ ۲. بڑا بیٹا عاقل، بالغ اور زندہ ہو؛ ۳. بیٹا عاقِ والدین نہ ہو؛ ۴. قرض کی ادائیگی ترکے میں موجود ہو (اگر ترکہ قرضوں میں ڈوبا ہو تو حبوہ بھی قرض کی ادائیگی کے لیے بیچا جائے گا)۔"
              : "1. Deceased father only (not mother); 2. Eldest living sane son; 3. Son is non-‘Āqq (not disobedient); 4. Debt Solvency: If general assets cannot cover debts, Ḥabwah must be surrendered to satisfy creditors."}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 7: STATUTORY DISQUALIFICATIONS (موانع الإرث)
   ========================================================================= */
function Pillar7Exposition({ isUr }: { isUr: boolean }) {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const disqualifiers = [
    {
      id: 0,
      titleEn: "1. Qatl (Murder / Homicide)",
      titleUr: "۱. القتل (قتلِ مورث)",
      badgeEn: "Bar on Estate & Diyah",
      badgeUr: "ترکہ اور دیت سے محرومی",
      colorBorder: "border-red-600/50",
      colorBg: "bg-red-50/50 dark:bg-red-950/20",
      icon: ShieldAlert,
      detailsEn: "Intentional murder (Qatl al-‘Amd) completely and permanently disinherits the killer from both the victim's estate and blood money (Diyah). However, purely accidental manslaughter (Qatl al-Khaṭa') allows the killer to inherit from general property, but strictly bars them from receiving any portion of the Diyah.",
      detailsUr: "قتلِ عمد (قصداً قتل): قاتل مورث کے عمومی ترکے اور خون بہا (دیت) دونوں سے کلی اور ہمیشہ کے لیے محروم ہے۔ قتلِ خطا (حادثاتی قتل): قاتل عمومی جائیداد سے وارث بن سکتا ہے لیکن دیت میں سے ایک پائی بھی نہیں پا سکتا۔",
      exceptionEn: "Accidental Manslaughter distinction: General assets inherited; Diyah 100% blocked.",
      exceptionUr: "قتلِ خطا کا استثناء: جائیداد سے وارث، دیت سے قطعی محروم۔",
    },
    {
      id: 1,
      titleEn: "2. Kufr (Apostasy / Disparity of Religion)",
      titleUr: "۲. الکفر (اختلافِ دین و ارتداد)",
      badgeEn: "Strict Asymmetric Barrier",
      badgeUr: "غیر متوازن شرعی رکاوٹ",
      colorBorder: "border-stone-500/50",
      colorBg: "bg-stone-50 dark:bg-stone-900/40",
      icon: Lock,
      detailsEn: "A non-Muslim relative never inherits from a deceased Muslim. In stark contrast, if a non-Muslim dies and has even a single Muslim heir, that Muslim heir exclusively captures 100% of the entire estate, completely disinheriting all other non-Muslim heirs regardless of proximity.",
      detailsUr: "کافر یا غیر مسلم کسی بھی مسلمان کا وارث نہیں بن سکتا۔ اس کے برعکس، اگر غیر مسلم کا انتقال ہو اور اس کا ایک بھی رشتہ دار مسلمان ہو، تو وہ تنہا مسلمان وارث تمام غیر مسلم ورثاء کو محروم کر کے ۱۰۰٪ ترکہ لے لیتا ہے۔",
      exceptionEn: "Conversion Exception: If an infidel heir converts to Islam BEFORE the estate is formally partitioned among heirs, they are admitted into their full statutory share!",
      exceptionUr: "قبولِ اسلام کا استثناء: اگر غیر مسلم وارث ترکے کی باضابطہ تقسیم سے پہلے اسلام قبول کر لے، تو وہ اپنے پورے وراثتی حصے کا حقدار بن جاتا ہے!",
    },
    {
      id: 2,
      titleEn: "3. Li‘ān (Judicial Paternity Denial)",
      titleUr: "۳. اللعان (نسب کی عدالتی نفی)",
      badgeEn: "Bilateral Dissolution",
      badgeUr: "یکطرفہ شرعی انقطاع",
      colorBorder: "border-blue-600/50",
      colorBg: "bg-blue-50/50 dark:bg-blue-950/20",
      icon: Scale,
      detailsEn: "When a husband denies paternity of a child through judicial sworn curses before a Sharia judge (Li‘ān), mutual inheritance between father and child is dissolved forever. The child inherits strictly from the mother and maternal relatives.",
      detailsUr: "شرعی عدالت میں باقاعدہ لعان کے بعد باپ اور بچے کا وراثتی تعلق ابدی طور پر ختم ہو جاتا ہے۔ بچہ صرف اپنی ماں اور ماں کے رشتہ داروں کا وارث بنتا ہے اور ماں اس کی وارث ہوتی ہے۔",
      exceptionEn: "Father's Retraction Exception: If the father later recants his denial, the child inherits from the father, but the father still cannot inherit from the child!",
      exceptionUr: "رجوع کا یکطرفہ استثناء: اگر باپ بعد میں اپنے انکار سے رجوع کر لے، تو بچہ باپ کا وارث بن جائے گا لیکن باپ بچے کا وارث نہیں بن سکے گا!",
    },
    {
      id: 3,
      titleEn: "4. Walad al-Zinā (Illegitimacy)",
      titleUr: "۴. ولد الزنا (غیر شرعی ولادت)",
      badgeEn: "Severance from Both Parents",
      badgeUr: "دونوں والدین سے انقطاع",
      colorBorder: "border-amber-600/50",
      colorBg: "bg-amber-50/50 dark:bg-amber-950/20",
      icon: AlertTriangle,
      detailsEn: "Under consensus Ja‘farī jurisprudence, a child born out of wedlock has no legal statutory lineage to either biological father or biological mother. Consequently, no mutual inheritance arises between the child and either parent or their families.",
      detailsUr: "متفقہ جعفری فتاویٰ کے مطابق غیر شرعی ولادت کی صورت میں بچے کا نسبی تعلق دونوں حیاتیاتی والدین (باپ اور ماں) سے شرعاً منقطع ہوتا ہے۔ نتیجتاً ان کے درمیان باہمی وراثت کا کوئی حق پیدا نہیں ہوتا۔",
      exceptionEn: "Spousal and Descendant Rights: The illegitimate person inherits from and transmits to their own lawful spouse and lawful legitimate children normally.",
      exceptionUr: "اپنی اولاد اور زوجہ کا استثناء: یہ شخص اپنی جائز بیوی اور سگی جائز اولاد سے معمول کے مطابق باہمی وراثت پاتا ہے۔",
    },
  ];

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "وراثت سے محروم کرنے والی شرعی رکاوٹیں (موانعِ ارث)" : "The Disqualifications Switchboard (Mawāni‘ al-Irth)"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "چار بنیادی موانع، قتلِ عمد و خطا کے احکام اور تقسیم سے قبل اسلام لانے کے اہم استثناءات۔"
            : "Interactive switchboard for the 4 core impediments, intentional vs. accidental rules, and conversion exceptions."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disqualifiers.map((d) => {
          const Icon = d.icon;
          const isExpanded = expandedCard === d.id;

          return (
            <div
              key={d.id}
              className={`rounded-xl border-2 ${d.colorBorder} bg-white dark:bg-[#0c1814] p-4 sm:p-5 shadow-xs transition-all space-y-3`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCard(isExpanded ? null : d.id)}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-stone-700 dark:text-stone-300" />
                  <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
                    {isUr ? d.titleUr : d.titleEn}
                  </h5>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {isUr ? d.badgeUr : d.badgeEn}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </div>
              </div>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                {isUr ? d.detailsUr : d.detailsEn}
              </p>

              {isExpanded && (
                <div className={`p-3 rounded-lg ${d.colorBg} border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-900 dark:text-stone-100 leading-relaxed`}>
                  <strong className="block mb-0.5 text-[#245642] dark:text-emerald-400">
                    {isUr ? "شرعی نکتہ و استثناء:" : "Crucial Sharia Condition & Exception:"}
                  </strong>
                  <span>{isUr ? d.exceptionUr : d.exceptionEn}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   PILLAR 8: COMPLEX SUCCESSION EVENTS (الحالات الاستثنائية والمناسخات)
   ========================================================================= */
function Pillar8Exposition({ isUr }: { isUr: boolean }) {
  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      <div className="border-b border-[#245642]/20 pb-3">
        <h4 className="font-bold text-base sm:text-lg text-[#0A2118] dark:text-[#F0FDF4] font-cinzel">
          {isUr ? "پیچیدہ ہنگامی مسائل: حمل، مشترکہ حادثات اور دہائیوں پرانی مناسخات" : "Complex Succession Events: Three High-Impact Contingency Ledgers"}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          {isUr
            ? "غیر متوقع پیدائش، سانحات میں بیک وقت اموات اور دہائیوں پر محیط مناسخات کے ریاضیاتی حل۔"
            : "Mathematical and fiqh resolution for prenatal escrow, bilateral simultaneous deaths, and compounded generational chains."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Incident 1: Al-Haml */}
        <div className="p-4 sm:p-5 rounded-xl border-2 border-blue-600/40 bg-white dark:bg-[#0c1814] space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Incident 1 • Prenatal
              </span>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "۱. الجنین والحمل (Unborn Fetus)" : "1. Al-Ḥaml (Unborn Fetus)"}
            </h5>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] font-bold text-blue-900 dark:text-blue-300">
              {isUr ? "ایسکرو فارمولا: ۲ جڑواں بیٹوں کا حصہ محفوظ" : "Escrow Formula: Reserve 2 Male Twin Shares"}
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "اگر ورثاء بچے کی پیدائش سے پہلے جائیداد تقسیم کرنے پر مصر ہوں، تو ایڈمنسٹریٹر کو لازمی طور پر ۲ ممکنہ جڑواں بیٹوں کے حصے کا مال امانت (Escrow) میں منجمد رکھنا پڑے گا۔ باقی مال دیگر ورثاء میں تقسیم ہو سکتا ہے۔"
                : "The Escrow Rule: If heirs insist on partition before delivery, administrators must freeze in escrow the share of two male twins. After birth, the surplus is adjusted."}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 font-semibold">
            {isUr ? "شرطِ استحقاق: زندہ ولادت (استہلال)" : "Condition: Live birth evidence (Istihlāl)"}
          </div>
        </div>

        {/* Incident 2: Al-Gharqa */}
        <div className="p-4 sm:p-5 rounded-xl border-2 border-amber-600/40 bg-white dark:bg-[#0c1814] space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Incident 2 • Catastrophe
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "۲. الغرقى والهدَمى (Simultaneous Accidents)" : "2. Al-Gharqā wa al-Hadmā (Accidents)"}
            </h5>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-900 dark:text-amber-300">
              {isUr ? "اصول: باہمی وراثت بغیر تسلسل کے" : "Axiom: Cross-Succession Anti-Looping"}
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "جب دو رشتہ دار ایک ہی حادثے (ڈوبنے یا عمارت گرنے) میں مر جائیں اور تقدم کا علم نہ ہو، تو دونوں ایک دوسرے کے اصل ترکے (Aṣl al-Māl) سے باہمی وارث بنتے ہیں۔ لیکن جو مال حادثے میں ملا اس پر دوبارہ وراثت نہیں چلے گی تاکہ تسلسل و دور باطل رہے۔"
                : "Bilateral cross-succession logic: Both heirs inherit from each other's original pre-accident assets. Strict Anti-Looping Rule: Neither inherits from the share acquired through the disaster."}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 font-semibold">
            {isUr ? "اصول: عدمِ تسلسل و دور (No Infinite Loops)" : "Rule: Pre-accident capital only"}
          </div>
        </div>

        {/* Incident 3: Al-Munasakhat */}
        <div className="p-4 sm:p-5 rounded-xl border-2 border-emerald-600/40 bg-white dark:bg-[#0c1814] space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Incident 3 • Compounded
              </span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <h5 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {isUr ? "۳. المناسخات (Compounded Generations)" : "3. Al-Munāsakhāt (Compounded Chains)"}
            </h5>
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
              {isUr ? "مرحلہ وار حل: تصحیحِ فریضہ بذریعہ LCM" : "Step-by-Step Chain Resolver via LCM"}
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {isUr
                ? "جب دادا کے بعد باپ فوت ہو اور ترکہ سالوں تک غیر منقسم رہے، تو فریضہ اولیٰ اور فریضہ ثانیہ کے الگ لیجرز بنا کر ذو اضعاف اقل (LCM) سے مخرج کی تصحیح کی جاتی ہے۔ اس طرح تیسری نسل کو درست کسر منتقل ہوتی ہے۔"
                : "Step-by-step multi-generational estate chain resolver: Constructs the primary deceased's ledger, nests subsequent deaths, and harmonizes denominators via Least Common Multiple (Taṣḥīḥ al-Farīḍah)."}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 font-semibold">
            {isUr ? "حل: فریضہ اولیٰ اور ثانیہ کا ادغام" : "Method: Ledger Harmonization"}
          </div>
        </div>
      </div>
    </div>
  );
}
