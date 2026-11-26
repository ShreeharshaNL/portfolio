import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Primary Geometric Paper Texture Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-35 mix-blend-normal dark:mix-blend-luminosity transition-opacity duration-700"
        style={{
          backgroundImage: "url('/images/backgrounds/geometric-paper.jpg')",
        }}
      />

      {/* Radial Vignette & Contrast Mask (Paper Ivory #faf7f2 / Slate Midnight #111620) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#faf7f2]/75 to-[#faf7f2] dark:from-transparent dark:via-[#111620]/85 dark:to-[#111620]" />

      {/* Subtle Tactile Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40" />

      {/* Subtle Floating Geometric Accent Diamonds (matches the wallpaper composition) */}
      <div 
        className="hidden md:block absolute top-28 right-[12%] w-72 h-72 rotate-45 rounded-2xl border border-[#e07a5f]/20 dark:border-[#f49d85]/15 bg-gradient-to-br from-[#e07a5f]/5 to-transparent backdrop-blur-[1px] animate-float shadow-xl shadow-[#e07a5f]/5"
        aria-hidden="true"
      />
      
      <div 
        className="hidden lg:block absolute bottom-24 left-[8%] w-60 h-60 rotate-45 rounded-2xl border border-[#4a7b87]/20 dark:border-[#7ec3d4]/15 bg-gradient-to-tl from-[#4a7b87]/5 to-transparent backdrop-blur-[1px] animate-float-slow shadow-xl shadow-[#4a7b87]/5"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      {/* Ambient Glowing Orbs reflecting the Peach / Teal palette */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 sm:w-[520px] sm:h-[520px] rounded-full bg-[#e07a5f]/15 dark:bg-[#f49d85]/12 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      
      <div 
        className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full bg-[#4a7b87]/15 dark:bg-[#7ec3d4]/12 blur-[130px] animate-float-slow"
        aria-hidden="true"
      />

      <div 
        className="absolute bottom-10 right-10 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-[#fab598]/15 dark:bg-[#e07a5f]/12 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

    </div>
  );
};
