"use client";
import { useEffect } from "react";
import { ArrowUpRight, Calculator, GitFork, BookOpen, Scale, FileText, Globe2, Sparkles, GraduationCap } from "lucide-react";
import { useInheritanceStore, type ViewTab } from "@/store/useInheritanceStore";
import { WirasatLogo } from "@/components/ui/WirasatLogo";

export function Navbar() {
  const { language, activeView, setActiveView, setLanguage, fontScale } = useInheritanceStore();
  useEffect(() => {
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-font-scale", fontScale);
  }, [language, fontScale]);
  const links = [
    ["wizard", Calculator, "Calculator", "حساب"],
    ["tree", GitFork, "Family tree", "شجرۂ نسب"],
    ["galaxy", Sparkles, "Kinship Galaxy", "فلکِ قرابت"],
    ["visuals", FileText, "Visuals", "بصری اسٹوڈیو"],
    ["glossary", BookOpen, "Glossary", "فرہنگ / لغت"],
    ["academy", GraduationCap, "Academy", "اکیڈمی"],
    ["matrix", Scale, "Compare", "تقابل"],
  ] as const;
  return <header className="site-header">
    <div className="topline"><span>{language === "ur" ? "علمی کاوش: مولانا سیّد آئمن رضوی" : "A project by Maulana Syed Imon Rizvi"}</span><span className="font-naskh">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span><span><Sparkles size={12}/> {language === "ur" ? "میراثِ اہلِ بیت (ع)" : "Rooted in Ja‘farī Jurisprudence"}</span></div>
    <div className="navigation"><button className="brand hover:opacity-95 transition-opacity" onClick={() => setActiveView("wizard")} aria-label="Wirasat home"><WirasatLogo variant="navbar" color="emerald" language={language} /></button>
    <nav aria-label="Main navigation">{links.map(([view, Icon, en, ur]) => <button key={view} onClick={() => setActiveView(view as ViewTab)} aria-current={activeView === view ? "page" : undefined} className={activeView === view ? "nav-item selected" : "nav-item"}><Icon size={16}/>{language === "ur" ? ur : en}</button>)}</nav>
    <div className="nav-actions"><button className="language-button" onClick={() => setLanguage(language === "en" ? "ur" : "en")}><Globe2 size={16}/>{language === "en" ? "اردو" : "English"}</button><a href="/designs" className="studio-link" aria-label="Open design studio"><ArrowUpRight size={19}/></a></div></div>
  </header>;
}
