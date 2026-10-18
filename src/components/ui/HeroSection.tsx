"use client";
import { ArrowRight, ArrowUpRight, ShieldCheck, LockKeyhole, Scale, GitFork, BookOpen, Check, Leaf } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
export function HeroSection() {
 const { language, setActiveView } = useInheritanceStore();
 const ur = language === "ur";
 return <div className="home-intro">
 <section className="legacy-hero">
  <div className="hero-copy"><div className="eyebrow"><span/> GUIDED BY FAITH. DESIGNED FOR CLARITY.</div>
  <h1>
    {ur ? (
      <>
        <span>منصفانہ تقسیم،</span>
        <br />
        <span className="hero-subline">ایک پائیدار میراث۔</span>
      </>
    ) : (
      <>
        Honor a lifetime.
        <br />
        <em>Leave a fair legacy.</em>
      </>
    )}
  </h1>
  <p>{ur ? "فقہ جعفریہ کی روشنی میں ترکے کی تقسیم کو سمجھیں۔ اپنے خاندان کے لیے وضاحت اور اطمینان حاصل کریں۔" : "Navigate inheritance with confidence and care. A thoughtful way to understand each rightful share, guided by Ja’fari jurisprudence."}</p>
  <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById("calculator")?.scrollIntoView({behavior:"smooth", block:"start"})}>{ur ? "حساب شروع کریں" : "Begin your calculation"}<ArrowRight size={17}/></button><button className="text-button" onClick={() => setActiveView("academy")}>{ur ? "مزید جانیں" : "Explore the principles"}<ArrowUpRight size={16}/></button></div>
  <div className="hero-assurances"><span><LockKeyhole size={14}/>Private by design</span><span><Check size={15}/>No sign-up needed</span><span><GlobeIcon/>English & Urdu</span></div>
  </div>
  <div className="hero-art" aria-label="Decorative tree representing a lasting family legacy"><div className="arch arch-outer"/><div className="arch arch-inner"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="tree-illustration"><svg viewBox="0 0 400 390" fill="none" aria-hidden="true"><path d="M201 340V155M201 289L120 208M201 251L282 170M201 210L150 159M201 320L294 227" stroke="#b9a97c" strokeWidth="3"/>{[[200,109,42],[145,153,35],[258,139,41],[109,201,38],[170,208,36],[291,192,36],[250,236,40],[135,262,31],[307,244,29],[203,169,43]].map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill={i%3===0?"#8d9b73":i%3===1?"#bdc5a0":"#617b5b"} fillOpacity=".85"/>)}<path d="M161 340H241" stroke="#b9a97c" strokeWidth="2"/></svg></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span><div className="art-caption">Rooted in faith. Connected by family.</div><div className="floating-note"><span className="note-icon"><Scale size={19}/></span><span>Every share has a purpose.<small>Every family deserves clarity.</small></span></div></div>
 </section>
 <div className="trust-strip"><div><ShieldCheck size={21}/><span>Faithfully grounded<small>Ja’fari inheritance principles</small></span></div><div><Scale size={21}/><span>Multiple perspectives<small>Five contemporary marāji‘</small></span></div><div><GitFork size={21}/><span>Your family, visualized<small>Understand the connections</small></span></div><div><LockKeyhole size={21}/><span>Personal stays personal<small>Saved locally in your browser</small></span></div></div>
 <section className="workspace-heading" id="calculator"><div><div className="eyebrow">YOUR PATH TO CLARITY</div><h2>{ur ? "آئیے، ایک قدم سے شروع کریں۔" : "A considered process. A clear outcome."}</h2></div><span><span className="status-dot"/> Your progress is saved on this device</span></section>
 <div className="resource-grid"><button onClick={() => setActiveView("tree")}><span className="resource-icon"><GitFork size={20}/></span><span>See the bigger picture<small>Explore your interactive family tree</small></span><ArrowUpRight size={18}/></button><button onClick={() => setActiveView("academy")}><span className="resource-icon"><BookOpen size={20}/></span><span>Knowledge brings confidence<small>Learn the foundations of inheritance</small></span><ArrowUpRight size={18}/></button><button onClick={() => setActiveView("matrix")}><span className="resource-icon"><Leaf size={20}/></span><span>Understand the nuances<small>Compare rulings across marāji‘</small></span><ArrowUpRight size={18}/></button></div>
 </div>;
}
function GlobeIcon(){return <span aria-hidden="true" style={{fontSize:15}}>◎</span>}
