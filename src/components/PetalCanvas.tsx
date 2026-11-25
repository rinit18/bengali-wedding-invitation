import { useEffect, useRef } from 'react';
import { artSrc, triggerPetalShower } from '../data/invitationData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  s: number;
  life: number;
  maxLife: number;
  sprite: HTMLCanvasElement | null;
  foil: string | null;
  sway: number;
  ambient: boolean;
}

const FOIL_COLORS = ['#F6DE9C', '#E2B653', '#C9A24A', '#FFF1C4', '#B3121B'];

export function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = window.matchMedia('(max-width: 1023px)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      if (isNarrow && window.innerWidth === width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = isNarrow ? canvas.clientHeight || window.innerHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const petalSprites: HTMLCanvasElement[] = [];
    for (let i = 1; i <= 12; i++) {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = Math.max(1, Math.round((128 * img.naturalHeight) / img.naturalWidth));
        const sctx = c.getContext('2d');
        sctx?.drawImage(img, 0, 0, c.width, c.height);
        petalSprites.push(c);
      };
      img.src = artSrc(`petal-${i}`, undefined, true);
    }

    const glowSprite = document.createElement('canvas');
    glowSprite.width = 32;
    glowSprite.height = 32;
    const gctx = glowSprite.getContext('2d');
    if (gctx) {
      const grad = gctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, '#FFF1C4');
      grad.addColorStop(0.35, '#E2B653');
      grad.addColorStop(1, 'rgba(184, 138, 44, 0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 32, 32);
    }

    const particles: Particle[] = [];
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const spawn = (x: number, y: number, burst: boolean, spread: number, ambient: boolean): Particle => {
      const usePetal = petalSprites.length > 0 && Math.random() < (ambient ? 0.85 : 0.65);
      const foil = !usePetal && !ambient && Math.random() < 0.6
        ? FOIL_COLORS[Math.floor(Math.random() * FOIL_COLORS.length)]
        : null;
      const angle = burst ? rand(-Math.PI * 0.95, -Math.PI * 0.05) : Math.PI / 2;
      const speed = burst ? rand(3, 9) * spread : rand(0.3, 0.8);

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(0, Math.PI * 2),
        vr: rand(-0.06, 0.06),
        s: usePetal ? rand(16, 28) : foil ? rand(5, 10) : rand(1.6, 3.4),
        life: 0,
        maxLife: ambient ? rand(650, 1050) : foil ? rand(160, 250) : rand(110, 190),
        sprite: usePetal ? petalSprites[Math.floor(Math.random() * petalSprites.length)] : null,
        foil,
        sway: rand(0, 100),
        ambient,
      };
    };

    const onShower = (ev: Event) => {
      const { x, y, count, spread } = (ev as CustomEvent<{ x: number; y: number; count: number; spread: number }>).detail;
      const n = prefersReduced ? Math.min(6, count) : count;
      for (let i = 0; i < n; i++) {
        particles.push(spawn(x + rand(-10, 10), y + rand(-10, 10), true, spread, false));
      }
    };
    window.addEventListener('gaatchhora:shower', onShower);

    const onPointerDown = (ev: PointerEvent) => {
      const target = ev.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, [role="tab"]')) return;
      triggerPetalShower(ev.clientX, ev.clientY, 12, 0.8);
    };
    window.addEventListener('pointerdown', onPointerDown);

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (document.hidden || (isNarrow && now - lastTime < 28)) return;
      const dt = Math.min(2.5, (now - lastTime) / 16.67);
      lastTime = now;
      ctx.clearRect(0, 0, width, height);

      if (!prefersReduced) {
        const cap = isNarrow ? 5 : petalSprites.length ? 10 : 14;
        const countAmbient = particles.reduce((acc, p) => acc + (p.ambient ? 1 : 0), 0);
        if (countAmbient < cap && Math.random() < 0.05 * dt) {
          particles.push(spawn(rand(0, width), rand(-40, height * 0.2), false, 1, true));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.ambient) {
          p.sway += 0.02 * dt;
          p.x += (Math.sin(p.sway) * 0.6 + p.vx * 0.2) * dt;
          p.y += p.vy * dt * (p.sprite ? 1.2 : 0.35);
        } else {
          p.vy += 0.16 * dt;
          p.vx *= 0.985;
          p.vy = Math.min(p.vy, p.sprite ? 2.6 : 1.5);
          p.x += (p.vx + Math.sin(p.life * 0.08) * 0.5) * dt;
          p.y += p.vy * dt;
        }
        p.r += p.vr * dt;

        const fadeIn = Math.min(1, p.life / 20);
        const fadeOut = Math.min(1, (p.maxLife - p.life) / 40);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut));
        if (alpha <= 0 || p.y > height + 60) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        if (p.sprite) {
          ctx.globalAlpha = alpha;
          ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(p.life * 0.05 + p.sway)));
          const ratio = p.sprite.height / p.sprite.width;
          ctx.drawImage(p.sprite, -p.s / 2, (-p.s * ratio) / 2, p.s, p.s * ratio);
        } else if (p.foil) {
          ctx.globalAlpha = alpha;
          ctx.scale(1, Math.cos(p.life * 0.12 + p.sway));
          ctx.fillStyle = p.foil;
          ctx.fillRect(-p.s / 2, -p.s * 0.32, p.s, p.s * 0.64);
        } else {
          ctx.globalAlpha = alpha * (p.ambient ? 0.55 : 0.95);
          ctx.drawImage(glowSprite, -p.s * 2.2, -p.s * 2.2, p.s * 4.4, p.s * 4.4);
        }
        ctx.restore();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('gaatchhora:shower', onShower);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="petals-canvas" aria-hidden="true" />;
}
