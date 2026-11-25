import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import {
  AlponaMandala,
  LotusDividerSVG,
  PaanPataSVG,
  MarigoldToranSVG,
  PradipDiyaSVG,
} from '../components/BengaliMotifs';

export const Page01Home: React.FC = () => {
  const { weddingData, scrollToSection } = useWedding();
  const [paanOpened, setPaanOpened] = useState(false);

  const handleToggle = () => {
    const next = !paanOpened;
    setPaanOpened(next);
    if (next) {
      confetti({
        particleCount: 100,
        spread: 90,
        colors: ['#B3121B', '#F39C12', '#17422A', '#FFE39A', '#FAF0DC'],
        origin: { y: 0.48 },
      });
    }
  };

  return (
    <div
      className="min-h-svh w-full flex flex-col justify-center relative overflow-hidden text-[#FAF5EE] px-4 md:px-12 pt-24 pb-12"
      style={{
        background:
          'radial-gradient(circle at 55% 38%, #B8141E 0%, #6E0A12 55%, #260408 100%)',
      }}
    >
      {/* Subtle Mandala Backdrop Behind Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
        <AlponaMandala className="w-[min(92vw,720px)] h-[min(92vw,720px)] animate-spin-slow" color="#FFE39A" />
      </div>

      {/* Top Marigold Toran */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10">
        <MarigoldToranSVG className="w-full h-14 md:h-20 drop-shadow-xl" />
      </div>

      {/* Main Monumental Split 3D Hero Stage */}
      <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Massive Clear Typography */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#17422A]/95 border border-[#FFE39A]/60 text-[#FFE39A] text-xs md:text-sm font-bengali-sans font-semibold shadow-lg tracking-wide">
            <Sparkles className="w-4 h-4 text-[#F39C12] shrink-0" />
            <span>{weddingData.bengaliBlessing}</span>
          </div>

          <h1 className="font-bengali font-bold leading-[1.2] drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]">
            <span className="block text-5xl sm:text-7xl xl:text-9xl text-[#FFF8E7] py-1">
              {weddingData.bride.firstName}
            </span>
            <span className="inline-flex items-center gap-3 sm:gap-4 my-1 text-3xl sm:text-5xl text-[#FFE39A]">
              <span className="w-10 sm:w-20 h-0.5 bg-gradient-to-r from-transparent to-[#FFE39A] inline-block" />
              <span>ও</span>
              <span className="w-10 sm:w-20 h-0.5 bg-gradient-to-l from-transparent to-[#FFE39A] inline-block" />
            </span>
            <span className="block text-5xl sm:text-7xl xl:text-9xl text-gold-foil py-2">
              {weddingData.groom.firstName}
            </span>
          </h1>

          <div className="flex justify-center lg:justify-start">
            <LotusDividerSVG className="w-64 h-8" lineColor="#FFE39A" accentColor="#F39C12" />
          </div>

          <div className="inline-block px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-sm border border-[#FFE39A]/40 shadow-md">
            <p className="font-bengali-sans text-sm sm:text-base md:text-lg text-[#FFE39A] font-semibold">
              {weddingData.weddingDateDisplay} • {weddingData.muhuratDisplay}
            </p>
          </div>

          <p className="font-bengali-sans text-base md:text-lg text-[#FFF7E8] max-w-2xl mx-auto lg:mx-0 leading-[1.85]">
            {weddingData.invitationLine}
          </p>
        </div>

        {/* Right: Towering 3D Architectural Couple Arch with Swinging Paan Pata */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="hidden xl:block left-1 bottom-2 absolute z-30 pointer-events-none">
            <PradipDiyaSVG className="w-12 h-12" lit />
          </div>
          <div className="hidden xl:block right-1 bottom-2 absolute z-30 pointer-events-none">
            <PradipDiyaSVG className="w-12 h-12" lit />
          </div>

          <div className="w-72 sm:w-[340px] md:w-[375px]">
            <Tilt3DCard
              maxTilt={11}
              glareOpacity={0.25}
              onClick={handleToggle}
              className="cursor-pointer rounded-t-[195px] rounded-b-[32px]"
            >
              <div
                style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
                className="relative w-full aspect-[3/4] rounded-t-[195px] rounded-b-[32px] overflow-hidden border-4 border-[#FFE39A] shadow-[0_32px_85px_rgba(0,0,0,0.75)] bg-[#240B0E]"
              >
                <img
                  src={weddingData.heroImage}
                  alt="শুভ বিবাহ"
                  className="w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#240B0E]/85 via-transparent to-transparent" />

                {/* 3D Swinging Paan Pata Shutters */}
                <motion.div
                  animate={{
                    rotateY: paanOpened ? -120 : 0,
                    x: paanOpened ? '-90%' : '8%',
                    rotate: paanOpened ? -15 : -8,
                    opacity: paanOpened ? 0 : 1,
                  }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center', transform: 'translateZ(26px)' }}
                  className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-end pointer-events-none"
                >
                  <PaanPataSVG className="w-40 h-52 drop-shadow-2xl" />
                </motion.div>
                <motion.div
                  animate={{
                    rotateY: paanOpened ? 120 : 0,
                    x: paanOpened ? '90%' : '-8%',
                    rotate: paanOpened ? 15 : 8,
                    opacity: paanOpened ? 0 : 1,
                  }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'right center', transform: 'translateZ(26px)' }}
                  className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-start pointer-events-none"
                >
                  <PaanPataSVG className="w-40 h-52 drop-shadow-2xl" flipped />
                </motion.div>

                <AnimatePresence mode="wait">
                  {!paanOpened ? (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ transform: 'translateZ(34px)' }}
                      className="absolute bottom-5 inset-x-4 text-center z-10"
                    >
                      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#17422A]/95 border border-[#FFE39A] text-[#FFE39A] text-sm font-bengali-sans font-semibold shadow-xl">
                        <Heart className="w-4 h-4 fill-current text-[#F39C12]" />
                        শুভ দৃষ্টি
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="opened"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ transform: 'translateZ(34px)' }}
                      className="absolute bottom-5 inset-x-4 text-center z-10"
                    >
                      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F39C12] border border-[#FFF8E7] text-[#240B0E] font-bold text-sm font-bengali-sans shadow-xl">
                        <Heart className="w-4 h-4 fill-current text-[#B3121B]" />
                        শুভ দৃষ্টি সম্পন্ন!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>

      {/* Silent Chevron */}
      <div className="relative z-20 flex justify-center mt-8">
        <button
          onClick={() => scrollToSection('couple')}
          aria-label="পরবর্তী পাতা"
          className="p-2.5 rounded-full border border-[#FFE39A]/45 bg-black/30 hover:bg-black/50 transition-colors shadow-lg"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-[#FFE39A]" />
          </motion.div>
        </button>
      </div>
    </div>
  );
};
