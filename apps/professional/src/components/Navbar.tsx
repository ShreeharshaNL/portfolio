import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-cad-bg/92 backdrop-blur-md border-b border-cad-border shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Minimal Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 rounded focus-ring"
            aria-label="Shreeharsha N. L. homepage"
          >
            <span className="font-bold text-base tracking-tight text-cad-text group-hover:text-cad-accent transition-colors">
              Shreeharsha N. L.
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-xs" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors focus-ring py-1 ${
                    isActive
                      ? 'text-cad-accent font-semibold border-b border-cad-accent'
                      : 'text-cad-muted hover:text-cad-text'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle & Boxed Technical Resume Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {/* Boxed Resume Button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-medium text-cad-text border border-cad-border hover:border-cad-accent hover:text-cad-accent bg-cad-panel/60 hover:bg-cad-panel transition-colors focus-ring"
              aria-label="Open Resume in new tab"
            >
              <span>Resume</span>
              <span className="text-cad-accent text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded border border-cad-border text-cad-muted hover:text-cad-text hover:bg-cad-panel transition-colors focus-ring"
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
        <div className="md:hidden border-b border-cad-border bg-cad-bg/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 font-mono text-xs">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-cad-muted hover:text-cad-text hover:bg-cad-panel transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-cad-border">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded text-xs font-mono font-medium text-cad-text border border-cad-border hover:border-cad-accent hover:text-cad-accent bg-cad-panel transition-colors"
              >
                <span>Resume</span>
                <span className="text-cad-accent">↗</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
