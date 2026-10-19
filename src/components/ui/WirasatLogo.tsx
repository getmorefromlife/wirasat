"use client";

import React from "react";
import Image from "next/image";

export type LogoVariant = "navbar" | "icon" | "full" | "seal";
export type LogoColor = "default" | "emerald" | "gold" | "white";

interface WirasatLogoProps {
  variant?: LogoVariant;
  color?: LogoColor;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showCaption?: boolean;
  language?: "en" | "ur";
}

export const WirasatLogo: React.FC<WirasatLogoProps> = ({
  variant = "navbar",
  color = "emerald",
  size = "md",
  className = "",
  showCaption = true,
  language = "en",
}) => {
  // Select corresponding PNG asset based on color
  const getImageSrc = () => {
    switch (color) {
      case "emerald":
        return "/images/wirasat-logo-emerald.png";
      case "gold":
        return "/images/wirasat-logo-gold.png";
      case "white":
        return "/images/wirasat-logo-white.png";
      case "default":
      default:
        return "/images/wirasat-logo.png";
    }
  };

  const getDimension = () => {
    switch (size) {
      case "sm":
        return { width: 32, height: 32, textScale: "text-base", subScale: "text-[8px]" };
      case "lg":
        return { width: 64, height: 64, textScale: "text-2xl", subScale: "text-xs" };
      case "xl":
        return { width: 96, height: 96, textScale: "text-3xl", subScale: "text-sm" };
      case "md":
      default:
        return { width: 44, height: 44, textScale: "text-lg sm:text-xl", subScale: "text-[9px]" };
    }
  };

  const dims = getDimension();
  const src = getImageSrc();

  // 1. Icon Only
  if (variant === "icon") {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 ${className}`}
        style={{ width: dims.width, height: dims.height }}
      >
        <Image
          src={src}
          alt="Shia Wirasat Logo"
          width={dims.width}
          height={dims.height}
          className="w-full h-full object-contain drop-shadow-xs"
          priority
        />
      </div>
    );
  }

  // 2. Full Framed Seal (Centered Emblem + Text Below)
  if (variant === "full" || variant === "seal") {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <div
          className="relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-105"
          style={{ width: dims.width, height: dims.height }}
        >
          <Image
            src={src}
            alt="Shia Wirasat Seal"
            width={dims.width}
            height={dims.height}
            className="w-full h-full object-contain drop-shadow-sm"
            priority
          />
        </div>
        {showCaption && (
          <div className="flex flex-col items-center">
            <span
              className={`font-serif font-bold tracking-tight text-[#172e22] dark:text-emerald-100 ${dims.textScale}`}
            >
              {language === "ur" ? "شِیعَہ وِرَاثَت" : "SHIA WIRASAT"}
            </span>
            <span
              className={`font-jakarta uppercase font-semibold tracking-widest text-[#52735a] dark:text-emerald-400/80 mt-0.5 ${dims.subScale}`}
            >
              {language === "ur" ? "میراثِ اہلِ بیت (ع) — شرعی ضابطۂ تقسیم" : "Ja'fari Inheritance & Estate Engine"}
            </span>
          </div>
        )}
      </div>
    );
  }

  // 3. Navbar Variant (Emblem on left + Brand typography on right)
  return (
    <div className={`flex items-center gap-3 text-left rtl:text-right ${className}`}>
      <div
        className="relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: dims.width, height: dims.height }}
      >
        <Image
          src={src}
          alt="Shia Wirasat Emblem"
          width={dims.width}
          height={dims.height}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-extrabold text-[22px] sm:text-[25px] tracking-tight text-[#173e30] dark:text-emerald-100">
            Wirasat
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-[#e8efe5] text-[#28543e] border border-[#cbd8c5]">
            SHIA
          </span>
        </div>
        {showCaption && (
          <span className="text-[8px] sm:text-[8.5px] font-jakarta font-semibold tracking-[0.16em] uppercase text-[#627066] mt-1">
            {language === "ur" ? "میراثِ اہلِ بیت (ع)" : "A LEGACY OF FAIRNESS"}
          </span>
        )}
      </div>
    </div>
  );
};
