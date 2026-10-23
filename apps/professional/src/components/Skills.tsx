import React from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  BrainCircuit, 
  Wrench, 
  Check 
} from 'lucide-react';
import { skillsGroups } from '../config/portfolio';

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 className="w-4 h-4" />,
  'Frontend Development': <Layout className="w-4 h-4" />,
  'Backend & APIs': <Server className="w-4 h-4" />,
  'Databases & Storage': <Database className="w-4 h-4" />,
  'AI & Core Engineering': <BrainCircuit className="w-4 h-4" />,
  'Tools & Cloud Systems': <Wrench className="w-4 h-4" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t-2 border-[#111111]/15 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold mb-4 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-0.5 font-black">03</span>
            <span className="px-3 py-0.5 text-[#111111] dark:text-white uppercase tracking-wider">Skills</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase leading-[1.08]">
            Languages, frameworks, and engineering tools.
          </h2>
          <p className="mt-3 text-base text-[#111111]/75 dark:text-slate-400">
            A structured repertoire of technical competencies developed through coursework, hackathons, and practical web projects.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsGroups.map((group) => (
            <div
              key={group.category}
              className="card-editorial card-editorial-hover p-6 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  {categoryIcons[group.category] || <Code2 className="w-4 h-4" />}
                </div>
                <h3 className="font-display text-base font-black text-[#111111] dark:text-white uppercase tracking-tight">
                  {group.category}
                </h3>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ebebea] dark:bg-[#1f2230] text-[#111111] dark:text-slate-200 border border-[#111111]/30 dark:border-white/20 hover:border-[#111111] dark:hover:border-white transition-colors"
                  >
                    <Check className="w-3 h-3 text-[#5fb57a] shrink-0" />
                    <span>{skill}</span>
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
