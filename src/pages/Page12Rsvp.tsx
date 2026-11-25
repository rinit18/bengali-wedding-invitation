import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, CalendarPlus, ArrowUp, Sparkles } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { AlponaMandala, LotusDividerSVG, MarigoldToranSVG, PradipDiyaSVG } from '../components/BengaliMotifs';
import { toBengaliDigits } from '../utils/bengaliDigits';

export const Page12Rsvp: React.FC = () => {
  const { weddingData, scrollToSection } = useWedding();
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(weddingData.weddingDateISO).getTime() - Date.now());
      setTimer({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [weddingData.weddingDateISO]);

  const handleSaveCalendar = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'DTSTART:20270124T140000Z',
      'DTEND:20270124T180000Z',
      `SUMMARY:${weddingData.bride.firstName} ও ${weddingData.groom.firstName}-র শুভ বিবাহ`,
      `LOCATION:${weddingData.venues.bibahoAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shubho-bibaho.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-bengali space-y-16 relative">
      {/* Huge Closing Hero Header */}
      <motion.div
        initial={{ opacity: 0.9, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center space-y-5"
      >
        <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#F39C12] text-[#240B0E] text-xs md:text-sm font-bengali-sans font-bold shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span>শেষ প্রচ্ছদ • সাদর সমাপ্তি ও স্থান</span>
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gold-foil leading-[1.28] py-1">
          সপরিবারে সাদর আমন্ত্রণ
        </h2>
        <div className="flex justify-center">
          <LotusDividerSVG className="w-60 sm:w-72 h-9" lineColor="#FFE39A" accentColor="#F39C12" />
        </div>
      </motion.div>

      {/* Formal Letterpress Patrika */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <Tilt3DCard
          maxTilt={5}
          glareOpacity={0.2}
          className="bg-[#FFF9ED] text-[#240B0E] rounded-[36px] p-8 sm:p-12 md:p-14 border-4 border-double border-[#B3121B] shadow-[0_32px_85px_rgba(0,0,0,0.65)] text-center overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 opacity-10 pointer-events-none">
            <AlponaMandala className="w-64 h-64" color="#B3121B" />
          </div>
          <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 space-y-5">
            <span className="inline-block px-5 py-1.5 rounded-full bg-[#B3121B] text-[#FFE39A] text-xs sm:text-sm font-bengali-sans font-bold shadow">
              সবিনয় সাদর আমন্ত্রণ
            </span>
            <p className="text-xl md:text-2xl text-[#7A1118] font-bold">সুধী ও প্রিয়জন,</p>
            <p className="font-bengali-sans text-base sm:text-lg md:text-xl text-[#240B0E] leading-[1.95] max-w-3xl mx-auto">
              পরম করুণাময়ের আশীর্বাদে ও গুরুজনদের শুভ ইচ্ছায় আগামী{' '}
              <strong>{weddingData.weddingDateDisplay}</strong> আমাদের কন্যা{' '}
              <strong>{weddingData.bride.bengaliName}</strong>-র সঙ্গে {weddingData.groom.hometown} নিবাসী{' '}
              {weddingData.groom.parents} <strong>{weddingData.groom.bengaliName}</strong>-র শুভ পরিণয় সম্পন্ন হইবে।
            </p>
            <p className="font-bengali-sans text-base sm:text-lg md:text-xl text-[#240B0E] leading-[1.95] max-w-3xl mx-auto">
              শুভ বিবাহ এবং আগামী <strong>২৬ জানুয়ারি ২০২৭</strong> প্রীতিভোজ অনুষ্ঠানে আপনার সপরিবার শুভাগমন ও স্নেহাশিস আমাদের পরম প্রাপ্তি হইয়া থাকিবে।
            </p>
            <div className="pt-5 border-t border-[#C89B3C]/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#7A1118] font-bengali-sans font-semibold">
              <span>পত্র দ্বারা নিমন্ত্রণের ত্রুটি স্নেহবশত মার্জনীয়।</span>
              <span>বিনীত — চট্টোপাধ্যায় ও সেন পরিবার</span>
            </div>
          </div>
        </Tilt3DCard>
      </div>

      {/* Editorial Monumental Countdown */}
      <div className="relative z-10 text-center space-y-6">
        <p className="font-bengali-sans text-base md:text-lg text-[#FFE39A] font-semibold tracking-wider">
          শুভ লগ্নের বাকি আর মাত্র
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x divide-[#FFE39A]/25 max-w-4xl mx-auto rounded-3xl bg-black/35 backdrop-blur-md border border-[#FFE39A]/40 p-4 sm:py-6 sm:px-0">
          {[
            { label: 'দিন', value: timer.days },
            { label: 'ঘণ্টা', value: timer.hours },
            { label: 'মিনিট', value: timer.minutes },
            { label: 'সেকেন্ড', value: timer.seconds },
          ].map((c) => (
            <div key={c.label} className="py-2 sm:py-3 px-2 sm:px-4 rounded-2xl sm:rounded-none bg-white/5 sm:bg-transparent">
              <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-gold-foil leading-[1.25] py-1">
                {toBengaliDigits(String(c.value).padStart(2, '0'))}
              </div>
              <div className="font-bengali-sans text-sm sm:text-base text-[#FFF7E8] mt-2 font-semibold">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveCalendar}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#17422A]/95 hover:bg-[#1E5638] border border-[#FFE39A]/60 text-sm text-[#FFE39A] font-bengali-sans font-semibold transition-colors shadow-lg"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>ক্যালেন্ডারে সংরক্ষণ করুন</span>
        </button>
      </div>

      {/* Dual Venue Monoliths */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Tilt3DCard
          maxTilt={6}
          glareOpacity={0.2}
          className="bg-[#7E0D15]/85 backdrop-blur-md rounded-3xl p-7 md:p-8 border border-[#FFE39A]/50 shadow-2xl"
        >
          <div style={{ transform: 'translateZ(18px)' }} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="font-bengali-sans text-xs sm:text-sm font-bold text-[#FFE39A]">
                শুভ বিবাহ • ২৪ জানুয়ারি ২০২৭
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {weddingData.venues.bibahoName}
              </div>
              <p className="font-bengali-sans text-sm text-[#FFF7E8] flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 shrink-0 text-[#F39C12]" />
                {weddingData.venues.bibahoAddress}
              </p>
            </div>
            <a
              href={weddingData.venues.bibahoMap}
              target="_blank"
              rel="noreferrer"
              title="মানচিত্রে দেখুন"
              className="p-4 rounded-full bg-gradient-to-br from-[#FFE39A] to-[#F39C12] text-[#240B0E] hover:scale-105 transition-transform shrink-0 shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </Tilt3DCard>

        <Tilt3DCard
          maxTilt={6}
          glareOpacity={0.2}
          className="bg-[#143D2D]/90 backdrop-blur-md rounded-3xl p-7 md:p-8 border border-[#FFE39A]/50 shadow-2xl"
        >
          <div style={{ transform: 'translateZ(18px)' }} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="font-bengali-sans text-xs sm:text-sm font-bold text-[#FFE39A]">
                প্রীতিভোজ (বৌভাত) • ২৬ জানুয়ারি ২০২৭
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {weddingData.venues.bouBhatName}
              </div>
              <p className="font-bengali-sans text-sm text-[#FFF7E8] flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 shrink-0 text-[#F39C12]" />
                {weddingData.venues.bouBhatAddress}
              </p>
            </div>
            <a
              href={weddingData.venues.bouBhatMap}
              target="_blank"
              rel="noreferrer"
              title="মানচিত্রে দেখুন"
              className="p-4 rounded-full bg-gradient-to-br from-[#FFE39A] to-[#F39C12] text-[#240B0E] hover:scale-105 transition-transform shrink-0 shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </Tilt3DCard>
      </div>

      {/* GRAND CLOSING HERO CREST */}
      <div className="relative z-10">
        <Tilt3DCard
          maxTilt={6}
          glareOpacity={0.22}
          className="rounded-[40px] p-8 sm:p-12 md:p-16 border border-[#FFE39A]/60 text-center shadow-[0_32px_90px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-md"
          style={{
            background:
              'linear-gradient(135deg, rgba(145,14,22,0.85) 0%, rgba(19,56,36,0.88) 50%, rgba(145,14,22,0.85) 100%)',
          }}
        >
          <div style={{ transformStyle: 'preserve-3d' }} className="space-y-6 sm:space-y-7">
            <div className="pointer-events-none -mt-8 -mx-8 sm:-mt-12 sm:-mx-12 md:-mt-16 md:-mx-16 mb-3 opacity-95">
              <MarigoldToranSVG className="w-full h-14 sm:h-16 md:h-20" />
            </div>

            <div
              style={{ transform: 'translateZ(30px)' }}
              className="flex items-center justify-center gap-6"
            >
              <PradipDiyaSVG className="w-12 h-12 sm:w-14 sm:h-14" lit />
              <span
                translate="no"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sindoor-velvet border-2 border-[#FFE39A] flex items-center justify-center text-xl sm:text-2xl font-bold text-[#FFE39A] shadow-2xl"
              >
                {weddingData.monogram}
              </span>
              <PradipDiyaSVG className="w-12 h-12 sm:w-14 sm:h-14" lit />
            </div>

            <h3
              style={{ transform: 'translateZ(36px)' }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold text-gold-foil leading-[1.25] py-1"
            >
              {weddingData.bride.firstName} ও {weddingData.groom.firstName}
            </h3>

            <p
              style={{ transform: 'translateZ(26px)' }}
              className="text-2xl sm:text-4xl font-bold text-[#FFE39A]"
            >
              আপনাদের শুভাগমনের প্রতীক্ষায়
            </p>

            <p
              style={{ transform: 'translateZ(18px)' }}
              className="font-bengali-sans text-base sm:text-xl text-[#FFF7E8] max-w-3xl mx-auto leading-[1.95]"
            >
              আপনাদের স্নেহ, ভালোবাসা ও শুভাশীর্বাদই আমাদের নতুন জীবনের সবচেয়ে বড় পাথেয়।
              সপরিবারে আপনাদের উজ্জ্বল উপস্থিতি এই মঙ্গলময় সন্ধ্যাকে চিরস্মরণীয় করে তুলবে।
            </p>

            <div style={{ transform: 'translateZ(26px)' }} className="pt-3 flex flex-col items-center gap-5">
              <p className="font-bengali-sans text-sm text-[#FFE39A] font-semibold tracking-wider">
                {weddingData.hashtag} • {weddingData.weddingDateDisplay}
              </p>

              <button
                onClick={() => scrollToSection('home')}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFE39A] to-[#F39C12] text-[#240B0E] font-bengali-sans font-bold text-sm shadow-2xl hover:scale-105 transition-transform"
              >
                <ArrowUp className="w-4 h-4" />
                <span>প্রথম পাতায় ফিরে যান</span>
              </button>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </div>
  );
};
