import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const RESUME_URL = 'https://resume.shreeharsha.online';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#faf7f2]/90 dark:bg-[#111620]/90 backdrop-blur-md border-b border-[#e8e0d5]/80 dark:border-[#222d3d]/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Minimal Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 rounded-md focus-ring"
            aria-label="Shreeharsha N. L. homepage"
          >
            <span className="font-semibold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-[#e07a5f] dark:group-hover:text-[#f49d85] transition-colors">
              Shreeharsha N. L.
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-tight transition-colors focus-ring ${
                    isActive
                      ? 'text-[#e07a5f] dark:text-[#f49d85] font-semibold bg-[#f0e7db]/70 dark:bg-[#1a2330]/70'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-[#f0e7db]/40 dark:hover:bg-[#1a2330]/40'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle & Direct Resume Link */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {/* Direct Resume Link to resume.shreeharsha.online */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-800 dark:text-slate-200 border border-[#e8e0d5] dark:border-[#222d3d] hover:border-[#e07a5f] dark:hover:border-[#f49d85] hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors focus-ring"
              aria-label="Open Resume in new tab"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-[#e8e0d5] dark:border-[#222d3d] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-[#f0e7db]/50 dark:hover:bg-[#1a2330]/50 transition-colors focus-ring"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e8e0d5] dark:border-[#222d3d] bg-[#faf7f2]/95 dark:bg-[#111620]/95 backdrop-blur-lg px-4 pt-2 pb-5 space-y-2 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-[#1d7eb6] dark:hover:text-[#1d7eb6] transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-md text-xs font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 hover:border-[#1d7eb6] hover:text-[#1d7eb6] transition-colors"
              >
                <span>View Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
