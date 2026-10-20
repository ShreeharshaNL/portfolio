import React from 'react';
import { ExternalLink, Award, ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between rounded-2xl bg-[#121620]/90 hover:bg-[#151a28] border border-[#232b3b] hover:border-amber-500/50 transition-all duration-300 p-5 sm:p-6 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer overflow-hidden backdrop-blur-md"
    >
      {/* Top subtle amber highlight border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/80 transition-all duration-500" />

      <div className="space-y-4">
        
        {/* Project Homepage / UI Photo Mockup Preview */}
        <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-[#232b3b] group-hover:border-amber-500/40 transition-all duration-300 bg-[#080b11]">
          <img
            src={project.image}
            alt={`${project.title} Interface Preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          
          {/* Subtle gradient overlay to blend into the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

          {/* Quick Corner Badge */}
          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-[#0c0f17]/90 border border-[#232b3b] group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 flex items-center justify-center text-zinc-300 transition-all shadow-md">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Category & Achievement Badge */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-medium">
            {project.category}
          </span>
          {project.achievement && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] text-amber-300 font-semibold">
              <Award className="w-3 h-3 text-amber-400" />
              <span>NeoNexus Winner</span>
            </span>
          )}
        </div>

        {/* Project Title */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
            {project.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Tech Stack & Redirect Call to Action */}
      <div className="pt-5 mt-5 border-t border-[#232b3b]/80 space-y-3">
        {/* Technologies tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-0.5 rounded-md bg-[#181e2b] border border-[#232b3b] text-xs font-mono text-zinc-400 group-hover:border-zinc-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Link Prompt */}
        <div className="flex items-center justify-between pt-1 text-xs font-medium text-zinc-400 group-hover:text-amber-400 transition-colors">
          <span>Click card to open project site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

    </a>
  );
};
