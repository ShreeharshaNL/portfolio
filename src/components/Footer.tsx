import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../config/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 border-t border-zinc-200/60 dark:border-[#232b3b]/60 text-xs text-zinc-600 dark:text-zinc-500 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div>
          <span className="text-zinc-900 dark:text-zinc-300 font-medium">{personalInfo.name}</span>
          <span className="mx-2">•</span>
          <span>Information Science & Engineering · NIE Mysuru</span>
        </div>

        <div className="flex items-center space-x-6 text-zinc-600 dark:text-zinc-400">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.social.email}`}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-amber-500 transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
