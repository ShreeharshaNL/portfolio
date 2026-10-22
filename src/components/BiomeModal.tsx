import React from 'react';
import { useTheme, BiomeId } from '../context/ThemeContext';
import { sound } from '../utils/audio';
import { useGame } from '../context/GameContext';
import { portfolioApi } from '../services/api';
import {
  CompassIcon,
  CherryBlossomIcon,
  NetherStarIcon,
  EnderEyeIcon,
  SnowflakeIcon,
  GrassBlockIcon,
} from './MinecraftIcons';
import { X, Check, Sun, Moon } from 'lucide-react';

interface BiomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiomeModal: React.FC<BiomeModalProps> = ({ isOpen, onClose }) => {
  const { biome, setBiome, biomes } = useTheme();
  const { unlockAdvancement } = useGame();

  if (!isOpen) return null;

  const getBiomeIcon = (id: BiomeId) => {
    switch (id) {
      case 'overworld-day':
        return <Sun className="w-5 h-5 text-[#fcee4b]" />;
      case 'overworld-night':
        return <Moon className="w-5 h-5 text-[#bae6fd]" />;
      case 'cherry-grove':
        return <CherryBlossomIcon size={20} />;
      case 'nether':
        return <NetherStarIcon size={20} />;
      case 'the-end':
        return <EnderEyeIcon size={20} />;
      case 'snowy-tundra':
        return <SnowflakeIcon size={20} />;
      default:
        return <GrassBlockIcon size={20} />;
    }
  };

  const handleSelectBiome = (id: BiomeId) => {
    sound.playPop();
    setBiome(id);
    portfolioApi.trackEvent('biome_switch', id);
    unlockAdvancement('explorer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Minecraft Biome Window */}
      <div className="relative z-10 w-full max-w-xl bg-[#1c202a] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,10px_10px_0px_rgba(0,0,0,0.8)] p-5 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center space-x-2.5">
            <CompassIcon size={24} />
            <div>
              <h3 className="font-pixel text-base font-bold text-white mc-text-shadow">
                Select Minecraft Biome
              </h3>
              <p className="text-[11px] font-sans text-zinc-400">
                Choose an animated background atmosphere
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 bg-[#616161] hover:bg-[#727272] border border-black shadow-[inset_1px_1px_#9c9c9c,inset_-1px_-1px_#383838] flex items-center justify-center text-white"
            aria-label="Close Biome Selector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Biomes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[65vh] overflow-y-auto p-1">
          {biomes.map((b) => {
            const isSelected = biome === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBiome(b.id)}
                className={`p-3 text-left border-2 flex items-start space-x-3 transition-all ${
                  isSelected
                    ? 'bg-[#293246] border-[#55ffff] shadow-[0_0_10px_rgba(85,255,255,0.4)]'
                    : 'bg-[#12141a] border-black hover:border-zinc-400 hover:bg-[#181c26]'
                }`}
              >
                <div className="w-9 h-9 shrink-0 bg-[#1a1e2a] border border-black flex items-center justify-center">
                  {getBiomeIcon(b.id)}
                </div>

                <div className="space-y-0.5 flex-1 pr-1">
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-xs font-bold text-white mc-text-shadow">
                      {b.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#55ffff]" />}
                  </div>
                  <span className="text-[9px] font-pixel text-[#fcee4b] block uppercase">
                    {b.category}
                  </span>
                  <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                    {b.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
