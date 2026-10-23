import React from 'react';
import { BookOpen, Terminal, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t-2 border-[#111111]/15 dark:border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold mb-4 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-0.5 font-black">01</span>
            <span className="px-3 py-0.5 text-[#111111] dark:text-white uppercase tracking-wider">Profile</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase leading-[1.08]">
            Engineering with purpose, precision, and curiosity.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 card-editorial p-6 sm:p-8 space-y-6 text-[#111111]/85 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-4 border-t-2 border-[#111111]/10 dark:border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-100 mb-4">
                Key Engineering Tenets
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#111111] dark:text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
                  <span>Practical problem solving over hype</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
                  <span>Type-safe, maintainable TypeScript & Python</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
                  <span>Fast, accessible, and responsive user interfaces</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
                  <span>Resilient serverless APIs & edge databases</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlights & Metrics Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            
            {/* Card 1: Academic Standing */}
            <div className="card-editorial card-editorial-hover p-6">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Academic Standing
                  </div>
                  <div className="font-display text-2xl font-black text-[#111111] dark:text-white">
                    {educationData.cgpa} / 10.0 CGPA
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#111111]/70 dark:text-slate-400 pl-13">
                Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru.
              </p>
            </div>

            {/* Card 2: Hackathon Recognition */}
            <div className="card-editorial card-editorial-hover p-6 border-l-8 border-l-[#5fb57a]">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Competitive Hackathon
                  </div>
                  <div className="font-display text-xl font-black text-[#111111] dark:text-white">
                    NeoNexus 36.1 Winner
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#111111]/70 dark:text-slate-400 pl-13">
                1st place with Team Code4Care at BITM Ballari for LabelWise — AI food label scanner using Google Vision OCR.
              </p>
            </div>

            {/* Card 3: Engineering Approach */}
            <div className="card-editorial card-editorial-hover p-6">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                    Engineering Approach
                  </div>
                  <div className="font-display text-xl font-black text-[#111111] dark:text-white">
                    Full-Stack & Applied AI
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#111111]/70 dark:text-slate-400 pl-13">
                Building functional web platforms combining modern React frontends, robust backend APIs, and computer vision / NLP.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
