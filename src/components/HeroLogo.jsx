import { useState, useEffect } from 'react';

export default function HeroLogo() {
  const [drawn, setDrawn] = useState(false);
  const [lineW, setLineW] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setDrawn(true), 300);
    const t2 = setTimeout(() => setLineW(100), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const heroId = 'hero-grad';
  return (
    <div className="logo-hero">
      <svg width="96" height="72" viewBox="0 0 96 72" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={heroId} x1="10" y1="0" x2="86" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#429bff" />
            <stop offset="100%" stopColor="#2176f4" />
          </linearGradient>
        </defs>
        <path
          d="M4 58 A44 44 0 0 1 92 58 Z"
          fill={`url(#${heroId})`}
          style={{ opacity: drawn ? 1 : 0, transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <rect
          x={48 - lineW * 0.44}
          y="58"
          width={lineW * 0.88}
          height="4"
          rx="2"
          fill="#40e6d9"
          style={{ transition: 'x 0.5s cubic-bezier(0.22,1,0.36,1), width 0.5s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="logo-hero-wordmark">Weather<span>.co</span></div>
      <div className="logo-hero-tagline">The weather but better</div>
    </div>
  );
}
