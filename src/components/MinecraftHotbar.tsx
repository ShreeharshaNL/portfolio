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
      lore: 'Academics & NeoNexus 2026 Winner',
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
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none max-w-[96vw]">
      
      {/* Minecraft Tooltip on Hover */}
      <div className="h-9 mb-1 pointer-events-none flex items-end">
        {hoveredItem && (
          <div className="mc-tooltip-box rounded-none text-center animate-in fade-in zoom-in-95 duration-100 shadow-2xl">
            <span className="text-[#55ffff] font-bold text-xs tracking-wider block">
              {hoveredItem.name}
            </span>
            <span className="text-zinc-300 text-[10px] font-sans block">
              {hoveredItem.lore}
            </span>
          </div>
        )}
      </div>

      {/* Minecraft Health & Hunger HUD Stats */}
      <div className="w-full max-w-sm sm:max-w-md px-2 pb-1.5 flex flex-col items-center pointer-events-auto space-y-1">
        
        {/* Hearts and Drumsticks Row */}
        <div className="w-full flex items-center justify-between text-xs px-1">
          {/* 10 Hearts */}
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <HeartIcon key={i} size={13} state="full" />
            ))}
          </div>

          {/* Quick HUD controls: Sound + Inventory button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSound}
              className="p-1 bg-[#1c202a] border border-black hover:border-zinc-400 text-zinc-300 hover:text-white transition-colors"
              title={soundMuted ? 'Unmute Minecraft Sounds' : 'Mute Minecraft Sounds'}
              aria-label="Toggle Sound"
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={openInventory}
              className="px-1.5 py-0.5 bg-[#1c202a] border border-black text-[10px] font-pixel text-zinc-300 hover:text-[#fcee4b] flex items-center space-x-1"
              title="Open Inventory (Press E)"
            >
              <Backpack className="w-3 h-3 text-[#fcee4b]" />
              <span className="hidden sm:inline">[E]</span>
            </button>
          </div>

          {/* 10 Food Drumsticks */}
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <DrumstickIcon key={i} size={13} />
            ))}
          </div>
        </div>

        {/* Experience Bar */}
        <div className="w-full relative h-2 bg-[#0c0d12] border border-black rounded-none overflow-visible">
          {/* Green XP Bar Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#2ebd3a] via-[#55ff55] to-[#7eff55] transition-all duration-300 xp-glow"
            style={{ width: `${Math.max(xpProgress, 8)}%` }}
          />

          {/* Centered Level Number */}
          <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 text-[12px] font-pixel font-bold text-[#55ff55] mc-text-shadow leading-none">
            {level}
          </div>
        </div>

      </div>

      {/* 9 Hotbar Slots Container */}
      <div className="pointer-events-auto bg-[#181b24]/95 border-2 border-black p-1 shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,0_8px_20px_rgba(0,0,0,0.6)] flex items-center space-x-1 backdrop-blur-md">
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
              className={`relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#293042] border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.7)] scale-105 z-10'
                  : 'bg-[#12141a] border border-black hover:bg-[#1e2330] hover:border-zinc-500'
              }`}
              title={`${item.name} (${item.id})`}
            >
              {/* Slot Number in Corner */}
              <span className="absolute top-0.5 left-1 text-[9px] font-pixel text-zinc-400 font-bold leading-none select-none">
                {item.id}
              </span>

              {/* Icon */}
              <div className="transform transition-transform hover:scale-110 flex items-center justify-center">
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
