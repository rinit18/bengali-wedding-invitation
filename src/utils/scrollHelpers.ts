import { useEffect, useState, type RefObject } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: '65% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return near;
}

export function usePinProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  return scrollYProgress;
}

export function useSegment(progress: MotionValue<number>, start: number, end: number) {
  return useTransform(progress, [start, end], [0, 1], { clamp: true });
}

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

export function useGuestName(): string | null {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    try {
      const to = new URLSearchParams(window.location.search).get('to');
      if (to) {
        const clean = decodeURIComponent(to).trim();
        if (clean.length > 0) setName(clean.slice(0, 40));
      }
    } catch {
      // Ignore invalid URI components
    }
  }, []);
  return name;
}

export function useHatAnchor(
  spanRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>
) {
  const [pos, setPos] = useState<{ x: number; y: number; w: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = spanRef.current;
      const box = containerRef.current;
      if (!el || !box) return;
      let left = 0;
      let top = 0;
      let cur: HTMLElement | null = el;
      while (cur && cur !== box) {
        left += cur.offsetLeft;
        top += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      if (cur === box && el.offsetWidth > 0) {
        setPos({ x: left + el.offsetWidth / 2, y: top, w: el.offsetWidth });
      }
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [spanRef, containerRef]);

  return pos;
}

export function smoothGlideTo(targetYOrEl: number | HTMLElement, durationSec = 2.0) {
  const docEl = document.documentElement;
  const startY = window.scrollY;
  const rawDest =
    typeof targetYOrEl === 'number'
      ? targetYOrEl
      : startY + targetYOrEl.getBoundingClientRect().top;
  const dest = Math.max(0, Math.min(rawDest, docEl.scrollHeight - window.innerHeight));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, dest);
    return;
  }

  docEl.classList.add('is-gliding');
  let raf = 0;
  const startTime = performance.now();

  const stop = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('touchstart', stop);
    docEl.classList.remove('is-gliding');
  };

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / (durationSec * 1000));
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    window.scrollTo(0, startY + (dest - startY) * eased);
    if (t < 1) raf = requestAnimationFrame(step);
    else stop();
  };

  window.addEventListener('touchstart', stop, { passive: true });
  raf = requestAnimationFrame(step);
}
