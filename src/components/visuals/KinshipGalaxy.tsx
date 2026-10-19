"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Sparkles,
  ShieldAlert,
  Lock,
  UserCheck,
  UserX,
  AlertTriangle,
  Scale,
  ArrowRight,
  Info,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Eye,
  CheckCircle2,
  XCircle,
  Layers,
  Heart,
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useInheritanceStore } from "@/store/useInheritanceStore";
import { calculateInheritance } from "@/lib/fiqh-engine";
import { MARJA_DATABASE } from "@/lib/marja-rules";
import { MarjaId } from "@/types/fiqh";
import { WasiyyahLink } from "@/components/wasiyyah/WasiyyahLink";

/* =========================================================================
   TYPES & NODE DEFINITIONS (SPATIOUS 1200 × 860 FULL HD MATRIX)
   ========================================================================= */

export type GalaxyNodeCategory =
  | "deceased"
  | "spouse"
  | "tier1_parent"
  | "tier1_child"
  | "paternal_tier2"
  | "paternal_tier3"
  | "maternal_tier2"
  | "maternal_tier3"
  | "imposter_inlaw"
  | "imposter_nonblood";

export type GalaxyNodeState = "active" | "blocked" | "non_heir" | "absent";

export interface GalaxyNodeDef {
  id: string;
  relationKey: string;
  nameEn: string;
  nameUr: string;
  culturalSubcontinentTermUr: string;
  x: number;
  y: number;
  category: GalaxyNodeCategory;
  tier: number; // 0 for spouse, 1, 2, 3, or -1 for non-heir
  mythWarningEn?: string;
  mythWarningUr?: string;
  fiqhExplanationEn: string;
  fiqhExplanationUr: string;
}

export const GALAXY_NODES: GalaxyNodeDef[] = [
  // 1. Central Deceased (Center Star)
  {
    id: "deceased",
    relationKey: "deceased",
    nameEn: "Deceased (Marḥūm)",
    nameUr: "مرحوم / مرحومہ",
    culturalSubcontinentTermUr: "صاحبِ جائیداد (متوفی)",
    x: 600,
    y: 420,
    category: "deceased",
    tier: 0,
    fiqhExplanationEn: "The deceased owner whose net estate is distributed strictly after funeral expenses and debt clearance.",
    fiqhExplanationUr: "صاحبِ ترکہ، جس کا مال تجہیز و تکفین اور ادائے دیون کے بعد ورثاء میں تقسیم ہوتا ہے۔",
  },

  // 2. Spouse (Golden Ring - Tier 0 Non-Excludable)
  {
    id: "spouse",
    relationKey: "spouse",
    nameEn: "Spouse (Wife / Husband)",
    nameUr: "شریکِ حیات (زوجہ / شوہر)",
    culturalSubcontinentTermUr: "بیوہ یا شوہر",
    x: 600,
    y: 575,
    category: "spouse",
    tier: 0,
    mythWarningEn: "Subcontinent myth: In-laws often demand dowry back or deny widows their Sharia share.",
    mythWarningUr: "برصغیر کا وہم: سسرال والے اکثر بیوہ کو اس کے شرعی حصے سے محروم کرنے کی کوشش کرتے ہیں۔",
    fiqhExplanationEn: "Non-excludable Quranic sharer. Takes 1/8 with children, 1/4 without children (Wife); or 1/4 with children, 1/2 without children (Husband).",
    fiqhExplanationUr: "غیر محجوب قرآنی وارث۔ اولاد کی موجودگی میں بیوہ کا ۱/۸ اور شوہر کا ۱/۴؛ ورنہ بالترتیب ۱/۴ اور ۱/۲۔",
  },

  // 3. Tier 1: Parents (Flanking Center-Lower)
  {
    id: "father",
    relationKey: "father",
    nameEn: "Father (Vālid)",
    nameUr: "والد (باپ)",
    culturalSubcontinentTermUr: "والدِ محترم",
    x: 450,
    y: 490,
    category: "tier1_parent",
    tier: 1,
    fiqhExplanationEn: "Tier 1 Ascendant. Takes 1/6 statutory share with children + participates in residue/Radd in specific cases.",
    fiqhExplanationUr: "طبقۂ اول کا وارث۔ اولاد کے ہمراہ ۱/۶ فرض حاصل کرتا ہے۔",
  },
  {
    id: "mother",
    relationKey: "mother",
    nameEn: "Mother (Vālidah)",
    nameUr: "والدہ (ماں)",
    culturalSubcontinentTermUr: "والدہ محترمہ",
    x: 750,
    y: 490,
    category: "tier1_parent",
    tier: 1,
    fiqhExplanationEn: "Tier 1 Ascendant. Takes 1/6 statutory share with children or brothers (Ḥujub al-Nuqṣān); otherwise takes 1/3.",
    fiqhExplanationUr: "طبقۂ اول کا وارث۔ اولاد یا بھائیوں کی موجودگی میں ۱/۶؛ بصورتِ دیگر ۱/۳۔",
  },

  // 4. Tier 1: Direct Children (Lower Sector)
  {
    id: "sons",
    relationKey: "sons",
    nameEn: "Sons (Bēṭā)",
    nameUr: "صلبی بیٹے",
    culturalSubcontinentTermUr: "صلبی بیٹا / بیٹے",
    x: 470,
    y: 650,
    category: "tier1_child",
    tier: 1,
    fiqhExplanationEn: "Tier 1 Descendant. Universal excluder of all Tier 2 and Tier 3 relatives and grandchildren.",
    fiqhExplanationUr: "طبقۂ اول کا بلاواسطہ وارث، جو طبقہ دوم و سوم کے تمام رشتہ داروں کو مکمل محروم کر دیتا ہے۔",
  },
  {
    id: "daughters",
    relationKey: "daughters",
    nameEn: "Daughters (Bēṭī)",
    nameUr: "صلبی بیٹیاں",
    culturalSubcontinentTermUr: "صلبی بیٹی / بیٹیاں",
    x: 730,
    y: 650,
    category: "tier1_child",
    tier: 1,
    mythWarningEn: "CRITICAL MYTH: Custom falsely dictates that when a man leaves only daughters, uncles take the residue. In Shia Fiqh, DAUGHTERS BLOCK ALL UNCLES AND TAKE 100% OF RESIDUE VIA RADD!",
    mythWarningUr: "سب سے بڑا خاندانی وہم: برصغیر کا رواج بیٹیوں کے ہوتے ہوئے چچاؤں کو وارث سمجھتا ہے۔ فقہ جعفریہ میں بیٹی چچا اور تایا کو مکمل محروم کر کے بقیہ سارا ترکہ بطورِ 'رد' خود لے لیتی ہے!",
    fiqhExplanationEn: "Takes prescribed fraction (1/2 if single, 2/3 if multiple) PLUS 100% of the surplus via Radd under Buṭlān al-Ta‘ṣīb. Blocks uncles completely!",
    fiqhExplanationUr: "فرض کے علاوہ بطلانِ تعصیب کے تحت تمام زائد مال رد کے ذریعے بیٹیوں کو ملتا ہے۔ چچا و تایا مکمل محروم رہتے ہیں۔",
  },
  {
    id: "pota_poti",
    relationKey: "pota_poti",
    nameEn: "Pōtā / Pōtī (Son's Branch)",
    nameUr: "پوتے و پوتیاں (اولادِ پسر)",
    culturalSubcontinentTermUr: "پوتا / پوتی (پدری شاخ - ۲ حصے)",
    x: 470,
    y: 755,
    category: "tier1_child",
    tier: 1,
    mythWarningEn: "PROXIMITY BARRIER: If ANY living direct child (son or daughter) exists, all grandchildren are barred (Al-Aqrab Yamna‘ al-Ab‘ad). Safeguard them via 1/3rd Waṣiyyah!",
    mythWarningUr: "قاعدۂ اقربیت: میت کی ایک بھی سگی اولاد زندہ ہو تو پوتے شرعاً محروم ہیں۔ دادا پر لازم ہے کہ زندگی میں ۱/۳ وصیت یا ہبہ فرمائیں۔",
    fiqhExplanationEn: "Tanzīl (Representation): Inherits ONLY when all direct children are deceased. Takes their deceased father's hypothetical share (divided 2:1 among brothers and sisters).",
    fiqhExplanationUr: "قائم مقامی (تنزیل): تمام صلبی اولاد کے فوت ہونے کی صورت میں اپنے والد (بیٹے) کا حصہ لیتے ہیں، اور آپس میں ۲:۱ کے تناسب سے تقسیم کرتے ہیں۔",
  },
  {
    id: "nawasa_nawasi",
    relationKey: "nawasa_nawasi",
    nameEn: "Nawāsā / Nawāsī (Daughter's Branch)",
    nameUr: "نواسے و نواسیاں (اولادِ دختر)",
    culturalSubcontinentTermUr: "نواسہ / نواسی (مادری شاخ - ۱ حصہ)",
    x: 730,
    y: 755,
    category: "tier1_child",
    tier: 1,
    mythWarningEn: "PROXIMITY BARRIER: Excluded if any direct child survives. In Shia Fiqh, Nawasa represents the mother and takes 1 share, while Poti takes 2 shares!",
    mythWarningUr: "حیرت انگیز فقہی عدل: نواسہ (لڑکا) ماں کے سبب ۱ حصہ لیتا ہے، جبکہ پوتی (لڑکی) باپ کے سبب ۲ حصے لیتی ہے (اعتبارِ اصل)۔",
    fiqhExplanationEn: "Tanzīl (Representation): Takes the hypothetical share of their deceased mother. Under Sistani and Khoei (Ahwat Wujubi), divided 2:1 among themselves.",
    fiqhExplanationUr: "قائم مقامی (تنزیل): اپنی مرحومہ ماں (بیٹی) کا حصہ لیتے ہیں۔ آیت اللہ سیستانی اور خوئی کے مطابق آپس میں ۲:۱ کے تناسب سے تقسیم کرتے ہیں۔",
  },

  // 5. Upper-Right Galaxy: Dādhīāl (Paternal Line - Tier 2 & 3)
  {
    id: "paternalGrandfather",
    relationKey: "paternalGrandfather",
    nameEn: "Dādā (Grandfather)",
    nameUr: "دادا",
    culturalSubcontinentTermUr: "دادا ابا (ددھیال)",
    x: 820,
    y: 290,
    category: "paternal_tier2",
    tier: 2,
    fiqhExplanationEn: "Tier 2. Inherits only if ZERO Tier 1 relatives (no children, no parents) exist.",
    fiqhExplanationUr: "طبقہ دوم کا وارث۔ صرف اسی وقت وارث بنتا ہے جب طبقہ اول (والدین یا اولاد) میں کوئی زندہ نہ ہو۔",
  },
  {
    id: "paternalGrandmother",
    relationKey: "paternalGrandmother",
    nameEn: "Dādī (Grandmother)",
    nameUr: "دادی",
    culturalSubcontinentTermUr: "دادی اماں (ددھیال)",
    x: 900,
    y: 370,
    category: "paternal_tier2",
    tier: 2,
    fiqhExplanationEn: "Tier 2. Inherits only if Tier 1 is completely empty.",
    fiqhExplanationUr: "طبقہ دوم کا وارث۔ طبقہ اول کے مکمل خالی ہونے پر وارث بنتی ہے۔",
  },
  {
    id: "paternalUncles",
    relationKey: "paternalUncles",
    nameEn: "Chachā / Tāyā (Uncles)",
    nameUr: "چچا / تایا",
    culturalSubcontinentTermUr: "چچا، تایا (ددھیال)",
    x: 950,
    y: 190,
    category: "paternal_tier3",
    tier: 3,
    mythWarningEn: "MYTH BUSTED: Chachas frequently claim property from orphaned nieces. Under Shia Fiqh, Chachas have 0 right if even a single daughter or grandparent survives!",
    mythWarningUr: "ابطالِ وہم: چچا کا بیٹیوں کے ہوتے ہوئے وراثت مانگنا شرعاً باطل ہے۔ ایک بیٹی بھی ہو تو چچا کا حصہ = صفر روپیہ!",
    fiqhExplanationEn: "Tier 3 relative. Completely barred by ANY living relative in Tier 1 (Children, Parents) or Tier 2 (Siblings, Grandparents).",
    fiqhExplanationUr: "طبقہ سوم کا وارث۔ طبقہ اول (اولاد و والدین) اور طبقہ دوم (بہن بھائی و دادا دادی) کی موجودگی میں قطعی محروم۔",
  },
  {
    id: "paternalAunts",
    relationKey: "paternalAunts",
    nameEn: "Phuphō (Aunt)",
    nameUr: "پھوپھی",
    culturalSubcontinentTermUr: "پھوپھی (ددھیال)",
    x: 1050,
    y: 270,
    category: "paternal_tier3",
    tier: 3,
    fiqhExplanationEn: "Tier 3 relative. Shares with paternal uncles (2:1 ratio) only if Tier 1 and Tier 2 are entirely vacant.",
    fiqhExplanationUr: "طبقہ سوم کا وارث۔ طبقہ اول و دوم کے نہ ہونے کی صورت میں چچا کے ہمراہ وارث بنتی ہے۔",
  },
  {
    id: "paternalCousins",
    relationKey: "paternalCousins",
    nameEn: "Paternal Cousin (Ibn ‘Amm)",
    nameUr: "چچازاد بھائی",
    culturalSubcontinentTermUr: "چچازاد بھائی",
    x: 1110,
    y: 160,
    category: "paternal_tier3",
    tier: 3,
    fiqhExplanationEn: "Distant agnate. Never inherits if living children, parents, siblings, or uncles exist (except the unique Ibn ‘Amm vs maternal uncle rule).",
    fiqhExplanationUr: "دور کا رشتہ دار۔ اقربیت کے اصول پر قریبی رشتہ داروں کی موجودگی میں مکمل محروم۔",
  },

  // 6. Upper-Left Galaxy: Nānhīāl (Maternal Line - Tier 2 & 3)
  {
    id: "maternalGrandfather",
    relationKey: "maternalGrandfather",
    nameEn: "Nānā (Grandfather)",
    nameUr: "نانا",
    culturalSubcontinentTermUr: "نانا ابا (ننھیال)",
    x: 380,
    y: 290,
    category: "maternal_tier2",
    tier: 2,
    mythWarningEn: "MYTH BUSTED: Subcontinent custom ignores maternal grandparents. In Ja'fari Fiqh, maternal grandparents have equal tier standing with paternal grandparents!",
    mythWarningUr: "ابطالِ وہم: برصغیر کا رواج نانا کو نظرانداز کرتا ہے، جبکہ فقہ جعفریہ میں نانا اور دادا دونوں طبقہ دوم کے مساوی وارث ہیں!",
    fiqhExplanationEn: "Tier 2. Inherits alongside maternal grandmother taking statutory 1/3 when Tier 1 is vacant.",
    fiqhExplanationUr: "طبقہ دوم کا وارث۔ نانی کے ہمراہ مادری ایک تہائی (۱/۳) کا مستحق بنتا ہے۔",
  },
  {
    id: "maternalGrandmother",
    relationKey: "maternalGrandmother",
    nameEn: "Nānī (Grandmother)",
    nameUr: "نانی",
    culturalSubcontinentTermUr: "نانی اماں (ننھیال)",
    x: 300,
    y: 370,
    category: "maternal_tier2",
    tier: 2,
    fiqhExplanationEn: "Tier 2. Inherits when Tier 1 is vacant, sharing the maternal 1/3 portion.",
    fiqhExplanationUr: "طبقہ دوم کا وارث۔ طبقہ اول کے نہ ہونے پر مادری حصہ پاتی ہے۔",
  },
  {
    id: "maternalUncles",
    relationKey: "maternalUncles",
    nameEn: "Māmūñ (Uncle)",
    nameUr: "ماموں",
    culturalSubcontinentTermUr: "ماموں جان (ننھیال)",
    x: 250,
    y: 190,
    category: "maternal_tier3",
    tier: 3,
    mythWarningEn: "MYTH BUSTED: Customary law treats Mamun as an outsider. In Shia Fiqh, Mamun takes 1/3 of the entire estate when uncles inherit!",
    mythWarningUr: "میکے کا شرعی حق: فقہ جعفریہ میں ماموں غیر وارث نہیں ہے بلکہ طبقہ سوم میں کل ترکے کے ۱/۳ کا قطعی مستحق ہے!",
    fiqhExplanationEn: "Tier 3 relative. Takes statutory 1/3rd of the estate (shared with maternal aunts) in the absence of Tier 1 and Tier 2.",
    fiqhExplanationUr: "طبقہ سوم کا وارث۔ خالہ کے ہمراہ مادری ایک تہائی (۱/۳) پاتا ہے، خواہ چچا موجود ہی کیوں نہ ہوں۔",
  },
  {
    id: "maternalAunts",
    relationKey: "maternalAunts",
    nameEn: "Khālā (Aunt)",
    nameUr: "خالہ",
    culturalSubcontinentTermUr: "خالہ جان (ننھیال)",
    x: 150,
    y: 270,
    category: "maternal_tier3",
    tier: 3,
    fiqhExplanationEn: "Tier 3 relative. Inherits alongside maternal uncles, dividing the 1/3 maternal portion equally.",
    fiqhExplanationUr: "طبقہ سوم کا وارث۔ ماموں کے ہمراہ مادری حصے میں شریک ہوتی ہے۔",
  },
  {
    id: "maternalCousins",
    relationKey: "maternalCousins",
    nameEn: "Maternal Cousin (Khālazād)",
    nameUr: "خالہ زاد بھائی",
    culturalSubcontinentTermUr: "خالہ زاد بھائی",
    x: 90,
    y: 160,
    category: "maternal_tier3",
    tier: 3,
    fiqhExplanationEn: "Tier 3 descendant. Inherits only if no living maternal or paternal uncles/aunts exist.",
    fiqhExplanationUr: "طبقہ سوم کا نچلا درجہ۔ ماموں یا خالہ کے نہ ہونے پر ان کا قائم مقام بنتا ہے۔",
  },

  // 7. Outer Imposter Belt (Right Sector: In-Laws)
  {
    id: "inlaw_bhabhi",
    relationKey: "bhabhi",
    nameEn: "Bhabhī (Sister-in-Law)",
    nameUr: "بھابھی",
    culturalSubcontinentTermUr: "بھابھی",
    x: 1110,
    y: 380,
    category: "imposter_inlaw",
    tier: -1,
    fiqhExplanationEn: "Permanent non-heir in Islamic Law.",
    fiqhExplanationUr: "شرعاً غیر وارث۔",
  },
  {
    id: "inlaw_dewar",
    relationKey: "dewar",
    nameEn: "Dēwar (Brother-in-Law)",
    nameUr: "دیور",
    culturalSubcontinentTermUr: "دیور (سسرال)",
    x: 1070,
    y: 490,
    category: "imposter_inlaw",
    tier: -1,
    mythWarningEn: "SUB-CONTINENT TRAP: Dewars often attempt to control or seize a widowed bhabhi's home or dowry. Dewar has 0% legal standing in Shia Fiqh!",
    mythWarningUr: "سسرالی فتنہ: دیور کا بیوہ بھابھی کے ترکے، جہیز یا مکان پر قبضہ کرنا شرعاً غصب اور حرام ہے۔ دیور کا حصہ = صفر!",
    fiqhExplanationEn: "In-law. Under Islamic Jurisprudence, in-laws have ZERO statutory inheritance.",
    fiqhExplanationUr: "سسرالی رشتہ دار۔ فقہ اسلامی کی رو سے سسرال کا ترکے میں کوئی خون کا شرعی حصہ نہیں ہوتا۔",
  },
  {
    id: "inlaw_jeth",
    relationKey: "jeth",
    nameEn: "Jēth (Brother-in-Law)",
    nameUr: "جیٹھ",
    culturalSubcontinentTermUr: "جیٹھ (سسرال)",
    x: 1010,
    y: 600,
    category: "imposter_inlaw",
    tier: -1,
    mythWarningEn: "Jeth has NO authority to dictate inheritance or claim late brother's estate over wife and children.",
    mythWarningUr: "جیٹھ کا اپنے مرحوم بھائی کے ترکے یا بھابھی و بچوں کے حق پر دعویٰ شرعاً قطعی باطل ہے۔",
    fiqhExplanationEn: "Permanent non-heir to the sister-in-law or her children.",
    fiqhExplanationUr: "شرعاً غیر وارث۔ سسرالی رشتہ داری کی بنا پر کسی مالی حق کا وجود نہیں۔",
  },
  {
    id: "inlaw_saas",
    relationKey: "saas",
    nameEn: "Sās (Mother-in-Law)",
    nameUr: "ساس",
    culturalSubcontinentTermUr: "ساس (خوشدامن)",
    x: 930,
    y: 700,
    category: "imposter_inlaw",
    tier: -1,
    mythWarningEn: "Mother-in-law has NO statutory share in her daughter-in-law's or son-in-law's estate.",
    mythWarningUr: "ساس کا بہو یا داماد کی وفات پر ان کے ترکے میں کوئی شرعی حق نہیں۔",
    fiqhExplanationEn: "In-law affinity (Muṣāharah) does not create inheritance rights.",
    fiqhExplanationUr: "مصاہرت (سسرالی تعلق) سے وراثت جاری نہیں ہوتی؛ وراثت کا مدار نسب اور نکاح پر ہے۔",
  },
  {
    id: "inlaw_sasur",
    relationKey: "sasur",
    nameEn: "Sāsur (Father-in-Law)",
    nameUr: "سسر",
    culturalSubcontinentTermUr: "سسر (خسر)",
    x: 820,
    y: 780,
    category: "imposter_inlaw",
    tier: -1,
    mythWarningEn: "Father-in-law cannot seize property of his deceased daughter-in-law.",
    mythWarningUr: "سسر اپنی مرحومہ بہو کے مال یا ترکے سے ایک روپیہ بھی نہیں لے سکتا۔",
    fiqhExplanationEn: "Zero statutory share under all 5 Maraji.",
    fiqhExplanationUr: "تمام پانچوں مراجع کے نزدیک سسر بہو کی جائیداد سے قطعی محروم ہے۔",
  },

  // 8. Outer Imposter Belt (Left Sector: Non-Blood Relatives)
  {
    id: "nonblood_stepmother",
    relationKey: "stepmother",
    nameEn: "Sautēlī Māñ (Stepmother)",
    nameUr: "سوتیلی ماں",
    culturalSubcontinentTermUr: "سوتیلی ماں",
    x: 90,
    y: 380,
    category: "imposter_nonblood",
    tier: -1,
    mythWarningEn: "A stepmother does NOT inherit from her stepchildren (and vice versa) due to absence of blood lineage.",
    mythWarningUr: "سوتیلی ماں سوتیلی اولاد کی جائیداد سے وارث نہیں بنتی کیونکہ نسبی تعلق موجود نہیں۔",
    fiqhExplanationEn: "No blood tie. Only her biological children inherit from her.",
    fiqhExplanationUr: "نسبی تعلق کا عدم وجود۔ وراثت کے لیے صلبی تعلق شرط ہے۔",
  },
  {
    id: "nonblood_stepbrother",
    relationKey: "stepbrother",
    nameEn: "Sautēlā Bhā'ī (Stepbrother)",
    nameUr: "سوتیلا بھائی",
    culturalSubcontinentTermUr: "سوتیلا بھائی (غیر نسبی)",
    x: 130,
    y: 490,
    category: "imposter_nonblood",
    tier: -1,
    fiqhExplanationEn: "A child of a step-parent from a previous marriage shares no blood and has 0% inheritance.",
    fiqhExplanationUr: "سوتیلے باپ یا ماں کی پچھلی شادی کا بچہ، جس سے کوئی مشترک ماں یا باپ نہ ہو، غیر وارث ہے۔",
  },
  {
    id: "nonblood_adopted",
    relationKey: "adopted",
    nameEn: "Adopted Child (Pālā Huā)",
    nameUr: "لے پالک بچہ (تبنیٰ)",
    culturalSubcontinentTermUr: "لے پالک / پالا ہوا بچہ",
    x: 190,
    y: 600,
    category: "imposter_nonblood",
    tier: -1,
    mythWarningEn: "IMPORTANT SHARIA REALITY: Under Islamic Law (Surah Al-Ahzab 33:4-5), informal adoption does NOT grant automatic blood inheritance. The adoptive parent MUST make a 1/3rd Waṣiyyah or lifetime gift (Hibah)!",
    mythWarningUr: "اہم ترین شرعی حقیقت: قرآنِ مجید (احزاب: ۵) کی رو سے لے پالک بچہ صلبی وارث نہیں بنتا۔ اسے جائیداد دینے کے لیے زندگی میں وصیت (ثلث) یا ہبہ کرنا شرعاً لازم ہے!",
    fiqhExplanationEn: "Adopted children have 0 automatic statutory blood share. The parent must allocate up to 1/3rd via Waṣiyyah or execute Hibat al-Ḥayāt.",
    fiqhExplanationUr: "خودکار شرعی حصہ صفر ہے۔ والدین پر لازم ہے کہ زندگی میں ثلثِ مال کی وصیت یا ہبہ کر کے ان کا حق محفوظ کریں۔",
  },
  {
    id: "inlaw_damad",
    relationKey: "damad",
    nameEn: "Dāmād / Bahū (In-Laws)",
    nameUr: "داماد / بہو",
    culturalSubcontinentTermUr: "داماد یا بہو",
    x: 270,
    y: 700,
    category: "imposter_inlaw",
    tier: -1,
    fiqhExplanationEn: "Sons-in-law and daughters-in-law never inherit from their parents-in-law.",
    fiqhExplanationUr: "داماد اور بہو ساس یا سسر کے ترکے سے قطعی غیر وارث ہیں۔",
  },
  {
    id: "inlaw_bahnoi",
    relationKey: "bahnoi",
    nameEn: "Bahno'ī (Brother-in-Law)",
    nameUr: "بہنوئی",
    culturalSubcontinentTermUr: "بہنوئی",
    x: 380,
    y: 780,
    category: "imposter_inlaw",
    tier: -1,
    fiqhExplanationEn: "In-law. Zero statutory inheritance.",
    fiqhExplanationUr: "سسرالی رشتہ۔ شرعی حصہ صفر۔",
  },
];

/* =========================================================================
   MYTH-BUSTER PRESETS
   ========================================================================= */

interface MythPreset {
  id: string;
  number: number;
  titleEn: string;
  titleUr: string;
  subtitleEn: string;
  subtitleUr: string;
  bannerUr: string;
  bannerEn: string;
  setup: {
    deceasedGender: "male" | "female";
    estateValue: number;
    spouseCount: number;
    sonsCount: number;
    daughtersCount: number;
    fatherAlive: boolean;
    motherAlive: boolean;
    paternalUnclesCount: number;
    maternalUnclesCount: number;
    paternalAuntsCount: number;
    maternalAuntsCount: number;
  };
  highlightedNodeIds: string[];
  blockedNodeIds: string[];
  padlockedNodeIds: string[];
  actionRecommendationUr?: string;
  actionRecommendationEn?: string;
}

export const MYTH_PRESETS: MythPreset[] = [
  {
    id: "greedy_uncle",
    number: 1,
    titleEn: "The Greedy Uncle Myth",
    titleUr: "چچا کا مفروضہ (بطلانِ تعصیب)",
    subtitleEn: "Deceased leaves 1 Wife, 2 Daughters, and 3 Chachas.",
    subtitleUr: "مرحوم نے ۱ بیوہ، ۲ بیٹیاں اور ۳ چچا چھوڑے۔",
    bannerUr: "قرآن و فقہِ جعفریہ: بیٹی کی موجودگی میں چچا اور تایا کا حصہ = 0 روپیہ (بطلانِ تعصیب)",
    bannerEn: "Ja'fari Fiqh: Daughters block all paternal uncles completely. Uncles receive 0 PKR via Repudiation of Ta'sīb!",
    setup: {
      deceasedGender: "male",
      estateValue: 10000000, // 1 Crore PKR
      spouseCount: 1,
      sonsCount: 0,
      daughtersCount: 2,
      fatherAlive: false,
      motherAlive: false,
      paternalUnclesCount: 3,
      maternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["spouse", "daughters"],
    blockedNodeIds: ["paternalUncles"],
    padlockedNodeIds: ["inlaw_dewar", "inlaw_jeth"],
    actionRecommendationUr: "برصغیر کے قبائلی دباؤ کا سدِ باب کریں: بیٹیوں کا حق ان کا الٰہی حق ہے، چچاؤں کا اس ترکے میں کوئی حصہ نہیں ہے۔",
    actionRecommendationEn: "Resist tribal pressure: The daughters lawfully inherit the entire residue via Radd; uncles have zero standing.",
  },
  {
    id: "inlaws_trap",
    number: 2,
    titleEn: "The In-Laws Trap",
    titleUr: "سسرال، دیور و جیٹھ کا دعویٰ",
    subtitleEn: "Deceased wife leaves Husband, Mother, and in-laws demanding dowry.",
    subtitleUr: "مرحومہ کے ترکے پر دیور، جیٹھ یا سسرال کا دعویٰ۔",
    bannerUr: "شرعی فیصلہ: سسرال، دیور یا جیٹھ کا بہو کے ترکے یا جہیز میں کوئی شرعی حق نہیں (حق = صفر)",
    bannerEn: "Sharia Verdict: In-laws, brother-in-law (Dewar/Jeth) have ZERO right in deceased woman's estate or dowry!",
    setup: {
      deceasedGender: "female",
      estateValue: 6000000,
      spouseCount: 1, // Husband
      sonsCount: 0,
      daughtersCount: 0,
      fatherAlive: false,
      motherAlive: true,
      paternalUnclesCount: 0,
      maternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["spouse", "mother"],
    blockedNodeIds: [],
    padlockedNodeIds: ["inlaw_dewar", "inlaw_jeth", "inlaw_saas", "inlaw_sasur"],
    actionRecommendationUr: "مرحومہ کا جہیز اور ذاتی جائیداد صرف اس کے شرعی ورثاء (شوہر اور ماں) کا حق ہے، سسرال کا نہیں۔",
    actionRecommendationEn: "The deceased woman's assets and bridal goods belong strictly to her Quranic heirs, not in-laws.",
  },
  {
    id: "maternal_parity",
    number: 3,
    titleEn: "Maternal Parity",
    titleUr: "میکہ بنام ددھیال (ماموں کا حق)",
    subtitleEn: "No Tier 1 or 2 relatives. Only Māmūñ (Maternal) and Chachā (Paternal) survive.",
    subtitleUr: "اولاد و والدین نہ ہونے پر ماموں اور چچا دونوں کا بیک وقت حق۔",
    bannerUr: "عدلِ قرآنی: ماموں غیر وارث نہیں! طبقہ سوم میں ماموں ۱/۳ اور چچا ۲/۳ پاتے ہیں",
    bannerEn: "Divine Balance: Maternal kin are not excluded! Mamun takes 1/3 and Chacha takes 2/3.",
    setup: {
      deceasedGender: "male",
      estateValue: 9000000,
      spouseCount: 0,
      sonsCount: 0,
      daughtersCount: 0,
      fatherAlive: false,
      motherAlive: false,
      paternalUnclesCount: 1,
      maternalUnclesCount: 1,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["maternalUncles", "paternalUncles"],
    blockedNodeIds: [],
    padlockedNodeIds: [],
    actionRecommendationUr: "میکے کی محرومی کا برصغیر کا وہم باطل ہے؛ فقہ جعفریہ ماموں کو ۱/۳ کا قطعی حق دیتا ہے۔",
    actionRecommendationEn: "Shatters paternal favoritism: Shia law guarantees 1/3rd to maternal uncle alongside paternal relatives.",
  },
  {
    id: "orphaned_grandchild",
    number: 4,
    titleEn: "The Orphaned Grandchild",
    titleUr: "یتیم پوتے کا مسئلہ (قاعدۂ اقربیت)",
    subtitleEn: "Deceased leaves 1 Living Daughter and 1 Orphaned Grandson.",
    subtitleUr: "زندہ بیٹی کی موجودگی میں فوت شدہ بیٹے کا پوتا شرعاً محروم ہوتا ہے۔",
    bannerUr: "انتباہ: بیٹی کی موجودگی میں پوتا وارث نہیں بنتا (الأقرب یمنع الأبعد)۔ دادا کو وصیت یا ہبہ کرنا ضروری ہے!",
    bannerEn: "Proximity Alert: Living daughter blocks grandson. Grandfather must protect him via 1/3rd Wasiyyah or Hibah!",
    setup: {
      deceasedGender: "male",
      estateValue: 12000000,
      spouseCount: 0,
      sonsCount: 0,
      daughtersCount: 1,
      fatherAlive: false,
      motherAlive: false,
      paternalUnclesCount: 0,
      maternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["daughters"],
    blockedNodeIds: ["pota_poti", "nawasa_nawasi"],
    padlockedNodeIds: [],
    actionRecommendationUr: "فوری حل: دادا اپنی زندگی میں ۱/۳ وصیت یا ہبۂ حیات کے ذریعے یتیم پوتے کو محفوظ فرمائیں۔",
    actionRecommendationEn: "Sharia Solution: Grandfather must use 1/3rd Post-Mortem Wasiyyah or Inter-Vivos Gift to safeguard grandson.",
  },
  {
    id: "adopted_child",
    number: 5,
    titleEn: "The Adopted Child Reality",
    titleUr: "لے پالک بچہ (تبنیٰ اور وصیت)",
    subtitleEn: "Adopted child (Pālā huā bachā) has 0% automatic blood inheritance.",
    subtitleUr: "لے پالک بچہ قرآن کی رو سے صلبی وارث نہیں بنتا؛ وصیت یا ہبہ لازمی ہے۔",
    bannerUr: "قرآن (احزاب: ۵): لے پالک بچے کو وارث بنانے کے لیے ثلث (۱/۳) وصیت یا ہبۂ حیات لازمی ہے",
    bannerEn: "Quran (33:5): Adopted children do not inherit automatically. Secure them via 1/3rd Will or Lifetime Gift!",
    setup: {
      deceasedGender: "male",
      estateValue: 8000000,
      spouseCount: 1,
      sonsCount: 0,
      daughtersCount: 0,
      fatherAlive: true,
      motherAlive: true,
      paternalUnclesCount: 0,
      maternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["spouse", "father", "mother"],
    blockedNodeIds: [],
    padlockedNodeIds: ["nonblood_adopted"],
    actionRecommendationUr: "قانونی تحفظ: پلے ہوئے بچے کو محرومی سے بچانے کے لیے فوری طور پر تحریری وصیت (۱/۳ تک) یا ہبہ کریں۔",
    actionRecommendationEn: "Legal Action: Execute a written 1/3rd Waṣiyyah or Hibat al-Ḥayāt immediately to protect the adopted child.",
  },
  {
    id: "multiple_wives",
    number: 6,
    titleEn: "Multiple Wives (2 to 4 Zawjāt)",
    titleUr: "تعددِ ازواج (۲ تا ۴ بیویاں اور مساوی تقسیم)",
    subtitleEn: "Equal division (Bi al-Sawiyyah) of the 1/8th or 1/4th spousal share among all surviving wives.",
    subtitleUr: "تمام زندہ بیویاں ۱/۸ (یا اولاد نہ ہونے پر ۱/۴) کو آپس میں بالکل برابر بانٹتی ہیں۔",
    bannerUr: "فقہ جعفریہ: بیویاں اپنے ۱/۸ یا ۱/۴ کے مجموعی حصے کو آپس میں برابر برابر (بالسویہ) تقسیم کرتی ہیں۔",
    bannerEn: "Equal Division (Bi al-Sawiyyah): All valid permanent wives divide their 1/8th or 1/4th statutory share equally.",
    setup: {
      deceasedGender: "male",
      estateValue: 16000000,
      spouseCount: 2,
      sonsCount: 1,
      daughtersCount: 1,
      fatherAlive: false,
      motherAlive: false,
      paternalUnclesCount: 0,
      maternalUnclesCount: 0,
      paternalAuntsCount: 0,
      maternalAuntsCount: 0,
    },
    highlightedNodeIds: ["spouse", "sons", "daughters"],
    blockedNodeIds: ["pota_poti", "nawasa_nawasi"],
    padlockedNodeIds: [],
    actionRecommendationUr: "تمام بیویوں کا حصہ مساوی ہے، کسی پرانی یا نئی بیوی میں ترکے کی تقسیم میں کوئی فرق نہیں ہے۔",
    actionRecommendationEn: "All permanent wives share equally; senior or junior marriage status creates no difference in statutory inheritance.",
  },
];

/* =========================================================================
   MAIN COMPONENT: KINSHIP GALAXY (FULL HD CELESTIAL OBSERVATORY)
   ========================================================================= */

export function KinshipGalaxy() {
  const {
    language,
    deceased,
    updateDeceased,
    setMarja,
    assets,
    updateAssets,
    debts,
    heirs,
    updateHeirs,
    getCalculationResult,
    openProvenance,
    setActiveView,
  } = useInheritanceStore();

  const isUr = language === "ur";
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("daughters");
  const [activePresetId, setActivePresetId] = useState<string>("greedy_uncle");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Font and Scale Zoom state (0.8x to 1.4x)
  const [fontZoom, setFontZoom] = useState<number>(1.0);

  // Fullscreen state & container reference
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  // Active Preset definition
  const activePreset = useMemo(
    () => MYTH_PRESETS.find((p) => p.id === activePresetId) || MYTH_PRESETS[0],
    [activePresetId]
  );

  // Apply a Myth-Buster Preset
  const handleApplyPreset = (preset: MythPreset) => {
    setActivePresetId(preset.id);
    updateDeceased({
      gender: preset.setup.deceasedGender,
    });
    updateAssets({
      cash: preset.setup.estateValue,
      bankAccounts: 0,
      residentialLand: 0,
      commercialLand: 0,
      agriculturalLand: 0,
      buildingsAndFixtures: 0,
      movableProperty: 0,
    });
    updateHeirs({
      spouseCount: preset.setup.spouseCount,
      sonsCount: preset.setup.sonsCount,
      daughtersCount: preset.setup.daughtersCount,
      fatherAlive: preset.setup.fatherAlive,
      motherAlive: preset.setup.motherAlive,
      paternalUnclesCount: preset.setup.paternalUnclesCount,
      maternalUnclesCount: preset.setup.maternalUnclesCount,
      paternalAuntsCount: preset.setup.paternalAuntsCount,
      maternalAuntsCount: preset.setup.maternalAuntsCount,
    });
    if (preset.highlightedNodeIds[0]) {
      setSelectedNodeId(preset.highlightedNodeIds[0]);
    }
  };

  // Live Engine Calculation
  const calculation = useMemo(() => getCalculationResult(), [getCalculationResult]);
  const netEstate = calculation.balanceSheet?.netDistributableEstate ?? 0;
  const currency = "PKR";

  // Dynamic rendered nodes supporting multiple wives
  const renderedGalaxyNodes = useMemo(() => {
    const isMale = deceased.gender === "male";
    const wifeProfiles = heirs.wives && heirs.wives.length > 0 ? heirs.wives : [];
    const wifeCount = isMale ? (wifeProfiles.length > 1 ? wifeProfiles.length : Math.max(1, heirs.spouseCount || 1)) : 1;

    // If male and > 1 wife, replace single "spouse" node with individual wife nodes along inner orbit
    if (isMale && wifeCount > 1) {
      const baseNodes = GALAXY_NODES.filter((n) => n.id !== "spouse");

      // Generate positions along the lower arc of inner orbit (cx=600, cy=420, r=190)
      const wifeAngleMap: Record<number, number[]> = {
        2: [72, 108],
        3: [60, 90, 120],
        4: [50, 75, 105, 130],
      };
      const angles = wifeAngleMap[wifeCount] || [60, 80, 100, 120];

      const wifeNodes: GalaxyNodeDef[] = Array.from({ length: wifeCount }).map((_, idx) => {
        const profile = wifeProfiles[idx];
        const angleDeg = angles[idx] ?? 90;
        const rad = (angleDeg * Math.PI) / 180;
        const x = Math.round(600 + 190 * Math.cos(rad));
        const y = Math.round(420 + 190 * Math.sin(rad));

        const wifeName = profile?.name ? profile.name : `Wife ${idx + 1}`;
        const wifeId = profile?.id || `wife-${idx + 1}`;

        return {
          id: wifeId,
          relationKey: "wife",
          nameEn: wifeName,
          nameUr: `زوجہ ${idx + 1}: ${wifeName}`,
          culturalSubcontinentTermUr: `زوجہ ${idx + 1} (بالسویہ مساوی شریک)`,
          x,
          y,
          category: "spouse" as GalaxyNodeCategory,
          tier: 0,
          mythWarningEn: "Equal division: In Shia Fiqh, all permanent wives share the 1/8th or 1/4th equally regardless of seniority.",
          mythWarningUr: "مساوی تقسیم: تمام بیویاں ترکے میں بالکل برابر حصہ پاتی ہیں، کسی پرانی یا نئی بیوی میں تفریق نہیں ہے۔",
          fiqhExplanationEn: "Non-excludable Quranic sharer. Takes equal fraction of the total spousal pool (Bi al-Sawiyyah).",
          fiqhExplanationUr: "غیر محجوب قرآنی وارث۔ تمام بیویاں ۱/۸ یا ۱/۴ کے حصۂ زوجات میں بالسویہ بالکل برابر شریک ہیں۔",
        };
      });

      return [...baseNodes, ...wifeNodes];
    }

    return GALAXY_NODES;
  }, [deceased.gender, heirs.wives, heirs.spouseCount]);

  // Compute 4-state visual physics for all nodes
  const nodeStatusMap = useMemo(() => {
    const map: Record<
      string,
      {
        state: GalaxyNodeState;
        shareFraction: string;
        shareAmount: number;
        percentage: number;
        blockingReason?: string;
      }
    > = {};

    renderedGalaxyNodes.forEach((node) => {
      // 1. Deceased
      if (node.id === "deceased") {
        map[node.id] = {
          state: "active",
          shareFraction: "100%",
          shareAmount: netEstate,
          percentage: 100,
        };
        return;
      }

      // 2. Non-Heir Belt (Padlocked Imposters)
      if (node.category === "imposter_inlaw" || node.category === "imposter_nonblood") {
        map[node.id] = {
          state: "non_heir",
          shareFraction: "0",
          shareAmount: 0,
          percentage: 0,
          blockingReason: isUr ? "شرعاً غیر وارث (خون کا رشتہ نہیں ہے)" : "Permanent Non-Heir in Fiqh (No blood lineage)",
        };
        return;
      }

      // 3. Multi-Wife Individual Nodes
      if (node.id.startsWith("wife-") || (node.category === "spouse" && node.id !== "spouse")) {
        const wifeIdx = heirs.wives?.findIndex((w) => w.id === node.id) ?? -1;
        const wifeDetail = calculation.spousalBreakdown?.wives[wifeIdx >= 0 ? wifeIdx : 0];
        const spousalShare = calculation.heirShares.find((h) => h.id.includes("wife") || h.id === "wives");

        if (spousalShare && spousalShare.totalMonetaryShare > 0) {
          const frac = wifeDetail?.fraction || (spousalShare.fractionString ? `${spousalShare.fractionString}/${calculation.spousalBreakdown?.wifeCount || 2}` : "1/16");
          const amt = wifeDetail?.amount || Math.round(spousalShare.totalMonetaryShare / (calculation.spousalBreakdown?.wifeCount || 2));
          map[node.id] = {
            state: "active",
            shareFraction: frac,
            shareAmount: Math.round(amt),
            percentage: (amt / (netEstate || 1)) * 100,
          };
        } else {
          map[node.id] = {
            state: "absent",
            shareFraction: "—",
            shareAmount: 0,
            percentage: 0,
          };
        }
        return;
      }

      // 4. Grandchildren Nodes (Pota/Poti & Nawasa/Nawasi)
      if (node.id === "pota_poti" || node.id === "nawasa_nawasi") {
        const hasDirectChildren =
          (heirs.childrenList && heirs.childrenList.some((c) => c.isAlive)) ||
          heirs.sonsCount > 0 ||
          heirs.daughtersCount > 0;

        if (hasDirectChildren) {
          // Blocked by Golden Proximity Rule
          map[node.id] = {
            state: "blocked",
            shareFraction: "0",
            shareAmount: 0,
            percentage: 0,
            blockingReason: isUr
              ? "قاعدۂ اقربیت فعال: متوفی کی سگی صلبی اولاد (بیٹا یا بیٹی) زندہ ہونے کے سبب پوتے اور نواسے شرعاً مکمل محروم ہیں (الأقرب یمنع الأبعد)۔"
              : "Golden Proximity Rule Active: Living direct child blocks grandchildren from statutory inheritance (Al-Aqrab Yamna‘ al-Ab‘ad).",
          };
          return;
        }

        // If direct children are deceased, check Tanzil share in calculation
        const isPota = node.id === "pota_poti";
        const tanzilShare = calculation.heirShares.find(
          (h) => isPota ? (h.id === "grandsons" || h.id.includes("pota")) : (h.id.includes("nawasa") || h.id.includes("daughterBranch"))
        );

        if (tanzilShare && tanzilShare.totalMonetaryShare > 0) {
          map[node.id] = {
            state: "active",
            shareFraction: tanzilShare.fractionString,
            shareAmount: Math.round(tanzilShare.totalMonetaryShare),
            percentage: tanzilShare.percentage,
          };
        } else {
          map[node.id] = {
            state: "absent",
            shareFraction: "—",
            shareAmount: 0,
            percentage: 0,
          };
        }
        return;
      }

      // 5. Match standard nodes against engine heirShares
      const match = calculation.heirShares.find((h) => {
        if (node.id === "spouse") return h.id === "wife" || h.id === "wives" || h.id === "husband";
        if (node.id === "father") return h.id === "father";
        if (node.id === "mother") return h.id === "mother";
        if (node.id === "sons") return h.id === "sons";
        if (node.id === "daughters") return h.id === "daughters";
        if (node.id === "paternalUncles") return h.id === "paternalUncles";
        if (node.id === "maternalUncles") return h.id === "maternalUncles";
        if (node.id === "paternalAunts") return h.id === "paternalAunts";
        if (node.id === "maternalAunts") return h.id === "maternalAunts";
        if (node.id === "paternalGrandfather") return h.id === "paternalGrandfather";
        if (node.id === "maternalGrandfather") return h.id === "maternalGrandfather";
        return false;
      });

      if (match && match.totalMonetaryShare > 0) {
        map[node.id] = {
          state: "active",
          shareFraction: match.fractionString,
          shareAmount: Math.round(match.totalMonetaryShare),
          percentage: match.percentage,
        };
      } else {
        // Check if blocked by closer tier
        let isBlocked = false;
        let blocker = "";

        if (node.id === "paternalUncles" && heirs.paternalUnclesCount > 0) {
          if (heirs.daughtersCount > 0 || heirs.sonsCount > 0 || heirs.fatherAlive || heirs.motherAlive) {
            isBlocked = true;
            blocker = isUr ? "بیٹی / بیٹے یا والدین کی موجودگی کے سبب مکمل محروم (بطلانِ تعصیب)" : "Blocked by Tier 1 (Children/Parents) via Buṭlān al-Ta‘ṣīb";
          }
        } else if (node.id === "paternalGrandfather" && heirs.paternalGrandfatherAlive) {
          if (heirs.fatherAlive || heirs.sonsCount > 0 || heirs.daughtersCount > 0) {
            isBlocked = true;
            blocker = isUr ? "صلبی اولاد یا والد کی موجودگی سے محروم (اقربیت)" : "Blocked by living Father or Children via Proximity";
          }
        }

        if (isBlocked) {
          map[node.id] = {
            state: "blocked",
            shareFraction: "0",
            shareAmount: 0,
            percentage: 0,
            blockingReason: blocker,
          };
        } else {
          map[node.id] = {
            state: "absent",
            shareFraction: "—",
            shareAmount: 0,
            percentage: 0,
          };
        }
      }
    });

    return map;
  }, [calculation, heirs, isUr, netEstate, renderedGalaxyNodes]);

  // Selected Node Object
  const selectedNode = useMemo(
    () => renderedGalaxyNodes.find((n) => n.id === selectedNodeId) || renderedGalaxyNodes[0],
    [renderedGalaxyNodes, selectedNodeId]
  );
  const selectedStatus = nodeStatusMap[selectedNode.id] || {
    state: "absent",
    shareFraction: "0",
    shareAmount: 0,
    percentage: 0,
  };

  return (
    <div
      ref={containerRef}
      className={`space-y-6 transition-all duration-300 ${
        isFullscreen ? "p-6 bg-[#040d09] min-h-screen overflow-y-auto" : ""
      }`}
      dir={isUr ? "rtl" : "ltr"}
    >
      {/* 1. SUBCONTINENT MYTH-BUSTER FLOATING PRESET TOOLBAR */}
      <div className="p-5 rounded-3xl bg-[#0a1813] border-2 border-[#15803d]/40 shadow-xl text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center text-white shadow-lg shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {isUr ? "برصغیر کا وہم شکن فلک" : "Subcontinent Myth-Shatterer"}
                </span>
                <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
                  • 1200 × 860 Full HD Celestial Canvas
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-emerald-100 pt-1">
                {isUr ? (
                  <span className="font-nastaliq leading-[2.2]">فلکِ قرابت و بطلانِ اوہام</span>
                ) : (
                  <span>The Kinship Galaxy & Myth-Shatterer</span>
                )}
              </h2>
            </div>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {MYTH_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-400"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-mono">
                    {preset.number}
                  </span>
                  <span>{isUr ? preset.titleUr : preset.titleEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic High-Impact Myth-Busting Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 via-black to-emerald-950/80 border border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300 block">
                {isUr ? "شرعی و عدالتی حقیقت:" : "Jurisprudential Breakthrough:"}
              </span>
              <p className="text-sm font-bold text-white pt-0.5 leading-relaxed font-nastaliq">
                {isUr ? activePreset.bannerUr : activePreset.bannerEn}
              </p>
            </div>
          </div>

          {activePreset.actionRecommendationUr && (
            <div className="text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 self-start sm:self-center flex items-center gap-2 flex-wrap">
              <span>{isUr ? activePreset.actionRecommendationUr : activePreset.actionRecommendationEn}</span>
              {(activePreset.id === "orphaned_grandchild" || activePreset.id === "adopted_child") && (
                <WasiyyahLink section="thuluth" className="text-amber-300 font-bold text-xs underline">
                  {isUr ? "احکامِ وصیت" : "Will Rules"}
                </WasiyyahLink>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. THE CELESTIAL CANVAS & LIVE CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Galaxy Canvas Container (Spans 3 cols on desktop) */}
        <div className="lg:col-span-3 rounded-3xl bg-[#07130e] border-2 border-[#164e3a] p-4 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[720px]">
          {/* Canvas Background Stars & Radiance */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#133527]/50 via-[#07130e] to-black pointer-events-none" />

          {/* Canvas Top Bar: Controls, Zoom, Legend, Fullscreen */}
          <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 pb-3 px-2 border-b border-white/10 gap-3 flex-wrap">
            {/* Color Legend */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                {isUr ? "وارثِ شرعی (حصہ دار)" : "Active Sharer"}
              </span>
              <span className="flex items-center gap-1.5 text-red-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                {isUr ? "محجوبِ حرمان (محروم)" : "Blocked by Tier"}
              </span>
              <span className="flex items-center gap-1.5 text-stone-400 font-bold">
                <Lock className="w-3 h-3 text-amber-400" />
                {isUr ? "شرعاً غیر وارث (سسرال)" : "Ineligible In-Law"}
              </span>
            </div>

            {/* Interactive Zoom Controls & Fullscreen Trigger */}
            <div className="flex items-center gap-2">
              {/* Font / Scale Zoom Bar */}
              <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/15">
                <button
                  onClick={() => setFontZoom((prev) => Math.max(0.8, Number((prev - 0.15).toFixed(2))))}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-stone-300 hover:text-white transition-colors"
                  title={isUr ? "فونٹ سائز چھوٹا کریں" : "Decrease text size"}
                  aria-label="Zoom out font"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setFontZoom(1.0)}
                  className="px-2 py-0.5 text-[11px] font-mono text-emerald-300 hover:text-white font-bold"
                  title={isUr ? "اصل فونٹ سائز پر ری سیٹ کریں" : "Reset font scale to 100%"}
                >
                  {Math.round(fontZoom * 100)}%
                </button>

                <button
                  onClick={() => setFontZoom((prev) => Math.min(1.45, Number((prev + 0.15).toFixed(2))))}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-stone-300 hover:text-white transition-colors"
                  title={isUr ? "فونٹ سائز بڑا کریں" : "Increase text size"}
                  aria-label="Zoom in font"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Net Estate Badge */}
              <span className="text-[11px] text-stone-300 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 font-mono hidden sm:inline">
                {netEstate.toLocaleString()} {currency}
              </span>

              {/* Reset Simulation Button */}
              <button
                onClick={() => handleApplyPreset(activePreset)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 transition-colors border border-white/10"
                title={isUr ? "نقشہ ری سیٹ کریں" : "Reset simulation"}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-xs"
                title={isFullscreen ? (isUr ? "فل اسکرین بند کریں" : "Exit Fullscreen") : (isUr ? "مکمل اسکرین کریں" : "Fullscreen View")}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? (isUr ? "معمول" : "Exit") : (isUr ? "فل اسکرین" : "Full HD")}</span>
              </button>
            </div>
          </div>

          {/* THE SVG CELESTIAL CANVAS (1200 × 860 EXPANDED VIEWBOX) */}
          <div className="relative w-full flex-1 flex items-center justify-center py-2 overflow-hidden">
            <svg
              viewBox="0 0 1200 860"
              className="w-full h-auto select-none"
              style={{
                filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.08))",
                maxHeight: isFullscreen ? "88vh" : "680px",
              }}
            >
              <defs>
                {/* Glow Filters */}
                <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="crimsonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradients */}
                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </radialGradient>
                <radialGradient id="paternalNebula" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="maternalNebula" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. SECTOR NEBULAE (BACKGROUND GLOWS) */}
              {/* Dādhīāl (Paternal) Upper-Right Nebula */}
              <circle cx="950" cy="270" r="220" fill="url(#paternalNebula)" />
              <g transform="translate(950, 75)">
                <rect x="-110" y="-12" width="220" height="26" rx="13" fill="#1e1808" fillOpacity="0.85" stroke="#d97706" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">
                  {isUr ? "ددھیال (عصبہ و قرابت)" : "DĀDHĪĀL (Paternal Sector)"}
                </text>
              </g>

              {/* Nānhīāl (Maternal) Upper-Left Nebula */}
              <circle cx="250" cy="270" r="220" fill="url(#maternalNebula)" />
              <g transform="translate(250, 75)">
                <rect x="-110" y="-12" width="220" height="26" rx="13" fill="#061c14" fillOpacity="0.85" stroke="#10b981" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                  {isUr ? "ننھیال (مادری حصہ دار)" : "NĀNHĪĀL (Maternal Sector)"}
                </text>
              </g>

              {/* 2. HIGH-CONTRAST CELESTIAL ORBITS */}
              {/* Outer Imposter Asteroid Belt (High-Contrast Red Barrier) */}
              <circle
                cx="600"
                cy="420"
                r="410"
                fill="none"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="9 7"
                opacity="0.85"
                filter="url(#crimsonGlow)"
              />
              {/* Imposter Belt Warning Banner Pill */}
              <g transform="translate(600, 836)">
                <rect x="-240" y="-13" width="480" height="28" rx="14" fill="#200606" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
                <text x="0" y="5" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                  {isUr
                    ? "حلقۂ اغیار و سسرال — شرعی حق = صفر روپیہ (Permanent Non-Heirs)"
                    : "OUTER IMPOSTER BELT — In-Laws & Non-Blood Relatives (0% Statutory Right)"}
                </text>
              </g>

              {/* Inner Celestial Orbit (Radiant Gold Tier 1 Ring) */}
              <circle
                cx="600"
                cy="420"
                r="190"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                opacity="0.85"
                filter="url(#goldGlow)"
              />
              {/* Inner Orbit Title Pill */}
              <g transform="translate(600, 240)">
                <rect x="-135" y="-12" width="270" height="24" rx="12" fill="#1b1406" fillOpacity="0.9" stroke="#f59e0b" strokeWidth="1.2" />
                <text x="0" y="4" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                  {isUr ? "حلقۂ فرض و اولویت (Tier 1 & Spouse Orbit)" : "INNER SANCTUM (Tier 1 & Spouse Orbit)"}
                </text>
              </g>

              {/* Genealogical Descent Branch Lines (Sons -> Pota/Poti & Daughters -> Nawasa/Nawasi) */}
              <line
                x1="470"
                y1="650"
                x2="470"
                y2="755"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeOpacity="0.7"
              />
              <line
                x1="730"
                y1="650"
                x2="730"
                y2="755"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeOpacity="0.7"
              />

              {/* 3. CONNECTING LASER BEAMS TO ACTIVE HEIRS */}
              {renderedGalaxyNodes.map((node) => {
                if (node.id === "deceased") return null;
                const status = nodeStatusMap[node.id];
                if (!status || status.state !== "active") return null;

                return (
                  <g key={`beam-${node.id}`}>
                    <line
                      x1="600"
                      y1="420"
                      x2={node.x}
                      y2={node.y}
                      stroke="#10b981"
                      strokeWidth="2.8"
                      strokeOpacity="0.85"
                      filter="url(#emeraldGlow)"
                    />
                    <circle cx={(600 + node.x) / 2} cy={(420 + node.y) / 2} r="3.5" fill="#a7f3d0" />
                  </g>
                );
              })}

              {/* 4. BLOCKED TIER CRIMSON SLASH LINES */}
              {renderedGalaxyNodes.map((node) => {
                const status = nodeStatusMap[node.id];
                if (!status || status.state !== "blocked") return null;

                return (
                  <g key={`blocked-${node.id}`}>
                    <line
                      x1={node.x - 32}
                      y1={node.y - 32}
                      x2={node.x + 32}
                      y2={node.y + 32}
                      stroke="#ef4444"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#crimsonGlow)"
                    />
                  </g>
                );
              })}

              {/* 5. RENDER ALL RELATIVE NODES WITH PROTECTIVE LABEL BACKDROP CAPSULES */}
              {renderedGalaxyNodes.map((node) => {
                const status = nodeStatusMap[node.id] || { state: "absent", shareFraction: "0", shareAmount: 0 };
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isDeceased = node.id === "deceased";

                // Visual styling based on state
                let fillColor = "#1e293b";
                let strokeColor = "#475569";
                let radius = 25;

                if (isDeceased) {
                  fillColor = "url(#sunGradient)";
                  strokeColor = "#fef08a";
                  radius = 36;
                } else if (status.state === "active") {
                  fillColor = "#064e3b";
                  strokeColor = "#10b981";
                  radius = 27;
                } else if (status.state === "blocked") {
                  fillColor = "#450a0a";
                  strokeColor = "#ef4444";
                  radius = 24;
                } else if (status.state === "non_heir") {
                  fillColor = "#0f172a";
                  strokeColor = "#94a3b8";
                  radius = 22;
                }

                // Dynamic dimensions with fontZoom
                const titleText = isUr ? node.nameUr : node.nameEn;
                const baseFontSize = isDeceased ? Math.round(13 * fontZoom) : Math.round(11 * fontZoom);
                const badgeFontSize = Math.round(9.5 * fontZoom);

                // Approximate pill width based on text length and fontZoom
                const approxChars = Math.max(titleText.length, 10);
                const pillWidth = Math.max(90, Math.round(approxChars * 8.5 * fontZoom + 16));
                const pillHeight = isDeceased ? Math.round(24 * fontZoom) : Math.round(38 * fontZoom);
                const pillYOffset = radius + 9;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Pulsing selection halo */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 8}
                        fill="none"
                        stroke={isDeceased ? "#eab308" : status.state === "active" ? "#34d399" : "#f87171"}
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                        className="animate-spin"
                        style={{ animationDuration: "12s" }}
                      />
                    )}

                    {/* Node Main Sphere */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? "3.5" : "2"}
                      filter={
                        status.state === "active"
                          ? "url(#emeraldGlow)"
                          : status.state === "blocked"
                          ? "url(#crimsonGlow)"
                          : undefined
                      }
                    />

                    {/* Center Glyph or Fraction */}
                    {isDeceased ? (
                      <text x={node.x} y={node.y + 6} textAnchor="middle" fill="#451a03" fontSize="15" fontWeight="900">
                        ★
                      </text>
                    ) : status.state === "non_heir" ? (
                      <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
                        🔒
                      </text>
                    ) : status.state === "blocked" ? (
                      <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">
                        ✕
                      </text>
                    ) : (
                      <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#ecfdf5" fontSize="12" fontWeight="bold">
                        {status.shareFraction}
                      </text>
                    )}

                    {/* PROTECTIVE LABEL BACKDROP CAPSULE (Prevents any line or circle collision) */}
                    <g transform={`translate(${node.x}, ${node.y + pillYOffset})`}>
                      <rect
                        x={-pillWidth / 2}
                        y={0}
                        width={pillWidth}
                        height={pillHeight}
                        rx={7}
                        fill="#05140e"
                        fillOpacity="0.92"
                        stroke={
                          isSelected
                            ? isDeceased
                              ? "#eab308"
                              : "#34d399"
                            : status.state === "active"
                            ? "#10b981"
                            : status.state === "blocked"
                            ? "#ef4444"
                            : "#334155"
                        }
                        strokeWidth={isSelected ? "1.8" : "1"}
                        strokeOpacity={isSelected ? "1" : "0.75"}
                      />

                      {/* Primary Kinship Name */}
                      <text
                        x={0}
                        y={isDeceased ? pillHeight / 2 + 4 : Math.round(14 * fontZoom)}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#f1f5f9"}
                        fontSize={baseFontSize}
                        fontWeight="bold"
                      >
                        {titleText}
                      </text>

                      {/* Financial Share Metric or Disqualification Tag */}
                      {!isDeceased && (
                        <text
                          x={0}
                          y={Math.round(29 * fontZoom)}
                          textAnchor="middle"
                          fill={
                            status.state === "active"
                              ? "#34d399"
                              : status.state === "blocked"
                              ? "#f87171"
                              : "#94a3b8"
                          }
                          fontSize={badgeFontSize}
                          fontWeight="extrabold"
                        >
                          {status.state === "active"
                            ? `${status.shareAmount.toLocaleString()} ${currency}`
                            : status.state === "blocked"
                            ? isUr
                              ? "0 PKR (محروم)"
                              : "0 PKR (Blocked)"
                            : isUr
                            ? "0 PKR (غیر وارث)"
                            : "0 PKR (Non-Heir)"}
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 3. RELATIVE INSPECTOR & JURISPRUDENTIAL PROOF SHEET */}
        <div className="rounded-3xl bg-white border border-[#d8e0d2] p-6 shadow-lg flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#edf3e7] pb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#245642] px-2.5 py-0.5 rounded-full bg-[#edf3e7] border border-[#a5b69d]">
                {isUr ? "تفتیشِ رشتہ دار و سند" : "Relative Inspector"}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  selectedStatus.state === "active"
                    ? "bg-emerald-100 text-emerald-800"
                    : selectedStatus.state === "blocked"
                    ? "bg-red-100 text-red-800"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                {selectedStatus.state === "active"
                  ? isUr
                    ? "وارثِ شرعی"
                    : "Active Sharer"
                  : selectedStatus.state === "blocked"
                  ? isUr
                    ? "محجوبِ حرمان (محروم)"
                    : "Blocked by Tier"
                  : isUr
                  ? "شرعاً غیر وارث"
                  : "Permanent Non-Heir"}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-cinzel text-[#172e22]">
                {isUr ? selectedNode.nameUr : selectedNode.nameEn}
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {isUr
                  ? `عرفی نام: ${selectedNode.culturalSubcontinentTermUr}`
                  : `Subcontinent Term: ${selectedNode.culturalSubcontinentTermUr}`}
              </p>
            </div>

            {/* Financial Metrics Card */}
            <div className="p-4 rounded-2xl bg-[#fafbf8] border border-[#d8e0d2] space-y-2">
              <div className="flex justify-between items-center text-xs text-stone-600 font-bold">
                <span>{isUr ? "مقررہ قرآنی حصہ:" : "Quranic Statutory Share:"}</span>
                <span className="font-mono text-sm text-[#245642] font-extrabold">
                  {selectedStatus.shareFraction}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-600 font-bold border-t border-[#edf3e7] pt-2">
                <span>{isUr ? "کل مالیت (نقدی):" : "Monetary Share (PKR):"}</span>
                <span className="font-mono text-base text-emerald-700 font-extrabold">
                  {selectedStatus.shareAmount.toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-stone-500 pt-1">
                <span>{isUr ? "کل ترکے کا تناسب:" : "Percentage of Estate:"}</span>
                <span className="font-mono font-bold">
                  {selectedStatus.percentage.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Subcontinent Myth Callout */}
            {selectedNode.mythWarningUr && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  {isUr ? "برصغیر کا رائج غلط مفروضہ:" : "Subcontinent Customary Myth:"}
                </span>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {isUr ? selectedNode.mythWarningUr : selectedNode.mythWarningEn}
                </p>
              </div>
            )}

            {/* Inspector Warning Alert: Orphaned Grandchildren & Adopted Children (Preset 4 & 5) */}
            {(activePreset.id === "orphaned_grandchild" ||
              activePreset.id === "adopted_child" ||
              selectedNode.id === "nonblood_adopted" ||
              (selectedNode.id === "pota_poti" && selectedStatus.state === "blocked")) && (
              <div className="p-3.5 rounded-2xl bg-[#fffbeb] border-2 border-[#f59e0b] shadow-xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350f]">
                  <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span>
                    {isUr
                      ? "شرعی انتباہ و حل: ثلث وصیت کی فوری ضرورت"
                      : "Sharia Remedy: Safeguard via 1/3rd Waṣiyyah"}
                  </span>
                </div>
                <p className="text-xs text-[#92400e] leading-relaxed font-medium font-nastaliq leading-[2.2]">
                  {isUr ? (
                    <>
                      انہیں قطعی محرومی سے بچانے کے لیے سرپرست کو چاہیے کہ وہ{" "}
                      <WasiyyahLink section="thuluth">
                        ایک تہائی (ثلث) مال کی وصیت
                      </WasiyyahLink>{" "}
                      یا اپنی زندگی میں ہبۂ حیات کا شرعی معاہدہ لازماً تحریر فرمائیں۔
                    </>
                  ) : (
                    <>
                      To safeguard this dependent from total statutory exclusion, the guardian should execute a{" "}
                      <WasiyyahLink section="thuluth">
                        discretionary 1/3rd Waṣiyyah
                      </WasiyyahLink>{" "}
                      or an inter-vivos gift (Hibat al-Ḥayāt).
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Fiqhi Explanation */}
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold text-[#245642] uppercase tracking-wider block">
                {isUr ? "شرعی فقہی اصول:" : "Ja'fari Jurisprudential Basis:"}
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {isUr ? selectedNode.fiqhExplanationUr : selectedNode.fiqhExplanationEn}
              </p>
              {selectedStatus.blockingReason && (
                <p className="text-xs text-red-700 font-bold pt-1">
                  ⚠️ {selectedStatus.blockingReason}
                </p>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-2 pt-2 border-t border-[#edf3e7]">
            <button
              onClick={() => openProvenance("PROXIMITY_TIER1_VS_GRANDCHILDREN")}
              className="w-full py-2.5 rounded-xl bg-[#245642] hover:bg-[#172e22] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isUr ? "مراجع کی مستند اسناد دیکھیں" : "View Scholarly Fatwa Citations"}</span>
            </button>
            <button
              onClick={() => setActiveView("visuals")}
              className="w-full py-2 rounded-xl bg-[#edf3e7] hover:bg-[#dce5d4] text-[#245642] text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#c3d5bb]"
            >
              <span>{isUr ? "تمام ۱۲ بصری ماڈلز دیکھیں" : "Explore Visual Observatory"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
