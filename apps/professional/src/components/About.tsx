import React from 'react';
import { Check, Award, GraduationCap } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#1d7eb6] dark:text-[#38bdf8] uppercase tracking-wider font-semibold mb-2">
            01 / Profile
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Engineering with purpose, precision, and curiosity.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Core Engineering Tenets
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Practical solutions over unnecessary complexity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Type-safe, maintainable TypeScript & Python</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Accessible, high-contrast, responsive UI</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#1d7eb6] dark:text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Resilient REST APIs & serverless edge storage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Facts / Index Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Fact 1: Academic Standing */}
            <div className="p-5 rounded-xl glass-card glass-card-hover space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#1d7eb6] dark:text-[#38bdf8]" />
                <span>Academic Record</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                {educationData.cgpa} / 10.0 CGPA
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru.
              </p>
            </div>

            {/* Fact 2: Hackathon Achievement */}
            <div className="p-5 rounded-xl glass-card glass-card-hover space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#1d7eb6] dark:text-[#38bdf8]" />
                <span>Hackathon Milestone</span>
              </div>
              <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                NeoNexus 36.1 Winner
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                First place with Team Code4Care at BITM Ballari for LabelWise — an optical character recognition food ingredient scanner using Google Vision OCR.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
