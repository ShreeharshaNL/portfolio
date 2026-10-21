import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, FileText, Backpack } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';
import { MineableBlock } from './MineableBlock';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { DiamondSword, CreeperFace, CompassIcon } from './MinecraftIcons';

const SPLASHES = [
  'Winner — NeoNexus 2026!',
  'Full-Stack Developer & AI Explorer!',
  'Press [E] for Inventory!',
  'B.E. ISE · NIE Mysuru!',
  'Spawn: Karkala, Karnataka!',
  'Built with React 18 & Vite!',
  'Clean code & solid systems!',
];

export const Hero: React.FC = () => {
  const { openBiomeModal, openInventory } = useGame();
  const [splashIndex, setSplashIndex] = useState(0);

  useEffect(() => {
    // Pick random splash on load
    const idx = Math.floor(Math.random() * SPLASHES.length);
    setSplashIndex(idx);
  }, []);

  const rotateSplash = () => {
    sound.playPop();
    setSplashIndex((prev) => (prev + 1) % SPLASHES.length);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        
        {/* Eyebrow Badge (Minecraft Style) */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#181b24]/90 border-2 border-black shadow-[inset_1px_1px_#3d4559,inset_-1px_-1px_#0e1015,2px_2px_0px_rgba(0,0,0,0.5)]">
          <CreeperFace size={16} />
          <span className="font-pixel text-xs text-[#55ff55] uppercase tracking-wider mc-text-shadow">
            {personalInfo.eyebrow}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="font-pixel text-[11px] text-[#fcee4b] mc-text-shadow">
            NEONEXUS 2026 WINNER
          </span>
        </div>

        {/* Main Heading with 3D Bevel & Bouncing Yellow Splash Text */}
        <div className="relative inline-block max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-pixel font-bold tracking-wide text-white mc-text-shadow leading-tight">
            Hi, I'm <span className="text-[#55ffff]">Shreeharsha</span>.
          </h1>

          {/* Minecraft Yellow Splash Text (bouncing at an angle) */}
          <div
            onClick={rotateSplash}
            className="absolute -top-4 -right-4 sm:-right-12 mc-splash text-xs sm:text-sm font-bold cursor-pointer hover:scale-110 select-none"
            title="Click for another splash!"
          >
            {SPLASHES[splashIndex]}
          </div>

          <p className="mt-4 text-lg sm:text-2xl text-zinc-200 font-pixel font-medium max-w-2xl mx-auto leading-relaxed mc-text-shadow-subtle">
            {personalInfo.headline}
          </p>
        </div>

        {/* Short description */}
        <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-xl mx-auto leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* Action Buttons (Minecraft styled) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="mc-button-diamond px-5 py-3 text-xs sm:text-sm space-x-2 group"
          >
            <DiamondSword size={18} />
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => openBiomeModal()}
            className="mc-button px-4 py-3 text-xs sm:text-sm space-x-2 text-[#fcee4b]"
            title="Switch Background Biome / Theme"
          >
            <CompassIcon size={18} />
            <span>Biomes & Themes</span>
          </button>

          <button
            onClick={() => openInventory()}
            className="mc-button px-4 py-3 text-xs sm:text-sm space-x-2 text-[#55ffff]"
            title="Open Character Vault (Press E)"
          >
            <Backpack className="w-4 h-4" />
            <span>Inventory [E]</span>
          </button>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="mc-button px-4 py-3 text-xs sm:text-sm space-x-2"
          >
            <Mail className="w-4 h-4 text-[#55ffff]" />
            <span>Get in Touch</span>
          </a>

          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="mc-button px-4 py-3 text-xs sm:text-sm space-x-1.5 text-zinc-200 hover:text-[#55ffff]"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="mc-button px-4 py-3 text-xs sm:text-sm space-x-1.5 text-zinc-200 hover:text-white"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {personalInfo.social.resumeUrl && (
            <a
              href={personalInfo.social.resumeUrl}
              download
              onClick={() => sound.playClick()}
              className="mc-button px-4 py-3 text-xs sm:text-sm space-x-1.5 text-[#fcee4b]"
            >
              <FileText className="w-4 h-4" />
              <span>Résumé</span>
            </a>
          )}
        </div>

        {/* Interactive Mineable Block Widget (cleanly centered below buttons) */}
        <div className="pt-4 flex justify-center">
          <MineableBlock />
        </div>

      </div>
    </section>
  );
};
