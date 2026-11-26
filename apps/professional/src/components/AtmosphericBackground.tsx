import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-cad-bg transition-colors duration-200">
      
      {/* Primary PCB Coordinate Grid Lattice */}
      <div className="absolute inset-0 bg-pcb-grid opacity-80" />
      <div className="absolute inset-0 bg-pcb-grid-fine opacity-50" />

      {/* Subtle CAD Vignette & Contrast Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-cad-bg/40 to-cad-bg transition-colors" />

      {/* Decorative Routed PCB Traces (SVG layer) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-15 dark:opacity-20 transition-opacity" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="pcb-traces" width="240" height="240" patternUnits="userSpaceOnUse">
            {/* 45-degree angled trace paths */}
            <path d="M0 60 L60 60 L100 100 L180 100" fill="none" stroke="var(--cad-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M120 0 L120 40 L160 80 L240 80" fill="none" stroke="var(--cad-border)" strokeWidth="1.2" />
            <path d="M60 180 L120 180 L150 210 L150 240" fill="none" stroke="var(--cad-accent)" strokeWidth="0.8" opacity="0.6" />
            
            {/* Vias / Solder pads */}
            <circle cx="180" cy="100" r="3" fill="var(--cad-bg)" stroke="var(--cad-accent)" strokeWidth="1.2" />
            <circle cx="180" cy="100" r="1" fill="var(--cad-accent)" />
            
            <circle cx="60" cy="180" r="2.5" fill="var(--cad-bg)" stroke="var(--cad-muted)" strokeWidth="1" />
            <circle cx="240" cy="80" r="3" fill="var(--cad-bg)" stroke="var(--cad-border)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-traces)" />
      </svg>

      {/* Ambient Hardware Thermal Glow Spots */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-cad-accent/05 blur-[140px] animate-pulse-glow"
        aria-hidden="true"
      />
      
      <div 
        className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full bg-cad-status/04 blur-[140px] animate-float-slow"
        aria-hidden="true"
      />

      <div 
        className="absolute bottom-10 right-10 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-cad-accent/04 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

    </div>
  );
};
