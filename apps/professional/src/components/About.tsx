import React from 'react';
import { Check, Award, GraduationCap } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 border-t border-cad-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="font-mono text-xs text-cad-accent uppercase tracking-wider font-semibold mb-2">
            01 / Profile &amp; Specifications
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-cad-text transition-colors">
            Engineering with purpose, precision, and curiosity.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-cad-muted leading-relaxed font-sans transition-colors">
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-6 border-t border-cad-border">
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent mb-4">
                Core Engineering Tenets
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-cad-muted">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-cad-status shrink-0 mt-0.5" />
                  <span>Practical solutions over unnecessary complexity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-cad-status shrink-0 mt-0.5" />
                  <span>Type-safe, maintainable TypeScript &amp; Python</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-cad-status shrink-0 mt-0.5" />
                  <span>Accessible, high-contrast, responsive UI</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-cad-status shrink-0 mt-0.5" />
                  <span>Resilient REST APIs &amp; serverless edge storage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Facts / Index Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Fact 1: Academic Standing */}
            <div className="p-5 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent transition-all space-y-2 relative group shadow-sm">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cad-accent pointer-events-none" />
              <div className="flex items-center space-x-2 text-xs font-mono text-cad-muted uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-cad-accent" />
                <span>Academic Record</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-cad-accent font-mono">
                {educationData.cgpa} / 10.0 CGPA
              </div>
              <p className="text-xs text-cad-muted font-sans leading-relaxed">
                Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru.
              </p>
            </div>

            {/* Fact 2: Hackathon Achievement */}
            <div className="p-5 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent transition-all space-y-2 relative group shadow-sm">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cad-accent pointer-events-none" />
              <div className="flex items-center space-x-2 text-xs font-mono text-cad-muted uppercase tracking-wider">
                <Award className="w-4 h-4 text-cad-accent" />
                <span>Hackathon Milestone</span>
              </div>
              <div className="text-lg font-bold tracking-tight text-cad-text">
                NeoNexus 36.1 Winner
              </div>
              <p className="text-xs text-cad-muted font-sans leading-relaxed">
                First place with Team Code4Care at BITM Ballari for LabelWise — an optical character recognition food ingredient scanner using Google Vision OCR.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
