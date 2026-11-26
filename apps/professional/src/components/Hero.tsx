import React from 'react';
import { ArrowDown, Mail, ArrowUpRight, MapPin, GraduationCap, Award, Code2, Globe, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, educationData } from '../config/portfolio';

const RESUME_URL = 'https://resume.shreeharsha.online';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Availability & Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Internships · Class of 2027</span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
                Hi, I'm <span className="text-[#1d7eb6] dark:text-[#38bdf8]">Shreeharsha</span>.
              </h1>
              <p className="text-xl sm:text-2xl font-normal text-slate-700 dark:text-slate-300 tracking-tight leading-snug">
                Undergraduate engineer building functional web software, applied machine learning systems, and edge infrastructure.
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-sans">
              B.E. Information Science and Engineering at The National Institute of Engineering (NIE), Mysuru (CGPA 8.65 / 10.0). Winner of NeoNexus 36.1 Hackathon at BITM Ballari for LabelWise.
            </p>

            {/* Primary Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#1d7eb6] hover:bg-[#156593] text-white text-xs font-medium shadow-sm transition-all focus-ring"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 bg-white/60 dark:bg-slate-900/40 text-xs font-medium transition-all focus-ring"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Get In Touch</span>
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#1d7eb6] hover:text-[#1d7eb6] dark:hover:border-[#38bdf8] dark:hover:text-[#38bdf8] text-slate-800 dark:text-slate-200 text-xs font-medium transition-all focus-ring"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Social Profiles */}
              <div className="flex items-center space-x-1 pl-1">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-[#1d7eb6] dark:hover:text-[#38bdf8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Metadata Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#1d7eb6]" />
                <span>NIE Mysuru · CGPA {educationData.cgpa}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1d7eb6]" />
                <span>{personalInfo.location}</span>
              </span>
            </div>

          </div>

          {/* Right Column: Dynamic Floating Tech Profile Card with Subtle Motion */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl glass-card p-6 space-y-5 animate-float border-slate-200 dark:border-slate-800/80 shadow-lg shadow-slate-900/5 dark:shadow-none">
              
              {/* Header with live telemetry badge */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
                    System Telemetry
                  </span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#1d7eb6]/10 text-[#1d7eb6] dark:text-[#38bdf8] font-medium border border-[#1d7eb6]/20">
                  5 Subdomains Live
                </span>
              </div>

              {/* Verified Snapshot Items */}
              <div className="space-y-3.5">
                
                {/* Academic */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#1d7eb6] dark:text-[#38bdf8] shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
                      Academics
                    </h3>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      B.E. Information Science (NIE Mysuru)
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      CGPA 8.65 / 10.0 · Class of 2027
                    </p>
                  </div>
                </div>

                {/* Major Achievement */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
                      Recent Milestone
                    </h3>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      NeoNexus 36.1 Hackathon Winner
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Team Code4Care @ BITM Ballari (LabelWise)
                    </p>
                  </div>
                </div>

                {/* Stack */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
                      Core Stack
                    </h3>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      React · TypeScript · Python · FastAPI · Node.js · Cloudflare D1
                    </p>
                  </div>
                </div>

                {/* Root Domain */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
                      Production Domain
                    </h3>
                    <a
                      href="https://shreeharsha.online"
                      className="text-xs font-mono text-[#1d7eb6] dark:text-[#38bdf8] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>shreeharsha.online</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#1d7eb6]" />
                  <span>Engineering Portfolio</span>
                </span>
                <a
                  href="#contact"
                  className="text-[#1d7eb6] dark:text-[#38bdf8] hover:underline font-semibold"
                >
                  Connect →
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
