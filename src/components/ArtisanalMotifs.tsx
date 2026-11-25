import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { triggerPetalShower } from '../data/invitationData';

const EASE = [0.22, 1, 0.36, 1] as const;

function FlourishPath({
  d,
  strokeWidth,
  progress,
  inView,
}: {
  d: string;
  strokeWidth: string;
  progress?: MotionValue<number>;
  inView?: boolean;
}) {
  if (progress) {
    return (
      <motion.path
        d={d}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: progress }}
      />
    );
  }
  if (inView) {
    return (
      <motion.path
        d={d}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 1.15, ease: EASE }}
      />
    );
  }
  return (
    <path
      d={d}
      strokeWidth={strokeWidth}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function GoldFlourish({
  progress,
  className = '',
  inView,
}: {
  progress?: MotionValue<number>;
  className?: string;
  inView?: boolean;
}) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 260 28" aria-hidden="true">
      <FlourishPath
        progress={progress}
        inView={inView}
        strokeWidth="1.4"
        d="M118 14 C 108 14, 104 6, 96 8 C 89 10, 91 19, 98 18 C 103 17, 102 11, 97 12"
      />
      <FlourishPath progress={progress} inView={inView} strokeWidth="1.2" d="M92 14 L 14 14" />
      <FlourishPath
        progress={progress}
        inView={inView}
        strokeWidth="1.2"
        d="M60 14 C 52 6, 42 6, 36 12"
      />
      <FlourishPath
        progress={progress}
        inView={inView}
        strokeWidth="1.4"
        d="M142 14 C 152 14, 156 6, 164 8 C 171 10, 169 19, 162 18 C 157 17, 158 11, 163 12"
      />
      <FlourishPath progress={progress} inView={inView} strokeWidth="1.2" d="M168 14 L 246 14" />
      <FlourishPath
        progress={progress}
        inView={inView}
        strokeWidth="1.2"
        d="M200 14 C 208 6, 218 6, 224 12"
      />
      <motion.g style={progress ? { opacity: progress } : undefined}>
        <path d="M130 5 L 136 14 L 130 23 L 124 14 Z" fill="currentColor" />
        <circle cx="10" cy="14" r="2" fill="currentColor" />
        <circle cx="250" cy="14" r="2" fill="currentColor" />
      </motion.g>
    </svg>
  );
}

export function InkTitle({
  children,
  progress,
  className = '',
  as = 'h2',
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const clipPath = useTransform(progress, (v) =>
    v >= 0.99 ? 'none' : `inset(-30% ${(1 - v) * 112 - 10}% -30% -10%)`
  );
  const y = useTransform(progress, [0, 1], [14, 0]);
  const Tag = motion[as];

  return (
    <Tag className={`ink-title ${className}`} style={{ WebkitClipPath: clipPath, clipPath, y }}>
      {children}
    </Tag>
  );
}

const DELAYS: [string, string][] = [
  ['0s', '2.1s'],
  ['-0.9s', '2.9s'],
  ['-1.7s', '2.5s'],
];
const BULB_PALETTE = ['#FFD36B', '#FFF1C2', '#FFB347', '#FFF1C2', '#FF6F5E'];

function quadPoint(t: number, x0: number, x1: number, y: number, sag: number) {
  const cx = (x0 + x1) / 2;
  const cy = y + sag * 2;
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    y: mt * mt * y + 2 * mt * t * cy + t * t * y,
  };
}

export function TuniLights({
  swags = 3,
  count = 9,
  rows = 1,
  sag = 22,
  className = '',
  style,
}: {
  swags?: number;
  count?: number;
  rows?: number;
  sag?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const paths: string[] = [];
  const bulbs: { x: number; y: number; c: string }[] = [];
  let idx = 0;

  for (let r = 0; r < rows; r++) {
    const y = 4 + r * (rows > 1 ? (92 - sag * 1.1) / (rows - 1) : 0);
    const offset = r % 2 ? 0.5 : 0;
    const span = 100 / swags;
    for (let s = -1; s < swags + 1; s++) {
      const x0 = (s + offset) * span;
      const x1 = x0 + span;
      if (x1 <= 0.1 || x0 >= 99.9) continue;
      paths.push(`M${x0} ${y} Q${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}`);
      for (let b = 0; b < count; b++) {
        const pt = quadPoint((b + 0.5) / count, x0, x1, y, sag);
        if (pt.x < 0.5 || pt.x > 99.5) continue;
        bulbs.push({ x: pt.x, y: pt.y, c: BULB_PALETTE[idx % BULB_PALETTE.length] });
        idx++;
      }
    }
  }

  return (
    <div className={`tuni ${className}`} style={style} aria-hidden="true">
      <svg className="tuni-wires" viewBox="0 0 100 100" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {DELAYS.map(([delay, dur], gIdx) => (
        <span
          key={gIdx}
          className="tuni-group"
          style={{ animationDelay: delay, animationDuration: dur }}
        >
          {bulbs.map((b, bIdx) =>
            bIdx % DELAYS.length === gIdx ? (
              <span
                key={bIdx}
                className="tuni-bulb"
                style={{ left: `${b.x}%`, top: `${b.y}%`, ['--c' as string]: b.c }}
              />
            ) : null
          )}
        </span>
      ))}
    </div>
  );
}

/** Floating Interactive Golden Prajapati Butterfly using real /img/prajapati.webp split wings */
export function PrajapatiButterfly() {
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const leftWingRot = useMotionValue(0);
  const rightWingRot = useMotionValue(0);
  const floatY = useMotionValue(0);
  const phaseRef = useRef(0);
  const speedRef = useRef(0.006);
  const [visible, setVisible] = useState(false);

  const btnCtrl = useAnimation();
  const flightCtrl = useAnimation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldShow = latest > window.innerHeight * 0.85;
    if (shouldShow !== visible) setVisible(shouldShow);
  });

  useEffect(() => {
    const onVisit = (ev: Event) => {
      const { x, y } = (ev as CustomEvent<{ x: number; y: number }>).detail;
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect || busyRef.current) return;
      busyRef.current = true;
      setVisible(true);
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2) - 24;
      speedRef.current = 0.045;
      window.setTimeout(() => triggerPetalShower(x, y - 16, 16, 0.7), 1200);
      flightCtrl
        .start({
          x: [0, dx * 0.45, dx + 28, dx, dx - 28, dx, 0],
          y: [0, dy * 0.45 - 100, dy - 20, dy - 46, dy - 20, dy, 0],
          rotate: [0, -18, 10, -6, 8, -4, 0],
          transition: { duration: 4.0, times: [0, 0.22, 0.36, 0.46, 0.56, 0.66, 1], ease: 'easeInOut' },
        })
        .then(() => {
          busyRef.current = false;
        });
    };
    window.addEventListener('gaatchhora:visit', onVisit);
    return () => window.removeEventListener('gaatchhora:visit', onVisit);
  }, [flightCtrl]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(40, now - last);
      last = now;
      if (!visible) return;
      const targetSpeed = 0.006 + Math.min(1, Math.abs(scrollVel.get()) / 2400) * 0.03;
      speedRef.current += (targetSpeed - speedRef.current) * 0.08;
      phaseRef.current += dt * speedRef.current;
      const wave = Math.sin(phaseRef.current);
      const deg = 8 + (wave > 0 ? wave * 60 : wave * 18);
      leftWingRot.set(deg);
      rightWingRot.set(-deg);
      floatY.set(Math.sin(phaseRef.current * 0.2) * 5);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, scrollVel, leftWingRot, rightWingRot, floatY]);

  const handleTap = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) triggerPetalShower(rect.left + rect.width / 2, rect.top + rect.height / 2, 14, 0.6);
    speedRef.current = 0.045;
    btnCtrl.start({
      x: [0, -70, -130, -50, 0],
      y: [0, -120, -55, -160, 0],
      rotate: [0, -24, 12, -10, 0],
      transition: { duration: 2.2, ease: 'easeInOut' },
    });
  };

  return (
    <motion.div
      ref={wrapRef}
      className="pj"
      initial={false}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.65 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <motion.div animate={flightCtrl}>
        <motion.button
          ref={btnRef}
          type="button"
          className="pj-btn"
          aria-label="প্রজাপতি"
          onClick={handleTap}
          animate={btnCtrl}
          style={{ y: floatY }}
        >
          <span className="pj-body">
            <motion.span className="pj-wing pj-wing-l" style={{ rotateY: leftWingRot }} />
            <motion.span className="pj-wing pj-wing-r" style={{ rotateY: rightWingRot }} />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
