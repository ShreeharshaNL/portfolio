import React from 'react';
import { educationData } from '../config/portfolio';
import { GraduationCap, Award, Calendar } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-t border-[#232b3b]/60 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181e29] border border-[#232b3b] text-xs font-mono text-amber-400">
            <span>ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Achievement
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Formal engineering degree and hackathon recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Education Card */}
          <div className="p-7 rounded-2xl bg-[#121620]/90 border border-[#232b3b] hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#181e2b] border border-[#232b3b] flex items-center justify-center text-amber-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {educationData.institution}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Mysuru, Karnataka, India</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-base font-semibold text-zinc-200">
                  {educationData.degree} in {educationData.field}
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Expected Graduation: {educationData.expectedGraduation}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#232b3b] flex items-center justify-between text-xs">
              <span className="text-zinc-400">Cumulative GPA (ISE):</span>
              <span className="font-semibold text-emerald-400 font-mono text-sm">
                {educationData.cgpa} / 10.0
              </span>
            </div>
          </div>

          {/* Hackathon Achievement Card */}
          <div className="p-7 rounded-2xl bg-[#121620]/90 border border-amber-500/30 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group">
            {/* Subtle top amber highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20" />

            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {educationData.achievement.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">
                    {educationData.achievement.event}
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Awarded 1st place for designing and implementing <strong className="text-white">{educationData.achievement.project}</strong> — an AI-powered system leveraging Google Vision OCR to detect food additives and assist consumer health transparency.
              </p>
            </div>

            <div className="pt-4 border-t border-[#232b3b] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Team: {educationData.achievement.team}</span>
              <span>Year: {educationData.achievement.year}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
