import { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { artSrc, INVITATION_DATA, triggerPetalShower } from '../data/invitationData';
import { smoothGlideTo, useGuestName, useIsDesktop, useNearViewport, usePinProgress } from '../utils/scrollHelpers';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene01Opening() {
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const sealRef = useRef<HTMLButtonElement>(null);
  const guestName = useGuestName();
  const isDesktop = useIsDesktop();
  const data = INVITATION_DATA.opening;

  const p = usePinProgress(sectionRef);
  const bgScale = useTransform(p, [0, 0.6], [1, 1.12]);
  const fadeOutEarly = useTransform(p, [0, 0.22], [1, 0]);
  const pulseFade = useTransform(p, [0, 0.08], [1, 0]);
  const leftPropX = useTransform(p, [0, 0.34], ['0%', '-60%']);
  const rightPropX = useTransform(p, [0, 0.34], ['0%', '60%']);
  const propsY = useTransform(p, [0, 0.34], ['0%', '30%']);
  const leftPropRot = useTransform(p, [0, 0.34], [0, -14]);
  const rightPropRot = useTransform(p, [0, 0.34], [0, 14]);

  const floodScale = useTransform(p, [0.1, 0.6], [0.92, 11.5], { ease: (t) => t * t });
  const ringRotate = useTransform(p, [0, 1], [0, 140]);
  const namesColor = useTransform(p, [0.28, 0.48], ['#6E0F14', '#E9C982']);
  const dateColor = useTransform(p, [0.28, 0.48], ['#5B3A2C', '#FFF1D6']);
  const guestColor = useTransform(p, [0.28, 0.48], ['#B3121B', '#FFF1D6']);
  const endHintOpacity = useTransform(p, [0.64, 0.78], [0, 1]);
  const tapHintPE = useTransform(p, (v) => (v < 0.12 ? 'auto' : 'none'));
  const endHintPE = useTransform(p, (v) => (v >= 0.64 ? 'auto' : 'none'));

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [9, -9]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(pointerX, [-1, 1], [-11, 11]), { stiffness: 120, damping: 18 });
  const parallaxL = useSpring(useTransform(pointerX, [-1, 1], [14, -14]), { stiffness: 80, damping: 20 });
  const parallaxR = useSpring(useTransform(pointerX, [-1, 1], [-14, 14]), { stiffness: 80, damping: 20 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
    pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const handleSealClick = () => {
    window.dispatchEvent(new CustomEvent('gaatchhora:play-music'));
    const rect = sealRef.current?.getBoundingClientRect();
    if (rect) triggerPetalShower(rect.left + rect.width / 2, rect.top + rect.height / 2, 34, 1.1);
    const el = sectionRef.current;
    if (!el) return;
    const dest = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.72;
    smoothGlideTo(dest, 2.2);
  };

  const scrollToBride = () => {
    const brideEl = document.getElementById('bride');
    if (brideEl) smoothGlideTo(brideEl, 1.5);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="pin op"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: 2.15 }}
    >
      <div className="pin-stage" onPointerMove={handlePointerMove}>
        <motion.div className="op-bgwrap" style={{ scale: bgScale }}>
          <img
            src={artSrc('opening-bg', 'opening-bg-wide', isDesktop)}
            alt=""
            className="op-bg"
            loading="eager"
          />
        </motion.div>

        <div className="op-inner">
          <motion.p className="op-blessing" style={{ opacity: fadeOutEarly }}>
            <motion.span
              initial={{ opacity: 0.9, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {data.blessing}
            </motion.span>
          </motion.p>

          {guestName && (
            <motion.p
              className="op-guest"
              style={{ color: guestColor }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
            >
              {data.guestLine.replace('{name}', guestName)}
            </motion.p>
          )}

          <motion.div className="op-tilt" style={{ rotateX: tiltX, rotateY: tiltY }}>
            <motion.button
              ref={sealRef}
              type="button"
              className="op-seal"
              onClick={handleSealClick}
              aria-label={`${data.titleTop} ${data.titleBottom}`}
              whileTap={{ scale: 0.96 }}
            >
              <motion.span className="op-flood" aria-hidden="true" style={{ scale: floodScale }} />

              <motion.span className="op-ring-turn" aria-hidden="true" style={{ rotate: ringRotate }}>
                <motion.span
                  className="op-ring"
                  initial={{ opacity: 0.75, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{
                    opacity: { duration: 0.8, ease: EASE },
                    scale: { duration: 1.0, ease: EASE },
                    rotate: { duration: 120, ease: 'linear', repeat: Infinity },
                  }}
                />
              </motion.span>

              <motion.span
                className="op-disc"
                aria-hidden="true"
                initial={{ opacity: 0.85, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <img
                  src={artSrc('sindoor-disc', undefined, isDesktop)}
                  alt=""
                  className="img"
                  loading="eager"
                />
              </motion.span>

              <span className="op-title">
                <motion.span
                  initial={{ opacity: 0.9, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {data.titleTop}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0.9, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                >
                  {data.titleBottom}
                </motion.span>
              </span>

              <motion.span className="op-pulse" aria-hidden="true" style={{ opacity: pulseFade }} />
            </motion.button>
          </motion.div>

          <motion.div
            className="op-names"
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            <motion.h1 style={{ color: namesColor }}>{data.names}</motion.h1>
            <motion.p style={{ color: dateColor }}>{data.dateBn}</motion.p>
          </motion.div>
        </div>

        <motion.div
          className="op-prop op-prop-l"
          style={{ x: leftPropX, y: propsY, rotate: leftPropRot }}
        >
          <motion.div style={{ x: parallaxL }}>
            <motion.div
              initial={{ opacity: 0.9, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            >
              <img
                src={artSrc('props-left', undefined, isDesktop)}
                alt=""
                className="img w-full h-auto"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="op-prop op-prop-r"
          style={{ x: rightPropX, y: propsY, rotate: rightPropRot }}
        >
          <motion.div style={{ x: parallaxR }}>
            <motion.div
              initial={{ opacity: 0.9, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            >
              <img
                src={artSrc('props-right', undefined, isDesktop)}
                alt=""
                className="img w-full h-auto"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="op-hint"
          onClick={handleSealClick}
          style={{ opacity: pulseFade, pointerEvents: tapHintPE }}
        >
          <span>{data.tapHint}</span>
        </motion.button>

        <motion.button
          type="button"
          className="op-hint op-hint-end"
          onClick={scrollToBride}
          style={{ opacity: endHintOpacity, pointerEvents: endHintPE }}
        >
          <span>{data.hint}</span>
          <motion.svg
            viewBox="0 0 20 28"
            aria-hidden="true"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M10 2v22M3 17l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </div>
    </section>
  );
}
