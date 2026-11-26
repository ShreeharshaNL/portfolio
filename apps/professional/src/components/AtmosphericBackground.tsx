import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Background Graphic Image Layer with Soft Blend */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-700"
        style={{
          backgroundImage: "url('/images/backgrounds/layers-deep.jpg')",
        }}
      />

      {/* Radial Vignette & Contrast Mask (ensures 100% text readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc]/80 to-[#f8fafc] dark:from-transparent dark:via-[#08090d]/85 dark:to-[#08090d]" />

      {/* Architectural Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 dark:opacity-50" />

      {/* Ambient Animated Glowing Orbs */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-[#1d7eb6]/20 dark:bg-[#1d7eb6]/25 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      
      <div 
        className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-[#38bdf8]/15 dark:bg-[#0284c7]/15 blur-[130px] animate-float-slow"
        aria-hidden="true"
      />

      <div 
        className="absolute bottom-10 right-10 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#1d7eb6]/15 dark:bg-[#1d7eb6]/20 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

    </div>
  );
};
