import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider, useGame } from './context/GameContext';
import { MinecraftBackground } from './components/MinecraftBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HighlightMetrics } from './components/HighlightMetrics';
import { About } from './components/About';
import { ProjectGrid } from './components/ProjectGrid';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { CommunityLedger } from './components/CommunityLedger';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MinecraftHotbar } from './components/MinecraftHotbar';
import { AdvancementToast } from './components/AdvancementToast';
import { BiomeModal } from './components/BiomeModal';
import { InventoryModal } from './components/InventoryModal';
import { AdminModal } from './components/AdminModal';
import { portfolioApi } from './services/api';

export const AppContent: React.FC = () => {
  const { biomeModalOpen, closeBiomeModal } = useGame();
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // 1. Telemetry: track page view
    portfolioApi.trackEvent('page_view', window.location.pathname);

    // 2. Secret shortcut: Ctrl + Shift + A opens Operator Command Block
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-[#4dedf4] selection:text-black transition-colors duration-300">
      {/* Minecraft Dynamic Background: Overworld Day, Night, Cherry Grove, Nether, The End, Snowy Tundra */}
      <MinecraftBackground />

      {/* Minecraft Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <HighlightMetrics />
        <About />
        <ProjectGrid />
        <Skills />
        <Education />
        <CommunityLedger />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Minecraft HUD Hotbar (Docked at Bottom) */}
      <MinecraftHotbar />

      {/* Minecraft Advancement Notifications */}
      <AdvancementToast />

      {/* Minecraft Biome Selector Modal */}
      <BiomeModal isOpen={biomeModalOpen} onClose={closeBiomeModal} />

      {/* Interactive Player Inventory Modal (Press E) */}
      <InventoryModal />

      {/* Operator Command Block Admin CMS (Ctrl+Shift+A or footer) */}
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
