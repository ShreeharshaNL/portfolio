import React from 'react';
import { TotemIcon, DiamondSword, CompassIcon, EmeraldGem } from './MinecraftIcons';
import { sound } from '../utils/audio';

export const HighlightMetrics: React.FC = () => {
  const metrics = [
    {
      icon: <TotemIcon size={20} />,
      label: "Academics",
      value: "B.E. Information Science",
      sub: "The National Institute of Engineering, Mysuru",
      highlight: "CGPA: 8.66 / 10.0",
      accentColor: "text-[#55ffff]",
    },
    {
      icon: <EmeraldGem size={20} />,
      label: "Hackathon Recognition",
      value: "Winner · NeoNexus 36.1",
      sub: "LabelWise · Team Code4Care",
      highlight: "Year: 2026 Champion",
      accentColor: "text-[#55ff55]",
    },
    {
      icon: <DiamondSword size={20} />,
      label: "Class & Specialization",
      value: "Full-Stack & Applied AI",
      sub: "React, Node.js, Python, Vision OCR",
      highlight: "Class of 2027",
      accentColor: "text-[#55ffff]",
    },
    {
      icon: <CompassIcon size={20} />,
      label: "Spawn Biome",
      value: "Karkala, Karnataka",
      sub: "DOB: 06 Oct 2005 · 11:50 PM",
      highlight: "Coords: 13.21°N, 74.99°E (IST)",
      accentColor: "text-[#fcee4b]",
    },
  ];

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playPop()}
              className="p-4 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,4px_4px_0px_rgba(0,0,0,0.5)] transition-all duration-150 space-y-2 group hover:translate-y-[-2px] hover:border-zinc-400"
            >
              <div className="flex items-center justify-between border-b border-black pb-1.5">
                <span className="text-[10px] font-pixel uppercase tracking-wider text-zinc-400">
                  {m.label}
                </span>
                <div className="group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-pixel font-bold text-white text-sm mc-text-shadow group-hover:text-[#ffffa0] transition-colors">
                  {m.value}
                </div>
                <div className="text-xs text-zinc-300 font-sans leading-tight">
                  {m.sub}
                </div>
                <div className={`text-[10px] font-pixel font-bold pt-1 ${m.accentColor} mc-text-shadow`}>
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
