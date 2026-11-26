import React from 'react';
import { skillsGroups } from '../config/portfolio';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#1d7eb6] dark:text-[#38bdf8] uppercase tracking-wider font-semibold mb-2">
            03 / Skills
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Languages, Frameworks & Tooling
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Technical competencies applied across engineering coursework, hackathon sprints, and full-stack projects.
          </p>
        </div>

        {/* Clean Editorial Index Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-xl glass-card glass-card-hover flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-100">
                  {group.category}
                </h3>
              </div>

              {/* Skills in Monospace Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/60 px-2.5 py-1 rounded border border-slate-200/80 dark:border-slate-700/60"
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
