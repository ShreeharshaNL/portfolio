import React from 'react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#1d7eb6] uppercase tracking-wider font-semibold mb-2">
            02 / Projects
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Selected Software & Deployments
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Applied systems, hackathon-winning builds, and production web applications deployed under subdomains of <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 font-medium">shreeharsha.online</span>.
          </p>
        </div>

        {/* Single-Column Editorial Index Layout with 1px Hairline Dividers */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
