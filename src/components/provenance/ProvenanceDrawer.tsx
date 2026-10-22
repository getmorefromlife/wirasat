"use client";

import React, { useState } from "react";
import { X, BookOpen, Scroll, ChevronDown, ChevronUp, Scale, CheckCircle2, ShieldCheck, ExternalLink, Bookmark } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { PROVENANCE_TOPICS, QURANIC_AYAT, HADITH_PROOFS } from "@/lib/provenance-db";
import { GLOSSARY_ITEMS } from "@/lib/glossary-db";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { MarjaId } from "@/types/fiqh";
import { WirasatLogo } from "@/components/ui/WirasatLogo";

export function ProvenanceDrawer() {
  const {
    activeProvenanceKey,
    isProvenanceOpen,
    closeProvenance,
    language,
    deceased,
    setMarja,
    openGlossaryTerm,
  } = useInheritanceStore();

  const [expandedMarja, setExpandedMarja] = useState<MarjaId | null>(null);
  const [showAyah, setShowAyah] = useState(true);
  const [showHadith, setShowHadith] = useState(true);

  if (!isProvenanceOpen || !activeProvenanceKey) return null;

  const isUr = language === "ur";
  const activeMarjaId = (deceased.marja as MarjaId) || "sistani";
  const topic = PROVENANCE_TOPICS[activeProvenanceKey] || PROVENANCE_TOPICS["PROXIMITY_TIER1_VS_GRANDCHILDREN"];
  const activeRuling = topic.rulings[activeMarjaId] || topic.rulings["sistani"];
  const activeMarjaMeta = MARJA_DATABASE[activeMarjaId];

  const ayah = topic.primaryAyahId ? QURANIC_AYAT[topic.primaryAyahId] : null;
  const hadith = topic.primaryHadithId ? HADITH_PROOFS[topic.primaryHadithId] : null;

  const otherMarajiList: MarjaId[] = (["sistani", "khoei", "khamenei", "makarem", "najafi"] as MarjaId[]).filter(
    (m) => m !== activeMarjaId
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={closeProvenance}
    >
      {/* Slide-Over Drawer Container */}
      <div
        className="relative w-full max-w-2xl bg-[#fcfbf7] h-full shadow-2xl flex flex-col border-l border-[#d8e0d2] overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-theme-card-dark text-white flex items-center justify-between border-b border-theme-card-dark shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-xs">
              <WirasatLogo variant="icon" color="white" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-gold px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                  {isUr ? "شرعی سند و استدلال" : "Scholarly Provenance & Fatwa"}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-cinzel text-white mt-1 leading-snug">
                {isUr ? topic.titleUr : topic.titleEn}
              </h3>
            </div>
          </div>

          <button
            onClick={closeProvenance}
            className="w-9 h-9 rounded-full bg-[#172e22] hover:bg-[#1b3f30] text-stone-200 flex items-center justify-center transition-colors border border-[#3d6e57]"
            aria-label="Close scholarly citation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Legal Axiom Badge Banner */}
          <div className="p-4 rounded-2xl bg-[#edf3e7] border border-[#c3d5bb] flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <Bookmark className="w-5 h-5 text-[#245642] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#245642] tracking-wider block">
                  {isUr ? "بنیادی فقہی قاعدہ (الضابطہ الفقہیہ)" : "Governing Legal Maxim (Al-Qā‘idah al-Fiqhiyyah)"}
                </span>
                <p className="text-sm font-bold text-[#172e22] font-naskh">
                  {isUr ? topic.legalAxiomUr : topic.legalAxiomEn}
                </p>
                <p className="text-xs font-mono text-[#52735a]" dir="rtl">
                  {topic.legalAxiomAr}
                </p>
              </div>
            </div>
          </div>

          {/* Connected Glossary Lexicon Pills */}
          {(() => {
            const TOPIC_GLOSSARY_MAP: Record<string, string[]> = {
              PROXIMITY_TIER1_VS_GRANDCHILDREN: ["aqrab_yamna_abad", "tabaqat", "hujub_hirman", "tanzil"],
              WIDOW_LAND_RESTRICTION: ["aradi", "qimah", "furud", "tarkah"],
              BUTLAN_AL_AWL: ["butlan_awl", "furud", "radd"],
              BUTLAN_AL_TASIB: ["butlan_tasib", "radd", "tabaqat"],
              HABWAH_ELDEST_SON: ["habwah", "tarkah"],
              TANZIL_REPRESENTATION: ["tanzil", "aqrab_yamna_abad", "tabaqat"],
              SURPLUS_RETURN_RADD: ["radd", "butlan_tasib", "furud"],
              ESTATE_BEQUEST_WASIYYAH: ["wasiyyah", "hibat_al_hayat", "tarkah"],
              LIFETIME_GIFT_HIBAH: ["hibat_al_hayat", "qabd", "wasiyyah"],
              COLLATERAL_KALALAH: ["kalalah", "tabaqat", "furud"],
              DISQUALIFIERS_MAWANI: ["mawani_irth", "tabaqat", "hujub_hirman"],
            };

            const matchedTermIds = TOPIC_GLOSSARY_MAP[activeProvenanceKey] || ["tabaqat", "furud"];
            return (
              <div className="p-3.5 rounded-2xl bg-[#fafbf8] border border-[#d8e0d2] space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                  <span className="flex items-center gap-1.5 text-[#245642]">
                    <BookOpen className="w-3.5 h-3.5" />
                    {isUr ? "فرہنگ کی متعلقہ اصطلاحات (Glossary):" : "Connected Glossary Definitions:"}
                  </span>
                  <span className="text-[11px] font-normal text-stone-400">
                    {isUr ? "کلک کرنے پر فرہنگ کھل جائے گی" : "Click to view full definition"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {matchedTermIds.map((termId) => {
                    const termItem = GLOSSARY_ITEMS.find((g) => g.id === termId);
                    if (!termItem) return null;
                    return (
                      <button
                        key={termId}
                        onClick={() => {
                          closeProvenance();
                          openGlossaryTerm(termId);
                        }}
                        className="px-3 py-1 rounded-xl bg-white hover:bg-[#edf3e7] text-[#245642] border border-[#c3d5bb] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <span>{isUr ? termItem.termUrdu : termItem.termEnglish}</span>
                        <ExternalLink className="w-3 h-3 text-[#52735a]" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* ACTIVE MARJA' RULING CARD */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#245642] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5ebe0] pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#245642]" />
                <div>
                  <span className="text-xs font-extrabold uppercase text-[#245642] block">
                    {isUr ? "موجودہ منتخب مرجع کا فتویٰ" : "Ruling of Selected Marja‘"}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#172e22]">
                    {isUr ? activeMarjaMeta.nameUr : activeMarjaMeta.nameEn}
                  </h4>
                </div>
              </div>

              <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-[#edf3e7] text-[#245642] border border-[#a5b69d]">
                {activeRuling.bookEn} — Mas’alah {activeRuling.masalahNumber}
              </span>
            </div>

            {/* Verbatim Arabic Text */}
            <div className="p-4 rounded-xl bg-[#fafbf8] border border-[#d8e0d2] space-y-1.5" dir="rtl">
              <span className="text-[11px] font-bold text-[#52735a] block uppercase font-mono">
                النص الفقهي المعتمد ({activeRuling.bookAr} - المسألة {activeRuling.masalahNumber}):
              </span>
              <p className="font-naskh text-sm sm:text-base text-[#172e22] leading-relaxed">
                {activeRuling.arabicText}
              </p>
            </div>

            {/* Urdu Translation */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase text-[#245642] block">
                {isUr ? "مستند اردو تشریح و ترجمہ:" : "Urdu Scholarly Translation:"}
              </span>
              <p className="text-sm text-[#172e22] leading-relaxed font-nastaliq">
                {activeRuling.urduTranslation}
              </p>
            </div>

            {/* English Translation */}
            <div className="space-y-1 border-t border-[#edf3e7] pt-3">
              <span className="text-xs font-extrabold uppercase text-[#52735a] block">
                English Jurisprudential Exposition:
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {activeRuling.englishTranslation}
              </p>
            </div>
          </div>

          {/* SCRIPTURAL FOUNDATIONS SECTION */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#245642] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#245642]" />
              {isUr ? "قرآنی و روائی شواہد (الأدلة الشرعية)" : "Primary Scriptural Foundations"}
            </h4>

            {/* Qur'anic Ayah */}
            {ayah && (
              <div className="rounded-2xl border border-[#d8e0d2] bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setShowAyah(!showAyah)}
                  className="w-full p-4 flex items-center justify-between text-start bg-[#fafbf8] hover:bg-[#f4f7f0] transition-colors border-b border-[#e5ebe0]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#245642]" />
                    <span className="font-bold text-sm text-[#172e22]">
                      {ayah.surahNameEn} ({ayah.surahNumber}:{ayah.ayahNumber}) — {ayah.surahNameAr}
                    </span>
                  </div>
                  {showAyah ? <ChevronUp className="w-4 h-4 text-stone-600" /> : <ChevronDown className="w-4 h-4 text-stone-600" />}
                </button>

                {showAyah && (
                  <div className="p-4 sm:p-5 space-y-3.5">
                    <p className="font-naskh text-base sm:text-lg text-[#172e22] leading-relaxed text-end" dir="rtl">
                      {ayah.arabicText}
                    </p>
                    <p className="text-xs text-[#245642] font-mono leading-relaxed">
                      <strong>Transliteration:</strong> {ayah.transliteration}
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      <strong>English:</strong> {ayah.translationEn}
                    </p>
                    <p className="text-sm text-[#172e22] leading-relaxed font-nastaliq" dir="rtl">
                      <strong>ترجمہ:</strong> {ayah.translationUr}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Hadith Proof */}
            {hadith && (
              <div className="rounded-2xl border border-[#d8e0d2] bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setShowHadith(!showHadith)}
                  className="w-full p-4 flex items-center justify-between text-start bg-[#fafbf8] hover:bg-[#f4f7f0] transition-colors border-b border-[#e5ebe0]"
                >
                  <div className="flex items-center gap-2.5">
                    <Scroll className="w-4 h-4 text-[#245642]" />
                    <span className="font-bold text-sm text-[#172e22]">
                      {hadith.sourceBookEn} — Vol. {hadith.volume}, Hadith #{hadith.hadithNumber}
                    </span>
                  </div>
                  {showHadith ? <ChevronUp className="w-4 h-4 text-stone-600" /> : <ChevronDown className="w-4 h-4 text-stone-600" />}
                </button>

                {showHadith && (
                  <div className="p-4 sm:p-5 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-[#52735a] border-b border-[#edf3e7] pb-2">
                      <span className="font-bold">{hadith.infallibleSpeakerEn}</span>
                      <span className="font-naskh font-bold text-end" dir="rtl">{hadith.infallibleSpeakerAr}</span>
                    </div>
                    <p className="font-naskh text-sm sm:text-base text-[#172e22] leading-relaxed text-end" dir="rtl">
                      {hadith.arabicText}
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      <strong>English Translation:</strong> {hadith.translationEn}
                    </p>
                    <p className="text-sm text-[#172e22] leading-relaxed font-nastaliq" dir="rtl">
                      <strong>اردو ترجمہ:</strong> {hadith.translationUr}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* COMPARATIVE MARJA' ACCORDION (OTHER 4 MARĀJI') */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#245642] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#245642]" />
              {isUr ? "دیگر چار مراجع کا تقابلی فتویٰ" : "Comparative Rulings Across Other 4 Marāji‘"}
            </h4>

            {otherMarajiList.map((mId) => {
              const mMeta = MARJA_DATABASE[mId];
              const mRuling = topic.rulings[mId];
              const isExpanded = expandedMarja === mId;

              if (!mRuling) return null;

              return (
                <div key={mId} className="rounded-2xl border border-[#d8e0d2] bg-white overflow-hidden shadow-xs">
                  <div
                    onClick={() => setExpandedMarja(isExpanded ? null : mId)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setExpandedMarja(isExpanded ? null : mId);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="w-full p-4 flex items-center justify-between text-start hover:bg-[#fafbf8] transition-colors cursor-pointer select-none"
                  >
                    <div>
                      <span className="font-bold text-sm text-[#172e22] block">
                        {isUr ? mMeta.nameUr : mMeta.nameEn}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {mRuling.bookEn} — Mas’alah {mRuling.masalahNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMarja(mId);
                        }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#edf3e7] hover:bg-[#245642] text-[#245642] hover:text-white transition-colors border border-[#a5b69d] cursor-pointer"
                        title="Set this Marja' as active for calculation"
                      >
                        {isUr ? "اس مرجع کا انتخاب کریں" : "Set Active"}
                      </button>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-[#e5ebe0] bg-[#fafbf8] space-y-3">
                      <div className="p-3 rounded-xl bg-white border border-[#d8e0d2]" dir="rtl">
                        <p className="font-naskh text-sm text-[#172e22] leading-relaxed">
                          {mRuling.arabicText}
                        </p>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        <strong>English:</strong> {mRuling.englishTranslation}
                      </p>
                      <p className="text-sm text-[#172e22] leading-relaxed font-nastaliq" dir="rtl">
                        <strong>اردو:</strong> {mRuling.urduTranslation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-white border-t border-[#d8e0d2] flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#245642]" />
            {isUr ? "تحقیق و تصدیق شدہ فتاویٰ جامعہ نجف و قم" : "Verified against authentic Najaf & Qom treatises"}
          </span>
          <button
            onClick={closeProvenance}
            className="px-4 py-2 rounded-xl bg-[#245642] hover:bg-[#172e22] text-white text-xs font-bold transition-colors"
          >
            {isUr ? "بند کریں" : "Close Citation"}
          </button>
        </div>
      </div>
    </div>
  );
}
