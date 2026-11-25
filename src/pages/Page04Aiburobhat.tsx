import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Sparkles, Sun, Heart, Flame } from 'lucide-react';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { LotusDividerSVG } from '../components/BengaliMotifs';

const RITUAL_SCHEDULE = [
  { bn: 'আইবুড়ো ভাত', time: 'শুক্রবার, ২২ জানুয়ারি', sub: 'দুপুর ১টা', Icon: Utensils },
  { bn: 'আশীর্বাদ ও মেহেন্দি', time: 'শনিবার, ২৩ জানুয়ারি', sub: 'সন্ধ্যা ৬টা', Icon: Sparkles },
  { bn: 'দধি মঙ্গল ও গায়ে হলুদ', time: 'রবিবার, ২৪ জানুয়ারি', sub: 'সকাল ৯টা', Icon: Sun },
  { bn: 'শুভ বিবাহ', time: 'রবিবার, ২৪ জানুয়ারি', sub: 'সন্ধ্যা ৭:৩০ মিনিট', Icon: Flame },
  { bn: 'বৌভাত ও প্রীতিভোজ', time: 'মঙ্গলবার, ২৬ জানুয়ারি', sub: 'সন্ধ্যা ৭টা থেকে', Icon: Heart },
];

export const Page04Aiburobhat: React.FC = () => {
  const [active, setActive] = useState(3);
  const ActiveIcon = RITUAL_SCHEDULE[active].Icon;

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali">
      <motion.div
        initial={{ opacity: 0.9, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="inline-block px-5 py-1.5 rounded-full bg-[#17422A] text-[#FFE39A] text-xs md:text-sm font-bengali-sans font-semibold mb-2.5 shadow-lg">
          মাঙ্গলিক অনুষ্ঠান সূচি
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-[#240B0E] leading-tight">
          বিবাহের শুভ নির্ঘণ্ট
        </h2>
        <div className="flex justify-center mt-3">
          <LotusDividerSVG className="w-64 h-8" lineColor="#B3121B" accentColor="#17422A" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left — 3D Gyroscopic Kansha Dial */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-72 h-72 sm:w-[360px] sm:h-[360px]">
            <Tilt3DCard maxTilt={14} glareOpacity={0.3} className="w-full h-full rounded-full">
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full p-1.5 shadow-[0_26px_70px_rgba(179,18,27,0.45)]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #B3121B, #F39C12, #17422A, #FFE39A, #B3121B)',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-[#FAF0DC]" />
                </motion.div>

                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ transform: 'translateZ(32px)' }}
                  className="absolute inset-3.5 rounded-full bg-sindoor-velvet border-2 border-[#FFE39A] flex flex-col items-center justify-center text-center p-8 shadow-2xl text-[#FAF5EE]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F39C12]/20 border border-[#FFE39A]/60 flex items-center justify-center mb-3">
                    <ActiveIcon className="w-7 h-7 text-[#FFE39A]" />
                  </div>
                  <p className="font-bengali-sans text-xs sm:text-sm text-[#FFE39A] font-bold tracking-wider mb-1">
                    শুভ অনুষ্ঠান
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold leading-tight text-white">
                    {RITUAL_SCHEDULE[active].bn}
                  </p>
                  <p className="font-bengali-sans text-sm sm:text-base text-[#FFF7E8] mt-3">
                    {RITUAL_SCHEDULE[active].time}
                  </p>
                  <p className="font-bengali-sans text-sm text-[#FFE39A] font-semibold mt-0.5">
                    {RITUAL_SCHEDULE[active].sub}
                  </p>
                </motion.div>
              </div>
            </Tilt3DCard>
          </div>
        </div>

        {/* Right — Crisp Interactive Schedule Panels */}
        <div className="lg:col-span-7 space-y-3">
          {RITUAL_SCHEDULE.map((item, i) => {
            const isSel = i === active;
            const RowIcon = item.Icon;
            return (
              <motion.button
                key={item.bn}
                whileHover={{ x: 6, scale: 1.01 }}
                onClick={() => setActive(i)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                  isSel
                    ? 'bg-sindoor-velvet text-[#FAF5EE] border-[#FFE39A] shadow-2xl scale-[1.015]'
                    : 'bg-[#FFF9EB]/95 text-[#240B0E] border-[#C89B3C]/70 hover:border-[#B3121B]'
                }`}
              >
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                    isSel
                      ? 'bg-[#FFE39A]/15 border-[#FFE39A] text-[#FFE39A]'
                      : 'bg-[#B3121B]/10 border-[#B3121B]/30 text-[#B3121B]'
                  }`}
                >
                  <RowIcon className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-lg md:text-xl font-bold leading-tight">{item.bn}</p>
                  <p
                    className={`font-bengali-sans text-sm mt-0.5 font-medium ${
                      isSel ? 'text-[#FFE39A]' : 'text-[#4A1C20]'
                    }`}
                  >
                    {item.time} • {item.sub}
                  </p>
                </div>
                {isSel && (
                  <div className="w-3 h-3 rounded-full bg-[#FFE39A] shrink-0 shadow-[0_0_12px_#FFE39A]" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
