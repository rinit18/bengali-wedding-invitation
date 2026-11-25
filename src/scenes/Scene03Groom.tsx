import { useRef } from 'react';
import { motion, useAnimation, useTransform, type MotionValue } from 'framer-motion';
import {
  artSrc,
  INVITATION_DATA,
  triggerButterflyVisit,
  triggerPetalShower,
} from '../data/invitationData';
import { GoldFlourish, InkTitle, TuniLights } from '../components/ArtisanalMotifs';
import {
  smoothGlideTo,
  useHatAnchor,
  useIsDesktop,
  useNearViewport,
  usePinProgress,
  useSegment,
} from '../utils/scrollHelpers';

const STRAND_LENGTHS = [0.97, 0.8, 0.9, 0.74, 1, 0.84, 0.93, 0.78];

function HangingStrand({
  i,
  total,
  progress,
  swing,
  isDesktop,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  swing: MotionValue<number>;
  isDesktop: boolean;
}) {
  const half = total / 2;
  const isLeft = i < half;
  const dir = isLeft ? -1 : 1;
  const basePos = ((i + 0.5) / total) * 100;
  const gatheredOffset = (((isLeft ? i : total - 1 - i) + 0.6) / half) * 14;
  const openPos = isLeft ? gatheredOffset : 100 - gatheredOffset;
  const edgeFactor = Math.abs(i + 0.5 - half) / half;
  const start = 0.03 + edgeFactor * 0.12;
  const seg = useSegment(progress, start, start + 0.3);

  const x = useTransform(
    seg,
    (v) => `${basePos + (openPos - basePos) * (1 - Math.pow(1 - v, 3))}cqw`
  );
  const rot = useTransform(seg, [0, 0.3, 0.65, 1], [0, dir * 9, dir * -4, 0]);
  const sway = useTransform(swing, (s) => s * (i % 2 ? 1 : -1) * (0.6 + edgeFactor));

  return (
    <motion.div
      className="gr-strand"
      style={{ x, height: `${STRAND_LENGTHS[i % STRAND_LENGTHS.length] * 100}%`, rotate: rot }}
    >
      <motion.span className="gr-strand-swing" style={{ rotate: sway }}>
        <img
          src={artSrc(`phool-strand-${(i % 5) + 1}`, undefined, isDesktop)}
          alt=""
          className="gr-strand-img"
          loading="eager"
        />
      </motion.span>
    </motion.div>
  );
}

export function Scene03Groom() {
  const data = INVITATION_DATA.groom;
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const hatWordRef = useRef<HTMLSpanElement>(null);
  const portraitBtnRef = useRef<HTMLButtonElement>(null);
  const toporCtrl = useAnimation();
  const busyRef = useRef(false);
  const isDesktop = useIsDesktop();

  const p = usePinProgress(sectionRef);
  const strandCount = isDesktop ? 12 : 9;
  const zoomScale = useTransform(p, [0.02, 0.5], [1.24, 1]);
  const initialSwing = useTransform(p, [0, 0.03, 0.06], [0, 3, 0]);
  const titleProg = useSegment(p, 0.34, 0.52);
  const flourishProg = useSegment(p, 0.44, 0.6);

  const toporProg = useSegment(p, 0.54, 0.7);
  const toporY = useTransform(
    toporProg,
    [0, 0.62, 0.8, 0.92, 1],
    ['-1400%', '5%', '-8%', '2%', '0%']
  );
  const toporRot = useTransform(toporProg, [0, 0.62, 0.8, 0.92, 1], [-40, 26, 9, 18, 15]);
  const toporOpacity = useTransform(toporProg, [0, 0.08], [0, 1]);

  const lineOpacity = useTransform(p, [0.68, 0.8], [0, 1]);
  const lineY = useTransform(p, [0.68, 0.8], [14, 0]);
  const cueOpacity = useTransform(p, [0, 0.07], [1, 0]);
  const cuePE = useTransform(p, (v) => (v < 0.07 ? 'auto' : 'none'));

  const hatAnchor = useHatAnchor(hatWordRef, textBoxRef);
  const words = data.title.split(' ');
  const hatIdx = Math.max(
    0,
    words.findIndex((w) => w.includes(INVITATION_DATA.couple.groomShort))
  );
  const before = words.slice(0, hatIdx).join(' ');
  const hatWord = words[hatIdx] ?? INVITATION_DATA.couple.groomShort;
  const after = words.slice(hatIdx + 1).join(' ');

  const openCurtain = () => {
    const el = sectionRef.current;
    if (!el) return;
    const dest = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.85;
    smoothGlideTo(dest, 2.5);
  };

  const hoverTopor = () => {
    if (!busyRef.current) {
      toporCtrl.start({ rotate: [0, -7, 5, -2, 0], transition: { duration: 0.7 } });
    }
  };

  const straightenTopor = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const r = hatWordRef.current?.getBoundingClientRect();
    if (r) triggerPetalShower(r.left + r.width / 2, r.top, 16, 0.7);
    await toporCtrl.start({
      rotate: -15,
      y: -6,
      transition: { type: 'spring', stiffness: 260, damping: 14 },
    });
    await new Promise((res) => setTimeout(res, 1100));
    await toporCtrl.start({
      rotate: [-15, 5, -2, 0],
      y: 0,
      transition: { duration: 0.85, ease: 'easeOut' },
    });
    busyRef.current = false;
  };

  const handlePortraitTap = () => {
    const r = portraitBtnRef.current?.getBoundingClientRect();
    if (r) triggerButterflyVisit(r.left + r.width * 0.54, r.top + r.height * 0.25);
  };

  return (
    <section
      ref={sectionRef}
      id="groom"
      className="pin gr gr-is-arch"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: 2.45 }}
    >
      <div className="pin-stage">
        <TuniLights
          className="gr-lights"
          rows={2}
          swags={isDesktop ? 4 : 2}
          count={isDesktop ? 10 : 7}
          sag={13}
        />

        <div className="gr-area">
          <div className="gr-frame">
            <button
              ref={portraitBtnRef}
              type="button"
              className="gr-art"
              onClick={handlePortraitTap}
              aria-label={data.title}
            >
              <motion.span className="gr-zoom" style={{ scale: zoomScale }}>
                <img
                  src={artSrc('bor-hero', 'bor-hero-desk', isDesktop)}
                  alt={data.title}
                  className="gr-img"
                />
              </motion.span>
            </button>
            <span className="gr-arch-line" aria-hidden="true" />
          </div>

          <div className="gr-curtain" aria-hidden="true">
            <span className="gr-cord" />
            {Array.from({ length: strandCount }).map((_, idx) => (
              <HangingStrand
                key={`${strandCount}-${idx}`}
                i={idx}
                total={strandCount}
                progress={p}
                swing={initialSwing}
                isDesktop={isDesktop}
              />
            ))}
          </div>

          <motion.button
            type="button"
            className="gr-cue"
            style={{ opacity: cueOpacity, pointerEvents: cuePE }}
            onClick={openCurtain}
          >
            {data.curtainPrompt}
          </motion.button>
        </div>

        <div className="gr-text" ref={textBoxRef}>
          <InkTitle progress={titleProg} className="gr-title">
            {before && <>{before} </>}
            <span ref={hatWordRef} className="gr-hat">
              {hatWord}
            </span>
            {after && (
              <>
                <br />
                {after}
              </>
            )}
          </InkTitle>

          <GoldFlourish progress={flourishProg} className="gr-flourish" />

          <motion.p className="gr-line" style={{ opacity: lineOpacity, y: lineY }}>
            {data.line}
          </motion.p>

          {hatAnchor && (
            <motion.button
              type="button"
              className="gr-topor"
              aria-label={data.toporAria}
              style={{
                left: hatAnchor.x,
                top: hatAnchor.y,
                width: hatAnchor.w * 0.48,
                y: toporY,
                rotate: toporRot,
                opacity: toporOpacity,
              }}
              onPointerEnter={hoverTopor}
              onClick={straightenTopor}
            >
              <motion.span className="gr-topor-hat" animate={toporCtrl}>
                <img
                  src={artSrc('topor', undefined, isDesktop)}
                  alt=""
                  className="gr-topor-img"
                />
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
