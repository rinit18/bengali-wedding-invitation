import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { ToporSVG, LotusDividerSVG } from '../components/BengaliMotifs';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0.9, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export const Page02Couple: React.FC = () => {
  const { weddingData } = useWedding();
  const [windowOpen, setWindowOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali">
      <motion.div {...fadeUp(0)} className="text-center mb-12">
        <span className="inline-block px-5 py-1.5 rounded-full bg-[#B3121B] text-[#FFE39A] text-xs md:text-sm font-bengali-sans font-semibold mb-3 shadow-lg">
          পাত্র ও পাত্রী পরিচিতি
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#240B0E] leading-tight">
          আমাদের কনে ও বর
        </h2>
        <div className="flex justify-center mt-4">
          <LotusDividerSVG className="w-60 sm:w-72 h-9" lineColor="#C89B3C" accentColor="#B3121B" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* Bride Huge 3D Portrait Card */}
        <motion.div {...fadeUp(0.1)}>
          <Tilt3DCard
            maxTilt={9}
            glareOpacity={0.24}
            className="h-full rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(74,7,12,0.45)] border-2 border-[#FFE39A] bg-sindoor-velvet text-[#FAF5EE]"
          >
            <div
              onClick={() => setWindowOpen((w) => !w)}
              style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              className="relative h-[340px] sm:h-[440px] md:h-[480px] overflow-hidden cursor-pointer bg-[#1A050A]"
            >
              <img
                src={weddingData.bride.photo}
                alt={weddingData.bride.fullName}
                className="w-full h-full object-cover object-top animate-ken-burns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0307] via-[#2B0307]/40 to-transparent" />

              {/* Real 3D Hinged Kharkhori Shutters */}
              <motion.div
                animate={{ rotateY: windowOpen ? -125 : 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'left center',
                  background: 'linear-gradient(135deg, #6B2317 0%, #4A1510 50%, #3A0F0D 100%)',
                  borderRight: '2px solid #FFE39A',
                }}
                className="absolute inset-y-0 left-0 w-1/2 overflow-hidden shadow-2xl z-10"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-4 h-0.5 bg-[#C89B3C]/35"
                    style={{ top: `${10 + i * 11}%` }}
                  />
                ))}
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-12 rounded-full shadow-md"
                  style={{ background: 'linear-gradient(to bottom, #FFE39A, #A67C2E)' }}
                />
              </motion.div>

              <motion.div
                animate={{ rotateY: windowOpen ? 125 : 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'right center',
                  background: 'linear-gradient(225deg, #6B2317 0%, #4A1510 50%, #3A0F0D 100%)',
                  borderLeft: '2px solid #FFE39A',
                }}
                className="absolute inset-y-0 right-0 w-1/2 overflow-hidden shadow-2xl z-10"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-4 h-0.5 bg-[#C89B3C]/35"
                    style={{ top: `${10 + i * 11}%` }}
                  />
                ))}
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-12 rounded-full shadow-md"
                  style={{ background: 'linear-gradient(to bottom, #FFE39A, #A67C2E)' }}
                />
              </motion.div>

              <motion.span
                animate={{ opacity: windowOpen ? 0 : 1 }}
                style={{ transform: 'translateZ(26px)' }}
                className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F39C12] text-[#240B0E] font-bengali-sans font-bold text-xs shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                জানলা খুলুন
              </motion.span>

              <div
                style={{ transform: 'translateZ(26px)' }}
                className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              >
                <p className="font-bengali-sans text-xs sm:text-sm text-[#FFE39A] font-medium mb-1">
                  {windowOpen ? 'লজ্জায় হাসি লুকোতে পারছে না!' : 'জানলার আড়ালে লাজুক কনে'}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow">
                  {weddingData.bride.fullName}
                </h3>
              </div>
            </div>

            <div style={{ transform: 'translateZ(18px)' }} className="p-5 sm:p-7 space-y-2.5 text-center font-bengali-sans">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#FFE39A]">
                <Users className="w-4 h-4 shrink-0" />
                <span>কনের বাড়ি • {weddingData.bride.hometown}</span>
              </div>
              <p className="text-sm sm:text-base text-[#FFF7E8] font-medium">
                {weddingData.bride.tagline}
              </p>
              <div className="border-t border-[#FFE39A]/25 pt-3 mt-2">
                <p className="text-sm text-[#FFE39A] leading-relaxed">
                  {weddingData.bride.parents}
                </p>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>

        {/* Groom Huge 3D Portrait Card */}
        <motion.div {...fadeUp(0.2)}>
          <Tilt3DCard
            maxTilt={9}
            glareOpacity={0.24}
            className="h-full rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(13,33,27,0.48)] border-2 border-[#FFE39A] bg-jamdani-emerald text-[#FAF5EE]"
          >
            <div style={{ transformStyle: 'preserve-3d' }} className="relative h-[340px] sm:h-[440px] md:h-[480px] overflow-hidden bg-[#0D211B]">
              <img
                src={weddingData.groom.photo}
                alt={weddingData.groom.fullName}
                className="w-full h-full object-cover object-top animate-ken-burns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D211B] via-[#0D211B]/35 to-transparent" />

              <motion.div
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(30px)' }}
                className="absolute top-4 right-4 bg-[#FAF4E8]/95 rounded-full p-2.5 border-2 border-[#C89B3C] shadow-xl z-10"
              >
                <ToporSVG className="w-9 h-10" />
              </motion.div>

              <div
                style={{ transform: 'translateZ(26px)' }}
                className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              >
                <p className="font-bengali-sans text-xs sm:text-sm text-[#FFE39A] font-medium mb-1">
                  শোলার টোপর পরে লাজুক-হাসি বরের সাজ
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow">
                  {weddingData.groom.fullName}
                </h3>
              </div>
            </div>

            <div style={{ transform: 'translateZ(18px)' }} className="p-5 sm:p-7 space-y-2.5 text-center font-bengali-sans">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#FFE39A]">
                <Users className="w-4 h-4 shrink-0" />
                <span>বরের বাড়ি • {weddingData.groom.hometown}</span>
              </div>
              <p className="text-sm sm:text-base text-[#FFF7E8] font-medium">
                {weddingData.groom.tagline}
              </p>
              <div className="border-t border-[#FFE39A]/25 pt-3 mt-2">
                <p className="text-sm text-[#FFE39A] leading-relaxed">
                  {weddingData.groom.parents}
                </p>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>
      </div>
    </div>
  );
};
