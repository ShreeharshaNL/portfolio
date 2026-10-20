import React from 'react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectGrid: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-t border-zinc-200/60 dark:border-[#232b3b]/60 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#181e29] border border-zinc-200 dark:border-[#232b3b] text-xs font-mono text-amber-500 shadow-sm">
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Selected Projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Click on any project card to open its live site or repository.
          </p>
        </div>

        {/* 3 Featured Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom GitHub Prompt */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/ShreeharshaNL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-zinc-700 dark:text-zinc-400 hover:text-amber-500 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Explore more open-source repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
