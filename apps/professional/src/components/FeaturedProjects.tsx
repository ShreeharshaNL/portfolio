import React from 'react';
import { FolderGit2 } from 'lucide-react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Practical software built for utility and impact.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
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
