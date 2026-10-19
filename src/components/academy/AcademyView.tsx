"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
import {
  MASTERCLASS_PILLARS,
  MasterclassStage,
  MasterclassPillar,
} from "@/lib/academy-curriculum";
import { PillarCard } from "@/components/academy/PillarCard";
import {
  GraduationCap,
  Layers,
  Scale,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  PlayCircle,
  Crown,
  Compass,
} from "lucide-react";
import { WirasatLogo } from "@/components/ui/WirasatLogo";

export const AcademyView: React.FC = () => {
  const { language, loadPreset, setActiveView } = useInheritanceStore();
  const isUr = language === "ur";
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<"masterclass" | "whyWeDiffer" | "scenarios">("masterclass");
  const [selectedStage, setSelectedStage] = useState<"ALL" | MasterclassStage>("ALL");

  const filteredPillars = MASTERCLASS_PILLARS.filter((p) => {
    if (selectedStage === "ALL") return true;
    return p.stage === selectedStage;
  });

  return (
    <div className="academy-workspace max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Academy Header */}
      <div className="border-b border-[#245642]/20 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-[#245642] dark:text-emerald-400" />
            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4] tracking-tight">
              {isUr ? "دَائِرَةُ التَّعْلِيمِ وَحِكْمَةُ الْفَرَائِض" : "The Institutional 8-Pillar Masterclass"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl font-medium">
            {isUr
              ? "فقہِ جعفریہ کے مطابق وراثت اور ترکے کے تمام شرعی اصولوں، اسناد و مدارک، اور فقہی باریکیوں کا مستند و تفصیلی کورس۔"
              : "An adult, institutional masterclass on Shia Ja‘farī inheritance law, scriptural precedents, and financial mechanics."}
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e7] dark:bg-[#132c21] border border-[#a5b69d]/50 text-xs font-semibold text-[#245642] dark:text-emerald-300">
            <WirasatLogo variant="icon" color="emerald" size="sm" />
            <span>
              {isUr
                ? "تحقیق و تدوین: مولانا سیّد آئمن رضوی (فاضلِ حوزہ علمیہ قم)"
                : "Scholarly Research & Curation: Maulana Syed Imon Rizvi (Qum Seminary Graduate)"}
            </span>
          </div>
        </div>

        {/* Master Nav Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#0B1713] border border-[#245642]/30 shadow-xs self-start md:self-auto">
          <button
            type="button"
            aria-pressed={activeTab === "masterclass"}
            onClick={() => setActiveTab("masterclass")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === "masterclass"
                ? "bg-[#245642] text-white shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-[#245642] dark:hover:text-emerald-300"
            }`}
          >
            {isUr ? "۸ ارکانِ شریعت (Masterclass)" : "8-Pillar Masterclass"}
          </button>
          <button
            type="button"
            aria-pressed={activeTab === "whyWeDiffer"}
            onClick={() => setActiveTab("whyWeDiffer")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === "whyWeDiffer"
                ? "bg-[#245642] text-white shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-[#245642] dark:hover:text-emerald-300"
            }`}
          >
            {isUr ? "فروقِ اساسی (ردِّ عول و تعصیب)" : "Why We Differ"}
          </button>
          <button
            type="button"
            aria-pressed={activeTab === "scenarios"}
            onClick={() => setActiveTab("scenarios")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === "scenarios"
                ? "bg-[#245642] text-white shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-[#245642] dark:hover:text-emerald-300"
            }`}
          >
            {isUr ? "عملی مشقیں (Simulations)" : "Case Simulations"}
          </button>
        </div>
      </div>

      {/* VIEW 1: THE 8-PILLAR MASTERCLASS */}
      {activeTab === "masterclass" && (
        <div className="space-y-6">
          {/* Stage Navigator (Pill Filter) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0B1713] border border-[#245642]/25 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              <Compass className="w-4 h-4 text-[#245642] dark:text-emerald-400" />
              <span>{isUr ? "مراحلِ کورس (Curriculum Stages):" : "Curriculum Stages:"}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedStage("ALL")}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedStage === "ALL"
                    ? "bg-[#245642] text-white border-[#245642] shadow-2xs"
                    : "bg-white dark:bg-[#12251e] border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "مکمل ۸ دروس (All 8 Pillars)" : "All 8 Pillars"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedStage("FOUNDATIONS")}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedStage === "FOUNDATIONS"
                    ? "bg-[#245642] text-white border-[#245642] shadow-2xs"
                    : "bg-white dark:bg-[#12251e] border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "مرحلہ ۱: اساسیات (1-3)" : "Stage 1: Foundations"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedStage("DISTRIBUTION")}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedStage === "DISTRIBUTION"
                    ? "bg-[#245642] text-white border-[#245642] shadow-2xs"
                    : "bg-white dark:bg-[#12251e] border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "مرحلہ ۲: تقسیم و معیشت (4-6)" : "Stage 2: Distribution"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedStage("CONTINGENCIES")}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedStage === "CONTINGENCIES"
                    ? "bg-[#245642] text-white border-[#245642] shadow-2xs"
                    : "bg-white dark:bg-[#12251e] border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
                }`}
              >
                {isUr ? "مرحلہ ۳: پیچیدہ تنازعات (7-8)" : "Stage 3: Contingencies"}
              </button>
            </div>
          </div>

          {/* Pillars List */}
          <div className="space-y-8">
            {filteredPillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} language={language} />
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: "WHY WE DIFFER" SHOWCASE */}
      {activeTab === "whyWeDiffer" && (
        <div className="space-y-8">
          {/* REFUTATION 1: BUTLAN AL-TA'SIB */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B1713] border-2 border-emerald-600/40 shadow-xl space-y-4 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b border-[#245642]/20 pb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {isUr ? "بنیادی فقہی امتیاز #1" : "Foundational Distinction #1"}
              </span>
              <span className="text-xs sm:text-sm font-naskh text-emerald-900 dark:text-emerald-200 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 font-bold">
                {isUr ? "بطلانِ تعصیب" : "بطلان التعصيب (Repudiation of Ta‘ṣīb)"}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4]">
              {isUr
                ? "عصبہ کا بطلان: بیٹی یا ماں کے ہوتے ہوئے چچا یا بیت المال کو زائد مال کیوں نہیں دیا جاتا؟"
                : "Why Ja'fari Law Rejects Ta‘ṣīb: Protecting Daughters and Mothers from Distant Agnatic Relatives"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              <div className="space-y-3">
                <h4 className="font-bold text-[#245642] dark:text-emerald-300 text-xs uppercase tracking-wider">
                  {isUr ? "تاریخی پس منظر و تعصبِ جاہلیت" : "Historical Context & Pre-Islamic Relapse"}
                </h4>
                {isUr ? (
                  <>
                    <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                      عرب جاہلیت کے دور میں خواتین اور بچیوں کو وراثت سے یکسر محروم رکھا جاتا تھا کیونکہ وہ تلوار نہیں چلا سکتی تھیں اور قبائلی جنگوں میں حصہ نہیں لیتی تھیں۔ قرآنِ حکیم نے سورۂ نساء (آیت 7) نازل فرما کر اس ظلم کا خاتمہ کیا اور خواتین کے متعین حصے مقرر فرمائے۔
                    </p>
                    <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                      لیکن بعد میں غیر جعفری مکاتبِ فکر نے &apos;تعصیب&apos; کا تصور قائم کیا—جس کی رو سے اگر متوفی کی صرف ایک بیٹی ہو تو اسے نصف ترکہ دیا جاتا ہے اور باقی نصف مال دور کے غیر وارث مردوں (جیسے چچا یا تایا کے بیٹوں) کو سونپ دیا جاتا ہے۔ فقہِ جعفری اس کی سختی سے نفی کرتی ہے۔
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      In pre-Islamic Arabia, women and female children were barred from inheriting property because they did not ride horses or fight in tribal warfare. The Holy Qur’an abolished this misogyny, declaring in Surah Al-Nisā’ (4:7) that women have a determined share.
                    </p>
                    <p>
                      After the Holy Prophet (sawa), non-Ja&apos;fari jurists revived agnatic preference under the concept of <em>Ta‘ṣīb</em>—decreeing that if a deceased leaves only a daughter, she takes half, and the remaining half is surrendered to distant male agnates (paternal uncles or cousins).
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white dark:bg-[#0f1f1a] border border-stone-200 dark:border-stone-800">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider">
                  {isUr ? "قرآنی دلیل اور فرمانِ امام جعفر صادق (ع)" : "The Qur'anic Proof & Imam al-Sadiq (as)"}
                </h4>
                <p className="font-naskh text-sm text-[#0A2118] dark:text-emerald-100" dir="rtl">
                  وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ
                </p>
                <p className="italic text-stone-600 dark:text-stone-400">
                  {isUr
                    ? "”اور اللہ کی کتاب میں رشتہ دار آپس میں ایک دوسرے کے زیادہ حقدار ہیں۔“ (الاحزاب: 6)"
                    : "“And those of blood relations are nearer to one another in the decree of Allah.” (33:6)"}
                </p>
                {isUr ? (
                  <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                    امام جعفر صادق (ع) نے صراحت فرمائی: <em>&ldquo;بیٹی کی موجودگی میں کوئی عصبہ کسی چیز کا حقدار نہیں ہوتا۔&rdquo;</em> ترکے کا زائد حصہ &apos;ردّ&apos; کے تحت براہ راست بیٹی کو ملتا ہے اور دور کے چچا یا عصبہ مکمل طور پر محروم رہتے ہیں۔
                  </p>
                ) : (
                  <p>
                    Imam Ja&apos;far al-Sadiq (as) declared: <em>&ldquo;When a daughter survives, no agnate (casiqah) inherits anything with her.&rdquo;</em> The surplus returns (<em>Radd</em>) directly to the daughter, completely shutting out distant uncles.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* REFUTATION 2: BUTLAN AL-'AWL */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B1713] border-2 border-amber-600/40 shadow-xl space-y-4 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b border-amber-600/20 pb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {isUr ? "بنیادی فقہی امتیاز #2" : "Foundational Distinction #2"}
              </span>
              <span className="text-xs sm:text-sm font-naskh text-amber-900 dark:text-amber-200 px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 font-bold">
                {isUr ? "بطلانِ عول" : "بطلان العول (Repudiation of ‘Awl)"}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4]">
              {isUr
                ? "بطلانِ عول: امیر المومنین علی بن ابی طالب (ع) کا عدل پر مبنی فیصلہ"
                : "Why Ja'fari Law Rejects ‘Awl: The Infallible Logic of Imam Ali (as)"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              <div className="space-y-3">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider">
                  {isUr ? "مسئلہ عول کی پیدائش" : "The Origin of the Deficit"}
                </h4>
                {isUr ? (
                  <>
                    <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                      جب کوئی خاتون وفات پائے اور پسماندگان میں شوہر (1/4 = 3/12)، والدین (1/6 + 1/6 = 4/12)، اور دو بیٹیاں (2/3 = 8/12) ہوں، تو مجموعی حصص <strong>15/12</strong> ہو جاتے ہیں جو کل ترکے سے تجاوز کر جاتے ہیں۔
                    </p>
                    <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                      دیگر مکاتب میں مخرج کو 12 سے بڑھا کر 15 کر دیا جاتا ہے (جسے &apos;عول&apos; کہا جاتا ہے)، جس سے تمام ورثاء—بشمول شوہر اور والدین—کے قرآنی حصص میں زبردستی کٹوتی ہو جاتی ہے۔
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      When a deceased woman leaves behind a Husband (1/4 = 3/12), Parents (1/6 + 1/6 = 4/12), and Two Daughters (2/3 = 8/12), the mathematical sum equals <strong>15/12</strong>, exceeding the estate.
                    </p>
                    <p>
                      In other schools, the denominator is artificially inflated from 12 to 15 (called <em>‘Awl</em>), penalizing every single heir equally—including the husband and parents whose Quranic allocations are fixed without qualification.
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white dark:bg-[#0f1f1a] border border-stone-200 dark:border-stone-800">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider">
                  {isUr ? "امیر المومنین (ع) کا منبری خطبہ" : "Imam Ali's (as) Kufa Proclamation"}
                </h4>
                <p className="font-naskh text-sm text-[#0A2118] dark:text-emerald-100" dir="rtl">
                  إنَّ الَّذِي أَحْصَىٰ رَمْلَ عَالِجٍ لَيَعْلَمُ أَنَّ السِّهَامَ لَا تَعُولُ
                </p>
                <p className="italic text-stone-600 dark:text-stone-400">
                  {isUr
                    ? "”یقیناً وہ ذات جس نے عالج کے ریت کے ذروں کو شمار کیا ہے وہ جانتی ہے کہ فرائض (حصص) میں کبھی عول (خسارہ) نہیں ہوتا۔“ (وسائل الشیعہ، ج 26)"
                    : "“Verily He who counted the sands of ‘Alij knows that the shares ordained by Allah do not experience ‘Awl.” (Wasā'il al-Shī'ah, Vol 26)"}
                </p>
                {isUr ? (
                  <p className="font-nastaliq text-sm sm:text-base leading-[2.3] text-stone-800 dark:text-stone-200">
                    امیر المومنین حضرت علی (ع) نے واضح فرمایا کہ اللہ تعالیٰ نے جن ورثاء کے حصص غیر متبدل رکھے ہیں (جیسے شوہر، بیوی، اور والدین)، ان میں کبھی کمی نہیں ہو سکتی۔ خسارہ صرف بیٹیوں یا بہنوں پر ڈالا جاتا ہے کیونکہ قرآنی قاعدے کے تحت ان کے حصے لچکدار ہیں۔
                  </p>
                ) : (
                  <p>
                    Imam Ali (as) established that Allah ordained inviolable shares that can never drop (husband, wife, parents). Therefore, any mathematical deficit is absorbed strictly by the daughters or paternal sisters, leaving the spouse and parents completely whole.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: LIVE CASE SIMULATIONS */}
      {activeTab === "scenarios" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B1713] border border-[#245642]/20 shadow-md">
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#245642] dark:text-emerald-400" />
              {isUr ? "عملی پیچیدہ کیس اسٹڈیز و نقلی امتحانات" : "Interactive Complex Case Studies"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              {isUr
                ? "نیچے دی گئی مثالوں میں سے کسی پر بھی کلک کر کے اسے براہ راست کیلکولیٹر میں لوڈ کریں اور تمام تفصیلات کا جائزہ لیں۔"
                : "Select any real-world estate scenario below to populate the calculation engine and review verified Ja'fari outputs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIO_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="p-5 rounded-xl bg-white dark:bg-[#0B1713] border border-stone-200 dark:border-stone-800 hover:border-[#245642]/60 transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#245642] dark:text-emerald-400 font-bold mb-1">
                    <span>Preset Case</span>
                    <span className="uppercase font-mono">{preset.deceased.currency}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                    {isUr ? preset.titleUr : preset.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                    {isUr ? preset.descriptionUr : preset.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-500">
                    Marja: {preset.deceased.marja.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      loadPreset(preset.id);
                      setActiveView("wizard");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#245642] text-white text-xs font-bold hover:bg-[#1a3f30] transition-all shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isUr ? "کیلکولیٹر میں چلائیں" : "Simulate Case"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
