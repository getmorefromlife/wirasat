"use client";

import React from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Users,
  Heart,
  Lock,
  Unlock,
  AlertCircle,
  Plus,
  Minus,
  Baby,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Trash2,
  Crown,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  DollarSign,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export const Step4Relatives: React.FC = () => {
  const {
    language,
    deceased,
    heirs,
    updateHeirs,
    setWifeCount,
    updateWife,
    addWife,
    removeWife,
    setChildrenList,
    addChild,
    updateChild,
    removeChild,
    addGrandchild,
    updateGrandchild,
    removeGrandchild,
    setActiveView,
  } = useInheritanceStore();
  const t = TRANSLATIONS[language];
  const isUr = language === "ur";

  // Tier 1 presence check
  const hasTier1Heir =
    (heirs.fatherAlive && !heirs.fatherImpediment) ||
    (heirs.motherAlive && !heirs.motherImpediment) ||
    (heirs.sonsCount || 0) > 0 ||
    (heirs.daughtersCount || 0) > 0;

  // Tier 2 presence check
  const hasTier2Heir =
    heirs.paternalGrandfatherAlive ||
    heirs.paternalGrandmotherAlive ||
    heirs.maternalGrandfatherAlive ||
    heirs.maternalGrandmotherAlive ||
    (heirs.fullBrothersCount || 0) > 0 ||
    (heirs.fullSistersCount || 0) > 0 ||
    (heirs.paternalBrothersCount || 0) > 0 ||
    (heirs.paternalSistersCount || 0) > 0 ||
    (heirs.uterineBrothersCount || 0) > 0 ||
    (heirs.uterineSistersCount || 0) > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-[var(--theme-border)] pb-4">
        <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[var(--theme-gold)] flex items-center gap-2">
          <Users className="w-6 h-6 text-[var(--theme-gold)]" />
          <span>{t.step4Title}</span>
        </h2>
        <p className="text-sm sm:text-sm text-[var(--theme-text-secondary)] mt-1">
          {t.step4Desc}
        </p>
      </div>

      {/* SECTION 1: Spouses (Non-Blockable - Zawj / Zawjāt) */}
      <div className="sacred-card p-6 sm:p-7 rounded-2xl space-y-5 border-sky-500/30">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-sky-700 dark:text-sky-400 fill-sky-700/20" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.spousesHeading}
            </h3>
          </div>
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700">
            {isUr ? "کسی سے محجوب نہیں ہوتے (غیر محجوب)" : "Non-Excludable Quranic Sharer"}
          </span>
        </div>

        {deceased.gender === "female" ? (
          <div>
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl sacred-card hover:border-[var(--theme-gold)] transition-all">
              <input
                type="checkbox"
                checked={heirs.spouseCount > 0}
                onChange={(e) =>
                  updateHeirs({ spouseCount: e.target.checked ? 1 : 0 })
                }
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.husbandAlive}
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-bold text-[var(--theme-text-primary)] mb-1">
                  {isUr ? "زندہ دائمی بیویوں کی تعداد (تعددِ ازواج: ۱ تا ۴ بیویاں)" : "Number of Surviving Permanent Wives (1 to 4)"}
                </label>
                <p className="text-xs text-[var(--theme-text-secondary)]">
                  {isUr
                    ? "فقہ جعفریہ میں تمام بیویاں قرآنی حصے (۱/۸ یا ۱/۴) کو آپس میں برابر (بالسویہ) تقسیم کرتی ہیں۔"
                    : "Under Ja'fari jurisprudence, all permanent wives divide the spousal share equally."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setWifeCount(count)}
                    className={`w-11 h-10 rounded-xl font-bold text-sm border transition-all ${
                      (heirs.wives ? heirs.wives.length : heirs.spouseCount) === count
                        ? "bg-linear-to-r from-[var(--theme-gold)] to-[var(--theme-gold-dark)] text-white border-[var(--theme-gold)] shadow-md shadow-[var(--theme-gold)]/20"
                        : "sacred-card text-[var(--theme-text-secondary)] hover:border-[var(--theme-gold)]/50"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Wife Profile Cards */}
            {(heirs.wives && heirs.wives.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {heirs.wives.map((wife, idx) => (
                  <div
                    key={wife.id}
                    className="p-4 sm:p-5 rounded-xl border border-[var(--theme-border-strong)] bg-[var(--theme-card)]/90 space-y-3.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#edf3e7] text-[#245642] font-mono font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#245642]">
                          {isUr ? `بیوی نمبر ${idx + 1}` : `Wife ${idx + 1}`}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                        {isUr ? "نکاحِ دائم" : "Nikah Da'im"}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--theme-text-secondary)] mb-1">
                        {isUr ? "زوجہ کا نام:" : "Wife Name:"}
                      </label>
                      <input
                        type="text"
                        value={wife.name}
                        onChange={(e) => updateWife(wife.id, { name: e.target.value })}
                        placeholder={isUr ? `زوجہ ${idx + 1}` : `Wife ${idx + 1}`}
                        className="w-full sacred-input px-3 py-2 text-xs sm:text-sm font-medium"
                      />
                    </div>

                    {/* Pending Mahr Debt Toggle */}
                    <div className="p-3 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-bold text-[var(--theme-text-primary)]">
                          {isUr ? "غیر ادا شدہ مہر (مہرِ مؤجل):" : "Unpaid Mahr (Mahr al-Mu'ajjal):"}
                        </span>
                        <input
                          type="checkbox"
                          checked={wife.hasMahrPending}
                          onChange={(e) =>
                            updateWife(wife.id, {
                              hasMahrPending: e.target.checked,
                              pendingMahrAmount: e.target.checked ? (wife.pendingMahrAmount || 100000) : 0,
                            })
                          }
                          className="rounded text-[var(--theme-gold)] w-4 h-4"
                        />
                      </label>

                      {wife.hasMahrPending && (
                        <div className="space-y-1.5 pt-1">
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={wife.pendingMahrAmount || 0}
                              onChange={(e) =>
                                updateWife(wife.id, {
                                  pendingMahrAmount: Math.max(0, parseInt(e.target.value) || 0),
                                })
                              }
                              className="w-full sacred-input px-3 py-1.5 text-xs sm:text-sm font-mono font-bold pr-16"
                            />
                            <span className="absolute right-3 top-1.5 text-[11px] font-mono text-[var(--theme-text-muted)]">
                              {deceased.currency}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#b45309] block leading-tight">
                            {isUr
                              ? "شرعی قرض (دیون الناس): یہ رقم ترکے سے پہلے مکمل ادا کی جائے گی۔"
                              : "Sharia Debt: Automatically deducted before estate division."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 2: Tier 1 (Parents, Children across Wives & Grandchildren Lineage) */}
      <div className="sacred-card p-6 sm:p-7 rounded-2xl border-2 border-[var(--theme-gold)]/50 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--theme-gold)]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier1Heading}
            </h3>
          </div>
          <span className="text-sm font-bold px-3 py-1 rounded-full bg-[var(--theme-gold)]/15 text-[var(--theme-gold)] border border-[var(--theme-gold)]/30">
            الطبقة الأولى
          </span>
        </div>

        {/* Parents Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="p-4 rounded-xl sacred-card flex items-center justify-between cursor-pointer hover:border-[var(--theme-gold)] transition-all">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={heirs.fatherAlive}
                onChange={(e) => updateHeirs({ fatherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.fatherAlive}
              </span>
            </div>
            <span className="text-sm font-mono text-[var(--theme-gold)] font-bold">
              {heirs.fatherAlive ? "Alive" : "Deceased"}
            </span>
          </label>

          <label className="p-4 rounded-xl sacred-card flex items-center justify-between cursor-pointer hover:border-[var(--theme-gold)] transition-all">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={heirs.motherAlive}
                onChange={(e) => updateHeirs({ motherAlive: e.target.checked })}
                className="rounded text-[var(--theme-gold)] focus:ring-[var(--theme-gold)] w-5 h-5"
              />
              <span className="text-sm font-bold text-[var(--theme-text-primary)]">
                {t.motherAlive}
              </span>
            </div>
            <span className="text-sm font-mono text-[var(--theme-gold)] font-bold">
              {heirs.motherAlive ? "Alive" : "Deceased"}
            </span>
          </label>
        </div>

        {/* Dynamic Children & Grandchildren Lineage Section */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--theme-border)] pb-2.5">
            <div>
              <h4 className="text-sm font-bold text-[#172e22] dark:text-emerald-100 flex items-center gap-2">
                <Baby className="w-4 h-4 text-[var(--theme-gold)]" />
                <span>{isUr ? "متوفی کے صلبی بچے (تمام بیویوں کی اولاد)" : "Children of the Deceased (Across all wives)"}</span>
              </h4>
              <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5">
                {isUr
                  ? "فقہ جعفریہ میں تمام بیویوں کے بچے برابر کے صلبی وارث ہیں (بیٹے کو دوگنا، بیٹی کو ایک گنا)"
                  : "All biological children share in Class 1 in a 2:1 ratio regardless of maternal lineage."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addChild({ gender: "MALE" })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#28543e] hover:bg-[#183c2a] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isUr ? "بیٹا شامل کریں" : "+ Add Son"}</span>
              </button>
              <button
                type="button"
                onClick={() => addChild({ gender: "FEMALE" })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef3e8] hover:bg-[#dfe9d7] text-[#245642] border border-[#cbd8c5] text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isUr ? "بیٹی شامل کریں" : "+ Add Daughter"}</span>
              </button>
            </div>
          </div>

          {/* Children Cards List */}
          {(!heirs.childrenList || heirs.childrenList.length === 0) ? (
            <div className="p-6 rounded-xl border border-dashed border-[var(--theme-border-strong)] text-center space-y-2">
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)]">
                {isUr ? "فی الوقت کوئی بچہ شامل نہیں ہے۔ اوپر دیے گئے بٹن سے بیٹا یا بیٹی شامل کریں۔" : "No children added yet. Use the buttons above to add sons or daughters."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {heirs.childrenList.map((child, cIdx) => {
                // Find if this son is the absolute eldest son across all wives
                const livingSons = (heirs.childrenList || []).filter(
                  (c) => c.gender === "MALE" && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
                );
                const sortedLivingSons = [...livingSons].sort(
                  (a, b) => (b.birthOrderOrAge ?? 0) - (a.birthOrderOrAge ?? 0)
                );
                const isAbsoluteEldestSon =
                  child.gender === "MALE" &&
                  child.isAlive &&
                  sortedLivingSons.length > 0 &&
                  sortedLivingSons[0].id === child.id;

                const hasOtherLivingDirectChild = (heirs.childrenList || []).some(
                  (c) => c.id !== child.id && c.isAlive && !c.impediments?.isKiller && !c.impediments?.isNonMuslim
                );

                return (
                  <div
                    key={child.id}
                    className={`p-4 sm:p-5 rounded-xl border transition-all ${
                      child.isAlive
                        ? "bg-[var(--theme-card)] border-[var(--theme-border-strong)] shadow-xs"
                        : "bg-[#fbfbf9] border-dashed border-amber-300/70"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--theme-border)]">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                          #{cIdx + 1}
                        </span>
                        <span className="font-bold text-sm text-[var(--theme-text-primary)]">
                          {child.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            child.gender === "MALE"
                              ? "bg-sky-100 text-sky-800 border border-sky-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {child.gender === "MALE" ? (isUr ? "بیٹا (مرد - ۲ حصے)" : "Son (2 shares)") : (isUr ? "بیٹی (عورت - ۱ حصہ)" : "Daughter (1 share)")}
                        </span>

                        {isAbsoluteEldestSon && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-2xs">
                            <Crown className="w-3 h-3" />
                            <span>{isUr ? "الولد الأكبر (حبوہ کا حقدار سب سے بڑا بیٹا)" : "Absolute Eldest Son (Ḥabwah Candidate)"}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Alive / Deceased Toggle */}
                        <button
                          type="button"
                          onClick={() => updateChild(child.id, { isAlive: !child.isAlive })}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                            child.isAlive
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700"
                          }`}
                        >
                          {child.isAlive ? (isUr ? "زندہ (وارث)" : "Living") : (isUr ? "مرحوم (فوت شدہ)" : "Deceased")}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeChild(child.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Remove Child"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Child Details: Name, Mother Attribution, Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                          {isUr ? "نام:" : "Name:"}
                        </label>
                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) => updateChild(child.id, { name: e.target.value })}
                          className="w-full sacred-input px-2.5 py-1.5 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                          {isUr ? "والدہ (کس بیوی سے ہے):" : "Mother Attribution:"}
                        </label>
                        <select
                          value={child.motherId || "wife-1"}
                          onChange={(e) => updateChild(child.id, { motherId: e.target.value })}
                          className="w-full sacred-input px-2.5 py-1.5 text-xs font-medium bg-[var(--theme-card)]"
                        >
                          {(heirs.wives && heirs.wives.length > 0) ? (
                            heirs.wives.map((w, wIdx) => (
                              <option key={w.id} value={w.id}>
                                {w.name || `Wife ${wIdx + 1}`}
                              </option>
                            ))
                          ) : (
                            <option value="wife-1">
                              {isUr ? "پہلی بیوی (زوجہ اول)" : "First Wife"}
                            </option>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[var(--theme-text-secondary)] mb-1">
                          {isUr ? "عمر یا ولادت کی ترتیب (حبوہ کے لیے):" : "Age / Birth Order (for Ḥabwah):"}
                        </label>
                        <input
                          type="number"
                          value={child.birthOrderOrAge ?? 20}
                          onChange={(e) =>
                            updateChild(child.id, {
                              birthOrderOrAge: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full sacred-input px-2.5 py-1.5 text-xs font-mono font-bold"
                          placeholder="e.g. 28"
                        />
                      </div>
                    </div>

                    {/* DECEASED CHILD: BRANCH EXPANDER FOR GRANDCHILDREN (TANZĪL) */}
                    {!child.isAlive && (
                      <div className="mt-4 pt-4 border-t border-dashed border-amber-300 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Baby className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-[#172e22] dark:text-amber-200">
                              {child.gender === "MALE"
                                ? (isUr ? `مرحوم بیٹے (${child.name}) کی اولاد — پوتے اور پوتیاں:` : `Children of deceased son (${child.name}) — Potay & Potiyaan:`)
                                : (isUr ? `مرحومہ بیٹی (${child.name}) کی اولاد — نواسے اور نواسیاں:` : `Children of deceased daughter (${child.name}) — Nawasay & Nawasiyaan:`)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                addGrandchild(child.id, {
                                  gender: "MALE",
                                  name: child.gender === "MALE" ? (isUr ? "پوتا" : "Pota") : (isUr ? "نواسہ" : "Nawasa"),
                                })
                              }
                              className="px-2.5 py-1 rounded bg-sky-100 hover:bg-sky-200 text-sky-800 text-[11px] font-bold transition-all"
                            >
                              + {child.gender === "MALE" ? (isUr ? "پوتا" : "Pota (Male)") : (isUr ? "نواسہ" : "Nawasa (Male)")}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                addGrandchild(child.id, {
                                  gender: "FEMALE",
                                  name: child.gender === "MALE" ? (isUr ? "پوتی" : "Poti") : (isUr ? "نواسی" : "Nawasi"),
                                })
                              }
                              className="px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 text-[11px] font-bold transition-all"
                            >
                              + {child.gender === "MALE" ? (isUr ? "پوتی" : "Poti (Female)") : (isUr ? "نواسی" : "Nawasi (Female)")}
                            </button>
                          </div>
                        </div>

                        {/* PROXIMITY SHIELD OR TANZIL BANNER */}
                        {hasOtherLivingDirectChild ? (
                          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="flex items-start gap-2">
                              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-red-800 dark:text-red-300 block">
                                  {isUr ? "قاعدۂ اقربیت فعال (الأقرب يمنع الأبعد):" : "Golden Proximity Rule Active:"}
                                </span>
                                <span className="text-[11px] text-red-700 dark:text-red-400">
                                  {isUr
                                    ? "چونکہ متوفی کی حقیقی صلبی اولاد زندہ موجود ہے، اس لیے تمام پوتے اور نواسے شرعاً وراثت سے مکمل محروم ہیں (حجبِ حرمان)۔"
                                    : "Living direct child excludes grandchildren from statutory inheritance under Ja'fari law."}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setActiveView("visuals")}
                              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shrink-0 self-start sm:self-center shadow-xs"
                            >
                              {isUr ? "۱/۳ وصیت سے تحفظ دیں" : "Protect with 1/3 Waṣiyyah"}
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2 text-xs">
                            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                              {isUr
                                ? "قاعدۂ تنزیل فعال: چونکہ متوفی کی تمام صلبی اولاد فوت ہو چکی ہے، اس لیے پوتے اور نواسے اپنے مرحوم والدین کے قائم مقام بن کر وارث بن رہے ہیں۔"
                                : "Tanzīl Active: Grandchildren inherit by representation of their deceased parents."}
                            </span>
                          </div>
                        )}

                        {/* Grandchildren List */}
                        {(child.children && child.children.length > 0) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {child.children.map((gc) => (
                              <div
                                key={gc.id}
                                className="p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-between text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-[var(--theme-text-primary)]">
                                    {gc.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">
                                    ({gc.gender === "MALE" ? (isUr ? "مرد" : "M") : (isUr ? "عورت" : "F")})
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeGrandchild(child.id, gc.id)}
                                  className="text-red-400 hover:text-red-600 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mother Sibling Blocking Check (Ḥujub al-Nuqṣān) */}
        {heirs.motherAlive && (
          <div className="p-4 rounded-xl bg-[var(--theme-bg)]/80 border border-[var(--theme-border)] text-sm space-y-2.5">
            <span className="font-bold text-[var(--theme-gold)] block">
              {t.motherBlockingCheck} (حجب النقصان):
            </span>
            <p className="text-[var(--theme-text-muted)] leading-relaxed">
              {language === "ur"
                ? "اگر والد زندہ ہوں اور متوفی کے 2 بھائی، یا 1 بھائی اور 2 بہنیں، یا 4 بہنیں (سگے یا علاتی) ہوں، تو ماں کا حصہ 1/3 سے گھٹ کر 1/6 ہو جاتا ہے اور وہ رد کے زائد مال سے مستثنیٰ رہتی ہے۔"
                : "If father is alive and deceased has 2+ brothers, or 1 brother and 2 sisters, or 4 sisters, the mother drops from 1/3 to 1/6 and does not participate in Radd."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.motherBrothersCount}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.motherBlockingBrothers || 0}
                  onChange={(e) =>
                    updateHeirs({
                      motherBlockingBrothers: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full sacred-input px-3 py-2 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.motherSistersCount}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.motherBlockingSisters || 0}
                  onChange={(e) =>
                    updateHeirs({
                      motherBlockingSisters: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full sacred-input px-3 py-2 font-mono text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Tier 2 (Grandparents & Siblings) */}
      <div
        className={`p-6 rounded-2xl sacred-card transition-all ${
          hasTier1Heir ? "opacity-60 border-red-500/40" : "border-[var(--theme-border)]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3 mb-4">
          <div className="flex items-center gap-2">
            {hasTier1Heir ? (
              <Lock className="w-5 h-5 text-amber-500" />
            ) : (
              <Unlock className="w-5 h-5 text-[var(--theme-gold)]" />
            )}
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier2Heading}
            </h3>
          </div>
          <span className="text-sm font-mono text-[var(--theme-text-muted)]">
            الطبقة الثانية
          </span>
        </div>

        {hasTier1Heir ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fef2f2] border-2 border-[#ef4444]/60 text-sm flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#dc2626] mt-0.5" />
            <div>
              <span className="font-bold text-sm sm:text-base text-[#991b1b] block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5 leading-relaxed text-[#7f1d1d] font-medium">{t.tier2Locked}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-sm p-3 rounded-xl sacred-card cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.paternalGrandfatherAlive}
                  onChange={(e) =>
                    updateHeirs({ paternalGrandfatherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.paternalGrandfather}</span>
              </label>

              <label className="flex items-center gap-2 text-sm p-3 rounded-xl sacred-card cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.paternalGrandmotherAlive}
                  onChange={(e) =>
                    updateHeirs({ paternalGrandmotherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.paternalGrandmother}</span>
              </label>

              <label className="flex items-center gap-2 text-sm p-3 rounded-xl sacred-card cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.maternalGrandfatherAlive}
                  onChange={(e) =>
                    updateHeirs({ maternalGrandfatherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.maternalGrandfather}</span>
              </label>

              <label className="flex items-center gap-2 text-sm p-3 rounded-xl sacred-card cursor-pointer">
                <input
                  type="checkbox"
                  checked={heirs.maternalGrandmotherAlive}
                  onChange={(e) =>
                    updateHeirs({ maternalGrandmotherAlive: e.target.checked })
                  }
                  className="rounded text-[var(--theme-gold)]"
                />
                <span>{t.maternalGrandmother}</span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.fullBrothers}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.fullBrothersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ fullBrothersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full sacred-input px-3 py-2 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.fullSisters}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.fullSistersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ fullSistersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full sacred-input px-3 py-2 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                  {t.uterineBrothers}
                </label>
                <input
                  type="number"
                  min="0"
                  value={heirs.uterineBrothersCount || 0}
                  onChange={(e) =>
                    updateHeirs({ uterineBrothersCount: parseInt(e.target.value) || 0 })
                  }
                  className="w-full sacred-input px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Tier 3 (Uncles & Aunts) */}
      <div
        className={`p-6 rounded-2xl sacred-card transition-all ${
          hasTier1Heir || hasTier2Heir
            ? "opacity-60 border-red-500/40"
            : "border-[var(--theme-border)]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3 mb-4">
          <div className="flex items-center gap-2">
            {hasTier1Heir || hasTier2Heir ? (
              <Lock className="w-5 h-5 text-amber-500" />
            ) : (
              <Unlock className="w-5 h-5 text-[var(--theme-gold)]" />
            )}
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--theme-gold)]">
              {t.tier3Heading}
            </h3>
          </div>
          <span className="text-sm font-mono text-[var(--theme-text-muted)]">
            الطبقة الثالثة
          </span>
        </div>

        {hasTier1Heir || hasTier2Heir ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fef2f2] border-2 border-[#ef4444]/60 text-sm flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#dc2626] mt-0.5" />
            <div>
              <span className="font-bold text-sm sm:text-base text-[#991b1b] block">
                {language === "ur" ? "حجبِ حرمان کا نفاذ:" : "Blocked by Ḥujub al-Ḥirmān:"}
              </span>
              <p className="mt-0.5 leading-relaxed text-[#7f1d1d] font-medium">{t.tier3Locked}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalUncles}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalUnclesCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalUnclesCount: parseInt(e.target.value) || 0 })
                }
                className="w-full sacred-input px-3 py-2 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalAunts}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalAuntsCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalAuntsCount: parseInt(e.target.value) || 0 })
                }
                className="w-full sacred-input px-3 py-2 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.maternalUncles}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.maternalUnclesCount || 0}
                onChange={(e) =>
                  updateHeirs({ maternalUnclesCount: parseInt(e.target.value) || 0 })
                }
                className="w-full sacred-input px-3 py-2 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--theme-text-secondary)] mb-1">
                {t.paternalCousins}
              </label>
              <input
                type="number"
                min="0"
                value={heirs.paternalCousinsCount || 0}
                onChange={(e) =>
                  updateHeirs({ paternalCousinsCount: parseInt(e.target.value) || 0 })
                }
                className="w-full sacred-input px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
