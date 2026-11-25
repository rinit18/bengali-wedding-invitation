import React from 'react';
import { motion } from 'framer-motion';

export const AlponaMandala: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-64 h-64',
  color = '#C89B3C',
}) => (
  <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
    <circle cx="120" cy="120" r="114" stroke={color} strokeWidth="0.9" strokeDasharray="3 5" />
    <circle cx="120" cy="120" r="102" stroke={color} strokeWidth="1.2" />
    <circle cx="120" cy="120" r="76" stroke={color} strokeWidth="0.8" strokeDasharray="2 4" />
    <circle cx="120" cy="120" r="46" stroke={color} strokeWidth="1.1" />
    <circle cx="120" cy="120" r="22" stroke={color} strokeWidth="1" />

    {/* Outer 16 lotus petals */}
    {Array.from({ length: 16 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 22.5} 120 120)`}>
        <path
          d="M120 18 C127 36, 129 52, 120 66 C111 52, 113 36, 120 18 Z"
          stroke={color}
          strokeWidth="1"
          fill={color}
          fillOpacity="0.1"
        />
        <circle cx="120" cy="10" r="2.3" fill={color} />
      </g>
    ))}

    {/* Middle 12 paisley petals */}
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={`mid-${i}`} transform={`rotate(${i * 30} 120 120)`}>
        <path
          d="M120 46 C125 60, 125 68, 120 74 C115 68, 115 60, 120 46 Z"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="0.7"
        />
        <circle cx="120" cy="81" r="1.8" fill={color} />
      </g>
    ))}

    {/* Inner 8 lotus core */}
    {Array.from({ length: 8 }).map((_, i) => (
      <path
        key={`inner-${i}`}
        transform={`rotate(${i * 45} 120 120)`}
        d="M120 96 C124 104, 124 111, 120 116 C116 111, 116 104, 120 96 Z"
        fill={color}
        fillOpacity="0.3"
      />
    ))}
    <circle cx="120" cy="120" r="6" fill={color} />
  </svg>
);

export const KalkaCornerSVG: React.FC<{
  className?: string;
  color?: string;
  flipX?: boolean;
  flipY?: boolean;
}> = ({ className = 'w-16 h-16', color = '#C89B3C', flipX = false, flipY = false }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    className={className}
    style={{
      transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
    }}
    aria-hidden="true"
  >
    <path
      d="M6 74 L6 16 C6 10 10 6 16 6 L74 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 64 L12 20 C12 15 15 12 20 12 L64 12"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="2 3"
    />
    {/* Kalka paisley bud */}
    <path
      d="M22 44 C18 30, 28 18, 44 22 C36 28, 32 34, 22 44 Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.2"
    />
    <circle cx="19" cy="19" r="3.5" fill={color} />
    <circle cx="36" cy="17" r="2" fill={color} />
    <circle cx="17" cy="36" r="2" fill={color} />
  </svg>
);

export const LotusDividerSVG: React.FC<{
  className?: string;
  lineColor?: string;
  accentColor?: string;
}> = ({ className = 'w-full max-w-sm h-9', lineColor = '#C89B3C', accentColor = '#B3121B' }) => (
  <svg viewBox="0 0 360 36" fill="none" className={className} aria-hidden="true">
    <line x1="10" y1="18" x2="136" y2="18" stroke={lineColor} strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="224" y1="18" x2="350" y2="18" stroke={lineColor} strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="144" cy="18" r="2.2" fill={lineColor} />
    <circle cx="216" cy="18" r="2.2" fill={lineColor} />
    {/* Center Lotus */}
    <path
      d="M180 4 C185 11, 186 18, 180 25 C174 18, 175 11, 180 4 Z"
      fill={accentColor}
      stroke={lineColor}
      strokeWidth="1.2"
    />
    <path
      d="M180 25 C171 21, 165 16, 164 9 C171 11, 176 16, 180 25 Z"
      fill={lineColor}
      fillOpacity="0.65"
      stroke={lineColor}
      strokeWidth="1"
    />
    <path
      d="M180 25 C189 21, 195 16, 196 9 C189 11, 184 16, 180 25 Z"
      fill={lineColor}
      fillOpacity="0.65"
      stroke={lineColor}
      strokeWidth="1"
    />
    <path d="M160 28 Q180 33 200 28" stroke={lineColor} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PaanPataSVG: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = 'w-32 h-40',
  flipped = false,
}) => (
  <svg
    viewBox="0 0 140 180"
    fill="none"
    className={className}
    style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
  >
    <defs>
      <linearGradient id="paanGrad" x1="0" y1="0" x2="140" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#358C59" />
        <stop offset="50%" stopColor="#1B5633" />
        <stop offset="100%" stopColor="#0C2E1A" />
      </linearGradient>
    </defs>
    <path
      d="M70 16 C40 10, 12 36, 14 78 C16 120, 44 152, 70 170 C96 152, 124 120, 126 78 C128 36, 100 10, 70 16 Z"
      fill="url(#paanGrad)"
      stroke="#FFE39A"
      strokeWidth="2.2"
    />
    <path
      d="M70 24 C44 19, 20 41, 22 77 C24 114, 48 142, 70 158 C92 142, 116 114, 118 77 C120 41, 96 19, 70 24 Z"
      stroke="#C89B3C"
      strokeWidth="0.9"
      strokeDasharray="2 3"
    />
    <path d="M70 16 L70 166" stroke="#FFE39A" strokeWidth="1.5" strokeOpacity="0.75" />
    <path d="M70 46 Q45 55 28 74" stroke="#FFE39A" strokeWidth="1.1" strokeOpacity="0.55" />
    <path d="M70 46 Q95 55 112 74" stroke="#FFE39A" strokeWidth="1.1" strokeOpacity="0.55" />
    <path d="M70 76 Q44 90 32 112" stroke="#FFE39A" strokeWidth="1.1" strokeOpacity="0.55" />
    <path d="M70 76 Q96 90 108 112" stroke="#FFE39A" strokeWidth="1.1" strokeOpacity="0.55" />
    <path d="M70 16 C70 6, 76 2, 84 4" stroke="#2A6E44" strokeWidth="3.2" strokeLinecap="round" />
    {/* Sindoor bindu on leaf */}
    <circle cx="70" cy="68" r="4" fill="#B3121B" stroke="#FFE39A" strokeWidth="1" />
  </svg>
);

export const PradipDiyaSVG: React.FC<{ className?: string; lit?: boolean }> = ({
  className = 'w-12 h-12',
  lit = true,
}) => (
  <svg viewBox="0 0 80 80" fill="none" className={className}>
    {lit && (
      <g className="animate-flicker">
        <circle cx="40" cy="24" r="20" fill="#F39C12" fillOpacity="0.22" />
        <circle cx="40" cy="24" r="12" fill="#FFCA3A" fillOpacity="0.3" />
        <path d="M40 8 C47 18, 49 26, 40 35 C31 26, 33 18, 40 8 Z" fill="#FFCA3A" />
        <path d="M40 15 C44 21, 45 26, 40 32 C35 26, 36 21, 40 15 Z" fill="#FFFDF2" />
      </g>
    )}
    <path
      d="M15 43 C24 60, 56 60, 65 43 C54 47, 26 47, 15 43 Z"
      fill="#A84A2A"
      stroke="#FFE39A"
      strokeWidth="1.6"
    />
    <ellipse cx="40" cy="43" rx="25" ry="5.5" fill="#702711" stroke="#FFE39A" strokeWidth="1.2" />
    <path d="M28 53 Q40 58 52 53" stroke="#FFE39A" strokeWidth="1.2" strokeOpacity="0.7" />
  </svg>
);

export const MarigoldToranSVG: React.FC<{ className?: string }> = ({
  className = 'w-full h-20',
}) => (
  <svg viewBox="0 0 800 96" preserveAspectRatio="xMidYMin slice" fill="none" className={className}>
    {[0, 160, 320, 480, 640].map((x) => (
      <g key={x}>
        {/* Mango leaves along swag */}
        {[35, 65, 95, 125].map((lx, idx) => (
          <path
            key={lx}
            d={`M${x + lx} ${idx === 1 || idx === 2 ? 32 : 20} Q${x + lx - 6} ${
              idx === 1 || idx === 2 ? 52 : 38
            } ${x + lx} ${idx === 1 || idx === 2 ? 60 : 46} Q${x + lx + 6} ${
              idx === 1 || idx === 2 ? 52 : 38
            } ${x + lx} ${idx === 1 || idx === 2 ? 32 : 20} Z`}
            fill="#1B5633"
            stroke="#C89B3C"
            strokeWidth="0.6"
          />
        ))}
        <path
          d={`M${x} 6 Q${x + 80} 68 ${x + 160} 6`}
          stroke="#1B5633"
          strokeWidth="3.5"
          fill="none"
        />
        {[20, 50, 80, 110, 140].map((dx, i) => {
          const cy = i === 2 ? 37 : i === 1 || i === 3 ? 28 : 16;
          return (
            <g key={dx}>
              <circle
                cx={x + dx}
                cy={cy}
                r={i === 2 ? 12 : 8.5}
                fill={i % 2 === 0 ? '#F39C12' : '#E67E22'}
              />
              <circle cx={x + dx} cy={cy} r={i === 2 ? 6.5 : 4.5} fill="#FFCA3A" />
              <circle cx={x + dx} cy={cy} r="2" fill="#B3121B" />
            </g>
          );
        })}
        {/* Hanging Rajanigandha & Crimson Tassel */}
        <line x1={x + 80} y1="49" x2={x + 80} y2="74" stroke="#FFE39A" strokeWidth="1.5" />
        <circle cx={x + 80} cy="56" r="5" fill="#FFF8E7" />
        <circle cx={x + 80} cy="66" r="4.5" fill="#FFF8E7" />
        <path
          d={`M${x + 74} 72 L${x + 86} 72 L${x + 82} 88 L${x + 78} 88 Z`}
          fill="#B3121B"
          stroke="#FFE39A"
          strokeWidth="0.8"
        />
      </g>
    ))}
  </svg>
);

export const ToporSVG: React.FC<{ className?: string }> = ({ className = 'w-14 h-16' }) => (
  <svg viewBox="0 0 80 96" fill="none" className={className}>
    <path
      d="M40 7 L46 28 L58 58 L67 77 C52 83, 28 83, 13 77 L22 58 L34 28 Z"
      fill="#FFF8E7"
      stroke="#C89B3C"
      strokeWidth="2"
    />
    <ellipse cx="40" cy="77" rx="27" ry="7.5" fill="#FFF8E7" stroke="#B3121B" strokeWidth="2.2" />
    <path d="M26 53 Q40 60 54 53" stroke="#C89B3C" strokeWidth="2" />
    <path d="M31 38 Q40 43 49 38" stroke="#B3121B" strokeWidth="1.4" />
    <circle cx="40" cy="65" r="3" fill="#B3121B" />
    <circle cx="40" cy="7" r="4.5" fill="#F39C12" stroke="#B3121B" strokeWidth="1" />
  </svg>
);

export const ShankhaSVG: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    <path
      d="M16 54 C14 38, 28 18, 48 14 C60 12, 68 22, 62 36 C56 48, 38 64, 22 62 C18 61, 16 58, 16 54 Z"
      fill="#FFF8E7"
      stroke="#C89B3C"
      strokeWidth="2"
    />
    <path d="M24 54 C30 42, 42 28, 56 20" stroke="#C89B3C" strokeWidth="1.3" />
    <path d="M29 58 C36 47, 46 35, 60 28" stroke="#B3121B" strokeWidth="1" strokeOpacity="0.6" />
    <circle cx="45" cy="34" r="3" fill="#B3121B" fillOpacity="0.7" />
  </svg>
);

export const FloatingMarigolds: React.FC = () => {
  const petals = [
    { left: '6%', delay: 0, dur: 15, size: 13, color: '#F39C12' },
    { left: '20%', delay: 3, dur: 18, size: 10, color: '#FFE39A' },
    { left: '38%', delay: 5, dur: 16, size: 14, color: '#B3121B' },
    { left: '58%', delay: 1.5, dur: 19, size: 11, color: '#F39C12' },
    { left: '76%', delay: 4, dur: 17, size: 13, color: '#FFE39A' },
    { left: '92%', delay: 2, dur: 14, size: 11, color: '#B3121B' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {petals.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '108vh'],
            opacity: [0, 0.55, 0.55, 0],
            rotate: [0, 180, 360],
            x: [0, idx % 2 === 0 ? 28 : -28, 0],
          }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute -top-6"
        >
          <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-80">
            <path d="M12 2C15 6 20 8 22 12C18 15 16 20 12 22C9 18 4 16 2 12C6 9 8 4 12 2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
