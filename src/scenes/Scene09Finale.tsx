import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { animate, motion, useInView, useMotionValue } from 'framer-motion';
import {
  artSrc,
  INVITATION_DATA,
  triggerFullShower,
  triggerPetalShower,
} from '../data/invitationData';
import { GoldFlourish, InkTitle } from '../components/ArtisanalMotifs';
import { useIsDesktop } from '../utils/scrollHelpers';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene09Finale() {
  const data = INVITATION_DATA.footer;
  const isDesktop = useIsDesktop();
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { amount: 0.45, once: true });
  const titleProg = useMotionValue(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!inView) return;
    triggerFullShower(44);
    const controls = animate(titleProg, 1, { duration: 1.15, ease: EASE });
    return () => controls.stop();
  }, [inView, titleProg]);

  const handleShower = (e: MouseEvent<HTMLButtonElement>) => {
    triggerPetalShower(e.clientX, e.clientY, 28, 1.15);
    triggerFullShower(38);
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.shareText,
          text: data.shareText,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(`${data.shareText}\n${shareUrl}`);
      setNote(data.copied);
      window.setTimeout(() => setNote(''), 2600);
    } catch {
      setNote(data.copied);
      window.setTimeout(() => setNote(''), 2600);
    }
  };

  return (
    <footer ref={footerRef} className="ft has-art">
      <div className="ft-art">
        <img src={artSrc('finale', 'finale-wide', isDesktop)} alt={data.names} className="ft-img" />
      </div>

      <div className="ft-shade" aria-hidden="true" />

      <div className="ft-inner">
        <InkTitle progress={titleProg} className="ft-line">
          {data.line}
        </InkTitle>
        <GoldFlourish progress={titleProg} className="ft-flourish" />

        <motion.p
          className="ft-names"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, ease: EASE, delay: 0.4 }}
        >
          {data.names}
        </motion.p>

        <motion.div
          className="ft-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, ease: EASE, delay: 0.65 }}
        >
          <button type="button" className="ft-btn ft-btn-gold" onClick={handleShower}>
            {data.shower}
          </button>
          <button type="button" className="ft-btn" onClick={handleShare}>
            {data.share}
          </button>
        </motion.div>

        <p className="ft-note" aria-live="polite">
          {note}
        </p>
      </div>
    </footer>
  );
}
