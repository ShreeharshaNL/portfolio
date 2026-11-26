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
    <section id="projects" className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <div className="font-mono text-xs text-[#e07a5f] dark:text-[#f49d85] uppercase tracking-wider font-semibold mb-2">
              02 / Projects
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Selected Deployments & Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Live web applications and systems deployed under <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-medium">*.shreeharsha.online</span>. Click any card to launch, or <span className="font-mono text-xs text-[#e07a5f] dark:text-[#f49d85] font-semibold">(i)</span> for architecture details.
            </p>
          </div>

          {/* Pagination Controls (Showing 3 per page) */}
          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto font-mono text-xs">
            <span className="text-slate-500 dark:text-slate-400 mr-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#e8e0d5] dark:border-[#222d3d] bg-white/70 dark:bg-[#161d28]/60 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#e07a5f] text-slate-700 dark:text-slate-300 transition-colors focus-ring"
              aria-label="Previous projects page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-colors focus-ring ${
                  currentPage === idx + 1
                    ? 'bg-[#e07a5f] text-white shadow-sm shadow-[#e07a5f]/20'
                    : 'border border-[#e8e0d5] dark:border-[#222d3d] bg-white/70 dark:bg-[#161d28]/60 text-slate-700 dark:text-slate-300 hover:border-[#e07a5f]'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#e8e0d5] dark:border-[#222d3d] bg-white/70 dark:bg-[#161d28]/60 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#e07a5f] text-slate-700 dark:text-slate-300 transition-colors focus-ring"
              aria-label="Next projects page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Responsive Grid (Displays 3 projects per page) */}
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
         (i) PROJECT DETAILS MODAL
         ========================================================================= */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1017] p-6 sm:p-8 space-y-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            {selectedProject.image && (
              <div className="w-full aspect-[21/9] sm:aspect-[24/9] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 font-mono text-xs text-white bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                  {selectedProject.subdomain}
                </div>
              </div>
            )}

            {/* Title & Category Header */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {selectedProject.title}
                </h3>

                {selectedProject.achievement && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#e07a5f]/10 text-[#e07a5f] dark:text-[#f49d85] border border-[#e07a5f]/30">
                    <Award className="w-3.5 h-3.5 text-[#e07a5f]" />
                    <span>{selectedProject.achievement}</span>
                  </span>
                )}
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                {selectedProject.category}
              </span>
            </div>

            {/* Full Problem Statement / Description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200">
                Overview & Purpose
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {selectedProject.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#e8e0d5] dark:border-[#222d3d]">
                <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200">
                  Engineering Architecture & Highlights
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e07a5f] dark:text-[#f49d85] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Tech Stack */}
            <div className="space-y-2 pt-2 border-t border-[#e8e0d5] dark:border-[#222d3d]">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200">
                Technologies & Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono text-slate-700 dark:text-slate-300 bg-[#faf7f2] dark:bg-[#111620] border border-[#e8e0d5] dark:border-[#222d3d]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Direct Launch & Source */}
            <div className="pt-4 border-t border-[#e8e0d5] dark:border-[#222d3d] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#e07a5f] hover:bg-[#cf6b50] text-white text-xs font-medium transition-colors shadow-sm shadow-[#e07a5f]/20 focus-ring"
                >
                  <span>Launch Live Subdomain</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg border border-[#e8e0d5] dark:border-[#222d3d] hover:border-[#e07a5f] text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors focus-ring"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <span className="font-mono text-xs text-slate-400">
                {selectedProject.subdomain}
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
