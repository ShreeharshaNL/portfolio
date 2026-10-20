import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeWallpaper: string;
  setWallpaper: (src: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const darkWallpapers = [
  { id: 'ship', name: 'Ship at Sea (Matte Black)', src: '/images/backgrounds/omarchy-bg.jpg' },
  { id: 'horizons', name: 'New Horizons (Warm Dusk)', src: '/images/backgrounds/new-horizons.jpg' },
  { id: 'ether', name: 'Mountain Ether (Solitude)', src: '/images/backgrounds/ether.jpg' },
  { id: 'kanagawa', name: 'Kanagawa Wave (Classic)', src: '/images/backgrounds/kanagawa.jpg' },
  { id: 'layers', name: 'Deep Layers (Vantablack)', src: '/images/backgrounds/layers-deep.jpg' },
];

export const lightWallpapers = [
  { id: 'fade', name: 'Color Fade (Catppuccin Latte)', src: '/images/backgrounds/color-fade.png' },
  { id: 'orb', name: 'Minimal Orb (Flexoki Light)', src: '/images/backgrounds/flexoki-orb.png' },
  { id: 'horizons-light', name: 'New Horizons (Dusk Sky)', src: '/images/backgrounds/new-horizons.jpg' },
  { id: 'kanagawa-light', name: 'Kanagawa Wave (Art)', src: '/images/backgrounds/kanagawa.jpg' },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [activeWallpaper, setActiveWallpaper] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio-wallpaper');
    if (saved) return saved;
    return theme === 'light' ? '/images/backgrounds/color-fade.png' : '/images/backgrounds/omarchy-bg.jpg';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    // If switching to light and currently using default dark wallpaper, switch to light wallpaper
    if (nextTheme === 'light' && activeWallpaper === '/images/backgrounds/omarchy-bg.jpg') {
      setActiveWallpaper('/images/backgrounds/color-fade.png');
      localStorage.setItem('portfolio-wallpaper', '/images/backgrounds/color-fade.png');
    } else if (nextTheme === 'dark' && activeWallpaper === '/images/backgrounds/color-fade.png') {
      setActiveWallpaper('/images/backgrounds/omarchy-bg.jpg');
      localStorage.setItem('portfolio-wallpaper', '/images/backgrounds/omarchy-bg.jpg');
    }
  };

  const setWallpaper = (src: string) => {
    setActiveWallpaper(src);
    localStorage.setItem('portfolio-wallpaper', src);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, activeWallpaper, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
