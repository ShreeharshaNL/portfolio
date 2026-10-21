import React from 'react';
import { ExternalLink, Award, ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import { sound } from '../utils/audio';
import { useGame } from '../context/GameContext';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { unlockAdvancement } = useGame();
  const isRepoOnly = !project.demoUrl && project.githubUrl;

  const handleCardClick = () => {
    sound.playClick();
    if (project.id === 'labelwise') {
      unlockAdvancement('winner');
    }
  };

  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleCardClick}
      onMouseEnter={() => sound.playPop()}
      className="group relative flex flex-col justify-between bg-[#181b24]/90 hover:bg-[#1f2432]/95 border-2 border-black hover:border-white shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] hover:translate-y-[-3px] transition-all duration-200 p-5 sm:p-6 cursor-pointer overflow-hidden"
    >
      <div className="space-y-4">
        
        {/* Project Homepage / Screenshot Preview (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video border-2 border-black bg-[#12141a] shadow-[inset_1px_1px_#0a0c10,inset_-1px_-1px_#2b3345] overflow-hidden group-hover:border-[#55ffff] transition-colors">
          <img
            src={project.image}
            alt={`${project.title} Screenshot Preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181b24]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

          {/* Corner Redirect Badge */}
          <div className="absolute top-2 right-2 w-7 h-7 bg-[#1c202a] border border-black group-hover:bg-[#4dedf4] group-hover:text-black flex items-center justify-center text-zinc-300 transition-colors">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Category & Achievement Badge */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[11px] font-pixel uppercase tracking-wider text-[#55ffff] font-bold mc-text-shadow">
            {project.category}
          </span>
          {project.achievement && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#fcee4b]/15 border border-[#fcee4b]/40 text-[10px] font-pixel text-[#fcee4b] font-bold mc-text-shadow">
              <Award className="w-3 h-3 text-[#fcee4b]" />
              <span>NeoNexus 2026 Winner</span>
            </span>
          )}
        </div>

        {/* Project Title */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-pixel font-bold text-white group-hover:text-[#ffffa0] transition-colors tracking-wide mc-text-shadow">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1 text-xs text-zinc-300 font-sans pt-1">
            {project.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#55ff55] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Tech Stack & Redirect Call to Action */}
      <div className="pt-4 mt-4 border-t border-black space-y-3">
        {/* Technologies tags as Minecraft inventory slot badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-[#12141a] border border-black text-[10px] font-pixel text-zinc-300 group-hover:text-white group-hover:border-zinc-500 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Link Prompt */}
        <div className="flex items-center justify-between pt-1 text-xs font-pixel text-zinc-300 group-hover:text-[#55ffff] transition-colors">
          <span>{isRepoOnly ? 'Open Repository' : 'Launch Application'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

    </a>
  );
};
