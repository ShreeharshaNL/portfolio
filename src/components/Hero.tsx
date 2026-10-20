import React from 'react';
import { ArrowRight, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-[#181e2b]/85 border border-zinc-200 dark:border-[#232b3b] text-xs text-zinc-700 dark:text-zinc-300 font-medium shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>{personalInfo.eyebrow}</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Hi, I'm <span className="text-amber-500">Shreeharsha</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-medium max-w-2xl mx-auto leading-relaxed">
            {personalInfo.headline}
          </p>
        </div>

        {/* Short description */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-lg shadow-amber-950/20 active:scale-[0.99] group"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/85 dark:bg-[#181e2b]/85 hover:bg-white dark:hover:bg-[#202738] border border-zinc-200 dark:border-[#232b3b] text-zinc-800 dark:text-white font-medium text-sm transition-all backdrop-blur-md shadow-sm"
          >
            <Mail className="w-4 h-4 text-amber-500" />
            <span>Get in Touch</span>
          </a>

          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/85 dark:bg-[#181e2b]/85 hover:bg-white dark:hover:bg-[#202738] border border-zinc-200 dark:border-[#232b3b] text-zinc-700 dark:text-zinc-300 hover:text-sky-500 transition-colors text-sm backdrop-blur-md shadow-sm"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4 text-sky-500" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/85 dark:bg-[#181e2b]/85 hover:bg-white dark:hover:bg-[#202738] border border-zinc-200 dark:border-[#232b3b] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors text-sm backdrop-blur-md shadow-sm"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {personalInfo.social.resumeUrl && (
            <a
              href={personalInfo.social.resumeUrl}
              download
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/85 dark:bg-[#181e2b]/85 hover:bg-white dark:hover:bg-[#202738] border border-zinc-200 dark:border-[#232b3b] text-zinc-700 dark:text-zinc-300 hover:text-amber-500 transition-colors text-sm backdrop-blur-md shadow-sm"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Résumé</span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
};
