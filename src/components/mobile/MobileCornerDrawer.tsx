"use client";

import React from "react";
import { useInheritanceStore, type ViewTab } from "@/store/useInheritanceStore";
import {
  X,
  GraduationCap,
  Scroll,
  GitFork,
  BookOpen,
  Scale,
  RotateCcw,
  Monitor,
  ShieldCheck,
  ChevronRight,
  Globe2,
  Palette,
} from "lucide-react";
import { type Theme } from "@/types/fiqh";

interface MobileCornerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToDesktopMode?: () => void;
}

export const MobileCornerDrawer: React.FC<MobileCornerDrawerProps> = ({
  isOpen,
  onClose,
  onSwitchToDesktopMode,
}) => {
  const {
    language,
    setLanguage,
    setActiveView,
    resetAll,
    openWasiyyahGuide,
    theme,
    setTheme,
  } = useInheritanceStore();

  const isUr = language === "ur";

  if (!isOpen) return null;

  const navigateTo = (view: ViewTab) => {
    setActiveView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Drawer Content */}
      <div
        className={`w-[88vw] max-w-md h-full bg-[#fbfdfa] text-stone-900 flex flex-col justify-between shadow-2xl border-s-2 border-[#b4caa9] overflow-y-auto animate-in slide-in-from-right duration-300 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center font-black text-lg shadow-xs font-sans">
              و
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-[#122e23] leading-tight">
                {isUr ? "علمی و فقہی مینو" : "Scholarly Hub"}
              </h3>
              <p className="text-xs font-bold text-stone-600 font-sans mt-0.5">
                {isUr ? "وراثت اسلامی رہنمائی" : "Islamic Inheritance Tools"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition-colors cursor-pointer border border-stone-300"
            aria-label="Close menu"
          >
            <X size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Links list */}
        <div className={`flex-1 p-4 sm:p-5 space-y-3 ${isUr ? "font-nastaliq" : "font-sans"}`}>
          {/* Language Toggle Pill */}
          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#edf3e7] border-2 border-[#b4caa9] text-[#1b4332] font-black text-sm sm:text-base hover:bg-[#e1ebd9] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 font-sans">
              <Globe2 size={22} className="text-[#1b4332] stroke-[2.5]" />
              <span>{isUr ? "Switch to English" : "اردو زبان منتخب کریں"}</span>
            </div>
            <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white text-[#1b4332] font-black font-sans shadow-xs border border-[#b4caa9]">
              {language === "ur" ? "اردو" : "EN"}
            </span>
          </button>

          {/* Theme Selector Strip */}
          <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
              <Palette size={16} className="text-[var(--theme-gold)]" />
              <span>{isUr ? "رنگین تھیم منتخب کریں:" : "Color Theme:"}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-sans">
              {[
                { id: "emerald" as Theme, nameEn: "Emerald", nameUr: "زمرد و طلا", dot: "#1b4332" },
                { id: "lapis" as Theme, nameEn: "Samarkand", nameUr: "لاجوردی", dot: "#1d4ed8" },
                { id: "andalusia" as Theme, nameEn: "Andalusia", nameUr: "اندلسی", dot: "#9a3412" },
                { id: "midnight" as Theme, nameEn: "Midnight", nameUr: "شبِ نیلگوں", dot: "#0f1724" },
              ].map((t) => {
                const isCurrent = (theme || "emerald") === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isCurrent
                        ? "bg-[#edf3e7] border-[var(--theme-gold)] text-[var(--theme-gold)] shadow-xs"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: t.dot }}
                    />
                    <span className="truncate">{isUr ? t.nameUr : t.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`pt-2 pb-1 text-xs sm:text-sm font-black uppercase tracking-wider text-stone-700 px-2 ${
            isUr ? "font-nastaliq text-base leading-[2]" : "font-sans"
          }`}>
            {isUr ? "علمی و تربیتی سیکشن" : "Learning & Exploration"}
          </div>

          {/* Academy */}
          <button
            onClick={() => navigateTo("academy")}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#1b4332] hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200">
                <GraduationCap size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-stone-950 group-hover:text-[#1b4332]">
                  {isUr ? "وراثت اکیڈمی" : "Inheritance Academy"}
                </div>
                <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr ? "مکمل فقہی کورس اور اسباق" : "Complete fiqh curriculum & course"}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
          </button>

          {/* Wasiyyah Guide */}
          <button
            onClick={() => {
              onClose();
              openWasiyyahGuide();
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#1b4332] hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-200">
                <Scroll size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-stone-950 group-hover:text-[#1b4332]">
                  {isUr ? "وصیت (Will) لکھنے کی گائیڈ" : "Wasiyyah Writing Guide"}
                </div>
                <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr ? "شرعی و قانونی رہنما اصول" : "Sharia rules on 1/3 testament"}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
          </button>

          {/* Family Tree */}
          <button
            onClick={() => navigateTo("tree")}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#1b4332] hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-900 flex items-center justify-center shrink-0 border border-sky-200">
                <GitFork size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-stone-950 group-hover:text-[#1b4332]">
                  {isUr ? "شجرۂ نسب (Family Tree)" : "Family Tree Visualizer"}
                </div>
                <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr ? "خاندانی طبقات کی بصری تصویر" : "Kinship tiers and tree"}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
          </button>

          {/* Glossary */}
          <button
            onClick={() => navigateTo("glossary")}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#1b4332] hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0 border border-purple-200">
                <BookOpen size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-stone-950 group-hover:text-[#1b4332]">
                  {isUr ? "فقہی فرہنگ و لغت" : "Jurisprudential Lexicon"}
                </div>
                <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr ? "حجب، تعصیب، عول کی اصطلاحات" : "Glossary of classical terms"}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
          </button>

          {/* Comparative Matrix */}
          <button
            onClick={() => navigateTo("matrix")}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#1b4332] hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center shrink-0 border border-rose-200">
                <Scale size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-stone-950 group-hover:text-[#1b4332]">
                  {isUr ? "مراجع کا تقابلی میٹرکس" : "Marja‘ Comparison Matrix"}
                </div>
                <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                  isUr ? "font-nastaliq leading-[2]" : "font-sans"
                }`}>
                  {isUr ? "سیستانی، خامنہ ای، خوئی فتاویٰ" : "Side-by-side scholarly differences"}
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
          </button>

          {/* Desktop Mode Switch */}
          {onSwitchToDesktopMode && (
            <button
              onClick={() => {
                onClose();
                onSwitchToDesktopMode();
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-100 border-2 border-stone-300 hover:bg-stone-200 transition-all text-left rtl:text-right shadow-xs cursor-pointer group mt-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-stone-900 text-white flex items-center justify-center shrink-0">
                  <Monitor size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-black text-base sm:text-lg text-stone-950">
                    {isUr ? "مکمل ڈیسک ٹاپ موڈ" : "Full Desktop Mode"}
                  </div>
                  <div className={`text-xs sm:text-sm text-stone-600 font-medium ${
                    isUr ? "font-nastaliq leading-[2]" : "font-sans"
                  }`}>
                    {isUr ? "کلاسک 5 مرحلہ وار ویو دیکھیں" : "Switch to multi-step wizard"}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-stone-400 rtl:rotate-180 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`p-5 border-t-2 border-stone-200 bg-white space-y-3 ${isUr ? "font-nastaliq" : "font-sans"}`}>
          <button
            onClick={() => {
              resetAll();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 font-black text-sm transition-colors cursor-pointer"
          >
            <RotateCcw size={16} className="stroke-[2.5]" />
            <span>{isUr ? "تمام ڈیٹا صاف کریں (ریسیٹ)" : "Reset Calculator Data"}</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-stone-600 text-center">
            <ShieldCheck size={16} className="text-[#1b4332] stroke-[2.5]" />
            <span>
              {isUr
                ? "مولانا سیّد آئمن رضوی کی علمی کاوش"
                : "Curated by Maulana Syed Imon Rizvi"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
