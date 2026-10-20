import React, { useState } from 'react';
import { Image as ImageIcon, Check } from 'lucide-react';
import { useTheme, darkWallpapers, lightWallpapers } from '../context/ThemeContext';

export const WallpaperSwitcher: React.FC = () => {
  const { theme, activeWallpaper, setWallpaper } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const availableWallpapers = theme === 'dark' ? darkWallpapers : lightWallpapers;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-[#181e2b]/80 hover:bg-white dark:hover:bg-[#202738] border border-zinc-200 dark:border-[#232b3b] hover:border-amber-500/40 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all shadow-sm backdrop-blur-md"
        title="Switch Omarchy Wallpaper Theme"
      >
        <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Wallpaper</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-[#121620]/95 backdrop-blur-xl border border-zinc-200 dark:border-[#232b3b] p-3 shadow-2xl z-50 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2 py-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-[#232b3b] mb-2 flex items-center justify-between">
              <span>Omarchy Wallpapers</span>
              <span className="text-amber-500 font-semibold">{theme.toUpperCase()}</span>
            </div>

            {availableWallpapers.map((wp) => {
              const isActive = activeWallpaper === wp.src;
              return (
                <button
                  key={wp.id}
                  onClick={() => {
                    setWallpaper(wp.src);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-medium'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#181e2b] hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{wp.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
