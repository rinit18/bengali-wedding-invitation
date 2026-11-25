import { useState } from 'react';
import { motion } from 'framer-motion';
import { artSrc, INVITATION_DATA } from '../data/invitationData';
import { CuteKuloSVG, CuteMishtirHandiSVG } from '../components/BengaliArtifacts';
import { useGuestName, useIsDesktop } from '../utils/scrollHelpers';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene07Letter() {
  const data = INVITATION_DATA.letter;
  const guestName = useGuestName();
  const isDesktop = useIsDesktop();
  const [opened, setOpened] = useState(false);

  const reveal = (delayOffset: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.7, ease: EASE, delay: 0.7 + delayOffset },
  });

  return (
    <section className="lt block" id="letter">
      <div className="lt-orn lt-orn-a" aria-hidden="true">
        <img src={artSrc('alpona-ring', undefined, isDesktop)} alt="" />
      </div>
      <div className="lt-orn lt-orn-b" aria-hidden="true">
        <img src={artSrc('alpona-ring', undefined, isDesktop)} alt="" />
      </div>

      <div className="wrap lt-stage">
        <motion.div
          className="lt-card"
          role="button"
          tabIndex={0}
          aria-expanded={opened}
          aria-label={data.tapPrompt}
          onViewportEnter={() => setOpened(true)}
          viewport={{ once: true, amount: 0.15 }}
          onClick={() => setOpened(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpened(true);
          }}
        >
          <article className="lt-paper">
            <motion.p className="lt-blessing" {...reveal(0)}>
              {data.blessing}
            </motion.p>
            <motion.h2 className="lt-heading" {...reveal(0.1)}>
              {data.heading}
            </motion.h2>
            <motion.p className="lt-salute" {...reveal(0.2)}>
              {guestName ? `প্রিয় ${guestName},` : data.salutation}
            </motion.p>

            {data.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className={i === data.paragraphs.length - 1 ? 'lt-note' : 'lt-para'}
                {...reveal(0.3 + i * 0.12)}
              >
                {para}
              </motion.p>
            ))}

            <motion.div className="lt-sign" {...reveal(0.7)}>
              <span>{data.closing}</span>
              {data.signers.map((s) => (
                <strong key={s}>{s}</strong>
              ))}
            </motion.div>
          </article>

          {/* Dual 3D cover flaps swinging open */}
          <motion.div
            className="lt-flap lt-flap-l"
            aria-hidden="true"
            initial={false}
            animate={{ rotateY: opened ? -114 : 0 }}
            transition={{ duration: 1.35, ease: EASE, delay: 0.12 }}
          >
            <span className="lt-flap-inset lt-flap-inset-l" />
          </motion.div>
          <motion.div
            className="lt-flap lt-flap-r"
            aria-hidden="true"
            initial={false}
            animate={{ rotateY: opened ? 114 : 0 }}
            transition={{ duration: 1.35, ease: EASE, delay: 0.12 }}
          >
            <span className="lt-flap-inset lt-flap-inset-r" />
          </motion.div>

          {!opened && (
            <span className="lt-tap-cue" aria-hidden="true">
              {data.tapPrompt}
            </span>
          )}
        </motion.div>

        <div className="lt-prop lt-prop-l" aria-hidden="true">
          <img src={artSrc('mangal-ghat', undefined, isDesktop)} alt="" className="w-full h-auto" />
        </div>
        <div className="lt-prop lt-prop-r" aria-hidden="true">
          <img src={artSrc('topor-mukut', undefined, isDesktop)} alt="" className="w-full h-auto" />
        </div>
        <div className="lt-prop lt-prop-bl" aria-hidden="true">
          <CuteKuloSVG className="w-full h-auto" />
        </div>
        <div className="lt-prop lt-prop-br" aria-hidden="true">
          <CuteMishtirHandiSVG className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
