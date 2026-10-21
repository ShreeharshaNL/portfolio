import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { DiamondOreIcon, DiamondPickaxe } from './MinecraftIcons';
import { Trophy } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const MineableBlock: React.FC = () => {
  const { diamondsMined, recordDiamondMined } = useGame();
  const [crackStage, setCrackStage] = useState<number>(0);
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingText, setFloatingText] = useState<{ id: number; text: string }[]>([]);

  const handleMine = () => {
    if (isBroken) return;

    const nextStage = crackStage + 1;

    if (nextStage < 4) {
      sound.playBlockHit();
      setCrackStage(nextStage);
    } else {
      // Block Broken!
      sound.playBlockBreak();
      setIsBroken(true);
      setCrackStage(0);
      recordDiamondMined();

      // Spawn burst particles
      const newParticles: Particle[] = [];
      const colors = ['#55ffff', '#2bbcc3', '#737373', '#5c5c5c', '#ffffff'];

      for (let i = 0; i < 16; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);

      // Spawn floating diamond & XP text
      const textId = Date.now();
      setFloatingText((prev) => [...prev, { id: textId, text: '+1 💎 Diamond (+50 XP)' }]);

      setTimeout(() => {
        setParticles([]);
      }, 700);

      setTimeout(() => {
        setFloatingText((prev) => prev.filter((item) => item.id !== textId));
      }, 1600);

      // Respawn block after 3 seconds
      setTimeout(() => {
        setIsBroken(false);
        sound.playPop();
      }, 3000);
    }
  };

  return (
    <div
      id="mining-block"
      className="inline-flex flex-col items-center p-3.5 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,4px_4px_0px_rgba(0,0,0,0.5)] rounded-none relative select-none"
    >
      {/* Mini Title Badge */}
      <div className="flex items-center space-x-1.5 mb-2 text-[11px] font-pixel text-[#55ffff] mc-text-shadow">
        <DiamondPickaxe size={14} />
        <span>CLICK TO MINE</span>
      </div>

      {/* Interactive 3D Block Container */}
      <div
        onClick={handleMine}
        className={`relative w-20 h-20 sm:w-24 sm:h-24 cursor-pointer flex items-center justify-center transition-transform active:scale-95 ${
          isBroken ? 'opacity-30 pointer-events-none' : 'hover:brightness-110'
        }`}
        title="Mine Diamond Ore (Click 4 times!)"
      >
        {/* Diamond Ore Texture */}
        <div className="w-full h-full flex items-center justify-center bg-[#737373] border-2 border-black shadow-[inset_3px_3px_#969696,inset_-3px_-3px_#474747]">
          <DiamondOreIcon size={76} />
        </div>

        {/* Progressive Crack Overlay (SVG pixel cracks) */}
        {crackStage > 0 && !isBroken && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full opacity-80"
              style={{ shapeRendering: 'crispEdges' }}
            >
              {crackStage >= 1 && (
                <>
                  <rect x="7" y="3" width="2" height="4" fill="#000000" />
                  <rect x="9" y="6" width="3" height="2" fill="#000000" />
                  <rect x="4" y="8" width="4" height="2" fill="#000000" />
                </>
              )}
              {crackStage >= 2 && (
                <>
                  <rect x="3" y="4" width="2" height="6" fill="#000000" />
                  <rect x="8" y="7" width="5" height="3" fill="#000000" />
                  <rect x="6" y="11" width="4" height="3" fill="#000000" />
                  <rect x="11" y="3" width="2" height="4" fill="#000000" />
                </>
              )}
              {crackStage >= 3 && (
                <>
                  <rect x="1" y="2" width="14" height="2" fill="#000000" />
                  <rect x="2" y="7" width="12" height="3" fill="#000000" />
                  <rect x="4" y="12" width="9" height="2" fill="#000000" />
                  <rect x="7" y="1" width="3" height="14" fill="#000000" />
                </>
              )}
            </svg>
          </div>
        )}

        {/* Broken State Indicator */}
        {isBroken && (
          <div className="absolute inset-0 flex items-center justify-center font-pixel text-xs text-[#55ffff] font-bold animate-pulse mc-text-shadow">
            Respawning...
          </div>
        )}

        {/* Burst Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2 pointer-events-none animate-out fade-out zoom-out duration-700"
            style={{
              backgroundColor: p.color,
              transform: `translate(${p.x}px, ${p.y}px)`,
              boxShadow: '1px 1px 0px #000',
            }}
          />
        ))}

        {/* Floating Text Animation */}
        {floatingText.map((item) => (
          <div
            key={item.id}
            className="absolute -top-7 left-1/2 -translate-x-1/2 font-pixel text-xs font-bold text-[#55ffff] mc-text-shadow whitespace-nowrap pointer-events-none animate-in slide-in-from-bottom-2 fade-in duration-500"
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Stats Counter Bar below block */}
      <div className="mt-2.5 pt-2 border-t border-[#2b3142] w-full flex items-center justify-between text-[11px] font-pixel text-zinc-300">
        <span className="flex items-center space-x-1 text-zinc-400">
          <Trophy className="w-3 h-3 text-[#fcee4b]" />
          <span>Mined:</span>
        </span>
        <span className="text-[#55ffff] font-bold mc-text-shadow">
          {diamondsMined} 💎
        </span>
      </div>

    </div>
  );
};
