import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionStyle } from 'framer-motion';
import { PageId } from '../types/wedding';

export type RevealStyle =
  | 'fade-rise'
  | 'silk-unfurl'
  | 'iris-bloom'
  | 'drift-left'
  | 'paper-peel';

interface RevealSectionProps {
  id: PageId;
  reveal?: RevealStyle;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Seamless Full-Bleed Editorial Book Section:
 * Replaces boxy rounded rectangle frames and 3D-clipping CSS transforms
 * with smooth spring-damped entrance transitions & silky section feathering.
 */
export const RevealSection: React.FC<RevealSectionProps> = ({
  id,
  reveal = 'fade-rise',
  dark = false,
  className = '',
  style,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 22%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  const contentOpacity = useTransform(smooth, [0, 0.45], [0.65, 1]);
  const contentY = useTransform(smooth, [0, 1], [28, 0]);
  const contentScale = useTransform(smooth, [0, 1], [0.98, 1]);
  const driftX = useTransform(smooth, [0, 1], [32, 0]);

  let motionStyle: MotionStyle = {
    opacity: contentOpacity,
    scale: contentScale,
    y: contentY,
  };

  if (reveal === 'drift-left') {
    motionStyle = { opacity: contentOpacity, scale: contentScale, x: driftX };
  }

  return (
    <section
      id={`section-${id}`}
      ref={ref}
      style={style}
      className={`relative min-h-svh w-full overflow-x-clip flex flex-col justify-center
        ${dark ? 'text-[#FAF5EE]' : 'text-[#240B0E]'}
        ${className}`}
    >
      {/* Top hairline ornament separating chapters gracefully */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/55 to-transparent"
      />

      <motion.div style={motionStyle} className="relative z-10 w-full">
        {children}
      </motion.div>
    </section>
  );
};

export const ScrollGateSection = RevealSection;
