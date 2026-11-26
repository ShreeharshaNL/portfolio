import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTheme = urlParams.get('theme');
      if (queryTheme === 'light' || queryTheme === 'dark') return queryTheme;
      const stored = localStorage.getItem('shreeharsha-theme');
      if (stored === 'light') return 'light';
    }
    return 'dark'; // Always defaults to dark CAD PCB theme
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.dataset.theme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.dataset.theme = 'light';
    }
    try {
      localStorage.setItem('shreeharsha-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-1.5 rounded-sm text-cad-muted hover:text-cad-text bg-cad-panel border border-cad-border hover:border-cad-accent transition-colors focus-ring cursor-pointer ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#D9A441] transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[#B8801A] transition-transform duration-200" />
      )}
    </button>
  );
};
