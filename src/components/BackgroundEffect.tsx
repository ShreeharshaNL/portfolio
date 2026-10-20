import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundEffect: React.FC = () => {
  const { theme, activeWallpaper } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Optimized Omarchy Wallpaper — Fast Initial Paint, Crisp & Vivid */}
      <div className="absolute inset-0">
        <img
          src={activeWallpaper}
          alt="Omarchy Theme Wallpaper"
          className={`w-full h-full object-cover object-center transition-all duration-500 transform-gpu ${
            isDark
              ? 'brightness-[0.90] contrast-[1.05]'
              : 'brightness-[0.98] contrast-[1.02]'
          }`}
          loading="eager"
          decoding="async"
        />
        
        {/* Crisp contrast overlay without expensive full-screen Gaussian blur */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-black/50 via-black/30 to-black/60'
              : 'bg-gradient-to-b from-white/50 via-white/25 to-white/60'
          }`}
        />
      </div>

      {/* 2. Interactive Cursor Spotlight (Optimized hardware-accelerated radial gradient) */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-200 opacity-70 transform-gpu"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: isDark
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(245, 158, 11, 0.03) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245, 158, 11, 0.10) 0%, rgba(245, 158, 11, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* 3. Subtle Modern Architectural Grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isDark ? 'opacity-[0.14]' : 'opacity-[0.08]'
        }`}
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `
            : `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 85%)',
        }}
      />

      {/* 4. Ambient Top/Bottom Vignette Masks */}
      <div
        className={`absolute inset-x-0 top-0 h-32 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#080a0f]/80 to-transparent'
            : 'bg-gradient-to-b from-white/70 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-32 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-t from-[#080a0f]/80 to-transparent'
            : 'bg-gradient-to-t from-white/70 to-transparent'
        }`}
      />
    </div>
  );
};
