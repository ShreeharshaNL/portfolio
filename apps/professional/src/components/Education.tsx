import React from 'react';
import { Award, Calendar, MapPin, CheckCircle2, GraduationCap } from 'lucide-react';
import { educationData, achievementData } from '../config/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-t-2 border-[#111111]/15 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold mb-4 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-0.5 font-black">04</span>
            <span className="px-3 py-0.5 text-[#111111] dark:text-white uppercase tracking-wider">Academia</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase leading-[1.08]">
            Education & Honors
          </h2>
          <p className="mt-3 text-base text-[#111111]/75 dark:text-slate-400">
            Formal undergraduate training in Information Science and Engineering, accompanied by competitive hackathon milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Education Card (7 cols) */}
          <div className="lg:col-span-7 card-editorial card-editorial-hover p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#111111]/10 dark:border-white/10 pb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Undergraduate Degree
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-[#111111] dark:text-white uppercase">
                    {educationData.institution}
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#5fb57a] text-[#111111] text-xs font-mono font-black border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] self-start sm:self-auto">
                <span>CGPA: {educationData.cgpa} / 10.0</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-[#111111] dark:text-slate-100">
                {educationData.degree} in {educationData.field}
              </h4>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-[#111111]/70 dark:text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5fb57a]" />
                  <span>2023 — {educationData.expectedGraduation} (Expected)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5fb57a]" />
                  <span>{educationData.location}</span>
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#111111]/60 dark:text-slate-400 font-bold">
                Curriculum Focus & Involvement
              </h5>
              <ul className="space-y-2 text-sm text-[#111111]/85 dark:text-slate-300">
                {educationData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Achievement Spotlight Card (5 cols) */}
          <div className="lg:col-span-5 card-editorial card-editorial-hover p-6 sm:p-8 space-y-5 border-l-8 border-l-[#5fb57a]">
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#111111]/60 dark:text-slate-400 font-bold">
                  Hackathon Victory
                </span>
                <h3 className="font-display text-xl font-black text-[#111111] dark:text-white uppercase">
                  {achievementData.title}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#111111]/85 dark:text-slate-300 leading-relaxed font-sans">
              <p>{achievementData.description}</p>
            </div>

            <div className="pt-4 border-t-2 border-[#111111]/10 dark:border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea] dark:bg-[#1a1d29]">
                <span className="text-[11px] text-[#111111]/60 dark:text-slate-400 font-mono font-bold uppercase block">Team</span>
                <p className="font-bold text-[#111111] dark:text-slate-100 mt-0.5">
                  {achievementData.team}
                </p>
              </div>
              <div className="p-3 rounded-xl border border-[#111111]/20 dark:border-white/10 bg-[#ebebea] dark:bg-[#1a1d29]">
                <span className="text-[11px] text-[#111111]/60 dark:text-slate-400 font-mono font-bold uppercase block">Event</span>
                <p className="font-bold text-[#111111] dark:text-slate-100 mt-0.5">
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
