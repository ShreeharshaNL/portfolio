import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const MinecraftBackground: React.FC = () => {
  const { biome } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      
      {/* 1. Base Sky Gradient per Biome */}
      {biome === 'overworld-day' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a8bf7] via-[#6ba8fc] to-[#a0cbff] transition-colors duration-700" />
      )}

      {biome === 'overworld-night' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c16] via-[#101426] to-[#181d33] transition-colors duration-700" />
      )}

      {biome === 'cherry-grove' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#251020] via-[#451c3a] to-[#692c57] transition-colors duration-700" />
      )}

      {biome === 'nether' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#180306] via-[#33080e] to-[#4e0e16] transition-colors duration-700" />
      )}

      {biome === 'the-end' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#06030c] via-[#120822] to-[#200f39] transition-colors duration-700" />
      )}

      {biome === 'snowy-tundra' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1422] via-[#17253b] to-[#273a55] transition-colors duration-700" />
      )}

      {/* 2. Celestial Body (Square Sun, Moon, or Dimensional Glow) */}
      <div className="absolute top-10 right-10 sm:right-24">
        {biome === 'overworld-day' && (
          <div className="relative w-22 h-22 sm:w-24 sm:h-24 bg-[#ffffaa] border-4 border-[#ffaa00] shadow-[0_0_36px_rgba(255,200,50,0.5)]">
            <div className="absolute inset-1 bg-white" />
          </div>
        )}

        {biome === 'overworld-night' && (
          <div className="relative w-20 h-20 bg-[#f1f5f9] border-2 border-[#cbd5e1] shadow-[0_0_24px_rgba(255,255,255,0.4)] animate-pulse">
            <div className="absolute top-2 left-2 w-4 h-4 bg-[#94a3b8]" />
            <div className="absolute top-8 left-4 w-6 h-6 bg-[#94a3b8]" />
            <div className="absolute top-4 right-3 w-5 h-5 bg-[#94a3b8]" />
            <div className="absolute bottom-2 right-4 w-3 h-3 bg-[#94a3b8]" />
          </div>
        )}

        {biome === 'cherry-grove' && (
          <div className="relative w-20 h-20 bg-[#fdf2f8] border-3 border-[#f472b6] shadow-[0_0_30px_rgba(244,114,182,0.45)]">
            <div className="absolute inset-1.5 bg-[#fce7f3]" />
          </div>
        )}

        {biome === 'nether' && (
          <div className="relative w-28 h-28 rounded-full bg-[#ef4444]/20 blur-xl animate-pulse" />
        )}

        {biome === 'the-end' && (
          <div className="relative w-24 h-24 rounded-full bg-[#a855f7]/25 blur-2xl animate-pulse" />
        )}

        {biome === 'snowy-tundra' && (
          <div className="relative w-20 h-20 bg-[#e0f2fe] border-2 border-[#93c5fd] shadow-[0_0_28px_rgba(186,230,253,0.45)]">
            <div className="absolute inset-1 bg-white" />
          </div>
        )}
      </div>

      {/* 3. Overworld & Night Clouds */}
      {(biome === 'overworld-day' || biome === 'overworld-night') && (
        <div className="absolute top-20 left-0 right-0 h-48 opacity-65 overflow-hidden">
          <div
            className={`absolute flex space-x-32 animate-[marquee_50s_linear_infinite] whitespace-nowrap ${
              biome === 'overworld-night' ? 'opacity-30' : 'opacity-75'
            }`}
            style={{ width: '200%' }}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="inline-block relative w-72 h-14 bg-white/90 border border-white/40 shadow-sm"
                style={{
                  clipPath: 'polygon(0% 40%, 20% 40%, 20% 0%, 80% 0%, 80% 30%, 100% 30%, 100% 100%, 0% 100%)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Twinkling Stars (Night & The End) */}
      {(biome === 'overworld-night' || biome === 'the-end') && (
        <div className="absolute inset-0 opacity-80">
          {Array.from({ length: 32 }).map((_, i) => {
            const top = (i * 17 + 7) % 94;
            const left = (i * 29 + 13) % 98;
            const size = (i % 3 === 0) ? 3 : (i % 2 === 0) ? 2 : 1;
            return (
              <div
                key={i}
                className={`absolute animate-pulse ${biome === 'the-end' ? 'bg-[#c084fc]' : 'bg-white'}`}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${2 + (i % 4)}s`,
                  opacity: 0.35 + ((i % 5) * 0.12),
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. Animated Falling Cherry Blossom Petals (Cherry Grove) */}
      {biome === 'cherry-grove' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => {
            const left = (i * 23 + 5) % 98;
            const duration = 6 + (i % 6);
            const delay = (i * 0.45) % 6;
            const size = (i % 3 === 0) ? 7 : (i % 2 === 0) ? 5 : 4;
            const color = i % 2 === 0 ? '#f472b6' : '#fbcfe8';
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  boxShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                  animation: `petal-drift ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 6. Animated Rising Lava Embers (The Nether) */}
      {biome === 'nether' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => {
            const left = (i * 19 + 7) % 96;
            const duration = 4.5 + (i % 5);
            const delay = (i * 0.35) % 5;
            const size = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 4 : 3;
            const color = i % 3 === 0 ? '#facc15' : i % 2 === 0 ? '#fb923c' : '#ef4444';
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  boxShadow: '0 0 6px #f97316',
                  animation: `ember-float ${duration}s ease-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 7. Animated Falling Snowflakes (Snowy Tundra) */}
      {biome === 'snowy-tundra' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => {
            const left = (i * 21 + 3) % 98;
            const duration = 5 + (i % 6);
            const delay = (i * 0.4) % 6;
            const size = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 4 : 3;
            return (
              <div
                key={i}
                className="absolute bg-white"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: '0 0 3px rgba(255,255,255,0.7)',
                  animation: `snow-drift ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 8. Floating Purple Ender Particles (The End) */}
      {biome === 'the-end' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 26 }).map((_, i) => {
            const top = (i * 19 + 11) % 90;
            const left = (i * 27 + 5) % 96;
            const duration = 3 + (i % 4);
            const delay = (i * 0.5) % 4;
            const size = (i % 3 === 0) ? 6 : (i % 2 === 0) ? 4 : 3;
            return (
              <div
                key={i}
                className="absolute bg-[#c084fc]"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: '0 0 8px #a855f7',
                  animation: `ender-sparkle ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 9. Biome Horizon Rim at Bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-2 border-t-2"
        style={{
          backgroundColor:
            biome === 'overworld-day'
              ? '#5c8e32'
              : biome === 'cherry-grove'
              ? '#a21caf'
              : biome === 'nether'
              ? '#7f1d1d'
              : biome === 'the-end'
              ? '#3b0764'
              : biome === 'snowy-tundra'
              ? '#e2e8f0'
              : '#334155',
          borderColor:
            biome === 'overworld-day'
              ? '#7ec046'
              : biome === 'cherry-grove'
              ? '#f472b6'
              : biome === 'nether'
              ? '#f87171'
              : biome === 'the-end'
              ? '#c084fc'
              : biome === 'snowy-tundra'
              ? '#ffffff'
              : '#64748b',
        }}
      />

    </div>
  );
};
