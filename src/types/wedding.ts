export type PageId =
  | 'home'
  | 'couple'
  | 'aiburobhat'
  | 'holud'
  | 'vows'
  | 'feast'
  | 'rsvp';

export type TransitionStyle =
  | 'rajbari-gate'
  | 'silk-gate'
  | 'tram-curtain'
  | 'kansha-iris'
  | 'holud-gate'
  | 'kulo-doors'
  | 'paan-gate'
  | 'sindoor-gate'
  | 'banana-gate'
  | 'alta-gate'
  | 'ballroom-doors'
  | 'diya-gate';

export interface PersonProfile {
  fullName: string;
  firstName: string;
  daknaam: string;
  bengaliName: string;
  tagline: string;
  parents: string;
  hometown: string;
  photo: string;
}

export interface StoryChapter {
  id: string;
  date: string;
  title: string;
  bengaliTitle: string;
  location: string;
  line: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export interface BlessingNote {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

export interface WeddingData {
  monogram: string;
  hashtag: string;
  bengaliBlessing: string;
  weddingDateISO: string;
  weddingDateDisplay: string;
  muhuratDisplay: string;
  city: string;
  invitationLine: string;
  heroImage: string;
  mandapImage: string;
  holudImage: string;
  feastImage: string;
  bride: PersonProfile;
  groom: PersonProfile;
  story: StoryChapter[];
  venues: {
    bibahoName: string;
    bibahoAddress: string;
    bibahoMap: string;
    bouBhatName: string;
    bouBhatAddress: string;
    bouBhatMap: string;
  };
  gallery: GalleryItem[];
  blessings: BlessingNote[];
}
