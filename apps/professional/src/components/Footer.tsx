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
    <footer className="border-t border-cad-border text-cad-muted text-xs py-14 transition-colors relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Alternate Interactive Dimension (Minecraft Edition Cross-Link) */}
        <div className="p-5 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative group shadow-sm">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cad-accent pointer-events-none" />

          <div className="space-y-1 max-w-xl text-left">
            <span className="font-mono text-xs text-cad-accent font-semibold block">
              Minecraft Edition Portfolio
            </span>
            <p className="text-xs text-cad-muted font-sans leading-relaxed">
              Looking for an interactive gamified experience? Explore the retro pixel Minecraft Edition with dynamic biome atmospheres, Web Audio sound effects, and diamond mining.
            </p>
          </div>

          <a
            href={crossLinkConfig.minecraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-sm text-xs font-mono font-medium text-cad-text border border-cad-border hover:border-cad-accent hover:text-cad-accent bg-cad-subtle transition-colors focus-ring shrink-0"
          >
            <span>Visit Minecraft Edition</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Navigation & Identity Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-cad-muted">
            <span className="font-semibold text-cad-text">
              {personalInfo.name}
            </span>
            <span className="text-cad-dim">•</span>
            <span>NIE Mysuru (B.E. ISE 2027)</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cad-muted hover:text-cad-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cad-muted hover:text-cad-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="text-cad-muted hover:text-cad-accent transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-cad-muted hover:text-cad-accent transition-colors ml-2 cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Colophon & Admin link */}
        <div className="pt-4 border-t border-cad-border flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-cad-dim">
          <div>
            © {currentYear} Shreeharsha N. L. · Schematics &amp; Architecture
          </div>
          <div className="flex items-center space-x-2">
            <span>Hosted on Cloudflare Pages</span>
            <span>•</span>
            {onNavigateToAdmin ? (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="hover:text-cad-accent transition-colors"
                title="Open Operator Dashboard"
              >
                /admin
              </button>
            ) : (
              <a href="/admin" className="hover:text-cad-accent transition-colors">
                /admin
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
