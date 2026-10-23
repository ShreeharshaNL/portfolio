import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';
import { professionalApi } from './services/api';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Track page impression if not admin
    if (!window.location.pathname.startsWith('/admin')) {
      professionalApi.trackEvent('page_view', window.location.pathname);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated /admin SPA view
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage onBackToHome={navigateToHome} />;
  }

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

      {/* Footer with Cross-link to Minecraft & Admin Console */}
      <Footer onNavigateToAdmin={navigateToAdmin} />
    </div>
  );
};

export default App;
