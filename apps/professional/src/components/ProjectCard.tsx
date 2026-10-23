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
    <article className="group card-editorial card-editorial-hover overflow-hidden flex flex-col h-full">
      
      {/* Project Screenshot / Visual Header */}
      <div className="relative aspect-video w-full bg-[#dededb] dark:bg-[#1f2230] border-b-2 border-[#111111] dark:border-white/20 overflow-hidden">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading={index === 0 ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[#111111]/40 dark:text-slate-600 bg-[#ebebea] dark:bg-[#15171f]">
            <ImageIcon className="w-8 h-8 mb-2 opacity-60" />
            <span className="text-xs font-mono font-bold uppercase">{project.title} Visual Asset</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#111111] text-white dark:bg-white dark:text-[#111111] border border-[#111111] dark:border-white shadow-[2px_2px_0px_0px_#5fb57a]">
            {project.category}
          </span>
        </div>

        {/* Achievement Badge (if any) */}
        {project.achievement && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#5fb57a] text-[#111111] border border-[#111111] shadow-[2px_2px_0px_0px_#111111]">
              <Award className="w-3.5 h-3.5" />
              <span>Awarded</span>
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        
        <div className="space-y-3">
          <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#111111] dark:text-white uppercase group-hover:text-[#5fb57a] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[#111111]/80 dark:text-slate-300 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Key Engineering Highlights */}
          <div className="pt-2 space-y-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-1.5 text-xs text-[#111111] dark:text-slate-300">
              {project.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies & Links Footer */}
        <div className="pt-5 border-t-2 border-[#111111]/10 dark:border-white/10 space-y-4">
          
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#ebebea] dark:bg-[#1a1d29] text-[#111111] dark:text-slate-200 border border-[#111111]/30 dark:border-white/20"
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
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide border-2 border-[#111111] dark:border-white/30 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[3px_3px_0px_0px_#5fb57a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring"
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
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide bg-[#5fb57a] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring"
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
