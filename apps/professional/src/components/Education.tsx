import React from 'react';
import { Calendar, MapPin, Award, GraduationCap } from 'lucide-react';
import { educationData, achievementData } from '../config/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#1d7eb6] dark:text-[#38bdf8] uppercase tracking-wider font-semibold mb-2">
            04 / Education & Honors
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Academic Credentials & Hackathons
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Undergraduate training in Information Science and Engineering paired with competitive hackathon outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Education Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl glass-card glass-card-hover space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8]" />
                  <span>Undergraduate Degree</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                  {educationData.institution}
                </h3>
              </div>
              <div className="font-mono text-xs font-semibold text-[#1d7eb6] dark:text-[#38bdf8] shrink-0">
                CGPA: {educationData.cgpa} / 10.0
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                {educationData.degree} in {educationData.field}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8]" />
                  <span>2023 — {educationData.expectedGraduation} (Expected)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8]" />
                  <span>{educationData.location}</span>
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                Curriculum Focus
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {educationData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#1d7eb6] dark:text-[#38bdf8] font-mono select-none">—</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Hackathon Achievement (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl glass-card glass-card-hover space-y-4">
            
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#1d7eb6] dark:text-[#38bdf8]" />
              <span>Competitive Victory</span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {achievementData.title}
              </h3>
              <p className="text-xs font-mono text-[#1d7eb6] dark:text-[#38bdf8] mt-0.5">
                {achievementData.team} · {achievementData.event}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {achievementData.description}
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Team</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{achievementData.team}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Year</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{achievementData.year}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
