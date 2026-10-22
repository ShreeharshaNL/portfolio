import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, FileText, Backpack } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';
import { MineableBlock } from './MineableBlock';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { DiamondSword, CompassIcon } from './MinecraftIcons';

const SPLASHES = [
  'Full-Stack Developer & AI Explorer!',
  'Press [E] for Character Vault!',
  'Spawn: Karkala, Karnataka!',
  'Built with React 18 & Vite!',
  'Clean code & solid systems!',
  'Crafting modern web experiences!',
  'Explore projects & lore below!',
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
    <section id="hero" className="relative pt-24 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 sm:space-y-7">

        {/* Main Heading with 3D Bevel & Bouncing Yellow Splash Text */}
        <div className="relative inline-flex flex-col items-center max-w-3xl mx-auto w-full">
          <div className="relative inline-block max-w-full">
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-pixel font-bold tracking-wide text-white mc-text-shadow leading-tight px-1 break-words">
              Hi, I'm <span className="text-[#55ffff]">Shreeharsha</span>.
            </h1>

            {/* Desktop Minecraft Yellow Splash Text (bouncing at top-right angle) */}
            <div
              onClick={rotateSplash}
              className="hidden sm:inline-block absolute -top-5 -right-8 md:-right-12 mc-splash text-xs sm:text-sm font-bold cursor-pointer hover:scale-110 select-none whitespace-nowrap z-20"
              title="Click for another splash!"
            >
              {SPLASHES[splashIndex]}
            </div>
          </div>

          {/* Mobile Splash Text (positioned cleanly below heading so it NEVER overlaps text) */}
          <div
            onClick={rotateSplash}
            className="sm:hidden mt-2.5 inline-block mc-splash text-[11px] font-bold cursor-pointer select-none px-3 py-1 bg-[#181b24]/90 border border-black shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]"
            title="Tap for another splash!"
          >
            ✦ {SPLASHES[splashIndex]}
          </div>

          <p className="mt-3 sm:mt-4 text-base sm:text-2xl text-zinc-200 font-pixel font-medium max-w-2xl mx-auto leading-relaxed mc-text-shadow-subtle px-2">
            {personalInfo.headline}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-base text-zinc-300 font-sans max-w-xl mx-auto leading-relaxed px-2">
          {personalInfo.bio}
        </p>

        {/* Action Buttons (Minecraft styled) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
          
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="mc-button-diamond px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm space-x-2 group"
          >
            <DiamondSword size={18} />
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => openBiomeModal()}
            className="mc-button px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 sm:space-x-2 text-[#fcee4b]"
            title="Switch Background Biome / Theme"
          >
            <CompassIcon size={18} />
            <span>Biomes & Themes</span>
          </button>

          <button
            onClick={() => openInventory()}
            className="mc-button px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 sm:space-x-2 text-[#55ffff]"
            title="Open Character Vault (Press E)"
          >
            <Backpack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Inventory [E]</span>
          </button>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="mc-button px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 sm:space-x-2"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#55ffff]" />
            <span>Get in Touch</span>
          </a>

          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="mc-button px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 text-zinc-200 hover:text-[#55ffff]"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="mc-button px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 text-zinc-200 hover:text-white"
            title="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {personalInfo.social.resumeUrl && (
            <a
              href={personalInfo.social.resumeUrl}
              download
              onClick={() => sound.playClick()}
              className="mc-button px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm space-x-1.5 text-[#fcee4b]"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Résumé</span>
            </a>
          )}
        </div>

        {/* Interactive Mineable Block Widget (cleanly centered below buttons) */}
        <div className="pt-3 sm:pt-4 flex justify-center">
          <MineableBlock />
        </div>

      </div>
    </section>
  );
};
