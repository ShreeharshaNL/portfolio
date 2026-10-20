import React, { useState } from 'react';
import { Image as ImageIcon, Check } from 'lucide-react';
import { wallpapers } from './BackgroundEffect';

interface WallpaperSwitcherProps {
  activeWallpaper: string;
  onSelectWallpaper: (src: string) => void;
}

export const WallpaperSwitcher: React.FC<WallpaperSwitcherProps> = ({
  activeWallpaper,
  onSelectWallpaper,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#181e2b]/90 hover:bg-[#202738] border border-[#232b3b] hover:border-amber-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
        title="Switch Omarchy Wallpaper Theme"
      >
        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">Theme Wallpaper</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#121620]/95 backdrop-blur-xl border border-[#232b3b] p-3 shadow-2xl z-50 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2 py-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider border-b border-[#232b3b] mb-2 flex items-center justify-between">
              <span>Omarchy Backgrounds</span>
              <span className="text-amber-400">● 5 Themes</span>
            </div>

            {wallpapers.map((wp) => {
              const isActive = activeWallpaper === wp.src;
              return (
                <button
                  key={wp.id}
                  onClick={() => {
                    onSelectWallpaper(wp.src);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium'
                      : 'text-zinc-300 hover:bg-[#181e2b] hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{wp.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
