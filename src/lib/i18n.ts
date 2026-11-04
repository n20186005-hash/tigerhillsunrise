// Language configuration and localized interface strings.
// The site is an English-first guide with a complete 1:1 mirror in Nepali,
// Bengali and Urdu. Every content page exists in all four languages so the
// hreflang cluster stays complete and no page is left without a translation.

export const LANGS = ['en', 'ne', 'bn', 'ur'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export const HTML_LANG: Record<Lang, string> = { en: 'en', ne: 'ne', bn: 'bn', ur: 'ur' };
export const OG_LOCALE: Record<Lang, string> = {
  en: 'en_IN',
  ne: 'ne_IN',
  bn: 'bn_IN',
  ur: 'ur_IN'
};
export const DIR: Record<Lang, 'ltr' | 'rtl'> = { en: 'ltr', ne: 'ltr', bn: 'ltr', ur: 'rtl' };
export const LANG_NAME: Record<Lang, string> = {
  en: 'English',
  ne: 'नेपाली',
  bn: 'বাংলা',
  ur: 'اردو'
};
export const HREFLANG: Record<Lang, string> = { en: 'en', ne: 'ne', bn: 'bn', ur: 'ur' };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/**
 * Canonical path for a page. English (the default locale) lives at the root
 * with no prefix; the other three languages use a `/{lang}/` prefix.
 */
export function pathFor(lang: Lang, slug: string): string {
  if (slug === 'home') return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
  return lang === DEFAULT_LANG ? `/${slug}/` : `/${lang}/${slug}/`;
}

export interface UiStrings {
  brand: string;
  brandNote: string;
  skip: string;
  home: string;
  menu: string;
  nav: {
    overview: string;
    sunrise: string;
    reach: string;
    fee: string;
    itinerary: string;
    nearby: string;
    faq: string;
    sources: string;
    allGuides: string;
  };
  languageLabel: string;
  relatedTitle: string;
  faqTitle: string;
  sourcesTitle: string;
  sourcesIntro: string;
  sourcesMeta: string;
  checkedLabel: string;
  updatedLabel: string;
  quickFactsTitle: string;
  nonOfficial: string;
  footerTagline: string;
  footerLinks: string;
  privacy: string;
  terms: string;
  credits: string;
  cookieSettings: string;
  disclaimer: string;
  mapTitle: string;
  mapOpen: string;
  mapNote: string;
  galleryTitle: string;
  galleryNote: string;
  cookie: {
    title: string;
    body: string;
    accept: string;
    reject: string;
    close: string;
    status: {
      accepted: string;
      deniedSaved: string;
      deniedRemoved: string;
      deniedSession: string;
      deniedFailed: string;
      acceptFailed: string;
      acceptFailedClean: string;
      acceptFailedSession: string;
      remoteDenied: string;
    };
    offline: string;
  };
}

export const UI: Record<Lang, UiStrings> = {
  en: {
    brand: 'Tiger Hill Sunrise Guide',
    brandNote: 'Independent visitor guide',
    skip: 'Skip to main content',
    home: 'Home',
    menu: 'Menu',
    nav: {
      overview: 'Overview',
      sunrise: 'Sunrise',
      reach: 'How to reach',
      fee: 'Entry & fees',
      itinerary: 'Itineraries',
      nearby: 'Nearby',
      faq: 'FAQ',
      sources: 'Sources',
      allGuides: 'All guides'
    },
    languageLabel: 'Language',
    relatedTitle: 'Related guides',
    faqTitle: 'Frequently asked questions',
    sourcesTitle: 'Sources and limits of this information',
    sourcesIntro:
      'This is an independent, non-official, non-profit travel information guide. It is not the district administration, the forest department or the operator of the viewpoint. Official tourism descriptions and third-party place listings are used separately to describe the destination.',
    sourcesMeta: 'Information checked 26 October 2026. Editorial responsibility: tigerhillsunrise.com guide.',
    checkedLabel: 'Information checked',
    updatedLabel: 'Last updated',
    quickFactsTitle: 'Map and listed details',
    nonOfficial: 'Independent, non-official travel guide',
    footerTagline: 'Independent · non-official · non-profit travel information.',
    footerLinks: 'Sources',
    privacy: 'Privacy',
    terms: 'Terms of use',
    credits: 'Photo credits',
    cookieSettings: 'Cookie settings',
    disclaimer:
      'Confirm current timings, fees, road rules and access for your own travel date. This site does not guarantee that the mountains will be visible or that entry will be granted.',
    mapTitle: 'Map of the Observatory on Senchal Road',
    mapOpen: 'Open in Google Maps',
    mapNote:
      'The address, star rating and listed hours are a third-party Google Maps snapshot read on 26 October 2026. They are not this website\'s own review and do not confirm access permission or opening on a given morning.',
    galleryTitle: 'Real historical views of Tiger Hill',
    galleryNote:
      'Each file links to its original author, date and applicable Creative Commons licence. Display cropping may occur; the original file content is unmodified.',
    cookie: {
      title: 'Analytics consent',
      body: 'If you allow it, Google Analytics may load. Refusing does not block the main content. The Google map uses its own service separately from this choice.',
      accept: 'Allow',
      reject: 'Refuse / withdraw',
      close: 'Close',
      status: {
        accepted: 'Consent saved. Google Analytics may load now. You can withdraw later from the same settings.',
        deniedSaved: 'Refusal saved. Further Analytics on this page is off; data already sent cannot be recalled.',
        deniedRemoved: 'The shared consent was removed. Further Analytics on this page is off; the choice may be asked again next time.',
        deniedSession: 'Refusal could not be saved. Analytics is off on this page and in the current tab session; an earlier consent may still apply in another tab or a new session.',
        deniedFailed: 'Refusal could not be saved. Analytics is off on this page; an earlier consent may still apply next time or in another tab.',
        acceptFailed: 'Consent could not be saved. Analytics is off on this page; this attempt or an earlier consent may apply next time or in another tab.',
        acceptFailedClean: 'Consent could not be saved. Analytics is off on this page and no shared consent remains. The choice may be asked again next time.',
        acceptFailedSession: 'Consent could not be confirmed. Analytics is off on this page and in the current tab; this attempt or an earlier consent may apply in another tab or a new session.',
        remoteDenied: 'Following the choice made in another tab, Analytics is off on this page.'
      },
      offline: 'Offline: this page is not cached. Reconnect and try again.'
    }
  },
  ne: {
    brand: 'टाइगर हिल सूर्योदय मार्गदर्शिका',
    brandNote: 'स्वतन्त्र पर्यटक सूचना',
    skip: 'मुख्य सामग्रीमा जानुहोस्',
    home: 'मुख्य पृष्ठ',
    menu: 'मेनु',
    nav: {
      overview: 'परिचय',
      sunrise: 'सूर्योदय',
      reach: 'पुग्ने बाटो',
      fee: 'टिकट र शुल्क',
      itinerary: 'यात्रा योजना',
      nearby: 'आसपास',
      faq: 'जानकारी',
      sources: 'स्रोत',
      allGuides: 'सबै मार्गदर्शिका'
    },
    languageLabel: 'भाषा',
    relatedTitle: 'सम्बन्धित मार्गदर्शिका',
    faqTitle: 'बारम्बार सोधिने प्रश्न',
    sourcesTitle: 'स्रोत र जानकारीको सीमा',
    sourcesIntro:
      'यो स्वतन्त्र, गैरआधिकारिक, गैरनाफामूलक पर्यटन शैक्षिक मार्गदर्शिका हो। यो जिल्ला प्रशासन, वन प्रशासन वा दृश्यस्थलको सञ्चालन निकाय होइन। गन्तव्यको परिचयका लागि सरकारी पर्यटन विवरण र तेस्रो पक्षीय स्थान सूची छुट्टाछुट्टै प्रयोग गरिएको छ।',
    sourcesMeta: 'सूचना जाँच: २६ अक्टोबर २०२६ · सम्पादकीय जिम्मेवारी: tigerhillsunrise.com मार्गदर्शिका।',
    checkedLabel: 'सूचना जाँच मिति',
    updatedLabel: 'अन्तिम अद्यावधिक',
    quickFactsTitle: 'नक्सा र सूचीकृत विवरण',
    nonOfficial: 'स्वतन्त्र, गैरआधिकारिक पर्यटन मार्गदर्शिका',
    footerTagline: 'स्वतन्त्र · गैरआधिकारिक · गैरनाफामूलक पर्यटन शैक्षिक सूचना।',
    footerLinks: 'स्रोत',
    privacy: 'गोपनीयता',
    terms: 'प्रयोगको सीमा',
    credits: 'फोटो श्रेय',
    cookieSettings: 'कुकी सेटिङ',
    disclaimer:
      'समय, शुल्क, सडक र पहुँच व्यवस्थाको अन्तिम पुष्टि आफ्नो यात्रा मितिका लागि गर्नुहोस्। साइटले हिमाल देखिने वा प्रवेश पाइने ग्यारेन्टी गर्दैन।',
    mapTitle: 'सेन्चल रोडको Observatory नक्सा',
    mapOpen: 'Google Maps मा खोल्नुहोस्',
    mapNote:
      'ठेगाना, तारा मूल्याङ्कन र सूचीकृत समय २६ अक्टोबर २०२६ मा हेरिएको तेस्रो पक्षको Google Maps स्न्यापसट हो। यो यस वेबसाइटको आफ्नै मूल्याङ्कन होइन र कुनै बिहानको प्रवेश वा खुला हुने पुष्टि गर्दैन।',
    galleryTitle: 'टाइगर हिलका वास्तविक पुराना दृश्य',
    galleryNote:
      'प्रत्येक फाइलको मूल लेखक, मिति र लागू Creative Commons इजाजतपत्रसँग लिङ्क छ। प्रदर्शनमा क्रप हुन सक्छ; मूल फाइलको सामग्री परिवर्तन गरिएको छैन।',
    cookie: {
      title: 'Analytics अनुमति',
      body: 'अनुमति दिनुभयो भने Google Analytics लोड हुन सक्छ। अस्वीकारले मुख्य सामग्री रोक्दैन। नक्साको Google सेवा यस छनोटभन्दा अलग छ।',
      accept: 'अनुमति दिनुहोस्',
      reject: 'अस्वीकार / फिर्ता',
      close: 'बन्द गर्नुहोस्',
      status: {
        accepted: 'अनुमति सुरक्षित भयो। Google Analytics अहिले लोड हुन सक्छ। पछि यही सेटिङबाट फिर्ता लिन सक्नुहुन्छ।',
        deniedSaved: 'अस्वीकार सुरक्षित भयो। यस पृष्ठको थप Analytics बन्द छ; पहिले पठाइएको विवरण फिर्ता आउँदैन।',
        deniedRemoved: 'साझा अनुमति हटाइएको पुष्टि भयो। यस पृष्ठको थप Analytics बन्द छ; फेरि खोल्दा छनोट सोधिन सक्छ। पहिले पठाइएको विवरण फिर्ता आउँदैन।',
        deniedSession: 'अस्वीकार सुरक्षित भएन। यस पृष्ठ र चालु ट्याबको सत्रमा Analytics बन्द छ। अर्को ट्याब वा नयाँ सत्रमा पुरानो अनुमति लागू हुन सक्छ।',
        deniedFailed: 'अस्वीकार सुरक्षित भएन। यस पृष्ठमा Analytics बन्द छ। फेरि खोल्दा वा अर्को ट्याबमा पुरानो अनुमति लागू हुन सक्छ।',
        acceptFailed: 'अनुमति सुरक्षित भएको पुष्टि भएन। यस पृष्ठमा Analytics बन्द छ; यो प्रयास वा पहिलेको अनुमति अर्को पटक वा अर्को ट्याबमा लागू हुन सक्छ।',
        acceptFailedClean: 'अनुमति सुरक्षित भएन। यस पृष्ठको Analytics बन्द छ र साझा अनुमति बाँकी नरहेको पुष्टि भयो। फेरि खोल्दा छनोट सोधिन सक्छ।',
        acceptFailedSession: 'अनुमति सुरक्षित भएको पुष्टि भएन। यस पृष्ठ र चालु ट्याबमा Analytics बन्द छ; यो प्रयास वा पहिलेको अनुमति अर्को ट्याब वा नयाँ सत्रमा लागू हुन सक्छ।',
        remoteDenied: 'अर्को ट्याबको छनोटअनुसार यस पृष्ठको Analytics बन्द छ।'
      },
      offline: 'अफलाइन: यो पृष्ठ सुरक्षित छैन। इन्टरनेट जोडिएपछि फेरि प्रयास गर्नुहोस्।'
    }
  },
  bn: {
    brand: 'টাইগার হিল সূর্যোদয় গাইড',
    brandNote: 'স্বতন্ত্র পর্যটক তথ্যগাইড',
    skip: 'মূল বিষয়বস্তুতে যান',
    home: 'হোম',
    menu: 'মেনু',
    nav: {
      overview: 'পরিচিতি',
      sunrise: 'সূর্যোদয়',
      reach: 'কীভাবে পৌঁছাবেন',
      fee: 'টিকিট ও ফি',
      itinerary: 'ভ্রমণসূচি',
      nearby: 'আশেপাশে',
      faq: 'প্রশ্নোত্তর',
      sources: 'সূত্র',
      allGuides: 'সব গাইড'
    },
    languageLabel: 'ভাষা',
    relatedTitle: 'সম্পর্কিত গাইড',
    faqTitle: 'সাধারণ জিজ্ঞাসা',
    sourcesTitle: 'সূত্র ও তথ্যের সীমাবদ্ধতা',
    sourcesIntro:
      'এটি একটি স্বতন্ত্র, অনানুষ্ঠানিক, অলাভজনক পর্যটন তথ্যগাইড। এটি জেলা প্রশাসন, বন বিভাগ বা দর্শনস্থলের পরিচালনাকারী সংস্থা নয়। গন্তব্যের পরিচিতির জন্য সরকারি পর্যটন বিবরণ ও তৃতীয় পক্ষের স্থান-তালিকা আলাদাভাবে ব্যবহার করা হয়েছে।',
    sourcesMeta: 'তথ্য যাচাই: ২৬ অক্টোবর ২০২৬ · সম্পাদকীয় দায়িত্ব: tigerhillsunrise.com গাইড।',
    checkedLabel: 'তথ্য যাচাই',
    updatedLabel: 'সর্বশেষ হালনাগাদ',
    quickFactsTitle: 'মানচিত্র ও তালিকাভুক্ত তথ্য',
    nonOfficial: 'স্বতন্ত্র, অনানুষ্ঠানিক পর্যটন গাইড',
    footerTagline: 'স্বতন্ত্র · অনানুষ্ঠানিক · অলাভজনক পর্যটন তথ্য।',
    footerLinks: 'সূত্র',
    privacy: 'গোপনীয়তা',
    terms: 'ব্যবহারের শর্ত',
    credits: 'ছবির কৃতিত্ব',
    cookieSettings: 'কুকি সেটিং',
    disclaimer:
      'সময়, ফি, সড়ক ও প্রবেশের নিয়ম আপনার ভ্রমণের তারিখ অনুযায়ী যাচাই করুন। এই সাইট পাহাড় দৃশ্যমান হওয়া বা প্রবেশ পাওয়ার নিশ্চয়তা দেয় না।',
    mapTitle: 'সেনচাল রোডের অবজারভেটরি মানচিত্র',
    mapOpen: 'Google Maps-এ খুলুন',
    mapNote:
      'ঠিকানা, স্টার রেটিং ও তালিকাভুক্ত সময় হলো ২৬ অক্টোবর ২০২৬-এ দেখা তৃতীয় পক্ষের Google Maps স্ন্যাপশট। এটি এই ওয়েবসাইটের নিজস্ব রেটিং নয় এবং প্রবেশ বা নির্দিষ্ট সকালে খোলার নিশ্চয়তা দেয় না।',
    galleryTitle: 'টাইগার হিলের প্রকৃত ঐতিহাসিক দৃশ্য',
    galleryNote:
      'প্রতিটি ফাইল তার মূল লেখক, তারিখ ও প্রযোজ্য Creative Commons লাইসেন্সে সংযুক্ত। প্রদর্শনে ক্রপ হতে পারে; মূল ফাইলের বিষয়বস্তু অপরিবর্তিত।',
    cookie: {
      title: 'Analytics সম্মতি',
      body: 'অনুমতি দিলে Google Analytics লোড হতে পারে। প্রত্যাখ্যান মূল বিষয়বস্তু আটকায় না। মানচিত্রের Google পরিষেবা এই পছন্দ থেকে আলাদা।',
      accept: 'অনুমতি দিন',
      reject: 'প্রত্যাখ্যান / প্রত্যাহার',
      close: 'বন্ধ করুন',
      status: {
        accepted: 'সম্মতি সংরক্ষিত। Google Analytics এখন লোড হতে পারে। পরে একই সেটিং থেকে প্রত্যাহার করা যাবে।',
        deniedSaved: 'প্রত্যাখ্যান সংরক্ষিত। এই পাতায় আরও Analytics বন্ধ; আগে পাঠানো তথ্য ফেরানো যায় না।',
        deniedRemoved: 'শেয়ার করা সম্মতি সরানো হয়েছে। এই পাতায় আরও Analytics বন্ধ; পরের বার আবার জিজ্ঞাসা করা হতে পারে।',
        deniedSession: 'প্রত্যাখ্যান সংরক্ষণ করা যায়নি। এই পাতা ও চলতি ট্যাব সেশনে Analytics বন্ধ; অন্য ট্যাব বা নতুন সেশনে আগের সম্মতি কার্যকর হতে পারে।',
        deniedFailed: 'প্রত্যাখ্যান সংরক্ষণ করা যায়নি। এই পাতায় Analytics বন্ধ; পরের বার বা অন্য ট্যাবে আগের সম্মতি কার্যকর হতে পারে।',
        acceptFailed: 'সম্মতি সংরক্ষিত হয়নি। এই পাতায় Analytics বন্ধ; এই চেষ্টা বা আগের সম্মতি পরের বার বা অন্য ট্যাবে কার্যকর হতে পারে।',
        acceptFailedClean: 'সম্মতি সংরক্ষিত হয়নি। এই পাতায় Analytics বন্ধ এবং কোনো শেয়ার করা সম্মতি নেই। পরের বার আবার জিজ্ঞাসা করা হতে পারে।',
        acceptFailedSession: 'সম্মতি নিশ্চিত হয়নি। এই পাতা ও চলতি ট্যাবে Analytics বন্ধ; এই চেষ্টা বা আগের সম্মতি অন্য ট্যাব বা নতুন সেশনে কার্যকর হতে পারে।',
        remoteDenied: 'অন্য ট্যাবের পছন্দ অনুযায়ী এই পাতায় Analytics বন্ধ।'
      },
      offline: 'অফলাইন: এই পাতা সংরক্ষিত নেই। ইন্টারনেট যুক্ত করে আবার চেষ্টা করুন।'
    }
  },
  ur: {
    brand: 'ٹائیگر ہل طلوعِ آفتاب گائیڈ',
    brandNote: 'آزاد زائرین گائیڈ',
    skip: 'مرکزی مواد پر جائیں',
    home: 'ہوم',
    menu: 'مینو',
    nav: {
      overview: 'تعارف',
      sunrise: 'طلوعِ آفتاب',
      reach: 'کیسے پہنچیں',
      fee: 'ٹکٹ اور فیس',
      itinerary: 'سفری منصوبے',
      nearby: 'آس پاس',
      faq: 'سوالات',
      sources: 'ذرائع',
      allGuides: 'تمام گائیڈز'
    },
    languageLabel: 'زبان',
    relatedTitle: 'متعلقہ گائیڈز',
    faqTitle: 'اکثر پوچھے جانے والے سوالات',
    sourcesTitle: 'ذرائع اور معلومات کی حد',
    sourcesIntro:
      'یہ ایک آزاد، غیر سرکاری، غیر منافع بخش سفری معلوماتی گائیڈ ہے۔ یہ ضلعی انتظامیہ، محکمہ جنگلات یا مقامِ نظارہ چلانے والا ادارہ نہیں۔ منزل کے تعارف کے لیے سرکاری سیاحتی تفصیل اور فریقِ ثالث کی مقام فہرست الگ الگ استعمال کی گئی ہے۔',
    sourcesMeta: 'معلومات کی جانچ: 26 اکتوبر 2026 · ادارتی ذمہ داری: tigerhillsunrise.com گائیڈ۔',
    checkedLabel: 'معلومات کی جانچ',
    updatedLabel: 'آخری تازہ کاری',
    quickFactsTitle: 'نقشہ اور درج تفصیلات',
    nonOfficial: 'آزاد، غیر سرکاری سفری گائیڈ',
    footerTagline: 'آزاد · غیر سرکاری · غیر منافع بخش سفری معلومات۔',
    footerLinks: 'ذرائع',
    privacy: 'رازداری',
    terms: 'شرائطِ استعمال',
    credits: 'تصاویر کی حوالہ جات',
    cookieSettings: 'کوکی ترتیبات',
    disclaimer:
      'اوقات، فیس، سڑک اور رسائی کے قواعد اپنی سفری تاریخ کے لیے تصدیق کریں۔ یہ سائٹ پہاڑوں کے نظر آنے یا داخلے کی ضمانت نہیں دیتی۔',
    mapTitle: 'سینچل روڈ پر آبزرویٹری کا نقشہ',
    mapOpen: 'Google Maps میں کھولیں',
    mapNote:
      'پتہ، ستاروں کی درجہ بندی اور درج اوقات 26 اکتوبر 2026 کو دیکھا گیا فریقِ ثالث Google Maps اسنیپ شاٹ ہیں۔ یہ اس ویب سائٹ کی اپنی درجہ بندی نہیں اور داخلے یا کسی مخصوص صبح کھلنے کی تصدیق نہیں کرتے۔',
    galleryTitle: 'ٹائیگر ہل کے حقیقی تاریخی مناظر',
    galleryNote:
      'ہر فائل اپنے اصل مصنف، تاریخ اور قابلِ اطلاق Creative Commons لائسنس سے منسلک ہے۔ نمائش میں کٹوتی ہو سکتی ہے؛ اصل فائل کا مواد تبدیل نہیں کیا گیا۔',
    cookie: {
      title: 'Analytics کی اجازت',
      body: 'اجازت دینے پر Google Analytics لوڈ ہو سکتا ہے۔ انکار مرکزی مواد کو نہیں روکتا۔ نقشے کی Google سروس اس انتخاب سے الگ ہے۔',
      accept: 'اجازت دیں',
      reject: 'انکار / واپسی',
      close: 'بند کریں',
      status: {
        accepted: 'اجازت محفوظ ہوگئی۔ Google Analytics اب لوڈ ہو سکتا ہے۔ بعد میں اسی ترتیب سے واپس لے سکتے ہیں۔',
        deniedSaved: 'انکار محفوظ ہوگیا۔ اس صفحے پر مزید Analytics بند ہے؛ پہلے بھیجا گیا ڈیٹا واپس نہیں آ سکتا۔',
        deniedRemoved: 'مشترکہ اجازت ہٹا دی گئی۔ اس صفحے پر مزید Analytics بند ہے؛ اگلی بار دوبارہ پوچھا جا سکتا ہے۔',
        deniedSession: 'انکار محفوظ نہیں ہو سکا۔ اس صفحے اور موجودہ ٹیب کے سیشن میں Analytics بند ہے؛ کسی دوسرے ٹیب یا نئے سیشن میں پرانی اجازت لاگو ہو سکتی ہے۔',
        deniedFailed: 'انکار محفوظ نہیں ہو سکا۔ اس صفحے پر Analytics بند ہے؛ اگلی بار یا کسی دوسرے ٹیب میں پرانی اجازت لاگو ہو سکتی ہے۔',
        acceptFailed: 'اجازت محفوظ نہیں ہو سکی۔ اس صفحے پر Analytics بند ہے؛ یہ کوشش یا پرانی اجازت اگلی بار یا کسی دوسرے ٹیب میں لاگو ہو سکتی ہے۔',
        acceptFailedClean: 'اجازت محفوظ نہیں ہو سکی۔ اس صفحے پر Analytics بند ہے اور کوئی مشترکہ اجازت باقی نہیں۔ اگلی بار دوبارہ پوچھا جا سکتا ہے۔',
        acceptFailedSession: 'اجازت کی تصدیق نہیں ہو سکی۔ اس صفحے اور موجودہ ٹیب میں Analytics بند ہے؛ یہ کوشش یا پرانی اجازت کسی دوسرے ٹیب یا نئے سیشن میں لاگو ہو سکتی ہے۔',
        remoteDenied: 'کسی دوسرے ٹیب کے انتخاب کے مطابق اس صفحے پر Analytics بند ہے۔'
      },
      offline: 'آف لائن: یہ صفحہ محفوظ نہیں۔ انٹرنیٹ جڑنے پر دوبارہ کوشش کریں۔'
    }
  }
};

export function ui(lang: Lang): UiStrings {
  return UI[lang];
}
