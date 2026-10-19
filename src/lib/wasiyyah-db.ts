export interface WasiyyahSection {
  id: string;
  titleEn: string;
  titleUr: string;
  subtitleEn?: string;
  subtitleUr?: string;
  contentEn: string;
  contentUr: string;
  quranicVerses?: Array<{
    arabic: string;
    reference: string;
    translationEn: string;
    translationUr: string;
  }>;
  hadithCitations?: Array<{
    arabic?: string;
    source: string;
    textEn: string;
    textUr: string;
  }>;
  scholarlyRulings?: Array<{
    scholarEn: string;
    scholarUr: string;
    rulingEn: string;
    rulingUr: string;
  }>;
}

export interface WasiyyahClassification {
  id: "wajib" | "mustahabb" | "mubah" | "makruh" | "haram";
  nameEn: string;
  nameUr: string;
  colorHex: string;
  bgHex: string;
  borderHex: string;
  descriptionEn: string;
  descriptionUr: string;
  examplesEn: string[];
  examplesUr: string[];
}

export interface InvalidSign {
  id: number;
  titleEn: string;
  titleUr: string;
  severity: "danger" | "warning";
  descriptionEn: string;
  descriptionUr: string;
  remedyEn: string;
  remedyUr: string;
}

export const WASIYYAH_CLASSIFICATIONS: WasiyyahClassification[] = [
  {
    id: "wajib",
    nameEn: "Wājib (Strictly Obligatory)",
    nameUr: "واجب (لازمی و قطعی)",
    colorHex: "#064e3b",
    bgHex: "#ecfdf5",
    borderHex: "#10b981",
    descriptionEn:
      "A person is religiously and legally mandated to make a will if they have unrecorded liabilities, religious dues, or vulnerable minor dependents.",
    descriptionUr:
      "انسان پر شرعاً وصیت کرنا قطعی واجب ہے اگر اس کے ذمے غیر دستاویزی قرضے، امانتیں، یا شرعی مالی واجبات ہوں، جن کے فوت ہونے سے ضائع ہونے کا اندیشہ ہو۔",
    examplesEn: [
      "Unrecorded debts owed to people or commercial liabilities without written proof",
      "Financial trusts (Amānāt) or deposits belonging to others that might be lost",
      "Unfulfilled religious duties (Ḥuqūq Allāh) like unpaid Khums, Zakat, Kaffarat, or unperformed obligatory Hajj",
      "Missed prayers (Qadā Salāt) or fasts if no eldest son exists or he is incompetent",
      "Appointing a guardian (Waṣī/Qayyim) for minor children who would otherwise face ruin",
    ],
    examplesUr: [
      "لوگوں کے غیر تحریری قرضے جن کا علم کسی اور کو نہ ہو اور مرنے سے ضائع ہونے کا خطرہ ہو",
      "لوگوں کی رکھی ہوئی امانتیں (امانات) جن کا کوئی گواہ نہ ہو",
      "واجب مالی حقوق (خمس، زکوٰۃ، کفارات، اور فریضۂ حج جو زندگی میں ادا نہ کیا ہو)",
      "قضا نمازیں اور روزے جب بڑا بیٹا نہ ہو یا وہ خود قضا ادا کرنے کا اہل نہ ہو",
      "نابالغ اولاد کے لیے عادل سرپرست (وصی/قیم) مقرر کرنا تاکہ وہ لاوارث نہ رہیں",
    ],
  },
  {
    id: "mustahabb",
    nameEn: "Mustaḥabb (Highly Recommended)",
    nameUr: "مستحب (پسندیدہ و باعثِ اجر)",
    colorHex: "#1e3a8a",
    bgHex: "#eff6ff",
    borderHex: "#3b82f6",
    descriptionEn:
      "Bequeathing up to one-third (33.33%) of the net estate to righteous causes, non-heir relatives, or continuous charity (Ṣadaqah Jāriyah).",
    descriptionUr:
      "اپنے خالص ترکے کے ایک تہائی (ثلث) تک کے مال کی وصیت نیک کاموں، یتیموں، ہسپتالوں اور غیر وارث ضرورت مند رشتہ داروں کے لیے کرنا۔",
    examplesEn: [
      "Assisting impoverished relatives who are not statutory heirs (orphaned grandchildren, nieces/nephews)",
      "Donating to educational seminaries (Hawzah), public libraries, or scientific institutions",
      "Funding ongoing charities (Ṣadaqah Jāriyah), clean water projects, or hospitals",
      "Bequests for mourning ceremonies of Ahl al-Bayt (AS) and ziyarat sponsorship for the poor",
    ],
    examplesUr: [
      "ایسے ضرورت مند رشتہ داروں کی مدد جو شرعی وارث نہیں ہیں (جیسے یتیم پوتے، نواسے، بھانجے یا بھتیجے)",
      "دینی مدارس، مکتبات اور علمی مراکز کے لیے مالی امداد",
      "صدقۂ جاریہ کے منصوبے (ہسپتال، پینے کا صاف پانی، رفاہی ادارے)",
      "مجالسِ عزا و ایصالِ ثواب اور نادار مومنین کے لیے زیارات کے اخراجات",
    ],
  },
  {
    id: "mubah",
    nameEn: "Mubāḥ (Permissible)",
    nameUr: "مباح (جائز و غیر جانبدار)",
    colorHex: "#334155",
    bgHex: "#f8fafc",
    borderHex: "#94a3b8",
    descriptionEn:
      "Bequeathing lawful property for customary worldly matters that carry neither explicit spiritual reward nor divine displeasure.",
    descriptionUr:
      "ایسے جائز اور مباح دنیاوی امور کے لیے وصیت کرنا جس میں نہ کوئی خاص ثواب ہو اور نہ کوئی گناہ۔",
    examplesEn: [
      "Distributing personal mementos, books, or customary heirlooms among friends",
      "Instructions regarding non-religious customary administrative affairs within legal bounds",
    ],
    examplesUr: [
      "اپنی ذاتی یادگار اشیاء، کتب یا مباح تحائف دوست احباب میں تقسیم کرنے کی وصیت",
      "جائز اور مباح دنیاوی انتظامی امور کے حوالے سے ہدایات جاری کرنا",
    ],
  },
  {
    id: "makruh",
    nameEn: "Makrūh (Disliked)",
    nameUr: "مکروہ (ناپسندیدہ)",
    colorHex: "#78350f",
    bgHex: "#fffbeb",
    borderHex: "#f59e0b",
    descriptionEn:
      "Making a bequest when the total estate is modest and the testator's own surviving heirs are impoverished and in dire need.",
    descriptionUr:
      "ایسے شخص کا وصیت کے ذریعے مال غیروں کو دینا جس کے پاس کل جائیداد بہت معمولی ہو اور اس کے اپنے شرعی ورثاء شدید مالی تنگی اور محتاجی کا شکار ہوں۔",
    examplesEn: [
      "Bequeathing the full one-third to external charities when one's own children lack basic sustenance",
      "Giving away significant wealth outside the family when direct dependents are drowning in poverty",
    ],
    examplesUr: [
      "جب ترکہ بہت قلیل ہو اور بچے غریب ہوں تو ایک تہائی باہر دے کر اپنی اولاد کو دستِ نگر چھوڑ دینا",
      "اپنے نادار اہل و عیال کی بنیادی کفالت کو نظر انداز کر کے غیروں کے نام وصیت کرنا",
    ],
  },
  {
    id: "haram",
    nameEn: "Ḥarām & Bāṭil (Prohibited & Void)",
    nameUr: "حرام و باطل (ناجائز و کالعدم)",
    colorHex: "#7f1d1d",
    bgHex: "#fef2f2",
    borderHex: "#ef4444",
    descriptionEn:
      "Making a bequest intended to fund sins, promote oppression, or unlawfully disinherit and harm legitimate Quranic heirs.",
    descriptionUr:
      "ایسی وصیت کرنا جس کا مقصد گناہ کے کاموں کی مالی معاونت ہو، ظلم کی ترویج ہو، یا شرعی ورثاء کو ان کے جائز قرآنی حقوق سے محروم کرنا مقصود ہو۔",
    examplesEn: [
      "Bequeathing wealth to construct a brewery, casino, or interest-bearing loan enterprise",
      "Instructing that a daughter or specific son be totally disinherited ('Aaq/Deprived) of their Quranic share",
      "Ordering relatives to sever ties of kinship (Qat‘ al-Raḥim)",
      "Bequests written after intentionally inflicting a lethal suicidal wound upon oneself",
    ],
    examplesUr: [
      "شراب خانے، جوئے کے اڈے یا سودی کاروبار کے لیے وصیت کرنا",
      "کسی بیٹی یا بیٹے کو عاق کر کے اس کے قرآنی و شرعی حصے سے محروم کرنے کی وصیت",
      "رشتہ داروں کے درمیان قطع رحمی اور بائیکاٹ کروانے کا حکم دینا",
      "خود کشی کا جان لیوا اقدام کرنے کے بعد تحریر کی جانے والی مالی وصیت",
    ],
  },
];

export const INVALID_WASIYYAH_SIGNS: InvalidSign[] = [
  {
    id: 1,
    titleEn: "Mental Incapacity or Dementia at Time of Drafting",
    titleUr: "وصیت کے وقت عقل و شعور یا یادداشت کا مفقود ہونا",
    severity: "danger",
    descriptionEn:
      "If credible evidence proves the testator was comatose, delirious, intoxicated, or suffering from advanced dementia/Alzheimer's when the will was drafted, the will is legally void.",
    descriptionUr:
      "اگر طبی شواہد یا گواہان سے ثابت ہو جائے کہ وصیت لکھتے وقت انسان کوما، شدید دواؤں کے زیرِ اثر بے ہوشی، دیوانگی، یا شدید الزائمر کا شکار تھا اور تمیز کھو چکا تھا، تو وصیت باطل ہے۔",
    remedyEn:
      "The entire estate is distributed strictly according to Quranic statutory inheritance rules as if no will was made.",
    remedyUr:
      "پورا ترکہ بغیر کسی وصیت کے، خالص قرآنی طبقات اور حصص کے مطابق تمام ورثاء میں تقسیم کیا جائے گا۔",
  },
  {
    id: 2,
    titleEn: "Coercion, Duress, Fraud, or Forged Signatures",
    titleUr: "جبر، اکراہ، دباؤ یا جعلی دستاویزات و دستخط",
    severity: "danger",
    descriptionEn:
      "A will extracted under physical duress, emotional blackmail, fraudulent misrepresentation, or forged signatures is null and void under Ja‘farī law.",
    descriptionUr:
      "اگر ثابت ہو جائے کہ بسترِ مرگ پر پڑے ضعیف انسان سے ڈرا دھمکا کر، بلیک میل کر کے یا دھوکے سے دستخط یا انگوٹھا لگوایا گیا ہے، تو ایسی وصیت کالعدم ہے۔",
    remedyEn:
      "The forged or coerced document is struck down by the Sharia magistrate (Al-Ḥākim al-Shar‘ī) with full restitution to heirs.",
    remedyUr:
      "حاکمِ شرع اس جعلی یا جبری وصیت کو کالعدم قرار دے کر ترکے کو اس کے حقیقی ورثاء میں تقسیم کروائے گا۔",
  },
  {
    id: 3,
    titleEn: "Bequest of Usurped or Unlawful Assets (Māl Ḥarām)",
    titleUr: "غصب شدہ، غیر کی ملکیت یا حرام مال کی وصیت",
    severity: "danger",
    descriptionEn:
      "A testator can only bequeath what they legitimately own. Bequeathing public property, encroached land, unpartitioned inheritance of others, or prohibited items (alcohol) is void.",
    descriptionUr:
      "انسان صرف اپنے ذاتی جائز مال کی وصیت کر سکتا ہے۔ غصب شدہ زمین، سرکاری اراضی، مشترکہ غیر منقسم مال، یا شراب و سود پر مبنی آمدنی کی وصیت باطل ہے۔",
    remedyEn:
      "Usurped assets must be returned immediately to their rightful owners; they form no part of the testator's estate or will.",
    remedyUr:
      "غصب شدہ مال اصل مالکان کو لوٹانا واجب ہے؛ اس پر وصیت یا وراثت کا کوئی حکم لاگو نہیں ہوگا۔",
  },
  {
    id: 4,
    titleEn: "Mandating an Unlawful, Sinful, or Oppressive Purpose",
    titleUr: "خلافِ شرع، گناہ یا کسی وارث کو عاق کرنے کا حکم",
    severity: "danger",
    descriptionEn:
      "Any testamentary clause ordering a sin, commanding the severance of kinship (Qat‘ al-Raḥim), or attempting to strip a Quranic heir of their statutory share is completely invalid.",
    descriptionUr:
      "شریعت کے خلاف ہر حکم باطل ہے؛ مثلاً یہ لکھنا کہ 'میری فلاں بیٹی کو وراثت سے عاق کیا جائے اور اسے کچھ نہ دیا جائے'، یہ جملہ شرعاً کالعدم ہے اور بیٹی کو پورا حصہ ملے گا۔",
    remedyEn:
      "The sinful condition is severed and ignored. The heir receives their full Quranic entitlement regardless of the testator's words.",
    remedyUr:
      "اس غیر شرعی شرط کو رد کر دیا جائے گا اور متاثرہ وارث کو قرآنِ مجید کے مطابق اس کا پورا حق ملے گا۔",
  },
  {
    id: 5,
    titleEn: "Post-Suicide Lethal Infliction Bequest",
    titleUr: "اقدامِ خودکشی کا جان لیوا زخم لگانے کے بعد کی گئی وصیت",
    severity: "danger",
    descriptionEn:
      "In Ja‘farī jurisprudence, if an individual intentionally inflicts a fatal wound upon themselves (poison, gunshot) and subsequently drafts a financial will before dying, that financial bequest is legally void.",
    descriptionUr:
      "فقہِ جعفریہ میں اگر کوئی شخص خود کو جان سے مارنے کی نیت سے کوئی زہر کھا لے یا گولی چلا لے اور اس کے بعد مالی وصیت لکھے تو مالی امور میں اس کی یہ وصیت باطل ہو جاتی ہے۔",
    remedyEn:
      "If written prior to self-harm, the will is valid; if written strictly after the lethal suicidal act, it is annulled.",
    remedyUr:
      "اگر خودکشی کے اقدام سے پہلے وصیت لکھی تھی تو نافذ رہے گی، لیکن اگر جان لیوا اقدام کے بعد لکھی تو کالعدم ہوگی۔",
  },
  {
    id: 6,
    titleEn: "Exceeding the One-Third (33.33%) Ceiling Without Heir Consent",
    titleUr: "ورثاء کی اجازت کے بغیر ایک تہائی (ثلث) سے زیادہ وصیت کرنا",
    severity: "warning",
    descriptionEn:
      "A will attempting to dispose of 50%, 75%, or 100% of the estate is valid only up to 33.333%. The surplus is suspended (Mawqūf) upon the consent of mature heirs.",
    descriptionUr:
      "اگر کسی نے اپنے آدھے یا پورے مال کی وصیت کر دی تو ۳۳.۳۳ فیصد تک وصیت خود بخود نافذ ہوگی، لیکن اس سے زائد رقم ورثاء کی رضامندی پر موقوف رہے گی۔",
    remedyEn:
      "If heirs reject, the bequest is clamped strictly to 1/3rd. If only some heirs consent, the excess is deducted solely from the consenting heirs' portions.",
    remedyUr:
      "اگر ورثاء انکار کر دیں تو وصیت گھٹ کر ایک تہائی ہو جائے گی۔ اگر بعض ورثاء اجازت دیں تو زائد رقم صرف اجازت دینے والوں کے حصوں سے کٹے گی۔",
  },
  {
    id: 7,
    titleEn: "Predeceasing of the Beneficiary",
    titleUr: "جس کے حق میں وصیت ہوئی اس کا وصیت کرنے والے سے پہلے فوت ہو جانا",
    severity: "warning",
    descriptionEn:
      "Under the rulings of Ayatollah Sistani and Ayatollah Khoei, if the beneficiary dies before the testator and the testator does not revoke the will, the right of acceptance transfers to the beneficiary's heirs.",
    descriptionUr:
      "آیت اللہ سیستانی اور آیت اللہ خوئی کے مطابق اگر موصیٰ لہ، موصی کی زندگی میں فوت ہو جائے اور موصی وصیت نہ بدلے، تو حقِ قبولیت موصیٰ لہ کے ورثاء کو منتقل ہو جاتا ہے۔",
    remedyEn:
      "The beneficiary's legal heirs inherit the right to accept or reject the bequeathed asset unless the will explicitly specified personal restriction.",
    remedyUr:
      "موصیٰ لہ کے شرعی ورثاء کو یہ حق ملتا ہے کہ وہ اس وصیت کو قبول کریں یا رد کریں، الا یہ کہ وصیت میں تخصیص کی گئی ہو۔",
  },
  {
    id: 8,
    titleEn: "Formal Rejection (Radd) by the Beneficiary",
    titleUr: "جس کے لیے وصیت کی گئی اس کا باضابطہ انکار (رد) کر دینا",
    severity: "warning",
    descriptionEn:
      "A possessory bequest (Waṣiyyah Tamlīkiyyah) requires acceptance. If the designated beneficiary formally rejects the gift post-mortem, the bequest is annulled.",
    descriptionUr:
      "وصیتِ تملیکیہ میں موصیٰ لہ کی طرف سے قبولیت شرط ہے۔ اگر وہ مرنے کے بعد واضح طور پر کہہ دے کہ 'مجھے یہ مال نہیں چاہیے'، تو وصیت باطل ہو جاتی ہے۔",
    remedyEn:
      "The bequeathed property returns immediately to the general estate and is divided among the statutory Quranic heirs.",
    remedyUr:
      "وہ مال فوری طور پر واپس عمومی ترکے میں شامل ہو کر تمام قرآنی ورثاء کے درمیان تقسیم ہو جائے گا۔",
  },
];

export const WASIYYAH_KNOWLEDGE_BASE: Record<string, WasiyyahSection> = {
  definition_categories: {
    id: "definition_categories",
    titleEn: "1. Definition & The Two Categories of Waṣiyyah",
    titleUr: "۱. وصیت کی تعریف اور اس کی دو بنیادی اقسام",
    subtitleEn: "Possessory (Tamlīkiyyah) vs. Executory (Ahdiyyah)",
    subtitleUr: "وصیتِ تملیکیہ اور وصیتِ عہدیہ کا فرق",
    contentEn: `In Ja‘farī jurisprudence, Waṣiyyah is defined as a testamentary disposition whose legal effect is suspended strictly upon the death of the testator.

Unlike a lifetime gift (Hibah), which transfers ownership immediately upon physical possession (Qabḍ), a Waṣiyyah confers no ownership during the testator's lifetime. The testator remains the absolute owner of their wealth and possesses the unchallengeable right to amend, alter, or revoke their will until their final breath.

The Two Fundamental Categories:
1. Waṣiyyah Tamlīkiyyah (Possessory / Proprietary Bequest):
Transferring ownership of a specific asset, monetary amount, percentage of the estate, or a usufruct (such as residential occupancy or rental revenue for a term of years) to an individual or entity after death.

2. Waṣiyyah ‘Ahdiyyah (Fiduciary / Executory Mandate):
Assigning tasks, administrative responsibilities, or guardianships to a designated executor (Al-Waṣī). This includes commissioning an executor to oversee funeral rites, discharge personal and divine liabilities, administer charitable endowments, or assume legal guardianship (Qayyim) over minor children in the absence of the paternal grandfather.`,
    contentUr: `فقہِ اہلِ بیت علیہم السلام (فقہِ جعفریہ) میں وصیت سے مراد ایسا شرعی تصرف یا حکم ہے جس کا نفاذ انسان کے انتقال کے بعد ہوتا ہے۔

وصیت اور ہبہ (تحفہ) میں بنیادی فرق یہ ہے کہ ہبہ زندگی میں ہی ملکیت اور قبضے کی منتقلی کا نام ہے، جبکہ وصیت موت پر معلق ہوتی ہے۔ انسان اپنی زندگی میں اپنے تمام تر اثاثہ جات کا تن تنہا مالک رہتا ہے اور اسے تاحیات یہ مکمل شرعی اختیار حاصل ہوتا ہے کہ وہ جب چاہے اپنی وصیت میں تبدیلی کرے، ترمیم کرے یا اسے سرے سے منسوخ کر دے۔

وصیت کی دو بنیادی اقسام:
۱. وصیتِ تملیکیہ (مال یا ملکیت کی منتقلی):
مرنے کے بعد کے لیے اپنے مال میں سے کوئی معین چیز، مخصوص رقم، ترکے کا کوئی فیصد، یا کسی جائیداد کا منافع (جیسے مکان میں رہنے کا حق یا کرایہ وصول کرنے کا حق) کسی خاص شخص، ادارے یا رفاہی کام کے نام کرنا۔

۲. وصیتِ عہدیہ (انتظامی ذمہ داری یا سرپرستی سونپنا):
مرنے کے بعد کے امور کے لیے کسی بااعتماد شخص کو اپنا وصی (ایگزیکٹو) مقرر کرنا؛ مثلاً یہ ہدایت کرنا کہ فلاں شخص کفن دفن کا انتظام کرے، قرضے اتارے، یا دادا کی غیر موجودگی میں نابالغ بچوں کا شرعی نگران اور سرپرست (قیم) بنے۔`,
    quranicVerses: [
      {
        arabic: "كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًا الْوَصِيَّةُ لِلْوَالِدَيْنِ وَالْأَقْرَبِينَ بِالْمَعْرُوفِ ۖ حَقًّا عَلَى الْمُتَّقِينَ",
        reference: "Surah Al-Baqarah (2:180)",
        translationEn:
          "Prescribed for you when death approaches any of you, if he leaves wealth, that he make a bequest to parents and next of kin according to reasonable manners—a duty incumbent upon the God-wary.",
        translationUr:
          "تم پر فرض کیا گیا ہے کہ جب تم میں سے کسی کے سامنے موت آ کھڑی ہو، بشرطیکہ وہ کچھ مال چھوڑ رہا ہو، تو اپنے والدین اور قریبی رشتہ داروں کے لیے اچھے طریقے سے وصیت کرے؛ یہ پرہیزگاروں پر ایک حق ہے۔",
      },
    ],
    hadithCitations: [
      {
        arabic: "مَا يَنْبَغِي لِامْرِئٍ مُسْلِمٍ أَنْ يَبِيتَ لَيْلَةً إِلَّا وَوَصِيَّتُهُ تَحْتَ رَأْسِهِ",
        source: "Wasā'il al-Shī'ah, Kitāb al-Waṣāyā, Bāb 1, Hadith 1",
        textEn:
          "Prophet Muhammad (SAWW) declared: 'It is not fitting for a Muslim individual to sleep a single night except that their will is placed under their pillow.'",
        textUr:
          "رسول اللہ صلی اللہ علیہ و آلہ و سلم نے فرمایا: 'کسی بھی مسلمان کے لیے یہ مناسب نہیں کہ وہ ایک رات بھی اس حال میں سوئے کہ اس کی وصیت اس کے سرہانے نہ رکھی ہو۔'",
      },
    ],
  },

  five_rulings: {
    id: "five_rulings",
    titleEn: "2. The Five Legal Classifications of Waṣiyyah",
    titleUr: "۲. وصیت کرنے کے پانچ شرعی احکام (الاحکام الخمسہ)",
    subtitleEn: "Wājib, Mustaḥabb, Mubāḥ, Makrūh, and Ḥarām",
    subtitleUr: "واجب، مستحب، مباح، مکروہ اور حرام وصیت کی تفصیل",
    contentEn: `In secular legal systems, drafting a will is purely optional. In Ja‘farī jurisprudence, depending on a person’s worldly debts, spiritual status, and family situation, making a will falls into one of five distinct legal classifications (Al-Aḥkām al-Khamsah):

1. Wājib (Strictly Obligatory):
Mandatory when unrecorded debts exist, deposits (Amānāt) are held without written witness, divine financial duties (Khums, Zakat, Hajj, Kaffarat) remain unpaid, or minor children face destitution without an appointed guardian. Neglecting a mandatory will is a major spiritual sin.

2. Mustaḥabb (Highly Recommended):
Bequeathing up to one-third of the net estate for righteous causes, continuous charity (Ṣadaqah Jāriyah), or impoverished relatives who are not statutory heirs.

3. Mubāḥ (Permissible):
Bequeathing lawful property for customary matters that carry neither explicit spiritual reward nor divine punishment.

4. Makrūh (Disliked):
Leaving bequests outside the home when one's total estate is meager and one's direct surviving children are living in acute poverty.

5. Ḥarām & Bāṭil (Prohibited & Void):
Bequeathing funds to support sins, finance oppression, or deliberately inflict financial harm (Iḍrār) upon Quranic heirs (such as attempting to disinherit a daughter).`,
    contentUr: `دنیاوی قوانین میں وصیت لکھنا محض ایک اختیاری عمل سمجھا جاتا ہے، لیکن فقہِ جعفریہ میں انسان کے حالات کے اعتبار سے وصیت کرنے پر شریعت کے پانچوں احکام لاگو ہوتے ہیں:

۱. واجب وصیت:
جب انسان پر لوگوں کے غیر تحریری قرضے یا امانتیں ہوں، شرعی مالی واجبات (خمس، زکوٰۃ، حج، کفارات) ادا نہ ہوئے ہوں، قضا نمازیں ہوں اور بڑا بیٹا نہ ہو، یا نابالغ اولاد کے ضائع ہونے کا اندیشہ ہو۔ ایسی صورت میں وصیت ترک کرنا گناہِ کبیرہ ہے۔

۲. مستحب وصیت:
اپنے خالص ترکے کے ایک تہائی (ثلث) تک کے مال کی وصیت نیک کاموں، صدقۂ جاریہ اور غیر وارث ضرورت مند رشتہ داروں کے لیے کرنا۔

۳. مباح وصیت:
جائز دنیاوی امور اور مباح یادگار اشیاء کی تقسیم کے لیے وصیت کرنا۔

۴. مکروہ وصیت:
جب کل جائیداد بہت تھوڑی ہو اور انسان کے اپنے بچے غریب ہوں، تو غیروں کے نام مال کی وصیت کرنا مکروہ ہے۔

۵. حرام و باطل وصیت:
گناہ کے کاموں کے لیے، ظلم کی ترویج کے لیے، یا قرآنی ورثاء کو ان کے جائز حصوں سے محروم کرنے کے لیے وصیت کرنا حرام اور شرعاً باطل ہے۔`,
  },

  pillars: {
    id: "pillars",
    titleEn: "3. The Four Pillars of Waṣiyyah (Arkān al-Waṣiyyah)",
    titleUr: "۳. وصیت کے چار بنیادی ارکان اور ان کی شرائط",
    subtitleEn: "Mūṣī, Mūṣā Lahū, Mūṣā Bihī, and Ṣīghah",
    subtitleUr: "موصی، موصیٰ لہ، موصیٰ بہ، اور صیغہ",
    contentEn: `A valid testamentary disposition requires four fundamental components:

Pillar 1: The Testator (Al-Mūṣī)
Must be mature (Bulūgh), sane (‘Aql), acting under free will (Ikhtiyār), and possess financial discretion (Rushd). Under rulings of Ayatollah Sistani and Ayatollah Khoei, a discerning 10-year-old child (Mumayyiz) may validly bequeath customary charitable amounts to close relatives. Furthermore, a will drafted after an intentional, lethal act of self-harm (suicide) is void regarding financial wealth.

Pillar 2: The Beneficiary (Al-Mūṣā Lahū)
Must legally exist at the time the will is drafted. A bequest to a conceived fetus is valid provided the child is delivered alive. The recipient must be an entity capable of lawful ownership.

Pillar 3: The Bequeathed Asset (Al-Mūṣā Bihī)
Must have recognized commercial and legal value (Māl Mutaqawwam) in Islamic law. It must be transferable and legally owned by the testator. Usurped property (Maghṣūb) or unlawful goods (wine) cannot be bequeathed.

Pillar 4: The Offer and Acceptance (Al-Ṣīghah)
May be executed verbally with clear words, through formal certified writing, or definitive gestures by an incapacitated person. A possessory bequest requires acceptance (Qabūl) by the beneficiary, either during the testator's lifetime or after death.`,
    contentUr: `ایک شرعی وصیت کے درست ہونے کے لیے چار ارکان کا پایا جانا لازمی ہے:

رکن اول: وصیت کرنے والا (الموصی):
عاقل، بالغ، صاحبِ اختیار اور باہوش ہونا ضروری ہے۔ دس سال کا سمجھدار بچہ (ممیز) قریبی رشتہ داروں یا نیک امور کے لیے وصیت کرے تو مخصوص شرائط کے ساتھ اس کی وصیت نافذ ہو جاتی ہے۔ اقدامِ خودکشی کا جان لیوا زخم لگانے کے بعد کی جانے والی مالی وصیت شرعاً باطل ہے۔

رکن دوم: جس کے حق میں وصیت ہو (الموصیٰ لہ):
وصیت کے وقت اس فرد کا وجود ہونا ضروری ہے۔ ماں کے پیٹ میں ٹھہرے ہوئے بچے (جنین) کے لیے وصیت درست ہے بشرطیکہ وہ زندہ پیدا ہو۔

رکن سوم: وصیت کیا گیا مال (الموصیٰ بہ):
مال شرعاً قابلِ قدر، حلال اور قابلِ منتقلی ہو۔ غصب شدہ زمین، سرکاری اراضی، یا شراب و سود کی وصیت باطل ہے۔

رکن چہارم: ایجاب و قبول یعنی صیغہ (الصيغہ):
زبانی، تحریری، یا بولنے اور لکھنے سے معذور انسان کے واضح اشارے سے ایجاب ہو سکتا ہے۔ وصیتِ تملیکیہ میں موصیٰ لہ کا قبول کرنا شرط ہے۔`,
  },

  thuluth: {
    id: "thuluth",
    titleEn: "4. The Divine Ceiling: The Rule of the One-Third (Al-Thuluth)",
    titleUr: "۴. الٰہی حد: ایک تہائی (ثلث) کا شرعی ضابطہ",
    subtitleEn: "33.3% Discretionary Bequest vs 66.7% Sacred Statutory Inheritance",
    subtitleUr: "خالص ترکے سے ایک تہائی نکالنے کا قطعی طریقہ کار",
    contentEn: `The most celebrated quantitative boundary in Islamic inheritance is the Rule of the One-Third (Al-Thuluth).

Divine law protects statutory heirs (Warathah) from being disinherited or left impoverished. A testator possesses discretionary authority over a MAXIMUM of one-third (33.333%) of their Net Distributable Estate.

How the One-Third is Calculated:
The one-third is NOT calculated from gross assets at death. It is calculated strictly from the Net Distributable Estate remaining after:
1. Shroud and customary burial expenses (Kafn wa Tajhīz) are settled.
2. All outstanding personal and commercial debts are paid in full.
3. All prior divine liabilities (unpaid Khums, Zakat, obligatory unperformed Hajj) are completely discharged.

The remaining balance is divided into:
- The Testamentary One-Third (Thuluth): Discretionary will of the deceased.
- The Two-Thirds (Thuluthān): Non-negotiable statutory inheritance reserved for Quranic heirs.

What Happens if a Will Exceeds One-Third?
If a testator bequeaths 50% or their entire estate:
- The will is NOT completely cancelled.
- It executes automatically up to exactly 33.333%.
- The excess portion beyond 1/3rd is suspended (Mawqūf) upon the post-mortem consent of mature heirs.
- If all heirs reject, the bequest is clamped strictly to 1/3rd.
- If some heirs consent, the excess is deducted solely from the portions of the consenting heirs.

Lifetime Consent of Heirs:
According to Grand Ayatollah al-Sistani and Grand Ayatollah al-Khoei, if the mature heirs voluntarily give their consent to an excess bequest during the testator's lifetime, that consent is legally binding and cannot be revoked after death.`,
    contentUr: `اسلامی قانونِ وصیت کا سب سے مشہور اور اٹل اصول ایک تہائی (33.333%) کی حد ہے۔

شریعتِ مطہرہ نے انسان کو اس کے خالص ترکے کے زیادہ سے زیادہ ایک تہائی (ثلث) میں تصرف کا مطلق اختیار دیا ہے۔ باقی دو تہائی (66.666%) مال پر قرآنِ مجید کے مقرر کردہ شرعی ورثاء کا ناقابلِ تنسیخ حق قائم ہوتا ہے۔

ایک تہائی کا حساب کیسے نکلتا ہے؟
ایک تہائی مجموعی جائیداد سے نہیں نکالا جاتا، بلکہ خالص ترکے سے نکلتا ہے:
۱. سب سے پہلے کفن دفن کے اخراجات ادا کیے جائیں۔
۲. پھر تمام تر دنیاوی قرضے اور بیوی کا مہر ادا کیا جائے۔
۳. پھر واجب شرعی مالی حقوق (خمس، زکوٰۃ، حجِ بدل) منہا کیے جائیں۔

اس کے بعد جو مال بچ جائے گا، اس کے دو تہائی پر ورثاء کا حق ہوگا، اور زیادہ سے زیادہ ایک تہائی میں میت کی وصیت نافذ ہوگی۔

اگر وصیت ایک تہائی سے زیادہ کی ہو تو کیا ہوگا؟
- ایک تہائی (33.33%) تک وصیت خود بخود نافذ ہو جائے گی۔
- ایک تہائی سے زائد جتنا حصہ ہوگا وہ ورثاء کی رضامندی پر موقوف رہے گا۔
- اگر تمام ورثاء انکار کر دیں تو وصیت گھٹ کر ایک تہائی پر محدود ہو جائے گی اور باقی سارا مال ورثاء کو ملے گا۔

زندگی میں ورثاء سے اجازت لینے کا حکم:
آیت اللہ سیستانی اور آیت اللہ خوئی کے مطابق، اگر انسان اپنی زندگی میں ہی اپنے عاقل و بالغ ورثاء سے ایک تہائی سے زائد کی وصیت پر رضامندی حاصل کر لے، تو بعد از مرگ ورثاء کے لیے اس رضامندی سے پھرنا جائز نہیں ہے۔`,
  },

  heir_bequest: {
    id: "heir_bequest",
    titleEn: "5. Can an Heir Receive a Will? (The Critical Shia-Sunni Distinction)",
    titleUr: "۵. کیا کسی وارث کے حق میں وصیت جائز ہے؟ (شیعہ و سنی فقہی امتیاز)",
    subtitleEn: "Rejection of 'Lā waṣiyyata li-wārith' in Ja‘farī Jurisprudence",
    subtitleUr: "وارث کے لیے ایک تہائی میں سے الگ سے وصیت کا مطلق جواز",
    contentEn: `In non-Shia Islamic jurisprudence, a widely cited narration claims: 'There is no bequest to an heir' (Lā waṣiyyata li-wārith). Consequently, in Sunni schools, a testator cannot bequeath additional property to an existing legal heir (such as giving extra wealth to a daughter, disabled son, or wife) without the unanimous post-mortem approval of all other heirs.

IN JA‘FARĪ (SHIA) FIQH, THIS RESTRICTION IS COMPLETELY REJECTED.

The school of the Ahl al-Bayt rules based on the explicit text of the Holy Qur'an (Surah al-Baqarah 2:180) and authentic traditions that:
1. A testator possesses the absolute right to bequeath any portion of their one-third to an existing statutory heir.
2. A father can validly bequeath up to 1/3rd of his net estate to his daughter (in addition to her normal statutory inheritance share), or to his wife (in addition to her 1/8th or 1/4th), or to an impoverished child.
3. This bequest is 100% valid, executable, and legally binding, and it DOES NOT require the permission, approval, or consent of the other heirs, provided it falls within the one-third boundary.`,
    contentUr: `اہلِ سنت کے فقہی مکاتب میں ایک مشہور حدیث نقل کی جاتی ہے کہ 'وارث کے حق میں کوئی وصیت نہیں' (لا وصیۃ لوارث)؛ چنانچہ ان کے ہاں عام طور پر کسی وارث (مثلاً کسی چہیتے بیٹے، بیٹی، یا بیوی) کے حق میں دیگر ورثاء کی اجازت کے بغیر الگ سے وصیت نافذ نہیں ہو سکتی۔

فقہِ جعفریہ میں یہ نظریہ مکمل طور پر باطل اور مردود ہے۔

مکتبِ اہلِ بیت علیہم السلام قرآنِ مجید کی سورۂ بقرہ کی آیت ۱۸۰ اور ائمہ معصومین علیہم السلام کی احادیثِ صحیحہ کی روشنی میں یہ متفقہ فتویٰ دیتا ہے کہ:
۱. انسان اپنے ایک تہائی مال کے اندر اندر اپنے کسی بھی شرعی وارث کے حق میں وصیت کرنے کا مکمل مجاز ہے۔
۲. ایک باپ اپنے ایک تہائی مال میں سے کسی معذور بیٹے، بیوہ بیٹی، یا اپنی بیوی کے لیے ان کے عام شرعی حصے کے علاوہ الگ سے جائیداد یا رقم کی وصیت کر سکتا ہے۔
۳. یہ وصیت شرعاً سو فیصد نافذ ہوگی، اور اس کے نفاذ کے لیے خاندان کے دیگر ورثاء کی اجازت، رضامندی یا دستخط کی قطعاً کوئی ضرورت نہیں ہے، بشرطیکہ وہ خالص ترکے کے ایک تہائی سے زیادہ نہ ہو۔`,
    scholarlyRulings: [
      {
        scholarEn: "Grand Ayatollah Sayyid Ali al-Sistani",
        scholarUr: "آیت اللہ العظمیٰ سید علی حسینی سیستانی",
        rulingEn:
          "A bequest in favor of one's legal heir is valid up to the one-third of the estate without needing the consent of other heirs (Al-Minhāj al-Ṣāliḥīn, Kitāb al-Waṣiyyah, Mas'alah 1276).",
        rulingUr:
          "وارث کے حق میں ایک تہائی کے اندر کی جانے والی وصیت بالکل صحیح اور نافذ ہے اور اس میں دوسرے ورثاء کی اجازت کی ضرورت نہیں ہے (منہاج الصالحین، کتاب الوصیہ، مسئلہ ۱۲۷۶)۔",
      },
      {
        scholarEn: "Grand Ayatollah Sayyid Abul-Qasim al-Khoei",
        scholarUr: "آیت اللہ العظمیٰ سید ابو القاسم خوئی",
        rulingEn:
          "The narration 'Lā waṣiyyata li-wārith' is not established in our jurisprudence; the Quranic verse 2:180 stands unrepealed regarding bequests to heirs within the third.",
        rulingUr:
          "ہمارے ہاں 'لا وصیۃ لوارث' کی روایت ثابت نہیں؛ سورۂ بقرہ کی آیت ۱۸۰ ثلث کے دائرے میں وارث کے لیے وصیت کے جواز پر محکم ہے۔",
      },
    ],
  },

  priority_hierarchy: {
    id: "priority_hierarchy",
    titleEn: "6. Legal Hierarchy & Prioritization of Bequests",
    titleUr: "۶. مختلف وصیتوں کی شرعی ترتیب اور ترجیحات",
    subtitleEn: "Wājib Mālī vs Wājib Badanī vs Tabarru‘ī",
    subtitleUr: "واجباتِ مالیہ، واجباتِ بدنیہ اور تبرعی وصیتوں کی ترتیب",
    contentEn: `When a will contains multiple financial instructions, Ja‘farī jurisprudence enforces a strict hierarchy based on the nature of the obligation:

Category 1: Wājib Mālī (Mandatory Financial Dues)
Commercial debts, people's trusts, the wife's unpaid Mahr, and divine dues (Khums, Zakat, Kaffarat, obligatory Hajj).
- The Rule: Extracted directly from the entire gross capital (Aṣl al-Māl). Not restricted by the one-third. Must be settled before inheritance or voluntary bequests.

Category 2: Wājib Badanī (Mandatory Bodily Obligations)
Missed prayers (Qadā Salāt), missed fasts (Qadā Sawm), or personal bodily vows.
- The Rule: Extracted strictly from the one-third (Al-Thuluth). Cannot be taken from the principal estate without heirs' unanimous permission.

Category 3: Tabarru‘ī (Voluntary Charitable Bequests)
Building a hospital, donating to an orphanage, aiding poor relatives, gifts to friends.
- The Rule: Executed only from the remaining balance of the one-third after all mandatory bodily obligations are cleared.

Chronological Precedence in Case of Deficit:
If a testator bequeaths $10,000 to A, $10,000 to B, and $10,000 to C, but the total one-third is only $15,000:
- If listed sequentially: Person A receives $10,000 in full; Person B receives the remaining $5,000; Person C receives nothing (chronological priority).
- If declared collectively as a single pool ('divide $30,000 equally'): the available $15,000 is reduced proportionally among all three ($5,000 each).`,
    contentUr: `اگر میت نے وصیت میں کئی امور لکھے ہوں، تو فقہِ جعفریہ ان امور کو مندرجہ ذیل ترتیب میں نافذ کرتی ہے:

پہلا درجہ: واجباتِ مالیہ (مالی قرضے اور واجبات):
لوگوں کے قرضے، بیوی کا مہر، خمس، زکوٰۃ، کفارات، اور حجِ بدل کے اخراجات۔
- حکم: یہ ادائیگیاں ایک تہائی کی پابند نہیں ہیں۔ یہ اصل مال (پورے ترکے) سے منہا کی جاتی ہیں۔

دوسرا درجہ: واجباتِ بدنیہ (عبادات کی قضا):
میت کی قضا نمازیں، قضا روزے، یا وہ نذر جس کا تعلق بدن سے تھا۔
- حکم: یہ رقم صرف اور صرف ایک تہائی (ثلث) میں سے نکالی جائے گی۔ ورثاء کی اجازت کے بغیر اصل مال سے نہیں لی جا سکتی۔

تیسرا درجہ: تبرعی وصیتیں (اختیاری خیرات و تحائف):
مسجد بنوانا، ہسپتال کو دینا، یا کسی دوست کو تحفہ دینا۔
- حکم: یہ وصیتیں واجباتِ بدنیہ ادا کرنے کے بعد ایک تہائی میں جو مال بچے گا، صرف اس میں سے نافذ ہوں گی۔

ترتیبِ زمانی کا اصول:
اگر ایک تہائی ناکافی ہو جائے تو متفرق وصیتوں میں ترتیب کا لحاظ رکھا جاتا ہے۔ پہلے والے کو پورا ملے گا، دوسرے کو بچا ہوا، اور تیسرا محروم رہے گا۔ اگر سب کا نام اکٹھا لیا ہو تو متناسب کٹوتی ہوگی۔`,
  },

  revocation: {
    id: "revocation",
    titleEn: "7. Revocation & Alteration of a Will (Rujū‘ ‘an al-Waṣiyyah)",
    titleUr: "۷. وصیت سے رجوع اور اس کی تبدیلی (منسوخی کے احکام)",
    subtitleEn: "Explicit, Implicit, and Conflicting Subsequent Wills",
    subtitleUr: "صریح، فعلی منسوخی اور تاریخ کے اعتبار سے آخری وصیت کا غلبہ",
    contentEn: `A will is a revocable legal instrument (‘Aqd Jā’iz). The testator retains absolute authority to change, amend, or revoke their will until their final breath.

Revocation Occurs in Two Ways:
1. Explicit Revocation (Rujū‘ Ṣarīḥ):
The testator explicitly states verbally or in writing: 'I revoke my previous will,' or 'My former will is null and void.'

2. Implicit / Practical Revocation (Rujū‘ Fi‘lī):
The testator performs an action that fundamentally contradicts the bequest. For example, if they bequeath a specific house to an orphanage, and two years later sell that house, demolish it, or gift it to their child, this physical disposition acts as an immediate legal revocation.

Subsequent Contradictory Wills:
If a testator writes a certified will in 2020, and writes another valid certified will in 2024 that contradicts the first, the LATEST DATED WILL takes absolute precedence, and the earlier conflicting instructions are legally superseded.`,
    contentUr: `وصیت ایک جائز اور غیر لازم عقد (عقدِ جائز) ہے۔ وصیت کرنے والے کو اپنی آخری سانس تک یہ اختیار حاصل ہے کہ وہ جب چاہے اپنی وصیت کو بدل دے۔

وصیت کی منسوخی دو طرح سے ہوتی ہے:
۱. رجوعِ صریح (کھلم کھلا زبانی یا تحریری انکار):
انسان واضح طور پر کہہ دے یا لکھ دے کہ 'میں نے اپنی پچھلی وصیت منسوخ کر دی ہے'۔

۲. رجوعِ فعلی (عملی منسوخی):
انسان کوئی ایسا عملی قدم اٹھا لے جو اس کی وصیت کے بالکل الٹ ہو۔ مثلاً جس مکان کی وصیت کی تھی، اسے بعد میں مارکیٹ میں بیچ دیا یا ہبہ کر دیا۔ یہ عمل خود بخود وصیت کی منسوخی بن جائے گا۔

متاخر وصیت کا اصول:
اگر ۲۰۲۰ء میں ایک وصیت لکھی، اور پھر ۲۰۲۴ء میں ایک اور درست وصیت لکھی جس کے احکام پہلی وصیت سے ٹکراتے ہیں، تو تاریخ کے اعتبار سے بعد والی (آخری) وصیت ہی معتبر اور نافذ العمل ہوگی۔`,
  },

  invalid_signs: {
    id: "invalid_signs",
    titleEn: "8. The Eight Signs of an Invalid or Void Will",
    titleUr: "۸. باطل یا غیر صحیح وصیت کی ۸ نشانیاں اور شرعی اسباب",
    subtitleEn: "Red Flags That Render a Bequest Unenforceable in Sharia",
    subtitleUr: "وہ وجوہات جن کے سبب وصیت شرعاً کالعدم قرار پاتی ہے",
    contentEn: `Under Ja‘farī jurisprudence, a will or specific clauses within it are declared legally void (Bāṭil), defective (Fāsid), or unenforceable under eight explicit conditions:
1. Mental Incapacity / Dementia at drafting.
2. Proven Coercion, Fraud, Blackmail, or Forged Signatures.
3. Bequest of Usurped or Unlawful Property (Māl Ḥarām).
4. Mandating an Unlawful, Sinful, or Oppressive Action.
5. Bequests drafted after an intentional, lethal act of self-harm (suicide).
6. Exceeding 1/3rd of the net estate without heir consent.
7. Predeceasing of the beneficiary without heir transfer.
8. Formal post-mortem rejection (Radd) by the beneficiary.`,
    contentUr: `فقہِ جعفریہ میں درج ذیل آٹھ اسباب اور علامات کی موجودگی میں وصیت شرعاً باطل، فاسد اور ناقابلِ نفاذ قرار پاتی ہے:
۱. وصیت کے وقت عقل و شعور کا مفقود ہونا (بے ہوشی، الزائمر)۔
۲. جبر، اکراہ، دباؤ یا جعلی دستاویزات و دستخط۔
۳. غصب شدہ، غیر کی ملکیت یا حرام مال کی وصیت۔
۴. خلافِ شرع، گناہ یا کسی وارث کو عاق کرنے کا حکم۔
۵. اقدامِ خودکشی کا جان لیوا زخم لگانے کے بعد کی گئی مالی وصیت۔
۶. ورثاء کی اجازت کے بغیر ایک تہائی سے تجاوز۔
۷. موصیٰ لہ کا وصیت کرنے والے سے پہلے انتقال کر جانا۔
۸. موصیٰ لہ کا وصیت کو باضابطہ طور پر رد کر دینا۔`,
  },

  executor: {
    id: "executor",
    titleEn: "9. The Executor (Al-Waṣī) and Guardianship (Al-Qayyim)",
    titleUr: "۹. وصی (ایگزیکٹو) اور شرعی سرپرست (قیم) کے احکام",
    subtitleEn: "Qualifications, Rights of Declining, and Multiple Executors",
    subtitleUr: "وصی کی شرائط، انکار کا حق اور مشترکہ اوصیاء کے احکام",
    contentEn: `A testator possesses the legal right to appoint an Executor (Al-Waṣī) to administer their estate, execute burial instructions, settle debts, and distribute bequests.

Conditions of the Executor:
Must be mature (Bāligh), sane (‘Āqil), Muslim, and trustworthy (Amīn). If an executor is proven corrupt, embezzling funds, or actively defying written instructions, the Shia religious judge (Al-Ḥākim al-Shar‘ī) possesses the authority to remove them and appoint an upright administrator.

Can the Appointed Executor Decline?
- During the Testator’s Lifetime: An appointed executor has the right to decline, provided they inform the testator so someone else can be appointed.
- After Death or Without Notification: If the testator dies without knowing the executor intended to decline, or if the executor only discovers the appointment post-mortem, the executor CANNOT decline. It becomes an obligatory trust (Amānah) that must be discharged, unless performing it causes intolerable hardship (Ḥaraj).

Multiple Executors:
- Joint Executors (‘Alā al-Ijtimā‘): Neither may act alone without the other's explicit consent and signature.
- Independent Executors (‘Alā al-Infirād): Either executor may carry out the duties autonomously.`,
    contentUr: `انسان کو یہ شرعی حق حاصل ہے کہ وہ مرنے کے بعد اپنے معاملات کی انجام دہی کے لیے کسی امانت دار فرد کو اپنا 'وصی' مقرر کرے۔

وصی کی شرائط:
عاقل، بالغ، مسلمان اور قابلِ اعتماد (امین) ہونا ضروری ہے۔ اگر بعد میں یہ ثابت ہو جائے کہ وصی بددیانت ہے یا وصیت کے خلاف چل رہا ہے، تو حاکمِ شرع اسے برطرف کر کے کسی عادل شخص کو نگران مقرر کر سکتا ہے۔

کیا مقرر کردہ وصی انکار کر سکتا ہے؟
- زندگی میں انکار کا حکم: وصی کو انکار کا پورا حق ہے بشرطیکہ وہ وصیت کرنے والے کو زندگی میں مطلع کرے تاکہ دوسرا وصی مقرر کیا جا سکے۔
- موت کے بعد یا لاعلمی کی صورت میں انکار: اگر میت کے مرنے کے بعد پتہ چلا تو وصی کے لیے ذمہ داری ٹھکرانا جائز نہیں ہے؛ یہ اس کے گلے میں شرعی امانت بن جاتی ہے، سوائے اس کے کہ ناقابلِ برداشت مشقت ہو۔

ایک سے زائد اوصیاء:
- علی الاجتماع (مشترکہ): دونوں مل کر فیصلہ کریں گے، ایک تنہا دستخط نہیں کر سکتا۔
- علی الانفراد (آزادانہ): دونوں میں سے جو چاہے تنہا فیصلہ کر سکتا ہے۔`,
  },
};
