import React, { useState } from 'react';
import { ExternalLink, Award, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Project Screenshot / Visual Header */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading={index === 0 ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-600 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
            <ImageIcon className="w-8 h-8 mb-2 opacity-60" />
            <span className="text-xs font-mono">{project.title} Visual Asset</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase bg-slate-900/80 dark:bg-slate-950/80 text-white backdrop-blur-md shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Achievement Badge (if any) */}
        {project.achievement && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500 text-slate-950 shadow-sm backdrop-blur-md">
              <Award className="w-3 h-3" />
              <span>Awarded</span>
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Key Engineering Highlights */}
          <div className="pt-2 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {project.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies & Links Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
          
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3 pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-ring"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Codebase</span>
              </a>
            )}

            {(project.demoUrl || project.projectUrl) && (
              <a
                href={project.demoUrl || project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors focus-ring"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </div>

    </article>
  );
};
