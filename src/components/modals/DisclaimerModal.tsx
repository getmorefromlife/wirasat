"use client";

import React, { useState, useEffect } from "react";
import {
  Scale,
  ShieldAlert,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  X,
  BookOpen,
  Award,
  Globe,
  ExternalLink,
} from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: "en" | "ur";
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  initialLanguage = "en",
}) => {
  const [modalLang, setModalLang] = useState<"en" | "ur">(initialLanguage);

  // Sync initialLanguage when opened
  useEffect(() => {
    if (isOpen) {
      setModalLang(initialLanguage);
    }
  }, [isOpen, initialLanguage]);

  // Handle ESC key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isUr = modalLang === "ur";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
    >
      {/* Dimmed & Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] dark:bg-[#0c1814] rounded-2xl sm:rounded-3xl border-2 border-[#245642]/30 shadow-2xl flex flex-col overflow-hidden z-10 transition-all duration-300 animate-in fade-in zoom-in-95">
        {/* Header */}
        <header className="px-5 sm:px-8 py-5 border-b border-[#245642]/20 bg-white/80 dark:bg-[#0f211a]/90 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#245642]/10 dark:bg-emerald-950/60 flex items-center justify-center text-[#245642] dark:text-emerald-400 border border-[#245642]/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#245642] dark:text-emerald-400 bg-[#edf3e7] dark:bg-[#152e23] px-2.5 py-0.5 rounded-full border border-[#245642]/20">
                  {isUr ? "شرعی و قانونی اعلامیہ" : "Institutional Disclaimer"}
                </span>
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                  {isUr ? "لازمی شرعی پابندی" : "Mandatory Notice"}
                </span>
              </div>
              <h3
                id="disclaimer-modal-title"
                className="text-base sm:text-xl font-bold font-cinzel text-[#0A2118] dark:text-[#F0FDF4] mt-0.5"
              >
                {isUr
                  ? "شرعی، تحقیقی و تکنیکی حدود کا حتمی اعلامیہ"
                  : "Scholarly, Legal & AI Limitations Disclaimer"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bilingual Toggle Switch */}
            <div className="flex items-center rounded-lg bg-stone-200/70 dark:bg-stone-800 p-0.5 border border-stone-300 dark:border-stone-700">
              <button
                type="button"
                onClick={() => setModalLang("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  !isUr
                    ? "bg-[#245642] text-white shadow-xs"
                    : "text-stone-700 dark:text-stone-300 hover:text-black"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setModalLang("ur")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all font-naskh ${
                  isUr
                    ? "bg-[#245642] text-white shadow-xs"
                    : "text-stone-700 dark:text-stone-300 hover:text-black"
                }`}
              >
                اردو
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-stone-900 dark:text-stone-100">
          {/* Scholarly Curation & Research Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#10221b] border-2 border-[#245642]/30 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#edf3e7] dark:bg-[#132c21] border border-[#245642]/30 flex items-center justify-center text-[#245642] dark:text-emerald-300 shrink-0 mt-0.5">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#245642] dark:text-emerald-400">
                  {isUr ? "علمی سرپرستی و بنیاد" : "Project Initiator & Scholarly Direction"}
                </span>
                <h4 className={`text-base font-bold text-[#0A2118] dark:text-white ${isUr ? "font-nastaliq" : ""}`}>
                  {isUr ? "مولانا سیّد آئمن رضوی" : "Maulana Syed Imon Rizvi"}
                </h4>
                <p className={`text-xs text-stone-600 dark:text-stone-300 font-medium ${isUr ? "font-nastaliq leading-relaxed" : ""}`}>
                  {isUr
                    ? "فاضل حوزہ علمیہ قم — بانی و سرپرستِ تحقیق"
                    : "Graduate, Islamic Seminary of Qom (Ḥawzah ‘Ilmiyyah Qom) — Project Initiator & Research Director"}
                </p>
              </div>
            </div>
            <span className={`shrink-0 text-[11px] font-bold text-[#245642] dark:text-emerald-300 bg-[#edf3e7] dark:bg-[#132c21] border border-[#245642]/30 px-3 py-1.5 rounded-xl ${isUr ? "font-nastaliq" : ""}`}>
              {isUr ? "حوزوی و فقہی جانچ پڑتال کا تسلسل" : "Rigorous Seminarian Benchmark"}
            </span>
          </div>

          {/* 4 Core Pillars of Disclaimer */}
          <div className="space-y-4">
            {/* Point 1: Academic & Scholarly Scope */}
            <article className="p-5 rounded-xl border-2 border-emerald-600/30 bg-white dark:bg-[#10221b] space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <h4 className={`text-sm sm:text-base font-bold text-[#0A2118] dark:text-emerald-200 ${isUr ? "font-nastaliq" : "font-cinzel"}`}>
                  {isUr
                    ? "۱. تعلیمی و تحقیقی نوعیت"
                    : "1. Academic, Scholarly & Non-Binding Scope"}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 ${
                  isUr ? "font-nastaliq leading-[2.2] text-sm sm:text-base text-right" : ""
                }`}
                dir={isUr ? "rtl" : "ltr"}
              >
                {isUr
                  ? "وراثت (Wirasat — عدل و انصاف کی میراث) فقہِ جعفریہ کے دقیق و پیچیدہ احکامِ مواریث کو عام فہم اور تحقیقی انداز میں پیش کرنے کا ایک تعلیمی پلیٹ فارم ہے۔ اس ویب سائٹ پر پیش کیے گئے تمام حسابی تخمینے، شجرہ جات، فتاویٰ کے متوازی موازنے اور تفصیلی تجزیات محض علمی رہنمائی، خاندانی پیشگی آگاہی اور تدریسی مقاصد کے لیے تیار کیے گئے ہیں۔ یہ کسی بھی ملکی عدالت، شرعی دار القضاء یا عدالتی ادارے کے حتمی، قابلِ نفاذ فیصلے یا شرعی حکم کا متبادل ہرگز نہیں ہیں۔"
                  : "Wirasat (A Legacy of Fairness) is an educational, research-oriented jurisprudence platform engineered to elucidate the intricate, multi-layered statutory rules of Ja‘farī inheritance (Fiqh al-Mawārīth). The calculations, distributions, genealogical mind-maps, and comparative texts provided by this platform are intended solely for academic study, preliminary estate planning awareness, and scholarly edification. They do not constitute a legally binding judicial sentence (Ḥukm Shar‘ī), legal decree, or enforceable probate ruling under civil or religious jurisdictions."}
              </p>
            </article>

            {/* Point 2: AI Automation & Continuous Institutional Review */}
            <article className="p-5 rounded-xl border-2 border-blue-600/30 bg-white dark:bg-[#10221b] space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h4 className={`text-sm sm:text-base font-bold text-[#0A2118] dark:text-blue-200 ${isUr ? "font-nastaliq" : "font-cinzel"}`}>
                  {isUr
                    ? "۲. خودکار الگورتھم اور مسلسل ادارہ جاتی تحقیق"
                    : "2. Algorithmic Modeling & Continuous Institutional Review"}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 ${
                  isUr ? "font-nastaliq leading-[2.2] text-sm sm:text-base text-right" : ""
                }`}
                dir={isUr ? "rtl" : "ltr"}
              >
                {isUr
                  ? "یہ پلیٹ فارم پیچیدہ قرابت داری، نظامِ تنزیل، اور متعدد مراجعِ عظام کے اختلافی فتاویٰ کی تطبیق کے لیے جدید الگورتھمز اور ماڈلز کا استعمال کرتا ہے۔ اس پروجیکٹ کی ابتدا اور علمی کاوش مولانا سیّد آئمن رضوی (فاضل حوزہ علمیہ قم) کی جانب سے عمل میں لائی گئی ہے، اور حسابی و فقہی صحت کی حتمی توثیق کے لیے مختلف معتبر علمی اداروں، حوزاتِ علمیہ اور مراجعِ عظام و علمائے کرام کے دفاتر سے مسلسل رابطہ اور جائزہ لینے کا سلسلہ جاری ہے۔ اگرچہ یہ نظام حوزوی نگرانی میں ہے، لیکن کسی بھی خودکار الگورتھم میں نادستہ تیکنیکی یا متنی خامی کا احتمال ممکن ہے۔ اس ویب سائٹ کے نتائج کو قطعی یا وحی کی طرح ناقابلِ خطا نہ سمجھا جائے۔"
                  : "This platform combines algorithmic rules with modern reasoning models to interpret complex kinship networks, representational rules (Tanzīl), and cross-marja fatwa divergences. Conceived and initiated by Maulana Syed Imon Rizvi (Graduate of the Islamic Seminary of Qom), the initiative is actively engaged in ongoing liaison, consultation, and scholarly review with academic institutions, traditional seminaries (Ḥawzāt), and the representative offices (Dafātir) of esteemed scholars and Marāji‘ for continuous vetting and final verification. While supervised by qualified seminarians, automated computation remains subject to ongoing empirical verification, heuristic refinements, and software updates. Algorithmic outputs must never be treated as infallible religious revelation."}
              </p>
            </article>

            {/* Point 3: Absolute Limitation of Liability */}
            <article className="p-5 rounded-xl border-2 border-amber-600/30 bg-white dark:bg-[#10221b] space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <h4 className={`text-sm sm:text-base font-bold text-[#0A2118] dark:text-amber-200 ${isUr ? "font-nastaliq" : "font-cinzel"}`}>
                  {isUr
                    ? "۳. عدمِ قانونی ذمہ داری"
                    : "3. Absolute Limitation of Liability"}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 ${
                  isUr ? "font-nastaliq leading-[2.2] text-sm sm:text-base text-right" : ""
                }`}
                dir={isUr ? "rtl" : "ltr"}
              >
                {isUr
                  ? "مصنف و بانی (مولانا سیّد آئمن رضوی)، علمی مراجعین، یا تکنیکی ڈویلپرز اس سافٹ ویئر کے استعمال یا اس کے حسابی نتائج پر انحصار کے نتیجے میں پیدا ہونے والے کسی بھی مالیاتی، جائیدادی، قانونی، خاندانی یا سماجی تنازعے اور نقصان کے قانونی یا اخلاقی طور پر قطعی ذمہ دار نہیں ہوں گے۔ کسی بھی ترکے کی نقد تقسیم یا جائیداد کی باضابطہ قانونی منتقلی سے قبل تمام تر ذمہ داری صارف پر عائد ہوتی ہے۔"
                  : "Under no circumstances shall the author, initiator (Maulana Syed Imon Rizvi), contributors, academic reviewers, or developer teams be held liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of, reliance upon, or property transactions executed on the basis of calculations rendered by this software. Estate liquidations and asset distributions executed without independent, certified ecclesiastical verification are performed solely at the user's risk."}
              </p>
            </article>

            {/* Point 4: Mandatory Human-in-the-Loop & Verification by Wukala */}
            <article className="p-5 rounded-xl border-2 border-purple-600/30 bg-white dark:bg-[#10221b] space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <ShieldAlert className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h4 className={`text-sm sm:text-base font-bold text-[#0A2118] dark:text-purple-200 ${isUr ? "font-nastaliq" : "font-cinzel"}`}>
                  {isUr
                    ? "۴. مستند علماء و وکلاء سے حتمی شرعی تصدیق کی ضرورت"
                    : "4. Mandatory Verification by Authorized Representatives (Wukalā’)"}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 ${
                  isUr ? "font-nastaliq leading-[2.2] text-sm sm:text-base text-right" : ""
                }`}
                dir={isUr ? "rtl" : "ltr"}
              >
                {isUr
                  ? "حقیقی ترکے کی عملی تقسیم میں متعدد باریک زمینی اور شرعی حقائق شامل ہوتے ہیں—جیسے کفن و تدفین کے اصل اخراجات کا اخراج، دنیاوی و شرعی قرضوں کی ترجیحی ادائیگی، بیوہ کے غیر ادا شدہ مہر کا منہا ہونا، وصیت کے ایک تہائی (۳۳.۳٪) کی شرعی حد کی جانچ، اور غیر منقولہ جائیداد و عمارت کی نقد قیمت کا تعین۔ ان امور کا حتمی فیصلہ صرف اور صرف ایک عادل حاکمِ شرع یا مراجعِ عظام کے باضابطہ وکیل اور مستند علماء ہی فرما سکتے ہیں۔ تمام مومنین پر شرعاً لازم ہے کہ کسی بھی تقسیم سے قبل اپنا مکمل کیس مستند نمائندگان کے سامنے پیش کر کے تحریری تصدیق حاصل کریں۔"
                  : "Formal partition of an actual deceased's estate involves nuanced empirical verifications—including burial expenses deduction, third-party debt reconciliation, liquidation of the widow's unpaid Mahr as a primary creditor, testamentary bequest ceiling validation (1/3rd cap), and physical valuation of real estate—which can only be conducted by a just religious judge (Ḥākim Shar‘ī) or an authorized representative (Wakīl) of the grand Marāji‘. Users are religiously and legally mandated to submit their generated case dossier to authorized seminarian authorities before finalizing distribution."}
              </p>
            </article>
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="px-5 sm:px-8 py-4 border-t border-[#245642]/20 bg-stone-50/90 dark:bg-[#0d1d17]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs text-stone-600 dark:text-stone-300 font-medium text-center sm:text-left ${isUr ? "font-nastaliq" : ""}`}>
            {isUr
              ? "علمی کاوش و بنیاد: مولانا سیّد آئمن رضوی • فاضل حوزہ علمیہ قم"
              : "Initiated by Maulana Syed Imon Rizvi • Graduate, Islamic Seminary of Qom"}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#245642] hover:bg-[#1a4031] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${isUr ? "font-nastaliq" : ""}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUr ? "میں نے پڑھ کر تسلیم کیا" : "I Understand & Acknowledge"}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
