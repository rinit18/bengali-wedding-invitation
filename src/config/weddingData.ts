import { WeddingData } from '../types/wedding';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  monogram: 'সো ও অ',
  hashtag: '#সোহিনীওঅনিরুদ্ধ',
  bengaliBlessing: 'শ্রীশ্রী প্রজাপতয়ে নমঃ • সাদর নিমন্ত্রণ',
  weddingDateISO: '2027-01-24T19:30:00+05:30',
  weddingDateDisplay: 'রবিবার, ২৪ জানুয়ারি ২০২৭ (১০ মাঘ ১৪৩৩)',
  muhuratDisplay: 'সন্ধ্যা ৭:৩০ মিনিট • শুভ গোধূলি লগ্ন',
  city: 'কলকাতা, পশ্চিমবঙ্গ',
  invitationLine:
    'দুই পরিবারের স্নেহ, আনন্দ ও গুরুজনদের আশীর্বাদে আমাদের প্রিয় সোহিনী ও অনিরুদ্ধের শুভ পরিণয় অনুষ্ঠানে আপনার সপরিবার উপস্থিতি একান্তভাবে কামনা করি।',
  heroImage: '/images/couple-hero.jpg',
  mandapImage: '/images/mandap-venue.jpg',
  holudImage: '/images/gaye-holud.jpg',
  feastImage: '/images/bengali-feast.jpg',

  bride: {
    fullName: 'সোহিনী চট্টোপাধ্যায়',
    firstName: 'সোহিনী',
    daknaam: 'মিষ্টি',
    bengaliName: 'কল্যাণীয়া সোহিনী (মিষ্টি)',
    tagline: 'দক্ষিণ কলকাতা • স্থপতি ও রবীন্দ্রসঙ্গীত শিল্পী',
    parents: 'শ্রীমতী দেবযানী চট্টোপাধ্যায় ও শ্রী শুভঙ্কর চট্টোপাধ্যায়ের কন্যা',
    hometown: 'বালিগঞ্জ, দক্ষিণ কলকাতা',
    photo: '/images/bride-portrait.jpg',
  },

  groom: {
    fullName: 'অনিরুদ্ধ সেন',
    firstName: 'অনিরুদ্ধ',
    daknaam: 'রিজু',
    bengaliName: 'কল্যাণীয় অনিরুদ্ধ (রিজু)',
    tagline: 'উত্তর কলকাতা • আর্ট ডিরেক্টর ও কফি-আড্ডাপ্রেমী',
    parents: 'শ্রীমতী অনন্যা সেন ও শ্রী পার্থপ্রতিম সেনের পুত্র',
    hometown: 'শ্যামবাজার, উত্তর কলকাতা',
    photo: '/images/groom-portrait.jpg',
  },

  story: [
    {
      id: 'st-1',
      date: 'আগস্ট ২০২২',
      title: 'কফি হাউসের প্রথম বৃষ্টি',
      bengaliTitle: 'প্রথম দেখা',
      location: 'কলেজ স্ট্রিট, কলকাতা',
      line: 'শ্রাবণের অঝোর ধারায় এক টেবিলে বসে দুই অচেনা মানুষের দীর্ঘ আড্ডা আর চার কাপ কফি।',
    },
    {
      id: 'st-2',
      date: 'অক্টোবর ২০২৩',
      title: 'মহাষ্টমীর অঞ্জলি ও শিউলি',
      bengaliTitle: 'শারদীয়া প্রেম',
      location: 'বাগবাজার সর্বজনীন',
      line: 'ঢাকের আওয়াজ আর ধুনুচির গন্ধের মাঝে রবীন্দ্রনাথের কবিতার বুকমার্কে বাঁধা পড়ল মন।',
    },
    {
      id: 'st-3',
      date: 'ডিসেম্বর ২০২৫',
      title: 'গঙ্গাতীরে সূর্যাস্তের অঙ্গীকার',
      bengaliTitle: 'আংটি বদল',
      location: 'প্রিন্সেপ ঘাট',
      line: 'নদীর জলে সোনালি আলো আর পিতলের কৌটোয় ঠাকুমার আশীর্বাদের আংটি।',
    },
    {
      id: 'st-4',
      date: 'জানুয়ারি ২০২৭',
      title: 'সাত পাকে বাঁধা — শুভ পরিণয়',
      bengaliTitle: 'শুভ বিবাহ',
      location: 'শোভাবাজার রাজবাড়ি, কলকাতা',
      line: 'উত্তর ও দক্ষিণ কলকাতার মেলবন্ধনে গায়ে হলুদ, বেনারসি আর সাদর মিষ্টিমুখ।',
    },
  ],

  venues: {
    bibahoName: 'শোভাবাজার রাজবাড়ি প্রাঙ্গণ',
    bibahoAddress: '৩৬ রাজা নবকৃষ্ণ স্ট্রিট, শোভাবাজার, কলকাতা ৭০০০০৫',
    bibahoMap: 'https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata',
    bouBhatName: 'দ্য ওবেরয় গ্র্যান্ড বলরুম',
    bouBhatAddress: '১৫ জওহরলাল নেহরু রোড, এসপ্ল্যানেড, কলকাতা ৭০০০১৩',
    bouBhatMap: 'https://maps.google.com/?q=The+Oberoi+Grand+Kolkata',
  },

  gallery: [],
  blessings: [],
};
