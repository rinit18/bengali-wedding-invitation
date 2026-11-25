import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { AlponaMandala, LotusDividerSVG } from '../components/BengaliMotifs';

const STAGES = [
  {
    id: 'saat-paak',
    label: '১. সাত পাক ও শুভ দৃষ্টি',
    bn: 'সাত পাক ও শুভ দৃষ্টি',
    title: 'পান পাতার আড়াল সরিয়ে প্রথম চাওয়া',
    desc: 'ভাইদের কাঁধে চেপে সাতবার বরকে প্রদক্ষিণ, আর তারপর পান পাতা সরিয়ে চিরন্তন শুভ দৃষ্টি।',
  },
  {
    id: 'mala',
    label: '২. মালা বদল',
    bn: 'মালা বদল',
    title: 'রজনীগন্ধা ও গোলাপের মালা বিনিময়',
    desc: 'হাসি-ঠাট্টা, উলুধ্বনি আর উৎসবের আমেজে তিনবার শুভ মালা বদল।',
  },
  {
    id: 'sindoor',
    label: '৩. সম্প্রদান ও সিঁদুর দান',
    bn: 'সম্প্রদান ও সিঁদুর দান',
    title: 'বৈদিক মন্ত্র ও সিঁদুরের রাঙা স্পর্শ',
    desc: 'অগ্নিসাক্ষী রেখে সাত জন্মের অঙ্গীকার, সিঁথিতে সিঁদুর ও বাসর ঘরের আনন্দ-আড্ডা।',
  },
];

export const Page08Vows: React.FC = () => {
  const { weddingData } = useWedding();
  const [idx, setIdx] = useState(0);
  const current = STAGES[idx];

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali relative">
      <div
        style={{ transform: 'perspective(1200px) rotateX(55deg)' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
      >
        <AlponaMandala className="w-[620px] h-[620px] animate-spin-slow" color="#FFE39A" />
      </div>

      <motion.div
        initial={{ opacity: 0.9, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-14"
      >
        <span className="inline-block px-5 py-1.5 rounded-full bg-[#F39C12] text-[#240B0E] text-xs md:text-sm font-bengali-sans font-bold mb-3 shadow-lg">
          ছাঁদনাতলার পবিত্র লগ্ন
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#FAF5EE] leading-tight">
          সাত পাক ও শুভ পরিণয়
        </h2>
        <div className="flex justify-center mt-4">
          <LotusDividerSVG className="w-60 sm:w-72 h-9" lineColor="#FFE39A" accentColor="#F39C12" />
        </div>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <Tilt3DCard
            maxTilt={11}
            glareOpacity={0.28}
            className="rounded-t-[130px] sm:rounded-t-[200px] rounded-b-[28px] sm:rounded-b-[36px] overflow-hidden border-4 border-[#FFE39A] shadow-[0_32px_85px_rgba(0,0,0,0.75)] aspect-[4/3]"
          >
            <div style={{ transformStyle: 'preserve-3d' }} className="relative w-full h-full">
              <img
                src={weddingData.mandapImage}
                alt="ছাঁদনাতলা"
                className="w-full h-full object-cover animate-ken-burns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#240B0E]/85 via-transparent to-transparent" />
              <div
                style={{ transform: 'translateZ(28px)' }}
                className="absolute bottom-5 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-bengali-sans font-semibold text-[#FFE39A] bg-[#17422A]/95 py-2.5 px-4 sm:px-5 rounded-full border border-[#FFE39A]/60 shadow-xl"
              >
                <Flame className="w-4 h-4 shrink-0 text-[#F39C12]" />
                <span>{weddingData.muhuratDisplay}</span>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="flex flex-wrap gap-2.5 font-bengali-sans">
            {STAGES.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setIdx(i)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                  idx === i
                    ? 'bg-[#FFE39A] text-[#240B0E] border-white shadow-xl font-bold'
                    : 'bg-[#240B0E]/65 text-[#FFF8E7] border-[#FFE39A]/45 hover:bg-[#240B0E]/85'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Tilt3DCard
            maxTilt={6}
            glareOpacity={0.18}
            className="rounded-3xl bg-[#1A0306]/75 backdrop-blur-md border-2 border-[#FFE39A]/50 p-7 md:p-9 shadow-2xl"
          >
            <motion.div
              key={current.id}
              initial={{ opacity: 0.85, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ transform: 'translateZ(22px)' }}
              className="space-y-4"
            >
              <p className="font-bengali-sans text-base sm:text-lg text-[#FFE39A] font-semibold">
                {current.bn}
              </p>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                {current.title}
              </h3>
              <p className="font-bengali-sans text-base md:text-lg text-[#FFF7E8] leading-[1.8]">
                {current.desc}
              </p>
            </motion.div>
          </Tilt3DCard>

          <div className="inline-flex items-center gap-2 font-bengali-sans text-sm text-[#FFE39A] bg-[#240B0E]/65 px-5 py-3 rounded-full border border-[#FFE39A]/40">
            <Heart className="w-4 h-4 fill-current text-[#F39C12]" />
            <span>সব শেষে সারারাত বাসর ঘরের আনন্দ-আড্ডা!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
