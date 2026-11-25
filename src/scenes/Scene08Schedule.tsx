import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { artSrc, INVITATION_DATA, toBengaliDigits } from '../data/invitationData';
import { GoldFlourish } from '../components/ArtisanalMotifs';
import { CutePalkiPenchaSVG, CuteShankhaSVG } from '../components/BengaliArtifacts';
import { useIsDesktop } from '../utils/scrollHelpers';

const EASE = [0.22, 1, 0.36, 1] as const;
const ONE_DAY_MS = 86_400_000;

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gaatchhora//Bengali Wedding Invitation//BN_EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  for (const item of INVITATION_DATA.schedule.ics) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${item.uid}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${item.start.replace(/[-:]/g, '')}`,
      `DTEND:${item.end.replace(/[-:]/g, '')}`,
      `SUMMARY:${item.summary}`,
      `DESCRIPTION:${item.description}`,
      `LOCATION:${item.location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  }
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'titli-soumyadeep-wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function FlipDigit({ value }: { value: string }) {
  return (
    <span className="sc-digit">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-45%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '45%', opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Scene08Schedule() {
  const data = INVITATION_DATA.schedule;
  const isDesktop = useIsDesktop();
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const copy = data[lang];
  const diff = new Date(data.countdownTarget).getTime() - now;

  const formatNum = (n: number) => {
    const padded = String(Math.max(0, n)).padStart(2, '0');
    return lang === 'bn' ? toBengaliDigits(padded) : padded;
  };

  const units = [
    { label: copy.countdownLabels.days, value: Math.floor(diff / ONE_DAY_MS) },
    { label: copy.countdownLabels.hours, value: Math.floor((diff % ONE_DAY_MS) / 3_600_000) },
    { label: copy.countdownLabels.minutes, value: Math.floor((diff % 3_600_000) / 60_000) },
    { label: copy.countdownLabels.seconds, value: Math.floor((diff % 60_000) / 1000) },
  ];

  return (
    <section className="sc block" id="schedule">
      <div className="alpona-mark sc-mark" aria-hidden="true" />

      <div className="wrap">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="sc-switch" role="tablist" aria-label="Language">
            {(['bn', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={lang === code}
                className={`sc-lang ${lang === code ? 'is-on' : ''}`}
                onClick={() => setLang(code)}
              >
                <span>{code === 'bn' ? 'বাংলা' : 'English'}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.h2
              key={lang}
              className={`h-title ${lang === 'en' ? 'sc-title-en' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              {copy.title}
            </motion.h2>
          </AnimatePresence>

          <GoldFlourish inView className="sc-flourish" />
        </motion.div>

        <div className={`sc-events ${lang === 'en' ? 'is-en' : ''}`}>
          {copy.events.map((ev, idx) => (
            <motion.div
              key={idx}
              className="sc-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <h3>{ev.title}</h3>
                  <GoldFlourish className="sc-mini-flourish" />
                  <p className="sc-date">{ev.date}</p>
                  <p className="sc-time">{ev.time}</p>
                  <p className="sc-venue">
                    <span>{ev.venueLabel}</span>
                    {ev.venue}
                  </p>
                  <a
                    href={ev.mapQuery}
                    target="_blank"
                    rel="noreferrer"
                    className="sc-map-link"
                  >
                    <MapPin size={15} />
                    <span>{lang === 'bn' ? 'ম্যাপ দেখুন' : 'View Map'}</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="sc-count"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          {diff > 0 ? (
            <div className="sc-nums">
              {units.map((u) => (
                <div key={u.label} className="sc-num">
                  <FlipDigit value={formatNum(u.value)} />
                  <span className="sc-label">{u.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="sc-msg">{diff > -ONE_DAY_MS ? copy.countdownToday : copy.countdownDone}</p>
          )}

          <button type="button" className="sc-cal" onClick={downloadICS}>
            <CalendarDays size={19} />
            <span>{copy.calendarButton}</span>
          </button>
        </motion.div>
      </div>

      <div className="sc-prop sc-prop-l" aria-hidden="true">
        <img src={artSrc('props-left', undefined, isDesktop)} alt="" className="sc-prop-img" />
        <div className="sc-prop-cute">
          <CuteShankhaSVG className="w-full h-auto" />
        </div>
      </div>
      <div className="sc-prop sc-prop-r" aria-hidden="true">
        <img src={artSrc('props-right', undefined, isDesktop)} alt="" className="sc-prop-img" />
        <div className="sc-prop-cute">
          <CutePalkiPenchaSVG className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
