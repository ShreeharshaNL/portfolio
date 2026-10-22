import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../config/portfolio';
import { sound } from '../utils/audio';
import { GrassBlockIcon } from './MinecraftIcons';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 pb-36 sm:pb-40 border-t-2 border-black bg-[#12141a]/95 text-xs text-zinc-400 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <GrassBlockIcon size={16} />
            <span className="font-pixel text-white font-bold text-sm mc-text-shadow">
              {personalInfo.name}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="font-pixel text-[#55ffff]">
              Information Science & Engineering · NIE Mysuru
            </span>
          </div>

          <div className="flex items-center space-x-5 font-pixel text-xs">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-[#55ffff] transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-[#55ffff] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.social.email}`}
              onClick={() => sound.playClick()}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-[#ffffa0] transition-colors"
              aria-label="Back to top"
            >
              <span>Spawn Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* F3 Debug Line (Iconic Minecraft Detail) */}
        <div className="pt-3 border-t border-black/80 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-500 gap-2">
          <div>
            Minecraft Edition v1.20 · XYZ: 2026 / 64 / 2027 · Spawn: Karkala, Karnataka · Biome: NIE-Mysuru · Mode: Survival
          </div>
          <div className="flex items-center space-x-2">
            <span>Crafted with React 18 & Cloudflare D1.</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-zinc-600 hover:text-[#fcee4b] transition-colors font-pixel text-[10px]"
                title="Open Operator Command Block (Admin Portal - Default PIN: 2027)"
              >
                [OP]
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
