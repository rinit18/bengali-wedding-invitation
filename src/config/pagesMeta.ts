import { PageId } from '../types/wedding';

export interface ChapterAnchor {
  id: PageId;
  number: string;
  bengaliTitle: string;
}

export const SCROLL_CHAPTERS: ChapterAnchor[] = [
  { id: 'home', number: '০১', bengaliTitle: 'শুভ বিবাহ' },
  { id: 'couple', number: '০২', bengaliTitle: 'পাত্র ও পাত্রী' },
  { id: 'aiburobhat', number: '০৩', bengaliTitle: 'অনুষ্ঠান সূচি' },
  { id: 'holud', number: '০৪', bengaliTitle: 'গায়ে হলুদ' },
  { id: 'vows', number: '০৫', bengaliTitle: 'সাত পাক ও শুভ পরিণয়' },
  { id: 'feast', number: '০৬', bengaliTitle: 'রাজকীয় ভুরিভোজ' },
  { id: 'rsvp', number: '০৭', bengaliTitle: 'নিমন্ত্রণ, স্থান ও আশীর্বাদ' },
];
