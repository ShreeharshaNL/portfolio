import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { sound } from '../utils/audio';

export interface Advancement {
  id: string;
  title: string;
  description: string;
  icon: string; // 'pickaxe' | 'sword' | 'gem' | 'book' | 'compass' | 'trophy'
  unlockedAt?: number;
}

const ALL_ADVANCEMENTS: Record<string, Omit<Advancement, 'id'>> = {
  welcome: {
    title: 'Taking Inventory',
    description: 'Spawned into Shreeharsha\'s Developer Portfolio.',
    icon: 'book',
  },
  diamonds: {
    title: 'Diamonds!',
    description: 'Mined your first diamond ore block.',
    icon: 'gem',
  },
  winner: {
    title: 'NeoNexus Champion',
    description: 'Discovered the 2026 Hackathon Winner project: LabelWise.',
    icon: 'trophy',
  },
  explorer: {
    title: 'World Explorer',
    description: 'Discovered and changed your Minecraft biome atmosphere.',
    icon: 'compass',
  },
  armorer: {
    title: 'Suit Up',
    description: 'Inspected engineering stats, skills, and gear in Inventory.',
    icon: 'sword',
  },
  contact: {
    title: 'Direct Connection',
    description: 'Copied email or initiated contact with Shreeharsha.',
    icon: 'pickaxe',
  },
};

interface GameContextType {
  xp: number;
  level: number;
  addXp: (amount: number) => void;
  soundMuted: boolean;
  toggleSound: () => void;
  unlockedAdvancements: Record<string, Advancement>;
  unlockAdvancement: (id: string) => void;
  activeToast: Advancement | null;
  dismissToast: () => void;
  inventoryOpen: boolean;
  openInventory: () => void;
  closeInventory: () => void;
  biomeModalOpen: boolean;
  openBiomeModal: () => void;
  closeBiomeModal: () => void;
  diamondsMined: number;
  recordDiamondMined: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('mc_portfolio_xp');
    return saved ? parseInt(saved, 10) : 260; // Start at 260 XP (Level 26)
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.isMuted());

  const [unlockedAdvancements, setUnlockedAdvancements] = useState<Record<string, Advancement>>(() => {
    try {
      const saved = localStorage.getItem('mc_portfolio_advancements');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [activeToast, setActiveToast] = useState<Advancement | null>(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [biomeModalOpen, setBiomeModalOpen] = useState(false);
  const [diamondsMined, setDiamondsMined] = useState<number>(() => {
    const saved = localStorage.getItem('mc_portfolio_diamonds');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Calculate level based on XP (Level 26 base for 2026)
  const level = Math.floor(xp / 10);

  const toggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setSoundMuted(isNowMuted);
  };

  const addXp = useCallback((amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('mc_portfolio_xp', String(next));
      if (Math.floor(next / 10) > Math.floor(prev / 10)) {
        setTimeout(() => sound.playLevelUp(), 150);
      } else {
        sound.playXpOrb(next % 6);
      }
      return next;
    });
  }, []);

  const unlockAdvancement = useCallback((id: string) => {
    const template = ALL_ADVANCEMENTS[id];
    if (!template) return;

    setUnlockedAdvancements((prev) => {
      if (prev[id]) return prev;

      const newAdv: Advancement = {
        id,
        ...template,
        unlockedAt: Date.now(),
      };

      const updated = { ...prev, [id]: newAdv };
      localStorage.setItem('mc_portfolio_advancements', JSON.stringify(updated));

      setActiveToast(newAdv);
      sound.playLevelUp();
      addXp(50);

      return updated;
    });
  }, [addXp]);

  const dismissToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAdvancement('welcome');
    }, 1200);
    return () => clearTimeout(timer);
  }, [unlockAdvancement]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setInventoryOpen((prev) => {
          if (!prev) sound.playChestOpen();
          return !prev;
        });
      } else if (e.key === 'Escape') {
        setInventoryOpen(false);
        setBiomeModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openInventory = () => {
    sound.playChestOpen();
    setInventoryOpen(true);
    unlockAdvancement('armorer');
  };

  const closeInventory = () => {
    setInventoryOpen(false);
  };

  const openBiomeModal = () => {
    sound.playClick();
    setBiomeModalOpen(true);
  };

  const closeBiomeModal = () => {
    setBiomeModalOpen(false);
  };

  const recordDiamondMined = () => {
    setDiamondsMined((prev) => {
      const next = prev + 1;
      localStorage.setItem('mc_portfolio_diamonds', String(next));
      return next;
    });
    unlockAdvancement('diamonds');
    addXp(30);
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        level,
        addXp,
        soundMuted,
        toggleSound,
        unlockedAdvancements,
        unlockAdvancement,
        activeToast,
        dismissToast,
        inventoryOpen,
        openInventory,
        closeInventory,
        biomeModalOpen,
        openBiomeModal,
        closeBiomeModal,
        diamondsMined,
        recordDiamondMined,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
