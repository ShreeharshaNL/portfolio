import React from 'react';
import { useGame } from '../context/GameContext';
import {
  DiamondPickaxe,
  DiamondSword,
  DiamondGem,
  EnchantedBook,
  CompassIcon,
  TotemIcon,
} from './MinecraftIcons';
import { X } from 'lucide-react';

export const AdvancementToast: React.FC = () => {
  const { activeToast, dismissToast } = useGame();

  if (!activeToast) return null;

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'pickaxe':
        return <DiamondPickaxe size={24} />;
      case 'sword':
        return <DiamondSword size={24} />;
      case 'gem':
        return <DiamondGem size={24} />;
      case 'book':
        return <EnchantedBook size={24} />;
      case 'compass':
        return <CompassIcon size={24} />;
      case 'trophy':
        return <TotemIcon size={24} />;
      default:
        return <DiamondGem size={24} />;
    }
  };

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="relative flex items-center space-x-3.5 px-4 py-3 bg-[#1e222d] border-2 border-black shadow-[inset_2px_2px_#3f475e,inset_-2px_-2px_#101218,6px_6px_0px_rgba(0,0,0,0.6)] rounded-sm max-w-sm">
        
        {/* Minecraft Icon Box */}
        <div className="w-11 h-11 shrink-0 bg-[#12141a] border-2 border-black shadow-[inset_2px_2px_#0a0c10,inset_-2px_-2px_#3f475e] flex items-center justify-center">
          {renderIcon(activeToast.icon)}
        </div>

        {/* Advancement Text */}
        <div className="space-y-0.5 pr-4">
          <div className="text-[11px] font-pixel font-bold text-[#fcee4b] uppercase tracking-wider mc-text-shadow">
            Advancement Made!
          </div>
          <div className="text-sm font-pixel font-bold text-white mc-text-shadow tracking-wide">
            {activeToast.title}
          </div>
          <div className="text-xs text-zinc-300 font-sans leading-tight">
            {activeToast.description}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={dismissToast}
          className="absolute top-2 right-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Dismiss Advancement"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
