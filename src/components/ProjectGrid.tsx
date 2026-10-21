import React from 'react';
import { projectsData } from '../config/portfolio';
import { ProjectCard } from './ProjectCard';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/audio';

export const ProjectGrid: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <span>[FEATURED INVENTORY]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            Selected Software Projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            Curated systems, hackathon-winning builds, and full-stack applications.
          </p>
        </div>

        {/* 3 Featured Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom GitHub Prompt */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/ShreeharshaNL"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-pixel text-zinc-300 hover:text-[#55ffff] transition-colors mc-text-shadow"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Explore more open-source repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
