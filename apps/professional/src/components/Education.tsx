import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { educationData, achievementData } from '../config/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education & Honors
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Formal undergraduate training in Information Science and Engineering, accompanied by competitive hackathon milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Education Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-5">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Undergraduate Degree
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {educationData.institution}
                </h3>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-semibold self-start sm:self-auto">
                <span>CGPA: {educationData.cgpa} / 10.0</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
                {educationData.degree} in {educationData.field}
              </h4>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2023 — {educationData.expectedGraduation} (Expected)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{educationData.location}</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                Curriculum Focus & Involvement
              </h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {educationData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Achievement Spotlight Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/50 to-white dark:from-[#151310] dark:to-[#10141e] shadow-sm space-y-5">
            
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  Hackathon Victory
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {achievementData.title}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{achievementData.description}</p>
            </div>

            <div className="pt-3 border-t border-amber-200/60 dark:border-amber-900/40 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono">Team</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {achievementData.team}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-mono">Event</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {achievementData.event}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
