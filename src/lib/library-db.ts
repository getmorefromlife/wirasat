export type LibraryCategory = "LOCAL_PDF" | "MARJA_CODE" | "HADITH_CANON" | "TREATISE";

export interface LibraryResource {
  id: string;
  titleEn: string;
  titleUr: string;
  authorEn: string;
  authorUr: string;
  category: LibraryCategory;
  descriptionEn: string;
  descriptionUr: string;
  coverIcon: string;
  badges: { en: string; ur: string }[];
  pdfUrl?: string; // Direct in-project link
  fileSizeBytes?: string;
  externalUrl?: string;
  externalUrlLabelEn?: string;
  externalUrlLabelUr?: string;
  isVerifiedActive: boolean;
  featured: boolean;
}

export const LIBRARY_CATEGORIES: Record<LibraryCategory | "ALL", { en: string; ur: string }> = {
  ALL: { en: "All Resources", ur: "تمام کتب و مآخذ" },
  LOCAL_PDF: { en: "Complete PDFs (In-App)", ur: "مکمل پی ڈی ایف کتب" },
  MARJA_CODE: { en: "Marāji‘ Official Codes", ur: "مراجعِ عظام کے فتاویٰ" },
  HADITH_CANON: { en: "Ahl al-Bayt Hadith Sources", ur: "احادیثِ اہلِ بیت (ع)" },
  TREATISE: { en: "Seminary Treatises & Studies", ur: "تحقیقی و فقہی کتب" },
};

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: "islami-qanoon-virasat-naqqan",
    titleEn: "Islāmī Qānūn-e-Virāsat (Islamic Law of Inheritance)",
    titleUr: "اسلامی قانونِ وراثت",
    authorEn: "Allamah Sayyid Ali Naqi Naqvi (Naqqan Sahib)",
    authorUr: "علامہ سید علی نقی نقوی (نقن صاحب)",
    category: "LOCAL_PDF",
    descriptionEn: "The master classical Urdu treatise on Shia inheritance law. Exhaustively details the 3 classes of heirs, Quranic shares (Farḍ), surplus reversion (Radd), the repudiation of ‘Awl and Ta‘ṣīb, and complex real-world estate equations with legal charts.",
    descriptionUr: "برصغیر پاک و ہند میں فقہ جعفریہ کی میراث پر سب سے معتبر اور جامع ترین کتاب۔ اس میں قرآنی حصص، عول اور تعصیب کی شرعی نفی، رد کا تفصیلی حساب اور پیچیدہ خاندانی مسائل کو نقشوں کے ساتھ حل کیا گیا ہے۔",
    coverIcon: "📖",
    badges: [
      { en: "Complete PDF", ur: "مکمل پی ڈی ایف" },
      { en: "Classical Urdu Masterwork", ur: "کلاسیکی اردو شاہکار" },
      { en: "In-App Direct Download", ur: "براہِ راست ڈاؤنلوڈ" },
    ],
    pdfUrl: "/books/Islami Qanoon-e-Virasat - Naqqan.pdf",
    fileSizeBytes: "12.4 MB",
    isVerifiedActive: true,
    featured: true,
  },
  {
    id: "tozih-ul-masail-sistani-urdu",
    titleEn: "Tawḍīḥ al-Masā’il Jāmi‘ (Book of Inheritance & Wills)",
    titleUr: "توضیح المسائل جامع (بابِ وصیت و میراث)",
    authorEn: "Grand Ayatollah Sayyid Ali al-Husseini al-Sistani",
    authorUr: "حضرت آیت اللہ العظمیٰ سید علی الحسینی السستانی",
    category: "LOCAL_PDF",
    descriptionEn: "The official contemporary Urdu jurisprudential code from the Office of Grand Ayatollah Sistani in Najaf. Contains exhaustive legal rulings on real estate distribution, widow land rights, Habwah, and debt clearance.",
    descriptionUr: "دفترِ حضرت آیت اللہ سیستانی (نجف اشرف) کا رسمی و تفصیلی اردو رسالہ۔ اس میں وراثت کی تینوں کلاسز، بیوہ کا زمین و عمارت میں حق، حبوہ اور قرضوں کی ادائیگی کے مصدقہ فتاویٰ شامل ہیں۔",
    coverIcon: "📜",
    badges: [
      { en: "Official Najaf Code", ur: "دفترِ نجف کا مصدقہ رسالہ" },
      { en: "Complete PDF", ur: "مکمل پی ڈی ایف" },
      { en: "Active Marja‘", ur: "مرجعِ حاضر" },
    ],
    pdfUrl: "/books/Urdu-Tozih - Sistani.pdf",
    fileSizeBytes: "3.7 MB",
    externalUrl: "https://www.sistani.org/urdu/book/61/3657/",
    externalUrlLabelEn: "Sistani.org Urdu Portal",
    externalUrlLabelUr: "سیستانی ڈاٹ او آر جی (اردو)",
    isVerifiedActive: true,
    featured: true,
  },
  {
    id: "tawzih-masail-khamenei-urdu",
    titleEn: "Tawḍīḥ al-Masā’il: Practical Laws of Islam (Inheritance)",
    titleUr: "توضیح المسائل - احکامِ اسلامی (احکامِ ارث و وراثت)",
    authorEn: "Grand Ayatollah Sayyid Ali al-Khamenei",
    authorUr: "رہبرِ معظم حضرت آیت اللہ العظمیٰ سید علی خامنہ ای",
    category: "LOCAL_PDF",
    descriptionEn: "Official Urdu Risalah of Islamic Laws according to the verdicts of Ayatollah Khamenei, covering estates, testamentary bequests, modern real estate appraisal, and heir rights.",
    descriptionUr: "رہبرِ معظم حضرت آیت اللہ خامنہ ای کے فتاویٰ کے مطابق مکمل اردو توضیح المسائل۔ اس میں ترکہ، جائیداد کی تقسیم، وصیت اور شرعی حصص کے تمام مسائل درج ہیں۔",
    coverIcon: "⚖️",
    badges: [
      { en: "Official Tehran Code", ur: "مصدقہ اردو احکام" },
      { en: "Complete PDF", ur: "مکمل پی ڈی ایف" },
      { en: "Active Marja‘", ur: "مرجعِ حاضر" },
    ],
    pdfUrl: "/books/Tawzih-ul-Masail-Islamic-LawsAyatullah-Syed-Ali-Khamenei_siatBook.pdf",
    fileSizeBytes: "6.2 MB",
    externalUrl: "https://www.leader.ir/en/book/32/Practical-Laws-of-Islam",
    externalUrlLabelEn: "Leader.ir Official Portal",
    externalUrlLabelUr: "رہبر ڈاٹ آئی آر (انگلش پورٹل)",
    isVerifiedActive: true,
    featured: true,
  },
  {
    id: "sistani-islamic-laws-english",
    titleEn: "Islamic Laws (Chapter 38: Inheritance / Irth)",
    titleUr: "اسلامک لاز - بابِ میراث (انگلش)",
    authorEn: "Grand Ayatollah Sayyid Ali al-Husseini al-Sistani",
    authorUr: "حضرت آیت اللہ العظمیٰ سید علی الحسینی السستانی",
    category: "MARJA_CODE",
    descriptionEn: "Official English translation of Ayatollah Sistani's Tawdih al-Masa'il. Detailed coverage of Issues 2744+ regarding the three levels of heirs, spousal shares, parents' entitlement, and rules of exclusion.",
    descriptionUr: "حضرت آیت اللہ سیستانی کی توضیح المسائل کا باضابطہ انگریزی ترجمہ۔ اس میں ورثاء کے تینوں طبقات، بیوہ و شوہر کے حصص اور قرآنی ضوابط تفصیلاً بیان کیے گئے ہیں۔",
    coverIcon: "🌐",
    badges: [
      { en: "Official English Code", ur: "رسمی انگریزی ترجمہ" },
      { en: "Sistani.org Verified", ur: "سیستانی ڈاٹ او آر جی پر تصدیق شدہ" },
    ],
    externalUrl: "https://www.sistani.org/english/book/48/8236/",
    externalUrlLabelEn: "Read on Sistani.org",
    externalUrlLabelUr: "سیستانی ڈاٹ او آر جی پر پڑھیں",
    isVerifiedActive: true,
    featured: false,
  },
  {
    id: "makarem-shirazi-inheritance-english",
    titleEn: "Rules of Inheritance (Summary of Rulings)",
    titleUr: "احکامِ میراث - خلاصۃ الفتاویٰ (انگلش)",
    authorEn: "Grand Ayatollah Sheikh Nasir Makarem Shirazi",
    authorUr: "حضرت آیت اللہ العظمیٰ شیخ ناصر مکارم شیرازی",
    category: "MARJA_CODE",
    descriptionEn: "Authoritative English translation of Makarem Shirazi's inheritance rulings (Issues 954–980), providing clear definitions of heir classes, parental portions, and conditions of exclusion.",
    descriptionUr: "آیت اللہ مکارم شیرازی کے فتاویٰ کا مستند انگریزی ترجمہ، جس میں طبقاتِ ورثاء، حصص کی تقسیم اور موانعِ ارث کو آسان انداز میں بیان کیا گیا ہے۔",
    coverIcon: "📘",
    badges: [
      { en: "Al-Islam.org Hosted", ur: "الاسلام ڈاٹ او آر جی" },
      { en: "English Legal Code", ur: "انگریزی فقہی خلاصہ" },
    ],
    externalUrl: "https://al-islam.org/summary-rulings-naser-makarem-shirazi/rules-inheritance",
    externalUrlLabelEn: "Read on Al-Islam.org",
    externalUrlLabelUr: "الاسلام ڈاٹ او آر جی پر مطالعہ کریں",
    isVerifiedActive: true,
    featured: false,
  },
  {
    id: "al-kafi-vol7-mawarith",
    titleEn: "Al-Kāfī (Vol. 7: Book of Inheritance / Kitāb al-Mawārīth)",
    titleUr: "اصول و فروع کافی (جلد ۷: کتاب المواریث)",
    authorEn: "Thiqat al-Islām Muḥammad ibn Ya‘qūb al-Kulaynī (d. 329 AH)",
    authorUr: "ثقۃ الاسلام محمد بن یعقوب الکلینی (متوفی ۳۲۹ ھ)",
    category: "HADITH_CANON",
    descriptionEn: "The primary canonical Four Books hadith source containing over 60 chapters of authentic traditions directly from Imam Ali (as) and Imam Ja‘far al-Ṣādiq (as) on the repudiation of ‘Awl and Ta‘ṣīb and the divine shares.",
    descriptionUr: "شیعہ کتبِ اربعہ کا بنیادی ترین اور اولین ماخذ۔ اس میں حضرت علی (ع) اور امام جعفر صادق (ع) کے ارشادات کی روشنی میں عول اور تعصیب کی قرآنی نفی پر درجنوں معتبر احادیث درج ہیں۔",
    coverIcon: "🕌",
    badges: [
      { en: "Primary Hadith Canon", ur: "کتبِ اربعہ کا بنیادی ماخذ" },
      { en: "English & Arabic", ur: "عربی و انگریزی متن" },
      { en: "Thaqalayn.net Verified", ur: "ثقلین ڈاٹ نیٹ" },
    ],
    externalUrl: "https://thaqalayn.net/book/7",
    externalUrlLabelEn: "Explore on Thaqalayn.net",
    externalUrlLabelUr: "ثقلین ڈاٹ نیٹ پر احادیث پڑھیں",
    isVerifiedActive: true,
    featured: true,
  },
  {
    id: "shara-i-al-islam-baillie",
    titleEn: "The Shia Law of Inheritance (Sharā’i‘ al-Islām Digest)",
    titleUr: "قانونِ میراثِ جعفریہ (ترجمہ شرائع الاسلام)",
    authorEn: "Al-Muḥaqqiq al-Ḥillī (Translated by Neil B.E. Baillie)",
    authorUr: "المحقق الحلی (انگریزی قانونی ترجمہ: نیل بیلے)",
    category: "TREATISE",
    descriptionEn: "The classic English judicial translation of Al-Muhaqqiq al-Hilli's Sharā’i‘ al-Islām (Kitāb al-Mawārīth). Long recognized by international courts and Hawzah scholars as the benchmark classical text of Ja‘fari inheritance law.",
    descriptionUr: "المحقق الحلی کی شہرۂ آفاق کتاب 'شرائع الاسلام' (کتاب المواریث) کا عدالتی انگریزی ترجمہ۔ یہ کتاب صدائیوں سے حوزہ علمیہ اور بین الاقوامی عدالتوں میں فقہ جعفریہ کا ریفرنس مانی جاتی ہے۔",
    coverIcon: "🏛️",
    badges: [
      { en: "Classical Masterwork", ur: "حوزوی متون کا شاہکار" },
      { en: "Historic Academic Translation", ur: "تاریخی عدالتی ترجمہ" },
      { en: "Internet Archive Open Access", ur: "انٹرنیٹ آرکائیو" },
    ],
    externalUrl: "https://archive.org/details/digestofmoohummu00bailiala/page/260/mode/2up",
    externalUrlLabelEn: "Read on Internet Archive",
    externalUrlLabelUr: "انٹرنیٹ آرکائیو پر کتاب دیکھیں",
    isVerifiedActive: true,
    featured: false,
  },
  {
    id: "khamenei-practical-laws-english",
    titleEn: "Practical Laws of Islam (Ajwibat al-Istiftā'āt)",
    titleUr: "احکامِ اسلامی - اجوبۃ الاستفتاءات (انگلش پورٹل)",
    authorEn: "Office of Grand Ayatollah Sayyid Ali al-Khamenei",
    authorUr: "دفترِ رہبرِ معظم حضرت آیت اللہ خامنہ ای",
    category: "MARJA_CODE",
    descriptionEn: "Official digital repository of modern Islamic legal verdicts by Ayatollah Khamenei, covering estate settlements, wills, and contemporary financial obligations.",
    descriptionUr: "دفترِ رہبری کا آفیشل انگلش پورٹل جس میں وراثت، وصیت اور جدید مالی معاملات پر فقہی استفسارات کے جوابات شامل ہیں۔",
    coverIcon: "⚖️",
    badges: [
      { en: "Official Tehran Portal", ur: "رسمی تہران پورٹل" },
      { en: "Leader.ir Verified", ur: "لیڈر ڈاٹ آئی آر" },
    ],
    externalUrl: "https://www.leader.ir/en/book/32/Practical-Laws-of-Islam",
    externalUrlLabelEn: "Read on Leader.ir",
    externalUrlLabelUr: "لیڈر ڈاٹ آئی آر پر پڑھیں",
    isVerifiedActive: true,
    featured: false,
  },
];
