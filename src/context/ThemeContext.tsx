import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';

export type BiomeId =
  | 'overworld-day'
  | 'overworld-night'
  | 'cherry-grove'
  | 'nether'
  | 'the-end'
  | 'snowy-tundra';

export type ThemeMode = 'dark' | 'light';

export interface BiomeConfig {
  id: BiomeId;
  name: string;
  category: string;
  description: string;
}

export const BIOMES: BiomeConfig[] = [
  {
    id: 'overworld-day',
    name: 'Overworld Plains',
    category: 'Daylight',
    description: 'Sunlit sky, square sun, and drifting block clouds.',
  },
  {
    id: 'overworld-night',
    name: 'Deepslate Night',
    category: 'Nightfall',
    description: 'Starry indigo night sky with square moon and twinkling stars.',
  },
  {
    id: 'cherry-grove',
    name: 'Cherry Grove',
    category: 'Sakura Peaks',
    description: 'Pastel atmosphere with animated falling pink petals.',
  },
  {
    id: 'nether',
    name: 'Crimson Nether',
    category: 'Underworld',
    description: 'Volcanic dark crimson skies with floating rising lava embers.',
  },
  {
    id: 'the-end',
    name: 'The End Void',
    category: 'Dimension',
    description: 'Cosmic purple-black void with drifting Ender sparkle particles.',
  },
  {
    id: 'snowy-tundra',
    name: 'Snowy Tundra',
    category: 'Frozen Peaks',
    description: 'Glacial blue-gray atmosphere with falling square pixel snowflakes.',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  biome: BiomeId;
  setBiome: (biome: BiomeId) => void;
  biomes: BiomeConfig[];
  activeWallpaper: string;
  setWallpaper: (src: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [biome, setBiomeState] = useState<BiomeId>(() => {
    const saved = localStorage.getItem('mc_portfolio_biome');
    if (saved && BIOMES.some((b) => b.id === saved)) {
      return saved as BiomeId;
    }
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme === 'light' ? 'overworld-day' : 'overworld-night';
  });

  const theme: ThemeMode = biome === 'overworld-day' ? 'light' : 'dark';

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
    localStorage.setItem('mc_portfolio_biome', biome);

    // Track initial session theme selection once
    if (!sessionStorage.getItem('mc_tracked_session_theme')) {
      portfolioApi.trackEvent('theme_selection', biome);
      sessionStorage.setItem('mc_tracked_session_theme', 'true');
    }
  }, [theme, biome]);

  const setBiome = (newBiome: BiomeId) => {
    setBiomeState(newBiome);
    portfolioApi.trackEvent('theme_selection', newBiome);
  };

  const toggleTheme = () => {
    if (biome === 'overworld-day') {
      setBiome('overworld-night');
    } else {
      setBiome('overworld-day');
    }
  };

  const [activeWallpaper, setActiveWallpaper] = useState<string>('');
  const setWallpaper = (src: string) => setActiveWallpaper(src);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        biome,
        setBiome,
        biomes: BIOMES,
        activeWallpaper,
        setWallpaper,
      }}
    >
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
