import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createSoftBokehTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 248, 225, 1)');
  grad.addColorStop(0.28, 'rgba(255, 215, 130, 0.72)');
  grad.addColorStop(0.65, 'rgba(243, 156, 18, 0.16)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Refined 3D WebGL Ambient Particle & Filigree Halo Stage.
 * Renders cleanly at z-[1] BEHIND all foreground cards & text so nothing
 * ever obstructs typography, portraits, or buttons.
 */
export const Scene3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle deep-space fine golden ring lattice (far behind content, very delicate)
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 0, -6);
    scene.add(haloGroup);

    const fineGoldMat = new THREE.MeshBasicMaterial({
      color: 0xffe39a,
      transparent: true,
      opacity: 0.12,
      wireframe: false,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.018, 12, 120), fineGoldMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.014, 12, 100), fineGoldMat);
    ring1.rotation.x = 0.45;
    ring2.rotation.y = 0.55;
    haloGroup.add(ring1, ring2);

    // 220 Soft 3D Golden Candlelight Embers & Bokeh Orbs
    const count = 220;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const palette = [
      new THREE.Color(0xffe9b0),
      new THREE.Color(0xf6b93b),
      new THREE.Color(0xffd275),
      new THREE.Color(0xffeaa7),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -8 + Math.random() * 14;
      speeds[i] = 0.003 + Math.random() * 0.008;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const tex = createSoftBokehTexture();
    const pMat = new THREE.PointsMaterial({
      size: 0.34,
      map: tex,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const cloud = new THREE.Points(pGeo, pMat);
    scene.add(cloud);

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.4;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollNorm = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      camera.position.x = curX;
      camera.position.y = curY;
      camera.position.z = 12 - scrollNorm * 1.8;
      camera.lookAt(0, 0, -4);

      ring1.rotation.z = elapsed * 0.05 + scrollNorm * 1.2;
      ring2.rotation.z = -elapsed * 0.07 - scrollNorm * 1.5;
      haloGroup.rotation.y = curX * 0.2;

      const attr = pGeo.getAttribute('position') as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speeds[i];
        arr[i * 3] += Math.sin(elapsed * 0.6 + i) * 0.0015;
        if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9;
      }
      attr.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      pGeo.dispose();
      pMat.dispose();
      tex.dispose();
      fineGoldMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
    />
  );
};
