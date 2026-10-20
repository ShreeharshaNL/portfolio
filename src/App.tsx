import React, { useState } from 'react';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HighlightMetrics } from './components/HighlightMetrics';
import { About } from './components/About';
import { ProjectGrid } from './components/ProjectGrid';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeWallpaper, setActiveWallpaper] = useState('/images/backgrounds/omarchy-bg.jpg');

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Authentic Omarchy Background Wallpaper & Spotlight Effect */}
      <BackgroundEffect currentWallpaper={activeWallpaper} />

      {/* Navigation with Theme Switcher */}
      <Navbar
        activeWallpaper={activeWallpaper}
        onSelectWallpaper={setActiveWallpaper}
      />

      {/* Main Sections */}
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
    </div>
  );
};

export default App;
