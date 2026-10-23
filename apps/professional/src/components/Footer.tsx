import React from 'react';
import { ArrowUp, ExternalLink, Gamepad2 } from 'lucide-react';
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
    <footer className="border-t-2 border-[#111111]/15 dark:border-white/10 bg-[#ebebea] dark:bg-[#0b0c10] text-[#111111]/70 dark:text-slate-400 text-xs py-10 sm:py-14 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Top Tier: Cross-link to Minecraft Portfolio */}
        <div className="card-editorial p-5 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 border-2 border-[#111111] dark:border-white/20">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a] text-[#111111] flex items-center justify-center font-bold shrink-0">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-black text-[#111111] dark:text-white uppercase tracking-tight">
                Explore an alternate interactive dimension
              </h4>
              <p className="text-xs text-[#111111]/75 dark:text-slate-400 mt-1 font-sans max-w-xl">
                {crossLinkConfig.description}
              </p>
            </div>
          </div>

          <a
            href={crossLinkConfig.minecraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-white dark:bg-[#15171f] text-[#111111] dark:text-white border-2 border-[#111111] dark:border-white/25 shadow-[3px_3px_0px_0px_#111111] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[5px_5px_0px_0px_#5fb57a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring shrink-0"
          >
            <span>Visit Minecraft Edition</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#5fb57a]" />
          </a>
        </div>

        {/* Middle Tier: Identity & Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-mono text-xs text-center sm:text-left">
            <span className="font-display font-black text-[#111111] dark:text-white uppercase tracking-tight text-sm">
              {personalInfo.name}
            </span>
            <span className="text-[#111111]/30 dark:text-white/30">•</span>
            <span>NIE Mysuru (B.E. ISE 2027)</span>
          </div>

          {/* Social Profiles */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-mono font-bold uppercase text-[11px] tracking-wider">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] dark:text-slate-300 hover:text-[#5fb57a] dark:hover:text-[#5fb57a] transition-colors py-1"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] dark:text-slate-300 hover:text-[#5fb57a] dark:hover:text-[#5fb57a] transition-colors py-1"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="text-[#111111] dark:text-slate-300 hover:text-[#5fb57a] dark:hover:text-[#5fb57a] transition-colors py-1"
              aria-label="Email Address"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] hover:shadow-[3px_3px_0px_0px_#5fb57a] transition-all focus-ring ml-1"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 text-[#5fb57a]" />
            </button>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Colophon */}
        <div className="pt-5 border-t-2 border-[#111111]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#111111]/60 dark:text-slate-400 text-center sm:text-left">
          <div>
            © {currentYear} Shreeharsha N. L. · React & Tailwind CSS
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2 gap-y-1">
            <span>Hosted on Cloudflare Pages</span>
            <span>•</span>
            {onNavigateToAdmin ? (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="hover:text-[#5fb57a] underline transition-colors"
                title="Open Operator Console"
              >
                /admin
              </button>
            ) : (
              <a href="/admin" className="hover:text-[#5fb57a] underline transition-colors">
                /admin
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
