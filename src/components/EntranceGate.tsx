import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from './Tilt3DCard';
import {
  AlponaMandala,
  KalkaCornerSVG,
  LotusDividerSVG,
  MarigoldToranSVG,
  PradipDiyaSVG,
  ShankhaSVG,
  ToporSVG,
} from './BengaliMotifs';

export const EntranceGate: React.FC = () => {
  const { weddingData, hasEnteredGate, enterWeddingGates } = useWedding();
  const [opening, setOpening] = useState(false);

  const handleOpenBook = () => {
    if (opening) return;
    setOpening(true);
    confetti({
      particleCount: 150,
      spread: 115,
      origin: { y: 0.52 },
      colors: ['#B3121B', '#F39C12', '#17422A', '#FFE39A', '#FAF0DC'],
    });
    window.setTimeout(() => {
      enterWeddingGates();
    }, 1050);
  };

  return (
    <AnimatePresence>
      {!hasEnteredGate && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[120] overflow-hidden flex items-center justify-center p-4 md:p-10"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, #42070F 0%, #1C0206 65%, #080102 100%)',
            perspective: '2200px',
          }}
        >
          {/* Ambient Golden Mandala Behind Book */}
          <div
            style={{ transform: 'perspective(1200px) rotateX(48deg)' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
          >
            <AlponaMandala className="w-[820px] h-[820px] animate-spin-slow" color="#FFE39A" />
          </div>

          {/* 3D Physical Hardcover Book Assembly */}
          <div className="relative w-full max-w-xl" style={{ perspective: '2200px' }}>
            {/* Cream Inside Flyleaf (Strictly Behind at z-0 & negative translateZ) */}
            <div
              aria-hidden="true"
              style={{ transform: 'translateZ(-16px)' }}
              className="absolute inset-0 z-0 rounded-r-[38px] rounded-l-xl bg-[#FAF0DC] border-2 border-[#C89B3C] shadow-inner flex flex-col items-center justify-center p-10 text-center"
            >
              <AlponaMandala className="w-56 h-56 opacity-20 mb-4" color="#B3121B" />
              <p className="font-bengali text-3xl font-bold text-[#B3121B]">
                শুভ পরিণয় • {weddingData.bride.firstName} ও {weddingData.groom.firstName}
              </p>
            </div>

            {/* Right-Edge Stacked Page Thickness */}
            <div
              aria-hidden="true"
              style={{ transform: 'translateZ(-8px)' }}
              className="absolute -right-3 top-2.5 bottom-2.5 w-3.5 z-10 rounded-r-lg bg-gradient-to-r from-[#E6D5B8] via-[#FAF0DC] to-[#C89B3C]/70 border-y border-r border-[#C89B3C]/60 shadow-xl"
            />

            {/* Front Hardcover (Strictly at z-20 & positive translateZ) */}
            <motion.div
              initial={{ scale: 0.96, opacity: 1, rotateY: 0 }}
              animate={{
                scale: opening ? 1.04 : 1,
                opacity: opening ? 0 : 1,
                rotateY: opening ? -135 : 0,
              }}
              transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
              className="relative z-20"
            >
              <Tilt3DCard
                maxTilt={9}
                glareOpacity={0.28}
                className="rounded-r-[38px] rounded-l-xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.92)] border-2 border-[#FFE39A]"
              >
                <div
                  className="relative px-4 sm:px-10 pt-14 pb-8 sm:pb-10 flex flex-col items-center text-center"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 22%, #C91822 0%, #830C14 52%, #17422A 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Golden Spine */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-[#360308] via-[#C89B3C]/75 to-transparent border-r border-[#FFE39A]/50 flex flex-col justify-evenly items-center py-10"
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="w-3 h-0.5 rounded-full bg-[#FFE39A]/80" />
                    ))}
                  </div>

                  {/* 4-Corner Kalka */}
                  <KalkaCornerSVG
                    className="w-16 h-16 absolute top-4 left-8 opacity-90 pointer-events-none"
                    color="#FFE39A"
                  />
                  <KalkaCornerSVG
                    className="w-16 h-16 absolute top-4 right-4 opacity-90 pointer-events-none"
                    color="#FFE39A"
                    flipX
                  />
                  <KalkaCornerSVG
                    className="w-16 h-16 absolute bottom-4 left-8 opacity-90 pointer-events-none"
                    color="#FFE39A"
                    flipY
                  />
                  <KalkaCornerSVG
                    className="w-16 h-16 absolute bottom-4 right-4 opacity-90 pointer-events-none"
                    color="#FFE39A"
                    flipX
                    flipY
                  />

                  <div className="absolute top-0 inset-x-0 pointer-events-none">
                    <MarigoldToranSVG className="w-full h-16 drop-shadow-xl" />
                  </div>

                  <div className="w-full pl-5 sm:pl-4">
                    <div className="rounded-3xl border border-[#FFE39A]/70 bg-black/25 backdrop-blur-md px-4 sm:px-6 py-7 sm:py-8 space-y-4 sm:space-y-5 shadow-inner">
                      <div className="flex items-center justify-center gap-4 sm:gap-5">
                        <PradipDiyaSVG className="w-9 h-9 sm:w-11 sm:h-11" lit />
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F39C12] via-[#FFE39A] to-[#C89B3C] p-0.5 shadow-2xl">
                          <div className="w-full h-full rounded-full bg-[#240B0E] flex items-center justify-center">
                            <ToporSVG className="w-10 h-11 sm:w-12 sm:h-13" />
                          </div>
                        </div>
                        <PradipDiyaSVG className="w-9 h-9 sm:w-11 sm:h-11" lit />
                      </div>

                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#17422A]/95 border border-[#FFE39A]/55 text-[#FFE39A] text-[11px] sm:text-sm font-bengali-sans font-semibold">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F39C12] shrink-0" />
                        <span>শ্রীশ্রী প্রজাপতয়ে নমঃ • শুভ পরিণয়</span>
                      </div>

                      <h1 className="font-bengali text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFF8E7] leading-[1.2] drop-shadow-[0_8px_18px_rgba(0,0,0,0.75)]">
                        {weddingData.bride.firstName}
                        <span className="text-[#FFE39A] mx-2 sm:mx-3">ও</span>
                        {weddingData.groom.firstName}
                      </h1>

                      <div className="flex justify-center">
                        <LotusDividerSVG
                          className="w-64 h-8"
                          lineColor="#FFE39A"
                          accentColor="#F39C12"
                        />
                      </div>

                      <p className="font-bengali text-sm sm:text-base text-[#FFE39A] font-medium">
                        {weddingData.weddingDateDisplay}
                      </p>

                      {/* Silk Ribbon & Golden Seal Opener */}
                      <div className="relative py-3 flex items-center justify-center">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 h-3 bg-gradient-to-r from-[#17422A] via-[#F39C12] to-[#17422A] opacity-90 border-y border-[#FFE39A]/70"
                        />
                        <motion.button
                          whileHover={{ scale: 1.07 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={handleOpenBook}
                          className="relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-br from-[#FFE39A] via-[#F39C12] to-[#B87A14] text-[#240B0E] font-bengali font-bold text-base shadow-[0_14px_38px_rgba(243,156,18,0.65)] border-2 border-[#FFF8E7]"
                        >
                          <ShankhaSVG className="w-5 h-5" />
                          <span>শুভ আমন্ত্রণ</span>
                        </motion.button>
                      </div>

                      <p className="font-bengali text-xs sm:text-sm text-[#FAF5EE]/90">
                        চট্টোপাধ্যায় ও সেন পরিবারের সাদর নিবেদন
                      </p>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
