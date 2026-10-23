import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import {
  DiamondSword,
  DiamondGem,
  EmeraldGem,
  EnchantedBook,
  TotemIcon,
  RedstoneDust,
  ChestIcon,
  CreeperFace,
  CompassIcon,
} from './MinecraftIcons';
import { X } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

interface InventoryItem {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  lore: string[];
  icon: React.ReactNode;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'labelwise',
    name: 'LabelWise AI',
    type: 'Project · NeoNexus 2026 Winner',
    rarity: 'legendary',
    lore: [
      'Winner — NeoNexus 36.1 Hackathon at BITM Ballari (2026)',
      'Built with Team Code4Care',
      'Analyzes packaged food ingredient labels using Google Vision OCR',
      'Automated health additive risk scoring and nutrition breakdown',
    ],
    icon: <DiamondSword size={22} />,
  },
  {
    id: 'legallens',
    name: 'LegalLens AI',
    type: 'Project · Legal Technology',
    rarity: 'epic',
    lore: [
      'Hybrid AI legal awareness search pipeline',
      'Maps natural queries to statutory sections via cosine similarity',
      'Multilingual query processing tested in English, Hindi, and Kannada',
      'Built with Python, FastAPI, and React',
    ],
    icon: <EnchantedBook size={22} />,
  },
  {
    id: 'freelance',
    name: 'Campus Freelance Hub',
    type: 'Project · Full-Stack Web',
    rarity: 'rare',
    lore: [
      'Connects student developers and designers with campus freelance projects',
      'Role-based authentication & profile showcases',
      'Built with React, TypeScript, Node.js, Express, and Tailwind CSS',
    ],
    icon: <EmeraldGem size={22} />,
  },
  {
    id: 'academics',
    name: 'B.E. Information Science',
    type: 'Degree · NIE Mysuru',
    rarity: 'legendary',
    lore: [
      'The National Institute of Engineering (NIE), Mysuru',
      'Cumulative GPA: 8.65 / 10.0',
      'Expected Graduation: 2027',
      'Focus: Data Structures, Algorithms, Full-Stack Architecture',
    ],
    icon: <TotemIcon size={22} />,
  },
  {
    id: 'react',
    name: 'React 18 & TypeScript',
    type: 'Frontend Stack',
    rarity: 'rare',
    lore: [
      'Strict TypeScript type systems & interface design',
      'React hooks, state management, and responsive component UI',
      'Tailwind CSS and Vite production tooling',
    ],
    icon: <DiamondGem size={22} />,
  },
  {
    id: 'python',
    name: 'Python & FastAPI',
    type: 'Backend & Data',
    rarity: 'rare',
    lore: [
      'FastAPI and Flask microservice REST backends',
      'NLP pipelines, cosine similarity matching, OCR data extraction',
      'Data modeling and algorithmic problem solving',
    ],
    icon: <RedstoneDust size={22} />,
  },
  {
    id: 'node',
    name: 'Node.js & Express',
    type: 'Backend Stack',
    rarity: 'rare',
    lore: [
      'RESTful API architecture & async middleware',
      'JWT/session authentication controllers',
      'Integration with external third-party services and cloud APIs',
    ],
    icon: <DiamondGem size={22} />,
  },
  {
    id: 'database',
    name: 'MySQL & MongoDB',
    type: 'Database Systems',
    rarity: 'rare',
    lore: [
      'Relational schema design, normalization & SQL querying in MySQL',
      'Document data modeling and aggregation in MongoDB',
      'Database connection pooling and data integrity',
    ],
    icon: <DiamondGem size={22} />,
  },
  {
    id: 'spawn',
    name: 'Spawn Origin Record',
    type: 'Origin Lore',
    rarity: 'legendary',
    lore: [
      `Spawn: ${personalInfo.spawnOrigin.place}`,
      `DOB: ${personalInfo.spawnOrigin.dob}`,
      `Time: ${personalInfo.spawnOrigin.time}`,
      `Coords: ${personalInfo.spawnOrigin.coordinates} (IST)`,
    ],
    icon: <CompassIcon size={22} />,
  },
];

export const InventoryModal: React.FC = () => {
  const {
    inventoryOpen,
    closeInventory,
    diamondsMined,
    level,
    xp,
    unlockedAdvancements,
  } = useGame();

  const [activeTab, setActiveTab] = useState<'inventory' | 'advancements'>('inventory');
  const [selectedItem, setSelectedItem] = useState<InventoryItem>(INVENTORY_ITEMS[0]);

  if (!inventoryOpen) return null;

  const rarityColor = (rarity: InventoryItem['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'text-[#ffaa00]';
      case 'epic':
        return 'text-[#ff55ff]';
      case 'rare':
        return 'text-[#55ffff]';
      case 'uncommon':
        return 'text-[#ffff55]';
      default:
        return 'text-white';
    }
  };

  const advancementsList = [
    { id: 'welcome', name: 'Taking Inventory', desc: 'Spawned into Shreeharsha\'s Developer Portfolio.' },
    { id: 'diamonds', name: 'Diamonds!', desc: 'Mined your first diamond ore block.' },
    { id: 'winner', name: 'NeoNexus Champion', desc: 'Discovered the 2026 Hackathon Winner project: LabelWise.' },
    { id: 'explorer', name: 'World Explorer', desc: 'Discovered and switched your Minecraft biome atmosphere.' },
    { id: 'armorer', name: 'Suit Up', desc: 'Inspected engineering stats, skills, and gear in Inventory.' },
    { id: 'contact', name: 'Direct Connection', desc: 'Copied email or initiated contact with Shreeharsha.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeInventory} />

      {/* Minecraft GUI Window */}
      <div className="relative z-10 w-full max-w-3xl bg-[#1c202a] border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,10px_10px_0px_rgba(0,0,0,0.8)] p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-3 gap-2.5">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-2.5">
              <ChestIcon size={24} />
              <span className="font-pixel text-base sm:text-lg font-bold text-white mc-text-shadow">
                Character Vault & Gear
              </span>
              <span className="text-xs font-pixel text-[#55ff55] mc-text-shadow hidden sm:inline">
                [Level {level}]
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                closeInventory();
              }}
              className="sm:hidden w-7 h-7 bg-[#616161] hover:bg-[#727272] border border-black shadow-[inset_1px_1px_#9c9c9c,inset_-1px_-1px_#383838] flex items-center justify-center text-white shrink-0"
              aria-label="Close Inventory"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-2 w-full sm:w-auto">
            {/* Tabs */}
            <div className="flex bg-[#12141a] border border-black p-0.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('inventory');
                }}
                className={`flex-1 sm:flex-initial px-3 py-1 font-pixel text-xs transition-colors ${
                  activeTab === 'inventory' ? 'bg-[#2b3345] text-[#55ffff]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('advancements');
                }}
                className={`flex-1 sm:flex-initial px-3 py-1 font-pixel text-xs transition-colors ${
                  activeTab === 'advancements' ? 'bg-[#2b3345] text-[#fcee4b]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Advancements ({Object.keys(unlockedAdvancements).length}/6)
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                closeInventory();
              }}
              className="hidden sm:flex w-7 h-7 bg-[#616161] hover:bg-[#727272] border border-black shadow-[inset_1px_1px_#9c9c9c,inset_-1px_-1px_#383838] items-center justify-center text-white shrink-0"
              aria-label="Close Inventory"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Inventory & Character */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Upper Player Profile Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#12141a] border-2 border-black p-3 sm:p-4">
              
              {/* Character Avatar Box (Span 5) */}
              <div className="md:col-span-5 flex items-center space-x-3.5 bg-[#181b24] p-3 border border-black">
                <div className="w-14 h-14 bg-[#232938] border-2 border-black flex items-center justify-center shrink-0">
                  <CreeperFace size={36} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-pixel text-sm font-bold text-white mc-text-shadow">
                    {personalInfo.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[#55ffff]">
                    B.E. Info Science · NIE Mysuru
                  </p>
                  <p className="text-[10px] font-sans text-zinc-400">
                    Grad: 2027 · CGPA {educationData.cgpa} / 10.0
                  </p>
                  <p className="text-[10px] font-pixel text-[#fcee4b]">
                    Spawn: {personalInfo.spawnOrigin.place}
                  </p>
                  <p className="text-[9px] font-mono text-zinc-400">
                    {personalInfo.spawnOrigin.dob} · {personalInfo.spawnOrigin.time}
                  </p>
                </div>
              </div>

              {/* Equipped Real Gear Slots (Span 7) */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 bg-[#181b24] border border-black">
                  <span className="text-[9px] font-pixel text-zinc-400 block uppercase">Frontend</span>
                  <span className="text-xs font-pixel text-[#55ffff]">React + TS</span>
                </div>
                <div className="p-2 bg-[#181b24] border border-black">
                  <span className="text-[9px] font-pixel text-zinc-400 block uppercase">Backend</span>
                  <span className="text-xs font-pixel text-[#55ffff]">Node + Python</span>
                </div>
                <div className="p-2 bg-[#181b24] border border-black">
                  <span className="text-[9px] font-pixel text-zinc-400 block uppercase">Hackathon</span>
                  <span className="text-xs font-pixel text-[#fcee4b]">NeoNexus '26</span>
                </div>
                <div className="p-2 bg-[#181b24] border border-black">
                  <span className="text-[9px] font-pixel text-zinc-400 block uppercase">Mining</span>
                  <span className="text-xs font-pixel text-[#55ff55]">{diamondsMined} 💎 ({xp} XP)</span>
                </div>
              </div>

            </div>

            {/* Inventory Grid & Tooltip Lore Inspector */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Main Inventory Slots (Span 7) */}
              <div className="md:col-span-7 bg-[#12141a] border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-pixel text-zinc-400">
                  <span>Developer Inventory ({INVENTORY_ITEMS.length} Items)</span>
                  <span className="text-[#55ffff]">Click item to inspect</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {INVENTORY_ITEMS.map((item) => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          sound.playPop();
                          setSelectedItem(item);
                        }}
                        className={`w-full aspect-[4/3] bg-[#181b24] border-2 flex flex-col items-center justify-center p-2 transition-all relative ${
                          isSelected
                            ? 'border-[#55ffff] shadow-[0_0_8px_rgba(85,255,255,0.6)] bg-[#232938]'
                            : 'border-black hover:border-zinc-500 hover:bg-[#1e2330]'
                        }`}
                        title={item.name}
                      >
                        <div className="transform hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-pixel text-zinc-200 truncate w-full text-center mt-1">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Item Lore Inspector (Span 5) */}
              <div className="md:col-span-5 bg-[#100010] border-2 border-[#28007f] shadow-[inset_0_0_0_1px_#100030] p-4 space-y-3 font-pixel">
                <div className="space-y-0.5 border-b border-[#28007f] pb-2">
                  <h3 className={`text-sm font-bold ${rarityColor(selectedItem.rarity)} mc-text-shadow`}>
                    {selectedItem.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider">
                    {selectedItem.type}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 font-sans leading-relaxed">
                  {selectedItem.lore.map((line, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <span className="text-[#55ffff] font-mono">✦</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#28007f] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Shreeharsha N. L.</span>
                  <span className="text-[#55ff55]">Verified</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Advancements Progress */}
        {activeTab === 'advancements' && (
          <div className="space-y-3 bg-[#12141a] border-2 border-black p-4">
            <div className="text-xs font-pixel text-zinc-400 uppercase tracking-wider mb-2">
              Unlocked Advancements Log
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advancementsList.map((adv) => {
                const isUnlocked = Boolean(unlockedAdvancements[adv.id]);
                return (
                  <div
                    key={adv.id}
                    className={`p-3 border-2 transition-all flex items-start space-x-3 ${
                      isUnlocked
                        ? 'bg-[#181b24] border-[#55ff55]/50 shadow-[inset_1px_1px_#273827]'
                        : 'bg-[#14161f] border-zinc-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 shrink-0 border border-black flex items-center justify-center font-pixel text-xs ${
                        isUnlocked ? 'bg-[#1b4324] text-[#55ff55]' : 'bg-[#12141a] text-zinc-600'
                      }`}
                    >
                      {isUnlocked ? '✓' : '?'}
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-pixel text-xs font-bold text-white mc-text-shadow flex items-center space-x-1.5">
                        <span>{adv.name}</span>
                        {isUnlocked && (
                          <span className="text-[9px] font-pixel text-[#55ff55] uppercase">
                            [Unlocked]
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
