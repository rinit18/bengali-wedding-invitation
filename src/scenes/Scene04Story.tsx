import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { artSrc, INVITATION_DATA } from '../data/invitationData';
import { GoldFlourish, InkTitle } from '../components/ArtisanalMotifs';
import { useIsDesktop, useNearViewport, usePinProgress, useSegment } from '../utils/scrollHelpers';

const BEAT_START = 0.44;
const BEAT_END = 0.92;
const KNOT_ORIGIN = { x: 0.465, y: 0.655 };

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

function buildThreadPaths(origin: { x: number; y: number }, knots: { x: number; y: number }[]) {
  if (knots.length < 3) return [];
  const isVerticalList = Math.abs(knots[1].y - knots[0].y) > Math.abs(knots[1].x - knots[0].x);
  const first = isVerticalList
    ? `M${origin.x} ${origin.y} C${origin.x} ${origin.y + 140}, ${knots[0].x - 160} ${knots[0].y + 10}, ${knots[0].x} ${knots[0].y}`
    : `M${origin.x} ${origin.y} C${origin.x} ${origin.y + 70}, ${knots[0].x} ${knots[0].y - 60}, ${knots[0].x} ${knots[0].y}`;

  const segment = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    if (isVerticalList) {
      const dy = (b.y - a.y) / 3;
      return `M${a.x} ${a.y} C${a.x - 30} ${a.y + dy}, ${b.x - 30} ${b.y - dy}, ${b.x} ${b.y}`;
    }
    const dx = (b.x - a.x) / 3;
    return `M${a.x} ${a.y} C${a.x + dx} ${a.y + 22}, ${b.x - dx} ${b.y + 22}, ${b.x} ${b.y}`;
  };

  return [first, segment(knots[0], knots[1]), segment(knots[1], knots[2])];
}

function StoryBeatRow({
  progress,
  idx,
  total,
  label,
  text,
}: {
  progress: MotionValue<number>;
  idx: number;
  total: number;
  label: string;
  text: string;
}) {
  const slice = (BEAT_END - BEAT_START) / total;
  const start = BEAT_START + idx * slice;
  const end = start + slice;
  const isLast = idx === total - 1;

  const tie = useSegment(progress, start - 0.03, start + 0.02);
  const knotScale = useTransform(tie, [0, 0.7, 1], [0, 1.25, 1]);
  const knotOpacity = useTransform(tie, [0, 0.25], [0, 1]);
  const knotRot = useTransform(tie, [0, 1], [-120, 0]);

  const soloOpacity = useTransform(
    progress,
    isLast
      ? [start + 0.01, start + 0.05]
      : [start + 0.01, start + 0.05, end - 0.04, end - 0.01],
    isLast ? [0, 1] : [0, 1, 1, 0]
  );
  const listOpacity = useTransform(
    progress,
    isLast
      ? [0.28, start - 0.02, start + 0.02]
      : [0.28, start - 0.02, start + 0.02, end - 0.02, end + 0.02],
    isLast ? [0.42, 0.55, 1] : [0.42, 0.55, 1, 1, 0.82]
  );
  const sayY = useTransform(progress, [start - 0.02, start + 0.04], [14, 0]);

  return (
    <li className="st-beat">
      <span className="st-knot" data-knot="">
        <motion.svg
          viewBox="0 0 40 30"
          style={{ scale: knotScale, opacity: knotOpacity, rotate: knotRot }}
          aria-hidden="true"
        >
          <path d="M20 15 C 4 1, -1 27, 20 15 C 36 1, 41 27, 20 15" fill="var(--sindoor)" />
          <path
            d="M20 15 L 12 28 M20 15 L 27 28"
            stroke="var(--sindoor)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="15" r="4.2" fill="#6E0F14" />
        </motion.svg>
      </span>
      <motion.div className="st-beat-say st-beat-solo" style={{ opacity: soloOpacity, y: sayY }}>
        <h3>{label}</h3>
        <p>{text}</p>
      </motion.div>
      <motion.div className="st-beat-say st-beat-list" style={{ opacity: listOpacity }}>
        <h3>{label}</h3>
        <p>{text}</p>
      </motion.div>
    </li>
  );
}

export function Scene04Story() {
  const data = INVITATION_DATA.story;
  const sectionRef = useRef<HTMLElement>(null);
  const near = useNearViewport(sectionRef);
  const worldRef = useRef<HTMLDivElement>(null);
  const coupleBoxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const isDesktop = useIsDesktop();
  const [paths, setPaths] = useState<string[]>([]);

  const p = usePinProgress(sectionRef);
  const curtainProg = useSegment(p, 0.03, 0.36);
  const curtainScaleX = useTransform(curtainProg, [0, 1], [1, 0.14]);
  const curtainSkew = useTransform(curtainProg, [0, 0.5, 1], [0, 2.5, 0]);
  const curtainSkewNeg = useTransform(curtainSkew, (v) => -v);

  const coupleScale = useTransform(p, [0, 0.45], [1.12, 1]);
  const spotOpacity = useTransform(curtainProg, [0.4, 1], [0, 1]);
  const titleProg = useSegment(p, 0.24, 0.42);
  const flourishProg = useSegment(p, 0.32, 0.46);
  const subOpacity = useTransform(p, [0.38, 0.5], [0, 1]);

  const total = data.beats.length;
  const slice = (BEAT_END - BEAT_START) / total;
  const path1 = useSegment(p, 0.36, BEAT_START);
  const path2 = useSegment(p, BEAT_START + slice - 0.07, BEAT_START + slice - 0.01);
  const path3 = useSegment(p, BEAT_START + 2 * slice - 0.07, BEAT_START + 2 * slice - 0.01);
  const threadProgress = [path1, path2, path3];

  useEffect(() => {
    const compute = () => {
      const world = worldRef.current;
      const couple = coupleBoxRef.current;
      if (!world || !couple) return;
      const knots = Array.from(world.querySelectorAll<HTMLElement>('[data-knot]'))
        .filter((k) => k.offsetParent)
        .map((k) => measureOffset(k, world))
        .filter((pt): pt is { x: number; y: number } => Boolean(pt));
      const origin = {
        x: couple.offsetLeft + couple.offsetWidth * KNOT_ORIGIN.x,
        y: couple.offsetTop + couple.offsetHeight * KNOT_ORIGIN.y,
      };
      setPaths(buildThreadPaths(origin, knots));
    };
    compute();
    document.fonts?.ready.then(compute);
    const ro = new ResizeObserver(compute);
    if (worldRef.current) ro.observe(worldRef.current);
    if (coupleBoxRef.current) ro.observe(coupleBoxRef.current);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="pin st"
      data-near={near ? '' : undefined}
      style={{ ['--len' as string]: 3.0 }}
    >
      <div className="pin-stage">
        <div className="st-world" ref={worldRef}>
          <motion.span className="st-spot" style={{ opacity: spotOpacity }} aria-hidden="true" />

          <div className="st-head">
            <InkTitle progress={titleProg}>{data.title}</InkTitle>
            <GoldFlourish progress={flourishProg} className="st-flourish" />
            <motion.p className="st-sub" style={{ opacity: subOpacity }}>
              {data.line}
            </motion.p>
          </div>

          <motion.div ref={coupleBoxRef} className="st-couple has-art" style={{ scale: coupleScale }}>
            <img
              src={artSrc('gaatchhora', undefined, isDesktop)}
              alt={data.title}
              className="st-img"
            />
          </motion.div>

          <svg className="st-thread" aria-hidden="true">
            {paths.map((d, i) => (
              <motion.path key={i} d={d} style={{ pathLength: threadProgress[i] }} />
            ))}
          </svg>

          <ol className="st-beats" ref={listRef}>
            {data.beats.map((b, i) => (
              <StoryBeatRow
                key={b.label}
                progress={p}
                idx={i}
                total={total}
                label={b.label}
                text={b.text}
              />
            ))}
          </ol>
        </div>

        <div className="st-foot" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, idx) => (
            <span
              key={idx}
              className="st-lamp"
              style={{ ['--d' as string]: `${((idx * 0.37) % 1.3).toFixed(2)}s` }}
            >
              <span className="st-flame" />
            </span>
          ))}
        </div>

        <div className="st-curtains" aria-hidden="true">
          <motion.div
            className="st-curtain st-curtain-l"
            style={{ scaleX: curtainScaleX, skewY: curtainSkew }}
          >
            <span className="st-cloth" />
          </motion.div>
          <motion.div
            className="st-curtain st-curtain-r"
            style={{ scaleX: curtainScaleX, skewY: curtainSkewNeg }}
          >
            <span className="st-cloth" />
          </motion.div>
        </div>

        <div className="st-valance-wrap" aria-hidden="true">
          <div className="st-valance" />
        </div>
      </div>
    </section>
  );
}
