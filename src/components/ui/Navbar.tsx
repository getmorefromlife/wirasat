"use client";
import { useEffect } from "react";
import { Calculator, LayoutDashboard, Scroll, GitFork, BookOpen, FileText, Globe2, Sparkles, GraduationCap, RotateCcw } from "lucide-react";
import { useInheritanceStore, type ViewTab } from "@/store/useInheritanceStore";
import { WirasatLogo } from "@/components/ui/WirasatLogo";

export function Navbar() {
  const { language, activeView, setActiveView, setLanguage, fontScale, resetAll } = useInheritanceStore();
  useEffect(() => {
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-font-scale", fontScale);
  }, [language, fontScale]);
  const links = [
    ["wizard", Calculator, "Calculator", "حسابِ وراثت"],
    ["dashboard", LayoutDashboard, "Dashboard", "ڈیش بورڈ"],
    ["wasiyyah", Scroll, "Waṣiyyah (Will)", "وصیت"],
    ["tree", GitFork, "Family tree", "شجرۂ نسب"],
    ["visuals", FileText, "Visuals", "بصری اسٹوڈیو"],
    ["academy", GraduationCap, "Academy", "اکیڈمی"],
    ["glossary", BookOpen, "Glossary", "فرہنگ / لغت"],
  ] as const;
  return <header className="site-header">
    <div className="topline"><span>{language === "ur" ? "علمی کاوش: مولانا سیّد آئمن رضوی" : "A project by Maulana Syed Imon Rizvi"}</span><span className="font-naskh">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span><span><Sparkles size={12}/> {language === "ur" ? "عدل و انصاف کی میراث" : "A Legacy of Fairness"}</span></div>
    <div className="navigation"><button className="brand hover:opacity-95 transition-opacity" onClick={() => setActiveView("wizard")} aria-label="Wirasat home"><WirasatLogo variant="navbar" color="emerald" language={language} /></button>
    <nav aria-label="Main navigation">{links.map(([view, Icon, en, ur]) => <button key={view} onClick={() => setActiveView(view as ViewTab)} aria-current={activeView === view ? "page" : undefined} className={activeView === view ? "nav-item selected" : "nav-item"}><Icon size={16}/>{language === "ur" ? ur : en}</button>)}</nav>
    <div className="nav-actions">
      <button
        onClick={() => {
          resetAll();
          setActiveView("wizard");
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#b7c9a5] bg-[#edf3e7] hover:bg-rose-50 hover:border-rose-300 text-[#245642] hover:text-rose-700 transition-all shadow-2xs cursor-pointer"
        title={language === "ur" ? "تمام ڈیٹا صاف کریں اور نیا کیس شروع کریں" : "Reset all data and start a fresh case"}
      >
        <RotateCcw size={13} className="text-[#245642]" />
        <span>{language === "ur" ? "نیا کیس (ریسیٹ)" : "Reset"}</span>
      </button>
      <button className="language-button" onClick={() => setLanguage(language === "en" ? "ur" : "en")}><Globe2 size={16}/>{language === "en" ? "اردو" : "English"}</button>
    </div></div>
  </header>;
}
