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
          ? 'bg-[#ebebea]/90 dark:bg-[#0b0c10]/90 backdrop-blur-md border-b-2 border-[#111111] dark:border-white/20 shadow-sm'
          : 'bg-transparent border-b-2 border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 focus-ring rounded-full"
            aria-label="Shreeharsha N. L. homepage"
          >
            <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/25 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0px_0px_#5fb57a] transition-all">
              <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-1 font-black">08/27</span>
              <span className="px-3 py-1 text-[#111111] dark:text-white font-extrabold tracking-tight">SHREEHARSHA</span>
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                    isActive
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-[2px_2px_0px_0px_#5fb57a]'
                      : 'text-[#111111] dark:text-slate-300 hover:bg-[#111111]/10 dark:hover:bg-white/10'
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
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-[#5fb57a] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all focus-ring"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-[#5fb57a] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all focus-ring"
              >
                <span>Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] focus-ring"
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
        <div className="md:hidden border-b-2 border-[#111111] dark:border-white/20 bg-[#ebebea]/95 dark:bg-[#0b0c10]/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-slate-200 hover:bg-[#111111]/10 dark:hover:bg-white/10 transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="pt-3 border-t-2 border-[#111111]/20 dark:border-white/20 flex items-center justify-between">
              {personalInfo.social.resumeUrl ? (
                <a
                  href={personalInfo.social.resumeUrl}
                  download
                  className="w-full text-center py-2.5 px-4 rounded-full bg-[#5fb57a] text-[#111111] font-extrabold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                >
                  Download Resume
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-full bg-[#5fb57a] text-[#111111] font-extrabold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111]"
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
