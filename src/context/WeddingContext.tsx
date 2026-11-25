import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WeddingData, PageId } from '../types/wedding';
import { DEFAULT_WEDDING_DATA } from '../config/weddingData';
import { SCROLL_CHAPTERS } from '../config/pagesMeta';

interface WeddingContextValue {
  weddingData: WeddingData;
  updateWeddingData: (updater: (prev: WeddingData) => WeddingData) => void;
  hasEnteredGate: boolean;
  enterWeddingGates: () => void;
  activeSection: PageId;
  scrollToSection: (id: PageId) => void;
  isChapterPortalOpen: boolean;
  setChapterPortalOpen: (open: boolean) => void;
}

const WeddingContext = createContext<WeddingContextValue | null>(null);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [hasEnteredGate, setHasEnteredGate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('open=1') || window.location.hash.startsWith('#section-');
  });

  useEffect(() => {
    const val = hasEnteredGate ? '' : 'hidden';
    document.body.style.overflow = val;
    document.documentElement.style.overflowY = val;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflowY = '';
    };
  }, [hasEnteredGate]);

  useEffect(() => {
    if (!hasEnteredGate || typeof window === 'undefined') return;
    if (window.location.hash.startsWith('#section-')) {
      const targetId = window.location.hash.slice(1);
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          window.scrollTo({ top: el.offsetTop, behavior: 'instant' as ScrollBehavior });
          window.dispatchEvent(new Event('scroll'));
        }
      }, 150);
    }
  }, [hasEnteredGate]);
  const [activeSection, setActiveSection] = useState<PageId>('home');
  const [isChapterPortalOpen, setChapterPortalOpen] = useState<boolean>(false);

  const updateWeddingData = useCallback((updater: (prev: WeddingData) => WeddingData) => {
    setWeddingData((prev) => updater(prev));
  }, []);

  const enterWeddingGates = useCallback(() => {
    setHasEnteredGate(true);
  }, []);

  const scrollToSection = useCallback((id: PageId) => {
    setChapterPortalOpen(false);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    if (!hasEnteredGate) return;
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = SCROLL_CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${SCROLL_CHAPTERS[i].id}`);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SCROLL_CHAPTERS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEnteredGate]);

  return (
    <WeddingContext.Provider
      value={{
        weddingData,
        updateWeddingData,
        hasEnteredGate,
        enterWeddingGates,
        activeSection,
        scrollToSection,
        isChapterPortalOpen,
        setChapterPortalOpen,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error('useWedding must be used inside WeddingProvider');
  return ctx;
};
