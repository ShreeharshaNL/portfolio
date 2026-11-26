import React from 'react';
import { ArrowUpRight, Info, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.info-trigger-btn')) {
      return;
    }
    window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_-4px_rgba(217,164,65,0.2)] text-left"
    >
      {/* Corner Bracket Accents matching CAD theme */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cad-accent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cad-accent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cad-accent z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cad-accent z-20 pointer-events-none" />

      <div className="space-y-3.5">
        
        {/* Project Visual Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-cad-bg border-b border-cad-border">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-cad-muted">
              {project.subdomain}
            </div>
          )}

          {/* Vignette mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-cad-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

          {/* Subdomain pill tag on image */}
          <div className="absolute bottom-2.5 left-2.5 font-mono text-[11px] text-cad-accent bg-cad-bg/90 px-2 py-0.5 rounded-sm border border-cad-border flex items-center space-x-1">
            <span className="truncate max-w-[200px]">{project.subdomain}</span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </div>

          {/* (i) Info Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenDetails(project);
            }}
            className="info-trigger-btn absolute top-2.5 right-2.5 p-1.5 rounded-sm bg-cad-bg/90 hover:bg-cad-accent text-cad-text hover:text-cad-bg border border-cad-border hover:border-cad-accent transition-colors shadow-sm focus-ring"
            title="View full project details & architecture (i)"
            aria-label={`View details for ${project.title}`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="px-5 pt-1 space-y-2">
          
          {/* Title & Category Row */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base sm:text-lg tracking-tight text-cad-text group-hover:text-cad-accent transition-colors truncate">
                {project.title}
              </h3>
              
              {project.achievement && (
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium bg-cad-accent/10 text-cad-accent border border-cad-accent/30 shrink-0 truncate max-w-[140px]">
                  NeoNexus Winner
                </span>
              )}
            </div>

            <span className="text-[11px] font-mono text-cad-muted uppercase tracking-wider block">
              {project.category}
            </span>
          </div>

          {/* Concise Description */}
          <p className="text-xs sm:text-sm text-cad-muted leading-relaxed font-sans line-clamp-2">
            {project.description}
          </p>

        </div>

      </div>

      {/* Card Footer (Tags & Action Links) */}
      <div className="px-5 pb-5 pt-3 mt-2 border-t border-cad-border space-y-3">
        
        {/* Concise Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-sm text-[10px] font-mono text-cad-muted bg-cad-bg border border-cad-border"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-mono text-cad-dim">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenDetails(project);
            }}
            className="info-trigger-btn inline-flex items-center space-x-1 text-cad-muted hover:text-cad-accent font-mono text-[11px] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details (i)</span>
          </button>

          <span className="inline-flex items-center space-x-1 font-mono text-xs text-cad-accent group-hover:underline">
            <span>Launch</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

      </div>

    </article>
  );
};
