import React from 'react';
import { educationData } from '../config/portfolio';
import { TotemIcon } from './MinecraftIcons';
import { sound } from '../utils/audio';
import { Calendar, Award } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <TotemIcon size={14} />
            <span>[ACADEMICS & ADVANCEMENTS]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            Education & Recognition
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            Formal engineering degree and hackathon championship recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Education Card */}
          <div
            onMouseEnter={() => sound.playPop()}
            className="p-6 sm:p-7 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] hover:border-zinc-300 transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 bg-[#12141a] border-2 border-black shadow-[inset_1px_1px_#0a0c10,inset_-1px_-1px_#32394c] flex items-center justify-center shrink-0">
                  <TotemIcon size={26} />
                </div>
                <div>
                  <h3 className="font-pixel font-bold text-white text-lg leading-tight mc-text-shadow">
                    {educationData.institution}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Mysuru, Karnataka, India</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-sm sm:text-base font-pixel text-[#55ffff] font-semibold mc-text-shadow">
                  {educationData.degree} in {educationData.field}
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-300 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-[#fcee4b]" />
                  <span>Expected Graduation: {educationData.expectedGraduation}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black flex items-center justify-between text-xs font-pixel">
              <span className="text-zinc-400">Cumulative GPA (ISE):</span>
              <span className="font-bold text-[#55ff55] text-sm mc-text-shadow">
                {educationData.cgpa} / 10.0
              </span>
            </div>
          </div>

          {/* Hackathon Achievement Card */}
          <div
            onMouseEnter={() => sound.playPop()}
            className="p-6 sm:p-7 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] hover:border-[#fcee4b] transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 bg-[#12141a] border-2 border-black shadow-[inset_1px_1px_#0a0c10,inset_-1px_-1px_#32394c] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#fcee4b]" />
                </div>
                <div>
                  <h3 className="font-pixel font-bold text-[#fcee4b] text-lg leading-tight mc-text-shadow">
                    {educationData.achievement.title}
                  </h3>
                  <p className="text-xs text-[#55ffff] font-pixel mt-0.5">
                    {educationData.achievement.event}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                Awarded 1st place for designing and building <strong className="text-white font-semibold">{educationData.achievement.project}</strong> — an AI-powered system leveraging Google Vision OCR to detect food additives and assist consumer health transparency.
              </p>
            </div>

            <div className="pt-4 border-t border-black flex items-center justify-between text-xs font-pixel text-zinc-300">
              <span className="text-zinc-400">Team: {educationData.achievement.team}</span>
              <span className="text-[#fcee4b] font-bold mc-text-shadow">Year: {educationData.achievement.year}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
