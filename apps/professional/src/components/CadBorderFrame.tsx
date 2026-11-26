import React from 'react';

export const CadBorderFrame: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden font-mono text-[10px] select-none text-cad-muted/70">
      
      {/* Outer Cad Border Line */}
      <div className="absolute inset-2 sm:inset-4 lg:inset-6 border border-cad-border rounded-sm pointer-events-none transition-colors" />

      {/* 4 Corner PCB Mounting Holes */}
      {/* Top Left Mounting Hole */}
      <div 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-cad-accent/40 flex items-center justify-center bg-cad-bg shadow-[0_0_12px_rgba(217,164,65,0.12)] transition-colors"
        aria-hidden="true"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cad-accent flex items-center justify-center bg-cad-panel transition-colors">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cad-bg border border-cad-border transition-colors" />
        </div>
      </div>

      {/* Top Right Mounting Hole */}
      <div 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-cad-accent/40 flex items-center justify-center bg-cad-bg shadow-[0_0_12px_rgba(217,164,65,0.12)] transition-colors"
        aria-hidden="true"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cad-accent flex items-center justify-center bg-cad-panel transition-colors">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cad-bg border border-cad-border transition-colors" />
        </div>
      </div>

      {/* Bottom Left Mounting Hole */}
      <div 
        className="hidden sm:flex absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-cad-accent/40 items-center justify-center bg-cad-bg shadow-[0_0_12px_rgba(217,164,65,0.12)] transition-colors"
        aria-hidden="true"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cad-accent flex items-center justify-center bg-cad-panel transition-colors">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cad-bg border border-cad-border transition-colors" />
        </div>
      </div>

      {/* Bottom Right Mounting Hole */}
      <div 
        className="hidden sm:flex absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-cad-accent/40 items-center justify-center bg-cad-bg shadow-[0_0_12px_rgba(217,164,65,0.12)] transition-colors"
        aria-hidden="true"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cad-accent flex items-center justify-center bg-cad-panel transition-colors">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cad-bg border border-cad-border transition-colors" />
        </div>
      </div>

      {/* Top Coordinate Ticks (1 to 8) */}
      <div className="hidden md:flex absolute top-2 sm:top-4 lg:top-6 left-16 right-16 justify-between items-center px-4">
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => (
          <div key={`top-${num}`} className="flex flex-col items-center">
            <span className="text-[10px] text-cad-muted/60 leading-none">{num}</span>
            <div className="w-[1px] h-2 bg-cad-border mt-0.5" />
          </div>
        ))}
      </div>

      {/* Left Coordinate Ticks (A to D) */}
      <div className="hidden lg:flex absolute left-2 sm:left-4 lg:left-6 top-24 bottom-24 flex-col justify-between items-center py-4">
        {['A', 'B', 'C', 'D'].map((letter) => (
          <div key={`left-${letter}`} className="flex items-center space-x-1">
            <span className="text-[10px] text-cad-muted/60 leading-none">{letter}</span>
            <div className="w-2 h-[1px] bg-cad-border" />
          </div>
        ))}
      </div>

      {/* Right Coordinate Ticks (A to D) */}
      <div className="hidden lg:flex absolute right-2 sm:right-4 lg:right-6 top-24 bottom-24 flex-col justify-between items-center py-4">
        {['A', 'B', 'C', 'D'].map((letter) => (
          <div key={`right-${letter}`} className="flex items-center space-x-1">
            <div className="w-2 h-[1px] bg-cad-border" />
            <span className="text-[10px] text-cad-muted/60 leading-none">{letter}</span>
          </div>
        ))}
      </div>

      {/* Bottom Coordinate Ticks (1 to 8) */}
      <div className="hidden md:flex absolute bottom-2 sm:bottom-4 lg:bottom-6 left-16 right-16 justify-between items-center px-4">
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => (
          <div key={`bottom-${num}`} className="flex flex-col items-center">
            <div className="w-[1px] h-2 bg-cad-border mb-0.5" />
            <span className="text-[10px] text-cad-muted/60 leading-none">{num}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
