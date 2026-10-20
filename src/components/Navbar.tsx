import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';
import { WallpaperSwitcher } from './WallpaperSwitcher';

interface NavbarProps {
  activeWallpaper: string;
  onSelectWallpaper: (src: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeWallpaper,
  onSelectWallpaper,
}) => {
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
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0c10]/85 backdrop-blur-md border-b border-[#232b3b]/80 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center space-x-2.5 font-medium text-white hover:text-amber-400 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-[#181e2b] border border-[#232b3b] group-hover:border-amber-500/50 flex items-center justify-center font-mono font-bold text-amber-400 text-sm transition-colors">
              S
            </span>
            <span className="font-semibold tracking-tight text-base">Shreeharsha</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Wallpaper Switcher + LinkedIn + GitHub */}
          <div className="flex items-center space-x-2.5">
            {/* Wallpaper Theme Switcher */}
            <WallpaperSwitcher
              activeWallpaper={activeWallpaper}
              onSelectWallpaper={onSelectWallpaper}
            />

            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-[#181e2b] border border-[#232b3b] text-zinc-400 hover:text-sky-400 hover:border-zinc-500 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-[#181e2b] border border-[#232b3b] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#181e2b] border border-[#232b3b] text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121620] border-b border-[#232b3b] px-4 py-4 space-y-2 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-white hover:bg-[#181e2b] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
