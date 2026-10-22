import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Backpack, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { GrassBlockIcon, CompassIcon } from './MinecraftIcons';
import { sound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { soundMuted, toggleSound, openInventory, openBiomeModal } = useGame();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Spawn', href: '#hero' },
    { name: 'Lore', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Toolbox', href: '#skills' },
    { name: 'Academics', href: '#education' },
    { name: 'Ledger', href: '#guestbook' },
    { name: 'Connect', href: '#contact' },
  ];

  const handleNavClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#181b24]/90 backdrop-blur-md border-b-2 border-black py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Mark (Grass Block + Pixel Logo) */}
          <a
            href="#"
            onClick={() => sound.playClick()}
            className="flex items-center space-x-2.5 font-pixel text-white group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-[#12141a] border-2 border-black shadow-[inset_1px_1px_#3f475e,inset_-1px_-1px_#0e1015] group-hover:scale-105 transition-transform">
              <GrassBlockIcon size={20} />
            </div>
            <span className="font-bold tracking-wider text-base text-white group-hover:text-[#55ffff] mc-text-shadow transition-colors">
              Shreeharsha
            </span>
            <span className="text-[10px] font-pixel text-[#55ff55] hidden sm:inline mc-text-shadow">
              v1.20
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-pixel uppercase tracking-wider text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playClick()}
                className="hover:text-[#ffffa0] mc-text-shadow hover:translate-y-[-1px] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Day/Night, Sound, Inventory, Socials */}
          <div className="flex items-center space-x-2">
            
            {/* Day / Night Theme Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                toggleTheme();
              }}
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-200 transition-colors"
              title={theme === 'dark' ? 'Switch to Day (Overworld)' : 'Switch to Night (Deepslate)'}
              aria-label="Toggle Minecraft Day/Night"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#fcee4b]" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-100" />
              )}
            </button>

            {/* Biome Compass Selector (tablet/desktop) */}
            <button
              onClick={() => {
                sound.playClick();
                openBiomeModal();
              }}
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-200 hover:text-[#55ffff] transition-colors hidden sm:flex items-center space-x-1"
              title="Select Minecraft Biome Theme"
              aria-label="Select Biome"
            >
              <CompassIcon size={16} />
              <span className="hidden lg:inline text-[10px] font-pixel text-zinc-300">Biomes</span>
            </button>

            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleSound}
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-200 transition-colors"
              title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label="Toggle Sound Effects"
            >
              {soundMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#55ff55]" />
              )}
            </button>

            {/* Open Inventory Shortcut (sm and above) */}
            <button
              onClick={openInventory}
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-200 transition-colors hidden sm:flex items-center space-x-1"
              title="Open Inventory (Press E)"
            >
              <Backpack className="w-4 h-4 text-[#fcee4b]" />
              <span className="text-[10px] font-pixel text-zinc-300">[E]</span>
            </button>

            {/* LinkedIn (sm and above) */}
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              aria-label="LinkedIn Profile"
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-300 hover:text-[#55ffff] transition-colors hidden sm:flex"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* GitHub (sm and above) */}
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              aria-label="GitHub Profile"
              className="p-1.5 bg-[#202534] hover:bg-[#2c3347] border border-black text-zinc-300 hover:text-white transition-colors hidden sm:flex"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 bg-[#202534] border border-black text-zinc-200"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-[#181b24] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015] space-y-2 animate-in fade-in duration-150">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="block p-2 font-pixel text-sm text-zinc-200 hover:bg-[#232938] hover:text-[#ffffa0] border border-transparent hover:border-black"
              >
                {link.name}
              </a>
            ))}
            
            {/* Quick Action Buttons in Mobile Menu */}
            <div className="pt-2 border-t border-black space-y-2">
              <button
                onClick={() => {
                  openInventory();
                  setMobileMenuOpen(false);
                }}
                className="mc-button px-3 py-2 text-xs w-full font-pixel space-x-1.5 text-[#55ffff]"
              >
                <Backpack className="w-4 h-4 text-[#fcee4b]" />
                <span>Open Character Vault [E]</span>
              </button>

              <button
                onClick={() => {
                  openBiomeModal();
                  setMobileMenuOpen(false);
                }}
                className="mc-button px-3 py-2 text-xs w-full font-pixel space-x-1.5 text-[#fcee4b]"
              >
                <CompassIcon size={16} />
                <span>Switch Biome Atmosphere</span>
              </button>

              <div className="flex gap-2 pt-1">
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-button flex-1 py-1.5 text-xs font-pixel space-x-1 text-sky-300"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-button flex-1 py-1.5 text-xs font-pixel space-x-1 text-zinc-200"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
