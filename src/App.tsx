import React from 'react';
import { WeddingProvider } from './context/WeddingContext';
import { EntranceGate } from './components/EntranceGate';
import { WeddingNavigation } from './components/WeddingNavigation';
import { RevealSection } from './components/ScrollGateSection';
import { Scene3DBackground } from './components/Scene3DBackground';

import { Page01Home } from './pages/Page01Home';
import { Page02Couple } from './pages/Page02Couple';
import { Page04Aiburobhat } from './pages/Page04Aiburobhat';
import { Page05Holud } from './pages/Page05Holud';
import { Page08Vows } from './pages/Page08Vows';
import { Page09Feast } from './pages/Page09Feast';
import { Page12Rsvp } from './pages/Page12Rsvp';

export function App() {
  return (
    <WeddingProvider>
      <div className="min-h-screen bg-[#1A0205] relative">
        <EntranceGate />
        {/* 3D WebGL Ambient Stage strictly at z-[1] behind all foreground sections (z-10) */}
        <Scene3DBackground />
        <WeddingNavigation />

        <main className="relative z-10">
          {/* পৃষ্ঠা ১ : প্রথম প্রচ্ছদ — শুভ বিবাহ (Sindoor Crimson) */}
          <section id="section-home" className="relative min-h-svh w-full overflow-x-clip">
            <Page01Home />
          </section>

          {/* পৃষ্ঠা ২ : পাত্র ও পাত্রী (Warm Silk Ivory & Gold) */}
          <RevealSection
            id="couple"
            reveal="drift-left"
            className="py-28 px-4 md:px-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(252,238,205,0.92) 0%, rgba(250,240,220,0.94) 55%, rgba(253,230,192,0.92) 100%)',
            }}
          >
            <Page02Couple />
          </RevealSection>

          {/* পৃষ্ঠা ৩ : অনুষ্ঠান সূচি (Warm Marigold Gold) */}
          <RevealSection
            id="aiburobhat"
            reveal="fade-rise"
            className="py-28 px-4 md:px-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(253,230,138,0.9) 0%, rgba(252,217,108,0.92) 55%, rgba(251,196,74,0.9) 100%)',
            }}
          >
            <Page04Aiburobhat />
          </RevealSection>

          {/* পৃষ্ঠা ৪ : গায়ে হলুদ (Rich Turmeric Saffron & Sunlight) */}
          <RevealSection
            id="holud"
            reveal="fade-rise"
            className="py-28 px-4 md:px-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(254,240,199,0.9) 0%, rgba(253,224,132,0.92) 55%, rgba(245,176,65,0.88) 100%)',
            }}
          >
            <Page05Holud />
          </RevealSection>

          {/* পৃষ্ঠা ৫ : সাত পাক ও শুভ পরিণয় (Deep Sindoor Crimson Velvet) */}
          <RevealSection
            id="vows"
            reveal="fade-rise"
            dark
            className="py-28 px-4 md:px-12"
            style={{
              background:
                'radial-gradient(circle at top right, rgba(168,17,26,0.88) 0%, rgba(108,11,18,0.92) 52%, rgba(48,4,8,0.95) 100%)',
            }}
          >
            <Page08Vows />
          </RevealSection>

          {/* পৃষ্ঠা ৬ : রাজকীয় ভুরিভোজ (Deep Jamdani Emerald Green) */}
          <RevealSection
            id="feast"
            reveal="fade-rise"
            dark
            className="py-28 px-4 md:px-12"
            style={{
              background:
                'radial-gradient(circle at top left, rgba(31,79,63,0.9) 0%, rgba(19,52,40,0.93) 55%, rgba(9,28,22,0.96) 100%)',
            }}
          >
            <Page09Feast />
          </RevealSection>

          {/* পৃষ্ঠা ৭ : শেষ প্রচ্ছদ — সাদর সমাপ্তি ও স্থান */}
          <RevealSection
            id="rsvp"
            reveal="fade-rise"
            dark
            style={{
              background:
                'radial-gradient(circle at 50% 18%, rgba(102,10,18,0.88) 0%, rgba(48,5,9,0.94) 55%, rgba(20,2,5,0.97) 100%)',
            }}
            className="py-28 px-4 md:px-12"
          >
            <Page12Rsvp />
          </RevealSection>
        </main>
      </div>
    </WeddingProvider>
  );
}

export default App;
