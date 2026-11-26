import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalInfo, crossLinkConfig } from '../config/portfolio';

export interface FooterProps {
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Alternate Interactive Dimension (Minecraft Edition Cross-Link) */}
        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 font-semibold block">
              Minecraft Edition Portfolio
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Looking for an interactive version? Explore the Minecraft Edition portfolio with dynamic biome atmospheres, Web Audio sound effects, and diamond mining.
            </p>
          </div>

          <a
            href={crossLinkConfig.minecraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-[#1d7eb6] hover:text-[#1d7eb6] dark:hover:border-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors focus-ring shrink-0"
          >
            <span>Visit Minecraft Edition</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Navigation & Identity Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {personalInfo.name}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>NIE Mysuru (B.E. ISE 2027)</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ml-2"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Colophon & Admin link */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          <div>
            © {currentYear} Shreeharsha N. L. · React & Tailwind CSS
          </div>
          <div className="flex items-center space-x-2">
            <span>Hosted on Cloudflare Pages</span>
            <span>•</span>
            {onNavigateToAdmin ? (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors"
                title="Open Operator Dashboard"
              >
                /admin
              </button>
            ) : (
              <a href="/admin" className="hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors">
                /admin
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
