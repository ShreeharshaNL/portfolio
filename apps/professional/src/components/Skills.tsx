import React from 'react';
import { skillsGroups } from '../config/portfolio';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 border-t border-cad-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="font-mono text-xs text-cad-accent uppercase tracking-wider font-semibold mb-2">
            03 / Skills &amp; Stack Registers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-cad-text transition-colors">
            Languages, Frameworks &amp; Tooling
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cad-muted leading-relaxed font-sans transition-colors">
            Technical competencies applied across engineering coursework, hackathon sprints, and full-stack projects.
          </p>
        </div>

        {/* Technical Register Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {skillsGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent flex flex-col justify-between space-y-4 relative group transition-all shadow-sm"
            >
              {/* Corner Marker */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cad-accent pointer-events-none" />

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cad-accent" />
                  <span>{group.category}</span>
                </h3>
              </div>

              {/* Skills in Monospace Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-cad-text bg-cad-subtle px-2.5 py-1 rounded-sm border border-cad-border hover:border-cad-accent hover:text-cad-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
