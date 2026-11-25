export interface StoryBeat {
  label: string;
  text: string;
}

export interface FamilyField {
  label: string;
  value: string;
}

export interface CeremonyEvent {
  id: string;
  image: string;
  name: string;
  day: string;
  time: string;
}

export interface ScheduleEventCopy {
  title: string;
  date: string;
  time: string;
  venueLabel: string;
  venue: string;
  mapQuery: string;
}

export const toBengaliDigits = (input: number | string): string =>
  String(input).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export function artSrc(name: string, wideName?: string, isDesktop?: boolean): string {
  const desktop = isDesktop ?? (typeof window !== 'undefined' && window.innerWidth >= 1024);
  if (desktop && wideName) return `/img/${wideName}.webp`;
  return `/img/${name}.webp`;
}

export const INVITATION_DATA = {
  couple: {
    bride: 'তিতলি',
    groom: 'সৌম্যদীপ',
    groomShort: 'সৌম্য',
  },
  opening: {
    blessing: '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥',
    titleTop: 'শুভ',
    titleBottom: 'বিবাহ',
    names: 'তিতলি ও সৌম্যদীপ',
    dateBn: '২৬শে অগ্রহায়ণ ১৪৩৩',
    hint: 'নিচে নামুন',
    tapHint: 'ছুঁয়ে দেখুন',
    guestLine: '{name}, আপনার নিমন্ত্রণ রইল',
  },
  bride: {
    title: 'আমাদের তিতলির বিয়ে',
    line: 'লজ্জা পাচ্ছে, তবু হাসিটা লুকোতে পারছে না।',
    knockerPrompt: 'কড়া নাড়ুন',
    knockerAria: 'দরজায় কড়া নাড়ুন',
  },
  groom: {
    title: 'আমাদের সৌম্যর বিয়ে',
    line: 'টোপরটা এখনও সোজা করে পরতে শেখেনি।',
    curtainPrompt: 'পর্দা সরান',
    toporAria: 'টোপর সোজা করুন',
  },
  story: {
    title: 'গাঁটছড়া',
    line: 'দুজনের গল্প, তিন লাইনে',
    beats: [
      {
        label: 'প্রথম দেখা',
        text: 'কলেজ স্ট্রিটের এক বইয়ের দোকানে, একই বই দুজনে একসঙ্গে টেনে ধরেছিল।',
      },
      {
        label: 'তারপর',
        text: 'অনেক কাপ চা, অনেক তর্ক, অনেক বৃষ্টির বিকেল।',
      },
      {
        label: 'এবার',
        text: 'সাত পাক, আর বাকি রাস্তাটা একসঙ্গে।',
      },
    ] as StoryBeat[],
  },
  families: {
    title: 'দুই বাড়ি',
    line: 'যাঁদের আশীর্বাদে এই দিন',
    brideCaption: 'কনেপক্ষ',
    groomCaption: 'বরপক্ষ',
    bride: [
      { label: 'কনে', value: 'কল্যাণীয়া তিতলি' },
      { label: 'পিতা', value: 'শ্রী অমলেন্দু বন্দ্যোপাধ্যায়' },
      { label: 'মাতা', value: 'শ্রীমতী শর্মিষ্ঠা বন্দ্যোপাধ্যায়' },
      { label: 'নিবাস', value: 'বেহালা, কলকাতা' },
    ] as FamilyField[],
    groom: [
      { label: 'বর', value: 'কল্যাণীয় সৌম্যদীপ' },
      { label: 'পিতা', value: 'শ্রী দেবাশিস মুখোপাধ্যায়' },
      { label: 'মাতা', value: 'শ্রীমতী মৌসুমী মুখোপাধ্যায়' },
      { label: 'নিবাস', value: 'চন্দননগর, হুগলি' },
    ] as FamilyField[],
  },
  events: {
    title: 'অনুষ্ঠান',
    hint: 'পট খুলছে, নিচে নামুন',
    items: [
      {
        id: 'aiburobhat',
        image: 'event-aiburobhat-soft',
        name: 'আইবুড়ো ভাত',
        day: 'শুক্রবার, ২৪শে অগ্রহায়ণ',
        time: 'দুপুর ১টা',
      },
      {
        id: 'mehendi',
        image: 'event-mehendi-soft',
        name: 'মেহেন্দি',
        day: 'শনিবার, ২৫শে অগ্রহায়ণ',
        time: 'সন্ধে ৬টা',
      },
      {
        id: 'gayeholud',
        image: 'event-gayeholud-soft',
        name: 'গায়ে হলুদ',
        day: 'রবিবার, ২৬শে অগ্রহায়ণ',
        time: 'সকাল ৯টা',
      },
      {
        id: 'biye',
        image: 'event-biye-soft',
        name: 'বিয়ে',
        day: 'রবিবার, ২৬শে অগ্রহায়ণ',
        time: 'লগ্ন রাত ৮টা ১২ মিনিট',
      },
      {
        id: 'bouvat',
        image: 'event-bouvat-soft',
        name: 'বউভাত',
        day: 'মঙ্গলবার, ২৮শে অগ্রহায়ণ',
        time: 'রাত ৮টা থেকে',
      },
    ] as CeremonyEvent[],
  },
  letter: {
    blessing: '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥',
    heading: 'সবিনয় নিবেদন',
    salutation: 'মহাশয় / মহাশয়া,',
    paragraphs: [
      'প্রজাপতির আশীর্বাদে আগামী ২৬শে অগ্রহায়ণ ১৪৩৩, রবিবার (ইং ১৩ ডিসেম্বর ২০২৬) আমাদের একমাত্র কন্যা কল্যাণীয়া তিতলির সঙ্গে চন্দননগর নিবাসী শ্রী দেবাশিস মুখোপাধ্যায় ও শ্রীমতী মৌসুমী মুখোপাধ্যায়ের পুত্র কল্যাণীয় সৌম্যদীপের শুভ বিবাহ স্থির হয়েছে।',
      'এই শুভদিনে আপনি সপরিবারে এসে নবদম্পতিকে আশীর্বাদ করলে আমরা খুশি হব।',
      'পত্র দ্বারা নিমন্ত্রণের ত্রুটি মার্জনীয়।',
    ],
    closing: 'বিনীত',
    signers: ['শ্রী অমলেন্দু বন্দ্যোপাধ্যায়', 'শ্রীমতী শর্মিষ্ঠা বন্দ্যোপাধ্যায়'],
    tapPrompt: 'পত্র খুলুন',
  },
  schedule: {
    countdownTarget: '2026-12-13T20:12:00+05:30',
    bn: {
      title: 'দিনক্ষণ',
      events: [
        {
          title: 'শুভ বিবাহ',
          date: 'রবিবার, ২৬শে অগ্রহায়ণ ১৪৩৩',
          time: 'লগ্ন রাত ৮টা ১২ মিনিট',
          venueLabel: 'স্থান',
          venue: 'রজনীগন্ধা ভবন, বেহালা, কলকাতা',
          mapQuery: 'https://maps.google.com/?q=Behala+Kolkata',
        },
        {
          title: 'প্রীতিভোজ (বউভাত)',
          date: 'মঙ্গলবার, ২৮শে অগ্রহায়ণ ১৪৩৩',
          time: 'রাত ৮টা থেকে',
          venueLabel: 'স্থান',
          venue: 'মুখোপাধ্যায় বাড়ি, চন্দননগর, হুগলি',
          mapQuery: 'https://maps.google.com/?q=Chandannagar+Hooghly',
        },
      ] as ScheduleEventCopy[],
      countdownLabels: {
        days: 'দিন',
        hours: 'ঘণ্টা',
        minutes: 'মিনিট',
        seconds: 'সেকেন্ড',
      },
      countdownToday: 'আজ বিয়ে!',
      countdownDone: 'শুভ বিবাহ সম্পন্ন',
      calendarButton: 'ক্যালেন্ডারে রাখুন',
    },
    en: {
      title: 'Programme',
      events: [
        {
          title: 'Wedding',
          date: 'Sunday, 13 December 2026',
          time: 'Muhurat 8:12 pm',
          venueLabel: 'Venue',
          venue: 'Rajanigandha Bhawan, Behala, Kolkata',
          mapQuery: 'https://maps.google.com/?q=Behala+Kolkata',
        },
        {
          title: 'Reception',
          date: 'Tuesday, 15 December 2026',
          time: '8 pm onwards',
          venueLabel: 'Venue',
          venue: 'Mukherjee Bari, Chandannagar, Hooghly',
          mapQuery: 'https://maps.google.com/?q=Chandannagar+Hooghly',
        },
      ] as ScheduleEventCopy[],
      countdownLabels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
      countdownToday: 'Today is the Wedding!',
      countdownDone: 'Wedding celebrations completed',
      calendarButton: 'Add to calendar',
    },
    ics: [
      {
        uid: 'wedding-20261213@gaatchhora',
        summary: 'শুভ বিবাহ — তিতলি ও সৌম্যদীপ',
        description: 'তিতলি ও সৌম্যদীপের শুভ বিবাহ',
        location: 'রজনীগন্ধা ভবন, বেহালা, কলকাতা',
        start: '2026-12-13T14:42:00Z',
        end: '2026-12-13T18:30:00Z',
      },
      {
        uid: 'reception-20261215@gaatchhora',
        summary: 'প্রীতিভোজ (বউভাত) — তিতলি ও সৌম্যদীপ',
        description: 'তিতলি ও সৌম্যদীপের প্রীতিভোজ',
        location: 'মুখোপাধ্যায় বাড়ি, চন্দননগর, হুগলি',
        start: '2026-12-15T14:30:00Z',
        end: '2026-12-15T18:00:00Z',
      },
    ],
  },
  footer: {
    line: 'আসবেন কিন্তু।',
    names: 'তিতলি ও সৌম্যদীপ',
    shower: 'ফুল ছড়ান',
    share: 'নিমন্ত্রণ পাঠান',
    shareText: 'তিতলি আর সৌম্যদীপের বিয়ের নিমন্ত্রণ',
    copied: 'লিংক কপি হয়েছে',
  },
};

export const triggerPetalShower = (x: number, y: number, count = 24, spread = 1) => {
  window.dispatchEvent(new CustomEvent('gaatchhora:shower', { detail: { x, y, count, spread } }));
};

export const triggerFullShower = (count = 54) => {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  for (let i = 0; i < 6; i++) {
    triggerPetalShower((w * (i + 0.5)) / 6, -15, Math.round(count / 6), 0.45);
  }
};

export const triggerButterflyVisit = (x: number, y: number) => {
  window.dispatchEvent(new CustomEvent('gaatchhora:visit', { detail: { x, y } }));
};
