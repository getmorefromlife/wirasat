"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
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
} from "lucide-react";

export const AcademyView: React.FC = () => {
  const { language, loadPreset, setActiveView } = useInheritanceStore();
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<
    "mindmap" | "whyWeDiffer" | "scenarios"
  >("mindmap");

  return (
    <div className="academy-workspace max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Academy Header */}
      <div className="border-b border-[var(--theme-border)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[var(--theme-gold)]" />
            <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)]">
              {t.academyTitle}
            </h2>
          </div>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            {t.academySubtitle}
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf3e7] border border-[#a5b69d] text-xs font-semibold text-[#245642]">
            <span>{language === "ur" ? "تحقیق و تدوین: مولانا سیّد آئمن رضوی" : "Scholarly Research & Curation: Maulana Syed Imon Rizvi"}</span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="academy-tabs flex flex-wrap items-center gap-2 p-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)]">
          <button
            aria-pressed={activeTab === "mindmap"}
            onClick={() => setActiveTab("mindmap")}
            className={`px-3 py-1.5 rounded-lg text-base font-bold transition-all ${
              activeTab === "mindmap"
                ? "bg-[var(--theme-gold)] text-white shadow-sm"
                : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-gold)]"
            }`}
          >
            {t.tabMindMap}
          </button>
          <button
            aria-pressed={activeTab === "whyWeDiffer"}
            onClick={() => setActiveTab("whyWeDiffer")}
            className={`px-3 py-1.5 rounded-lg text-base font-bold transition-all ${
              activeTab === "whyWeDiffer"
                ? "bg-[var(--theme-gold)] text-white shadow-sm"
                : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-gold)]"
            }`}
          >
            {t.tabWhyWeDiffer}
          </button>
          <button
            aria-pressed={activeTab === "scenarios"}
            onClick={() => setActiveTab("scenarios")}
            className={`px-3 py-1.5 rounded-lg text-base font-bold transition-all ${
              activeTab === "scenarios"
                ? "bg-[var(--theme-gold)] text-white shadow-sm"
                : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-gold)]"
            }`}
          >
            {t.tabSimulations}
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: Interactive Mind-Map of 3 Tabaqāt */}
      {activeTab === "mindmap" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md">
            <h3 className="text-base font-bold font-cinzel text-[var(--theme-gold)] mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--theme-gold)]" />
              {language === "ur"
                ? "جعفری قانونِ حجبِ حرمان کا بنیادی فکری نقشہ"
                : "The Cardinal Flow of Ja'fari Priority (Ḥujub al-Ḥirmān)"}
            </h3>
            <p className="text-base text-[var(--theme-text-secondary)] leading-relaxed">
              {language === "ur"
                ? "فقہ جعفریہ میں ورثاء تین غیر مبدل طبقات میں منقسم ہیں۔ جب تک پہلے طبقے کا ایک بھی وارث زندہ ہے، دوسرے اور تیسرے طبقے کو ایک پیسہ بھی نہیں مل سکتا۔ قرابت میں جو جتنا متوفی کے قریب ہوگا وہ دور والے کو کلی طور پر ساقط کر دے گا۔"
                : "In Ja'fari Law, blood relatives are structured into three mutually exclusive Tiers. The presence of a single heir in an earlier Tier permanently and totally excludes all subsequent Tiers (Ḥujub al-Ḥirmān)."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TIER 1 CARD */}
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border-2 border-[var(--theme-gold)] shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold uppercase tracking-wider text-[var(--theme-gold)]">
                    Priority Tier 1
                  </span>
                  <span className="text-base font-naskh text-[var(--theme-gold)] px-2 py-0.5 rounded bg-[var(--theme-gold)]/15">
                    الطبقة الأولى
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--theme-text-primary)]">
                  {language === "ur" ? "والدین اور اولاد" : "Parents & Children"}
                </h4>
                <ul className="mt-4 space-y-2 text-base text-[var(--theme-text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-gold)]" />
                    <strong>Group A:</strong> Father and Mother
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-gold)]" />
                    <strong>Group B:</strong> Sons and Daughters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-gold)]" />
                    <strong>Tanzīl:</strong> Grandchildren (if direct children deceased)
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border)]/60 text-sm text-emerald-400 font-semibold">
                ✓ Excludes Tier 2 and Tier 3 permanently.
              </div>
            </div>

            {/* TIER 2 CARD */}
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                    Priority Tier 2
                  </span>
                  <span className="text-base font-naskh text-[var(--theme-text-muted)] px-2 py-0.5 rounded bg-[var(--theme-card-subtle)]">
                    الطبقة الثانية
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--theme-text-primary)]">
                  {language === "ur" ? "دادا دادی و بہن بھائی" : "Grandparents & Siblings"}
                </h4>
                <ul className="mt-4 space-y-2 text-base text-[var(--theme-text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>Group A:</strong> Paternal & Maternal Grandparents
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>Group B:</strong> Full, Paternal & Uterine Siblings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>Descendants:</strong> Nieces & Nephews
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border)]/60 text-sm text-amber-400 font-semibold">
                ⚠ Unlocks ONLY when Tier 1 is entirely empty.
              </div>
            </div>

            {/* TIER 3 CARD */}
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                    Priority Tier 3
                  </span>
                  <span className="text-base font-naskh text-[var(--theme-text-muted)] px-2 py-0.5 rounded bg-[var(--theme-card-subtle)]">
                    الطبقة الثالثة
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--theme-text-primary)]">
                  {language === "ur" ? "چچا، پھوپھی، ماموں، خالہ" : "Uncles, Aunts & Cousins"}
                </h4>
                <ul className="mt-4 space-y-2 text-base text-[var(--theme-text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <strong>Paternal Line:</strong> Paternal Uncles & Aunts (2/3)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <strong>Maternal Line:</strong> Maternal Uncles & Aunts (1/3)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <strong>Special Case:</strong> Son of full uncle vs consanguine uncle
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border)]/60 text-sm text-red-700 dark:text-red-400 font-semibold">
                ⛔ Unlocks ONLY when Tiers 1 & 2 are empty.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: "Why We Differ" Showcase (Ta'sib & 'Awl Refutations) */}
      {activeTab === "whyWeDiffer" && (
        <div className="space-y-8">
          {/* REFUTATION 1: BUTLAN AL-TA'SIB */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--theme-card)] border-2 border-emerald-500/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <span className="text-base font-bold uppercase tracking-wider text-[#15803d]">
                Foundational Distinction #1
              </span>
              <span className="text-base font-naskh text-[#14532d] px-2.5 py-1 rounded-lg bg-[#dcfce7] border border-[#86efac] font-bold">
                بطلان التعصيب (Repudiation of Ta‘ṣīb)
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[var(--theme-text-primary)]">
              {language === "ur"
                ? "عصبہ کا بطلان: بیٹی یا ماں کے ہوتے ہوئے چچا یا بیت المال کو زائد مال کیوں نہیں دیا جاتا؟"
                : "Why Ja'fari Law Rejects Ta‘ṣīb: Protecting Daughters and Mothers from Distant Agnatic Relatives"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-[var(--theme-text-secondary)] leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--theme-gold)] text-sm">
                  {language === "ur" ? "تاریخی پس منظر و تعصبِ جاہلیت" : "Historical Context & Pre-Islamic Relapse"}
                </h4>
                <p>
                  In pre-Islamic Arabia, women and female children were barred from inheriting property because they did not ride horses or fight in tribal warfare. The Holy Qur’an abolished this misogyny, declaring in Surah Al-Nisā’ (4:7) that women have a determined share.
                </p>
                <p>
                  After the Holy Prophet (sawa), non-Ja&apos;fari jurists revived agnatic preference under the concept of <em>Ta‘ṣīb</em>—decreeing that if a deceased leaves only a daughter, she takes half, and the remaining half is surrendered to distant male agnates (paternal uncles or cousins).
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                <h4 className="font-bold text-[#15803d] text-sm">
                  {language === "ur" ? "قرآنی دلیل اور فرمانِ امام جعفر صادق (ع)" : "The Qur'anic Proof & Imam al-Sadiq (as)"}
                </h4>
                <p className="font-naskh text-sm text-[var(--theme-text-primary)]" dir="rtl">
                  وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ
                </p>
                <p className="italic text-[var(--theme-text-muted)]">
                  &ldquo;And those of blood relations are nearer to one another in the decree of Allah.&rdquo; (33:6)
                </p>
                <p>
                  Imam Ja&apos;far al-Sadiq (as) declared: <em>&ldquo;When a daughter survives, no agnate (casiqah) inherits anything with her.&rdquo;</em> The surplus must be returned (<em>Radd</em>) directly to the daughter, completely shutting out distant uncles.
                </p>
              </div>
            </div>
          </div>

          {/* REFUTATION 2: BUTLAN AL-'AWL */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--theme-card)] border-2 border-[#f59e0b]/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <span className="text-base font-bold uppercase tracking-wider text-[#b45309]">
                Foundational Distinction #2
              </span>
              <span className="text-base font-naskh text-[#78350f] px-2.5 py-1 rounded-lg bg-[#fef3c7] border border-[#fde68a] font-bold">
                بطلان العول (Repudiation of ‘Awl)
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[var(--theme-text-primary)]">
              {language === "ur"
                ? "بطلانِ عول: امیر المومنین علی بن ابی طالب (ع) کا عدل پر مبنی فیصلہ"
                : "Why Ja'fari Law Rejects ‘Awl: The Infallible Logic of Imam Ali (as)"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-[var(--theme-text-secondary)] leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--theme-gold)] text-sm">
                  {language === "ur" ? "مسئلہ عول کی پیدائش" : "The Origin of the Deficit"}
                </h4>
                <p>
                  When a deceased woman leaves behind a Husband (1/4 = 3/12), Parents (1/6 + 1/6 = 4/12), and Two Daughters (2/3 = 8/12), the mathematical sum equals <strong>15/12</strong>, exceeding the estate.
                </p>
                <p>
                  In other schools, the denominator is artificially inflated from 12 to 15 (called <em>‘Awl</em>), penalizing every single heir equally—including the husband and the parents whose Quranic allocations are fixed without qualification.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                <h4 className="font-bold text-amber-400 text-sm">
                  {language === "ur" ? "امیر المومنین (ع) کا منبری خطبہ" : "Imam Ali's (as) Kufa Proclamation"}
                </h4>
                <p className="font-naskh text-sm text-[var(--theme-text-primary)]" dir="rtl">
                  إنَّ الَّذِي أَحْصَىٰ رَمْلَ عَالِجٍ لَيَعْلَمُ أَنَّ السِّهَامَ لَا تَعُولُ
                </p>
                <p className="italic text-[var(--theme-text-muted)]">
                  &ldquo;Verily He who counted the sands of ‘Alij knows that the shares ordained by Allah do not experience ‘Awl.&rdquo; (Wasa&apos;il al-Shi&apos;ah, Vol 26)
                </p>
                <p>
                  Imam Ali (as) established that Allah ordained inviolable shares that can never drop (husband, wife, parents). Therefore, any mathematical deficit is absorbed strictly by the daughters or paternal sisters, leaving the spouse and parents completely whole.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Complex Scenario Simulator */}
      {activeTab === "scenarios" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-md">
            <h3 className="text-base font-bold font-cinzel text-[var(--theme-gold)] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--theme-gold)]" />
              {language === "ur" ? "عملی پیچیدہ کیس اسٹڈیز و نقلی امتحانات" : "Interactive Complex Case Studies"}
            </h3>
            <p className="text-base text-[var(--theme-text-secondary)]">
              {language === "ur"
                ? "نیچے دی گئی مثالوں میں سے کسی پر بھی کلک کر کے اسے براہ راست کیلکولیٹر میں لوڈ کریں اور تمام تفصیلات کا جائزہ لیں۔"
                : "Select any real-world estate scenario below to populate the calculation engine and review verified Ja'fari outputs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIO_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="p-5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] hover:border-[var(--theme-gold)]/60 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-base text-[var(--theme-gold)] font-bold mb-1">
                    <span>Preset Case</span>
                    <span className="uppercase font-mono">{preset.deceased.currency}</span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--theme-text-primary)]">
                    {language === "ur" ? preset.titleUr : preset.titleEn}
                  </h4>
                  <p className="text-base text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                    {language === "ur" ? preset.descriptionUr : preset.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--theme-border)]/60 flex items-center justify-between">
                  <span className="text-sm font-mono text-[var(--theme-text-muted)]">
                    Marja: {preset.deceased.marja.toUpperCase()}
                  </span>
                  <button
                    onClick={() => {
                      loadPreset(preset.id);
                      setActiveView("wizard");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--theme-gold)] text-white text-base font-bold hover:bg-[var(--theme-gold-light)] transition-all shadow"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>{language === "ur" ? "کیلکولیٹر میں چلائیں" : "Simulate Case"}</span>
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
