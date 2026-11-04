// Single source of truth for the place entity, official references, photo
// credits and site-wide navigation. Everything rendered across the four
// language mirrors reads from here so facts never drift between pages.

import { DEFAULT_LANG, type Lang, pathFor } from './i18n';

export const SITE = 'https://tigerhillsunrise.com';

export const ENTITY = {
  name: 'Tiger Hill Observatory',
  displayName: 'Tiger Hill Observatory – Sunrise Viewpoint',
  commonName: 'Tiger Hill, Darjeeling',
  localName: 'टायगर हिल सनराईझ ऑब्सरवेटरी',
  category: 'Scenic Viewpoint / Sunrise Observatory',
  lat: 26.9948256,
  lng: 88.2852338,
  plusCode: 'X7VP+W3',
  street: 'Senchal Rd, Senchal Forest',
  locality: 'Darjeeling',
  region: 'West Bengal',
  postalCode: '734102',
  country: 'IN',
  map: 'https://maps.app.goo.gl/xpAf5Rx8gtBy7gkN9',
  rating: { value: 4.5, count: 18431, date: '2026-10-26', source: 'Google Maps' },
  listedHours: '03:00–17:00'
} as const;

// The Google Maps place ID used by the original homepage embed.
export const EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6323.2950556703145!2d88.2852338!3d26.9948256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e42fcb31e0451b%3A0x4b9ef68840f1a28d!2sTiger%20Hill%20Observatory%2F%20Sunrise%20Viewpoint!5e1!3m2!1sne!2sin';

export const CHECKED = '2026-10-26';
export const UPDATED = '2026-11-04';

export const OFFICIAL = {
  district: 'https://darjeeling.gov.in/tourist-place/tiger-hill/',
  batasia: 'https://darjeeling.gov.in/tourist-place/batasia-loop-gorkha-war-memorial/',
  ministry: 'https://www.incredibleindia.gov.in/en/west-bengal/darjeeling/tiger-hill',
  wbTourism: 'https://www.wbtourism.gov.in/',
  dhr: 'https://darjeelingkalimpongtourism.com/darjeeling-himalayan-railway/'
} as const;

export interface Photo {
  src: string;
  width: number;
  height: number;
  author: string;
  date: string;
  license: string;
  licenseURL: string;
  source: string;
  alt: Record<Lang, string>;
}

export const PHOTOS = {
  dawn: {
    src: '/images/tiger-hill-kanchenjunga-dawn.jpg',
    width: 2552,
    height: 1775,
    author: 'Jejsiguoa',
    date: '2021-06-03',
    license: 'CC BY-SA 4.0',
    licenseURL: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Kanchenjunga_from_Tiger_Hill_at_dawn.jpg',
    alt: {
      en: 'Kanchenjunga range at dawn seen from Tiger Hill, Darjeeling',
      ne: 'टाइगर हिलबाट बिहानको उज्यालोमा कञ्चनजङ्घा शृङ्खला',
      bn: 'টাইগার হিল থেকে ভোরের আলোয় কাঞ্চনজঙ্ঘা পর্বতমালা',
      ur: 'ٹائیگر ہل سے صبح کے اجالے میں کنچن جنگا سلسلہ'
    }
  },
  sunrise: {
    src: '/images/tiger-hill-sunrise.jpg',
    width: 3696,
    height: 2448,
    author: 'Mouli Ghosh',
    date: '2016-11-10',
    license: 'CC BY-SA 4.0',
    licenseURL: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Sunrise_at_Tigerhill,_Darjeeling.jpg',
    alt: {
      en: 'Sun rising from a cloudy horizon, described by the author as opposite Kanchenjunga from Tiger Hill',
      ne: 'बादलको क्षितिजबाट उदाउँदै गरेको सूर्य, टाइगर हिलबाट कञ्चनजङ्घाको विपरीत दिशाको दृश्य',
      bn: 'মেঘলা দিগন্ত থেকে ওঠা সূর্য, লেখকের বর্ণনায় টাইগার হিল থেকে কাঞ্চনজঙ্ঘার বিপরীত দিক',
      ur: 'بادلوں کے افق سے طلوع ہوتا سورج، مصنف کے بیان کے مطابق ٹائیگر ہل سے کنچن جنگا کے مخالف رخ'
    }
  },
  viewpoint: {
    src: '/images/tiger-hill-viewpoint.jpg',
    width: 1536,
    height: 2048,
    author: 'Aditya thaokar',
    date: '2011-05-31',
    license: 'CC BY-SA 3.0',
    licenseURL: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Tiger_Hill_sunrise_point,_Darjeeling.jpg',
    alt: {
      en: 'Historical photo of clouds and a bright horizon at the Tiger Hill sunrise point',
      ne: 'टाइगर हिलबाट देखिने बादल र उज्यालो क्षितिजको ऐतिहासिक फोटो',
      bn: 'টাইগার হিল সূর্যোদয় পয়েন্টে মেঘ ও উজ্জ্বল দিগন্তের ঐতিহাসিক ছবি',
      ur: 'ٹائیگر ہل سن رائز پوائنٹ پر بادلوں اور روشن افق کی تاریخی تصویر'
    }
  },
  range: {
    src: '/images/tiger-hill-kanchenjunga-range.jpg',
    width: 2519,
    height: 1699,
    author: 'Jejsiguoa',
    date: '2021-06-03',
    license: 'CC BY-SA 4.0',
    licenseURL: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Kanchenjunga_range_from_Tiger_Hill,_Darjeeling.jpg',
    alt: {
      en: 'Wide view of the Kanchenjunga range and foreground hills from Tiger Hill',
      ne: 'टाइगर हिलबाट कञ्चनजङ्घा हिमशृङ्खला र अगाडिका पहाडहरूको फराकिलो दृश्य',
      bn: 'টাইগার হিল থেকে কাঞ্চনজঙ্ঘা পর্বতমালা ও সামনের পাহাড়ের প্রশস্ত দৃশ্য',
      ur: 'ٹائیگر ہل سے کنچن جنگا سلسلہ اور سامنے کی پہاڑیوں کا وسیع منظر'
    }
  }
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation. Text links point at real guide pages; the trailing
 * entries use homepage anchors so a visitor can always reach the full index.
 */
export function navItems(lang: Lang): NavItem[] {
  const isDefault = lang === DEFAULT_LANG;
  const home = isDefault ? '/' : `/${lang}/`;
  return [
    { label: labelFor(lang, 'overview'), href: home },
    { label: labelFor(lang, 'sunrise'), href: pathFor(lang, 'sunrise-time') },
    { label: labelFor(lang, 'reach'), href: pathFor(lang, 'how-to-reach') },
    { label: labelFor(lang, 'fee'), href: pathFor(lang, 'entry-fee') },
    { label: labelFor(lang, 'itinerary'), href: pathFor(lang, 'half-day-itinerary') },
    { label: labelFor(lang, 'nearby'), href: pathFor(lang, 'tiger-hill-to-batasia-loop') },
    { label: labelFor(lang, 'faq'), href: pathFor(lang, 'faq') },
    { label: labelFor(lang, 'allGuides'), href: `${home}#guides` }
  ];
}

// Small indirection so the navigation labels can be reused without importing
// the whole UI dictionary in every module.
import { UI } from './i18n';
function labelFor(lang: Lang, key: 'overview' | 'sunrise' | 'reach' | 'fee' | 'itinerary' | 'nearby' | 'faq' | 'allGuides'): string {
  return UI[lang].nav[key];
}

/** The five content hubs the forty guides are divided into. */
export type GroupKey = 'sunrise' | 'practical' | 'nearby' | 'itinerary' | 'faq';

export const GROUP_LABELS: Record<GroupKey, Record<Lang, string>> = {
  sunrise: {
    en: 'Sunrise and viewing',
    ne: 'सूर्योदय र दृश्य',
    bn: 'সূর্যোদয় ও দৃশ্য',
    ur: 'طلوعِ آفتاب اور منظر'
  },
  practical: {
    en: 'Getting there and tickets',
    ne: 'पुग्ने बाटो र टिकट',
    bn: 'পৌঁছানো ও টিকিট',
    ur: 'پہنچنا اور ٹکٹ'
  },
  nearby: {
    en: 'Nearby places and culture',
    ne: 'आसपासका स्थल र संस्कृति',
    bn: 'আশেপাশের স্থান ও সংস্কৃতি',
    ur: 'آس پاس کے مقامات اور ثقافت'
  },
  itinerary: {
    en: 'Itineraries, food and stay',
    ne: 'यात्रा योजना, खानपान र बसाइ',
    bn: 'ভ্রমণসূচি, খাবার ও থাকার জায়গা',
    ur: 'سفری منصوبے، کھانا اور قیام'
  },
  faq: {
    en: 'Practical questions',
    ne: 'व्यावहारिक प्रश्न',
    bn: 'ব্যবহারিক প্রশ্ন',
    ur: 'عملی سوالات'
  }
};
