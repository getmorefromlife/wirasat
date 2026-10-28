"use client";

import React, { useEffect } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Scale,
  ArrowRight,
  Landmark,
  Users,
} from "lucide-react";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

interface SampleScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePresetId: string | null;
  onSelectPreset: (id: string) => void;
  language: "en" | "ur";
}

export const SampleScenariosModal: React.FC<SampleScenariosModalProps> = ({
  isOpen,
  onClose,
  activePresetId,
  onSelectPreset,
  language,
}) => {
  const isUr = language === "ur";

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-4xl bg-[#fcfdfa] text-stone-900 rounded-3xl shadow-2xl border-2 border-[#b8cbb0] overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 animate-in zoom-in-95 duration-200 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1b3d2f] via-[#245642] to-[#16382b] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isUr ? "حقیقی فقہی مثالیں" : "Real-World Shia Inheritance Cases"}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-0.5 leading-snug">
                {isUr ? "۸ مستند خاندانی نمونے براؤز کریں" : "Browse 8 Family Archetypes"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle Bar */}
        <div className="px-6 py-3 bg-[#f5f8f3] border-b border-stone-200 text-xs sm:text-sm text-stone-700 flex items-center justify-between">
          <span>
            {isUr
              ? "کسی بھی کیس پر کلک کر کے فوری طور پر مکمل حساب، جائیداد اور ورثاء کو لوڈ کریں:"
              : "Click any scenario to instantly load its complete estate, debts, and family structure:"}
          </span>
          <span className="text-[11px] font-bold text-[#245642]">
            {isUr ? "۸ مستند خاندانی خاکے" : "8 Demographic Archetypes"}
          </span>
        </div>

        {/* Scrollable Scenario Cards */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIO_PRESETS.map((p, idx) => {
              const isSelected = activePresetId === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isSelected
                      ? "bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-400/30"
                      : "bg-white border-stone-200 hover:border-[#245642] shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Top Case Badge & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#245642] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#52735a]">
                          {isUr ? `کیس نمبر ${idx + 1}` : `Scenario #${idx + 1}`}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isUr ? "فعال کیس" : "Currently Loaded"}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-[#172e22] leading-snug">
                      {isUr ? p.titleUr : p.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {isUr ? p.descriptionUr : p.descriptionEn}
                    </p>
                  </div>

                  {/* Highlights Pill */}
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#245642] text-[11px] uppercase tracking-wider">
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isUr ? "اہم فقہی نکتہ:" : "Key Fiqh Dilemma:"}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] text-stone-600">
                      {isUr ? p.keyDilemmaUr : p.keyDilemmaEn}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPreset(p.id);
                      onClose();
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                        : "bg-[#245642] text-white hover:bg-[#1a4030] shadow-sm"
                    }`}
                  >
                    <span>{isSelected ? (isUr ? "دوبارہ لوڈ کریں" : "Reload This Case") : (isUr ? "یہ کیس لوڈ کریں" : "Load This Case Study")}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500">
            {isUr
              ? "کیس لوڈ کرنے کے بعد تمام مراحل میں خودکار طریقے سے تفصیلات درج ہو جائیں گی"
              : "Loading a case populates all 5 steps with realistic data"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isUr ? "بند کریں" : "Cancel / Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
