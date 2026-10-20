import React from 'react';
import { skillsGroups } from '../config/portfolio';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t border-zinc-200/60 dark:border-[#232b3b]/60 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#181e29] border border-zinc-200 dark:border-[#232b3b] text-xs font-mono text-amber-500 shadow-sm">
            <span>TOOLBOX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Languages, frameworks, and developer tools I build with.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsGroups.map((group, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/85 dark:bg-[#121620]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] space-y-4 hover:border-amber-500/40 transition-all group shadow-xl shadow-black/5 dark:shadow-black/20"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wide group-hover:text-amber-500 transition-colors">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b] text-xs text-zinc-700 dark:text-zinc-300 font-medium group-hover:border-zinc-400 dark:group-hover:border-zinc-700 transition-colors"
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
