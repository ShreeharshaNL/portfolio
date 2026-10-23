import React from 'react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-t-2 border-[#111111]/15 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold mb-4 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-0.5 font-black">02</span>
            <span className="px-3 py-0.5 text-[#111111] dark:text-white uppercase tracking-wider">Projects</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase leading-[1.08]">
            Practical software built for utility and impact.
          </h2>
          <p className="mt-3 text-base text-[#111111]/75 dark:text-slate-400">
            Selected engineering projects demonstrating full-stack architecture, computer vision OCR, and domain-specific query pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
