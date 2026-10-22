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
  'Programming Languages': <Code2 className="w-4 h-4 text-indigo-500" />,
  'Frontend Development': <Layout className="w-4 h-4 text-sky-500" />,
  'Backend & APIs': <Server className="w-4 h-4 text-emerald-500" />,
  'Databases & Storage': <Database className="w-4 h-4 text-amber-500" />,
  'AI & Core Engineering': <BrainCircuit className="w-4 h-4 text-purple-500" />,
  'Tools & Cloud Systems': <Wrench className="w-4 h-4 text-rose-500" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0e14]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Languages, frameworks, and engineering tools.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            A structured repertoire of technical competencies developed through coursework, hackathons, and practical web projects.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                  {categoryIcons[group.category] || <Code2 className="w-4 h-4 text-indigo-500" />}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {group.category}
                </h3>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <Check className="w-3 h-3 text-emerald-500 shrink-0" />
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
