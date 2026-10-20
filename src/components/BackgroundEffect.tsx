import React, { useEffect, useState } from 'react';

export interface BackgroundEffectProps {
  currentWallpaper?: string;
}

export const wallpapers = [
  { id: 'ship', name: 'Ship at Sea (Matte Black)', src: '/images/backgrounds/omarchy-bg.jpg' },
  { id: 'horizons', name: 'New Horizons (Warm Dusk)', src: '/images/backgrounds/new-horizons.jpg' },
  { id: 'ether', name: 'Mountain Ether (Solitude)', src: '/images/backgrounds/ether.jpg' },
  { id: 'kanagawa', name: 'Kanagawa Wave (Classic)', src: '/images/backgrounds/kanagawa.jpg' },
  { id: 'layers', name: 'Deep Layers (Vantablack)', src: '/images/backgrounds/layers-deep.jpg' },
];

export const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  currentWallpaper = '/images/backgrounds/omarchy-bg.jpg',
}) => {
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

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Authentic Omarchy Wallpaper Background */}
      <div className="absolute inset-0">
        <img
          src={currentWallpaper}
          alt="Omarchy Theme Wallpaper"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] transition-all duration-700"
        />
        {/* Dark film overlay to guarantee high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/90 via-[#0a0c10]/85 to-[#080a0f]/95 backdrop-blur-[1px]" />
      </div>

      {/* 2. Interactive Cursor Spotlight */}
      <div
        className="absolute w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 opacity-70 sm:opacity-90 mix-blend-screen"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 45%, transparent 70%)',
        }}
      />

      {/* 3. Subtle Modern Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 85%)',
        }}
      />

      {/* 4. Ambient Warm Glow Lighting */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[140px]" />
      <div className="absolute top-[45%] right-[10%] w-[450px] h-[450px] rounded-full bg-sky-500/[0.035] blur-[150px]" />

      {/* 5. Edge Vignette Gradients */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#080a0f] to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080a0f] to-transparent opacity-80" />
    </div>
  );
};
