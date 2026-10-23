import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ebebea] dark:bg-[#0b0c10] text-[#111111] dark:text-[#f8fafc] font-sans antialiased selection:bg-[#5fb57a] selection:text-[#111111] transition-colors duration-200">
      {/* Sticky Professional Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedProjects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer with Cross-link to Minecraft */}
      <Footer />
    </div>
  );
};

export default App;
