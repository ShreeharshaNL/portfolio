import React from 'react';
import { BookOpen, Compass, Terminal, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0e14]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering with purpose, precision, and curiosity.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono mb-3">
                Key Engineering Tenets
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Practical problem solving over hype</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Type-safe, maintainable TypeScript & Python</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Fast, accessible, and responsive user interfaces</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Resilient serverless APIs & edge databases</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlights & Metrics Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Card 1: Academic Standing */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                    Academic Standing
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {educationData.cgpa} / 10.0 CGPA
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru.
              </p>
            </div>

            {/* Card 2: Hackathon Recognition */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                    Competitive Hackathon
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    NeoNexus 36.1 Winner
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1st place with Team Code4Care for LabelWise — AI food label scanner using Google Vision OCR.
              </p>
            </div>

            {/* Card 3: Engineering Approach */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                    Engineering Approach
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    Full-Stack & Applied AI
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Building functional web platforms combining modern React frontends, robust backend APIs, and computer vision / NLP.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
