import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowRight } from 'lucide-react';
import { personalInfo } from '../config/portfolio';
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

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection tracker for active section highlighting
      const sections = ['home', 'about', 'projects', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
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
          ? 'bg-white/85 dark:bg-[#0a0c10]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 focus-ring rounded-lg p-1"
            aria-label="Shreeharsha N. L. homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Shreeharsha
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono -mt-0.5">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus-ring ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {/* Resume Button: Visible if resumeUrl exists */}
            {personalInfo.social.resumeUrl ? (
              <a
                href={personalInfo.social.resumeUrl}
                download
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-all focus-ring"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors focus-ring"
              >
                <span>Connect</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-ring"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a0c10]/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {personalInfo.social.resumeUrl ? (
                <a
                  href={personalInfo.social.resumeUrl}
                  download
                  className="w-full text-center py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium text-sm"
                >
                  Download Resume
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium text-sm"
                >
                  Get In Touch
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
