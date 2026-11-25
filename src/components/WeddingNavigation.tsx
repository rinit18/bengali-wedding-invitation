import React from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Compass, X, Sparkles } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { SCROLL_CHAPTERS } from '../config/pagesMeta';
import { AlponaMandala } from './BengaliMotifs';

export const WeddingNavigation: React.FC = () => {
  const {
    weddingData,
    activeSection,
    scrollToSection,
    isChapterPortalOpen,
    setChapterPortalOpen,
  } = useWedding();

  const { scrollYProgress } = useScroll();
  const activeMeta = SCROLL_CHAPTERS.find((c) => c.id === activeSection) || SCROLL_CHAPTERS[0];
  const showHeader = activeSection !== 'home';

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 inset-x-0 h-1 z-50 bg-gradient-to-r from-[#B3121B] via-[#F39C12] to-[#FFE39A] origin-left"
      />

      {/* Minimal Slim Floating Pills (Fade in past Hero Toran so Hero top edge stays uninterrupted) */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 inset-x-0 z-40 px-4 md:px-10 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
              <button
                onClick={() => scrollToSection('home')}
                className="pointer-events-auto flex items-center gap-2 bg-[#1B0508]/75 backdrop-blur-md border border-[#FFE39A]/40 shadow-lg rounded-full pl-1.5 pr-3.5 py-1 transition-all hover:border-[#FFE39A]"
              >
                <span
                  translate="no"
                  className="w-8 h-8 rounded-full bg-sindoor-velvet text-[#FFE39A] font-bengali font-bold text-[11px] leading-none flex items-center justify-center border border-[#FFE39A]/60 whitespace-nowrap"
                >
                  সো•অ
                </span>
                <span className="hidden sm:inline font-bengali text-xs font-medium text-[#FFE39A]">
                  {weddingData.bride.firstName} ও {weddingData.groom.firstName}
                </span>
              </button>

              <button
                onClick={() => setChapterPortalOpen(true)}
                className="pointer-events-auto flex items-center gap-2 bg-[#1B0508]/80 text-[#FAF5EE] backdrop-blur-md border border-[#FFE39A]/40 shadow-lg hover:border-[#FFE39A] rounded-full px-4 py-1.5 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-[#F39C12]" />
                <span className="font-bengali text-xs font-bold text-[#FFE39A]">
                  {activeMeta.number} / ০৭
                </span>
                <span className="hidden md:inline text-xs text-[#FAF5EE]/35">•</span>
                <span className="font-bengali text-xs text-[#FAF5EE]">{activeMeta.bengaliTitle}</span>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Side Quick-Jump Dots */}
      <nav className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 bg-[#1B0508]/70 backdrop-blur-md border border-[#FFE39A]/25 rounded-full py-3 px-2 shadow-xl">
        {SCROLL_CHAPTERS.map((ch) => {
          const active = ch.id === activeSection;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToSection(ch.id)}
              title={`${ch.number}. ${ch.bengaliTitle}`}
              className={`transition-all rounded-full ${
                active
                  ? 'w-2 h-7 bg-gradient-to-b from-[#F39C12] to-[#FFE39A]'
                  : 'w-2 h-2 bg-[#FAF5EE]/35 hover:bg-[#FAF5EE]/85'
              }`}
            />
          );
        })}
      </nav>

      {/* Chapter Index Overlay */}
      <AnimatePresence>
        {isChapterPortalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#140407]/95 backdrop-blur-2xl overflow-y-auto px-4 py-10 md:p-12"
          >
            <div className="fixed -right-24 -top-24 pointer-events-none opacity-15">
              <AlponaMandala className="w-[460px] h-[460px] animate-spin-slow" color="#FFE39A" />
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#FFE39A]/30">
                <div>
                  <div className="flex items-center gap-2 text-[#F39C12] text-xs mb-1 font-bengali">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>শুভ বিবাহের ৭টি অধ্যায়</span>
                  </div>
                  <h2 className="font-bengali text-3xl text-[#FAF5EE]">যেকোনো পর্বে যান</h2>
                </div>

                <button
                  onClick={() => setChapterPortalOpen(false)}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#B3121B] text-[#FAF5EE] border border-[#FFE39A]/40 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                {SCROLL_CHAPTERS.map((ch) => {
                  const isCurrent = ch.id === activeSection;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollToSection(ch.id)}
                      className={`text-left p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-br from-[#B3121B] to-[#5E0E14] border-[#FFE39A] shadow-xl'
                          : 'bg-white/5 hover:bg-white/10 border-[#FFE39A]/25 hover:border-[#FFE39A]'
                      }`}
                    >
                      <span className="font-bengali text-xs font-bold text-[#FFE39A]">
                        পর্ব {ch.number}
                      </span>
                      <div className="font-bengali text-xl text-[#FAF5EE] font-semibold mt-1">
                        {ch.bengaliTitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
