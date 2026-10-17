import { MarjaId } from "@/types/fiqh";

export interface MarjaInfo {
  id: MarjaId;
  nameEn: string;
  nameUr: string;
  nameAr: string;
  titleEn: string;
  titleUr: string;
  treatiseBook: string;
  widowLandRulingEn: string;
  widowLandRulingUr: string;
  widowInheritsLandValue: boolean;
  habwahRulingEn: string;
  habwahRulingUr: string;
  masalahWidow: string;
  masalahHabwah: string;
  fullBioEn: string;
  fullBioUr: string;
}

export const MARJA_DATABASE: Record<MarjaId, MarjaInfo> = {
  sistani: {
    id: "sistani",
    nameEn: "Grand Ayatollah Sayyid Ali al-Sistani",
    nameUr: "آیۃ اللہ العظمیٰ سید علی حسینی سیستانی",
    nameAr: "سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله)",
    titleEn: "Supreme Religious Authority, Najaf al-Ashraf",
    titleUr: "مرجعِ اعلیٰ، حوزہ علمیہ نجف اشرف",
    treatiseBook: "Minhāj al-Ṣāliḥīn (Book of Inheritance) & Tawḍīḥ al-Masā'il",
    widowInheritsLandValue: true,
    widowLandRulingEn:
      "The widow inherits her fractional share (1/4 or 1/8) from the monetary value (Qīmah) of ALL lands (residential, agricultural, and commercial), in addition to the value of buildings, trees, and chattels. The heirs must compensate her with the monetary equivalent of her share.",
    widowLandRulingUr:
      "بیوہ زمین کے تمام اقسام (رہائشی، تجارتی اور زرعی) کی قیمت (قیمتِ ارض) میں سے اپنے حصہ (1/4 یا 1/8) کی حقدار ہے۔ اس کے علاوہ عمارات، درخت اور منقولہ سامان کی قیمت میں سے بھی حصہ پائے گی۔ دیگر ورثاء پر لازم ہے کہ وہ زمین کی قیمت میں سے اس کا شرعی حصہ ادا کریں۔",
    habwahRulingEn:
      "The Ḥabwah (Qur'an, ring, sword/weapon, and clothes) is an established right of the eldest living son, provided he is sane, not disobedient/disowned (ghayr ‘Āqq) by his father, and the father has other assets sufficient to cover debts. If debt consumes the whole estate, Habwah is not exempt.",
    habwahRulingUr:
      "حَبْوہ (والد کا ذاتی قرآن، انگوٹھی، تلوار/ہتھیار اور پہنے ہوئے کپڑے) بڑے زندہ بیٹے کا حق ہے، بشرطیکہ بیٹا عاقل ہو اور والد کا عاق نہ ہو۔ نیز والد کے پاس قرض چکانے کے لیے دیگر جائیداد موجود ہو۔ اگر قرض پوری ترکہ کو گھیر لے تو حبوہ قرض کی ادائیگی میں صرف ہوگا۔",
    masalahWidow: "Minhāj al-Ṣāliḥīn, Kitāb al-Mawārīth, Mas'alah 1032",
    masalahHabwah: "Minhāj al-Ṣāliḥīn, Kitāb al-Mawārīth, Mas'alah 1009",
    fullBioEn:
      "Born in 1930, current supreme Marja' based in Najaf al-Ashraf, known for comprehensive jurisprudential systematization following the school of Sayyid al-Khoei with extensive modern applications.",
    fullBioUr:
      "1930 میں ولادت۔ حوزہ علمیہ نجف اشرف کے مرجعِ اعلیٰ۔ فقہ جعفریہ کے دقیق اور عصری تقاضوں سے ہم آہنگ احکام کے ماہر۔",
  },
  khamenei: {
    id: "khamenei",
    nameEn: "Grand Ayatollah Sayyid Ali al-Khamenei",
    nameUr: "آیۃ اللہ العظمیٰ سید علی حسینی خامنہ ای",
    nameAr: "سماحة آية الله العظمى السيد علي الحسيني الخامنئي (دام ظله)",
    titleEn: "Leader and Marja', Qom / Tehran",
    titleUr: "مرجعِ تقلید و رہبر، حوزہ علمیہ قم",
    treatiseBook: "Ajwibat al-Istiftā'āt & Tawḍīḥ al-Masā'il",
    widowInheritsLandValue: true,
    widowLandRulingEn:
      "The widow receives her prescribed share from the monetary market value of all land (residential, commercial, agricultural) as well as trees and buildings. She does not own the physical soil itself, but receives its valuation.",
    widowLandRulingUr:
      "بیوہ تمام زمینوں (رہائشی، تجارتی اور زراعتی) کی قیمت سے اپنا مقررہ حصہ پاتی ہے، نیز عمارات اور باغات کی قیمت سے بھی۔ وہ زمین کے عین (مٹی) کی مالک نہیں بنتی بلکہ دیگر ورثاء اسے اس کا نقدی بدل ادا کرنے کے پابند ہیں۔",
    habwahRulingEn:
      "The eldest son takes the Ḥabwah. If the deceased father was deeply indebted and other assets do not suffice, the eldest son must surrender from the Ḥabwah proportionally to satisfy creditors.",
    habwahRulingUr:
      "حبوہ بڑے بیٹے کا مخصوص حق ہے۔ اگر متوفی باپ پر قرضہ ہو اور باقی ترکہ کفایت نہ کرے تو حبوہ سے بھی بقدرِ ضرورت قرض ادا کیا جائے گا۔",
    masalahWidow: "Ajwibat al-Istiftā'āt, Ahkām al-Mīrāth, Question 1782",
    masalahHabwah: "Ajwibat al-Istiftā'āt, Question 1795",
    fullBioEn:
      "Marja' followed widely across Iran, Lebanon, and worldwide, with fatwas emphasizing modern property protections and commercial estate reconciliations.",
    fullBioUr:
      "قم المقدسہ اور تہران میں مراجعِ کرام میں نمایاں مقام۔ معاشی اور جائیدادی جدید معاملات میں فتاویٰ کے لیے معروف۔",
  },
  khoei: {
    id: "khoei",
    nameEn: "Grand Ayatollah Sayyid Abu al-Qasim al-Khoei (ra)",
    nameUr: "آیۃ اللہ العظمیٰ سید ابو القاسم الموسوی الخوئی (رہ)",
    nameAr: "سماحة آية الله العظمى السيد أبو القاسم الموسوي الخوئي (قدس سره)",
    titleEn: "Legendary Master of Najaf Seminary (d. 1992)",
    titleUr: "استاد الفقہاء و المجتہدین، نجف اشرف",
    treatiseBook: "Minhāj al-Ṣāliḥīn (Mawārīth) & Mabānī Takmilat al-Minhāj",
    widowInheritsLandValue: false,
    widowLandRulingEn:
      "The widow inherits NOTHING from the land itself (neither physical soil nor its monetary value). She inherits strictly from the monetary value of building structures, trees, and movable chattels (Al-Binā’ wa al-Ashjār wa al-Manqūlāt).",
    widowLandRulingUr:
      "بیوہ زمین کی عین (مٹی) سے اور نہ ہی زمین کی قیمت سے کچھ وراثت پاتی ہے۔ وہ صرف عمارات، باغات/درخت اور منقولہ جائیداد کی قیمت سے اپنا شرعی حصہ حاصل کرتی ہے۔",
    habwahRulingEn:
      "Ḥabwah is an obligatory bequest by Sharia (Haqq Lazim) to the eldest living son, covering Quran, ring, sword, and clothes, provided debts do not encompass the entirety of the father's estate.",
    habwahRulingUr:
      "حبوہ بڑے بیٹے کا شرعی و لازمی حق ہے، جس میں قرآن، انگوٹھی، تلوار اور لباس شامل ہیں، بشرطیکہ قرض متوفی کے پورے ترکہ کو نہ گھیرے۔",
    masalahWidow: "Minhāj al-Ṣāliḥīn (al-Khoei), Vol 2, Mas'alah 1762",
    masalahHabwah: "Minhāj al-Ṣāliḥīn, Vol 2, Mas'alah 1735",
    fullBioEn:
      "The monumental 20th-century jurist of the Islamic world whose rigorous methodological framework trained almost all contemporary Grand Ayatollahs.",
    fullBioUr:
      "بیسویں صدی کے عظیم ترین فقیہ اور استاد العلماء۔ موجودہ دور کے اکثر مراجعِ عظام آپ کے شاگردِ رشید ہیں۔",
  },
  makarem: {
    id: "makarem",
    nameEn: "Grand Ayatollah Sheikh Naser Makarem Shirazi",
    nameUr: "آیۃ اللہ العظمیٰ شیخ ناصر مکارم شیرازی",
    nameAr: "سماحة آية الله العظمى الشيخ ناصر مكارم الشيرازي (دام ظله)",
    titleEn: "Senior Marja' and Qur'anic Commentator, Qom",
    titleUr: "سینئر مرجع و مفسرِ قرآن، حوزہ علمیہ قم",
    treatiseBook: "Tawḍīḥ al-Masā'il & Anwar al-Fuqahah",
    widowInheritsLandValue: false,
    widowLandRulingEn:
      "The widow does not inherit from the land itself or the value of open land; her share is calculated strictly from the value of residential buildings, constructed infrastructure, trees, and movable possessions.",
    widowLandRulingUr:
      "بیوہ زمین اور زمین کی قیمت سے وراثت نہیں پاتی۔ اس کا حصہ عمارتوں کی قیمت، درختوں اور دیگر منقولہ اثاثوں سے نکالا جاتا ہے۔",
    habwahRulingEn:
      "The eldest son takes the four items of Ḥabwah. He should, as a recommended precaution, say the missed prayers (Qadā) of his father.",
    habwahRulingUr:
      "بڑا بیٹا حبوہ کا حقدار ہے۔ احتیاطِ مستحب کی بنا پر وہ اپنے والد کی قضا نمازوں اور روزوں کی ذمہ داری ادا کرے۔",
    masalahWidow: "Tawḍīḥ al-Masā'il (Makarem), Mas'alah 2398",
    masalahHabwah: "Tawḍīḥ al-Masā'il, Mas'alah 2405",
    fullBioEn:
      "Prolific jurist, author of the 27-volume Tafsir Nemouneh, renowned for clarity in legal categorizations.",
    fullBioUr:
      "تفسیر نمونہ کے مولف اور قم المقدسہ کے ممتاز مرجع۔ علمی وضاحت اور فقہی ابحاث میں یکتا۔",
  },
  najafi: {
    id: "najafi",
    nameEn: "Grand Ayatollah Sheikh Bashir al-Najafi",
    nameUr: "آیۃ اللہ العظمیٰ شیخ بشیر حسین نجفی",
    nameAr: "سماحة آية الله العظمى الشيخ بشير حسين النجفي (دام ظله)",
    titleEn: "Grand Marja' of Najaf al-Ashraf",
    titleUr: "مرجعِ عالی قدر، حوزہ علمیہ نجف اشرف",
    treatiseBook: "Zād al-Mustaqīm & Tawḍīḥ al-Masā'il",
    widowInheritsLandValue: false,
    widowLandRulingEn:
      "The widow does not inherit from the soil/land itself or its monetary value; she takes her 1/8th or 1/4th strictly from the monetary value of installed buildings, trees, and chattels.",
    widowLandRulingUr:
      "بیوہ زمین یا اس کی قیمت سے ارث نہیں پاتی۔ وہ عمارتوں کی مالیت، شجر کاری اور ساز و سامان سے اپنا حصہ پاتی ہے۔",
    habwahRulingEn:
      "The eldest son takes the father's sword, Quran, ring, and clothes as Ḥabwah, conditional on father's clear ownership and non-insolvency.",
    habwahRulingUr:
      "بڑا بیٹا والد کی تلوار، قرآن، انگوٹھی اور لباس بحیثیتِ حبوہ حاصل کرتا ہے، بشرطیکہ والد کے ترکہ پر قرض کا مکمل احاطہ نہ ہو۔",
    masalahWidow: "Zād al-Mustaqīm, Kitāb al-Mīrāth, Mas'alah 1312",
    masalahHabwah: "Zād al-Mustaqīm, Mas'alah 1301",
    fullBioEn:
      "Eminent Najaf-based Marja' born in pre-partition Punjab, renowned for meticulous classical jurisprudence adhering strictly to classical Najafi texts.",
    fullBioUr:
      "حوزہ علمیہ نجف اشرف کے چار ارکانِ مراجع میں شامل۔ برصغیر میں پیدا ہوئے اور نصف صدی سے نجف میں تدریس و مرجعیت انجام دے رہے ہیں۔",
  },
};
