import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
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

export const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500 selection:text-black transition-colors duration-300">
      {/* Authentic Omarchy Background Wallpaper & Spotlight Effect */}
      <BackgroundEffect />

      {/* Navigation with Theme & Wallpaper Switcher */}
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
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
