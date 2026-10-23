import React from 'react';
import { TotemIcon, DiamondSword, CompassIcon, EmeraldGem } from './MinecraftIcons';
import { sound } from '../utils/audio';

export const HighlightMetrics: React.FC = () => {
  const metrics = [
    {
      icon: <TotemIcon size={20} />,
      label: "Discipline",
      value: "Software & Systems",
      sub: "Data Structures & Core Engineering",
      highlight: "CGPA: 8.65 / 10.0",
      accentColor: "text-[#55ffff]",
    },
    {
      icon: <EmeraldGem size={20} />,
      label: "Engineering Craft",
      value: "Full-Stack & Cloud",
      sub: "Modern Web, REST APIs & Databases",
      highlight: "Production Ready Stack",
      accentColor: "text-[#55ff55]",
    },
    {
      icon: <DiamondSword size={20} />,
      label: "Specialization",
      value: "Full-Stack & AI",
      sub: "React, Node.js, Python & Vision OCR",
      highlight: "Class of 2027",
      accentColor: "text-[#55ffff]",
    },
    {
      icon: <CompassIcon size={20} />,
      label: "Spawn Biome",
      value: "Karkala, Karnataka",
      sub: "NIE Mysuru · Karnataka, India",
      highlight: "Coords: 13.21°N, 74.99°E",
      accentColor: "text-[#fcee4b]",
    },
  ];

  return (
    <section className="py-4 sm:py-6 relative z-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playPop()}
              className="p-3 sm:p-4 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,3px_3px_0px_rgba(0,0,0,0.5)] transition-all duration-150 space-y-1.5 sm:space-y-2 group hover:translate-y-[-2px] hover:border-zinc-400"
            >
              <div className="flex items-center justify-between border-b border-black pb-1 sm:pb-1.5">
                <span className="text-[9px] sm:text-[10px] font-pixel uppercase tracking-wider text-zinc-400 truncate pr-1">
                  {m.label}
                </span>
                <div className="group-hover:scale-110 transition-transform shrink-0">
                  {m.icon}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-pixel font-bold text-white text-xs sm:text-sm mc-text-shadow group-hover:text-[#ffffa0] transition-colors truncate">
                  {m.value}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 font-sans leading-tight line-clamp-2">
                  {m.sub}
                </div>
                <div className={`text-[9px] sm:text-[10px] font-pixel font-bold pt-0.5 sm:pt-1 ${m.accentColor} mc-text-shadow truncate`}>
                  {m.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
