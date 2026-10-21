"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home,
  Calculator,
  LayoutDashboard,
  Scroll,
  GitFork,
  BookOpen,
  PieChart,
  Globe2,
  Sparkles,
  GraduationCap,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useInheritanceStore, type ViewTab } from "@/store/useInheritanceStore";
import { WirasatLogo } from "@/components/ui/WirasatLogo";

interface HubItem {
  id: ViewTab;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  icon: typeof Calculator;
  badge?: string;
}

interface NavHub {
  id: string;
  titleEn: string;
  titleUr: string;
  icon: typeof Calculator;
  views: ViewTab[];
  items: HubItem[];
}

export function Navbar() {
  const { language, activeView, setActiveView, setLanguage, fontScale } = useInheritanceStore();
  const [openHubId, setOpenHubId] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const isUr = language === "ur";

  useEffect(() => {
    document.documentElement.dir = isUr ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-font-scale", fontScale);
  }, [language, fontScale, isUr]);

  // Click-outside and Escape key listener to close dropdowns smoothly
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenHubId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenHubId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const hubs: NavHub[] = [
    {
      id: "calc-hub",
      titleEn: "Calculate",
      titleUr: "حساب و تقسیم",
      icon: Calculator,
      views: ["wizard", "dashboard"],
      items: [
        {
          id: "wizard",
          titleEn: "Step-by-Step Calculator",
          titleUr: "مرحلہ وار حساب (وزرڈ)",
          descEn: "Comprehensive guided calculator with legal steps",
          descUr: "تمام اثاثوں اور ورثاء کی مرحلہ وار مکمل تقسیم",
          icon: Calculator,
        },
        {
          id: "dashboard",
          titleEn: "One-Page Live Dashboard",
          titleUr: "سریع ڈیش بورڈ (ایک صفحہ)",
          descEn: "Instant balance sheet & real-time shares",
          descUr: "ایک ہی سکرین پر فوری حساب اور براہِ راست تقسیم",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      id: "studios-hub",
      titleEn: "Visual Studios",
      titleUr: "اسٹوڈیو و شجرہ",
      icon: Compass,
      views: ["whiteboard", "tree", "visuals"],
      items: [
        {
          id: "whiteboard",
          titleEn: "Kinship Whiteboard Studio",
          titleUr: "کنبہ وائٹ بورڈ اسٹوڈیو",
          descEn: "Interactive canvas, sandbox & catastrophe simulations",
          descUr: "آزادانہ خاندانی کینوس، فرضی مشق اور حادثات کا مطالعہ",
          badge: "Full HD",
          icon: Compass,
        },
        {
          id: "tree",
          titleEn: "Family Lineage & Tanzil Tree",
          titleUr: "شجرۂ نسب و تنزیل",
          descEn: "Visual ancestral hierarchy & tanzil rules",
          descUr: "خاندانی شجرہ اور اولاد کی قائم مقامی کا اصول",
          icon: GitFork,
        },
        {
          id: "visuals",
          titleEn: "Estate Distribution Charts",
          titleUr: "بصری خاکے و شماریات",
          descEn: "Share wheel, flow diagrams & proportions",
          descUr: "دائرہ نما تقسیم، گراف اور تناسب کے مناظر",
          icon: PieChart,
        },
      ],
    },
    {
      id: "knowledge-hub",
      titleEn: "Knowledge & Academy",
      titleUr: "علم و فقہی رہنمائی",
      icon: GraduationCap,
      views: ["academy", "wasiyyah", "glossary"],
      items: [
        {
          id: "academy",
          titleEn: "Inheritance Academy",
          titleUr: "جامع فقہی اکیڈمی",
          descEn: "5 foundational pillars of Ja‘fari inheritance",
          descUr: "جعفری فقہ کے ۵ بنیادی ارکان، موانع اور مثالیں",
          icon: GraduationCap,
        },
        {
          id: "wasiyyah",
          titleEn: "Waṣiyyah (Will) Studio",
          titleUr: "احکامِ وصیت و ثلث",
          descEn: "1/3rd divine ceiling, bequest rules & guidance",
          descUr: "ایک تہائی (ثلث) کی قانونی حد اور وصیت کا شرعی طریقہ",
          icon: Scroll,
        },
        {
          id: "glossary",
          titleEn: "Fiqh Glossary & Lexicon",
          titleUr: "فرہنگ و شرعی لغت",
          descEn: "Dictionary: Kalalah, Radd, Tanzil, Habwah",
          descUr: "کلالہ، رد، تنزیل اور حبوہ کی تفصیلی شرعی لغت",
          icon: BookOpen,
        },
      ],
    },
  ];

  return (
    <header className="site-header">
      {/* Topline Banner */}
      <div className="topline">
        <span>
          {isUr ? "علمی کاوش: مولانا سیّد آئمن رضوی" : "A project by Maulana Syed Imon Rizvi"}
        </span>
        <span className="font-arabic font-bold text-amber-900 dark:text-amber-200">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
        <span>
          <Sparkles size={12} /> {isUr ? "عدل و انصاف کی میراث" : "A Legacy of Fairness"}
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="navigation" ref={navContainerRef}>
        {/* Brand Logo */}
        <button
          className="brand hover:opacity-95 transition-opacity cursor-pointer shrink-0"
          onClick={() => {
            setActiveView("home");
            setOpenHubId(null);
          }}
          aria-label="Wirasat home"
        >
          <WirasatLogo variant="navbar" color="emerald" language={language} />
        </button>

        {/* 3-Hub Navigation */}
        <nav aria-label="Main navigation" className="flex items-center gap-1.5 md:gap-2">
          {/* Home Direct Link */}
          <button
            onClick={() => {
              setActiveView("home");
              setOpenHubId(null);
            }}
            aria-current={activeView === "home" ? "page" : undefined}
            className={`nav-item flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeView === "home"
                ? "bg-[#e9eee2] text-[#245642] shadow-2xs"
                : "text-stone-700 hover:bg-[#edf1e8] hover:text-[#245642]"
            }`}
          >
            <Home size={16} />
            <span className={isUr ? "font-nastaliq leading-[2.2]" : ""}>
              {isUr ? "مرکزی صفحہ" : "Home"}
            </span>
          </button>

          {/* 3 Hub Dropdowns */}
          {hubs.map((hub) => {
            const isHubActive = hub.views.includes(activeView);
            const isOpen = openHubId === hub.id;
            const HubIcon = hub.icon;

            return (
              <div key={hub.id} className="relative">
                {/* Hub Trigger Button */}
                <button
                  type="button"
                  onClick={() => setOpenHubId(isOpen ? null : hub.id)}
                  aria-expanded={isOpen}
                  className={`nav-item flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer select-none ${
                    isHubActive
                      ? "bg-[#e9eee2] text-[#245642] shadow-2xs"
                      : isOpen
                      ? "bg-[#edf1e8] text-[#245642]"
                      : "text-stone-700 hover:bg-[#edf1e8] hover:text-[#245642]"
                  }`}
                >
                  <HubIcon size={16} className={isHubActive ? "text-[#245642]" : "text-stone-500"} />
                  <span className={isUr ? "font-nastaliq leading-[2.2]" : ""}>
                    {isUr ? hub.titleUr : hub.titleEn}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 text-stone-400 ${
                      isOpen ? "rotate-180 text-[#245642]" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {isOpen && (
                  <div
                    className={`absolute top-full mt-2 w-72 sm:w-84 p-2 rounded-2xl bg-white/98 dark:bg-[#0E1E18]/98 backdrop-blur-xl border border-stone-200/90 dark:border-stone-700/80 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1 ${
                      isUr ? "right-0 text-right" : "left-0 text-left"
                    }`}
                  >
                    {hub.items.map((item) => {
                      const isItemActive = activeView === item.id;
                      const ItemIcon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveView(item.id);
                            setOpenHubId(null);
                          }}
                          className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer group text-start ${
                            isItemActive
                              ? "bg-[#e9eee2] dark:bg-[#16382a] text-[#245642] dark:text-emerald-300"
                              : "hover:bg-[#f4f7f1] dark:hover:bg-[#1a382c] text-stone-800 dark:text-stone-200"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                              isItemActive
                                ? "bg-[#245642] text-white"
                                : "bg-stone-100 dark:bg-stone-800 text-[#245642] dark:text-emerald-400 group-hover:bg-[#245642] group-hover:text-white"
                            }`}
                          >
                            <ItemIcon size={16} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span
                                className={`text-xs md:text-sm font-bold block truncate ${
                                  isUr ? "font-nastaliq leading-[2.2]" : ""
                                } ${
                                  isItemActive
                                    ? "text-[#245642] dark:text-emerald-300"
                                    : "text-stone-900 dark:text-stone-100 group-hover:text-[#245642] dark:group-hover:text-emerald-300"
                                }`}
                              >
                                {isUr ? item.titleUr : item.titleEn}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-emerald-100 text-[#1b4d3e] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mt-0.5 line-clamp-1">
                              {isUr ? item.descUr : item.descEn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher */}
        <div className="nav-actions shrink-0">
          <button
            className="language-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 text-xs font-bold text-stone-800 dark:text-stone-100 transition-colors shadow-2xs cursor-pointer"
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
          >
            <Globe2 size={15} />
            <span>{language === "en" ? "اردو" : "English"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
