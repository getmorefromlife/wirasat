"use client";

import React, { useState } from "react";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal";
import { ShieldAlert, Scale, Sparkles, FileText, ChevronRight } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";

export const Footer: React.FC = () => {
  const { language } = useInheritanceStore();
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const isUr = language === "ur";

  return (
    <>
      <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-card)]/50 backdrop-blur-md pt-14 pb-12 mt-16 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 1. Header & Prophet's Hadith */}
          <div className="text-center space-y-3.5">
            <div className="flex justify-center mb-2">
              <WirasatLogo
                variant="seal"
                color="emerald"
                size="lg"
                language={language}
                showCaption={false}
              />
            </div>
            <p
              className="font-naskh text-base sm:text-lg text-[var(--theme-gold)] font-bold tracking-wide leading-[2.2]"
              dir="rtl"
            >
              قَالَ رَسُولُ اللَّهِ (ص): تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ فَإِنَّهَا نِصْفُ الْعِلْمِ
            </p>
            <p className="text-xs text-[var(--theme-text-muted)] italic max-w-xl mx-auto leading-relaxed">
              &ldquo;Learn the laws of inheritance and teach them to the people, for indeed they are half of knowledge.&rdquo; — The Holy Prophet Muhammad (sawa)
            </p>
          </div>

          {/* 2. Dignified Disclaimer Summary Card */}
          <div className="max-w-4xl mx-auto rounded-2xl border-2 border-emerald-800/20 bg-stone-900/5 dark:bg-emerald-950/20 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-800/15 pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-[#245642] dark:text-emerald-400 shrink-0" />
                <h4 className="text-sm sm:text-base font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4]">
                  {isUr
                    ? "شرعی و تکنیکی اعلامیہ"
                    : "Scholarly & AI Limitations Disclaimer"}
                </h4>
              </div>
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                {isUr ? "لازمی شرعی تنبیہ" : "Legal Notice"}
              </span>
            </div>

            {isUr ? (
              <div className="space-y-2 text-right font-nastaliq leading-[2.2] text-sm sm:text-base text-stone-800 dark:text-stone-200" dir="rtl">
                <p>
                  وراثت ایک تعلیمی و تحقیقی اقدام ہے جس کی بنیاد اور ابتدا <strong>مولانا سیّد آئمن رضوی</strong> (فاضل حوزہ علمیہ قم) نے رکھی ہے تاکہ فقہِ جعفریہ کے احکامِ مواریث کو جدید تکنیکی اور عام فہم قالب میں پیش کیا جا سکے۔ یہ حسابی نتائج مراجعِ عظام کے فتاویٰ کے حتمی عدالتی فیصلے کا متبادل نہیں ہیں۔ حسابی و فقہی صحت اور حتمی توثیق کے لیے مختلف علمی اداروں، حوزاتِ علمیہ اور مراجعِ عظام و علمائے کرام کے دفاتر سے مسلسل رابطہ اور تبادلہ خیال کا عمل جاری ہے۔ ترکے کی تقسیم سے قبل مستند علمائے کرام اور وکلاءِ مراجع سے تصدیق شرعاً لازم ہے۔
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-left text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300" dir="ltr">
                <p>
                  Wirasat is an educational research initiative conceived and initiated by <strong>Maulana Syed Imon Rizvi</strong> (Graduate, Islamic Seminary of Qom) to translate classical Ja‘farī inheritance jurisprudence into accessible digital models. Calculations utilize automated algorithmic logic under continuous scholarly review. The project is actively engaged in ongoing consultation and review with traditional seminaries (<em>Ḥawzāt</em>) and the representative offices (<em>Dafātir</em>) of esteemed Marāji‘ and scholars for formal verification. This platform is not a substitute for formal judicial decrees or personal consultation with authorized representatives (Wukalā’).
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => setIsDisclaimerOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#245642] hover:bg-[#1a4031] text-white text-xs font-bold shadow-xs transition-all hover:scale-101 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-emerald-300" />
                <span>
                  {isUr
                    ? "مکمل اعلامیہ و شرعی حدود ملاحظہ فرمائیں"
                    : "Read Full Disclaimer & AI Statement"}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* 3. Author & Scholarly Direction */}
          <div className="text-center pt-2 text-xs sm:text-sm font-medium text-[#245642] dark:text-emerald-300">
            {isUr ? (
              <span className="font-nastaliq text-sm sm:text-base font-bold text-[#172e22] dark:text-emerald-100">
                علمی سرپرستی و تحقیق: مولانا سیّد آئمن رضوی (فاضل حوزہ علمیہ قم)
              </span>
            ) : (
              <>
                <span>A Project by </span>
                <span className="font-extrabold text-[#172e22] dark:text-emerald-100">
                  Maulana Syed Imon Rizvi
                </span>
                <span className="text-stone-500 dark:text-stone-400 font-normal"> (Graduate, Islamic Seminary of Qom)</span>
              </>
            )}
          </div>

          {/* 4. Bottom Copyright & Brand Bar */}
          <div className="pt-4 text-[11px] text-[var(--theme-text-muted)] flex flex-wrap items-center justify-center gap-3 border-t border-[var(--theme-border)]/50 max-w-lg mx-auto">
            <span className="font-bold text-[var(--theme-gold)]">
              Wirasat (وراثت) — A Legacy of Fairness
            </span>
            <span>•</span>
            <span>Ja‘farī Inheritance Planning</span>
            <span>•</span>
            <span>Made with care for your family</span>
          </div>
        </div>
      </footer>

      {/* Dedicated Accessible Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        initialLanguage={language}
      />
    </>
  );
};
