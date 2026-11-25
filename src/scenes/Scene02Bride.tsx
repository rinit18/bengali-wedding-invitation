import { useRef, useState } from 'react';
import { motion, useAnimation, useTransform } from 'framer-motion';
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

function DoorLeaf({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`dl dl-${side}`}>
      <span className="dl-panel dl-panel-top" />
      <span className="dl-panel dl-panel-bottom" />
      <span className="dl-bolt" />
    </div>
  );
}

function BrassKnocker({ onKnock }: { onKnock: () => void }) {
  const [rings, setRings] = useState(0);
  return (
    <motion.button
      key={rings}
      type="button"
      className="br-knocker"
      aria-label={INVITATION_DATA.bride.knockerAria}
      onClick={() => {
        setRings((n) => n + 1);
        onKnock();
      }}
      initial={{ rotate: rings ? -28 : 0 }}
      animate={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 9 }}
    >
      <svg viewBox="0 0 60 80" aria-hidden="true">
        <circle cx="30" cy="14" r="9" fill="#8A6420" />
        <circle cx="30" cy="14" r="5" fill="#C9A24A" />
        <circle cx="30" cy="46" r="22" fill="none" stroke="#5E4313" strokeWidth="9" />
        <circle cx="30" cy="46" r="22" fill="none" stroke="#D4AE55" strokeWidth="5" />
        <path
          d="M22 26 Q30 20 38 26"
          fill="none"
          stroke="#D4AE55"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </motion.button>
  );
}

const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Scene02Bride() {
  const data = INVITATION_DATA.bride;
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const artBtnRef = useRef<HTMLButtonElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const hatWordRef = useRef<HTMLSpanElement>(null);
  const mukutBtnRef = useRef<HTMLButtonElement>(null);
  const mukutCtrl = useAnimation();
  const isDesktop = useIsDesktop();

  const p = usePinProgress(sectionRef);
  const doorProg = useSegment(p, 0.04, 0.4);
  const leftDoorRot = useTransform(doorProg, [0, 1], [0, -112]);
  const rightDoorRot = useTransform(doorProg, [0, 1], [0, 112]);
  const doorShadeOpacity = useTransform(doorProg, [0, 0.6], [0, 0.55]);

  const camScale = useTransform(p, [0.04, 0.58], [1.75, 1], { ease: cubicInOut });
  const lightsOpacity = useTransform(p, [0.48, 0.62], [0, 1]);
  const lightsY = useTransform(p, [0.48, 0.62], [-14, 0]);
  const titleProg = useSegment(p, 0.45, 0.63);
  const flourishProg = useSegment(p, 0.56, 0.72);

  const mukutProg = useSegment(p, 0.62, 0.8);
  const mukutY = useTransform(mukutProg, [0, 0.7, 0.85, 1], ['-1200%', '4%', '-6%', '0%']);
  const mukutRot = useTransform(mukutProg, [0, 0.7, 0.85, 1], [-24, 7, -3, 0]);
  const mukutOpacity = useTransform(mukutProg, [0, 0.08], [0, 1]);

  const lineOpacity = useTransform(p, [0.7, 0.82], [0, 1]);
  const lineY = useTransform(p, [0.7, 0.82], [16, 0]);
  const knockHintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const knockHintPE = useTransform(p, (v) => (v < 0.08 ? 'auto' : 'none'));

  const hatAnchor = useHatAnchor(hatWordRef, textBoxRef);
  const words = data.title.split(' ');
  const hatIdx = Math.max(0, words.findIndex((w) => w.includes(INVITATION_DATA.couple.bride)));
  const before = words.slice(0, hatIdx).join(' ');
  const hatWord = words[hatIdx] ?? INVITATION_DATA.couple.bride;
  const after = words.slice(hatIdx + 1).join(' ');

  const openDoors = () => {
    const el = sectionRef.current;
    if (!el) return;
    const dest = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.88;
    smoothGlideTo(dest, 2.6);
  };

  const handlePortraitTap = () => {
    const r = artBtnRef.current?.getBoundingClientRect();
    if (r) triggerButterflyVisit(r.left + r.width * 0.36, r.top + r.height * 0.38);
  };

  const handleMukutTap = () => {
    mukutCtrl.start({
      rotate: [0, -6, 5, -2, 0],
      scale: [1, 1.12, 1],
      transition: { duration: 0.7 },
    });
    const r = mukutBtnRef.current?.getBoundingClientRect();
    if (r) triggerPetalShower(r.left + r.width / 2, r.top + r.height * 0.3, 18, 0.75);
  };

  return (
    <section
      ref={sectionRef}
      id="bride"
      className="pin br"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: 2.6 }}
    >
      <div className="pin-stage">
        <button
          ref={artBtnRef}
          type="button"
          className="br-art"
          onClick={handlePortraitTap}
          aria-label={data.title}
        >
          <motion.span
            className="br-cam"
            style={{
              scale: camScale,
              transformOrigin: isDesktop ? '38% 42%' : '35% 48%',
            }}
          >
            <img
              src={artSrc('kone-hero', 'kone-hero-desk', isDesktop)}
              alt={data.title}
              className="br-img"
              loading="eager"
            />
          </motion.span>
        </button>

        <motion.div className="br-lights-wrap" style={{ opacity: lightsOpacity, y: lightsY }}>
          <TuniLights className="br-lights-top" swags={2} count={8} sag={20} />
        </motion.div>

        <div className="br-text" ref={textBoxRef}>
          <InkTitle progress={titleProg} className="br-title">
            {before && <>{before} </>}
            <span ref={hatWordRef} className="br-hat">
              {hatWord}
            </span>
            {after && (
              <>
                <br />
                {after}
              </>
            )}
          </InkTitle>

          <GoldFlourish progress={flourishProg} className="br-flourish" />

          <motion.p className="br-line" style={{ opacity: lineOpacity, y: lineY }}>
            {data.line}
          </motion.p>

          {hatAnchor && (
            <motion.button
              ref={mukutBtnRef}
              type="button"
              className="br-mukut"
              aria-label="মুকুট"
              style={{
                left: hatAnchor.x,
                top: hatAnchor.y,
                width: hatAnchor.w * 0.66,
                y: mukutY,
                rotate: mukutRot,
                opacity: mukutOpacity,
              }}
              onClick={handleMukutTap}
            >
              <motion.span className="br-mukut-in" animate={mukutCtrl}>
                <img
                  src={artSrc('mukut', undefined, isDesktop)}
                  alt=""
                  className="br-mukut-img"
                />
              </motion.span>
            </motion.button>
          )}
        </div>

        <div className="br-doors" aria-hidden="true">
          <motion.div className="br-door br-door-l" style={{ rotateY: leftDoorRot }}>
            <DoorLeaf side="l" />
            <motion.span className="br-door-shade" style={{ opacity: doorShadeOpacity }} />
          </motion.div>
          <motion.div className="br-door br-door-r" style={{ rotateY: rightDoorRot }}>
            <DoorLeaf side="r" />
            <motion.span className="br-door-shade" style={{ opacity: doorShadeOpacity }} />
          </motion.div>
        </div>

        <motion.div className="br-knock" style={{ opacity: knockHintOpacity, pointerEvents: knockHintPE }}>
          <BrassKnocker onKnock={openDoors} />
          <span>{data.knockerPrompt}</span>
        </motion.div>
      </div>
    </section>
  );
}
