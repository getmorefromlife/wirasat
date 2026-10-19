"use client";

import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";

export interface WasiyyahLinkProps {
  children?: React.ReactNode;
  section?: string; // e.g. 'thuluth', 'heir_bequest', 'invalid_signs', 'five_rulings', 'priority_hierarchy'
  showBadge?: boolean;
  className?: string;
  icon?: "book" | "sparkles" | "none";
}

export const WasiyyahLink: React.FC<WasiyyahLinkProps> = ({
  children,
  section = "thuluth",
  showBadge = false,
  className = "",
  icon = "book",
}) => {
  const { language, openWasiyyahGuide } = useInheritanceStore();
  const isUr = language === "ur";

  const defaultText = isUr ? "شرعی وصیت" : "Testamentary Will (Waṣiyyah)";

  const tooltipText = isUr
    ? "شرعی احکامِ وصیت، ثلث اور باطل وصیت کی نشانیاں ملاحظہ کرنے کے لیے کلک کریں"
    : "Click to explore Ja‘farī Sharia rules, 1/3rd ceiling, and void will indicators";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openWasiyyahGuide(section);
      }}
      title={tooltipText}
      aria-label={tooltipText}
      className={`inline-flex items-center gap-1 font-semibold text-[#245642] hover:text-[#b45309] decoration-dotted underline decoration-[#b45309]/60 hover:decoration-[#b45309] underline-offset-4 transition-all duration-200 cursor-pointer group rounded-sm focus:outline-none focus:ring-2 focus:ring-[#245642]/30 px-0.5 ${className}`}
    >
      {icon === "book" && (
        <BookOpen className="w-3.5 h-3.5 text-[#245642] group-hover:text-[#b45309] transition-colors shrink-0 inline-block mb-0.5" />
      )}
      {icon === "sparkles" && (
        <Sparkles className="w-3.5 h-3.5 text-[#b45309] group-hover:rotate-12 transition-transform shrink-0 inline-block mb-0.5" />
      )}
      <span>{children || defaultText}</span>

      {showBadge && (
        <span className="ms-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#edf3e7] text-[#245642] border border-[#c4d4be] group-hover:bg-amber-100 group-hover:text-[#b45309] group-hover:border-amber-300 transition-colors">
          {isUr ? "فقہی گائیڈ" : "Fiqh Guide"}
        </span>
      )}
    </button>
  );
};
