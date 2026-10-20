import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundEffect: React.FC = () => {
  const { theme, activeWallpaper } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Full-Resolution Omarchy Wallpaper — Vivid & High Visibility */}
      <div className="absolute inset-0">
        <img
          src={activeWallpaper}
          alt="Omarchy Theme Wallpaper"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isDark
              ? 'brightness-[0.88] contrast-[1.08] saturate-[1.05]'
              : 'brightness-[0.98] contrast-[1.02] saturate-[1.02]'
          }`}
        />
        
        {/* Subtle, breathable contrast film so the wallpaper is truly visible */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDark
              ? 'bg-gradient-to-b from-black/45 via-black/25 to-black/55 backdrop-blur-[0.5px]'
              : 'bg-gradient-to-b from-white/45 via-white/20 to-white/55 backdrop-blur-[0.5px]'
          }`}
        />
      </div>

      {/* 2. Interactive Cursor Spotlight */}
      <div
        className="absolute w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 opacity-80 mix-blend-screen"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: isDark
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.04) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245, 158, 11, 0.10) 0%, rgba(245, 158, 11, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* 3. Subtle Modern Architectural Grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-[0.15]' : 'opacity-[0.08]'
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

      {/* 4. Ambient Warm Glow Lighting */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[140px]" />
      <div className="absolute top-[45%] right-[10%] w-[450px] h-[450px] rounded-full bg-sky-500/[0.04] blur-[150px]" />

      {/* 5. Edge Vignette Gradients */}
      <div
        className={`absolute inset-x-0 top-0 h-36 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-b from-[#080a0f]/80 to-transparent'
            : 'bg-gradient-to-b from-white/70 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-36 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-[#080a0f]/80 to-transparent'
            : 'bg-gradient-to-t from-white/70 to-transparent'
        }`}
      />
    </div>
  );
};
