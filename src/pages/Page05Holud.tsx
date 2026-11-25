import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sun } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { AlponaMandala, LotusDividerSVG, PradipDiyaSVG } from '../components/BengaliMotifs';

export const Page05Holud: React.FC = () => {
  const { weddingData } = useWedding();

  const fireHolud = () => {
    confetti({
      particleCount: 120,
      spread: 110,
      colors: ['#F39C12', '#FFCA3A', '#FFE39A', '#B3121B', '#17422A'],
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali">
      <motion.div
        initial={{ opacity: 0.9, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block px-5 py-1.5 rounded-full bg-[#B3121B] text-[#FFE39A] text-xs md:text-sm font-bengali-sans font-semibold mb-3 shadow-md">
          দধি মঙ্গল ও গায়ে হলুদ
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#240B0E] leading-tight">
          হলুদের রঙে রঙিন সকাল
        </h2>
        <div className="flex justify-center mt-4">
          <LotusDividerSVG className="w-60 sm:w-72 h-9" lineColor="#B3121B" accentColor="#F39C12" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* 3D Tilted Circular Marigold Frame */}
        <div className="lg:col-span-6 relative max-w-[420px] mx-auto w-full aspect-square">
          <Tilt3DCard maxTilt={11} glareOpacity={0.26} className="w-full h-full rounded-full">
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-5 rounded-full opacity-35 pointer-events-none"
              >
                <AlponaMandala className="w-full h-full" color="#B3121B" />
              </motion.div>

              <div className="relative rounded-full overflow-hidden border-4 border-[#B3121B] shadow-[0_28px_65px_rgba(120,25,15,0.35)] w-full h-full">
                <img
                  src={weddingData.holudImage}
                  alt="গায়ে হলুদ"
                  className="w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#C87A10]/25 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(28px)' }}
                className="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <PradipDiyaSVG className="w-11 h-11" lit />
              </motion.div>
            </div>
          </Tilt3DCard>
        </div>

        {/* High-Contrast Warm Cream Spec Card */}
        <motion.div
          initial={{ opacity: 0.9, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 space-y-6 text-center lg:text-left"
        >
          <div className="bg-[#FFF9EB]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#B3121B]/25 shadow-lg space-y-6">
            <p className="font-bengali-sans text-base md:text-xl text-[#240B0E] leading-[1.85] font-medium">
              ভোরের দধি মঙ্গলের পর বরের বাড়ি থেকে আসা তত্ত্ব ও আশীর্বাদের কাঁচা হলুদে রঙিন হয়ে ওঠে সকাল। গাঁদা ফুলের সাজ আর উৎসবের আমেজে ভরে ওঠে বিয়ের আঙিনা।
            </p>

            <div className="border-t border-[#B3121B]/25 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left font-bengali-sans">
              {[
                { label: 'তারিখ', value: '২৪ জানুয়ারি ২০২৭' },
                { label: 'সময়', value: 'সকাল ৯টা' },
                { label: 'স্থান', value: 'বালিগঞ্জ, কলকাতা' },
                { label: 'সাজপোশাক', value: 'হলুদ বা লাল' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-bold text-[#B3121B] mb-1">{label}</p>
                  <p className="text-sm sm:text-base text-[#240B0E] font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={fireHolud}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bengali-sans font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-transform bg-sindoor-velvet text-[#FFE39A] border-2 border-[#FFE39A]"
            >
              <Sun className="w-5 h-5 text-[#F39C12]" />
              হলুদ উৎসবে মেতে উঠুন
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
