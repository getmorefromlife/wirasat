"use client";

import React, { useState } from "react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { TRANSLATIONS } from "@/lib/translations";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { PersonNode, BranchCalculationResult } from "@/types/fiqh";
import { EstatePlanningStudio } from "@/components/visuals/EstatePlanningStudio";
import { KinshipGalaxy } from "@/components/visuals/KinshipGalaxy";
import { SimpleDistributionInfographic } from "@/components/wizard/SimpleDistributionInfographic";
import { KinshipWhiteboard } from "@/components/visuals/KinshipWhiteboard";
import { WasiyyahLink } from "@/components/wasiyyah/WasiyyahLink";
import {
  GitFork,
  Disc,
  Columns,
  Workflow,
  LayoutGrid,
  Radio,
  GitCommit,
  PieChart,
  Split,
  Clock,
  TableProperties,
  BookOpen,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
  UserCheck,
  UserX,
  Scale,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Info,
  Check,
  RefreshCw,
  RotateCcw,
  Crown,
} from "lucide-react";

export type VisualParadigmId =
  | "tree_tanzil"
  | "rings"
  | "lanes"
  | "sankey_flow"
  | "cards"
  | "radial"
  | "decision_path"
  | "share_wheel"
  | "snapshots"
  | "timeline"
  | "matrix_grid"
  | "story_mode"
  | "kinship_galaxy"
  | "simple_infographic"
  | "kinship_whiteboard";

interface ParadigmMeta {
  id: VisualParadigmId;
  number: number;
  titleEn: string;
  titleUr: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  categoryEn: string;
  categoryUr: string;
  categoryKey: "ALL" | "MONEY" | "LINEAGE" | "PRIORITY" | "LEGAL";
  descEn: string;
  descUr: string;
  benefitEn: string;
  benefitUr: string;
  fiqhInsightEn: string;
  fiqhInsightUr: string;
  integrationBadgeEn: string;
  integrationBadgeUr: string;
}

export const PARADIGMS: ParadigmMeta[] = [
  {
    id: "sankey_flow",
    number: 1,
    titleEn: "Estate-Flow Pipeline",
    titleUr: "بہاؤ ترکہ و مالی پائپ لائن",
    icon: Workflow,
    categoryEn: "Balance Sheet & Money",
    categoryUr: "میزان ترکہ و رقوم",
    categoryKey: "MONEY",
    descEn: "Strict Qur'anic deduction pipeline: Gross Estate → Kafn → Debts → Wasiyyah (1/3 check) → Distributable Blood Shares.",
    descUr: "قرآنی و فقہی اخراجات کا تسلسل: کل ترکہ ← کفن و تدفین ← دیون ← وصیت (تہائی حد) ← تقسیمِ ورثاء۔",
    benefitEn: "Best for tracking every rupee/dollar from Gross Estate down to burial, debts, and final blood shares.",
    benefitUr: "مالی تنازعات کا خاتمہ: کل ترکے سے کفن، قرض، اور وصیت کی کٹوتی کے بعد تقسیم کا مرحلہ وار مالی بہاؤ۔",
    fiqhInsightEn: "Mandated by Qur'an 4:11: 'After payment of any legacy and after debt' (مِنۢ بَعۡدِ وَصِیَّةࣲ یُوصِی بِهَاۤ أَوۡ دَیۡنٍ). Debt clearance strictly precedes blood share division.",
    fiqhInsightUr: "قرآنی فرمان (نساء: ۱۱): ترکے کی تقسیم سے پہلے میت کے تمام واجبات و قرض اور ثلثِ وصیت کی ادائیگی شرعاً واجب اور مقدم ہے۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "tree_tanzil",
    number: 2,
    titleEn: "Living Tree & Tanzīl",
    titleUr: "شجرۂ حیات و تنزیل",
    icon: GitFork,
    categoryEn: "Kinship & Lineage",
    categoryUr: "نسب و قرابت",
    categoryKey: "LINEAGE",
    descEn: "Generational tree highlighting named grandchildren inheriting by representation (Tanzīl) or excluded by proximity.",
    descUr: "نسل در نسل شجرہ جو پوتوں، پوتیوں، نواسوں اور نواسیوں کی بقائم مقامی (تنزیل) یا محرومی کی وضاحت کرتا ہے۔",
    benefitEn: "Best for resolving orphaned grandchildren: clearly shows if they inherit via representation or are blocked by living aunts/uncles.",
    benefitUr: "یتیم پوتوں اور نواسوں کے حق کی وضاحت: واضح کرتا ہے کہ وہ کب بقائم مقامی (تنزیل) وارث بنتے ہیں اور کب چچا/پھوپھی کے سبب محجوب ہوتے ہیں۔",
    fiqhInsightEn: "Under Ja'fari jurisprudence, grandchildren step into the exact standing of their deceased parent (Qur'an 4:11) via Tanzīl, provided no closer direct child survives.",
    fiqhInsightUr: "اہلِ بیت (ع) کا فقہی اصول: قریبی اولاد نہ ہونے کی صورت میں پوتے پوتیاں اپنے متوفی والدین کے قائم مقام بن کر ان کا پورا قرآنی حصہ پاتے ہیں۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "share_wheel",
    number: 3,
    titleEn: "Family Tree + Share Wheel",
    titleUr: "شجرۂ نسب و چرخۂ حصص",
    icon: PieChart,
    categoryEn: "Proportional Geometry",
    categoryUr: "تناسبی ہندسہ",
    categoryKey: "MONEY",
    descEn: "Synchronized dual-view linking heir nodes to a dynamic donut distribution wheel with slice hover highlights.",
    descUr: "شجرۂ نسب اور دائروی پائی چارٹ کا ہم آہنگ منظر، جہاں ہر وارث کا قرآنی حصہ نمایاں ہے۔",
    benefitEn: "Best for visual balance: hovering any slice illuminates that heir's lineage on the tree and displays their exact share.",
    benefitUr: "تناسبی موازنہ: کسی بھی حصے پر ماؤس لے جانے سے متعلقہ وارث اور اس کی قرابت نمایاں ہو جاتی ہے۔",
    fiqhInsightEn: "Demonstrates that the sum of all divine shares and Radd surplus totals exactly 100%, without the invalid Sunni reduction of 'Awl.",
    fiqhInsightUr: "بطلانِ عول کا ثبوت: تمام ورثاء کے حصص اور رد کا مجموعہ مل کر مکمل ۱۰۰ فیصد بنتا ہے، کسی کے قرآنی حصے میں کٹوتی نہیں ہوتی۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "rings",
    number: 4,
    titleEn: "Concentric Family Rings",
    titleUr: "مرکزی خاندانی دائرے",
    icon: Disc,
    categoryEn: "Proximity & Priority",
    categoryUr: "قربت و اولویت",
    categoryKey: "PRIORITY",
    descEn: "Radial proximity orbits radiating outward from the deceased, demonstrating priority tiers and generational blocking.",
    descUr: "میت کے گرد دائرہ نما طبقات جو قرابت کے مدارج اور حجبِ حرمان کی واضح عکاسی کرتے ہیں۔",
    benefitEn: "Best for understanding blocking: provides geometric proof of how the inner family ring shields the estate from outer relatives.",
    benefitUr: "قرابت کے مدارج کا ہندسی ثبوت: دکھاتا ہے کہ اندرونی حلقے (اولاد و والدین) بیرونی حلقوں (بھائیوں اور چچاؤں) کو کیسے مکمل طور پر روکتے ہیں۔",
    fiqhInsightEn: "Surah Al-Ahzab (33:6) establishes that blood relatives are prioritized by closeness ('al-Aqrab Yamna' al-Ab'ad').",
    fiqhInsightUr: "سورۂ احزاب (۳۳:۶): «وَأُوْلُواْ ٱلۡأَرۡحَامِ بَعۡضُهُمۡ أَوۡلَىٰ بِبَعۡضٍ» — قریبی دائرے دور کے رشتہ داروں کو مکمل محجوب کر دیتے ہیں۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "lanes",
    number: 5,
    titleEn: "Color-Coded Tier Lanes",
    titleUr: "طبقاتی راستے (سوئم لینز)",
    icon: Columns,
    categoryEn: "Statutory Classes",
    categoryUr: "فقہی طبقات",
    categoryKey: "PRIORITY",
    descEn: "Distinct horizontal lanes dividing heirs across Spouse, Tier 1, Tier 2, and Tier 3 with live eligibility indicators.",
    descUr: "چار فقہی راستے (زوجیت، طبقہ اول، طبقہ دوم، طبقہ سوم) جو اہل اور محروم وارثین کو الگ ظاہر کرتے ہیں۔",
    benefitEn: "Best for seeing active vs locked classes: clearly shows which tier is currently inheriting and which tiers are locked.",
    benefitUr: "چاروں طبقات کی تقسیم: فوری طور پر بتاتا ہے کہ کون سا طبقہ ترکہ پانے کا حقدار ہے اور کن طبقات پر شرعی تالا لگ چکا ہے۔",
    fiqhInsightEn: "Under Surah Al-Anfal (8:75), a single heir in Class 1 completely exhausts the estate before Class 2 (siblings) can inherit.",
    fiqhInsightUr: "سورۂ انفال (۸:۷۵): طبقہ اول کا کوئی بھی وارث طبقہ دوم اور سوم کے تمام افراد کے لیے حجبِ حرمان بن جاتا ہے۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "decision_path",
    number: 6,
    titleEn: "Decision-Path Flowchart",
    titleUr: "فقہی فیصلے کا راستہ",
    icon: GitCommit,
    categoryEn: "Algorithmic Logic",
    categoryUr: "فقہی استدلال",
    categoryKey: "LEGAL",
    descEn: "Step-by-step logic tree tracing how the fiqh engine resolved exclusion, Hajb, and final fractional shares.",
    descUr: "قدم بہ قدم فقہی استدلال کا فلو چارٹ جو بتاتا ہے کہ کون کیونکر وارث بنا یا محروم ہوا۔",
    benefitEn: "Best for legal auditing: traces the exact computational logic and questions the engine checked to arrive at every fraction.",
    benefitUr: "وکلاء اور علماء کے لیے مکمل شرعی آڈٹ: مراجعِ عظام کے فتاویٰ کی کڑی در کڑی حسابی تصدیق۔",
    fiqhInsightEn: "Provides full legal auditability conforming to the authoritative verdicts of Sistani, Khamenei, Khoei, Makarem, and Najafi.",
    fiqhInsightUr: "فقہی استدلال کا ریاضیاتی فلو چارٹ: مرحلہ وار فیصلے جو بتاتے ہیں کہ سسٹم نے کس بنیاد پر محرومی اور حصص کا تعین کیا۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "matrix_grid",
    number: 7,
    titleEn: "Inheritance Matrix Grid",
    titleUr: "جامع جدولِ وراثت",
    icon: TableProperties,
    categoryEn: "Institutional Audit",
    categoryUr: "جامع آڈٹ ٹیبل",
    categoryKey: "LEGAL",
    descEn: "High-density spreadsheet listing every relative, Qur'anic base fraction, Radd surplus, decimal, and proof citation.",
    descUr: "ایک تفصیلی جدول جس میں ہر وارث کا فرض، رد، اعشاری تناسب، نقد رقم اور فقہی حوالہ درج ہے۔",
    benefitEn: "Best for documentation: provides a clean, institutional tabular record ideal for official family settlement agreements.",
    benefitUr: "عدالتی و شرعی ریکارڈ اور فیملی صلح نامے کے لیے موزوں ترین تفصیلی دفتری دستاویز۔",
    fiqhInsightEn: "Every heir's share is broken down into their Farḍ (Qur'anic base fraction) and Radd (proportional return of residue).",
    fiqhInsightUr: "جامع دفتری چارٹ: ہر وارث کا قرآنی فرض، رد، اعشاری تناسب، خالص نقد رقم اور فقہی حوالہ ایک نظر میں۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "cards",
    number: 8,
    titleEn: "Household Cards",
    titleUr: "گھریلو وارث کارڈز",
    icon: LayoutGrid,
    categoryEn: "Direct Controls",
    categoryUr: "براہ راست کنٹرول",
    categoryKey: "LINEAGE",
    descEn: "Modular cards with direct survival toggles, impediment badges (Qatl, Kufr), and individual share breakdowns.",
    descUr: "انفرادی وارث کارڈز جن میں حیات، قتل یا کفر کے موانع اور رقم کے فوری حساب کی سہولت موجود ہے۔",
    benefitEn: "Best for quick interactive toggling: test what happens if an heir passes away or has a religious impediment.",
    benefitUr: "وارثین کا انفرادی جائزہ: فوری حیات و موت کے بٹن، قتل و کفر کے موانع اور ہر وارث کی نقد رقم کا براہ راست کنٹرول۔",
    fiqhInsightEn: "Impediments (Mawani' al-Irth) such as intentional homicide (Qatl) remove an heir completely without blocking other heirs.",
    fiqhInsightUr: "موانعِ ارث: قتلِ عمد اور کفر وارث کو مکمل محروم کر دیتے ہیں اور وہ دیگر ورثاء کے حصص کے لیے رکاوٹ بھی نہیں بنتا۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "radial",
    number: 9,
    titleEn: "Radial Kinship Map",
    titleUr: "شعاعی قرابتی نقشہ",
    icon: Radio,
    categoryEn: "Orbital Network",
    categoryUr: "مداری رابطہ",
    categoryKey: "LINEAGE",
    descEn: "Orbital constellation graph connecting all family branches to the central deceased hub.",
    descUr: "میت کو مرکز مان کر تمام شاخوں کے مابین کھنچے ہوئے قرابتی تعلقات کا شعاعی خاکہ۔",
    benefitEn: "Best for large extended families: maps maternal, paternal, and spousal branches radiating from the deceased.",
    benefitUr: "پیچیدہ خاندانی شاخوں کا شعاعی خاکہ: میت کے گرد مادری، پدری اور ازدواجی رشتوں کے نیٹ ورک کا خوبصورت موازنہ۔",
    fiqhInsightEn: "Contrasts maternal equal sharing (1:1) with paternal male-female proportion (2:1).",
    fiqhInsightUr: "مادری رشتہ داروں میں مرد و زن کی برابری (۱:۱) اور پدری رشتہ داروں میں ۲:۱ کے تناسب کا واضح فرق۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "snapshots",
    number: 10,
    titleEn: "Estate Planning 'What-If' Studio",
    titleUr: "شرعی منصوبہ بندی (وصیت و ہبۂ حیات اسٹوڈیو)",
    icon: Split,
    categoryEn: "Scenario Simulations",
    categoryUr: "مفروضہ مناظر و تخمینہ کار",
    categoryKey: "MONEY",
    descEn: "Interactive sandbox comparing statutory baseline vs 1/3rd Wasiyyah vs uncapped lifetime gift (Hibah) with live delta diffs.",
    descUr: "متحرک تخمینہ کار جہاں شریعتِ خالص، ثلثِ وصیت اور ہبۂ حیات کا باہمی موازنہ اور نفع و نقصان دیکھا جا سکتا ہے۔",
    benefitEn: "Best for estate planning: shows how a 1/3rd Wasiyyah or Lifetime Gift (Hibah) can protect spouses or excluded grandchildren.",
    benefitUr: "شرعی وصیت بمقابلہ ہبۂ حیات کا نفع و نقصان: موازنہ کرتا ہے کہ گفٹ کرنے یا وصیت لکھنے سے پوتوں یا بیوی کو کیا فائدہ پہنچتا ہے۔",
    fiqhInsightEn: "A Wasiyyah is restricted to 1/3 of the net estate; gifts during sound health (Hibat al-Hayat) have no monetary cap.",
    fiqhInsightUr: "وصیت صرف ایک تہائی (۱/۳) مال تک محدود رہتی ہے، جبکہ زندگی میں ہبہ کرنے پر شریعت میں مال کی کوئی حد مقرر نہیں۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "timeline",
    number: 11,
    titleEn: "Estate Legal Timeline",
    titleUr: "قانونی مراحل کا خطِ زمانی",
    icon: Clock,
    categoryEn: "Chronology of Law",
    categoryUr: "ترتیبِ احکام",
    categoryKey: "MONEY",
    descEn: "Sequential legal timeline: Death → Tajhīz → Debt Clearance → Wasiyyah → Class Resolution → Distribution.",
    descUr: "احکامِ ترکہ کی زمانی ترتیب: انتقال ← تجہیز و تکفین ← ادائیگیِ دیون ← نفاذِ وصیت ← تعینِ طبقات ← تقسیم۔",
    benefitEn: "Best for executors (Wasi): step-by-step checklist ensuring debts and burial costs are cleared before property is divided.",
    benefitUr: "وصی کے لیے ضروری رہنمائی: ورثاء میں جائیداد بانٹنے سے پہلے میت کے قرضے اور کفن دفن کے اخراجات نمٹانا لازمی ہے۔",
    fiqhInsightEn: "Qur'an 4:11 gives strict priority to settling debts before distributing any share to sons, daughters, or spouses.",
    fiqhInsightUr: "ترکے کے نفاذ کی شرعی و زمانی ترتیب: وفات ← تجہیز و تدفین ← قرض کی ادائیگی ← وصیت کا نفاذ ← طبقات کا تعین ← تقسیم۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "story_mode",
    number: 12,
    titleEn: "Guided Narrative Story",
    titleUr: "روایتی بیانیہ داستان",
    icon: BookOpen,
    categoryEn: "Human Explanation",
    categoryUr: "سلیس بیانیہ",
    categoryKey: "LEGAL",
    descEn: "Editorial walkthrough explaining the family's estate case in warm, plain language with divine justice rationale.",
    descUr: "سادہ، سلیس اور دلنشین زبان میں خاندان کے ترکے کی مکمل داستان، بلا کسی پیچیدہ اصطلاح کے۔",
    benefitEn: "Best for family elders: explains the final inheritance division in warm, respectful, narrative language.",
    benefitUr: "پیچیدہ فقہی فارمولوں کا سلیس و دلنشین کہانی میں ترجمہ: عام فہم خاندانوں اور بزرگوں کے سمجھنے کے لیے آسان بیانیہ۔",
    fiqhInsightEn: "Fosters family harmony by explaining the divine rationale of fairness behind every relative's share.",
    fiqhInsightUr: "شریعتِ الٰہی کے عدل و انصاف کی سادہ لفظوں میں وضاحت، تاکہ خاندان میں باہمی محبت برقرار رہے۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "simple_infographic",
    number: 13,
    titleEn: "At-A-Glance Visual Infographic & Pocket Calculator",
    titleUr: "ایک تصویری آسان خلاصہ و جیبی کیلکولیٹر",
    icon: Sparkles,
    categoryEn: "Instant Simplicity",
    categoryUr: "انتہائی آسان فہم خلاصہ",
    categoryKey: "MONEY",
    descEn: "One-picture visual summary for everyday people without math complexity, plus interactive live pocket cash calculator.",
    descUr: "عام فہم افراد کے لیے ایک تصویری خلاصہ، بغیر کسی الجھاؤ کے، مع متحرک جیبی کیش کیلکولیٹر۔",
    benefitEn: "Best for mobile & sharing: clean single-image summary ready for instant WhatsApp sharing or quick screenshots.",
    benefitUr: "واٹس ایپ شیئرنگ اور فوری سکرین شاٹ کے لیے ایک تصویری آسان خلاصہ، مع جیبی کیش کیلکولیٹر۔",
    fiqhInsightEn: "Distills the final legal result into a simple, beautiful graphic for everyday heirs without mathematical background.",
    fiqhInsightUr: "بغیر کسی الجھاؤ کے ہر وارث کے ہاتھ میں آنے والی رقم کی فوری تصویری جھلک۔",
    integrationBadgeEn: "🟢 Live Engine Synced",
    integrationBadgeUr: "🟢 لائیو انجن سے مربوط",
  },
  {
    id: "kinship_whiteboard",
    number: 14,
    titleEn: "Kinship Whiteboard Studio",
    titleUr: "اسٹوڈیو کنبہ وائٹ بورڈ",
    icon: Workflow,
    categoryEn: "Generative Sandbox Canvas",
    categoryUr: "تَخْطِيطُ الْعَائِلَة — متحرک کینوس",
    categoryKey: "LINEAGE",
    descEn: "Figma/Miro-style interactive kinship canvas. Add family nodes with '+' handles, simulate predeceased children, and test catastrophic accidents.",
    descUr: "فگما اسٹائل متحرک کنبہ کینوس۔ پلس بٹن سے نئے رشتہ دار جوڑیں، متوفی اولاد کی تنزیل دیکھیں اور الغرقیٰ و الھدمیٰ کا تخمینہ لگائیں۔",
    benefitEn: "Best for exploratory diagramming: drag, connect, add custom family members freely with dual-direction calculator sync.",
    benefitUr: "فگما اسٹائل متحرک کنبہ کینوس: آزادی کے ساتھ شجرہ بنائیں، نئے رشتے جوڑیں اور الغرقیٰ و الھدمیٰ کا لائیو تخمینہ لگائیں۔",
    fiqhInsightEn: "Two-way synced with the Main Calculator: sketch any family and click 'Push to Calc' or 'Pull from Calc' effortlessly.",
    fiqhInsightUr: "کیلکولیٹر سے مکمل طور پر جڑا ہوا: یہاں بنایا گیا کوئی بھی خاندانی نقشہ ایک کلک سے کیلکولیٹر میں منتقل ہو جاتا ہے۔",
    integrationBadgeEn: "🔄 2-Way Synced Canvas",
    integrationBadgeUr: "🔄 دو طرفہ مربوط کینوس",
  },
  {
    id: "kinship_galaxy",
    number: 15,
    titleEn: "The Kinship Galaxy",
    titleUr: "فلکِ قرابت و بطلانِ اوہام",
    icon: Sparkles,
    categoryEn: "Subcontinent Myth-Shatterer",
    categoryUr: "بطلانِ اوہام و رسومات",
    categoryKey: "PRIORITY",
    descEn: "Interactive celestial matrix shattering subcontinent customary myths (uncles vs daughters, in-laws, maternal parity).",
    descUr: "برصغیر کے خاندانی اوہام (چچاؤں کا دعویٰ، سسرال کا دخل، میکے کی محرومی) کا فلکیاتی و بصری ابطال۔",
    benefitEn: "Best for busting cultural myths: demonstrates in 3D how daughters completely bar uncles from receiving anything.",
    benefitUr: "برصغیر کے خاندانی اوہام کا فلکیاتی و بصری ابطال: چچاؤں کا بیٹیوں کی جائیداد پر دعویٰ اور متبنیٰ (لے پالک) کے غلط تصورات کا خاتمہ۔",
    fiqhInsightEn: "Shatters non-Islamic traditions by visually proving that daughters inherit 100% of the residue through divine Radd.",
    fiqhInsightUr: "رسم و رواج کا خاتمہ: قرآن کی رو سے بیٹیاں تمام ترکے کی وارث ہیں اور چچا یا تایا کا کوئی حق نہیں بنتا۔",
    integrationBadgeEn: "✨ 3D Educational Galaxy",
    integrationBadgeUr: "✨ ۳ ڈی تعلیمی رصدگاہ",
  },
];

const PARADIGM_THEMES: Record<
  VisualParadigmId,
  {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    iconColor: string;
  }
> = {
  // Family 1: Kinship & Lineage (Sage / Celadon)
  tree_tanzil: {
    bg: "bg-[#f4f7f2] dark:bg-[#13281e]",
    border: "border-[#cad9c5] dark:border-[#224434]",
    badgeBg: "bg-[#e5eee2] dark:bg-[#1b3a2a]",
    badgeText: "text-[#2e4d3a] dark:text-emerald-300",
    iconColor: "text-[#2e5c3e] dark:text-emerald-400",
  },
  rings: {
    bg: "bg-[#f4f7f2] dark:bg-[#13281e]",
    border: "border-[#cad9c5] dark:border-[#224434]",
    badgeBg: "bg-[#e5eee2] dark:bg-[#1b3a2a]",
    badgeText: "text-[#2e4d3a] dark:text-emerald-300",
    iconColor: "text-[#2e5c3e] dark:text-emerald-400",
  },
  lanes: {
    bg: "bg-[#f4f7f2] dark:bg-[#13281e]",
    border: "border-[#cad9c5] dark:border-[#224434]",
    badgeBg: "bg-[#e5eee2] dark:bg-[#1b3a2a]",
    badgeText: "text-[#2e4d3a] dark:text-emerald-300",
    iconColor: "text-[#2e5c3e] dark:text-emerald-400",
  },
  radial: {
    bg: "bg-[#f4f7f2] dark:bg-[#13281e]",
    border: "border-[#cad9c5] dark:border-[#224434]",
    badgeBg: "bg-[#e5eee2] dark:bg-[#1b3a2a]",
    badgeText: "text-[#2e4d3a] dark:text-emerald-300",
    iconColor: "text-[#2e5c3e] dark:text-emerald-400",
  },

  // Family 2: Balance Sheet & Flow (Warm Amber Gold Alabaster)
  sankey_flow: {
    bg: "bg-[#faf6ee] dark:bg-[#251e14]",
    border: "border-[#eadebe] dark:border-[#40341e]",
    badgeBg: "bg-[#f2e7cc] dark:bg-[#3d3119]",
    badgeText: "text-[#694e1d] dark:text-amber-300",
    iconColor: "text-[#8a6825] dark:text-amber-400",
  },
  share_wheel: {
    bg: "bg-[#faf6ee] dark:bg-[#251e14]",
    border: "border-[#eadebe] dark:border-[#40341e]",
    badgeBg: "bg-[#f2e7cc] dark:bg-[#3d3119]",
    badgeText: "text-[#694e1d] dark:text-amber-300",
    iconColor: "text-[#8a6825] dark:text-amber-400",
  },
  snapshots: {
    bg: "bg-[#faf6ee] dark:bg-[#251e14]",
    border: "border-[#eadebe] dark:border-[#40341e]",
    badgeBg: "bg-[#f2e7cc] dark:bg-[#3d3119]",
    badgeText: "text-[#694e1d] dark:text-amber-300",
    iconColor: "text-[#8a6825] dark:text-amber-400",
  },
  timeline: {
    bg: "bg-[#faf6ee] dark:bg-[#251e14]",
    border: "border-[#eadebe] dark:border-[#40341e]",
    badgeBg: "bg-[#f2e7cc] dark:bg-[#3d3119]",
    badgeText: "text-[#694e1d] dark:text-amber-300",
    iconColor: "text-[#8a6825] dark:text-amber-400",
  },

  // Family 3: Jurisprudential Logic & Auditing (Scholarly Slate)
  cards: {
    bg: "bg-[#f3f5f8] dark:bg-[#14202c]",
    border: "border-[#cbd7e3] dark:border-[#233547]",
    badgeBg: "bg-[#e0e8f0] dark:bg-[#1b2b3a]",
    badgeText: "text-[#2d465e] dark:text-sky-300",
    iconColor: "text-[#2b4c6e] dark:text-sky-400",
  },
  decision_path: {
    bg: "bg-[#f3f5f8] dark:bg-[#14202c]",
    border: "border-[#cbd7e3] dark:border-[#233547]",
    badgeBg: "bg-[#e0e8f0] dark:bg-[#1b2b3a]",
    badgeText: "text-[#2d465e] dark:text-sky-300",
    iconColor: "text-[#2b4c6e] dark:text-sky-400",
  },
  matrix_grid: {
    bg: "bg-[#f3f5f8] dark:bg-[#14202c]",
    border: "border-[#cbd7e3] dark:border-[#233547]",
    badgeBg: "bg-[#e0e8f0] dark:bg-[#1b2b3a]",
    badgeText: "text-[#2d465e] dark:text-sky-300",
    iconColor: "text-[#2b4c6e] dark:text-sky-400",
  },

  // Family 4: Story, Galaxy & Everyday Simplicity (Warm Terracotta Rose Sand)
  story_mode: {
    bg: "bg-[#fbf4f2] dark:bg-[#281916]",
    border: "border-[#ebd3cd] dark:border-[#462923]",
    badgeBg: "bg-[#f5e1dc] dark:bg-[#3c221e]",
    badgeText: "text-[#703b30] dark:text-rose-300",
    iconColor: "text-[#8c493c] dark:text-rose-400",
  },
  kinship_galaxy: {
    bg: "bg-[#fbf4f2] dark:bg-[#281916]",
    border: "border-[#ebd3cd] dark:border-[#462923]",
    badgeBg: "bg-[#f5e1dc] dark:bg-[#3c221e]",
    badgeText: "text-[#703b30] dark:text-rose-300",
    iconColor: "text-[#8c493c] dark:text-rose-400",
  },
  simple_infographic: {
    bg: "bg-[#fbf4f2] dark:bg-[#281916]",
    border: "border-[#ebd3cd] dark:border-[#462923]",
    badgeBg: "bg-[#f5e1dc] dark:bg-[#3c221e]",
    badgeText: "text-[#703b30] dark:text-rose-300",
    iconColor: "text-[#8c493c] dark:text-rose-400",
  },
  kinship_whiteboard: {
    bg: "bg-[#f4f7f2] dark:bg-[#13281e]",
    border: "border-[#cad9c5] dark:border-[#224434]",
    badgeBg: "bg-[#e5eee2] dark:bg-[#1b3a2a]",
    badgeText: "text-[#2e4d3a] dark:text-emerald-300",
    iconColor: "text-[#245642] dark:text-emerald-400",
  },
};

export const VisualChartsStudio: React.FC = () => {
  const {
    language,
    deceased,
    assets,
    debts,
    heirs,
    getCalculationResult,
    toggleChildSurvival,
    toggleDaughterBranchRatio,
    openProvenance,
    activeVisualParadigm,
    setActiveVisualParadigm,
    resetAll,
    loadPreset,
  } = useInheritanceStore();

  const [activeParadigm, setActiveParadigmState] = useState<VisualParadigmId>(
    (activeVisualParadigm as VisualParadigmId) || "tree_tanzil"
  );

  React.useEffect(() => {
    if (activeVisualParadigm && activeVisualParadigm !== activeParadigm) {
      setActiveParadigmState(activeVisualParadigm as VisualParadigmId);
    }
  }, [activeVisualParadigm]);

  const setActiveParadigm = (id: VisualParadigmId) => {
    setActiveParadigmState(id);
    setActiveVisualParadigm(id);
  };
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "MONEY" | "LINEAGE" | "PRIORITY" | "LEGAL">("ALL");
  const [selectedRelativeId, setSelectedRelativeId] = useState<string>("child-1");

  const result = getCalculationResult();
  const isUr = language === "ur";
  const currency = deceased.currency || "PKR";

  const currentMeta = PARADIGMS.find((p) => p.id === activeParadigm) || PARADIGMS[0];
  const namedDescendants = heirs.namedDescendants || [];

  // Check living direct children
  const livingDirectChildren = namedDescendants.filter(
    (n) => (n.relation === "SON" || n.relation === "DAUGHTER") && n.isAlive
  );
  const isGrandchildrenExcluded = livingDirectChildren.length > 0;

  // Daughter branch ratio toggle state
  const daughterNode = namedDescendants.find((n) => n.relation === "DAUGHTER" && n.children && n.children.length > 0);
  const daughterBranchEqualRatio = !!daughterNode?.daughterBranchEqualRatio;

  const filteredParadigms =
    selectedCategory === "ALL"
      ? PARADIGMS
      : PARADIGMS.filter((p) => p.categoryKey === selectedCategory);

  const categoryTabs: { key: "ALL" | "MONEY" | "LINEAGE" | "PRIORITY" | "LEGAL"; labelEn: string; labelUr: string; count: number }[] = [
    { key: "ALL", labelEn: "All Views (15)", labelUr: "تمام ۱۵ ماڈلز", count: 15 },
    { key: "MONEY", labelEn: "Money & Balance", labelUr: "مالی بہاؤ و ترکہ", count: 5 },
    { key: "LINEAGE", labelEn: "Lineage & Tanzīl", labelUr: "شجرۂ نسب و تنزیل", count: 4 },
    { key: "PRIORITY", labelEn: "Class Priority", labelUr: "طبقات و حجب", count: 3 },
    { key: "LEGAL", labelEn: "Legal Proofs & Stories", labelUr: "فقہی دلائل و داستان", count: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Studio Header */}
      <div className="sacred-card p-6 md:p-8 rounded-3xl border border-[var(--theme-border-strong)] relative overflow-hidden bg-gradient-to-br from-[var(--theme-card)] via-[var(--theme-card)] to-[var(--theme-card-subtle)] shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-gold)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#edf3e7] text-[#245642] border border-[#a5b69d] flex items-center gap-1.5 shadow-2xs">
                <Sparkles size={13} className="text-[#245642]" />
                <span>{isUr ? "۱۵ جہتی بصری رصدگاہ و اسٹوڈیو" : "15-Paradigm Interactive Visual Observatory"}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#e8f0e0] text-[#1e4634] border border-[#b7c9a5]">
                {isUr ? "تنزیل و اقربیت انجن فعال" : "Tanzīl & Proximity Engine Active"}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#fef3c7] text-[#92400e] border border-[#fde68a] flex items-center gap-1">
                <Scale size={12} className="text-[#92400e]" />
                <span>{isUr ? "فقہی حکمت و تفصیلی وضاحت" : "With Fiqh Insight Dossier"}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cinzel text-[var(--theme-text-primary)] pt-1.5 pb-1">
              {isUr ? "شجرۂ تنزیل و ۱۵ جہتی بصری رصدگاہ" : "Mawārīth Visual Observatory & Tanzīl Studio"}
            </h1>

            <p className="text-sm md:text-base text-[var(--theme-text-secondary)] max-w-2xl leading-relaxed">
              {isUr
                ? "اہلِ بیت (ع) کے احکامِ وراثت کی تفہیم کے لیے ۱۵ جامع بصری خاکے، ہر خاکے کے نفع و مقصد اور قرآنی و فقہی دلیل کی تفصیلی وضاحت کے ساتھ۔"
                : "Explore Shia Islamic inheritance rules across 15 distinct interactive mathematical, genealogical, and legal perspectives — enriched with purpose explanations and divine jurisprudence insights."}
            </p>
          </div>

          {/* Quick Tanzil Interactive Test Toolbar */}
          <div className="bg-[#f9faf7] dark:bg-stone-900/80 p-5 rounded-2xl border border-[#d8e0d2] dark:border-stone-800 space-y-3.5 min-w-[340px] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#245642] dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale size={14} className="text-[#245642] dark:text-emerald-400" />
                {isUr ? "فوری تجرباتی کنٹرول (تنزیل)" : "Live Tanzīl Simulator Controls"}
              </span>
              <span
                className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full border shadow-2xs ${
                  isGrandchildrenExcluded
                    ? "bg-[#fff7ed] text-[#9a3412] border-[#fdba74]"
                    : "bg-[#f0fdf4] text-[#166534] border-[#86efac]"
                }`}
              >
                {isGrandchildrenExcluded
                  ? isUr
                    ? "پوتے محروم (اقربیت)"
                    : "Grandchildren Excluded (Proximity)"
                  : isUr
                  ? "تنزیل فعال (پوتے وارث)"
                  : "Tanzīl Active (Heirs via Representation)"}
              </span>
            </div>

            <div className="space-y-2">
              {/* Direct Child Living Toggle */}
              <button
                onClick={() => toggleChildSurvival("child-3")}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  isGrandchildrenExcluded
                    ? "bg-[#245642] text-white border border-[#1b3d30] shadow-sm hover:bg-[#1a4031]"
                    : "bg-white dark:bg-stone-900 border border-[#c5d0bb] dark:border-stone-700 text-[#243d32] dark:text-stone-200 hover:border-[#245642] shadow-2xs"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isGrandchildrenExcluded ? <UserCheck size={15} className="text-emerald-300" /> : <UserX size={15} className="text-stone-500" />}
                  <span className={isGrandchildrenExcluded ? "text-white font-extrabold" : "text-[#243d32] dark:text-stone-200"}>
                    {isUr ? "صلبی بیٹی (زینب) کی حیات:" : "Direct Child (Zaynab) Living:"}
                  </span>
                </div>
                <span className={`font-extrabold uppercase px-2 py-0.5 rounded text-[10px] ${
                  isGrandchildrenExcluded ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                }`}>
                  {isGrandchildrenExcluded ? (isUr ? "زندہ (پوتے محروم!)" : "ALIVE (Excludes Grandchildren)") : (isUr ? "مرحومہ (تنزیل فعال)" : "DECEASED (Tanzīl On)")}
                </span>
              </button>

              {/* Daughter's Branch 2:1 vs 1:1 Fatwa Toggle */}
              {daughterNode && (
                <button
                  onClick={() => toggleDaughterBranchRatio(daughterNode.id)}
                  className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white dark:bg-stone-900 border border-[#c5d0bb] dark:border-stone-700 text-[#243d32] dark:text-stone-200 hover:border-[#245642] flex items-center justify-between transition-all shadow-2xs cursor-pointer"
                >
                  <span className="truncate text-stone-700 dark:text-stone-300">
                    {isUr ? "نواسیوں میں تقسیم کا فتویٰ:" : "Daughter's Children Ratio Fatwa:"}
                  </span>
                  <span className="text-[#245642] dark:text-emerald-400 font-extrabold ml-2 flex-shrink-0 bg-[#eef4ea] dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-[#d2ded0] dark:border-emerald-800/40">
                    {daughterBranchEqualRatio
                      ? isUr ? "۱:۱ (مساوی، قدیم فتویٰ)" : "1:1 (Classical Equal)"
                      : isUr ? "۲:۱ (احوط وجوبی، سیستانی)" : "2:1 (Ahwat Wujubi, Sistani)"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="mt-8 pt-6 border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-[#245642] dark:text-emerald-300 uppercase tracking-wider mr-1">
              {isUr ? "زمرہ جات:" : "Filter Paradigms:"}
            </span>
            {categoryTabs.map((tab) => {
              const isTabActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isTabActive
                      ? "bg-[#245642] text-white shadow-xs ring-2 ring-[#245642]/30"
                      : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#245642] hover:text-[#245642]"
                  }`}
                >
                  <span>{isUr ? tab.labelUr : tab.labelEn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isTabActive ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick 1-Click Clean Slate Reset All */}
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-red-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer shadow-2xs"
            title={isUr ? "تمام ترکہ اور ورثاء کو صاف کر کے نیا کیس شروع کریں" : "Reset all data to zero and start fresh"}
          >
            <RotateCcw size={13} className="text-stone-500 hover:text-red-500 transition-colors" />
            <span>{isUr ? "تمام ڈیٹا ری سیٹ کریں" : "Reset All to Zero"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          OPTION A: MASTER-DETAIL DUAL-PANE STUDIO ("OBSERVATORY COCKPIT")
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Big Informative Cards (lg:col-span-5 xl:col-span-4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#245642] dark:text-emerald-400 uppercase tracking-wider">
                {isUr ? `بصری ماڈلز (${filteredParadigms.length})` : `Visual Models (${filteredParadigms.length})`}
              </span>
              <span className="text-[11px] text-stone-400">•</span>
              <span className="text-[11px] font-semibold text-stone-500">
                {isUr ? "وضاحت و افادیت کے ساتھ" : "With Benefits & Badges"}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">
              {isUr ? "منتخب کرنے کے لیے کلک کریں" : "Click to view"}
            </span>
          </div>

          {/* Scrollable list of big cards */}
          <div className="space-y-3 max-h-[920px] overflow-y-auto pr-1.5 scrollbar-thin">
            {filteredParadigms.map((p) => {
              const Icon = p.icon;
              const isSelected = activeParadigm === p.id;
              const theme = PARADIGM_THEMES[p.id];

              return (
                <div
                  key={p.id}
                  onClick={() => setActiveParadigm(p.id)}
                  className={`p-4 rounded-2xl border text-start transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#edf5eb] dark:bg-emerald-950/30 border-2 border-[#245642] dark:border-emerald-500 shadow-md ring-2 ring-[#245642]/15"
                      : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-[#245642]/60 hover:bg-stone-50/80 dark:hover:bg-stone-850 shadow-2xs"
                  }`}
                >
                  {/* Card Top Row: Number, Icon, Category, Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#245642] text-white shadow-2xs"
                            : `${theme.bg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                        #{p.number}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 truncate max-w-[110px]">
                        {isUr ? p.categoryUr : p.categoryEn}
                      </span>
                    </div>

                    {/* Integration Status Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        isSelected
                          ? "bg-[#245642] text-white border-[#1b3d30]"
                          : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40"
                      }`}
                    >
                      {isUr ? p.integrationBadgeUr : p.integrationBadgeEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold leading-tight ${
                      isUr
                        ? "font-nastaliq text-[17px] leading-[2.2] pb-0.5 text-stone-900 dark:text-stone-100"
                        : "text-sm sm:text-base font-cinzel text-stone-900 dark:text-stone-100"
                    }`}
                  >
                    {isUr ? p.titleUr : p.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {isUr ? p.descUr : p.descEn}
                  </p>

                  {/* Dedicated Benefit Callout Box ("✨ Best For / اہم افادیت") */}
                  <div
                    className={`mt-3 p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
                      isSelected
                        ? "bg-white/90 dark:bg-emerald-900/30 border-[#245642]/30 dark:border-emerald-700/40 text-stone-800 dark:text-emerald-100"
                        : "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/70 dark:border-amber-900/30 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <Sparkles size={14} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <span className="font-extrabold text-stone-900 dark:text-stone-100 mr-1">
                        {isUr ? "اہم افادیت:" : "Best For:"}
                      </span>
                      <span>{isUr ? p.benefitUr : p.benefitEn}</span>
                    </div>
                  </div>

                  {/* Selection Indicator Bar */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-[#245642]/20 dark:border-emerald-800/40 flex items-center justify-between text-[11px] font-bold text-[#245642] dark:text-emerald-300">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-[#245642] dark:text-emerald-400" />
                        {isUr ? "زیرِ مطالعہ خاکہ (فعال)" : "Currently Viewing"}
                      </span>
                      <ChevronRight size={14} className={isUr ? "rotate-180" : ""} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stage & Dossier (lg:col-span-7 xl:col-span-8) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Active Model Stage Canvas */}
          <div className="sacred-card p-6 md:p-8 rounded-3xl border border-[var(--theme-border)] relative bg-white dark:bg-stone-900 shadow-xs">
            {/* Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-6 border-b border-[var(--theme-border)] gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-[#edf3e7] dark:bg-emerald-950/40 border border-[#a5b69d] dark:border-emerald-800/40 flex items-center justify-center text-[#245642] dark:text-emerald-300 shadow-2xs shrink-0">
                  <currentMeta.icon size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-[#245642] dark:text-emerald-400">
                      {isUr ? `ماڈل نمبر ${currentMeta.number}` : `Model #${currentMeta.number}`}
                    </span>
                    <span className="text-xs text-stone-300 dark:text-stone-700">•</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
                      {isUr ? currentMeta.categoryUr : currentMeta.categoryEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                      {isUr ? currentMeta.integrationBadgeUr : currentMeta.integrationBadgeEn}
                    </span>
                  </div>
                  <h2
                    className={`font-bold text-[#172e22] dark:text-emerald-200 ${
                      isUr
                        ? "font-nastaliq text-2xl leading-[2.2]"
                        : "text-xl md:text-2xl font-cinzel pt-1 pb-0.5"
                    }`}
                  >
                    {isUr ? currentMeta.titleUr : currentMeta.titleEn}
                  </h2>
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 max-w-sm text-start lg:text-end font-medium leading-relaxed">
                {isUr ? currentMeta.descUr : currentMeta.descEn}
              </div>
            </div>

            {/* Dynamic Model Render (All 15 Views) */}
            <div className="min-h-[500px]">
              {activeParadigm === "tree_tanzil" && (
                <TreeTanzilView
                  heirs={heirs}
                  result={result}
                  isUr={isUr}
                  currency={currency}
                  deceased={deceased}
                  selectedId={selectedRelativeId}
                  onSelect={setSelectedRelativeId}
                  onToggleChild={toggleChildSurvival}
                  onToggleRatio={toggleDaughterBranchRatio}
                />
              )}

              {activeParadigm === "rings" && (
                <ConcentricRingsView result={result} isUr={isUr} currency={currency} heirs={heirs} />
              )}

              {activeParadigm === "lanes" && (
                <ColorCodedLanesView result={result} isUr={isUr} currency={currency} heirs={heirs} />
              )}

              {activeParadigm === "sankey_flow" && (
                <EstateFlowPipelineView result={result} isUr={isUr} currency={currency} debts={debts} assets={assets} />
              )}

              {activeParadigm === "cards" && (
                <HouseholdCardsView
                  result={result}
                  isUr={isUr}
                  currency={currency}
                  heirs={heirs}
                  onToggleChild={toggleChildSurvival}
                />
              )}

              {activeParadigm === "radial" && (
                <RadialKinshipView result={result} isUr={isUr} currency={currency} heirs={heirs} />
              )}

              {activeParadigm === "decision_path" && (
                <DecisionPathView result={result} isUr={isUr} currency={currency} heirs={heirs} openProvenance={openProvenance} />
              )}

              {activeParadigm === "share_wheel" && (
                <ShareWheelView result={result} isUr={isUr} currency={currency} heirs={heirs} loadPreset={loadPreset} />
              )}

              {activeParadigm === "snapshots" && (
                <EstatePlanningStudio result={result} isUr={isUr} currency={currency} heirs={heirs} />
              )}

              {activeParadigm === "timeline" && (
                <EstateTimelineView result={result} isUr={isUr} currency={currency} debts={debts} />
              )}

              {activeParadigm === "matrix_grid" && (
                <InheritanceMatrixGridView result={result} isUr={isUr} currency={currency} deceased={deceased} openProvenance={openProvenance} />
              )}

              {activeParadigm === "story_mode" && (
                <GuidedStoryView result={result} isUr={isUr} currency={currency} deceased={deceased} debts={debts} />
              )}

              {activeParadigm === "kinship_galaxy" && (
                <KinshipGalaxy />
              )}

              {activeParadigm === "simple_infographic" && (
                <SimpleDistributionInfographic calculationResult={result} />
              )}

              {activeParadigm === "kinship_whiteboard" && (
                <KinshipWhiteboard />
              )}
            </div>
          </div>

          {/* Fiqh Explanatory & Legal Insight Dossier */}
          <div className="sacred-card p-6 md:p-7 rounded-3xl border border-[#c5d0bb] dark:border-stone-700 bg-gradient-to-br from-[#fbfdfa] via-white to-[#f4f7f2] dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#245642] text-white flex items-center justify-center shadow-2xs shrink-0">
                  <Scale size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-cinzel">
                    {isUr ? "فقہی تجزیہ، شرعی حکمت و قرآنی اساس" : "Fiqh Explanatory & Legal Insight Dossier"}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {isUr
                      ? `نمونہ ${currentMeta.number} کے لیے شرعی اصول و مراجعِ عظام کی توثیق`
                      : `Authoritative Jurisprudential Guidance for Model #${currentMeta.number}`}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#edf3e7] dark:bg-emerald-950/40 text-[#245642] dark:text-emerald-300 border border-[#a5b69d] dark:border-emerald-800/40">
                {isUr ? currentMeta.categoryUr : currentMeta.categoryEn}
              </span>
            </div>

            {/* Fiqh Insight Content Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-2xs">
              <p
                className={`text-stone-800 dark:text-stone-200 leading-relaxed ${
                  isUr ? "font-nastaliq text-[16px] leading-[2.4]" : "text-sm"
                }`}
              >
                {isUr ? currentMeta.fiqhInsightUr : currentMeta.fiqhInsightEn}
              </p>
            </div>

            {/* Live Calculation Engine Sync Bar */}
            <div className="p-3.5 rounded-2xl bg-[#edf3e7]/80 dark:bg-emerald-950/20 border border-[#b7c9a5] dark:border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#1e4634] dark:text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>
                  {isUr
                    ? `لائیو انجن ڈیٹا: خالص ترکہ ${currency} ${(result?.balanceSheet?.netDistributableEstate || 0).toLocaleString()} اور تمام ورثاء کے حصص مکمل ہم آہنگ ہیں۔`
                    : `Live Engine Synced: Net distributable estate of ${currency} ${(result?.balanceSheet?.netDistributableEstate || 0).toLocaleString()} and heir fractions are 100% synchronized.`}
                </span>
              </div>

              <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 shrink-0">
                {isUr ? "حجب و تنزیل کا خودکار حساب" : "Real-time Hajb & Tanzīl"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   1. LIVING TREE & TANZĪL VIEW
   ========================================================================= */
function TreeTanzilView({
  heirs,
  result,
  isUr,
  currency,
  deceased,
  selectedId,
  onSelect,
  onToggleChild,
  onToggleRatio,
}: {
  heirs: any;
  result: any;
  isUr: boolean;
  currency: string;
  deceased?: any;
  selectedId: string;
  onSelect: (id: string) => void;
  onToggleChild: (id: string) => void;
  onToggleRatio: (id: string) => void;
}) {
  const namedDescendants: PersonNode[] = (heirs.childrenList && heirs.childrenList.length > 0)
    ? heirs.childrenList.map((c: any) => ({
        id: c.id,
        name: c.name || (c.gender === "MALE" ? (isUr ? "بیٹا" : "Son") : (isUr ? "بیٹی" : "Daughter")),
        gender: c.gender,
        isAlive: c.isAlive,
        relation: c.gender === "MALE" ? "SON" : "DAUGHTER",
        daughterBranchEqualRatio: c.daughterBranchEqualRatio,
        children: (c.children || []).map((gc: any) => ({
          id: gc.id,
          name: gc.name || (gc.gender === "MALE" ? (isUr ? "پوتا / نواسا" : "Grandson") : (isUr ? "پوتی / نواسی" : "Granddaughter")),
          gender: gc.gender,
          isAlive: gc.isAlive,
          relation: "GRANDCHILD",
          parentId: c.id,
        })),
      }))
    : (heirs.namedDescendants && heirs.namedDescendants.length > 0)
      ? heirs.namedDescendants
      : [];

  const branchResults = result.branchResults || [];
  const livingDirectChildren = namedDescendants.filter(
    (n) => (n.relation === "SON" || n.relation === "DAUGHTER") && n.isAlive
  );
  const isGrandchildrenExcluded = livingDirectChildren.length > 0;

  if (namedDescendants.length === 0) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#fafbf8] border-2 border-dashed border-[#b7c9a5] text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#edf3e7] text-[#245642] border border-[#a5b69d] flex items-center justify-center mx-auto shadow-2xs">
          <GitFork className="w-7 h-7 text-[#245642]" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h4 className="font-extrabold text-base sm:text-lg text-[#172e22]">
            {isUr ? "کوئی صلبی اولاد یا پوتے/نواسے درج نہیں ہیں" : "No Children or Grandchildren Registered"}
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
            {isUr
              ? "شجرۂ تنزیل و اقربیت کو متحرک دیکھنے کے لیے وزرڈ کے مرحلہ ۴ (ورثاء) میں اولاد اور پوتوں کا اندراج فرمائیں، یا اوپر ٹول بار سے کوئی نمونہ کیس (Preset) لوڈ کریں۔"
              : "To explore Tanzīl (representation) and proximity blocking in action, enter children & grandchildren in Step 4 (Relatives), or load a scenario preset from the toolbar above."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exclusion Status Alert: High contrast amber or emerald (NO PINK!) */}
      {isGrandchildrenExcluded ? (
        <div className="p-5 rounded-2xl bg-[#fffbeb] border-2 border-[#f59e0b] text-[#78350f] text-sm flex items-start gap-3.5 shadow-xs">
          <ShieldAlert className="w-5 h-5 text-[#b45309] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-[#78350f] text-base">
              {isUr
                ? "قاعدۂ اقربیت فعال: تمام پوتے، پوتیاں، نواسے اور نواسیاں محروم ہیں"
                : "Golden Proximity Rule (Al-Aqrab Yamna‘ al-Ab‘ad) Active: Grandchildren Excluded"}
            </h4>
            <p className="text-xs text-[#92400e] leading-relaxed font-medium">
              {isUr
                ? `میت کی صلبی بیٹی (${livingDirectChildren.map((c) => c.name).join(", ")}) حیات ہے۔ فقہ جعفریہ کے متفقہ اصول کے تحت اگر ایک بھی صلبی اولاد زندہ ہو، تو وہ نچلی نسل (پوتوں/نواسوں) کو مکمل طور پر محجوب (محروم) کر دیتی ہے۔`
                : `Living direct child (${livingDirectChildren.map((c) => c.name).join(", ")}) survives. Under strict Ja'fari Law, grandchildren inherit only when the direct child generation is completely empty.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[#f0fdf4] border-2 border-[#22c55e] text-[#14532d] text-sm flex items-start gap-3.5 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-[#14532d] text-base">
              {isUr ? "تنزیل (بقائم مقامی) فعال ہے: پوتے اور نواسے وارث ہیں" : "Tanzīl (Representation) Active: Grandchildren Inherit"}
            </h4>
            <p className="text-xs text-[#166534] leading-relaxed font-medium">
              {isUr
                ? "میت کی کوئی بھی صلبی اولاد زندہ نہیں ہے۔ لہٰذا ہر پوتا، پوتی، نواسا اور نواسی اپنے مرحوم والد یا والدہ کے قائم مقام بن کر ان کا مقررہ حصہ وصول کر رہے ہیں۔"
                : "No living direct children exist. Grandchildren step into the exact shoes (Manzilah) of their deceased parents."}
            </p>
          </div>
        </div>
      )}

      {/* Connected Tree Visual */}
      <div className="p-6 rounded-2xl bg-[#fafbf8] border border-[#d8e0d2] overflow-x-auto">
        <div className="min-w-[760px] flex flex-col items-center gap-8 py-4">
          {/* Deceased Root Card */}
          <div className="text-center p-4 rounded-2xl w-72 bg-[#245642] text-white shadow-md border-2 border-[#173e30]">
            <div className="text-xs uppercase font-extrabold text-emerald-200">
              {isUr ? "مورث / متوفی" : "Deceased Subject (Muwarith)"}
            </div>
            <strong className="text-lg block mt-1 font-serif text-white">
              {deceased?.name || (isUr ? "مرحوم (متوفی)" : "The Deceased (Marhūm)")}
            </strong>
            <div className="text-xs text-white/90 font-medium mt-1">
              {isUr ? "کل ترکہ بعد از دیون:" : "Net Distributable Estate:"} {result.balanceSheet.netDistributableEstate.toLocaleString()} {currency}
            </div>
          </div>

          {/* Stem Down to Children */}
          <div className="w-0.5 h-6 bg-[#b6c7a9]" />

          {/* Children Tier Branches */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            {namedDescendants.map((child) => {
              const isChildAlive = child.isAlive;
              const hasSubChildren = child.children && child.children.length > 0;

              return (
                <div
                  key={child.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isChildAlive
                      ? "bg-[#f4f7ee] border-[#245642] shadow-sm ring-2 ring-[#245642]/20"
                      : "bg-white border-[#d8e0d2]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#eef1e6] text-[#344b39]">
                        {child.relation}
                      </span>
                      <button
                        onClick={() => onToggleChild(child.id)}
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border transition-all ${
                          isChildAlive
                            ? "bg-[#245642] text-white border-[#173e30] shadow-xs"
                            : "bg-stone-100 text-stone-700 border-stone-300"
                        }`}
                      >
                        {isChildAlive ? (isUr ? "حیات (زندہ)" : "LIVING") : (isUr ? "مرحوم (فوت شدہ)" : "DECEASED")}
                      </button>
                    </div>

                    <div>
                      <strong className="text-sm block text-[#172e22]">{child.name}</strong>
                      <span className="text-xs text-stone-600 font-medium">
                        {child.gender === "MALE" ? (isUr ? "مرحوم بیٹا (۲ حصے)" : "Son (2 units share)") : (isUr ? "مرحومہ بیٹی (۱ حصہ)" : "Daughter (1 unit share)")}
                      </span>
                    </div>

                    {/* Daughter's Branch ratio toggle */}
                    {child.relation === "DAUGHTER" && hasSubChildren && (
                      <button
                        onClick={() => onToggleRatio(child.id)}
                        className="w-full text-start text-[10px] font-bold p-2 rounded-lg bg-[#edf3e7] text-[#245642] border border-[#c5d0bb] mt-1 hover:bg-[#e4eedb]"
                      >
                        {child.daughterBranchEqualRatio
                          ? isUr ? "نواسیوں میں تقسیم: مساوی (۱:۱)" : "Ratio: 1:1 Equal (Classical)"
                          : isUr ? "نواسیوں میں تقسیم: احوط وجوبی (۲:۱)" : "Ratio: 2:1 (Ahwat Wujubi, Sistani)"}
                      </button>
                    )}
                  </div>

                  {/* Sub-branch of Grandchildren */}
                  {hasSubChildren && (
                    <div className="mt-4 pt-3 border-t border-[#d8e0d2] space-y-2">
                      <span className="text-[10px] font-extrabold text-[#245642] uppercase tracking-wider block">
                        {isUr ? "اولاد (پوتے/نواسے بذریعہ تنزیل):" : "Descendants (via Tanzīl):"}
                      </span>

                      <div className="space-y-1.5">
                        {child.children!.map((gc) => {
                          const gcResult = branchResults.find((b: any) => b.person.id === gc.id);
                          const isExcluded = gcResult?.isExcluded;

                          return (
                            <div
                              key={gc.id}
                              className={`p-2.5 rounded-xl text-xs border flex items-center justify-between ${
                                isExcluded
                                  ? "bg-stone-50 border-stone-200 text-stone-600 opacity-80"
                                  : "bg-white border-[#b7c9a5] text-[#172e22] shadow-2xs"
                              }`}
                            >
                              <div>
                                <span className={`font-bold block ${isExcluded ? "line-through text-stone-500" : "text-[#172e22]"}`}>
                                  {gc.name}
                                </span>
                                <span className="text-[10px] text-stone-600 block">
                                  {gc.gender === "MALE" ? (isUr ? "پوتا/نواسا" : "Grandson") : (isUr ? "پوتی/نواسی" : "Granddaughter")}
                                </span>
                              </div>

                              <div className="text-end">
                                {isExcluded ? (
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-stone-200 text-stone-800 border border-stone-300">
                                    {isUr ? "محروم" : "EXCLUDED"}
                                  </span>
                                ) : (
                                  <>
                                    <span className="font-extrabold text-[#245642] block">
                                      {gcResult?.finalFraction || "0"}
                                    </span>
                                    <span className="text-[10px] text-stone-700 font-bold block">
                                      {(gcResult?.monetaryValue || 0).toLocaleString()} {currency}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explanatory Cards Table with High Contrast Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branchResults.map((b: any) => (
          <div
            key={b.person.id}
            className={`p-4 rounded-2xl border space-y-2.5 ${
              b.isExcluded
                ? "bg-[#fafaf9] border-stone-300 text-stone-800"
                : "bg-white border-[#c5d0bb] text-[#172e22] shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm flex items-center gap-2">
                <span className={b.isExcluded ? "text-stone-700" : "text-[#172e22]"}>{b.person.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold border border-stone-200">
                  {b.person.gender}
                </span>
              </strong>
              <span className={`text-xs font-extrabold ${b.isExcluded ? "text-stone-800 bg-stone-200 px-2.5 py-0.5 rounded border border-stone-300" : "text-[#245642] bg-[#edf3e7] px-2.5 py-0.5 rounded border border-[#b7c9a5]"}`}>
                {b.isExcluded ? (isUr ? "حجبِ حرمان (محروم)" : "Blocked by Proximity") : `${b.finalFraction} (${b.percentage}%)`}
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              {isUr ? b.fiqhBasisUrdu : b.fiqhBasisEnglish}
            </p>

            {!b.isExcluded && (
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-600">{isUr ? "نقد حصہ:" : "Net Monetary Share:"}</span>
                <span className="font-extrabold text-[#245642] text-sm">
                  {b.monetaryValue.toLocaleString()} {currency}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   2. CONCENTRIC RINGS VIEW (Redesigned with NO overlapping labels & High Contrast!)
   ========================================================================= */
function ConcentricRingsView({ result, isUr, currency, heirs }: any) {
  const activeTier = result.activeTier;

  const tiersList = [
    {
      tierNum: 1,
      nameEn: "Ring 1: Tier 1 (Parents & Children / Tanzīl)",
      nameUr: "مدار ۱: والدین و اولاد / تنزیل (طبقہ اول)",
      membersEn: "Father, Mother, Direct Children, and Grandchildren via Tanzīl.",
      membersUr: "والدین، صلبی اولاد اور بقائم مقامی پوتے/نواسے (تنزیل)۔",
      statusEn: activeTier === 1 ? "ACTIVE & INHERITING" : "INACTIVE",
      statusUr: activeTier === 1 ? "فعال اور وارث" : "غیر فعال",
      isActive: activeTier === 1,
      color: "border-[#245642] text-[#245642] bg-[#edf3e7]",
    },
    {
      tierNum: 2,
      nameEn: "Ring 2: Tier 2 (Grandparents & Siblings)",
      nameUr: "مدار ۲: اجداد و اخوہ (طبقہ دوم)",
      membersEn: "Grandparents (paternal & maternal), Brothers, Sisters, Nephews.",
      membersUr: "دادا، دادی، نانا، نانی، بہن، بھائی اور ان کی اولاد۔",
      statusEn: activeTier === 2 ? "ACTIVE & INHERITING" : "BLOCKED BY TIER 1",
      statusUr: activeTier === 2 ? "فعال اور وارث" : "طبقہ اول سے محجوب",
      isActive: activeTier === 2,
      color: "border-[#d97706] text-[#b45309] bg-[#fef3c7]",
    },
    {
      tierNum: 3,
      nameEn: "Ring 3: Tier 3 (Uncles, Aunts & Cousins)",
      nameUr: "مدار ۳: اعمام و اخوال (طبقہ سوم)",
      membersEn: "Paternal/Maternal Uncles, Aunts, and Cousins.",
      membersUr: "چچا، پھوپھی، ماموں، خالہ اور ان کی اولاد۔",
      statusEn: activeTier === 3 ? "ACTIVE & INHERITING" : "BLOCKED BY TIER 1 & 2",
      statusUr: activeTier === 3 ? "فعال اور وارث" : "طبقہ اول و دوم سے محجوب",
      isActive: activeTier === 3,
      color: "border-stone-500 text-stone-800 bg-stone-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Visual Non-Overlapping Canvas */}
      <div className="p-8 rounded-2xl bg-[#fafbf8] border border-[#d8e0d2] flex flex-col items-center justify-center min-h-[460px]">
        {/* SVG-Rendered Concentric Orbit System */}
        <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center">
          {/* Ring 3 (Outer) */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed transition-all flex items-start justify-center pt-2 ${
              activeTier === 3 ? "border-[#245642] bg-[#edf3e7]/40 ring-4 ring-[#245642]/10" : "border-stone-300 bg-stone-100/30"
            }`}
          >
            {/* Outer label at very top */}
            <span className="text-[10px] font-extrabold px-3 py-0.5 rounded-full bg-white text-stone-800 border border-stone-300 shadow-2xs">
              {isUr ? "مدار ۳: طبقہ سوم (اعمام و اخوال)" : "Ring 3: Class 3 (Uncles & Aunts)"}
            </span>
          </div>

          {/* Ring 2 (Middle) */}
          <div
            className={`absolute inset-14 rounded-full border-2 border-dashed transition-all flex items-end justify-center pb-2 ${
              activeTier === 2 ? "border-[#245642] bg-[#edf3e7]/50 ring-4 ring-[#245642]/10" : "border-stone-300 bg-stone-100/40"
            }`}
          >
            {/* Middle label placed at bottom to completely avoid collision! */}
            <span className="text-[10px] font-extrabold px-3 py-0.5 rounded-full bg-white text-stone-800 border border-stone-300 shadow-2xs">
              {isUr ? "مدار ۲: طبقہ دوم (اجداد و اخوہ)" : "Ring 2: Class 2 (Grandparents & Siblings)"}
            </span>
          </div>

          {/* Ring 1 (Inner) */}
          <div
            className={`absolute inset-28 rounded-full border-2 transition-all flex items-start justify-center pt-2 ${
              activeTier === 1
                ? "border-[#245642] bg-[#edf3e7] shadow-md ring-4 ring-[#245642]/20"
                : "border-stone-300 bg-white"
            }`}
          >
            {/* Inner label placed with clear clearance */}
            <span className="text-[10px] font-extrabold px-3 py-0.5 rounded-full bg-[#245642] text-white shadow-xs">
              {isUr ? "مدار ۱: طبقہ اول (والدین و اولاد)" : "Ring 1: Class 1 (Parents & Children)"}
            </span>
          </div>

          {/* Hub: Deceased & Estate */}
          <div className="relative z-20 w-28 h-28 rounded-full bg-[#245642] text-white border-4 border-[#173e30] flex flex-col items-center justify-center text-center p-2 shadow-xl">
            <div className="text-[10px] font-extrabold text-emerald-200 uppercase tracking-wider">
              {isUr ? "مرکزِ ترکہ" : "Estate Hub"}
            </div>
            <strong className="text-xs text-white block mt-0.5 font-bold">
              {result.balanceSheet.netDistributableEstate.toLocaleString()}
            </strong>
            <span className="text-[9px] text-emerald-200/90 font-medium">{currency}</span>
          </div>
        </div>
      </div>

      {/* Universal Non-Excludable Heirs: Omnipresent Spousal Crown Card */}
      <div className="rounded-2xl border-2 border-amber-600/30 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 p-5 shadow-sm bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>
                {isUr
                  ? "حلقۂ فرضِ مستقل / أصحابِ سبب (زوجین)"
                  : "Universal Non-Excludable Heirs (حلقۂ فرضِ مستقل / زوجین)"}
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-1">
              {isUr
                ? "زوج اور زوجہ — نکاحی رشتہ (أصحاب السبب)"
                : "Husband & Wife (زوج اور زوجہ) — The Matrimonial Bond (أصحاب السبب)"}
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed font-medium">
              {isUr
                ? "زوجین (میاں بیوی) کسی بھی مدار یا طبقے میں محبوس نہیں ہیں۔ وہ ہر مدار کے ساتھ ہمیشہ بیک وقت وارث بنتے ہیں اور انہیں کوئی رشتہ دار محروم نہیں کر سکتا۔"
                : "Spouses do not belong to Tier 1, 2, or 3. They inherit unconditionally alongside whichever tier is alive and are never blocked by any relative."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-100 p-3 rounded-xl border border-stone-200 text-xs shrink-0">
            <div>
              <div className="text-stone-500 font-semibold">{isUr ? "اولاد کے ساتھ:" : "With Children:"}</div>
              <div className="font-bold text-emerald-700">{isUr ? "زوجہ ۱/۸ | شوہر ۱/۴" : "Wife 1/8 | Husband 1/4"}</div>
            </div>
            <div className="w-[1px] h-8 bg-stone-300"></div>
            <div>
              <div className="text-stone-500 font-semibold">{isUr ? "بغیر اولاد:" : "No Children:"}</div>
              <div className="font-bold text-amber-700">{isUr ? "زوجہ ۱/۴ | شوہر ۱/۲" : "Wife 1/4 | Husband 1/2"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Distinct Non-Colliding Tier Legend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiersList.map((tier) => (
          <div
            key={tier.tierNum}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              tier.isActive
                ? "bg-white border-[#245642] shadow-sm ring-2 ring-[#245642]/20"
                : "bg-[#fafaf9] border-stone-200 text-stone-600 opacity-80"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  tier.isActive ? "bg-[#edf3e7] text-[#245642] border-[#b7c9a5]" : "bg-stone-200 text-stone-700 border-stone-300"
                }`}>
                  {tier.isActive ? (isUr ? "فعال طبقہ" : "ACTIVE TIER") : (isUr ? "محجوب" : "BLOCKED")}
                </span>
                <span className="text-xs font-bold text-stone-500">Tier #{tier.tierNum}</span>
              </div>

              <h4 className={`font-bold text-sm ${tier.isActive ? "text-[#172e22]" : "text-stone-700"}`}>
                {isUr ? tier.nameUr : tier.nameEn}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {isUr ? tier.membersUr : tier.membersEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-bold space-y-2">
              {tier.isActive ? (
                <span className="text-[#245642] block">
                  {isUr ? "اس مدار کے ورثاء میں ترکہ تقسیم ہو رہا ہے" : "Heirs in this orbit are inheriting the estate"}
                </span>
              ) : (
                <span className="text-stone-600 font-semibold block">
                  {isUr ? "حجبِ حرمان: اندرونی مدار کی وجہ سے محروم" : "Hajb al-Hirmān: Blocked by closer inner orbit"}
                </span>
              )}
              <div className="pt-2 border-t border-stone-200/80 text-[11px] text-amber-800 font-medium">
                ℹ️ {isUr ? "زوجین اس طبقے کے ساتھ بیک وقت وارث بنتے ہیں۔" : "Spouses inherit simultaneously with this tier without being blocked."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   3. COLOR-CODED LANES VIEW (NO PINK! High contrast botanical palette)
   ========================================================================= */
function ColorCodedLanesView({ result, isUr, currency }: any) {
  const lanes = [
    {
      titleEn: "Spousal Lane (Permanent Share)",
      titleUr: "شاہراہِ زوجیت (دائمی قرآنی حصہ)",
      tier: 0,
      activeColor: "border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]",
      inactiveColor: "border-stone-200 bg-stone-50 text-stone-600",
      active: true,
      descEn: "Inherits alongside all 3 classes without exclusion (1/8 with children, 1/4 without).",
      descUr: "تمام طبقات کے ساتھ بلا استثناء ہمیشہ شریکِ وراثت (اولاد کے ساتھ ۱/۸، بغیر اولاد ۱/۴)۔",
    },
    {
      titleEn: "Tier 1: Parents & Direct Lineage",
      titleUr: "طبقہ اول: والدین و صلبی اولاد / تنزیل",
      tier: 1,
      activeColor: "border-[#245642] bg-[#f4f7ee] text-[#172e22]",
      inactiveColor: "border-stone-200 bg-stone-50 text-stone-600",
      active: result.activeTier === 1,
      descEn: "Parents, sons, daughters, and grandchildren via Tanzīl representation.",
      descUr: "والدین، بیٹے، بیٹیاں اور بقائم مقامی پوتے/نواسے (تنزیل)۔",
    },
    {
      titleEn: "Tier 2: Grandparents & Collaterals",
      titleUr: "طبقہ دوم: اجداد و برادران و خواہران",
      tier: 2,
      activeColor: "border-[#b45309] bg-[#fffbeb] text-[#78350f]",
      inactiveColor: "border-stone-200 bg-stone-50 text-stone-600",
      active: result.activeTier === 2,
      descEn: "Paternal/maternal grandparents, full/consanguine/uterine siblings, and nephews.",
      descUr: "دادا، دادی، نانا، نانی، بہن، بھائی اور ان کی اولاد۔",
    },
    {
      titleEn: "Tier 3: Paternal & Maternal Agnates",
      titleUr: "طبقہ سوم: اعمام و اخوال (چچا، ماموں)",
      tier: 3,
      activeColor: "border-[#475569] bg-[#f8fafc] text-[#1e293b]",
      inactiveColor: "border-stone-200 bg-stone-50 text-stone-600",
      active: result.activeTier === 3,
      descEn: "Paternal/maternal uncles, aunts, and cousins.",
      descUr: "عم، عمہ، خال، خالہ اور ان کی اولاد۔",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {lanes.map((lane) => (
        <div
          key={lane.tier}
          className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[300px] ${
            lane.active ? lane.activeColor : lane.inactiveColor
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-black/10">
                {lane.tier === 0 ? "Spouse" : `Tier ${lane.tier}`}
              </span>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  lane.active ? "bg-[#245642] text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                {lane.active ? (isUr ? "فعال" : "ACTIVE") : (isUr ? "محجوب" : "BLOCKED")}
              </span>
            </div>

            <h3 className="font-bold text-base">{isUr ? lane.titleUr : lane.titleEn}</h3>
            <p className="text-xs opacity-90 leading-relaxed font-medium">{isUr ? lane.descUr : lane.descEn}</p>
          </div>

          <div className="mt-6 pt-3 border-t border-current/20 text-xs font-bold">
            {lane.active ? (
              <span>
                {isUr ? "اس طبقے کے ورثاء میں تقسیم جاری ہے" : "Heirs in this class are inheriting"}
              </span>
            ) : (
              <span className="opacity-70">{isUr ? "اقرب طبقے کی موجودگی سے محروم" : "Excluded by closer class"}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   4. ESTATE FLOW PIPELINE VIEW (NO PINK! High contrast stages)
   ========================================================================= */
function EstateFlowPipelineView({ result, isUr, currency, debts, assets }: any) {
  const bs = result.balanceSheet;

  const stages = [
    { labelEn: "1. Gross Estate", labelUr: "۱. کل مجموعی ترکہ", amount: bs.grossEstate, color: "bg-[#2563eb]" },
    { labelEn: "2. Funeral / Tajhīz", labelUr: "۲. تجہیز و تکفین", amount: bs.burialAndFuneral, color: "bg-[#d97706]" },
    { labelEn: "3. Debts to People", labelUr: "۳. دیون الناس (قرضے)", amount: bs.debtsToPeople, color: "bg-[#b91c1c]" },
    { labelEn: "4. Debts to Allah", labelUr: "۴. حقوق اللہ (خمس، حج)", amount: bs.debtsToAllah, color: "bg-[#7f1d1d]" },
    { labelEn: "5. Will (Waṣiyyah ≤ 1/3)", labelUr: "۵. نافذ وصیت (ثلث)", amount: bs.deductedWasiyyah, color: "bg-[#4f46e5]" },
    { labelEn: "6. Net Distributable", labelUr: "۶. خالص قابلِ تقسیم ترکہ", amount: bs.netDistributableEstate, color: "bg-[#245642]" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {stages.map((st, i) => (
          <div key={i} className={`p-4 rounded-2xl bg-[#fafbf8] border ${i === 4 ? "border-[#f59e0b] bg-[#fffdfa]" : "border-[#d8e0d2]"} space-y-1`}>
            <span className="text-[10px] font-extrabold text-[#596851] block truncate">
              {i === 4 ? (
                <WasiyyahLink section="thuluth" showBadge={false}>
                  {isUr ? st.labelUr : st.labelEn}
                </WasiyyahLink>
              ) : (
                isUr ? st.labelUr : st.labelEn
              )}
            </span>
            <strong className="text-sm md:text-base font-extrabold block text-[#172e22]">
              {st.amount.toLocaleString()}
            </strong>
            <span className="text-[10px] text-stone-500 font-medium">{currency}</span>
          </div>
        ))}
      </div>

      {/* Visual Pipeline Bar */}
      <div className="p-6 rounded-2xl bg-[#fafbf8] border border-[#d8e0d2] space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#245642]">
          {isUr ? "ترکے کے قانونی اخراجات کا تصویری تناسب:" : "Estate Distribution Visual Sequence:"}
        </h4>
        <div className="h-7 w-full rounded-xl overflow-hidden flex bg-stone-200 border border-stone-300">
          {stages.slice(1).map((st, i) => {
            const pct = bs.grossEstate > 0 ? (st.amount / bs.grossEstate) * 100 : 0;
            if (pct <= 0) return null;
            return (
              <div
                key={i}
                style={{ width: `${pct}%` }}
                className={`${st.color} h-full transition-all flex items-center justify-center text-[10px] font-extrabold text-white px-1 truncate`}
                title={`${isUr ? st.labelUr : st.labelEn}: ${st.amount.toLocaleString()} ${currency} (${pct.toFixed(1)}%)`}
              >
                {pct > 5 && `${pct.toFixed(0)}%`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. HOUSEHOLD CARDS VIEW
   ========================================================================= */
function HouseholdCardsView({ result, isUr, currency, heirs, onToggleChild }: any) {
  if (!result.heirShares || result.heirShares.length === 0) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#fafbf8] border-2 border-dashed border-[#b7c9a5] text-center space-y-3">
        <h4 className="font-extrabold text-base text-[#172e22]">
          {isUr ? "کوئی حصہ دار ورثاء موجود نہیں ہیں" : "No Heir Shares Calculated"}
        </h4>
        <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-md mx-auto">
          {isUr
            ? "وزرڈ کے مراحل میں ترکے کی مالیت اور ورثاء کا اندراج فرمائیں تاکہ تمام کارڈز متحرک ہو سکیں۔"
            : "Enter estate assets and family relatives in the Calculator Wizard to see household share cards."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {result.heirShares.map((share: any) => (
        <div
          key={share.id}
          className="p-5 rounded-2xl border border-[#d8e0d2] bg-white space-y-3 hover:border-[#245642] transition-all shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#245642] uppercase tracking-wider">
              {share.relationKey}
            </span>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#edf3e7] text-[#245642] border border-[#b7c9a5]">
              {share.fractionString} ({share.percentage}%)
            </span>
          </div>

          <div>
            <strong className="text-lg font-bold block text-[#172e22]">
              {share.totalMonetaryShare.toLocaleString()} {currency}
            </strong>
            {share.count > 1 && (
              <span className="text-xs text-stone-600 font-medium">
                {isUr ? "فی کس حصہ:" : "Per individual:"} {share.sharePerIndividual.toLocaleString()} {currency}
              </span>
            )}
          </div>

          <p className="text-xs text-stone-700 italic leading-relaxed pt-2 border-t border-stone-200">
            &ldquo;{share.proof.ruleExplanation}&rdquo;
          </p>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   6. RADIAL KINSHIP MAP VIEW
   ========================================================================= */
function RadialKinshipView({ result, isUr, currency }: any) {
  const shares = result.heirShares || [];
  const hasShares = shares.length > 0;

  if (!hasShares) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#fafbf8] border-2 border-dashed border-[#b7c9a5] text-center space-y-3">
        <h4 className="font-extrabold text-base text-[#172e22]">
          {isUr ? "شعاعی نقشے کے لیے فی الوقت کوئی ورثاء درج نہیں ہیں" : "No Heir Nodes in Radial Orbit"}
        </h4>
        <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-md mx-auto">
          {isUr
            ? "مرکزی متوفی کے گرد قرابتی رشتوں اور حصص کا مداری خاکہ دیکھنے کے لیے وزرڈ میں ورثاء کا اندراج فرمائیں۔"
            : "Enter heirs in the Calculator Wizard to see their kinship nodes and fractional shares radiating from the central deceased."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl bg-[#fafbf8] border border-[#d8e0d2] flex flex-col items-center justify-center min-h-[440px]">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* SVG Orbital Track & Connecting Spokes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <circle cx="50%" cy="50%" r="135" fill="none" stroke="#b7c9a5" strokeWidth="1.5" strokeDasharray="4 4" />
          {shares.map((_: any, idx: number) => {
            const total = shares.length;
            const angle = (idx / total) * 2 * Math.PI;
            const radius = 135;
            return (
              <line
                key={idx}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${Math.cos(angle) * radius}px)`}
                y2={`calc(50% + ${Math.sin(angle) * radius}px)`}
                stroke="#c5d3bc"
                strokeWidth="1.5"
                strokeDasharray="2 3"
              />
            );
          })}
        </svg>

        {/* Hub */}
        <div className="w-24 h-24 rounded-full bg-[#245642] text-white border-4 border-[#173e30] flex flex-col items-center justify-center text-center p-2 z-20 shadow-xl">
          <span className="text-[10px] uppercase font-extrabold text-emerald-200">{isUr ? "میت" : "Deceased"}</span>
          <span className="text-xs font-bold text-white mt-0.5">{currency}</span>
        </div>

        {/* Orbiting Heir Nodes */}
        {shares.map((h: any, idx: number) => {
          const total = shares.length;
          const angle = (idx / total) * 2 * Math.PI;
          const radius = 135; // px
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={h.id}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute z-10 p-2.5 rounded-xl bg-white border border-[#245642] shadow-sm text-center w-28 hover:scale-105 transition-transform"
            >
              <span className="text-[10px] font-extrabold block truncate text-[#172e22]">{h.relationKey}</span>
              <span className="text-xs font-extrabold text-[#245642] block font-mono">{h.fractionString}</span>
              <span className="text-[9px] text-stone-500 font-bold block">{h.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   7. DECISION PATH FLOWCHART VIEW
   ========================================================================= */
function DecisionPathView({ result, isUr, currency, heirs, openProvenance }: any) {
  const namedDescendants: any[] = (heirs.childrenList && heirs.childrenList.length > 0)
    ? heirs.childrenList
    : (heirs.namedDescendants || []);
  const hasDescendants = namedDescendants.length > 0;
  const livingDirectChildren = namedDescendants.filter((n: any) => (n.relation === "SON" || n.relation === "DAUGHTER" || n.gender) && n.isAlive);
  const isGrandchildrenExcluded = livingDirectChildren.length > 0;

  const steps = [
    {
      topicKey: "WASAYAH_CEILING",
      qEn: "Step 1: Check Sacred Deductions (Ḥuqūq al-Tarkah)",
      qUr: "مرحلہ ۱: واجباتِ ترکہ کی جانچ",
      resEn: `Burial + Debts + Will: ${result.balanceSheet.totalDebts.toLocaleString()} ${currency} discharged.`,
      resUr: `تجہیز، دیون اور وصیت کی مکمل ادائیگی۔`,
    },
    {
      topicKey: "PROXIMITY_TIER1_VS_GRANDCHILDREN",
      qEn: "Step 2: Check Active Class (Hajb al-Hirmān)",
      qUr: "مرحلہ ۲: فعال طبقے کی تعیین",
      resEn: result.activeTier
        ? `Class #${result.activeTier} is active. Outer classes permanently blocked.`
        : (isUr ? "ترکے میں فی الوقت کوئی شرعی وارث درج نہیں ہے۔" : "No legal blood heirs recorded in current case."),
      resUr: result.activeTier
        ? `طبقہ نمبر ${result.activeTier} فعال ہے۔ بیرونی طبقات محجوب۔`
        : "ترکے میں فی الوقت کوئی شرعی وارث درج نہیں ہے۔",
    },
    {
      topicKey: "TANZIL_REPRESENTATION",
      qEn: "Step 3: Golden Proximity Check (Al-Aqrab Yamna‘ al-Ab‘ad)",
      qUr: "مرحلہ ۳: قاعدۂ اقربیت کی جانچ",
      resEn: !hasDescendants
        ? "No direct children or grandchildren registered in current case."
        : isGrandchildrenExcluded
          ? `Living direct child (${livingDirectChildren.map((c: any) => c.name).join(", ")}) blocks all grandchildren.`
          : `No living direct children. Grandchildren inherit via Tanzīl (representation).`,
      resUr: !hasDescendants
        ? "ترکے میں کوئی صلبی اولاد یا پوتے/نواسے درج نہیں ہیں۔"
        : isGrandchildrenExcluded
          ? "صلبی اولاد کی موجودگی کی وجہ سے تمام پوتے اور نواسے محروم ہیں۔"
          : "کوئی صلبی اولاد زندہ نہیں، لہٰذا پوتے اور نواسے تنزیل کے تحت وارث بنتے ہیں۔",
    },
    {
      topicKey: "BUTLAN_AL_AWL",
      qEn: "Step 4: Repudiation of ‘Awl & Ta'ṣīb",
      qUr: "مرحلہ ۴: ردِّ عول و تعصیب کا اطلاق",
      resEn: "Ja'fari jurisprudence rejects deficit reduction across all shares; surplus reverts by Radd.",
      resUr: "شیعہ امامیہ فقہ میں عول باطل ہے؛ خسارہ مخصوص قرابت پر آتا ہے اور زائد ترکہ رد ہوتا ہے۔",
    },
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {steps.map((st, i) => (
        <div key={i} className="p-5 rounded-2xl bg-white border border-[#d8e0d2] space-y-2.5 relative shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#245642] text-white font-extrabold text-xs flex items-center justify-center">
              {i + 1}
            </span>
            <h4 className="font-extrabold text-sm text-[#172e22]">{isUr ? st.qUr : st.qEn}</h4>
          </div>
          <p className="text-xs text-stone-700 pl-8.5 font-medium leading-relaxed">{isUr ? st.resUr : st.resEn}</p>

          <div className="pt-2 flex items-center justify-between border-t border-[#edf3e7]">
            <button
              onClick={() => openProvenance(st.topicKey)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#edf3e7] hover:bg-[#245642] text-[#245642] hover:text-white transition-all text-xs font-bold border border-[#a5b69d] shadow-2xs"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isUr ? "شرعی دلیل و فتویٰ ملاحظہ کریں" : "View Scholarly Fatwa"}</span>
            </button>
            <span className="text-[10px] text-stone-500 font-mono">
              {isUr ? "تمام ۵ مراجع کے فتاویٰ" : "5-Marāji‘ Citations"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   8. SHARE WHEEL VIEW (Interactive SVG Donut Wheel Chart + Synchronized Legend)
   ========================================================================= */
const WHEEL_PALETTE = [
  { fill: "#1b4d3e", text: "text-[#1b4d3e]", bg: "bg-[#edf4ee]", border: "border-[#1b4d3e]" }, // Rich Forest Emerald
  { fill: "#c27803", text: "text-[#c27803]", bg: "bg-[#fef9ee]", border: "border-[#c27803]" }, // Warm Amber Gold
  { fill: "#0369a1", text: "text-[#0369a1]", bg: "bg-[#f0f9ff]", border: "border-[#0369a1]" }, // Cobalt Azure
  { fill: "#6d28d9", text: "text-[#6d28d9]", bg: "bg-[#f5f3ff]", border: "border-[#6d28d9]" }, // Regal Violet
  { fill: "#0f766e", text: "text-[#0f766e]", bg: "bg-[#f0fdfa]", border: "border-[#0f766e]" }, // Deep Teal
  { fill: "#b45309", text: "text-[#b45309]", bg: "bg-[#fffbeb]", border: "border-[#b45309]" }, // Terracotta Ochre
  { fill: "#475569", text: "text-[#475569]", bg: "bg-[#f8fafc]", border: "border-[#475569]" }, // Steel Slate
  { fill: "#be123c", text: "text-[#be123c]", bg: "bg-[#fff1f2]", border: "border-[#be123c]" }, // Crimson Garnet
];

function ShareWheelView({ result, isUr, currency, loadPreset }: any) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const shares = result.heirShares || [];
  const hasShares = shares.length > 0 && result.balanceSheet.netDistributableEstate > 0;

  if (!hasShares) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-[#fafbf8] border-2 border-dashed border-[#b7c9a5] shadow-xs">
        {/* Visual Empty Donut SVG */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-full h-full">
              {/* Outer dashed ring */}
              <circle cx="160" cy="160" r="125" fill="none" stroke="#b7c9a5" strokeWidth="2.5" strokeDasharray="6 6" />
              {/* Inner dashed ring */}
              <circle cx="160" cy="160" r="75" fill="none" stroke="#d8e0d2" strokeWidth="2" strokeDasharray="4 4" />
              {/* Center Hub */}
              <circle cx="160" cy="160" r="70" fill="#ffffff" stroke="#b7c9a5" strokeWidth="1.5" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
              <PieChart size={32} className="text-[#245642] mb-1.5 opacity-60" />
              <span className="text-xs font-bold text-[#172e22]">
                {isUr ? "چرخۂ حصص خالی ہے" : "Share Wheel Empty"}
              </span>
              <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                0 {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Guidance and 1-Click Preset */}
        <div className="space-y-4 text-start">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-[#edf3e7] text-[#245642] border border-[#a5b69d] inline-block">
              {isUr ? "ہندسی تقسیم کا رصدگاہ" : "Proportional Geometry Studio"}
            </span>
            <h4 className="text-lg sm:text-xl font-bold font-cinzel text-[#172e22]">
              {isUr ? "فی الوقت کوئی ورثاء یا ترکہ موجود نہیں ہے" : "No Heir Shares or Distributable Assets Available"}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
              {isUr
                ? "چرخۂ حصص ہر وارث اور قرابت دار کے شرعی حصے کو قرآنی تناسب (۱/۸، ۱/۶، ۱/۳، ۲/۳ وغیرہ) کے مطابق ایک خوبصورت متحرک دائرے میں پیش کرتا ہے۔ اس منظر کو متحرک دیکھنے کے لیے وزرڈ میں ترکہ و ورثاء شامل فرمائیں یا نمونہ کیس لوڈ کریں۔"
                : "The Share Wheel converts Qur'anic fractional shares into an interactive proportional donut chart with live slice inspection. Enter estate assets & heirs in the Calculator Wizard, or load a preset scenario below to see it in action."}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {loadPreset && (
              <button
                type="button"
                onClick={() => loadPreset("template-nuclear-standard")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#245642] hover:bg-[#1a3f30] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Sparkles size={14} className="text-emerald-300" />
                <span>{isUr ? "نمونہ خاکہ لوڈ کریں (بنیادی خاندان)" : "Load Archetype (Nuclear Family)"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calculate Slices
  const totalPercentage = shares.reduce((sum: number, h: any) => sum + (h.percentage || 0), 0) || 100;
  let cumulativeAngle = -Math.PI / 2; // Start from top (12 o'clock)

  const slices = shares.map((h: any, idx: number) => {
    const fraction = (h.percentage || 0) / totalPercentage;
    const angleDelta = fraction * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angleDelta;
    cumulativeAngle = endAngle;

    const isHovered = hoveredIdx === idx;
    const color = WHEEL_PALETTE[idx % WHEEL_PALETTE.length];

    if (shares.length === 1 || fraction >= 0.999) {
      return {
        h,
        idx,
        color,
        isHovered,
        isFullCircle: true,
        fraction,
      };
    }

    const gap = shares.length > 1 ? 0.025 : 0;
    const adjStart = startAngle + gap / 2;
    const adjEnd = endAngle - gap / 2;

    const outerR = isHovered ? 134 : 126;
    const innerR = isHovered ? 72 : 78;

    const x1 = 160 + outerR * Math.cos(adjStart);
    const y1 = 160 + outerR * Math.sin(adjStart);
    const x2 = 160 + outerR * Math.cos(adjEnd);
    const y2 = 160 + outerR * Math.sin(adjEnd);
    const x3 = 160 + innerR * Math.cos(adjEnd);
    const y3 = 160 + innerR * Math.sin(adjEnd);
    const x4 = 160 + innerR * Math.cos(adjStart);
    const y4 = 160 + innerR * Math.sin(adjStart);

    const largeArc = (adjEnd - adjStart) > Math.PI ? 1 : 0;
    const pathD = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return {
      h,
      idx,
      color,
      pathD,
      isHovered,
      fraction,
    };
  });

  const activeHeir = hoveredIdx !== null ? shares[hoveredIdx] : null;
  const activeColor = hoveredIdx !== null ? WHEEL_PALETTE[hoveredIdx % WHEEL_PALETTE.length] : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#fafbf8] border border-[#d8e0d2] shadow-xs">
        {/* Left Side: Interactive SVG Donut Wheel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-full h-full select-none overflow-visible">
              <defs>
                <filter id="sliceShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Decorative Subtle Background Track */}
              <circle cx="160" cy="160" r="126" fill="none" stroke="#e8ece5" strokeWidth="48" />

              {/* Slices */}
              {slices.map((slice: any) => {
                if (slice.isFullCircle) {
                  return (
                    <path
                      key={slice.idx}
                      d="M 160 34 A 126 126 0 1 0 160 286 A 126 126 0 1 0 160 34 M 160 82 A 78 78 0 1 1 160 238 A 78 78 0 1 1 160 82 Z"
                      fill={slice.color.fill}
                      fillRule="evenodd"
                      className="transition-all duration-200 cursor-pointer"
                      filter={slice.isHovered ? "url(#sliceShadow)" : "none"}
                      onMouseEnter={() => setHoveredIdx(slice.idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    />
                  );
                }

                return (
                  <path
                    key={slice.idx}
                    d={slice.pathD}
                    fill={slice.color.fill}
                    className="transition-all duration-200 cursor-pointer"
                    opacity={hoveredIdx !== null && !slice.isHovered ? 0.45 : 1}
                    filter={slice.isHovered ? "url(#sliceShadow)" : "none"}
                    stroke="#ffffff"
                    strokeWidth={slice.isHovered ? 2.5 : 1}
                    onMouseEnter={() => setHoveredIdx(slice.idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                );
              })}

              {/* Central Hole Mask Circle */}
              <circle cx="160" cy="160" r="74" fill="#ffffff" stroke="#d8e0d2" strokeWidth="1.5" />
            </svg>

            {/* Dynamic Interactive Center Hub Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 pointer-events-none">
              {activeHeir ? (
                <div className="space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: activeColor?.fill }}
                    />
                    <span className="text-[11px] font-extrabold text-[#172e22] truncate max-w-[120px]">
                      {activeHeir.relationKey}
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-[#245642] font-mono leading-tight">
                    {activeHeir.fractionString}
                  </div>
                  <div className="text-xs font-bold text-stone-600">
                    {activeHeir.percentage}%
                  </div>
                  <div className="text-[10px] font-extrabold text-[#172e22] pt-0.5 truncate max-w-[130px]">
                    {activeHeir.totalMonetaryShare.toLocaleString()} {currency}
                  </div>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                    {isUr ? "خالص ترکہ" : "Net Distributable"}
                  </span>
                  <strong className="text-base sm:text-lg font-bold text-[#172e22] block leading-tight">
                    {result.balanceSheet.netDistributableEstate.toLocaleString()}
                  </strong>
                  <span className="text-[10px] text-stone-600 font-medium block">
                    {currency}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#edf3e7] text-[#245642] inline-block mt-1">
                    {shares.length} {isUr ? "گروہِ ورثاء" : "Heir Groups"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <span className="text-[11px] text-stone-500 font-medium mt-3">
            {isUr ? "حصہ دیکھنے کے لیے دائرے پر اشارہ (Hover) کریں" : "Hover over a slice to inspect details"}
          </span>
        </div>

        {/* Right Side: Synchronized Heir Share Cards */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#d8e0d2]">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#245642]">
              {isUr ? "تناسبی حصص کی فہرستِ ورثاء" : "Proportional Breakdown by Heir"}
            </h4>
            <span className="text-xs text-stone-500 font-medium">
              {shares.length} {isUr ? "حصہ دار" : "Total shares"}
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {shares.map((h: any, idx: number) => {
              const isHovered = hoveredIdx === idx;
              const color = WHEEL_PALETTE[idx % WHEEL_PALETTE.length];

              return (
                <div
                  key={h.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isHovered
                      ? "bg-white border-[#245642] ring-2 ring-[#245642]/20 shadow-md scale-[1.01]"
                      : "bg-white border-[#d8e0d2] hover:border-[#b7c9a5] shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-2xs ring-2 ring-white"
                      style={{ backgroundColor: color.fill }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-[#172e22] truncate">
                          {h.relationKey}
                        </strong>
                        {h.count > 1 && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                            {h.count} {isUr ? "افراد" : "heirs"}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-600 font-medium block truncate">
                        {h.count > 1
                          ? `${isUr ? "فی کس:" : "Per heir:"} ${h.sharePerIndividual.toLocaleString()} ${currency}`
                          : (isUr ? "منفرد حصہ دار" : "Individual share")}
                      </span>
                    </div>
                  </div>

                  <div className="text-end flex-shrink-0">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-[#edf3e7] text-[#245642] border border-[#b7c9a5]">
                        {h.fractionString}
                      </span>
                      <span className="text-xs font-bold text-stone-700">
                        {h.percentage}%
                      </span>
                    </div>
                    <strong className="text-sm font-extrabold text-[#172e22] block mt-1">
                      {h.totalMonetaryShare.toLocaleString()} {currency}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   9. BEFORE & AFTER SNAPSHOTS VIEW (NO PINK! High contrast comparison)
   ========================================================================= */
function BeforeAfterSnapshotsView({ result, isUr, currency }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Snapshot A */}
      <div className="p-6 rounded-2xl border-2 border-emerald-300 bg-[#f0fdf4] space-y-3.5 shadow-xs">
        <span className="text-xs font-extrabold text-[#166534] uppercase tracking-wider block">
          {isUr ? "منظر الف: تمام صلبی اولاد فوت شدہ (تنزیل فعال)" : "Snapshot A: All Direct Children Deceased (Tanzīl Active)"}
        </span>
        <p className="text-xs text-[#14532d] font-medium leading-relaxed">
          {isUr ? "پوتے، پوتیاں، نواسے اور نواسیاں اپنے والدین کے قائم مقام بن کر ان کا مکمل حصہ وصول کرتے ہیں۔" : "Grandchildren inherit their deceased parent's full fractional share via legal representation."}
        </p>
        <div className="p-3.5 rounded-xl bg-white border border-emerald-300 text-xs font-extrabold text-[#15803d]">
          {isUr ? "پوتے اور نواسے وارث ہیں ✓" : "Grandchildren are inheriting ✓"}
        </div>
      </div>

      {/* Snapshot B: High contrast stone instead of pink */}
      <div className="p-6 rounded-2xl border-2 border-stone-300 bg-[#fafaf9] space-y-3.5 shadow-xs">
        <span className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block">
          {isUr ? "منظر ب: ایک صلبی اولاد حیات (اقربیت فعال)" : "Snapshot B: One Direct Child Alive (Proximity Active)"}
        </span>
        <p className="text-xs text-stone-700 font-medium leading-relaxed">
          {isUr ? "قاعدۂ اقربیت کے تحت زندہ بیٹا یا بیٹی تمام پوتوں اور نواسوں کو قطعی طور پر محروم کر دیتا ہے۔" : "Under Al-Aqrab Yamna‘ al-Ab‘ad, a single surviving child completely excludes all grandchildren."}
        </p>
        <div className="p-3.5 rounded-xl bg-white border border-stone-300 text-xs font-extrabold text-stone-800">
          {isUr ? "پوتے مکمل محروم ہیں ✕" : "All grandchildren excluded ✕"}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   10. ESTATE TIMELINE VIEW
   ========================================================================= */
function EstateTimelineView({ result, isUr, currency }: any) {
  const steps = [
    { titleEn: "1. Death & Tajhīz", titleUr: "۱. وفات و تجہیز و تکفین", descEn: "Funeral costs cleared first from gross assets." },
    { titleEn: "2. Commercial Debts", titleUr: "۲. ادائے دیون الناس", descEn: "Secured and unsecured personal debts paid in full." },
    { titleEn: "3. Religious Debts", titleUr: "۳. ادائے حقوق اللہ", descEn: "Unpaid Khums, Zakat, Hajj, and Kaffarat deducted." },
    { titleEn: "4. Enforceable Will", titleUr: "۴. نفاذِ وصیت (ثلث)", descEn: "Wasiyyah executed up to 1/3 ceiling." },
    { titleEn: "5. Active Class Resolution", titleUr: "۵. تعینِ طبقۂ وراثت", descEn: "Hajb al-Hirman identifies the single inheriting tier." },
    { titleEn: "6. Final Blood Distribution", titleUr: "۶. تقسیمِ مابین ورثاء", descEn: "Qur'anic fixed shares, Tanzīl, and Radd distribution." },
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {steps.map((s, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white border border-[#d8e0d2] flex items-start gap-3.5 shadow-2xs">
          <div className="w-7 h-7 rounded-full bg-[#245642] text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
            {idx + 1}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#172e22] flex items-center gap-1.5">
              {idx === 3 ? (
                <WasiyyahLink section="thuluth" showBadge={false}>
                  {isUr ? s.titleUr : s.titleEn}
                </WasiyyahLink>
              ) : (
                isUr ? s.titleUr : s.titleEn
              )}
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 font-medium">{s.descEn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   11. INHERITANCE MATRIX GRID VIEW
   ========================================================================= */
function InheritanceMatrixGridView({ result, isUr, currency, deceased, openProvenance }: any) {
  const getTopicForHeir = (h: any) => {
    if (h.id === "husband") return "HUSBAND_SHARE";
    if (h.id === "wives" || h.id === "wife") return "WIDOW_LAND_VALUATION";
    if (h.id === "father" || h.id === "mother") return "PARENTS_SHARE";
    if (h.tier === 1) return "PROXIMITY_TIER1_VS_GRANDCHILDREN";
    return "BUTLAN_AL_AWL";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-start text-xs border-collapse">
        <thead>
          <tr className="border-b-2 border-stone-300 text-[#245642] font-extrabold bg-[#fafbf8]">
            <th className="py-3 px-3.5">{isUr ? "وارث" : "Heir"}</th>
            <th className="py-3 px-3.5">{isUr ? "تعداد" : "Count"}</th>
            <th className="py-3 px-3.5">{isUr ? "کسری حصہ" : "Fraction"}</th>
            <th className="py-3 px-3.5">{isUr ? "فیصد" : "Percentage"}</th>
            <th className="py-3 px-3.5">{isUr ? "کل رقم" : "Total Monetary"}</th>
            <th className="py-3 px-3.5">{isUr ? "شرعی سند و فتویٰ" : "Sharia Reference & Fatwa"}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {result.heirShares.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-xs text-stone-500 font-medium bg-stone-50/50">
                {isUr
                  ? "فی الوقت کوئی ورثاء درج نہیں ہیں۔ براہِ کرم وزرڈ میں ورثاء کا اندراج فرمائیں۔"
                  : "No heir shares calculated. Please record heirs in the Calculator Wizard."}
              </td>
            </tr>
          ) : (
            result.heirShares.map((h: any) => (
              <tr key={h.id} className="hover:bg-[#fafbf8] transition-colors">
                <td className="py-3 px-3.5 font-bold text-[#172e22]">{h.relationKey}</td>
                <td className="py-3 px-3.5 font-medium">{h.count}</td>
                <td className="py-3 px-3.5 font-extrabold text-[#245642]">{h.fractionString}</td>
                <td className="py-3 px-3.5 font-semibold">{h.percentage}%</td>
                <td className="py-3 px-3.5 font-bold text-[#172e22]">{h.totalMonetaryShare.toLocaleString()} {currency}</td>
                <td className="py-3 px-3.5 text-stone-600 font-medium">
                  <button
                    onClick={() => openProvenance(getTopicForHeir(h))}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#edf3e7] hover:bg-[#245642] text-[#245642] hover:text-white transition-colors font-bold text-[11px] border border-[#a5b69d]"
                  >
                    <Scale className="w-3 h-3" />
                    <span>{h.proof.quranReference || (isUr ? "شرعی فتویٰ" : "View Ruling")}</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================================
   12. GUIDED STORY MODE VIEW
   ========================================================================= */
function GuidedStoryView({ result, isUr, currency, deceased }: any) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 rounded-2xl bg-white border border-[#d8e0d2] text-sm leading-relaxed shadow-xs">
      <h3 className="text-lg font-bold font-cinzel text-[#245642]">
        {isUr ? "مرحوم کے ترکے کی شرعی داستانِ تقسیم" : "The Sacred Story of Estate Distribution"}
      </h3>

      <p className="text-stone-700 font-medium">
        {isUr
          ? `جب ${deceased.name || "مرحوم"} کا انتقال ہوا، تو ان کے ترکے کی کل مالیت ${result.balanceSheet.grossEstate.toLocaleString()} ${currency} تھی۔ سب سے پہلے شرعی واجبات بشمول تجہیز، دیون اور وصیت ادا کی گئیں۔ اس کے بعد تقسیم کے لیے خالص ترکہ ${result.balanceSheet.netDistributableEstate.toLocaleString()} ${currency} باقی بچا۔`
          : `When the deceased passed away, their gross estate was valued at ${result.balanceSheet.grossEstate.toLocaleString()} ${currency}. In strict accordance with divine law, all debts, funeral requirements, and religious obligations were discharged first, leaving ${result.balanceSheet.netDistributableEstate.toLocaleString()} ${currency} for legal heirs.`}
      </p>

      <p className="text-stone-700 font-medium">
        {isUr
          ? `فقہ جعفریہ کے احکام کے تحت طبقہ اول فعال ہوا، جس نے باقی تمام رشتہ داروں (بہن، بھائی، چچا، وغیرہ) کو محجوب کر دیا۔ اللہ تعالیٰ نے قرآنِ مجید میں فرمایا: "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ"۔`
          : `Under Ja'fari jurisprudence, Class 1 took immediate precedence, completely barring extended classes under the rule of divine proximity (Al-Aqrab Yamna' al-Ab'ad).`}
      </p>
    </div>
  );
}
