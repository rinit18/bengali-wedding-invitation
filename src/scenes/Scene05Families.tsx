import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useTransform, type MotionValue } from 'framer-motion';
import {
  artSrc,
  INVITATION_DATA,
  triggerButterflyVisit,
  triggerPetalShower,
} from '../data/invitationData';
import { GoldFlourish, InkTitle, TuniLights } from '../components/ArtisanalMotifs';
import { CuteKuloSVG, CuteMishtirHandiSVG } from '../components/BengaliArtifacts';
import {
  smoothGlideTo,
  useIsDesktop,
  useNearViewport,
  usePinProgress,
  useSegment,
} from '../utils/scrollHelpers';

function measureOffset(el: HTMLElement, box: HTMLElement) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let cur: HTMLElement | null = el;
  while (cur && cur !== box) {
    x += cur.offsetLeft;
    y += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return cur === box ? { x, y } : null;
}

function FamilyWalkStand({
  side,
  progress,
  onTap,
  isDesktop,
}: {
  side: 'bride' | 'groom';
  progress: MotionValue<number>;
  onTap: (s: 'bride' | 'groom', btn: HTMLButtonElement | null) => void;
  isDesktop: boolean;
}) {
  const data = INVITATION_DATA.families;
  const caption = side === 'bride' ? data.brideCaption : data.groomCaption;
  const fields = data[side];
  const btnRef = useRef<HTMLButtonElement>(null);
  const hopCtrl = useAnimation();

  const dir = side === 'bride' ? -1 : 1;
  const [start, end] = side === 'bride' ? [0.05, 0.3] : [0.11, 0.36];
  const walkSeg = useSegment(progress, start, end);

  const slideX = useTransform(walkSeg, [0, 1], [`${dir * 60}vw`, '0vw']);
  const fadeOpacity = useTransform(walkSeg, [0, 0.14], [0, 1]);
  const walkBobY = useTransform(walkSeg, (v) => -Math.abs(Math.sin(v * Math.PI * 4)) * 18 * (1 - v));
  const walkTilt = useTransform(walkSeg, (v) => Math.sin(v * Math.PI * 4) * 4 * (1 - v));

  const ringSeg = useSegment(progress, end - 0.06, end + 0.08);
  const ringScale = useTransform(ringSeg, [0, 1], [0.35, 1]);
  const ringOpacity = useTransform(ringSeg, [0, 0.45], [0, 0.92]);
  const ringRot = useTransform(
    [ringSeg, progress],
    ([rs, pr]: number[]) => (1 - rs) * -150 + pr * 70 * -dir
  );
  const capOpacity = useTransform(ringSeg, [0.5, 1], [0, 1]);

  const hop = () => {
    hopCtrl.start({ y: [0, -26, 0, -9, 0], transition: { duration: 0.75, ease: 'easeOut' } });
  };

  return (
    <motion.div className={`fm-fam fm-fam-${side}`} style={{ x: slideX, opacity: fadeOpacity }}>
      <div className="fm-stand">
        <span className="fm-ground" aria-hidden="true">
          <motion.span
            className="fm-ring"
            style={{ scale: ringScale, rotate: ringRot, opacity: ringOpacity }}
          >
            <img
              src={artSrc('alpona-ring', undefined, isDesktop)}
              alt=""
              className="fm-ring-img"
            />
          </motion.span>
        </span>

        <motion.div className="fm-walk" style={{ y: walkBobY, rotate: walkTilt }}>
          <motion.button
            ref={btnRef}
            type="button"
            className="fm-figure"
            aria-label={fields[0].value}
            animate={hopCtrl}
            onPointerEnter={hop}
            onClick={() => {
              hop();
              onTap(side, btnRef.current);
            }}
          >
            <img
              src={artSrc(`family-${side}`, undefined, isDesktop)}
              alt={fields[0].value}
              className="fm-img"
            />
          </motion.button>
        </motion.div>
        <span className="fm-hand" data-hand="" />
      </div>
      <motion.p className="fm-caption" style={{ opacity: capOpacity }}>
        {caption}
      </motion.p>
    </motion.div>
  );
}

function FamilyDetailsList({
  side,
  opacity,
}: {
  side: 'bride' | 'groom';
  opacity: MotionValue<number>;
}) {
  const rows = INVITATION_DATA.families[side];
  const y = useTransform(opacity, [0, 1], [12, 0]);

  return (
    <motion.dl className={`fm-names fm-names-${side}`} style={{ opacity, y }}>
      {rows.map((row, idx) => {
        const spaceIdx = idx === 0 ? row.value.indexOf(' ') : -1;
        return (
          <div key={row.label} className={`fm-row ${idx === 0 ? 'fm-row-main' : ''}`}>
            <dt>{row.label}</dt>
            {' '}
            <dd>
              {spaceIdx > 0 ? (
                <>
                  <span className="fm-honor">{row.value.slice(0, spaceIdx)}</span>{' '}
                  <span className="fm-given">{row.value.slice(spaceIdx + 1)}</span>
                </>
              ) : (
                row.value
              )}
            </dd>
          </div>
        );
      })}
    </motion.dl>
  );
}

export function Scene05Families() {
  const data = INVITATION_DATA.families;
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const worldRef = useRef<HTMLDivElement>(null);
  const knotRef = useRef<HTMLSpanElement>(null);
  const ghatRef = useRef<HTMLButtonElement>(null);
  const burstDoneRef = useRef(false);
  const isDesktop = useIsDesktop();

  const p = usePinProgress(sectionRef);
  const [cordData, setCordData] = useState<{ d: string; mid: { x: number; y: number } } | null>(null);

  const toranY = useTransform(p, [0, 0.12], ['-24%', '0%']);
  const alponaRot = useTransform(p, [0, 1], [-20, 40]);
  const lightsOpacity = useTransform(p, [0.08, 0.2], [0, 1]);
  const titleProg = useSegment(p, 0.02, 0.14);
  const flourishProg = useSegment(p, 0.08, 0.18);
  const subOpacity = useTransform(p, [0.12, 0.2], [0, 1]);

  const ghatSeg = useSegment(p, 0.34, 0.45);
  const ghatScale = useTransform(ghatSeg, [0, 0.7, 1], [0, 1.12, 1]);
  const ghatY = useTransform(ghatSeg, [0, 1], [28, 0]);
  const propsOpacity = useTransform(p, [0.16, 0.3], [0, 1]);
  const propsY = useTransform(p, [0.16, 0.3], [28, 0]);

  const cordSeg = useSegment(p, 0.46, 0.6);
  const knotSeg = useSegment(p, 0.58, 0.68);
  const knotScale = useTransform(knotSeg, [0, 0.7, 1], [0, 1.3, 1]);
  const knotRot = useTransform(knotSeg, [0, 1], [-140, 0]);

  const desktopBrideOp = useTransform(p, [0.22, 0.32], [0, 1]);
  const desktopGroomOp = useTransform(p, [0.28, 0.38], [0, 1]);
  const mobileBrideOp = useTransform(p, [0.2, 0.27, 0.54, 0.58], [0, 1, 1, 0]);
  const mobileGroomOp = useTransform(p, [0.62, 0.69], [0, 1]);

  useEffect(() => {
    const compute = () => {
      const world = worldRef.current;
      if (!world) return;
      const hands = Array.from(world.querySelectorAll<HTMLElement>('[data-hand]'))
        .map((el) => measureOffset(el, world))
        .filter((pt): pt is { x: number; y: number } => Boolean(pt));
      if (hands.length < 2) return;
      const [l, r] = hands;
      const dx = r.x - l.x;
      const sag = dx * 0.16;
      setCordData({
        d: `M${l.x} ${l.y} C${l.x + dx / 3} ${l.y + sag}, ${r.x - dx / 3} ${r.y + sag}, ${r.x} ${r.y}`,
        mid: { x: (l.x + r.x) / 2, y: (l.y + r.y) / 2 + sag * 0.75 },
      });
    };
    compute();
    document.fonts?.ready.then(compute);
    const ro = new ResizeObserver(compute);
    if (worldRef.current) ro.observe(worldRef.current);
    return () => ro.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    return knotSeg.on('change', (v) => {
      if (v > 0.96 && !burstDoneRef.current) {
        burstDoneRef.current = true;
        const r = knotRef.current?.getBoundingClientRect();
        if (r) triggerPetalShower(r.left + r.width / 2, r.top + r.height / 2, 28, 0.95);
      }
      if (v < 0.35) burstDoneRef.current = false;
    });
  }, [knotSeg]);

  const handleFamilyTap = (side: 'bride' | 'groom', btn: HTMLButtonElement | null) => {
    const r = btn?.getBoundingClientRect();
    if (r) triggerButterflyVisit(r.left + r.width / 2, r.top + r.height * 0.25);
    if (isDesktop) return;
    const el = sectionRef.current;
    if (!el) return;
    const dest = el.offsetTop + (el.offsetHeight - window.innerHeight) * (side === 'bride' ? 0.44 : 0.78);
    smoothGlideTo(dest, 1.3);
  };

  const handleGhatTap = () => {
    const r = ghatRef.current?.getBoundingClientRect();
    if (r) triggerPetalShower(r.left + r.width / 2, r.top + r.height * 0.15, 20, 0.75);
  };

  return (
    <section
      ref={sectionRef}
      id="families"
      className="pin fm"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: 2.45 }}
    >
      <div className="pin-stage">
        <motion.div className="alpona-mark fm-mark" style={{ rotate: alponaRot }} aria-hidden="true" />
        <span className="fm-floor" aria-hidden="true" />

        <motion.div className="fm-lights-wrap" style={{ opacity: lightsOpacity }} aria-hidden="true">
          <TuniLights className="fm-lights fm-lights-phone" rows={1} swags={2} count={9} sag={28} />
          <TuniLights className="fm-lights fm-lights-desk" rows={1} swags={4} count={11} sag={26} />
        </motion.div>

        <motion.div className="fm-toran" style={{ y: toranY }} aria-hidden="true">
          <img
            src={artSrc('toran', 'toran-wide', isDesktop)}
            alt=""
            className="fm-toran-img"
            loading="eager"
          />
        </motion.div>

        <div className="fm-world" ref={worldRef}>
          <div className="fm-head">
            <InkTitle progress={titleProg} className="fm-title">
              {data.title}
            </InkTitle>
            <GoldFlourish progress={flourishProg} className="fm-flourish" />
            <motion.p className="fm-sub" style={{ opacity: subOpacity }}>
              {data.line}
            </motion.p>
          </div>

          <div className="fm-court">
            <FamilyDetailsList side="bride" opacity={isDesktop ? desktopBrideOp : mobileBrideOp} />
            <FamilyWalkStand side="bride" progress={p} onTap={handleFamilyTap} isDesktop={isDesktop} />

            <motion.button
              ref={ghatRef}
              type="button"
              className="fm-ghat"
              style={{ scale: ghatScale, y: ghatY }}
              onClick={handleGhatTap}
              aria-label="মঙ্গলঘট"
            >
              <img
                src={artSrc('mangal-ghat', undefined, isDesktop)}
                alt=""
                className="fm-ghat-img"
              />
            </motion.button>

            <FamilyWalkStand side="groom" progress={p} onTap={handleFamilyTap} isDesktop={isDesktop} />
            <FamilyDetailsList side="groom" opacity={isDesktop ? desktopGroomOp : mobileGroomOp} />
          </div>

          {cordData && (
            <>
              <svg className="fm-thread" aria-hidden="true">
                <defs>
                  <mask id="fm-thread-mask" maskUnits="userSpaceOnUse">
                    <motion.path
                      d={cordData.d}
                      stroke="#fff"
                      strokeWidth="14"
                      fill="none"
                      style={{ pathLength: cordSeg }}
                    />
                  </mask>
                </defs>
                <g mask="url(#fm-thread-mask)">
                  <path className="fm-cord" d={cordData.d} />
                  <path className="fm-cord-twist" d={cordData.d} />
                </g>
              </svg>
              <motion.span
                ref={knotRef}
                className="fm-knot"
                style={{
                  left: cordData.mid.x,
                  top: cordData.mid.y,
                  scale: knotScale,
                  rotate: knotRot,
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 40 30">
                  <path
                    d="M20 15 C 4 1, -1 27, 20 15 C 36 1, 41 27, 20 15"
                    fill="#F2C14E"
                    stroke="#B3121B"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M20 15 L 12 28 M20 15 L 27 28"
                    stroke="#F2C14E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="15" r="4.4" fill="#B3121B" />
                </svg>
              </motion.span>
            </>
          )}
        </div>

        <motion.div className="fm-props" style={{ opacity: propsOpacity, y: propsY }} aria-hidden="true">
          <div className="fm-prop fm-prop-l">
            <CuteKuloSVG className="w-full h-auto" />
          </div>
          <div className="fm-prop fm-prop-r">
            <CuteMishtirHandiSVG className="w-full h-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
