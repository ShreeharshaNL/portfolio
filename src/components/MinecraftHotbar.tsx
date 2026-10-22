import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import {
  DiamondSword,
  EnchantedBook,
  DiamondGem,
  TotemIcon,
  DiamondPickaxe,
  CompassIcon,
  ChestIcon,
  HeartIcon,
  DrumstickIcon,
  EmeraldGem,
  RedstoneDust,
} from './MinecraftIcons';
import { Volume2, VolumeX, Backpack } from 'lucide-react';

interface HotbarItem {
  id: number;
  name: string;
  lore: string;
  icon: React.ReactNode;
  action: () => void;
}

export const MinecraftHotbar: React.FC = () => {
  const {
    level,
    xp,
    soundMuted,
    toggleSound,
    openInventory,
    openBiomeModal,
    diamondsMined,
    inventoryOpen,
    biomeModalOpen,
  } = useGame();

  const [activeSlot, setActiveSlot] = useState<number>(1);
  const [hoveredItem, setHoveredItem] = useState<HotbarItem | null>(null);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hotbarItems: HotbarItem[] = [
    {
      id: 1,
      name: 'Diamond Sword',
      lore: 'Sharpness V · Jump to Spawn (Hero)',
      icon: <DiamondSword size={22} />,
      action: () => scrollToSection('hero'),
    },
    {
      id: 2,
      name: 'Book & Quill',
      lore: 'Developer Lore · About Shreeharsha',
      icon: <EnchantedBook size={22} />,
      action: () => scrollToSection('about'),
    },
    {
      id: 3,
      name: 'Diamond Ingot',
      lore: 'Rare Artifacts · Featured Projects',
      icon: <DiamondGem size={22} />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 4,
      name: 'Redstone Core',
      lore: 'Technical Toolbox · Skills & Languages',
      icon: <RedstoneDust size={22} />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 5,
      name: 'Totem of Undying',
      lore: 'Engineering Academics & Standing',
      icon: <TotemIcon size={22} />,
      action: () => scrollToSection('education'),
    },
    {
      id: 6,
      name: 'Emerald Seal',
      lore: 'Dispatch Mail · Contact Channels',
      icon: <EmeraldGem size={22} />,
      action: () => scrollToSection('contact'),
    },
    {
      id: 7,
      name: 'Diamond Pickaxe',
      lore: `Mining Tool · ${diamondsMined} Diamonds Mined`,
      icon: <DiamondPickaxe size={22} />,
      action: () => {
        sound.playBlockHit();
        const miningEl = document.getElementById('mining-block');
        if (miningEl) {
          miningEl.scrollIntoView({ behavior: 'smooth' });
          miningEl.classList.add('animate-bounce');
          setTimeout(() => miningEl.classList.remove('animate-bounce'), 1000);
        } else {
          scrollToSection('hero');
        }
      },
    },
    {
      id: 8,
      name: 'Biome Compass',
      lore: 'Switch Animated Biomes & Themes',
      icon: <CompassIcon size={22} />,
      action: () => openBiomeModal(),
    },
    {
      id: 9,
      name: 'Ender Chest',
      lore: 'Open Inventory & Achievements [Press E]',
      icon: <ChestIcon size={22} />,
      action: () => openInventory(),
    },
  ];

  // Keyboard shortcut listener (keys 1 - 9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        e.preventDefault();
        setActiveSlot(num);
        const item = hotbarItems[num - 1];
        if (item) {
          item.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotbarItems]);

  const selectSlot = (item: HotbarItem) => {
    setActiveSlot(item.id);
    item.action();
  };

  // XP progress percentage to next level (0-100%)
  const xpProgress = (xp % 10) * 10;

  return (
    <div
      className={`fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none max-w-[98vw] transition-opacity duration-200 ${
        inventoryOpen || biomeModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      
      {/* Minecraft Tooltip on Hover */}
      <div className="h-8 sm:h-9 mb-1 pointer-events-none flex items-end">
        {hoveredItem && (
          <div className="mc-tooltip-box rounded-none text-center animate-in fade-in zoom-in-95 duration-100 shadow-2xl max-w-[90vw]">
            <span className="text-[#55ffff] font-bold text-[11px] sm:text-xs tracking-wider block truncate">
              {hoveredItem.name}
            </span>
            <span className="text-zinc-300 text-[9px] sm:text-[10px] font-sans block truncate">
              {hoveredItem.lore}
            </span>
          </div>
        )}
      </div>

      {/* Minecraft Health & Hunger HUD Stats */}
      <div className="w-full max-w-[340px] sm:max-w-md px-1 sm:px-2 pb-1 sm:pb-1.5 flex flex-col items-center pointer-events-auto space-y-1">
        
        {/* Hearts and Drumsticks Row */}
        <div className="w-full flex items-center justify-between text-xs px-0.5">
          {/* Hearts (5 on mobile, 10 on sm+) */}
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={i >= 5 ? 'hidden sm:inline-flex' : 'inline-flex'}>
                <HeartIcon size={12} state="full" />
              </span>
            ))}
          </div>

          {/* Quick HUD controls: Sound + Inventory button */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={toggleSound}
              className="p-1 bg-[#1c202a] border border-black hover:border-zinc-400 text-zinc-300 hover:text-white transition-colors"
              title={soundMuted ? 'Unmute Minecraft Sounds' : 'Mute Minecraft Sounds'}
              aria-label="Toggle Sound"
            >
              {soundMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={openInventory}
              className="px-1.5 py-0.5 bg-[#1c202a] border border-black text-[9px] sm:text-[10px] font-pixel text-zinc-300 hover:text-[#fcee4b] flex items-center space-x-1"
              title="Open Inventory (Press E)"
            >
              <Backpack className="w-3 h-3 text-[#fcee4b]" />
              <span className="hidden sm:inline">[E]</span>
            </button>
          </div>

          {/* Food Drumsticks (5 on mobile, 10 on sm+) */}
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={i >= 5 ? 'hidden sm:inline-flex' : 'inline-flex'}>
                <DrumstickIcon size={12} />
              </span>
            ))}
          </div>
        </div>

        {/* Experience Bar */}
        <div className="w-full relative h-1.5 sm:h-2 bg-[#0c0d12] border border-black rounded-none overflow-visible">
          {/* Green XP Bar Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#2ebd3a] via-[#55ff55] to-[#7eff55] transition-all duration-300 xp-glow"
            style={{ width: `${Math.max(xpProgress, 8)}%` }}
          />

          {/* Centered Level Number */}
          <div className="absolute left-1/2 -top-2.5 sm:-top-2.5 -translate-x-1/2 text-[11px] sm:text-[12px] font-pixel font-bold text-[#55ff55] mc-text-shadow leading-none">
            {level}
          </div>
        </div>

      </div>

      {/* 9 Hotbar Slots Container */}
      <div className="pointer-events-auto bg-[#181b24]/95 border-2 border-black p-0.5 sm:p-1 shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,0_8px_20px_rgba(0,0,0,0.6)] flex items-center space-x-0.5 sm:space-x-1 backdrop-blur-md">
        {hotbarItems.map((item) => {
          const isSelected = activeSlot === item.id;
          return (
            <button
              key={item.id}
              onClick={() => selectSlot(item)}
              onMouseEnter={() => {
                setHoveredItem(item);
                sound.playPop();
              }}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative w-7 h-7 min-[380px]:w-8 min-[380px]:h-8 sm:w-11 sm:h-11 flex items-center justify-center transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#293042] border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.7)] scale-105 z-10'
                  : 'bg-[#12141a] border border-black hover:bg-[#1e2330] hover:border-zinc-500'
              }`}
              title={`${item.name} (${item.id})`}
            >
              {/* Slot Number in Corner */}
              <span className="absolute top-0.5 left-0.5 sm:left-1 text-[8px] sm:text-[9px] font-pixel text-zinc-400 font-bold leading-none select-none">
                {item.id}
              </span>

              {/* Icon scaled for mobile */}
              <div className="transform transition-transform hover:scale-110 flex items-center justify-center scale-75 min-[380px]:scale-[0.85] sm:scale-100">
                {item.icon}
              </div>

              {/* White corner bracket indicator for active item */}
              {isSelected && (
                <div className="absolute inset-0 pointer-events-none border-2 border-[#55ffff] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};
