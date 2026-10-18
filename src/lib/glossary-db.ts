export type GlossaryCategory = 'ESTATE' | 'TIERS' | 'DISTRIBUTION' | 'PLANNING' | 'IMPEDIMENTS';

export interface MarjaNuances {
  sistani?: string;
  khamenei?: string;
  khoei?: string;
  makarem?: string;
  najafi?: string;
  bashir?: string;
}

export interface GlossaryItem {
  id: string;
  termArabic: string;
  termUrdu: string;
  termEnglish: string;
  transliteration: string;
  category: GlossaryCategory;
  shortDefinitionEn: string;
  shortDefinitionUr: string;
  detailedExplanationEn: string;
  detailedExplanationUr: string;
  exampleScenarioEn?: string;
  exampleScenarioUr?: string;
  marjaNuance?: MarjaNuances;
  relatedTerms: string[];
}

export const GLOSSARY_CATEGORIES: Record<GlossaryCategory, { en: string; ur: string; icon: string }> = {
  ESTATE: {
    en: 'Estate & Assets',
    ur: 'ترکہ و اثاثہ جات',
    icon: 'Coins',
  },
  TIERS: {
    en: 'Tiers & Blocking',
    ur: 'طبقات و حجب',
    icon: 'Layers',
  },
  DISTRIBUTION: {
    en: 'Distribution Rules',
    ur: 'تقسیم اور خسارہ',
    icon: 'Scale',
  },
  PLANNING: {
    en: 'Estate Planning',
    ur: 'منصوبہ بندی و ہبہ',
    icon: 'FileCheck',
  },
  IMPEDIMENTS: {
    en: 'Legal Disqualifiers',
    ur: 'موانعِ ارث',
    icon: 'ShieldAlert',
  },
};

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  // 1. TARKAH
  {
    id: 'tarkah',
    termArabic: 'التَّرْكَة',
    termUrdu: 'تَرْکَہ (مَیِّت کا چھوڑا ہوا مال)',
    termEnglish: 'Gross vs. Net Distributable Estate',
    transliteration: 'Al-Tarkah',
    category: 'ESTATE',
    shortDefinitionEn: 'The total assets left behind by the deceased before clearing debts, funeral expenses, Khums, or bequests.',
    shortDefinitionUr: 'متوفی کا چھوڑا ہوا کل اثاثہ جس میں سے ابھی تک قرض، حقوق اللہ، کفن دفن یا وصیت ادا نہ کی گئی ہو۔',
    detailedExplanationEn: 'In Ja‘fari jurisprudence, an estate undergoes two distinct legal phases: Majmū‘ al-Tarkah (Gross Estate) and Al-Tarkah al-Ṣāfiyah (Net Estate). Statutory heirs divide ONLY what remains after four prior rights are discharged in strict divine order: (1) Minimal respectful funeral expenses (Tajhīz), (2) Debts secured by collateral (Duyūn al-‘Ayniyyah), (3) Unsecured debts including unfulfilled religious obligations like Khums and unpaid Zakat or Mahr, and (4) Valid testamentary bequests (Waṣiyyah) capped at 1/3rd of what remains.',
    detailedExplanationUr: 'فقہ جعفریہ میں ترکہ کے دو مراحل ہوتے ہیں: مجموع التَرکہ (کل جائیداد) اور التَرکہ الصافیہ (خالص قابلِ تقسیم ترکہ)۔ ورثاء میں صرف وہی مال تقسیم ہوتا ہے جو چار حقوق کی ادائیگی کے بعد بچے: (۱) مناسب تجہیز و تکفین کے اخراجات، (۲) مَیِّت کے ذمہ واجب الادا قرضے جن میں بیوہ کا مہر اور واجب الخمس/زکوٰۃ بھی شامل ہیں، (۳) جائز وصیت (زیادہ سے زیادہ ایک تہائی ترکہ میں سے)۔ ان کے بعد جو بچے وہی اصل ورثاء کا حق ہے۔',
    exampleScenarioEn: 'A deceased leaves $120,000 in cash. He owes $20,000 in unpaid Mahr to his wife and $10,000 in Khums. His funeral costs $5,000, and he willed $15,000 to an orphanage. First, $35,000 is deducted for debts and funeral. The remainder is $85,000. The 1/3 bequest of $15,000 is valid (since $15k is under 1/3 of $85k). The net distributable estate is $70,000, which the statutory heirs then divide.',
    exampleScenarioUr: 'ایک شخص کا کل اثاثہ ایک کروڑ روپے ہے۔ اس کے ذمے 20 لاکھ روپے بیوہ کا مہر، 5 لاکھ روپے خمس اور 5 لاکھ تجہیز و تکفین تھی۔ یہ 30 لاکھ ادا کرنے کے بعد ترکہ 70 لاکھ بچا۔ اس نے 10 لاکھ کی وصیت کی تھی جو 70 لاکھ کے ایک تہائی سے کم ہونے کے باعث مکمل نافذ ہوگی۔ باقی بچنے والا 60 لاکھ روپے خالص ترکہ ہے جو ورثاء میں تقسیم ہوگا۔',
    relatedTerms: ['wasiyyah', 'furud', 'aradi'],
  },

  // 2. HABWAH
  {
    id: 'habwah',
    termArabic: 'الحَبْوَة',
    termUrdu: 'حَبْوَہ (بڑے بیٹے کا خصوصی شرعی حق)',
    termEnglish: "Eldest Son's Divine Prerogative",
    transliteration: 'Al-Ḥabwah',
    category: 'ESTATE',
    shortDefinitionEn: 'Four designated personal articles of a deceased father granted gratuitously by divine law to his eldest living sane son.',
    shortDefinitionUr: 'والد کے انتقال پر اس کی چار مخصوص ذاتی اشیاء جو شرعاً مفت میں سب سے بڑے عاقل و بالغ بیٹے کو ملتی ہیں۔',
    detailedExplanationEn: 'Ḥabwah consists of 4 specific personal items belonging to a deceased father: (1) His personal Qur’an, (2) His ring, (3) His personal sword or personal defensive weapon, and (4) The clothes he wore or tailored for wear. It is a divine grant exclusively from a father (not a mother). In exchange for this privilege, the eldest son shoulders the primary moral and jurisprudential responsibility of making up any missed prayers (Qaḍā’ Ṣalāt) and missed fasts (Ṣawm) of his deceased father.',
    detailedExplanationUr: 'حبوہ والد کی چار ذاتی اشیاء پر مشتمل ہوتا ہے: (۱) اس کا ذاتی قرآن مجید، (۲) اس کی انگوٹھی، (۳) اس کی تلوار یا ذاتی دفاعی اسلحہ، اور (۴) اس کے پہنے ہوئے کپڑے۔ یہ تحفہ صرف والد کی وراثت میں ہے، والدہ کی نہیں، اور اس بیٹے کو ملتا ہے جو باپ کی وفات کے وقت زندہ، عاقل اور باپ کا نافرمان (عاق) نہ ہو۔ اس استحقاق کے بدلے میں بڑے بیٹے پر والد کی چھوٹی ہوئی نمازوں اور روزوں کی قضا ادا کرنا واجب ہو جاتی ہے۔',
    exampleScenarioEn: 'A father passes away leaving two sons and two daughters. The eldest son receives the father’s heirloom signet ring, personal Qur’an, tailored thobe, and hunting dagger directly as Ḥabwah. These 4 items are NOT subtracted from his regular inheritance share; he then shares equally with his brother in the remainder of the estate according to Quranic ratios.',
    exampleScenarioUr: 'والد کے انتقال کے بعد ان کی انگوٹھی، ذاتی قرآن، تلوار اور کپڑے سب سے بڑے بیٹے کو بغیر کسی کٹوتی کے الگ ملیں گے۔ اس کے بعد مکان اور بینک بیلنس کی تقسیم میں وہ اپنے چھوٹے بھائی کے برابر معمول کے مطابق اپنا پورا حصہ وصول کرے گا۔',
    marjaNuance: {
      sistani: 'The son must not be an intentional apostate or disobedient (Āqq). If debts consume the entire estate, Ḥabwah is nullified and used to settle debts. If debts partially consume the estate, the son compensates proportionally.',
      khamenei: 'Agrees on the 4 canonical items (Qur’an, ring, sword/weapon, clothes). If the deceased father leaves multiple rings or clothes, only those predominantly used are included unless specified.',
      khoei: 'Held that if the deceased’s entire estate consists only of these four items and nothing else remains for the other heirs, granting them as Ḥabwah is problematic (Iḥtiyāṭ).',
      makarem: 'Extends modern personal weapons (like a registered hunting rifle) in place of the archaic sword, provided it was his personal sidearm.',
      bashir: 'Strictly conditions that the eldest son must be capable of fulfilling the father’s missed religious obligations (Qaḍā’).',
      najafi: 'Strictly conditions that the eldest son must be capable of fulfilling the father’s missed religious obligations (Qaḍā’).',
    },
    relatedTerms: ['tarkah', 'tabaqat'],
  },

  // 3. ARADI
  {
    id: 'aradi',
    termArabic: 'الأَرَاضِي وَحَقُّ الزَّوْجَة',
    termUrdu: 'اَرَاضِی اور بیوہ کے حقوقِ جائیداد',
    termEnglish: "Widow's Land & Real Estate Inheritance",
    transliteration: 'Al-Arāḍī',
    category: 'ESTATE',
    shortDefinitionEn: 'Special jurisprudential rules dictating whether a widow inherits the physical soil of land, its monetary appraisal, or only the buildings upon it.',
    shortDefinitionUr: 'فقہ جعفریہ میں بیوہ کے لیے زمین کی مٹی، اس کی نقدی قیمت، یا صرف عمارت کے حق کے حوالے سے خاص شرعی احکام۔',
    detailedExplanationEn: 'In Ja‘fari jurisprudence, a unique scriptural rule protects family patrimony from outside fragmentation by restricting how a widow inherits real property. While a husband inherits from everything his deceased wife leaves behind (including soil and buildings), a widow’s inheritance from real estate depends on whether the property is unimproved land, agricultural dirt, or improved residential/commercial structures, with major nuanced rulings across contemporary Marāji‘.',
    detailedExplanationUr: 'فقہ جعفریہ میں خاندانی جائیداد کے شیرازے کو بکھرنے سے بچانے کے لیے بیوہ کے زمین میں حصے سے متعلق منفرد احکام ہیں۔ شوہر تو بیوی کی ہر چیز (زمین، مٹی، عمارت، سونا) سے وارث بنتا ہے، لیکن بیوہ کے حوالے سے مراجعِ عظام کے درمیان تفصیلی فتاویٰ ہیں کہ آیا وہ زمین کی مٹی کی مالک بنتی ہے یا دیگر ورثاء اسے زمین کی مارکیٹ ویلیو کے مطابق کیش ادا کرنے کے پابند ہیں۔',
    exampleScenarioEn: 'A husband leaves a plot of residential land valued at $100,000 with a house built upon it valued at $100,000 (total $200,000) and has surviving children. The widow’s share is 1/8th. Under Sayyid Sistani, she receives 1/8th of the monetary value of BOTH the house ($12,500) and the land ($12,500) totaling $25,000 in cash. Under Sayyid Khoei, she receives 1/8th only of the building value ($12,500) and 0 from the land.',
    exampleScenarioUr: 'ایک شخص نے ایک مکان چھوڑا جس کی زمین کی قیمت ایک کروڑ اور اوپر بنی عمارت کی قیمت ایک کروڑ ہے (کل 2 کروڑ)۔ اولاد کی موجودگی میں بیوہ کا حصہ 1/8 (ساڑھے بارہ فیصد) ہے۔ آیت اللہ العظمیٰ سیستانی کے مطابق بیوہ کو عمارت اور زمین دونوں کی نقدی قیمت میں سے 1/8 (یعنی 25 لاکھ روپے کیش) ملے گا۔ جبکہ آیت اللہ العظمیٰ خوئی کے مطابق زمین کی قیمت میں سے کچھ نہیں ملے گا، صرف عمارت کی اینٹوں کی قیمت میں سے 1/8 (یعنی ساڑھے بارہ لاکھ) ملے گا۔',
    marjaNuance: {
      sistani: 'The widow inherits her 1/8th or 1/4th share from the MONETARY VALUE (Qīmah) of all land (residential, commercial, and agricultural), as well as the physical buildings and trees. The other heirs cannot deny her this cash value.',
      khamenei: 'Agrees with Sayyid Sistani: The widow receives the monetary appraised value of the land itself, as well as the building fixtures.',
      khoei: 'Ruled that the widow inherits ZERO from the land itself (neither physical dirt nor monetary value). She inherits strictly from the monetary value of the standing buildings, fixtures, and trees.',
      makarem: 'Advises that the widow is entitled to the value of residential land, but for purely agricultural farmland, the traditional restriction to building value holds.',
      bashir: 'Restricts the widow to the value of the construction and fixtures, excluding the unbuilt soil unless the other heirs voluntarily compensate her.',
      najafi: 'Restricts the widow to the value of the construction and fixtures, excluding the unbuilt soil unless the other heirs voluntarily compensate her.',
    },
    relatedTerms: ['qimah', 'tarkah', 'furud'],
  },

  // 4. QIMAH
  {
    id: 'qimah',
    termArabic: 'القِيمَة',
    termUrdu: 'قِیمَت (نقدی مالیت بنام مٹی یا اینٹ)',
    termEnglish: 'Monetary Valuation vs. Physical Soil',
    transliteration: 'Al-Qīmah',
    category: 'ESTATE',
    shortDefinitionEn: 'Entitlement to the cash equivalent of an appraised asset rather than fractional co-ownership of physical land or brick.',
    shortDefinitionUr: 'جائیداد میں جسمانی شرکت کے بجائے اس کے تخمینہ شدہ مارکیٹ ریٹ کے مطابق نقدی کیش وصول کرنے کا شرعی حق۔',
    detailedExplanationEn: 'When an heir is awarded a share in Qīmah (monetary value) rather than ‘Ayn (physical corpus), they do not become a fractional registered co-owner of the deed. Instead, the surviving heirs are divinely obligated to have the asset fairly appraised by certified, honest assessors (Ahl al-Khibrah) at current fair market value and disburse that monetary amount to the heir immediately. The heir cannot be forced to accept less, nor can the heirs withhold payment.',
    detailedExplanationUr: 'جب کسی وارث کو عینِ جائیداد (زمین یا اینٹوں) کی بجائے "قیمت" کا حقدار ٹھہرایا جاتا ہے، تو اس کا مطلب یہ ہے کہ وہ زمین کی رجسٹری میں مشترکہ مالک نہیں بنتی تاکہ خاندانی تنازعات پیدا نہ ہوں۔ لیکن دیگر تمام ورثاء شرعاً گناہگار ہوں گے اگر وہ دیانتدار ماہرین سے اس کی مارکیٹ ویلیو کا درست تخمینہ لگوا کر اس کا بننے والا کیش فوری طور پر اس کے حوالے نہ کریں۔',
    exampleScenarioEn: 'A family home has a courtyard tree and building worth $80,000. The widow is owed $10,000 cash (her 1/8th value). The sons cannot demand that she dismantle bricks or wait indefinitely; they must secure $10,000 cash from the bank or estate liquid funds and pay her in full.',
    exampleScenarioUr: 'والد کے مکان کی عمارت کی قیمت 80 لاکھ لگائی گئی۔ بیوہ کا حصہ 10 لاکھ بنتا ہے۔ بیٹے بیوہ کو یہ نہیں کہہ سکتے کہ مکان بکے گا تو پیسے دیں گے؛ اگر وہ مکان اپنے پاس رکھنا چاہتے ہیں تو انہیں 10 لاکھ روپے کیش فوری بیوہ کو ادا کرنا ہوگا۔',
    relatedTerms: ['aradi', 'tarkah'],
  },

  // 5. TABAQAT
  {
    id: 'tabaqat',
    termArabic: 'طَبَقَاتُ الإِرْثِ الثَّلَاثَة',
    termUrdu: 'طَبَقَاتِ ثَلَاثَہ (وراثت کے تین شرعی درجات)',
    termEnglish: 'The Three Strict Statutory Classes',
    transliteration: 'Al-Ṭabaqāt al-Thalāthah',
    category: 'TIERS',
    shortDefinitionEn: 'The three non-negotiable statutory tiers of blood relatives in Shia law; presence of even one heir in Tier 1 completely excludes Tiers 2 and 3.',
    shortDefinitionUr: 'شیعہ فقہ میں خونی رشتہ داروں کے تین اٹل درجات؛ درجہ اول میں ایک بھی وارث موجود ہو تو درجہ دوم اور سوم کے سب رشتے مکمل محروم ہو جاتے ہیں۔',
    detailedExplanationEn: 'Unlike systems that blend distant agnates with immediate family, Ja‘fari law arranges all blood heirs into three mutually exclusive vertical classes: Class 1 (Parents + Direct Children and grandchildren), Class 2 (Grandparents + Siblings and their descendants), Class 3 (Paternal & Maternal Uncles/Aunts and their children). The existence of any heir in Class 1 completely and unconditionally blocks all members of Class 2 and Class 3. The spouse (Husband/Wife) inherits in ALL classes alongside whichever class is active.',
    detailedExplanationUr: 'اہل سنت کے برعکس فقہ جعفریہ میں تمام خونی رشتہ دار تین مستقل طبقات میں تقسیم ہیں: طبقہ اول (والدین اور بلاواسطہ اولاد)، طبقہ دوم (دادا، دادی، نانا، نانی اور بہن بھائی)، طبقہ سوم (چچا، پھوپھی، ماموں، خالہ اور ان کی اولاد)۔ اگر طبقہ اول میں صرف ایک بیٹی بھی زندہ ہو، تو طبقہ دوم اور سوم کا کوئی فرد (نہ بھائی، نہ چچا) ایک روپیہ نہیں لے سکتا۔ صرف شوہر یا بیوی وہ واحد رشتے ہیں جو ہر طبقے کے ساتھ اپنا مقررہ حصہ پاتے ہیں۔',
    exampleScenarioEn: 'A man dies leaving 1 Daughter and 3 living Brothers. Because the Daughter is in Class 1 and Brothers are in Class 2, the Daughter inherits 100% of the estate (1/2 Quranic share + 1/2 surplus by Radd). The Brothers receive exactly 0 PKR.',
    exampleScenarioUr: 'ایک شخص کے انتقال پر اس کی ایک بیٹی اور تین سگے بھائی زندہ ہیں۔ چونکہ بیٹی طبقہ اول میں ہے اور بھائی طبقہ دوم میں، اس لیے بیٹی اکیلے پورے 100 فیصد ترکے کی وارث بنے گی (آدھا قرآنی فریضہ اور باقی آدھا رد کے ذریعے)۔ تینوں بھائیوں کو صفر روپیہ ملے گا۔',
    relatedTerms: ['hujub_hirman', 'aqrab_yamna_abad', 'butlan_tasib'],
  },

  // 6. HUJUB_HIRMAN
  {
    id: 'hujub_hirman',
    termArabic: 'حَجْبُ الحِرْمَان',
    termUrdu: 'حَجْبِ حِرْمَان (مکمل رکاوٹ یا کلی محرومی)',
    termEnglish: 'Total Jurisprudential Exclusion',
    transliteration: 'Ḥujub al-Ḥirmān',
    category: 'TIERS',
    shortDefinitionEn: 'When the legal presence of a closer heir completely strips a distant relative of any inheritance entitlement.',
    shortDefinitionUr: 'جب کسی قریبی وارث کی موجودگی کی وجہ سے دور کا رشتہ دار وراثت سے سرے سے اور مکمل طور پر محروم ہو جائے۔',
    detailedExplanationEn: 'Ḥujub al-Ḥirmān is total exclusion. It operates across two dimensions in Shia Fiqh: (1) Inter-Tier Exclusion: Any surviving heir in Class 1 completely eliminates everyone in Classes 2 and 3; (2) Intra-Tier Exclusion: Within the same class, a closer degree eliminates a further degree (e.g., a living child excludes all grandchildren; a living brother excludes all nephews and nieces). Only the spouse is permanently immune to Ḥujub al-Ḥirmān.',
    detailedExplanationUr: 'حجبِ حرمان کا مطلب ہے کسی وارث کا دوسرے کو مکمل طور پر وراثت سے محروم کر دینا۔ یہ دو طرح سے ہوتا ہے: (۱) طبقاتی حجب: طبقہ اول کے موجود ہونے سے طبقہ دوم و سوم کلی طور پر باہر ہو جاتے ہیں۔ (۲) درجاتی حجب: ایک ہی طبقے میں قریبی رشتہ دور کے رشتے کو روک دیتا ہے (جیسے بیٹے کی موجودگی میں پوتے، یا بھائی کی موجودگی میں بھتیجے محروم ہو جاتے ہیں)۔ میاں اور بیوی کو کبھی کوئی حجبِ حرمان کا شکار نہیں کر سکتا۔',
    exampleScenarioEn: 'A grandmother demands a share of her deceased grandson’s wealth, but the deceased left a living Mother. The Mother is Degree 1 in Class 1, completely blocking the Grandmother (who belongs to Class 2). The Grandmother receives 0 PKR due to Ḥujub al-Ḥirmān.',
    exampleScenarioUr: 'ایک نوجوان فوت ہوا جس کی ماں اور نانی دونوں زندہ تھیں۔ چونکہ ماں طبقہ اول میں ہے اور نانی طبقہ دوم میں، اس لیے ماں کی موجودگی کی وجہ سے نانی "حجبِ حرمان" کے تحت مکمل محروم ہو جائے گی۔',
    relatedTerms: ['tabaqat', 'hujub_nuqsan', 'aqrab_yamna_abad'],
  },

  // 7. HUJUB_NUQSAN
  {
    id: 'hujub_nuqsan',
    termArabic: 'حَجْبُ النُّقْصَان',
    termUrdu: 'حَجْبِ نُقْصَان (حصے کی جزوی کمی)',
    termEnglish: 'Partial Share Diminution',
    transliteration: 'Ḥujub al-Nuqṣān',
    category: 'TIERS',
    shortDefinitionEn: 'When the presence of certain relatives reduces an heir’s statutory fraction without excluding them entirely.',
    shortDefinitionUr: 'جب کسی رشتہ دار کی موجودگی کی وجہ سے دوسرے وارث کا حصہ مکمل ختم تو نہ ہو، لیکن کم ہو جائے۔',
    detailedExplanationEn: 'Unlike total blocking, Ḥujub al-Nuqṣān merely downscales an heir’s Quranic fraction. The classical examples are: (1) The Mother: Inherits 1/3 if the deceased has no children and no blocking brothers; but if children exist, or at least two brothers (or four sisters) meet blocking criteria, her share is reduced to 1/6th. (2) The Husband: Drops from 1/2 to 1/4 if the deceased wife has children. (3) The Wife: Drops from 1/4 to 1/8 if the deceased husband has children.',
    detailedExplanationUr: 'حجبِ نقصان کا مطلب ہے حصے میں تخفیف۔ اس کی اہم مثالیں یہ ہیں: (۱) ماں کا حصہ: عام حالت میں 1/3 ہوتا ہے، لیکن اگر میت کی اولاد ہو یا کم از کم دو سگے/علاتی بھائی موجود ہوں تو ماں کا حصہ گھٹ کر 1/6 رہ جاتا ہے۔ (۲) شوہر کا حصہ: اولاد نہ ہو تو 1/2، اولاد ہو تو گھٹ کر 1/4 رہ جاتا ہے۔ (۳) بیوی کا حصہ: اولاد نہ ہو تو 1/4، اولاد ہو تو گھٹ کر 1/8 رہ جاتا ہے۔',
    exampleScenarioEn: 'A deceased man leaves a Mother, a Wife, and 1 Son. The presence of the Son causes Ḥujub al-Nuqṣān to both the Wife (reducing her from 1/4 to 1/8) and the Mother (reducing her from 1/3 to 1/6).',
    exampleScenarioUr: 'ایک متوفی کی ماں، بیوی اور ایک بیٹا ہے۔ بیٹے کی موجودگی کی وجہ سے ماں 1/3 کے بجائے 1/6 لے گی، اور بیوی 1/4 کے بجائے 1/8 پائے گی۔ یہ حجبِ نقصان کہلاتا ہے۔',
    relatedTerms: ['hujub_hirman', 'furud'],
  },

  // 8. AQRAB_YAMNA_ABAD
  {
    id: 'aqrab_yamna_abad',
    termArabic: 'الأَقْرَبُ يَمْنَعُ الأَبْعَد',
    termUrdu: 'اَلْاَقْرَبُ یَمْنَعُ الْاَبْعَد (قریبی کا دور والے کو روکنا)',
    termEnglish: 'The Maxim of Proximity',
    transliteration: 'Al-Aqrab Yamna‘ al-Ab‘ad',
    category: 'TIERS',
    shortDefinitionEn: 'The fundamental legal maxim: Within any statutory class, the relative closer in generational degree completely excludes the further degree.',
    shortDefinitionUr: 'بنیادی شرعی قاعدہ: ایک ہی طبقے کے اندر جو رشتہ دار متوفی کے زیادہ قریب ہے، وہ دور والے رشتہ دار کو کلی طور پر روک دیتا ہے۔',
    detailedExplanationEn: 'This golden rule prevents generational mixing within the same tier. In Class 1: Living sons and daughters are Degree 1; grandsons and granddaughters are Degree 2. If even a single living child exists, no grandchild can inherit a statutory blood share. In Class 2: A living brother excludes all nephews and nieces. In Class 3: A living uncle excludes all cousins.',
    detailedExplanationUr: 'یہ فقہ کا وہ سنہری قاعدہ ہے جس کے تحت ایک ہی طبقے میں نسلوں کی مکسنگ کو روکا جاتا ہے۔ طبقہ اول میں بیٹا اور بیٹی پہلی ڈگری ہیں، جبکہ پوتے اور نواسے دوسری ڈگری۔ اگر متوفی کی ایک بیٹی بھی حیات ہو، تو وہ مرحوم بیٹے کے پوتے کو روک دے گی۔ اسی طرح طبقہ دوم میں زندہ بھائی اپنے مرحوم بھائی کے بیٹوں (بھتیجوں) کو وراثت سے روک دیتا ہے۔',
    exampleScenarioEn: 'A grandfather dies leaving 1 Living Daughter and 1 Orphaned Grandson (son of his predeceased son). Under this rule, the Living Daughter is Degree 1 and the Grandson is Degree 2 in Class 1. The Daughter inherits the ENTIRE estate; the grandson receives zero statutory inheritance (unless protected by a 1/3rd Waṣiyyah).',
    exampleScenarioUr: 'دادا کی وفات پر ایک بیٹی زندہ ہے اور ایک یتیم پوتا (جس کا باپ دادا کی زندگی میں فوت ہو گیا تھا)۔ اس قاعدے کے تحت بیٹی قریبی ہونے کی بنا پر پوتے کو مکمل روک دے گی اور سارا ترکہ بیٹی کو ملے گا۔ دادا پر لازم تھا کہ وہ زندگی میں وصیت یا ہبہ کے ذریعے یتیم پوتے کا تحفظ کرتا۔',
    relatedTerms: ['tabaqat', 'tanzil', 'hujub_hirman'],
  },

  // 9. TANZIL
  {
    id: 'tanzil',
    termArabic: 'التَّنْزِيل (الوِرَاثَةُ بِالنِّيَابَة)',
    termUrdu: 'تَنْزِیْل (قائم مقامی یا والدین کی جگہ لینا)',
    termEnglish: 'Inheritance by Representation',
    transliteration: 'Al-Tanzīl',
    category: 'TIERS',
    shortDefinitionEn: 'When all direct children are predeceased, grandchildren step directly into their deceased parent’s shoes and receive their statutory fraction.',
    shortDefinitionUr: 'اگر متوفی کی تمام حقیقی اولاد پہلے ہی وفات پا چکی ہو، تو پوتے اور نواسے اپنے اپنے والدین کے قائم مقام بن کر ان کا حصہ لیتے ہیں۔',
    detailedExplanationEn: 'Tanzīl governs representation across generational lines when NO Degree 1 heir survives in that tier. Under Ja‘fari law: Grandchildren inherit only if ALL direct sons and daughters are deceased. Crucially, a grandchild’s share is determined by the gender of their CONNECTING PARENT, not their own gender: A daughter’s son receives a daughter’s share (1/3 or 1/2 branch); a son’s daughter receives a son’s share (2/3 branch).',
    detailedExplanationUr: 'تنزیل کا مطلب ہے قائم مقامی۔ اگر متوفی کی ساری حقیقی اولاد اس کی زندگی میں ہی وفات پا چکی ہو، تو پوتے، پوتیاں، نواسے اور نواسیاں اپنے والدین کی جگہ لے لیتے ہیں۔ اہم نکتہ یہ ہے کہ حصے کا تعین اس بات پر ہوتا ہے کہ ان کا فوت شدہ والد یا والدہ کیا حصہ پاتی، نہ کہ بچے کی اپنی جنس پر۔ چنانچہ بیٹی کا بیٹا بیٹی کا حصہ لے کر آئے گا، اور بیٹے کی بیٹی بیٹے کا ڈبل حصہ لے کر آئے گی۔',
    exampleScenarioEn: 'A grandfather dies leaving only 1 Grandson from a deceased Daughter, and 1 Granddaughter from a deceased Son. Under Tanzīl, the Grandson steps into his mother’s shoes taking 1/3rd (a daughter’s share), while the Granddaughter steps into her father’s shoes taking 2/3rds (a son’s share)!',
    exampleScenarioUr: 'ایک نانا کی وفات پر کوئی حقیقی اولاد زندہ نہیں، صرف مرحومہ بیٹی کا ایک بیٹا (نواسا) اور مرحوم بیٹے کی ایک بیٹی (پوتی) زندہ ہے۔ تنزیل کے تحت پوتی کو اپنے باپ کی جگہ 2/3 حصہ ملے گا اور نواسے کو اپنی ماں کی جگہ 1/3 حصہ ملے گا۔',
    relatedTerms: ['aqrab_yamna_abad', 'tabaqat'],
  },

  // 10. FURUD
  {
    id: 'furud',
    termArabic: 'الفُرُوضُ المُقَدَّرَة',
    termUrdu: 'فُرُوْض (قرآنِ مجید کے ۶ مقررہ متعین حصص)',
    termEnglish: 'The Six Prescribed Quranic Fractions',
    transliteration: 'Al-Furūḍ al-Muqaddarah',
    category: 'DISTRIBUTION',
    shortDefinitionEn: 'The six explicit mathematical fractions ordained by Almighty Allah in Surah An-Nisa: 1/2, 1/4, 1/8, 2/3, 1/3, and 1/6.',
    shortDefinitionUr: 'قرآن مجید میں سورۃ النساء کے اندر اللہ تعالیٰ کے مقرر کردہ ۶ حسابی حصے: 1/2، 1/4، 1/8، 2/3، 1/3، اور 1/6۔',
    detailedExplanationEn: 'Almighty Allah decreed exactly six statutory fractions in the Qur’an for designated heirs: (1) One-Half (1/2): Husband (if no children), single Daughter, single Paternal Sister. (2) One-Fourth (1/4): Husband (with children), Wife (without children). (3) One-Eighth (1/8): Wife (with children). (4) Two-Thirds (2/3): Two or more Daughters, two or more Paternal Sisters. (5) One-Third (1/3): Mother (no children/brothers), two or more Maternal Siblings. (6) One-Sixth (1/6): Father (with children), Mother (with children or brothers), single Maternal Sibling.',
    detailedExplanationUr: 'قرآنِ مجید نے سورۃ النساء میں چھ حسابی حصے متعین فرمائے ہیں جنہیں "اصحاب الفروض" کہا جاتا ہے: (۱) نصف (1/2): شوہر (بے اولاد)، اکیلی بیٹی، اکیلی بہن۔ (۲) ربع (1/4): شوہر (با اولاد)، بیوی (بے اولاد)۔ (۳) ثمن (1/8): بیوی (با اولاد)۔ (۴) ثلثان (2/3): دو یا زائد بیٹیاں، دو یا زائد بہنیں۔ (۵) ثلث (1/3): ماں (بے اولاد)، دو یا زائد اخیافی (مادری) بہن بھائی۔ (۶) سدس (1/6): باپ (با اولاد)، ماں (با اولاد یا بھائیوں کے ساتھ)، اکیلا اخیافی بہن یا بھائی۔',
    exampleScenarioEn: 'A deceased woman leaves a Husband and 1 Daughter. The Husband’s Quranic fraction is 1/4th (due to the child), and the Daughter’s Quranic fraction is 1/2 (2/4). The remaining 1/4 returns to the Daughter via Radd.',
    exampleScenarioUr: 'ایک عورت فوت ہوئی جس نے شوہر اور ایک بیٹی چھوڑی۔ شوہر کا قرآنی فریضہ 1/4 ہے اور بیٹی کا 1/2 (یعنی 2/4)۔ باقی بچ جانے والا 1/4 فریضے کے بعد "رد" کے تحت بیٹی ہی کو واپس ملے گا۔',
    relatedTerms: ['butlan_awl', 'radd', 'tarkah'],
  },

  // 11. BUTLAN_AWL
  {
    id: 'butlan_awl',
    termArabic: 'بُطْلَانُ العَوْل',
    termUrdu: 'بُطْلَانِ عَوْل (خسارے کی متناسب کٹوتی کا باطل ہونا)',
    termEnglish: 'The Repudiation of Proportional Deficit Dilution',
    transliteration: 'Buṭlān al-‘Awl',
    category: 'DISTRIBUTION',
    shortDefinitionEn: 'The core Shia doctrine that inheritance deficits are never diluted proportionally across all heirs; the deficit is absorbed solely by daughters or paternal sisters.',
    shortDefinitionUr: 'شیعہ فقہ کا بنیادی اصول کہ حسابی خسارے کی صورت میں سب ورثاء کا حصہ نہیں کاٹا جاتا، بلکہ یہ کمی صرف بیٹیوں یا علاتی بہنوں پر ڈالی جاتی ہے۔',
    detailedExplanationEn: 'When the sum of Quranic fractions exceeds 1 (e.g. Husband 1/4 = 3/12, Mother 1/6 = 2/12, Father 1/6 = 2/12, Two Daughters 2/3 = 8/12, totaling 15/12), Sunni jurisprudence applies ‘Awl by increasing the common denominator to 15, penalizing every single heir equally. Ja‘fari jurisprudence completely repudiates ‘Awl. Based on the rulings of Imam Ali (as) and Imam al-Sadiq (as), Allah never creates an impossible math: Heirs protected by fixed minimums (Spouse, Parents) receive their 100% full fractions; the deficit is absorbed strictly and solely by the Daughters or Paternal Sisters who are elastic sharers.',
    detailedExplanationUr: 'اگر قرآنی حصوں کو جمع کرنے سے مجموعہ 1 سے زیادہ ہو جائے (جیسے شوہر 1/4، والدین 1/6+1/6 اور دو بیٹیاں 2/3، تو مجموعہ 15/12 ہو جاتا ہے)۔ اہل سنت کے ہاں "عول" کے تحت سب کے حصوں میں برابر کٹوتی کی جاتی ہے۔ لیکن فقہ جعفریہ میں امیر المومنین علی ابن ابی طالب (ع) کے فرمان کے مطابق "اللہ ریت کے ذرات گننے والا ہے اور اس کا قانون ناممکن حساب پر مبنی نہیں ہو سکتا"۔ لہٰذا شوہر اور والدین کا حصہ مکمل محفوظ رکھا جاتا ہے اور پورا خسارہ صرف بیٹیوں کے حصے سے کاٹا جاتا ہے۔',
    exampleScenarioEn: 'Estate $120,000. Heirs: Husband ($30,000 = 1/4), Mother ($20,000 = 1/6), Father ($20,000 = 1/6), 2 Daughters (Quranic 2/3 = $80,000). Total fractions = 15/12 ($150,000 deficit). Under Shia law, Husband receives full $30k, Parents receive full $40k. The remaining $50,000 is divided between the two daughters ($25k each). The daughters absorb the $30k deficit; the parents and husband are NOT penalized.',
    exampleScenarioUr: 'ایک عورت فوت ہوئی جس نے شوہر، ماں، باپ اور دو بیٹیاں چھوڑیں۔ قرآنی حصوں کا مجموعہ 125 فیصد ہو گیا۔ شیعہ قانون کے مطابق شوہر کو پورا 1/4 اور والدین دونوں کو پورا 1/6 ملے گا۔ جو باقی مال بچے گا وہ دونوں بیٹیوں میں تقسیم ہو جائے گا، یعنی سارا خسارہ بیٹیوں پر آئے گا اور شوہر و والدین کی کٹوتی قطعی نہیں ہوگی۔',
    relatedTerms: ['furud', 'butlan_tasib', 'radd'],
  },

  // 12. BUTLAN_TASIB
  {
    id: 'butlan_tasib',
    termArabic: 'بُطْلَانُ التَّعْصِيب',
    termUrdu: 'بُطْلَانِ تَعْصِیْب (عصبہ یعنی چچا تایا کے حق کا باطل ہونا)',
    termEnglish: 'The Repudiation of Agnatic Return to Distant Males',
    transliteration: 'Buṭlān al-Ta‘ṣīb',
    category: 'DISTRIBUTION',
    shortDefinitionEn: 'The core Shia doctrine that surplus estate is never gifted to distant male agnates (uncles, male cousins); it returns to closer surviving heirs.',
    shortDefinitionUr: 'شیعہ فقہ کا بنیادی قانون کہ قرآنی حصے بانٹنے کے بعد بچ جانے والا مال دور کے مرد رشتہ داروں (چچا یا ان کے بیٹوں) کو نہیں دیا جاتا، بلکہ بیٹیوں کو ملتا ہے۔',
    detailedExplanationEn: 'In pre-Islamic patriarchal customs and Sunni jurisprudence (Ta‘ṣīb), if a deceased leaves only a daughter (who takes 1/2), the remaining 1/2 of the estate is handed over to distant male agnates (‘Aṣabah) such as paternal uncles or male cousins. Ja‘fari jurisprudence strictly invalidates this practice based on Surah Al-Anfal 8:75 ("And the blood relatives are nearer to one another in the decree of Allah"). Under Shia law, the lone daughter takes 1/2 as her Quranic Farḍ, and the remaining 1/2 returns to her via Radd, giving her 100% of the estate and completely disinheriting uncles.',
    detailedExplanationUr: 'قبل از اسلام کے قبائلی رواج اور اہل سنت فقہ میں اگر کسی شخص کی صرف ایک بیٹی ہو تو وہ آدھا ترکہ لیتی ہے اور باقی آدھا ترکہ دور کے مرد رشتہ دار یعنی چچا یا تایا لے جاتے ہیں (اسے تعصیب کہتے ہیں)۔ فقہ جعفریہ میں آئمہ اہلبیت (ع) نے اس کی شدید نفی فرمائی اور قرآن کی آیت "وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ" کی بنیاد پر بیٹی کو آدھا فریضے کے تحت اور باقی آدھا "رد" کے تحت دے کر پورے 100 فیصد کا وارث بنایا، اور چچا یا تایا کو مکمل طور پر صفر کر دیا۔',
    exampleScenarioEn: 'A man passes away leaving 1 Daughter and 5 Paternal Uncles (Chachas). Customary culture pressures the daughter to surrender half the family home to her uncles. Under authentic Shia law, the Daughter takes 100% of the home; all 5 Uncles receive exactly 0 PKR.',
    exampleScenarioUr: 'ایک شخص کے انتقال پر ایک بیٹی اور 5 چچا زندہ ہیں۔ برصغیر کے رواج کے برعکس فقہ جعفریہ میں بیٹی اکیلے پورے مکان اور تمام جائیداد کی 100 فیصد مالکن بنے گی۔ پانچوں چچاؤں کا شرعی حصہ صفر روپیہ ہے۔',
    relatedTerms: ['radd', 'tabaqat', 'butlan_awl'],
  },

  // 13. RADD
  {
    id: 'radd',
    termArabic: 'الرَّدّ',
    termUrdu: 'الرَّدّ (بچے ہوئے مال کی واپسی)',
    termEnglish: 'Surplus Reversion to Quranic Heirs',
    transliteration: 'Al-Radd',
    category: 'DISTRIBUTION',
    shortDefinitionEn: 'The proportional redistribution of residual surplus money back to surviving Quranic sharers when no residuary heir exists in that tier.',
    shortDefinitionUr: 'تمام مقررہ حصے بانٹنے کے بعد بچ جانے والی رقم کو موجودہ قریبی شرعی ورثاء کے درمیان ان کے تناسب سے دوبارہ تقسیم کرنا۔',
    detailedExplanationEn: 'When the sum of Quranic shares is less than 1 (e.g. 1 Daughter takes 1/2 = 3/6, and Mother takes 1/6, totaling 4/6), a surplus of 2/6 remains. Because Shia law repudiates Ta‘ṣīb, this surplus does NOT go to distant uncles. Instead, it is distributed proportionally between the Daughter and Mother (3:1 ratio), unless the Mother is blocked from Radd by the presence of brothers, in which case the entire surplus reverts to the Daughter alone.',
    detailedExplanationUr: 'جب قرآنی حصوں کو تقسیم کرنے کے بعد جائیداد بچ جائے (مثلاً ایک بیٹی نے 1/2 اور ماں نے 1/6 لیا، تو 2/6 مال بچ گیا)۔ چونکہ شیعہ فقہ میں دور کے چچا کو نہیں دیا جا سکتا، اس لیے یہ بچا ہوا مال اسی بیٹی اور ماں کے درمیان ان کے مقررہ تناسب (3 اور 1) سے دوبارہ بانٹ دیا جاتا ہے۔ اگر متوفی کے بھائی موجود ہوں تو وہ ماں کو اس اضافی رقم سے روک دیتے ہیں اور پورا بچا ہوا مال اکیلی بیٹی کو مل جاتا ہے۔',
    exampleScenarioEn: 'Deceased leaves 1 Daughter and Mother (no brothers). Estate is $60,000. Farḍ: Daughter gets $30k (1/2), Mother gets $10k (1/6). Surplus is $20k. Surplus is divided 3 parts to Daughter ($15k) and 1 part to Mother ($5k). Total: Daughter = $45,000 (75%), Mother = $15,000 (25%).',
    exampleScenarioUr: 'ترکہ 60 لاکھ روپے ہے۔ ورثاء میں صرف ایک بیٹی اور ماں ہیں۔ بیٹی کا فریضہ 30 لاکھ اور ماں کا 10 لاکھ ہے، 20 لاکھ بچ گیا۔ یہ 20 لاکھ 3 اور 1 کے تناسب سے دوبارہ تقسیم ہوگا: بیٹی کو مزید 15 لاکھ (کل 45 لاکھ یعنی 75%) اور ماں کو مزید 5 لاکھ (کل 15 لاکھ یعنی 25%) ملیں گے۔',
    relatedTerms: ['butlan_tasib', 'furud'],
  },

  // 14. KALALAH
  {
    id: 'kalalah',
    termArabic: 'الكَلَالَة',
    termUrdu: 'کَلَالَہ (بے اولاد اور لاولد میت کی وراثت)',
    termEnglish: 'Collateral Succession (Childless & Parentless)',
    transliteration: 'Al-Kalālah',
    category: 'TIERS',
    shortDefinitionEn: 'A deceased person who leaves neither living parents nor living direct descendants; their estate passes to siblings and grandparents in Class 2.',
    shortDefinitionUr: 'ایسا شخص جس کے انتقال پر نہ ماں باپ زندہ ہوں اور نہ ہی کوئی اولاد؛ اس کی جائیداد بہن بھائیوں اور دادا دادی کو ملتی ہے۔',
    detailedExplanationEn: 'Referenced in Surah An-Nisa (Ayah 12 and Ayah 176), Kalālah denotes inheritance where the vertical branches (ancestors and descendants) are extinct. The estate activates Class 2: Paternal Siblings (Brothers/Sisters through father) inherit the residue by 2:1 ratio; Maternal Siblings (Akhyāfī brothers/sisters) share 1/3 equally regardless of gender; Grandparents step into the position of siblings (Paternal grandfather = brother; Maternal grandfather = maternal brother).',
    detailedExplanationUr: 'قرآن مجید کی سورۃ النساء میں کلالہ اس شخص کو کہا گیا ہے جس کے انتقال پر نہ تو کوئی اولاد یا پوتا زندہ ہو اور نہ ہی اس کے ماں باپ حیات ہوں۔ ایسی صورت میں طبقہ دوم حرکت میں آتا ہے: سگے اور علاتی بھائی بہن مرد کے دگنے کے حساب سے، اخیافی (صرف ماں کی طرف سے) بہن بھائی مرد و عورت کی برابری کے ساتھ 1/3 میں شریک ہوتے ہیں، اور دادا دادی اپنے اپنے متعلقہ بہن بھائیوں کے قائم مقام سمجھے جاتے ہیں۔',
    exampleScenarioEn: 'A childless bachelor dies whose parents passed away years ago. He leaves 1 Full Brother and 2 Full Sisters. His estate is divided into 4 equal units: The Brother receives 2 units (50%), and each Sister receives 1 unit (25%).',
    exampleScenarioUr: 'ایک لاولد شخص فوت ہوا جس کے والدین پہلے ہی انتقال کر چکے تھے۔ اس کا ایک سگا بھائی اور دو سگی بہنیں ہیں۔ جائیداد 4 حصوں میں تقسیم ہوگی: بھائی کو 2 حصے (50 فیصد) اور دونوں بہنوں کو ایک ایک حصہ (25، 25 فیصد) ملے گا۔',
    relatedTerms: ['tabaqat', 'furud'],
  },

  // 15. WASIYYAH
  {
    id: 'wasiyyah',
    termArabic: 'الوَصِيَّة',
    termUrdu: 'الْوَصِیَّۃ (ایک تہائی کی وصیت)',
    termEnglish: 'Testamentary Bequest (1/3rd Cap)',
    transliteration: 'Al-Waṣiyyah',
    category: 'PLANNING',
    shortDefinitionEn: 'A post-mortem bequest legally capped at a maximum of one-third (33.33%) of the net estate; any excess is void without all heirs’ unanimous consent.',
    shortDefinitionUr: 'مرنے کے بعد نافذ ہونے والی وصیت جو زیادہ سے زیادہ ایک تہائی (33.33%) مال تک محدود ہے؛ اس سے زیادہ ورثاء کی رضامندی کے بغیر باطل ہے۔',
    detailedExplanationEn: 'Under Islamic law, a Muslim possesses divine authority to direct the posthumous distribution of up to exactly 1/3rd (Al-Thuluth) of their net estate to any cause or person (including non-heirs, charities, mosques, adopted children, or even favored heirs according to the preponderant Shia fatwa). However, if the bequest exceeds 1/3rd, the excess is strictly legally suspended (Mawqūf): It cannot be disbursed unless all adult, sane heirs explicitly consent after the testator’s death.',
    detailedExplanationUr: 'اسلامی قانون میں ہر مسلمان کو یہ حق حاصل ہے کہ وہ مرنے سے پہلے اپنے خالص ترکے کے زیادہ سے زیادہ ایک تہائی (33.33 فیصد) حصے کی وصیت کسی بھی فلاحی کام، غیر وارث (جیسے یتیم پوتے یا لے پالک بچے) یا کسی خاص وارث کے لیے کرے۔ اگر وصیت 1/3 سے زیادہ کی گئی ہو، تو وہ زائد حصہ اس وقت تک کالعدم رہے گا جب تک مرنے کے بعد تمام عاقل و بالغ ورثاء اپنی خوشی سے اس اضافی حصے کی اجازت نہ دے دیں۔',
    exampleScenarioEn: 'A person has an estate of $300,000. He wills $150,000 to an orphanage (50% of his estate). By default, only $100,000 (the legal 1/3rd) is executed. The remaining $50,000 is invalid and returns to the legal heirs unless they unanimously sign a consent waiver.',
    exampleScenarioUr: 'ایک شخص کا ترکہ 30 لاکھ روپے تھا۔ اس نے یتیم خانے کے لیے 15 لاکھ (50 فیصد) کی وصیت کر دی۔ شرعاً صرف 10 لاکھ (1/3) یتیم خانے کو دیے جائیں گے۔ باقی 5 لاکھ اس وقت تک نہیں دیے جا سکتے جب تک تمام ورثاء اپنی مرضی سے اجازت نہ دے دیں۔',
    relatedTerms: ['hibat_al_hayat', 'tarkah'],
  },

  // 16. HIBAT_AL_HAYAT
  {
    id: 'hibat_al_hayat',
    termArabic: 'هِبَةُ الحَيَاة',
    termUrdu: 'ہِبَۃُ الْحَیَات (زندگی میں جائیداد کا تحفہ دینا)',
    termEnglish: 'Lifetime Inter-Vivos Gift (Uncapped)',
    transliteration: 'Hibat al-Ḥayāt',
    category: 'PLANNING',
    shortDefinitionEn: 'An unconditional gift of property made during one’s lifetime while sane and healthy, which is NOT subject to the 1/3rd testamentary limitation.',
    shortDefinitionUr: 'اپنی زندگی میں ہوش و حواس کے ساتھ کسی کو جائیداد تحفے میں دے کر قبضہ کروا دینا؛ اس پر ایک تہائی کی کوئی پابندی نہیں ہوتی۔',
    detailedExplanationEn: 'Unlike a testamentary Will (which takes effect only after death and is restricted to 33.33%), Hibat al-Ḥayāt is executed immediately during life. A person has absolute legal and divine freedom to transfer 10%, 50%, or 100% of their wealth to a daughter, spouse, adopted child, or institution. To be legally binding under Ja‘fari Fiqh, it requires: (1) Valid offer and acceptance (Ījāb wa Qabūl), (2) Sane, uncoerced ownership, and (3) Physical transfer of possession and control (Qabḍ). Once Qabḍ is achieved with non-revocable conditions, the property completely exits the estate and cannot be contested by heirs after death.',
    detailedExplanationUr: 'وصیت کے برعکس جو مرنے کے بعد لاگو ہوتی ہے اور 1/3 سے زیادہ نہیں ہو سکتی، ہبۃ الحیات انسان کی زندگی میں ہی نافذ ہو جاتی ہے۔ ایک باپ کو شرعاً مکمل حق حاصل ہے کہ وہ اپنی زندگی میں اپنی بیٹی یا بیوی کو اپنے مکان کا 100 فیصد بھی ہبہ کر دے۔ اس کے صحیح ہونے کے لیے شرائط ہیں: عقل و ہوش میں ہونا، دباؤ نہ ہونا، اور سب سے اہم "قبضہ" (یعنی تحویل منتقل کر دینا)۔ جب رجسٹری اور قبضہ منتقل ہو جائے تو وہ مال وراثت سے باہر نکل جاتا ہے اور مرنے کے بعد کوئی رشتہ دار اس پر دعویٰ نہیں کر سکتا۔',
    exampleScenarioEn: 'A father has two daughters and no sons. He knows that distant relatives might dispute customary rights. During his life, while fully healthy, he gifts the family home to his two daughters with deed transfer and physical possession. Upon his demise, the home does not enter the inheritance calculation at all.',
    exampleScenarioUr: 'ایک باپ کی صرف دو بیٹیاں ہیں اور کوئی بیٹا نہیں۔ وہ اپنی زندگی میں ہی اپنے دونوں گھر اپنی بیٹیوں کے نام ہبہ کر کے ان کا باقاعدہ قبضہ ان کے حوالے کر دیتا ہے۔ اس کے انتقال پر وہ دونوں گھر ترکہ میں شمار ہی نہیں ہوں گے کیونکہ وہ زندگی میں ہی بیٹیوں کی ملکیت بن چکے تھے۔',
    relatedTerms: ['qabd', 'wasiyyah', 'tarkah'],
  },

  // 17. QABD
  {
    id: 'qabd',
    termArabic: 'القَبْضُ الشَّرْعِي',
    termUrdu: 'قَبْض (قانونی اور شرعی قبضہ و تحویل)',
    termEnglish: 'Physical Possession & Custodial Transfer',
    transliteration: 'Al-Qabḍ',
    category: 'PLANNING',
    shortDefinitionEn: 'The actual physical custody and control required under Islamic jurisprudence for a lifetime gift (Hibah) to become legally binding.',
    shortDefinitionUr: 'فقہ اسلامی میں ہبہ کے مکمل اور نافذ ہونے کے لیے دی گئی چیز پر باقاعدہ عملی و مادی قبضہ حاصل کرنا۔',
    detailedExplanationEn: 'Under Ja‘fari jurisprudence, verbal agreement or paper signing of a gift is legally incomplete without Qabḍ (possession). If a donor says "I gift this house to my daughter" but the father retains exclusive keys and control, and then dies before handing over physical custody, the gift is legally VOID and the house falls back into the gross estate to be divided among all heirs. For minors, the father’s possession acts as legal custody on their behalf.',
    detailedExplanationUr: 'فقہ جعفریہ میں محض زبانی کہہ دینا یا کاغذ پر لکھ دینا ہبہ کو مکمل نہیں کرتا جب تک کہ جس کو چیز دی گئی ہے وہ اس پر عملاً قابض نہ ہو جائے۔ اگر ایک باپ نے بیٹی کو مکان گفٹ کرنے کا کہا مگر چابیاں اور قبضہ اپنے پاس رکھا اور اسی دوران انتقال کر گیا، تو وہ ہبہ باطل ہو جائے گا اور مکان تمام ورثاء کا مشترکہ ترکہ بن جائے گا۔ البتہ اگر بچہ نابالغ ہو تو باپ کا قبضہ ہی بچے کا شرعی قبضہ مانا جاتا ہے۔',
    exampleScenarioEn: 'A mother signs a letter gifting her gold jewelry to her youngest daughter but keeps it locked in her personal locker without handing over the key. When the mother passes away, the gift fails the test of Qabḍ; the gold must be pooled into the general estate unless all heirs agree.',
    exampleScenarioUr: 'والدہ نے اپنی زندگی میں بیٹی کو زیور ہبہ کرنے کا ارادہ ظاہر کیا مگر زیور اپنی تجوری میں مقفل رکھا۔ والدہ کے انتقال پر چونکہ قبضہ منتقل نہیں ہوا تھا، اس لیے شرعاً وہ زیور تمام بہن بھائیوں میں وراثت کے طور پر تقسیم ہوگا۔',
    relatedTerms: ['hibat_al_hayat', 'wasiyyah'],
  },

  // 18. MAWANI_IRTH
  {
    id: 'mawani_irth',
    termArabic: 'مَوَانِعُ الإِرْث',
    termUrdu: 'مَوَانِعِ اِرْث (وراثت سے محروم کرنے والی شرعی رکاوٹیں)',
    termEnglish: 'Legal Disqualifiers & Impediments',
    transliteration: 'Mawāni‘ al-Irth',
    category: 'IMPEDIMENTS',
    shortDefinitionEn: 'The severe canonical disqualifiers that strip an immediate blood relative of any right to inherit: Homicide, Disbelief, and Li‘ān.',
    shortDefinitionUr: 'وہ سنگین شرعی اسباب جن کی وجہ سے کوئی حقیقی رشتہ دار ہونے کے باوجود وراثت کے حق سے محروم ہو جاتا ہے: قتل، کفر، اور لعان۔',
    detailedExplanationEn: 'Even if an individual has the closest blood tie in Class 1, three canonical impediments completely extinguish their inheritance rights: (1) Qatl (Homicide): A person who intentionally and unlawfully kills the deceased is totally disinherited and treated as if they do not exist; (2) Kufr / Irtidād: A non-Muslim does not inherit from a Muslim relative (if a Muslim heir exists, they capture the estate over non-Muslim heirs); (3) Li‘ān: Mutual solemn swearing disowning paternity in court, which legally severs the inheritance tie between father and child.',
    detailedExplanationUr: 'خواہ کوئی شخص کتنا ہی قریبی وارث کیوں نہ ہو، تین شرعی رکاوٹیں اس کو وراثت سے کلی محروم کر دیتی ہیں: (۱) قتل: جس شخص نے جان بوجھ کر ناحق میت کو قتل کیا ہو وہ مقتول کے ترکے سے ایک دھیلا نہیں پا سکتا اور نہ ہی کسی اور کو محروم کر سکتا ہے۔ (۲) کفر و ارتداد: غیر مسلم رشتہ دار مسلمان کے ترکے کا وارث نہیں بن سکتا۔ (۳) لعان: اگر باپ نے شرعی عدالت میں لعان کے ذریعے بچے کے نسب کا انکار کیا ہو تو باپ اور اس بچے کے درمیان وراثت کا رشتہ ختم ہو جاتا ہے۔',
    exampleScenarioEn: 'A wealthy man is murdered by his only son. Because of the impediment of Qatl, the son is legally dead in the eyes of inheritance law. The entire estate skips to the deceased’s brothers or parents; the murdering son receives nothing.',
    exampleScenarioUr: 'ایک شخص کو اس کے سگے بیٹے نے قتل کر دیا۔ قتلِ عمد کے سبب بیٹا شرعاً کلی طور پر محروم ہو جائے گا اور ترکہ میت کے دیگر ورثاء (جیسے بھائیوں یا والدین) کو ملے گا۔ قاتل کو کچھ نہیں دیا جائے گا۔',
    relatedTerms: ['tabaqat', 'hujub_hirman'],
  },

  // 19. MUNASAKHAH
  {
    id: 'munasakhah',
    termArabic: 'المُنَاسَخَة',
    termUrdu: 'مُنَاسَخَہ (وراثت پر وراثت کا پیچیدہ تسلسل)',
    termEnglish: 'Compounded Successive Deaths',
    transliteration: 'Al-Munāsakhah',
    category: 'DISTRIBUTION',
    shortDefinitionEn: 'The complex multi-generational computation required when an heir passes away before the first deceased’s estate has been settled.',
    shortDefinitionUr: 'جب اصل متوفی کا ترکہ تقسیم ہونے سے پہلے ہی کوئی وارث فوت ہو جائے، تو اس وارث کے حصے کو اس کے اپنے الگ ورثاء میں تقسیم کرنے کا شرعی حساب۔',
    detailedExplanationEn: 'Munāsakhah occurs frequently in South Asia where family estates are left undivided for decades. If a father dies in 1990 leaving a son, and that son dies in 2010 leaving his own wife and children before the 1990 estate was distributed, Islamic law mandates a two-stage mathematical reconciliation: (1) Calculate the son’s exact vested fraction from the father’s estate, and then (2) Subdivide that vested share according to the son’s own separate heir matrix at his time of death.',
    detailedExplanationUr: 'برصغیر میں اکثر جائیدادیں برسوں تک بغیر تقسیم پڑے رہنے کی وجہ سے مناسخہ کا مسئلہ پیدا ہوتا ہے۔ اگر 1990 میں والد کا انتقال ہوا اور 2010 میں جائیداد تقسیم ہونے سے پہلے بیٹا بھی فوت ہو گیا جس کی اپنی بیوہ اور بچے تھے، تو شرعاً پہلے والد کے ترکے میں سے بیٹے کا حصہ نکالا جائے گا، اور پھر اس حصے کو بیٹے کی اپنی وفات کے وقت موجود ورثاء کے درمیان الگ سے تقسیم کیا جائے گا۔',
    exampleScenarioEn: 'Grandfather dies leaving $100,000. Before distribution, his son dies leaving a Wife and 1 Daughter. The son was entitled to 100% of the grandfather’s estate. Now that $100,000 becomes the son’s estate: The son’s Wife receives 1/8th ($12,500), and the Daughter receives 7/8ths ($87,500).',
    exampleScenarioUr: 'دادا کے انتقال پر ایک لاکھ روپے چھوڑے۔ اس سے پہلے کہ تقسیم ہوتی، ان کا بیٹا فوت ہو گیا جس کی بیوہ اور ایک بیٹی تھی۔ پہلے بیٹے کا پورا حق ثابت کیا جائے گا، پھر وہ ایک لاکھ روپے بیٹے کی بیوہ کو 1/8 (ساڑھے بارہ ہزار) اور بیٹی کو 7/8 (ساڑھے ستاسی ہزار) کے طور پر ملیں گے۔',
    relatedTerms: ['tarkah', 'furud', 'tabaqat'],
  },
];
