import React from 'react';
import { ArrowUpRight, Info, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Only redirect if target is not the info button
    const target = e.target as HTMLElement;
    if (target.closest('.info-trigger-btn')) {
      return;
    }
    window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-xl glass-card glass-card-hover overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#e07a5f]/10 text-left"
    >
      <div className="space-y-3.5">
        
        {/* Project Screenshot Visual Header (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-[#e8e0d5] dark:border-[#222d3d]">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-slate-400">
              {project.subdomain}
            </div>
          )}

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

          {/* Subdomain pill tag on image */}
          <div className="absolute bottom-2.5 left-2.5 font-mono text-[11px] text-white/95 bg-slate-950/75 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 flex items-center space-x-1">
            <span className="truncate max-w-[200px]">{project.subdomain}</span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </div>

          {/* (i) Info Button (stops redirection and opens full project details modal) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenDetails(project);
            }}
            className="info-trigger-btn absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/80 hover:bg-[#e07a5f] text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-colors shadow-sm focus-ring"
            title="View full project details & architecture (i)"
            aria-label={`View details for ${project.title}`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Body (Useful info only) */}
        <div className="px-5 pt-1 space-y-2">
          
          {/* Title & Category Row */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-[#e07a5f] dark:group-hover:text-[#f49d85] transition-colors truncate">
                {project.title}
              </h3>
              
              {project.achievement && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#e07a5f]/10 text-[#e07a5f] dark:text-[#f49d85] border border-[#e07a5f]/20 shrink-0 truncate max-w-[140px]">
                  NeoNexus Winner
                </span>
              )}
            </div>

            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              {project.category}
            </span>
          </div>

          {/* Concise Description (useful info only) */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
            {project.description}
          </p>

        </div>

      </div>

      {/* Card Footer (Tags & Action Links) */}
      <div className="px-5 pb-5 pt-3 mt-2 border-t border-[#e8e0d5] dark:border-[#222d3d] space-y-3">
        
        {/* Concise Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-[#faf7f2] dark:bg-[#111620] border border-[#e8e0d5] dark:border-[#222d3d]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1 text-xs">
          {/* Info Details Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenDetails(project);
            }}
            className="info-trigger-btn inline-flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-[#e07a5f] dark:hover:text-[#f49d85] font-mono text-[11px] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details (i)</span>
          </button>

          {/* Launch App Button */}
          <span className="inline-flex items-center space-x-1 font-medium text-xs text-[#e07a5f] dark:text-[#f49d85] group-hover:underline">
            <span>Launch</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

      </div>

    </article>
  );
};
