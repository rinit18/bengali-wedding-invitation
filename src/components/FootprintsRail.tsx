import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const CHAPTER_STEPS = [
  { id: 'top', label: 'প্রচ্ছদ', threshold: 0.05, isLeft: true },
  { id: 'bride', label: 'কনে', threshold: 0.16, isLeft: false },
  { id: 'groom', label: 'বর', threshold: 0.29, isLeft: true },
  { id: 'story', label: 'গাঁটছড়া', threshold: 0.43, isLeft: false },
  { id: 'families', label: 'দুই বাড়ি', threshold: 0.58, isLeft: true },
  { id: 'events', label: 'অনুষ্ঠান', threshold: 0.74, isLeft: false },
  { id: 'letter', label: 'নিবেদন', threshold: 0.87, isLeft: true },
  { id: 'schedule', label: 'দিনক্ষণ', threshold: 0.95, isLeft: false },
];

function FootprintSVG({ isLeft }: { isLeft: boolean }) {
  return (
    <svg viewBox="0 0 24 40" className="footprint-svg" fill="none" aria-hidden="true">
      <path
        d={
          isLeft
            ? 'M12 14 C17 14 19 18 18 25 C17 32 16 38 11 38 C7 38 6 32 7 25 C8 18 8 14 12 14 Z'
            : 'M12 14 C7 14 5 18 6 25 C7 32 8 38 13 38 C17 38 18 32 17 25 C16 18 16 14 12 14 Z'
        }
        fill="currentColor"
      />
      <circle cx={isLeft ? 8 : 16} cy="8" r="2.8" fill="currentColor" />
      <circle cx="12" cy="6.5" r="2.2" fill="currentColor" />
      <circle cx={isLeft ? 15.5 : 8.5} cy="7.5" r="1.8" fill="currentColor" />
      <circle cx={isLeft ? 18.5 : 5.5} cy="9.5" r="1.5" fill="currentColor" />
      <circle cx={isLeft ? 21 : 3} cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function StepFootprint({
  step,
  progress,
}: {
  step: (typeof CHAPTER_STEPS)[number];
  progress: ReturnType<typeof useSpring>;
}) {
  const opacity = useTransform(progress, [step.threshold - 0.05, step.threshold], [0.25, 1]);
  const scale = useTransform(
    progress,
    [step.threshold - 0.05, step.threshold, step.threshold + 0.07],
    [0.9, 1.22, 1]
  );

  const jumpToSection = () => {
    const target = document.getElementById(step.id);
    if (!target) return;
    const vh = window.innerHeight;
    const extraMap: Record<string, number> = {
      bride: vh * 1.35,
      groom: vh * 1.22,
      story: vh * 1.95,
      families: vh * 1.15,
      events: vh * 0.9,
    };
    const extra = extraMap[step.id] ?? 0;
    window.scrollTo({ top: target.offsetTop + extra, behavior: 'smooth' });
  };

  return (
    <motion.button
      type="button"
      onClick={jumpToSection}
      aria-label={step.label}
      title={step.label}
      className={`footprint-step-item ${step.isLeft ? 'align-left' : 'align-right'}`}
      style={{ opacity, scale }}
    >
      <FootprintSVG isLeft={step.isLeft} />
    </motion.button>
  );
}

export function FootprintsRail() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 280, damping: 32 });

  return (
    <aside className="footprints-progress-rail" aria-label="পর্ব তালিকা">
      <div className="footprints-track">
        {CHAPTER_STEPS.map((step) => (
          <StepFootprint key={step.id} step={step} progress={smoothProgress} />
        ))}
      </div>
    </aside>
  );
}
