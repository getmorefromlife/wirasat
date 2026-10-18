"use client";

import { useState } from "react";
import { ArrowRight, Check, GitFork, Heart, Info, Landmark, Minus, Plus, Scale, Users, LockKeyhole, CircleDashed, Wallet } from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { SCENARIO_PRESETS } from "@/lib/scenarios";
import type { HeirsInput, MarjaId } from "@/types/fiqh";

type Relative = { id: string; key: keyof HeirsInput; en: string; ur: string; color: string; boolean?: boolean; tier: number };
const primary: Relative[] = [
  { id: "father", key: "fatherAlive", en: "Father", ur: "والد", color: "blue", boolean: true, tier: 1 },
  { id: "mother", key: "motherAlive", en: "Mother", ur: "والدہ", color: "blue", boolean: true, tier: 1 },
  { id: "spouse", key: "spouseCount", en: "Spouse", ur: "شریکِ حیات", color: "teal", tier: 0 },
  { id: "sons", key: "sonsCount", en: "Sons", ur: "بیٹے", color: "amber", tier: 1 },
  { id: "daughters", key: "daughtersCount", en: "Daughters", ur: "بیٹیاں", color: "amber", tier: 1 },
];
const extended: Relative[] = [
  {id:"pgf",key:"paternalGrandfatherAlive",en:"Paternal grandfather",ur:"دادا",boolean:true,color:"violet",tier:2},
  {id:"pgm",key:"paternalGrandmotherAlive",en:"Paternal grandmother",ur:"دادی",boolean:true,color:"violet",tier:2},
  {id:"mgf",key:"maternalGrandfatherAlive",en:"Maternal grandfather",ur:"نانا",boolean:true,color:"violet",tier:2},
  {id:"mgm",key:"maternalGrandmotherAlive",en:"Maternal grandmother",ur:"نانی",boolean:true,color:"violet",tier:2},
  {id:"full_brothers",key:"fullBrothersCount",en:"Full brothers",ur:"سگے بھائی",color:"violet",tier:2},
  {id:"full_sisters",key:"fullSistersCount",en:"Full sisters",ur:"سگی بہنیں",color:"violet",tier:2},
  {id:"paternal_brothers",key:"paternalBrothersCount",en:"Paternal brothers",ur:"علاتی بھائی",color:"violet",tier:2},
  {id:"paternal_sisters",key:"paternalSistersCount",en:"Paternal sisters",ur:"علاتی بہنیں",color:"violet",tier:2},
  {id:"uterine_brothers",key:"uterineBrothersCount",en:"Maternal brothers",ur:"اخیافی بھائی",color:"violet",tier:2},
  {id:"uterine_sisters",key:"uterineSistersCount",en:"Maternal sisters",ur:"اخیافی بہنیں",color:"violet",tier:2},
  {id:"paternal_uncles",key:"paternalUnclesCount",en:"Paternal uncles",ur:"چچا",color:"violet",tier:3},
  {id:"paternal_aunts",key:"paternalAuntsCount",en:"Paternal aunts",ur:"پھوپھیاں",color:"violet",tier:3},
  {id:"maternal_uncles",key:"maternalUnclesCount",en:"Maternal uncles",ur:"ماموں",color:"violet",tier:3},
  {id:"maternal_aunts",key:"maternalAuntsCount",en:"Maternal aunts",ur:"خالائیں",color:"violet",tier:3},
  {id:"paternal_cousins",key:"paternalCousinsCount",en:"Paternal cousins",ur:"چچا زاد",color:"violet",tier:3},
  {id:"maternal_cousins",key:"maternalCousinsCount",en:"Maternal cousins",ur:"ماموں زاد",color:"violet",tier:3},
];
const allRelatives = [...primary, ...extended];

export function FamilyTree() {
 const { language, deceased, heirs, assets, updateHeirs, updateDeceased, updateAssets, getCalculationResult, setMarja, loadPreset, setActiveView, setWizardStep, isSample, resetAll } = useInheritanceStore();
 const ur = language === "ur";
 const tr = (en: string, ar: string) => ur ? ar : en;
 const [view, setView] = useState<"family" | "flow">("family");
 const [selected, setSelected] = useState("deceased");
 const [announcement, setAnnouncement] = useState("");
 const result = getCalculationResult();
 const balance = result.balanceSheet;
 const money = (value: number) => `${Math.round(value).toLocaleString("en-US")} ${deceased.currency}`;
 const relative = allRelatives.find(r => r.id === selected);
 const shareId = (id: string) => id === "spouse" ? (deceased.gender === "female" ? "husband" : "wives") : id;
 const share = result.heirShares.find(s => s.id === shareId(selected));
 const shareName = (id: string, fallback: string) => {
   if (id === "husband") return tr("Husband", "شوہر");
   if (id === "wives") return tr("Wife / wives", "بیوہ / بیوائیں");
   const r = allRelatives.find(r => r.id === id);
   if (r) return ur ? r.ur : r.en;
   const groups: Record<string, [string,string]> = {maternal_grandparents:["Maternal grandparents (group)","نانا نانی (گروہ)"],paternal_relatives_tier2:["Paternal relatives (group)","والد کی طرف کے رشتہ دار (گروہ)"],maternal_relatives_tier2:["Maternal relatives (group)","والدہ کی طرف کے رشتہ دار (گروہ)"],tier3_relatives:["Tier 3 relatives (group)","تیسرے طبقے کے رشتہ دار (گروہ)"]};
   return groups[id] ? tr(...groups[id]) : fallback;
 };
 const amountAllocated = result.heirShares.reduce((sum, s) => sum + s.totalMonetaryShare, 0);
 const difference = balance.netDistributableEstate - amountAllocated;
 const countFor = (r: Relative) => Number(heirs[r.key]) || 0;
 const isImpeded = (r: Relative) => r.id === "father" ? heirs.fatherImpediment : r.id === "mother" ? heirs.motherImpediment : false;
 const relatedGroup = (r: Relative) => {
   const paternal = ["pgf", "pgm", "full_brothers", "full_sisters", "paternal_brothers", "paternal_sisters"].includes(r.id);
   const maternal = ["mgf", "mgm", "uterine_brothers", "uterine_sisters"].includes(r.id);
   return result.heirShares.find(s =>
     (r.tier === 3 && s.id === "tier3_relatives") ||
     (paternal && s.id === "paternal_relatives_tier2") ||
     (maternal && s.id === "maternal_relatives_tier2") ||
     (["mgf", "mgm"].includes(r.id) && s.id === "maternal_grandparents")
   );
 };
 const applicabilityFor = (r: Relative) => {
   if (countFor(r) === 0) return "absent";
   if (isImpeded(r)) return "impeded";
   if (result.excludedTiers.includes(r.tier)) return "excluded";
   if (result.heirShares.some(s => s.id === shareId(r.id))) return "allocated";
   if (relatedGroup(r)) return "group";
   return "review";
 };
 const statusFor = (r: Relative) => {
   const labels: Record<string, string> = {
     absent: tr("Not included", "شامل نہیں"),
     impeded: tr("Impediment selected", "مانعِ ارث منتخب"),
     excluded: tr("Excluded by an earlier tier", "پہلے طبقے کے سبب محروم"),
     allocated: tr("Share calculated", "حصہ شمار کیا گیا"),
     group: tr("Included in a group allocation", "گروہی حصے میں شامل"),
     review: tr("Included · no allocation reported", "شامل · حصہ ظاہر نہیں ہوا"),
   };
   return labels[applicabilityFor(r)];
 };
 const coloredCount = allRelatives.filter(r => ["allocated", "group"].includes(applicabilityFor(r))).length;
 function changeRelative(r: Relative, next: number) {
   updateHeirs({[r.key]: r.boolean ? Boolean(next) : Math.max(0, Math.floor(next))});
   setAnnouncement(`${ur ? r.ur : r.en}: ${next}. ${tr("Net estate", "خالص ترکہ")}: ${money(getCalculationResult().balanceSheet.netDistributableEstate)}`);
 }
 const openWizard = (step: number) => {setWizardStep(step);setActiveView("wizard");};
 function renderNode(r: Relative) {
   const amount = result.heirShares.find(s => s.id === shareId(r.id));
   const applicability = applicabilityFor(r);
   const group = relatedGroup(r);
   return <button key={r.id} type="button" data-applicability={applicability} className={`relative-node tone-${r.color} ${selected === r.id ? "node-selected" : ""}`} aria-pressed={selected === r.id} onClick={() => setSelected(r.id)}>
    <span className="node-heading"><span>{r.id === "spouse" ? <Heart size={20}/> : <Users size={20}/>}</span><strong>{r.id === "spouse" ? tr(deceased.gender === "female" ? "Husband" : "Wife / wives",deceased.gender === "female" ? "شوہر" : "بیوہ / بیوائیں") : ur ? r.ur : r.en}</strong>{selected === r.id && <Check size={18}/>}</span>
    <span className="node-status">{applicability === "excluded" || applicability === "impeded" ? <LockKeyhole size={14} aria-hidden="true"/> : applicability === "allocated" || applicability === "group" ? <Check size={14} aria-hidden="true"/> : <CircleDashed size={14} aria-hidden="true"/>}{statusFor(r)}{!r.boolean && countFor(r) > 0 ? ` · ${countFor(r)}` : ""}</span>
    <span className="node-money" dir="ltr">{amount ? money(amount.totalMonetaryShare) : applicability === "group" ? tr("Group allocation", "گروہی حصہ") : applicability === "review" ? tr("Not reported", "ظاہر نہیں ہوا") : money(0)}</span>
    <span className="node-fraction">{amount ? `${tr("Engine fraction", "حسابی کسر")}: ${amount.fractionString}` : applicability === "group" && group ? tr("Inspect for the group total", "گروہ کی کل رقم کے لیے منتخب کریں") : tr("Select to inspect or edit", "تفصیل یا تبدیلی کے لیے منتخب کریں")}</span>
   </button>;
 }
 return <div className="inheritance-explorer">
  <header className="explorer-header"><div><span className="explorer-kicker"><GitFork size={17}/>{tr("A living picture of your family", "خاندان کی واضح تصویر")}</span><h1>{tr("Every connection. A clearer picture.", "ہر رشتہ، ایک واضح تصویر۔")}</h1><p>{tr("Explore the family, adjust a detail, and see the calculation respond.","خاندان دیکھیں، تفصیلات بدلیں، اور حساب کا نتیجہ فوراً دیکھیں۔")}</p></div><button className="explorer-outline" onClick={() => {if(isSample){resetAll();}else{loadPreset(SCENARIO_PRESETS[0].id);setActiveView("tree");}setSelected("deceased");setAnnouncement("");}}>{isSample ? tr("Start my calculation", "نیا حساب شروع کریں") : tr("Try a sample", "نمونہ دیکھیں")}</button></header>
  {isSample && <div className="explorer-notice"><Info size={19}/>{tr("Sample scenario · These are example figures for learning.", "نمونہ · یہ اعداد صرف سمجھنے کے لیے ہیں۔")}</div>}
  <div className="explorer-summary"><div><Wallet size={21}/><span>{tr("Gross estate", "کل ترکہ")}<strong dir="ltr">{money(balance.grossEstate)}</strong></span></div><div><Scale size={21}/><span>{tr("Net estate", "خالص ترکہ")}<strong dir="ltr">{money(balance.netDistributableEstate)}</strong></span></div><div><Users size={21}/><span>{tr("Active blood-relative tier", "فعال نسبی طبقہ")}<strong>{result.activeTier ?? tr("None entered", "ابھی کوئی نہیں")}</strong></span></div></div>
  <div className="explorer-toolbar"><div className="explorer-tabs" aria-label={tr("Chart view", "نقشے کا منظر")}><button aria-pressed={view === "family"} onClick={() => setView("family")}><GitFork size={18}/>{tr("Family connections", "خاندانی ربط")}</button><button aria-pressed={view === "flow"} onClick={() => setView("flow")}><Wallet size={18}/>{tr("Estate flow", "ترکے کی تقسیم")}</button></div><label>{tr("Marja‘", "مرجع")}<select value={deceased.marja} onChange={e => {setMarja(e.target.value as MarjaId);setAnnouncement(tr("Marja changed. Both views have updated.", "مرجع بدل گیا۔ دونوں مناظر تازہ ہو گئے۔"));}}>{Object.values(MARJA_DATABASE).map(m => <option key={m.id} value={m.id}>{ur ? m.nameUr : m.nameEn}</option>)}</select></label></div>
  <div className="explorer-body"><section className="explorer-canvas" aria-label={tr("Interactive inheritance chart", "وراثت کا تعاملی نقشہ")}>
   {view === "family" ? <>
    <div className="chart-instruction"><Info size={17}/>{tr("Every relationship stays visible. Grey means not included or excluded; color means a reported allocation. Select any card to inspect or change it.", "تمام رشتے نظر آتے ہیں۔ سرمئی کارڈ غیر شامل یا محروم، رنگین کارڈ حساب میں ظاہر کردہ حصے کی علامت ہیں۔ تفصیل یا تبدیلی کے لیے کارڈ منتخب کریں۔")}</div>
    <div className="applicability-key" aria-label={tr("Applicability legend", "اہلیت کی علامات")}><span><i className="key-colored"/>{tr("Calculated / group allocation", "حسابی / گروہی حصہ")}</span><span><i className="key-muted"/>{tr("Not included", "شامل نہیں")}</span><span><i className="key-excluded"/>{tr("Excluded / impediment", "محروم / مانعِ ارث")}</span><span><i className="key-review"/>{tr("No allocation reported", "حصہ ظاہر نہیں ہوا")}</span><strong>{coloredCount} / {allRelatives.length} {tr("relationships with allocations", "رشتوں کے لیے حصے ظاہر ہیں")}</strong></div>
    <div className="family-canvas"><div className="family-connected-layout">
     <div className="parent-row">{primary.slice(0,2).map(renderNode)}</div><div className="family-stem" aria-hidden="true"/>
     <div className="center-row"><button className={`deceased-node ${selected === "deceased" ? "node-selected" : ""}`} aria-pressed={selected === "deceased"} onClick={() => setSelected("deceased")}><Landmark size={24}/><span>{tr("Whose estate?", "کس کا ترکہ؟")}</span><strong>{deceased.name || tr("The deceased", "متوفی")}</strong><span dir="ltr">{money(balance.netDistributableEstate)}</span></button><div className="partner-link" aria-hidden="true"><Heart size={16}/></div>{renderNode(primary[2])}</div>
     <div className="family-stem" aria-hidden="true"/><div className="children-row">{primary.slice(3).map(renderNode)}</div>
    </div></div>
    <div className="chart-legend"><span className="tone-blue">● {tr("Parents", "والدین")}</span><span className="tone-teal">● {tr("Spouse", "شریکِ حیات")}</span><span className="tone-amber">● {tr("Children", "اولاد")}</span><span className="tone-violet">● {tr("Extended family", "دیگر رشتہ دار")}</span></div>
    {[2,3].map(tier => <section className={`extended-branch always-visible-branch ${result.excludedTiers.includes(tier) ? "branch-excluded" : ""}`} key={tier} aria-label={tr(`Tier ${tier} relatives`, `طبقہ ${tier} کے رشتہ دار`)}><div className="branch-header"><h2><GitFork size={18}/>{tier === 2 ? tr("Grandparents & siblings", "دادا دادی، نانا نانی اور بہن بھائی") : tr("Uncles, aunts & cousins", "چچا، ماموں، پھوپھی، خالہ اور کزن")}</h2><span className="tier-status">{result.excludedTiers.includes(tier) ? tr("Earlier tier takes priority", "پہلے طبقے کو ترجیح") : tr(`Tier ${tier}`, `طبقہ ${tier}`)}</span></div><div className="extended-grid">{extended.filter(r => r.tier === tier).map(renderNode)}</div><p>{tr("Group allocations appear as group totals in the details panel and Estate flow, not as individual amounts.", "گروہی حصوں کی کل رقم تفصیلی خانے اور تقسیم کے منظر میں دکھائی جاتی ہے، انفرادی رقم کے طور پر نہیں۔")}</p></section>)}
   </> : <div className="estate-flow"><div className="flow-title"><Wallet size={23}/><div><h2>{tr("Follow the estate", "ترکے کی تقسیم دیکھیں")}</h2><p>{tr("Deductions first. Then the engine-reported allocations.", "پہلے اخراجات، پھر حساب میں ظاہر کردہ حصے۔")}</p></div></div><div className="flow-stages"><div><span>{tr("Gross estate", "کل ترکہ")}</span><strong dir="ltr">{money(balance.grossEstate)}</strong></div><ArrowRight aria-hidden="true"/><div><span>{tr("Deductions", "کٹوتیاں")}</span><strong dir="ltr">{money(balance.totalDebts + balance.deductedWasiyyah)}</strong><small>{tr("Funeral, debts & applied bequest", "تجہیز و تکفین، قرض اور نافذ وصیت")}</small></div><ArrowRight aria-hidden="true"/><div className="net-stage"><span>{tr("Net estate", "خالص ترکہ")}</span><strong dir="ltr">{money(balance.netDistributableEstate)}</strong></div></div>
    <div className="flow-trunk" aria-hidden="true"/>
    {result.heirShares.length === 0 ? <div className="flow-empty"><Users size={30}/><h3>{tr("Build your family to see the flow", "تقسیم دیکھنے کے لیے ورثاء درج کریں")}</h3><p>{tr("Add relatives in Family connections, then enter estate amounts or try a sample.", "خاندانی ربط میں رشتہ دار شامل کریں، پھر ترکے کی رقم درج کریں یا نمونہ دیکھیں۔")}</p></div> : <div className="flow-beneficiaries">{result.heirShares.map(s => {
     const nodeId = s.id === "husband" || s.id === "wives" ? "spouse" : s.id;
     const tone = s.tier === 0 ? "teal" : ["father","mother"].includes(s.id) ? "blue" : s.tier === 1 ? "amber" : "violet";
     return <button className={`flow-beneficiary tone-${tone} ${selected === nodeId ? "node-selected" : ""}`} key={s.id} aria-pressed={selected === nodeId} onClick={() => setSelected(nodeId)}><span className="flow-beneficiary-title"><strong>{shareName(s.id,s.relationKey)}</strong><span>{s.count} {tr("person(s)", "افراد")}</span></span><span className="flow-beneficiary-money" dir="ltr">{money(s.totalMonetaryShare)}</span><span className="allocation-bar" aria-hidden="true"><span style={{width:`${balance.netDistributableEstate > 0 ? Math.max(0,Math.min(100,s.totalMonetaryShare / balance.netDistributableEstate * 100)) : 0}%`}}/></span><span>{tr("Engine fraction", "حسابی کسر")}: <b dir="ltr">{s.fractionString}</b></span></button>;
    })}</div>}
    <p className="flow-caption">{tr("Bars compare monetary allocations with net estate, capped at 100%. Fractions are reported separately by the engine.", "پٹیاں خالص ترکے کے مقابل رقم دکھاتی ہیں (زیادہ سے زیادہ 100٪)۔ کسر حساب سے الگ ظاہر کی جاتی ہے۔")}</p>
    <div className="flow-reconciliation"><span>{tr("Total reported allocations", "حساب میں تقسیم شدہ کل رقم")}<strong dir="ltr">{money(amountAllocated)}</strong></span><span>{difference < -1 ? tr("Allocations exceed net estate by", "خالص ترکے سے زائد تقسیم") : tr("Net estate less allocations", "خالص ترکہ منفی تقسیم شدہ رقم")}<strong dir="ltr">{money(Math.abs(difference))}</strong></span></div>
    {Math.abs(difference) > 1 && <p className="explorer-notice">{tr("These engine outputs do not reconcile with net estate. The chart shows the difference without changing the calculated shares.", "حساب کی تقسیم خالص ترکے سے مطابقت نہیں رکھتی۔ نقشہ حصے تبدیل کیے بغیر فرق دکھاتا ہے۔")}</p>}
    {balance.habwahDeducted > 0 && <p className="explorer-notice">{tr("Separately reported habwah valuation", "الگ ظاہر کردہ حبوہ کی قیمت")}: <b dir="ltr">{money(balance.habwahDeducted)}</b></p>}
   </div>}
  </section>
  <a className="mobile-inspector-link" href="#relative-details"><Info size={18}/>{tr("Inspect / edit", "تفصیل / تبدیلی")}: {relative ? (ur ? relative.ur : relative.en) : selected === "deceased" ? tr("The deceased", "متوفی") : shareName(selected, selected)}<ArrowRight size={18}/></a>
  <aside id="relative-details" className="relative-inspector" aria-label={tr("Selected relative details", "منتخب رشتہ دار کی تفصیل")}><span className="explorer-kicker"><Info size={17}/>{tr("Understand this connection", "اس رشتے کی تفصیل")}</span><h2>{relative ? (ur ? relative.ur : relative.en) : selected === "deceased" ? tr("The deceased", "متوفی") : shareName(selected,selected)}</h2>
   {selected === "deceased" ? <><p>{tr("This person is the reference point for all relationships. Inspecting another card does not change whose estate is calculated.", "تمام رشتے اس متوفی کے حوالے سے ہیں۔ دوسرے کارڈ کا انتخاب متوفی تبدیل نہیں کرتا۔")}</p><label>{tr("Name", "نام")}<input value={deceased.name} placeholder={tr("Enter a name", "نام درج کریں")} onChange={e => updateDeceased({name:e.target.value})}/></label><label>{tr("Gender", "جنس")}<select value={deceased.gender} onChange={e => {const gender=e.target.value as "male"|"female";updateDeceased({gender});if(gender === "female" && heirs.spouseCount > 1) updateHeirs({spouseCount:1});setAnnouncement(tr("Gender changed; spouse rules updated.","جنس تبدیل ہوئی، شریکِ حیات کا حساب تازہ ہو گیا۔"));}}><option value="male">{tr("Male", "مرد")}</option><option value="female">{tr("Female", "عورت")}</option></select></label><label>{tr("Cash amount", "نقد رقم")} ({deceased.currency})<input type="number" min="0" value={assets.cash} onChange={e => {updateAssets({cash:Math.max(0,Number(e.target.value)||0)});setAnnouncement(tr("Cash updated. Estate flow recalculated.","نقد رقم اور حساب تازہ ہو گئے۔"));}}/></label><button className="explorer-outline" onClick={() => openWizard(2)}>{tr("Edit all assets & deductions", "تمام اثاثے اور کٹوتیاں بدلیں")}<ArrowRight size={16}/></button></> : <>
    {relative && <><p className="inspector-status">{statusFor(relative)}</p><div className="inspector-controls">{relative.boolean ? <label className="survival-control"><input type="checkbox" checked={Boolean(heirs[relative.key])} onChange={e => changeRelative(relative,Number(e.target.checked))}/>{tr("Survives the deceased", "متوفی کے بعد زندہ ہیں")}</label> : <><span>{tr("Number included", "شامل افراد کی تعداد")}</span><div className="relative-counter"><button aria-label={tr(`Decrease ${relative.en}`,`${relative.ur} کی تعداد کم کریں`)} disabled={countFor(relative)===0} onClick={() => changeRelative(relative,countFor(relative)-1)}><Minus size={18}/></button><output>{countFor(relative)}</output><button aria-label={tr(`Increase ${relative.en}`,`${relative.ur} کی تعداد بڑھائیں`)} disabled={relative.id === "spouse" && countFor(relative) >= (deceased.gender === "female" ? 1 : 4)} onClick={() => changeRelative(relative,countFor(relative)+1)}><Plus size={18}/></button></div></>}{["father","mother"].includes(relative.id) && <label className="survival-control"><input type="checkbox" checked={isImpeded(relative)} onChange={e => {updateHeirs({[relative.id === "father" ? "fatherImpediment" : "motherImpediment"]:e.target.checked});setAnnouncement(tr("Impediment changed. Calculation updated.","مانعِ ارث اور حساب تازہ ہو گئے۔"));}}/>{tr("Inheritance impediment applies", "مانعِ ارث موجود ہے")}</label>}</div></>}
    {relative && applicabilityFor(relative) === "group" && relatedGroup(relative) && <div className="inspector-group-allocation"><strong>{tr("Part of a group allocation", "گروہی حصے کا حصہ")}</strong><span>{shareName(relatedGroup(relative)!.id, relatedGroup(relative)!.relationKey)}</span><b dir="ltr">{money(relatedGroup(relative)!.totalMonetaryShare)}</b><p>{tr("This is the entire group total, not this relative’s individual share.", "یہ پورے گروہ کی کل رقم ہے، اس رشتہ دار کا انفرادی حصہ نہیں۔")}</p></div>}
    {share ? <div className="inspector-share"><span>{tr("Engine-reported allocation", "حساب میں ظاہر کردہ حصہ")}</span><strong dir="ltr">{money(share.totalMonetaryShare)}</strong><span>{tr("Fraction", "کسر")}: <b dir="ltr">{share.fractionString}</b></span><span>{tr("People in this allocation", "اس حصے میں افراد")}: {share.count}</span>{share.count > 1 && <span>{tr("Per person (engine output)","فی فرد (حساب کے مطابق)")}: <b dir="ltr">{money(share.sharePerIndividual)}</b></span>}<p>{share.proof.ruleExplanation}</p>{share.notes.map((note,i) => <p key={i}>{note}</p>)}</div> : <p>{relative && countFor(relative) === 0 ? tr("Include this relative to explore how the calculation changes.", "حساب میں تبدیلی دیکھنے کے لیے یہ رشتہ دار شامل کریں۔") : relative && result.excludedTiers.includes(relative.tier) ? tr("The engine gives priority to an earlier tier. This connection stays visible so you can understand the exclusion.", "حساب میں پہلے طبقے کو ترجیح حاصل ہے۔ یہ رشتہ وضاحت کے لیے دکھایا جاتا ہے۔") : relative && applicabilityFor(relative) === "group" ? tr("This relative is represented in the group allocation above. The engine has not returned a separate individual amount.", "یہ رشتہ دار اوپر دیے گئے گروہی حصے میں شامل ہے۔ حساب میں الگ انفرادی رقم ظاہر نہیں ہوئی۔") : tr("No individual allocation is returned for this selection. Check Estate flow for group outputs and the full calculator for details.", "اس انتخاب کے لیے انفرادی حصہ ظاہر نہیں ہوا۔ گروہی حصے تقسیم کے منظر اور تفصیل مکمل حساب میں دیکھیں۔")}</p>}
   </>}
   <button className="explorer-text-link" onClick={() => openWizard(4)}>{tr("Open all relative parameters", "ورثاء کی تمام تفصیلات کھولیں")}<ArrowRight size={17}/></button>
  </aside></div><p className="explorer-announcement" role="status" aria-live="polite">{announcement || tr("Ready. Select a relative to explore the scenario.", "تیار ہے۔ تفصیل کے لیے رشتہ دار منتخب کریں۔")}</p>
 </div>;
}
