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
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-xs py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Alternate Interactive Dimension (Minecraft Edition Cross-Link) */}
        <div className="p-5 rounded-xl glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold block">
              Minecraft Edition Portfolio
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Looking for an interactive experience? Explore the Minecraft Edition portfolio with dynamic biome atmospheres, Web Audio sound effects, and diamond mining.
            </p>
          </div>

          <a
            href={crossLinkConfig.minecraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 border border-[#e8e0d5] dark:border-[#222d3d] hover:border-[#e07a5f] hover:text-[#e07a5f] dark:hover:border-[#f49d85] dark:hover:text-[#f49d85] bg-white/40 dark:bg-[#161d28]/40 transition-colors focus-ring shrink-0"
          >
            <span>Visit Minecraft Edition</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Navigation & Identity Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {personalInfo.name}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>NIE Mysuru (B.E. ISE 2027)</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="text-slate-600 dark:text-slate-400 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ml-2"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Colophon & Admin link */}
        <div className="pt-4 border-t border-[#e8e0d5] dark:border-[#222d3d] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
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
                className="hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors"
                title="Open Operator Dashboard"
              >
                /admin
              </button>
            ) : (
              <a href="/admin" className="hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors">
                /admin
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
