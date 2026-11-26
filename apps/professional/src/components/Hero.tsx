import React from 'react';
import { ArrowDown, Mail, ArrowUpRight, MapPin, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, educationData } from '../config/portfolio';

const RESUME_URL = 'https://resume.shreeharsha.online';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow in Monospace */}
        <div className="font-mono text-xs text-[#1d7eb6] dark:text-[#38bdf8] uppercase tracking-wider font-semibold mb-4">
          Information Science & Engineering · NIE Mysuru
        </div>

        {/* Primary Headline with Tight Letter Spacing */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-3xl leading-[1.1]">
          Hi, I'm Shreeharsha N. L.
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-xl sm:text-2xl font-normal text-zinc-700 dark:text-zinc-300 tracking-tight max-w-3xl leading-snug">
          Undergraduate engineer building functional web software, applied machine learning systems, and edge cloud infrastructure.
        </p>

        {/* Bio Description (comfortable line-height 1.6) */}
        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-sans">
          Information Science & Engineering student at The National Institute of Engineering (NIE), Mysuru (CGPA 8.65 / 10.0 · Class of 2027). Winner of NeoNexus 36.1 Hackathon at BITM Ballari for LabelWise.
        </p>

        {/* Primary Action Links & Profiles */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-[#1d7eb6] hover:bg-[#156593] text-white text-xs font-medium transition-colors focus-ring"
          >
            <span>View Projects</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs font-medium transition-colors focus-ring"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <span>Get In Touch</span>
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1 px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:border-[#1d7eb6] hover:text-[#1d7eb6] dark:hover:border-[#1d7eb6] dark:hover:text-[#1d7eb6] text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors focus-ring"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Social Profiles */}
          <div className="flex items-center space-x-1 pl-2">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-ring"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-zinc-500 hover:text-[#1d7eb6] dark:hover:text-[#38bdf8] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-ring"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Technical Status Strip in Monospace */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center space-x-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#1d7eb6]" />
            <span>Class of 2027 · CGPA {educationData.cgpa}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#1d7eb6]" />
            <span>{personalInfo.location}</span>
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">•</span>
          <span>Open for Software Engineering Internships</span>
        </div>

      </div>
    </section>
  );
};
