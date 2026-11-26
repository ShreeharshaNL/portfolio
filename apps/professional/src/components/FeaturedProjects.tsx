import React, { useState, useEffect } from 'react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectItem } from '../types';
import { X, Award, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

const PROJECTS_PER_PAGE = 3;

export const FeaturedProjects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const totalPages = Math.ceil(projectsData.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projectsData.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-cad-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <div className="font-mono text-xs text-cad-accent uppercase tracking-wider font-semibold mb-2">
              02 / Projects &amp; Deployments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-cad-text">
              Selected Deployments &amp; Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-cad-muted leading-relaxed font-sans">
              Live web applications and systems deployed under <span className="font-mono text-xs text-cad-accent font-semibold">*.shreeharsha.online</span>. Click any card to launch, or <span className="font-mono text-xs text-cad-accent font-semibold">(i)</span> for architecture inspection.
            </p>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto font-mono text-xs">
            <span className="text-cad-muted mr-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-sm border border-cad-border bg-cad-panel disabled:opacity-40 disabled:cursor-not-allowed hover:border-cad-accent text-cad-text transition-colors focus-ring"
              aria-label="Previous projects page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-sm text-xs font-mono font-medium transition-colors focus-ring ${
                  currentPage === idx + 1
                    ? 'bg-cad-accent text-cad-bg font-bold shadow-md shadow-cad-accent/20'
                    : 'border border-cad-border bg-cad-panel text-cad-muted hover:border-cad-accent hover:text-cad-text'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-sm border border-cad-border bg-cad-panel disabled:opacity-40 disabled:cursor-not-allowed hover:border-cad-accent text-cad-text transition-colors focus-ring"
              aria-label="Next projects page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
         (i) PROJECT DETAILS MODAL (Schematic CAD Window)
         ========================================================================= */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-cad-bg/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm border border-cad-border bg-cad-panel p-6 sm:p-8 space-y-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 4 Golden Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cad-accent pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cad-accent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cad-accent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cad-accent pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-sm text-cad-muted hover:text-cad-bg hover:bg-cad-accent transition-colors focus-ring"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            {selectedProject.image && (
              <div className="w-full aspect-[21/9] sm:aspect-[24/9] rounded-sm overflow-hidden border border-cad-border bg-cad-bg relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cad-bg/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 font-mono text-xs text-cad-accent bg-cad-bg/90 px-2.5 py-1 rounded-sm border border-cad-border">
                  {selectedProject.subdomain}
                </div>
              </div>
            )}

            {/* Title & Category Header */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-cad-text">
                  {selectedProject.title}
                </h3>

                {selectedProject.achievement && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-sm text-xs font-mono font-medium bg-cad-accent/10 text-cad-accent border border-cad-accent/30">
                    <Award className="w-3.5 h-3.5 text-cad-accent" />
                    <span>{selectedProject.achievement}</span>
                  </span>
                )}
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-cad-muted">
                {selectedProject.category}
              </span>
            </div>

            {/* Full Problem Statement / Description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent">
                Overview &amp; Purpose
              </h4>
              <p className="text-sm text-cad-muted leading-relaxed font-sans">
                {selectedProject.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-cad-border">
                <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent">
                  Engineering Architecture &amp; Highlights
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-cad-muted">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-cad-status shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Tech Stack */}
            <div className="space-y-2 pt-2 border-t border-cad-border">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent">
                Technologies &amp; Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-sm text-xs font-mono text-cad-text bg-cad-panel-subtle border border-cad-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-cad-border flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-sm text-xs font-mono font-medium text-cad-text border border-cad-border hover:border-cad-accent hover:text-cad-accent bg-cad-panel-subtle transition-colors focus-ring"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <a
                href={selectedProject.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs font-mono font-bold bg-cad-accent text-cad-bg hover:bg-cad-accent-hover shadow-md shadow-cad-accent/20 transition-all focus-ring"
              >
                <span>Launch Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
