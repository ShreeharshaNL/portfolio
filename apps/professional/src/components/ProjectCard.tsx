import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group py-8 sm:py-10 transition-colors">
      
      {/* Title & Subdomain Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors focus-ring rounded"
          >
            {project.title}
          </a>

          {project.achievement && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {project.achievement}
            </span>
          )}
        </div>

        {/* Live Subdomain in Monospace with subtle ↗ link indicator */}
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-[#1d7eb6] dark:group-hover:text-[#1d7eb6] transition-colors shrink-0 focus-ring rounded"
          aria-label={`Open ${project.title} live at ${project.subdomain}`}
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Category */}
      <div className="mt-1">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {project.category}
        </span>
      </div>

      {/* Project Description (comfortable line-height 1.6) */}
      <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-3xl">
        {project.description}
      </p>

      {/* Engineering Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-[#1d7eb6] font-mono select-none">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Technical Tags & Codebase Link */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-ring rounded"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
          
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-zinc-700 dark:text-zinc-300 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] font-medium transition-colors focus-ring rounded"
          >
            <span>Visit Deployment</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </article>
  );
};
