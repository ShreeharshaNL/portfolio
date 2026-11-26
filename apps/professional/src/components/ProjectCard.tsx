import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
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
            className="font-bold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-slate-100 hover:text-[#1d7eb6] dark:hover:text-[#38bdf8] transition-colors focus-ring rounded"
          >
            {project.title}
          </a>

          {project.achievement && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#1d7eb6]/10 text-[#1d7eb6] dark:text-[#38bdf8] border border-[#1d7eb6]/30">
              <Award className="w-3 h-3 text-[#1d7eb6]" />
              <span>{project.achievement}</span>
            </span>
          )}
        </div>

        {/* Live Subdomain in Monospace with subtle ↗ link indicator */}
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 font-mono text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-[#1d7eb6] dark:group-hover:text-[#38bdf8] transition-colors shrink-0 focus-ring rounded"
          aria-label={`Open ${project.title} live at ${project.subdomain}`}
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Category */}
      <div className="mt-1">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {project.category}
        </span>
      </div>

      {/* Optional Visual Preview if image exists */}
      {project.image && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-[21/9] sm:aspect-[24/9] relative group/img">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover/img:opacity-10 transition-opacity" />
          <div className="absolute bottom-2.5 left-3 font-mono text-[11px] text-white/90 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
            {project.subdomain}
          </div>
        </div>
      )}

      {/* Project Description (comfortable line-height 1.6) */}
      <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-3xl">
        {project.description}
      </p>

      {/* Engineering Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-[#1d7eb6] dark:text-[#38bdf8] font-mono select-none">—</span>
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
              className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800"
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
              className="inline-flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus-ring rounded"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
          
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-slate-800 dark:text-slate-200 hover:text-[#1d7eb6] dark:hover:text-[#38bdf8] font-medium transition-colors focus-ring rounded"
          >
            <span>Visit Deployment</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </article>
  );
};
