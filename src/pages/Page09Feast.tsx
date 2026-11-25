import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { LotusDividerSVG } from '../components/BengaliMotifs';

const COURSES = [
  {
    id: 'shuru',
    bn: 'শুরুয়াত ও পানীয়',
    dishes: ['গন্ধরাজ লেবু ও আম পোড়া শরবত', 'মোচার চপ ও ফিশ কবিরাজি', 'কড়াইশুঁটির কচুরি ও আলুর দম'],
  },
  {
    id: 'mul',
    bn: 'রাজকীয় মূল ভোজ',
    dishes: ['কাজু-কিশমিশ বাসন্তী পোলাও', 'ভেটকি মাছের পাতুরি', 'ডাব চিংড়ি ও মাটন কষা', 'ছানার ডালনা (নিরামিষ পদ)'],
  },
  {
    id: 'sesh',
    bn: 'শেষ পাত ও মিষ্টিমুখ',
    dishes: ['কাঁচা আমের চাটনি ও পাঁপড়', 'গরম নলেন গুড়ের রসগোল্লা', 'মাটির ভাঁড়ে মিষ্টি দই ও মিষ্টি পান'],
  },
];

export const Page09Feast: React.FC = () => {
  const { weddingData } = useWedding();
  const [courseIdx, setCourseIdx] = useState(1);

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali">
      <motion.div
        initial={{ opacity: 0.9, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block px-5 py-1.5 rounded-full bg-[#E8A317] text-[#240B0E] text-xs md:text-sm font-bengali-sans font-bold mb-3 shadow-lg">
          প্রীতিভোজের আয়োজন
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#FAF5EE] leading-tight">
          কলাপাতায় রাজকীয় ভুরিভোজ
        </h2>
        <div className="flex justify-center mt-4">
          <LotusDividerSVG className="w-60 sm:w-72 h-9" lineColor="#FFE39A" accentColor="#F39C12" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <Tilt3DCard
            maxTilt={11}
            glareOpacity={0.28}
            className="rounded-[34px] overflow-hidden border-4 border-[#FFE39A] shadow-[0_30px_75px_rgba(0,0,0,0.7)] aspect-[4/3]"
          >
            <img
              src={weddingData.feastImage}
              alt="বাঙালি ভুরিভোজ"
              className="w-full h-full object-cover animate-ken-burns"
            />
          </Tilt3DCard>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="flex flex-wrap gap-2.5 font-bengali-sans">
            {COURSES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setCourseIdx(idx)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                  idx === courseIdx
                    ? 'bg-[#FFE39A] text-[#240B0E] border-white shadow-xl font-bold'
                    : 'bg-[#091C16]/70 text-[#FFF8E7] border-[#FFE39A]/40 hover:bg-[#091C16]'
                }`}
              >
                {c.bn}
              </button>
            ))}
          </div>

          <Tilt3DCard
            maxTilt={6}
            glareOpacity={0.18}
            className="bg-[#081A14]/75 backdrop-blur-md rounded-3xl p-7 md:p-9 border-2 border-[#C89B3C]/60 shadow-2xl"
          >
            <motion.div
              key={COURSES[courseIdx].id}
              initial={{ opacity: 0.85, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transform: 'translateZ(20px)' }}
              className="space-y-4 font-bengali-sans"
            >
              {COURSES[courseIdx].dishes.map((dish) => (
                <div key={dish} className="flex items-center gap-3.5 text-lg md:text-xl text-[#FFF7E8] font-medium">
                  <span className="w-3 h-3 rounded-full bg-[#FFE39A] shrink-0 shadow-[0_0_8px_#FFE39A]" />
                  <span>{dish}</span>
                </div>
              ))}
            </motion.div>
          </Tilt3DCard>
        </div>
      </div>
    </div>
  );
};
