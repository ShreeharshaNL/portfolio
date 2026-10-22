import React from 'react';
import { ArrowUp, ExternalLink, Gamepad2 } from 'lucide-react';
import { personalInfo, crossLinkConfig } from '../config/portfolio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0a0c10] text-slate-600 dark:text-slate-400 text-xs py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Tier: Cross-link to Minecraft Portfolio */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#10141e]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs sm:text-sm">
                Explore an alternate interactive dimension
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {crossLinkConfig.description}
              </p>
            </div>
          </div>

          <a
            href={crossLinkConfig.minecraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-800 dark:text-slate-200 shadow-sm transition-all focus-ring shrink-0"
          >
            <span>Visit Minecraft Edition</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
          </a>
        </div>

        {/* Middle Tier: Identity & Navigation Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              {personalInfo.name}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>NIE Mysuru (B.E. ISE 2027)</span>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center space-x-4">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Email Address"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-ring rounded"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Colophon */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {currentYear} Shreeharsha N. L. Built with React 18, TypeScript & Tailwind CSS.
          </div>
          <div>
            Hosted on Cloudflare Pages Edge Network.
          </div>
        </div>

      </div>
    </footer>
  );
};
