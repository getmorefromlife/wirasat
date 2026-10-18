import { MarjaId } from "@/types/fiqh";

export interface QuranicAyah {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahNameAr: string;
  surahNameEn: string;
  arabicText: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  keyLegalTakeawayEn: string;
  keyLegalTakeawayUr: string;
}

export interface HadithProof {
  id: string;
  sourceBookAr: string;
  sourceBookEn: string;
  volume: number;
  pageOrBab: string;
  hadithNumber: string;
  infallibleSpeakerAr: string;
  infallibleSpeakerEn: string;
  arabicText: string;
  translationEn: string;
  translationUr: string;
  legalSignificanceEn: string;
  legalSignificanceUr: string;
}

export interface MarjaMasalahDetails {
  bookAr: string;
  bookEn: string;
  bookUr: string;
  volume: number;
  masalahNumber: string;
  arabicText: string;
  englishTranslation: string;
  urduTranslation: string;
  keyRulingSummaryEn: string;
  keyRulingSummaryUr: string;
}

export interface ProvenanceTopic {
  id: string;
  titleEn: string;
  titleUr: string;
  titleAr: string;
  legalAxiomEn: string;
  legalAxiomUr: string;
  legalAxiomAr: string;
  primaryAyahId?: string;
  primaryHadithId?: string;
  rulings: Record<MarjaId, MarjaMasalahDetails>;
}

/* =========================================================================
   1. FOUNDATIONAL QURANIC AYAT (Surah an-Nisa')
   ========================================================================= */
export const QURANIC_AYAT: Record<string, QuranicAyah> = {
  "4:11": {
    id: "4:11",
    surahNumber: 4,
    ayahNumber: 11,
    surahNameAr: "سُورَةُ النِّسَاءِ",
    surahNameEn: "Surah An-Nisa'",
    arabicText:
      "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ ۚ فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ ۚ فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ ۚ مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ ۗ آبَاؤُكُمْ وَأَبْنَاؤُكُمْ لَا تَدْرُونَ أَيُّهُمْ أَقْرَبُ لَكُمْ نَفْعًا ۚ فَرِيضَةً مِّنَ اللَّهِ ۗ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا",
    transliteration:
      "Yūṣīkumullāhu fī awlādikum, lidh-dhakari mithlu ḥaẓẓil-unthayayn...",
    translationEn:
      "Allah instructs you concerning your children: for the male, what is equal to the share of two females. But if there are only daughters, two or more, for them is two-thirds of what the deceased left. And if there is only one, for her is half. And for one's parents, to each one of them is a sixth of his estate if he left children. But if he had no children and the parents are the heirs, for his mother is one-third. And if he had brothers [or sisters], for his mother is a sixth, after any bequest he [may have] made or debt...",
    translationUr:
      "اللہ تعالیٰ تمہیں تمہاری اولاد کے بارے میں حکم دیتا ہے: ایک لڑکے کا حصہ دو لڑکیوں کے برابر ہے۔ پس اگر صرف لڑکیاں ہی ہوں، دو یا دو سے زائد، تو ان کے لیے ترکے کا دو تہائی (2/3) ہوگا۔ اور اگر صرف ایک ہی لڑکی ہو تو اس کے لیے آدھا (1/2) ہوگا۔ اور متوفی کے والدین میں سے ہر ایک کے لیے ترکے کا چھٹا حصہ (1/6) ہوگا اگر متوفی کی اولاد ہو۔ لیکن اگر اس کی اولاد نہ ہو اور صرف ماں باپ ہی وارث ہوں، تو ماں کے لیے ایک تہائی (1/3) ہوگا۔ پھر اگر متوفی کے بھائی موجود ہوں تو ماں کا حصہ چھٹا (1/6) ہوگا، وصیت کی ادائیگی اور قرض چکانے کے بعد...",
    keyLegalTakeawayEn:
      "Establishes Tier 1 kinship (Parents and Children), the divine 2:1 male-to-female ratio among children, and the strict precedence of debts and bequests before heir distribution.",
    keyLegalTakeawayUr:
      "طبقۂ اول (والدین اور اولاد) کے مقررہ حصص، لڑکے کا دوہرا حصہ، اور تقسیم سے قبل قرض و وصیت کی لازمی ادائے گی کا قرآنی ثبوت۔",
  },
  "4:12": {
    id: "4:12",
    surahNumber: 4,
    ayahNumber: 12,
    surahNameAr: "سُورَةُ النِّسَاءِ",
    surahNameEn: "Surah An-Nisa'",
    arabicText:
      "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ ۚ فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ ۚ مِن بَعْدِ وَصِيَّةٍ يُوصِينَ بِهَا أَوْ دَيْنٍ ۚ وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ ۚ فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم ۚ مِن بَعْدِ وَصِيَّةٍ تُوصُونَ بِهَا أَوْ دَيْنٍ...",
    transliteration:
      "Wa lakum niṣfu mā taraka azwājukum in lam yakun lahunna walad...",
    translationEn:
      "And for you [husbands] is half of what your wives leave if they have no children. But if they have a child, for you is one-fourth of what they leave, after any bequest they [may have] made or debt. And for the wives is one-fourth if you leave no child. But if you leave a child, for them is an eighth of what you leave, after any bequest you [may have] made or debt...",
    translationUr:
      "اور تمہاری بیویوں نے جو کچھ چھوڑا ہو اس کا نصف (1/2) تمہارا ہے اگر ان کی کوئی اولاد نہ ہو۔ لیکن اگر ان کی اولاد ہو تو تمہارے لیے ان کے ترکے کا چوتھائی (1/4) ہوگا، وصیت اور قرض کی ادائیگی کے بعد۔ اور تمہاری بیویوں کے لیے تمہارے ترکے کا چوتھائی (1/4) ہوگا اگر تمہاری کوئی اولاد نہ ہو؛ لیکن اگر تمہاری اولاد ہو تو ان کے لیے آٹھواں حصہ (1/8) ہوگا...",
    keyLegalTakeawayEn:
      "Spousal shares are inviolable: Husband receives 1/2 (without child) or 1/4 (with child). Wife receives 1/4 (without child) or 1/8 (with child). Spouses inherit alongside all 3 classes without ever being blocked by Hajb al-Hirman.",
    keyLegalTakeawayUr:
      "شریکِ حیات کے ناقابلِ تنسیخ حصص: شوہر کا 1/2 یا 1/4؛ زوجہ کا 1/4 یا 1/8۔ شریکِ حیات کسی بھی طبقے سے محروم نہیں ہوتا۔",
  },
  "4:176": {
    id: "4:176",
    surahNumber: 4,
    ayahNumber: 176,
    surahNameAr: "سُورَةُ النِّسَاءِ",
    surahNameEn: "Surah An-Nisa'",
    arabicText:
      "يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ ۚ إِنِ امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا تَرَكَ ۚ وَهُوَ يَرِثُهَا إِن لَّمْ يَكُن لَّهَا وَلَدٌ ۚ فَإِن كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ ۚ وَإِن كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ ۗ يُبَيِّنُ اللَّهُ لَكُمْ أَن تَضِلُّوا ۗ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
    transliteration:
      "Yastaftūnaka qulillāhu yuftīkum fīl-kalālah, inimru'un halaka laysa lahū walad...",
    translationEn:
      "They request from you a legal ruling. Say, 'Allah gives you a ruling concerning the Kalālah [those who leave neither parents nor direct descendants]: If a person dies having no children but having a sister, for her is half of what he leaves. And he would inherit from her if she has no children. But if there are two sisters, for them is two-thirds of what he leaves. And if they are brothers and sisters, then for the male is what is equal to the share of two females.' Allah makes clear to you [His law], lest you go astray...",
    translationUr:
      "وہ آپ سے شرعی حکم دریافت کرتے ہیں۔ فرما دیجیے: اللہ تمہیں کلالہ (جس کا نہ والد ہو نہ اولاد) کے بارے میں حکم دیتا ہے: اگر کوئی شخص لاولد فوت ہو جائے اور اس کی ایک بہن ہو تو اس کے لیے ترکے کا نصف (1/2) ہوگا۔ اور وہ مرد اپنی بہن کا وارث ہوگا اگر بہن کی اولاد نہ ہو۔ پھر اگر دو بہنیں ہوں تو ان کے لیے ترکے کا دو تہائی (2/3) ہوگا۔ اور اگر بھائی اور بہنیں مل کر ہوں تو ایک مرد کا حصہ دو عورتوں کے برابر ہوگا۔ اللہ تمہارے لیے وضاحت فرماتا ہے تاکہ تم گمراہ نہ ہو جاؤ...",
    keyLegalTakeawayEn:
      "Governs Tier 2 (Siblings & Grandparents). In Shia law, this ayah only activates when Tier 1 (parents and children/grandchildren) is completely vacant.",
    keyLegalTakeawayUr:
      "طبقۂ دوم (بہن بھائی اور دادا دادی) کے احکام کا بیان۔ شیعہ فقہ میں یہ حکم تب ہی لاگو ہوتا ہے جب طبقۂ اول مکمل طور پر خالی ہو۔",
  },
};

/* =========================================================================
   2. KEY HADITH PROOFS (Wasā'il al-Shī‘ah)
   ========================================================================= */
export const HADITH_PROOFS: Record<string, HadithProof> = {
  "hadith_butlan_awl": {
    id: "hadith_butlan_awl",
    sourceBookAr: "وسائل الشيعة، كتاب الفرائض والمواريث",
    sourceBookEn: "Wasā'il al-Shī‘ah, Book of Inheritance",
    volume: 26,
    pageOrBab: "الباب 7 من أبواب موجبات الإرث، الحديث 1",
    hadithNumber: "32450",
    infallibleSpeakerAr: "الإمام أمير المؤمنين علي بن أبي طالب (عليه السلام)",
    infallibleSpeakerEn: "Imam Amir al-Mu'minin Ali ibn Abi Talib (peace be upon him)",
    arabicText:
      "إِنَّ الَّذِي أَحْصَى رَمْلَ عَالِجٍ لَيَعْلَمُ أَنَّ السِّهَامَ لَا تَعُولُ عَلَى سِتَّةٍ، لَوْ أَنَّهُمْ أَعْطَوْا مَنْ قَدَّمَهُ اللَّهُ وَأَخَّرُوا مَنْ أَخَّرَهُ اللَّهُ مَا عَالَتْ فَرِيضَةٌ.",
    translationEn:
      "Indeed, He who counts the grains of sand of ‘Alij knows that the ordained shares never exceed the whole. Had they prioritized those whom Allah prioritized, and deferred those whom Allah deferred, no inheritance obligation would have ever suffered a deficit (‘Awl).",
    translationUr:
      "بے شک جس پروردگار نے ریگستانِ عالج کے ریت کے ذرات کو شمار کر رکھا ہے وہ بخوبی جانتا ہے کہ قرآنی فرائض کبھی اصل ترکے سے زیادہ نہیں ہو سکتے۔ اگر لوگ اس وارث کو مقدم رکھتے جسے اللہ نے مقدم رکھا ہے، اور اسے مؤخر کرتے جسے اللہ نے مؤخر کیا ہے، تو کبھی کوئی فریضہ عول (خسارے) کا شکار نہ ہوتا۔",
    legalSignificanceEn:
      "The decisive proof against the doctrine of ‘Awl. Imam Ali (as) explains that God did not create mathematical deficits; the shortfall must be borne strictly by discretionary heirs (daughters or sisters), while protected Quranic shares (spouse and parents) remain pristine.",
    legalSignificanceUr:
      "بطلانِ عول کی حتمی دلیل۔ امیر المومنین (ع) نے واضح فرمایا کہ شوہر اور والدین کے حصے میں کٹوتی باطل ہے، اور نقص صرف بیٹیوں یا بہنوں کے حصے پر آتا ہے۔",
  },
  "hadith_butlan_tasib": {
    id: "hadith_butlan_tasib",
    sourceBookAr: "وسائل الشيعة، كتاب الفرائض والمواريث",
    sourceBookEn: "Wasā'il al-Shī‘ah, Book of Inheritance",
    volume: 26,
    pageOrBab: "الباب 2 من أبواب موجبات الإرث، الحديث 1",
    hadithNumber: "32435",
    infallibleSpeakerAr: "الإمام جعفر بن محمد الصادق (عليه السلام)",
    infallibleSpeakerEn: "Imam Ja'far al-Sadiq (peace be upon him)",
    arabicText:
      "الْمَالُ لِلْأَقْرَبِ، وَالْعَصَبَةُ فِي فِيهَا التُّرَابُ! إِنَّ اللَّهَ عَزَّ وَجَلَّ يَقُولُ: ﴿وَأُولُو الْأَرْحَامِ بَعْضُهُمْ أَوْلَىٰ بِبَعْضٍ فِي كِتَابِ اللَّهِ﴾.",
    translationEn:
      "The wealth belongs entirely to the nearest kin, and dust in the mouth of the 'Asabah (distant agnates)! For Allah, the Exalted and Majestic, decrees: 'And blood relatives are nearer to one another in the Book of Allah' [8:75].",
    translationUr:
      "ترکہ صرف اور صرف سب سے قریبی رشتہ دار کا ہے، اور عصبہ (چچا یا دور کے مرد رشتہ داروں) کے منہ میں مٹی ہو! اللہ تعالیٰ نے اپنی کتاب میں صاف فرمایا ہے کہ خونی قرابت دار باہم ایک دوسرے کے زیادہ حقدار ہیں۔",
    legalSignificanceEn:
      "Total refutation of Sunni Ta‘ṣīb. Imam al-Sadiq (as) unequivocally condemns transferring surplus estate to distant agnatic uncles or cousins when a daughter, mother, or sister is present. The surplus reverts via Radd to the closer blood kin.",
    legalSignificanceUr:
      "عصبہ کے بطلان کا واضح فرمان۔ بیٹی یا ماں کے ہوتے ہوئے چچا یا کزن کو ترکے کا بچا ہوا حصہ دینا باطل ہے، بلکہ زائد ترکہ رد ہو کر بیٹی کو ہی ملتا ہے۔",
  },
  "hadith_proximity_rule": {
    id: "hadith_proximity_rule",
    sourceBookAr: "وسائل الشيعة، كتاب الفرائض والمواريث",
    sourceBookEn: "Wasā'il al-Shī‘ah, Book of Inheritance",
    volume: 26,
    pageOrBab: "الباب 1 من أبواب ميراث الأولاد، الحديث 3",
    hadithNumber: "32512",
    infallibleSpeakerAr: "الإمام محمد بن علي الباقر (عليه السلام)",
    infallibleSpeakerEn: "Imam Muhammad al-Baqir (peace be upon him)",
    arabicText:
      "لَا يَرِثُ مَعَ وَلَدِ الصُّلْبِ وَلَدُ وَلَدٍ، الْأَقْرَبُ فَالْأَقْرَبُ يَمْنَعُ الْأَبْعَدَ.",
    translationEn:
      "No grandchild inherits alongside a direct child of the loins; the nearer in proximity absolutely blocks the more distant.",
    translationUr:
      "صلبی اولاد (زندہ بیٹے یا بیٹی) کے ہوتے ہوئے پوتا یا نواسہ وارث نہیں بن سکتا؛ سب سے قریبی رشتہ دار دور کے رشتہ دار کو مکمل طور پر محجوب کر دیتا ہے۔",
    legalSignificanceEn:
      "The Golden Proximity Rule (Al-Aqrab Yamna‘ al-Ab‘ad). Establishes that grandchildren only inherit via representation (Tanzīl) when the direct child generation is completely empty.",
    legalSignificanceUr:
      "قاعدۂ اقربیت کی بنیاد: جب تک متوفی کی اپنی صلبی اولاد میں سے ایک فرد بھی زندہ ہے، کوئی پوتا یا نواسہ وراثت میں حصہ نہیں پا سکتا۔",
  },
  "hadith_al_habwah": {
    id: "hadith_al_habwah",
    sourceBookAr: "وسائل الشيعة، كتاب الفرائض والمواريث",
    sourceBookEn: "Wasā'il al-Shī‘ah, Book of Inheritance",
    volume: 26,
    pageOrBab: "الباب 3 من أبواب ميراث الأولاد، الحديث 1",
    hadithNumber: "32530",
    infallibleSpeakerAr: "الإمام جعفر بن محمد الصادق (عليه السلام)",
    infallibleSpeakerEn: "Imam Ja'far al-Sadiq (peace be upon him)",
    arabicText:
      "إِذَا مَاتَ الرَّجُلُ فَسَيْفُهُ وَمُصْحَفُهُ وَخَاتَمُهُ وَكُتُبُهُ وَثِيَابُ جِلْدِهِ لِأَكْبَرِ وُلْدِهِ الذُّكُورِ إِذَا لَمْ يَكُنْ سَفِيهًا وَلَا فَاسِقًا.",
    translationEn:
      "When a man dies, his sword, his Qur'an, his signet ring, and the clothes he wore belong exclusively to his eldest living son, provided he is neither feebleminded nor corrupt/disobedient.",
    translationUr:
      "جب کوئی مرد فوت ہو جائے تو اس کی تلوار، اس کا ذاتی مصحف (قرآن)، اس کی انگوٹھی اور اس کے پہننے کے کپڑے اس کے سب سے بڑے زندہ بیٹے کا حق ہیں، بشرطیکہ وہ بیٹا فاتر العقل یا فاسق نہ ہو۔",
    legalSignificanceEn:
      "Authoritative mandate for Al-Ḥabwah: special personal honorific assets transferred gratia to the eldest living sane son, excluded from general heir division unless general debts exhaust the estate.",
    legalSignificanceUr:
      "حَبْوہ کا شرعی ثبوت: والد کا ذاتی سامان بڑے بیٹے کو خصوصی حق کے طور پر ملتا ہے اور عمومی تقسیم سے مستثنیٰ رہتا ہے۔",
  },
  "hadith_tanzil": {
    id: "hadith_tanzil",
    sourceBookAr: "وسائل الشيعة، كتاب الفرائض والمواريث",
    sourceBookEn: "Wasā'il al-Shī‘ah, Book of Inheritance",
    volume: 26,
    pageOrBab: "الباب 6 من أبواب ميراث الأولاد، الحديث 2",
    hadithNumber: "32525",
    infallibleSpeakerAr: "الإمام جعفر بن محمد الصادق (عليه السلام)",
    infallibleSpeakerEn: "Imam Ja'far al-Sadiq (peace be upon him)",
    arabicText:
      "وَلَدُ الِابْنِ يَقُومُونَ مَقَامَ الِابْنِ إِذَا لَمْ يَكُنْ لِلْمَيِّتِ وَلَدٌ، وَوَلَدُ الْبِنْتِ يَقُومُونَ مَقَامَ الْبِنْتِ إِذَا لَمْ يَكُنْ لِلْمَيِّتِ وَلَدٌ.",
    translationEn:
      "The children of a son stand in the place of the son when the deceased has no direct children, and the children of a daughter stand in the place of the daughter when the deceased has no direct children.",
    translationUr:
      "بیٹے کی اولاد بیٹے کے قائم مقام ہو جاتی ہے جب متوفی کی صلبی اولاد نہ ہو، اور بیٹی کی اولاد بیٹی کے قائم مقام ہو جاتی ہے جب متوفی کی صلبی اولاد نہ ہو۔",
    legalSignificanceEn:
      "Direct codification of the principle of Tanzīl (representation): grandchildren inherit the exact statutory proportion that their deceased parent would have taken.",
    legalSignificanceUr:
      "قاعدۂ تنزیل کی اصل: پوتے اور نواسے اپنے مرحوم والدین کا حصہ حاصل کرتے ہیں اور ان کے قائم مقام بنتے ہیں۔",
  },
};

/* =========================================================================
   3. MARJA‘ MASĀ'IL CITATIONS DICTIONARY
   ========================================================================= */
export const PROVENANCE_TOPICS: Record<string, ProvenanceTopic> = {
  "PROXIMITY_TIER1_VS_GRANDCHILDREN": {
    id: "PROXIMITY_TIER1_VS_GRANDCHILDREN",
    titleEn: "Rule of Proximity: Living Child Excludes All Grandchildren",
    titleUr: "قاعدۂ اقربیت: صلبی اولاد کے ہوتے ہوئے پوتوں اور نواسوں کا حجب",
    titleAr: "قاعدة الأقربية: حجب ولد الصلب لأولاد الأولاد",
    legalAxiomEn: "Al-Aqrab Yamna‘ al-Ab‘ad (The Nearer Kin Bars the Remote)",
    legalAxiomUr: "الأقرب يمنع الأبعد (سب سے قریبی رشتہ دار دور والے کو محروم کرتا ہے)",
    legalAxiomAr: "الأقرب يمنع الأبعد",
    primaryAyahId: "4:11",
    primaryHadithId: "hadith_proximity_rule",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1016",
        arabicText:
          "الطبقة الأولى: الأبوان والأولاد، ومع وجود ولد الصلب - ذكراً كان أو أنثى - لا يرث ولد الولد إجماعاً، بل يمنعهم من الإرث وإن نزلوا.",
        englishTranslation:
          "The First Class consists of parents and children. With the survival of any direct child of the loins—whether male or female—no grandchild inherits by unanimous consensus; rather, the direct child bars them, regardless of how low the descendants descend.",
        urduTranslation:
          "طبقۂ اول میں والدین اور صلبی اولاد شامل ہیں۔ اگر متوفی کی اپنی اولاد (بیٹا یا بیٹی) میں سے کوئی ایک بھی زندہ ہو تو بالاتفاق پوتا، پوتی، نواسہ یا نواسی وارث نہیں بن سکتے، بلکہ صلبی اولاد انہیں بالکلیہ محروم کر دیتی ہے۔",
        keyRulingSummaryEn: "Living direct son or daughter completely blocks all grandchildren.",
        keyRulingSummaryUr: "ایک زندہ بیٹا یا بیٹی تمام پوتوں اور نواسوں کو وراثت سے مکمل محروم کر دیتا ہے۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1724",
        arabicText:
          "أولاد الأولاد يقومون مقام آبائهم عند فقدهم، ولا يرثون مع وجود ولد الصلب ولو كان أنثى واحدة.",
        englishTranslation:
          "Grandchildren represent their parents upon their absence, and they never inherit alongside any direct child of the loins, even if that surviving child is a single female.",
        urduTranslation:
          "پوتے اور نواسے والدین کی عدم موجودگی میں ان کا قائم مقام بنتے ہیں، اور صلبی اولاد کی موجودگی میں ہرگز وارث نہیں ہوتے، خواہ وہ زندہ اولاد صرف ایک بیٹی ہی کیوں نہ ہو۔",
        keyRulingSummaryEn: "Absolute consensus: grandchildren only inherit upon total vacancy of direct children.",
        keyRulingSummaryUr: "مکمل اجماع: پوتے صرف اس صورت میں وارث ہیں جب صلبی اولاد کا طبقہ کلی طور پر خالی ہو۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt (Mawārīth Section)",
        bookUr: "اجوبۃ الاستفتاءات، باب المواریث",
        volume: 2,
        masalahNumber: "1890",
        arabicText:
          "مع وجود أحد من أولاد المتوفى الصلبيين، لا يصل الإرث إلى أولاد الأولاد المتوفين قبله، بمقتضى قاعدة الأقرب يمنع الأبعد.",
        englishTranslation:
          "With the survival of any of the deceased's direct children, no inheritance reaches the children of children who predeceased him, by virtue of the rule: the nearer bars the remote.",
        urduTranslation:
          "متوفی کی صلبی اولاد میں سے کسی ایک کے بھی زندہ ہوتے ہوئے، اس سے قبل وفات پانے والے بچوں کی اولاد کو وراثت نہیں پہنچتی، کیونکہ اقرب رشتہ دار دور والے کو محروم کر دیتا ہے۔",
        keyRulingSummaryEn: "Proximity rule strictly excludes grandchildren if a direct aunt or uncle survives.",
        keyRulingSummaryUr: "قاعدۂ اقربیت کے نفاذ سے چچا یا پھوپھی کی موجودگی میں پوتے محروم رہتے ہیں۔",
      },
      makarem: {
        bookAr: "توضيح المسائل و كتاب الإرث",
        bookEn: "Tawḍīḥ al-Masā'il & Kitāb al-Irth",
        bookUr: "توضیح المسائل و احکامِ ارث",
        volume: 1,
        masalahNumber: "2382",
        arabicText:
          "إذا كان للميت ولد حيّ، فلا نصيب لأحفاده من أولاده الآخرين الذين ماتوا في حياته.",
        englishTranslation:
          "If the deceased has a living child, then there is no share for his grandchildren born of other children who died during his lifetime.",
        urduTranslation:
          "اگر متوفی کی اپنی کوئی اولاد زندہ ہو تو اس کی حیات میں فوت ہونے والے دیگر بچوں کے بیٹوں اور بیٹیوں کا کوئی حصہ نہیں ہوتا۔",
        keyRulingSummaryEn: "No inheritance for grandchildren while any direct child lives.",
        keyRulingSummaryUr: "کسی بھی صلبی بچے کے جیتے جی پوتوں کا کوئی حصہ نہیں بنتا۔",
      },
      najafi: {
        bookAr: "زاد المستفيد، كتاب الفرائض",
        bookEn: "Zād al-Mustafīd (Kitāb al-Farā'iḍ)",
        bookUr: "زاد المستفید، کتاب الفرائض",
        volume: 2,
        masalahNumber: "1140",
        arabicText:
          "ولد الولد إنما يرث بالتنزيل حيث لا ولد للميت، ومع وجود الولد الصريح يحجب ولد الولد حجباً حرمانياً تاماً.",
        englishTranslation:
          "Grandchildren inherit solely through representation (Tanzīl) when the deceased has no direct child; with the presence of an explicit direct child, the grandchild is totally deprived by Hajb al-Hirman.",
        urduTranslation:
          "پوتے صرف تنزیل کے تحت وارث بنتے ہیں جب متوفی کی کوئی اولاد نہ ہو؛ لیکن صلبی اولاد کے ہوتے ہوئے پوتے حجبِ حرمان کا شکار ہو کر مکمل محروم ہو جاتے ہیں۔",
        keyRulingSummaryEn: "Grandchildren's representation is conditional on complete absence of direct children.",
        keyRulingSummaryUr: "پوتوں کی نمائندگی صلبی اولاد کے مکمل فقدان کے ساتھ مشروط ہے۔",
      },
    },
  },

  "TANZIL_REPRESENTATION": {
    id: "TANZIL_REPRESENTATION",
    titleEn: "Tanzīl Rules: Grandchildren Inheriting by Representation",
    titleUr: "قاعدۂ تنزیل: پوتوں اور نواسوں کا اپنے والدین کے قائم مقام بن کر وراثت پانا",
    titleAr: "أحكام التنزيل: وراثة أولاد الأولاد بالنيابة",
    legalAxiomEn: "Kullu Far‘in Yaqūmu Maqāma Aṣlihi (Each Branch Represents Its Root)",
    legalAxiomUr: "ہر شاخ اپنے اصل کی قائم مقام ہوتی ہے",
    legalAxiomAr: "كل فرع يقوم مقام أصله في النصيب والحجب",
    primaryAyahId: "4:11",
    primaryHadithId: "hadith_tanzil",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1017",
        arabicText:
          "أولاد الأولاد يقومون مقام آبائهم عند فقدهم؛ فأولاد الابن يأخذون نصيب الابن، وأولاد البنت يأخذون نصيب البنت. ويقتسم أولاد الابن نصيب أبيهم للذكر مثل حظ الأنثيين. وأما أولاد البنت فالأحوط وجوباً التراضي بينهم، وإن كان الأقوى اقتسامهم نصيب أمهم بالتفاضل أيضاً (للذكر مثل حظ الأنثيين).",
        englishTranslation:
          "Grandchildren represent their parents when they are absent; the children of a son take the son's share, and the children of a daughter take the daughter's share. The children of a son divide their father's share with the male receiving twice the share of the female. As for the children of a daughter, by obligatory precaution (Ahwat Wujūbī) they should compromise, though the stronger ruling is that they also divide their mother's share with 2:1 ratio.",
        urduTranslation:
          "پوتے اور نواسے اپنے والدین کی عدم موجودگی میں ان کا قائم مقام بنتے ہیں۔ بیٹے کی اولاد بیٹے کا حصہ پاتی ہے اور بیٹی کی اولاد بیٹی کا۔ بیٹے کے بچے آپس میں ۲:۱ (مرد کا دوہرا) کے تناسب سے تقسیم کرتے ہیں۔ رہی بیٹی کی اولاد (نواسے نواسیاں)، تو ان کے مابین احتیاطِ واجب کی رو سے صلح و رضامندی ضروری ہے، اگرچہ اقویٰ یہ ہے کہ وہ بھی آپس میں ۲:۱ کے تناسب سے ہی بانٹیں گے۔",
        keyRulingSummaryEn: "Daughter's children divide her 1/3 share; Sistani mandates Ahwat Wujubi (2:1 or mutual agreement).",
        keyRulingSummaryUr: "نواسوں کے مابین والدہ کے ترکے کی تقسیم میں سیستانی صاحب احتیاطِ واجب کے قائل ہیں۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1725",
        arabicText:
          "أولاد البنت يقتسمون نصيب أمهم بالتساوي إن كانوا ذكوراً أو إناثاً، وإن اختلفوا فبالتفاضل للذكر مثل حظ الأنثيين على الأظهر.",
        englishTranslation:
          "The children of a daughter divide their mother's share equally if of the same gender; if mixed, the apparent ruling is the male receives twice the female.",
        urduTranslation:
          "بیٹی کی اولاد اپنی ماں کا حصہ ہم جنس ہونے پر برابر اور مختلف جنس ہونے پر ۲:۱ کے تناسب سے تقسیم کرتی ہے۔",
        keyRulingSummaryEn: "Son's children divide 2:1; daughter's children divide 2:1 by default.",
        keyRulingSummaryUr: "بیٹے اور بیٹی دونوں کے بچے آپس میں ۲:۱ کے تناسب سے حصہ تقسیم کرتے ہیں۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt",
        bookUr: "اجوبۃ الاستفتاءات",
        volume: 2,
        masalahNumber: "1893",
        arabicText:
          "يأخذ كل سبط حصة من يتقرب به إلى الميت، واقتسام أولاد البنت نصيبها يكون للذكر مثل حظ الأنثيين.",
        englishTranslation:
          "Each grandchild receives the share of the person through whom they connect to the deceased. The division among a daughter's children is with the male taking double the female.",
        urduTranslation:
          "ہر پوتا یا نواسہ اپنے واسطے کا حصہ وصول کرتا ہے، اور بیٹی کے بچوں کے مابین تقسیم بھی ۲:۱ کے تناسب سے ہوتی ہے۔",
        keyRulingSummaryEn: "Strict representation: 2:1 division holds across all branches.",
        keyRulingSummaryUr: "تنزیل کے تحت تمام شاخوں میں تقسیم ۲:۱ کے تناسب سے ہوتی ہے۔",
      },
      makarem: {
        bookAr: "توضيح المسائل",
        bookEn: "Tawḍīḥ al-Masā'il",
        bookUr: "توضیح المسائل",
        volume: 1,
        masalahNumber: "2385",
        arabicText:
          "يأخذ أولاد الابن سهم الابن، وأولاد البنت سهم البنت، ويقسمون بينهم للذكر ضعف الأنثى.",
        englishTranslation:
          "A son's children take the son's share, a daughter's children take the daughter's share, and they divide among themselves with the male taking twice the female.",
        urduTranslation:
          "بیٹے کی اولاد بیٹے کا اور بیٹی کی اولاد بیٹی کا حصہ لیتی ہے، اور مرد کو عورت سے دوگنا دیا جاتا ہے۔",
        keyRulingSummaryEn: "Clear 2:1 rule for both sons' and daughters' children.",
        keyRulingSummaryUr: "پوتوں اور نواسوں دونوں کے اندر ۲:۱ کا تناسب نافذ العمل ہوتا ہے۔",
      },
      najafi: {
        bookAr: "زاد المستفيد",
        bookEn: "Zād al-Mustafīd",
        bookUr: "زاد المستفید",
        volume: 2,
        masalahNumber: "1143",
        arabicText:
          "التنزيل حكم شرعي، فتقوم البنت مقام أمها والابن مقام أبيه، والتفاضل جارٍ في أولاد البنت كأولاد الابن.",
        englishTranslation:
          "Representation is an established legal ruling: a daughter stands in place of her mother, a son in place of his father, and the 2:1 differentiation applies to daughter's children as well.",
        urduTranslation:
          "تنزیل ایک شرعی قاعدہ ہے، اور بیٹی کے بچوں میں بھی ۲:۱ کا تناسب اسی طرح لاگو ہوتا ہے جیسے بیٹے کے بچوں میں۔",
        keyRulingSummaryEn: "Daughter's children divide 2:1 based on root representation.",
        keyRulingSummaryUr: "نواسوں کے مابین بھی ۲:۱ کا تناسب بلا تذبذب نافذ ہوتا ہے۔",
      },
    },
  },

  "WIDOW_LAND_VALUATION": {
    id: "WIDOW_LAND_VALUATION",
    titleEn: "Widow's Share in Real Estate & Land Valuation",
    titleUr: "بیوہ کا غیر منقولہ جائیداد (زمین، باغات و عمارات) کی قیمت سے وراثت پانا",
    titleAr: "ميراث الزوجة من العقار وقيمة الأرض",
    legalAxiomEn: "Al-Zawjatu Tarithu min Qīmati al-Arḍ (Widow Inherits From Land Valuation)",
    legalAxiomUr: "بیوہ زمین کے عین کی نہیں بلکہ اس کی بازاری قیمت کی حقدار ہوتی ہے",
    legalAxiomAr: "ترث الزوجة من قيمة الأرض وعين المنقولات",
    primaryAyahId: "4:12",
    primaryHadithId: "hadith_proximity_rule",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1025",
        arabicText:
          "الزوجة ترث من قيمة الأرض بجميع أقسامها - عَرَصات الدور، والبساتين، والمزارع، وغيرها - ولا ترث من عين الأرض، بل ترث من قيمتها السوقية، بالإضافة إلى إرثها من عين المنقولات وقيمة البناء والشجر.",
        englishTranslation:
          "The widow inherits from the monetary value of land in all its categories—residential courtyards, orchards, agricultural farms, and commercial parcels. She does not inherit the physical parcel itself, but inherits its fair market valuation, in addition to her physical share of chattels and valuation of buildings and trees.",
        urduTranslation:
          "بیوہ زمین کی تمام اقسام (رہائشی، باغات، زرعی رقبہ اور تجارتی اراضی) کی نقدی قیمت سے اپنا حصہ پاتی ہے۔ وہ زمین کے عین (مٹی) کی مالک نہیں بنتی بلکہ اس کی بازاری قیمت کی حقدار ہوتی ہے، نیز عمارات، درخت اور منقولہ سامان کی قیمت سے بھی حصہ وصول کرتی ہے۔",
        keyRulingSummaryEn: "MODERN LANDMARK RULING: Widow receives her 1/8th or 1/4th from ALL land values.",
        keyRulingSummaryUr: "جدید تاریخی فتویٰ: بیوہ تمام اقسام کی زمین کی قیمت سے 1/8 یا 1/4 حصہ پاتی ہے۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt",
        bookUr: "اجوبۃ الاستفتاءات",
        volume: 2,
        masalahNumber: "1882",
        arabicText:
          "ترث الزوجة من قيمة الأرض مطلقاً سواء كانت أرض دار أو بستان أو مزرعة، وعلى الورثة دفع القيمة إليها.",
        englishTranslation:
          "The widow unconditionally inherits from the monetary value of land, whether it is residential land, orchard, or farmland, and the heirs are obligated to pay her that valuation.",
        urduTranslation:
          "بیوہ مطلقاً زمین کی قیمت سے حصہ پاتی ہے، خواہ وہ گھر کی زمین ہو یا باغ یا کھیت، اور دیگر ورثاء پر اس کی قیمت ادا کرنا واجب ہے۔",
        keyRulingSummaryEn: "Agrees with Sistani: Widow inherits monetary value of all land.",
        keyRulingSummaryUr: "سیستانی صاحب کی تائید: بیوہ تمام زمینوں کی قیمت سے شرعی حصہ پاتی ہے۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1740",
        arabicText:
          "الزوجة لا ترث من الأرض لا عيناً ولا قيمة، وإنما ترث من قيمة الأبنية والأشجار وآلات الدار خاصة.",
        englishTranslation:
          "The widow inherits nothing from land, neither in its physical substance nor in its monetary value. She inherits exclusively from the monetary value of buildings, trees, and domestic fixtures.",
        urduTranslation:
          "بیوہ زمین میں سے نہ تو عین حاصل کرتی ہے اور نہ ہی قیمت، بلکہ وہ صرف عمارات، درخت اور رہائشی تعمیرات کی قیمت سے حصہ پاتی ہے۔",
        keyRulingSummaryEn: "TRADITIONAL NAJAF POSITION: Widow receives $0 from land; inherits buildings & trees only.",
        keyRulingSummaryUr: "روایتی فقہی موقف: بیوہ کو زمین سے کچھ نہیں ملتا، صرف عمارات و باغات سے ملتا ہے۔",
      },
      makarem: {
        bookAr: "توضيح المسائل",
        bookEn: "Tawḍīḥ al-Masā'il",
        bookUr: "توضیح المسائل",
        volume: 1,
        masalahNumber: "2390",
        arabicText:
          "الزوجة ترث من قيمة بناء الدار والشجر، ولا ترث من أصل أرض الدار والمزرعة عيناً، وترث من قيمتها على الأحوط.",
        englishTranslation:
          "The widow inherits from the value of residential buildings and trees; she does not inherit the physical soil of the house or farm, but receives from its value by precaution.",
        urduTranslation:
          "بیوہ عمارات اور درختوں کی قیمت سے حصہ پاتی ہے، اور زمین کے عین کی مالک نہیں بنتی، البتہ احتیاطاً قیمت سے حصہ دیا جائے۔",
        keyRulingSummaryEn: "Precautionary position: buildings guaranteed, land value by precaution.",
        keyRulingSummaryUr: "احتیاطی موقف: عمارات کا حق یقینی، زمین کی قیمت احتیاط پر مبنی۔",
      },
      najafi: {
        bookAr: "زاد المستفيد",
        bookEn: "Zād al-Mustafīd",
        bookUr: "زاد المستفید",
        volume: 2,
        masalahNumber: "1155",
        arabicText:
          "لا ترث الزوجة من رقبة الأرض شيئاً، وإرثها محصور في قيمة الآلات والأبنية والأشجار دون نفس العرصة.",
        englishTranslation:
          "The widow inherits nothing from the parcel of land itself; her inheritance is restricted to the value of fixtures, buildings, and trees, excluding the open ground.",
        urduTranslation:
          "بیوہ زمین کی گردن (اصل مٹی) سے کچھ نہیں پاتی، اس کا حق صرف عمارات، آلات اور درختوں کی قیمت تک محدود ہے۔",
        keyRulingSummaryEn: "Restricted to building and tree valuations; excludes raw land.",
        keyRulingSummaryUr: "حق صرف تعمیرات اور باغات کی قیمت تک محدود ہے، زمین مستثنیٰ ہے۔",
      },
    },
  },

  "BUTLAN_AL_AWL": {
    id: "BUTLAN_AL_AWL",
    titleEn: "Repudiation of ‘Awl: Deficit Absorbed Solely by Daughters/Sisters",
    titleUr: "بطلانِ عول: قرآنی فرائض میں خسارے کی نفی اور بیٹیوں/بہنوں پر نقص کا آنا",
    titleAr: "بطلان العول: حماية حصص الزوج والأبوين وتوجيه النقص للبنات والأخوات",
    legalAxiomEn: "Lā ‘Awla fī Farā'iḍi Allāh (No Deficit in Divine Inheritances)",
    legalAxiomUr: "فرائضِ الٰہی میں عول (خسارہ) باطل ہے",
    legalAxiomAr: "لا عول في فرائض آل محمد (عليهم السلام)",
    primaryAyahId: "4:11",
    primaryHadithId: "hadith_butlan_awl",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1005",
        arabicText:
          "العول باطل في مذهب أهل البيت (عليهم السلام)، فإذا زادت السهام على الفريضة - كما لو ماتت وتركت زوجاً وأبوين وبنتين - يدخل النقص على البنت أو البنات خاصة دون الزوج ودون الأبوين.",
        englishTranslation:
          "‘Awl is void in the school of Ahl al-Bayt (peace be upon them). If the prescribed shares exceed the integer of one—such as a deceased leaving a husband (1/4), parents (1/6 + 1/6), and two daughters (2/3)—the fractional deficit enters strictly upon the daughter or daughters, not upon the husband and not upon the parents.",
        urduTranslation:
          "اہلِ بیت (ع) کے مسلک میں عول باطل ہے۔ اگر قرآنی حصص کل ترکے (1) سے بڑھ جائیں (جیسے شوہر، والدین اور دو بیٹیاں)، تو خسارہ صرف اور صرف بیٹیوں کے حصے پر ڈالا جاتا ہے، جبکہ شوہر اور والدین کا مقررہ حصہ مکمل محفوظ رہتا ہے۔",
        keyRulingSummaryEn: "Deficit is absorbed 100% by daughters or sisters; spouse and parents never reduced.",
        keyRulingSummaryUr: "خسارہ صرف بیٹیوں پر آتا ہے؛ شوہر، بیوی اور والدین کے حصے میں بال برابر کمی نہیں ہوتی۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1710",
        arabicText:
          "لا يدخل النقص على من لا يتغير فرضه بالأولاد كالزوجين، ولا على الأبوين، بل يدخل النقص على البنات أو الأخوات للأبوين أو للأب خاصة.",
        englishTranslation:
          "Deficit does not enter upon those whose shares are fixed and inviolable like spouses, nor upon parents; rather, deficit enters exclusively upon daughters, or sisters from both parents or from the father.",
        urduTranslation:
          "خسارہ ان ورثاء پر نہیں آتا جن کے فرائض حتمی ہیں جیسے شریکِ حیات یا والدین، بلکہ صرف بیٹیوں یا علاتی/سگی بہنوں پر آتا ہے۔",
        keyRulingSummaryEn: "Inviolable Quranic tiers are protected from any proportional haircut.",
        keyRulingSummaryUr: "قرآنی مقررہ ورثاء پر عام کٹوتی نافذ کرنا باطل اور حرام ہے۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt",
        bookUr: "اجوبۃ الاستفتاءات",
        volume: 2,
        masalahNumber: "1879",
        arabicText:
          "العول ليس بمعتبر شرعاً في الفقه الجعفري، ونقص الفريضة يقع على البنت أو الأخوات الأبويات.",
        englishTranslation:
          "‘Awl is not recognized legally in Ja'fari jurisprudence; the deficit of the estate falls upon the daughter or paternal sisters.",
        urduTranslation:
          "فقہ جعفریہ میں عول شرعاً کوئی حیثیت نہیں رکھتا، اور ترکے کا خسارہ بیٹی یا باپ شریک بہنوں پر پڑتا ہے۔",
        keyRulingSummaryEn: "Deficit strictly directed to discretionary blood branches.",
        keyRulingSummaryUr: "ترکے کی کمی صرف مخصوص رشتوں سے پوری کی جاتی ہے۔",
      },
      makarem: {
        bookAr: "توضيح المسائل",
        bookEn: "Tawḍīḥ al-Masā'il",
        bookUr: "توضیح المسائل",
        volume: 1,
        masalahNumber: "2375",
        arabicText:
          "لا عول عندنا؛ فإذا كان مجموع السهام أكثر من التركة، فالنقص يدخل على البنتين فصاعداً أو الأختين فصاعداً.",
        englishTranslation:
          "There is no ‘Awl in our school; when the sum of shares exceeds the estate, the reduction enters upon the daughters or sisters.",
        urduTranslation:
          "ہمارے نزدیک عول باطل ہے؛ جب حصص کا مجموعہ ترکے سے بڑھ جائے تو کٹوتی بیٹیوں یا بہنوں پر ہوتی ہے۔",
        keyRulingSummaryEn: "Consistent Shia consensus: no reduction for parents or spouse.",
        keyRulingSummaryUr: "تمام فقہاء کا اتفاق: والدین اور زوجین کے حصے محفوظ رہتے ہیں۔",
      },
      najafi: {
        bookAr: "زاد المستفيد",
        bookEn: "Zād al-Mustafīd",
        bookUr: "زاد المستفید",
        volume: 2,
        masalahNumber: "1135",
        arabicText:
          "العول بدعة لا أصل لها في الشرع، والحكم الحق أن يقدم أصحاب السهام الثابتة ويدخل النقص على المتغير.",
        englishTranslation:
          "‘Awl is an ungrounded innovation without scriptural basis; the true ruling gives precedence to fixed Quranic shares and places deficit on variable shares.",
        urduTranslation:
          "عول ایک بے بنیاد بدعت ہے؛ حق فیصلہ یہ ہے کہ ثابت حصص والوں کو مقدم رکھا جائے اور نقص متغیر حصے پر ڈالا جائے۔",
        keyRulingSummaryEn: "Condemns proportional reduction; preserves fixed divine fractions.",
        keyRulingSummaryUr: "عام کٹوتی کی مذمت اور مقررہ فرائض کی حفاظت۔",
      },
    },
  },

  "BUTLAN_AL_TASIB": {
    id: "BUTLAN_AL_TASIB",
    titleEn: "Repudiation of Ta‘ṣīb: Surplus Reverts by Radd to Quranic Heirs",
    titleUr: "بطلانِ تعصیب: عصبہ کی نفی اور زائد ترکے کا ورثاء کی طرف رد ہونا",
    titleAr: "بطلان التعصيب: رد الفاضل على ذوي السهام ونفي العصبة",
    legalAxiomEn: "Lā Ta‘ṣība fī al-Irth (No Agnatic Reversion to Distant Relatives)",
    legalAxiomUr: "وراثت میں عصبہ کا کوئی حصہ نہیں، زائد ترکہ لوٹایا جاتا ہے",
    legalAxiomAr: "لا تعصيب مع وجود ذوي الأرحام",
    primaryAyahId: "4:11",
    primaryHadithId: "hadith_butlan_tasib",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1006",
        arabicText:
          "التعصيب باطل عندنا، فإذا فضلت التركة عن سهام ذوي السهام - كما لو مات وترك بنتاً واحدة أو أماً وبنتاً - رُدَّ الباقي على ذوي السهام بنسبة سهامهم، ولا يُعطى للعصبة (كالعم أو ابن العم) شيء أصلاً.",
        englishTranslation:
          "Ta‘ṣīb is void in our jurisprudence. If the estate exceeds the prescribed Quranic shares—such as leaving only one daughter (who has 1/2), or mother and daughter—the surplus is returned (Radd) entirely to the Quranic heirs in proportion to their shares. Nothing whatsoever is given to distant male agnates (like uncles or cousins).",
        urduTranslation:
          "ہمارے نزدیک تعصیب قطعی باطل ہے۔ اگر ترکہ مقررہ حصص سے زیادہ ہو جائے (جیسے متوفی کی صرف ایک بیٹی ہو جسے 1/2 ملنا ہے)، تو بچا ہوا آدھا مال عصبہ (چچا یا کزن) کو نہیں دیا جاتا بلکہ رد کے قانون کے تحت بیٹی کو ہی واپس ملتا ہے اور وہ پورے ترکے کی تنہا وارث بنتی ہے۔",
        keyRulingSummaryEn: "Daughter takes 100% (1/2 by Quran + 1/2 by Radd); distant uncles receive $0.",
        keyRulingSummaryUr: "اکیلی بیٹی کو پورا ترکہ (نصف بطور فرض + نصف بطور رد) ملتا ہے؛ چچا کا حصہ صفر ہے۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1712",
        arabicText:
          "يرد الفاضل على أرباب الفروض غير الزوجين إلا في حال انحصار الوارث في الزوج، والقول بالتعصيب خلاف صريح القرآن.",
        englishTranslation:
          "The surplus reverts strictly to the Quranic share-holders excluding spouses (unless the husband is the sole surviving heir). The doctrine of Ta‘ṣīb directly contradicts the explicit text of the Holy Qur'an.",
        urduTranslation:
          "زائد مال قرآنی وارثوں پر رد ہوتا ہے، اور عصبہ کا نظریہ قرآن مجید کی صریح آیات کے صریحاً منافی ہے۔",
        keyRulingSummaryEn: "Radd ensures complete enclosure within the closest surviving blood tier.",
        keyRulingSummaryUr: "قاعدۂ رد کی رو سے ترکہ قریبی طبقے کے اندر ہی مکمل تقسیم ہو جاتا ہے۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt",
        bookUr: "اجوبۃ الاستفتاءات",
        volume: 2,
        masalahNumber: "1880",
        arabicText:
          "لا عبرة بالتعصيب في فقه أهل البيت (ع)؛ فمع وجود البنت، لا يرث العم أو العمة شيئاً، ويرد الزائد على البنت.",
        englishTranslation:
          "No weight is given to Ta‘ṣīb in the jurisprudence of the Ahl al-Bayt (as). In the presence of a daughter, an uncle or aunt inherits nothing, and the surplus returns to the daughter.",
        urduTranslation:
          "اہلِ بیت (ع) کے فقہ میں تعصیب باطل ہے؛ بیٹی کے ہوتے ہوئے چچا یا پھوپھی کو کچھ نہیں ملتا، اور زائد مال بیٹی کو ہی رد ہوتا ہے۔",
        keyRulingSummaryEn: "Daughters and mothers completely shut out all uncles from surplus.",
        keyRulingSummaryUr: "بیٹی کی موجودگی میں چچا ترکے کے ایک پیسے کا حقدار نہیں بن سکتا۔",
      },
      makarem: {
        bookAr: "توضيح المسائل",
        bookEn: "Tawḍīḥ al-Masā'il",
        bookUr: "توضیح المسائل",
        volume: 1,
        masalahNumber: "2378",
        arabicText:
          "العصبة ساقطة ولا قيمة لها؛ فإذا كان الوارث بنتاً واحدة، أخذت نصف المال بالفرض ونصفه الآخر بالرد.",
        englishTranslation:
          "The ‘Asabah is dropped and has no legal validity; if the heir is one daughter, she takes half the wealth by prescription and the other half by Radd.",
        urduTranslation:
          "عصبہ ساقط ہے؛ اکیلی بیٹی ہو تو وہ آدھا مال فرض سے اور باقی آدھا مال رد سے لیتی ہے۔",
        keyRulingSummaryEn: "Daughter is awarded 100% of the estate; agnatic claims rejected.",
        keyRulingSummaryUr: "بیٹی تن تنہا پورے ترکے کی مالک قرار پاتی ہے۔",
      },
      najafi: {
        bookAr: "زاد المستفيد",
        bookEn: "Zād al-Mustafīd",
        bookUr: "زاد المستفید",
        volume: 2,
        masalahNumber: "1138",
        arabicText:
          "بطلان التعصيب من ضروريات مذهب الإمامية، والمال يرد على قرابة الرحم المذكورة في القرآن.",
        englishTranslation:
          "The repudiation of Ta‘ṣīb is among the necessary foundational tenets of the Imāmī school; wealth reverts to the womb relatives mentioned in the Qur'an.",
        urduTranslation:
          "تعصیب کا باطل ہونا فقہ امامیہ کے بنیادی اور قطعی ارکان میں سے ہے؛ ترکہ صرف قرآنی رشتہ داروں میں لوٹایا جاتا ہے۔",
        keyRulingSummaryEn: "Core Imami tenet: agnatic reversion is fundamentally invalid.",
        keyRulingSummaryUr: "امامیہ فقہ کا بنیادی رکن: دور کے مردوں کو ترکہ دینا خلافِ شریعت ہے۔",
      },
    },
  },

  "AL_HABWAH": {
    id: "AL_HABWAH",
    titleEn: "Al-Ḥabwah: Privileged Chattels for the Eldest Living Son",
    titleUr: "حَبْوہ: والد کے خصوصی سامان کا بڑے بیٹے کو مختص ہونا",
    titleAr: "أحكام الحبوة للولد الأكبر",
    legalAxiomEn: "Al-Ḥabwatu Ḥaqqun Shar‘iyyun lil-Waladi al-Akbar",
    legalAxiomUr: "حبوہ بڑے عاقل بیٹے کا حتمی شرعی حق ہے",
    legalAxiomAr: "الحبوة مجانية للولد الأكبر بشروطها",
    primaryAyahId: "4:11",
    primaryHadithId: "hadith_al_habwah",
    rulings: {
      sistani: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 3: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۳، کتاب المواریث",
        volume: 3,
        masalahNumber: "1009",
        arabicText:
          "يُحبى الولد الأكبر مجاناً بثياب بدن الميت، وخاتمه، وسيفه، ومصحفه، بشرط أن لا يكون سفيهاً ولا فاسقاً، وأن لا يكون الأب قد استغرق دينه جميع التركة. والأحوط وجوباً قضاء ما فات أباه من الصلاة والصيام.",
        englishTranslation:
          "The eldest living son is granted gratia (free of counter-value): the clothes of the deceased father's body, his signet ring, his sword, and his Qur'an, on condition that the son is neither feebleminded nor publicly corrupt, and that the father's debts have not consumed the entirety of the estate. By obligatory precaution, the son must perform the unfulfilled prayers and fasts of his father.",
        urduTranslation:
          "بڑے زندہ بیٹے کو والد کے پہنے ہوئے کپڑے، انگوٹھی، تلوار اور ذاتی قرآن مجاناً (بغیر کسی معاوضے کے) ملتے ہیں، بشرطیکہ وہ فاتر العقل یا فاسق نہ ہو، اور والد کے قرضوں نے پورے ترکے کو نہ گھیر رکھا ہو۔ احتیاطِ واجب کی رو سے بیٹے پر والد کی قضا نمازوں اور روزوں کی ادائے گی لازم ہے۔",
        keyRulingSummaryEn: "Qur'an, ring, sword, and clothes belong to eldest son gratia; conditional on non-insolvency.",
        keyRulingSummaryUr: "چار اشیاء بڑے بیٹے کو ملتی ہیں، بشرطیکہ ترکہ قرض میں ڈوبا ہوا نہ ہو۔",
      },
      khoei: {
        bookAr: "منهاج الصالحين",
        bookEn: "Minhāj al-Ṣāliḥīn (Vol. 2: Kitāb al-Mawārīth)",
        bookUr: "منہاج الصالحین، جلد ۲، کتاب المواریث",
        volume: 2,
        masalahNumber: "1715",
        arabicText:
          "الحبوة حق للولد الأكبر الذكر، وتشمل الأربعة المشهورة، ولا تُعطى في موت الأم بل تختص بالأب خاصة.",
        englishTranslation:
          "Al-Ḥabwah is a right of the eldest male son, encompassing the famous four items. It is not granted on the mother's death; it pertains exclusively to the deceased father.",
        urduTranslation:
          "حبوہ بڑے بیٹے کا حق ہے جس میں مشہور چار اشیاء شامل ہیں؛ یہ والدہ کی وفات پر لاگو نہیں ہوتا بلکہ صرف والد کے ترکے سے مخصوص ہے۔",
        keyRulingSummaryEn: "Exclusively applies to father's estate; mother's estate has no Habwah.",
        keyRulingSummaryUr: "حبوہ صرف والد کے ترکے پر لاگو ہوتا ہے، والدہ کے ترکے میں حبوہ نہیں ہوتا۔",
      },
      khamenei: {
        bookAr: "أجوبة الاستفتاءات",
        bookEn: "Ajwibat al-Istiftā'āt",
        bookUr: "اجوبۃ الاستفتاءات",
        volume: 2,
        masalahNumber: "1885",
        arabicText:
          "الحبوة تختص بالولد الأكبر بشرط كونه عاقلاً رشيداً وأن لا يكون عاقاً لوالده.",
        englishTranslation:
          "Al-Ḥabwah is reserved for the eldest son, provided he is sane, mature, and not disobedient/disowned by his father.",
        urduTranslation:
          "حبوہ بڑے بیٹے کا حق ہے بشرطیکہ وہ عاقل و رشید ہو اور والد کا عاق نہ ہو۔",
        keyRulingSummaryEn: "Son must be non-Aqq (not disowned) and sane.",
        keyRulingSummaryUr: "بیٹے کا عاقل اور غیر عاق ہونا لازمی شرط ہے۔",
      },
      makarem: {
        bookAr: "توضيح المسائل",
        bookEn: "Tawḍīḥ al-Masā'il",
        bookUr: "توضیح المسائل",
        volume: 1,
        masalahNumber: "2380",
        arabicText:
          "تُعطى الحبوة للابن الأكبر إذا ترك الميت مالاً غيرها، فإن استغرق الدين التركة بيعت الحبوة في قضاء الدين.",
        englishTranslation:
          "Al-Ḥabwah is given to the eldest son if the deceased left other wealth; if debts consume the estate, the Habwah is sold to satisfy creditors.",
        urduTranslation:
          "حبوہ بڑے بیٹے کو تب ملتا ہے جب متوفی کا دیگر مال موجود ہو؛ اگر قرض زیادہ ہو تو حبوہ بھی قرض کی ادائیگی کے لیے بیچا جائے گا۔",
        keyRulingSummaryEn: "Creditors have priority over Habwah in an insolvent estate.",
        keyRulingSummaryUr: "قرض داروں کا حق حبوہ پر مقدم ہوتا ہے۔",
      },
      najafi: {
        bookAr: "زاد المستفيد",
        bookEn: "Zād al-Mustafīd",
        bookUr: "زاد المستفید",
        volume: 2,
        masalahNumber: "1141",
        arabicText:
          "الحبوة عطية إلهية للولد الأكبر قبال تحمله قضاء ما فات والده من الواجبات البدنية.",
        englishTranslation:
          "Al-Ḥabwah is a divine gift to the eldest son in return for his bearing the duty of making up the father's missed bodily obligations.",
        urduTranslation:
          "حبوہ بڑے بیٹے کے لیے ایک الٰہی انعام ہے کیونکہ اس پر والد کی قضا نمازوں اور روزوں کا بوجھ ہوتا ہے۔",
        keyRulingSummaryEn: "Linked to the son's religious obligation of Qada for the father.",
        keyRulingSummaryUr: "والد کی قضا نمازوں اور روزوں کی شرعی ذمہ داری کے عوض حبوہ عطا ہوتا ہے۔",
      },
    },
  },
};
