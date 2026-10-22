"use client";
import { ArrowRight, ArrowUpRight, ShieldCheck, LockKeyhole, Scale, GitFork, BookOpen, Check, Leaf } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
export function HeroSection() {
 const { language, setActiveView, setWizardStep } = useInheritanceStore();
 const ur = language === "ur";
 return <div className="home-intro">
 <section className="legacy-hero">
  <div className="hero-copy">
   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-chip border border-theme-chip mb-4 shadow-xs">
     <WirasatLogo variant="icon" color="emerald" size="sm" />
     <span className={`text-[11px] font-bold tracking-wider text-theme-brand uppercase ${ur ? "font-nastaliq text-xs tracking-normal" : "font-jakarta"}`}>
       {ur ? "وِرَاثَت — عدل و انصاف کی میراث" : "WIRASAT — A LEGACY OF FAIRNESS"}
     </span>
   </div>
   <div className="eyebrow"><span/> {ur ? "ہدایتِ شرعی • وضوح اور شفافیت" : "GUIDED BY FAITH. DESIGNED FOR CLARITY."}</div>
   <h1>
    {ur ? (
      <>
        <span className="font-nastaliq leading-[2.3]">منصفانہ تقسیم،</span>
        <br />
        <span className="hero-subline font-nastaliq leading-[2.3]">ایک پائیدار میراث۔</span>
      </>
    ) : (
      <>
        Honor a lifetime.
        <br />
        <em>Leave a fair legacy.</em>
      </>
    )}
  </h1>
  <p className={ur ? "font-nastaliq leading-[2.2]" : ""}>{ur ? "فقہ جعفریہ کی روشنی میں ترکے کی تقسیم کو سمجھیں۔ اپنے خاندان کے لیے وضاحت اور اطمینان حاصل کریں۔" : "Navigate inheritance with confidence and care. A thoughtful way to understand each rightful share, guided by Ja’fari jurisprudence."}</p>
  <div className="hero-actions">
    <button
      className="primary-button cursor-pointer"
      onClick={() => {
        setWizardStep(1);
        setActiveView("wizard");
      }}
    >
      {ur ? "حساب شروع کریں" : "Begin your calculation"}
      <ArrowRight size={17}/>
    </button>
    <button className="text-button cursor-pointer" onClick={() => setActiveView("academy")}>
      {ur ? "مزید جانیں" : "Explore the principles"}
      <ArrowUpRight size={16}/>
    </button>
  </div>
  <div className="hero-assurances"><span><LockKeyhole size={14}/>{ur ? "مکمل رازداری" : "Private by design"}</span><span><Check size={15}/>{ur ? "بغیر رجسٹریشن" : "No sign-up needed"}</span><span><GlobeIcon/>{ur ? "اردو اور انگریزی" : "English & Urdu"}</span></div>
  </div>
  <div className="hero-art" aria-label="Decorative tree representing a lasting family legacy"><div className="arch arch-outer"/><div className="arch arch-inner"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="tree-illustration"><svg viewBox="0 0 400 390" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="legacy-leaf" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#52b889"/><stop offset="1" stopColor="#087653"/></linearGradient>
      <linearGradient id="legacy-trunk" x1="200" y1="100" x2="200" y2="345" gradientUnits="userSpaceOnUse"><stop stopColor="#6c9368"/><stop offset="1" stopColor="#796343"/></linearGradient>
    </defs>
    <ellipse cx="200" cy="345" rx="87" ry="9" fill="#176447" fillOpacity=".09"/>
    <path d="M200 340C195 285 206 205 200 108M201 287C171 262 126 221 110 180M200 253C235 227 267 190 283 145M200 212C174 185 150 158 148 129M201 312C243 287 286 250 305 214M200 178C221 156 234 132 238 109" stroke="url(#legacy-trunk)" strokeWidth="7" strokeLinecap="round"/>
    {[[200,82,-25],[151,119,-65],[248,109,25],[111,164,-65],[174,177,-35],[285,146,35],[263,210,45],[131,229,-65],[309,207,45],[211,142,10],[169,251,-50],[251,270,55]].map(([x,y,angle],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}><path d="M0 24C-41 3-39-32 0-45C38-24 35 8 0 24Z" fill={i%3===0?"#b1d7a6":i%3===1?"url(#legacy-leaf)":"#168467"}/><path d="M0 18V-31M0-6L-13-18M0 4L13-10" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" strokeLinecap="round"/></g>)}
    <path d="M171 341H229" stroke="#796343" strokeWidth="3" strokeLinecap="round"/>
  </svg></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span><div className="art-caption">{ur ? "ایمان کی بنیاد • خاندان کا تسلسل" : "Rooted in faith. Connected by family."}</div><div className="floating-note"><span className="note-icon"><Scale size={19}/></span><span>{ur ? "ہر حق کا ایک مقصد ہے" : "Every share has a purpose."}<small>{ur ? "ہر خاندان کو شفافیت کی ضرورت ہے" : "Every family deserves clarity."}</small></span></div></div>
  </section>
 <div className="trust-strip">
   <div>
     <ShieldCheck size={21}/>
     <span>
       {ur ? "مستند شرعی بنیاد" : "Faithfully grounded"}
       <small>{ur ? "جعفری فقہی اصول و قواعد" : "Ja’fari inheritance principles"}</small>
     </span>
   </div>
   <div>
     <Scale size={21}/>
     <span>
       {ur ? "فقہی تنوع و تحقیق" : "Multiple perspectives"}
       <small>{ur ? "معاصر مراجعِ عظام کے فتاویٰ" : "Five contemporary marāji‘"}</small>
     </span>
   </div>
   <div>
     <GitFork size={21}/>
     <span>
       {ur ? "خاندانی شجرہ کی نمائش" : "Your family, visualized"}
       <small>{ur ? "درجات اور رشتوں کی تفہیم" : "Understand the connections"}</small>
     </span>
   </div>
   <div>
     <LockKeyhole size={21}/>
     <span>
       {ur ? "مکمل پرائیویسی" : "Personal stays personal"}
       <small>{ur ? "ڈیٹا آپ کے براؤزر میں محفوظ" : "Saved locally in your browser"}</small>
     </span>
   </div>
 </div>
 <section className="workspace-heading" id="calculator"><div><div className="eyebrow">{ur ? "شفافیت کی راہ" : "YOUR PATH TO CLARITY"}</div><h2>{ur ? "آئیے، ایک قدم سے شروع کریں۔" : "A considered process. A clear outcome."}</h2></div><span><span className="status-dot"/> {ur ? "آپ کا ڈیٹا اس ڈیوائس پر محفوظ ہے" : "Your progress is saved on this device"}</span></section>
 <div className="resource-grid">
   <button onClick={() => setActiveView("tree")}>
     <span className="resource-icon"><GitFork size={20}/></span>
     <span>
       {ur ? "شجرۂ نسب دیکھیں" : "See the bigger picture"}
       <small>{ur ? "انٹرایکٹو فیملی ٹری کا معائنہ" : "Explore your interactive family tree"}</small>
     </span>
     <ArrowUpRight size={18}/>
   </button>
   <button onClick={() => setActiveView("academy")}>
     <span className="resource-icon"><BookOpen size={20}/></span>
     <span>
       {ur ? "علم و آگہی میں اضافہ" : "Knowledge brings confidence"}
       <small>{ur ? "وراثت کے بنیادی 8 ارکان سیکھیں" : "Learn the foundations of inheritance"}</small>
     </span>
     <ArrowUpRight size={18}/>
   </button>
   <button onClick={() => setActiveView("glossary")}>
     <span className="resource-icon"><Leaf size={20}/></span>
     <span>
       {ur ? "اصطلاحات و فرہنگ" : "Jurisprudential Lexicon"}
       <small>{ur ? "وراثت کی اہم شرعی اصطلاحات کا مطالعہ" : "Master key legal inheritance terms"}</small>
     </span>
     <ArrowUpRight size={18}/>
   </button>
 </div>
 </div>;
}
function GlobeIcon(){return <span aria-hidden="true" style={{fontSize:15}}>◎</span>}
