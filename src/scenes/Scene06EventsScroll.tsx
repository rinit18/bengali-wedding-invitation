import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { artSrc, INVITATION_DATA, toBengaliDigits } from '../data/invitationData';
import { GoldFlourish, InkTitle } from '../components/ArtisanalMotifs';
import { smoothGlideTo, useIsDesktop, useNearViewport, usePinProgress, useSegment } from '../utils/scrollHelpers';

function easeStep(progress: number, count: number): number {
  if (count < 2) return 0;
  const raw = Math.min(1, Math.max(0, progress)) * (count - 1);
  const idx = Math.min(count - 2, Math.floor(raw));
  const local = Math.min(1, Math.max(0, (raw - idx - 0.32) / 0.36));
  return idx + local * local * (3 - 2 * local);
}

export function Scene06EventsScroll() {
  const data = INVITATION_DATA.events;
  const count = data.items.length;
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  const p = usePinProgress(sectionRef);
  const startOffset = useMotionValue(0);
  const stepStride = useMotionValue(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const measure = () => {
      const win = windowRef.current;
      const list = trackRef.current;
      const first = list?.firstElementChild as HTMLElement | null;
      if (!win || !list || !first) return;
      const winW = win.clientWidth;
      const panelW = first.offsetWidth;
      startOffset.set(Math.max(0, (winW - panelW) / 2));
      stepStride.set(panelW);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (windowRef.current) ro.observe(windowRef.current);
    return () => ro.disconnect();
  }, [startOffset, stepStride, count]);

  const titleProg = useSegment(p, 0, 0.08);
  const flourishProg = useSegment(p, 0.03, 0.1);
  const unrollSeg = useSegment(p, 0.08, 0.2);
  const slideSeg = useSegment(p, 0.22, 0.92);

  const leftRodX = useTransform(unrollSeg, (v) => `calc((50cqw - var(--rod)) * ${(1 - v).toFixed(4)})`);
  const rightRodX = useTransform(unrollSeg, (v) => `calc((50cqw - var(--rod)) * ${(v - 1).toFixed(4)})`);
  const clothClip = useTransform(unrollSeg, (v) => `inset(0 ${50 * (1 - v)}% 0 ${50 * (1 - v)}%)`);
  const trackX = useTransform(
    [slideSeg, startOffset, stepStride],
    ([sv, offset, stride]: number[]) => offset - easeStep(sv, count) * stride
  );

  const countOpacity = useTransform(p, [0.18, 0.24], [0, 1]);
  const countPE = useTransform(p, (v) => (v >= 0.18 ? 'auto' : 'none'));
  const hintOpacity = useTransform(p, [0, 0.12, 0.2], [0, 1, 0]);

  useMotionValueEvent(slideSeg, 'change', (latest) => {
    const rounded = Math.round(easeStep(latest, count));
    setActiveIdx((prev) => (prev === rounded ? prev : rounded));
  });

  const jumpToRitual = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const targetFrac = 0.22 + (idx / Math.max(1, count - 1)) * 0.7;
    smoothGlideTo(el.offsetTop + span * targetFrac, 1.1);
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="pin ev"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: (1.35 + count * 0.45).toFixed(2) }}
    >
      <div className="pin-stage">
        <div className="alpona-mark ev-mark ev-mark-a" aria-hidden="true" />
        <div className="alpona-mark ev-mark ev-mark-b" aria-hidden="true" />

        <div className="ev-head">
          <InkTitle progress={titleProg} className="ev-head-title">
            {data.title}
          </InkTitle>
          <GoldFlourish progress={flourishProg} className="ev-flourish" />
        </div>

        <div className="ev-scroll">
          <motion.div className="ev-cloth" style={{ clipPath: clothClip, WebkitClipPath: clothClip }}>
            <span className="ev-band ev-band-top" aria-hidden="true" />
            <div className="ev-window" ref={windowRef}>
              <motion.ol className="ev-track" ref={trackRef} style={{ x: trackX }}>
                {data.items.map((item, idx) => (
                  <li key={item.id} className={`ev-panel ${idx === activeIdx ? 'is-on' : ''}`}>
                    <figure className="ev-pic">
                      <img src={artSrc(item.image, undefined, isDesktop)} alt={item.name} className="ev-img" />
                    </figure>
                    <div className="ev-meta">
                      <h3 className="ev-name">{item.name}</h3>
                      <p className="ev-day">{item.day}</p>
                      <p className="ev-time">{item.time}</p>
                    </div>
                  </li>
                ))}
              </motion.ol>
            </div>
            <span className="ev-band ev-band-bottom" aria-hidden="true" />
          </motion.div>

          <motion.span className="ev-rod ev-rod-l" style={{ x: leftRodX }} aria-hidden="true" />
          <motion.span className="ev-rod ev-rod-r" style={{ x: rightRodX }} aria-hidden="true" />
        </div>

        <motion.p className="ev-hint" style={{ opacity: hintOpacity }}>
          {data.hint}
        </motion.p>

        <motion.div className="ev-count-bar" aria-live="polite" style={{ opacity: countOpacity, pointerEvents: countPE }}>
          <div className="ev-dots" role="tablist" aria-label="অনুষ্ঠান ক্রম">
            {data.items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIdx}
                aria-label={item.name}
                title={item.name}
                className={`ev-dot ${idx === activeIdx ? 'is-active' : ''}`}
                onClick={() => jumpToRitual(idx)}
              />
            ))}
          </div>
          <p className="ev-count">
            <span>{toBengaliDigits(activeIdx + 1)}</span> / {toBengaliDigits(count)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
