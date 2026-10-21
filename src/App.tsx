import React from 'react';
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
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MinecraftHotbar } from './components/MinecraftHotbar';
import { AdvancementToast } from './components/AdvancementToast';
import { BiomeModal } from './components/BiomeModal';
import { InventoryModal } from './components/InventoryModal';

export const AppContent: React.FC = () => {
  const { biomeModalOpen, closeBiomeModal } = useGame();

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
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Minecraft HUD Hotbar (Docked at Bottom) */}
      <MinecraftHotbar />

      {/* Minecraft Advancement Notifications */}
      <AdvancementToast />

      {/* Minecraft Biome Selector Modal */}
      <BiomeModal isOpen={biomeModalOpen} onClose={closeBiomeModal} />

      {/* Interactive Player Inventory Modal (Press E) */}
      <InventoryModal />
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
