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
} from "lucide-react";

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
  } = useInheritanceStore();

  const isUr = language === "ur";

  if (!isOpen) return null;

  const navigateTo = (view: ViewTab) => {
    setActiveView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Drawer Content */}
      <div
        className={`w-[85vw] max-w-sm h-full bg-[#fbfdfa] text-stone-800 flex flex-col justify-between shadow-2xl border-s border-[#c9d8be] overflow-y-auto animate-in slide-in-from-right duration-300 ${
          isUr ? "font-nastaliq" : "font-sans"
        }`}
        dir={isUr ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#245642] text-white flex items-center justify-center font-bold text-sm shadow-xs font-sans">
              و
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1b4332] leading-tight">
                {isUr ? "علمی و فقہی مینو" : "Scholarly Hub"}
              </h3>
              <p className="text-[11px] text-stone-500 font-sans">
                {isUr ? "وراثت اسلامی رہنمائی" : "Islamic Inheritance Tools"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links list */}
        <div className="flex-1 p-4 space-y-2">
          {/* Language Toggle Pill */}
          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#edf3e7] border border-[#cbd8c5] text-[#245642] font-bold text-sm hover:bg-[#e4ede0] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 font-sans">
              <Globe2 size={18} className="text-[#245642]" />
              <span>{isUr ? "Switch to English" : "اردو زبان منتخب کریں"}</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white text-[#245642] font-semibold font-sans">
              {language === "ur" ? "اردو" : "EN"}
            </span>
          </button>

          <div className="pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2 font-sans">
            {isUr ? "علمی و تربیتی سیکشن" : "Learning & Exploration"}
          </div>

          {/* Academy */}
          <button
            onClick={() => navigateTo("academy")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#245642]/40 hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900 group-hover:text-[#245642]">
                  {isUr ? "وراثت اکیڈمی" : "Inheritance Academy"}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {isUr ? "مکمل فقہی کورس اور اسباق" : "Complete fiqh curriculum & course"}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
          </button>

          {/* Wasiyyah Guide */}
          <button
            onClick={() => {
              onClose();
              openWasiyyahGuide();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#245642]/40 hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                <Scroll size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900 group-hover:text-[#245642]">
                  {isUr ? "وصیت (Will) لکھنے کی گائیڈ" : "Wasiyyah Writing Guide"}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {isUr ? "شرعی و قانونی رہنما اصول" : "Sharia rules on 1/3 testament"}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
          </button>

          {/* Family Tree */}
          <button
            onClick={() => navigateTo("tree")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#245642]/40 hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center shrink-0">
                <GitFork size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900 group-hover:text-[#245642]">
                  {isUr ? "شجرۂ نسب (Family Tree)" : "Family Tree Visualizer"}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {isUr ? "خاندانی طبقات کی بصری تصویر" : "Kinship tiers and tree"}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
          </button>

          {/* Glossary */}
          <button
            onClick={() => navigateTo("glossary")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#245642]/40 hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900 group-hover:text-[#245642]">
                  {isUr ? "فقہی فرہنگ و لغت" : "Jurisprudential Lexicon"}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {isUr ? "حجب، تعصیب، عول کی اصطلاحات" : "Glossary of classical terms"}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
          </button>

          {/* Comparative Matrix */}
          <button
            onClick={() => navigateTo("matrix")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#245642]/40 hover:bg-[#edf3e7]/50 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center shrink-0">
                <Scale size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900 group-hover:text-[#245642]">
                  {isUr ? "مراجع کا تقابلی میٹرکس" : "Marja‘ Comparison Matrix"}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {isUr ? "سیستانی، خامنہ ای، خوئی فتاویٰ" : "Side-by-side scholarly differences"}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
          </button>

          {/* Desktop Mode Switch */}
          {onSwitchToDesktopMode && (
            <button
              onClick={() => {
                onClose();
                onSwitchToDesktopMode();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-100 border border-stone-300 hover:bg-stone-200 transition-all text-left rtl:text-right shadow-2xs cursor-pointer group mt-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-800 text-white flex items-center justify-center shrink-0">
                  <Monitor size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900">
                    {isUr ? "مکمل ڈیسک ٹاپ موڈ" : "Full Desktop Mode"}
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans">
                    {isUr ? "کلاسک 5 مرحلہ وار ویو دیکھیں" : "Switch to multi-step wizard"}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-stone-400 rtl:rotate-180" />
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-white space-y-3 font-sans">
          <button
            onClick={() => {
              resetAll();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>{isUr ? "تمام ڈیٹا صاف کریں (ریسیٹ)" : "Reset Calculator Data"}</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
            <ShieldCheck size={14} className="text-[#245642]" />
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
