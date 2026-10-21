import React from 'react';
import { skillsGroups } from '../config/portfolio';
import { sound } from '../utils/audio';
import { RedstoneDust } from './MinecraftIcons';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <RedstoneDust size={14} />
            <span>[DEVELOPER TOOLBOX]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            Technical Skills & Tools
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            Languages, frameworks, databases, and developer utilities I build with.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsGroups.map((group, index) => (
            <div
              key={index}
              onMouseEnter={() => sound.playPop()}
              className="p-5 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,4px_4px_0px_rgba(0,0,0,0.5)] space-y-3.5 hover:border-zinc-400 transition-all group"
            >
              <div className="flex items-center justify-between border-b border-black pb-2">
                <h3 className="text-xs font-pixel font-bold text-white uppercase tracking-wider group-hover:text-[#ffffa0] transition-colors mc-text-shadow">
                  {group.category}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  {group.items.length} items
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      sound.playPop();
                    }}
                    className="px-2.5 py-1 bg-[#12141a] border border-black text-xs font-pixel text-zinc-200 hover:text-[#55ffff] hover:border-[#55ffff] hover:bg-[#1c2230] transition-all cursor-default select-none shadow-[inset_1px_1px_#0a0c10]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
