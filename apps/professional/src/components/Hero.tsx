import React from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { personalInfo, educationData } from '../config/portfolio';

const RESUME_URL = 'https://resume.shreeharsha.online';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-24 pb-16 sm:pt-28 sm:pb-24 relative overflow-hidden">
      
      {/* CAD Ruler & Scale Calibration Line beneath Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" aria-hidden="true">
        <div className="relative w-full flex flex-col">
          <div className="flex items-center space-x-1.5 mb-1 text-[9px] font-mono text-cad-muted/70">
            <span className="w-1.5 h-1.5 rounded-full bg-cad-accent" />
            <span>CALIBRATION GRID · SCALE 1:1 · METRIC MM</span>
          </div>
          <div className="w-full h-2.5 border-t border-cad-border flex justify-between relative overflow-hidden transition-colors">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className={`w-[1px] bg-cad-border ${
                  i % 6 === 0 ? 'h-2.5 bg-cad-accent/70' : i % 2 === 0 ? 'h-1.5' : 'h-1'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Main Technical Narrative & Identity
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* Primary Headline with Signature Golden Dot */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cad-text leading-[1.08] transition-colors">
                Hi, I'm <br />
                <span>Shreeharsha</span><span className="text-cad-accent">.</span>
              </h1>
              <p className="text-lg sm:text-xl font-normal text-cad-text tracking-tight leading-snug transition-colors">
                Undergraduate engineer building functional web software, applied machine learning systems, and edge infrastructure.
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-sm text-cad-muted leading-relaxed max-w-xl font-sans transition-colors">
              B.E. Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru (CGPA 8.65 / 10.0). Winner of NeoNexus 36.1 Hackathon at BITM Ballari for LabelWise.
            </p>

            {/* Primary Action Buttons & Technical Profile Connectors */}
            <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-xs">
              
              {/* Primary CTA: Solid Gold View Projects */}
              <a
                href="#projects"
                className="group inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-cad-accent hover:bg-cad-hover text-cad-bg font-bold shadow-[0_2px_12px_rgba(217,164,65,0.25)] transition-all focus-ring"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>

              {/* Get in Touch */}
              <a
                href="#contact"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-sm border border-cad-border hover:border-cad-accent bg-cad-panel text-cad-text hover:text-cad-accent transition-all focus-ring"
              >
                <Mail className="w-3.5 h-3.5 text-cad-muted" />
                <span>Get In Touch</span>
              </a>

              {/* Boxed Resume Link */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-1 px-4 py-2.5 rounded-sm border border-cad-border hover:border-cad-accent bg-cad-panel text-cad-text hover:text-cad-accent transition-all focus-ring"
              >
                <span>Resume</span>
                <span className="text-cad-accent text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>

              {/* Social Profile Pads (GH & IN) */}
              <div className="flex items-center space-x-2">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm border border-cad-border hover:border-cad-accent bg-cad-panel flex items-center justify-center font-bold text-cad-text hover:text-cad-accent transition-colors focus-ring"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  GH
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm border border-cad-border hover:border-cad-accent bg-cad-panel flex items-center justify-center font-bold text-cad-text hover:text-cad-accent transition-colors focus-ring"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  IN
                </a>
              </div>
            </div>

            {/* Technical Sub-bar Coordinates */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-cad-muted border-t border-cad-border/60 max-w-xl transition-colors">
              <div>
                <span>NIE Mysuru</span>
                <span className="mx-2 text-cad-dim">•</span>
                <span className="text-cad-text">CGPA {educationData.cgpa}</span>
              </div>
              <div>
                <span>Mysuru, Karnataka, India</span>
                <span className="mx-2 text-cad-dim">•</span>
                <span className="text-cad-accent font-semibold">12.2958°N 76.6394°E</span>
              </div>
            </div>

            {/* =====================================================================
                BOTTOM LEFT: QFP IC Chip Schematic Element (U1 ISE 2027)
               ===================================================================== */}
            <div className="pt-4 flex items-center space-x-6 select-none" aria-hidden="true">
              
              {/* Fiducial Marker on Left */}
              <div className="flex flex-col items-center space-y-1">
                <div className="w-3.5 h-3.5 rounded-full border border-cad-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cad-accent" />
                </div>
                <span className="text-[8px] font-mono text-cad-muted">FID</span>
              </div>

              {/* The QFP IC Package */}
              <div className="relative">
                {/* U1 IC Label above package */}
                <div className="text-[10px] font-mono font-bold text-cad-accent mb-1 text-center">
                  U1
                </div>

                {/* Top Pin Traces & Test Pads D0-D7 */}
                <div className="flex justify-between px-1 mb-1">
                  {['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'].map((pin) => (
                    <div key={pin} className="flex flex-col items-center">
                      <span className="text-[7px] font-mono text-cad-muted/80">{pin}</span>
                      <div className="w-1.5 h-1.5 rounded-full border border-cad-accent bg-cad-bg my-0.5" />
                      <div className="w-[1px] h-3 bg-cad-accent" />
                    </div>
                  ))}
                </div>

                {/* Main Chip Body with Left/Right/Bottom Pins */}
                <div className="relative flex items-center justify-center">
                  {/* Left Pins */}
                  <div className="flex flex-col justify-between h-14 mr-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <div key={`l-${p}`} className="w-2.5 h-[1.5px] bg-cad-accent" />
                    ))}
                  </div>

                  {/* Chip Core Package */}
                  <div className="w-24 h-24 rounded-sm bg-cad-subtle border border-cad-border flex flex-col items-center justify-center p-2 shadow-lg transition-colors">
                    {/* Orientation notch */}
                    <div className="w-1.5 h-1.5 rounded-full bg-cad-border absolute top-1.5 left-1.5" />
                    <span className="text-xs font-mono font-bold tracking-wider text-cad-text">
                      ISE
                    </span>
                    <span className="text-[10px] font-mono text-cad-muted mt-0.5">
                      2027
                    </span>
                  </div>

                  {/* Right Pins */}
                  <div className="flex flex-col justify-between h-14 ml-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <div key={`r-${p}`} className="w-2.5 h-[1.5px] bg-cad-accent" />
                    ))}
                  </div>
                </div>

                {/* Bottom Pins */}
                <div className="flex justify-between px-3 mt-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                    <div key={`b-${p}`} className="flex flex-col items-center">
                      <div className="w-[1.5px] h-2.5 bg-cad-accent" />
                      <div className="w-1.5 h-1.5 rounded-full border border-cad-border bg-cad-bg mt-0.5" />
                    </div>
                  ))}
                </div>

                {/* Chip Footer Label */}
                <div className="text-[9px] font-mono tracking-widest text-cad-muted text-center mt-1">
                  NIE MYSURU
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: System Telemetry HUD Card & Edge Connector Bus
             ========================================================================= */}
          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end space-x-4">
            
            {/* Main SYSTEM TELEMETRY Panel */}
            <div className="w-full max-w-md bg-cad-panel border border-cad-border rounded-sm p-6 relative font-mono text-xs shadow-2xl transition-colors">
              
              {/* 4 Golden Corner Bracket Markers */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-cad-accent pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-cad-accent pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-cad-accent pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-cad-accent pointer-events-none" />

              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-4 border-b border-cad-border mb-5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cad-status shadow-[0_0_8px_var(--cad-status)]" />
                  <span className="font-bold tracking-wider text-xs text-cad-text">
                    SYSTEM TELEMETRY
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 border border-cad-accent text-cad-accent bg-cad-accent/10 rounded-sm">
                  5 SUBDOMAINS LIVE
                </span>
              </div>

              {/* Telemetry Module Blocks */}
              <div className="space-y-4">
                
                {/* Block U1: Academics */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-sm border border-cad-accent text-cad-accent flex items-center justify-center font-bold text-[10px] shrink-0 bg-cad-subtle">
                    U1
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-bold tracking-wider text-cad-accent">
                      ACADEMICS
                    </span>
                    <span className="block font-semibold text-cad-text text-xs">
                      B.E. Information Science (NIE Mysuru)
                    </span>
                    <span className="block text-[11px] text-cad-muted">
                      CGPA {educationData.cgpa} / 10.0 · Class of 2027
                    </span>
                  </div>
                </div>

                {/* Block U2: Milestone */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-sm border border-cad-accent text-cad-accent flex items-center justify-center font-bold text-[10px] shrink-0 bg-cad-subtle">
                    U2
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-bold tracking-wider text-cad-accent">
                      RECENT MILESTONE
                    </span>
                    <span className="block font-semibold text-cad-text text-xs">
                      NeoNexus 36.1 Hackathon Winner
                    </span>
                    <span className="block text-[11px] text-cad-muted">
                      Team Code4Care @ BITM Ballari (LabelWise)
                    </span>
                  </div>
                </div>

                {/* Block U3: Core Stack */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-sm border border-cad-accent text-cad-accent flex items-center justify-center font-bold text-[10px] shrink-0 bg-cad-subtle">
                    U3
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-bold tracking-wider text-cad-accent">
                      CORE STACK
                    </span>
                    <span className="block font-semibold text-cad-text text-xs leading-relaxed">
                      React · TypeScript · Python · FastAPI · Node.js · Cloudflare D1
                    </span>
                  </div>
                </div>

                {/* Block J2: Production Domain */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-sm border border-cad-accent text-cad-accent flex items-center justify-center font-bold text-[10px] shrink-0 bg-cad-subtle">
                    J2
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-bold tracking-wider text-cad-accent">
                      PRODUCTION DOMAIN
                    </span>
                    <a
                      href="https://shreeharsha.online"
                      className="inline-flex items-center space-x-1 font-semibold text-cad-accent hover:underline text-xs"
                    >
                      <span>shreeharsha.online</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Card Footer Bar */}
              <div className="pt-5 mt-5 border-t border-cad-border flex items-center justify-between text-[11px] text-cad-muted">
                <span>Engineering Portfolio</span>
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-1 text-cad-text hover:text-cad-accent transition-colors"
                >
                  <span>Connect</span>
                  <span>→</span>
                </a>
              </div>

            </div>

            {/* =====================================================================
                FAR RIGHT: PCB Edge Connector Bus (J1)
               ===================================================================== */}
            <div className="hidden sm:flex flex-col items-center select-none pt-2" aria-label="PCB Edge Bus J1">
              
              {/* Connector Header J1 */}
              <span className="text-[10px] font-mono font-bold text-cad-muted mb-1">J1</span>
              
              {/* Routed Gold Contact Pads with Vertical Bus */}
              <div className="relative flex flex-col space-y-3.5 pr-2">
                
                {/* Gold Bus Trace Lines */}
                <div className="absolute top-2 bottom-2 left-2 w-[1px] bg-cad-accent/40" />

                {[
                  { label: 'GITHUB', href: personalInfo.social.github },
                  { label: 'LINKEDIN', href: personalInfo.social.linkedin },
                  { label: 'MAIL', href: `mailto:${personalInfo.social.email}` },
                  { label: 'RESUME', href: RESUME_URL },
                  { label: 'GND', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-2 group">
                    <div className="w-4 h-4 rounded-full border border-cad-accent flex items-center justify-center bg-cad-bg group-hover:border-cad-hover transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-cad-accent" />
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-mono font-semibold text-cad-muted group-hover:text-cad-accent transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-cad-dim">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Test Points TP1, TP2, TP3 on side */}
              <div className="mt-6 flex flex-col space-y-3 pl-6">
                {['TP1', 'TP2', 'TP3'].map((tp) => (
                  <div key={tp} className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full border border-cad-accent bg-cad-bg flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-cad-accent" />
                    </div>
                    <span className="text-[8px] font-mono text-cad-muted">{tp}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Vias ooooo */}
              <div className="mt-6 flex space-x-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} className="w-1.5 h-1.5 rounded-full border border-cad-border bg-cad-bg" />
                ))}
              </div>

              {/* Right Fiducial Marker */}
              <div className="mt-4 flex flex-col items-center space-y-0.5">
                <div className="w-3 h-3 rounded-full border border-cad-accent flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cad-accent" />
                </div>
                <span className="text-[7px] font-mono text-cad-muted">FID</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
