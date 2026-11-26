import React from 'react';
import { Calendar, MapPin, Award, GraduationCap } from 'lucide-react';
import { educationData, achievementData } from '../config/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 sm:py-24 border-t border-cad-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="font-mono text-xs text-cad-accent uppercase tracking-wider font-semibold mb-2">
            04 / Credentials &amp; Honors
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-cad-text transition-colors">
            Academic Credentials &amp; Hackathons
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cad-muted leading-relaxed font-sans transition-colors">
            Undergraduate training in Information Science and Engineering paired with competitive hackathon outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Main Education Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent transition-all space-y-5 relative group shadow-sm">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cad-accent pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-cad-border pb-4">
              <div>
                <span className="text-xs font-mono text-cad-muted uppercase tracking-wider flex items-center space-x-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cad-accent" />
                  <span>Undergraduate Degree</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-cad-text mt-1">
                  {educationData.institution}
                </h3>
              </div>
              <div className="font-mono text-xs font-bold text-cad-accent shrink-0">
                CGPA: {educationData.cgpa} / 10.0
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-semibold text-cad-text">
                {educationData.degree} in {educationData.field}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-cad-muted">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cad-accent" />
                  <span>2023 — {educationData.expectedGraduation} (Expected)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cad-accent" />
                  <span>{educationData.location}</span>
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-xs font-mono text-cad-accent uppercase tracking-wider block font-semibold">
                Curriculum Focus
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-cad-muted">
                {educationData.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cad-accent font-mono select-none">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Hackathon Achievement (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent transition-all space-y-4 relative group shadow-sm">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cad-accent pointer-events-none" />

            <div className="flex items-center space-x-2 text-xs font-mono text-cad-muted uppercase tracking-wider">
              <Award className="w-4 h-4 text-cad-accent" />
              <span>Competitive Victory</span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-cad-text">
                {achievementData.title}
              </h3>
              <p className="text-xs font-mono text-cad-accent mt-0.5">
                {achievementData.team} · {achievementData.event}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-cad-muted leading-relaxed font-sans">
              {achievementData.description}
            </p>

            <div className="pt-4 border-t border-cad-border grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-cad-dim block text-[10px]">TEAM</span>
                <span className="text-cad-text font-semibold">{achievementData.team}</span>
              </div>
              <div>
                <span className="text-cad-dim block text-[10px]">YEAR</span>
                <span className="text-cad-accent font-semibold">{achievementData.year}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
